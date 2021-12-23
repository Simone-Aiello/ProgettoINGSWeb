package com.progetto.persistence.daoInterfaces;

import java.util.List;

import com.progetto.model.Advertise;
import com.progetto.model.Image;
import com.progetto.model.Review;

public interface ImageDao {
	List<Image> findByReview(Review review);
	List<Image> findByAdvertise(Advertise advertise);
	Image findByPrimaryKey(long id);
}
