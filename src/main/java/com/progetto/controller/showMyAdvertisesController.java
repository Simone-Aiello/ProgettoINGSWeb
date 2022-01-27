package com.progetto.controller;

import java.sql.SQLException;
import java.util.List;

import javax.servlet.http.Cookie;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpSession;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.ResponseBody;

import com.progetto.model.Account;
import com.progetto.model.Advertise;
import com.progetto.persistence.Database;

@Controller
public class showMyAdvertisesController {
	
	@GetMapping("/showMyAdvertises")
	public String showMyAdvertises(HttpServletRequest req) {
		HttpSession session = req.getSession(false); 
		Account a = new Account();
		if(session != null)
				a.setUsername((String)session.getAttribute("username"));
		
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
	
	@PostMapping("/deleteAdvertise")
	@ResponseBody
	public void deleteAdvertise(HttpServletRequest req, @RequestBody Long advertiseID){
		HttpSession session = req.getSession(false); 
		Account a = new Account();
		if(session != null) {
			a.setUsername((String)session.getAttribute("username"));
			System.out.println(a.getUsername()+ " ha cancellato #" + advertiseID);
			Advertise add = new Advertise();
			add.setId(advertiseID);
			try {
				Database.getInstance().getAdvertiseDao().delete(add);
			} catch (SQLException e) {
				// TODO Auto-generated catch block
				e.printStackTrace();
			}
		}
	}
	
	
}
