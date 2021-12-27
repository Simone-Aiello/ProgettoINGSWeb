package com.progetto.persistence;

import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.SQLException;

import com.progetto.persistence.daoConcrete.AccountDaoConcrete;
import com.progetto.persistence.daoConcrete.AddressDaoConcrete;
import com.progetto.persistence.daoConcrete.AdvertiseDaoConcrete;
import com.progetto.persistence.daoConcrete.AreaDaoConcrete;
import com.progetto.persistence.daoConcrete.ChatDaoConcrete;
import com.progetto.persistence.daoConcrete.ImageDaoConcrete;
import com.progetto.persistence.daoConcrete.MessageDaoConcrete;
import com.progetto.persistence.daoConcrete.NotificationDaoConcrete;
import com.progetto.persistence.daoConcrete.OfferDaoConcrete;
import com.progetto.persistence.daoConcrete.ReviewDaoConcrete;
import com.progetto.persistence.daoConcrete.UserDaoConcrete;
import com.progetto.persistence.daoInterfaces.AccountDao;
import com.progetto.persistence.daoInterfaces.AddressDao;
import com.progetto.persistence.daoInterfaces.AdvertiseDao;
import com.progetto.persistence.daoInterfaces.AreaDao;
import com.progetto.persistence.daoInterfaces.ChatDao;
import com.progetto.persistence.daoInterfaces.ImageDao;
import com.progetto.persistence.daoInterfaces.MessageDao;
import com.progetto.persistence.daoInterfaces.NotificationDao;
import com.progetto.persistence.daoInterfaces.OfferDao;
import com.progetto.persistence.daoInterfaces.ReviewDao;
import com.progetto.persistence.daoInterfaces.UserDao;

public class Database {
	private Connection connection;
	private String url = "jdbc:postgresql://ec2-52-17-1-206.eu-west-1.compute.amazonaws.com:5432/da1dsc5t6a5hv9";
	private String username = "woaoipzsluykmz";
	private String password = "66692cacdfca91a26c04b1beff0bb343df782e1639d1183192d26df18f248e8d";
	private static Database instance = null;
	private ImageDao imageDao = null;
	private AdvertiseDao advertiseDao = null;
	private AccountDao accountDao = null;
	private AddressDao addressDao = null;
	private AreaDao areaDao = null;
	private ChatDao chatDao = null;
	private MessageDao messageDao = null;
	private NotificationDao notificationDao = null;
	private OfferDao offerDao = null;
	private ReviewDao reviewDao = null;
	private UserDao userDao = null;
	private Database() {
		try {
			connection = DriverManager.getConnection(url,username,password);
		} catch (SQLException e) {
			e.printStackTrace();
		}
	}
	public static Database getInstance() {
		if(instance == null) {
			instance = new Database();
		}
		return instance;
	}
	public Connection getConnection() {
		return connection;
	}
	public AccountDao getAccountDao() {
		if(accountDao == null) {
			accountDao = new AccountDaoConcrete();
		}
		return accountDao;
	}
	public AddressDao getAddressDao() {
		if(addressDao == null) {
			addressDao = new AddressDaoConcrete();
		}
		return addressDao;
	}
	public AreaDao getAreaDao() {
		if(areaDao == null) {
			areaDao = new AreaDaoConcrete();
		}
		return areaDao;
	}
	public ChatDao getChatDao() {
		if(chatDao == null) {
			chatDao = new ChatDaoConcrete();
		}
		return chatDao;
	}
	public MessageDao getMessageDao() {
		if(messageDao == null) {
			messageDao = new MessageDaoConcrete();
		}
		return messageDao;
	}
	public NotificationDao getNotificationDao() {
		if(notificationDao == null) {
			notificationDao = new NotificationDaoConcrete();
		}
		return notificationDao;
	}
	public OfferDao getOfferDao() {
		if(offerDao == null) {
			offerDao = new OfferDaoConcrete();
		}
		return offerDao;
	}
	public ReviewDao getReviewDao() {
		if(reviewDao == null) {
			reviewDao = new ReviewDaoConcrete();
		}
		return reviewDao;
	}
	public UserDao getUserDao() {
		if(userDao == null) {
			userDao = new UserDaoConcrete();
		}
		return userDao;
	}
	public ImageDao getImageDao() {
		if(imageDao == null) {
			imageDao = new ImageDaoConcrete();
		}
		return imageDao;
	}
	public AdvertiseDao getAdvertiseDao() {
		if(advertiseDao == null) {
			advertiseDao = new AdvertiseDaoConcrete();
		}
		return advertiseDao;
	}
}
