package com.progetto.controller;

import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import com.progetto.model.Account;

@RestController
public class Prova {
	@PostMapping("/prova")
	public Account test(@RequestBody Account a) {
		System.out.println(a.getUsername());
		return a;
	}
}
