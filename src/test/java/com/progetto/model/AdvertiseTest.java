package com.progetto.model;

import static org.junit.jupiter.api.Assertions.assertEquals;

import java.util.ArrayList;
import java.util.List;

import org.joda.time.DateTime;
import org.junit.jupiter.api.Test;

import com.progetto.Utils;

public class AdvertiseTest {
	//check that valid data are correctly inserted by setter methods
	@Test
	void validAdvertise() {
		Advertise a = new Advertise();
		long id= 1;
		String description = "myDescription";
		DateTime expiryDate = new DateTime(999999999);
		Account acc = new Account();
		Offer o =  new Offer();
		Review r= new Review();
		String province = "RC";
		List<Area> areas= new ArrayList<>();
		List<Image> images = new ArrayList<>();
		List<Offer> offers = new ArrayList<>();
		
		a.setId(id);
		a.setDescription(description);
		a.setExpiryDate(expiryDate);
		a.setAccount(acc);
		a.setAcceptedOffer(o);
		a.setReviewReceived(r);
		a.setProvince(province);
		a.setInterestedAreas(areas);
		a.setImages(images);		
		a.setOffers(offers);
		
		assertEquals(id, a.getId());
		assertEquals(Utils.sanitizeXSS(description), a.getDescription());
		assertEquals(expiryDate , a.getExpiryDate());
		assertEquals(acc, a.getAccount());
		assertEquals(o, a.getAcceptedOffer());
		assertEquals(r, a.getReviewReceived());
		assertEquals(Utils.sanitizeXSS(province), a.getProvince());
		assertEquals(areas, a.getInterestedAreas());
		assertEquals(images, a.getImages());
		assertEquals(offers, a.getOffers());
	}
	
}
