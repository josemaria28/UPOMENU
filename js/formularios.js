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
}

function ocultarFormularios()
{
    document.getElementById("frmMenu").style.display="none";
    document.getElementById("frmEvento").style.display="none";
    document.getElementById("frmPlato").style.display="none";
    document.getElementById("frmAltaIngrediente").style.display="none";
    document.getElementById("frmAltaBebida").style.display="none";
    document.getElementById("formContacto").style.display="none";

}

function verAltaMenu()
{
    ocultarFormularios();
    document.getElementById("frmMenu").style.display="block";
    frmMenu.reset();
}

function verAltaEvento()
{
    ocultarFormularios();
    document.getElementById("frmEvento").style.display="block";
    frmEvento.reset();

}

function verAltaPlato()
{
    ocultarFormularios();
    document.getElementById("frmPlato").style.display="block";
    frmAltaPlato.reset();
}

function verAltaIngredientes()
{
    ocultarFormularios();
    document.getElementById("frmAltaIngrediente").style.display="block";
    frmAltaIngrediente.reset();
}

function verAltaBebidas()
{
    ocultarFormularios();
    document.getElementById("frmAltaBebida").style.display="block";
    frmAltaBebida.reset();
}

function verContacto()
{
    ocultarFormularios();
    document.getElementById("formContacto").style.display="none";
    formContacto.reset();


}