package com.progetto.model;

public class Review {
	private long id;
	private String description;
	private String title;
	private int rating;
	private Account client;
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
	public int getRating() {
		return rating;
	}
	public void setRating(int rating) {
		this.rating = rating;
	}
	public Account getClient() {
		return client;
	}
	public void setClient(Account client) {
		this.client = client;
	}
	
}
