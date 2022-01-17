<%@ page contentType="text/html;charset=UTF-8" language="java" pageEncoding="UTF-8"%>
<%@taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>
<%@ taglib prefix="fn" uri="http://java.sun.com/jsp/jstl/functions" %>

<!DOCTYPE html>
<html>
	<head>
		<meta charset="UTF-8">
		<meta name="viewport" content="width=device-width, initial-scale=1">
		<script src="https://ajax.googleapis.com/ajax/libs/jquery/3.5.1/jquery.min.js"></script>
		<link rel="stylesheet" href="https://use.fontawesome.com/releases/v5.7.2/css/all.css" integrity="sha384-fnmOCqbTlWIlj8LyTjo7mOUStjsKC4pOpQbqyi7RrhN7udi9RwhKkMHpvLbHG9Sr" crossorigin="anonymous" />
		<!--<script src="https://cdn.jsdelivr.net/npm/@popperjs/core@2.9.2/dist/umd/popper.min.js" ></script>-->
		<link href="https://cdn.jsdelivr.net/npm/bootstrap@5.0.0-beta3/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-eOJMYsd53ii+scO/bJGFsiCZc+5NDVN2yr8+0RDqr0Ql0h+rP48ckxlpbzKgwra6" crossorigin="anonymous">
		<script src="https://cdn.jsdelivr.net/npm/bootstrap@5.0.0-beta3/dist/js/bootstrap.bundle.min.js" integrity="sha384-JEW9xMcG8R+pH31jmWH6WWP0WintQrMb4s7ZOdauHnUtxwoG2vI5DkLtS3qm9Ekf" crossorigin="anonymous"></script>
		<script type="text/javascript" src = "/js/cards/offerDetailCard.js"></script>
		<script type="text/javascript" src = "/js/footer.js"></script>
		
		
		<title>Show offers</title>
	</head>
	<body id = "body" style = "margin : 0; padding : 0;" class = "d-flex flex-column min-vh-100">
		<div class = "align-items-center justify-content-center mt-5 row" id = "offersContainer" style = "padding-bottom : 100px;">
			<script type="text/javascript">
				offers = document.getElementById('offers');
				var i = 0;
			</script>
					<c:forEach items="${offers}" var = "offer">
						<script type="text/javascript">
						card = createOfferDetailCard({
					                    title : "${offer.getTitle()}",
					                    username : "${offer.getWorker().getUsername()}",
										province : "Catanzaro",
										dates : ${offer.getDates()},
										jobExecutionTime : "${offer.getHoursOfWork()}",
										jobExecutionTimeUnit : 'h',
										amount : ${offer.getQuote()},
										description : "${offer.getDescription()}",
					                   	offer_id : ${offer.getId()},
					                   	done : ${offer.isDone()},
					                   	accepted : ${offer.isAccepted()},
					                   	reviewed : ${offer.isReviewed()},
										index : i
										}) ;
						offersContainer.append(card);
						setAcceptButtonListener(i);
						setRefuseButtonListener(i);
						setReviewActionListener(i);
						setUsernameActionListener(i);
						i = i+1;
						</script>
					</c:forEach>
					<c:choose>
						<c:when test="${fn:length(offers) == 0}">
							<div class = "row alert alert-info" style = "width : 50%;">
								<div class = "col-4 d-flex justify-content-center align-items-center">
									<i class="fas fa-user-injured" style = "font-size : 100px"></i>
								</div>
								<div class="col-8 " role="alert" >
									 <h4 class="alert-heading">Ooops!</h4>
									 <p> Non hai ancora ricevuto offerte... </p>
									 <p>Prova a ricontrollare più tardi!</p>
								</div>
							</div>
						</c:when>
					</c:choose>
			
		</div>
		
		
		<script type="text/javascript">
			let footer = createFooter();
			$(body).append(footer);
		</script>
 
	</body>
</html>