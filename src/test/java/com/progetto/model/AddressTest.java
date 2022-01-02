package com.progetto.model;

import static org.junit.jupiter.api.Assertions.*;

import org.junit.jupiter.api.Test;

class AddressTest {

	private Address address = new Address();

	@Test
	void validAddress() {

		long id = 1;
		String via = "Via Veneto";
		String houseNumber = "32";
		String zipCode = "87032";
		String town = "Amantea";
		String province = "Cosenza";

		address.setId(id);
		address.setVia(via);
		address.setHouseNumber(houseNumber);
		address.setZipCode(zipCode);
		address.setTown(town);
		address.setProvince(province);

		assertEquals(id, address.getId());
		assertEquals(via, address.getVia());
		assertEquals(houseNumber, address.getHouseNumber());
		assertEquals(zipCode, address.getZipCode());
		assertEquals(town, address.getTown());
		assertEquals(province, address.getProvince());

	}
	

	@Test
	void invalidId() {

		assertThrows(IllegalArgumentException.class, () -> address.setId(-1));
		assertThrows(IllegalArgumentException.class, () -> address.setId(-10));
		assertThrows(IllegalArgumentException.class, () -> address.setId(-100));

	}
	
	@Test
	void validID() {

		address.setId(1);
		address.setId(10);
		address.setId(100);

	}

	@Test
	void invalidVia() {

		assertThrows(IllegalArgumentException.class, () -> address.setVia("caio21"));
		assertThrows(IllegalArgumentException.class, () -> address.setVia("21"));
		assertThrows(IllegalArgumentException.class, () -> address.setVia(" "));

	}
	
	@Test
	void validVia() {

		address.setVia("via volturno");
		address.setVia("via ciao");
		address.setVia("via via");

	}
	
	
	@Test
	void invalidHouseNumber() {

		assertThrows(IllegalArgumentException.class, () -> address.setHouseNumber("caio21"));
		assertThrows(IllegalArgumentException.class, () -> address.setHouseNumber("2s1"));
		assertThrows(IllegalArgumentException.class, () -> address.setHouseNumber(" "));

	}
	
	@Test
	void validHouseNumber() {

		address.setHouseNumber("032");
		address.setHouseNumber("32");
		address.setHouseNumber("1");

	}
	
	
	@Test
	void invalidZipCode() {

		assertThrows(IllegalArgumentException.class, () -> address.setZipCode("caio21"));
		assertThrows(IllegalArgumentException.class, () -> address.setZipCode("2s1"));
		assertThrows(IllegalArgumentException.class, () -> address.setZipCode(" "));

	}
	
	@Test
	void validZipCode() {

		address.setZipCode("032");
		address.setZipCode("32");
		address.setZipCode("1");

	}
	
	@Test
	void invalidTown() {

		assertThrows(IllegalArgumentException.class, () -> address.setTown("caio21"));
		assertThrows(IllegalArgumentException.class, () -> address.setTown("2s1"));
		assertThrows(IllegalArgumentException.class, () -> address.setTown(" "));

	}
	
	@Test
	void validTown() {

		address.setTown("Cosenza");
		address.setTown("Catanzaro");
		address.setTown("Livorno");

	}
	
	
	@Test
	void invalidProvince() {

		assertThrows(IllegalArgumentException.class, () -> address.setProvince("caio21"));
		assertThrows(IllegalArgumentException.class, () -> address.setProvince("2s1"));
		assertThrows(IllegalArgumentException.class, () -> address.setProvince(" "));

	}
	
	@Test
	void validProvince() {

		address.setProvince("Cosenza");
		address.setProvince("Catanzaro");
		address.setProvince("Livorno");

	}

}
