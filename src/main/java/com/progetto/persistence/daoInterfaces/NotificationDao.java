package com.progetto.persistence.daoInterfaces;

import java.sql.SQLException;
import java.util.List;

import com.progetto.model.Account;
import com.progetto.model.Notification;
import com.progetto.model.Offer;

public interface NotificationDao {
	
	boolean exists(Notification notification) throws SQLException;
	Notification findByPrimaryKey(long id_notification) throws SQLException ;
	void save(Notification notification) throws SQLException ;
	void delete(Notification notification) throws SQLException ;
	List<Notification> findNotificationsByReceiver(Account receiver) throws SQLException ;
	
}
