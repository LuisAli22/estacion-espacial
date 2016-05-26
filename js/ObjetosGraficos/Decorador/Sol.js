function Sol(esfera,camara){
  this.anguloDeRotacionDelSolespectoALaTierra =0.0;
  this.esfera=esfera;
  this.camara=camara;
  this.vectorDireccionDeLaLuz=[ 0, 0 , 0];
  this.iluminar=true;
  this.matrizDeTraslacionDelSolDesdeElOrigenDeLaTierra=mat4.create();
  this.matrizDeRotacionDelSolRespectoALaTierra=mat4.create();
  this.matrizDeEscaladoDelSol=mat4.create();
}
Sol.prototype.configurarIluminacion=function(){
  var matrizCamara = this.camara.obtenerMatriz();
  gl.uniformMatrix4fv(shaderProgram.ViewMatrixUniform, false, matrizCamara);
  this.vectorDireccionDeLaLuz=[ 0, 0 , 0];
	vec3.transformMat4(this.vectorDireccionDeLaLuz, this.vectorDireccionDeLaLuz, matrizCamara);
  mvPushMatrix();
    mat4.rotate(mvMatrix,mvMatrix,-Math.PI/2.0,[0,1,0]);
    vec3.transformMat4(this.vectorDireccionDeLaLuz, this.vectorDireccionDeLaLuz, mvMatrix);
    mvPopMatrix();
  gl.uniform1i(shaderProgram.useLightingUniform, this.iluminar);
  gl.uniform3fv(shaderProgram.lightingDirectionUniform, this.vectorDireccionDeLaLuz);
}
Sol.prototype.calcularMatrizDeTraslacion=function(){
  mat4.identity(this.matrizDeTraslacionDelSolDesdeElOrigenDeLaTierra);
  mat4.translate(this.matrizDeTraslacionDelSolDesdeElOrigenDeLaTierra, this.matrizDeTraslacionDelSolDesdeElOrigenDeLaTierra, [DISTANCIAXSOL, 0, 0 ]);
}
Sol.prototype.calcularMatrizDeRotacion=function(){
  this.anguloDeRotacionDelSolespectoALaTierra+= 0.0045;
  mat4.identity(this.matrizDeRotacionDelSolRespectoALaTierra);
  mat4.rotate(this.matrizDeRotacionDelSolRespectoALaTierra, this.matrizDeRotacionDelSolRespectoALaTierra, this.anguloDeRotacionDelSolespectoALaTierra, [0, 1, 0]);
}
Sol.prototype.calcularMatrizDeEscalado=function(){
  mat4.identity(this.matrizDeEscaladoDelSol);
  mat4.scale(this.matrizDeEscaladoDelSol, this.matrizDeEscaladoDelSol, [FACTORESCALASOL, FACTORESCALASOL, FACTORESCALASOL]);
}
Sol.prototype.aplicarTransformacionesALaMatrizDeModelado=function(){
  mat4.translate(mvMatrix, mvMatrix, [0, DISTANCIAYTIERRA, 0 ]);
  mat4.multiply(mvMatrix, mvMatrix, this.matrizDeRotacionDelSolRespectoALaTierra);
  mat4.multiply(mvMatrix, mvMatrix, this.matrizDeTraslacionDelSolDesdeElOrigenDeLaTierra);
  mat4.multiply(mvMatrix, mvMatrix,this.matrizDeEscaladoDelSol);
}
Sol.prototype.dibujar = function(){
  gl.uniform3f(shaderProgram.ambientColorUniform, 0.2, 0.2, 0.2 );
  gl.uniform3f(shaderProgram.directionalColorUniform, 0.5, 0.5, 0.5);
  mvPushMatrix();
    this.calcularMatrizDeTraslacion();
    this.calcularMatrizDeRotacion();
    this.calcularMatrizDeEscalado();
    this.aplicarTransformacionesALaMatrizDeModelado();
    this.configurarIluminacion();
    this.esfera.dibujar();
  mvPopMatrix();
}
Sol.prototype.inicializarTextura=function(){
  this.esfera.inicializarTextura();
}
Sol.prototype.generarMipMap=function (){
  this.esfera.generarMipMap
}
