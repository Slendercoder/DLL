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
            console.log('Instructions.');
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

        var cantidadTipo1= 16;
        var cantidadTipo2 = 4;

        //while (cantidadTipo1 == cantidadTipo2){
          //cantidadTipo1= Math.floor(Math.random()*10);
        //}

        node.say('Settings', players[0],
                 [players[1], cantidadTipo1, cantidadTipo2]);
        node.say('Settings', players[1],
                 [players[0], cantidadTipo2, cantidadTipo1]);
    }

};
