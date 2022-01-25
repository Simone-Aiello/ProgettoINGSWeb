package com.progetto.controller;

import java.sql.SQLException;
import java.util.List;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;

import com.progetto.model.Area;
import com.progetto.persistence.Database;

@Controller
public class AdvertisePublicationController {

	@GetMapping("/AdvertisePublication")
	public String startPublication(HttpServletRequest req, HttpServletResponse resp) {
		try {
			List<Area> areas = Database.getInstance().getAreaDao().findAll();
			req.setAttribute("areas", areas);
		} catch (SQLException e) {
			resp.setStatus(500);
			e.printStackTrace();
		}
		
		return "advertisePublication";
	}
}
