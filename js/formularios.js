window.addEventListener("load",inicioIndex,false);
var oUpoMenu = new UpoMenu();

var formulario = document.getElementById("frmRegistroCliente");
var formIS = document.getElementById("formularioIS");
datosIniciales();
function datosIniciales(){
    oUpoMenu.altaCliente(new Cliente("josemaria",619938534,"jose@gmail.com","12345678A","Jose@1234567890"));
    oUpoMenu.mostrarClientes();
}


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

    //Registrar cliente
    formulario.btnRegistro.addEventListener("click",validarCliente);
    //Función para que el número de telefono sean sólo números
    formulario.txtTlf.addEventListener("keypress",solonumeros,false);
    //Iniciar sesión (tiene que estar registrado previamente);
    formularioIS.IS.addEventListener("click",iniciarSesion);
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
    var divListado = document.getElementById("listaClientes");
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

    var oTBody = document.createElement("TBODY");
    oTabla.appendChild(oTBody);

    oFila = oTBody.insertRow(-1);
    oCelda = oFila.insertCell(-1);

    var oUpoMenu = new UpoMenu();
    var listaClientes = oUpoMenu.listaClientes;
    for(var i=0;i<listaClientes.length;i++)
    {
        oCelda.textContent = listaClientes[i].dni;
    }
    
    divListado.appendChild(oTabla);


}

function solonumeros(e){
	var key = window.event ? e.which : e.keyCode;
	if (key < 48 || key > 57) {
  		e.preventDefault();
	}
}

function limpiarErrores()
{
    formulario.txtDNI.classList.remove("error");
    formulario.txtNuevoNombre.classList.remove("error");
    formulario.txtApellidos.classList.remove("error");
    formulario.txtTlf.classList.remove("error");
    formulario.txtEmail.classList.remove("error");
    formulario.txtPassword.classList.remove("error");
}

function validarCliente(oEvento)
{
	//Primero antes de incluirlo en la lista de cliente debemos verificar el formulario de registro...
    
    var oE = oEvento || window.event;
	var bValido = true;
	var sError = "";

	
	limpiarErrores();
    solonumeros(oE);
    
    //Validar DNI

    var dni = formulario.txtDNI.value.trim();
    var oExpReg = /^[0-9]{8}[TRWAGMYFPDXBNJZSQVHLCKE]$/;

    if(oExpReg.test(dni)==false)
    {
        bValido = false;
        formulario.txtDNI.classList.add("error");
		formulario.txtDNI.focus();
		sError+= "\n- El DNI debe tener 8 letras y 1 número";
    }

    //Validar Nombre

    var nombre = formulario.txtNuevoNombre.value.trim();
    oExpReg = /^[a-zA-Z\s]{3,15}$/;

	if(oExpReg.test(nombre)== false)
	{
		bValido = false;

		formulario.txtNuevoNombre.classList.add("error");
		formulario.txtNuevoNombre.focus();
        sError+= "\n- El nombre debe tener entre 3 y 15 caracteres";
    }

    //Validar Apellidos

    var apellidos = formulario.txtApellidos.value.trim();
    oExpReg = /^([a-zA-Zñáéíóú]{3,40})$/;

    if(oExpReg.test(apellidos)==false)
    {
        bValido = false;

        formulario.txtApellidos.classList.add("error");
        formulario.txtApellidos.focus();
        sError+= "\n- El/los apellido/s deben tener mínimo 3 caracteres";
    }
    //Validar nº de teléfono 

    var nTelefono = formulario.txtTlf.value.trim();
    oExpReg = /^[\d]{3}[-]*([\d]{2}[-]*){2}[\d]{2}$/;

    if(oExpReg.test(nTelefono)==false)
    {
        bValido = false;

        formulario.txtTlf.classList.add("error");
        formulario.txtTlf.focus();
        sError+= "\n- El número de teléfono debe tener 9 cifras";
    }

    //Validar correo electrónico

    var correo = formulario.txtEmail.value.trim();
    oExpReg = /[\w]+@{1}[\w]+\.[a-z]{2,3}$/;

    if(oExpReg.test(correo)==false)
    {
        bValido = false;

        formulario.txtEmail.classList.add("error");
        formulario.txtEmail.focus();
        sError+= "\n- El formato de correo electrónico no es válido";
    }

    //Validar contraseña
    var clave = formulario.txtPassword.value.trim();
    var clave2 = formulario.txtPassword2.value.trim();
	oExpReg = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[$@$!%*?&])[A-Za-z\d$@$!%*?&]{8,15}$/;

	if(oExpReg.test(clave) == false)
	{
		if(bValido == true)
		{
			bValido = false;
			formulario.txtPassword.focus();
		}
		formulario.txtPassword.classList.add("error");
        sError+= "\n-La contraseña debe contener alguna letra minúscula ,mayúscula,  número, un caracter especial (@,#,$)";
        sError+= "\n tener entre 8 y 15 caracteres y no puede admitir espacios en blanco";
    }
    //comprobamos que las dos claves son iguales
	if(clave !== clave2)
	{
		bValido = false;
		formulario.txtPassword2.classList.add("error");
		sError+= "\n-Las dos contraseñas deben coincidir";
    }
    //Si hay algún error, lo mostramos para que sea corregido
    if(bValido == false)
    {
        alert(sError);
    }
    //si no hay errores, creamos un cliente con los parámetros establecidos en el constructor,
    //lo añadimos a la lista y reseteamos el formulario
    else
    {
        var oCliente = new Cliente(nombre,nTelefono,correo,dni,clave);
        var bInsertado = oUpoMenu.altaCliente(oCliente);
        if(bInsertado)
        {
            alert("Has sido registrado correctamente");
            oUpoMenu.mostrarClientes();
            formulario.reset();
        }
        else
        {
            alert("No ha podido registrarse. Lo sentimos \n Revise todos los campos de nuevo");
        }
        
    }

}

function iniciarSesion()
{
    var correoIntroducido = formularioIS.emailInput.value.trim();
    var passIntroducido = formularioIS.passwordInput.value.trim();
    var bAcceso = false;

    bAcceso = oUpoMenu.validarCredenciales(correoIntroducido,passIntroducido);

    if(bAcceso == true)
    {
        alert("Bienvenido");
        document.querySelector("#L1").remove;
        
    }
    else
    {
        alert("Credenciales incorrectas");
        formularioIS.reset();
    }


}



