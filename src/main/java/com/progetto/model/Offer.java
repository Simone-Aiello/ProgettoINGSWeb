package com.progetto.model;

import static org.apache.commons.lang3.Validate.*;

import java.util.List;

import com.progetto.Utils;

public class Offer {
	
	private long id;
	private String description;
	private String title;
	private double quote;
	private boolean done = false;
	private boolean accepted;
	private Account worker; 
	private int hoursOfWork;
	private Advertise advertise;
	private String dates;
	private List<String> availabilities ;
	
	

	public boolean isAccepted() {
		return accepted;
	}
	public void setAccepted(boolean accepted) {
		this.accepted = accepted;
	}

	
	public String getDates() {
		return dates;
	}
	public void setDates(String dates) {
		this.dates = dates;
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
	public double getQuote() {
		return quote;
	}
	public void setQuote(double quote) {
		isTrue(quote >= 0);
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
		notNull(worker);
		this.worker = worker;
	}
	public int getHoursOfWork() {
		return hoursOfWork;
	}
	public void setHoursOfWork(int hoursOfWork) {
		isTrue(hoursOfWork > 0);
		this.hoursOfWork = hoursOfWork;
	}
	public Advertise getAdvertise() {
		return advertise;
	}
	public void setAdvertise(Advertise advertise) {
		notNull(advertise);
		this.advertise = advertise;
	}
	
	
	public void setAvailabilities(List<String> availabilities) {
		notNull(availabilities);
		this.availabilities = availabilities;
	}
	
	public List<String> getAvailabilities() {
		return availabilities;
	}
	
}
