window.addEventListener("load",inicioIndex,false);

function inicioIndex()
{
    ocultarFormularios();
    document.getElementById("btnMenu").addEventListener("click",verAltaMenu);
    document.getElementById("btnEventos").addEventListener("click",verAltaEvento);
}

function ocultarFormularios()
{
    document.getElementById("frmMenu").style.display="none";
    document.getElementById("frmEvento").style.display="none";
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