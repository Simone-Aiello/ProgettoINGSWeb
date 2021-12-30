package com.progetto.controller;

import java.io.IOException;
import java.io.PrintWriter;
import java.sql.SQLException;

import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.springframework.security.crypto.bcrypt.BCrypt;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RestController;

import com.progetto.Utils;
import com.progetto.model.Account;
import com.progetto.persistence.Database;

@RestController
public class loginServlet{
	
	String dbPassword = BCrypt.hashpw("giovanni123!", BCrypt.gensalt(6));
	
	@PostMapping("/login")
	public void doPost(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
		response.setContentType("text/html");
		PrintWriter out = response.getWriter();
		String username = request.getParameter("username");
		String password = request.getParameter("password");
		if(username.isEmpty() || password.isEmpty()) {
			//username or password empty
		    response.sendRedirect("/Login.html?error=empty_username_or_password_field");
			System.out.println("error password and username required");
		}else{
			//try {
				
				//Account account = Database.getInstance().getAccountDao().findByPrimaryKey(username, Utils.COMPLETE);
				//Aggiornare con criptazione a chiave asimmetrica
				//if(account != null && BCrypt.checkpw(password,account.getPassword())) {
				if(BCrypt.checkpw(password,dbPassword)){ //commentare questa e decommentare le altre per usare il dao
					//Redirect user to dashboard page ALL GOOD
					response.sendRedirect("/Dashboard.html");
				}else {
					//invalid username or password
					response.sendRedirect("/Login.html?error=invalid_password_or_username");
				}
				
			//} catch (SQLException e) {
				 //TODO Auto-generated catch block
			// 	 e.printStackTrace();
			//}
		}
		
		
		
		
		
	}
	
	
}
