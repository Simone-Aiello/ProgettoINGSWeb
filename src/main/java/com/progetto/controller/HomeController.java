package com.progetto.controller;

import java.sql.SQLException;

import javax.servlet.http.HttpServletRequest;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;

import com.progetto.Utils;
import com.progetto.model.Account;
import com.progetto.persistence.Database;

@Controller
public class HomeController {
	

	
	@GetMapping("/")
	public String home(HttpServletRequest req) {
		
		if(req.getSession(false) != null && req.getSession(false).getAttribute("username") != null  && req.getSession(false).getAttribute("loggedAccountType").equals(Account.WORKER)) {
			try {
				String username = (String)req.getSession(false).getAttribute("username") ;
				System.out.println("USERNAME SESSION: "+username);
				String provinceOfWork = Database.getInstance().getAccountDao().findByPrimaryKey(username, Utils.BASIC_INFO).getProvinceOfWork() ;
				System.out.println(provinceOfWork);
				req.setAttribute("provinceOfWork",provinceOfWork);
			} catch (SQLException e) {
				// TODO Auto-generated catch block
				e.printStackTrace();
			}
		}
		return "index" ; 
	}
	
}
