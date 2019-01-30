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
    ocultarFormularios();
	mostrar("frmMenu");
	document.querySelector("script+script").setAttribute("src", "js/menu.js");
    frmMenu.reset();
}

function verAltaEvento()
{
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
	document.querySelector("script+script").setAttribute("src", "js/platos.js");
    frmAltaPlato.reset();
}

function verAltaIngredientes()
{
    ocultarFormularios();
	mostrar("frmAltaIngrediente");
	document.querySelector("script+script").setAttribute("src", "js/ingredientes.js");
    frmAltaIngrediente.reset();
}

function verAltaBebidas()
{
    ocultarFormularios();
	mostrar("frmAltaBebida");
	document.querySelector("script+script").setAttribute("src", "js/bebida.js");
    frmAltaBebida.reset();
}

function verContacto()
{
    ocultarFormularios();
    mostrar("divContacto");
    formContacto.reset();
}

function verRegistro()
{
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
/*function limpiarErrores() {
    frmAltaIngrediente.txtNombreIngrediente.classList.remove("Error");
}*/
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

