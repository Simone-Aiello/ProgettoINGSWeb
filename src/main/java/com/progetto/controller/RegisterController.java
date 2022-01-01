package com.progetto.controller;

import java.io.IOException;
import java.sql.SQLException;

import javax.servlet.http.HttpServletResponse;

import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import com.progetto.model.Account;
import com.progetto.persistence.Database;

@RestController
public class RegisterController {
	@PostMapping("/registerWorker")
	public void registerWorker(@RequestBody Account account,HttpServletResponse resp) {
		if(account.getAccountType() != Account.WORKER) {
			try {
				resp.sendError(400);
			} catch (IOException e) {
				e.printStackTrace();
			}
		}
		else {
			//Fare qui la registrazione
		}
		System.out.println(account.getProfilePic().getValue().charAt(0));
	}
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
