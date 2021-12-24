package com.progetto.model;

import java.util.List;

public class Account {
	public static final String WORKER = "w";
	public static final String ADMIN = "a";
	public static final String USER = "u";
	private String username;
	private String password;
	private String email;
	private String number;
	private Image profilePic;
	private String provinceOfWork;
	private String accountType;
	private List<Area> areasOfWork;
	private List<Review> reviews;
	public List<Review> getReviews() {
		return reviews;
	}
	public void setReviews(List<Review> reviews) {
		this.reviews = reviews;
	}
	private User personalInfo;
	
	public User getPersonalInfo() {
		return personalInfo;
	}
	public void setPersonalInfo(User personalInfo) {
		this.personalInfo = personalInfo;
	}
	public List<Area> getAreasOfWork() {
		return areasOfWork;
	}
	public void setAreasOfWork(List<Area> areasOfWork) {
		this.areasOfWork = areasOfWork;
	}
	public String getUsername() {
		return username;
	}
	public void setUsername(String username) {
		this.username = username;
	}
	public String getPassword() {
		return password;
	}
	public void setPassword(String password) {
		this.password = password;
	}
	public String getEmail() {
		return email;
	}
	public void setEmail(String email) {
		this.email = email;
	}
	public String getNumber() {
		return number;
	}
	public void setNumber(String number) {
		this.number = number;
	}
	public Image getProfilePic() {
		return profilePic;
	}
	public void setProfilePic(Image profilePic) {
		this.profilePic = profilePic;
	}
	public String getProvinceOfWork() {
		return provinceOfWork;
	}
	public void setProvinceOfWork(String provinceOfWork) {
		this.provinceOfWork = provinceOfWork;
	}
	public String getAccountType() {
		return accountType;
	}
	public void setAccountType(String accountType) {
		this.accountType = accountType;
	}
}
