let accountType = "";
function createLoginModal(){
	let modal = `
				<div class="modal fade" id="staticBackdropLogin"  data-bs-backdrop="static" tabindex="-1" role="dialog" aria-labelledby="staticBackdropLabel" aria-hidden="true">
				  <div class="modal-dialog" role="document">
				    <div class="modal-content">
				      <div class="modal-header">
				        <h5 class="modal-title" id="staticBackdropLabel">Ops sembra che tu non abbia effettuato login</h5>
				        <button type="button" class="close" data-bs-dismiss="modal" aria-label="Close">
				          <span aria-hidden="true">&times;</span>
				        </button>
				      </div>
				      <div class="modal-body">
				        
						<div class ="row">
							<div class = "col">
								<img alt = "GetJobs" src ="/images/logoGetJobs.png">
							</div>
						</div
						
						<div  class = "row">
							<div id = "modalLoginForm" class = " col">
								<label class = "form-label">Username o email</label>
								<input id = "usernameLoginModal" type = "text" class ="form-control">
								<label class = "form-label">Password</label>
								<input id = "passwordLoginModal" type = "password" class ="form-control">
							</div>
						</div>
						<div class = "row">
							<div style = "	display: flex; justify-content: space-between; white-space:nowrap; margin-bottom: 15px;">
				       			<button id = "homeButtonLoginModal" type="button" class="btn btn-secondary" data-dismiss="modal" style= "margin-left: 20px;">Home</button>
								<button id = "loginButtonLoginModal" type="button" class="btn btn-primary" style= "margin-right: 20px;">Login</button>
							</div>
						</div>						
				      </div>
				      <div class="modal-footer">
				      </div>
				    </div>
				  </div>
				</div>`;
				
				
				$("#staticBackdropLogin").remove();
				$("body").append(modal);
				$("#staticBackdropLogin").modal("toggle");
				
				$("#homeButtonLoginModal").on("click", () => {
					window.location.href = "/";
				})
				
				$("#loginButtonLoginModal").on("click", function(){
					let username = $("#usernameLoginModal").val();
					let password = $("#passwordLoginModal").val();
					let accountBuilder = new Account.Builder();
					

					try{
						accountBuilder.withUsername(username);
						accountBuilder.withPassword(password);
						let account = accountBuilder.build();
								$.ajax({
								type : "POST",
								url : "/login",
								contentType: "application/json",
								data: JSON.stringify(account),
								success: function(acc){
										if(acc == null){
											showLoginError()
											return;	
										}
									accountType = acc.accountType;
									if(acc != null)
										accountLogged = account;
										accountLoggedIn();
								},
								error: function(){
									//alert("loginError");
								}
							});
					}catch(error){
						showLoginError();
					}
					
				})
}

function showLoginError(){
	if($("#systemAlertLogin").length != 0)
		return;
	
	let systemError = 	`<div id = "systemAlertLogin" class="alert alert-danger" role="alert">
 					 		Username o password errati
						</div>`;
	$("#modalLoginForm").prepend(systemError);
}

function checkAccountType(accountType, desideredAccountType){
	if(accountType == desideredAccountType){
		return true;		
	}
	return false;
}
