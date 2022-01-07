<%@ page contentType="text/html;charset=UTF-8" language="java"%>
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
<script src="/js/model/user.js"></script>
<script src="/js/model/address.js"></script>
<script src="/js/model/area.js"></script>
<script src="/js/model/image.js"></script>
<script src="/js/profilePage/profilePageLogged.js"></script>
<script
	src="/js/registerAndUpdateWorkerCommon/registerAndUpdateWorkerCommon.js"></script>
</head>
<body>
	<div class="container mt-5 shadow">
		<div class="row">
			<div class="col-12">
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
					<div class="areas">
						<c:forEach items="${account.areasOfWork}" var="area">
							<i class="area fas ${area.icon} fa-2x icon mb-3 p-2"
								id="${area.id}"></i>
						</c:forEach>
					</div>
					<span>${account.username}</span> <span class="text-black-50">${account.email}</span>
					<span></span>
				</div>
				<c:if test="${!account.valid}">
					<div class="alert alert-danger alert-dismissible fade show"
						role="alert">
						Accedere alla mail e cliccare sul link ricevuto per confermare
						l'account oppure <a href="" class="alert-link">re-invia mail</a>.
						<button type="button" class="btn-close" data-bs-dismiss="alert"
							aria-label="Close"></button>
					</div>
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
							<div class="col-md-12 mb-1">
								<label>Sede di lavoro</label> <select class="form-select"
									id="province-of-work" disabled>
									<option selected>${account.provinceOfWork}</option>
								</select>
							</div>
						</div>
					</form>
					<div class="mt-5" id="select-area-div-outer">
						<h5>Seleziona i nuovi ambiti</h5>
						<div class="mt-5" id="select-area-div">
						</div>
					</div>
					<div class="mt-5 text-center" id="button-div">
						<button class="btn btn-primary" type="button" id="modify-button">Modifica
							Profilo</button>
						<button class="btn btn-secondary" type="button" id="delete-button">Elimina
							modifiche</button>
						<button class="btn btn-primary mx-3" type="button"
							id="save-button">Salva modifiche</button>
					</div>
				</div>
			</div>
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
							<span>(${account.reviews.size()})</span>
						</div>
					</div>
					<c:forEach items="${account.reviews}" var="review">
						<div class="card mb-2">
							<div class="row">
								<div class="col">
									<div class="card-body">
										<h5 class="card-title">${review.title}</h5>
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
										<p class="card-text review-description mb-1">${review.description}</p>
										<p class="card-text">
											<small class="text-muted">${review.client.username}</small>
										</p>
									</div>
								</div>
							</div>
						</div>
					</c:forEach>
					<div class="mt-5 text-center">
						<button class="btn btn-primary" type="button">Mostra
							altre</button>
					</div>
				</div>
			</div>
		</div>
	</div>
</body>