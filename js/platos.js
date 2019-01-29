var oUpoMenu = new UpoMenu();

document.getElementById("btnAñadirPlatos").addEventListener("click",añadirPlato, false);
datosIngredientes();

cargaComboPlatos();

function datosIngredientes(){
	oUpoMenu.añadirIngrediente(new Ingrediente("hola"));
	oUpoMenu.añadirIngrediente(new Ingrediente("Maria"));
	oUpoMenu.añadirIngrediente(new Ingrediente("Juan"));
	oUpoMenu.añadirIngrediente(new Ingrediente("Rafael"));
	//oUpoMenu.mostrarIngredientes();
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
	 //oExpReg = /[A-Za-z]{0,}\,[A-Za-z]{0,}/g;

	/*if (!oExpReg.test(sIngredientes)) {
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
	}*/


	if (!bValido) {
        alert(sError);
    } else {
		
		//if (oUpoMenu.) {
			var arrayIngredientesPlato = new Array();

			var elementosSeleccionados = dameSeleccionados(document.querySelector("#txtIngredientePlato"));
			var tablaIngredientes = oUpoMenu.dameIngredientes();


			for (var i = 0; i < elementosSeleccionados.length; i++) {
				arrayIngredientesPlato[i] = elementosSeleccionados[i].value;
				//console.log(elementosSeleccionados[i].value);
			}
			for (var i = 0; i < tablaIngredientes.length; i++) {
				console.log(tablaIngredientes[i].nombre);
			}

	    	var oPlato = oUpoMenu.añadirPlato(new Plato(sId,sNombre,sTipo,fPrecio));
	    	oUpoMenu.añadirIngredientesPlato(arrayIngredientesPlato, sId);
	    	alert("Plato añadido.");
	    	limpiarCamposPlato();
    		oUpoMenu.mostrarPlatos();
    	
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
function limpiarCamposPlato(){
	limpiar("txtIDPlato");
	limpiar("txtNombrePlato");
	limpiar("txtTipoPlato");
	limpiar("txtPrecioPlato");
	limpiar("txtIngredientePlato");
}
function cargaComboPlatos(){
	// Creamos el label
	var labelIngrediente = document.createElement("label");
	labelIngrediente.setAttribute("for", "text");
	var contenidoLabel = document.createTextNode("Ingredientes:");
	labelIngrediente.appendChild(contenidoLabel);
	document.querySelector("#selectIngredientes").appendChild(labelIngrediente);

	// Creamos el Select Multiple
	var selectIngredientes = document.createElement("select");
	selectIngredientes.setAttribute("id", "txtIngredientePlato");
	selectIngredientes.setAttribute("class", "form-control");
	selectIngredientes.setAttribute("multiple", "");
	document.querySelector("#selectIngredientes").appendChild(selectIngredientes);

	// Metemos los Ingredientes
	cargarElementos("txtIngredientePlato", oUpoMenu.dameIngredientes());

}

function cargarElementos(select, tabla){
	tabla.sort();
	addOptions(select, tabla);
}
function addOptions(select, tabla) {
	var contenido = document.getElementById(select);

	document.getElementById(select).textContent = "";

	for (value in tabla) {
		var option = document.createElement("option");
		option.text = tabla[value].nombre;
		contenido.add(option);
	}
}

function dameSeleccionados(elemento){
	var auxArr = new Array();
	for (var i = 0; i < elemento.length; i++) {
		if (elemento[i].selected)
			auxArr.push(elemento[i]);
	}
	return auxArr;
}

