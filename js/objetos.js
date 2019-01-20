// Objetos
function UpoMenu(){
	this.platos = new Array();
	this.ingredientes = new Array();
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



// Funciones y Operaciones

// Añadir un plato
UpoMenu.prototype.añadirPlato = function(oPlato){
	var pAñadido = false;
	if(this._buscaPlato(oPlato.nombre) == null){
		this.platos.push(oPlato);
		pAñadido = true;
	}
	return pAñadido;
};

// Buscar platos
UpoMenu.prototype._buscarPlato = function(oPlato){
	var bPlato = null;
	for (var i = 0; i < this.platos.length && bPlato == null; i++) {
		if (this.platos[i].nombre == oPlato) {
		bPlato = this.platos[i];
		}
	}
	return bPlato;
};

