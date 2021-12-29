package com.progetto.controller;

import java.util.LinkedList;
import java.util.List;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import com.progetto.model.Advertise;
import com.progetto.model.Image;

@RestController
public class TestController {
	@GetMapping("/test")
	public Advertise tester() {
		Advertise v = new Advertise();
		Image m = new Image();
		m.setId(1);
		m.setUrl("fakeURL");
		List<Image> img = new LinkedList<Image>();
		img.add(m);
		v.setId(3);
		v.setImages(img);
		return v;
	}
	
	@PostMapping("/testPost")
	public String testPost(@RequestBody Advertise a) {
		
		System.out.println(a.getDescription());
		System.out.println(a.getTitle());
		
		return "TEST";
	}
}
