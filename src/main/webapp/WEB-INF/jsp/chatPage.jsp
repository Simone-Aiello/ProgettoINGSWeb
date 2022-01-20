<%@ page contentType="text/html;charset=UTF-8" language="java"%>
<%@taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<script
	src="https://ajax.googleapis.com/ajax/libs/jquery/3.5.1/jquery.min.js"></script>
<script
	src="https://cdn.jsdelivr.net/npm/@popperjs/core@2.9.2/dist/umd/popper.min.js"></script>
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
<link rel="stylesheet" href="/css/chat2.css">
<script src="/js/chat/chat.js"></script>
<script src="/js/model/message.js"></script>
</head>
<body>
	<div class="container">
		<div class="row">
			<div class="col-3" id="people-list">
				<ul class="list-unstyled chat-list mt-2 mb-0">
					<c:forEach items="${chats}" var="chat">
						<li class="clearfix" id="${chat.id}"><c:choose>
								<c:when test="${chat.a2.profilePic.value == null}">
									<img src="/usersImages/profilePictures/defaultIcon.png">
								</c:when>
								<c:otherwise>
									<img src="${chat.a2.profilePic.value}">
								</c:otherwise>
							</c:choose> 
							<span class="name" id="${chat.a2.username}">${chat.a2.username}<i class="fas fa-circle"></i></span>
						</li>
					</c:forEach>
				</ul>
			</div>
			<div class="col-9" id="current-chat">
				<div id="current-person">
					<div id="personal-info">
						<img src=""> <span class="name"></span>
					</div>
					<div id="recent-chats-div">
						<a id="contact-list-toggle"> <i class="fas fa-users fa-lg"></i>
						</a>
					</div>
				</div>
				<div id="current-messages">
					<ul class="list-unstyled" id="messages-list">
						<li class="h4 text-center">Seleziona un utente per poter
							inviare un messaggio</li>

					</ul>
				</div>
				<div id="new-message-div">
					<input type="text" class="form-control"
						placeholder="Scrivi il tuo messaggio..." id="new-message-text">
						<button id="send-message">Invia</button>
				</div>
			</div>
		</div>
	</div>
</body>
</html>