package com.progetto.persistence.daoInterfaces;

import java.sql.SQLException;
import java.util.List;

import com.progetto.model.Account;
import com.progetto.model.Review;

public interface ReviewDao {
	public List<Review> findByWorker(Account account) throws SQLException;
	public void delete(Review review) throws SQLException;
	public void deleteByWorker(Account a) throws SQLException;
	public void save(Review review) throws SQLException;
}
