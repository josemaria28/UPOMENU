window.addEventListener("load",inicio,false);
var oUpoMenu = new UpoMenu();

var formulario = document.getElementById("frmRegistroCliente");

function inicio()
{
    //Registrar cliente
    formulario.btnRegistro.addEventListener("click",validarCliente);
    //Función para que el número de telefono sean sólo números
    formulario.txtTlf.addEventListener("keypress",solonumeros,false);
}

function solonumeros(e){
	var key = window.event ? e.which : e.keyCode;
	if (key < 48 || key > 57) {
  		e.preventDefault();
	}
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
	if(clave !== clave2)
	{
		bValido = false;
		formulario.txtPassword2.classList.add("error");
		sError+= "\n-Las dos contraseñas deben coincidir";
    }
    
    if(bValido == false)
    {
        alert(sError);
    }
    else
    {
        registrarCliente();
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

function registrarCliente()
{
    var oCliente = new oCliente(oEvento.nombre,oEvento.apellidos,oEvento.correo,oEvento.dni);
    oUpoMenu.altaCliente(oCliente);
    alert("Has sido registrado correctamente");

}