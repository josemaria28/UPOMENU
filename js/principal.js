var oUpoMenu = new UpoMenu();
// Meter XML necesario
function cargarXML(){}
// Eventos


// Todo lo demas

// Manejo Ingredientes
document.getElementById("btnAñadirIngredientes").addEventListener('click',añadirIngrediente,false);

function añadirIngrediente(){
	// Verificar formulario Errores ...
	var bValido = true;
	var sError = "";
	limpiarErrores();

	// Validar campo nombreIngrediente
	var sIngrediente = frmAltaIngrediente.txtNombreIngrediente.value.trim();
	//alert(sIngrediente);
	// Error de Numeros
	var oExpReg = /[A-Za-z\s]/g;
	///-----------------------------
	if (!oExpReg.test(sIngrediente)) {
		bValido = false;

		frmAltaIngrediente.txtNombreIngrediente.classList.add("Error");
		errorColor("txtNombreIngrediente");
		limpiar("txtNombreIngrediente");
		frmAltaIngrediente.txtNombreIngrediente.focus();
		
		sError += "El nombre no debe de contener numeros ni caracteres raros.";
	}else {
		limpiarColor("txtNombreIngrediente");
	}

	// Validar Alergeno
	var sAlergeno = frmAltaIngrediente.txtAlergenoIngrediente.value.trim();
	if (!oExpReg.test(sAlergeno)) {
		bValido = false;

		frmAltaIngrediente.txtAlergenoIngrediente.classList.add("Error");
		errorColor("txtAlergenoIngrediente");
		limpiar("txtAlergenoIngrediente");
		frmAltaIngrediente.txtAlergenoIngrediente.focus();
		
		sError += "\nEl Alergeno no debe de contener caracteres raros.";
	}else {
		limpiarColor("txtAlergenoIngrediente");
	}


	if (bValido == false) {
        // Mostrar errores
        alert(sError);
    } else {
    	// Añadir ingrdiente
    	// var oIngrediente = oUpoMenu.añadirPlato(new );
        frmAltaIngrediente.submit();
    }
}
// Limpiamos todos los Errores
function limpiarErrores() {
	frmAltaIngrediente.txtNombreIngrediente.classList.remove("Error");
}
// Color Error
function errorColor(campo){
	return document.getElementById(campo).style.background = 'yellow';
}
// Capa limpiar
function limpiar(capa){
	return document.getElementById(capa).value = "";
}
// Vaciar Campo
function vacio(campo){
	return document.getElementById(campo).value = "";
}
// Limpar color
function limpiarColor(campo){
	return document.getElementById(campo).style.background = 'white';
}

