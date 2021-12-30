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
	public List<Account> findAll(int mode) throws SQLException {
		String query = "SELECT * FROM account;";
		Statement stmt = Database.getInstance().getConnection().createStatement();
		ResultSet rs = stmt.executeQuery(query);
		List<Account> accounts = new ArrayList<>();
		while(rs.next()) {
			Account a = new Account();
			a.setUsername(rs.getString("username"));
			a.setEmail(rs.getString("email"));
			accounts.add(a);
		}
		return accounts;
	}

	@Override
	public Account findByPrimaryKey(String username,int mode) throws SQLException {
		String query = "SELECT * FROM account WHERE username = ?;";
		PreparedStatement stmt = Database.getInstance().getConnection().prepareStatement(query);
		stmt.setString(1, username);
		ResultSet rs = stmt.executeQuery(query);
		Account a = new Account();
		if(rs.next()) {
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
					//if the account is a worker then he may work for some areas
					if(a.getAccountType().equals(Account.WORKER)) {
						a.setAreasOfWork(Database.getInstance().getAreaDao().findByWorker(a));
						a.setReviews(Database.getInstance().getReviewDao().findByWorker(a));
					}
				}
			}
		}
		return a;
	}

	@Override
	public void save(Account a) throws SQLException {
		if(exists(a)) {
			String query ="UPDATE account SET password = ?, email = ?, telefono = ?, immagine_profilo = ?, provincia_lavoro = ?,  tipo_account  = ? WHERE username = ?;";
			PreparedStatement stmt = Database.getInstance().getConnection().prepareStatement(query);
			long id = Database.getInstance().getImageDao().save(a.getProfilePic());
			a.getProfilePic().setId(id);
			stmt.setString(1, a.getPassword());
			stmt.setString(2, a.getEmail());
			stmt.setString(3, a.getNumber());
			stmt.setLong(4, a.getProfilePic().getId());
			stmt.setString(5, a.getProvinceOfWork());
			stmt.setString(6, a.getAccountType());
			stmt.setString(7, a.getUsername());
			stmt.execute();
		}
		else {
			String query = "INSERT INTO account (username, password, email, telefono, immagine_profilo, provincia_lavoro, id_utente, tipo_account)"
					+ " values(?, ?, ?, ?, ?, ?, ?);";
			PreparedStatement stmt  =  Database.getInstance().getConnection().prepareStatement(query);
			long id= Database.getInstance().getUserDao().save(a.getPersonalInfo());
			a.getPersonalInfo().setId(id);
			stmt.setString(1, a.getUsername());
			stmt.setString(2, a.getPassword());
			stmt.setString(3, a.getEmail());
			stmt.setString(4, a.getNumber());
			stmt.setString(5, a.getProvinceOfWork());
			stmt.setLong(6, a.getPersonalInfo().getId());
			stmt.setString(7, a.getAccountType());
			stmt.execute();
		}
		for(Area area: a.getAreasOfWork()) {
			Database.getInstance().getAreaDao().save(area);
		}
		for(Review r : a.getReviews()) {
			Database.getInstance().getReviewDao().save(r);
		}
	}
	
	//TODO
	@Override
	public void delete(Account a) throws SQLException {
		deleteAreaAssociations(a);
		//VA BENE ELIMINARE LE RECENSIONI? (NON ESISTERANNO PIU' PER IL CLIENTE)
		//DEVO ELIMINARE LE CHAT
		//DEVO ELIMINARE GLI ANNUNCI
		//DEVO ELIMINARE L'IMMAGINE DI PROFILO
		//DEVO ELIMINARE LE PROPOSTE
		//DEVO ELIMINARE LE NOTIFICHE
		Database.getInstance().getReviewDao().deleteByWorker(a);
		String query = "DELETE FROM account WHERE username = ?";
		PreparedStatement stmt = Database.getInstance().getConnection().prepareStatement(query);
		stmt.setString(1, a.getUsername());
		Database.getInstance().getUserDao().deleteByAccount(a);
		stmt.execute();
	}

	@Override
	public boolean exists(Account a) throws SQLException {
		String query = "SELECT username FROM account WHERE username = ?;";
		PreparedStatement stmt = Database.getInstance().getConnection().prepareStatement(query);
		stmt.setString(1, a.getUsername());
		return false;
	}
	
	private void  deleteAreaAssociations(Account a) throws SQLException{
		String query = "DELETE FROM account_ambiti WHERE username_account = ?;";
		PreparedStatement stmt = Database.getInstance().getConnection().prepareStatement(query);
		stmt.setString(1, a.getUsername());
		stmt.execute();
	}

	@Override
	public boolean isValid() throws SQLException {
		// TODO Auto-generated method stub
		return false;
	}

	@Override
	public void validate() throws SQLException {
		// TODO Auto-generated method stub
		
	}
}
