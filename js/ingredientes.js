var oUpoMenu = new UpoMenu();

document.getElementById("btnAñadirIngredientes").addEventListener("click",añadirIngrediente, false);

cargarDatos();
function cargarDatos(){

	oUpoMenu.añadirIngrediente(new Ingrediente("p"));
	oUpoMenu.añadirIngrediente(new Ingrediente("m"));

	var cad = "maria,laura,juan,mariano";
	var arrayIngredientes = cad.split(",");
	oUpoMenu.añadirIngredientesAlergeno(arrayIngredientes, "p");
    console.log(arrayIngredientes);

	oUpoMenu.mostrarIngredientes();
}

// Añadir Ingrediente
function añadirIngrediente(){
	// Verificar formulario Errores ...
	var bValido = true;
	var sError = "";
	limpiarErrores();

	// Validar campo nombreIngrediente
	var sIngrediente = frmAltaIngrediente.txtNombreIngrediente.value.trim();
	//alert(sIngrediente);
	// Error de Numeros
	var oExpReg = /[A-Za-z]/g;
	///-----------------------------
	if (!oExpReg.test(sIngrediente)) {
		bValido = false;

		frmAltaIngrediente.txtNombreIngrediente.classList.add("Error");
		errorColor("txtNombreIngrediente");
		limpiar("txtNombreIngrediente");
		frmAltaIngrediente.txtNombreIngrediente.focus();
		
		sError += "El nombre no debe de contener números ni caracteres raros.";
	}else {
		limpiarColor("txtNombreIngrediente");
	}

	// Validar Alergeno
	oExpReg = /[A-Za-z]{0,}\,[A-Za-z]{0,}/g;
	var sAlergeno = frmAltaIngrediente.txtAlergenoIngrediente.value.trim();
	if (!oExpReg.test(sAlergeno)) {
		if (bValido == true) {
			bValido = false;
			limpiarColor("txtAlergenoIngrediente");
			limpiar("txtAlergenoIngrediente");
			//frmAltaIngrediente.txtAlergenoIngrediente.focus();
		}

		frmAltaIngrediente.txtAlergenoIngrediente.classList.add("Error");
		errorColor("txtAlergenoIngrediente");
		limpiar("txtAlergenoIngrediente");
		//frmAltaIngrediente.txtAlergenoIngrediente.focus();
		
		sError += "\nEl Alergeno no debe de contener caracteres raros.";
	}else {
		limpiarColor("txtAlergenoIngrediente");
	}


	if (bValido == false) {
        // Mostrar errores
        alert(sError);
    } else {
    	//var oIngrediente = oUpoMenu.añadirIngrediente(new Ingrediente(sIngrediente, sAlergeno));
    	// Añadir ingrdiente
    	var arrayIngredientesAlergenos = sAlergeno.split(",");
    	var oIngrediente = oUpoMenu.añadirIngrediente(new Ingrediente(sIngrediente));
    	if (oUpoMenu.añadirIngrediente(new Ingrediente(sIngrediente)) {
    		alert("Gracias");
    	}else {
    		
    	}

    	oUpoMenu.añadirIngredientesAlergeno(arrayIngredientesAlergenos, sIngrediente);
    	oUpoMenu.mostrarIngredientes();

    	alert("Gracias");
    	frmAltaIngrediente.submit();
    	oUpoMenu.mostrarIngredientes();
    }
}

// Limpiamos todos los Errores
function limpiarErrores() {
	frmAltaIngrediente.txtNombreIngrediente.classList.remove("Error");
	frmAltaIngrediente.txtAlergenoIngrediente.classList.remove("Error");
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