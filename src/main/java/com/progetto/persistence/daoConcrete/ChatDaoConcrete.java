package com.progetto.persistence.daoConcrete;

import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.sql.Statement;
import java.sql.Timestamp;
import java.util.ArrayList;
import java.util.List;

import com.progetto.Utils;
import com.progetto.model.Account;
import com.progetto.model.Chat;
import com.progetto.model.Message;
import com.progetto.persistence.Database;
import com.progetto.persistence.daoInterfaces.ChatDao;

public class ChatDaoConcrete implements ChatDao{

	/*@Override
	public List<Chat> findAll() throws SQLException{
		List<Chat> chats  = new ArrayList<>();
		String query = "SELECT * FROM chat;";
		Statement stmt =  Database.getInstance().getConnection().createStatement();
		ResultSet rs = stmt.executeQuery(query);
		
		while(rs.next()) {
			Chat c = new Chat();
			c.setId(rs.getInt("id"));
			c.setMessages(Database.getInstance().getMessageDao().findMessagesByChat(c));
			chats.add(c);
		}
		return chats;
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
		c.setMessages(Database.getInstance().getMessageDao().findMessagesByChat(c));
		
		return null;
	}*/

	@Override
	public void save(Chat c) throws SQLException {
		if(exists(c)) {
			String query = "UPDATE chat SET account_1 = ?, account_2 = ?";
			PreparedStatement stmt = Database.getInstance().getConnection().prepareStatement(query);
			stmt.setString(1, c.getA1().getUsername());
			stmt.setString(2, c.getA2().getUsername());
			stmt.execute();
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
			Database.getInstance().getMessageDao().save(m, c);
		}
	}

	@Override
	public void delete(Chat c) throws SQLException {
		String query = "DELETE FROM chat WHERE id = ?";
		PreparedStatement stmt = Database.getInstance().getConnection().prepareStatement(query);
		stmt.setLong(1, c.getId());
		Database.getInstance().getMessageDao().deleteMessagesByChat(c);
		stmt.execute();
	}

	@Override
	public boolean exists(Chat c) throws SQLException {
		String query = "SELECT id FROM chat WHERE id = ?;";
		PreparedStatement stmt = Database.getInstance().getConnection().prepareStatement(query);
		stmt.setLong(1, c.getId());
		return stmt.executeQuery().next();
	}

	@Override
	public List<Chat> findByAccount(Account a) throws SQLException {
		List<Chat> chats = new ArrayList<Chat>();
		String query = "select * from chat where account_1 = ? or account_2 = ?";
		PreparedStatement st = Database.getInstance().getConnection().prepareStatement(query);
		st.setString(1, a.getUsername());
		st.setString(2, a.getUsername());
		ResultSet res = st.executeQuery();
		while(res.next()) {
			Chat c = new Chat();
			if(res.getLong("id") != 0) c.setId(res.getLong("id"));
			Account a1 = Database.getInstance().getAccountDao().findByPrimaryKey(res.getString("account_1"), Utils.BASIC_INFO);
			Account a2 = Database.getInstance().getAccountDao().findByPrimaryKey(res.getString("account_2"), Utils.BASIC_INFO);
			//Gestisce la simmetria della chat, se a1 ha una chat con a2 anche a2 la ha con a1
			if(a1.getUsername().equals(a.getUsername())) {
				c.setA1(a1);
				c.setA2(a2);
			}
			else {
				c.setA1(a2);
				c.setA2(a1);
			}
			chats.add(c);
		}
		return chats;
	}

	@Override
	public boolean isAnUserOfAChat(Chat c, Account a) throws SQLException {
		String query = "select * from chat where id = ? and (account_1 = ? or account_2 = ?)";
		PreparedStatement st = Database.getInstance().getConnection().prepareStatement(query);
		st.setLong(1, c.getId());
		st.setString(2, a.getUsername());
		st.setString(3, a.getUsername());
		ResultSet set = st.executeQuery();
		return set.next();
	}

	@Override
	public List<Chat> getOutdatedChats(Account a) throws SQLException {
		List<Chat> chats = new ArrayList<Chat>();
		String query = "select username_mittente, chat.id as chatId from chat inner join messaggi on chat.id = messaggi.id_chat where messaggi.letto = False and (chat.account_1 = ? or chat.account_2 = ?) and username_mittente != ?";
		PreparedStatement st = Database.getInstance().getConnection().prepareStatement(query);
		st.setString(1, a.getUsername());
		st.setString(2, a.getUsername());
		st.setString(3, a.getUsername());
		ResultSet set = st.executeQuery();
		while(set.next()) {
			Chat c = new Chat();
			Account acc = new Account();
			acc.setUsername(set.getString("username_mittente"));
			c.setA1(acc);
			c.setId(set.getLong("chatId"));
			chats.add(c);
		}
		return chats;
	}

}
