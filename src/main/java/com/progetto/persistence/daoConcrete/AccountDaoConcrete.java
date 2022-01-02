package com.progetto.persistence.daoConcrete;

import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.sql.Statement;
import java.util.ArrayList;
import java.util.List;

import com.progetto.Utils;
import com.progetto.model.Account;
import com.progetto.model.Area;
import com.progetto.model.Review;
import com.progetto.persistence.Database;
import com.progetto.persistence.daoInterfaces.AccountDao;

public class AccountDaoConcrete implements AccountDao{

	@Override
	public List<Account> findAll() throws SQLException {
		String query = "SELECT * FROM account;";
		Statement stmt = Database.getInstance().getConnection().createStatement();
		ResultSet rs = stmt.executeQuery(query);
		List<Account> accounts = new ArrayList<>();
		while(rs.next()) {
			Account a = new Account();
			a.setUsername(rs.getString("username"));
			a.setPassword(rs.getString("password"));
			a.setEmail(rs.getString("email"));
			a.setNumber(query);
			a.setProfilePic(null); //proxy
			a.setProvinceOfWork(rs.getString("provincia_lavoro"));
			a.setPersonalInfo(null); //proxy
			a.setAccountType(rs.getString("tipo_account")); // FUNZIONA CON GLI ENUM?
			accounts.add(a);
		}
		return accounts;
	}
	
	

	@Override
	public Account findByPrimaryKey(String username,int mode) throws SQLException {
		String query = "SELECT * FROM account WHERE username = ?;";
		PreparedStatement stmt = Database.getInstance().getConnection().prepareStatement(query);
		stmt.setString(1, username);
		ResultSet rs = stmt.executeQuery();
		Account a = null;
		if(rs.next()) {
			a = new Account();
			a.setUsername(rs.getString("username"));
			a.setEmail(rs.getString("email"));
			if(mode != Utils.BASIC_INFO) {
				int next = mode == Utils.LIGHT ? Utils.BASIC_INFO : Utils.COMPLETE;
				a.setNumber(rs.getString("telefono"));
				a.setProvinceOfWork(rs.getString("provincia_lavoro"));
				a.setPersonalInfo(Database.getInstance().getUserDao().findByPrimarykey(rs.getLong("id_utente"), next)); 
				if(mode != Utils.LIGHT) {
					a.setPassword(rs.getString("password"));
					a.setProfilePic(Database.getInstance().getImageDao().findByPrimaryKey(rs.getLong("immagine_profilo")));					
					a.setAccountType(rs.getString("tipo_account"));		
				}
			}
		}
		return a;
	}
	
	public Account findByEmail(String email) throws SQLException{
		Account a = null;
		String FIND_BY_EMAIL = "select * from account where username = ?";
		PreparedStatement ps = Database.getInstance().getConnection().prepareStatement(FIND_BY_EMAIL);
		ps.setString(1, email);
		ResultSet set = ps.executeQuery();
		if(set.next()) {
			a = new Account();
			a.setUsername(set.getString("username"));
			a.setEmail(set.getString("email"));
			a.setNumber(set.getString("telefono"));
			a.setProvinceOfWork(set.getString("provincia_lavoro"));
			a.setPersonalInfo(Database.getInstance().getUserDao().findByPrimarykey(set.getLong("id_utente"), Utils.COMPLETE)); 
			a.setPassword(set.getString("password"));
			a.setProfilePic(Database.getInstance().getImageDao().findByPrimaryKey(set.getLong("immagine_profilo")));					
			a.setAccountType(set.getString("tipo_account"));		
		}
		return a;
	}

	@Override
	public void save(Account a) throws SQLException {
		if(exists(a)) {
			//CONSENTIREE LA MODIFICA DELL'UTENTE?
			String query ="UPDATE account SET password = ?, email = ?, telefono = ?, provincia_lavoro = ? tipo_account  = ? WHERE username = ?;";
			PreparedStatement stmt = Database.getInstance().getConnection().prepareStatement(query);
			stmt.setString(1, a.getPassword());
			stmt.setString(2, a.getEmail());
			stmt.setString(3, a.getNumber());
			stmt.setString(4, a.getProvinceOfWork());
			stmt.setString(5, a.getAccountType());
			stmt.setString(6, a.getUsername());
			stmt.execute();
		}
		else {
			String query = "INSERT INTO account (username, password, email, telefono, provincia_lavoro, tipo_account) values(?, ?, ?, ?, ?, ?);";
			PreparedStatement stmt  =  Database.getInstance().getConnection().prepareStatement(query);
			stmt.setString(1, a.getUsername());
			stmt.setString(2, a.getPassword());
			stmt.setString(3, a.getEmail());
			stmt.setString(4, a.getNumber());
			stmt.setString(5, a.getProvinceOfWork());
			stmt.setString(6, a.getAccountType());
			stmt.execute();
		}
		for(Area area: a.getAreasOfWork()) {
			//Database.getInstance().getAreaDao().save(area);
		}
		for(Review r : a.getReviews()) {
			//Database.getInstance().getReviewDao().save(r);
		}
	}

	@Override
	public void delete(Account a) throws SQLException {
		//COMPLETARE CON LE REFERENZE
		String query = "DELETE FROM account WHERE username = ?";
		PreparedStatement stmt = Database.getInstance().getConnection().prepareStatement(query);
		stmt.setString(1, a.getUsername());
		//MANCA UN UNTENTE IN ACCOUNT  OPPURE VICEVERSA
		//User user = Database.getInstance().getUserDao().findByPrimaryKey(a);
		//Database.getInstance().getAccountDao().delete();
		stmt.execute();
	}

	@Override
	public boolean exists(Account a) throws SQLException {
		String query = "SELECT username FROM account WHERE username = ?;";
		PreparedStatement stmt = Database.getInstance().getConnection().prepareStatement(query);
		stmt.setString(1, a.getUsername());
		return false;
	}

	@Override
	public boolean emailAlreadyUsed(String email) throws SQLException {
		String query = "select * from account where email = ?";
		PreparedStatement st = Database.getInstance().getConnection().prepareStatement(query);
		st.setString(1, email);
		return st.executeQuery().next();
	}

	@Override
	public boolean usernameAlreadyUsed(String username) throws SQLException {
		String query = "select * from account where username = ?";
		PreparedStatement st = Database.getInstance().getConnection().prepareStatement(query);
		st.setString(1, username);
		return st.executeQuery().next();
	}
}
