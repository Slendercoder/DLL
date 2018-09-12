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

    // // Function to add options to selections in HTML
    // // seleccion es un W.getElementById tipo selection
    // // optiones es una lista
    // this.anadirOpciones = function(seleccion, opciones) {
    //   var opt = document.createElement('option');
    //   opt.value = "NaN";
    //   opt.text = "";
    //   seleccion.appendChild(opt);
    //   for (var i = 0; i<opciones.length; i++){
    //     var opt = document.createElement('option');
    //     opt.value = opciones[i];
    //     opt.text = opciones[i];
    //     seleccion.appendChild(opt);
    //   }
    // };
    //
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

    this.muestraEncuesta = function() {
      var objeto;
      var check = [];
      check[0] = W.getElementById('CheckZab');
      check[1] = W.getElementById('CheckXol');
      check[2] = W.getElementById('CheckDup');
      check[0].checked = check[1].checked = check[2].checked = false;
      if(Math.random() < 0.333333){
        W.getElementById("imgvar").src="square.png";
        objeto = 'Cuadrado';
      }else if (Math.random() < 0.666666){
        W.getElementById("imgvar").src="circle.png";
        objeto = 'Circulo';
      }else{
        W.getElementById("imgvar").src="triangle.png";
        objeto = 'Triangulo';
      }
      return objeto;
    };

    // Setup page: header + frame.
    header = W.generateHeader();
    frame = W.generateFrame();

    /* ////////////// SIN BOTÓN DONE ///////////////////////////

    this.visualRound = node.widgets.append('VisualRound', header, {
        title: false
    });
    this.visualTimer = node.widgets.append('VisualTimer', header);
    // Copy reference to have timeup stored on `done`. (for the time being).
    // this.timer = this.visualTimer;

    ////////////////// SIN BOTÓN DONE ////////////////////////// */

    // Add widgets.
    this.visualRound = node.widgets.append('VisualRound', header);
    this.visualTimer = node.widgets.append('VisualTimer', header);

    // this.doneButton = node.widgets.append('DoneButton', header);

    this.contadorComunicacion = 1;

    // var doneButton = node.widgets.append('DoneButton', header)
    // doneButton.text = "OK"

    // Additional debug information while developing the game.
    // this.debugInfo = node.widgets.append('DebugInfo', header)
  });

  stager.extendStep('instructions', {
    donebutton: false,
    frame: 'instructions.htm',
    cb: function(){
      var sett, continuar;
      sett = node.game.settings;
      W.setInnerHTML('rounds', sett.REPEAT);
      continuar = W.getElementById('continuar');
      continuar.onclick = function() { node.done(); };
    }
  });

  /*stager.extendStep('quiz', {
    donebutton: false,
    frame: 'quiz.htm',
    cb: function() {
        var button, QUIZ;

        QUIZ = W.getFrameWindow().QUIZ;
        button = W.getElementById('submitQuiz');

        node.on('check-quiz', function() {
            var answers;
            answers = QUIZ.checkAnswers(button);
            if (answers.correct || node.game.visualTimer.isTimeup()) {
                node.emit('INPUT_DISABLE');
                // On Timeup there are no answers.
                node.done(answers);
            }
        });
        console.log('Quiz');
        }
});*/

  stager.extendStep('game', {
    donebutton: false,
    frame: 'game2.htm',
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
        var btnSalir = W.getElementById("finRonda"); // Boton que abre modal
        var span1 = W.getElementById('botCirc'); // Boton en modal de enviar círculo
        var span2 = W.getElementById('botCuad'); // Boton en modal de enviar cuadrado
        var btnArmarPareja = W.getElementById('botonVerde'); //Boton "ToBasket"
        var span3 = W.getElementById('ZABbutton'); // Boton en modal2 de decir ZAB
        var span4 = W.getElementById('XOLbutton'); // Boton en modal2 de decir XOL
        var span5 = W.getElementById('botIgn'); //Boton ignorar llamado
        var span6 = W.getElementById('exitButton'); //Boton de exit del modal
        var span7 = W.getElementById('botTri'); // Boton en modal de enviar triángulo
        var span8 = W.getElementById('DUPbutton'); // Boton en modal2 de decir DUP
        var countRondas = node.player.stage.round; //Lleva el numero de rondas
        var umbral; //valor del umbral de puntos
        var resp = true; // para saber si ya le respondieron el mensaje skdjkhdajf



        node.game.contadorComunicacion = 1;

        // node.game.other_player = otroJugador;

        // Initialize the window for the game
        W.getElementById('myModal').style.display = '';
        W.getElementById('myModal2').style.display = '';
        W.setInnerHTML('jarra1', cantidadJarra1);
        W.setInnerHTML('jarra2', cantidadJarra2);
        W.setInnerHTML('jarra3', cantidadJarra3);
        izqPareja='';
        derPareja='';

        // node.set({ObjetoElegido: Elegido});
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

          // When the user clicks the button, open the modal de TALK TO
        btn.onclick = function() {
            if(resp == false){
              var  p = confirm("No le han respondido el anterior mensaje!! ¿Quiere mandar otro?");
            }
            if (p == true || resp == true){
              var x = Math.random();
              if(x < 0.33333){
                W.setInnerHTML('zab', 'ZAB');
                if(Math.random() < 0.5){

                  W.setInnerHTML('xol', 'XOL');

                  W.setInnerHTML('dup', 'DUP');
                }else{


                  W.setInnerHTML('xol', 'DUP');


                  W.setInnerHTML('dup', 'XOL');




                }
              }//fin del primer if x <0.33333
              else if(x < 0.66666){


                  W.setInnerHTML('zab', 'XOL');


                if(Math.random() < 0.5){


                  W.setInnerHTML('xol', 'DUP');


                  W.setInnerHTML('dup', 'ZAB');



                }else{


                  W.setInnerHTML('xol', 'ZAB');

                  W.setInnerHTML('dup', 'DUP');
                }
              }// primer else if x < 0.66666
              else {

                W.setInnerHTML('zab', 'DUP');

                  if(Math.random() < 0.5){

                    W.setInnerHTML('xol', 'ZAB');

                    W.setInnerHTML('dup', 'XOL');


                  }else{

                    W.setInnerHTML('xol', 'XOL');

                    W.setInnerHTML('dup', 'ZAB');


                  }
              }// fin del else
              // if( x< 0.33333){
              //   W.getElementById('Zab').style.left= '380px';
              //   if(Math.random() < 0.5){
              //     W.getElementById('Xol').style.left= '610px';
              //     W.getElementById('Dup').style.left= '840px';
              //   }else{
              //     W.getElementById('Xol').style.left= '840px';
              //     W.getElementById('Dup').style.left= '610px';}
              // }//fin del primer if x <0.33333
              // else if(x < 0.66666){
              //     W.getElementById('Zab').style.left= '610px';
              //   if(Math.random() < 0.5){
              //     W.getElementById('Xol').style.left= '840px';
              //     W.getElementById('Dup').style.left= '380px';
              //   }else{
              //     W.getElementById('Xol').style.left= '380px';
              //     W.getElementById('Dup').style.left= '840px';
              //   }
              // }// primer else if x < 0.66666
              // else {
              //     W.getElementById('Zab').style.left= '840px';
              //     if(Math.random() < 0.5){
              //       W.getElementById('Xol').style.left= '380px';
              //       W.getElementById('Dup').style.left= '610px';
              //     }else{
              //       W.getElementById('Xol').style.left= '610px';
              //       W.getElementById('Dup').style.left= '380px';
              //     }
              // }// fin del else
              W.getElementById('myModal2').style.display = "block";
            }
              resp = false;
          }

        //When the user clicks the button, close the modal de TALK TO
        span6.onclick = function() {
          W.getElementById('myModal2').style.display = "";
        }

        //When the user clicks the button, envía "ZAB" al otro jugador
        span3.onclick = function() {
          alert('El mensaje se envió exitosamente!');
          W.getElementById('myModal2').style.display = "";
          node.say('Comunicacion', otroJugador, 'zab'); //Hay que cambiar esto!!!!
          node.set({Comunicacion: ["zab", node.game.contadorComunicacion]})
        }

        //When the user clicks the button, envía "XOL" al otro jugador
        span4.onclick=function(){
          alert('El mensaje se envió exitosamente!');
          W.getElementById('myModal2').style.display="";
          node.say('Comunicacion', otroJugador, 'xol'); // hay que cambiar esto !!!!
          node.set({Comunicacion: ["xol", node.game.contadorComunicacion]})
        }

        //When the user clicks the button, envía "DUP" al otro jugador
        span8.onclick = function() {
          alert('Mensaje enviado exitosamente!');
          W.getElementById('myModal2').style.display = "";
          node.say('Comunicacion', otroJugador,'dup');  // hay que cambiar esto !!!!
          node.set({Comunicacion: ["dup", node.game.contadorComunicacion]})
        }

        // When the user clicks the button, envía un CIRCULO al otro jugador
        span1.onclick = function() {
          resp = true;
          if (cantidadJarra1 > 0){
            alert ("El objeto se envió exitosamente!");
            node.say('Dar', otroJugador, 'Circulo');
            W.getElementById('myModal').style.display = "none";
            cantidadJarra1 --;
            W.setInnerHTML('jarra1', cantidadJarra1);
            node.set({Comunicacion: ['Circulo', node.game.contadorComunicacion]});
            node.game.contadorComunicacion += 1;
          }
          else {
            alert ("No tiene objetos suficientes! ");
            W.getElementById('myModal').style.display = "none";
          }
        }

        // When the user clicks the button, envía un CUADRADO al otro jugador
        span2.onclick = function() {
          resp = true;
          if (cantidadJarra2 > 0){
            alert ("El objeto se envió exitosamente! ");

            node.say('Dar', otroJugador, 'Cuadrado');
            W.getElementById('myModal').style.display = "none";
            cantidadJarra2 --;
            W.setInnerHTML('jarra2', cantidadJarra2);
            node.set({Comunicacion: ['Cuadrado', node.game.contadorComunicacion]});
            node.game.contadorComunicacion += 1;
          }
          else {
            alert ("No tiene objetos suficientes!  ");
            W.getElementById('myModal').style.display = "none";
          }
        }
        // When the user clicks the button, envía un TRIANGULO al otro jugador
        span7.onclick = function() {
          resp = true;
          if (cantidadJarra3 > 0){
            alert ("El objeto se envió exitosamente!  ");

            node.say('Dar', otroJugador, 'Triangulo');
            W.getElementById('myModal').style.display = "none";
            cantidadJarra3 --;
            W.setInnerHTML('jarra3', cantidadJarra3);
            node.set({Comunicacion: ['Triangulo', node.game.contadorComunicacion]});
            node.game.contadorComunicacion += 1;
          }
          else {
            alert ("No tiene objetos suficientes! ");
            W.getElementById('myModal').style.display = "none";
          }
        }


        //When the user clicks the button, ignora al otro jugador
        span5.onclick = function(){
          W.getElementById('myModal').style.display = "";
          node.set({Comunicacion: ['Ignorar', node.game.contadorComunicacion]});
          node.game.contadorComunicacion += 1;
        }

        // Cuando el usuario da click, calcula los puntos
        btnArmarPareja.onclick = function() {
          //Evalua si alguna de las casillas esta vacía al hacer una pareja
          if((izqPareja=='')||(derPareja=='')){
            alert("Tiene que arrastrar un objeto");
          }
          // La pareja esta completa ...
          else{
              //Evalua si alguna de las cantidades de los elementos de las jarras es cero
            if (((izqPareja=='Circulo' && derPareja=='Cuadrado') || (izqPareja=='Cuadrado' && derPareja=='Circulo')) && (cantidadJarra1==0 || cantidadJarra2 == 0 )) {
              alert("No tiene objetos suficientes para este par!");
            }
            if (((izqPareja=='Circulo' && derPareja=='Triangulo') || (izqPareja=='Triangulo' && derPareja=='Circulo')) && (cantidadJarra1==0 || cantidadJarra3 == 0 )) {
              alert("No tiene objetos suficientes para este par!");
            }
            if (((izqPareja=='Cuadrado' && derPareja=='Triangulo') || (izqPareja=='Triangulo' && derPareja=='Cuadrado')) && (cantidadJarra2==0 || cantidadJarra3 == 0 )) {
              alert("No tiene objetos suficientes para este par!");
            }
              // Revisa si los objetos son del mismo tipo ...
            else {
              if(izqPareja == derPareja){
                puntaje ++;
                node.set({Puntaje: [izqPareja, derPareja, 1]});
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
                  node.set({Puntaje: [izqPareja, derPareja, 5]});
                }
                // Ninguno de los dos objetos es del tipo elegido
                else {
                  puntaje ++;
                  node.set({Puntaje: [izqPareja, derPareja, 1]});
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
            if(puntaje>=umbral){
              switch(countRondas){
                case 1:
                alert("¡Ha ganado el bono! El código es: " + Math.ceil(Math.random()*100)*17);
                break;
                case 2:
                alert("¡Ha ganado el bono! El código es: " + Math.ceil(Math.random()*100)*23);
                break;
                case 3:
                alert("¡Ha ganado el bono! El código es: " + Math.ceil(Math.random()*100)*37);
                break;
                case 4:
                alert("¡Ha ganado el bono! El código es: " + Math.ceil(Math.random()*100)*41);
                break;
                case 5:
                alert("¡Ha ganado el bono! El código es: " + Math.ceil(Math.random()*100)*79);
              };
            }
          } // Cierra boton de armar pareja

        //////////////////////////////////////////////////////////////////////////
        //                     INTERACCIONES                                   //
        /////////////////////////////////////////////////////////////////////////
        node.on.data('Comunicacion', function(msg) {
          W.getElementById('myModal').style.display = 'block';
          W.setInnerHTML('Mensaje', msg.data); // Hay que cambiarlo???

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
          alert("Recibió un objeto!");
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

  stager.extendStep('encuesta', {
    frame: 'Encuesta.htm',
    donebutton: true,
    cb: function(){
      var boton1 = W.getElementById('BotContinuar');
      var objeto;
      var datos = [];
      var contador = 0;

      W.getElementById('CheckZab').checked=false;
      W.getElementById('CheckXol').checked=false;
      W.getElementById('CheckDup').checked=false;
      if(Math.random() < 0.333333){
        W.getElementById("imgvar").src="square.png";
        objeto = 'Cuadrado';
      }else if (Math.random() < 0.666666){
        W.getElementById("imgvar").src="circle.png";
        objeto = 'Circulo';
      }else{
        W.getElementById("imgvar").src="triangle.png";
        objeto = 'Triangulo';
      }
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
        if(Math.random() < 0.333333){
          W.getElementById("imgvar").src="square.png";
          objeto = 'Cuadrado';
        }else if (Math.random() < 0.666666){
          W.getElementById("imgvar").src="circle.png";
          objeto = 'Circulo';
        }else{
          W.getElementById("imgvar").src="triangle.png";
          objeto = 'Triangulo';
        }
        contador++;
        W.setInnerHTML('cont', contador+1+' / 9');
        //W.setInnerHTML('Holaaaa');
        if(contador==9){
          W.getElementById('encuesta').style.display = "none";
          alert("Oprima el botón 'I am done' en la parte de arriba de la pantalla para continuar");
        }
      }




    /*  function muestraEncuesta() {
        var objeto;
        var check = [];
        check[0] = W.getElementById('CheckZab');
        check[1] = W.getElementById('CheckXol');
        check[2] = W.getElementById('CheckDup');
        check[0].checked = check[1].checked = check[2].checked = false;
        if(Math.random() < 0.333333){
          W.getElementById("imgvar").src="square.png";
          objeto = 'Cuadrado';
        }else if (Math.random() < 0.666666){
          W.getElementById("imgvar").src="circle.png";
          objeto = 'Circulo';
        }else{
          W.getElementById("imgvar").src="triangle.png";
          objeto = 'Triangulo';
        }
        return objeto;
      }
      objeto = muestraEncuesta();
      boton1.onclick = function() {
        datos = [objeto, check[0].checked, check[1].checked, check[2].checked];
        contador ++;
        if (contador < 9){
          objeto = muestraEncuesta();
        }
      }*/ // fin boton1

    }
  });



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
