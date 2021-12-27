package com.progetto.persistence.daoConcrete;

import java.io.IOException;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.LinkedList;
import java.util.List;

import com.progetto.Utils;
import com.progetto.model.Account;
import com.progetto.model.Advertise;
import com.progetto.model.Image;
import com.progetto.model.Review;
import com.progetto.persistence.Database;
import com.progetto.persistence.daoInterfaces.ImageDao;

public class ImageDaoConcrete implements ImageDao {

	@Override
	public List<Image> findByReview(Review review) throws SQLException {
		List<Image> images = new LinkedList<Image>();
		String query = "select * from immagini where id_recensione = ?";
		PreparedStatement statement = Database.getInstance().getConnection().prepareStatement(query);
		statement.setLong(1, review.getId());
		ResultSet rs = statement.executeQuery();
		while (rs.next()) {
			Image m = new Image();
			m.setId(rs.getInt("id"));
			m.setUrl(rs.getString("url"));
			images.add(m);
		}
		return images;
	}

	@Override
	public List<Image> findByAdvertise(Advertise advertise,int mode) throws SQLException {
		List<Image> images = new LinkedList<Image>();
		String query = "select * from immagini where id_annuncio = ?";
		if(mode == Utils.BASIC_INFO) {
			query += " limit 1";
		}
		PreparedStatement statement = Database.getInstance().getConnection().prepareStatement(query);
		statement.setLong(1, advertise.getId());
		ResultSet rs = statement.executeQuery();
		while (rs.next()) {
			Image m = new Image();
			m.setId(rs.getInt("id"));
			m.setUrl(rs.getString("url"));
			images.add(m);
		}
		return images;
	}

	@Override
	public void deleteByAdvertise(Advertise a) throws SQLException {
		String query = "delete from immagini where id_annuncio = ?";
		PreparedStatement st = Database.getInstance().getConnection().prepareStatement(query);
		st.setLong(1, a.getId());
		st.execute();
	}

	@Override
	public Image findByPrimaryKey(long id) throws SQLException {
		Image m = null;
		String query = "select * from immagini where id = ?";
		PreparedStatement statement = Database.getInstance().getConnection().prepareStatement(query);
		statement.setLong(1, id);
		ResultSet rs = statement.executeQuery();
		if (rs.next()) {
			m.setId(id);
			m.setUrl(rs.getString("url"));
		}
		return m;
	}

	@Override
	public void save(Image img) throws SQLException {
		if (alreadyExists(img)) {
			String insert = "insert into immagini(url) values(?)";
			PreparedStatement st = Database.getInstance().getConnection().prepareStatement(insert);
			st.setString(1, img.getUrl());
			st.execute();
		}
	}

	@Override
	public boolean alreadyExists(Image img) throws SQLException {
		String query = "select * from immagini where id = ?";
		PreparedStatement statement = Database.getInstance().getConnection().prepareStatement(query);
		statement.setLong(1, img.getId());
		ResultSet rs = statement.executeQuery();
		return rs.next();
	}

}
