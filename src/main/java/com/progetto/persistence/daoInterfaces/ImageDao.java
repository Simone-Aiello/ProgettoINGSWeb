package com.progetto.persistence.daoInterfaces;

import java.io.IOException;
import java.sql.SQLException;
import java.util.List;

import com.progetto.model.Account;
import com.progetto.model.Advertise;
import com.progetto.model.Image;
import com.progetto.model.Review;

public interface ImageDao {
	List<Image> findByReview(Review review) throws SQLException;
	List<Image> findByAdvertise(Advertise advertise,int mode) throws SQLException;
	Image findByPrimaryKey(long id) throws SQLException;
	long save(Image img) throws SQLException;
	boolean alreadyExists(Image img) throws SQLException;
	void deleteByAdvertise(Advertise a) throws SQLException;
}
