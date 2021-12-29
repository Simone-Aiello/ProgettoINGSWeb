package com.progetto.model;

public class Offer {
	
	private long id;
	private String description;
	private String title;
	private double quote;
	private boolean done;
	private Account worker; 
	private int hoursOfWork;
	private Advertise advertise;
	// AGGIUNGERE IL CAMPO ANNUNCIO 
	
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
	public double getQuote() {
		return quote;
	}
	public void setQuote(double quote) {
		this.quote = quote;
	}
	public boolean isDone() {
		return done;
	}
	public void setDone(boolean done) {
		this.done = done;
	}
	public Account getWorker() {
		return worker;
	}
	public void setWorker(Account worker) {
		this.worker = worker;
	}
	public int getHoursOfWork() {
		return hoursOfWork;
	}
	public void setHoursOfWork(int hoursOfWork) {
		this.hoursOfWork = hoursOfWork;
	}
	public Advertise getAdvertise() {
		return advertise;
	}
	public void setAdvertise(Advertise advertise) {
		this.advertise = advertise;
	}
	
}
