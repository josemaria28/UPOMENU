//Clase principal del proyecto
class UpoMenu{
    constructor()
    {
        this.listaClientes = [];
    }
    // Añadir un plato
	añadirPlato(oPlato){
	var pAñadido = false;
	if(this._buscaPlato(oPlato.nombre) == null){
		this.platos.push(oPlato);
		pAñadido = true;
	}
	return pAñadido;
	}

	// Buscar platos
	buscarPlato(oPlato){
	var bPlato = null;
	for (var i = 0; i < this.platos.length && bPlato == null; i++) {
		if (this.platos[i].nombre == oPlato) {
		bPlato = this.platos[i];
		}
	}
	return bPlato;
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
		this.ingrdientes = new Array();
	}
}

// Ingredientes
class Ingrediente extends Plato{
	constructor(iId,sNombre,sTipo,fPrecio,sNombreIngrediente,sAlergenos){
		super(iId,sNombre,sTipo,fPrecio);
		this.nombre = sNombreIngrediente;
		this.alergenos = new Array();
	}
	
}
