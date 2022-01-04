package com.progetto.controller;

import java.sql.SQLException;

import javax.servlet.http.HttpServletRequest;

import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import com.progetto.EmailSender;
import com.progetto.Utils;
import com.progetto.persistence.Database;


@RestController
public class PasswordRecoveryController {
	
	@PostMapping("/sendVerifyCode")
	public void startResetPassword(@RequestBody String email,HttpServletRequest req) {
		String code = Utils.getAlphaNumericString(Utils.ACTIVATION_CODE_LENGHT);
		try {
			if(Database.getInstance().getPasswordRecoveryDao().insertCode(email, code)) {
				EmailSender.getInstance().sendEmail(email, "Recupero password", "Codice per il recupero password:" + code);				
			}
		} catch (SQLException e) {
			e.printStackTrace();
		}
	}
	
	@PostMapping("/resetPassword")
	public String resetPassword(@RequestBody String email, @RequestBody String code,@RequestBody String newPassword) {
		try {
			return Database.getInstance().getPasswordRecoveryDao().changePassword(code, email, newPassword);
		} catch (SQLException e) {
			return "Server error";
		}
	}
}
