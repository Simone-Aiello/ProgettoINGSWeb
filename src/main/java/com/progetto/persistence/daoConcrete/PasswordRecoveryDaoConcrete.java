package com.progetto.persistence.daoConcrete;

import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;


import com.progetto.persistence.Database;
import com.progetto.persistence.daoInterfaces.PasswordRecoveryDao;

public class PasswordRecoveryDaoConcrete implements PasswordRecoveryDao{

	@Override
	public boolean insertCode(String email, String code) throws SQLException {
		//Vedo se la mail inserita esiste
		if(Database.getInstance().getAccountDao().emailAlreadyUsed(email)) {
			//Se mi viene richiesto un nuovo codice elimino quelli vecchi e ne inserisco uno nuovo
			removeCode(email);
			String query = "insert into recupero_password values(?,?);";
			PreparedStatement st = Database.getInstance().getConnection().prepareStatement(query);
			st.setString(1, email);
			st.setString(2, code);
			st.execute();
			return true;
		}
		return false;
	}
	private boolean existsRow(String code,String email) throws SQLException {
		String query = "select * from recupero_password where email_account = ? and codice = ?";
		PreparedStatement st = Database.getInstance().getConnection().prepareStatement(query);
		st.setString(1, email);
		st.setString(2,code);
		ResultSet res = st.executeQuery();
		if(res.next()) {
			return true;
		}
		return false;
	}
	private void removeCode(String email) throws SQLException {
		String query = "delete from recupero_password where email_account = ?";
		PreparedStatement st = Database.getInstance().getConnection().prepareStatement(query);
		st.setString(1, email);
		st.execute();
	}
	@Override
	public String changePassword(String code, String email, String password) throws SQLException {
		//Se esiste una mail uguale a quella inserita dal client ed esista una tupla email-codice nel db allora cambio la password ed elimino il codice appena usato
		if(Database.getInstance().getAccountDao().emailAlreadyUsed(email)) {
			if(existsRow(code, email)) {
				//Posso passare la mail perché nel database è unique
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
