package com.progetto.persistence.daoConcrete;

import java.sql.Date;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.ArrayList;
import java.util.List;

import org.joda.time.DateTime;

import com.progetto.Utils;
import com.progetto.model.Account;
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
	private long getAddressId(User u) throws SQLException {
		String query = "select indirizzo_utente from utenti where id = ?";
		PreparedStatement st = Database.getInstance().getConnection().prepareStatement(query);
		st.setLong(1,u.getId());
		ResultSet r = st.executeQuery();
		r.next();
		return r.getLong("indirizzo_utente");
	}
	@Override
	public long save(User u) throws SQLException {
		 long id = -1;
		 if(exists(u)) {
			 u.getAddress().setId(getAddressId(u));
			 Database.getInstance().getAddressDao().save(u.getAddress());
			 String UPDATE_USER = "update utenti set cognome = ?, nome = ?, data_nascita = ? where id = ?";
			 PreparedStatement ps = Database.getInstance().getConnection().prepareStatement(UPDATE_USER);
			 ps.setString(1, u.getSurname());
			 ps.setString(2, u.getName());
			 ps.setDate(3, new Date(u.getDateOfBirth().toDate().getTime()));
			 ps.setLong(4, u.getId());
			 ps.executeUpdate();
			 id = u.getId();
		 }else {
			 //Salvo l'indirizzo dell'utente e mi faccio ritornare l'id
			 long addressId = Database.getInstance().getAddressDao().save(u.getAddress());
			 
			 String SAVE_USER = "insert into utenti(cognome,nome,data_nascita,indirizzo_utente) values(?,?,?,?) RETURNING id";
			 PreparedStatement ps = Database.getInstance().getConnection().prepareStatement(SAVE_USER);
			 ps.setString(1, u.getSurname());
			 ps.setString(2, u.getName());
			 ps.setDate(3, new Date(u.getDateOfBirth().toDate().getTime()));
			 ps.setLong(4, addressId);
			 ResultSet rs = ps.executeQuery();
			 rs.next();
			 id = rs.getLong("id");
		 }
		 return id;
	}
	
	//TODO
	@Override
	public void delete(User u) throws SQLException {
		if(exists(u) && u != null) {
			String DELETE_USER = "delete from utenti where id = ?";
			PreparedStatement ps = Database.getInstance().getConnection().prepareStatement(DELETE_USER);
			//Database.getInstance().getAccountDao().deleteAccountByUser(u);
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
		user = new User();
		user.setId(set.getLong("id"));
		user.setSurname(set.getString("cognome"));
		user.setName(set.getString("nome"));
		if(mode != Utils.BASIC_INFO) {
			user.setDateOfBirth(new DateTime(set.getDate("data_nascita")));
			user.setAddress(new AddressDaoConcrete().findByPrimarykey(set.getLong("indirizzo_utente")));				
		}
		return user;
	}

//<<<<<<< HEAD
	
//=======
	@Override
	public void deleteByAccount(Account a) throws SQLException {
		String query = "SELECT id FROM utenti INNER JOIN account ON id = id_utente where username = ?";
		PreparedStatement stmt = Database.getInstance().getConnection().prepareStatement(query);
		stmt.setString(1, a.getUsername());
		ResultSet rs = stmt.executeQuery();
		if(rs.next()) {
			User u = new User();
			u.setId(rs.getLong("id"));
			delete(u);
		}
	}
//>>>>>>> 0db4651846f5f677aae57c3d963aad9d430b7ee6
	
	
}
