package com.progetto.persistence.daoInterfaces;

import org.joda.time.DateTime;

import com.progetto.model.Advertise;

public abstract class BuilderAdvertise {
	private Advertise adv;
	public BuilderAdvertise() {
		adv = new Advertise();
	}
	public void withDescription(String description) {
		adv.setDescription(description);
	}
	public void withTitle(String title) {
		adv.setTitle(title);
	}
	public void withExpiryDate(DateTime date) {
		adv.setExpiryDate(date);
	}
	public abstract void withUser(String username);
	public abstract void images();
	public Advertise build() {
		return adv;
	}
}
