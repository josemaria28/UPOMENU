//Clase principal del proyecto
class UpoMenu{
    constructor()
    {
        this.listaClientes = new Array();
        this.platos = new Array();
		this.ingredientes = new Array();
		this.bebidas = new Array();
		this.eventos = new Array();
		this.menus = new Array();
    }
    mostrarClientes(){ // Platos
        console.log(".......Clientes........");
        for (var i = 0; i < this.listaClientes.length; i++) {
            console.log(this.listaClientes[i]);
        }
        
    }
    mostrarPlatos(){ // Platos
        console.log(".......Platos........");
        for (var i = 0; i < this.platos.length; i++) {
            console.log(this.platos[i]);
        }
        
    }
    mostrarIngredientes(){
        console.log(".......Ingredientes.........");
        for (var i = 0; i < this.ingredientes.length; i++) {
            console.log(this.ingredientes[i]);
        }
    }
    // Añadir un plato
	añadirPlato(oPlato){
    	var pAñadido = false;
    	if(this._buscarPlato(oPlato.id) == null){
    		this.platos.push(oPlato);
    		pAñadido = true;
    	}
    	return pAñadido;
	}
    // Añadir Ingredientes al Plato
    añadirIngredientesPlato(arrayIngredientesPlato, sId){
        // Mete tabla ingredientes ingrdiente[]
        for (var i = 0; i < this.platos.length; i++) {
            if (this.platos[i].id == sId){
                this.platos[i].ingredientes = arrayIngredientesPlato;
            }
        }
    }
    // Añadir Ingredientes al Plato
    añadirIngredientesAlergeno(sTablaAlergeno, sIngrediente){
        for (var i = 0; i < this.ingredientes.length; i++) {
            if (this.ingredientes[i].nombre == sIngrediente){
                /*for (var j = 0; j < this.ingredientes[i].alergenos.length; j++) {
                    this.ingredientes[i].alergenos.push(sTablaAlergeno[j]);
                }*/
                this.ingredientes[i].alergenos = sTablaAlergeno;
            }
        }
    }
    /*
        if (!this.ingredientes[i].nombre.includes(sIngrediente)){
                if (this.ingredientes[i].nombre == sIngrediente) {
                    for (var j = 0; j < this.ingredientes[i].alergenos.length; j++) {
                        this.ingredientes[i].alergenos.push(sTablaAlergeno[j]);
                    }
                }
            }else {
                this.ingredientes[i].alergenos = sTablaAlergeno;
            }
    */
	// Buscar platos
	_buscarPlato(oPlatoNombre){
    	var bPlato = null;
    	for (var i = 0; i < this.platos.length && bPlato == null; i++) {
    		if (this.platos[i].id == oPlatoNombre) {
    		  bPlato = this.platos[i];
    		}
    	}
    	return bPlato;
	}
    // Añadir Ingrediente
    añadirIngrediente(oIngrediente){
        var iAñadido = false;
        if(this._buscarIngrediente(oIngrediente.nombre) == null){
            this.ingredientes.push(oIngrediente);
            iAñadido = true;
        }
        return iAñadido;
    }
    // Buscar ingrediente
    _buscarIngrediente(oIngrediente){
        var bIngrediente = null;
        for (var i = 0; i < this.ingredientes.length && bIngrediente == null; i++) {
            if (this.ingredientes[i].nombre == oIngrediente) {
                bIngrediente = this.ingredientes[i];
            }
        }

        return bIngrediente;
    }
    // Buscar alergeno
    _buscarAlergeno(oIngrediente){
        var bAlergeno = null;
        for (var i = 0; i < this.ingredientes.alergenos.length && alergeno == null; i++) {
            if (this.ingredientes.alergenos[i] == oIngrediente) {
                alergeno = this.ingredientes.alergenos[i];
            }
        }

        return bAlergeno;
    }
    _buscarCliente(sDni)
    {
        var oCliente = null;
        var i=0;
        while(i<this.listaClientes.length && oCliente == null)
        {
            if(this.listaClientes[i].dni == sDni)
            {
                oCliente = this.listaClientes[i].dni;
            }
            i++;
        }
        return oCliente;
	}
	
	validarCredenciales(correo,contraseña)
	{
		var bAcceso = false;

		for(var i=0;i<this.listaClientes.length;i++)
		{
			if(correo == this.listaClientes[i].email && contraseña == this.listaClientes[i].password)
			{
				bAcceso = true;
<<<<<<< HEAD
<<<<<<< HEAD
				//sessionStorage.setItem("usuarioActivo",this.listaClientes[i].email,this.listaClientes[i].password);
=======
				sessionStorage.setItem("usuarioActivo",this.listaClientes[i].email,this.listaClientes[i].password);
>>>>>>> 7cd1a9b6c46739e8572cc846629b67a11c3415c6
=======
				sessionStorage.setItem("usuarioActivo",this.listaClientes[i].email,this.listaClientes[i].password);
>>>>>>> 7cd1a9b6c46739e8572cc846629b67a11c3415c6
			}
		}
		return bAcceso;
	}

    altaCliente(oCliente)
    {
        var bInsertado = false;

        if(!this._buscarCliente(oCliente.dni))
        {
            this.listaClientes.push(oCliente);
            bInsertado = true;
        }
        return bInsertado;
	}
	// Añadir una bebida
	agregarBebida(bebida) {
    	if(!this._buscarBebida(bebida.nombre)){
    		this.bebidas.push(bebida);
    		return true;
    	}
    	return false;
	}
	// Buscar bebidas
	_buscarBebida(nombre) {
    	for (var i = 0; i < this.bebidas.length; i++) {
    		if (this.bebidas[i].nombre == nombre) {
				return this.bebidas[i];
    		}
    	}
    	return false;
	}
	// Añadir un evento
	agregarEvento(evento) {
		if (!this._buscarEvento(evento.nombre)) {
			this.eventos.push(evento);
			return true;
		}
		return false;
	}
	// Buscar un evento
	_buscarEvento(nombre) {
		for (var i = 0; i < this.eventos.length; i++) {
			if (nombre == this.eventos[i].nombre) {
				return true;
			}
		}
		return false;
	}
	agregarMenu(menu) {
		if (!this._buscarMenu(menu.nombre)) {
			this.menus.push(menu);
			return true;
		}
		return false;
	}
	// Buscar un menu
	_buscarMenu(nombre) {
		for (var i = 0; i < this.menus.length; i++) {
			if (nombre == this.menus[i].nombre) {
				return true;
			}
		}
		return false;
	}
}

//Cliente, necesita nombre,teléfono,email y un número identificador(suponemos que es el dni), y una contraseña para entrar en el sistema
class Cliente{
    constructor(sNombre,iTelefono,sEmail,sDni,sPassword)
    {
        this.nombre = sNombre;
        this.telefono = parseInt(iTelefono);
        this.email = sEmail;
		this.dni = sDni;
		this.password = sPassword;
    }
}

// Platos
class Plato{
	constructor(iId,sNombre,sTipo,fPrecio){
		this.id = iId;
		this.nombre = sNombre;
		this.tipo = sTipo;
		this.precio = parseFloat(fPrecio);
		this.ingredientes = new Array();
	}
}

// Ingredientes
class Ingrediente {
	constructor(sNombreIngrediente){
		this.nombre = sNombreIngrediente;
		this.alergenos = new Array();
	}
	
}

// Menu
class Menu {
	constructor(nombre, precio, primerPlato, segundoPlato, postre) {
		this.precio = precio;
		this.nombre = nombre;
		this.primerPlato = primerPlato;
		this.segundoPlato = segundoPlato;
		this.postre = postre;
		this.listaBebidas = new Array();
	}

	altaBebida(bebida) {
		this.listaBebidas.push(bebida);
	}
}

// Bebidas
class Bebida {
	constructor(nombre, precio, alcoholico, gaseoso, azucarado) {
		this.nombre = nombre;
		this.precio = precio;
		this.alcoholico = alcoholico;
		this.gaseoso = gaseoso;
		this.azucarado = azucarado;
	}
}

// Evento
class Evento {
	constructor(nombre, fecha, numComensales, duracion, menu) {
		this.nombre = nombre;
		this.fecha = fecha;
		this.numComensales = numComensales;
		this.duracion = duracion;
		this.menu = menu;
	}
}
