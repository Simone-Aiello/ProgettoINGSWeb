var oldImageInformation = null;
var oldAddressInformation = null;
var oldUserInformation = null;
var oldAccountInformation = null;
var user_builder = new User.Builder();
function removePreviousError(idElement) {
	let errorId = "#" + idElement + "-error";
	$(errorId).remove();
}
function appendError(idElement, message) {
	removePreviousError(idElement);
	let field = $("#" + idElement);
	field.addClass("is-invalid");
	field.removeClass("is-valid");
	field.after("<div id=" + idElement + "-error" + " class=\"invalid-feedback\">" + message + "</div>");
}
function appendCorrect(idElement) {
	removePreviousError(idElement);
	let field = $("#" + idElement);
	field.removeClass("is-invalid");
	field.addClass("is-valid");
}
function addDateOfBirthListeners() {
	$("#date-of-birth").on("input", () => {
		let dateField = $("#date-of-birth");
		let dateValue = dateField.val();
		try {
			user_builder.withDateOfBirth(dateValue);
			appendCorrect("date-of-birth");
		}
		catch (error) {
			appendError("date-of-birth", error.message);
		}
	});
}
function loadOldInfo() {
	oldImageInformation.withValue($("#profile-pic").attr("src"));
	oldAddressInformation.withProvince($("#province").val());
	oldAddressInformation.withTown($("#city").val());
	oldAddressInformation.withZipCode($("#zip-code").val());
	oldUserInformation.withAddress(oldAddressInformation.build());
	oldUserInformation.withName($("#name").val());
	oldUserInformation.withSurname($("#surname").val());
	oldUserInformation.withDateOfBirth($("#date-of-birth").val());
	oldAccountInformation.withNumber($("#number").val());
	oldAccountInformation.withProvinceOfWork($("#province-of-work").val());
	oldAccountInformation.withUser(oldUserInformation.build());
	oldAccountInformation.withProfilePic(oldImageInformation.build());
	$("i.area").each(function(){
		let areaBuilder = new Area.Builder();
		areaBuilder.withId($(this).attr("id"));
		oldAccountInformation.withArea(areaBuilder.build());
	});
	console.log(oldAccountInformation.build());
}
function showViaAndHouseNumber() {
	let divVia = `<div class="col-md-12 mb-1" id="via-div"><label class="form-label">Via</label> <input type="text"class="form-control" placeholder="Via" id="via" required></div>`;
	let divHouseNumber = `<div class="col-md-12 mb-1" id="house-number-div"><label class="form-label">Numero civico</label> <input class="form-control" type="number" placeholder="Numero civico" id="house-number" required></div>`;
	$("#via-div").remove();
	$("#house-number-div").remove();
	$("#city-div").after(divVia);
	$("#via-div").after(divHouseNumber);
}
function addModifyButtonListener() {
	$("#modify-button").click(() => {
		oldImageInformation = new Image.Builder();
		oldAddressInformation = new Address.Builder();
		oldUserInformation = new User.Builder();
		oldAccountInformation = new Account.Builder();
		loadOldInfo();
		showViaAndHouseNumber();
		$("input").each(function() {
			$(this).prop("readonly", false);
		});
		$("select").each(function() {
			$(this).prop("disabled", false);
		});
	});
}
$(document).ready(() => {
	addModifyButtonListener();
	addDateOfBirthListeners();
});