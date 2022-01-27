package com.progetto.controller;

import java.io.IOException;
import java.sql.SQLException;
import java.util.ArrayList;
import java.util.List;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.progetto.Utils;
import com.progetto.model.Account;
import com.progetto.model.Area;
import com.progetto.model.Review;
import com.progetto.persistence.Database;

@RestController
public class DataSenderRestController {
	@GetMapping("/getAreas")
	public List<Area> getAreas(){
		try {
			return Database.getInstance().getAreaDao().findAll();
		}
		catch (SQLException e) {
			return null;
		}
	}
	@GetMapping("/getReviews")
	public List<Review> getReviews(@RequestParam("username") String username,@RequestParam("limit")  Integer limit,@RequestParam("offset")  Integer offset,HttpServletResponse resp){
		List<Review> reviews = new ArrayList<Review>();
		Account acc = new Account();
		acc.setUsername(username);
		try {
			reviews = Database.getInstance().getReviewDao().findByWorker(acc, limit, offset);
		} catch (SQLException e) {
			resp.setStatus(500);
			e.printStackTrace();
		}
		return reviews;
	}
	
	@GetMapping("/getProfilePic")
	public String getProfilePic(@RequestParam String username){
		try {
			Account a = Database.getInstance().getAccountDao().findByPrimaryKey(username, Utils.LIGHT);
			if(a.getProfilePic() != null) {
				return a.getProfilePic().getValue();	
			}
			else return null;
		} catch (SQLException e) {
			e.printStackTrace();
			return null;
		}
	}
	
	@GetMapping("/getProvince")
	public String getProfilePic(HttpServletRequest req){
		if(req.getSession(false) != null || req.getSession(false).getAttribute("username") != null) {
			String username = (String) req.getSession(false).getAttribute("username");
			try {
				Database.getInstance().getAccountDao().findByPrimaryKey(username, Utils.BASIC_INFO).getProvinceOfWork();
			} catch (SQLException e) {
				e.printStackTrace();
				return null ;
			}
		}
		return null ;
	}
	
	
	@GetMapping("typeOfAccount")
	public String getTypeOfAccount(HttpServletRequest req) {
		
		if(req.getSession(false) != null && req.getSession(false).getAttribute("username") != null) {
			String username = (String) req.getSession(false).getAttribute("username") ;
			try {
				return Database.getInstance().getAccountDao().findByPrimaryKey(username, Utils.BASIC_INFO).getAccountType() ;
			} catch (SQLException e) {
				e.printStackTrace();
			}
		}
		return "none";
	}
	
}
