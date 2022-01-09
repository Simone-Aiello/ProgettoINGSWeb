package com.progetto.controller;

import java.sql.SQLException;

import javax.servlet.http.HttpServletResponse;

import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import com.progetto.model.Area;
import com.progetto.persistence.Database;

@RestController
public class AdministratorActions {
	@PostMapping("/deleteArea")
	public void deleteArea(@RequestBody Area area, HttpServletResponse resp){
		//System.out.println(area.getId());
		//System.out.println(area.getIcon());
		//System.out.println(area.getName());
		try {
			Database.getInstance().getAreaDao().delete(area);
		} catch (SQLException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
		
	}
	@PostMapping("/modifyArea")
	public void modifyArea(@RequestBody Area area, HttpServletResponse resp){
		//System.out.println(area.getId());
		//System.out.println(area.getIcon());
		//System.out.println(area.getName());
		try {
			Database.getInstance().getAreaDao().save(area);
		} catch (SQLException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
	}
	@PostMapping("/createArea")
	public void createArea(@RequestBody Area area, HttpServletResponse resp){
		
		try {
			Database.getInstance().getAreaDao().save(area);
			
		} catch (SQLException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
		//System.out.println(area.getId());
		//System.out.println(area.getIcon());
		//System.out.println(area.getName());
	}
}
