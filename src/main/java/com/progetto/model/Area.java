package com.progetto.model;

import static org.apache.commons.lang3.Validate.*;

import com.progetto.Utils;

public class Area {
	private long id;
	private String name;
	public long getId() {
		return id;
	}
	public void setId(long id) {
		isTrue(id >0);
		this.id = id;
	}
	public String getName() {
		return name;
	}
	public void setName(String name) {
		notNull(name);
		Utils.sanitizeXSS(name);
		this.name = name;
	}
	
	
	
}
