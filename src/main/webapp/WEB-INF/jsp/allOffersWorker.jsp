<%@ page contentType="text/html;charset=UTF-8" language="java"%>
<%@taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>
<html>
	<head>
		<meta charset="UTF-8">
		<meta name="viewport" content="width=device-width, initial-scale=1">
		<link href="https://cdn.jsdelivr.net/npm/bootstrap@5.0.2/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-EVSTQN3/azprG1Anm3QDgpJLIm9Nao0Yz1ztcQTwFspd3yD65VohhpuuCOmLASjC" crossorigin="anonymous">
		<script src="https://cdn.jsdelivr.net/npm/bootstrap@5.0.2/dist/js/bootstrap.bundle.min.js" integrity="sha384-MrcW6ZMFYlzcLA8Nl+NtUVF0sA7MsXsP1UyJoMp4YLEuNSfAP+JcXn/tWtIaxVXM" crossorigin="anonymous"></script>
		<script src="https://ajax.googleapis.com/ajax/libs/jquery/3.5.1/jquery.min.js"></script>
		<link href = "css/AllOffersCSS.css" rel = "stylesheet" type = "text/css">
		<link href = "css/cards/styleOfferCardForm.css" rel = "stylesheet" type = "text/css">
		<script src="/js/model/offer.js"></script>
		<script src="https://ajax.googleapis.com/ajax/libs/jquery/3.5.1/jquery.min.js"></script>
		<script type="text/javascript" src = "/js/cards/offerDetailCard.js"></script>
	</head>
	<body>
		<div class = "mainDiv">
			<h1>BENVENUTO</h1>
			
			<div class = "align-items-center justify-content-center mt-5 row" id = "offersContainer">
			<script type="text/javascript">
				offers = document.getElementById('offersContainer');
				var i = 0;
			</script>
					<c:forEach items="${offers}" var = "offer">
						<script type="text/javascript">
						//alert(${offer.dates});
						card = createOfferDetailCard({
					                    title : "${offer.getTitle()}",
					                    username : "${offer.getWorker().getUsername()}",
										province : "Catanzaro",
										dueDate : "04/10/2022",
										dates : ${offer.dates},
										jobExecutionTime : ${offer.getHoursOfWork()},
										jobExecutionTimeUnit : 'h',
										amount : ${offer.getQuote()},
										description : ${offer.getDescription()},
					                   	offer_id : ${offer.getId()},
					                   	done : ${offer.isDone()},
					                   	accepted : ${offer.isAccepted()},
										index : i
										}) ;
						offers.appendChild(card);
						setAcceptButtonListener(i);
						setRefuseButtonListener(i);
						setReviewActionListener(i);
						i = i+1;
						</script>
					</c:forEach>
			</div>
		</div>

	</body>
</html>