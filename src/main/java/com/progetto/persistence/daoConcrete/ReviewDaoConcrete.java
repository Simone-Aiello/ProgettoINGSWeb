package com.progetto.persistence.daoConcrete;

import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.LinkedList;
import java.util.List;

import javax.xml.crypto.Data;

import com.progetto.model.Account;
import com.progetto.model.Advertise;
import com.progetto.model.Image;
import com.progetto.model.Offer;
import com.progetto.model.Review;
import com.progetto.persistence.Database;
import com.progetto.persistence.daoInterfaces.ReviewDao;

public class ReviewDaoConcrete implements ReviewDao {
	@Override
	public List<Review> findByWorker(Account account) throws SQLException {
		List<Review> reviews = new LinkedList<Review>();
		String query = "select * from recensioni where username_lavoratore = ?";
		PreparedStatement statement = Database.getInstance().getConnection().prepareStatement(query);
		statement.setString(1, account.getUsername());
		ResultSet set = statement.executeQuery();
		while (set.next()) {
			Review r = new Review();
			r.setId(set.getInt("id"));
			r.setDescription(set.getString("descrizione"));
			r.setRating(set.getInt("valutazione"));
			r.setTitle(set.getString("titolo"));
			// Servono i proxy
		}
		return reviews;
	}

	@Override
	public void delete(Review review) throws SQLException {
		String query = "delete from recensioni where id = ?";
		PreparedStatement statement = Database.getInstance().getConnection().prepareStatement(query);
		statement.setLong(1, review.getId());
		statement.execute();
	}
	private void saveImages(Review r) throws SQLException {
		String query = "update immagini set id_recensione = ? where id = ?;";
		for (Image m : r.getImages()) {
			Database.getInstance().getImageDao().save(m);
			PreparedStatement st = Database.getInstance().getConnection().prepareStatement(query);
			st.setLong(1, r.getId());
			st.setLong(2, m.getId());
			st.execute();
		}
	}
	@Override
	public void save(Review review) throws SQLException {
		String query = "insert into recensioni(descrizione,titolo,valutazione,id_proposta,username_cliente,username_lavoratore) values(?,?,?,?,?,?)";
		PreparedStatement statement = Database.getInstance().getConnection().prepareStatement(query);
		statement.setString(1, review.getDescription());
		statement.setString(2, review.getTitle());
		statement.setInt(3, review.getRating());
		statement.setLong(4, review.getOffer().getId());
		statement.setString(5, review.getClient().getUsername());
		statement.setString(6, review.getWorker().getUsername());
		statement.execute();
		saveImages(review);
	}

	@Override
	public void deleteByWorker(Account a) throws SQLException {
		String query = "DELETE FROM recensioni WHERE username_lavoratore = ?;";
		PreparedStatement stmt = Database.getInstance().getConnection().prepareStatement(query);
		stmt.setString(1, a.getUsername());
		stmt.execute();
	}
}
