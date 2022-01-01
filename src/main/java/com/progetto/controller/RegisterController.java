package com.progetto.controller;

import java.sql.SQLException;

import javax.servlet.http.HttpServletResponse;

import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import com.progetto.persistence.Database;

@RestController
public class RegisterController {
	
	@PostMapping("/usernameUnique")
	public boolean usernameUnique(@RequestBody String data,HttpServletResponse resp) {
		try {
			return !Database.getInstance().getAccountDao().usernameAlreadyUsed(data); 
		} catch (SQLException e) {
			resp.setStatus(500);
		}
		return false;
	}
	@PostMapping("/emailUnique")
	public boolean emailUnique(@RequestBody String email,HttpServletResponse resp) {
		try {
			return !Database.getInstance().getAccountDao().emailAlreadyUsed(email);
		} catch (SQLException e) {
			resp.setStatus(500);
		}
		return false;
	}
}
