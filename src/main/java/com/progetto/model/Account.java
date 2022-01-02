package com.progetto.model;

import java.util.List;

import static org.apache.commons.lang3.Validate.*;

import org.springframework.util.Assert;

import com.progetto.Utils;

public class Account {
	
	//PATTERNS
	private static final String USERNAME_PATTERN = "[\\w-]+" ;
	private static final String EMAIL_PATTERN = "\\w+([\\.-]?\\w+)*@\\w+([\\.-]?\\w+)*(\\.\\w{2,3})+" ;
	private static final String NUMBER_PATTERN = "([0-9]{10}|0[0-9]{8})";
	private static final String PATTERN_TYPEACCOUNT = "[awu]";
	
	public static final String WORKER = "w";
	public static final String ADMIN = "a";
	public static final String USER = "u";
	
	private String username;
	private String password;
	private String email;
	private String number;
	private String provinceOfWork;
	private String accountType;
	private Image profilePic;
	private List<Area> areasOfWork;
	private List<Review> reviews;
	private User personalInfo;
	
	
	public List<Review> getReviews() {
		return reviews;
	}
	public void setReviews(List<Review> reviews) {
		notNull(reviews);
		this.reviews = reviews;
	}
	public User getPersonalInfo() {
		return personalInfo;
	}
	public void setPersonalInfo(User personalInfo) {
		notNull(personalInfo);
		this.personalInfo = personalInfo;
	}
	public List<Area> getAreasOfWork() {
		return areasOfWork;
	}
	public void setAreasOfWork(List<Area> areasOfWork) {
		notNull(areasOfWork);
		this.areasOfWork = areasOfWork;
	}
	public String getUsername() {
		return username;
	}
	public void setUsername(String username) {
		notNull(username);
		matchesPattern(username, USERNAME_PATTERN);
		Utils.sanitizeXSS(username);
		this.username = username;
	}
	
	public String getPassword() {
		return password;
	}
	public void setPassword(String password) {
		notNull(password);
		this.password = password;
	}
	public String getEmail() {
		return email;
	}
	public void setEmail(String email) {
		notNull(email);
		matchesPattern(email, EMAIL_PATTERN);
		Utils.sanitizeXSS(email);
		this.email = email;
	}
	public String getNumber() {
		return number;
	}
	public void setNumber(String number) {
		notNull(number);
		matchesPattern(number, NUMBER_PATTERN);
		Utils.sanitizeXSS(number);
		this.number = number;
	}
	
	public Image getProfilePic() {
		return profilePic;
	}
	public void setProfilePic(Image profilePic) {
		notNull(profilePic);
		this.profilePic = profilePic;
	}

	public String getProvinceOfWork() {
		return provinceOfWork;
	}
	public void setProvinceOfWork(String provinceOfWork) {
		notNull(provinceOfWork);
		Utils.sanitizeXSS(provinceOfWork);
		this.provinceOfWork = provinceOfWork;
	}
	public String getAccountType() {
		return accountType;
	}
	
	public void setAccountType(String accountType) {
		notNull(accountType);
		matchesPattern(accountType, PATTERN_TYPEACCOUNT);
		this.accountType = accountType;
	}
}
