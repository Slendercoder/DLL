/**
 * # Logic type implementation of the game stages
 * Copyright(c) 2017 Edgar Andrade-Lotero <edgar.andrade@urosario.edu.co>
 * MIT Licensed
 *
 * http://www.nodegame.org
 * ---
 */

"use strict";

var ngc = require('nodegame-client');
var stepRules = ngc.stepRules;
var constants = ngc.constants;
var J = ngc.JSUS;
var counter = 0;

module.exports = function(treatmentName, settings, stager, setup, gameRoom) {

    var node = gameRoom.node;
    var channel =  gameRoom.channel;

    // Must implement the stages here.

    // Increment counter.
    counter = counter ? ++counter : settings.SESSION_ID || 1;

    stager.setOnInit(function() {

        // Initialize the client.
    });

    stager.extendStep('game', {
        // matcher: {
        //     roles: [ 'PLAYER_A', 'PLAYER_B' ],
        //     match: 'round_robin',
        //     cycle: 'mirror_invert',
        //     sayPartner: false
        //     // skipBye: false,
        //
        // },
        cb: function() {
            console.log('\n%%%%%%%%%%%%%%%');
            console.log('Game round: ' + node.player.stage.round);
            doMatch();
        }
    });

    stager.extendStep('puntaje', {
        cb: function() {
          console.log('Puntaje...');
        }
    });

    stager.extendStep('encuesta', {
        cb: function() {

          node.on.data('USER_INPUT', function(msg){
            var recompensa = msg.data;
            var me = msg.from;
            console.log('*************************************************************');
            console.log('El jugador ' + me + ' obtiene ' + recompensa + ' UMEs');
            console.log('*************************************************************');
          });

          console.log('Encuesta...');
        }
    });

    stager.extendStep('demograf', {
        cb: function() {
          console.log('demograf...');
        }
    });

    stager.extendStep('debrief', {
        cb: function() {
          console.log('Guardando datos...');
          node.game.memory.save(channel.getGameDir() + 'data/data_' +
                                node.nodename + '.json');
          console.log('Datos guardados!');
          console.log('Debrief...');
      }
    });

    stager.extendStep('end', {
        cb: function() {
          console.log('End');
        }
    });

    stager.setOnGameOver(function() {

        // Something to do.

    });

    // Here we group together the definition of the game logic.
    return {
        nodename: 'lgc' + counter,
        // Extracts, and compacts the game plot that we defined above.
        plot: stager.getState(),

    };

    // Helper functions.

    function doMatch() {
        var players = node.game.pl.id.getAllKeys();

        // Xol = paridadVerticales: Par;
        //       colorRayas = Rojo;
        //
        // Dup = tipoPoligono: Gris;
        //       paridadHorizontales: Par;

        // Creando datos para enviar al jugador XOL (player[0])
        // Aleatorizo la lista de indices
        var aPL1 = [];
        for (var i = 0; i < 10; i++) {
          aPL1.push(i);
        }
        // Aleatorizo lista aPL1
        var j, x, i;
        for (i = aPL1.length - 1; i > 0; i--) {
            j = Math.floor(Math.random() * (i + 1));
            x = aPL1[i];
            aPL1[i] = aPL1[j];
            aPL1[j] = x;
        }
        // Creo la lista que identifica el tipo de objeto
        var tiposObjetosPL1 = [];
        tiposObjetosPL1[0] = 'Xol';
        tiposObjetosPL1[1] = 'Xol';
        tiposObjetosPL1[2] = 'Xol';
        tiposObjetosPL1[3] = 'Xol';
        tiposObjetosPL1[4] = 'Xol';
        tiposObjetosPL1[5] = 'Xol';
        tiposObjetosPL1[6] = 'Otro-R-G-VP-HI';
        tiposObjetosPL1[7] = 'Otro-R-B-VP-HI';
        tiposObjetosPL1[8] = 'Otro-A-B-VP-HI';
        tiposObjetosPL1[9] = 'Otro-A-G-VP-HI';
        // console.log(tiposObjetos);
        // Creo la lista de source para las imagenes
        var srcImagenesPL1 = [];
        for (var i=1; i < 11; i++) {
          srcImagenesPL1[i - 1] = 'Images/objeto' + i + '.png';
        }
        // Crea los datos para la explicacion experto
        var explicacionPL1 = [];
        explicacionPL1[0] = 'Xol';
        explicacionPL1[1] = 'con un número impar de rayas verticales de color rojo';
        // explicacionPL1[1] = 'blancos';
        // explicacionPL1[2] = 'rojo';
        // explicacionPL1[3] = 'par';
        // explicacionPL1[4] = 'impar';

        // Creando datos para enviar al jugador DUP (player[1])
        // Aleatorizo la lista de indices
        var aPL2 = [];
        for (var i = 0; i < 10; i++) {
          aPL2.push(i);
        }
        var j, x, i;
        for (i = aPL2.length - 1; i > 0; i--) {
            j = Math.floor(Math.random() * (i + 1));
            x = aPL2[i];
            aPL2[i] = aPL2[j];
            aPL2[j] = x;
        }
        // console.log(a);
        // Creo la lista que identifica el tipo de objeto
        var tiposObjetosPL2 = [];
        tiposObjetosPL2[0] = 'Otro-R-G-VP-HI';
        tiposObjetosPL2[1] = 'Otro-R-B-VP-HI';
        tiposObjetosPL2[2] = 'Otro-A-B-VP-HI';
        tiposObjetosPL2[3] = 'Otro-A-G-VP-HI';
        tiposObjetosPL2[4] = 'Dup';
        tiposObjetosPL2[5] = 'Dup';
        tiposObjetosPL2[6] = 'Dup';
        tiposObjetosPL2[7] = 'Dup';
        tiposObjetosPL2[8] = 'Dup';
        tiposObjetosPL2[9] = 'Dup';

        // Creo la lista de source para las imagenes de los DUP...
        var srcImagenesPL2 = [];
        for (var i=7; i < 17; i++) {
          srcImagenesPL2[i - 7] = 'Images/objeto' + i + '.png';
        }
        // Crea los datos para la explicacion experto
        var explicacionPL2 = [];
        explicacionPL2[0] = 'Dup';
        explicacionPL2[1] = 'con fondo gris y un número par de rayas horizontales';
        // explicacionPL2[1] = 'grises';
        // explicacionPL2[2] = 'azul';
        // explicacionPL2[3] = 'par';
        // explicacionPL2[4] = 'par';

        // Envio los datos al primer jugador
        node.say('Settings',
                  players[0],
                  [players[1],
                      aPL1,
                      tiposObjetosPL1,
                      srcImagenesPL1,
                      explicacionPL1,
                      aPL2,
                      tiposObjetosPL2,
                      srcImagenesPL2,
                  ]);

        // Envio los datos al segundo jugador
        node.say('Settings',
                  players[1],
                  [players[0],
                      aPL2,
                      tiposObjetosPL2,
                      srcImagenesPL2,
                      explicacionPL2,
                      aPL1,
                      tiposObjetosPL1,
                      srcImagenesPL1,
                  ]);


    } // End function doMatch

};
