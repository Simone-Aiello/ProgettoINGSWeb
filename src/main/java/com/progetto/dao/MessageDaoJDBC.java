package com.progetto.dao;

import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.sql.Statement;
import java.sql.Timestamp;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;

import com.progetto.model.Chat;
import com.progetto.model.Message;

public class MessageDaoJDBC implements MessageDao{
	private Connection conn;
	
	public MessageDaoJDBC (Connection conn) {
		this.conn = conn;
	}
	
	@Override
	public List<Message> findAll() {
		List<Message> messaggi = new ArrayList<>();
		String query = "SELECT * FROM messaggi;";
		try {
			Statement stmt = conn.createStatement();
			ResultSet rs = stmt.executeQuery(query);
			while(rs.next()) {
				Message m= new Message();
				m.setId((long)rs.getInt("id"));
				Date d  = new Date(rs.getTimestamp("timestamp").getTime());
				//Timestamp t = new Timestamp(0);
				//t.get
				//m.setData(d);
				rs.getString("contenuto");

			}
		} catch (SQLException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
		
		return messaggi;
	}

	@Override
	public Chat findByPrimaryKey(Long id) {
		Chat chat = new Chat();
		String query ="SELECT * FROM messaggi WHERE id = ? ;";
		try {
			PreparedStatement stmt = conn.prepareStatement(query);
			stmt.setLong(1, id);
			ResultSet rs = stmt.executeQuery();
			rs.next();

			//chat.setDate(rs.getTimestamp("timestamp").getTime());
			
			
		} catch (SQLException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
		
		return chat;
	}

	@Override
	public boolean saveOrUpdate(Message m) {
		// TODO Auto-generated method stub
		return false;
	}

	@Override
	public boolean delete(Message m) {
		// TODO Auto-generated method stub
		return false;
	}

}
