var oUpoMenu = new UpoMenu();

document.getElementById("btnAñadirPlatos").addEventListener("click",añadirPlato, false);


cargarDatos();
function cargarDatos(){

	oUpoMenu.añadirPlato(new Plato("a1","Papas","Tapa",parseFloat(3.85),new Array()));
	oUpoMenu.añadirPlato(new Plato("a2","Setas","Plato",parseFloat(8.85),new Array()));

	//oUpoMenu.añadirIngredientesPlato(["maria"], "a1");
	/*var cad = "maria,laura,juan"
	var arrayIngredientes = cad.split(",");
    console.log(arrayIngredientes);*/

	oUpoMenu.mostrar();
}

function añadirPlato(){
// Verificar formulario Errores ...
	var bValido = true;
	var sError = "";
	limpiarErrores();

	var oExpReg = /^[A-Za-z0-9]$/;
	var sId = frmAltaPlato.txtIDPlato.value.trim();

	if (!oExpReg.test(sId)) {
		bValido = false;

		frmAltaPlato.txtIDPlato.classList.add("Error");
		errorColor("txtIDPlato");
		limpiar("txtIDPlato");
		// frmAltaPlato.txtIDPlato.focus();
		
		sError += "El ID no debe de contener caracteres raros.\n";
	}else {
		limpiarColor("txtIDPlato");
	}
	// Validar campo Nombre
	var sNombre = frmAltaPlato.txtNombrePlato.value.trim();

	// Error de Numeros
	oExpReg = /^[A-Za-z\s]$/;
	///-----------------------------
	if (!oExpReg.test(sNombre)) {
		bValido = false;

		frmAltaPlato.txtNombrePlato.classList.add("Error");
		errorColor("txtNombrePlato");
		limpiar("txtNombrePlato");
		// frmAltaPlato.txtNombrePlato.focus();
		
		sError += "El nombre no debe de contener números ni caracteres raros.\n";
	}else {
		limpiarColor("txtNombrePlato");
	}
	
	// Validar campo Tipo
	var sTipo = frmAltaPlato.txtTipoPlato.value.trim();
	
	if (!oExpReg.test(sTipo)) {
		bValido = false;

		frmAltaPlato.txtTipoPlato.classList.add("Error");
		errorColor("txtTipoPlato");
		limpiar("txtTipoPlato");
		// frmAltaPlato.txtTipoPlato.focus();
		
		sError += "Tipo no debe de contener números ni caracteres raros.\n";
	}else {
		limpiarColor("txtTipoPlato");
	}

	// Validar campo Precio
	var fPrecio = frmAltaPlato.txtPrecioPlato.value.trim();

	oExpReg = /^[0-9]{3}\,[0-9]{2}$/;

	if (!oExpReg.test(fPrecio)) {
		bValido = false;

		frmAltaPlato.txtPrecioPlato.classList.add("Error");
		errorColor("txtPrecioPlato");
		limpiar("txtPrecioPlato");
		// frmAltaPlato.txtPrecioPlato.focus();
		
		sError += "El precio solo debe contener números ( 99.66 ).\n";
	}else {
		limpiarColor("txtPrecioPlato");
	}
	// Validar seleccionar ingredientes
	var sIngredientes = frmAltaPlato.txtIngredientePlato.value.trim();
	// Separados por coma,,,,
	// oExpReg = /^[0-9]{3}\,[0-9]{2}$/;

	if (!oExpReg.test(sIngredientes)) {
		bValido = false;

		frmAltaPlato.txtIngredientePlato.classList.add("Error");
		errorColor("txtIngredientePlato");
		limpiar("txtIngredientePlato");
		// frmAltaPlato.txtIngredientePlato.focus();
		
		sError += "Ingrediente no debe de contener números ni caracteres raros.";
	}else {
		limpiarColor("txtIngredientePlato");
	}


	if (bValido == false) {
        // Mostrar errores
        alert(sError);
    } else {
    	// Recorrer Ingredientes
    	var arrayIngredientesPlato = sIngredientes.split(",");
    	//console.log(arrayIngredientes);
    	// Añadir Plato
    	var oPlato = oUpoMenu.añadirPlato(new Plato(sID,sNombre,sTipo,fPrecio));

    	oUpoMenu.añadirIngredientesPlato(arrayIngredientesPlato, sId);
    	
    	alert("Gracias");
    	frmAltaPlato.submit();
    }
}
// Limpiamos todos los Errores
function limpiarErrores() {
	frmAltaPlato.txtIDPlato.classList.remove("Error");
	frmAltaPlato.txtNombrePlato.classList.remove("Error");
	frmAltaPlato.txtTipoPlato.classList.remove("Error");
	frmAltaPlato.txtPrecioPlato.classList.remove("Error");
	frmAltaPlato.txtIngredientePlato.classList.remove("Error");
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