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
	@GetMapping("/administratorPage")
	public String getAdministratorPage(HttpServletRequest req) {
		try {
			List<Area> areas = Database.getInstance().getAreaDao().findAll();
			req.setAttribute("areas", areas);
		} catch (SQLException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
		
		return "administratorPage";
	}
}
