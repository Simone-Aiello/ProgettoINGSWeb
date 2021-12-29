package com.progetto.model;

import static org.apache.commons.lang3.Validate.*;

import com.progetto.Utils;


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
		isTrue(id > 0 );
		this.id = id;
	}
	public String getText() {
		return text;
	}
	public void setText(String text) {
		notNull(text);
		Utils.sanitizeXSS(text);
		this.text = text;
	}
	public String getType() {
		return type;
	}
	public void setType(String type) {
		notNull(type);
		isTrue(Utils.isValidTypeNotification(type));
		this.type = type;
	}
	
}
