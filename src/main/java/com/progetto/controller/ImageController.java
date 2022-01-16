package com.progetto.controller;

import java.sql.SQLException;
import java.util.List;

import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import com.progetto.Utils;
import com.progetto.model.Advertise;
import com.progetto.model.Image;
import com.progetto.persistence.Database;

@RestController
public class ImageController {

	@PostMapping("/imagesFromAdvertise")
	public List<Image> getImagesAdvertise(@RequestBody int id_advertise) {
		Advertise advertise = new Advertise();
		advertise.setId(id_advertise);
		try {
			return Database.getInstance().getImageDao().findByAdvertise(advertise, Utils.COMPLETE);
		} catch (SQLException e) {
			e.printStackTrace();
		}

		return null;
	}
}
