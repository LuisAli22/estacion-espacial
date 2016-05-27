function ControladorDeTeclado(escena) {
  this.comandos={ 38: new AbrirPaneles(escena),
                  40: new CerrarPaneles(escena),
                  79: new GiroTurbinasAntihorario(escena),
                  80: new GiroTurbinasHorario(escena),
                  107: new Acercarse(escena),
                  109: new Alejarse(escena),
                  65: new MoverseHaciaLaIzquierda(escena),
                  68: new MoverseHaciaLaDerecha(escena),
                  83: new MoverseHaciaAtras(escena),
                  87: new MoverseHaciaAdelante(escena)};
	document.onkeydown = this.sePresionaUnaTecla.bind(this);
	document.onkeyup = this.seSueltaUnaTecla.bind(this);
};

ControladorDeTeclado.prototype.sePresionaUnaTecla = function(evento) {
  console.log("Codigo de tecla: ",evento.keyCode);
  var key=evento.keyCode.toString();
  this.comandos[key].indicarQueEstaActualmentePresionada(true);
  this.comandos[key].ejecutar();
};

ControladorDeTeclado.prototype.seSueltaUnaTecla = function(evento) {
  console.log("Codigo de tecla: ",evento.keyCode);
  var key=evento.keyCode.toString();
  this.comandos[key].indicarQueEstaActualmentePresionada(false);
};

ControladorDeTeclado.prototype.manejarTeclas = function() {

  for(var claveComando in this.comandos){
    if (this.comandos[claveComando].estaActualmentePresionada()){
      this.comandos[claveComando].ejecutar();
    }
  }
};
