window.addEventListener("load",inicioIndex,false);

function inicioIndex()
{
    ocultarFormularios();
    document.getElementById("btnMenu").addEventListener("click",verAltaMenu);
    document.getElementById("btnEventos").addEventListener("click",verAltaEvento);
    document.getElementById("btnPlatos").addEventListener("click",verAltaPlato);
    document.getElementById("btnIngredientes").addEventListener("click",verAltaIngredientes);
    document.getElementById("btnBebidas").addEventListener("click",verAltaBebidas);
    document.getElementById("btnContacto").addEventListener("click",verContacto);
    document.getElementById("enlaceRegistrarse").addEventListener("click",verRegistro);
    document.getElementById("btnListadoClientes").addEventListener("click",verListadoClientes);
    var botonesCarrusel = document.getElementsByClassName("btnCarrusel");
    //Lo que llega de botonesCarrusel es un array de elementos, asi que lo recorremos y le asignamos la misma función, que es 
    //lo que buscamos
    for(var i=0;i<botonesCarrusel.length;i++)
    {
        botonesCarrusel[i].addEventListener("click",verAltaPlato);
    }
    // Formulario Platos
    document.getElementById("btnAñadirPlatos").addEventListener("click",añadirPlato, false);
    document.getElementById("btnAñadirIngredientes").addEventListener("click",añadirIngrediente, false);
    var oXML = loadXMLDoc("../XML/ingredientes.xml");
    cargarIngredientes();
    // Formulario Cliente
}

function ocultarFormularios()
{
    ocultar("frmMenu");
    ocultar("frmEvento");
    ocultar("frmPlato");
    ocultar("frmAltaIngrediente");
    ocultar("frmAltaBebida");
    ocultar("divContacto");
    ocultar("divRegistro");

}

function verAltaMenu()
{
    ocultar("carrusel");
    ocultarFormularios();
	mostrar("frmMenu");
	document.querySelector("script+script").setAttribute("src", "js/menu.js");
    frmMenu.reset();
}

function verAltaEvento()
{
    ocultar("carrusel");
    ocultarFormularios();
	mostrar("frmEvento");
	document.querySelector("script+script").setAttribute("src", "js/evento.js");
    frmEvento.reset();

}

function verAltaPlato()
{
    ocultar("carrusel");
    ocultarFormularios();
	mostrar("frmPlato");
	//document.querySelector("script+script").setAttribute("src", "js/platos.js");
    //frmPlato.reset();
}

function verAltaIngredientes()
{
    ocultar("carrusel");
    ocultarFormularios();
	mostrar("frmAltaIngrediente");
	//document.querySelector("script+script").setAttribute("src", "js/ingredientes.js");
    //frmAltaIngrediente.reset();
}

function verAltaBebidas()
{
    ocultar("carrusel");
    ocultarFormularios();
	mostrar("frmAltaBebida");
	document.querySelector("script+script").setAttribute("src", "js/bebida.js");
    frmAltaBebida.reset();
}

function verContacto()
{
    ocultar("carrusel");
    ocultarFormularios();
    mostrar("divContacto");
    formContacto.reset();
}

function verRegistro()
{
    ocultar("carrusel");
    ocultarFormularios();
    mostrar("divRegistro");
    frmRegistroCliente.reset();
}


// Formulario
function mostrar(campo){
    document.getElementById(campo).style.display = "block";
}
function ocultar(campo){
    document.getElementById(campo).style.display = "none";
}
// Limpiamos todos los Errores
function limpiarErrores() {
    frmAltaIngrediente.txtNombreIngrediente.classList.remove("Error");
    frmAltaIngrediente.txtNombreIngrediente.classList.remove("Error");
    frmAltaIngrediente.txtAlergenoIngrediente.classList.remove("Error");
}
function limpiarCamposPlato(){
    limpiar("txtNombreIngrediente");
    limpiar("txtAlergenoIngrediente");
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
// XML
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

// <<<<<<<------  Metodos meter DATOS ---->>>>>>
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

function verListadoClientes()
{
    var oTabla = document.createElement("table");
    oTabla.border = "1";

    // THEAD
    var oTHead = oTabla.createTHead();
    var oFila = oTHead.insertRow(-1);
    var oCelda = document.createElement("TH");
    oCelda.textContent = "DNI";
    oFila.appendChild(oCelda);

    oCelda = document.createElement("TH");
    oCelda.textContent = "Nombre";
    oFila.appendChild(oCelda);

    oCelda = document.createElement("TH");
    oCelda.textContent = "Email";
    oFila.appendChild(oCelda);

    oCelda = document.createElement("TH");
    oCelda.textContent = "Teléfono";
    oFila.appendChild(oCelda);

    oCelda = document.createElement("TH");
    oCelda.textContent = "Password";
    oFila.appendChild(oCelda);


}
