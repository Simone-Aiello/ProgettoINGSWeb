package com.progetto.persistence.daoConcrete;

import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.ArrayList;
import java.util.List;

import com.progetto.model.Account;
import com.progetto.model.Advertise;
import com.progetto.model.Area;
import com.progetto.model.Notification;
import com.progetto.persistence.Database;
import com.progetto.persistence.daoInterfaces.NotificationDao;

public class NotificationDaoConcrete implements NotificationDao{

	
	private Notification loadNotification(ResultSet resultSet) throws SQLException {
		
		Notification notification = new Notification();
		
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
			
			query = "insert into notifiche(contenuto,tipologia,account_username) values(?,?,?) " ;
			
			preparedStatement = Database.getInstance().getConnection().prepareStatement(query);
			
			preparedStatement.setString(1, notification.getText());
			preparedStatement.setString(2, notification.getType());
			preparedStatement.setString(3, notification.getReceiver().getUsername());
			
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
	//NEEDS REFACTOR
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

	@Override
	public void saveNotificationByOfferRefuse(Notification notification) throws SQLException {
		String SAVE_NOTIFICATION = "insert into notifiche(contenuto,tipologia,account_username) values(?,CAST(? AS tipologia_notifica),?) returning id";
		String SAVE_NOTIFICATION_ACCOUNT_NOTIFICHE = "insert into account_notifiche(id_notifica,username_ricevente) values(?,?)";
		PreparedStatement ps = Database.getInstance().getConnection().prepareStatement(SAVE_NOTIFICATION);
		
		ps.setString(1, notification.getText());
		ps.setString(2, notification.getType());
		ps.setString(3, notification.getReceiver().getUsername());
		
		ResultSet rs = ps.executeQuery();
		rs.next();
		int id = rs.getInt(1);
		PreparedStatement ps1 = Database.getInstance().getConnection().prepareStatement(SAVE_NOTIFICATION_ACCOUNT_NOTIFICHE);
		ps1.setInt(1, id);
		ps1.setString(2, notification.getReceiver().getUsername());
		ps1.execute();
	}
	
	public void saveNotificationByAdvertise(Advertise a) throws SQLException {
		//Insert notification
		String saveNotificationQuery = "INSERT INTO notifiche(contenuto, tipologia, account_username) values(?, cast(? as tipologia_notifica), ?) RETURNING id";
		PreparedStatement stmtSaveNotification = Database.getInstance().getConnection().prepareStatement(saveNotificationQuery);
		stmtSaveNotification.setString(1, "Un annuncio che potrebbe interessarti: " + a.getTitle());
		stmtSaveNotification.setString(2, Notification.ADVERTISE);
		stmtSaveNotification.setString(3, a.getAccount().getUsername());
		ResultSet rs = stmtSaveNotification.executeQuery();
		rs.next();
		long idNotification = rs.getLong("id");
		//Insert associations between workers and the advertise
		List<Account> workers = Database.getInstance().getAccountDao().findWorkersByProvince(a.getProvince());
		for(Account w: workers) {
			//if the worker works for at least one of the areas in advertise then he should be notified 
			for(Area area: a.getInterestedAreas()) {
				if(w.getAreasOfWork().contains(area)) {
					String saveAssociationsQuery = "INSERT INTO account_notifiche(id_notifica, username_ricevente) values(?, ?)";
					PreparedStatement stmtSaveAssociation = Database.getInstance().getConnection().prepareStatement(saveAssociationsQuery);
					stmtSaveAssociation.setLong(1, idNotification);
					stmtSaveAssociation.setString(2, w.getUsername());
					stmtSaveAssociation.execute();
					//notify the worker only one time (for the first area)
					break;
				}
			}
		}
	}

}
