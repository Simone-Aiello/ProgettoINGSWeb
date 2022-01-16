package com.progetto.controller;

import java.sql.SQLException;

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

	@PostMapping("/registerOffer")
	public Offer registerOffer(@RequestBody Offer offer) {
		long id;
		try {
			id = Database.getInstance().getOfferDao().save(offer);
		} catch (SQLException | JsonProcessingException e) {

			e.printStackTrace();
			return null;
		}
		try {
			return Database.getInstance().getOfferDao().findByPrimaryKey(id, Utils.LIGHT);
		} catch (SQLException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
		return null;
	}
}
