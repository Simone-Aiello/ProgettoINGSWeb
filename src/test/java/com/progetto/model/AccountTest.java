package com.progetto.model;

import static org.junit.jupiter.api.Assertions.*;

import java.util.ArrayList;
import java.util.List;

import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.function.Executable;

class AccountTest {

	private Account account = new Account();

	@Test
	void validAccount() {

		// Data
		String username = "salvatore_fiorentino";
		String password = "dosajdjosaodnjkNj";
		String email = "fiorentinosalvatore65@gmail.com";
		String accountType = "w";
		String number = "3505978018";
		String provinceOfWork = "Cosenza";
		Image image = new Image();
		User user = new User();
		List<Area> areas = new ArrayList<Area>();
		List<Review> reviews = new ArrayList<Review>();

		account.setUsername(username);
		account.setPassword(password);
		account.setEmail(email);
		account.setAccountType(accountType);
		account.setNumber(number);
		account.setPersonalInfo(user);
		account.setProfilePic(image);
		account.setProvinceOfWork(provinceOfWork);
		account.setAreasOfWork(areas);
		account.setReviews(reviews);

		assertEquals(username, account.getUsername());
		assertEquals(password, account.getPassword());
		assertEquals(email, account.getEmail());
		assertEquals(accountType, account.getAccountType());
		assertEquals(number, account.getNumber());
		assertEquals(user, account.getPersonalInfo());
		assertEquals(image, account.getProfilePic());
		assertEquals(provinceOfWork, account.getProvinceOfWork());
		assertEquals(areas, account.getAreasOfWork());
		assertEquals(reviews, account.getReviews());

	}

	@Test
	void invalidUsername() {

		assertThrows(IllegalArgumentException.class, () -> account.setUsername("salvatore fiorentino"));
		assertThrows(IllegalArgumentException.class, () -> account.setUsername("salvatore^^fiorentino"));
		assertThrows(IllegalArgumentException.class, () -> account.setUsername("salvatore ?fiorentino"));
		assertThrows(IllegalArgumentException.class, () -> account.setUsername("salvatore !fiorentino"));

	}

	@Test
	void validUsername() {

		account.setUsername("salvatore");
		account.setUsername("salvatoreFiorentino");
		account.setUsername("Fiorentino_123432");

	}

	@Test
	void invalidEmail() {

		assertThrows(IllegalArgumentException.class, () -> account.setEmail("fiorentinosalvatore65"));
		assertThrows(IllegalArgumentException.class, () -> account.setEmail("fiorentinosalvatore65@gmail"));
		assertThrows(IllegalArgumentException.class, () -> account.setEmail("@gmail"));
		assertThrows(IllegalArgumentException.class, () -> account.setEmail("@gmail.com"));
		assertThrows(IllegalArgumentException.class, () -> account.setEmail(".@gmail.com"));
		assertThrows(IllegalArgumentException.class, () -> account.setEmail("@.com"));
		assertThrows(IllegalArgumentException.class, () -> account.setEmail("fiorenitno@.com"));
		assertThrows(IllegalArgumentException.class, () -> account.setEmail(" "));

	}

	@Test
	void validEmail() {

		account.setEmail("frnsvt00p13i872s@studenti.unical.it");
		account.setEmail("fiore@studenti.gov.it");

	}

	@Test
	void invalidNumber() {

		assertThrows(IllegalArgumentException.class, () -> account.setNumber("3423"));
		assertThrows(IllegalArgumentException.class, () -> account.setNumber(" "));
		assertThrows(IllegalArgumentException.class, () -> account.setNumber("35059780181"));
		assertThrows(IllegalArgumentException.class, () -> account.setNumber("123456789"));

	}

	@Test
	void validNumber() {

		account.setNumber("3509231221");
		account.setNumber("096712345");

	}

	@Test
	void invalidTypeAccount() {

		assertThrows(IllegalArgumentException.class, () -> account.setAccountType("W"));
		assertThrows(IllegalArgumentException.class, () -> account.setAccountType("au"));
		assertThrows(IllegalArgumentException.class, () -> account.setAccountType("wu"));
		assertThrows(IllegalArgumentException.class, () -> account.setAccountType("wua"));

	}

}
