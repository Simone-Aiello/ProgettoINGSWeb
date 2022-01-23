package com.progetto.controller;

import java.sql.SQLException;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import com.progetto.model.Account;
import com.progetto.model.Offer;
import com.progetto.persistence.Database;

@RestController
public class ShowMyOfferControllerREST {
	@PostMapping("/deleteMyOffer")
	public boolean deleteMyOffer(@RequestBody Offer offer,HttpServletRequest req,HttpServletResponse resp) {
		try {
			if(req.getSession(false) == null || req.getSession(false).getAttribute("username") == null) return false;
			Account a = new Account();
			a.setUsername((String) req.getSession(false).getAttribute("username"));
			offer.setWorker(a);
			Database.getInstance().getOfferDao().delete(offer);
			return true;
		} catch (SQLException e) {
			resp.setStatus(500);
			e.printStackTrace();
			return false;
		}
	}
	@PostMapping("/markAsDone")
	public boolean markAsDone(@RequestBody Offer offer, HttpServletRequest req,HttpServletResponse resp) {
		try {
			if(req.getSession(false) == null || req.getSession(false).getAttribute("username") == null) return false;
			Account a = new Account();
			a.setUsername((String) req.getSession(false).getAttribute("username"));
			offer.setWorker(a);
			Database.getInstance().getOfferDao().markOfferAsDone(offer);
			return true;
		} catch (SQLException e) {
			resp.setStatus(500);
			e.printStackTrace();
			return false;
		}
	}
}
