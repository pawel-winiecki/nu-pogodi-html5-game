"use strict";

var GameSpace = GameSpace || {};

(function() {
    window.onload = function() {

        GameSpace.game = new Phaser.Game(960, 640, Phaser.AUTO, 'board', null, true, true);
        
        GameSpace.game.state.add('Boot', GameSpace.BootState);
        GameSpace.game.state.add('Preload', GameSpace.PreloadState);
        GameSpace.game.state.add('Menu', GameSpace.MenuState);
        GameSpace.game.state.add('Game', GameSpace.GameState);

        GameSpace.game.state.start('Boot');

    };
})();

