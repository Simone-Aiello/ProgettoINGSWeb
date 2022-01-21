package com.progetto.controller;

import java.sql.SQLException;
import java.util.List;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

import com.progetto.model.Area;
import com.progetto.persistence.Database;

@RestController
public class AreaControllerREST {
	
	@GetMapping("/areas")
	public List<Area> getAllAreas(){
			try {
				return Database.getInstance().getAreaDao().findAll();
			} catch (SQLException e) {
				e.printStackTrace();
			}
			return null;
	}
}
