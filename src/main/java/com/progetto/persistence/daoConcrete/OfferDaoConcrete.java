package com.progetto.persistence.daoConcrete;

import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.ArrayList;
import java.util.List;

import org.springframework.boot.autoconfigure.dao.PersistenceExceptionTranslationAutoConfiguration;

import com.progetto.model.Account;
import com.progetto.model.Offer;
import com.progetto.persistence.Database;
import com.progetto.persistence.daoInterfaces.OfferDao;

public class OfferDaoConcrete implements OfferDao {
	
	
	private Offer loadOffer(ResultSet resultSet, boolean proxy) throws SQLException {

		Offer offer = new Offer() ;
		
		offer.setId(resultSet.getLong("id"));
		offer.setDescription(resultSet.getString("descrizione"));
		offer.setTitle(resultSet.getString("titolo"));
		offer.setDone(resultSet.getBoolean("lavoro_effettuato"));
		offer.setHoursOfWork(resultSet.getInt("ore_di_lavoro"));
		// USARE DAO ACCOUNT
		Account account = null ;
		offer.setWorker(account);
		offer.setQuote(resultSet.getDouble("preventivo"));
		
		

		return offer;
		
	}

	@Override
	public Offer findByPrimaryKey(long id_offer)  throws SQLException{

		String FIND_BY_PRYMARY_KEY = "" + "select *" + "from proposte" + "where id = ?";
		Offer offer = null;
		
		PreparedStatement preparedStatement = Database.getInstance().getConnection()
				.prepareStatement(FIND_BY_PRYMARY_KEY);
		
		preparedStatement.setLong(1, id_offer);
		
		ResultSet resultSet = preparedStatement.executeQuery() ;
		
		if(resultSet.next())
			offer = loadOffer(resultSet);
		
		return offer;
	}

	@Override
	public void save(Offer offer)  throws SQLException{
		
		String query = "" ;
		
		PreparedStatement preparedStatement = null ;
		
		if(findByPrimaryKey(offer.getId()) == null) {
			
			query = "insert into proposte values(?,?,?,?,?,?,?,?)" ;
			
			preparedStatement = Database.getInstance().getConnection().prepareStatement(query);
			
			preparedStatement.setLong(1, offer.getId());
			preparedStatement.setString(2, offer.getDescription());
			preparedStatement.setString(3, offer.getTitle());
			preparedStatement.setDouble(4, offer.getQuote());
			preparedStatement.setBoolean(5, offer.isDone());
			preparedStatement.setString(6, offer.getWorker().getUsername());
			preparedStatement.setInt(7, offer.getHoursOfWork());
			// QUA COME FACCIO A SAPERE CHE ANNUNCIO È ? 
			//preparedStatement.setInt(8,);
			
		}else {
			
			query = "update proposte set descrizione = ? , titolo = ? , preventivo = ? , "
					+ "lavoro_effettuato = ? , username_lavoratore = ? , ore_di_lavoro = ? , "
					+ "id_annuncio = ? "
					+ "where id = ? ";
			
			
			preparedStatement = Database.getInstance().getConnection().prepareStatement(query);
			
			
			preparedStatement.setLong(8, offer.getId());
			preparedStatement.setString(1, offer.getDescription());
			preparedStatement.setString(2, offer.getTitle());
			preparedStatement.setDouble(3, offer.getQuote());
			preparedStatement.setBoolean(4, offer.isDone());
			preparedStatement.setString(5, offer.getWorker().getUsername());
			preparedStatement.setInt(6, offer.getHoursOfWork());
			// QUA COME FACCIO A SAPERE CHE ANNUNCIO È ? 
			// preparedStatement.setInt(8,);
		}
		
		preparedStatement.execute();
		
	}

	@Override
	public void delete(long id_offer)  throws SQLException{
		
		String query = "delete from proposte where id = ?" ;
		
		PreparedStatement preparedStatement = Database.getInstance().getConnection().prepareStatement(query);	
		preparedStatement.setLong(1, id_offer);
	
		preparedStatement.execute();
	}

	@Override
	public List<Offer> findOffersByAccount(String username_worker)  throws SQLException{
		
		ArrayList<Offer> offers = new ArrayList<Offer>() ;
		
		String query = "select * from proposte where username_lavoratore = ?" ;
		
		PreparedStatement preparedStatement = Database.getInstance().getConnection().prepareStatement(query);
		preparedStatement.setString(1, username_worker);
		
		ResultSet resultSet = preparedStatement.executeQuery() ;
		

		while(resultSet.next()) {
		
			Offer offer = loadOffer(resultSet) ;
			offers.add(offer);
		
		}
		
		return offers ;
	}

}
