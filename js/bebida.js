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
		error.push("El nombre debe contener caracteres alfanumérico de entre 6 y 50 caracteres");
	}
	
	var precio = frmAltaBebida.txtPrecio.value.trim();
	exReg = /^(\d|-)?(\d|,)*\.?\d*{1+}$/;

	if (exReg.test(precio)) {
		frmAltaBebida.txtPrecio.classList.add("is-valid");
	}
	else {
		valido = false;
		frmAltaBebida.txtPrecio.classList.add("is-invalid");
		error.push("El precio debe tener el formato correcto");
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

		error.push("Debe indicar si es una bebida alcoholica");
	}

	if (!valido) {
		mostrarMensajeError(error);
	}
}

function limpiarErrores() {
	var errores = document.querySelectorAll(".is-invalid");

	for (var i = 0; i < errores.length; i++) {
		errores[i].classList.remove("is-invalid");
	}
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