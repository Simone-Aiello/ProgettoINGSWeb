
import { Account } from "./model/account.js";
import { User } from "./model/user.js";



var builder = new Account.Builder();

try{
	
	builder.withUsername("salvatore_fiorentino");
	builder.withPassword("password12345!");
	builder.withEmail("frnsvt00p13i872s@studenti.unical.it");
	builder.withNumber("3505978018");
	builder.withProvinceOfWork("Cosenza");
	builder.withAccountType("w");


} catch (error) {
    console.log(error.message)
}


var builder_user = new User.Builder();

try{
	
	builder_user.withName("Salvatore");
	builder_user.withSurname("Fiorentino");
	builder_user.withDateOfBirth("13/09/2000");
	var user = builder_user.build(); 
    console.log("OK");
	console.log(User.build_json(user));

} catch (error) {
	
    console.log(error.message)
}

try{
	
	builder.withUser(user);
	
	var account = builder.build(); 
    console.log("OK");
	console.log(Account.build_json(account));
} catch (error) {
	
    console.log(error.message)
}



