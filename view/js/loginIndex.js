document.addEventListener("DOMContentLoaded", function (event) {
	loggedVerify();		
})

function loggedVerify(){

	var url = "controller/cLoggedVerify.php";

	fetch(url, {
	  method: 'GET'  
	})
	.then(res => res.json()).then(result => {
       		
        //alert(result.mensaje);
        console.log(result);
		
        if (result.mensaje==="logged"){

			var newRow="";
			newRow="<div class='row justify-content-center align-items-center p-2'>";
				newRow+="<button type='button' class='btn btn-outline-light'>" + result.username + "</button>";
				newRow+="<button type='button' class='btn btn-outline-light' id='paginaUsuario'>Mi Perfil</button>";
				newRow+="<button type='button' class='btn btn-outline-light' id='btnLogout'>Cerrar Sesión</button>";
			newRow+="</div>";

			$("#zonaLogin").html(newRow);

			$("#btnLogout").click(function(){
				logout();
			});

			$("#paginaUsuario").click(function(){
				window.location.href="view/pages/usuario.html";
			});
     	
        } 
	})
	.catch(error => console.error('Error status:', error));	  
}

function login(){
    var username=$("#username").val();
    var password=$("#password").val();

    var url = "controller/cLogin.php";
	var data = { 'username':username, 'password':password};

	fetch(url, {
	  method: 'POST',
	  body: JSON.stringify(data),
	  headers:{'Content-Type': 'application/json'} 
	  
	})
	.then(res => res.json()).then(result => {

        if (result.mensaje=="no error"){ 

			window.location.reload();

			alert(result.mensaje);

			var newRow="";
			newRow="<div class='row bg-white justify-content-center align-items-center p-2 border'>";
				newRow+="<p class='m-2'>" + result.username + "</p>";
				newRow+="<p href='#' class='m-2'>Mi perfil</p>";
				newRow+="<button type='button' class='btn btn-primary' id='btnLogout'>Cerrar Sesión</button>";
			newRow+="</div>";

			$("#zonaLogin").html(newRow);

			$("#btnLogout").click(function(){
				logout();
			});

			

        }else {
            alert(result.mensaje);  
        }
			
	})
	.catch(error => console.error('Error status:', error));	
}

function logout(){

    var url = "controller/cLogout.php";

	fetch(url, {
	  method: 'GET'
	})
	.then(res => res.text()).then(result => {

		window.location.reload();

		alert("Sesión cerrada");
	
		var reset=`<form id="zonaLogin" class="form-inline my-2 my-lg-0 d-flex justify-content-center">
			<div class="sesion">
				<i class="fas fa-user"></i>
			</div>
			<input id="username" type="text" name="username" placeholder="Nombre de Usuario" class="mr-3 text-center">
			<div class="sesion">
				<i class="fas fa-key"></i>
			</div>
			<input id="password" type="password" name="password" placeholder="Contraseña" class="mr-3 text-center">
			<button id="btnLogin" class="mr-3"><i class="fas fa-sign-in-alt" onclick="login()"></i></button>
			<button id="btnRegister"><i class="fas fa-user-plus"></i></button>
			<button id="btnLogout" class="d-none"><i class="fas fa-window-close"></i></button>
		</form>`;

		$("#zonaLogin").html(reset);
		
	})
	.catch(error => console.error('Error status:', error));	  
    
}