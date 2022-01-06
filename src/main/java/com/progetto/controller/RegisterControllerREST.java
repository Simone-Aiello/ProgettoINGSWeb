package com.progetto.controller;

import java.io.File;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.sql.SQLException;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.progetto.Utils;
import com.progetto.model.Account;
import com.progetto.persistence.Database;

@RestController
public class RegisterControllerREST {
	
	@PostMapping("/registerWorker")
	public String registerWorker(@RequestBody Account account,HttpServletRequest req) {
		try {
			//Faccio il set del tipo di account che voglio creare e salvo i dati
			account.setAccountType("w");
			Database.getInstance().getAccountDao().save(account);
			return "/profilePage?username=" + account.getUsername();
		} catch (SQLException e) {
			e.printStackTrace();
		}
		return null;
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
			e.printStackTrace();
		}
	}
}
