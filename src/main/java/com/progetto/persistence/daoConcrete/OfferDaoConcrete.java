package com.progetto.persistence.daoConcrete;

import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.ArrayList;
import java.util.List;

import com.progetto.Utils;
import com.progetto.model.Account;
import com.progetto.model.Advertise;
import com.progetto.model.Offer;
import com.progetto.persistence.Database;
import com.progetto.persistence.daoInterfaces.OfferDao;

public class OfferDaoConcrete implements OfferDao {
	
	@Override
	public boolean exists(Offer offer) throws SQLException {
		
		String FIND_BY_PRYMARY_KEY = "" + "select *" + "from proposte" + "where id = ?";
		
		PreparedStatement preparedStatement = Database.getInstance().getConnection()
				.prepareStatement(FIND_BY_PRYMARY_KEY);
		
		preparedStatement.setLong(1, offer.getId());
		
		ResultSet resultSet = preparedStatement.executeQuery() ;
		
		
		return resultSet.first();
	}
	
	private Offer loadOffer(ResultSet resultSet,int mode) throws SQLException {
		int next = mode == Utils.LIGHT ? Utils.BASIC_INFO : Utils.COMPLETE;
		Offer offer = new Offer() ;
		offer.setId(resultSet.getLong("id"));
		offer.setDescription(resultSet.getString("descrizione"));
		offer.setTitle(resultSet.getString("titolo"));
		if(mode != Utils.BASIC_INFO) {
			offer.setDone(resultSet.getBoolean("lavoro_effettuato"));
			offer.setHoursOfWork(resultSet.getInt("ore_di_lavoro"));
			Account account = Database.getInstance().getAccountDao().findByPrimaryKey(resultSet.getString("username_lavoratore"), next);
			offer.setWorker(account);
			offer.setQuote(resultSet.getDouble("preventivo"));
			Advertise advertise = Database.getInstance().getAdvertiseDao().findByPrimaryKey(resultSet.getLong("id_annuncio"), next);
			offer.setAdvertise(advertise);
		}
		return offer;
		
	}

	@Override
	public Offer findByPrimaryKey(long id_offer,int mode)  throws SQLException{

		String FIND_BY_PRYMARY_KEY = "" + "select *" + " from proposte " + " where id = ?";
		Offer offer = null;
		
		PreparedStatement preparedStatement = Database.getInstance().getConnection()
				.prepareStatement(FIND_BY_PRYMARY_KEY);
		
		preparedStatement.setLong(1, id_offer);
		
		ResultSet resultSet = preparedStatement.executeQuery() ;
		
		if(resultSet.next())
			offer = loadOffer(resultSet,mode);
		
		return offer;
	}

	@Override
	public void save(Offer offer)  throws SQLException{
		
		String query = "" ;
		
		PreparedStatement preparedStatement = null ;
		
		if(exists(offer)) {
			
			query = "insert into proposte values(null,?,?,?,?,?,?,?)" ;
			
			preparedStatement = Database.getInstance().getConnection().prepareStatement(query);
			

			preparedStatement.setString(1, offer.getDescription());
			preparedStatement.setString(2, offer.getTitle());
			preparedStatement.setDouble(3, offer.getQuote());
			preparedStatement.setBoolean(4, offer.isDone());
			preparedStatement.setString(5, offer.getWorker().getUsername());
			preparedStatement.setInt(6, offer.getHoursOfWork());
			// QUA COME FACCIO A SAPERE CHE ANNUNCIO È ? 
			preparedStatement.setLong(7,offer.getAdvertise().getId());
			
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
			preparedStatement.setLong(8,offer.getAdvertise().getId());
		}
		
		preparedStatement.execute();
		
	}

	@Override
	public void delete(Offer offer)  throws SQLException{
		
		String query = "delete from proposte where id = ?" ;
		
		PreparedStatement preparedStatement = Database.getInstance().getConnection().prepareStatement(query);	
		preparedStatement.setLong(1, offer.getId());
	
		preparedStatement.execute();
	}

	@Override
	public List<Offer> findOffersByAccount(Account worker)  throws SQLException{
		
		ArrayList<Offer> offers = new ArrayList<Offer>() ;
		
		String query = "select * from proposte where username_lavoratore = ?" ;
		
		PreparedStatement preparedStatement = Database.getInstance().getConnection().prepareStatement(query);
		preparedStatement.setString(1, worker.getUsername());
		
		ResultSet resultSet = preparedStatement.executeQuery() ;
		

		while(resultSet.next()) {
			Offer offer = loadOffer(resultSet,Utils.BASIC_INFO) ;
			offers.add(offer);
		}
		
		return offers ;
	}

	@Override
	public void deleteByAdvertise(Advertise a) throws SQLException {
		String query = "DELETE  FROM proposte WHERE id_annuncio = ?;";
		PreparedStatement stmt = Database.getInstance().getConnection().prepareStatement(query);
		stmt.setLong(1, a.getId());
		stmt.execute();
	}

	@Override
	public List<Offer> offersByAdvertise(Advertise a) throws SQLException{
		List<Offer> offers = new ArrayList<>();
		String query = "SELECT * FROM proposte WHERE id_annuncio = ?";
		PreparedStatement stmt = Database.getInstance().getConnection().prepareStatement(query);
		stmt.setLong(1, a.getId());
		ResultSet rs = stmt.executeQuery();
		while(rs.next()) {
			offers.add(loadOffer(rs, Utils.BASIC_INFO));
		}
		return offers;
	}

	@Override
	public List<Offer> findOffersByAdvertise(Advertise a) throws SQLException {
		List<Offer> offers = new ArrayList<>();
		String query = "SELECT * FROM proposte WHERE id_annuncio = ?";
		PreparedStatement stmt = Database.getInstance().getConnection().prepareStatement(query);
		stmt.setLong(1, a.getId());
		ResultSet rs = stmt.executeQuery();
		while(rs.next()) {
			Offer o = new Offer();
			o.setDescription(rs.getString("descrizione"));
			o.setHoursOfWork(rs.getInt("ore_di_lavoro"));
			o.setId(rs.getLong("id"));
			o.setQuote(rs.getDouble("preventivo"));
			o.setTitle(rs.getString("titolo"));
			Account acc = new Account();
			acc.setUsername(rs.getString("username_lavoratore"));
			o.setWorker(acc);
			o.setDates(rs.getString("disponibilità"));
			offers.add(o);
		}
		
		return offers;
	}

	@Override
	public Offer findByPrimaryKeyForUsers(long id_offer) throws SQLException {
		String query = "select * from proposte where id = ?";
		Offer o = null;
		PreparedStatement ps = Database.getInstance().getConnection().prepareStatement(query);
		ps.setLong(1, id_offer);
		ResultSet rs = ps.executeQuery();
		if(rs.next()) {
			o = new Offer();
			o.setDescription(rs.getString("descrizione"));
			o.setHoursOfWork(rs.getInt("ore_di_lavoro"));
			o.setId(rs.getLong("id"));
			o.setQuote(rs.getDouble("preventivo"));
			o.setTitle(rs.getString("titolo"));
			Account acc = new Account();
			acc.setUsername(rs.getString("username_lavoratore"));
			o.setWorker(acc);
			o.setDates(rs.getString("disponibilità"));
			o.setDone(rs.getBoolean("lavoro_effettuato"));
		}
		return o;
	}
}
