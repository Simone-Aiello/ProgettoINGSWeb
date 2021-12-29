package com.progetto;

import java.util.regex.Pattern;

import org.joda.time.DateTime;

import com.progetto.model.Account;
import com.progetto.model.Notification;

public class Utils {
	
	public static final String PATTERN= "[^\\w #&;]" ;
	
	public static final int BASIC_INFO = 0;
	public static final int LIGHT = 1;
	public static final int COMPLETE = 2; 
	
	public static String sanitizeXSS(String string) {
		
		for (int i = 0; i < string.length(); i++) {
			char character = string.charAt(i) ;
			String c = ""+character;
			if(Pattern.matches(PATTERN, c))
			{
				String newSubString = "&#"+ (int)character + ";" ;
				string = string.replace(c,newSubString);
			}
		}
		return string ;
	}
	
	
	
	public static boolean canWork(DateTime dateOfBirth) {
		
		DateTime today = new DateTime() ;
		
		int year = today.getYear() -  dateOfBirth.getYear() ;
		
		if(year != 16)
			return year > 16 ;
		
		if(today.getMonthOfYear() != dateOfBirth.getMonthOfYear())
			return today.getMonthOfYear() > dateOfBirth.getMonthOfYear() ;
		
		return today.getDayOfMonth() >= dateOfBirth.getDayOfMonth() ;
		
	}
	
	public static boolean isValidTypeAccount(String typeAccount) {
		
		return typeAccount == Account.ADMIN || typeAccount == Account.USER || typeAccount == Account.WORKER ;
		
	}
	
	public static boolean isValidTypeNotification(String typeNotification) {
		
		return typeNotification == Notification.MESSAGE || typeNotification == Notification.REVIEW || typeNotification == Notification.SYSTEM ;
		
	}
	
	
}
