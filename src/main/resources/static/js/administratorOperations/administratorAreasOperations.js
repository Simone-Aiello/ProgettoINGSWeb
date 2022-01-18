let sections = ["areaManagerSection", "advertiseManagerSection", "profilesManagerSection"];

$(document).ready(() => {
	addEvents();
	
});

function addModifyButtonListener(){
	//alert("WE");
	$("button[id$='-AreaModifyButton']").on("click", (event) => {	
		let idModifyButton = event.target.id;
		let idArea = idModifyButton.split("-")[0];
		let idAreaNameInput = idArea+ "-NameInput";
		let idAreaIconInput = idArea+ "-IconInput";
		//the form is not active and it needs to be activated
		if(! $("#" + idModifyButton).hasClass("active")){
			
			$("#" + idAreaNameInput).prop("disabled", false);
			$("#" + idAreaNameInput).addClass("active");
			
			$("#" + idAreaIconInput).prop("disabled", false);
			$("#" + idAreaIconInput).addClass("active")
			
			$("#" + idModifyButton).removeClass("btn-secondary");
			$("#" + idModifyButton).addClass("btn-warning");
			$("#" + idModifyButton).addClass("active");
			$("#" + idModifyButton).html("conferma modifiche");
		}
		else{//the form has already been activated and the user want to confirm his updates
			areaBuilder = new Area.Builder();
			let error = false;
			areaBuilder.withId(parseInt(idArea, 10));
			
			if($("#" + idAreaNameInput).val() == ""){
				createAlertWithText("Il campo è richiesto", idAreaNameInput)
				error=true;

			}
			else{
				removeAlert(idAreaNameInput);
				areaBuilder.withName($("#" + idAreaNameInput).val());
			}
			
			if($("#" + idAreaIconInput).val() == ""){
				createAlertWithText("Il campo è richiesto", idAreaIconInput)
				error=true;

			}
			else{
				removeAlert(idAreaIconInput);
				areaBuilder.withIcon($("#" + idAreaIconInput).val());
			}
			
			//no errors found: compilation is ok and the area can be updated
			if(!error){
					
				$.ajax({
					type: "POST",
					url: "/modifyArea",
					contentType: "application/json",
					data: JSON.stringify(areaBuilder.build()),
					success: function(){
						/*
						$("#" + idModifyButton).removeClass("btn-warning");
						$("#" + idModifyButton).addClass("btn-secondary");
						$("#" + idModifyButton).removeClass("active");
						$("#" + idModifyButton).html("modifica");
						$("#" + idAreaIconInput).prop("disabled", true);
						$("#" + idAreaNameInput).prop("disabled", true);
						*/
						document.location.reload();
					},
				});	
			}
		}
		
	});
}

function addDeleteButtonListener(){
	$("button[id$='-AreaDeleteButton']").on("click", (event) => {
		let idCancelButton = event.target.id;
		let idArea = idCancelButton.split("-")[0];
		areaBuilder = new Area.Builder();
		areaBuilder.withId(parseInt(idArea, 10));
		
		$.ajax({
			type: "POST",
			url: "/deleteArea",
			contentType: "application/json",
			data: JSON.stringify(areaBuilder.build()),
			success: function(){
				//$("#" + idCancelButton).parent().parent().remove();
				document.location.reload();
			},
		});
	});
}

function addNewAreaFormListener(){
	$("#requestAddAreaForm").on("click",  ()=>{
		$("#addAreaForm").removeClass("hidden");
		
	});
}


function addCreateNewAreaListener(){
	$("#addAreaButton").on("click", (event)=>{
		event.preventDefault();
		let error = false;	
		if($("#addAreaNameInput").val() == ""){
			error = true;
			createAlertWithText("Inserire il nome dell\'ambito", "addAreaNameInput");
		}
		else{
			removeAlert("addAreaNameInput");
		}
		if($("#addAreaIconInput").val() == ""){
			error = true;
			createAlertWithText("Inserire l\'icona ", "addAreaIconInput");
		}
		else{
			removeAlert("addAreaIconInput");
		}
		
		if(!error){
			let areaBuilder = new Area.Builder();
			//areaBuilder.withId(0);
			areaBuilder.withName($("#addAreaNameInput").val());
			areaBuilder.withIcon($("#addAreaIconInput").val());
			$.ajax({
			type: "POST",
			url: "/createArea",
			contentType: "application/json",
			data: JSON.stringify(areaBuilder.build()),
			success: function(){
			console.log("SUCCESS");
				document.location.reload();
				//$("#addAreaForm").addClass("hidden");
				//$("#" + idCancelButton).parent().parent().remove();
			},
			error: function(xhr){
				alert(xhr.message);
			}
		});
			
		}
	});
}

function addEvents(){
	//showSection("areaManagerSection");
	addModifyButtonListener();
	addDeleteButtonListener();
	addNewAreaFormListener();
	addCreateNewAreaListener();
	
}


var createAlertWithText = function(text, idInput){
	removeAlert(idInput);
	$("#" + idInput).addClass("is-invalid");
	var feedback = "<div  id = \"" + idInput + "feedback\" class = \"invalid-feedback\">" +  text + "</div>"
	$("#" + idInput).after(feedback);
}

var removeAlert = function(id){
	$("#" + id + "feedback").remove();
	$("#" + id).removeClass("is-invalid");
}
