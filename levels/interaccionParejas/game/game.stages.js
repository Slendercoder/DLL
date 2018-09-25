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
        .repeat('trials', settings.REPEAT)
        .next('encuesta')
        .next('debrief')
        .next('demograf')
        .next('end')
        .gameover();

    stager.extendStage('trials', {
      steps: [
        'game',
        'puntaje'
      ]
    });

    // Modify the stager to skip one stage.
    // stager.skip('trials');
    // stager.skip('debrief');
    // stager.skip('encuesta');
    // stager.skip('demograf');

    return stager.getState();
};
