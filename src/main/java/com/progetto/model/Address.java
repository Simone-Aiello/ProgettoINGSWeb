package com.progetto.model;

import static org.apache.commons.lang3.Validate.*;

import com.progetto.Utils;

public class Address {
	private long id;
	private String via;
	private String houseNumber;
	private String zipCode;
	private String town;
	private String province;
	public long getId() {
		return id;
	}
	public void setId(long id) {
		isTrue(id >0);
		this.id = id;
	}
	public String getVia() {
		return via;
	}
	public void setVia(String via) {
		notNull(via);
		Utils.sanitizeXSS(via);
		this.via = via;
	}
	public String getHouseNumber() {
		return houseNumber;
	}
	public void setHouseNumber(String houseNumber) {
		notNull(houseNumber);
		Utils.sanitizeXSS(houseNumber);
		this.houseNumber = houseNumber;
	}
	public String getZipCode() {
		return zipCode;
	}
	public void setZipCode(String zipCode) {
		notNull(zipCode);
		Utils.sanitizeXSS(zipCode);
		this.zipCode = zipCode;
	}
	public String getTown() {
		return town;
	}
	public void setTown(String town) {
		notNull(town);
		Utils.sanitizeXSS(town);
		this.town = town;
	}
	public String getProvince() {
		return province;
	}
	public void setProvince(String province) {
		notNull(province);
		Utils.sanitizeXSS(province);
		this.province = province;
	}
	
}
