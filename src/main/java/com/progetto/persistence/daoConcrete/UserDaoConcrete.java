package com.progetto.persistence.daoConcrete;

import java.sql.Date;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.ArrayList;
import java.util.List;

import org.joda.time.DateTime;

import com.progetto.Utils;
import com.progetto.model.User;
import com.progetto.persistence.Database;
import com.progetto.persistence.daoInterfaces.UserDao;
public class UserDaoConcrete implements UserDao{

	@Override
	public User findByPrimarykey(long id,int mode) throws SQLException {
		String FIND_BY_PRIMARY_KEY = "select * from utenti where id = ?";
		PreparedStatement ps = Database.getInstance().getConnection().prepareStatement(FIND_BY_PRIMARY_KEY);
		ps.setLong(1, id);
		ResultSet set = ps.executeQuery();
		User user = (set.next()) ? loadUser(set,mode) : null;
		return user;
	}

	@Override
	public void save(User u) throws SQLException {
		 if(exists(u)) {
			 String UPDATE_USER = "update utenti set id = ?, cognome = ?, nome = ?, data_nascita = ?, indirizzo_utente = ? where id = ?";
			 PreparedStatement ps = Database.getInstance().getConnection().prepareStatement(UPDATE_USER);
			 ps.setLong(1, u.getId());
			 ps.setString(2, u.getSurname());
			 ps.setString(3, u.getName());
			 ps.setDate(4, (Date) u.getDateOfBirth().toDate());
			 ps.setLong(5, u.getAddress().getId());
			 ps.setLong(6, u.getId());
			 ps.executeUpdate();
		 }else {
			 String SAVE_USER = "insert into utenti(id,cognome,nome,data_nascita,indirizzo_utente) values(?,?,?,?,?)";
			 PreparedStatement ps = Database.getInstance().getConnection().prepareStatement(SAVE_USER);
			 ps.setLong(1, u.getId());
			 ps.setString(2, u.getSurname());
			 ps.setString(3, u.getName());
			 ps.setDate(4, (Date) u.getDateOfBirth().toDate());
			 ps.setLong(5, u.getAddress().getId());
			 ps.execute();
		 }
	}

	@Override
	public void delete(User u) throws SQLException {
		if(exists(u) && u != null) {
			String DELETE_USER = "delete from utenti where id = ?";
			PreparedStatement ps = Database.getInstance().getConnection().prepareStatement(DELETE_USER);
			ps.setLong(1, u.getId());
			ps.execute();
		}
	}

	@Override
	public List<User> findAll() throws SQLException {
		String FIND_ALL = "select * from utenti";
		PreparedStatement ps = Database.getInstance().getConnection().prepareStatement(FIND_ALL);
		ResultSet set = ps.executeQuery();
		List<User> users = new ArrayList<User>();
		while(set.next()) {
			User user = new User();
			user.setId(set.getLong("id"));
			user.setSurname(set.getString("cognome"));
			user.setName(set.getString("nome"));
			user.setDateOfBirth(new DateTime(set.getDate("data_nascita")));
			user.setAddress(new AddressDaoConcrete().findByPrimarykey(set.getLong("indirizzo_utente")));
			users.add(user);
		}
		return users;	
	}

	@Override
	public boolean exists(User u) throws SQLException {
		String FIND_USER = "select * from utenti where id = ?";
		PreparedStatement ps = Database.getInstance().getConnection().prepareStatement(FIND_USER);
		ps.setLong(1, u.getId());
		return ps.executeQuery().next();
	}
	
	private User loadUser(ResultSet set,int mode) throws SQLException {
		User user = null;
		if(set.next()) {
			user = new User();
			user.setId(set.getLong("id"));
			user.setSurname(set.getString("cognome"));
			user.setName(set.getString("nome"));
			if(mode != Utils.BASIC_INFO) {
				user.setDateOfBirth(new DateTime(set.getDate("data_nascita")));
				user.setAddress(new AddressDaoConcrete().findByPrimarykey(set.getLong("indirizzo_utente")));				
			}
		}
		return user;
	}
	
	
}
