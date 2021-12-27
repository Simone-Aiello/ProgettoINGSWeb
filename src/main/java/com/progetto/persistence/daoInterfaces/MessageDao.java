package com.progetto.persistence.daoInterfaces;

import java.sql.SQLException;
import java.util.List;

import com.progetto.model.Chat;
import com.progetto.model.Message;

public interface MessageDao {
	public List<Message> findAll() throws SQLException;
	public Message findByPrimaryKey(Long id) throws SQLException;
	public void save(Message m) throws SQLException;
	public void delete(Message m) throws SQLException;
	public boolean exists(Message m)throws SQLException;
	public List<Message> findMessagesByChat(Chat chat) throws SQLException;
	public void deleteMessagesByChat(Chat chat)throws SQLException;
}
