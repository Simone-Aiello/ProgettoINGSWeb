package com.progetto.model;

import java.util.List;

import org.joda.time.DateTime;

public class Advertise {
	private long id;
	private String description;
	private String title;
	private DateTime expiryDate;
	private Account user;
	private List<Area> interestedAreas;
	private List<Image> images;
	private Offer acceptedOffer;
	private Review reviewReceived;
	private String province;
	
	public Review getReviewReceived() {
		return reviewReceived;
	}
	public void setReviewReceived(Review reviewReceived) {
		this.reviewReceived = reviewReceived;
	}
	private List<Offer> offers;
	
	public Offer getAcceptedOffer() {
		return acceptedOffer;
	}
	public void setAcceptedOffer(Offer acceptedOffer) {
		this.acceptedOffer = acceptedOffer;
	}
	public List<Offer> getOffers() {
		return offers;
	}
	public void setOffers(List<Offer> offers) {
		this.offers = offers;
	}
	public List<Image> getImages() {
		return images;
	}
	public void setImages(List<Image> images) {
		this.images = images;
	}
	public List<Area> getInterestedAreas() {
		return interestedAreas;
	}
	public void setInterestedAreas(List<Area> interestedAreas) {
		this.interestedAreas = interestedAreas;
	}
	public long getId() {
		return id;
	}
	public void setId(long id) {
		this.id = id;
	}
	public String getDescription() {
		return description;
	}
	public void setDescription(String description) {
		this.description = description;
	}
	public String getTitle() {
		return title;
	}
	public void setTitle(String title) {
		this.title = title;
	}
	public DateTime getExpiryDate() {
		return expiryDate;
	}
	public void setExpiryDate(DateTime expiryDate) {
		this.expiryDate = expiryDate;
	}
	public Account getUser() {
		return user;
	}
	public void setUser(Account user) {
		this.user = user;
	}
	public String getProvince() {
		return province;
	}
	public void setProvince(String province) {
		this.province = province;
	}
	
	
}
