<%@ page contentType="text/html;charset=UTF-8" language="java"%>
<%@taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>
<!DOCTYPE html>
<html>
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<script
	src="https://ajax.googleapis.com/ajax/libs/jquery/3.5.1/jquery.min.js"></script>
<script src="/js/model/account.js"></script>
<script src="/js/model/user.js"></script>
<script src="/js/model/address.js"></script>
<script src="/js/model/area.js"></script>
<script src="/js/model/image.js"></script>
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
<script src="/js/registerWorker/registerWorker.js"></script>
<script src="/js/registerWorker/registerWorkerSecondSection.js"></script>
<link rel="stylesheet" href="/css/registerWorker.css">
</head>
<body>
	<div id="form" class="shadow">
		<section id="personal-information">
			<h1 class="header">Inserisci le tue informazioni personali</h1>
			<form class="needs-validation" novalidate>
				<div class="row">
					<div class="mb-3 col-lg-6 col-md-6 col-xs-12">
						<label class="form-label">Username*</label> <input type="text"
							class="form-control" placeholder="Username" id="username"
							required>
					</div>
					<div class="mb-3 col-lg-6 col-md-6 col-xs-12">
						<label class="form-label" id="">Email*</label> <input type="text"
							class="form-control" placeholder="esempio@dominio" id="email"
							required>
					</div>
				</div>
				<div class="row">
					<div class="mb-3 mb-3 col-lg-6 col-md-6 col-xs-12">
						<label class="form-label">Password*</label>
						<div class="input-group mb-3">
							<input type="password" class="form-control" id="insert-password"
								required> <span class="input-group-text"
								id="basic-addon2"><i class="far fa-eye-slash insert"></i></span>
							<!--  <span class="input-group-text" id="basic-addon2"><i class="far fa-eye"></i></span>-->
						</div>
						<div class="form-text" id="insert-password-info">La
							dimensione della password deve essere compresa tra 6 e 16
							caratteri e deve contenere almeno 1 carattere speciale</div>
					</div>
					<div class="mb-3 mb-3 col-lg-6 col-md-6 col-xs-12">
						<label class="form-label">Conferma password*</label>
						<div class="input-group mb-3">
							<input type="password" class="form-control" id="confirm-password"
								required> <span class="input-group-text"
								id="confirm-password-icon"><i
								class="far fa-eye-slash confirm"></i></span>
						</div>
					</div>
				</div>
				<hr />
				<div class="row">
					<div class="mb-3 col-lg-6 col-md-6 col-xs-12">
						<label class="form-label">Nome*</label> <input type="text"
							class="form-control" id="name" placeholder="Mario" required>
					</div>
					<div class="mb-3 col-lg-6 col-md-6 col-xs-12">
						<label class="form-label">Cognome*</label> <input type="text"
							class="form-control" id="surname" placeholder="Rossi" required>
					</div>
				</div>
				<div class="row">
					<div class="mb-3 mb-3 col-lg-6 col-md-6 col-xs-12">
						<label class="form-label">Numero di telefono</label> <input
							class="form-control" type="number" placeholder="3004166729"
							id="telephone">
					</div>
					<div class="mb-3 mb-3 col-lg-6 col-md-6 col-xs-12">
						<label class="form-label">Data di nascita*</label> <input
							class="form-control" type="date" placeholder="01/01/2020"
							id="date-of-birth" required>
					</div>
				</div>
				<hr />
				<div class="row">
					<div class="mb-3 col-lg-6 col-md-6 col-xs-12 ">
						<label class="form-label">Provincia di residenza*</label> <select
							class="form-select" id="province" required>
							<option selected disabled value="">Scegli...</option>
						</select>
					</div>
					<div class="mb-3 col-lg-6 col-md-6 col-xs-12">
						<label class="form-label">Comune di residenza*</label> <select
							class="form-select" id="city" required>
							<option selected disabled value="">Scegli...</option>
						</select>
					</div>
					<div class="mb-3 col-lg-6 col-md-6 col-xs-12">
						<label class="form-label">Sede di lavoro</label> <select
							class="form-select" id="province-of-work">
							<option selected disabled value="">Scegli...</option>
						</select>
						<div class="form-text">La provincia per la quale si intende
							ricevere notifiche in merito ai nuovi annunci</div>
					</div>
				</div>
				<div class="row">
					<div class="mb-3 col-lg-6 col-md-6 col-xs-12">
						<label class="form-label">Via*</label> <input type="text"
							class="form-control" placeholder="Cosenza" id="via" required>
					</div>
					<div class="mb-3 col-lg-6 col-md-6 col-xs-12">
						<label class="form-label">Numero civico*</label> <input
							class="form-control" type="number" placeholder="32"
							id="house-number" required>
					</div>
					<div class="mb-3 col-lg-6 col-md-6 col-xs-12">
						<label class="form-label">CAP</label> <input type="text"
							class="form-control" placeholder="87032" id="zip-code" disabled>
					</div>
				</div>
			</form>
		</section>
		<section id="picture-and-areas">
			<h1 class="header">Inserisci una foto e i tuoi ambiti di lavoro</h1>
			<div id="profile-div">
				<div class="centered-div">
					<figure class="profile-figure">
						<img alt="" src="/usersImages/profilePictures/defaultIcon.png"
							class="image-fluid rounded-photo" id="profile-pic">
					</figure>
				</div>
				<div class="row gx-1">
					<button id="remove-photo" class="col-lg-6 col-md-6 col-xs-12">
						<i class="fas fa-trash-alt" id="delete-icon"></i>Rimuovi foto
					</button>
					<input id="file-input" type="file" accept=".jpg,.jpeg,.png" />
					<button id="upload-photo" class="col-lg-6 col-md-6 col-xs-12">
						<i class="fas fa-upload" id="upload-icon"></i>Carica foto
					</button>
				</div>
			</div>
			<hr />
			<div id="area-div"> 
					<div class="row">
						<c:forEach items="${areas}" var="area" varStatus="loop">
							<div class="col icon-div">
								<figure class="icon-figure" id="area-${loop.count}">
									<i class="fas ${area.icon} fa-3x icon ${area.name}" id="${area.id}"></i>
								</figure>
							</div>
						</c:forEach>
					</div>
					<!--<div class="col icon-div">
						<figure class="icon-figure" id="area-1">
							<i class="fas fa-paint-roller fa-3x icon" id="6"></i>
						</figure>
					</div>
					<div class="col icon-div">
						<figure class="icon-figure" id="area-2">
							<i class="fas fa-wrench fa-3x icon" id="4"></i>
						</figure>
					</div>
					<div class="col icon-div">
						<figure class="icon-figure" id="area-3">
							<i class="fas fa-plug fa-3x icon" id="5"></i>
						</figure>
					</div>
				</div>
				<div class="row">
					<div class="col icon-div">
						<figure class="icon-figure" id="area-4">
							<i class="fas fa-desktop fa-3x icon" id="7"></i>
						</figure>
					</div>
					<div class="col icon-div">
						<figure class="icon-figure" id="area-5">
							<i class="fas fa-dog fa-3x icon" id="8"></i>
						</figure>
					</div>
					<div class="col icon-div">
						<figure class="icon-figure" id="area-6">
							<i class="fas fa-baby-carriage fa-3x icon" id="9"></i>
						</figure>
					</div>
				</div>
				<div class="row" id="last">
					<div class="col icon-div">
						<figure class="icon-figure" id="area-7">
							<i class="fas fa-faucet fa-3x icon" id="3"></i>
						</figure>
					</div>
				</div>-->
				<input class="form-check-input" type="checkbox" value=""
					id="flexCheckDefault"><label class="form-check-label">L'ambito
					per cui voglio iscrivermi non è tra quelli proposti</label>
				<form id="missing-area">
					<label class="form-label">Ambito*</label> <input type="text"
						class="form-control" placeholder="Nome" id="name-new-area">
					<label class="form-label">Descrizione*</label>
					<textarea class="form-control" id="description-new-area" rows="3"></textarea>
					<p class="text-muted">La preghiamo di selezionare un ambito che
						più si avvicina a quello che vorrebbe richiedere, riceverà una
						notifica quando la proposta di aggiunta dell'ambito verrà presa in
						carico dagli amministratori</p>
				</form>
			</div>
		</section>
		<section id="summary">
			<h1 class="header">Riepilogo informazioni</h1>
			<div class="centered-div">
				<figure class="profile-figure">
					<img alt="" src="/usersImages/profilePictures/defaultIcon.png"
						class="image-fluid rounded-photo">
				</figure>
			</div>
			<p>
				<span class="bold">Username</span>: <span id="summary-username"></span>
			</p>
			<p>
				<span class="bold">Email</span>: <span id="summary-email"></span>
			</p>
			<p>
				<span class="bold">Nome</span>: <span id="summary-name"></span>
			</p>
			<p>
				<span class="bold">Cognome</span>: <span id="summary-surname"></span>
			</p>
			<p>
				<span class="bold">Numero di telefono</span>: <span
					id="summary-telephone"></span>
			</p>
			<p>
				<span class="bold">Data di nascita</span>: <span
					id="summary-date-of-birth"></span>
			</p>
			<p>
				<span class="bold">Provincia di residenza</span>: <span
					id="summary-province"></span>
			</p>
			<p>
				<span class="bold">Comune di residenza</span>: <span
					id="summary-city"></span>
			</p>
			<p>
				<span class="bold">Via</span>: <span id="summary-via"></span>
			</p>
			<p>
				<span class="bold">Numero civico</span>: <span
					id="summary-house-number"></span>
			</p>
			<p>
				<span class="bold">CAP</span>: <span id="summary-zip-code"></span>
			</p>
			<p>
				<span class="bold">Sede di lavoro</span>: <span
					id="summary-province-of-work"></span>
			</p>
			<p>
				<span class="bold">Ambiti di lavoro</span>:
			</p>
			<ul id="area-list">
			</ul>
		</section>
		<div class="button-div">
			<button class="btn btn-secondary" id="previous">Precedente</button>
			<button class="btn btn-primary" id="next">Successivo</button>
		</div>
		<footer class="mt-4 form-text">* : I campi contrassegnati
			sono obbligatori</footer>
	</div>
</body>
</html>