var oUpoMenu = new UpoMenu();

document.getElementById("btnAñadirPlatos").addEventListener("click",añadirPlato, false);


cargarDatos();
function cargarDatos(){

	oUpoMenu.añadirPlato(new Plato("a1","Papas","Tapa",parseFloat(3.85),new Array()));
	oUpoMenu.añadirPlato(new Plato("a2","Setas","Plato",parseFloat(8.85),new Array()));

	var cad = "maria,laura,juan";
	var arrayIngredientes = cad.split(",");
	oUpoMenu.añadirIngredientesPlato(arrayIngredientes, "a1");

	oUpoMenu.mostrarPlatos();
}


function añadirPlato(){
// Verificar formulario
	var bValido = true;
	var sError = "";
	limpiarErrores();

	var oExpReg = /[A-Za-z0-9]/g;
	var sId = frmAltaPlato.txtIDPlato.value.trim();

	if (!oExpReg.test(sId)) {
		bValido = false;

		frmAltaPlato.txtIDPlato.classList.add("Error");
		errorColor("txtIDPlato");
		limpiar("txtIDPlato");
		frmAltaPlato.txtIDPlato.focus();
		
		sError += "El ID no debe de contener caracteres raros.\n";
	}else {
		limpiarColor("txtIDPlato");
	}
	// Validar campo Nombre
	var sNombre = frmAltaPlato.txtNombrePlato.value.trim();

	// Error de Numeros
	oExpReg = /[A-Za-z\s]/g;
	///-----------------------------
	if (sNombre=="" || !oExpReg.test(sNombre)) {
		if (bValido) {
			bValido = false;
			limpiarColor("txtNombrePlato");
			limpiar("txtNombrePlato");
			frmAltaPlato.txtNombrePlato.focus();
		}

		frmAltaPlato.txtNombrePlato.classList.add("Error");
		errorColor("txtNombrePlato");
		
		sError += "El nombre no debe de contener números ni caracteres raros.\n";
	}else {
		limpiarColor("txtNombrePlato");
	}
	
	// Validar campo Tipo
	var sTipo = frmAltaPlato.txtTipoPlato.value.trim();
	
	if (!oExpReg.test(sTipo)) {
		if (bValido) {
			bValido = false;
			limpiarColor("txtTipoPlato");
			limpiar("txtTipoPlato");
			frmAltaPlato.txtTipoPlato.focus();
		}

		frmAltaPlato.txtTipoPlato.classList.add("Error");
		errorColor("txtTipoPlato");
		
		sError += "Tipo no debe de contener números ni caracteres raros.\n";
	}else {
		limpiarColor("txtTipoPlato");
	}

	// Validar campo Precio
	var fPrecio = frmAltaPlato.txtPrecioPlato.value.trim();

	oExpReg = /[0-9]{0,}\.[0-9]{2}/g;

	if (!oExpReg.test(fPrecio)) {
		if (bValido) {
			bValido = false;
			limpiarColor("txtPrecioPlato");
			limpiar("txtPrecioPlato");
			frmAltaPlato.txtPrecioPlato.focus();
		}
		frmAltaPlato.txtPrecioPlato.classList.add("Error");
		errorColor("txtPrecioPlato");
		
		sError += "El precio solo debe contener números ( 99.66 ).\n";
	}else {
		limpiarColor("txtPrecioPlato");
	}
	// Validar seleccionar ingredientes
	var sIngredientes = frmAltaPlato.txtIngredientePlato.value.trim();
	// Separados por coma,,,,
	 oExpReg = /[A-Za-z]{0,}\,[A-Za-z]{0,}/g;

	if (!oExpReg.test(sIngredientes)) {
		if (bValido) {
			bValido = false;
			limpiarColor("txtIngredientePlato");
			limpiar("txtIngredientePlato");
			frmAltaPlato.txtIngredientePlato.focus();
		}
		frmAltaPlato.txtIngredientePlato.classList.add("Error");
		errorColor("txtIngredientePlato");
		
		sError += "Ingrediente no debe de contener números ni caracteres raros.";
	}else {
		limpiarColor("txtIngredientePlato");
	}


	if (!bValido) {
        alert(sError);
    } else {
		
		//if (oUpoMenu.) {
			var arrayIngredientesPlato = sIngredientes.split(",");
	    	var oPlato = oUpoMenu.añadirPlato(new Plato(sId,sNombre,sTipo,fPrecio));
	    	oUpoMenu.añadirIngredientesPlato(arrayIngredientesPlato, sId);
	    	alert("Gracias");
    		frmAltaPlato.submit();
    		oUpoMenu.mostrarPlatos();
    	//}else
    	//	alert("Ese plato ya e")
    	
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