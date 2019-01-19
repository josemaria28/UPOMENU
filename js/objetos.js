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
	añadirPlato(oPlato){
		
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