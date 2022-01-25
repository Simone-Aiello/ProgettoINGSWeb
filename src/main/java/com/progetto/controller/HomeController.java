package com.progetto.controller;

import java.sql.SQLException;
import java.util.List;

import javax.servlet.http.HttpServletRequest;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;

import com.progetto.Utils;
import com.progetto.model.Account;
import com.progetto.persistence.Database;
import org.json.*;
@Controller
public class HomeController {
	

	
	@GetMapping("/")
	public String home(HttpServletRequest req) {
		
		if(req.getSession(false) != null && req.getSession(false).getAttribute("username") != null  && req.getSession(false).getAttribute("loggedAccountType").equals(Account.WORKER)) {
			try {
				String username = (String)req.getSession(false).getAttribute("username") ;
				Account account = Database.getInstance().getAccountDao().findByPrimaryKey(username, Utils.LIGHT);
				String provinceOfWork = account.getProvinceOfWork();
				req.setAttribute("provinceOfWork",provinceOfWork);
				List<String> areasOfWork = account.getAreasOfWork().stream().map(areaofWork -> areaofWork.getName()).toList();
				System.out.println("ARRAY: "+areasOfWork);
				JSONArray areasOfWorkJSON = new JSONArray(areasOfWork);
				req.setAttribute("areasOfWork",areasOfWorkJSON);
			} catch (SQLException e) {
				
				// TODO Auto-generated catch block
				e.printStackTrace();
			}
		}
		return "index" ; 
	}
	
}
