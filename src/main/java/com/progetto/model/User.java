package com.progetto.model;


import static org.apache.commons.lang3.Validate.*;
import org.joda.time.DateTime;

import com.progetto.Utils;

public class User {
	
	private static final String PATTERN_JUST_LETTER = "[a-zA-Z ]+";
	
	private long id;
	private String name;
	private String surname;
	private DateTime dateOfBirth;
	private Address address;
	public long getId() {
		return id;
	}
	public void setId(long id) {
		isTrue(id > 0);
		this.id = id;
	}
	public String getName() {
		return name;
	}
	public void setName(String name) {
		notNull(name);
		matchesPattern(name, PATTERN_JUST_LETTER);
		Utils.sanitizeXSS(name);
		this.name = name;
	}
	public String getSurname() {
		return surname;
	}
	public void setSurname(String surname) {
		notNull(surname);
		matchesPattern(surname, PATTERN_JUST_LETTER);
		Utils.sanitizeXSS(surname);
		this.surname = surname;
	}
	public DateTime getDateOfBirth() {
		return dateOfBirth;
	}
	public void setDateOfBirth(DateTime dateOfBirth) {
		notNull(dateOfBirth);
		isTrue(Utils.canWork(dateOfBirth));
		this.dateOfBirth = dateOfBirth;
	}
	public Address getAddress() {
		return address;
	}
	public void setAddress(Address address) {
		notNull(address);
		this.address = address;
	}
	
}
