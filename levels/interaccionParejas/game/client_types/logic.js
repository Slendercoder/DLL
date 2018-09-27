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
          console.log('Debrief...');
        }
    });

    stager.extendStep('end', {
        cb: function() {
            node.game.memory.save(channel.getGameDir() + 'data/data_' +
                                  node.nodename + '.json');
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

        // Xol = tipoPoligono: Blanco;
        //       paridadHorizontales: Impar;
        //       paridadVerticales: Par;
        //       colorRayas = Rojo;
        //
        // Dup = tipoPoligono: Gris;
        //       paridadHorizontales: Par;
        //       paridadVerticales: Impar;
        //       colorRayas = Azul;

        // Creando datos para enviar al jugador XOL (player[0])
        // Aleatorizo la lista de indices
        var aPL1 = [];
        for (var i = 0; i < 20; i++) {
          aPL1.push(i);
        }
        // console.log(a);
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
        tiposObjetosPL1[6] = 'Xol';
        tiposObjetosPL1[7] = 'Xol';
        tiposObjetosPL1[8] = 'Dup';
        for (var i=9; i < 20; i++) {
          tiposObjetosPL1[i] = 'Otro';
        }
        // console.log(tiposObjetos);
        // Creo la lista de source para las imagenes de los XOL...
        var srcImagenesPL1 = [];
        srcImagenesPL1[0] = 'Images/objeto' + 1 + '.png';
        srcImagenesPL1[1] = 'Images/objeto' + 2 + '.png';
        srcImagenesPL1[2] = 'Images/objeto' + 3 + '.png';
        srcImagenesPL1[3] = 'Images/objeto' + 4 + '.png';
        srcImagenesPL1[4] = 'Images/objeto' + 5 + '.png';
        srcImagenesPL1[5] = 'Images/objeto' + 6 + '.png';
        srcImagenesPL1[6] = 'Images/objeto' + 7 + '.png';
        srcImagenesPL1[7] = 'Images/objeto' + 8 + '.png';
        srcImagenesPL1[8] = 'Images/objeto' + 9 + '.png';  // Este es un DUP
        // ... y de los demás objetos
        for (var i=20; i < 31; i++) {
          srcImagenesPL1[i-11] = 'Images/objeto' + i + '.png';
        }
        // Crea los datos para la explicacion experto
        var explicacionPL1 = [];
        explicacionPL1[0] = 'Xol';
        explicacionPL1[1] = 'blancos';
        explicacionPL1[2] = 'rojo';
        explicacionPL1[3] = 'par';
        explicacionPL1[4] = 'impar';

        // Creando datos para enviar al jugador DUP (player[1])
        // Aleatorizo la lista de indices
        var aPL2 = [];
        for (var i = 0; i < 20; i++) {
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
        tiposObjetosPL2[0] = 'Dup';
        tiposObjetosPL2[1] = 'Dup';
        tiposObjetosPL2[2] = 'Dup';
        tiposObjetosPL2[3] = 'Dup';
        tiposObjetosPL2[4] = 'Dup';
        tiposObjetosPL2[5] = 'Dup';
        tiposObjetosPL2[6] = 'Dup';
        tiposObjetosPL2[7] = 'Dup';
        tiposObjetosPL2[8] = 'Xol';
        for (var i=9; i < 20; i++) {
          tiposObjetosPL2[i] = 'Otro';
        }
        // Creo la lista de source para las imagenes de los DUP...
        var srcImagenesPL2 = [];
        srcImagenesPL2[0] = 'Images/objeto' + 9 + '.png';
        srcImagenesPL2[1] = 'Images/objeto' + 10 + '.png';
        srcImagenesPL2[2] = 'Images/objeto' + 11 + '.png';
        srcImagenesPL2[3] = 'Images/objeto' + 12 + '.png';
        srcImagenesPL2[4] = 'Images/objeto' + 13 + '.png';
        srcImagenesPL2[5] = 'Images/objeto' + 14 + '.png';
        srcImagenesPL2[6] = 'Images/objeto' + 15 + '.png';
        srcImagenesPL2[7] = 'Images/objeto' + 16 + '.png';
        srcImagenesPL2[8] = 'Images/objeto' + 1 + '.png'; // Este es un XOL
        // ... y de los demás objetos
        for (var i=17; i < 28; i++) {
          srcImagenesPL2[i-9] = 'Images/objeto' + i + '.png';
        }
        // Crea los datos para la explicacion experto
        var explicacionPL2 = [];
        explicacionPL2[0] = 'Dup';
        explicacionPL2[1] = 'grises';
        explicacionPL2[2] = 'azul';
        explicacionPL2[3] = 'par';
        explicacionPL2[4] = 'par';

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
