  /**
  * # Player type implementation of the game stages
  * Copyright(c) 2017 Edgar Andrade-Lotero <edgar.andrade@urosario.edu.co>
  * MIT Licensed
  *
  * Each client type must extend / implement the stages defined in `game.stages`.
  * Upon connection each client is assigned a client type and it is automatically
  * setup with it.
  *
  * http://www.nodegame.org
  * ---
  */

  "use strict";

  var ngc = require('nodegame-client');
  var stepRules = ngc.stepRules;
  var constants = ngc.constants;
  var publishLevels = constants.publishLevels;


  module.exports = function(treatmentName, settings, stager, setup, gameRoom) {

    var game;


    stager.setOnInit(function() {

      // Initialize the client.

      var header, frame;

      // Setup page: header + frame.
      header = W.generateHeader();
      frame = W.generateFrame();

      // Add widgets.
      this.visualRound = node.widgets.append('VisualRound', header);
      this.visualTimer = node.widgets.append('VisualTimer', header);

      // this.doneButton = node.widgets.append('DoneButton', header);

      this.contadorComunicacion = 1;
      this.contadorMensajes = 0;
      var dict = {};
      this.puntajeAcumulado = dict;

      // Additional debug information while developing the game.
      // this.debugInfo = node.widgets.append('DebugInfo', header)
    });

    stager.extendStep('game', {
      frame: 'game3.htm',
      cb: function() {

        //////////////////////////////////////////////////////////////////////////
        //////////////////////////////////////////////////////////////////////////
        //                     AQUI COMIENZA LA ACCION                          //
        /////////////////////////////////////////////////////////////////////////
        /////////////////////////////////////////////////////////////////////////

        node.on.data('Settings', function(msg) {

          console.log('El jugador ', node.player.id,' arranca');

          var MESSAGE = msg.data; //Datos enviados desde logic con informacion para la ronda
          var otroJugador = MESSAGE[0]; //Direccion del otro jugador
          var indicesDesordenados = MESSAGE[1]; //Lista para relacionar nombre de imagen con tipo de objeto
          var tiposObjetos = MESSAGE[2]; //Tipos de objetos de acuerdo al indice
          var srcImagenes = MESSAGE[3]; //Nombres de archivos imagenes a llenar de acuerdo a indice
          var explicacion = MESSAGE[4]; //Datos de la explicacion de experto
          var indicesDesordenadosOtroJugador = MESSAGE[5]; //Lista para relacionar nombre de imagen con tipo de objeto OTRO JUGADOR
          // for (var i = 0; i < indicesDesordenadosOtroJugador.length; i++) {
          //   console.log('Indices desordenados otro jugador', i, indicesDesordenadosOtroJugador[i]);
          // }
          var tiposObjetosOtroJugador = MESSAGE[6]; //Tipos de objetos de acuerdo al indice OTRO JUGADOR
          var srcImagenesOtroJugador = MESSAGE[7]; //Nombres de archivos imagenes a llenar de acuerdo a indice OTRO JUGADOR
          var puntaje = 0; // Variable para el puntaje
          var derPareja = ''; // Argumento derecho de la pareja
          var izqPareja = ''; // Argumento izquierdo de la pareja
          var btn = W.getElementById("myBtn"); // Boton que abre modal
          var btnSalir = W.getElementById("finRonda"); // Boton que abre modal
          // var span1 = W.getElementsByClassName("Enviar"); // Boton en modal de cada objeto para enviar
          var obj1Enviar = W.getElementById('drag1-Enviar'); // Boton en modal de enviar círculo
          // var span2 = W.getElementById('botCuad'); // Boton en modal de enviar cuadrado
          // var span7 = W.getElementById('botTri'); // Boton en modal de enviar triángulo
          var span5 = W.getElementById('botIgn'); //Boton ignorar llamado
          var btnArmarPareja = W.getElementById('botonVerde'); //Boton "ToBasket"
          var span3 = W.getElementById('ARRIBAbutton'); // Boton en modal2 de decir ZAB
          var span4 = W.getElementById('MEDIObutton'); // Boton en modal2 de decir XOL
          var span8 = W.getElementById('ABAJObutton'); // Boton en modal2 de decir DUP
          var span6 = W.getElementById('exitButton'); //Boton de exit del modal
          var countRondas = node.player.stage.round; //Lleva el numero de rondas
          var umbral; //valor del umbral de puntos
          var mensajeEnviar = ['ZAB', 'XOL', 'DUP']; //Lista de posibles mensajes a enviar
          var selectMensajes = W.getElementById('soflow-color'); // La lista de mensajes recibidos
          var toolBox = W.getElementById('toolbox'); // Imagen del toolbox
          var caja = W.getElementById('caja'); // Imagen del toolbox
          var salirBoton1 = W.getElementById('exitButton1'); //Boton de exit del modal
          var salirBoton2 = W.getElementById('exitButton2'); //Boton de exit del modal
          var ronda = node.player.stage.round; //Ronda en curso
          node.game.puntajeAcumulado[ronda] = 0;

          // Initialize the window for the game
          W.getElementById('myModal').style.display = "none";
          W.getElementById('myModal2').style.display = "none";
          node.game.contadorComunicacion = 1;
          node.game.contadorMensajes = 0;
          selectMensajes.options[0].text = "Tiene " + node.game.contadorMensajes + " mensajes";
          // W.setInnerHTML('numMensajes', node.game.contadorMensajes);

          // Limpia la caja de objetos recibidos y asigna objetos a recibir
          var appBanners = W.getElementsByClassName('Recibido');
          for (var i = 0; i < appBanners.length; i ++) {
              appBanners[i].style.display = "none";
            }

          // Pone los objetos propios en el toolBox y en la ventana de responder mensaje
          for (var i = 1; i < 21; i ++) {
              var imagen = 'drag' + i;
              var imagenEnviar = 'drag' + i + '-Enviar';
              var sourceImagen = srcImagenes[indicesDesordenados[i-1]];
              // console.log('Source', i, sourceImagen);
              W.getElementById(imagen).src = sourceImagen;
              W.getElementById(imagenEnviar).src = sourceImagen;
            }

          // Llena la explicación de experto
          W.setInnerHTML('rotuloExperto', explicacion[0]);
          W.setInnerHTML('tipoPoligono', explicacion[1]);
          W.setInnerHTML('colorRayas', explicacion[2]);
          W.setInnerHTML('paridadHorizontales', explicacion[3]);
          W.setInnerHTML('paridadVerticales', explicacion[4]);

          // switch(countRondas){
          //   case 1:
          //   alert("El umbral de esta ronda es de 30 puntos!");
          //   umbral = 30;
          //   break;
          //   case 2:
          //   alert("El umbral de esta ronda es de 35 puntos!");
          //   umbral = 35;
          //   break;
          //   case 3:
          //   alert("El umbral de esta ronda es de 45 puntos!");
          //   umbral = 45;
          //   break;
          //   case 4:
          //   alert("El umbral de esta ronda es de 60 puntos!");
          //   umbral = 60;
          //   break;
          //   case 5:
          //   alert("El umbral de esta ronda es de 80 puntos!");
          //   umbral = 80;
          // }


          //////////////////////////////////////////////////////////////////////////
            //                     BOTONES                                          //
            /////////////////////////////////////////////////////////////////////////

            // When the user clicks the button, ends the round
          btnSalir.onclick = function() {
            var txt;
            var r = confirm("¿Seguro que desea terminar la ronda?");
            if (r == true) {
              node.done()
            }
          }

          // When the user clicks the button, opens TALK TO
          btn.onclick = function() {
              // Cierra las demás ventanas
              W.getElementById('objetosPropios').style.display = 'none'; // Cierra ventana objetos propios
              W.getElementById('objetosRecibidos').style.display = 'none'; // Cierra ventana objetos recibidos
              W.getElementById('myModal').style.display = 'none'; // Cierra ventana de responder

                var x = Math.random();
                if(x < 0.33333){
                  W.setInnerHTML('arriba', 'ZAB');
                  mensajeEnviar[0] = 'ZAB';
                  if(Math.random() < 0.5){
                    W.setInnerHTML('medio', 'XOL');
                    mensajeEnviar[1] = 'XOL';
                    W.setInnerHTML('abajo', 'DUP');
                    mensajeEnviar[2] = 'DUP';
                  }else{
                    W.setInnerHTML('medio', 'DUP');
                    mensajeEnviar[1] = 'DUP';
                    W.setInnerHTML('abajo', 'XOL');
                    mensajeEnviar[2] = 'XOL';
                  }
                }//fin del primer if x <0.33333
                else if(x < 0.66666){
                    W.setInnerHTML('arriba', 'XOL');
                    mensajeEnviar[0] = 'XOL';
                  if(Math.random() < 0.5){
                    W.setInnerHTML('medio', 'DUP');
                    mensajeEnviar[1] = 'DUP';
                    W.setInnerHTML('abajo', 'ZAB');
                    mensajeEnviar[2] = 'ZAB';
                  }else{
                    W.setInnerHTML('medio', 'ZAB');
                    mensajeEnviar[1] = 'ZAB';
                    W.setInnerHTML('abajo', 'DUP');
                    mensajeEnviar[2] = 'DUP';
                  }
                }// primer else if x < 0.66666
                else {
                  W.setInnerHTML('arriba', 'DUP');
                  mensajeEnviar[0] = 'DUP';
                    if(Math.random() < 0.5){
                      W.setInnerHTML('medio', 'ZAB');
                      mensajeEnviar[1] = 'ZAB';
                      W.setInnerHTML('abajo', 'XOL');
                      mensajeEnviar[2] = 'XOL';
                    }else{
                      W.setInnerHTML('medio', 'XOL');
                      mensajeEnviar[1] = 'XOL';
                      W.setInnerHTML('abajo', 'ZAB');
                      mensajeEnviar[2] = 'ZAB';
                    }
                }// fin del else

                W.getElementById('myModal2').style.display = "block";

                node.game.resp = false;
            }

          //When the user clicks the button, close the modal de TALK TO
          span6.onclick = function() {
            W.getElementById('objetosPropios').style.display = 'none'; // Cierra ventana objetos propios
            W.getElementById('objetosRecibidos').style.display = 'none'; // Cierra ventana objetos recibidos
            W.getElementById('myModal').style.display = 'none'; // Abre ventana de responder
            W.getElementById('myModal2').style.display = "";
          }

          //When the user clicks the button, envía "ZAB" al otro jugador
          span3.onclick = function() {
            alert('El mensaje se envió exitosamente!');
            W.getElementById('myModal2').style.display = "";
            node.say('Comunicacion', otroJugador, mensajeEnviar[0]);
            node.set({Comunicacion: ["zab", node.game.contadorComunicacion]})
          }

          //When the user clicks the button, envía "XOL" al otro jugador
          span4.onclick=function(){
            alert('El mensaje se envió exitosamente!');
            W.getElementById('myModal2').style.display="";
            node.say('Comunicacion', otroJugador, mensajeEnviar[1]); // hay que cambiar esto !!!!
            node.set({Comunicacion: ["xol", node.game.contadorComunicacion]})
          }

          //When the user clicks the button, envía "DUP" al otro jugador
          span8.onclick = function() {
            alert('Mensaje enviado exitosamente!');
            W.getElementById('myModal2').style.display = "";
            node.say('Comunicacion', otroJugador, mensajeEnviar[2]);  // hay que cambiar esto !!!!
            node.set({Comunicacion: ["dup", node.game.contadorComunicacion]})
          }

          //When the user clicks the button, ignora al otro jugador
          span5.onclick = function(){
            W.getElementById('myModal').style.display = "";
            node.set({Comunicacion: ['Ignorar', node.game.contadorComunicacion]});
          }

          // Cuando el usuario da click, calcula los puntos
          btnArmarPareja.onclick = function() {
            console.log('izqPareja, derPareja', izqPareja, derPareja);
            //Evalua si alguna de las casillas esta vacía al hacer una pareja
            if((izqPareja=='')||(derPareja=='')){
              alert("Tiene que arrastrar un objeto");
            }
            // La pareja esta completa ...
            else{

              // Borra las imagenes de las parejas
              W.getElementById('dropIzq').src = "";
              W.getElementById('dropIzq').style.display = "none";
              W.getElementById('dropDer').src = "";
              W.getElementById('dropDer').style.display = "none";

              // Obtiene los indices de los objetos
              // console.log('string', izqPareja.substr(4,2).replace('-',''));
              var indiceIzquierdo = Number(izqPareja.substr(4,2).replace('-','')) - 1;
              console.log('indiceIzquierdo', indiceIzquierdo);
              var indiceDerecho = Number(derPareja.substr(4,2).replace('-','')) - 1;
              console.log('indiceDerecho', indiceDerecho);

              // Determina si izqPareja viene de objetosRecibidos
              var inIzq, inDer, tipoObjetoIzquierdo, tipoObjetoDerecho;
              if (izqPareja.indexOf('Recibido') >= 0) {
                console.log('izqPareja viene de objetosRecibidos');
                inIzq = indicesDesordenadosOtroJugador[indiceIzquierdo];
                tipoObjetoIzquierdo = tiposObjetosOtroJugador[inIzq];
              } else {
                console.log('izqPareja viene de objetosPropios');
                inIzq = indicesDesordenados[indiceIzquierdo];
                tipoObjetoIzquierdo = tiposObjetos[inIzq];
              }
              if (derPareja.indexOf('Recibido') >= 0) {
                console.log('derPareja viene de objetosRecibidos');
                inDer = indicesDesordenadosOtroJugador[indiceDerecho];
                tipoObjetoDerecho = tiposObjetosOtroJugador[inDer];
              } else {
                console.log('derPareja viene de objetosPropios');
                inDer = indicesDesordenados[indiceDerecho];
                tipoObjetoDerecho = tiposObjetos[inDer];
              }

              console.log('tipoObjetoIzquierdo', tipoObjetoIzquierdo);
              console.log('tipoObjetoDerecho', tipoObjetoDerecho);

              // Calcula el puntaje
              console.log('Puntaje: ',
                          W.getElementById(izqPareja).src,
                          W.getElementById(derPareja).src);
              console.log('Puntaje: ',
                          tipoObjetoIzquierdo,
                          tipoObjetoDerecho);

              var obtenido=0;
              if(tipoObjetoIzquierdo == 'Xol'){
                if (tipoObjetoDerecho == 'Xol') {
                  obtenido = 1;
                }
                if (tipoObjetoDerecho == 'Dup') {
                  obtenido = 5;
                }
              }
              if(tipoObjetoIzquierdo == 'Dup'){
                if (tipoObjetoDerecho == 'Dup') {
                  obtenido = 1;
                }
                if (tipoObjetoDerecho == 'Xol') {
                  obtenido = 5;
                }
              }
              puntaje += obtenido;
              node.set({Puntaje: [tipoObjetoIzquierdo, tipoObjetoDerecho, obtenido]});

              // Cambia el puntaje
              W.setInnerHTML('Puntaje', puntaje);
              node.game.puntajeAcumulado[ronda] = puntaje;
              console.log('Ronda: ', ronda, puntaje);
              console.log('Por rondas', node.game.puntajeAcumulado);

              //Elimina los elementos de las casillas al oprimir "To basket"
              izqPareja='';
              derPareja='';

            } // Fin else

          } // Cierra boton de armar pareja

          // Cuando da click en el mensaje de la lista desplegable
          // muestra el modal de enviar objeto
          selectMensajes.onchange = function() {
            var indice = this.selectedIndex; // El indice del mensaje seleccionado
            var correo = this.options[indice].value; // Lo que dice el mensaje
            this.remove(this.selectedIndex); // Elimina item de la lista desplegable
            node.game.contadorMensajes -= 1;
            selectMensajes.options[0].text = "Tiene " + node.game.contadorMensajes + " mensajes";
            // W.setInnerHTML('numMensajes', node.game.contadorMensajes); // Actualiza numero de mensajes
            W.getElementById('objetosPropios').style.display = 'none'; // Cierra ventana objetos propios
            W.getElementById('objetosRecibidos').style.display = 'none'; // Cierra ventana objetos recibidos
            W.getElementById('myModal').style.display = 'block'; // Abre ventana de responder
            W.setInnerHTML('Mensaje', correo); // Muestra lo que dice el mensaje
          };

          // Abre la ventana de los objetos propios
          toolBox.onclick = function() {
            W.getElementById('objetosPropios').style.display = 'block';
            W.getElementById('objetosRecibidos').style.display = 'none';
          };

          // Boton de salir de la ventana de objetos propios
          salirBoton1.onclick = function() {
            W.getElementById('objetosPropios').style.display = "none";
          };

          // Abre la ventana de los objetos recibidos
          caja.onclick = function() {
            W.getElementById('objetosRecibidos').style.display = 'block';
            W.getElementById('objetosPropios').style.display = 'none';
          };

          // Boton de salir de la ventana de objetos recibidos
          salirBoton2.onclick = function() {
            W.getElementById('objetosRecibidos').style.display = "none";
          };

          //////////////////////////////////////////////////////////////////////////
          //                     INTERACCIONES                                   //
          /////////////////////////////////////////////////////////////////////////
          node.on.data('Comunicacion', function(msg) {
            // AQUI POPUP DE LE ENVIARON UN MENSAJE
            node.emit('Muestra_Popup');
            W.setInnerHTML('notif', "Tiene un mensaje nuevo!");

            // Agrega el mensaje a la lista
            var opt = document.createElement('option'); // Crea un item nuevo para la lista desplegable
            opt.value = msg.data; // Objeto enviado
            opt.text = "Mensaje " + node.game.contadorComunicacion; // Número de mensaje
            selectMensajes.appendChild(opt); // Introduce nuevo item en la lista desplegable
            node.game.contadorComunicacion += 1;
            node.game.contadorMensajes += 1;
            selectMensajes.options[0].text = "Tiene " + node.game.contadorMensajes + " mensajes";
            // W.setInnerHTML('numMensajes', node.game.contadorMensajes); // Muestra el número de mensajes
            // W.setInnerHTML('numMensajes', 1); // Arreglar el contador
          }); // End node.on.data('Comunicacion'

          node.on.data('Dar', function(msg) {
            console.log('Recibio', msg.data);
            var indice = msg.data.substr(4,2).replace('-','');
            console.log('Indice rótulo', indice);
            indice = indicesDesordenadosOtroJugador[indice - 1];
            console.log('Indice imagen', indice);
            console.log('Indice', srcImagenesOtroJugador[indice]);
            W.getElementById(msg.data).src = srcImagenesOtroJugador[indice];
            W.getElementById(msg.data).style.display = 'block';
            node.emit('Muestra_Popup');
            W.setInnerHTML('notif', "Recibió un objeto!");
            // alert("Recibió un objeto!" + W.getElementById(msg.data).style.display);
          }); // End node.on.data('Dar'

          // Envía objeto al otro jugador
          node.on('Respuesta', function(msg) {

            console.log('Enviar', msg);
            var indice = msg[0].substr(4,2).replace('-','');
            console.log('Enviar', indice);
            console.log('Enviar', srcImagenes[indicesDesordenados[indice - 1]]);

            // Hace que el objeto enviado ya no esté disponible
            W.getElementById(msg[0]).style.display="none";
            W.getElementById(msg[1]).style.display="none";

            node.game.resp = true;
            node.say('Dar', otroJugador, msg[0]+ '-Recibido');
            W.getElementById('myModal').style.display = "none";
            var objetoEnviado = tiposObjetos[msg[0].substring(5,6)];
            node.set({Comunicacion: [objetoEnviado, node.game.contadorComunicacion]});

            alert ("El objeto se envió exitosamente! ");
          }); // End node.on('Respuesta'

          node.on('Arrastrar', function(msg) {
            console.log('Arrastrar', msg);
            if (msg[1] == 'Izquierdo') { // Se arrastra al lado izquierdo
              // Revisa si ya hay un objeto en el lado izquierdo y lo devuelve
              if (izqPareja != '') {
                W.getElementById(izqPareja).style.display = "";
                console.log('Devolviendo el objeto', izqPareja);
              }
              W.getElementById('dropIzq').src = W.getElementById(msg[0]).src;
              W.getElementById('dropIzq').style.display = "";
              W.getElementById(msg[0]).style.display = "none";
              izqPareja = msg[0];
            }
            if (msg[1] == 'Derecho') { // Se arrastra al lado derecho y lo devuelve al toolbox
              // Revisa si ya hay un objeto en el lado izquierdo
              if (derPareja != '') {
                W.getElementById(derPareja).style.display = "";
              }
              W.getElementById('dropDer').src = W.getElementById(msg[0]).src;
              W.getElementById('dropDer').style.display = "";
              W.getElementById(msg[0]).style.display = "none";
              derPareja = msg[0];
            }
          }); // End node.on('Arrastrar')
        }); // End on.data "settings"
      }, // End cb function
    });// End extendstep "game"

    stager.extendStep('puntaje', {
      frame: 'puntaje.htm',
      cb: function(){
        var continuar;
        continuar = W.getElementById('continuar');
        continuar.onclick = function() { node.done(); };
      }
    });

    stager.extendStep('encuesta', {
      frame: 'Encuesta.htm',
      cb: function(){
        var boton1 = W.getElementById('BotContinuar');
        var objeto;
        var datos = [];
        var contador = 0;

        W.getElementById('CheckZab').checked=false;
        W.getElementById('CheckXol').checked=false;
        W.getElementById('CheckDup').checked=false;

        boton1.onclick=function(){
          node.set({Encuesta: [objeto,
                              W.getElementById('CheckZab').checked,
                              W.getElementById('CheckXol').checked,
                              W.getElementById('CheckDup').checked
                            ]});

          W.getElementById('CheckZab').checked=false;
          W.getElementById('CheckXol').checked=false;
          W.getElementById('CheckDup').checked=false;
          //W.getElementById('encuesta').style.display = "";

          var x = Math.floor(Math.random() * 32) + 1;
          W.getElementById("imgvar").src="Images/objeto" + x + ".png";

          contador++;
          W.setInnerHTML('cont', contador+1+' / 9');
          //W.setInnerHTML('Holaaaa');
          if(contador==9){
            W.getElementById('encuesta').style.display = "none";
            node.done();
          }
        }
      }
    }); // End stager encuesta

    stager.extendStep('demograf', {
        init: function() {
            var w;
            w = node.widgets;
            this.demo = w.get('ChoiceManager', {
                id: 'demo',
                title: false,
                shuffleForms: true,
                forms: [
                    w.get('ChoiceTable', {
                        id: 'gender',
                        mainText: '¿Cuál es su género?',
                        choices: [
                            'Masculino',
                            'Femenino',
                            'Otro',
                            'Prefiero no decirlo'
                        ],
                        shuffleChoices: true,
                        title: false,
                        requiredChoice: true
                    }),
                    w.get('ChoiceTable', {
                        id: 'age',
                        mainText: '¿Cuál es su grupo de edad?',
                        choices: [
                            '18-20',
                            '21-30',
                            '31-40',
                            '41-50',
                            '51-60',
                            '61-70',
                            '71+',
                            'Prefiero no decirlo'
                        ],
                        title: false,
                        requiredChoice: true
                    }),
                    // w.get('ChoiceTable', {
                    //     id: 'political_party',
                    //     mainText: 'What is your political party?',
                    //     choices: [
                    //         'Democrat', 'Republican', 'Socialist',
                    //         'Green','Libertarian', 'Independent', 'Do not want to say'
                    //     ],
                    //     title: false,
                    //     requiredChoice: true
                    // }),
                    w.get('ChoiceTable', {
                        id: 'carreer',
                        mainText: '¿Cuál es su área de estudio?',
                        choices: [
                            'Matemáticas y/o Ciencias de la Computación',
                            'Ciencias Naturales',
                            'Ciencias Humanas',
                            'Ciencias Políticas',
                            'Gestión Pública',
                            'Economía y Finanzas',
                            'Jurisprudencia',
                            'Prefiero no decirlo'
                        ],
                        title: false,
                        requiredChoice: true
                    }),
                    // w.get('ChoiceTable', {
                    //     id: 'location',
                    //     mainText: 'What is your location?',
                    //     choices: [
                    //         'US', 'Colombia', 'Other', 'Do not want to say'
                    //     ],
                    //     shuffleChoices: true,
                    //     title: false,
                    //     requiredChoice: true
                    // }),
                    w.get('ChoiceTable', {
                        id: 'strategy',
                        mainText: 'Durante el juego,',
                        choices: [
                            'me concentré en que mi compañero me pasara objetos',
                            'me concentré en armar parejas yo solo',
                            'traté de intercambiar objetos con mi compañero',
                            'Prefiero no decirlo'
                        ],
                        title: false,
                        requiredChoice: true
                      }),
                      w.get('ChoiceTable', {
                          id: 'orientation',
                          mainText: 'Durante el juego intenté',
                          choices: [
                              'maximizar mis puntos',
                              'cooperar con mi compañero',
                              'ambos',
                              'Prefiero no decirlo'
                          ],
                          title: false,
                          requiredChoice: true
                    })
                ]
            });
        },
        frame: 'demograf.html', // must exist, or remove.
        cb: function() {
            var buttonSubmit = W.getElementById('GoToEnd');
            buttonSubmit.onclick = function() {
                node.done();
            }
        },
        done: function() {
            var values, isTimeup;
            values = this.demo.getValues({ highlight: true });
            console.log(values);
            // In case you have a timer running, block done procedure
            // if something is missing in the form and it is not a timeup yet.
            isTimeup = node.game.timer.isTimeup();
            if (values.missValues.length && !isTimeup) return false;
            // Adds it to the done message sent to server.
            return {
                Guesses: [],
                Performance: [],
                Strategy: [],
                valores: values
            };
        }
    });

    stager.extendStep('debrief', {
      frame: 'debrief.htm',
      cb: function() {
        console.log('Debrief');
      }
    });

    stager.extendStep('end', {
      donebutton: false,
      frame: 'end.htm',
      cb: function() {
        node.game.visualTimer.setToZero();
      }
    });

    game = setup;
    game.plot = stager.getState();
    return game;
  };
