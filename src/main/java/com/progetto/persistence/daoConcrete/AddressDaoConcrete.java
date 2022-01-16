package com.progetto.persistence.daoConcrete;

import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.ArrayList;
import java.util.List;

import com.progetto.model.Address;
import com.progetto.persistence.Database;
import com.progetto.persistence.daoInterfaces.AddressDao;

public class AddressDaoConcrete implements AddressDao {

	@Override
	public Address findByPrimarykey(long id) throws SQLException {
		String FIND_BY_PRIMARY_KEY = "select * from indirizzi where id = ?";
		PreparedStatement ps = Database.getInstance().getConnection().prepareStatement(FIND_BY_PRIMARY_KEY);
		ps.setLong(1, id);
		ResultSet set = ps.executeQuery();
		return loadAddress(set);
	}

	@Override
	public long save(Address a) throws SQLException {
		long id = -1;
		 if(exists(a)) {
			 String UPDATE_ADDRESS = "update indirizzi set via = ?, numero_civico = ?, cap = ?, citta = ?, provincia = ? where id = ?";
			 PreparedStatement ps = Database.getInstance().getConnection().prepareStatement(UPDATE_ADDRESS);
			 ps.setString(1, a.getVia());
			 ps.setString(2, a.getHouseNumber());
			 ps.setString(3, a.getZipCode());
			 ps.setString(4, a.getTown());
			 ps.setString(5, a.getProvince());
			 ps.setLong(6, a.getId());
			 System.out.println(ps);
			 ps.executeUpdate();
			 id = a.getId();
		 }else {
			 String SAVE_ADDRESS = "insert into indirizzi(via,numero_civico,cap,citta,provincia) values(?,?,?,?,?) RETURNING id";
			 PreparedStatement ps = Database.getInstance().getConnection().prepareStatement(SAVE_ADDRESS);
			 ps.setString(1, a.getVia());
			 ps.setString(2, a.getHouseNumber());
			 ps.setString(3, a.getZipCode());
			 ps.setString(4, a.getTown());
			 ps.setString(5, a.getProvince());
			 ResultSet rs = ps.executeQuery();
			 rs.next();
			 id = rs.getLong("id");
		 }
		return id;
	}
	//TODO CHECK THAT THERE ARE NO USERS WITH THIS ADDRESS BEFORE DELETE
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
