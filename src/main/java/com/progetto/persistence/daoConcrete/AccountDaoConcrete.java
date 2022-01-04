package com.progetto.persistence.daoConcrete;

import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.sql.Statement;
import java.util.ArrayList;
import java.util.List;

import org.springframework.security.crypto.bcrypt.BCrypt;

import com.progetto.EmailSender;
import com.progetto.Utils;
import com.progetto.model.Account;
import com.progetto.model.Area;
import com.progetto.model.Image;
import com.progetto.model.Review;
import com.progetto.model.User;
import com.progetto.persistence.Database;
import com.progetto.persistence.daoInterfaces.AccountDao;

public class AccountDaoConcrete implements AccountDao {
	
	@Override
	public List<Account> findAll(int mode) throws SQLException {
		String query = "SELECT * FROM account;";
		Statement stmt = Database.getInstance().getConnection().createStatement();
		ResultSet rs = stmt.executeQuery(query);
		List<Account> accounts = new ArrayList<>();
		while (rs.next()) {
			Account a = new Account();
			a.setUsername(rs.getString("username"));
			a.setEmail(rs.getString("email"));
			accounts.add(a);
		}
		return accounts;
	}
	
	

	@Override
	public Account findByPrimaryKey(String username, int mode) throws SQLException {
		String query = "SELECT * FROM account WHERE username = ?;";
		PreparedStatement stmt = Database.getInstance().getConnection().prepareStatement(query);
		stmt.setString(1, username);
		ResultSet rs = stmt.executeQuery();

		Account a = null;
		if(rs.next()) {
			a = new Account();
			a.setUsername(rs.getString("username"));
			a.setEmail(rs.getString("email"));
			a.setValid(rs.getBoolean("account_valido"));
			if (mode != Utils.BASIC_INFO) {
				int next = mode == Utils.LIGHT ? Utils.BASIC_INFO : Utils.COMPLETE;
				String number = rs.getString("telefono");
				if(number != null) a.setNumber(number);
				a.setProvinceOfWork(rs.getString("provincia_lavoro"));
				User user = Database.getInstance().getUserDao().findByPrimarykey(rs.getLong("id_utente"), next);
				if(user != null) a.setPersonalInfo(user);
				if (mode != Utils.LIGHT) {
					//a.setPassword(rs.getString("password")); La password non la vogliamo mai indietro
					Image image = Database.getInstance().getImageDao().findByPrimaryKey(rs.getLong("immagine_profilo"));
					if(image != null) a.setProfilePic(image);
					a.setAccountType(rs.getString("tipo_account"));
					// if the account is a worker then he may work for some areas
					if (a.getAccountType().equals(Account.WORKER)) {
						List<Area> areas = Database.getInstance().getAreaDao().findByWorker(a);
						if(areas != null) a.setAreasOfWork(areas);
						List<Review> reviews = Database.getInstance().getReviewDao().findByWorker(a);
						if(reviews != null) a.setReviews(reviews);
					}
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
		String activationCode =  Utils.getAlphaNumericString(Utils.ACTIVATION_CODE_LENGHT);
		if (exists(a)) {
			// NON PENSO SIA GIUSTO
			String query = "UPDATE account SET password = ?, email = ?, telefono = ?, immagine_profilo = ?, provincia_lavoro = ?,  tipo_account  = ? WHERE username = ?;";
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
		} else {
			// Salvo l'user associato all'account e mi prendo l'id
			long userId = Database.getInstance().getUserDao().save(a.getPersonalInfo());
			// Salvo l'immagine associata all'account PER ORA NON SALVO NIENTE

			String query = "INSERT INTO account (username, password, email, telefono, immagine_profilo, provincia_lavoro, id_utente, tipo_account,codice_validazione_account)"
					+ " values(?, ?, ?, ?,null, ?, ?, cast(? as tipologia_account), ?);";
			PreparedStatement stmt = Database.getInstance().getConnection().prepareStatement(query);
			a.getPersonalInfo().setId(userId);
			stmt.setString(1, a.getUsername());
			stmt.setString(2, Utils.encryptPassword(a.getPassword()));
			stmt.setString(3, a.getEmail());
			stmt.setString(4, a.getNumber());
			stmt.setString(5, a.getProvinceOfWork());
			stmt.setLong(6, userId);
			stmt.setString(7, a.getAccountType());
			stmt.setString(8,activationCode);
			stmt.execute();
		}
		for (Area area : a.getAreasOfWork()) {
			Database.getInstance().getAreaDao().linkToAccount(area, a);
			// Database.getInstance().getAreaDao().save(area); Non devo salvare gli ambiti,
			// quelli sono già sul db, devo creare una tupla della relazione account_ambiti
		}
		// for(Review r : a.getReviews()) {
		// Database.getInstance().getReviewDao().save(r); Non le salvo mai nell'insert
		// dell'account
		// }
		EmailSender.getInstance().sendEmail(a.getEmail(), "Codice di attivazione account GetJobs", "http://localhost:8080/activateAccount?code="+activationCode);
	}

	@Override
	public void delete(Account a) throws SQLException {
		deleteAreaAssociations(a);
		// VA BENE ELIMINARE LE RECENSIONI? (NON ESISTERANNO PIU' PER IL CLIENTE)
		// DEVO ELIMINARE LE CHAT
		// DEVO ELIMINARE GLI ANNUNCI
		// DEVO ELIMINARE L'IMMAGINE DI PROFILO
		// DEVO ELIMINARE LE PROPOSTE
		// DEVO ELIMINARE LE NOTIFICHE
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

	private void deleteAreaAssociations(Account a) throws SQLException {
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
	public void validate(String code) throws SQLException {
		String validate = "update account set account_valido=true where codice_validazione_account = ?";
		PreparedStatement st = Database.getInstance().getConnection().prepareStatement(validate);
		st.setString(1, code);
		st.execute();
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

	@Override
	public void changePassword(String email, String password) throws SQLException {
		String query = "update account set password = ? where email = ?";
		PreparedStatement st = Database.getInstance().getConnection().prepareStatement(query);
		st.setString(1, Utils.encryptPassword(password));
		st.setString(2, email);
		st.executeUpdate();
	}
}
