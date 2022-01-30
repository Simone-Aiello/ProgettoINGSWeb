<%@ page contentType="text/html;charset=UTF-8" language="java"%>
<%@taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>
<!DOCTYPE html>
<html lang="it">
<head>
<meta charset="UTF-8">
<meta http-equiv="X-UA-Compatible" content="IE=edge">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>GetJobs | Home</title>
<c:if test="${provinceOfWork != null}">
<script>
	var provinceOfWork = "${provinceOfWork}" ;
</script>
</c:if>
<c:if test="${provinceOfWork == null}">
<script>
	var provinceOfWork = null ;
</script>
</c:if>
<c:if test="${areasOfWork != null}">
<script>
	var areasOfWork = ${areasOfWork} ;
	console.log(areasOfWork)
</script>
</c:if>
<c:if test="${areasOfWork == null}">
<script>
	console.log("È null");
	
</script>
</c:if>
<script src="https://kit.fontawesome.com/c4665949e9.js"></script>
<link
	href="https://cdn.jsdelivr.net/npm/bootstrap@5.0.0-beta3/dist/css/bootstrap.min.css"
	rel="stylesheet"
	integrity="sha384-eOJMYsd53ii+scO/bJGFsiCZc+5NDVN2yr8+0RDqr0Ql0h+rP48ckxlpbzKgwra6"
	crossorigin="anonymous">
<script
	src="https://cdn.jsdelivr.net/npm/bootstrap@5.0.0-beta3/dist/js/bootstrap.bundle.min.js"
	integrity="sha384-JEW9xMcG8R+pH31jmWH6WWP0WintQrMb4s7ZOdauHnUtxwoG2vI5DkLtS3qm9Ekf"
	crossorigin="anonymous"></script>
<script
	src="https://cdnjs.cloudflare.com/ajax/libs/gsap/3.9.1/gsap.min.js"
	integrity="sha512-H6cPm97FAsgIKmlBA4s774vqoN24V5gSQL4yBTDOY2su2DeXZVhQPxFK4P6GPdnZqM9fg1G3cMv5wD7e6cFLZQ=="
	crossorigin="anonymous" referrerpolicy="no-referrer"></script>
<script
	src="https://ajax.googleapis.com/ajax/libs/jquery/3.5.1/jquery.min.js"></script>
<!-- Tag relativi alla home -->
<script src="./js/home/container_advertises.js"></script>
<script defer src="./js/home/app.js"></script>
<link rel="stylesheet" href="./css/home/style_home.css">
<link rel="stylesheet" href="./css/home/style_home_responsive.css">
<!-- Tag relativi alle funzionalitÃ  del file utils -->
<script src="./js/utils/utils.js"></script>
<link rel="stylesheet" href="./css/common.css">
<!-- Tag relativi alla card advertise  -->
<script defer src="./js/cards/advertiseCardDetails.js"></script>
<link rel="stylesheet" href="./css/cards/styleAdvertiseCardDetails.css">
<script defer src="./js/cards/advertiseCardPreview.js"></script>
<link rel="stylesheet" href="./css/cards/styleAdvertiseCardPreview.css">
<!-- Tag relativi alla card offerForm -->
<link rel="stylesheet" href="./css/cards/styleOfferCardForm.css">
<script defer src="./js/cards/offerCardForm.js"></script>
<script defer src="./js/cards/offerCardSummary.js"></script>
<script src="./js/model/offer.js"></script>
<!-- Tag relativi ad i model account e annuncio -->
<script src="./js/model/account.js"></script>
<script src="./js/model/advertise.js"></script>
<!-- Tag relativi al modal login -->
<script src="./js/loginModal.js/"></script> 

<script defer src="./js/notifications/notification.js"></script>
<link rel="stylesheet" href="./css/notificationCSS.css">
<script type="text/javascript" src = "/js/footer.js"></script>

</head>
<body id = "body" class = "d-flex flex-column min-vh-100">
	<!-- Modals -->
	<!-- Modal areas -->
	<div id="modal-areas" class="modal-getjobs">
		<div id="container-of-modal-areas" class="shadow container-columns">
			<div id="container-areas"></div>
		</div>
	</div>
	<!-- Modal search bar -->
	<div id="modal-search-bar-smartphone" class="modal-getjobs">
		<div class="shadow container-columns search-bar-smartphone"></div>
	</div>
	<!-- Modals -->
	<header class="shadow">
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
											href="/administratorAreasManager">Gestisci ambiti di lavoro</a></li>
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
	</header>
	<section class="banner">
		<div class="search-bar shadow">
			<div class="wrapper-search-bar-items search-bar-item"
				id="search-bar-item-what-area-you-looking-for">
				<p class="">Cosa cerchi?</p>
				<div class="wrapper">
					<i class="fa fa-search" aria-hidden="true"></i> <input type="text"
						placeholder="Un esempio..." />
				</div>
			</div>
			<div class="wrapper-search-bar-items search-bar-item"
				id="search-bar-item-where">
				<p class="">Dove?</p>
				<div class="wrapper">
					<i class="fas fa-map-marker-alt" aria-hidden="true"></i> <input
						type="text" placeholder="Un esempio..." value = "${provinceOfWork}"/>
				</div>
			</div>
			<button id="button-areas-search-bar"
				class="btn button-choose-area shadow search-bar-item">
				<h5>Ambiti</h5>
			</button>
			<button id="button-search-advertise"
				class="btn button-search-advertise">
				<i class="fa fa-search" aria-hidden="true"></i>
			</button>
		</div>
		<div class="wrapper">
			<h5 class="information-advertises shadow rounded">Tutti gli
				annunci</h5>
		</div>
		<div class="outer-container-advertises shadow">
			<button
				class="btn shadow button-search-advertise button-search-bar-smartphone">
				<i class="fa fa-search" aria-hidden="true"></i>
			</button>

			<!-- CONTAINER -->
			<div class="control-container-advertises">
				<button class="btn button-controll-container-advertise"
					id="prev-button">
					<i class="fa fa-angle-double-left"></i>
				</button>
				<button class="btn button-controll-container-advertise"
					id="next-button">
					<i class="fa fa-angle-double-right"></i>
				</button>
			</div>
		</div>
	</section>
	<script type="text/javascript">
			let footer = createFooter();
			$(body).append(footer);
		</script>
</body>
</html>