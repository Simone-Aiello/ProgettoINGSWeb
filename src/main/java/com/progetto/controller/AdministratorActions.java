package com.progetto.controller;

import java.sql.SQLException;
import java.util.List;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import com.progetto.model.Account;
import com.progetto.model.Advertise;
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
	public Area createArea(@RequestBody Area area, HttpServletRequest req, HttpServletResponse res){
		
		try {
			Database.getInstance().getAreaDao().save(area);
			return area;
		} catch (SQLException e) {
			res.setStatus(500);
			e.printStackTrace();
		}
		return null;
	}
	
	@PostMapping("/findProfiles")
	public List<Account>  findProfiles(@RequestBody List<Area> areas, HttpServletRequest req, HttpServletResponse res) {
		try {
			String username = req.getHeader("username");
			List<Account> l = Database.getInstance().getAccountDao().findWorkersByAreasAndUsername(areas, username);
			return l;
		} catch (SQLException e) {
			res.setStatus(500);
			e.printStackTrace();
		}
		return null;
	}
	
	@GetMapping("/reviewsAverageAndOffers")
	public int[] findReviewsAverageAndAcceptedOffers(HttpServletRequest req, HttpServletResponse res) {
		
		try {
			String username = req.getHeader("username");
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
	
	@GetMapping("/advertisesAndAreas")
	public int[] findNumberOfAdvertisesAndAreas(HttpServletRequest req, HttpServletResponse res){
		try {
			String username = req.getHeader("username");
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
			//System.out.println("Banning: " +a.getUsername());
		} catch (SQLException e) {
			res.setStatus(500);
			e.printStackTrace();
		}
	}
	
	@PostMapping("/deleteAdvertise")
	public void deleteAdvertise(@RequestBody Advertise a, HttpServletResponse res) {

		try {
			Database.getInstance().getAdvertiseDao().delete(a);
		} catch (SQLException e) {
			res.setStatus(500);
			e.printStackTrace();
		}
	}
}
