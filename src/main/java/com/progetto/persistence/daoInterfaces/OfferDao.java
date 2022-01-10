package com.progetto.persistence.daoInterfaces;

import java.sql.SQLException;
import java.util.List;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.progetto.model.Account;
import com.progetto.model.Advertise;
import com.progetto.model.Offer;

public interface OfferDao {
	
	
	boolean exists(Offer offer) throws SQLException;		
	Offer findByPrimaryKey(long id_offer,int mode) throws SQLException;
	List<Offer> offersByAdvertise(Advertise a)throws SQLException;
	long save(Offer offer) throws SQLException, JsonProcessingException;	
	void delete(Offer offer) throws SQLException;
	void deleteByAdvertise(Advertise a)throws SQLException;
	List<Offer> findOffersByAccount(Account worker) throws SQLException;
	

}
