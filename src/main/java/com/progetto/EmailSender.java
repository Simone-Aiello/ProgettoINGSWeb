package com.progetto;

import java.util.Properties;

import javax.mail.Message;
import javax.mail.MessagingException;
import javax.mail.Session;
import javax.mail.Transport;
import javax.mail.internet.AddressException;
import javax.mail.internet.InternetAddress;
import javax.mail.internet.MimeMessage;

import org.springframework.scheduling.annotation.Async;

public class EmailSender implements Runnable{

	private static String USER_NAME = "getjobsingsweb"; // GMail user name
	private static String PASSWORD = "ingsweb1234"; // GMail password
	private static EmailSender instance = null;
	private static Properties props = System.getProperties();
	private static String host = "smtp.gmail.com";
	
	private String lastUserMail = "";
	private String lastSubject = "";
	private String lastBody = "";
	
	private EmailSender() {
		props.put("mail.smtp.starttls.enable", "true");
		props.put("mail.smtp.host", host);
		props.put("mail.smtp.user", USER_NAME);
		props.put("mail.smtp.password", PASSWORD);
		props.put("mail.smtp.port", "587");
		props.put("mail.smtp.auth", "true");
		props.put("mail.smtp.ssl.trust", "smtp.gmail.com");
	}

	public static EmailSender getInstance() {
		if (instance == null) {
			instance = new EmailSender();
		}
		return instance;
	}
	
	public void sendEmail(String userMail, String subject, String body) {
		lastUserMail = userMail;
		lastSubject = subject;
		lastBody = body;
		new Thread(this).start();
	}
	private void sendFromGMail(String from, String pass, String to, String subject, String body) {
		Session session = Session.getDefaultInstance(props);
		MimeMessage message = new MimeMessage(session);
		try {
			message.setFrom(new InternetAddress(from));
			InternetAddress toAddress = new InternetAddress(to);
			message.addRecipient(Message.RecipientType.TO, toAddress);
			message.setSubject(subject);
			message.setText(body);
			Transport transport = session.getTransport("smtp");
			transport.connect(host, from, pass);
			transport.sendMessage(message, message.getAllRecipients());
			transport.close();
		} catch (AddressException ae) {
			ae.printStackTrace();
		} catch (MessagingException me) {
			me.printStackTrace();
		}
	}

	@Override
	public void run() {
		sendFromGMail(USER_NAME, PASSWORD, lastUserMail, lastSubject, lastBody);
	}
}

