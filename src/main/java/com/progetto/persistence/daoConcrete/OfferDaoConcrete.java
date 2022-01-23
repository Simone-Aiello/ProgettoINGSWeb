package com.progetto.persistence.daoConcrete;

import java.io.IOException;

import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.ArrayList;
import java.util.List;

import java.util.stream.Collectors;

import java.util.stream.Collector;
import java.util.stream.Collectors;
import org.springframework.boot.autoconfigure.dao.PersistenceExceptionTranslationAutoConfiguration;
import org.springframework.boot.jackson.JsonObjectDeserializer;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.progetto.Utils;
import com.progetto.model.Account;
import com.progetto.model.Advertise;
import com.progetto.model.Offer;
import com.progetto.persistence.Database;
import com.progetto.persistence.daoInterfaces.OfferDao;

import org.joda.time.DateTime;
import org.json.*;

public class OfferDaoConcrete implements OfferDao {

	private ObjectMapper mapper = new ObjectMapper();

	@Override
	public boolean exists(Offer offer) throws SQLException {

		if (offer.getId() <= 0)
			return false;

		String FIND_BY_PRYMARY_KEY = "select *" + "from proposte" + "where id = ?;";

		PreparedStatement preparedStatement = Database.getInstance().getConnection()
				.prepareStatement(FIND_BY_PRYMARY_KEY);

		preparedStatement.setLong(1, offer.getId());

		ResultSet resultSet = preparedStatement.executeQuery();

		return resultSet.first();
	}

	private Offer loadOffer(ResultSet resultSet, int mode) throws SQLException {
		int next = mode == Utils.LIGHT ? Utils.BASIC_INFO : Utils.COMPLETE;
		Offer offer = new Offer();
		offer.setId(resultSet.getLong("id"));
		if (resultSet.getString("descrizione") != null)
			offer.setDescription(resultSet.getString("descrizione"));
		offer.setTitle(resultSet.getString("titolo"));
		if (mode != Utils.BASIC_INFO) {
			offer.setDone(resultSet.getBoolean("lavoro_effettuato"));
			offer.setHoursOfWork(resultSet.getInt("ore_di_lavoro"));
			JSONArray object = new JSONArray(resultSet.getString("disponibilità"));
			List<String> availabilities = object.toList().stream().map(availabilitiesObject -> availabilitiesObject.toString()).toList();
			offer.setAvailabilities(availabilities);
			Account account = Database.getInstance().getAccountDao()
					.findByPrimaryKey(resultSet.getString("username_lavoratore"), next);
			offer.setWorker(account);
			ArrayList<String> a = new ArrayList<String>();
			Advertise advertise = Database.getInstance().getAdvertiseDao()
					.findByPrimaryKey(resultSet.getLong("id_annuncio"), next);
			offer.setAdvertise(advertise);
		}
		return offer;

	}

	@Override
	public Offer findByPrimaryKey(long id_offer, int mode) throws SQLException {
		String FIND_BY_PRYMARY_KEY = "select * from proposte where id = ?;";
		Offer offer = null;

		PreparedStatement preparedStatement = Database.getInstance().getConnection()
				.prepareStatement(FIND_BY_PRYMARY_KEY);

		preparedStatement.setLong(1, id_offer);

		ResultSet resultSet = preparedStatement.executeQuery();

		if (resultSet.next())
			offer = loadOffer(resultSet, mode);

		return offer;
	}

	@Override
	public long save(Offer offer) throws SQLException, JsonProcessingException {

		String query = "";

		PreparedStatement preparedStatement = null;

		long id;

		if (!exists(offer)) {

			query = "insert into proposte(descrizione,titolo,preventivo,lavoro_effettuato,username_lavoratore,ore_di_lavoro,id_annuncio,disponibilità) values(?,?,?,?,?,?,?,?) RETURNING id";

			preparedStatement = Database.getInstance().getConnection().prepareStatement(query);

			preparedStatement.setString(1, offer.getDescription());
			preparedStatement.setString(2, offer.getTitle());
			preparedStatement.setDouble(3, offer.getQuote());
			preparedStatement.setBoolean(4, offer.isDone());
			preparedStatement.setString(5, offer.getWorker().getUsername());
			preparedStatement.setInt(6, offer.getHoursOfWork());
			preparedStatement.setLong(7,offer.getAdvertise().getId());
			preparedStatement.setString(8,mapper.writeValueAsString(offer.getAvailabilities()));
			ResultSet rs = preparedStatement.executeQuery();
			rs.next();
			id = rs.getLong("id");
		} else {

			query = "update proposte set descrizione = ? , titolo = ? , preventivo = ? , "
					+ "lavoro_effettuato = ? , username_lavoratore = ? , ore_di_lavoro = ? , " + "id_annuncio = ? "
					+ "where id = ? ;";

			preparedStatement = Database.getInstance().getConnection().prepareStatement(query);

			id = offer.getId();
			preparedStatement.setLong(8, offer.getId());
			preparedStatement.setString(1, offer.getDescription());
			preparedStatement.setString(2, offer.getTitle());
			preparedStatement.setDouble(3, offer.getQuote());
			preparedStatement.setBoolean(4, offer.isDone());
			preparedStatement.setString(5, offer.getWorker().getUsername());
			preparedStatement.setInt(6, offer.getHoursOfWork());
			// QUA COME FACCIO A SAPERE CHE ANNUNCIO È ?
			preparedStatement.setLong(8, offer.getAdvertise().getId());

			preparedStatement.executeUpdate();
		}

		return id;

	}

	@Override
	public void delete(Offer offer) throws SQLException {

		String query = "delete from proposte using annunci where proposte.id = ? and username_lavoratore = ? and id_annuncio = annunci.id and (proposta_accettata is NULL or proposte.id != proposta_accettata);";

		PreparedStatement preparedStatement = Database.getInstance().getConnection().prepareStatement(query);
		preparedStatement.setLong(1, offer.getId());
		preparedStatement.setString(2,offer.getWorker().getUsername());
		System.out.println(preparedStatement.toString());
		preparedStatement.executeUpdate();
	}

	@Override
	public List<Offer> findOffersByAccount(Account worker) throws SQLException {
		List<Offer> offers = new ArrayList<>();
		String query = "SELECT * FROM proposte WHERE username_lavoratore = ?";
		PreparedStatement stmt = Database.getInstance().getConnection().prepareStatement(query);
		stmt.setString(1, worker.getUsername());
		ResultSet rs = stmt.executeQuery();
		while (rs.next()) {
			Offer o = new Offer();
			if (rs.getString("descrizione") != null)
				o.setDescription(rs.getString("descrizione"));
			o.setHoursOfWork(rs.getInt("ore_di_lavoro"));
			o.setId(rs.getLong("id"));
			o.setQuote(rs.getDouble("preventivo"));
			o.setTitle(rs.getString("titolo"));
			// RIMUOVERE SE SI PUO FARE
			o.setWorker(worker);
			o.setDates(rs.getString("disponibilità"));
			offers.add(o);
		}
		return offers;
	}

	@Override
	public void deleteByAdvertise(Advertise a) throws SQLException {
		String query = "DELETE  FROM proposte WHERE id_annuncio = ?;";
		PreparedStatement stmt = Database.getInstance().getConnection().prepareStatement(query);
		stmt.setLong(1, a.getId());
		stmt.execute();
	}

	@Override
	public List<Offer> offersByAdvertise(Advertise a) throws SQLException {
		List<Offer> offers = new ArrayList<>();
		String query = "SELECT * FROM proposte WHERE id_annuncio = ?;";
		PreparedStatement stmt = Database.getInstance().getConnection().prepareStatement(query);
		stmt.setLong(1, a.getId());
		ResultSet rs = stmt.executeQuery();
		while (rs.next()) {
			offers.add(loadOffer(rs, Utils.BASIC_INFO));
		}
		return offers;
	}

	@Override
	public List<Offer> findOffersByAdvertise(Advertise a) throws SQLException {
		List<Offer> offers = new ArrayList<>();
		String query = "SELECT proposte.descrizione, proposte.ore_di_lavoro, proposte.id, proposte.preventivo, proposte.titolo, proposte.username_lavoratore, proposte.disponibilità  FROM proposte INNER JOIN annunci ON proposte.id_annuncio = annunci.id WHERE proposte.id_annuncio = ? and proposte.rifiutata = false and annunci.username_cliente = ?";
		PreparedStatement stmt = Database.getInstance().getConnection().prepareStatement(query);
		stmt.setLong(1, a.getId());
		if (a.getAccount().getUsername() != null)
			stmt.setString(2, a.getAccount().getUsername());
		ResultSet rs = stmt.executeQuery();
		while (rs.next()) {
			Offer o = new Offer();
			if (rs.getString("descrizione") != null)
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
		if (rs.next()) {
			o = new Offer();
			if (rs.getString("descrizione") != null)
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

	public int findWorksDoneByAccount(String username) throws SQLException {
		String query = "SELECT COUNT(id) FROM proposte WHERE lavoro_effettuato AND username_lavoratore = ?";
		PreparedStatement stmt = Database.getInstance().getConnection().prepareStatement(query);
		stmt.setString(1, username);
		ResultSet rs = stmt.executeQuery();
		rs.next();
		return rs.getInt(1);
	}

	@Override
	public void refuseOffer(Long offerId) throws SQLException {
		String query = "update proposte set rifiutata = true where id = ?";
		PreparedStatement stmt = Database.getInstance().getConnection().prepareStatement(query);
		stmt.setLong(1, offerId);
		stmt.executeUpdate();
	}

	@Override
	public boolean isReviewed(Long offerId) throws SQLException {
		return Database.getInstance().getReviewDao().reviewByOfferId(offerId);
	}

	@Override
	public List<Offer> findDetailedOffersByAccount(Account worker) throws SQLException {
		List<Offer> offers = new ArrayList<>();
		String query = "SELECT * FROM proposte inner join annunci as a on id_annuncio = a.id WHERE username_lavoratore = ? and rifiutata = false";
		PreparedStatement stmt = Database.getInstance().getConnection().prepareStatement(query);
		stmt.setString(1, worker.getUsername());
		ResultSet rs = stmt.executeQuery();
		while (rs.next()) {
			Offer o = new Offer();
			Advertise a = new Advertise();
			a.setTitle(rs.getString(13));
			a.setExpiryDate(new DateTime(rs.getDate("data_scadenza")));
			Account acc = new Account();
			acc.setUsername(rs.getString("username_cliente"));
			a.setAccount(acc);
			a.setProvince(rs.getString("provincia_annuncio"));
			Long acceptedOffer = rs.getLong("proposta_accettata");
			if(acceptedOffer.equals(rs.getLong("id"))) {
				o.setAccepted(true);
			}
			if (rs.getString("descrizione") != null) {
				o.setDescription(rs.getString("descrizione"));
			}
			o.setHoursOfWork(rs.getInt("ore_di_lavoro"));
			o.setId(rs.getLong("id"));
			o.setQuote(rs.getDouble("preventivo"));
			o.setTitle(rs.getString("titolo"));
			o.setWorker(worker);
			o.setDates(rs.getString("disponibilità"));
			o.setAdvertise(a);
			o.setDone(rs.getBoolean("lavoro_effettuato"));
			offers.add(o);
		}
		return offers;
	}

	@Override
	public void markOfferAsDone(Offer offer) throws SQLException {
		String query = "update proposte set lavoro_effettuato = true from annunci where proposte.id = ? and proposte.username_lavoratore = ? and annunci.id = id_annuncio and proposte.id = annunci.proposta_accettata";
		PreparedStatement st = Database.getInstance().getConnection().prepareStatement(query);
		st.setLong(1, offer.getId());
		st.setString(2, offer.getWorker().getUsername());
		st.executeUpdate();
	}

}
