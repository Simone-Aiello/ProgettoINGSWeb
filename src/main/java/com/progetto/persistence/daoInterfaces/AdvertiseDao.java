package com.progetto.persistence.daoInterfaces;

import java.sql.SQLException;
import java.util.List;

import com.progetto.model.Advertise;

public interface AdvertiseDao {
	public Advertise findByPrimaryKey(long id,int mode) throws SQLException;
	public List<Advertise> findAdvertisesByUsername(String username) throws SQLException;
	public Long alreadyAssigned(Advertise a) throws SQLException;
	public void save(Advertise a) throws SQLException;
	public void updateAdvertise(Advertise advertise) throws SQLException;
	public void delete(Advertise a) throws SQLException;
	boolean exists(Advertise a) throws SQLException;
	public int[] findAdvertisesNumberAndAreasByAccount(String username)throws SQLException;
	boolean alreadyAccepted(Advertise a) throws SQLException;
	List<Advertise> findGroup(String keyword, List<String> areas, String province, Integer quantity, Integer offset) throws SQLException;
}
