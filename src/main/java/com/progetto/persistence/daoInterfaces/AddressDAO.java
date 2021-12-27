package com.progetto.persistence.daoInterfaces;

import java.sql.SQLException;
import java.util.List;

import com.progetto.model.Address;



public interface AddressDAO {
	public Address findByPrimarykey(long id) throws SQLException;
	public void save(Address u) throws SQLException;
	public void delete(Address u) throws SQLException;
	public List<Address> findAll() throws SQLException;
	public boolean exists(Address u) throws SQLException;
}
