package com.progetto.persistence.daoConcrete;

import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.ArrayList;
import java.util.List;

import com.progetto.model.Address;
import com.progetto.persistence.Database;
import com.progetto.persistence.daoInterfaces.AddressDAO;

public class AddressDaoConcrete implements AddressDAO {

	@Override
	public Address findByPrimarykey(long id) throws SQLException {
		String FIND_BY_PRIMARY_KEY = "select * from indirizzi where id = ?";
		PreparedStatement ps = Database.getInstance().getConnection().prepareStatement(FIND_BY_PRIMARY_KEY);
		ps.setLong(1, id);
		ResultSet set = ps.executeQuery();
		return loadAddress(set);
	}

	@Override
	public void save(Address a) throws SQLException {
		 if(exists(a)) {
			 String UPDATE_USER = "update indirizzi set id = ?, via = ?, numero_civico = ?, cap = ?, citta = ?, provincia = ? where id = ?";
			 PreparedStatement ps = Database.getInstance().getConnection().prepareStatement(UPDATE_USER);
			 ps.setLong(1, a.getId());
			 ps.setString(2, a.getVia());
			 ps.setString(3, a.getHouseNumber());
			 ps.setString(4, a.getZipCode());
			 ps.setString(5, a.getTown());
			 ps.setString(6, a.getProvince());
			 ps.setLong(7, a.getId());
			 ps.executeUpdate();
		 }else {
			 String SAVE_USER = "insert into indirizzi(id,via,numero_civico,cap,citta,provincia) values(?,?,?,?,?,?)";
			 PreparedStatement ps = Database.getInstance().getConnection().prepareStatement(SAVE_USER);
			 ps.setLong(1, a.getId());
			 ps.setString(2, a.getVia());
			 ps.setString(3, a.getHouseNumber());
			 ps.setString(4, a.getZipCode());
			 ps.setString(5, a.getTown());
			 ps.setString(6, a.getProvince());
			 ps.execute();
		 }
		
	}

	@Override
	public void delete(Address a) throws SQLException {
		if(exists(a) && a != null) {
			String DELETE_ADDRESS = "delete from indirizzi where id = ?";
			PreparedStatement ps = Database.getInstance().getConnection().prepareStatement(DELETE_ADDRESS);
			ps.setLong(1, a.getId());
			ps.execute();
		}
		
	}

	@Override
	public List<Address> findAll() throws SQLException {
		String FIND_ALL = "select * from indirizzi";
		PreparedStatement ps = Database.getInstance().getConnection().prepareStatement(FIND_ALL);
		ResultSet set = ps.executeQuery();
		List<Address> addresses = new ArrayList<Address>();
		while(set.next()) {
			Address a = new Address();
			a.setId(set.getLong("id"));
			a.setVia(set.getString("via"));
			a.setHouseNumber(set.getString("numero_civico"));
			a.setZipCode(set.getString("cap"));
			a.setTown(set.getString("citta"));
			a.setProvince(set.getString("provincia"));
			addresses.add(a);
		}
		return addresses;
	}

	@Override
	public boolean exists(Address a) throws SQLException {
		if(a != null) {
			String FIND_ADDRESS = "select * from indirizzi where id = ?";
			PreparedStatement ps = Database.getInstance().getConnection().prepareStatement(FIND_ADDRESS);
			ps.setLong(1, a.getId());
			return ps.executeQuery().next();
		}
		return false;
	}
	
	private Address loadAddress(ResultSet set) throws SQLException{
		Address a = null;
		if(set.next()) {
			a = new Address();
			a.setId(set.getLong("id"));
			a.setVia(set.getString("via"));
			a.setHouseNumber(set.getString("numero_civico"));
			a.setZipCode(set.getString("cap"));
			a.setTown(set.getString("citta"));
			a.setProvince(set.getString("provincia"));
		}
		return a;
	}

}
