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

      // Additional debug information while developing the game.
      // this.debugInfo = node.widgets.append('DebugInfo', header)
    });

    stager.extendStep('bienvenida', {
      frame: 'Bienvenido.htm',
      cb: function(){
        var numUsuario = node.player.id;
        console.log('Número de usuario: ', numUsuario);
        W.setInnerHTML('numUsuario', numUsuario);
        var continuar = W.getElementById('continuar');
        continuar.onclick = function() { node.done(); };
      }
    });

    stager.extendStep('instructions', {
      frame: 'instructions-v2.htm',
      cb: function(){
        var sett, continuar;
        sett = node.game.settings;
        W.setInnerHTML('rounds', sett.REPEAT);
        continuar = W.getElementById('continuar');
        continuar.onclick = function() { node.done(); };
      }
    });

    stager.extendStep('quiz', {
      frame: 'quiz.htm',
      done: function() {
            node.say('quiz-over');
        },
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
                  // node.done(answers);
                  node.done();
              }
          });
          console.log('Quiz');
          }
      });

    game = setup;
    game.plot = stager.getState();
    return game;
  };
