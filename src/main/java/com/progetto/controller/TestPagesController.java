package com.progetto.controller;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;

@Controller 
public class TestPagesController {

	@GetMapping("/AdvertisePublication")
	public String startPublication() {
		return "AdvertisePublication.html";
	}
}
