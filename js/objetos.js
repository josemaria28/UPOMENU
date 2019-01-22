//Clase principal del proyecto
class UpoMenu{
    constructor()
    {
        this.listaClientes = new Array();
        this.platos = new Array();
        this.ingredientes = new Array();
    }
    mostrar(){ // Platos
        for (var i = 0; i < this.platos.length; i++) {
            console.log(this.platos[i]);
        }
    }
    // Añadir un plato
	añadirPlato(oPlato){
    	var pAñadido = false;
    	if(this._buscarPlato(oPlato.nombre) == null){
    		this.platos.push(oPlato);
    		pAñadido = true;
    	}
    	return pAñadido;
	}
	// Buscar platos
	_buscarPlato(oPlatoNombre){
    	var bPlato = null;
    	for (var i = 0; i < this.platos.length && bPlato == null; i++) {
    		if (this.platos[i] == oPlatoNombre) {
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
    altaCliente(oCliente)
    {
        var bInsertado = false;

        if(this._buscarCliente(oCliente.dni)==null)
        {
            this.listaClientes.push(oCliente);
            bInsertado = true;
        }
        return bInsertado;
    }
}

//Cliente, necesita nombre,teléfono,email y un número identificador(suponemos que es el dni)
class Cliente{
    constructor(sNombre,iTelefono,sEmail,sDni)
    {
        this.nombre = sNombre;
        this.telefono = parseInt(iTelefono);
        this.email = sEmail;
        this.dni = sDni;
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
class Ingrediente extends Plato{
	constructor(iId,sNombre,sTipo,fPrecio,sNombreIngrediente){
		super(iId,sNombre,sTipo,fPrecio);
		this.nombre = sNombreIngrediente;
		this.alergenos = new Array();
	}
	
}

// Menu
class Menu {
	constructor(nombre, precio) {
		this.precio = precio;
		this.nombre = nombre;
		this.listaPlatos = new Array();
		this.listaBebidas = new Array();
	}

	altaPlato(plato) {
		this.listaPlatos.push(plato);
	}
	
	altaBebida(bebida) {
		this.listaPlatos.push(bebida);
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
	constructor(nombre, fecha, lugar, numComensales, numEmpleados, duracion) {
		this.nombre = nombre;
		this.fecha = fecha;
		this.lugar = lugar;
		this.numComensales = numComensales;
		this.numEmpleados = numEmpleados;
		this.duracion = duracion;
	}
}
