package com.progetto.persistence.daoInterfaces;

import java.util.List;

import com.progetto.model.Chat;

public interface ChatDao {
	public List<Chat> findAll();
	public Chat findByPrimaryKey(Long id);
	public boolean save(Chat c);
	public boolean delete(Chat c);
}
