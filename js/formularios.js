var oUpoMenu = new UpoMenu();
window.addEventListener("load",inicioIndex,false);

var oXML = loadXMLDoc("XML/ingredientes.xml");
var oXMLmenu = loadXMLDoc("XML/menu.xml");

//Variables Globales

var formulario = document.getElementById("frmRegistroCliente");
var formIS = document.getElementById("formularioIS");

//Datos iniciales de 1 cliente 
datosIniciales();
function datosIniciales(){
    oUpoMenu.altaCliente(new Cliente("josemaria",619938534,"jose@gmail.com","12345678A","Jose@1234567890"));
    //oUpoMenu.mostrarClientes();
}

//Manejadores de eventos 
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
    document.getElementById("btnListadoMenus").addEventListener("click",verListadoMenus);
    var botonesCarrusel = document.getElementsByClassName("btnCarrusel");
    //Lo que llega de botonesCarrusel es un array de elementos, asi que lo recorremos y le asignamos la misma función, que es 
    //lo que buscamos
    for(var i=0;i<botonesCarrusel.length;i++)
    {
        botonesCarrusel[i].addEventListener("click",verListadoPlatos);
    }
    // Formulario Platos
    document.getElementById("btnAñadirPlatos").addEventListener("click",añadirPlato, false);
    document.getElementById("btnAñadirIngredientes").addEventListener("click",añadirIngrediente, false);

    //Listados
    document.getElementById("btnListadoPlatos").addEventListener("click",verListadoPlatos, false);
    document.getElementById("btnListadoClientes").addEventListener("click",verListadoClientes);
    document.getElementById("btnListadoMenus").addEventListener("click",verListadoMenus);

    cargarIngredientes();
    oUpoMenu.mostrarClientes();
    oUpoMenu.mostrarPlatos();
    oUpoMenu.mostrarIngredientes();
	cargaComboPlatos();
	datosPrueba();	
    
    // Formulario Cliente

    //Registrar cliente
    document.getElementById("btnRegistro").addEventListener("click",validarCliente);
    //Función para que el número de telefono sean sólo números, no permite borrar
    formulario.txtTlf.addEventListener('keypress', (event) => {
        const e = event;
      
           if (isNaN(parseFloat(e.key))){
               e.returnValue = false;
                e.preventDefault();
              }
      });
    //Iniciar sesión (tiene que estar registrado previamente);
    formIS.IS.addEventListener("click",iniciarSesion);

    //Formulario de contacto
    //Valida que todos los campos estén rellenos antes de enviar el formulario
    document.getElementById("btnContact").addEventListener("click",enviarMensaje);
    document.formContacto.txtTelefono.addEventListener('keypress', (event) => {
        const e = event;
      
           if (isNaN(parseFloat(e.key))){
               e.returnValue = false;
                e.preventDefault();
              }
	  });
	  
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
	borrarMenus();
}

function verAltaMenu()
{
    ocultar("listaClientes");
    ocultar("listaMenus");
    ocultar("listaPlatos");
    ocultar("carrusel");
    ocultarFormularios();
	mostrar("frmMenu");
	//	document.querySelector("script+script").setAttribute("src", "js/menu.js");
    frmMenu.reset();
	actualizarDesplegableMenu();
	inicializarEventosMenu();
	mostrarMenus();
}

function verAltaEvento()
{
    ocultar("listaClientes");
    ocultar("listaMenus");
    ocultar("listaPlatos");
    ocultar("carrusel");
    ocultarFormularios();
	mostrar("frmEvento");
	frmEvento.reset();
	inicializarEventosEvento();
	actualizarDesplegableEvento();

}

function verAltaPlato()
{
    ocultar("listaClientes");
    ocultar("listaMenus");
    ocultar("listaPlatos");
    ocultar("carrusel");
    ocultarFormularios();
	mostrar("frmPlato");
    //cargaComboPlatos();
    cargarElementos("txtIngredientePlato", oUpoMenu.dameIngredientes());
	//document.querySelector("script+script").setAttribute("src", "js/platos.js");
    //frmPlato.reset();
}

function verAltaIngredientes()
{
    ocultar("listaClientes");
    ocultar("listaMenus");
    ocultar("listaPlatos");
    ocultar("carrusel");
    ocultarFormularios();
	mostrar("frmAltaIngrediente");
	//document.querySelector("script+script").setAttribute("src", "js/ingredientes.js");
    //frmAltaIngrediente.reset();
}

function verAltaBebidas()
{
    ocultar("listaClientes");
    ocultar("listaMenus");
    ocultar("listaPlatos");
    ocultar("carrusel");
    ocultarFormularios();
	mostrar("frmAltaBebida");
//	document.querySelector("script+script").setAttribute("src", "js/bebida.js");
	frmAltaBebida.reset();
	frmAltaBebida.btnAñadirBebida.addEventListener("click", validarFormularioBebidas);
}

function verContacto()
{
    ocultar("listaClientes");
    ocultar("listaMenus");
    ocultar("listaPlatos");
    ocultar("carrusel");
    ocultarFormularios();
    mostrar("divContacto");
    formContacto.reset();
}

function verRegistro()
{
    ocultar("listaClientes");
    ocultar("listaMenus");
    ocultar("listaPlatos");
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
// Cargamos el select Multiple
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

    if (!bValido) {
        alert(sError);
    } else {
        
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
        frmPlato.reset();
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
            frmAltaIngrediente.reset();
            limpiarCamposPlato();
        }else {
            alert("Ese ingrediente ya existe.");
        }
    }
    oUpoMenu.mostrarIngredientes();
}

// Listado Platos
function verListadoPlatos(){
    borrarEncabezados();
    borrarTablas();
    mostrar("listaPlatos");
    ocultar("carrusel");
    ocultar("listaClientes");
    ocultar("listaMenus");
    ocultarFormularios();
    borrarEncabezados();
    
    var divListado = document.getElementById("listaPlatos");
    divListado.className="container";
    var encabezado = document.createElement("h2");
    encabezado.setAttribute("id", "encabezadoH2");
    encabezado.style.textAlign="center";
    encabezado.style.color=" rgba(151, 5, 5, 0.986)";
    var tituloEncabezado = document.createTextNode("Listado de Platos de UpoMenu");
    encabezado.appendChild(tituloEncabezado);
    var oTabla = document.createElement("table");
    //oTabla.border = "1";
    //oTabla.style.width = '50%';
    oTabla.style.textAlign="center";
    oTabla.className="table table-hover";

    // THEAD
    var oTHead = oTabla.createTHead();
    var oFila = oTHead.insertRow(-1);
    var oCelda = document.createElement("TH");
    oCelda.textContent = "ID";
    oFila.appendChild(oCelda);

    oCelda = document.createElement("TH");
    oCelda.textContent = "Nombre";
    oFila.appendChild(oCelda);

    oCelda = document.createElement("TH");
    oCelda.textContent = "Tipo";
    oFila.appendChild(oCelda);

    oCelda = document.createElement("TH");
    oCelda.textContent = "Precio";
    oFila.appendChild(oCelda);


    var oTBody = document.createElement("TBODY");
    oTabla.appendChild(oTBody);

    oFila = oTBody.insertRow(-1);
    oCelda = oFila.insertCell(-1);

    var listaPlatos = oUpoMenu.platos;
    for(var i=0;i<listaPlatos.length;i++)
    {
        oCelda.textContent = listaPlatos[i].id;
        oCelda = oFila.insertCell(-1);
        oCelda.textContent = listaPlatos[i].nombre;
        oCelda = oFila.insertCell(-1);
        oCelda.textContent = listaPlatos[i].tipo;
        oCelda = oFila.insertCell(-1);
        oCelda.textContent = listaPlatos[i].precio+"€";
        oFila = oTBody.insertRow(-1);
        oCelda = oFila.insertCell(-1);
    }
    divListado.appendChild(encabezado);
    divListado.appendChild(oTabla);


    //console.log(document.getElementById("encabezadoH2").remove())
}





function verListadoClientes()
{
    mostrar("listaClientes");
    ocultar("carrusel");
    ocultar("listaPlatos");
    ocultarFormularios();
    borrarEncabezados();
    borrarTablas();

    var divListado = document.getElementById("listaClientes");
    divListado.className="container";
    var encabezado = document.createElement("h2");
    encabezado.style.textAlign="center";
    encabezado.style.color=" rgba(151, 5, 5, 0.986)";
    var tituloEncabezado = document.createTextNode("Listado de Clientes de UpoMenu");
    encabezado.appendChild(tituloEncabezado);
    var oTabla = document.createElement("table");
    //oTabla.border = "1";
    oTabla.className="table table-hover";

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

    var listaClientes = oUpoMenu.listaClientes;
    for(var i=0;i<listaClientes.length;i++)
    {
        oCelda.textContent = listaClientes[i].dni;
        oCelda = oFila.insertCell(-1);
        oCelda.textContent = listaClientes[i].nombre;
        oCelda = oFila.insertCell(-1);
        oCelda.textContent = listaClientes[i].email;
        oCelda = oFila.insertCell(-1);
        oCelda.textContent = listaClientes[i].telefono;
        oCelda = oFila.insertCell(-1);
        oCelda.textContent = listaClientes[i].password;
        oFila = oTBody.insertRow(-1);
        oCelda = oFila.insertCell(-1);
    }
    divListado.appendChild(encabezado);
    divListado.appendChild(oTabla);
}


function borrarEncabezados()
{
    var encabezados = document.querySelectorAll("h2");
    if(encabezados!=null)
    {
        for(var i=0;i<encabezados.length;i++)
        {
            encabezados[i].remove();
        }
    }
}
function borrarTablas()
{
    var tablaClientes = document.querySelectorAll("table");
    if(tablaClientes!=null)
    {
        for(var i=0;i<tablaClientes.length;i++)
        {
            tablaClientes[i].remove();
        }
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
        formulario.reset();
        document.querySelector("#dropdownMenu1").remove();
        document.querySelector("#liReg").remove();
        var bienvenida = document.createElement("h3");
        bienvenida.style.color="rgba(151, 5, 5, 0.986)";
        bienvenida.style.textAlign="center";
        var textoBienvenida = document.createTextNode("Hola, usuario"); //Intentad poner en vez de usuario, el nombre de la persona 
                                                                               //que inicia sesión
        bienvenida.appendChild(textoBienvenida);
        var ubicacion = document.getElementById("collapsibleNavbar");
        ubicacion.appendChild(bienvenida);

        
    }
    else
    {
        alert("Credenciales incorrectas");
        formularioIS.reset();
    }


}

//Validación de mensaje de contacto
function enviarMensaje(oEvento)
		{
			//Antes de enviar el mensaje validamos que se hayan rellenado todos los campos correctamente,
			//no tendrán expresiones regulares ya que puede ser libre el texto a escribir
			var nombreContacto = formContacto.txtNombre.value.trim();
			var emailContacto = formContacto.txtEmail.value.trim();
			var telefonoContacto = formContacto.txtTelefono.value.trim();
			var mensajeContacto = formContacto.txtMsg.value.trim();
			var bRelleno = true;
			var sMensaje = "";
			var oE = oEvento || window.event;
			
			limpiarCampos();
			

			if(nombreContacto == "")
			{
				bRelleno = false;
				formContacto.txtNombre.focus();
				formContacto.txtNombre.classList.add("error");
				
			}

			if(emailContacto == "")
			{
				bRelleno = false;
				formContacto.txtEmail.focus();
				formContacto.txtEmail.classList.add("error");
			}

			if(telefonoContacto == "")
			{
				bRelleno = false;
				formContacto.txtTelefono.focus();
				formContacto.txtTelefono.classList.add("error");
			}
			
			if(mensajeContacto == "")
			{
				bRelleno = false;
				formContacto.txtMsg.focus();
				formContacto.txtMsg.classList.add("error");
			}

			if(bRelleno == false)
			{
				alert("Debe rellenar todos los campos");
			}
			else
			{
				alert("Gracias por contactar con nosotros");
				formContacto.reset();
			}
        }
        //Limpia los campos del formulario de contacto
        function limpiarCampos()
		{
			formContacto.txtNombre.classList.remove("error");
			formContacto.txtTelefono.classList.remove("error");
			formContacto.txtEmail.classList.remove("error");
			formContacto.txtMsg.classList.remove("error");
		}



function verListadoMenus() {
	mostrar("listaMenus");
	ocultar("carrusel");
	ocultar("listaPlatos");
	ocultarFormularios();
	borrarEncabezados();
	borrarTablas();

	var divListado = document.getElementById("listaMenus");
	divListado.className="container";
	var encabezado = document.createElement("h2");
	encabezado.style.textAlign="center";
	encabezado.style.color=" rgba(151, 5, 5, 0.986)";
	var tituloEncabezado = document.createTextNode("Listado de Menus de UpoMenu");
	encabezado.appendChild(tituloEncabezado);
	var oTabla = document.createElement("table");
	//oTabla.border = "1";
	oTabla.className="table table-hover";

	// THEAD
	var oTHead = oTabla.createTHead();
	var oFila = oTHead.insertRow(-1);
	var oCelda = document.createElement("TH");

	oCelda = document.createElement("TH");
	oCelda.textContent = "Nombre";
	oFila.appendChild(oCelda);

	oCelda = document.createElement("TH");
	oCelda.textContent = "Precio";
	oFila.appendChild(oCelda);

	oCelda = document.createElement("TH");
	oCelda.textContent = "Primer plato";
	oFila.appendChild(oCelda);

	oCelda = document.createElement("TH");
	oCelda.textContent = "Segundo plato";
	oFila.appendChild(oCelda);
	
	oCelda = document.createElement("TH");
	oCelda.textContent = "Postre";
	oFila.appendChild(oCelda);
	
	oCelda = document.createElement("TH");
	oCelda.textContent = "Bebida";
	oFila.appendChild(oCelda);

	var oTBody = document.createElement("TBODY");
	oTabla.appendChild(oTBody);

	oFila = oTBody.insertRow(-1);
	oCelda = oFila.insertCell(-1);

	var listaMenus = oUpoMenu.menus;
	for (var i = 0; i < listaMenus.length; i++) {
		oCelda.textContent = listaMenus[i].nombre;
		oCelda = oFila.insertCell(-1);
		oCelda.textContent = listaMenus[i].precio;
		oCelda = oFila.insertCell(-1);
		oCelda.textContent = oUpoMenu._buscarPlato(listaMenus[i].primerPlato).nombre;
		oCelda = oFila.insertCell(-1);
		oCelda.textContent = oUpoMenu._buscarPlato(listaMenus[i].segundoPlato).nombre;
		oCelda = oFila.insertCell(-1);
		oCelda.textContent = oUpoMenu._buscarPlato(listaMenus[i].postre).nombre;
		oCelda = oFila.insertCell(-1);
		oCelda.textContent = oUpoMenu._buscarBebida(listaMenus[i].bebida.textContent.trim()).nombre;
		oCelda = oFila.insertCell(-1);
		oFila = oTBody.insertRow(-1);
		oCelda = oFila.insertCell(-1);
	}
	divListado.appendChild(encabezado);
	divListado.appendChild(oTabla);
}

// -------------------------------------
// ------------ CODIGO MENU ------------
// -------------------------------------
/*
window.addEventListener("load", inicio);

function inicio() {
	datosPrueba();
	actualizarDesplegableMenu();
	inicializarEventosMenu();
	mostrarMenus();
}
*/
function inicializarEventosMenu() {
	document.querySelector("#btnAceptarMenu").addEventListener("click", validarFormularioMenu);
	var desplegables = document.querySelectorAll("select");
	
	for (let i = 0; i < desplegables.length; i++) {
		desplegables[i].addEventListener("change", actualizarPrecioMenu);
	}
}

function validarFormularioMenu() {
	limpiarErrores();
	var valido = true;
	var error;

	var nombre = document.querySelector("#txtNombreMenu").value.trim();
	var exReg = /^[a-zA-ZÁÉÍÓÚñáéíóúÑ0-9 ]{6,30}$/;

	if (!exReg.test(nombre)) {
		valido = false;

		document.querySelector("#txtNombreMenu").classList.add("is-invalid");
		error = "El nombre debe contener caracteres alfanumérico de entre 6 y 30 caracteres";
	}
	else {
		document.querySelector("#txtNombreMenu").classList.add("is-valid");
	}

	if (!valido) {
		document.querySelector(".is-invalid").focus();
		mostrarMensajeErrorMenu(error);
	}
	else {
//		var menu = new Menu(nombre, precio, pPlato, sPlato, postre, bebida);
		agregarSpinnerMenu();
		setTimeout(function () {
			var pPlato = document.querySelector("#txtPrimerPlato").value;
			var sPlato = document.querySelector("#txtSegundoPlato").value;
			var postre = document.querySelector("#txtPostre").value;
			var precio = document.querySelector("#txtTotal").value;
			var bebida = document.querySelector("#txtBebidas").value;

			if (oUpoMenu.agregarMenu(new Menu(nombre, precio, pPlato, sPlato, postre, bebida))) {
				alert("Menu agregado");
				mostrarMenus();
			}
			else {
				alert("Menu duplicado");
			}
		}, 3000);
		
	}
}

function borrarMenus() {
	var capa = document.querySelector(".card-deck");
	if (capa != null) {
		capa.remove();
	}
}

function mostrarMenus() {
	borrarMenus();
/*	var menus = oXMLmenu.querySelectorAll("menu");
	var nMenus = oXMLmenu.querySelectorAll("menu").length;
	var nFilas = nMenus / 3;
	var container = document.querySelector(".menus");
	
	nFilas = Math.ceil(nFilas);
	
	var j = 0;
	var contador = 0;
	for (var i = 0; i < nFilas; i++) {
		var fila = document.createElement("div");
		fila.classList.add("card-deck");
		
		while (contador < 3 && menus[j] != undefined) {
			var card = document.createElement("div");
			card.classList.add("card");
			var img = document.createElement("img");
			img.classList.add("card-img-top");
			img.setAttribute("src", "img/menu3.jpg");
			
			var div = document.createElement("div");
			div.classList.add("card-img-overlay");
			
			var pPlato = oUpoMenu._buscarPlato(menus[j].querySelector("primerPlato").textContent).nombre;
			var pPrimerPlato = document.createElement("p");
			pPrimerPlato.classList.add("card-text", "color-menu");
			pPrimerPlato.textContent = "Primer plato: "+pPlato;
			
			var sPlato = oUpoMenu._buscarPlato(menus[j].querySelector("segundoPlato").textContent).nombre;
			var pSegundoPlato = document.createElement("p");
			pSegundoPlato.classList.add("card-text", "color-menu");
			pSegundoPlato.textContent = "Segundo plato: "+sPlato;
			
			var postre = oUpoMenu._buscarPlato(menus[j].querySelector("postre").textContent).nombre;
			var pPostre = document.createElement("p");
			pPostre.classList.add("card-text", "color-menu");
			pPostre.textContent = "Postre plato: "+postre;
			
			var bebida = menus[j].querySelector("bebidaMenu").textContent;
			var pBebida = document.createElement("p");
			pBebida.classList.add("card-text", "color-menu");
			pBebida.textContent = "Bebida: "+bebida;
			
			var precio = menus[j].querySelector("precio").textContent;
			var pPrecio = document.createElement("p");
			pPrecio.classList.add("card-text", "color-menu");
			pPrecio.textContent = "Precio: "+precio+" €";
			
			var titulo = document.createElement("h4");
			titulo.classList.add("card-title", "color-menu");
			titulo.textContent = menus[j].querySelector("nombre").textContent;
			
			div.appendChild(titulo);
			div.appendChild(pPrimerPlato);
			div.appendChild(pSegundoPlato);
			div.appendChild(pPostre);
			div.appendChild(pBebida);
			div.appendChild(pPrecio);
			card.appendChild(img);
			card.appendChild(div);
			fila.appendChild(card);
			j++;
			contador++;
		}
		contador = 0;
		container.appendChild(fila);
	}
*/
	cargarDatosModelo();
}

function cargarDatosModelo() {

	var menus = oUpoMenu.menus;
	var nMenus = 3;
	var nFilas = nMenus / 3;
	var container = document.querySelector(".menus");
	
	nFilas = Math.ceil(nFilas);
	
	var j = 0;
	var contador = 0;
	for (var i = 0; i < nFilas; i++) {
//		var fila;
//		fila = document.querySelector("div.card-deck");

//		if (fila == undefined || fila == null || nMenus == 3) {
			var fila = document.createElement("div");
			fila.classList.add("card-deck");
//		}

		while (contador < 3 && menus[j] != undefined) {
			var card = document.createElement("div");
			card.classList.add("card");
			var img = document.createElement("img");
			img.classList.add("card-img-top");
			img.setAttribute("src", "img/menu3.jpg");
			
			var div = document.createElement("div");
			div.classList.add("card-img-overlay");
			
			var pPlato = oUpoMenu._buscarPlato(menus[j].primerPlato);
			var pPrimerPlato = document.createElement("p");
			pPrimerPlato.classList.add("card-text", "color-menu");
			pPrimerPlato.textContent = "Primer plato: "+pPlato.nombre;
			
			var sPlato = oUpoMenu._buscarPlato(menus[j].segundoPlato);
			var pSegundoPlato = document.createElement("p");
			pSegundoPlato.classList.add("card-text", "color-menu");
			pSegundoPlato.textContent = "Segundo plato: "+sPlato.nombre;
			
			var postre = oUpoMenu._buscarPlato(menus[j].postre);
			var pPostre = document.createElement("p");
			pPostre.classList.add("card-text", "color-menu");
			pPostre.textContent = "Postre plato: "+postre.nombre;

			var bebida = menus[j].bebida;
			var pBebida = document.createElement("p");
			pBebida.classList.add("card-text", "color-menu");
			pBebida.textContent = "Bebida: "+bebida;
			
			var precio = menus[j].precio;
			var pPrecio = document.createElement("p");
			pPrecio.classList.add("card-text", "color-menu");
			pPrecio.textContent = "Precio: "+precio+" €";
			
			var titulo = document.createElement("h4");
			titulo.classList.add("card-title", "color-menu");
			titulo.textContent = menus[j].nombre;
			
			div.appendChild(titulo);
			div.appendChild(pPrimerPlato);
			div.appendChild(pSegundoPlato);
			div.appendChild(pPostre);
			div.appendChild(pBebida);
			div.appendChild(pPrecio);
			card.appendChild(img);
			card.appendChild(div);
			fila.appendChild(card);
			j++;
			contador++;
		}
		contador = 0;
		container.appendChild(fila);
	}
}

function limpiarErrores() {
	var error = document.querySelector(".is-invalid");
	if (error != null) {
		error.classList.remove("is-invalid");
	}

	error = document.querySelector(".texto-error");
	if (error != null) {
		error.remove();
	}
}

function limpiarCampos() {
	var boton = document.querySelector("#btnAceptarMenu");
	boton.textContent = "Aceptar";

	document.querySelector("#txtNombreMenu").classList.remove("is-valid");
	document.querySelector("#txtNombreMenu").value = "";

	mostrarMenus();
}

function agregarSpinnerMenu() {
	var boton = document.querySelector("#btnAceptarMenu");
	boton.textContent = "Guardando... ";
	var span = document.createElement("span");
	span.classList.add("spinner-border", "spinner-border-sm");
	boton.appendChild(span);
	setTimeout(limpiarCampos, 3000);
}

function mostrarMensajeErrorMenu(error) {
	var desplegable = document.querySelector(".is-invalid");

	var div = document.createElement("div");
	div.classList.add("texto-error");
	div.textContent = error;

	desplegable.parentElement.appendChild(div);
}

function borrarDesplegablesMenus() {
	var select = document.querySelector("#txtPrimerPlato");

	for (var i = select.options.length - 1; i >= 0; i--) {
		select.remove(i);
	}
	
	select = document.querySelector("#txtSegundoPlato");

	for (var i = select.options.length - 1; i >= 0; i--) {
		select.remove(i);
	}

	select = document.querySelector("#txtPostre");

	for (var i = select.options.length - 1; i >= 0; i--) {
		select.remove(i);
	}

	select = document.querySelector("#txtBebidas");	

	for (var i = select.options.length - 1; i >= 0; i--) {
		select.remove(i);
	}
	
}

// Actualiza los options del select
function actualizarDesplegableMenu() {
	borrarDesplegablesMenus();
	var primerPlato = document.querySelector("#txtPrimerPlato");
	var platos = oUpoMenu.platos;

	for (var i = 0; i < platos.length; i++) {
		var option = document.createElement("option");
		option.text = platos[i].nombre;
		option.value = platos[i].id;
		option.dataset.precio = platos[i].precio.toFixed(2);

		primerPlato.appendChild(option);
	}

	var segundoPlato = document.querySelector("#txtSegundoPlato");

	for (var i = 0; i < platos.length; i++) {
		option = document.createElement("option");
		option.text = platos[i].nombre;
		option.value = platos[i].id;
		option.dataset.precio = platos[i].precio.toFixed(2);

		segundoPlato.appendChild(option);
	}

	var postre = document.querySelector("#txtPostre");

	for (var i = 0; i < platos.length; i++) {
		option = document.createElement("option");
		option.text = platos[i].nombre;
		option.value = platos[i].id;
		option.dataset.precio = platos[i].precio.toFixed(2);

		postre.appendChild(option);
	}

	var bebidas = document.querySelector("#txtBebidas");
	var listaBebidas = oUpoMenu.bebidas;

	for (var i = 0; i < listaBebidas.length; i++) {
		option = document.createElement("option");
		option.text = listaBebidas[i].nombre;
		option.value = listaBebidas[i].nombre;
		option.dataset.precio = listaBebidas[i].precio.toFixed(2);

		bebidas.appendChild(option);
	}

	actualizarPrecioMenu();
}

// Actualiza el input type="text" con el precio del plato cuando cambia el option
function actualizarPrecioMenu() {
	var desplegables = document.querySelectorAll("select.frm-menu");

	
	var precioTotal = 0;
	borrarPrecioMenu();

	for (var i = 0; i < desplegables.length; i++) {
		var precio = desplegables[i].selectedOptions[0].dataset.precio;
		mostrarPrecioMenu(desplegables[i]);

		precioTotal += parseFloat(precio);
	}

	var total = document.querySelector("#txtTotal");
	total.value = precioTotal.toFixed(2) + " €";
}

// Agrega un input type="text" con el precio del plato
function mostrarPrecioMenu(elemento) {
	var div = document.createElement("div");
	div.classList.add("input-group-append", "capa-precio");
	var input = document.createElement("spam");
	input.classList.add("input-group-text");
//	input.type = "text";
//	input.disabled = true;
	input.textContent = elemento.selectedOptions[0].dataset.precio + " €";
	input.classList.add("text-center")
	div.appendChild(input);
	elemento.after(div);
	var padre = elemento.parentElement;
	padre.classList.add("input-group");
}

// Borra el input type="text" que contiene el precio del plato
function borrarPrecioMenu() {
	var capas = document.querySelectorAll(".capa-precio");

	if (capas.length > 0) {
		for (var i = 0; i < capas.length; i++) {
			capas[i].remove();
		}
	}
}

// Da formato de float a un numero
function numeroComa(numero) {
	numero.toString();
	numero = numero.replace(",", ".");
	return parseFloat(numero);
}

function datosPrueba() {
	var platos = oXMLmenu.querySelectorAll("plato");

	for (var i = 0; i < platos.length; i++) {
		var id = platos[i].querySelector("id").textContent;
		var nombre = platos[i].querySelector("nombre").textContent;
		var tipo = platos[i].querySelector("tipo").textContent;
		var precio = numeroComa(platos[i].querySelector("precio").textContent);
		var ingredientes = platos[i].querySelectorAll("ingrediente");
		var arrayIngredientes = new Array();

		for (var j = 0; j < ingredientes.length; j++) {
			var nombresIngredientes = ingredientes[j].querySelectorAll("nombre");

			for (var s = 0; s < nombresIngredientes.length; s++) {
				arrayIngredientes.push(nombresIngredientes[s].textContent);
			}
		}
		oUpoMenu.añadirPlato(new Plato(id, nombre, tipo, precio));
		oUpoMenu.añadirIngredientesPlato(arrayIngredientes, id);
	}

	var bebidas = oXMLmenu.querySelectorAll("bebida");

	for (var j = 0; j < bebidas.length; j++) {
		var nombreBebida = bebidas[j].querySelector("nombre").textContent;
		var precioBebida = numeroComa(bebidas[j].querySelector("precio").textContent);
		var alcoholico = bebidas[j].querySelector("alcoholico").textContent;
		var azucarado = bebidas[j].querySelector("azucarado").textContent;
		var gaseoso = bebidas[j].querySelector("gaseoso").textContent;

		var bebida = new Bebida(nombreBebida, precioBebida, "si" == alcoholico, "si" == gaseoso, "si" == azucarado);
		oUpoMenu.agregarBebida(bebida);
	}

	var menus = oXMLmenu.querySelectorAll("menu");

	for (var i = 0; i < menus.length; i++) {
		var nombre = menus[i].querySelector("nombre").textContent;
		var precio = numeroComa(menus[i].querySelector("precio").textContent);
		var pPlato = menus[i].querySelector("primerPlato").textContent;
		var sPlato = menus[i].querySelector("segundoPlato").textContent;
		var postre = menus[i].querySelector("postre").textContent;
		var nombreBebida = menus[i].querySelector("bebidaMenu");
		var menu = new Menu(nombre, precio, pPlato, sPlato, postre, nombreBebida);

		oUpoMenu.agregarMenu(menu);
	}
}


// --------------------------------------
// ----------- ALTA EVENTO --------------
// --------------------------------------

function validarFormularioEvento() {
	limpiarErroresEvento();

	var valido = true;
	var error = new Array();

	var nombre = document.querySelector("#txtNombreEvento").value.trim();
	var exReg = /^[a-zA-ZÁÉÍÓÚñáéíóúÑ0-9 ]{6,50}$/;

	if (exReg.test(nombre) == false) {
		valido = false;

		document.querySelector("#txtNombreEvento").classList.add("is-invalid");
		error.push("El nombre debe contener caracteres alfanumérico de entre 6 y 50 caracteres");
	}
	else {
		document.querySelector("#txtNombreEvento").classList.add("is-valid");
	}

	var fecha = document.querySelector("#txtFecha").value;
//	exreg = /^[0-9]{4}([\-/.])(0?[1-9]|1[1-2])([\-/.])(3[01]|[12][0-9]|0?[1-9])$/;

	if (fecha == "") {
		valido = false;

		document.querySelector("#txtFecha").classList.add("is-invalid");
		
		error.push("Debe seleccionar una fecha");
	}
	else {
		document.querySelector("#txtFecha").classList.add("is-valid");
	}

	var comensales = document.querySelector("#txtComensales").value.trim();
	exReg = /^[0-9]{1,3}$/;

	if (!exReg.test(comensales)) {
		valido = false;

		document.querySelector("#txtComensales").classList.add("is-invalid");
		error.push("Comensales debe ser un número");
	}
	else {
		document.querySelector("#txtComensales").classList.add("is-valid");
	}

	var duracion = document.querySelector("#txtDuracion").value.trim();
	exReg = /(\W|^)([mM]añana|[tT]arde|[nN]oche)(\W|$)/;

	if (!exReg.test(duracion)) {
		valido = false;

		document.querySelector("#txtDuracion").classList.add("is-invalid");
		error.push("Debe escribir Mañana, Tarde o Noche");
	}
	else {
		document.querySelector("#txtDuracion").classList.add("is-valid");
	}

	if (!valido) {
		document.querySelector(".is-invalid").focus();
		mostrarMensajeErrorEvento(error);
	}
	else {
		agregarSpinnerEvento();
		setTimeout(function () {
			var menu = oUpoMenu._buscarMenu(document.querySelector("#txtMenu").value);

			var evento = new Evento(nombre, fecha, comensales, duracion, menu);
			oUpoMenu.agregarEvento(evento);

			if (oUpoMenu.agregarEvento(new Evento(nombre, fecha, comensales, duracion, menu))) {
				alert("Evento agregado");
				mostrarMenus();
			}
			else {
				alert("Evento duplicado");
			}

		}, 3000);
	}
}

function agregarSpinnerEvento() {
	var boton = document.querySelector("#btnAceptarEvento");
	boton.textContent = "Guardando... ";
	var span = document.createElement("span");
	span.classList.add("spinner-border", "spinner-border-sm");
	boton.appendChild(span);
	setTimeout(limpiarCamposEvento, 3000);
}

function limpiarCamposEvento() {
	frmEvento.reset();
}

function mostrarMensajeErrorEvento(error) {
	var desplegable = document.querySelectorAll(".is-invalid");

	for (var i = 0; i < desplegable.length; i++) {
		var div = document.createElement("div");
		div.classList.add("texto-error");
		div.textContent = error[i];

		desplegable[i].parentElement.appendChild(div);
	}
}

function limpiarErroresEvento() {
	var errores = document.querySelectorAll(".is-invalid");

	for (var i = 0; i < errores.length; i++) {
		errores[i].classList.remove("is-invalid");
	}

	errores = document.querySelectorAll(".texto-error");

	for (var i = 0; i < errores.length; i++) {
		errores[i].remove();
	}
}

function borrarDesplegableEvento() {
	var select = document.querySelector("#txtMenu");

	for (var i = select.options.length - 1; i >= 0; i--) {
		select.remove(i);
	}
	
}

function borrarDesplegableEvento() {
	var select = document.querySelector("#txtMenu");

	for (var i = select.options.length - 1; i >= 0; i--) {
		select.remove(i);
	}
}

function actualizarDesplegableEvento() {
	borrarDesplegableEvento();
	var menu = document.querySelector("#txtMenu");
	var menus = oUpoMenu.menus;

	for (var i = 0; i < menus.length; i++) {
		var option = document.createElement("option");
		option.text = menus[i].nombre;
		option.value = menus[i].nombre;
		option.dataset.precio = menus[i].precio;

		menu.appendChild(option);
	}

	actualizarPrecioEvento();
}

function actualizarPrecioEvento() {
	var desplegable = document.querySelector("#txtMenu");

	borrarPrecioEvento();
	mostrarPrecioEvento();
}

function mostrarPrecioEvento() {
	var desplegable = document.querySelector("#txtMenu");
	var div = document.createElement("div");
	div.classList.add("input-group-append", "capa-precio-evento");
	var input = document.createElement("spam");
	input.classList.add("input-group-text");
	input.textContent = desplegable.selectedOptions[0].dataset.precio + " €";
	input.classList.add("text-center")
	div.appendChild(input);
	desplegable.after(div);
	var padre = desplegable.parentElement;
	padre.classList.add("input-group");
}

function borrarPrecioEvento() {
	var capa = document.querySelector(".capa-precio-evento");
	if (capa != null) {
		capa.remove();
	}
}

function inicializarEventosEvento() {
	document.querySelector("#btnAceptarEvento").addEventListener("click", validarFormularioEvento);
	document.querySelector("#btnIncremento").addEventListener("click", actualizaValor);
	document.querySelector("#btnDecremento").addEventListener("click", actualizaValor);
	document.querySelector("select").addEventListener("change", actualizarPrecioEvento);
}

// Actualiza el valor de los comensales
function actualizaValor(e) {

	var comensales = document.querySelector("#txtComensales");
	var valor = parseInt(comensales.value);

	if (valor >= 0) {
		if (e.target.id == "btnIncremento") {
			valor++;

			comensales.value = valor;
		}
		else if (valor > 0) {
			valor--;

			comensales.value = valor;
		}
	}
}

// de formato de float a numero
function numeroComa(numero) {
	numero.toString();
	numero = numero.replace(",", ".");
	return parseFloat(numero);
}



// ----------------------------------------
// ------------ ALTA BEBIDAS --------------
// ----------------------------------------

function validarFormularioBebidas() {
	limpiarErroresBebidas();
	
	var valido = true;
	var error = new Array();

	var nombre = frmAltaBebida.txtNombre.value.trim();
	var exReg = /^[a-zA-ZÁÉÍÓÚñáéíóúÑ0-9 ]{6,50}$/;

	if (exReg.test(nombre)) {
		frmAltaBebida.txtNombre.classList.add("is-valid");
	}
	else {
		valido = false;
		frmAltaBebida.txtNombre.classList.add("is-invalid");
		mostrarMensajeErrorBebidas(frmAltaBebida.txtNombre, "El nombre debe contener caracteres alfanumérico de entre 6 y 50 caracteres");
	}
	
	var precio = frmAltaBebida.txtPrecio.value.trim();
	exReg = /^(\d)?(\d|,)*\.?\d+$/;

	if (exReg.test(precio)) {
		frmAltaBebida.txtPrecio.classList.add("is-valid");
	}
	else {
		valido = false;
		frmAltaBebida.txtPrecio.classList.add("is-invalid");
		mostrarMensajeErrorBebidas(frmAltaBebida.txtPrecio, "El precio debe tener el formato correcto");
	}

	var alcoholico = frmAltaBebida.alcoholico.value.trim();

	if (frmAltaBebida.alcoholico.item(0).checked || frmAltaBebida.alcoholico.item(1).checked) {
		var elementos = document.querySelectorAll("[name=alcoholico]");

		for (var i = 0; i < elementos.length; i++) {
			elementos[i].classList.add("is-valid");
		}
	}
	else {
		valido = false;
		var elementos = document.querySelectorAll("[name=alcoholico]");

		for (var i = 0; i < elementos.length; i++) {
			elementos[i].classList.add("is-invalid");
		}

		mostrarMensajeErrorBebidas(frmAltaBebida.alcoholicoSi, "Debe indicar si es una bebida alcoholica");
	}

	var gaseoso = frmAltaBebida.gaseoso.value.trim();

	if (frmAltaBebida.gaseoso.item(0).checked || frmAltaBebida.gaseoso.item(1).checked) {
		var elementos = document.querySelectorAll("[name=gaseoso]");

		for (var i = 0; i < elementos.length; i++) {
			elementos[i].classList.add("is-valid");
		}
	}
	else {
		valido = false;
		var elementos = document.querySelectorAll("[name=gaseoso]");

		for (var i = 0; i < elementos.length; i++) {
			elementos[i].classList.add("is-invalid");
		}

		mostrarMensajeErrorBebidas(frmAltaBebida.gaseosoSi, "Debe indicar si es una bebida gaseosa");
	}

	var azucarado = frmAltaBebida.azucarado.value.trim();

	if (frmAltaBebida.azucarado.item(0).checked || frmAltaBebida.azucarado.item(1).checked) {
		var elementos = document.querySelectorAll("[name=azucarado]");

		for (var i = 0; i < elementos.length; i++) {
			elementos[i].classList.add("is-valid");
		}
	}
	else {
		valido = false;
		var elementos = document.querySelectorAll("[name=azucarado]");

		for (var i = 0; i < elementos.length; i++) {
			elementos[i].classList.add("is-invalid");
		}

		mostrarMensajeErrorBebidas(frmAltaBebida.azucaradoSi, "Debe indicar si es una bebida azucarada");
	}

	if (valido) {
		var bebida;
		if (bebida = new Bebida(nombre, precio, alcoholico == "si", gaseoso == "si", azucarado == "si")) {
			oUpoMenu.agregarBebida(bebida);
			alert("Bebida agregada");
			limpiarCamposBebida();
		}
		else {
			alert("Bebida duplicada");
		}

	}
}

function limpiarCamposBebida() {
	var nombre = document.querySelector("#txtNombre");
	nombre.classList.remove("is-valid");
	nombre.value = "";
	
	var precio = document.querySelector("#txtPrecio");
	precio.classList.remove("is-valid");
	precio.value = "";

	var alcoholico = document.querySelectorAll("[name=alcoholico]");
	alcoholico[0].classList.remove("is-valid");
	alcoholico[1].classList.remove("is-valid");

	var gaseoso = document.querySelectorAll("[name=gaseoso]");
	gaseoso[0].classList.remove("is-valid");
	gaseoso[1].classList.remove("is-valid");

	var azucarado = document.querySelectorAll("[name=azucarado]");
	azucarado[0].classList.remove("is-valid");
	azucarado[1].classList.remove("is-valid");
}

function limpiarErroresBebidas() {
	var errores = document.querySelectorAll(".is-invalid");

	for (var i = 0; i < errores.length; i++) {
		errores[i].classList.remove("is-invalid");
	}

	errores = document.querySelectorAll(".texto-error");

	for (var i = 0; i < errores.length; i++) {
		errores[i].remove();
	}
}

function mostrarMensajeErrorBebidas(elemento, error) {
	var div = document.createElement("div");
	div.classList.add("texto-error");
	div.textContent = error;

	elemento.parentElement.parentElement.appendChild(div);
}