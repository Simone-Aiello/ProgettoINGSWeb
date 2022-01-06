package com.progetto.controller;

import java.sql.SQLException;

import javax.servlet.http.HttpServletRequest;

import org.joda.time.DateTime;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.servlet.mvc.support.RedirectAttributes;
import org.springframework.web.servlet.view.RedirectView;

import java.util.ArrayList;
import java.util.List;
import com.progetto.Utils;
import com.progetto.model.Account;
import com.progetto.model.Review;
import com.progetto.persistence.Database;

@Controller
public class ProfilePagesController {
	private List<Review> randomRatingForTesting(){
		List<Review> review = new ArrayList<Review>();
		Review r1 = new Review();
		r1.setRating(3);
		Account a1 = new Account();
		a1.setUsername("Primousername");
		r1.setClient(a1);
		r1.setTitle("Titolo prima");
		r1.setDescription("Descrizione prima");
		review.add(r1);

		Review r2 = new Review();
		r2.setRating(5);
		Account a2 = new Account();
		a2.setUsername("Secondousername");
		r2.setClient(a2);
		r2.setTitle("Titolo seconda");
		r2.setDescription("Descrizione seconda");
		review.add(r2);
		
		Review r3 = new Review();
		r3.setRating(1);
		Account a3 = new Account();
		a3.setUsername("Terzousername");
		r3.setClient(a3);
		r3.setTitle("Titolo terza");
		r3.setDescription("Descrizione terza");
		review.add(r3);
		return review;
	}
	@GetMapping("/profilePage")
	public String getProfilePage(@RequestParam("username") String username,HttpServletRequest req) {
		try {
			Account account = Database.getInstance().getAccountDao().findByPrimaryKey(username, Utils.COMPLETE);
			account.setReviews(randomRatingForTesting());
			int rating = Database.getInstance().getReviewDao().averageRatingWorker(account);
			req.setAttribute("account", account);
			req.setAttribute("date", Utils.convertDate(account.getPersonalInfo().getDateOfBirth()));
			req.setAttribute("rating", rating);
		} catch (SQLException e) {
			e.printStackTrace();
		}
		return "profilePage";
	}
}
