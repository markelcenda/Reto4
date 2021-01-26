document.addEventListener("DOMContentLoaded", function (event) {
	loggedVerify();
})

//Verifica si existe un usuario con la sesion iniciada
function loggedVerify() {

	var url = "controller/cLoggedVerify.php";

	fetch(url, {
		method: 'GET'
	})
		.then(res => res.json()).then(result => {

			if (result.mensaje === "logged") {

				//esconder div inicial
				$("#zonaLogin").html("");

				//añadir los 2 iconos nuevos
				var newRow = "";
				newRow += "<div class='row justify-content-center'>";
				newRow += "<p class='text-white mt-auto mb-auto ml-auto'>"+result.username+"</p>";
				newRow += "<button type='button' class='btn' id='paginaUsuario'><i class='fa fa-user'></i></button>";
				newRow += "<button type='button' class='btn' id='btnLogout'><i class='fa fa-window-close'></i></button>";
				newRow += "</div>";
				$("#insertarLogin").html(newRow);

				/*al hacer click en btnLogout*/
				$("#btnLogout").click(function () {
					logout();
				});

				/*al hacer click en paginaUsuario*/
				$("#paginaUsuario").click(function () {
					window.location.href = "view/pages/usuario.html";
				});

			}
		})
		.catch(error => console.error('Error status:', error));
}

//Inicia sesion

function login() {
	var username = $("#username").val();
	var password = $("#password").val();

	var url = "controller/cLogin.php";
	var data = { 'username': username, 'password': password };

	fetch(url, {
		method: 'POST',
		body: JSON.stringify(data),
		headers: { 'Content-Type': 'application/json' }

	})
		.then(res => res.json()).then(result => {

			if (result.mensaje == "no error") {

				alert("Sesión iniciada");

				//esconder div inicial
				$("#zonaLogin").html("");

				//añadir los 2 iconos nuevos
				var newRow = "";
				newRow = "<div class='row justify-content-center'>";
				newRow += "<p class='text-white mt-auto mb-auto ml-auto'>"+result.username+"</p>";
				newRow += "<button type='button' class='btn' id='paginaUsuario'><i class='fa fa-user'></i></button>";
				newRow += "<button type='button' class='btn' id='btnLogout'><i class='fa fa-window-close'></i></button>";
				newRow += "</div>";
				$("#insertarLogin").html(newRow);

				/*al hacer click en btnLogout*/
				$("#btnLogout").click(function () {
					logout();
				});

				/*al hacer click en paginaUsuario*/
				$("#paginaUsuario").click(function () {
					window.location.href = "view/pages/usuario.html";
				});

			} else {
				alert(result.mensaje);
			}

		})
		.catch(error => console.error('Error status:', error));
}

//Cierra sesion

function logout() {

	var url = "controller/cLogout.php";

	fetch(url, {
		method: 'GET'
	})
		.then(res => res.text()).then(result => {

			window.location.reload();

			alert("Sesión cerrada");

			var reset = `<form id="zonaLogin" class="form-inline my-2 my-lg-0 d-flex justify-content-center">
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