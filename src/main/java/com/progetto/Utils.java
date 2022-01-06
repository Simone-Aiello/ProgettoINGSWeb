package com.progetto;

import java.io.File;
import java.io.FileNotFoundException;
import java.io.FileOutputStream;
import java.io.IOException;
import java.io.OutputStream;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.regex.Pattern;

import javax.servlet.http.HttpServletRequest;

import org.joda.time.DateTime;
import org.postgresql.shaded.com.ongres.scram.common.bouncycastle.base64.Base64;
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
	public static String convertDate(DateTime date) {
		String paddedDay = date.getDayOfMonth() < 10 ? "0" + date.getDayOfMonth() : ""+date.getDayOfMonth();
		String paddedMonth = date.getMonthOfYear() < 10 ? "0" + date.getMonthOfYear() : ""+date.getMonthOfYear();
		String convertedDate = date.getYear() + "-" + paddedMonth + "-" + paddedDay;
		return convertedDate;
	}
	
	/*private static String getPathToProfilePictureFolder(HttpServletRequest req) {
		//Ritorna il path fino a webapp
		File f = new File(req.getServletContext().getRealPath("/"));
		//prendo il path fino alla cartella profilePictures
		return f.getParentFile().getAbsolutePath()+System.getProperty("file.separator")+"resources"+System.getProperty("file.separator")+"static"+System.getProperty("file.separator")+"usersImages"+System.getProperty("file.separator")+"profilePictures";
	}
	public static String saveProfileImage(HttpServletRequest req,String base64,String usernameAccount) {
		//String pathToResources = getPathToProfilePictureFolder(req);
		String pathToResources  = req.getServletContext().getRealPath("/");
		//Prendo il valore dell'immagine e l'estensione
		String imageValue = base64.split(",")[1];
		String imageExt = base64.split("/")[1].split(";")[0];
		if(imageExt.equals("png") || imageExt.equals("png") || imageExt.equals("jpeg")) {
			byte[] imageBytes = Base64.decode(imageValue);
			//Creo una cartella per l'username se non esiste, altrimenti cancello le vecchie foto
			File directory = new File(pathToResources+System.getProperty("file.separator") + usernameAccount);
			if(!directory.exists()) {
				directory.mkdir();
			}
			else {
				for(File file : directory.listFiles()){
					file.delete();
				}
			}
			try (OutputStream stream = new FileOutputStream(directory.getAbsolutePath()+System.getProperty("file.separator")+usernameAccount+"."+imageExt)) {
				stream.write(imageBytes);
			} catch (IOException e) {
				return null;
			}
			//Ritorno la stringa che andrà nel DB
			return usernameAccount +"."+imageExt;			
		}
		return null;
	}
	public static String getPathToProfilePicture(HttpServletRequest req, String username) {
		//String pathUsernamePictureFolder = getPathToProfilePictureFolder(req) + System.getProperty("file.separator") + username;
		String pathUsernamePictureFolder = req.getServletContext().getRealPath("/testProfileImage/testProfileImage.jpeg") + System.getProperty("file.separator") + username;
		System.out.println(pathUsernamePictureFolder);
		File directoryUsername = new File(pathUsernamePictureFolder);
		System.out.println(directoryUsername.listFiles()[0].getAbsolutePath());
		String pathUsernamePictureFolder = req.getServletContext().getRealPath("/META_INF/testProfileImage/testProfileImage.jpeg");
		return pathUsernamePictureFolder;
	}*/
}
