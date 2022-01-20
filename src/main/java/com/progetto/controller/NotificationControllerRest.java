package com.progetto.controller;

import java.sql.SQLException;
import java.util.List;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import com.progetto.model.Account;
import com.progetto.model.Notification;
import com.progetto.persistence.Database;

@RestController
public class NotificationControllerRest {

	@GetMapping("/unreadNotifications")
	public boolean hasUnreadNotifications(HttpServletRequest req, HttpServletResponse resp) {
		try {
			if (req.getSession(false) == null || req.getSession(false).getAttribute("username") == null)
				return false;
			Account a = new Account();
			a.setUsername((String) req.getSession().getAttribute("username"));
			return Database.getInstance().getNotificationDao().hasUnreadNotification(a);
		} catch (SQLException e) {
			e.printStackTrace();
			resp.setStatus(500);
			return false;
		}
	}

	@GetMapping("/getNotifications")
	public List<Notification> getNotifications(HttpServletRequest req, HttpServletResponse resp) {
		try {
			if (req.getSession(false) == null || req.getSession(false).getAttribute("username") == null)
				return null;
			Account a = new Account();
			a.setUsername((String) req.getSession().getAttribute("username"));
			return Database.getInstance().getNotificationDao().findNotificationsByReceiver(a);
		} catch (SQLException e) {
			e.printStackTrace();
			resp.setStatus(500);
			return null;
		}
	}

	@PostMapping("/markAsRead")
	public void markAsRead(@RequestBody List<Notification> notifications, HttpServletRequest req,
			HttpServletResponse resp) {
		try {
			if (req.getSession(false) == null || req.getSession(false).getAttribute("username") == null
					|| notifications.size() == 0)
				return;
			for (Notification n : notifications) {
				Account a = new Account();
				a.setUsername((String) req.getSession(false).getAttribute("username"));
				n.setReceiver(a);
			}
			Database.getInstance().getNotificationDao().markAllAsRead(notifications);
		} catch (SQLException e) {
			resp.setStatus(500);
			e.printStackTrace();
		}
	}

	@PostMapping("/deleteNotification")
	public void deleteNotification(@RequestBody Notification n, HttpServletRequest req, HttpServletResponse resp) {
		try {
			if (req.getSession(false) == null || req.getSession(false).getAttribute("username") == null)
				return;
			Account a = new Account();
			a.setUsername((String) req.getSession(false).getAttribute("username"));
			n.setReceiver(a);
			Database.getInstance().getNotificationDao().delete(n);
		} catch (SQLException e) {
			resp.setStatus(500);
			e.printStackTrace();
		}
	}
}
