// Platos
class plato{
	contructor(id,nombre,tipo,precio){
		this.id = id;
		this.nombre = nombre;
		this.tipo = tipo;
		this.precio = precio;
		//this.ingrdientes = new ingrediente();
	}
	toString(){
		return "ID - "+this.id+", Nombre - "+this.nombre+", Tipo - "+this.tipo+", Precio: "+this.precio;
	}
	añadirPlato(){}
}

// Ingredientes
class ingrediente extends plato{
	contructor(nombre,alergenos){
		super(4);
		this.nombre = new Array();
		this.alergenos = new Array();
	}
	toString(){
		var cad = "";
		var cadena = "";
		for (var i = 0; i < this.nombre.length; i++) {
			cadena+=this.nombre[i]+" ";
		}
		for (var i = 0; i < this.alergenos.length; i++) {
			cadena+=this.alergenos[i]+" ";
		}
		return "Ingrdiente "+cad+", Alergenos : "+cadena;
	}
}