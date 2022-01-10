package com.progetto.controller;

import java.io.File;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.sql.SQLException;
import java.util.Map;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.progetto.EmailSender;
import com.progetto.Utils;
import com.progetto.model.Account;
import com.progetto.model.NewAreaRequest;
import com.progetto.model.Notification;
import com.progetto.persistence.Database;

@RestController
public class RegisterUpdateWorkerControllerREST {

	@PostMapping("/registerWorker")
	public String registerWorker(@RequestBody Account account, HttpServletRequest req,HttpServletResponse resp) {
		try {
			throw new SQLException();
			// Faccio il set del tipo di account che voglio creare e salvo i dati
			//account.setAccountType("w");
			//Database.getInstance().getAccountDao().save(account);
			//return "/profilePage?username=" + account.getUsername();
		} catch (SQLException e) {
			resp.setStatus(500);
			e.printStackTrace();
		}
		return null;
	}

	@PostMapping("/usernameUnique")
	public boolean usernameUnique(@RequestBody String data, HttpServletResponse resp) {
		try {
			return !Database.getInstance().getAccountDao().usernameAlreadyUsed(data);
		} catch (SQLException e) {
			resp.setStatus(500);
			e.printStackTrace();
		}
		return false;
	}

	@PostMapping("/emailUnique")
	public boolean emailUnique(@RequestBody String email, HttpServletResponse resp) {
		try {
			return !Database.getInstance().getAccountDao().emailAlreadyUsed(email);
		} catch (SQLException e) {
			resp.setStatus(500);
			e.printStackTrace();
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

	@PostMapping("/updateWorker")
	public void updateWorker(@RequestBody Account account, HttpServletResponse resp) {
		System.out.println("Fare controllo se è loggato");
		try {
			Database.getInstance().getAccountDao().save(account);
		} catch (SQLException e) {
			resp.setStatus(500);
			e.printStackTrace();
		}
	}

	@PostMapping("/sendVerificationMail")
	public void resendVerificationMail(@RequestBody String username,HttpServletResponse resp) {
		System.out.println("Fare controllo se è loggato");
		try {
			Account a = Database.getInstance().getAccountDao().findByPrimaryKey(username, Utils.BASIC_INFO);
			EmailSender.getInstance().sendEmail(a.getEmail(), "Attivazione account GetJobs",
					"Clicca il seguente link per validare l'account http://localhost:8080/activateAccount?code="
							+ Database.getInstance().getAccountDao().getVerificationCode(username));
		} catch (SQLException e) {
			resp.setStatus(500);
			e.printStackTrace();
		}
	}
	@PostMapping("/newAreaRequest")
	public void newAreaRequest(@RequestBody NewAreaRequest request,HttpServletResponse resp) {
		try {
			Notification n = new Notification();
			n.setType("s");
			n.setText("Richiesta aggiunta ambito, nome: " + Utils.sanitizeXSS(request.getName()) + "\n descrizione: " + Utils.sanitizeXSS(request.getDescription()));
			Database.getInstance().getNotificationDao().save(n);
		} catch (SQLException e) {
			resp.setStatus(500);
			e.printStackTrace();
		}
	}
}
