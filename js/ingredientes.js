var oUpoMenu = new UpoMenu();

document.getElementById("btnAñadirIngredientes").addEventListener("click",añadirIngrediente, false);
var oXML = loadXMLDoc("../XML/ingredientes.xml");
// document.getElementById("añadirMASAlergenos").addEventListener("click",añadirMASAlergenos, false);
cargarIngredientes();
function cargarIngredientes(){
	// Generar options
		// Recogemos todos los ingredientes
		var oIngrediente = oXML.querySelectorAll("ingrediente");
		// Recorremos los nombres y los alergenos
		for (var i = 0; i < oIngrediente.length; i++) {
			var oNombre = oIngrediente[i].querySelector("nombre").textContent;
			var oAlergenos = oIngrediente[i].querySelectorAll("alergeno");
			var aAlergenos = new Array();
			// Recorremos todos los alergenos de cada ingrediente
			for (var a = 0; a < oAlergenos.length; a++) {
				aAlergenos.push(oAlergenos[a].textContent);
			}
			var sNombreIngrediente = new Ingrediente(oNombre);
			oUpoMenu.añadirIngrediente(sNombreIngrediente);
			oUpoMenu.añadirIngredientesAlergeno(aAlergenos, sNombreIngrediente.nombre);
		}
	//ocultar("btnAñadirIngredientes");
	// oUpoMenu.mostrarIngredientes();
}

// Añadir Ingrediente
function añadirIngrediente(){
	// Verificar formulario Errores ...
	var bValido = true;
	var sError = "";
	limpiarErrores();

	// Validar campo nombreIngrediente
	var sIngrediente = frmAltaIngrediente.txtNombreIngrediente.value.trim();

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
	oExpReg = /[A-Za-z]\,{0,}/g;
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
		
		sError += "\nPara introducir los alergenos debe separarlos por comas.\n\tEjemplo: Leche,Soja,...";
	}else {
		limpiarColor("txtAlergenoIngrediente");
	}


	if (bValido == false) {
        // Mostrar errores
        alert(sError);
    } else {
    	var arrayIngredientesAlergenos = sAlergeno.split(",");
    	var oIngrediente = oUpoMenu.añadirIngrediente(new Ingrediente(sIngrediente));

    	if (oIngrediente) {
    		oUpoMenu.añadirIngredientesAlergeno(arrayIngredientesAlergenos, sIngrediente);
    		alert("Ingrediente añadido.");
    		limpiarCamposPlato();
    	}else {
    		alert("Ese ingrediente ya existe.");
    	}
    }
    oUpoMenu.mostrarIngredientes();
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
// Formulario
function mostrar(campo){
	document.getElementById(campo).style.display = "block";
}
function ocultar(campo){
	document.getElementById(campo).style.display = "none";
}

function loadXMLDoc(filename) {
    if (window.XMLHttpRequest) {
        xhttp = new XMLHttpRequest();
    } else // code for IE5 and IE6
    {
        xhttp = new ActiveXObject("Microsoft.XMLHTTP");
    }
    xhttp.open("GET", filename, false);

    xhttp.send();

    return xhttp.responseXML;
}

function limpiarCamposPlato(){
	limpiar("txtNombreIngrediente");
	limpiar("txtAlergenoIngrediente");
}
