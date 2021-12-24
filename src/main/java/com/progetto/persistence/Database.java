package com.progetto.persistence;

import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.SQLException;

public class Database {
	private Connection connection;
	private String url = "jdbc:postgresql://ec2-52-17-1-206.eu-west-1.compute.amazonaws.com:5432/da1dsc5t6a5hv9";
	private String username = "woaoipzsluykmz";
	private String password = "66692cacdfca91a26c04b1beff0bb343df782e1639d1183192d26df18f248e8d";
	private static Database instance = null;
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
}
