GameSpace = {};

(function() {
    window.onload = function() {

        if (($(window).width() / $(window).height()) > 1.6) {
            GameSpace.scale = $(window).height() / 300;
        } else {
            GameSpace.scale = $(window).width() / 480;
        }

        GameSpace.game = new Phaser.Game(GameSpace.scale * 480, GameSpace.scale * 300, Phaser.AUTO, 'board', {preload: preload, create: create, update: update}, true, false);

        GameSpace.sprites = new Array();
        GameSpace.keys = new Array();
        GameSpace.buttons = new Array();
        GameSpace.wolf = new Wolf();
        GameSpace.eggs = new Eggs();
        GameSpace.birds = new Array();
        
        GameSpace.newEggTimer = 2000;
        GameSpace.eggMoveTimer = 2000;
        GameSpace.birdMoveTimer = 3500;
    };
})();


