/**
 * # Game stages definition file
 * Copyright(c) 2017 Edgar Andrade-Lotero <edgar.andrade@urosario.edu.co>
 * MIT Licensed
 *
 * Stages are defined using the stager API
 *
 * http://www.nodegame.org
 * ---
 */

module.exports = function(stager, settings) {

     stager
        .next('instructions')
        .repeat('trials', settings.REPEAT)
        .next('debrief')
        .next('end')
        .gameover();

    // Modify the stager to skip one stage.
    // stager.skip('instructions');
    // stager.skip('trials');

    stager.extendStage('trials', {
      steps: [
        'game',
        'encuesta'
      ]
    });

    return stager.getState();
};
