<%@ page contentType="text/html;charset=UTF-8" language="java"%>
<%@taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>
<html>
	<head>
		<meta charset="UTF-8">
		<link href="https://cdn.jsdelivr.net/npm/bootstrap@5.0.2/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-EVSTQN3/azprG1Anm3QDgpJLIm9Nao0Yz1ztcQTwFspd3yD65VohhpuuCOmLASjC" crossorigin="anonymous">
		<script src="https://cdn.jsdelivr.net/npm/bootstrap@5.0.2/dist/js/bootstrap.bundle.min.js" integrity="sha384-MrcW6ZMFYlzcLA8Nl+NtUVF0sA7MsXsP1UyJoMp4YLEuNSfAP+JcXn/tWtIaxVXM" crossorigin="anonymous"></script>
		<script src="https://ajax.googleapis.com/ajax/libs/jquery/3.5.1/jquery.min.js"></script>

		<link href = "/css/administratorAreasManagerCSS.css" rel = "stylesheet" type = "text/css">
		<script src="https://kit.fontawesome.com/c4665949e9.js"></script>
		<script src="/js/model/area.js"></script>
		<script src = "/js/administratorOperations/administratorAreasOperations.js" type="text/javascript" ></script>
	</head>

	<body>
		<div id = "pageContent" class = "container fluid">
			<div class ="title">
				<h1>Pagina amministratore</h1>
			</div>
			<section id = "areaManagerSection">
				<div class =" shadow mainDiv">
					<div class ="title">
						<h2>Gestione ambiti</h2>
					</div>
					<div id ="allAreas">
					
					<c:forEach items = "${areas}" var = "area" varStatus = "loop">
						<!--
						<c:if test="${loop.index % 2 == 0}">
							<div class = "row">
						</c:if>
						-->
						<div class="card areaCard">
							<div class = icon-div>
						  		<figure class="icon-figure">
									<i class= "${area.icon} fa-3x icon" id="area-${area.id}"></i>
								</figure>
							</div>
							
						  <div class="card-body">
						  	<div class = "areaTitle row">
						  		<div class ="col-lg-6 col-md-8 col-xs-12">
						    		<label class="card-title form-label">Nome:</label>
						    		<input  id = "${area.id}-NameInput" class="form-control" value = "${area.name}" disabled></input>
						   		</div>
						   	</div>
						    <div class = "areaIconText row">
						    	<div class = "col-lg-6 col-md-8 col-xs-12">
						    	<label class="card-title form-label">Icona: </label>
						    	<input id = "${area.id}-IconInput" class=" form-control" value = "${area.icon}" disabled></input>
						  		</div>
						  	</div>
						  </div>
						  <div class="card-body cardButtons">
						    <button id = "${area.id}-AreaModifyButton" class = "btn btn-secondary">Modifica</button>
							<button id = "${area.id}-AreaDeleteButton" type = "button" class =  "btn btn-danger">Cancella</button>
						  </div>
						</div>
						<!--
						<c:if test="${loop.index % 2 == 0}">
							</div>
						</c:if>
						-->
					</c:forEach>
						
					</div>
					<div id = "addAreaDiv">
						<button id = "requestAddAreaForm" class = "btn btn-secondary"><h1><b>+</b></h1></button>
					</div>
					<form id = "addAreaForm" class = "needs-validation hidden">
						<div id = "title">
							<h2>Aggiunta nuovo ambito</h2>
						</div>
						<div id ="addAreaFormContent" >
							<div class = "row mb-3">
								<div class =" mb-3 col-lg-6 col-md-6 col-xs-12">
									<label  class ="form-label" >Nome*</label>
									<input  id = "addAreaNameInput" class="form-control" type = "text" placeholder = "Nome ambito"></input>
								</div>
							</div>
							<div class = "row mb-3">
								<div class = "col-lg-6 col-md-6 col-xs-12">
									<label for = "addAreaIconInput" class = "form-label">Icona*</label>
									<input  id = "addAreaIconInput" class="form-control"  type = "text"  placeholder = "Codice icona fontawesome"></input>
									<a href = "https://fontawesome.com/" target="_blank"> cerca icona</a>
								</div>
							</div>
						</div>
						<div id = "addAreaButtonDiv">
							<button id = "addAreaButton"class = "btn btn-primary">Conferma</button>
						</div>
					</form>
				</div>
			</section>
		</div>
	</body>
</html>