package com.progetto.controller;

import java.sql.SQLException;
import java.util.List;

import javax.servlet.http.HttpServletRequest;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;

import com.progetto.model.Area;
import com.progetto.persistence.Database;

@Controller
public class AdvertisePublicationController {

	@GetMapping("/AdvertisePublication")
	public String startPublication(HttpServletRequest req) {
		try {
			if(req.getSession() == null || req.getSession().getAttribute("username")==null) {
				req.getSession().setAttribute("message", "Utente non loggato");
				return "genericInfoPage";
			}
			List<Area> areas = Database.getInstance().getAreaDao().findAll();
			req.setAttribute("areas", areas);
		} catch (SQLException e) {
			// TODO Auto-generated catch block
			System.out.println("ERROR");
			e.printStackTrace();
		}
		
		//System.out.println("STARTING PUBLICATION");
		return "advertisePublication";
	}
}
