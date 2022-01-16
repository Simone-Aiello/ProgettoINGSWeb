package com.progetto.controller;

import java.sql.SQLException;
import java.util.List;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestParam;

import com.progetto.model.Account;
import com.progetto.model.Chat;
import com.progetto.persistence.Database;

@Controller
public class ChatPageController {
	@GetMapping("/getChats")
	public String getChat(@RequestParam String username,HttpServletRequest req,HttpServletResponse resp) {
		try {
			System.out.println("Fare controllo per vedere se è loggato");
			Account a = new Account();
			a.setUsername(username);
			List<Chat> chats = Database.getInstance().getChatDao().findByAccount(a);
			req.setAttribute("chats", chats);
			req.setAttribute("username", username);
		} catch (SQLException e) {
			resp.setStatus(500);
			e.printStackTrace();
		}
		return "chatPage";
	}
}
