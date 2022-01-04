<%@ page contentType="text/html;charset=UTF-8" language="java"%>
<%@taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>
<html>
	<head>
		<meta charset="UTF-8">
		<meta name="viewport" content="width=device-width, initial-scale=1">
		<link href="https://cdn.jsdelivr.net/npm/bootstrap@5.0.2/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-EVSTQN3/azprG1Anm3QDgpJLIm9Nao0Yz1ztcQTwFspd3yD65VohhpuuCOmLASjC" crossorigin="anonymous">
		<script src="https://cdn.jsdelivr.net/npm/bootstrap@5.0.2/dist/js/bootstrap.bundle.min.js" integrity="sha384-MrcW6ZMFYlzcLA8Nl+NtUVF0sA7MsXsP1UyJoMp4YLEuNSfAP+JcXn/tWtIaxVXM" crossorigin="anonymous"></script>
		<link href = "css/AdvertisePublicationCSS.css" rel = "stylesheet" type = "text/css">
		<script src="https://ajax.googleapis.com/ajax/libs/jquery/3.5.1/jquery.min.js"></script>

		<link href = "css/aggiungiAnnuncio.css" rel  = "stylesheet" type = "text/css">
		<script src="/js/model/image.js"></script>
		<script src = "js/DragAndDrop.js"></script>
		
		<script src="https://kit.fontawesome.com/c4665949e9.js"></script>	
		<script src = "js/advertisePublication/areaSelector.js"></script>
		<script src="/js/model/account.js"></script>
		<script src="/js/model/area.js"></script>
		<script src="/js/model/advertise.js"></script>
		<script src = "js/advertisePublication/AdvertisePublication.js"></script>
	</head>
	<body>
		<div id = "form" class = "shadow">
			<h1 class = "title">Inserisci i dati del tuo annuncio</h1>
			<form class = "needs-validation" id = "advertisePublicationForm" method = "post" >
				<div class  = "row mb-3">
						<div class = "mb-3 col-lg-6 col-md-6 col-xs-12">
							<label class = "form-label">Titolo*</label>
							<input type="text" class = "form-control" id = "advertiseTitle" placeholder = "Titolo dell'annuncio">
						</div>

						<div class = "mb-3 col-lg-6 col-md-6 col-xs-12">
							<label class ="form-label">Data di scadenza*</label>
							<input id = "advertiseExpiryDate" class = "form-control" type ="date">
						</div>
					</div>
					<div class ="row mb-3">
							<label class = "form-label">Descrizione</label>
							<textarea class = "form-control"  rows = "3" id = "advertiseDescription"></textarea>
						<div class="form-text">Aggiungi una breve descrizione del problema</div>
					</div>
					<div class ="row mb-3">
						<div class="mb-3 col-lg-6 col-md-6 col-xs-12 ">
							<label class="form-label">Provincia*</label> 
							<select
								class="form-select" id="advertiseProvince" >
								<option selected disabled value="">Scegli...</option>
							</select>
						</div>
					</div>

					<hr class = "solid" id = "firstSeparator">
					
		<div class = "row mb-3">
			<label id = ""class="form-label  h4">Aggiungi delle foto</label>
			<div id="uploadedImage" class="carousel carousel-dark slide" data-bs-ride="carousel" data-bs-interval="false">
		<div id="uploaded-image" class="carousel carousel-dark slide" data-bs-ride="carousel" data-bs-interval="false">
		  <div class="carousel-indicators">
		    <button id = "sliderTo0" type="button" data-bs-target="#uploadedImage" data-bs-slide-to="0" class="active" aria-current="true" ></button>
		  </div>
		  <label >Carica alcune immagini</label>
		  <div class="carousel-inner">
			  	<div class="container carousel-item active">
				  <div class="drag-area">
				    <div class="icon">
				      <img src="../images/upload.svg" alt="upload">
				    </div>
				    <span class="header">Drag & Drop</span>
				    <span class="header">or 
				    <label for = "fileChooser" class="button">browse</label></span>
				    <input id = "fileChooser" type="file"/>
				    <span class="support">Supports: JPEG, JPG, PNG</span>
				  </div>
				</div>
			  <button id = "prevButton" class="carousel-control-prev" type="button" data-bs-target="#uploaded-image" data-bs-slide="prev">
			    <span class="carousel-control-prev-icon" aria-hidden="true"></span>
			    <span class="visually-hidden">Previous</span>
			  </button>
	
			  <button id = "nextButton" class="carousel-control-next" type="button" data-bs-target="#uploaded-image" data-bs-slide="next">
			    <span class="carousel-control-next-icon" aria-hidden="true"></span>
			    <span class="visually-hidden">Next</span>
			  </button>
			</div>
		
		</div>
	
		</div>							
			<hr class = "solid">
			<div id = "areaSelector" class = "row">
							<c:forEach items = "${areas}" var = "area" varStatus = "loop">
								<div class="col icon-div">
									<figure class="icon-figure" id="area-${loop.count}">
										<i class= "${area.icon} fa-3x icon ${area.name}" id="${area.id}"></i>
									</figure>
								</div>
							</c:forEach>	
			</div>
			
				
				<button class ="btn btn-Primary" id = "confirmData">conferma</button>
				</div>
			</form>
		</div>

	</body>
</html>