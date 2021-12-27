package com.progetto.persistence.daoInterfaces;

import java.sql.SQLException;
import java.util.List;

import com.progetto.model.Account;
import com.progetto.model.Chat;

public interface AccountDao {
	public List<Account> findAll()throws SQLException;
	public Account findByPrimaryKey(String username,int mode)throws SQLException;
	public void save(Account a)throws SQLException;
	public void delete(Account a)throws SQLException;
	public boolean exists(Account a)throws SQLException;
}
