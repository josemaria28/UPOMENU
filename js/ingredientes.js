var oUpoMenu = new UpoMenu();

document.getElementById("btnAñadirIngredientes").addEventListener("click",añadirIngrediente, false);
var oXML = loadXMLDoc("../XML/ingredientes.xml");
// document.getElementById("añadirMASAlergenos").addEventListener("click",añadirMASAlergenos, false);
cargarDatos();
function cargarDatos(){
	// Generar options
		/*var oIngrediente = oXML.querySelector("ingrediente");
		var oNombre = oIngrediente.querySelector("nombre");
		var oAlergeno = oIngrediente.querySelectorAll("alergeno");
		var oIngredienteMeter = null;

        for (var i = 0; i < oIngrediente.length; i++) {
        	oIngredienteMeter = oIngrediente[i].textContent;


        }
*/
	oUpoMenu.añadirIngrediente(new Ingrediente("p"));
	oUpoMenu.añadirIngrediente(new Ingrediente("m"));

	 var cad = "maria,laura,juan,mariano";
	var arrayIngredientes = cad.split(",");
	oUpoMenu.añadirIngredientesAlergeno(arrayIngredientes, "p");
    // console.log(arrayIngredientes);

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
		//frmAltaIngrediente.txtAlergenoIngrediente.focus();
		
		sError += "\nPara introducir los alergenos debe separarlos por comas.\n\tEjemplo: Leche,Soja,...";
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
    	//var oIngrediente = oUpoMenu.añadirIngrediente(new Ingrediente(sIngrediente));
    	if (oUpoMenu.añadirIngrediente(new Ingrediente(sIngrediente))) {
    		oUpoMenu.añadirIngredientesAlergeno(arrayIngredientesAlergenos, sIngrediente);
    		alert("Ingrediente añadido.");
    		// frmAltaIngrediente.submit();
    		limpiarCamposPlato();
    		crearSelectMultipleDeIngredientesPorPlato();
    	}else {
    		alert("Ese ingrediente ya existe.");
    	}
    }
    oUpoMenu.mostrarIngredientes();
}
// Añadir alergenos a Ingrediente
/*function añadirMASAlergenos(){
	if (oUpoMenu._buscarIngrediente(frmAltaIngrediente.txtNombreIngrediente.value.trim())){
		var arrayIngredientesAlergenos = sAlergeno.split(",");
		oUpoMenu.añadirIngredientesAlergeno(arrayIngredientesAlergenos, sIngrediente);

	}
}*/

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
function crearSelectMultipleDeIngredientesPorPlato(){
	// Seleccionamos el ultimo hijo del dormulario
	var nodoDiv = document.querySelector("#frmAltaPlato").lastChild;
	var selectIngredientes = document.createElement("SELECT").multiple = true;

	/*var parrafo = document.createElement("p");
	var contenido = document.createTextNode("Hola Mundo!");
	parrafo.appendChild(contenido);
	document.body.appendChild(parrafo);*/

}