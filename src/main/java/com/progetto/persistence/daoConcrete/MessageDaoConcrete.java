package com.progetto.persistence.daoConcrete;

import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.sql.Statement;
import java.sql.Timestamp;
import java.util.ArrayList;
import java.util.List;

import org.joda.time.DateTime;

import com.progetto.model.Chat;
import com.progetto.model.Message;
import com.progetto.persistence.Database;
import com.progetto.persistence.daoInterfaces.MessageDao;

public class MessageDaoConcrete implements MessageDao{
	public MessageDaoConcrete () {}
	
	@Override
	public List<Message> findAll() throws SQLException{
		List<Message> messaggi = new ArrayList<>();
		String query = "SELECT * FROM messaggi;";
		Statement stmt = Database.getInstance().getConnection().createStatement();
		ResultSet rs = stmt.executeQuery(query);
		while(rs.next()) {
			Message m= new Message();
			m.setId((long)rs.getInt("id"));
			//converting from timestamp to DateTime
			Timestamp t  = rs.getTimestamp("timestamp");
			DateTime dt = new DateTime(t.getTime());
			m.setMessageTime(dt);
			m.setText(rs.getString("contenuto"));
			messaggi.add(m);
		}
		return messaggi;
	}

	@Override
	public Message findByPrimaryKey(Long id) throws SQLException{
		String query ="SELECT * FROM messaggi WHERE id = ? ;";
		
		PreparedStatement stmt = Database.getInstance().getConnection().prepareStatement(query);
		stmt.setLong(1, id);
		ResultSet rs = stmt.executeQuery();
		rs.next();
		Message m = new Message();
		m.setId(rs.getInt("id"));
		m.setText(rs.getString("contenuto"));
		Timestamp t  = rs.getTimestamp("timestamp");
		DateTime dt = new DateTime(t.getTime());
		m.setMessageTime(dt);
		return null;
	}

	@Override
	public void save(Message m, Chat c) throws SQLException{
		
		if(exists(m)) {
			String query = "UPDATE messaggi SET timestamp = ?, contenuto = ? id_chat = ? WHERE id = ?";
			PreparedStatement stmt = Database.getInstance().getConnection().prepareStatement(query);
			stmt.setTimestamp(1, new Timestamp(m.getMessageTime().getMillis()));
			stmt.setString(2, m.getText());
			stmt.setLong(3, c.getId());
			stmt.setLong(4, m.getId());
			stmt.execute();
		}
		else {
			String query = "INSERT INTO messaggi(id, timestamp, contenuto, id_chat) VALUES (null, ?, ?, ?);";
			PreparedStatement stmt = Database.getInstance().getConnection().prepareStatement(query);
			stmt.setTimestamp(2, new Timestamp(m.getMessageTime().getMillis()));
			stmt.setString(3, m.getText());			
			stmt.setLong(4, c.getId());
			stmt.execute();
		}
	}

	@Override
	public void delete(Message m) throws SQLException{
		String query =  "DELETE FROM messaggi WHERE id = ?;";
		PreparedStatement stmt = Database.getInstance().getConnection().prepareStatement(query);
		stmt.setLong(1, m.getId());
		stmt.execute();
	}

	@Override
	public boolean exists(Message m) throws SQLException {
		String query =  "SELECT * FROM messaggi WHERE id = ?;";
		PreparedStatement stmt = Database.getInstance().getConnection().prepareStatement(query);
		stmt.setLong(1, m.getId());
		return stmt.executeQuery().next();
	}

	@Override
	public List<Message> findMessagesByChat(Chat chat) throws SQLException {
		String query = "SELECT * FROM messaggi WHERE id_chat = ?;";
		PreparedStatement stmt = Database.getInstance().getConnection().prepareStatement(query);
		stmt.setLong(1, chat.getId());
		ResultSet rs = stmt.executeQuery();
		List<Message> messages = new ArrayList<>();
		while(rs.next()) {
			Message m = new Message();
			m.setId(rs.getInt("id"));
			Timestamp t  = rs.getTimestamp("timestamp");
			DateTime dt = new DateTime(t.getTime());
			m.setMessageTime(dt);
			m.setText(rs.getString("contenuto"));
			messages.add(m);
		}
		return messages;
	}

	@Override
	public void deleteMessagesByChat(Chat chat) throws SQLException {
		String query = "DELETE FROM messaggi where id_chat = ?;";
		PreparedStatement stmt = Database.getInstance().getConnection().prepareStatement(query);
		stmt.setLong(1, chat.getId());
		stmt.execute();
	}

}
