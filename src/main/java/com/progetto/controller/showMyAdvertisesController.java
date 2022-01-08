package com.progetto.controller;

import java.sql.SQLException;
import java.util.List;

import javax.servlet.http.HttpServletRequest;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;

import com.progetto.model.Account;
import com.progetto.model.Advertise;
import com.progetto.persistence.Database;

@Controller
public class showMyAdvertisesController {
	
	@GetMapping("/showMyAdvertises")
	public String showMyAdvertises(HttpServletRequest req) {
		Account a = new Account();
		a.setUsername("aaaa");
		List<Advertise> advertises = null;
		
		try {
			advertises = Database.getInstance().getAdvertiseDao().findAdvertisesByUsername(a.getUsername());
		} catch (SQLException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
		req.setAttribute("advertises", advertises);
		return "showMyAdvertises";
	}
}
