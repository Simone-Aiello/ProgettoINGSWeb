package com.progetto.persistence;

import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.SQLException;

import com.progetto.persistence.daoConcrete.AdvertiseDaoConcrete;
import com.progetto.persistence.daoConcrete.ImageDaoConcrete;
import com.progetto.persistence.daoInterfaces.AdvertiseDao;
import com.progetto.persistence.daoInterfaces.ImageDao;

public class Database {
	private Connection connection;
	private String url = "jdbc:postgresql://ec2-52-17-1-206.eu-west-1.compute.amazonaws.com:5432/da1dsc5t6a5hv9";
	private String username = "woaoipzsluykmz";
	private String password = "66692cacdfca91a26c04b1beff0bb343df782e1639d1183192d26df18f248e8d";
	private static Database instance = null;
	private ImageDao imageDao = null;
	private AdvertiseDao advertiseDao = null;
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
