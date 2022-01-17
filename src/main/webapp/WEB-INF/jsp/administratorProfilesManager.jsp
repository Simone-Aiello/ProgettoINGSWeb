<%@ page contentType="text/html;charset=UTF-8" language="java"%>
<%@taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>
<html>
	<head>
		<meta charset="UTF-8">
		<link href="https://cdn.jsdelivr.net/npm/bootstrap@5.0.2/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-EVSTQN3/azprG1Anm3QDgpJLIm9Nao0Yz1ztcQTwFspd3yD65VohhpuuCOmLASjC" crossorigin="anonymous">
		<script src="https://cdn.jsdelivr.net/npm/bootstrap@5.0.2/dist/js/bootstrap.bundle.min.js" integrity="sha384-MrcW6ZMFYlzcLA8Nl+NtUVF0sA7MsXsP1UyJoMp4YLEuNSfAP+JcXn/tWtIaxVXM" crossorigin="anonymous"></script>
		<script src="https://ajax.googleapis.com/ajax/libs/jquery/3.5.1/jquery.min.js"></script>
		<link href = "/css/profileCardCSS.css" rel = "stylesheet" type = "text/css">
		<link href = "/css/administratorProfilesManagerCSS.css" rel = "stylesheet" type = "text/css">
		<script src = "https://kit.fontawesome.com/c4665949e9.js"></script>
		<script src = "/js/model/area.js" type = "text/javascript"></script>
		<script src = "/js/model/account.js" type = "text/javascript"></script>
		<script src = "/js/administratorOperations/administratorProfilesOperations.js" type = "text/javascript"></script>
		<script src = "js/model/message.js"></script>
		<script src = "js/model/chat.js"></script>
	</head>

	<body>	
			<div class = "mainDiv shadow">
					<div class ="title">
						<h2>Gestione profili</h2>
					</div>
					
					<div id = "searchBox" class = "row">
						<div id = "" class = "col">
							<label class = "form-label searchBarLabel"> Chi cerchi?</label>
							<input id = "usernameSelector" type = "text" placeholder = "username" class = "form-control">					
						</div>
						<div id = "areasSelectorContainer" class = "col">
							<label class = "form-label form-label-sm searchBarLabel">In che ambito?</label>
							<div id = "selectAreaProfiles">
								<label id = "areaInputLabel" class = "form-select form-label"  >0 scelte</label>
								<!--<span class ="downArrow">&blacktriangledown;</span>-->
							</div>
							
						</div>
						<div id = "searchButtonDiv" class = "col">
							<button id = "searchButton" type = "button" class = "form-control">Cerca</button>			
						</div>
					</div>
				<div id = "profileCards">
					<h1>Comincia a cercare dei profili</h1>	
				</div>
				<div id ="areaslistSelector" >
					<c:forEach items ="${areas}" var ="area">
						<div class = "areaInputDiv">
							<input id = "${area.id}-input"class ="areaInput" type = "checkbox">
								<figure class="icon-figure">
							<i class= "${area.icon} fa-1x icon" id="area-${area.id}"></i>
						</figure>
								
						<label class = "areaLabel">${area.name}</label>
					</div>
				</c:forEach>
				</div>
			</div>					
	</body>
</html>