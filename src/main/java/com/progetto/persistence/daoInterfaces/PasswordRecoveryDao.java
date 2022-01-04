package com.progetto.persistence.daoInterfaces;

import java.sql.SQLException;

public interface PasswordRecoveryDao {
	boolean insertCode(String email,String code) throws SQLException;
	String changePassword(String code,String email,String password) throws SQLException;
}
