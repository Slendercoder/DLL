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
        var players, len;
        // len = node.game.pl.size();
        // players = node.game.pl.shuffle().id.getAllKeys();

        players = node.game.pl.id.getAllKeys();

        console.log('Jugadores: ' + players)

        var x = Math.random();
        var Cantidades1, Cantidades2;

        if (x < 0.33333){
          Cantidades1 = [4, 12, 12, 'Circulo'];
          if (Math.random() < 0.5) {
            Cantidades2 = [12, 4, 12, 'Cuadrado'];
          } else {
            Cantidades2 = [12, 12, 4, 'Triangulo'];
          }
        } // Cierra if x < 0.33333
        else if (x < 0.66666) {
          Cantidades1 = [12, 4, 12, 'Cuadrado'];
          if(Math.random() < 0.5) {
            Cantidades2 = [4, 12, 12, 'Circulo'];
          } else {
            Cantidades2 = [12, 12, 4, 'Triangulo'];
          }
        } // Cierra else if x < 0.66666
        else {
          Cantidades1 = [12, 12, 4, 'Triangulo'];
          if(Math.random() < 0.5) {
            Cantidades2 = [4, 12, 12, 'Circulo'];
          } else {
            Cantidades2 = [12, 4, 12, 'Cuadrado'];
          }
        } // cierra el else

        node.say('Settings', players[0], [players[1], Cantidades1]);
        node.say('Settings', players[1], [players[0], Cantidades2]);
    }

};
