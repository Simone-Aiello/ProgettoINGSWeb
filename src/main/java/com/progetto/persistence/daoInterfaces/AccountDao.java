package com.progetto.persistence.daoInterfaces;

import java.sql.SQLException;
import java.util.List;

import com.progetto.model.Account;
import com.progetto.model.Chat;

public interface AccountDao {
	public List<Account> findAll(int mode)throws SQLException;
	public Account findByPrimaryKey(String username,int mode)throws SQLException;
	public Account findByEmail(String username) throws SQLException;
	public void save(Account a)throws SQLException;
	public void delete(Account a)throws SQLException;
	public boolean exists(Account a)throws SQLException;
	public boolean isValid()throws SQLException;
	public void validate(String code)throws SQLException;
	public boolean usernameAlreadyUsed(String username) throws SQLException;
	public boolean emailAlreadyUsed(String email) throws SQLException;
	public void changePassword(String email,String password) throws SQLException;
}
