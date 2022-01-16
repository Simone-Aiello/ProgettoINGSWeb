	package com.progetto.persistence.daoConcrete;

import java.sql.Date;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.ArrayList;
import java.util.LinkedList;
import java.util.List;

import org.apache.commons.lang3.StringUtils;
import org.joda.time.DateTime;

import com.progetto.Utils;
import com.progetto.model.Advertise;
import com.progetto.model.Area;
import com.progetto.model.Image;
import com.progetto.persistence.Database;
import com.progetto.persistence.daoInterfaces.AdvertiseDao;

public class AdvertiseDaoConcrete implements AdvertiseDao {
	@Override
	public boolean exists(Advertise a) throws SQLException {
		String query = "select * from annunci where id = ?;";
		PreparedStatement st = Database.getInstance().getConnection().prepareStatement(query);
		st.setLong(1, a.getId());
		return st.executeQuery().next();
	}

	@Override
	public Advertise findByPrimaryKey(long id,int mode) throws SQLException {
		Advertise ann = new Advertise();
		String query = "select * from annunci where id = ?;";
		PreparedStatement statement = Database.getInstance().getConnection().prepareStatement(query);
		statement.setLong(1, id);
		ResultSet result = statement.executeQuery();
		if (result.next()) {
			ann = load(result,mode);
		}
		return ann;
	}

	private void saveImages(Advertise a) throws SQLException {
		String query = "INSERT INTO immagini(value, id_annuncio) values(?, ?);";
		for (Image im : a.getImages()) {
			PreparedStatement st = Database.getInstance().getConnection().prepareStatement(query);
			//Database.getInstance().getImageDao().save(im);
			st.setString(1, im.getValue());
			st.setLong(2, a.getId());
			st.execute();
		}
	}
	//add an association between an area and an advertise
	private void saveAreas(Advertise a) throws SQLException {
		
		for (Area area : a.getInterestedAreas()) {
			String query ="INSERT INTO annunci_ambiti(id_annuncio, id_ambito) values(?, ?);";
			PreparedStatement st = Database.getInstance().getConnection().prepareStatement(query);
			st.setLong(1, a.getId());
			st.setLong(2, area.getId());
			st.execute();
			//Database.getInstance().getAreaDao().save(area);
		}
	}
	
	@Override
	public void save(Advertise a) throws SQLException {
		PreparedStatement statement = null;
		if (exists(a)) {
			String update = "update annunci set descrizione = ?, titolo = ?, data_scadenza = ?,provincia_annuncio = ? where id = ?;";
			statement = Database.getInstance().getConnection().prepareStatement(update);
			statement.setString(1, a.getDescription());
			statement.setString(2, a.getTitle());
			statement.setDate(3, new Date(a.getExpiryDate().getMillis()));
			statement.setString(4, a.getProvince());
			statement.setLong(5, a.getId());
			statement.executeUpdate();
			Database.getInstance().getImageDao().deleteByAdvertise(a);
		} else {
			String insert = "insert into annunci (descrizione,titolo,data_scadenza,username_cliente,provincia_annuncio, disponibilita) values (?,?,?,?,?, ?) RETURNING id;";
			statement = Database.getInstance().getConnection().prepareStatement(insert);
			statement.setString(1, a.getDescription());
			statement.setString(2, a.getTitle());
			statement.setDate(3, new Date(a.getExpiryDate().getMillis()));
			statement.setString(4, a.getAccount().getUsername());
			statement.setString(5, a.getProvince());
			statement.setString(6, a.getAvailability());
			ResultSet rs = statement.executeQuery();
			rs.next();
			a.setId(rs.getLong("id"));
		}
		Database.getInstance().getNotificationDao().saveNotificationByAdvertise(a);
		saveImages(a);
		saveAreas(a);
	}
	@Override
	public void delete(Advertise a) throws SQLException {
		Database.getInstance().getImageDao().deleteByAdvertise(a);
		Database.getInstance().getOfferDao().deleteByAdvertise(a);
		//delete associations with areas
		String deleteAssociatedAreas = "DELETE FROM annunci_ambiti WHERE id_annuncio = ?;";
		PreparedStatement stmt = Database.getInstance().getConnection().prepareStatement(deleteAssociatedAreas);
		stmt.execute();
		
		
		String delete = "delete from annunci where id = ?";
		PreparedStatement statement = Database.getInstance().getConnection().prepareStatement(delete);
		statement.setLong(1, a.getId());
		statement.execute();
	}
	private Advertise load(ResultSet result,int mode) throws SQLException {
		
		Advertise ann = new Advertise();
		
		ann.setId(result.getLong("id"));
		String description = result.getString("descrizione") ;
		if(description != null) {
			ann.setDescription(description);
		}
		ann.setTitle(result.getString("titolo"));
		ann.setExpiryDate(new DateTime(result.getDate("data_scadenza")));
		ann.setProvince(result.getString("provincia_annuncio"));
		List<Area> areas = Database.getInstance().getAreaDao().findByAdvertise(ann);
		ann.setInterestedAreas(areas);				
		if(mode == Utils.BASIC_INFO) {
			ann.setAccount(Database.getInstance().getAccountDao().findByPrimaryKey(result.getString("username_cliente"),Utils.BASIC_INFO));
			ann.setImages(Database.getInstance().getImageDao().findByAdvertise(ann,Utils.BASIC_INFO));
		}
		else if(mode != Utils.BASIC_INFO) {
			int next = mode == Utils.LIGHT ? Utils.BASIC_INFO : Utils.COMPLETE;
			List<Image> images = Database.getInstance().getImageDao().findByAdvertise(ann,next);
			ann.setImages(images);
		}				
		return ann;
	}
	@Override
	public List<Advertise> findGroup(String keyword, List<String> areas, String province, Integer quantity,
			Integer offset) throws SQLException {
		List<Advertise> ann = new LinkedList<Advertise>();
		List<Object> parameters = new LinkedList<Object>();
		List<String> clauses = new LinkedList<String>();
		StringBuilder queryBuilder = new StringBuilder("select * from  annunci");
		if (areas != null) {
			queryBuilder.append(
					" inner join annunci_ambiti on annunci.id = annunci_ambiti.id_annuncio inner join ambiti on id_ambito = ambiti.id ");
			StringBuilder areasBuilder = new StringBuilder(" ambiti.nome in (");
			for (int i = 0; i < areas.size(); i++) {
				areasBuilder.append("?");
				parameters.add(areas.get(i));
				if (i != areas.size() - 1) {
					areasBuilder.append(",");
				}
			}
			areasBuilder.append(") ");
			clauses.add(areasBuilder.toString());
		}
		if (province != null) {
			parameters.add(province);
			clauses.add(" provincia_annuncio = ? ");
		}
		if (keyword != null) {
			parameters.add("%" + keyword + "%");
			clauses.add(" titolo like ? ");
		}
		if (clauses.size() != 0) {
			queryBuilder.append(" where "+ StringUtils.join(clauses, " and "));
		}
		queryBuilder.append(" limit ? offset ?;");
		parameters.add(quantity == null ? null : quantity);
		parameters.add(offset == null ? 0 : offset);
		PreparedStatement query = Database.getInstance().getConnection().prepareStatement(queryBuilder.toString());
		for (int i = 0; i < parameters.size(); i++) {
			query.setObject(i + 1, parameters.get(i));
		}
		ResultSet result = query.executeQuery();
		while (result.next()) {
			Advertise a = load(result,Utils.BASIC_INFO);
			ann.add(a);
		}
		return ann;
	}
	/*
	 * public static void main(String[] args) { AdvertiseDaoConcrete test = new
	 * AdvertiseDaoConcrete(); try { String[] a = {"meccanico"}; List<String> areas
	 * = Arrays.asList(a); test.findGroup(null, areas, "CS", 30, null); } catch
	 * (SQLException e) { e.printStackTrace(); } }
	 */
}
