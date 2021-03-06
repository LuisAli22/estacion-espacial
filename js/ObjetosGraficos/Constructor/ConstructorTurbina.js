ConstructorTurbina.prototype=new Constructor;
ConstructorTurbina.prototype.constructor=ConstructorTurbina;
function ConstructorTurbina(){

	Constructor.call(this);
	var puntosDeControl = [ 0.5, -0.875, 0.0, 0.5, -0.875, 0.0, 0.5, -0.875, 0.0, 0.5, -1.0, 0.0,
						    0.5, -1.0, 0.0, 0.5, -1.0, 0.0, 1.0, -1.0, 0.0, 0.25, 1.0, 0.0, 
						    0.25, 1.0, 0.0, 0.25, 1.0, 0.0, 0.25, 0.875, 0.0, 0.25, 0.875, 0.0, 
						    0.25, 0.875, 0.0];
	this.componente = new Turbina(puntosDeControl);

}

ConstructorTurbina.prototype.definirMaterial=function(){

	var material = new Material(this.componente.rows,this.componente.cols);
	material.cargarAmbiente(vec3.fromValues(0.19225,0.19225,0.19225));
	material.cargarDifusa(vec3.fromValues(0.50754,0.50754,0.50754));
	material.sinTextura(GRIS);
	material.cargarCoordenadasDeTextura();	

	Constructor.prototype.definirMaterial.call(this,material);



}