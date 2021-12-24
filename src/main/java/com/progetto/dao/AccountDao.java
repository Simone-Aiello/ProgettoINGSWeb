package com.progetto.dao;

import java.util.List;

import com.progetto.model.Account;
import com.progetto.model.Chat;

public interface AccountDao {
	public List<Account> findAll();
	public Chat findByPrimaryKey(String username);
	public boolean saveOrUpdate(Account a);
	public boolean delete(Account a);
}
