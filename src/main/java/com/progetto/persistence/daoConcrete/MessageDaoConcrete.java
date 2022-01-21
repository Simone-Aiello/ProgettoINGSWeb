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
			m.setSender(rs.getString("username_mittente"));
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
		Timestamp t  = rs.getTimestamp("timestamp");
		DateTime dt = new DateTime(t.getTime());
		m.setId(rs.getInt("id"));
		m.setText(rs.getString("contenuto"));
		m.setMessageTime(dt);
		m.setSender(rs.getString("username_mittente"));
		return m;
	}

	@Override
	public void save(Message m) throws SQLException{
		if(exists(m)) {
			//Non penso modiicheremo mai un messaggio
			String query = "UPDATE messaggi SET timestamp = ?, contenuto = ? id_chat = ? WHERE id = ?";
			PreparedStatement stmt = Database.getInstance().getConnection().prepareStatement(query);
			stmt.setTimestamp(1, new Timestamp(m.getMessageTime().getMillis()));
			stmt.setString(2, m.getText());
			stmt.setLong(3, m.getIdChat());
			stmt.setLong(4, m.getId());
			stmt.execute();
		}
		else {
			System.out.println("Entro");
			String query = "INSERT INTO messaggi(timestamp, contenuto, id_chat, username_mittente) VALUES (?, ?, ?, ?);";
			PreparedStatement stmt = Database.getInstance().getConnection().prepareStatement(query);
			stmt.setTimestamp(1, new Timestamp(m.getMessageTime().getMillis()));
			stmt.setString(2, m.getText());			
			stmt.setLong(3, m.getIdChat());
			stmt.setString(4, m.getSender());
			stmt.execute();
		}
	}

	@Override
	public void delete(Message m) throws SQLException{
		//Non cancelleremo mai un messaggio
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
	public List<Message> findMessagesByChat(long chatId,String username) throws SQLException {
		//String query = "SELECT * FROM messaggi WHERE id_chat = ?;";
		//String query = "update messaggi set letto = True where id_chat = ? returning *";
		String query = "select * from leggimessaggi(cast(? as int4),?) order by t";
		PreparedStatement stmt = Database.getInstance().getConnection().prepareStatement(query);
		stmt.setLong(1, chatId);
		stmt.setString(2, username);
		ResultSet rs = stmt.executeQuery();
		List<Message> messages = new ArrayList<>();
		while(rs.next()) {
			Message m = new Message();
			Timestamp t  = rs.getTimestamp("t");
			DateTime dt = new DateTime(t.getTime());
			m.setMessageTime(dt);
			m.setText(rs.getString("contenuto"));
			m.setSender(rs.getString("username_mittente"));
			messages.add(m);
		}
		return messages;
	}

	@Override
	public void deleteMessagesByChat(Chat chat) throws SQLException {
		//Anche qua, non cancelleremo mai un messaggio
		String query = "DELETE FROM messaggi where id_chat = ?;";
		PreparedStatement stmt = Database.getInstance().getConnection().prepareStatement(query);
		stmt.setLong(1, chat.getId());
		stmt.execute();
	}

}
