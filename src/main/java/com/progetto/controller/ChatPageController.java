package com.progetto.controller;

import java.sql.SQLException;
import java.util.List;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestParam;

import com.progetto.Utils;
import com.progetto.model.Account;
import com.progetto.model.Chat;
import com.progetto.persistence.Database;

@Controller
public class ChatPageController {
	@GetMapping("/getChats")
	public String getChat(HttpServletRequest req,HttpServletResponse resp) {
		try {
			if(req.getSession(false) != null && req.getSession(false).getAttribute("username") != null) {
				Account a = Database.getInstance().getAccountDao().findByPrimaryKey((String) req.getSession().getAttribute("username"), Utils.BASIC_INFO);
				List<Chat> chats = Database.getInstance().getChatDao().findByAccount(a);
				req.setAttribute("chats", chats);
				req.setAttribute("username", a.getUsername());				
			}
			else {
				req.setAttribute("message", "Effettuare il login per vedere le proprie chat");
				return "genericInfoPage";
			}
		} catch (SQLException e) {
			resp.setStatus(500);
			e.printStackTrace();
		}
		return "chatPage";
	}
}
