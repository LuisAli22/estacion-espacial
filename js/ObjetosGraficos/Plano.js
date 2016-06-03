Plano.prototype=new ComponenteEstacionEspacial;
Plano.prototype.constructor=Plano;
function Plano(){

  
  ComponenteEstacionEspacial.call(this,2,2,1.0);

  this.inicializarLosBuffer();

}

Plano.prototype.inicializarLosBuffer=function(){

  this.texture_coord_buffer = [];
  this.position_buffer = [0.5,0.5,0.0, 0.5,-0.5,0.0, -0.5,0.5,0.0, -0.5,-0.5,0.0];
  this.normal_buffer = [0.0,0.0,1.0,0.0,0.0,1.0,0.0,0.0,1.0,0.0,0.0,1.0];

  //Cargo las coordenadas de textura
  for (var i = 0.0; i < this.rows; i++){
      for (var j = 0.0; j < this.cols; j++){

          var u = 1.0 - (j / (this.cols-1.0));
          var v = 1.0 - (i / (this.rows-1.0));

          this.texture_coord_buffer.push(u);
          this.texture_coord_buffer.push(v);
          //Defino material 1 --> dorado
          this.texture_coord_buffer.push(this.material);
          this.texture_coord_buffer.push(1.0);
      };

  };

  // Buffer de indices de los triangulos
  this.crearBufferDeIndices();
  this.atarLosBuffer(this.position_buffer,this.normal_buffer,this.texture_coord_buffer,this.index_buffer);

}