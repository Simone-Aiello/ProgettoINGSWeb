
import { Account } from "./model/account.js";
import { User } from "./model/user.js";
import {Address } from "./model/address.js";
/*ADDRESS*/
var address_builder = new Address.Builder();
try{
	
	address_builder.withVia("Via Veneto");
	address_builder.withZipCode("87032");
	address_builder.withProvince("Cosenza");
	address_builder.withTown("Amantea");
	address_builder.withHouseNumber("32");
	var address = address_builder.build();

} catch (error) {
	
    console.log(error.message)
}

var builder_user = new User.Builder();
/*USER*/
try{
	
	builder_user.withName("Salvatore");
	builder_user.withSurname("Fiorentino");
	builder_user.withDateOfBirth("13/09/2000");
	builder_user.withAddress(address);
	var user = builder_user.build(); 

} catch (error) {
	
    console.log(error.message)
}
/*ACCOUNT*/
var builder = new Account.Builder();
try{
	
	builder.withUsername("salvatore_fiorentino");
	builder.withPassword("password12345!");
	builder.withEmail("frnsvt00p13i872s@studenti.unical.it");
	builder.withNumber("3505978018");
	builder.withProvinceOfWork("Cosenza");
	builder.withAccountType("w");
	builder.withUser(user);
	let account = builder.build();
	console.log(JSON.stringify(account));
} catch (error) {
    console.log(error.message)
}

