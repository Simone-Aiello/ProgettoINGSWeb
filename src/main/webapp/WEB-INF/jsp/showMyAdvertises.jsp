<%@ page contentType="text/html;charset=UTF-8" language="java" pageEncoding="UTF-8"%>
<%@taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>
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
		<script src="/js/cards/advertiseCardForUser.js"></script>
		<link rel="stylesheet" href="/css/common.css">
    	<script src="https://cdnjs.cloudflare.com/ajax/libs/gsap/3.9.1/gsap.min.js" integrity="sha512-H6cPm97FAsgIKmlBA4s774vqoN24V5gSQL4yBTDOY2su2DeXZVhQPxFK4P6GPdnZqM9fg1G3cMv5wD7e6cFLZQ==" crossorigin="anonymous" referrerpolicy="no-referrer"></script>
   		
   
		<title>Show adveritses</title>
	</head>
	
	<body id = "body" style = "margin : 0; padding : 0;">
	
		
			<div class = "align-items-center justify-content-center mt-5 row" id = "advertises">
				<script type="text/javascript">
					ads = document.getElementById('advertises');
					var i = 0;
				</script>
				<c:forEach items="${advertises}" var = "advertise">
						<script type="text/javascript">
							console.log("${advertise.getTitle()}");
							card = createOfferDetailCard({
						        title : "${advertise.getTitle()}",
						        username :"${advertise.getAccount().getUsername()}",
								province : "${advertise.getProvince()}",
								dueDate : "${advertise.getExpiryDate()}",
								description : "${advertise.getDescription()}",
						        offer_id : ${advertise.getId()},
								index : i
								}) ;
							ads.append(card);
							setReviewActionListener(i);
							setShowOffersActionListener(i);
							i = i+1;
						</script>
				</c:forEach>
			</div>
	</body>
</html>