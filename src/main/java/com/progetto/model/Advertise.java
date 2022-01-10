package com.progetto.model;

import java.util.List;

import static org.apache.commons.lang3.Validate.*;
import org.joda.time.DateTime;

import com.progetto.Utils;

public class Advertise {
	private long id;
	private String description;
	private String title;
	private DateTime expiryDate;
	private Account account;
	private List<Area> interestedAreas;
	private List<Image> images;
	private Offer acceptedOffer;
	private Review reviewReceived;
	private String province;
	private List<Offer> offers;
	private String availability;
	
	public Advertise() {}
	
	public Review getReviewReceived() {
		return reviewReceived;
	}
	public void setReviewReceived(Review reviewReceived) {
		notNull(reviewReceived);
		this.reviewReceived = reviewReceived;
	}
	
	public Offer getAcceptedOffer() {
		return acceptedOffer;
	}
	public void setAcceptedOffer(Offer acceptedOffer) {
		notNull(acceptedOffer);
		this.acceptedOffer = acceptedOffer;
	}
	public List<Offer> getOffers() {
		return offers;
	}
	public void setOffers(List<Offer> offers) {
		notNull(offers);
		this.offers = offers;
	}
	public List<Image> getImages() {
		return images;
	}
	public void setImages(List<Image> images) {
		notNull(images);
		this.images = images;
	}
	public List<Area> getInterestedAreas() {
		return interestedAreas;
	}
	public void setInterestedAreas(List<Area> interestedAreas) {
		notNull(interestedAreas);
		this.interestedAreas = interestedAreas;
	}
	public long getId() {
		return id;
	}
	public void setId(long id) {
		isTrue(id >0);
		this.id = id;
	}
	public String getDescription() {
		return description;
	}
	public void setDescription(String description) {
		notNull(description);
		Utils.sanitizeXSS(description);
		this.description = description;
	}
	public String getTitle() {
		return title;
	}
	public void setTitle(String title) {
		notNull(title);
		Utils.sanitizeXSS(title);
		this.title = title;
	}
	public DateTime getExpiryDate() {
		return expiryDate;
	}
	public void setExpiryDate(DateTime expiryDate) {
		notNull(expiryDate);
		//it doesn't work because when it receives a date
		//it takes as milliseconds the time of 00:01(kind of)
		//Solution: write a function in utils that checks the date correctly
		//isTrue(expiryDate.isAfterNow());
		this.expiryDate = expiryDate;
	}
	public Account getAccount() {
		return account;
	}
	
	public void setAccount(Account account) {
		notNull(account);
		this.account = account;
	}
	public String getProvince() {
		return province;
	}
	public void setProvince(String province) {
		notNull(province);
		Utils.sanitizeXSS(province);
		this.province = province;
	}

	public String getAvailability() {
		return availability;
	}

	public void setAvailability(String availability) {
		this.availability = availability;
	}
	
	
}
