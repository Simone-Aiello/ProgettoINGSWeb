package com.progetto.controller;

import java.sql.SQLException;
import java.sql.Timestamp;
import java.util.List;

import javax.servlet.http.Cookie;
import javax.servlet.http.HttpServletResponse;

import org.joda.time.DateTime;
import org.springframework.web.bind.annotation.CookieValue;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.progetto.model.Account;
import com.progetto.model.Chat;
import com.progetto.model.Message;
import com.progetto.persistence.Database;

@RestController
public class ChatControllerREST {
	@GetMapping("/getMessages")
	public List<Message> getMessages(@RequestParam("id") long id,@RequestParam("username") String username, HttpServletResponse resp) {
		try {
			System.out.println(
					"Controllare se l'utente che richiede la chat è loggato ed è uno dei due partecipanti della chat");
			List<Message> messages = Database.getInstance().getMessageDao().findMessagesByChat(id,username);
			return messages;
		} catch (SQLException e) {
			e.printStackTrace();
			resp.setStatus(500);
			return null;
		}
	}

	@GetMapping("/checkForNewMessages")
	public List<Chat> checkForNewMessages(@RequestParam String username,HttpServletResponse resp) {
		try {
			List<Chat> outdatedChats = null;
			Account a = new Account();
			a.setUsername(username);
			outdatedChats = Database.getInstance().getChatDao().getOutdatedChats(a);
			DateTime now = new DateTime();
			Timestamp timestamp = new Timestamp(now.getMillis());
			Cookie c = new Cookie("lastUpdate", timestamp.toString().replace(" ", "T"));
			resp.addCookie(c);
			return outdatedChats;
		} catch (SQLException e) {
			e.printStackTrace();
			return null;
		}
	}

	@PostMapping("/sendMessage")
	public Message sendMessage(@RequestBody Message message, HttpServletResponse resp) {
		try {
			System.out.println("Fare controllo se il sender è loggato");
			Chat c = new Chat();
			Account a = new Account();
			a.setUsername(message.getSender());
			c.setId(message.getIdChat());
			if (Database.getInstance().getChatDao().isAnUserOfAChat(c, a)) {
				DateTime t = new DateTime();
				message.setMessageTime(t);
				Database.getInstance().getMessageDao().save(message);
				return message;
			}
			return null;
		} catch (SQLException e) {
			resp.setStatus(500);
			e.printStackTrace();
			return null;
		}
	}
	
	@PostMapping("/startChat")
	public void startNewChat(@RequestBody Chat c, HttpServletResponse resp) {
		try {
			for(Message m : c.getMessages()) {
				DateTime t = new DateTime();
				m.setMessageTime(t);
			}
			Database.getInstance().getChatDao().save(c);
		} catch (SQLException e) {
			resp.setStatus(500);
			e.printStackTrace();
		}
	}
}
