package com.progetto.model;

public class Notification {
	public static final String SYSTEM = "s";
	public static final String MESSAGE = "m";
	public static final String REVIEW = "r";
	private long id;
	private String text;
	private String type;
	private Account receiver;
	public long getId() {
		return id;
	}
	public void setId(long id) {
		this.id = id;
	}
	public String getText() {
		return text;
	}
	public void setText(String text) {
		this.text = text;
	}
	public String getType() {
		return type;
	}
	public void setType(String type) {
		this.type = type;
	}
	
}
