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
    document.getElementById("frmMenu").style.display="none";
    document.getElementById("frmEvento").style.display="none";
    document.getElementById("frmPlato").style.display="none";
    document.getElementById("frmAltaIngrediente").style.display="none";
    document.getElementById("frmAltaBebida").style.display="none";
    document.getElementById("divContacto").style.display="none";
    document.getElementById("divRegistro").style.display="none";

}

function verAltaMenu()
{
    ocultarFormularios();
	document.getElementById("frmMenu").style.display="block";
	document.querySelector("script+script").setAttribute("src", "js/menu.js");
    frmMenu.reset();
}

function verAltaEvento()
{
    ocultarFormularios();
	document.getElementById("frmEvento").style.display="block";
	document.querySelector("script+script").setAttribute("src", "js/evento.js");
    frmEvento.reset();

}

function verAltaPlato()
{
    ocultarFormularios();
	document.getElementById("frmPlato").style.display="block";
	document.querySelector("script+script").setAttribute("src", "js/platos.js");
    frmAltaPlato.reset();
}

function verAltaIngredientes()
{
    ocultarFormularios();
	document.getElementById("frmAltaIngrediente").style.display="block";
	document.querySelector("script+script").setAttribute("src", "js/ingredientes.js");
    frmAltaIngrediente.reset();
}

function verAltaBebidas()
{
    ocultarFormularios();
	document.getElementById("frmAltaBebida").style.display="block";
	document.querySelector("script+script").setAttribute("src", "js/bebida.js");
    frmAltaBebida.reset();
}

function verContacto()
{
    ocultarFormularios();
    document.getElementById("divContacto").style.display="block";
    formContacto.reset();
}

function verRegistro()
{
    ocultarFormularios();
    document.getElementById("divRegistro").style.display="block";
    frmRegistroCliente.reset();
}