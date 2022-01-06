package com.progetto.controller;

import java.sql.SQLException;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import com.progetto.EmailSender;
import com.progetto.Utils;
import com.progetto.persistence.Database;


@RestController
public class PasswordRecoveryController {
	
	@PostMapping("/sendVerifyCode")
	public void startResetPassword(@RequestBody String email,HttpServletResponse resp) {
		String code = Utils.getAlphaNumericString(Utils.ACTIVATION_CODE_LENGHT);
		try {
			if(Database.getInstance().getPasswordRecoveryDao().insertCode(email, code)) {
				EmailSender.getInstance().sendEmail(email, "Recupero password", "Codice per il recupero password: " + code);				
			}
		} catch (SQLException e) {
			resp.setStatus(500);
		}
	}
	
	@PostMapping("/resetPassword")
	public String resetPassword(@RequestBody String[] data,HttpServletResponse resp) {
		//I dati arrivano nel formato [codice,mail,nuovapassword]
		try {
			return Database.getInstance().getPasswordRecoveryDao().changePassword(data[0], data[1], data[2]);
		} catch (SQLException e) {
			resp.setStatus(500);
			return null;
		}
	}
}
