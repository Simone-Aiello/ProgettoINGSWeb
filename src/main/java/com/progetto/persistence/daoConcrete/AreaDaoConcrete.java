package com.progetto.persistence.daoConcrete;

import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;

import com.progetto.model.Area;
import com.progetto.persistence.Database;
import com.progetto.persistence.daoInterfaces.AreaDao;

public class AreaDaoConcrete implements AreaDao{

	private Area loadArea(ResultSet resultSet) throws SQLException {
		
		Area area = null ;
		
		area.setId(resultSet.getLong("id"));
		area.setName(resultSet.getString("nome"));
		
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
			
			query = "update ambiti set name = ?  where id = ? " ;
			
			preparedStatement = Database.getInstance().getConnection().prepareStatement(query);
			
			preparedStatement.setString(1, area.getName());
			preparedStatement.setLong(2, area.getId());
			
		}else {
			
			query = "insert into ambiti(name) values(?) " ;
			
			preparedStatement = Database.getInstance().getConnection().prepareStatement(query);
			
			preparedStatement.setString(1, area.getName());
			
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

}
