var oUpoMenu = new UpoMenu();
// Meter XML necesario
function cargarXML(){}
cargarDatos();
function cargarDatos(){

	oUpoMenu.añadirPlato(new Plato("a1","Papas","Tapa",parseFloat(3,85),new Array()));
	oUpoMenu.añadirPlato(new Plato("a2","Setas","Plato",parseFloat(8,85),new Array()));

	//mostrar();
}

// Añadir Plato
document.getElementById("btnAñadirPlatos").addEventListener('click',añadirPlato,false);
document.getElementById("btnAñadirIngredientes").addEventListener('click',añadirIngrediente,false);


function añadirPlato(){
	// Verificar formulario Errores ...
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
	if (!oExpReg.test(sNombre)) {
		bValido = false;

		frmAltaPlato.txtNombrePlato.classList.add("Error");
		errorColor("txtNombrePlato");
		limpiar("txtNombrePlato");
		frmAltaPlato.txtNombrePlato.focus();
		
		sError += "El nombre no debe de contener numeros ni caracteres raros.\n";
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
		frmAltaPlato.txtTipoPlato.focus();
		
		sError += "Tipo no debe de contener numeros ni caracteres raros.\n";
	}else {
		limpiarColor("txtTipoPlato");
	}

	// Validar campo Precio
	var fPrecio = frmAltaPlato.txtPrecioPlato.value.trim();

	oExpReg = /[0-9]{3}\,[0-9]{2}/g;

	if (!oExpReg.test(fPrecio)) {
		bValido = false;

		frmAltaPlato.txtPrecioPlato.classList.add("Error");
		errorColor("txtPrecioPlato");
		limpiar("txtPrecioPlato");
		frmAltaPlato.txtPrecioPlato.focus();
		
		sError += "El precio solo debe contener numeros ( 00,00 ).";
	}else {
		limpiarColor("txtPrecioPlato");
	}
	// Validar seleccionar ingredientes





	if (bValido == false) {
        // Mostrar errores
        alert(sError);
    } else {
    	//var oIngrediente = oUpoMenu.añadirIngrediente(new Ingrediente(sIngrediente, sAlergeno));
    	// Añadir ingrdiente
    	if (oUpoMenu._buscarAlergeno(sAlergeno)) {
    		alert("alergeno Introducido");
    	}
    	alert("Gracias");
        frmAltaIngrediente.submit();
    }
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
    	//var oIngrediente = oUpoMenu.añadirIngrediente(new Ingrediente(sIngrediente, sAlergeno));
    	// Añadir ingrdiente
    	if (oUpoMenu._buscarAlergeno(sAlergeno)) {
    		alert("alergeno Introducido");
    	}
    	alert("Gracias");
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

