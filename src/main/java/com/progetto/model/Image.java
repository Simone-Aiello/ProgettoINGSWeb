package com.progetto.model;

import static org.apache.commons.lang3.Validate.isTrue;

public class Image {
	private long id;
	private String value;
	public long getId() {
		return id;
	}
	public void setId(long id) {
		isTrue(id >0);
		this.id = id;
	}
	public String getValue() {
		return value;
	}
	public void setValue(String value) {
		this.value = value;
	}
}
