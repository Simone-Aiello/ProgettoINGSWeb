package com.progetto.model;

import java.util.List;

import static org.apache.commons.lang3.Validate.* ;

public class Chat {
	private long id;
	private Account a1;
	private Account a2;
	private List<Message> messages;
	
	public long getId() {
		return id;
	}
	public void setId(long id) {
		isTrue(id >0);
		this.id = id;
	}
	public Account getA1() {
		return a1;
	}
	public void setA1(Account a1) {
		notNull(a1);
		this.a1 = a1;
	}
	public Account getA2() {
		return a2;
	}
	public void setA2(Account a2) {
		notNull(a2);
		this.a2 = a2;
	}
	public List<Message> getMessages() {
		return messages;
	}
	public void setMessages(List<Message> messages) {
		notNull(messages);
		this.messages = messages;
	}
	
}
