package com.progetto.model;

import java.util.ArrayList;
import java.util.Iterator;
import java.util.List;
import java.util.regex.Matcher;
import java.util.regex.Pattern;

import static org.apache.commons.lang3.Validate.*;
import org.joda.time.DateTime;
import org.springframework.http.codec.cbor.Jackson2CborEncoder;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

import com.progetto.Utils;

@RestController
public class Advertise {
	
	private final Long id;
	private String description;
	private final String title;
	private DateTime expiryDate;
	private final Account user;
	private final List<Area> interestedAreas;
	private final List<Image> images;
	private Offer acceptedOffer = null;
	private final List<Offer> offers;
	private String prova ;
	

	
	public static void main(String[] args) {
		
		Advertise.Builder builder = new Advertise.Builder();
	}

	public  final class Builder{
		
		private Advertise advertise ;
		private boolean built = false ;
		
		private  Long id;
		private  String description;
		private  String title;
		private  DateTime expiryDate;
		private  Account user;
		private  List<Area> interestedAreas;
		private  List<Image> images;
		private  Offer acceptedOffer = null;
		private  List<Offer> offers;
		public   String prova ;
		
	
		
		public Builder setId(Long id) {
			notNull(id);
			this.id = id;
			this.prova = "ciao";
			return this;
		}
		
		public Builder setDescription(String description) {
			notNull(description);
			description.trim();
			notBlank(description);
			this.description = Utils.sanitizeXSS(description);
			return this;
		}
		public Builder setTitle(String title) {
			notNull(title);
			title.trim();
			notBlank(title);
			this.title = Utils.sanitizeXSS(title);
			return this;
		}
		public Builder setExpiryDate(DateTime expiryDate) {
			notNull(expiryDate);
			this.expiryDate = expiryDate;
			return this;
		}
		public Builder setUser(Account user) {
			notNull(user);
			this.user = user;
			return this;
		}
		public Builder setInterestedAreas(List<Area> interestedAreas) {
			notNull(interestedAreas);
			this.interestedAreas = interestedAreas;
			return this;
		}
		public Builder setImages(List<Image> images) {
			notNull(images);
			this.images = images;
			return this;
		}
		public Builder setAcceptedOffer(Offer acceptedOffer) {
			notNull(acceptedOffer);
			this.acceptedOffer = acceptedOffer;
			return this;
		}
		public Builder setOffers(List<Offer> offers) {
			notNull(offers);
			this.offers = offers;
			return this;
		}
		
		public boolean mandatoryFieldsAreNull() {
			
			return id == null || description == null || title == null || 
					expiryDate == null || interestedAreas == null || user== null ;
		}
		
		
		public Advertise build() {
			validState(!built,"Il costruttore è stato già utilizzato, non è più valido");
			validState(!mandatoryFieldsAreNull(),"Alcuni campi obbligatori non sono stati impostati");
			if (!mandatoryFieldsAreNull()) 
				built = true ;
			advertise = new Advertise(id, description, title, expiryDate, user, interestedAreas, images,
					acceptedOffer, offers);
			return advertise ;
		}
		
	}
	
	public Advertise(long id, String description, String title, DateTime expiryDate, Account user,
			List<Area> interestedAreas, List<Image> images, Offer acceptedOffer, List<Offer> offers) {
		super();
		this.id = id;
		this.description = description;
		this.title = title;
		this.expiryDate = expiryDate;
		this.user = user;
		this.interestedAreas = interestedAreas;
		this.images = images == null ? new ArrayList<Image>() : images;
		this.acceptedOffer = acceptedOffer;
		this.offers = offers == null ? new ArrayList<Offer>() : offers;
		
		
	}
	
	public Offer getAcceptedOffer() {
		return acceptedOffer;
	}
	public void setAcceptedOffer(Offer acceptedOffer) {
		this.acceptedOffer = acceptedOffer;
	}
	public List<Offer> getOffers() {
		return offers;
	}

	public List<Image> getImages() {
		return images;
	}
	
	public List<Area> getInterestedAreas() {
		return interestedAreas;
	}
	
	public long getId() {
		return id;
	}
	
	public String getDescription() {
		return description;
	}
	public void setDescription(String description) {
		this.description = description;
	}
	public String getTitle() {
		return title;
	}

	public DateTime getExpiryDate() {
		return expiryDate;
	}
	public void setExpiryDate(DateTime expiryDate) {
		this.expiryDate = expiryDate;
	}
	public Account getUser() {
		return user;
	}
	
	
	
}
