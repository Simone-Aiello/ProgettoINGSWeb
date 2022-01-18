package com.progetto.controller;

import java.sql.SQLException;
import java.util.ArrayList;
import java.util.List;

import javax.servlet.http.HttpServletResponse;

import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.progetto.model.Account;
import com.progetto.model.Area;
import com.progetto.persistence.Database;

@RestController
public class AdministratorActions {
	
	@PostMapping("/deleteArea")
	public void deleteArea(@RequestBody Area area, HttpServletResponse res){
		try {
			Database.getInstance().getAreaDao().delete(area);
		} catch (SQLException e) {
			res.setStatus(500);
			e.printStackTrace();
		}
		
	}
	@PostMapping("/modifyArea")
	public void modifyArea(@RequestBody Area area, HttpServletResponse resp){
		try {
			Database.getInstance().getAreaDao().save(area);
		} catch (SQLException e) {
			resp.setStatus(500);
			e.printStackTrace();
		}
	}
	@PostMapping("/createArea")
	public void createArea(@RequestBody Area area, HttpServletResponse res){
		
		try {
			Database.getInstance().getAreaDao().save(area);
			
		} catch (SQLException e) {
			res.setStatus(500);
			e.printStackTrace();
		}
	}
	
	@PostMapping("/findProfiles")
	public List<Account>  findProfiles(@RequestBody List<Area> areas, @RequestParam String username, HttpServletResponse res) {
		try {
			List<Account> l = Database.getInstance().getAccountDao().findWorkersByAreasAndUsername(areas, username);
			return l;
		} catch (SQLException e) {
			res.setStatus(500);
			e.printStackTrace();
		}
		return null;
	}
	
	@PostMapping("/reviewsAverageAndOffers")
	public int[] findReviewsAverageAndAcceptedOffers(@RequestParam String username, HttpServletResponse res) {
		
		try {
			Account a = new Account();
			a.setUsername(username);
			
			int v[] = Database.getInstance().getReviewDao().averageRatingWorkerAndCount(a);

			int worksDone = Database.getInstance().getOfferDao().findWorksDoneByAccount(username);
			int[] results= {v[0], v[1], worksDone};
			return results;
		} catch (SQLException e) {
			res.setStatus(500);
			e.printStackTrace();
		}
		return null;
	}
	
	@PostMapping("/advertisesAndAreas")
	public int[] findNumberOfAdvertisesAndAreas(@RequestParam String username, HttpServletResponse res){
		try {
			int[] results = Database.getInstance().getAdvertiseDao().findAdvertisesNumberAndAreasByAccount(username);
			return results;
		} catch (SQLException e) {
			res.setStatus(500);
			e.printStackTrace();
		}
		return null;
	}
	@PostMapping("/banAccount")
	public void banAccount(@RequestBody Account a, HttpServletResponse res) {

		try {
			Database.getInstance().getAccountDao().banAccount(a);
			System.out.println("Banning: " +a.getUsername());
		} catch (SQLException e) {
			res.setStatus(500);
			e.printStackTrace();
		}
	}
}
