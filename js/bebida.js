window.addEventListener("load", inicio);

function inicio() {
	frmAltaBebida.btnAñadirBebida.addEventListener("click", validarFormulario);
}

function validarFormulario() {
	limpiarErrores();
	
	var valido = true;
	var error = new Array();

	var nombre = frmAltaBebida.txtNombre.value.trim();
	var exReg = /^[a-zA-ZÁÉÍÓÚñáéíóúÑ0-9 ]{6,50}$/;

	if (exReg.test(nombre)) {
		frmAltaBebida.txtNombre.classList.add("is-valid");
	}
	else {
		valido = false;
		frmAltaBebida.txtNombre.classList.add("is-invalid");
		mostrarMensajeError(frmAltaBebida.txtNombre, "El nombre debe contener caracteres alfanumérico de entre 6 y 50 caracteres");
	}
	
	var precio = frmAltaBebida.txtPrecio.value.trim();
	exReg = /^(\d)?(\d|,)*\.?\d+$/;

	if (exReg.test(precio)) {
		frmAltaBebida.txtPrecio.classList.add("is-valid");
	}
	else {
		valido = false;
		frmAltaBebida.txtPrecio.classList.add("is-invalid");
		mostrarMensajeError(frmAltaBebida.txtPrecio, "El precio debe tener el formato correcto");
	}

	var alcoholico = frmAltaBebida.alcoholico.value.trim();

	if (frmAltaBebida.alcoholico.item(0).checked || frmAltaBebida.alcoholico.item(1).checked) {
		var elementos = document.querySelectorAll("[name=alcoholico]");

		for (var i = 0; i < elementos.length; i++) {
			elementos[i].classList.add("is-valid");
		}
	}
	else {
		valido = false;
		var elementos = document.querySelectorAll("[name=alcoholico]");

		for (var i = 0; i < elementos.length; i++) {
			elementos[i].classList.add("is-invalid");
		}

		mostrarMensajeError(frmAltaBebida.alcoholicoSi, "Debe indicar si es una bebida alcoholica");
	}

	var gaseoso = frmAltaBebida.gaseoso.value.trim();

	if (frmAltaBebida.gaseoso.item(0).checked || frmAltaBebida.gaseoso.item(1).checked) {
		var elementos = document.querySelectorAll("[name=gaseoso]");

		for (var i = 0; i < elementos.length; i++) {
			elementos[i].classList.add("is-valid");
		}
	}
	else {
		valido = false;
		var elementos = document.querySelectorAll("[name=gaseoso]");

		for (var i = 0; i < elementos.length; i++) {
			elementos[i].classList.add("is-invalid");
		}

		mostrarMensajeError(frmAltaBebida.gaseosoSi, "Debe indicar si es una bebida gaseosa");
	}

	var azucarado = frmAltaBebida.azucarado.value.trim();

	if (frmAltaBebida.azucarado.item(0).checked || frmAltaBebida.azucarado.item(1).checked) {
		var elementos = document.querySelectorAll("[name=azucarado]");

		for (var i = 0; i < elementos.length; i++) {
			elementos[i].classList.add("is-valid");
		}
	}
	else {
		valido = false;
		var elementos = document.querySelectorAll("[name=azucarado]");

		for (var i = 0; i < elementos.length; i++) {
			elementos[i].classList.add("is-invalid");
		}

		mostrarMensajeError(frmAltaBebida.azucaradoSi, "Debe indicar si es una bebida azucarada");
	}

	if (valido) {
		var bebida = new Bebida(nombre, precio, alcoholico == "si", gaseoso == "si", azucarado == "si");

		oUpoMenu.agregarBebida(bebida);
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

function mostrarMensajeError(elemento, error) {
	var div = document.createElement("div");
	div.classList.add("texto-error");
	div.textContent = error;

	elemento.parentElement.parentElement.appendChild(div);
}