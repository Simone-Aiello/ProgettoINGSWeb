package com.progetto.controller;

import java.sql.SQLException;
import java.util.List;

import javax.servlet.http.HttpServletRequest;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;

import com.progetto.model.Area;
import com.progetto.persistence.Database;

@Controller
public class AdministratorPageController {
	@GetMapping("/administratorAreasManager")
	public String getAdministratorAreasPage(HttpServletRequest req) {
		try {
			if(req.getSession().getAttribute("username") == null /*|| !req.getSession().getAttribute("accountType").equals("a")*/) {
				req.getSession().setAttribute("message", "Utente non loggato");
				return "genericInfoPage";
			}
			List<Area> areas = Database.getInstance().getAreaDao().findAll();
			req.setAttribute("areas", areas);
		} catch (SQLException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
		
		return "administratorAreasManager";
	}
	@GetMapping("/administratorProfilesManager")
	public String getAdministratorProfilesPage(HttpServletRequest req) {
		try {
			if(req.getSession().getAttribute("username") == null /*|| !req.getSession().getAttribute("accountType").equals("a")*/) {
				req.getSession().setAttribute("message", "Utente non loggato");
				return "genericInfoPage";
			}
			List<Area> areas = Database.getInstance().getAreaDao().findAll();
			req.setAttribute("areas", areas);
		} catch (SQLException e) {
			 //TODO Auto-generated catch block
			e.printStackTrace();
		}
		
		return "administratorProfilesManager";
	}
}
