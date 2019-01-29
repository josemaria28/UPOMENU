window.addEventListener("load",inicioIndex,false);

function inicioIndex()
{
    ocultarFormularios();
    document.getElementById("btnMenu").addEventListener("click",verAltaMenu);
}

function ocultarFormularios()
{
    document.getElementById("frmMenu").style.display="none";
}

function verAltaMenu()
{
    ocultarFormularios();
    document.getElementById("frmMenu").style.display="block";
    frmMenu.reset();
}