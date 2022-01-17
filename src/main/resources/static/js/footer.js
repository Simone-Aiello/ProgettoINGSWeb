function createFooter(){
	let footer = document.createElement('div');
	footer.className = 'text-center text-lg-start bg-light text-muted mt-auto';
	
	//SECTION SOCIAL
	let social_bar = document.createElement('section')
	social_bar.className = 'd-flex justify-content-center justify-content-lg-between p-4 border-bottom';
	
	let bar_left = document.createElement('div');
	bar_left.className = 'me-5 d-none d-lg-block';
	
	let inner_bar_left = document.createElement('span');
	inner_bar_left.innerHTML = 'Contattaci sui social : ';
	bar_left.appendChild(inner_bar_left);
	
	let bar_right = document.createElement('div');
	
	let facebook = document.createElement('a');
	facebook.className = 'me-4 text-reset text-decoration-none';
	facebook.innerHTML = '<i class="fab fa-facebook-f"></i>';
	
	let google = document.createElement('a');
	google.className = 'me-4 text-reset text-decoration-none';
	google.innerHTML = '<i class="fab fa-google"></i>';
	
	let github = document.createElement('a');
	github.className = 'me-4 text-reset text-decoration-none';
	github.innerHTML = '<i class="fab fa-github"></i>';
	
	bar_right.appendChild(google);
	bar_right.appendChild(facebook);
	bar_right.appendChild(github);
	
	social_bar.appendChild(bar_left);
	social_bar.appendChild(bar_right);
	
	//SECTION LINKS
	
	let links = document.createElement('section');
	
	let container = document.createElement('div');
	container.className = 'container text-center text-md-start mt-5';
	
	let row = document.createElement('div');
	row.className = 'row mt-3';
	
	let firstCol = document.createElement('div');
	firstCol.className = 'col-md-3 col-lg-4 col-xl-3 mx-auto mb-4';
	
	 /*<h6 class="text-uppercase fw-bold mb-4">
            <img alt="GetJobs" src="/images/logoGetJobs.png" style = "max-width : 250px; margin : -50px; padding : 0;">
          </h6>*/

	let logoContainer = document.createElement('h6');
	logoContainer.className = 'mb-4';
	
	let logo = document.createElement('img');
	logo.alt = 'GetJobs';
	logo.src = '../images/logoGetJobs.png';
	logo.style = 'max-width : 250px;margin-bottom : -50px;margin-top : -55px; padding : 0;';
	logoContainer.appendChild(logo);
	
	let description = document.createElement('p');
	description.innerHTML = ' GetJobs è una piattaforma che si prefissa di far incontrare lavoratori esperti in uno o più settori con tutti coloro che abbiano necessità di svolgere lavori per i quali non hanno le competenze.';
	
	firstCol.appendChild(logoContainer);
	firstCol.appendChild(description);
	row.appendChild(firstCol);
	
	
	let secondCol = document.createElement('div');
	secondCol.className = 'col-md-3 col-lg-2 col-xl-2 mx-auto mb-4';
	
	let title = document.createElement('h6');
	title.className = 'text-uppercase fw-bold mb-4';
	title.innerHTML = 'link utili';
	
	let home = document.createElement('p');
	let homelink = document.createElement('a');
	homelink.className = 'text-reset';
	homelink.href = '#!';
	homelink.innerHTML = 'Home';
	home.appendChild(homelink);
	
	let addAds = document.createElement('p');
	let addAdslink = document.createElement('a');
	addAdslink.className = 'text-reset';
	addAdslink.href = '#!';
	addAdslink.innerHTML = 'Carica annuncio';
	addAds.appendChild(addAdslink);
	
	let login = document.createElement('p');
	let loginlink = document.createElement('a');
	loginlink.className = 'text-reset';
	loginlink.href = '#!';
	loginlink.innerHTML = 'Login';
	login.appendChild(loginlink);
	
	
	secondCol.appendChild(title);
	secondCol.appendChild(home);
	secondCol.appendChild(addAds);
	secondCol.appendChild(login);
	
	row.appendChild(secondCol);
	
	
	let thirdCol = document.createElement('div');
	thirdCol.className = 'col-md-4 col-lg-3 col-xl-3 mx-auto mb-md-0 mb-4';
	
	let contact = document.createElement('h6');
	contact.className = 'text-uppercase fw-bold mb-4';
	contact.innerHTML = 'Contattaci';
	
	let via = document.createElement('p');
	via.innerHTML = '<i class="fas fa-home me-3"></i> Via col vento CS 1';
	
	let mail = document.createElement('p');
	mail.innerHTML = '<i class="fas fa-envelope me-3"></i> assistenza@getjobs.com';
	
	let phone = document.createElement('p');
	phone.innerHTML = '<i class="fas fa-phone me-3"></i> + 39 123 4567 890';
	thirdCol.appendChild(contact);
	thirdCol.appendChild(via);
	thirdCol.appendChild(mail);
	thirdCol.appendChild(phone);
	
	row.appendChild(thirdCol);
	
	
	container.appendChild(row);
	links.appendChild(container);
	
	//COPYRIGHT
	let copyright = document.createElement('div');
	copyright.className = 'text-center p-4';
	copyright.style = 'background-color: rgba(0, 0, 0, 0.05);';
	copyright.innerHTML = '© 2021 Copyright:';
	let indexlink = document.createElement('a');
	indexlink.className = 'text-reset fw-bold';
	indexlink.href = '/';
	indexlink.innerHTML = 'getJobs.com';
	copyright.appendChild(indexlink);
	
	footer.appendChild(social_bar);
	footer.appendChild(links);
	footer.appendChild(copyright);
	return footer;
}

/*
	<!-- Footer -->
<footer class="text-center text-lg-start bg-light text-muted">
  <!-- Section: Social media -->
  <section
    class="d-flex justify-content-center justify-content-lg-between p-4 border-bottom"
  >
    <!-- Left -->
    <div class="me-5 d-none d-lg-block">
      <span>Get connected with us on social networks:</span>
    </div>
    <!-- Left -->

    <!-- Right -->
    <div>
      <a href="" class="me-4 text-reset text-decoration-none">
        <i class="fab fa-facebook-f"></i>
      </a>
      <a href="" class="me-4 text-reset text-decoration-none">
        <i class="fab fa-twitter"></i>
      </a>
      <a href="" class="me-4 text-reset text-decoration-none">
        <i class="fab fa-google"></i>
      </a>
      <a href="" class="me-4 text-reset text-decoration-none">
        <i class="fab fa-instagram"></i>
      </a>
      <a href="" class="me-4 text-reset text-decoration-none">
        <i class="fab fa-linkedin"></i>
      </a>
      <a href="" class="me-4 text-reset text-decoration-none">
        <i class="fab fa-github"></i>
      </a>
    </div>
    <!-- Right -->
  </section>
  <!-- Section: Social media -->

  <!-- Section: Links  -->
  <section class="">
    <div class="container text-center text-md-start mt-5">
      <!-- Grid row -->
      <div class="row mt-3">
        <!-- Grid column -->
        <div class="col-md-3 col-lg-4 col-xl-3 mx-auto mb-4">
          <!-- Content -->
          <h6 class="text-uppercase fw-bold mb-4">
            <img alt="GetJobs" src="/images/logoGetJobs.png" style = "max-width : 250px; margin : -50px; padding : 0;">
          </h6>
          <p>
            GetJobs è una piattaforma che si prefissa di far incontrare lavoratori esperti in uno o più
            settori con tutti coloro che abbiano necessità di svolgere lavori per i quali non hanno le competenze.
          </p>
        </div>
        <!-- Grid column -->

       

        <!-- Grid column -->
        <div class="col-md-3 col-lg-2 col-xl-2 mx-auto mb-4">
          <!-- Links -->
          <h6 class="text-uppercase fw-bold mb-4">
            Useful links
          </h6>
          <p>
            <a href="#!" class="text-reset">Home</a>
          </p>
          <p>
            <a href="#!" class="text-reset">Carica annuncio</a>
          </p>
          <p>
            <a href="#!" class="text-reset">Login</a>
          </p>
          <p>
            <a href="#!" class="text-reset">Registrati</a>
          </p>
        </div>
        <!-- Grid column -->

        <!-- Grid column -->
        <div class="col-md-4 col-lg-3 col-xl-3 mx-auto mb-md-0 mb-4">
          <!-- Links -->
          <h6 class="text-uppercase fw-bold mb-4">
            Contact
          </h6>
          <p><i class="fas fa-home me-3"></i> Via col vento CS 1</p>
          <p>
            <i class="fas fa-envelope me-3"></i>
            assistenza@getjobs.com
          </p>
          <p><i class="fas fa-phone me-3"></i> + 39 123 4567 890</p>
        </div>
        <!-- Grid column -->
      </div>
      <!-- Grid row -->
    </div>
  </section>
  <!-- Section: Links  -->

  <!-- Copyright -->
  <div class="text-center p-4" style="background-color: rgba(0, 0, 0, 0.05);">
    © 2021 Copyright:
    <a class="text-reset fw-bold" href="/">getJobs.com</a>
  </div>
  <!-- Copyright -->
</footer>
<!-- Footer -->
 */