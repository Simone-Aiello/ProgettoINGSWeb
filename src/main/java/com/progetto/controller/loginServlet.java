package com.progetto.controller;



import java.sql.SQLException;

import javax.servlet.http.Cookie;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;

import org.springframework.security.crypto.bcrypt.BCrypt;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import com.progetto.Utils;
import com.progetto.model.Account;
import com.progetto.persistence.Database;

@RestController
public class loginServlet{
	
	@PostMapping("/login")
	public Account login(@RequestBody Account a, HttpServletResponse resp, HttpServletRequest req) {
		Account account = null;
		
		
		if(a.getEmail() == null) {
			try {
				account = Database.getInstance().getAccountDao().findByPrimaryKey(a.getUsername(), Utils.COMPLETE);	
			} catch (SQLException e) {
				resp.setStatus(204); // 204 : The server successfully processed the request, and is not returning any content.
			}
		}else {
			try {
				account = Database.getInstance().getAccountDao().findByEmail(a.getEmail());
				//System.out.println(account);
			} catch (SQLException e) {
				resp.setStatus(204);
			}
		}
		
		if(account == null || !BCrypt.checkpw(a.getPassword(), account.getPassword())) {
			resp.setStatus(204);
		}else {
			
			HttpSession session = req.getSession();
			req.getSession(true);
			session.setAttribute("username", a.getUsername());
			Cookie userName = new Cookie("user", a.getUsername());
			userName.setMaxAge(30*60);
			resp.addCookie(userName);
		}
		
		return account;
	}
	
	@GetMapping("/logout")
	public void doLogout(HttpServletRequest req) {
		HttpSession session=req.getSession(false); 
		if(session != null) {
			System.out.println(session.getAttribute("user"));
	        session.invalidate();  
	        System.out.println("logout");
		}
	}
	
	
	
}
