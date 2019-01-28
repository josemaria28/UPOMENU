window.addEventListener("load", inicio);

var upoMenu = new UpoMenu();
//var xml = cargarXML("https://github.com/ilde123/UPOMENU/blob/master/XML/menu.xml");
var xml = cargarXML("../XML/menu.xml");

function inicio() {
	datosPrueba();
	actualizarDesplegable();
	inicializarEventos();
	mostrarMenus();
}

function inicializarEventos() {
	document.querySelector("#btnAceptarMenu").addEventListener("click", validarFormulario);
	var desplegables = document.querySelectorAll("select");
	
	for (let i = 0; i < desplegables.length; i++) {
		desplegables[i].addEventListener("change", actualizarPrecio);
	}
}

function validarFormulario() {
	limpiarErrores();
	var valido = true;
	var error;

	var nombre = document.querySelector("#txtNombreMenu").value.trim();
	var exReg = /^[a-zA-ZÁÉÍÓÚñáéíóúÑ0-9 ]{6,30}$/;

	if (!exReg.test(nombre)) {
		valido = false;

		document.querySelector("#txtNombreMenu").classList.add("is-invalid");
		error = "El nombre debe contener caracteres alfanumérico de entre 6 y 30 caracteres";
	}
	else {
		document.querySelector("#txtNombreMenu").classList.add("is-valid");
	}

	if (!valido) {
		document.querySelector(".is-invalid").focus();
		mostrarMensajeError(error);
	}
	else {
		var pPlato = document.querySelector("#txtPrimerPlato").value;
		var sPlato = document.querySelector("#txtSegundoPlato").value;
		var postre = document.querySelector("#txtPostre").value;
		var precio = document.querySelector("#txtTotal").value;

		var menu = new Menu(nombre, precio, pPlato, sPlato, postre);
		upoMenu.agregarMenu(menu);
		agregarSpinner();
	}
}

function mostrarMenus() {
	var menus = xml.querySelectorAll("menu");
	var nMenus = xml.querySelectorAll("menu").length;
	var nFilas = nMenus / 3;
	var container = document.querySelector(".menus");
	
	nFilas = Math.ceil(nFilas);
	
	var j = 0;
	var contador = 0;
	for (var i = 0; i < nFilas; i++) {
		var fila = document.createElement("div");
		fila.classList.add("card-deck");
		
		while (contador < 3 && menus[j] != undefined) {
			var card = document.createElement("div");
			card.classList.add("card");
			var img = document.createElement("img");
			img.classList.add("card-img-top");
			img.setAttribute("src", "../img/menu3.jpg");
			
			var div = document.createElement("div");
			div.classList.add("card-img-overlay");
			
			var pPlato = upoMenu._buscarPlato(menus[j].querySelector("primerPlato").textContent).nombre;
			var pPrimerPlato = document.createElement("p");
			pPrimerPlato.classList.add("card-text", "color-menu");
			pPrimerPlato.textContent = "Primer plato: "+pPlato;
			
			var sPlato = upoMenu._buscarPlato(menus[j].querySelector("segundoPlato").textContent).nombre;
			var pSegundoPlato = document.createElement("p");
			pSegundoPlato.classList.add("card-text", "color-menu");
			pSegundoPlato.textContent = "Segundo plato: "+sPlato;
			
			var postre = upoMenu._buscarPlato(menus[j].querySelector("postre").textContent).nombre;
			var pPostre = document.createElement("p");
			pPostre.classList.add("card-text", "color-menu");
			pPostre.textContent = "Postre plato: "+postre;
			
			var bebida = menus[j].querySelector("bebidaMenu").textContent;
			var pBebida = document.createElement("p");
			pBebida.classList.add("card-text", "color-menu");
			pBebida.textContent = "Bebida: "+bebida;
			
			var precio = menus[j].querySelector("precio").textContent;
			var pPrecio = document.createElement("p");
			pPrecio.classList.add("card-text", "color-menu");
			pPrecio.textContent = "Precio: "+precio+" €";
			
			var titulo = document.createElement("h4");
			titulo.classList.add("card-title", "color-menu");
			titulo.textContent = menus[j].querySelector("nombre").textContent;
			
			div.appendChild(titulo);
			div.appendChild(pPrimerPlato);
			div.appendChild(pSegundoPlato);
			div.appendChild(pPostre);
			div.appendChild(pBebida);
			div.appendChild(pPrecio);
			card.appendChild(img);
			card.appendChild(div);
			fila.appendChild(card);
			j++;
			contador++;
		}
		contador = 0;
		container.appendChild(fila);
	}
	/*
		var fila = document.createElement("div");
		fila.classList.add("card-deck");
	
		for (var i = 0; i < nMenus; i++) {
			var card = document.createElement("div");
			card.classList.add("card");
			var img = document.createElement("img");
			img.classList.add("card-img-top");
			img.setAttribute("src", "../img/menu.jpg");
	
			var div = document.createElement("div");
			div.classList.add("card-img-overlay");
	
			var titulo = document.createElement("h4");
			titulo.classList.add("card-title");
			titulo.textContent = menus[i].querySelector("nombre").textContent;
	
			div.appendChild(titulo);
			card.appendChild(img);
			card.appendChild(div);
			fila.appendChild(card);
		}
		container.appendChild(fila);
	*/
}

function limpiarErrores() {
	var error = document.querySelector(".is-invalid");
	if (error != null) {
		error.classList.remove("is-invalid");
	}

	error = document.querySelector(".texto-error");
	if (error != null) {
		error.remove();
	}
}

function agregarSpinner() {
	var boton = document.querySelector("#btnAceptarMenu");
	boton.textContent = "Guardando... ";
	var span = document.createElement("span");
	span.classList.add("spinner-border", "spinner-border-sm");
	boton.appendChild(span);
	setTimeout(function() {frmMenu.submit();}, 3000);
}

function mostrarMensajeError(error) {
	var desplegable = document.querySelector(".is-invalid");

	var div = document.createElement("div");
	div.classList.add("texto-error");
	div.textContent = error;

	desplegable.parentElement.appendChild(div);
}

// Actualiza los options del select
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

// Actualiza el input type="text" con el precio del plato cuando cambia el option
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

// Agrega un input type="text" con el precio del plato
function mostrarPrecio(elemento) {
	var div = document.createElement("div");
	div.classList.add("input-group-append", "capa-precio");
	var input = document.createElement("spam");
	input.classList.add("input-group-text");
//	input.type = "text";
//	input.disabled = true;
	input.textContent = elemento.selectedOptions[0].dataset.precio + " €";
	input.classList.add("text-center")
	div.appendChild(input);
	elemento.after(div);
	var padre = elemento.parentElement;
	padre.classList.add("input-group");
}

// Borra el input type="text" que contiene el precio del plato
function borrarPrecio() {
	var capas = document.querySelectorAll(".capa-precio");

	if (capas.length > 0) {
		for (var i = 0; i < capas.length; i++) {
			capas[i].remove();
		}
	}
}

// Da formato de float a un numero
function numeroComa(numero) {
	numero.toString();
	numero = numero.replace(",", ".");
	return parseFloat(numero);
}

function datosPrueba() {
	var platos = xml.querySelectorAll("plato");

	for (var i = 0; i < platos.length; i++) {
		var id = platos[i].querySelector("id").textContent;
		var nombre = platos[i].querySelector("nombre").textContent;
		var tipo = platos[i].querySelector("tipo").textContent;
		var precio = numeroComa(platos[i].querySelector("precio").textContent);
		var ingredientes = platos[i].querySelectorAll("ingrediente");
		var arrayIngredientes = new Array();

		for (var j = 0; j < ingredientes.length; j++) {
			var nombresIngredientes = ingredientes[j].querySelectorAll("nombre");

			for (var s = 0; s < nombresIngredientes.length; s++) {
				arrayIngredientes.push(nombresIngredientes[s].textContent);
			}
		}
		upoMenu.añadirPlato(new Plato(id, nombre, tipo, precio));
		upoMenu.añadirIngredientesPlato(arrayIngredientes, id);
	}

	var bebidas = xml.querySelectorAll("bebida");

	for (var j = 0; j < bebidas.length; j++) {
		var nombreBebida = bebidas[j].querySelector("nombre").textContent;
		var precioBebida = numeroComa(bebidas[j].querySelector("precio").textContent);
		var alcoholico = bebidas[j].querySelector("alcoholico").textContent;
		var azucarado = bebidas[j].querySelector("azucarado").textContent;
		var gaseoso = bebidas[j].querySelector("gaseoso").textContent;

		var bebida = new Bebida(nombreBebida, precioBebida, "si" == alcoholico, "si" == gaseoso, "si" == azucarado);
		upoMenu.agregarBebida(bebida);
	}
/*
	var bebidas = xml.querySelectorAll("bebida");

	for (var i = 0; i < bebidas.length; i++) {
		var nombre = bebidas[i].nombre;
		var precio = bebidas[i].precio;
		var alcoholico = bebidas[i].alcoholico;
		var gaseoso = bebidas[i].gaseoso;
		var azucarado = bebidas[i].azucarado;

		upoMenu.agregarBebida(new Bebida(nombre, precio, alcoholico, gaseoso, azucarado));
	}
/*
	upoMenu.añadirPlato(new Plato(1, "patatas", "primer", 3.5));
	upoMenu.añadirPlato(new Plato(2, "albondigas", "primer", 4.7));
	upoMenu.añadirPlato(new Plato(3, "ensalada", "segundo", 2.5));
	upoMenu.añadirPlato(new Plato(4, "helado", "postre", 1.5));
	upoMenu.añadirPlato(new Plato(5, "plátano", "postre", 0.75));
	upoMenu.añadirPlato(new Plato(6, "filete", "primer", 3.5));
	upoMenu.añadirPlato(new Plato(7, "pescado", "segundo", 2.5));

	upoMenu.agregarBebida(new Bebida("Coca-Cola", 0.75, false, true, true));
	upoMenu.agregarBebida(new Bebida("Fanta", 0.5, false, true, true));
	upoMenu.agregarBebida(new Bebida("Barceló", 6, true, false, false));
	upoMenu.agregarBebida(new Bebida("7 up", 0.65, false, true, true));
	upoMenu.agregarBebida(new Bebida("Camaleón", 0.75, false, true, true));
	upoMenu.agregarBebida(new Bebida("Te", 0.95, false, true, false));
*/
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