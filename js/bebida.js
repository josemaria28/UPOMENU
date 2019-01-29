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
		frmAltaBebida.txtNombre.classList.add("is-invalid");
		error.push("El nombre debe contener caracteres alfanumérico de entre 6 y 50 caracteres");
	}
	
	var precio = frmAltaBebida.txtPrecio.value.trim();
	exReg = /^(\d|-)?(\d|,)*\.?\d*$/;
	
	if (exReg.test(precio)) {
		frmAltaBebida.txtPrecio.classList.add("is-valid");
	}
	else {
		frmAltaBebida.txtPrecio.classList.add("is-invalid");
		error.push("El precio debe tener el formato correcto");
	}
}

function limpiarErrores() {
	var errores = document.querySelectorAll(".is-invalid");

	for (var i = 0; i < errores.length; i++) {
		errores[i].classList.remove("is-invalid");
	}
}