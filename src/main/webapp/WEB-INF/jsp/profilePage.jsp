<%@ page contentType="text/html;charset=UTF-8" language="java"%>
<%@taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>
<!DOCTYPE html>
<head>
	<meta charset="UTF-8">
	<meta name="viewport" content="width=device-width, initial-scale=1">
	<script src="https://ajax.googleapis.com/ajax/libs/jquery/3.5.1/jquery.min.js"></script>
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
</head>
<body>
	<div class="container mt-5 shadow">
	    <div class="row">
	        <div class="col-md-3">
	        <!-- Sostituire src con il path quando salveremo le immagini -->
	            <div class="d-flex flex-column align-items-center text-center p-3 py-5">
		            <c:choose>
						<c:when test="${account.profilePic.value != null}">
			            	<img class="mt-5 image-fluid rounded-photo" src="/usersImages/profilePictures/${account.username}/${account.profilePic.value}">
						</c:when>
						<c:otherwise>
							<img class="mt-5 image-fluid rounded-photo" src="/usersImages/profilePictures/defaultIcon.png">
						</c:otherwise>
					</c:choose>
	            	<span>${account.username}</span>
	            	<span class="text-black-50">${account.email}</span>
	            	<span></span>
	            </div>
	            <c:if test="${!account.valid}">
		            <div class="alert alert-danger alert-dismissible fade show" role="alert">
						Accedere alla mail e cliccare sul link ricevuto per confermare l'account oppure <a href="" class="alert-link">reinvia mail</a>.
					  	<button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
					</div>
				</c:if>
	        </div>
	        <div class="col-md-5">
	            <div class="p-3 py-5">
	                <div class="mb-3">
	                    <h4>Informazioni personali</h4>
	                </div>
	                <div class="row mt-2">
	                    <div class="col-md-6"><label>Nome</label><input type="text" class="form-control" placeholder="Nome" value="${account.personalInfo.name}" readonly></div>
	                    <div class="col-md-6"><label>Cognome</label><input type="text" class="form-control" placeholder="Cognome" value ="${account.personalInfo.surname}" readonly></div>
	                </div>
	                <div class="row mt-3">
	                	<div class="col-md-12"><label>Data di nascita</label><input type="text" class="form-control" placeholder="Data di nascita" value ="${date}" readonly></div>
	                    <div class="col-md-12"><label>Numero di telefono</label><input type="text" class="form-control" placeholder="Numero di telefono" value ="${account.number}" readonly></div>
	                    <div class="col-md-12"><label>Provincia di residenza</label><input type="text" class="form-control" placeholder="Provincia di residenza" value="${account.personalInfo.address.province}" readonly></div>
	                    <div class="col-md-12"><label>Comune di residenza</label><input type="text" class="form-control" placeholder="Comune di residenza" value="${account.personalInfo.address.town}" readonly></div>
	                    <div class="col-md-12"><label>CAP</label><input type="text" class="form-control" placeholder="CAP" value="${account.personalInfo.address.zipCode}" readonly></div>
	                    <div class="col-md-12"><label>Provincia di lavoro</label><input type="text" class="form-control" placeholder="Provincia di lavoro" value="${account.provinceOfWork}" readonly></div>
	                </div>
	                <div class="mt-5 text-center"><button class="btn btn-primary" type="button">Modifica Profilo</button></div>
	            </div>
	        </div>
	        <div class="col-md-4">
	            <div class="p-3 py-5">
		            <div class="review-container">
		            	<h4 class = "review-header">Recensioni</h4>
		            	<div class="star-container">
		            	<c:forEach begin = "1" end="5" varStatus="loop">
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
		            <c:forEach items="${account.reviews}" var ="review">
		            	<div class="card mb-2">
						  <div class="row">
						    <div class="col">
						      <div class="card-body">
						        <h5 class="card-title">${review.title}</h5>
						        <c:forEach begin = "1" end="5" varStatus="loop">
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
						        <p class="card-text"><small class="text-muted">${review.client.username}</small></p>
						      </div>
						    </div>
						  </div>
						</div>
		            </c:forEach>
					<!--  <div class="card mb-2">
					  <div class="row">
					    <div class="col">
					      <div class="card-body">
					        <h5 class="card-title">Ottimo lavoratore</h5><i class="far fa-star"></i><i class="far fa-star"></i><i class="far fa-star"></i><i class="far fa-star"></i><i class="far fa-star"></i>
					        <p class="card-text review-description mb-1">This is a wider card with supporting text below as a natural lead-in to additional content. This content is a little bit longer</p>
					        <p class="card-text"><small class="text-muted">Last updated 3 mins ago</small></p>
					      </div>
					    </div>
					  </div>
					</div>
					<div class="card mb-2">
					  <div class="row">
					    <div class="col">
					      <div class="card-body">
					        <h5 class="card-title">Pessimo lavoratore</h5><i class="far fa-star"></i><i class="far fa-star"></i><i class="far fa-star"></i><i class="far fa-star"></i><i class="far fa-star"></i>
					        <p class="card-text review-description mb-1">This is a wider card with supporting text below as a natural lead-in to additional content. This content is a little bit longer</p>
					        <p class="card-text"><small class="text-muted">Last updated 3 mins ago</small></p>
					      </div>
					    </div>
					  </div>
					</div>-->
	            </div>
	        </div>
	    </div>
	</div>
</body>