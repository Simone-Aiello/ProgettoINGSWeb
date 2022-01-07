package com.progetto.controller;


import java.sql.SQLException;
import java.util.List;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;

import com.progetto.model.Advertise;
import com.progetto.model.Offer;
import com.progetto.persistence.Database;

@Controller
public class ShowOffersController {
	@GetMapping("/showOffers")
	public String showOffers(HttpServletRequest req, HttpServletResponse resp, Advertise a) {
		List<Offer> offers = null;
		try {
//			Advertise a = new Advertise();
//			a.setId(4);
			offers = Database.getInstance().getOfferDao().offersByAdvertise(a);
		} catch (SQLException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
		
//TEST
		Offer o = new Offer();
		o.setTitle("title");
		o.setDescription("description");
		o.setHoursOfWork(12);
		o.setQuote(1200.50);
		o.setDone(false);
		
		Offer o1 = new Offer();
		o1.setTitle("title 1");
		o1.setDescription("description");
		o1.setHoursOfWork(4);
		o1.setQuote(12.50);
		o1.setDone(false);
		
		Offer o2 = new Offer();
		o2.setTitle("title 2");
		o2.setDescription("description");
		o2.setHoursOfWork(1);
		o2.setQuote(1300.50);
		o2.setDone(false);
		
		Offer o3 = new Offer();
		o3.setTitle("title 2");
		o3.setDescription("description");
		o3.setHoursOfWork(8);
		o3.setQuote(1240.50);
		o3.setDone(false);
		
		offers.add(o);
		offers.add(o1);
		offers.add(o2);
		offers.add(o3);
//END TEST
		req.setAttribute("offers", offers);
		return "showOffers";
 	}
}
