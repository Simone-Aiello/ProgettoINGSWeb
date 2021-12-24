package com.progetto.persistence.daoConcrete;

import java.sql.Date;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.LinkedList;
import java.util.List;


import org.apache.commons.lang3.StringUtils;

import com.progetto.model.Advertise;
import com.progetto.model.Image;
import com.progetto.persistence.Database;
import com.progetto.persistence.daoInterfaces.AdvertiseDao;

public class AdvertiseDaoConcrete implements AdvertiseDao {
	@Override
	public boolean exists(Advertise a) throws SQLException {
		String query = "select * from annunci where id = ?";
		PreparedStatement st = Database.getInstance().getConnection().prepareStatement(query);
		st.setLong(1, a.getId());
		return st.executeQuery().next();
	}
	@Override
	public Advertise findByPrimaryKey(long id) throws SQLException {
		Advertise ann = null;
		String query = "select * from annunci where id = ?";
		PreparedStatement statement = Database.getInstance().getConnection().prepareStatement(query);
		statement.setLong(1, id);
		ResultSet result = statement.executeQuery();
		if (result.next()) {
			ann.setId(result.getLong("id"));
			ann.setDescription(result.getString("descrizione"));
			ann.setTitle(result.getString("titolo"));
			/*Da rivedere*/
		}
		return ann;
	}

	private void saveImages(Advertise a) throws SQLException {
		String query = "update immagine set id_annuncio = ? where id = ?;";
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
		// Sostituire con exists
		String select = "select * from annunci where id = ?";
		PreparedStatement statement = Database.getInstance().getConnection().prepareStatement(select);
		statement.setLong(1, a.getId());
		ResultSet result = statement.executeQuery();
		if (result.next()) {
			statement.close();
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
			statement.close();
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
	public List<Advertise> findGroup(String keyword, List<String> areas, List<String> provinces, Integer quantity,
			Integer offset) throws SQLException {
		List<Advertise> ann = new LinkedList<Advertise>();
		List<Object> parameters = new LinkedList<Object>();
		List<String> clauses = new LinkedList<String>();
		StringBuilder queryBuilder = new StringBuilder("select * from annunci");
		if (areas != null) {
			queryBuilder.append(" inner join annunci_ambiti on annunci.id = annunci_ambiti.id_annuncio ");
			StringBuilder areasBuilder = new StringBuilder(" annunci_ambiti.id_ambito in (");
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
		if (provinces != null) {
			// Da aggiustare ER
		}
		if (keyword != null) {
			parameters.add(keyword);
			clauses.add(" titolo like %?% ");
		}
		if (clauses.size() != 0) {
			queryBuilder.append(" where" + StringUtils.join(clauses, " and "));
		}
		queryBuilder.append(" limit ? offset ?;");
		parameters.add(quantity == null ? "ALL" : quantity);
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
			a.setUser(null/* Proxy user */);
			ann.add(a);
		}
		return ann;
	}

}
