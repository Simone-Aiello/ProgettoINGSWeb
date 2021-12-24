package com.progetto.persistence.daoInterfaces;

import java.sql.SQLException;
import java.util.List;

import org.springframework.boot.autoconfigure.dao.PersistenceExceptionTranslationAutoConfiguration;

import com.progetto.model.Account;
import com.progetto.model.Offer;

public interface OfferDao {
	
	Offer findByPrimaryKey(long id_offer) throws SQLException;
	void save(Offer offer) throws SQLException;
	void delete(long id_offer) throws SQLException;
	List<Offer> findOffersByAccount(String username_worker) throws SQLException;
	

}
