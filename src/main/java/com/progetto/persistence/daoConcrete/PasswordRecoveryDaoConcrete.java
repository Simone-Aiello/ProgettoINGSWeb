package com.progetto.persistence.daoConcrete;

import java.sql.PreparedStatement;
import java.sql.SQLException;

import com.progetto.persistence.Database;
import com.progetto.persistence.daoInterfaces.PasswordRecoveryDao;

public class PasswordRecoveryDaoConcrete implements PasswordRecoveryDao{

	@Override
	public boolean insertCode(String email, String code) throws SQLException {
		if(Database.getInstance().getAccountDao().emailAlreadyUsed(email)) {
			//Se mi viene richiesto un nuovo codice elimino quelli vecchi e ne inserisco uno nuovo
			removeCode(email);
			String query = "insert into recupero_password values(?,?);";
			PreparedStatement st = Database.getInstance().getConnection().prepareStatement(query);
			st.setString(1, email);
			st.setString(2, code);
			return st.execute();
		}
		return false;
	}
	private boolean existsRow(String code,String email) throws SQLException {
		String query = "select * from recupero_password where email_account = ? and codice = ?";
		PreparedStatement st = Database.getInstance().getConnection().prepareStatement(query);
		st.setString(1, email);
		st.setString(2,code);
		return st.executeQuery().next();
	}
	private void removeCode(String email) throws SQLException {
		String query = "delete from recupero_password where email_account = ?";
		PreparedStatement st = Database.getInstance().getConnection().prepareStatement(query);
		st.setString(1, email);
		st.execute();
	}
	@Override
	public String changePassword(String code, String email, String password) throws SQLException {
		if(Database.getInstance().getAccountDao().emailAlreadyUsed(email)) {
			if(existsRow(code, email)) {
				Database.getInstance().getAccountDao().changePassword(email, password);
				removeCode(email);
				return "ok";	
			}
			else {
				return "Codice non valido";
			}
		}
		return "Non esiste un account con questa email";
	}

}
