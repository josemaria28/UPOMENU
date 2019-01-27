window.addEventListener("load", inicio);

var upoMenu = new UpoMenu();
//var xml = cargarXML("https://github.com/ilde123/UPOMENU/blob/master/XML/menu.xml");
var xml = cargarXML("../XML/menu.xml");

// Eventos

function inicio() {
	datosPrueba();
	actualizarDesplegable();
	inicializarEventos();
}

// Todo lo demas
function validarFormulario() {
	limpiarErrores();

	var valido = true;
	var error = new Array();

	var nombre = document.querySelector("#txtNombreEvento").value.trim();
	var exReg = /^[a-zA-ZÁÉÍÓÚñáéíóúÑ0-9 ]{6,50}$/;

	if (exReg.test(nombre) == false) {
		valido = false;

		document.querySelector("#txtNombreEvento").classList.add("is-invalid");
		error.push("El nombre debe contener caracteres alfanumérico de entre 6 y 50 caracteres");
	}
	else {
		document.querySelector("#txtNombreEvento").classList.add("is-valid");
	}

	var fecha = document.querySelector("#txtFecha").value;
//	exreg = /^[0-9]{4}([\-/.])(0?[1-9]|1[1-2])([\-/.])(3[01]|[12][0-9]|0?[1-9])$/;

	if (fecha == "") {
		valido = false;

		document.querySelector("#txtFecha").classList.add("is-invalid");
		
		error.push("Debe seleccionar una fecha");
	}
	else {
		document.querySelector("#txtFecha").classList.add("is-valid");
	}

	var comensales = document.querySelector("#txtComensales").value.trim();
	exReg = /^[0-9]{1,3}$/;

	if (!exReg.test(comensales)) {
		valido = false;

		document.querySelector("#txtComensales").classList.add("is-invalid");
		error.push("Comensales debe ser un número");
	}
	else {
		document.querySelector("#txtComensales").classList.add("is-valid");
	}

	var duracion = document.querySelector("#txtDuracion").value.trim();
	exReg = /(\W|^)([mM]añana|[tT]arde|[nN]oche)(\W|$)/;

	if (!exReg.test(duracion)) {
		valido = false;

		document.querySelector("#txtDuracion").classList.add("is-invalid");
		error.push("Debe escribir Mañana, Tarde o Noche");
	}
	else {
		document.querySelector("#txtDuracion").classList.add("is-valid");
	}

	if (!valido) {
		document.querySelector(".is-invalid").focus();
		mostrarMensajeError(error);
	}
	else {
		var menu = upoMenu._buscarMenu(document.querySelector("#txtMenu").value);

		var evento = new Evento(nombre, fecha, comensales, duracion, menu);
		upoMenu.agregarEvento(evento);
		agregarSpinner();

	}
}

function agregarSpinner() {
	var boton = document.querySelector("#btnAceptarEvento");
	boton.textContent = "Guardando... ";
	var span = document.createElement("span");
	span.classList.add("spinner-border", "spinner-border-sm");
	boton.appendChild(span);
	setTimeout(function() {frmEvento.submit();}, 3000);
}



function mostrarMensajeError(error) {
	var desplegable = document.querySelectorAll(".is-invalid");

	for (var i = 0; i < desplegable.length; i++) {
		var div = document.createElement("div");
		div.classList.add("texto-error");
		div.textContent = error[i];

		desplegable[i].parentElement.appendChild(div);
	}
}

function limpiarErrores() {
	var errores = document.querySelectorAll(".is-invalid");

	for (var i = 0; i < errores.length; i++) {
		errores[i].classList.remove("is-invalid");
	}

	errores = document.querySelectorAll(".texto-error");

	for (var i = 0; i < errores.length; i++) {
		errores[i].remove();
	}
}

function actualizarDesplegable() {
	var menu = document.querySelector("#txtMenu");
	var menus = upoMenu.menus;

	for (var i = 0; i < menus.length; i++) {
		var option = document.createElement("option");
		option.text = menus[i].nombre;
		option.value = menus[i].nombre;
		option.dataset.precio = menus[i].precio.toFixed(2);

		menu.appendChild(option);
	}

	actualizarPrecio();
}

function actualizarPrecio() {
	var desplegable = document.querySelector("select");

	borrarPrecio();
	mostrarPrecio();
}

function mostrarPrecio() {
	var desplegable = document.querySelector("select");
	var div = document.createElement("div");
	div.classList.add("input-group-append", "capa-precio");
	var input = document.createElement("spam");
	input.classList.add("input-group-text");
	input.textContent = desplegable.selectedOptions[0].dataset.precio + " €";
	input.classList.add("text-center")
	div.appendChild(input);
	desplegable.after(div);
	var padre = desplegable.parentElement;
	padre.classList.add("input-group");
}

function borrarPrecio() {
	var capa = document.querySelector(".capa-precio");
	if (capa != null) {
		capa.remove();
	}
}
/*
function actualizarDesplegable() {
	var primerPlato = document.querySelector("#txtPrimerPlato");
	var platos = upoMenu.platos;

	for (var i = 0; i < platos.length; i++) {
		var option = document.createElement("option");
		option.text = platos[i].nombre;
		option.value = platos[i].id;
		option.dataset.precio = platos[i].precio.toFixed(2);

		primerPlato.appendChild(option);
	}

	var segundoPlato = document.querySelector("#txtSegundoPlato");

	for (var i = 0; i < platos.length; i++) {
		option = document.createElement("option");
		option.text = platos[i].nombre;
		option.value = platos[i].id;
		option.dataset.precio = platos[i].precio.toFixed(2);

		segundoPlato.appendChild(option);
	}

	var postre = document.querySelector("#txtPostre");

	for (var i = 0; i < platos.length; i++) {
		option = document.createElement("option");
		option.text = platos[i].nombre;
		option.value = platos[i].id;
		option.dataset.precio = platos[i].precio.toFixed(2);

		postre.appendChild(option);
	}

	var bebidas = document.querySelector("#txtBebidas");
	var listaBebidas = upoMenu.bebidas;

	for (var i = 0; i < listaBebidas.length; i++) {
		option = document.createElement("option");
		option.text = listaBebidas[i].nombre;
		option.value = listaBebidas[i].nombre;
		option.dataset.precio = listaBebidas[i].precio.toFixed(2);

		bebidas.appendChild(option);
	}

	actualizarPrecio();
}

function actualizarPrecio() {
	var desplegables = document.querySelectorAll("select");
	var precioTotal = 0;
	borrarPrecio();

	for (var i = 0; i < desplegables.length; i++) {
//		var index = desplegables[i].selectedIndex;

		var precio = desplegables[i].selectedOptions[0].dataset.precio;
		mostrarPrecio(desplegables[i]);

		precioTotal += parseFloat(precio);
	}

	var total = document.querySelector("#txtTotal");
	total.value = precioTotal.toFixed(2) + " €";
}

function mostrarPrecio(desplegable) {
	var div = document.createElement("div");
	div.classList.add("col-md-1", "capa-precio");
	var input = document.createElement("input");
	input.type = "text";
	input.disabled = true;
	input.value = desplegable.selectedOptions[0].dataset.precio + " €";
	input.classList.add("text-center")
	div.appendChild(input);
	var padre = desplegable.parentElement;
	padre.after(div);
}

function borrarPrecio() {
	var capas = document.querySelectorAll(".capa-precio");

	if (capas.length > 0) {
		for (var i = 0; i < capas.length; i++) {
			capas[i].remove();
		}
	}
}
*/
function inicializarEventos() {
	document.querySelector("#btnAceptarEvento").addEventListener("click", validarFormulario);
	document.querySelector("#btnIncremento").addEventListener("click", actualizaValor);
	document.querySelector("#btnDecremento").addEventListener("click", actualizaValor);
	document.querySelector("select").addEventListener("change", actualizarPrecio);
}

// Actualiza el valor de los comensales
function actualizaValor(e) {

	var comensales = document.querySelector("#txtComensales");
	var valor = parseInt(comensales.value);

	if (valor >= 0) {
		if (e.target.id == "btnIncremento") {
			valor++;

			comensales.value = valor;
		}
		else if (valor > 0) {
			valor--;

			comensales.value = valor;
		}
	}
}



// de formato de float a numero
function numeroComa(numero) {
	numero.toString();
	numero = numero.replace(",", ".");
	return parseFloat(numero);
}

function datosPrueba() {
	var menus = xml.querySelectorAll("menu");

	for (var i = 0; i < menus.length; i++) {
		var nombre = menus[i].querySelector("nombre").textContent;
		var precio = numeroComa(menus[i].querySelector("precio").textContent);
		var pPlato = menus[i].querySelector("primerPlato").textContent;
		var sPlato = menus[i].querySelector("segundoPlato").textContent;
		var postre = menus[i].querySelector("postre").textContent;
		var menu = new Menu(nombre, precio, pPlato, sPlato, postre);
		var bebidas = menus[i].querySelectorAll("bebida");

		for (var j = 0; j < bebidas.length; j++) {
			var nombreBebida = bebidas[j].querySelector("nombre").textContent;
			var precioBebida = numeroComa(bebidas[j].querySelector("precio").textContent);
			var alcoholico = bebidas[j].querySelector("alcoholico").textContent;
			var azucarado = bebidas[j].querySelector("azucarado").textContent;
			var gaseoso = bebidas[j].querySelector("gaseoso").textContent;

			var bebida = new Bebida(nombreBebida, precioBebida, "si" == alcoholico, "si" == gaseoso, "si" == azucarado);
			menu.altaBebida(bebida);
		}

		upoMenu.agregarMenu(menu);
	}
}

function cargarXML(fichero) {
	if (window.XMLHttpRequest) {
		xhttp = new XMLHttpRequest();
	} else { // code for IE5 and IE6
		xhttp = new ActiveXObject("Microsoft.XMLHTTP");
	}

	xhttp.open("GET", fichero, false);
	xhttp.send();

	return xhttp.responseXML;
}