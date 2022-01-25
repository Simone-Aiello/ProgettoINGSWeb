package com.progetto.controller;

import java.sql.SQLException;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import com.progetto.model.Account;
import com.progetto.model.Advertise;
import com.progetto.persistence.Database;

@RestController
public class AdvertisePublicationActionController {

	@PostMapping("saveAdvertise")
	public void saveAdvertise(@RequestBody Advertise advertise, HttpServletRequest req, HttpServletResponse resp) {
		String accountType = (String) req.getSession(false).getAttribute("loggedAccountType");
		if(!accountType.equals("u")){
		}	
		String username = (String) req.getSession(false).getAttribute("username");
		Account a = new Account();
		a.setUsername(username);
		advertise.setAccount(a);
		try {
			Database.getInstance().getAdvertiseDao().save(advertise);
		} catch (SQLException e) {
			resp.setStatus(500);
			e.printStackTrace();
		}
	}
}
