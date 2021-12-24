package com.progetto.persistence.daoInterfaces;

import java.util.List;

import com.progetto.model.Advertise;

public interface AnnuncioDao {
	Advertise findByPrimaryKey(long id);
	void insertOrUpdate(Advertise a);
	List<Advertise> findAll();
	void delete(Advertise a);
	List<Advertise> findGroup(String keyword,List<String> areas,List<String> provinces,Integer quantity,Integer offset);

	// Aggiungere un metodo per prendere un annuncio data una proposta 
}
/*
Find by primary key

insert or update

find all

delete 
*/
