package com.progetto;

import static org.junit.jupiter.api.Assertions.*;


import org.joda.time.DateTime;
import org.junit.jupiter.api.Test;

import com.progetto.model.Account;
import com.progetto.model.Notification;

import static com.progetto.Utils.*;

class UtilsTest {

	@Test
	public void sanitizeTest() {
		
		String provided = "<script>alert(42)</script>" ; 
		String excepted = "&#60;script&#62;alert&#40;42&#41;&#60;&#47;script&#62;";
		
		assertEquals(excepted, sanitizeXSS(excepted));
	}
	
	@Test
	public void cannotWork() {
		
		DateTime user_date_od_birth = new DateTime(2005,12,01,0,0);
		assertTrue(Utils.canWork(user_date_od_birth));
		
	}
	
	@Test
	public void canWork() {
		
		DateTime user_date_od_birth = new DateTime(2006,12,01,0,0);
		assertFalse(Utils.canWork(user_date_od_birth));
	}

	
}
