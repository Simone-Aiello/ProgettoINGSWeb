package com.progetto.model;

import org.joda.time.DateTime;


public class Message {
	private long id;
	private String text;
	private DateTime messageTime;
	
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
	public DateTime getMessageTime() {
		return messageTime;
	}
	public void setMessageTime(DateTime messageTime) {
		this.messageTime = messageTime;
	}
	
}
