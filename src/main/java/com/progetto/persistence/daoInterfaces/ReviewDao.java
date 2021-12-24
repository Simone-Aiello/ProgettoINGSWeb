package com.progetto.persistence.daoInterfaces;

import java.util.List;

import com.progetto.model.Account;
import com.progetto.model.Review;

public interface ReviewDao {
	public List<Review> findByWorker(Account account);
}
