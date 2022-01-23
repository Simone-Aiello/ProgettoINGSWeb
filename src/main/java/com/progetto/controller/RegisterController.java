package com.progetto.controller;

import java.io.IOException;
import java.sql.SQLException;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.progetto.Utils;
import com.progetto.model.Account;
import com.progetto.model.Offer;
import com.progetto.persistence.Database;

@RestController
public class RegisterController {

	private ObjectMapper mapper = new ObjectMapper();

	@SuppressWarnings("deprecation")
	@PostMapping("/registerOffer")
	public Offer registerOffer(@RequestBody Offer offer,HttpServletRequest req, HttpServletResponse resp) {

		
		
		if(req.getSession(false) == null || req.getSession(false).getAttribute("username") == null) {
			try {
				resp.sendError(401, "Devi prima effettuare il login");
			} catch (IOException e) {
				e.printStackTrace();
			}
			return null ;	
		}
		
		String username = (String) req.getSession(false).getAttribute("username") ;
		Account a = new Account();
		a.setUsername(username);
		try {
			if(!Database.getInstance().getAccountDao().isValid(a)) {
				resp.sendError(405, "Devi avere un account valido per poterti proporre per un annuncio");
				return null ;
			}
		} catch (SQLException | IOException e2) {
			e2.printStackTrace();
			try {
				resp.sendError(500, "Errore interno al sistema, provi fra qualche minuto");
			} catch (IOException e) {
				// TODO Auto-generated catch block
				e.printStackTrace();
			}
			return null ;
		}
		
		offer.setWorker(a);
	
		long id;
		try {
			id = Database.getInstance().getOfferDao().save(offer);
		} catch (SQLException | JsonProcessingException e) {

			e.printStackTrace();
			try {
				resp.sendError(500, "Errore interno al sistema, provi fra qualche minuto");
			} catch (IOException e1) {
				e1.printStackTrace();
			}
			return null;
		}
		try {
			Database.getInstance().getOfferDao().findByPrimaryKey(id, Utils.LIGHT);
			resp.setStatus(200);
			return null ;
		} catch (SQLException e) {
			e.printStackTrace();
		}
		try {
			resp.sendError(500, "Errore interno al sistema, provi fra qualche minuto");
		} catch (IOException e) {
			e.printStackTrace();
		}
		return null;
	}
}
