<%@ page contentType="text/html;charset=UTF-8" language="java"%>
<%@taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<script
	src="https://ajax.googleapis.com/ajax/libs/jquery/3.5.1/jquery.min.js"></script>
<link
	href="https://cdn.jsdelivr.net/npm/bootstrap@5.0.2/dist/css/bootstrap.min.css"
	rel="stylesheet"
	integrity="sha384-EVSTQN3/azprG1Anm3QDgpJLIm9Nao0Yz1ztcQTwFspd3yD65VohhpuuCOmLASjC"
	crossorigin="anonymous">
<script
	src="https://cdn.jsdelivr.net/npm/bootstrap@5.0.2/dist/js/bootstrap.bundle.min.js"
	integrity="sha384-MrcW6ZMFYlzcLA8Nl+NtUVF0sA7MsXsP1UyJoMp4YLEuNSfAP+JcXn/tWtIaxVXM"
	crossorigin="anonymous"></script>
<script src="https://kit.fontawesome.com/c4665949e9.js"></script>
<script src="/js/notifications/notification.js"></script>
<link rel="stylesheet" href="/css/notificationCss.css">
<link rel="stylesheet" href="/css/showmyoffers.css">
<script src="/js/utils/utils.js"></script>
<script src="/js/showmyoffers.js"></script>
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
								aria-current="page" href="#">Registrati</a></li>
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
	<div id="outer-div" class="d-flex justify-content-center flex-wrap">
		<c:forEach items="${offers}" var="offer">
			<div class="card-body shadow me-md-3" id="offer-${offer.id}">
				<div class="row">
					<h5 class="col-10 card-title">Proposta compilata per:
						${offer.advertise.title}</h5>
				</div>
				<div class="row mt-2">
					<div class="col">
						<p class="card-subtitle text-muted small mb-1">Cliente:</p>
						<p class="card-subtitle text-muted small username_client">
							<a
								href="/profilePage?username=${offer.advertise.account.username}">@${offer.advertise.account.username}</a>
						</p>
					</div>
					<div class="col">
						<p class="card-subtitle text-muted small">Provincia annuncio</p>
						<p class="small">${offer.advertise.province}</p>
					</div>
				</div>
				<div class="row">
					<div class="col dropdown">
						<button type="button" class="btn btn-primary dropdown-toggle"
							data-bs-toggle="dropdown" data-toggle="dropdown"
							style="background-color: rgb(244, 162, 97); border: none;"
							aria-expanded="false">
							Vedi tue disponibilità<span class="caret"></span>
						</button>
						<ul class="dropdown-menu"
							style="background-color: rgb(244, 162, 97); border-radius: 10px;">
							<c:forEach items="${offer.availabilities}" var="av">
								<li class="ps-2">${av}</li>
							</c:forEach>
						</ul>
					</div>
					<div class="col mt-2">
						<label class="card-subtitle text-muted small">Durata
							lavoro : ${offer.hoursOfWork} ore</label>
					</div>
				</div>
				<div class="row mt-3">
					<div class="col-12 input-group"
						style="display: flex; justify-content: start;">
						<input class="card-control" type="text" readonly id="amount"
							style="width: 100px;" value="${offer.quote}">
						<div class="input-group-append">
							<span class="input-group-text"
								style="width: 20px; height: 100%; display: flex; justify-content: center; align-items: center; margin: 0px; padding: 0px;">€</span>
						</div>
					</div>
					<div class="col"></div>
				</div>
				<div class="row mt-2 shadown" style="padding: 15px;">
					<textarea class="col input-group rounded" rows="5" readonly
						style="border-color: rgb(227, 227, 227);">${offer.description}</textarea>
				</div>
				<c:choose>
					<c:when test="${offer.done}">
						<div class="job-done">
							<span>Lavoro completato!</span>
						</div>
					</c:when>
					<c:when test="${offer.accepted && !offer.done}">
						<div class="d-flex flex-row-reverse mt-3">
							<button class="btn btn-success end-work-button">Ho finito il lavoro</button>
						</div>
					</c:when>
					<c:otherwise>
						<div class="d-flex flex-row-reverse mt-3">
							<button class="btn btn-primary delete-button">Elimina</button>
						</div>
					</c:otherwise>
				</c:choose>
			</div>
		</c:forEach>
	</div>
</body>