GameSpace = {};

(function() {
    window.onload = function() {

        GameSpace.scaler = new Scaler();
        GameSpace.scaler.calcScale();

        GameSpace.game = new Phaser.Game(480 * GameSpace.scaler.scale, 300 * GameSpace.scaler.scale, Phaser.AUTO, 'board', null, true, true);

        GameSpace.game.state.add('Preload', GameSpace.PreloadState);
        GameSpace.game.state.add('Menu', GameSpace.MenuState);
        GameSpace.game.state.add('Game', new GameState);

        GameSpace.game.state.start('Preload');

        window.onresize = function() {
            GameSpace.scaler.scaleGame();           
        };

    };
})();

