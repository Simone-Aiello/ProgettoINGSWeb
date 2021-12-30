package com.progetto.model;

import static org.apache.commons.lang3.Validate.isTrue;

public class Image {
	private long id;
	private String url;
	public long getId() {
		return id;
	}
	public void setId(long id) {
		isTrue(id >0);
		this.id = id;
	}
	public String getUrl() {
		return url;
	}
	public void setUrl(String url) {
		this.url = url;
	}
}
