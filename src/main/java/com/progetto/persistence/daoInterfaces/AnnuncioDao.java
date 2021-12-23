package com.progetto.persistence.daoInterfaces;

import java.util.List;

import com.progetto.model.Advertise;

public interface AnnuncioDao {
	public Advertise findByPrimaryKey(long id);
	public void insertOrUpdate(Advertise a);
	public List<Advertise> findAll();
	public void delete(Advertise a);
	public List<Advertise> findGroup(String keyword,List<String> areas,List<String> provinces,Integer quantity,Integer offset);
}
/*
Find by primary key

insert or update

find all

delete 
*/
