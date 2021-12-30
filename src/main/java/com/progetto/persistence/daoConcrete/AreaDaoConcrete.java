package com.progetto.persistence.daoConcrete;

import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.ArrayList;
import java.util.List;

import com.progetto.model.Account;
import com.progetto.model.Advertise;
import com.progetto.model.Area;
import com.progetto.persistence.Database;
import com.progetto.persistence.daoInterfaces.AreaDao;

public class AreaDaoConcrete implements AreaDao{

	private Area loadArea(ResultSet resultSet) throws SQLException {
		
		Area area = new Area();
		
		area.setId(resultSet.getLong("id"));
		area.setName(resultSet.getString("nome"));
		area.setIcon(resultSet.getString("icona"));
		return area ;
		
	}
	
	
	@Override
	public boolean exists(Area area) throws SQLException {
		
		String FIND_BY_PRYMARY_KEY = "" + "select *" + "from area" + "where id = ?";
		
		PreparedStatement preparedStatement = Database.getInstance().getConnection()
				.prepareStatement(FIND_BY_PRYMARY_KEY);
		
		preparedStatement.setLong(1, area.getId());
		
		ResultSet resultSet = preparedStatement.executeQuery() ;
		
		
		return resultSet.first();
	}

	@Override
	public Area findByPrimaryKey(long id_area) throws SQLException {

		String FIND_BY_PRYMARY_KEY = "" + "select *" + "from ambiti" + "where id = ?";
		
		PreparedStatement preparedStatement = Database.getInstance().getConnection()
				.prepareStatement(FIND_BY_PRYMARY_KEY);
		
		preparedStatement.setLong(1, id_area);
		
		ResultSet resultSet = preparedStatement.executeQuery() ;
		
		Area area = null ;
		
		if(resultSet.first()) {
			
			area = loadArea(resultSet);
			
		}
		
		return area ;		
	}

	@Override
	public void save(Area area) throws SQLException {

		String query = "" ;
		
		PreparedStatement preparedStatement = null ;
		
		if(exists(area)) {
			
			query = "update ambiti set name = ?, icona = ?  where id = ? " ;
			
			preparedStatement = Database.getInstance().getConnection().prepareStatement(query);
			
			preparedStatement.setString(1, area.getName());
			preparedStatement.setString(2, area.getIcon());
			preparedStatement.setLong(3, area.getId());
			
			
		}else {
			
			query = "insert into ambiti(nome, icona) values(?, ?) " ;
			
			preparedStatement = Database.getInstance().getConnection().prepareStatement(query);
			preparedStatement.setString(1, area.getName());
			preparedStatement.setString(2, area.getIcon());
			
		}
		
		preparedStatement.execute();
	}

	@Override
	public void delete(Area area) throws SQLException {

		String query = "delete from ambiti where id = ?" ;
		
		PreparedStatement preparedStatement = Database.getInstance().getConnection().prepareStatement(query);	
		preparedStatement.setLong(1, area.getId());
	
		preparedStatement.execute();
	}


	@Override
	public List<Area> findByAdvertise(Advertise ann) throws SQLException{
		List<Area> areas = new ArrayList<Area>();
		String query = "select id_ambito, nome, icona from annunci_ambiti inner join ambiti on id_ambito = id where id_annuncio = ?";
		PreparedStatement statement = Database.getInstance().getConnection().prepareStatement(query);
		statement.setLong(1, ann.getId());
		ResultSet set = statement.executeQuery();
		while(set.next()) {
			Area a = new Area();
			a.setId(set.getLong("id"));
			a.setName(set.getString("nome"));
			a.setIcon(set.getString("icona"));
			areas.add(a);
		}
		return areas;
	}


	@Override
	public List<Area> findByWorker(Account acc) throws SQLException {
		List<Area> areas = new ArrayList<Area>();
		String query = "select id_ambito, nome, icona from account_ambiti inner join ambiti on  id = id_ambito where username_account = ?";
		PreparedStatement statement = Database.getInstance().getConnection().prepareStatement(query);
		statement.setString(1, acc.getUsername());
		ResultSet set = statement.executeQuery();
		while(set.next()) {
			Area a = new Area();
			a.setId(set.getLong("id"));
			a.setName(set.getString("nome"));
			a.setIcon(set.getString("icona"));
			
			areas.add(a);
		}
		return areas;
	}

}
