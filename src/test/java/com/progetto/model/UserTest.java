package com.progetto.model;

import static org.junit.jupiter.api.Assertions.*;

import org.joda.time.DateTime;
import org.junit.jupiter.api.Test;

class UserTest {

	private User user = new User();

	@Test
	void validUser() {

		long id = 1;
		String name = "ciccio";
		String surname = "pasticcio";
		DateTime dateOfBirth = new DateTime(2000, 9, 13, 0, 0);
		Address address = new Address();

		user.setId(id);
		user.setName(name);
		user.setSurname(surname);
		user.setDateOfBirth(dateOfBirth);
		user.setAddress(address);

		assertEquals(id, user.getId());
		assertEquals(name, user.getName());
		assertEquals(surname, user.getSurname());
		assertEquals(dateOfBirth, user.getDateOfBirth());
		assertEquals(address, user.getAddress());

	}

	@Test
	void invalidId() {
		
		assertThrows(IllegalArgumentException.class, () -> user.setId(-1));
		assertThrows(IllegalArgumentException.class, () -> user.setId(-10));
		assertThrows(IllegalArgumentException.class, () -> user.setId(-2));
		assertThrows(IllegalArgumentException.class, () -> user.setId(-32));
		
	}
	
	@Test
	void invalidNameSurname() {

		assertThrows(IllegalArgumentException.class, () -> user.setName("salvatore1"));
		assertThrows(IllegalArgumentException.class, () -> user.setName("1"));
		assertThrows(IllegalArgumentException.class, () -> user.setName(""));
		assertThrows(IllegalArgumentException.class, () -> user.setName("ciao 2"));
		assertThrows(IllegalArgumentException.class, () -> user.setSurname("salvatore1"));
		assertThrows(IllegalArgumentException.class, () -> user.setSurname("1"));
		assertThrows(IllegalArgumentException.class, () -> user.setSurname(""));
		assertThrows(IllegalArgumentException.class, () -> user.setSurname("ciao 2"));

	}

	@Test
	void validNameSurname() {

		user.setName("salvatore maria");
		user.setName("salvatore");
		user.setSurname("pasticcio");
		user.setSurname("Fiorenitino maria");

	}
	
	@Test
	void invalidDateOfBirth() {
		
		assertThrows(IllegalArgumentException.class, () -> user.setDateOfBirth(new DateTime(2006,12,22,0,0)));
		assertThrows(IllegalArgumentException.class, () -> user.setDateOfBirth(new DateTime(2020,12,22,0,0)));
		assertThrows(IllegalArgumentException.class, () -> user.setDateOfBirth(new DateTime(2022,12,22,0,0)));
		
	}
	
	
	@Test
	void validDateOfBirth() {
		
		user.setDateOfBirth(new DateTime(2005,12,22,0,0));
		user.setDateOfBirth(new DateTime(2000,12,22,0,0));
		user.setDateOfBirth(new DateTime(2001,12,22,0,0));
		
	}

}
