package com.progetto.persistence.daoConcrete;

import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.sql.Statement;
import java.util.ArrayList;
import java.util.List;

import com.progetto.model.Chat;
import com.progetto.model.Message;
import com.progetto.persistence.Database;
import com.progetto.persistence.daoInterfaces.ChatDao;

public class ChatDaoConcrete implements ChatDao{

	@Override
	public List<Chat> findAll() throws SQLException{
		List<Chat> chats  = new ArrayList<>();
		String query = "SELECT * FROM chat;";
		Statement stmt =  Database.getInstance().getConnection().createStatement();
		ResultSet rs = stmt.executeQuery(query);
		
		while(rs.next()) {
			Chat c = new Chat();
			c.setId(rs.getInt("id"));
			//Use proxy for all chats
			//c.setMessages(Database.getInstance().getMessageDao().findMessagesByChat(c));
		}
		return null;
	}

	@Override
	public Chat findByPrimaryKey(Long id) throws SQLException {
		String query = "SELECT * FROM chat WHERE id = ?;";
		PreparedStatement stmt = Database.getInstance().getConnection().prepareStatement(query);
		stmt.setLong(1, id);
		ResultSet rs = stmt.executeQuery();
		rs.next();
		Chat c = new Chat();
		c.setId(rs.getInt("id"));
		//do not use proxy for a single chat?
		//c.setMessages(Database.getInstance().getMessageDao().findMessagesByChat(c));
		
		return null;
	}

	@Override
	public void save(Chat c) throws SQLException {
		if(exists(c)) {
			String query = "UPDATE chat SET account_1 = ?, account_2 = ?";
			PreparedStatement stmt = Database.getInstance().getConnection().prepareStatement(query);
			stmt.setString(1, c.getA1().getUsername());
			stmt.setString(2, c.getA2().getUsername());
			stmt.execute();
			//c is a new chat and messages do not have an id
			for(Message m: c.getMessages()) {
				//m.setId(id);
			}
		}
		else {
			String query = "INSERT INTO chat(id, account_1, account_2) values(?, ?, ?)";
			PreparedStatement stmt = Database.getInstance().getConnection().prepareStatement(query);
			stmt.setLong(1, c.getId());
			stmt.setString(2, c.getA1().getUsername());
			stmt.setString(3, c.getA2().getUsername());
			stmt.execute();

		}
		for(Message m: c.getMessages()) {
			//Database.getInstance().getMessageDao().save(m);
		}
	}

	@Override
	public void delete(Chat c) throws SQLException {
		String query = "DELETE FROM chat WHERE id = ?";
		PreparedStatement stmt = Database.getInstance().getConnection().prepareStatement(query);
		stmt.setLong(1, c.getId());
		//Database.getInstance().getMessageDao().deleteMessagesByChat(c);
		stmt.execute();
	}

	@Override
	public boolean exists(Chat c) throws SQLException {
		String query = "SELECT id FROM chat WHERE id = ?;";
		PreparedStatement stmt = Database.getInstance().getConnection().prepareStatement(query);
		stmt.setLong(1, c.getId());
		return stmt.executeQuery().next();
	}

}
