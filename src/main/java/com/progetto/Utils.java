package com.progetto;

import java.util.regex.Pattern;

public class Utils {
	
	public static final String PATTERN= "[^\\w #&;]" ;
	
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
}
