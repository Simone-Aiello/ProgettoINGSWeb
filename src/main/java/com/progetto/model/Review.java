package com.progetto.model;

import java.util.List;

import com.progetto.Utils;

import static org.apache.commons.lang3.Validate.*;

public class Review {
	private long id;
	private String description;
	private String title;
	private int rating;
	private Account client;
	private Account worker;
	private Offer offer;
	private List<Image> images;
	public long getId() {
		return id;
	}
	public void setId(long id) {	
		isTrue(id > 0);
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
	public int getRating() {
		return rating;
	}
	public void setRating(int rating) {
		inclusiveBetween(0, 5, rating);
		this.rating = rating;
	}
	public Account getClient() {
		return client;
	}
	public void setClient(Account client) {
		notNull(client);
		this.client = client;
	}
	public Account getWorker() {
		return worker;
	}
	public void setWorker(Account worker) {
		notNull(worker);
		this.worker = worker;
	}
	public Offer getOffer() {
		return offer;
	}
	public void setOffer(Offer offer) {
		notNull(offer);
		this.offer = offer;
	}
	public List<Image> getImages() {
		return images;
	}
	public void setImages(List<Image> images) {
		notNull(images);
		this.images = images;
	}
	
}
