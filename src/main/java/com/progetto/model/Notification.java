package com.progetto.model;

import static org.apache.commons.lang3.Validate.*;

import com.progetto.Utils;


public class Notification {
	public static final String ADVERTISE = "a";
	public static final String OFFER = "o";
	public static final String REVIEW = "r";
	public static final String SYSTEM = "s";
	//public static final String MESSAGE = "m";

	private static final String PATTERN_TYPE_NOTIFICATION = "[aors]";
	private long id;
	private String text;
	private String type;
	private Account receiver;
	private Account createdBy;
	private boolean read;
	
	public Notification() {}

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
		text = Utils.sanitizeXSS(text);
		this.text = text;
	}
	public String getType() {
		return type;
	}
	public void setType(String type) {
		notNull(type);
		matchesPattern(type, PATTERN_TYPE_NOTIFICATION);
		this.type = type;
	}
	public Account getCreatedBy() {
		return createdBy;
	}
	public void setCreatedBy(Account createdBy) {
		this.createdBy = createdBy;
	}
	public Account getReceiver() {
		return receiver;
	}
	public void setReceiver(Account receiver) {
		this.receiver = receiver;
	}

	public boolean isRead() {
		return read;
	}

	public void setRead(boolean read) {
		this.read = read;
	}
	
}
