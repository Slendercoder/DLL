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
        .next('bienvenida')
        .next('instructions')
        .next('quiz')
        .gameover();

    // Modify the stager to skip one stage.
    // stager.skip('bienvenida');
    // stager.skip('instructions');
    //  stager.skip('quiz');

    return stager.getState();
};
