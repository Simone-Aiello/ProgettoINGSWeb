package com.progetto.persistence.daoConcrete;

import java.lang.module.FindException;
import java.sql.Date;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.Arrays;
import java.util.LinkedList;
import java.util.List;


import org.apache.commons.lang3.StringUtils;
import org.joda.time.DateTime;

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
	public Advertise findByPrimaryKey(Advertise a) throws SQLException {
		//Voglio il singolo annuncio, lo ricostruisco completamente
		Advertise ann = null;
		String query = "select * from annunci where id = ?;";
		PreparedStatement statement = Database.getInstance().getConnection().prepareStatement(query);
		statement.setLong(1, a.getId());
		ResultSet result = statement.executeQuery();
		if (result.next()) {
			ann.setId(result.getLong("id"));
			ann.setDescription(result.getString("descrizione"));
			ann.setTitle(result.getString("titolo"));
			ann.setExpiryDate(new DateTime(result.getDate("data_scadenza")));
			ann.setProvince(result.getString("provincia_annuncio"));
			//Nome cliente e foto profilo (da usare proxy perché l'oggetto account ha molti campi al momento inutili)
			ann.setUser(null/*Proxy*/);
			//Se è già stata accettata una proposta non penso di voler visualizzare l'annuncio, da vedere poi lato front end
			List<Image> images = Database.getInstance().getImageDao().findByAdvertise(ann);
			ann.setImages(images);
			//Un eventuale review non mi serve in questo caso, da confermare se è così lato front end
			
			
			List<Area> areas = null; //Da sostituire con DAO di AREA
			ann.setInterestedAreas(areas);
		}
		return ann;
	}

	private void saveImages(Advertise a) throws SQLException {
		String query = "update immagini set id_annuncio = ? where id = ?;";
		for (Image m : a.getImages()) {
			PreparedStatement st = Database.getInstance().getConnection().prepareStatement(query);
			Database.getInstance().getImageDao().save(m);
			st.setLong(1, a.getId());
			st.setLong(2, m.getId());
			st.execute();
		}
	}

	@Override
	public void save(Advertise a) throws SQLException {
		//Da gestire ambiti
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
			String insert = "insert into annunci (descrizione,titolo,data_scadenza,username_cliente,provincia_annuncio) values (?,?,?,?,?);";
			statement = Database.getInstance().getConnection().prepareStatement(insert);
			statement.setString(1, a.getDescription());
			statement.setString(2, a.getTitle());
			statement.setDate(3, new Date(a.getExpiryDate().getMillis()));
			statement.setString(4, a.getUser().getUsername());
			statement.setString(5, a.getProvince());
			statement.execute();
		}
		saveImages(a);
	}

	@Override
	public void delete(Advertise a) throws SQLException {
		String delete = "delete from annunci where id = ?";
		PreparedStatement statement = Database.getInstance().getConnection().prepareStatement(delete);
		statement.setLong(1, a.getId());
		statement.execute();

	}

	@Override
	public List<Advertise> findGroup(String keyword, List<String> areas, String province, Integer quantity,
			Integer offset) throws SQLException {
		List<Advertise> ann = new LinkedList<Advertise>();
		List<Object> parameters = new LinkedList<Object>();
		List<String> clauses = new LinkedList<String>();
		StringBuilder queryBuilder = new StringBuilder("select * from annunci");
		if (areas != null) {
			queryBuilder.append(" inner join annunci_ambiti on annunci.id = annunci_ambiti.id_annuncio inner join ambiti on id_ambito = ambiti.id ");
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
			queryBuilder.append(" where" + StringUtils.join(clauses, " and "));
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
			Advertise a = new Advertise();
			a.setId(result.getLong("id"));
			a.setDescription(result.getString("descrizione"));
			a.setTitle(result.getString("titolo"));
			a.setExpiryDate(new DateTime(result.getDate("data_scadenza"))); //Nella lista di annunci mi serve o posso lasciarlo vuoto? Secondo me vuoto
			a.setProvince(result.getString("provincia_annuncio")); //Nella lista di annunci mi serve o posso lasciarlo vuoto? Secondo me vuoto
			//Nome cliente e foto profilo (da usare proxy perché l'oggetto account ha molti campi al momento inutili)
			a.setUser(null/*Proxy*/);
			
			//Se è già stata accettata una proposta non penso di voler visualizzare l'annuncio, da vedere poi lato front end, non setto niente nel campo della proposta
			
			List<Image> images = Database.getInstance().getImageDao().findByAdvertise(a); //Voglio caricare solo la prima foto come anteprima, non tutta la lista
			a.setImages(images);
			
			//Un eventuale review non mi serve in questo caso, da confermare se è così lato front end, se ho già una review non lo voglio visualizzare
			
			List<Area> advertiseAreas = null; //Nella lista di annunci non mi serve, o proxy o lascio vuoto
			a.setInterestedAreas(advertiseAreas);
			ann.add(a);
		}
		return ann;
	}
	/*public static void main(String[] args) {
		AdvertiseDaoConcrete test = new AdvertiseDaoConcrete();
		try {
			String[] a = {"meccanico"};
			List<String> areas = Arrays.asList(a);
			test.findGroup(null, areas, "CS", 30, null);
		} catch (SQLException e) {
			e.printStackTrace();
		}
	}*/
}
