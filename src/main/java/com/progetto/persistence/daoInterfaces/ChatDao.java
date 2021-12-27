package com.progetto.persistence.daoInterfaces;

import java.sql.SQLException;
import java.util.List;

import com.progetto.model.Chat;

public interface ChatDao {
	public List<Chat> findAll()throws SQLException;
	public Chat findByPrimaryKey(Long id)throws SQLException;
	public void save(Chat c)throws SQLException;
	public void delete(Chat c)throws SQLException;
	public boolean exists(Chat c)throws SQLException;

}
