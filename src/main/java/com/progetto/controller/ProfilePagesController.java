package com.progetto.controller;

import java.sql.SQLException;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

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
	@GetMapping("/profilePage")
	public String getProfilePage(@RequestParam("username") String username,HttpServletRequest req,HttpServletResponse resp) {
		try {
			Account account = Database.getInstance().getAccountDao().findByPrimaryKey(username, Utils.COMPLETE);
			if(account == null) {
				req.setAttribute("message", "Mi dispiace ma l'utente che stai cercando non esiste");
				return "genericInfoPage";
			}
			req.setAttribute("type", account.getAccountType());
			req.setAttribute("account", account);
			req.setAttribute("date", Utils.convertDate(account.getPersonalInfo().getDateOfBirth()));
			if(account.getAccountType().equals(Account.WORKER)) {
				int[] ratingAndCount = Database.getInstance().getReviewDao().averageRatingWorkerAndCount(account);
				req.setAttribute("rating", ratingAndCount[0]);
				req.setAttribute("count", ratingAndCount[1]);				
			}
		} catch (SQLException e) {
			resp.setStatus(500);
			e.printStackTrace();
		}
		return "profilePage";
	}
}
