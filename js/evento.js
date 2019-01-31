window.addEventListener("load", inicio);

var upoMenu = new UpoMenu();
//var oXML = cargarXML("https://github.com/ilde123/UPOMENU/blob/master/XML/menu.oXML");
var oXML = cargarXML("../XML/menu.oXML");

// Eventos

function inicio() {
	datosPrueba();
	actualizarDesplegableEvento();
	inicializarEventos();
}

// Todo lo demas
function validarFormularioEvento() {
	limpiarErroresEvento();

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
		mostrarMensajeErrorEvento(error);
	}
	else {
		var menu = upoMenu._buscarMenu(document.querySelector("#txtMenu").value);

		var evento = new Evento(nombre, fecha, comensales, duracion, menu);
		upoMenu.agregarEvento(evento);
		agregarSpinnerEvento();

	}
}

function agregarSpinnerEvento() {
	var boton = document.querySelector("#btnAceptarEvento");
	boton.textContent = "Guardando... ";
	var span = document.createElement("span");
	span.classList.add("spinner-border", "spinner-border-sm");
	boton.appendChild(span);
	setTimeout(function() {frmEvento.submit();}, 3000);
}



function mostrarMensajeErrorEvento(error) {
	var desplegable = document.querySelectorAll(".is-invalid");

	for (var i = 0; i < desplegable.length; i++) {
		var div = document.createElement("div");
		div.classList.add("texto-error");
		div.textContent = error[i];

		desplegable[i].parentElement.appendChild(div);
	}
}

function limpiarErroresEvento() {
	var errores = document.querySelectorAll(".is-invalid");

	for (var i = 0; i < errores.length; i++) {
		errores[i].classList.remove("is-invalid");
	}

	errores = document.querySelectorAll(".texto-error");

	for (var i = 0; i < errores.length; i++) {
		errores[i].remove();
	}
}

function actualizarDesplegableEvento() {
	var menu = document.querySelector("#txtMenu");
	var menus = upoMenu.menus;

	for (var i = 0; i < menus.length; i++) {
		var option = document.createElement("option");
		option.text = menus[i].nombre;
		option.value = menus[i].nombre;
		option.dataset.precio = menus[i].precio.toFixed(2);

		menu.appendChild(option);
	}

	actualizarPrecioEvento();
}

function actualizarPrecioEvento() {
	var desplegable = document.querySelector("select");

	borrarPrecioEvento();
	mostrarPrecioEvento();
}

function mostrarPrecioEvento() {
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

function borrarPrecioEvento() {
	var capa = document.querySelector(".capa-precio");
	if (capa != null) {
		capa.remove();
	}
}

function inicializarEventos() {
	document.querySelector("#btnAceptarEvento").addEventListener("click", validarFormularioEvento);
	document.querySelector("#btnIncremento").addEventListener("click", actualizaValor);
	document.querySelector("#btnDecremento").addEventListener("click", actualizaValor);
	document.querySelector("select").addEventListener("change", actualizarPrecioEvento);
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
	var menus = oXML.querySelectorAll("menu");

	for (var i = 0; i < menus.length; i++) {
		var nombre = menus[i].querySelector("nombre").textContent;
		var precio = numeroComa(menus[i].querySelector("precio").textContent);
		var pPlato = menus[i].querySelector("primerPlato").textContent;
		var sPlato = menus[i].querySelector("segundoPlato").textContent;
		var postre = menus[i].querySelector("postre").textContent;
		var nombreBebida = menus[i].querySelector("bebidaMenu");
		var menu = new Menu(nombre, precio, pPlato, sPlato, postre, nombreBebida);

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