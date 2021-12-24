package com.progetto.dao;

import java.util.List;

import com.progetto.model.Chat;
import com.progetto.model.Message;

public interface MessageDao {
	public List<Message> findAll();
	public Chat findByPrimaryKey(Long id);
	public boolean saveOrUpdate(Message m);
	public boolean delete(Message m);
}
