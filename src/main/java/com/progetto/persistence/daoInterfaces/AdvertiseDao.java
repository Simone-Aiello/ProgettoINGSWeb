package com.progetto.persistence.daoInterfaces;

import java.sql.SQLException;
import java.util.List;

import com.progetto.model.Advertise;

public interface AdvertiseDao {
	public Advertise findByPrimaryKey(Advertise id) throws SQLException;
	public void save(Advertise a) throws SQLException;
	public void delete(Advertise a) throws SQLException;
	public List<Advertise> findGroup(String keyword,List<String> areas,String province,Integer quantity,Integer offset) throws SQLException;
	boolean exists(Advertise a) throws SQLException;
}
