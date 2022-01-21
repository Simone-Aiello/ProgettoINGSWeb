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
	public String saveAdvertise(@RequestBody Advertise advertise, HttpServletRequest req, HttpServletResponse resp) {
		String username = (String) req.getSession().getAttribute("username");
		Account a = new Account();
		a.setUsername(username);
		advertise.setAccount(a);
		try {
			Database.getInstance().getAdvertiseDao().save(advertise);
			return "index.html";
		} catch (SQLException e) {
			resp.setStatus(500);
			e.printStackTrace();
		}
		return null;
	}
}
