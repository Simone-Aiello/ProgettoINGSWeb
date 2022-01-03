package com.progetto.controller;



import java.sql.SQLException;

import javax.servlet.http.HttpServletResponse;

import org.springframework.security.crypto.bcrypt.BCrypt;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import com.progetto.Utils;
import com.progetto.model.Account;
import com.progetto.persistence.Database;

@RestController
public class loginServlet{
	
	String dbPassword = BCrypt.hashpw("giovanni123!", BCrypt.gensalt(6));
	
	@PostMapping("/login")
	public Account test(@RequestBody Account a, HttpServletResponse resp) {
		Account account = null;
		if(a.getEmail() == null) {
			try {
				account = Database.getInstance().getAccountDao().findByPrimaryKey(a.getUsername(), Utils.COMPLETE);	
			} catch (SQLException e) {
				resp.setStatus(204); // 204 : The server successfully processed the request, and is not returning any content.[
			}
		}else {
			try {
				account = Database.getInstance().getAccountDao().findByEmail(a.getUsername());
			} catch (SQLException e) {
				resp.setStatus(204);
			}
		}
		
		if(/*account == null || */!BCrypt.checkpw(a.getPassword(), dbPassword)) {
			resp.setStatus(204);
		}
		return account;
	}
	
	
}
