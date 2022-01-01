package com.progetto.persistence.daoInterfaces;

import java.sql.SQLException;
import java.util.List;

import com.progetto.model.Account;
import com.progetto.model.User;

public interface UserDao {
	public User findByPrimarykey(long id,int next) throws SQLException;
	public void deleteByAccount(Account a)throws SQLException;
	public long save(User u) throws SQLException;
	public void delete(User u) throws SQLException;
	public List<User> findAll() throws SQLException;
	public boolean exists(User u) throws SQLException;
}
