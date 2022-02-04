<%@page contentType="text/html;charset=UTF-8" language="java"%>
<%@taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>
<!DOCTYPE html>
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
<link rel="stylesheet" href="/css/profilePage.css">
<script src="/js/model/account.js"></script>
<script src="/js/notifications/notification.js"></script>
<link rel="stylesheet" href="/css/notificationCSS.css">
<c:choose>
	<c:when test="${authorized}">
		<script src="/js/model/user.js"></script>
		<script src="/js/model/address.js"></script>
		<script src="/js/model/area.js"></script>
		<script src="/js/model/image.js"></script>
		<script src="/js/profilePage/profilePageLogged.js"></script>
		<script
			src="/js/registerAndUpdateCommon/registerAndUpdateCommon.js"></script>
	</c:when>
	<c:otherwise>
		<script src="/js/model/chat.js"></script>
		<script src="/js/model/message.js"></script>
		<script src="/js/profilePage/profilePageGuest.js"></script>
	</c:otherwise>
</c:choose>
<script src="/js/utils/utils.js"></script>
<script>
	var accountType = "${account.accountType}"
</script>

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
	<div class="container mt-5 shadow">
		<div class="row">
			<div class="col-12" id="initial-info">
				<div
					class="d-flex flex-column align-items-center text-center p-3 py-5">
					<c:choose>
						<c:when test="${account.profilePic.value != null}">
							<img class="mt-5 image-fluid rounded-photo"
								src="${account.profilePic.value}" id="profile-pic">
						</c:when>
						<c:otherwise>
							<img class="mt-5 image-fluid rounded-photo"
								src="/usersImages/profilePictures/defaultIcon.png"
								id="profile-pic">
						</c:otherwise>
					</c:choose>
					<c:if test="${account.accountType == 'w'}">
						<div class="areas">
							<c:forEach items="${account.areasOfWork}" var="area">
								<i class="area ${area.icon} fa-2x icon mb-3 p-2" id="${area.id}"></i>
							</c:forEach>
						</div>
					</c:if>
					<div class="gx-1" id="photo-button-div">
						<button id="remove-photo">
							<i class="fas fa-trash-alt" id="delete-icon"></i>Rimuovi foto
						</button>
						<input id="file-input" type="file" accept=".jpg,.jpeg,.png" />
						<button id="upload-photo">
							<i class="fas fa-upload" id="upload-icon"></i>Carica foto
						</button>
					</div>
					<span id="username">${account.username}</span> <span
						class="text-black-50">${account.email}</span> <span></span>
				</div>
				<c:if test="${!account.valid && authorized}">
					<c:choose>
						<c:when test="${account.accountType == 'w'}">
							<div class="alert alert-danger alert-dismissible fade show"
								role="alert">
								L'account non è ancora verificato, non potrà proporsi per nessun
								annuncio. Accedere alla mail e cliccare sul link ricevuto per
								confermare l'account oppure <a id="send-email"
									class="alert-link">re-invia mail</a>.
								<button id="dismiss-alert" type="button" class="btn-close"
									data-bs-dismiss="alert" aria-label="Close"></button>
							</div>
						</c:when>
						<c:otherwise>
							<div class="alert alert-danger alert-dismissible fade show"
								role="alert">
								L'account non è ancora verificato, non potrà pubblicare nessun
								annuncio. Accedere alla mail e cliccare sul link ricevuto per
								confermare l'account oppure <a id="send-email"
									class="alert-link">re-invia mail</a>.
								<button id="dismiss-alert" type="button" class="btn-close"
									data-bs-dismiss="alert" aria-label="Close"></button>
							</div>
						</c:otherwise>
					</c:choose>
				</c:if>
			</div>
			<div class="col-12">
				<div class="p-3 py-5">
					<div class="mb-3">
						<h4>Informazioni personali</h4>
					</div>
					<form novalidate>
						<div class="row mt-2">
							<div class="col-md-6">
								<label>Nome</label><input type="text" class="form-control"
									placeholder="Nome" value="${account.personalInfo.name}"
									id="name" readonly>
							</div>
							<div class="col-md-6">
								<label>Cognome</label><input type="text" class="form-control"
									placeholder="Cognome" id="surname"
									value="${account.personalInfo.surname}" readonly>
							</div>
						</div>
						<div class="row mt-3">
							<div class="col-md-12 mb-1">
								<label>Data di nascita</label><input class="form-control"
									type="date" placeholder="01/01/2020" id="date-of-birth"
									value="${date}" readonly>
							</div>
							<div class="col-md-12 mb-1">
								<label>Numero di telefono</label><input type="text"
									class="form-control" placeholder="Numero di telefono"
									value="${account.number}" id="telephone" readonly>
							</div>
							<div class="col-md-12 mb-1">
								<label>Provincia di residenza</label> <select
									class="form-select" id="province" disabled>
									<option selected>${account.personalInfo.address.province}</option>
								</select>
							</div>
							<div class="col-md-12 mb-1" id="city-div">
								<label>Comune di residenza</label> <select class="form-select"
									id="city" disabled>
									<option selected>${account.personalInfo.address.town}</option>
								</select>
							</div>
							<div class="col-md-12 mb-1" id="via-div">
								<label class="form-label">Via</label> <input type="text"
									class="form-control" placeholder="Via" id="via" required>
							</div>
							<div class="col-md-12 mb-1" id="house-number-div">
								<label class="form-label">Numero civico</label> <input
									class="form-control" type="number" placeholder="Numero civico"
									id="house-number" required>
							</div>
							<div class="col-md-12 mb-1">
								<label>CAP</label><input type="text" class="form-control"
									placeholder="CAP"
									value="${account.personalInfo.address.zipCode}" id="zip-code"
									readonly>
							</div>
							<c:if test="${account.accountType == 'w'}">
								<div class="col-md-12 mb-1">
									<label>Sede di lavoro</label> <select class="form-select"
										id="province-of-work" disabled>
										<option selected>${account.provinceOfWork}</option>
									</select>
								</div>
							</c:if>
						</div>
					</form>
					<c:if test="${account.accountType == 'w'}">
						<div class="p-3" id="area-div-outer">
							<div id="area-div">
								<h5>Seleziona i nuovi ambiti</h5>
								<div class="row" id="area-row"></div>
							</div>
						</div>
					</c:if>
					<div class="mt-5 text-center" id="button-div">
						<c:choose>
							<c:when test="${authorized}">
								<button class="custom-button" type="button" id="modify-button">Modifica
									Profilo</button>
								<button class="btn btn-secondary" type="button"
									id="delete-button">Elimina modifiche</button>
								<button class="custom-button mx-3" type="button"
									id="save-button">Salva modifiche</button>
							</c:when>
							<c:otherwise>
								<!-- Button trigger modal -->
								<button type="button" class="btn custom-button"
									data-bs-toggle="modal" data-bs-target="#staticBackdrop">
									Contatta</button>
								<!-- Modal -->
								<div class="modal fade" id="staticBackdrop"
									data-bs-backdrop="static" data-bs-keyboard="false"
									tabindex="-1" aria-labelledby="staticBackdropLabel"
									aria-hidden="true">
									<div class="modal-dialog modal-dialog-centered">
										<div class="modal-content">
											<div class="modal-header">
												<h5 class="modal-title" id="staticBackdropLabel">Contatta
													${account.username}</h5>
												<button type="button" class="btn-close"
													data-bs-dismiss="modal" aria-label="Close" id="close-modal"></button>
											</div>
											<div class="modal-body">
												<textarea id="message-area"
													placeholder="Scrivi qui il tuo messaggio..."
													style="width: 100%;"></textarea>
											</div>
											<div class="modal-footer">
												<button type="button" class="btn btn-secondary"
													data-bs-dismiss="modal">Annulla</button>
												<button type="button" class="btn custom-button"
													id="start-chat">Invia messaggio</button>
											</div>
										</div>
									</div>
								</div>
							</c:otherwise>
						</c:choose>
					</div>
				</div>
				<c:if test="${account.accountType == 'w'}">
					<div class="col-12">
						<div class="p-3 py-5">
							<div class="review-container">
								<h4 class="review-header">Recensioni</h4>
								<div class="star-container">
									<c:forEach begin="1" end="5" varStatus="loop">
										<c:choose>
											<c:when test="${loop.index <= rating}">
												<i class="fas fa-star"></i>
											</c:when>
											<c:otherwise>
												<i class="far fa-star"></i>
											</c:otherwise>
										</c:choose>
									</c:forEach>
									<span>(${count})</span>
								</div>
							</div>
							<div id="reviews-list">
								<c:forEach items="${account.reviews}" var="review">
									<div class="card mb-2">
										<div>
											<div>
												<div class="card-body">
													<h5 class="card-title">${review.title}</h5>
													<div id="review-stars">
														<c:forEach begin="1" end="5" varStatus="loop">
															<c:choose>
																<c:when test="${loop.index <= review.rating}">
																	<i class="fas fa-star"></i>
																</c:when>
																<c:otherwise>
																	<i class="far fa-star"></i>
																</c:otherwise>
															</c:choose>
														</c:forEach>
													</div>
													<p class="card-text review-description mb-1">${review.description}</p>
													<p class="card-text">
														<small class="text-muted review-client"><a
															href="profilePage?username=${review.client.username}">${review.client.username}</a></small>
													</p>
												</div>
											</div>
										</div>
									</div>
								</c:forEach>
							</div>
							<div class="mt-5 text-center">
								<button id="next-reviews" class="custom-button" type="button">Mostra
									altre</button>
							</div>
						</div>
					</div>
				</c:if>
			</div>
		</div>
	</div>
</body>