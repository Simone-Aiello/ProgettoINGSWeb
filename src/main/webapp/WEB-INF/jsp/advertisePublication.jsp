<%@ page contentType="text/html;charset=UTF-8" language="java"%>
<%@taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>
<html>
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<link
	href="https://cdn.jsdelivr.net/npm/bootstrap@5.0.2/dist/css/bootstrap.min.css"
	rel="stylesheet"
	integrity="sha384-EVSTQN3/azprG1Anm3QDgpJLIm9Nao0Yz1ztcQTwFspd3yD65VohhpuuCOmLASjC"
	crossorigin="anonymous">
<script
	src="https://cdn.jsdelivr.net/npm/bootstrap@5.0.2/dist/js/bootstrap.bundle.min.js"
	integrity="sha384-MrcW6ZMFYlzcLA8Nl+NtUVF0sA7MsXsP1UyJoMp4YLEuNSfAP+JcXn/tWtIaxVXM"
	crossorigin="anonymous"></script>
<link href="css/AdvertisePublicationCSS.css" rel="stylesheet"
	type="text/css">
<script
	src="https://ajax.googleapis.com/ajax/libs/jquery/3.5.1/jquery.min.js"></script>

<link href="css/aggiungiAnnuncio.css" rel="stylesheet" type="text/css">
<script src="/js/model/image.js"></script>
<script src="js/DragAndDrop.js"></script>

<script src="https://kit.fontawesome.com/c4665949e9.js"></script>
<script src="js/advertisePublication/areaSelector.js"></script>
<script src="/js/model/account.js"></script>
<script src="/js/model/area.js"></script>
<script src="/js/model/advertise.js"></script>
<script src="js/advertisePublication/AdvertisePublication.js"></script>
<link href="/css/notificationCss.css" rel="stylesheet" type="text/css">
<script src="/js/notifications/notification.js"></script>
</head>
<body>
	<div class="dropdown-notification shadow-lg p-3 mb-5 bg-light rounded">
	</div>
	<nav class="navbar navbar-expand-lg navbar-light bg-light rounded">
		<div class="container-fluid">
			<a class="navbar-brand" href="/">Get Jobs</a>
			<button class="navbar-toggler" type="button"
				data-bs-toggle="collapse" data-bs-target="#navbarNav"
				aria-controls="navbarNav" aria-expanded="false"
				aria-label="Toggle navigation">
				<span class="navbar-toggler-icon"></span>
			</button>
			<div class="collapse navbar-collapse" id="navbarNav">
				<c:choose>
					<c:when test="${sessionScope.username != null}">
						<ul class="navbar-nav me-auto mb-2 mb-lg-0">
							<li class="nav-item"><a class="nav-link active" href="/">Home</a></li>
							<li class="nav-item"><a class="nav-link active"
								href="/profilePage?username=${sessionScope.username}">Profilo</a></li>
							<c:choose>
								<c:when test="${sessionScope.loggedAccountType == 'w'}">
									<li class="nav-item"><a class="nav-link active" href="#">Le
											tue offerte</a></li>
								</c:when>
								<c:when test="${sessionScope.loggedAccountType == 'u'}">
									<li class="nav-item"><a class="nav-link active"
										href="/showMyAdvertises">I tuoi annunci</a></li>
									<li class="nav-item"><a class="nav-link active"
										href="/AdvertisePublication">Inserisci annuncio</a></li>
								</c:when>
								<c:when test="${sessionScope.loggedAccountType == 'a'}">
									<li class="nav-item"><a class="nav-link active"
										href="/administratorProfilesManager">Gestisci account</a></li>
									<li class="nav-item"><a class="nav-link active"
										href="/administratorAreasManager">Gestisci ambiti di
											lavoro</a></li>
								</c:when>
							</c:choose>
							<li class="nav-item"><a class="nav-link active"
								href="/getChats">Messaggi</a></li>
							<li class="nav-item" id="notification-item"><a
								class="nav-link active" id="notification-bell">Notifiche <i
									class="fas fa-circle fa-xs" id="new-notification"></i></a></li>
						</ul>
						<ul class="navbar-nav mb-2 mb-lg-0">
							<li class="nav-item"><a class="nav-link active"
								href="/logout">Logout</a></li>
						</ul>
					</c:when>
					<c:otherwise>
						<ul class="navbar-nav me-auto mb-2 mb-lg-0"></ul>
						<ul class="navbar-nav mb-2 mb-lg-0 pe-5 me-5">

							<li class="nav-item"><a class="nav-link active"
								aria-current="page" href="#">Registrati</a></li>
							<li class="nav-item"><a class="nav-link active"
								href="/login.html">Accedi</a></li>
						</ul>
					</c:otherwise>
				</c:choose>
			</div>
		</div>
	</nav>
	<div id="form" class="shadow formSection">
		<h1 class="title">Inserisci i dati del tuo annuncio</h1>
		<form class="needs-validation" id="advertisePublicationForm"
			method="post">
			<div class="row mb-3">
				<div class="mb-3 col-lg-6 col-md-6 col-xs-12">
					<label class="form-label">Titolo*</label> <input type="text"
						class="form-control" id="advertiseTitle"
						placeholder="Titolo dell'annuncio">
				</div>
				<div class="mb-3 col-lg-6 col-md-6 col-xs-12">
					<label class="form-label">Data di scadenza*</label> <input
						id="advertiseExpiryDate" class="form-control" type="date">
				</div>
			</div>
			<div class="row mb-3">
				<div class="col">
					<label class="form-label">Descrizione</label>
					<textarea class="form-control" rows="3" id="advertiseDescription"
						placeholder="Breve descrizione del problema"></textarea>
				</div>
			</div>
			<div class="row mb-3">
				<div class="mb-3 col-lg-5 col-md-5 col-xs-12 ">
					<label class="form-label">Provincia*</label> <select
						class="form-select" id="advertiseProvince">
						<option selected disabled value="">Scegli...</option>
					</select>
				</div>
			</div>

			<hr class="solid" id="firstSeparator">

			<div class="row mb-3">
				<label id="" class="form-label  h4">Aggiungi delle foto</label>
				<div id="uploadedImage" class="carousel carousel-dark slide col"
					data-bs-ride="carousel" data-bs-interval="false">
					<div id="uploaded-image" class="carousel carousel-dark slide"
						data-bs-ride="carousel" data-bs-interval="false">
						<div class="carousel-indicators">
							<button id="sliderTo0" type="button"
								data-bs-target="#uploadedImage" data-bs-slide-to="0"
								class="active" aria-current="true"></button>
						</div>
						<label>Carica alcune immagini</label>
						<div class="carousel-inner">
							<div class="container carousel-item active">
								<div class="drag-area">
									<div class="icon">
										<img src="../images/upload.svg" alt="upload">
									</div>
									<span class="header">Drag & Drop</span> <span class="header">or
										<label for="fileChooser" class="button">browse</label>
									</span> <input id="fileChooser" type="file" /> <span class="support">Supports:
										JPEG, JPG, PNG</span>
								</div>
							</div>
							<button id="prevButton" class="carousel-control-prev"
								type="button" data-bs-target="#uploaded-image"
								data-bs-slide="prev">
								<span class="carousel-control-prev-icon" aria-hidden="true"></span>
								<span class="visually-hidden">Previous</span>
							</button>
							<button id="nextButton" class="carousel-control-next"
								type="button" data-bs-target="#uploaded-image"
								data-bs-slide="next">
								<span class="carousel-control-next-icon" aria-hidden="true"></span>
								<span class="visually-hidden">Next</span>
							</button>
						</div>
					</div>
				</div>
			</div>
			<hr class="solid">
			<div id="areaSelector" class="row mb-3">
				<c:forEach items="${areas}" var="area" varStatus="loop">
					<div class="col icon-div">
						<figure class="icon-figure" id="area-${loop.count}">
							<i class="${area.icon} fa-3x icon ${area.name}" id="${area.id}"></i>
						</figure>
					</div>
				</c:forEach>
			</div>
			<hr class="solid">
			<div class="row mb-3 ">
				<label id="" class="form-label">Aggiungi delle date
					preferenziali per l'appuntamento</label>
				<div id="availabilitySelector"
					class="mb-3 mb-3 col-lg-6 col-md-6 col-xs-12">
					<div id="availabilityDateSection" class="">
						<input id="availabilityDateSelector" type="date"
							class="form-control date" disabled />
						<button id="addAvailabilityDate" class="btn btn-secondary">
							+</button>
					</div>
				</div>
				<div class="mb-3 col-lg-6 col-md-6 col-xs-12 selectedDatesDiv">
					<table id="selectedDates" class="table table-striped">
						<thead>
							<tr>
								<th>Date selezionate</th>
								<th></th>

							</tr>
						</thead>
						<tbody id="selectedDatesContent">
						</tbody>
					</table>
				</div>
			</div>

			<button class="btn btn-primary" id="confirmData">visualizza
				anteprima</button>
		</form>
	</div>

	<div id="preview" class="shadow formSection">
		<div class="row previewDiv">
			<label><b>Titolo:</b></label> <label id="previewTitle"
				class="previewData"></label>
		</div>
		<hr class="solid">
		<div class="row previewDiv">
			<label><b>Descrizione:</b></label> <label id="previewDescription"
				class="previewData"></label>
		</div>
		<hr class="solid">
		<div class="row previewDiv">
			<label><b>Data di scadenza:</b></label> <label id="previewExpiryDate"
				class="previewData"></label>
		</div>
		<hr class="solid">
		<div class="row previewDiv">
			<label><b>Provincia del lavoro:</b></label> <label
				id="previewProvince" class="previewData"></label>
		</div>
		<hr class="solid">
		<div class="row previewDiv advertiseImages">
			<label><b>Immagini allegate:</b></label> <br>

			<div id="previewImages" class="row overflow-scroll"></div>

		</div>
		<hr class="solid">
		<div class="row previewDiv advertiseAreas">
			<label><b>Aree di riferimento:</b></label> <br>

			<div id="previewAreas" class="row"></div>
		</div>

		<div class="row">
			<label>Disponibilità: </label>
			<div class="col-lg-4 col-md-4 col-sm-8 col-xs-8">
				<table class="table table-striped">
					<thead>
						<tr>
							<th>Date selezionate</th>
						</tr>
					</thead>
					<tbody id="previewAvailabilityDates">
					</tbody>

				</table>
			</div>

		</div>
		<div class="row">
			<div class="col previewButtons">
				<button class="btn btn-secondary" id="modifyData">modifica
					dati</button>
				<button class="btn btn-primary" id="publishAdvertise">Pubblica</button>
			</div>
		</div>
	</div>

</body>
</html>