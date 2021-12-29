package com.progetto.controller;

import java.sql.SQLException;

import javax.servlet.http.HttpServletResponse;

import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import com.progetto.persistence.Database;

@RestController
public class RegisterController {
	
	@PostMapping("/usernameAndEmailUnique")
	public boolean[] usernameAndEmailUnique(@RequestBody String[] data,HttpServletResponse resp) {
		try {
			boolean[] r = new boolean[2]; 
			r[0] = Database.getInstance().getAccountDao().usernameAlreadyUsed(data[0]);
			r[1] = Database.getInstance().getAccountDao().emailAlreadyUsed(data[1]);
			return r; 
		} catch (SQLException e) {
			resp.setStatus(500);
		}
		return null;
	}
}
