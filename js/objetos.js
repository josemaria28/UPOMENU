// Objetos
function upoMenu(){
	this.platos = new Array();
	this.ingredientes = new Array();
}
// Platos
class plato{
	contructor(id,nombre,tipo,precio){
		this.id = id;
		this.nombre = nombre;
		this.tipo = tipo;
		this.precio = precio;
		this.ingrdientes = new Array();
	}
}

// Ingredientes
class ingrediente extends plato{
	contructor(nombre,alergenos){
		super(4);
		this.nombre = new Array();
		this.alergenos = new Array();
	}
	
}



// Funciones y Operaciones

UpoMenu.prototype.añadirPlato = function(oPlato){
	var pAñadido = false;
	if(this._buscaPlato(oPlato.nombre) == null){
		this.platos.push(oPlato);
		pAñadido = true;
	}
	return pAñadido;
};

UpoMenu.prototype._buscarPlato = function(oPlato){
	var bPlato = null;
	for (var i = 0; i < this.platos.length && bPlato == null; i++) {
		if (this.platos[i].nombre == oPlato) {
		bPlato = this.platos[i];
		}
	}
	return bPlato;
};