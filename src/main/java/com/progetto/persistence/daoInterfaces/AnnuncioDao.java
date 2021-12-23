package com.progetto.persistence.daoInterfaces;

import java.util.List;

import com.progetto.model.Advertise;

public interface AnnuncioDao {
	public Advertise findByPrimaryKey(long id);
	public void insertOrUpdate(Advertise a);
	public void delete(Advertise a);
	public List<Advertise> findGroup(String keyword,List<String> areas,List<String> provinces,Integer quantity,Integer offset);
}
