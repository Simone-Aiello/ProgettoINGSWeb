package com.progetto.controller;

import java.sql.SQLException;

import javax.servlet.http.HttpServletResponse;

import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import com.progetto.model.Advertise;
import com.progetto.persistence.Database;

@RestController
public class AdvertisePublicationActionController {

	@PostMapping("saveAdvertise")
	public void saveAdvertise(@RequestBody Advertise advertise, HttpServletResponse resp) {
		System.out.println("HEY I AM SAVING THE ADVERTISE");
		
		//System.out.println(advertise.getTitle());
		//System.out.println(advertise.getDescription());
		//System.out.println(advertise.getExpiryDate());
		//System.out.println(advertise.getProvince());
		
		try {
			Database.getInstance().getAdvertiseDao().save(advertise);
		} catch (SQLException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
		
	}
}
