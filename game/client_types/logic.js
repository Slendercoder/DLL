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

    stager.extendStep('instructions', {
        cb: function() {
            console.log('Instructions...');
        }
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
        //       colorRayas = Rojo;

        // Creando datos para enviar al jugador XOL (player[0])
        // Aleatorizo la lista de indices
        var a = [];
        for (var i = 0; i < 20; i++) {
          a.push(i);
        }
        // console.log(a);
        var j, x, i;
        for (i = a.length - 1; i > 0; i--) {
            j = Math.floor(Math.random() * (i + 1));
            x = a[i];
            a[i] = a[j];
            a[j] = x;
        }
        // Creo la lista que identifica el tipo de objeto
        var tiposObjetos = [];
        tiposObjetos[0] = 'Xol';
        tiposObjetos[1] = 'Xol';
        tiposObjetos[2] = 'Xol';
        tiposObjetos[3] = 'Xol';
        tiposObjetos[4] = 'Xol';
        tiposObjetos[5] = 'Dup';
        for (var i=6; i < 20; i++) {
          tiposObjetos[i] = 'Otro';
        }
        // console.log(tiposObjetos);

        // Creo la lista de source para las imagenes de los XOL...
        var srcImagenes = [];
        srcImagenes[0] = 'Images/objeto' + 1 + '.png';
        srcImagenes[1] = 'Images/objeto' + 2 + '.png';
        srcImagenes[2] = 'Images/objeto' + 3 + '.png';
        srcImagenes[3] = 'Images/objeto' + 4 + '.png';
        srcImagenes[4] = 'Images/objeto' + 5 + '.png';
        srcImagenes[5] = 'Images/objeto' + 6 + '.png'; // Este es un DUP

        // ... y de los demás objetos
        for (var i=11; i < 25; i++) {
          srcImagenes[i-5] = 'Images/objeto' + i + '.png';
        }

        // Crea los datos para la explicacion experto
        var explicacion = [];
        explicacion[0] = 'Xol';
        explicacion[1] = 'blancos';
        explicacion[2] = 'rojo';
        explicacion[3] = 'par';
        explicacion[4] = 'impar';

        // Envio los datos al primer jugador
        node.say('Settings', players[0], [players[1], a, tiposObjetos, srcImagenes, explicacion]);

        // Aleatorizo de nuevo la lista de indices
        for (i = a.length - 1; i > 0; i--) {
            j = Math.floor(Math.random() * (i + 1));
            x = a[i];
            a[i] = a[j];
            a[j] = x;
        }
        // Creo la lista que identifica el tipo de objeto
        var tiposObjetos = [];
        tiposObjetos[0] = 'Dup';
        tiposObjetos[1] = 'Dup';
        tiposObjetos[2] = 'Dup';
        tiposObjetos[3] = 'Dup';
        tiposObjetos[4] = 'Dup';
        tiposObjetos[5] = 'Xol';
        for (var i=6; i < 20; i++) {
          tiposObjetos[i] = 'Otro';
        }

        // Creo la lista de source para las imagenes de los DUP...
        var srcImagenes = [];
        srcImagenes[0] = 'Images/objeto' + 6 + '.png';
        srcImagenes[1] = 'Images/objeto' + 7 + '.png';
        srcImagenes[2] = 'Images/objeto' + 8 + '.png';
        srcImagenes[3] = 'Images/objeto' + 9 + '.png';
        srcImagenes[4] = 'Images/objeto' + 10 + '.png';
        srcImagenes[5] = 'Images/objeto' + 1 + '.png'; // Este es un XOL

        // ... y de los demás objetos
        for (var i=11; i < 25; i++) {
          srcImagenes[i-5] = 'Images/objeto' + i + '.png';
        }

        // Crea los datos para la explicacion experto
        var explicacion = [];
        explicacion[0] = 'Dup';
        explicacion[1] = 'grises';
        explicacion[2] = 'rojo';
        explicacion[3] = 'impar';
        explicacion[4] = 'par';

        // Envio los datos al segundo jugador
        node.say('Settings', players[1], [players[0], a, tiposObjetos, srcImagenes, explicacion]);

    } // End function doMatch

};
