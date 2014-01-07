/* 
 * @projectDescription NuPogodi HTML5 Game
 *
 * @version 0.0.1
 * @author Paweł Winiecki <pawel.winiecki@nerdlab.pl>
 * @copyright 2014 NerdLab.pl
 * @license MIT License
 * 
 */

var NuPogodi = NuPogodi || {};

(function() {
    "use strict";
    
    window.onload = function() {

        // Creating Phaser Game object
        NuPogodi.game = new Phaser.Game(960, 640, Phaser.AUTO, 'board', null, true, true);

        // Adding States to Game
        NuPogodi.game.state.add('Boot', NuPogodi.BootState);
        NuPogodi.game.state.add('Preload', NuPogodi.PreloadState);
        NuPogodi.game.state.add('Menu', NuPogodi.MenuState);
        NuPogodi.game.state.add('Game', NuPogodi.GameState);

        // Starting whole game with Boot State
        NuPogodi.game.state.start('Boot');

    };
})();

