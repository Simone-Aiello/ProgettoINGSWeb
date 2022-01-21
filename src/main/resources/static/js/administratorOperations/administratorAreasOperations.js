modifyingAreas = new Map();
$(document).ready(() => {
	addEvents();
	
});

function addModifyButtonListener(id){
	$("#" + id).on("click", (event) => {	
		let idModifyButton = event.target.id;
		let idArea = idModifyButton.split("-")[0];
		let idAreaNameInput = idArea+ "-NameInput";
		let idAreaIconInput = idArea+ "-IconInput";
		
		//the form is not active and it needs to be activated
		if(! $("#" + idModifyButton).hasClass("active")){
			//construct a copy of the area so that it can be restored
			//if the administrator wants to cancel the modification of that area
			let copyAreaBuilder = new Area.Builder();
			copyAreaBuilder.withId(parseInt(idArea, 10));
			copyAreaBuilder.withName($("#" + idAreaNameInput).val());
			copyAreaBuilder.withIcon($("#" + idAreaIconInput).val());
			let area = copyAreaBuilder.build();
			if(!modifyingAreas.has(idArea))
				modifyingAreas.set(idArea, area);
			//alert("Created copy: " + area.id() + " " + area.name() + " " + area.icon());
			
			$("#" + idAreaNameInput).prop("disabled", false);
			$("#" + idAreaNameInput).addClass("active");
			
			$("#" + idAreaIconInput).prop("disabled", false);
			$("#" + idAreaIconInput).addClass("active")
			let undoButton = `<button id = "` + idArea + `-AreaUndoModifyButton" class = "btn btn-secondary">Annulla</button>`;
			$("#" + idModifyButton).after(undoButton);
			$("#" + idArea + "-AreaUndoModifyButton").on("click", function(){
				$(this).remove();
				$("#" + idModifyButton).removeClass("btn-warning");
				$("#" + idModifyButton).addClass("btn-secondary");
				$("#" + idModifyButton).removeClass("active");
				$("#" + idModifyButton).html("modifica");
				$("#" + idAreaIconInput).prop("disabled", true);
				$("#" + idAreaNameInput).prop("disabled", true);
				$("#" + idAreaNameInput).val(modifyingAreas.get(idArea).name());
				$("#" + idAreaIconInput).val(modifyingAreas.get(idArea).icon());
				$("#" + "area-" + idArea).removeClass();
				$("#" + "area-" + idArea).addClass( $("#" + idAreaIconInput).val() + " fa-3x icon");
			});
			$("#" + idModifyButton).removeClass("btn-secondary");
			$("#" + idModifyButton).addClass("btn-warning");
			$("#" + idModifyButton).addClass("active");
			$("#" + idModifyButton).html("conferma");
		}
		else{//the form has already been activated and the user want to confirm his updates
			let areaBuilder = new Area.Builder();
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
						$("#" + idModifyButton).removeClass("btn-warning");
						$("#" + idModifyButton).addClass("btn-secondary");
						$("#" + idModifyButton).removeClass("active");
						$("#" + idModifyButton).html("modifica");
						$("#" + idAreaIconInput).prop("disabled", true);
						$("#" + idAreaNameInput).prop("disabled", true);
						$("#" + "area-" + idArea).removeClass();
						$("#" + "area-" + idArea).addClass( $("#" + idAreaIconInput).val() + " fa-3x icon");
						$("#" + idArea + "-AreaUndoModifyButton").remove();
					},
				});	
			}
		}
		
	});
}

function addDeleteButtonListener(id){
	$("#" + id).on("click", (event) => {
		let idCancelButton = event.target.id;
		let idArea = idCancelButton.split("-")[0];
		
		let modal = `<div class="modal fade" id="staticBackdrop-delete" data-bs-backdrop="static" data-bs-keyboard="false" tabindex="-1" aria-labelledby="staticBackdropLabel" aria-hidden="true">
						<div class="modal-dialog">
							<div class="modal-content">
								<div class="modal-header">
							    	<h5 class="modal-title" id="staticBackdropLabel">Modal title</h5>
							        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
							    </div>
							    <div class="modal-body">
							    	<p>Sei sicuro di voler cancellare l'ambito?</p>
							    </div>
							    <div class="modal-footer">
							    	<button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Annulla</button>
							        <button id = "confirmDelete" type="button" class="btn btn-primary">Conferma</button>
							    </div>
							</div>
						</div>
					 </div> `;
		//remove eventual modals that are closed but not removed from the html
		$(".modal").remove();	
		$("body").append(modal);
		$("#staticBackdrop-delete").modal("toggle");
		
		$("#confirmDelete").on("click", () => {
			areaBuilder = new Area.Builder();
			areaBuilder.withId(parseInt(idArea, 10));
			$("#staticBackdrop-delete").modal("toggle");
			$(".modal").remove();	
			$.ajax({
				type: "POST",
				url: "/deleteArea",
				contentType: "application/json",
				data: JSON.stringify(areaBuilder.build()),
				success: function(){
					$("#" + idCancelButton).parent().parent().remove();
				},
			});
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
			areaBuilder.withName($("#addAreaNameInput").val());
			areaBuilder.withIcon($("#addAreaIconInput").val());
			$.ajax({
			type: "POST",
			url: "/createArea",
			contentType: "application/json",
			data: JSON.stringify(areaBuilder.build()),
			success: function(area){
				
				newAreaCard  = `<div class="card areaCard">
									<div class = icon-div>
								  		<figure class="icon-figure">
											<i class= "`+ area.icon+` fa-3x icon" id="area-` + area.id + `"></i>
										</figure>
									</div>
									
								  <div class="card-body">
								  	<div class = "areaTitle row">
								  		<div class ="col-lg-6 col-md-8 col-xs-12">
								    		<label class="card-title form-label">Nome:</label>
								    		<input  id = "` + area.id+ `-NameInput" class="form-control" value = "` + area.name +`" disabled></input>
								   		</div>
								   	</div>
								    <div class = "areaIconText row">
								    	<div class = "col-lg-6 col-md-8 col-xs-12">
								    	<label class="card-title form-label">Icona: </label>
								    	<input id = "` + area.id + `-IconInput" class=" form-control" value = "` + area.icon + `" disabled></input>
								  		</div>
								  	</div>
								  </div>
								  <div class="card-body cardButtons">
								    <button id = "` + area.id + `-AreaModifyButton" class = "btn btn-secondary">Modifica</button>
									<button id = "` + area.id + `-AreaDeleteButton" type = "button" class =  "btn btn-danger" ">Cancella</button>
								  </div>
							</div>`
				
				$("#addAreaForm").addClass("hidden");
				$("#allAreas").append(newAreaCard);
				//add listeners to new buttons
				addModifyButtonListener(area.id + "-AreaModifyButton"); 
				addDeleteButtonListener(area.id + "-AreaDeleteButton");
			},
			error: function(xhr){
				alert(xhr.message);
			}
		});
			
		}
	});
}

function addEvents(){
	$("button[id$='-AreaModifyButton']").each(function(){
			addModifyButtonListener($(this).attr("id"));
	});


	$("button[id$='-AreaDeleteButton']").each(function(){
			addDeleteButtonListener($(this).attr("id"));
	});
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
