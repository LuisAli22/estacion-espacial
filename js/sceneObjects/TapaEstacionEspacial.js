TapaEstacionEspacial.prototype=new DrawObject;
TapaEstacionEspacial.prototype.constructor=TapaEstacionEspacial;

//bufferExterior y bufferInterior deben tener la misma cantidad de puntos
function TapaEstacionEspacial(_bufferExterior,_bufferInterior){

	this.bufferExterior = _bufferExterior;
	this.bufferInterior = _bufferInterior;

	const FILAS = 2;

    //Llamo a la clase padre
//    DrawObject.call(this);
    //Seteo las dimensiones de la grilla
//    DrawObject.call(this.setDimensions(FILAS,COLUMNASESTACIONESPACIAL));
this.setDimensions(FILAS,COLUMNASESTACIONESPACIAL);
    this.initBuffers = function(){

        this.texture_coord_buffer = [];
        this.normal_buffer = [];



        this.position_buffer = [];

        this.position_buffer = this.position_buffer.concat(this.bufferExterior);
        this.position_buffer = this.position_buffer.concat(this.bufferInterior);

        //Calculo el vector normal a las tapas
        var pos1 = vec3.fromValues(this.bufferExterior[0],this.bufferExterior[1],this.bufferExterior[2]);
        var pos2 = vec3.fromValues(this.bufferInterior[0],this.bufferInterior[1],this.bufferInterior[2]);

        var vectorNormal = vec3.create();
        vec3.cross(vectorNormal,pos1,pos2);
        vec3.normalize(vectorNormal,vectorNormal);

        //Cargo las coordenadas de textura
        for (var i = 0.0; i < this.rows; i++){
            for (var j = 0.0; j < this.cols; j++){

                var u = 1.0 - (j / (this.cols-1.0));
                var v = 1.0 - (i / (this.rows-1.0));

                this.texture_coord_buffer.push(u);
                this.texture_coord_buffer.push(v);
                //Defino material --> color dorado
                this.texture_coord_buffer.push(DORADO);
                this.texture_coord_buffer.push(0);

                this.normal_buffer.push(-1.0*vectorNormal[0]);
                this.normal_buffer.push(-1.0*vectorNormal[1]);
                this.normal_buffer.push(-1.0*vectorNormal[2]);

            };

        };

        // Buffer de indices de los triangulos
        this.createIndexBuffer();
				this.bindBuffers(this.position_buffer,this.normal_buffer,this.texture_coord_buffer,this.index_buffer);

    }
		this.initBuffers();
}

//inheritPrototype(TapaEstacionEspacial, DrawObject);
