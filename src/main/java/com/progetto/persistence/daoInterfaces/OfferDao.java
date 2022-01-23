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
	Offer findByPrimaryKeyForUsers(long id_offer) throws SQLException;
	List<Offer> findOffersByAdvertise(Advertise a) throws SQLException;
	List<Offer> offersByAdvertise(Advertise a)throws SQLException;
	long save(Offer offer) throws SQLException, JsonProcessingException;	
	void delete(Offer offer) throws SQLException;
	void deleteByAdvertise(Advertise a)throws SQLException;
	void refuseOffer(Long offerId) throws SQLException;
	boolean isReviewed(Long offerId) throws SQLException;
	List<Offer> findOffersByAccount(Account worker) throws SQLException;
	int findWorksDoneByAccount(String username) throws SQLException;
	List<Offer> findDetailedOffersByAccount(Account worker) throws SQLException;
	void markOfferAsDone(Offer offer) throws SQLException;
}
