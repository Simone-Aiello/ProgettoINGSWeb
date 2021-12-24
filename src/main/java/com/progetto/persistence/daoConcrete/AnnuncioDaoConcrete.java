package com.progetto.persistence.daoConcrete;

import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.LinkedList;
import java.util.List;

import org.apache.commons.lang3.StringUtils;

import com.progetto.model.Advertise;
import com.progetto.persistence.Database;
import com.progetto.persistence.daoInterfaces.AnnuncioDao;

public class AnnuncioDaoConcrete implements AnnuncioDao{

	@Override
	public Advertise findByPrimaryKey(long id) {
		Advertise ann = null;
		try {
			String query = "select * from annunci where id = ?";
			PreparedStatement statement = Database.getInstance().getConnection().prepareStatement(query);
			statement.setLong(1, id);
			ResultSet result = statement.executeQuery();
			if(result.next()) {
				ann.setId(result.getLong("id"));
				ann.setDescription(result.getString("descrizione"));
				ann.setTitle(result.getString("titolo"));
				//DA PASSARE IN YODA TIME ann.setExpiryDate(result.getDate("data_scadenza"));
				//Perché abbiamo id utente se la chiave è username?
				/*Per visualizzare la pagina dell'annuncio mi servono username e foto profilo dell'utente
				 Mi conviene ricostruire tutto l'oggetto Cliente perché tanto è una sola query e poi potrebbe essere usata 
				 direttamente per ricavare la pagina del profilo dell'utente passandola dal client al server senza dover fare dopo la query*/
			}
		} catch (SQLException e) {
			e.printStackTrace();
		}
		return ann;
	}
	private void setParameters(Advertise a, PreparedStatement statement) throws SQLException{
		//Dobbiamo portare avanti l'idBroker
		statement.setString(1, a.getDescription());
		statement.setString(2, a.getTitle());
		statement.setDate(3, a.getExpiryDate());
		statement.setString(4, a.getUser().getUsername());
	}
	@Override
	public void insertOrUpdate(Advertise a) {
		try {
			String select = "select * from annunci where id = ?";
			PreparedStatement statement = Database.getInstance().getConnection().prepareStatement(select);
			statement.setLong(1, a.getId());
			ResultSet result = statement.executeQuery();
			if(result.next()) {
				statement.close();
				String update = "update annunci set descrizione = ?, titolo = ?, data_scadenza = ?, username_cliente = ?, where id = ?";
				statement = Database.getInstance().getConnection().prepareStatement(update);
				setParameters(a, statement);
				statement.setLong(5,a.getId());
				statement.executeUpdate();
			}
			else {
				statement.close();
				//Non dobbiamo controllare se l'username esiste perché tanto l'insert lo facciamo solo ad utente loggato e quindi esistente
				String insert = "insert into annunci (descrizione,titolo,data_scadenza,username_cliente) values (?,?,?,?)";
				statement = Database.getInstance().getConnection().prepareStatement(insert);
				setParameters(a, statement);
				statement.execute();
			}
		} catch (SQLException e) {
			e.printStackTrace();
		}
	}

	@Override
	public List<Advertise> findAll() {
		// Secondo me non serve tanto non la useremo mai
		return null;
	}

	@Override
	public void delete(Advertise a) {
		try {
			String delete = "delete from annunci where id = ?";
			PreparedStatement statement = Database.getInstance().getConnection().prepareStatement(delete);
			statement.setLong(1, a.getId());
			statement.execute();
		} catch (SQLException e) {
			e.printStackTrace();
		}
		
	}
	@Override
	public List<Advertise> findGroup(String keyword, List<String> areas, List<String> provinces, Integer quantity, Integer offset) {
		List<Advertise> ann = new LinkedList<Advertise>();
		try {
			List<Object> parameters = new LinkedList<Object>();
			List<String> clauses = new LinkedList<String>();
			StringBuilder queryBuilder = new StringBuilder("select * from annunci");
			if(areas != null) {
				queryBuilder.append(" inner join annunci_ambiti on annunci.id = annunci_ambiti.id_annuncio ");
				StringBuilder areasBuilder = new StringBuilder(" annunci_ambiti.id_ambito in (");
				for(int i = 0; i < areas.size();i++) {
					areasBuilder.append("?");
					parameters.add(areas.get(i));
					if(i != areas.size() - 1) {
						areasBuilder.append(",");
					}
				}
				areasBuilder.append(") ");
				clauses.add(areasBuilder.toString());
			}
			if(provinces != null) {
				//Da aggiustare ER
			}
			if(keyword != null) {
				parameters.add(keyword);
				clauses.add(" titolo like %?% ");
			}
			if(clauses.size() != 0) {
				queryBuilder.append(" where" + StringUtils.join(clauses," and "));
			}
			queryBuilder.append(" limit ? offset ?");
			parameters.add(quantity == null ? "ALL" : quantity);
			parameters.add(offset == null ? 0 : offset);
			PreparedStatement query = Database.getInstance().getConnection().prepareStatement(queryBuilder.toString());
			for(int i = 0; i < parameters.size();i++) {
				query.setObject(i+1, parameters.get(i));
			}
			ResultSet result = query.executeQuery();
			while(result.next()) {
				Advertise a = new Advertise();
				a.setId(result.getLong("id"));
				a.setDescription(result.getString("descrizione"));
				a.setTitle(result.getString("titolo"));
				a.setExpiryDate(result.getDate("data_scadenza"));
				a.setUser(null/*Proxy user*/);
				ann.add(a);
			}
			return ann;
		} catch (SQLException e) {
			e.printStackTrace();
		}
		return ann;
	}

}
