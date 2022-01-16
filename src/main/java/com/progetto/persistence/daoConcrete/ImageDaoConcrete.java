package com.progetto.persistence.daoConcrete;

import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.LinkedList;
import java.util.List;

import com.progetto.Utils;
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
			m.setValue(rs.getString("value"));
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
			m.setValue(rs.getString("value"));
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
			m = new Image();
			m.setId(id);
			m.setValue(rs.getString("value"));
		}
		return m;
	}

	@Override
	public long save(Image img) throws SQLException {
		if(alreadyExists(img)) {
			String update = "UPDATE immagini SET value = ? where id = ?;";
			PreparedStatement stmt = Database.getInstance().getConnection().prepareStatement(update);
			stmt.setString(1, img.getValue());
			stmt.setLong(2, img.getId());
			stmt.execute();
		}
		else if(img.getValue() != null){
			String insert = "insert into immagini(value) values(?) RETURNING id";
			PreparedStatement st = Database.getInstance().getConnection().prepareStatement(insert);
			st.setString(1, img.getValue());
			ResultSet rs = st.executeQuery();
			rs.next();
			img.setId(rs.getLong("id"));
			
		}
		return img.getId();
	}

	@Override
	public boolean alreadyExists(Image img) throws SQLException {
		String query = "select * from immagini where id = ?";
		PreparedStatement statement = Database.getInstance().getConnection().prepareStatement(query);
		statement.setLong(1, img.getId());
		ResultSet rs = statement.executeQuery();
		return rs.next();
	}

	@Override
	public void delete(long id) throws SQLException {
		String query = "delete from immagini where id = ?";
		PreparedStatement st = Database.getInstance().getConnection().prepareStatement(query);
		st.setLong(1, id);
		st.execute();
	}

}
