package com.progetto.persistence.daoInterfaces;

import java.sql.SQLException;
import java.sql.Timestamp;
import java.util.List;

import com.progetto.model.Account;
import com.progetto.model.Chat;

public interface ChatDao {
	/*public List<Chat> findAll()throws SQLException;
	public Chat findByPrimaryKey(Long id)throws SQLException;*/
	public void save(Chat c)throws SQLException;
	public void delete(Chat c)throws SQLException;
	public boolean exists(Chat c)throws SQLException;
	public List<Chat> findByAccount(Account a) throws SQLException;
	public List<Chat> getOutdatedChats(Account a) throws SQLException;
	public boolean isAnUserOfAChat(Chat c,Account a) throws SQLException;
}
