package com.progetto.persistence.daoConcrete;

import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.LinkedList;
import java.util.List;

import com.progetto.model.Account;
import com.progetto.model.Offer;
import com.progetto.model.Review;
import com.progetto.persistence.Database;
import com.progetto.persistence.daoInterfaces.ReviewDao;

public class ReviewDaoConcrete implements ReviewDao{
	@Override
	public List<Review> findByWorker(Account account){
		List<Review> reviews = new LinkedList<Review>();
		try {
			String query = "select * from recensioni where username_lavoratore = ?";
			PreparedStatement statement = Database.getInstance().getConnection().prepareStatement(query);
			statement.setString(1, account.getUsername());
			ResultSet set = statement.executeQuery();
			while(set.next()) {
				Review r = new Review();
				r.setId(set.getInt("id"));
				r.setDescription(set.getString("descrizione"));
				r.setRating(set.getInt("valutazione"));
				r.setTitle(set.getString("titolo"));
				//Servono i proxy
			}
		} catch (SQLException e) {
			e.printStackTrace();
		}
		return reviews;
	}
}
