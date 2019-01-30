var oUpoMenu = new UpoMenu();

// Añadir Eventos
document.getElementById("btnAñadirPlatos").addEventListener('click',añadirPlato,false);
document.getElementById("btnAñadirIngredientes").addEventListener('click',añadirIngrediente,false);

























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

