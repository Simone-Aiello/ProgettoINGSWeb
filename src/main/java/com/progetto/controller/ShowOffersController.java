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

import com.progetto.Utils;
import com.progetto.model.Account;
import com.progetto.model.Advertise;
import com.progetto.model.Notification;
import com.progetto.model.Offer;
import com.progetto.model.Review;
import com.progetto.persistence.Database;

@Controller
public class ShowOffersController {
	@GetMapping("/showOffers")
	public String showOffers(HttpServletRequest req, HttpServletResponse resp) {
		List<Offer> offers = null;
		
		try {
			Advertise a1 = new Advertise();
			String id = req.getParameter("AdvertiseID");
			a1.setId(Long.parseLong(id));
			Long acceptedOfferIndex = Database.getInstance().getAdvertiseDao().alreadyAssigned(a1);
			if(acceptedOfferIndex == null) 
				offers = Database.getInstance().getOfferDao().findOffersByAdvertise(a1);
			else {
				offers = new ArrayList<Offer>();
				Offer o = Database.getInstance().getOfferDao().findByPrimaryKeyForUsers(acceptedOfferIndex);
				o.setAccepted(true);
				offers.add(o);
			}
		} catch (SQLException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
		req.setAttribute("offers", offers);
		
		return "/showOffers";
 	}
	
	@PostMapping("/refuseOffer")
	@ResponseBody
	public void refuseOffer(@RequestBody String[] message) {
		System.out.println("refused " + message[0]);
		Notification n = new Notification();
		Account a = new Account();
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
		
		Advertise a = new Advertise();
		Account acc = new Account();
		Notification n = new Notification();
		Offer o = new Offer();
		a.setId(Long.parseLong(message[3]));
		o.setId(Long.parseLong(message[2]));
		a.setAcceptedOffer(o);
		acc.setUsername(message[1]);
		n.setReceiver(acc);
		n.setText("La tua offerta è stata accetta!");
		n.setType("r");
		try {
			Database.getInstance().getAdvertiseDao().updateAdvertise(a);
			Database.getInstance().getNotificationDao().saveNotificationByOfferRefuse(n);
		} catch (SQLException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
	}
	
	@PostMapping("/reviewOffer")
	@ResponseBody
	public String reviewOffer(@RequestBody String[] review) {
		String username = review[0];
		String message = review[1];
		Long offerId = Long.parseLong(review[2]);
		int rating = Integer.parseInt(review[3]);
		System.out.println(username + " " + message + " " + offerId + " " + rating);
		
		//1) salvare la recensione
		Review r = new Review();
		Offer o = new Offer();
		o.setId(offerId);
		Account worker = new Account();
		Account client = new Account();
		worker.setUsername(username);
		r.setDescription(message);
		r.setRating(rating);
		r.setOffer(o);
		r.setWorker(worker);
		r.setClient(client);
		try {
			Database.getInstance().getReviewDao().save(r);
		} catch (SQLException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
		
		//2) notificare al lavoratore che è stata fatta una recensione a suo nome
		Notification n = new Notification();
		Account reciver = new Account();
		reciver.setUsername(username);
		n.setReceiver(reciver);
		n.setText("ha appena pubblicato una recensione per l'offerta : #" + offerId);
		n.setType("r");
		try {
			Database.getInstance().getNotificationDao().saveNotificationByOfferRefuse(n);
		} catch (SQLException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
		
		return review[0];
	}
	
	@GetMapping("allOffersWorker")
	public String allOffers(HttpServletRequest req, HttpServletResponse resp) {

		try {
			if(req.getSession(false) == null || req.getSession(false).getAttribute("username") == null) {
				req.getSession(false).setAttribute("message", "utente non loggato");
				return "genericInfoPage";
			}
			Account a = new Account();
			a.setUsername((String)req.getSession(false).getAttribute("username"));
			List<Offer> offers = Database.getInstance().getOfferDao().findOffersByAccount(a);
			req.setAttribute("offers", offers);
			System.out.println("Offerte pubblicate da: " + a.getUsername() + " " + offers.size());
			for(Offer o: offers) {
				System.out.println("DISP: " + o.getDates());
			}
		} catch (SQLException e) {
			resp.setStatus(500);
			e.printStackTrace();
		}
		return "allOffersWorker";
	}
}
