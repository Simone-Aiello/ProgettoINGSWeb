package com.progetto.persistence.daoInterfaces;

import java.sql.SQLException;
import java.util.List;

import org.springframework.boot.autoconfigure.dao.PersistenceExceptionTranslationAutoConfiguration;

import com.progetto.model.Account;
import com.progetto.model.Offer;

public interface OfferDao {
	
	
	boolean exists(Offer offer) throws SQLException;		
	Offer findByPrimaryKey(long id_offer) throws SQLException;
	void save(Offer offer) throws SQLException;	
	void delete(Offer offer) throws SQLException;
	List<Offer> findOffersByAccount(Account worker) throws SQLException;
	

}
