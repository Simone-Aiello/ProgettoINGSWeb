package com.progetto.persistence;


import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;

public class IdBroker {
	private static IdBroker instance = null;
	private IdBroker() {
		
	}
	public static IdBroker getInstance() {
		if(instance == null) {
			instance = new IdBroker();
		}
		return instance;
	}
	public Long getId(Class<?> c) throws SQLException {
		//Se gli passo una classe che non ha una sequenza mi ritorna una sqlexception, da gesitire questa cosa
		String query = "select nextval(?) as id";
		PreparedStatement statement = Database.getInstance().getConnection().prepareStatement(query);
		statement.setString(1, c.getSimpleName().toLowerCase());
		ResultSet set = statement.executeQuery();
		set.next();
		return set.getLong("id");
	}
}
