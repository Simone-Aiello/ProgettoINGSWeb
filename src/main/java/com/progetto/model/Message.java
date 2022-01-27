package com.progetto.model;

import static org.apache.commons.lang3.Validate.*;
import org.joda.time.DateTime;

import com.progetto.Utils;


public class Message {
	private long id;
	private String text;
	private DateTime messageTime;
	private String sender;
	private long idChat;
	public long getId() {
		return id;
	}
	public void setId(long id) {
		isTrue(id >0);
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
	public DateTime getMessageTime() {
		return messageTime;
	}
	public void setMessageTime(DateTime messageTime) {
		notNull(messageTime);
		this.messageTime = messageTime;
	}
	public String getSender() {
		return sender;
	}
	public void setSender(String sender) {
		this.sender = sender;
	}
	public long getIdChat() {
		return idChat;
	}
	public void setIdChat(long idChat) {
		this.idChat = idChat;
	}
	
}
