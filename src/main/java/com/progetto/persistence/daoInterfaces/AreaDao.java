package com.progetto.persistence.daoInterfaces;

import java.sql.SQLException;
import java.util.List;

import com.progetto.model.Advertise;
import com.progetto.model.Area;

public interface AreaDao {

	boolean exists(Area area) throws SQLException;		
	Area findByPrimaryKey(long id_area) throws SQLException;
	void save(Area area) throws SQLException;	
	void delete(Area area) throws SQLException;
	List<Area> findByAdvertise(Advertise ann) throws SQLException;
}
