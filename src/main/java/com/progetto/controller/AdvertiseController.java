package com.progetto.controller;

import java.sql.SQLException;
import java.util.ArrayList;
import java.util.List;
import java.util.stream.Collectors;

import org.json.JSONArray;
import org.json.JSONException;
import org.json.JSONObject;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import com.progetto.model.Advertise;
import com.progetto.persistence.Database;

@RestController
public class AdvertiseController {

	@PostMapping("/advertises")
	public List<Advertise> getAdvertises(@RequestBody String parmsString){
		JSONObject parms = new JSONObject(parmsString);
		List<Advertise> advertises;
		try {
			String keyword = null; 
			try { keyword = parms.getString("keyword"); }catch (JSONException e) {}
			List<String> areas = null; 
			try {
				System.out.println("diooo" +parms.getJSONArray("areas"));
				areas =  parms.getJSONArray("areas").toList().stream().map( areas_json -> areas_json.toString()).collect(Collectors.toList());}catch (JSONException e) {}
				System.out.println("diooo" +areas);
			String province = null; 
			try {  province = parms.getString("province"); }catch (JSONException e) {}
			Integer quantity = null; 
			try { quantity = parms.getInt("quantity"); }catch (JSONException e) {}
			Integer offset = null;
			try { offset = parms.getInt("offset"); }catch (JSONException e) {}
			System.out.println("AREAS ADVERTSE CONTAINER "+areas);
			advertises = Database.getInstance().getAdvertiseDao().findGroup(keyword,areas ,province, 
					quantity, offset);
		} catch (SQLException e) {
			e.printStackTrace();
			return null ;
		}
		return advertises;
	}
	
	
	
}
