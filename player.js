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

        // // Bid is valid if it is a number between 0 and 100.
        // this.isValidBid = function(n) {
        //     return node.JSUS.isInt(n, -1, 101);
        // };
        //
        // this.randomOffer = function(offer, submitOffer) {
        //     var n;
        //     n = JSUS.randomInt(-1,100);
        //     offer.value = n;
        //     submitOffer.click();
        // };

        // Function to add options to selections in HTML
        // seleccion es un W.getElementById tipo selection
        // optiones es una lista
        this.anadirOpciones = function(seleccion, opciones) {
          var opt = document.createElement('option');
          opt.value = "NaN";
          opt.text = "";
          seleccion.appendChild(opt);
          for (var i = 0; i<opciones.length; i++){
              var opt = document.createElement('option');
              opt.value = opciones[i];
              opt.text = opciones[i];
              seleccion.appendChild(opt);
          }
        };

        this.shuffle = function(array) {
          var currentIndex = array.length, temporaryValue, randomIndex;

          // While there remain elements to shuffle...
          while (0 !== currentIndex) {

            // Pick a remaining element...
            randomIndex = Math.floor(Math.random() * currentIndex);
            currentIndex -= 1;

            // And swap it with the current element.
            temporaryValue = array[currentIndex];
            array[currentIndex] = array[randomIndex];
            array[randomIndex] = temporaryValue;
          }

          return array;
        };

        // Setup page: header + frame.
        header = W.generateHeader();
        frame = W.generateFrame();

        // Add widgets.
        this.visualRound = node.widgets.append('VisualRound', header);
        this.visualTimer = node.widgets.append('VisualTimer', header);

        this.doneButton = node.widgets.append('DoneButton', header);

        // Additional debug information while developing the game.
        // this.debugInfo = node.widgets.append('DebugInfo', header)
    });

    stager.extendStep('instructions', {
        frame: 'instructions.htm'
    });

    stager.extendStep('game', {
      donebutton: true,
      frame: 'game.htm',
      cb: function() {

//////////////////////////////////////////////////////////////////////////
// AQUI COMIENZA LA ACCION
/////////////////////////////////////////////////////////////////////////
        node.on.data('Settings', function(msg) {

          var MESSAGE = msg.data; //Message from logic with quantity of each type
          var otroJugador = MESSAGE[0];
          var cantidadJarra1 = MESSAGE[1];
          var cantidadJarra2 = MESSAGE[2];
          var puntaje; // Variable para el puntaje
          var derPareja; // Argumento derecho de la pareja
          var IzqPareja; // Argumento izquierdo de la pareja
          var btn = W.getElementById("myBtn"); // Boton que abre modal
          var span1 = W.getElementById('botCirc'); // Boton en modal de enviar círculo
          var span2 = W.getElementById('botCuad'); // Boton en modal de enviar cuadrado
          var btnArmarPareja = W.getElementById('botonVerde');
          var span3 = W.getElementById('ZABbutton'); // Boton en modal2 de decir ZAB
          var span4 = W.getElementById('XOLbutton'); // Boton en modal2 de decir XOL

          // node.game.other_player = otroJugador;

          // Initialize the window for the game
          W.getElementById('myModal').style.display = '';
          W.getElementById('myModal2').style.display = '';
          W.setInnerHTML('jarra1', cantidadJarra1);
          W.setInnerHTML('jarra2', cantidadJarra2);


          // When the user clicks the button, open the modal de TALK TO
          btn.onclick = function() {
              W.getElementById('myModal2').style.display = "block";
          }
          //When the user clicks the button, envía "XOL" al otro jugador
          span4.onclick=function(){
            alert('¡Mensaje enviado!');
            W.getElementById('myModal2').style.display="";
            node.say('Comunicacion', otroJugador, 'XOL');
          }
          //When the user clicks the button, envía "ZAB" al otro jugador
          span3.onclick = function() {
              alert('¡Mensaje enviado!');
              W.getElementById('myModal2').style.display = "";
              node.say('Comunicacion', otroJugador, 'ZAB');
          }

          // When the user clicks the button, envía un CIRCULO al otro jugador
           span1.onclick = function() {
            if (cantidadJarra1 > 0){
              alert ("¡El objeto fue enviado satisfactoriamente! ");
              node.say('Dar', otroJugador, 'Circulo');
              W.getElementById('myModal').style.display = "none";
              cantidadJarra1 = cantidadJarra1 - 1;
              W.setInnerHTML('jarra1', cantidadJarra1);
            }
            else {
              alert ("¡No hay objetos de este tipo! ");
              W.getElementById('myModal').style.display = "none";
            }
          }

          // When the user clicks the button, envía un CUADRADO al otro jugador
          span2.onclick = function() {
            if (cantidadJarra2 > 0){
              alert ("¡El objeto fue enviado satisfactoriamente! ");
              node.say('Dar', otroJugador, 'Cuadrado');
              W.getElementById('myModal').style.display = "none";
              cantidadJarra2 = cantidadJarra2 - 1;
              W.setInnerHTML('jarra2', cantidadJarra2);
            }
            else {
              alert ("¡No hay objetos de este tipo! ");
              W.getElementById('myModal').style.display = "none";
            }
          }

          // Cuando el usuario da click, calcula los puntos
          var puntaje = 0;
          var izqPareja = 'Circulo';
          var derPareja = 'Cuadrado';
          btnArmarPareja.onclick = function() {
            if (izqPareja != derPareja) {
              puntaje = puntaje + 5;
              cantidadJarra1 = cantidadJarra1 - 1;
              cantidadJarra2 = cantidadJarra2 - 1;
              w.setInnerHTML('jarra1', cantidadJarra1);
              w.setInnerHTML('jarra2', cantidadJarra2);
              w.setInnerHTML('Puntaje', puntaje);
            }
            else {
              if (izqPareja == derPareja) {
              puntaje = puntaje + 1;
              // debe haber una instrucción "w.setInnerHTML('Puntaje', puntaje);"
              }
            }
            if (izqPareja || derPareja == null) {
              alert ("Debe seleccionar otro objeto");
            }
          }


          node.on.data('Comunicacion', function(msg) {
            W.getElementById('myModal').style.display = 'block';
            W.setInnerHTML('Mensaje', msg.data);
          });

          node.on.data('Dar', function(msg) {
            if (msg.data == 'Circulo') {
              cantidadJarra1 = cantidadJarra1 + 1;
              W.setInnerHTML('jarra1', cantidadJarra1);
            }
            else if (msg.data == 'Cuadrado') {
              cantidadJarra2 = cantidadJarra2 + 1;
              W.setInnerHTML('jarra2', cantidadJarra2);
            }
          });

          node.on.data('Prueba', function(msg) {
            // console.log('Intento', msg.data);
            W.setInnerHTML('jarra1', 'Whaaat!');
          });

        }); // End on.data "settings"
      }, // End cb function
    });// End extendstep "game"

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
/*
                      PSEUDOCODIGO FUNCION CAMBIO DE CANTIDADES
  function cambioCantidades() {
    if click on obj1 do:
      if cantObj1 == 0 do:
        return alert "no puede enviar objetos de este tipo";
      else:
        obj1(sender) - 1;
        obj1(requester) + 1;
    else if click on obj2 do:
      if cantObj2 == 0 do:
        return alert "no puede enviar objetos de este tipo";
      else:
        obj2(sender) - 1;
        obj2(requester) + 1;

(¿node.on.say?)
(¿cambiar el valor de los rótulos?)


  }


HACE FALTA CREAR AQUÍ UN LISTENER PARA EL BOTÓN "ENVIAR OBJETO"EN EL CUADRO DE
INTERACCIÓN, EL CUAL DEBERÁ CERRAR DICHO CUADRO Y DESPLEGAR EL CUADRO DE ENVIAR
OBJETO
ESCRIBIR BIEN cambioCantidades
AGREGAR LISTENERS A LOS BOTONES DE ENVIAR 1 PARA LLAMAR A cambioCantidades
AGREGAR LISTENERS A LOS BOTONES DE ENVIAR 1 PARA CERRAR EL CUADRO UNA VEZ SE
PULSE ALGÚN BOTÓN
AGREGAR ALERTA PARA EL RECEPTOR DE QUE SU CANTIDAD DE OBJETOS HA AUMENTADO
(¿node.on.data?)
CERRAR EL CUADRO DE DIÁLOGO PARA ENVIAR OBJETOS

*/
