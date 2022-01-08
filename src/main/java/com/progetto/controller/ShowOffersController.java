package com.progetto.controller;


import java.sql.SQLException;
import java.util.ArrayList;
import java.util.List;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.ResponseBody;

import com.progetto.model.Account;
import com.progetto.model.Advertise;
import com.progetto.model.Notification;
import com.progetto.model.Offer;
import com.progetto.persistence.Database;

@Controller
public class ShowOffersController {
	@GetMapping("/showOffers")
	public String showOffers(HttpServletRequest req, HttpServletResponse resp, Advertise a) {
		List<Offer> offers = null;
		try {
			Advertise a1 = new Advertise();
			a1.setId(4);
			offers = Database.getInstance().getOfferDao().offersByAdvertise(a1);
		} catch (SQLException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
		
////TEST
//		offers = new ArrayList<Offer>();
//		Offer o = new Offer();
//		o.setId(12);
//		o.setTitle("title");
//		o.setDescription("description");
//		o.setHoursOfWork(12);
//		o.setQuote(1200.50);
//		o.setDone(false);
//		
//		Offer o1 = new Offer();
//		o1.setId(13);
//		o1.setTitle("title 1");
//		o1.setDescription("description");
//		o1.setHoursOfWork(4);
//		o1.setQuote(12.50);
//		o1.setDone(false);
//		
//		Offer o2 = new Offer();
//		o2.setId(14);
//		o2.setTitle("title 2");
//		o2.setDescription("description");
//		o2.setHoursOfWork(1);
//		o2.setQuote(1300.50);
//		o2.setDone(false);
//		
//		Offer o3 = new Offer();
//		o3.setId(15);
//		o3.setTitle("title 3");
//		o3.setDescription("description");
//		o3.setHoursOfWork(8);
//		o3.setQuote(1240.50);
//		o3.setDone(false);
//		
//		offers.add(o);
//		offers.add(o1);
//		offers.add(o2);
//		offers.add(o3);
////END TEST
		req.setAttribute("offers", offers);
		return "showOffers";
 	}
	
	@PostMapping("/refuseOffer")
	public void refuseOffer(@RequestBody String[] message) {
		System.out.println("refused " + message[0]);
		Notification n = new Notification();
		Account a = new Account();
//		//TEST
//		a.setUsername("aaaa");
//		//END TEST
		a.setUsername(message[0]);
		n.setReceiver(a);
		n.setText("La tua offerta è stata rifiutata perché " + message[1]);
		n.setType("r");
		try {
			Database.getInstance().getNotificationDao().saveNotificationByOfferRefuse(n);
		} catch (SQLException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
		
	}
	
	@PostMapping("/acceptOffer")
	@ResponseBody
	public void acceptOffer(@RequestBody String[] message) {
		System.out.println(message[2] + " " + message[3]);
		
		Advertise a = new Advertise();
		Offer o = new Offer();
		a.setId(Long.parseLong(message[3]));
		o.setId(Long.parseLong(message[2]));
		a.setAcceptedOffer(o);
		try {
			Database.getInstance().getAdvertiseDao().updateAdvertise(a);
		} catch (SQLException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
	}
}
