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
      //////////////////////////////////////////////////////////////////////////
      //                     AQUI COMIENZA LA ACCION                          //
      /////////////////////////////////////////////////////////////////////////
      /////////////////////////////////////////////////////////////////////////
      node.on.data('Settings', function(msg) {

        console.log('El jugador arranca');

        var MESSAGE = msg.data; //Message from logic with quantity of each type
        var otroJugador = MESSAGE[0];
        var Cantidades = MESSAGE[1];
        var cantidadJarra1 = Cantidades[0]; //Variable para la cantidad de círculos
        var cantidadJarra2 = Cantidades[1]; //Variable para la cantidad de círculos
        var cantidadJarra3 = Cantidades[2]; //Variable para la cantidad de círculos
        var Elegido = Cantidades[3]; //Variable para saber cual tipo de objeto es el elegido
        var puntaje = 0; // Variable para el puntaje
        var derPareja; // Argumento derecho de la pareja
        var izqPareja; // Argumento izquierdo de la pareja
        var btn = W.getElementById("myBtn"); // Boton que abre modal
        var span1 = W.getElementById('botCirc'); // Boton en modal de enviar círculo
        var span2 = W.getElementById('botCuad'); // Boton en modal de enviar cuadrado
        var btnArmarPareja = W.getElementById('botonVerde'); //Boton "ToBasket"
        var span3 = W.getElementById('ZABbutton'); // Boton en modal2 de decir ZAB
        var span4 = W.getElementById('XOLbutton'); // Boton en modal2 de decir XOL
        var span5 = W.getElementById('botIgn'); //Boton ignorar llamado
        var span6 = W.getElementById('exitButton'); //Boton de exit del modal
        var span7 = W.getElementById('botTri'); // Boton en modal de enviar triángulo
        var span8 = W.getElementById('DUPbutton'); // Boton en modal2 de decir DUP

        // node.game.other_player = otroJugador;

        // Initialize the window for the game
        W.getElementById('myModal').style.display = '';
        W.getElementById('myModal2').style.display = '';
        W.setInnerHTML('jarra1', cantidadJarra1);
        W.setInnerHTML('jarra2', cantidadJarra2);
        W.setInnerHTML('jarra3', cantidadJarra3);
        izqPareja='';
        derPareja='';

        //////////////////////////////////////////////////////////////////////////
        //                     BOTONES                                          //
        /////////////////////////////////////////////////////////////////////////

        // When the user clicks the button, open the modal de TALK TO
        btn.onclick = function() {
          W.getElementById('myModal2').style.display = "block";
        }

        //When the user clicks the button, close the modal de TALK TO
        span6.onclick = function() {
          W.getElementById('myModal2').style.display = "";
        }

        //When the user clicks the button, envía "ZAB" al otro jugador
        span3.onclick = function() {
          alert('Message sent succesfully!');
          W.getElementById('myModal2').style.display = "";
          node.say('Comunicacion', otroJugador, '"ZAB"');

        }

        //When the user clicks the button, envía "XOL" al otro jugador
        span4.onclick=function(){
          alert('Message sent succesfully!');
          W.getElementById('myModal2').style.display="";
          node.say('Comunicacion', otroJugador, '"XOL"');
        }

        // When the user clicks the button, envía un CIRCULO al otro jugador
        span1.onclick = function() {
          if (cantidadJarra1 > 0){
            alert ("The item has been sent succesfully! ");
            node.say('Dar', otroJugador, 'Circulo');
            W.getElementById('myModal').style.display = "none";
            cantidadJarra1 --;
            W.setInnerHTML('jarra1', cantidadJarra1);
          }
          else {
            alert ("There are no such items! ");
            W.getElementById('myModal').style.display = "none";
          }
        }

        // When the user clicks the button, envía un CUADRADO al otro jugador
        span2.onclick = function() {
          if (cantidadJarra2 > 0){
            alert ("The item has been sent succesfully! ");

            node.say('Dar', otroJugador, 'Cuadrado');
            W.getElementById('myModal').style.display = "none";
            cantidadJarra2 --;
            W.setInnerHTML('jarra2', cantidadJarra2);
          }
          else {
            alert ("There are no such items! ");
            W.getElementById('myModal').style.display = "none";
          }
        }
        // When the user clicks the button, envía un TRIANGULO al otro jugador
        span7.onclick = function() {
          if (cantidadJarra3 > 0){
            alert ("The item has been sent succesfully! ");

            node.say('Dar', otroJugador, 'Triangulo');
            W.getElementById('myModal').style.display = "none";
            cantidadJarra3 --;
            W.setInnerHTML('jarra3', cantidadJarra3);
          }
          else {
            alert ("There are no such items! ");
            W.getElementById('myModal').style.display = "none";
          }
        }

        // Nueva function de Comunicacion
        //When the user clicks the button, envía "DUP" al otro jugador
        span8.onclick = function() {
          alert('Message sent succesfully!');
          W.getElementById('myModal2').style.display = "";
          node.say('Comunicacion', otroJugador, '"DUP"');

        }

        //When the user clicks the button, ignora al otro jugador
        span5.onclick = function(){
          W.getElementById('myModal').style.display = "";
        }

        // Cuando el usuario da click, calcula los puntos
        btnArmarPareja.onclick = function() {
          //Evalua si alguna de las casillas esta vacía al hacer una pareja
          if((izqPareja=='')||(derPareja=='')){
            alert("You must drag an item");
          }
          // La pareja esta completa ...
          else{
              //Evalua si alguna de las cantiades de los elementos de las jarras es cero
            if (cantidadJarra1 == 0 || cantidadJarra2 == 0) {
              alert("You don't have enough elements for this pair!");
            }
              // Revisa si los objetos son del mismo tipo ...
            else {
              if(izqPareja == derPareja){
                puntaje ++;
                if (izqPareja == 'Circulo') {
                  cantidadJarra1 -= 2;
                }
                if (izqPareja == 'Cuadrado') {
                  cantidadJarra2 -= 2;
                }
                if (izqPareja == 'Triangulo') {
                  cantidadJarra3 -= 2;
                }
              }
              // Si los objetos no son del mismo tipo ...
              else {
                // Revisa si alguno de los dos objetos es del tipo elegido
                if (izqPareja == Elegido || derPareja == Elegido) {
                  puntaje += 5;
                }
                // Ninguno de los dos objetos es del tipo elegido
                else {
                  puntaje ++;
                }
                // Modifica las cantidades
                if (izqPareja == 'Circulo' || derPareja == 'Circulo') {
                  cantidadJarra1 --;
                }
                if (izqPareja == 'Cuadrado' || derPareja == 'Cuadrado') {
                  cantidadJarra2 --;
                }
                if (izqPareja == 'Triangulo' || derPareja == 'Triangulo') {
                  cantidadJarra3 --;
                }
              }
            }
            // Cambia los rotulos de las jarras y el puntaje
            W.setInnerHTML('jarra1', cantidadJarra1);
            W.setInnerHTML('jarra2', cantidadJarra2);
            W.setInnerHTML('jarra3', cantidadJarra3);
            W.setInnerHTML('Puntaje', puntaje);
            }
            // // Si ninguno de los objetos es el elegido ...
            // else {
            //   if (izqPareja == 'Circulo') {
            //     if (cantidadJarra1 == 0) {
            //       alert("You don't have enough elements for this pair!");
            //     }
            //     else {
            //       cantidadJarra1 -=2;
            //       W.setInnerHTML('jarra1', cantidadJarra1);
            //       W.getElementById('parIzCir').style.display = "none";
            //       W.getElementById('parDerCir').style.display = "none";
            //     }
            //   }
            //   if (izqPareja == 'Cuadrado') {
            //     if (cantidadJarra2 == 0) {
            //       alert("You don't have enough elements for this pair!");
            //     }
            //     else {cantidadJarra2 -=2;
            //       W.setInnerHTML('jarra2', cantidadJarra2);
            //       W.getElementById('parIzCuad').style.display = "none";
            //       W.getElementById('parDerCuad').style.display = "none";
            //     }
            //   }
            // }
            // if ((izqPareja == 'Cuadrado' && derPareja=='Triangulo')||(izqPareja == 'Triangulo' && derPareja=='Cuadrado')) {
            //   //Evalua si alguna de las cantiades de los elementos de las jarras es cero
            //   if (cantidadJarra2 == 0 || cantidadJarra3 == 0) {
            //     alert("You don't have enough elements for this pair!");
            //   }
            //   //Si hay dos elemento diferentes suma 5 puntos y resta en uno a los elementos
            //   else if(Cantidades1[1]==4 || Cantidades1[2]==4){
            //     puntaje +=5;
            //     cantidadJarra2 --;
            //     cantidadJarra3 --;
            //     W.setInnerHTML('jarra2', cantidadJarra2);
            //     W.setInnerHTML('jarra3', cantidadJarra3);
            //     W.setInnerHTML('Puntaje', puntaje);
            //
            //   }
            // }
            // //Si los elementos de la pareja son iguales suma 1 punto y resta dos a la cantidad del elementos usado
            // else {
            //   puntaje ++;
            //   W.setInnerHTML('Puntaje', puntaje);
            //   if (izqPareja == 'Cuadrado') {
            //     if (cantidadJarra2 == 0) {
            //       alert("You don't have enough elements for this pair!");
            //     }
            //     else {
            //       cantidadJarra2 -=2;
            //       W.setInnerHTML('jarra2', cantidadJarra2);
            //       W.getElementById('parIzCuad').style.display = "none";
            //       W.getElementById('parDerCuad').style.display = "none";
            //     }
            //   }
            //   if (izqPareja == 'Triangulo') {
            //     if (cantidadJarra3 == 0) {
            //       alert("You don't have enough elements for this pair!");
            //     }
            //     else {cantidadJarra3 -=2;
            //       W.setInnerHTML('jarra3', cantidadJarra3);
            //       W.getElementById('parIzTri').style.display = "none";
            //       W.getElementById('parDerTri').style.display = "none";
            //     }
            //   }
            // }
            // if ((izqPareja == 'Circulo' && derPareja=='Triangulo')||(izqPareja == 'Triangulo' && derPareja=='Circulo')) {
            //   //Evalua si alguna de las cantiades de los elementos de las jarras es cero
            //   if (cantidadJarra1 == 0 || cantidadJarra3 == 0) {
            //     alert("You don't have enough elements for this pair!");
            //   }
            //   //Si hay dos elemento diferentes suma 5 puntos y resta en uno a los elementos
            //   else if(Cantidades1[0]==4 || Cantidades1[2]==4){
            //     puntaje +=5;
            //     cantidadJarra1 --;
            //     cantidadJarra3 --;
            //     W.setInnerHTML('jarra1', cantidadJarra1);
            //     W.setInnerHTML('jarra3', cantidadJarra3);
            //     W.setInnerHTML('Puntaje', puntaje);
            //
            //   }
            // }
            // //Si los elementos de la pareja son iguales suma 1 punto y resta dos a la cantidad del elementos usado
            // else {
            //   puntaje ++;
            //   W.setInnerHTML('Puntaje', puntaje);
            //   if (izqPareja == 'Circulo') {
            //     if (cantidadJarra1 == 0) {
            //       alert("You don't have enough elements for this pair!");
            //     }
            //     else {
            //       cantidadJarra1 -=2;
            //       W.setInnerHTML('jarra1', cantidadJarra1);
            //       W.getElementById('parIzCir').style.display = "none";
            //       W.getElementById('parDerCir').style.display = "none";
            //     }
            //   }
            //   if (izqPareja == 'Triangulo') {
            //     if (cantidadJarra3 == 0) {
            //       alert("You don't have enough elements for this pair!");
            //     }
            //     else {cantidadJarra3 -=2;
            //       W.setInnerHTML('jarra3', cantidadJarra3);
            //       W.getElementById('parIzTri').style.display = "none";
            //       W.getElementById('parDerTri').style.display = "none";
            //     }
            //   }
            // }

            //Elimina los elementos de las casillas al oprimir "To basket"
            W.getElementById('parIzCir').style.display = "none";
            W.getElementById('parIzCuad').style.display = "none";
            W.getElementById('parDerCir').style.display = "none";
            W.getElementById('parDerCuad').style.display = "none";
            W.getElementById('parDerTri').style.display = "none";
            W.getElementById('parIzTri').style.display = "none";
            izqPareja='';
            derPareja='';

          } // Cierra boton de armar pareja

        //////////////////////////////////////////////////////////////////////////
        //                     INTERACCIONES                                   //
        /////////////////////////////////////////////////////////////////////////
        node.on.data('Comunicacion', function(msg) {
          W.getElementById('myModal').style.display = 'block';
          W.setInnerHTML('Mensaje', msg.data);
        });

        node.on.data('Dar', function(msg) {
          if (msg.data == 'Circulo') {    //Si el jugador recibe un circulo del otro jugador,
            cantidadJarra1 ++;
            W.setInnerHTML('jarra1', cantidadJarra1);
          }

          else if (msg.data == 'Cuadrado') { // Si el jugador recibe un cuadrado del otro jugador,
            cantidadJarra2 ++;
            W.setInnerHTML('jarra2', cantidadJarra2);
          }else{ // Si el jugador recibe un triangulo del otro jugador,
            cantidadJarra3++;
            W.setInnerHTML('jarra3', cantidadJarra3);
          }
          alert("You have received an item!");
        });

        node.on('Arrastrar', function(msg) {
          console.log('Arrastrar', msg);
          if (msg[0] == 'drag1') {    // Se está arrastrando un círculo
            if (cantidadJarra1 > 0) {
              if (msg[1] == 'Izquierdo') { // Se arrastra al lado izquierdo
                W.getElementById("parIzCir").style.display = "";
                W.getElementById("parIzCuad").style.display = "none";
                W.getElementById("parIzTri").style.display = "none";
                izqPareja = 'Circulo';

                if(cantidadJarra1==1&&derPareja=='Circulo'){ //Si el UNICO circulo disponible está del lado derecho y se intenta poner otro en el lado izqaierdo, lo reemplaza
                  W.getElementById("parDerCir").style.display="none";
                  izqPareja='';
                  derPareja='';
                  izqPareja = 'Circulo';


              }

              }
              if (msg[1] == 'Derecho') { // Se arrastra al lado derecho
                W.getElementById("parDerCir").style.display = "";
                W.getElementById("parDerCuad").style.display = "none";
                W.getElementById("parDerTri").style.display = "none";
                derPareja = 'Circulo';
                if(cantidadJarra1==1&&izqPareja=='Circulo'){ //Si el UNICO circulo disponible está del lado izquierdo y se intenta poner otro en el lado derecho, lo reemplaza
                  W.getElementById("parIzCir").style.display="none";
                  izqPareja='';
                  derPareja='';
                  derPareja = 'Circulo';
                }
              }
            }
          }
          if (msg[0] == 'drag2') {    // Se está arrastrando un cuadrado
            if (cantidadJarra2 > 0) {
              if (msg[1] == 'Izquierdo') {    // Se arrastra al lado izquierdo
                W.getElementById("parIzCir").style.display = "none";
                W.getElementById("parIzTri").style.display = "none";
                W.getElementById("parIzCuad").style.display = "";
                izqPareja = 'Cuadrado';
                if(cantidadJarra2==1&&derPareja=='Cuadrado'){ //Si el UNICO cuadrado disponible está del lado derecho y se intenta poner otro en el lado izqaierdo, lo reemplaza
                  W.getElementById("parDerCuad").style.display="none";
                  izqPareja='';
                  derPareja='';
                  izqPareja = 'Cuadrado';
                }
              }
              if (msg[1] == 'Derecho') { // Se arrastra al lado derecho
                console.log('EEEEEE')
                W.getElementById("parDerCir").style.display = "none";
                W.getElementById("parDerTri").style.display = "none";
                W.getElementById("parDerCuad").style.display = "";
                derPareja = 'Cuadrado';
                if(cantidadJarra2==1&&izqPareja=='Cuadrado'){ //Si el UNICO cuadrado disponible está del lado izquierdo y se intenta poner otro en el lado derecho, lo reemplaza
                  W.getElementById("parIzCuad").style.display="none";
                  izqPareja='';
                  derPareja='';
                  derPareja = 'Cuadrado';
                }
              }
            }
          }
          if (msg[0] == 'drag3') {    // Se está arrastrando un triangulo
            if (cantidadJarra3 > 0) {
              if (msg[1] == 'Izquierdo') {    // Se arrastra al lado izquierdo
                W.getElementById("parIzCir").style.display = "none";
                W.getElementById("parIzCuad").style.display = "none";
                W.getElementById("parIzTri").style.display = "";
                izqPareja = 'Triangulo';
                if(cantidadJarra3==1&&derPareja=='Triangulo'){ //Si el UNICO triangulo disponible está del lado derecho y se intenta poner otro en el lado izqaierdo, lo reemplaza
                  W.getElementById("parDerTri").style.display="none";
                  izqPareja='';
                  derPareja='';
                  izqPareja = 'Triangulo';
                }
              }
              if (msg[1] == 'Derecho') { // Se arrastra al lado derecho
                console.log('EEEEEE')
                W.getElementById("parDerCir").style.display = "none";
                W.getElementById("parDerCuad").style.display = "none";
                W.getElementById("parDerTri").style.display = "";
                derPareja = 'Triangulo';
                if(cantidadJarra3==1&&izqPareja=='Triangulo'){ //Si el UNICO triangulo disponible está del lado izquierdo y se intenta poner otro en el lado derecho, lo reemplaza
                  W.getElementById("parIzTri").style.display="none";
                  izqPareja='';
                  derPareja='';
                  derPareja = 'Triangulo';
                }
              }
            }
          }


        });

      }); // End on.data "settings"
    }, // End cb function
  });// End extendstep "game"

  stager.extendStep('debrief', {
    frame: 'debrief.htm'
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
