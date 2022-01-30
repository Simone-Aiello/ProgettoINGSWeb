<%@ page contentType="text/html;charset=UTF-8" language="java"%>
<%@taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>
<html>
<head>
<meta charset="UTF-8">
<link
	href="https://cdn.jsdelivr.net/npm/bootstrap@5.0.2/dist/css/bootstrap.min.css"
	rel="stylesheet"
	integrity="sha384-EVSTQN3/azprG1Anm3QDgpJLIm9Nao0Yz1ztcQTwFspd3yD65VohhpuuCOmLASjC"
	crossorigin="anonymous">
<script
	src="https://cdn.jsdelivr.net/npm/bootstrap@5.0.2/dist/js/bootstrap.bundle.min.js"
	integrity="sha384-MrcW6ZMFYlzcLA8Nl+NtUVF0sA7MsXsP1UyJoMp4YLEuNSfAP+JcXn/tWtIaxVXM"
	crossorigin="anonymous"></script>
<script
	src="https://ajax.googleapis.com/ajax/libs/jquery/3.5.1/jquery.min.js"></script>
<link href="/css/profileCardCSS.css" rel="stylesheet" type="text/css">
<link href="/css/administratorProfilesManagerCSS.css" rel="stylesheet"
	type="text/css">
<script src="https://kit.fontawesome.com/c4665949e9.js"></script>
<script src="/js/model/area.js" type="text/javascript"></script>
<script src="/js/model/account.js" type="text/javascript"></script>
<script
	src="/js/administratorOperations/administratorProfilesOperations.js"
	type="text/javascript"></script>
<script src="js/model/message.js"></script>
<script src="js/model/chat.js"></script>
<link href="/css/notificationCSS.css" rel="stylesheet" type="text/css">
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
									<li class="nav-item"><a class="nav-link active"
										href="/showMyOffers">Le tue offerte</a></li>
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
								aria-current="page" href="/register.html">Registrati</a></li>
							<li class="nav-item"><a class="nav-link active"
								href="/login.html">Accedi</a></li>
							<li class="nav-item"><a class="nav-link active"
								href="/AdvertisePublication">Inserisci annuncio</a></li>
						</ul>
					</c:otherwise>
				</c:choose>
			</div>
		</div>
	</nav>
	<div class="mainDiv shadow">
		<div class="title">
			<h1>Gestione profili</h1>
		</div>

		<div id="searchBox" class="row">
			<div id="" class="col">
				<label class="form-label searchBarLabel"> Chi cerchi?</label> <input
					id="usernameSelector" type="text" placeholder="username"
					class="form-control">
			</div>
			<div id="areasSelectorContainer" class="col">
				<label class="form-label form-label-sm searchBarLabel">In
					che ambito?</label>
				<div id="selectAreaProfiles">
					<label id="areaInputLabel" class="form-select form-label">0
						scelte</label>
					<!--<span class ="downArrow">&blacktriangledown;</span>-->
				</div>

			</div>
			<div id="searchButtonDiv" class="col">
				<button id="searchButton" type="button" class="form-control">Cerca</button>
			</div>
		</div>
		<div id ="systemErrors">
		
		</div>
		<div id="profileCards">
			<h2>Comincia a cercare dei profili</h2>
		</div>
		<div id="areaslistSelector">
			<c:forEach items="${areas}" var="area">
				<div class="areaInputDiv">
					<input id="${area.id}-input" class="areaInput" type="checkbox">
					<figure class="icon-figure">
						<i class="${area.icon} fa-1x icon" id="area-${area.id}"></i>
					</figure>

					<label class="areaLabel">${area.name}</label>
				</div>
			</c:forEach>
		</div>
	</div>
</body>
</html>