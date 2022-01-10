package com.progetto.persistence.daoConcrete;

import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.ArrayList;
import java.util.List;

import com.progetto.model.Account;
import com.progetto.model.Notification;
import com.progetto.model.Offer;
import com.progetto.persistence.Database;
import com.progetto.persistence.daoInterfaces.NotificationDao;

public class NotificationDaoConcrete implements NotificationDao{

	
	private Notification loadNotification(ResultSet resultSet) throws SQLException {
		
		Notification notification = null ;
		
		notification.setId(resultSet.getLong("id"));
		notification.setText(resultSet.getString("contenuto"));
		notification.setType(resultSet.getString("tipologia"));
		
		return notification ;
		
	}
	
	@Override
	public boolean exists(Notification notification) throws SQLException {
		
		String FIND_BY_PRYMARY_KEY = "" + "select *" + "from notifiche" + "where id = ?";
		
		PreparedStatement preparedStatement = Database.getInstance().getConnection()
				.prepareStatement(FIND_BY_PRYMARY_KEY);
		
		preparedStatement.setLong(1, notification.getId());
		
		ResultSet resultSet = preparedStatement.executeQuery() ;
		
		
		return resultSet.first();
	}

	@Override
	public Notification findByPrimaryKey(long id_notification) throws SQLException {

		String FIND_BY_PRYMARY_KEY = "" + "select *" + "from notifiche" + "where id = ?";
		
		PreparedStatement preparedStatement = Database.getInstance().getConnection()
				.prepareStatement(FIND_BY_PRYMARY_KEY);
		
		preparedStatement.setLong(1, id_notification);
		
		ResultSet resultSet = preparedStatement.executeQuery() ;
		
		Notification notification = null ;
		
		if(resultSet.first()) {
			
			notification = loadNotification(resultSet);
			
		}
		
		return notification ;		
	}

	@Override
	public void save(Notification notification) throws SQLException {
		
		String query = null ;
		
		PreparedStatement preparedStatement = null ;
		
		if(exists(notification)) {
			
			query = "update notifiche set contenuto = ? , tipologia = ? where id = ? " ;
			
			preparedStatement = Database.getInstance().getConnection().prepareStatement(query);
			
			preparedStatement.setString(1, notification.getText());
			preparedStatement.setString(2, notification.getType()) ;
			preparedStatement.setLong(3, notification.getId());
			
		}else {
			
			query = "insert into notifiche(contenuto,tipologia) values(?,?) " ;
			
			preparedStatement = Database.getInstance().getConnection().prepareStatement(query);
			
			preparedStatement.setString(1, notification.getText());
			preparedStatement.setString(2, notification.getType()) ;
			
		}
		
		preparedStatement.execute();
	}

	@Override
	public void delete(Notification notification) throws SQLException {
		
		String query = "delete from notifiche where id = ?" ;
		
		PreparedStatement preparedStatement = Database.getInstance().getConnection().prepareStatement(query);	
		preparedStatement.setLong(1, notification.getId());
	
		preparedStatement.execute();
		
	}

	@Override
	public List<Notification> findNotificationsByReceiver(Account receiver) throws SQLException {
		
		ArrayList<Notification> notifications = new ArrayList<Notification>() ;
		
		String query = "select * from notifiche where account_user = ?" ;
		
		PreparedStatement preparedStatement = Database.getInstance().getConnection().prepareStatement(query);
		preparedStatement.setString(1, receiver.getUsername());
		
		ResultSet resultSet = preparedStatement.executeQuery() ;
		

		while(resultSet.next()) {
		
			Notification notification = loadNotification(resultSet) ;
			notifications.add(notification);
		
		}
		
		return notifications ;
	}

}
