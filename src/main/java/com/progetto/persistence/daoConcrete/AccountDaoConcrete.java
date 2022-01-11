package com.progetto.persistence.daoConcrete;

import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.sql.Statement;
import java.util.ArrayList;
import java.util.List;

import org.apache.commons.lang3.StringUtils;
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
				if(a.getProvinceOfWork() != null) a.setProvinceOfWork(rs.getString("provincia_lavoro"));
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
						List<Review> reviews = Database.getInstance().getReviewDao().findByWorker(a,Utils.INITIAL_REVIEW_NUMBER,0);
						if(reviews != null) {
							a.setReviews(reviews);
						}
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
	private long getProfilePictureId(String username) throws SQLException {
		String query = "select immagine_profilo as id from account where username = ?";
		PreparedStatement st = Database.getInstance().getConnection().prepareStatement(query);
		st.setString(1, username);
		ResultSet set = st.executeQuery();
		if(set.next()) {
			return set.getLong("id");
		}
		return 0;
	}
	private long getUserId(String username) throws SQLException{
		String query = "select id_utente as id from account where username = ?";
		PreparedStatement st = Database.getInstance().getConnection().prepareStatement(query);
		st.setString(1, username);
		ResultSet set = st.executeQuery();
		set.next();
		return set.getLong("id");
	}
	private void resetPhoto(Account a) throws SQLException{
		long idCurrentPic = getProfilePictureId(a.getUsername());
		String nullifyProPicQuery = "update account set immagine_profilo = null where username = ?";
		PreparedStatement st = Database.getInstance().getConnection().prepareStatement(nullifyProPicQuery);
		st.setString(1, a.getUsername());
		st.execute();
		Database.getInstance().getImageDao().delete(idCurrentPic);
	}
	@Override
	public void save(Account a) throws SQLException {
		String activationCode =  Utils.getAlphaNumericString(Utils.ACTIVATION_CODE_LENGHT);
		if (exists(a)) {
			List<String> clauses = new ArrayList<String>();
			List<Object> values = new ArrayList<Object>();
			if(a.getNumber() != null) {
				clauses.add("telefono = ?");
				values.add(a.getNumber());
			}
			if(a.getProvinceOfWork() != null) {
				clauses.add("provincia_lavoro = ?");
				values.add(a.getProvinceOfWork());
			}
			if(a.getProfilePic() != null && a.getProfilePic().getValue() != null) {
				//Se la foto ha un valore vedo se l'utente ne ha già inserita una
				Long idPicture = getProfilePictureId(a.getUsername());
				//Se mi viene rischiesta la foto di default resetto il campo
				if(a.getProfilePic().getValue().equals("default")) {
					resetPhoto(a);
				}
				else if(idPicture != 0) {
					//L'utente ha già inserito una foto, chiamo il save che mi va ad aggiornare il campo value
					a.getProfilePic().setId(idPicture);
					Database.getInstance().getImageDao().save(a.getProfilePic());
				}
				else {
					//L'utente non ha una foto, salvo prima la foto e poi faccio l'update del campo
					long idNewPicture = Database.getInstance().getImageDao().save(a.getProfilePic());
					clauses.add("immagine_profilo = ?");
					values.add(idNewPicture);					
				}
			}
			if(a.getPersonalInfo() != null) {
				long idUser = getUserId(a.getUsername());
				a.getPersonalInfo().setId(idUser);
				Database.getInstance().getUserDao().save(a.getPersonalInfo());
			}
			if(a.getAreasOfWork() != null && a.getAreasOfWork().size() > 0) {
				Database.getInstance().getAreaDao().deleteLinkByAccount(a);
				for(Area area : a.getAreasOfWork()) {
					Database.getInstance().getAreaDao().linkToAccount(area, a);
				}
			}
			String query = "UPDATE account SET " + StringUtils.join(clauses,", ") + " where username = ?";
			values.add(a.getUsername());
			PreparedStatement st = Database.getInstance().getConnection().prepareStatement(query);
			for(int i = 0; i < values.size();i++) {
				st.setObject(i+1, values.get(i));
			}
			st.executeUpdate();
		} else {
			// Salvo l'user associato all'account e mi prendo l'id
			long userId = Database.getInstance().getUserDao().save(a.getPersonalInfo());
			// Salvo l'immagine associata all'account
			long imageId = Database.getInstance().getImageDao().save(a.getProfilePic());
			String query = "INSERT INTO account (username, password, email, telefono, immagine_profilo, provincia_lavoro, id_utente, tipo_account,codice_validazione_account)"
					+ " values(?, ?, ?, ?, ?, ?, ?, cast(? as tipologia_account), ?);";
			PreparedStatement stmt = Database.getInstance().getConnection().prepareStatement(query);
			a.getPersonalInfo().setId(userId);
			stmt.setString(1, a.getUsername());
			stmt.setString(2, Utils.encryptPassword(a.getPassword()));
			stmt.setString(3, a.getEmail());
			stmt.setString(4, a.getNumber());
			stmt.setObject(5,imageId == 0 ? null : imageId);
			stmt.setObject(6, a.getProvinceOfWork());
			stmt.setLong(7, userId);
			stmt.setString(8, a.getAccountType());
			stmt.setString(9,activationCode);
			stmt.execute();
			if(a.getAccountType() == Account.WORKER) {
				for (Area area : a.getAreasOfWork()) {
					Database.getInstance().getAreaDao().linkToAccount(area, a);
				}				
			}
			EmailSender.getInstance().sendEmail(a.getEmail(), "Codice di attivazione account GetJobs", "http://localhost:8080/activateAccount?code="+activationCode);
		}
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
		return stmt.executeQuery().next();
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



	@Override
	public List<Account> findWorkersByProvince(String province) throws SQLException {
		//add control that the account is a worker? not needed  with trigger
		String query = "SELECT username FROM account WHERE provincia_lavoro = ?;";
		PreparedStatement stmt = Database.getInstance().getConnection().prepareStatement(query);
		stmt.setString(1, province);
		ResultSet rs = stmt.executeQuery();
		List<Account> workers= new ArrayList<>();
		while(rs.next()) {
			Account w= new Account();
			w.setUsername(rs.getString("username"));
			w.setAreasOfWork(Database.getInstance().getAreaDao().findByWorker(w));
			workers.add(w);
		}
		return workers;
	}

	public String getVerificationCode(String username) throws SQLException {
		String query = "select codice_validazione_account from account where username = ?";
		PreparedStatement st = Database.getInstance().getConnection().prepareStatement(query);
		st.setString(1, username);
		ResultSet set = st.executeQuery();
		if(set.next()) {
			return set.getString("codice_validazione_account");
		}
		return null;
	}
}
