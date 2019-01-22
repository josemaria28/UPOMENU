var upoMenu = new UpoMenu();
//var xml = cargarXML("https://github.com/ilde123/UPOMENU/blob/master/XML/menu.xml");
//var xml = cargarXML("../XML/menu.xml");

// Meter XML necesario
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

// Eventos
window.addEventListener("load", inicio);

function inicio() {
	datosPrueba();
	actualizarDesplegable();
	inicializareventos();
}

// Todo lo demas
function validarFormulario() {
	limpiarErrores();

	var valido = true;
	var error = new Array();

	var nombre = document.querySelector("#txtNombreEvento").value.trim();
	var exReg = /^[a-zA-Z0-9]{6,50}$/;

	if (exReg.test(nombre) == false) {
		valido = false;

		document.querySelector("#txtNombreEvento").classList.add("is-invalid");
		error.push("El nombre debe contener caracteres alfanumérico de entre 6 y 50 caracteres");
	}

	var fecha = document.querySelector("#txtFecha").value;
//	exreg = /^[0-9]{4}([\-/.])(0?[1-9]|1[1-2])([\-/.])(3[01]|[12][0-9]|0?[1-9])$/;

	if (fecha == "") {
		valido = false;

		document.querySelector("#txtFecha").classList.add("is-invalid");
		
		error.push("Debe seleccionar una fecha");
	}

	var comensales = document.querySelector("#txtComensales").value.trim();
	exReg = /^[0-9]{1,3}$/;

	if (!exReg.test(comensales)) {
		valido = false;

		document.querySelector("#txtComensales").classList.add("is-invalid");
		error.push("Comensales debe ser un número");
	}

	var duracion = document.querySelector("#txtDuracion").value.trim();
	exReg = /(\W|^)([mM]añana|[tT]arde|[nN]oche)(\W|$)/;

	if (!exReg.test(duracion)) {
		valido = false;

		document.querySelector("#txtDuracion").classList.add("is-invalid");
		error.push("Debe escribir Mañana, Tarde o Noche");
	}

	if (!valido) {
		document.querySelector(".is-invalid").focus();
		mostrarMensajeError(error);
	}
	else {
		frmEvento.submit();
	}
}

function mostrarMensajeError(error) {
	var elemento = document.querySelectorAll(".is-invalid");

	for (var i = 0; i < elemento.length; i++) {
		var div = document.createElement("div");
		div.classList.add("texto-error");
		div.textContent = error[i];

		elemento[i].parentElement.appendChild(div);
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
	var primerPlato = document.querySelector("#txtPrimerPlato");
	var platos = upoMenu.platos;

	for (var i = 0; i < platos.length; i++) {
		var option = document.createElement("option");
		option.text = platos[i].nombre;
		option.value = platos[i].id;
		option.dataset.precio = platos[i].precio;

		primerPlato.appendChild(option);
	}
	
	var segundoPlato = document.querySelector("#txtSegundoPlato");

	for (var i = 0; i < platos.length; i++) {
		option = document.createElement("option");
		option.text = platos[i].nombre;
		option.value = platos[i].id;
		option.dataset.precio = platos[i].precio;

		segundoPlato.appendChild(option);
	}
	
	var postre = document.querySelector("#txtPostre");

	for (var i = 0; i < platos.length; i++) {
		option = document.createElement("option");
		option.text = platos[i].nombre;
		option.value = platos[i].id;
		option.dataset.precio = platos[i].precio;

		postre.appendChild(option);
	}

	var bebidas = document.querySelector("#txtBebidas");
	var listaBebidas = upoMenu.bebidas;

	for (var i = 0; i < listaBebidas.length; i++) {
		option = document.createElement("option");
		option.text = listaBebidas[i].nombre;
		option.value = listaBebidas[i].nombre;
		option.dataset.precio = listaBebidas[i].precio;

		bebidas.appendChild(option);
	}

	actualizarPrecio();
}

function actualizarPrecio() {
	var desplegables = document.querySelectorAll("select");
	var precioTotal = 0;

	for (var i = 0; i < desplegables.length; i++) {
		var index = desplegables[i].selectedIndex;

		var precio = desplegables[i].options[index].dataset.precio;

		precioTotal += parseFloat(precio);
	}

	var total = document.querySelector("#txtTotal");
	total.value = precioTotal + " €";
}

function inicializareventos() {
	document.querySelector("#btnAceptarEvento").addEventListener("click", validarFormulario);
	document.querySelector("#btnIncremento").addEventListener("click", actualizaValor);
	document.querySelector("#btnDecremento").addEventListener("click", actualizaValor);
	var desplegables = document.querySelectorAll("select");
	
	for (let i = 0; i < desplegables.length; i++) {
		desplegables[i].addEventListener("change", actualizarPrecio);
	}
}

function actualizaValor(e) {
	var comensales = document.querySelector("#txtComensales");
	var valor = parseInt(comensales.value);

	if (valor >= 0) {
		if (e.target.id == "btnIncremento") {
			valor++;

			comensales.value = valor;
		}
		else {
			if (valor > 1) {
			valor--;

			comensales.value = valor;
			}
		}
	}
}




function datosPrueba() {
	upoMenu.añadirPlato(new Plato(1, "patatas", "primer", 3.5));
	upoMenu.añadirPlato(new Plato(2, "albondigas", "primer", 4.7));
	upoMenu.añadirPlato(new Plato(3, "ensalada", "segundo", 2.5));
	upoMenu.añadirPlato(new Plato(4, "helado", "postre", 1.5));
	upoMenu.añadirPlato(new Plato(5, "plátano", "postre", 0.75));
	upoMenu.añadirPlato(new Plato(6, "filete", "primer", 3.5));
	upoMenu.añadirPlato(new Plato(7, "pescado", "segundo", 2.5));
	upoMenu.añadirPlato(new Plato(7, "pescado", "segundo", 2.5));

	upoMenu.agregarBebida(new Bebida("coca-cola", 0.75, false, true, true));
	upoMenu.agregarBebida(new Bebida("fanta", 0.5, false, true, true));
	upoMenu.agregarBebida(new Bebida("barceló", 6, true, false, false));
	upoMenu.agregarBebida(new Bebida("7 up", 0.65, false, true, true));
	upoMenu.agregarBebida(new Bebida("camaleón", 0.75, false, true, true));
	upoMenu.agregarBebida(new Bebida("te", 0.95, false, true, false));
	upoMenu.agregarBebida(new Bebida("te", 0.95, false, true, false));
}