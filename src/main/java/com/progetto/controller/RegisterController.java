package com.progetto.controller;

import java.sql.SQLException;

import javax.servlet.http.HttpServletResponse;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.progetto.EmailSender;
import com.progetto.model.Account;
import com.progetto.persistence.Database;

@RestController
public class RegisterController {
	@PostMapping("/registerWorker")
	public void registerWorker(@RequestBody Account account,HttpServletResponse resp) {
		try {
			account.setAccountType("w");
			Database.getInstance().getAccountDao().save(account);
		} catch (SQLException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
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
	@GetMapping("/activateAccount")
	public void activateAccount(@RequestParam("code") String code) {
		try {
			Database.getInstance().getAccountDao().validate(code);
		} catch (SQLException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
	}
}
