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

        node.on.data('Settings', function(msg) {

          var MESSAGE = msg.data; //Message from logic with quantity of each type
          var categorized1 = false;
          var categorized2 = false;
          var ready_categorized = false;

          // Defines names for types of objects
          var opciones = node.game.shuffle(node.game.settings.opciones);

          // Initializing the environment
          var other_player = MESSAGE[0].toString();
          var num_type1 = MESSAGE[1];
          var num_type2 = MESSAGE[2];
          W.setInnerHTML('Type1', num_type1);
          W.setInnerHTML('Type2', num_type2);
          console.log('Aqui vamos')
          var combo_Jar1 = W.getElementById('select_Jar1');
          console.log(combo_Jar1.id)
          var combo_Jar2 = W.getElementById('select_Jar2');
          node.game.anadirOpciones(combo_Jar1, opciones);
          node.game.anadirOpciones(combo_Jar2, opciones);

          combo_Jar1.onchange=function() {
            if (combo_Jar1.value == combo_Jar2.value){
              combo_Jar1.value = NaN;
              alert('No puedes seleccionar la misma categoría para los dos tipos de objeto');
            }
            else {
              categorized1 = true;
              if (ready_categorized === false) {
                if (categorized2 === true) {
                  ready_categorized = true;
                  var combo_Senal = W.getElementById('select_Senal');
                  var combo_Pareja1 = W.getElementById('select_Pareja1');
                  var combo_Pareja2 = W.getElementById('select_Pareja2');
                  node.game.anadirOpciones(combo_Senal, opciones);
                  node.game.anadirOpciones(combo_Pareja1, opciones);
                  node.game.anadirOpciones(combo_Pareja2, opciones);
                }
              }
            }
          };
          combo_Jar2.onchange=function() {
            if (combo_Jar1.value == combo_Jar2.value){
              combo_Jar2.value = NaN;
              alert('No puedes seleccionar la misma categoría para los dos tipos de objeto');
            }
            else {
              categorized2 = true;
              if (ready_categorized === false) {
                if (categorized1 === true) {
                  ready_categorized = true;
                  var combo_Senal = W.getElementById('select_Senal');
                  var combo_Pareja1 = W.getElementById('select_Pareja1');
                  var combo_Pareja2 = W.getElementById('select_Pareja2');
                  node.game.anadirOpciones(combo_Senal, opciones);
                  node.game.anadirOpciones(combo_Pareja1, opciones);
                  node.game.anadirOpciones(combo_Pareja2, opciones);
                }
              }
            }
          };
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
