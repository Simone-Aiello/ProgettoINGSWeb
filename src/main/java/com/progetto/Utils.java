package com.progetto;

import java.util.regex.Pattern;

import org.joda.time.DateTime;
import org.springframework.security.crypto.bcrypt.BCrypt;

import com.progetto.model.Account;
import com.progetto.model.Notification;

public class Utils {
	
	public static final String PATTERN= "[^\\w #&;]" ;
	
	public static final int BASIC_INFO = 0;
	public static final int LIGHT = 1;
	public static final int COMPLETE = 2; 
	
	public final static int ACTIVATION_CODE_LENGHT = 12;
	public final static int SALT = 12;
	
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
	
	public static String getAlphaNumericString(int n) {
		String AlphaNumericString = "ABCDEFGHIJKLMNOPQRSTUVWXYZ" + "0123456789" + "abcdefghijklmnopqrstuvxyz";
		StringBuilder sb = new StringBuilder(n);
		for (int i = 0; i < n; i++) {
			int index = (int) (AlphaNumericString.length() * Math.random());
			sb.append(AlphaNumericString.charAt(index));
		}
		return sb.toString();
	}
	public static String encryptPassword(String password) {
		return BCrypt.hashpw(password, BCrypt.gensalt(Utils.SALT));
	}
}
