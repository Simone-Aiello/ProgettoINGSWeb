package com.progetto.persistence.daoConcrete;

import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.LinkedList;
import java.util.List;

import com.progetto.model.Advertise;
import com.progetto.model.Image;
import com.progetto.model.Review;
import com.progetto.persistence.Database;
import com.progetto.persistence.daoInterfaces.ImageDao;

public class ImageDaoConcrete implements ImageDao{

	@Override
	public List<Image> findByReview(Review review) {
		List<Image> images = new LinkedList<Image>();
		try {
			String query = "select * from immagini where id_recensione = ?";
			PreparedStatement statement = Database.getInstance().getConnection().prepareStatement(query);
			statement.setLong(1, review.getId());
			ResultSet rs = statement.executeQuery();
			while(rs.next()){
				Image m = new Image();
				m.setId(rs.getInt("id"));
				m.setUrl(rs.getString("url"));
				images.add(m);
			}
		} catch (SQLException e) {
			e.printStackTrace();
		}
		return images;
	}

	@Override
	public List<Image> findByAdvertise(Advertise advertise) {
		List<Image> images = new LinkedList<Image>();
		try {
			String query = "select * from immagini where id_annuncio = ?";
			PreparedStatement statement = Database.getInstance().getConnection().prepareStatement(query);
			statement.setLong(1, advertise.getId());
			ResultSet rs = statement.executeQuery();
			while(rs.next()){
				Image m = new Image();
				m.setId(rs.getInt("id"));
				m.setUrl(rs.getString("url"));
				images.add(m);
			}
		} catch (SQLException e) {
			e.printStackTrace();
		}
		return images;
	}

	@Override
	public Image findByPrimaryKey(long id) {
		Image m = null;
		try {
			String query = "select * from immagini where id = ?";
			PreparedStatement statement = Database.getInstance().getConnection().prepareStatement(query);
			statement.setLong(1, id);
			ResultSet rs = statement.executeQuery();
			if(rs.next()){
				m.setId(id);
				m.setUrl(rs.getString("url"));
			}
		} catch (SQLException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
		return m;
	}

}
