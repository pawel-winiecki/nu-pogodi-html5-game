GameSpace = {};

(function() {
    window.onload = function() {

        if (($(window).width() / $(window).height()) > 1.6) {
            GameSpace.scale = $(window).height() / 300;
        } else {
            GameSpace.scale = $(window).width() / 480;
        }

        var game = new Phaser.Game(GameSpace.scale * 480, GameSpace.scale * 300, Phaser.AUTO, 'board', {preload: preload, create: create, update: update}, true, false);

        GameSpace.sprites = new Array();
        GameSpace.keys = new Array();
        GameSpace.buttons = new Array();
        GameSpace.wolf = new Wolf();
        GameSpace.eggs = Array();

        var newEggTimer = 0;
        var eggMoveTimer = 0;

        //[<key>,<posX>,<posY>]
        var imagesData = [
            ['hare', 155, 72],
            ['wolf-left', 195, 122],
            ['basket-left-up', 171, 128],
            ['basket-left-down', 167, 163],
            ['wolf-right', 241, 123],
            ['basket-right-up', 280, 130],
            ['basket-right-down', 277, 163],
            ['egg-left-up-1', 135, 113],
            ['egg-left-up-2', 143, 119],
            ['egg-left-up-3', 153, 122],
            ['egg-left-up-4', 160, 128],
            ['egg-left-up-5', 166, 135],
            ['egg-left-down-1', 135, 148],
            ['egg-left-down-2', 143, 119],
            ['egg-left-down-3', 153, 122],
            ['egg-left-down-4', 160, 128],
            ['egg-left-down-5', 166, 135],
            ['egg-right-up-1', 135, 113],
            ['egg-right-up-2', 143, 119],
            ['egg-right-up-3', 153, 122],
            ['egg-right-up-4', 160, 128],
            ['egg-right-up-5', 166, 135],
            ['egg-right-down-1', 135, 113],
            ['egg-right-down-2', 143, 119],
            ['egg-right-down-3', 153, 122],
            ['egg-right-down-4', 160, 128],
            ['egg-right-down-5', 166, 135],
            ['button-left-down', 38, 234],
            ['button-left-up', 38, 178],
            ['button-right-down', 401, 234],
            ['button-right-up', 401, 178]
        ];

        function preload() {

            for (var i = 0; i < imagesData.length; i++) {
                game.load.image(imagesData[i][0], 'img/svg/' + imagesData[i][0] + '.svg');
            }

        }

        function create() {

            for (var i = 0; i < spritesData.length - 4; i++) {
                GameSpace.sprites[spritesData[i][0]] =
                        game.add.sprite(
                                spritesData[i][1] * GameSpace.scale,
                                spritesData[i][2] * GameSpace.scale,
                                spritesData[i][0]
                                );
                GameSpace.sprites[spritesData[i][0]].scale.setTo(GameSpace.scale, GameSpace.scale);
                GameSpace.sprites[spritesData[i][0]].kill();
            }

            spritesData = null;

            GameSpace.wolf.render();

            GameSpace.buttons['left-down'] = game.add.button(38 * GameSpace.scale, 234 * GameSpace.scale, 'button-left-down', actionButtonLeftDown, this);
            GameSpace.buttons['left-down'].scale.setTo(GameSpace.scale, GameSpace.scale);
            GameSpace.buttons['left-up'] = game.add.button(38 * GameSpace.scale, 178 * GameSpace.scale, 'button-left-up', actionButtonLeftUp, this);
            GameSpace.buttons['left-up'].scale.setTo(GameSpace.scale, GameSpace.scale);
            GameSpace.buttons['right-down'] = game.add.button(401 * GameSpace.scale, 234 * GameSpace.scale, 'button-right-down', actionButtonRightDown, this);
            GameSpace.buttons['right-down'].scale.setTo(GameSpace.scale, GameSpace.scale);
            GameSpace.buttons['right-up'] = game.add.button(401 * GameSpace.scale, 178 * GameSpace.scale, 'button-right-up', actionButtonRightUp, this);
            GameSpace.buttons['right-up'].scale.setTo(GameSpace.scale, GameSpace.scale);

            GameSpace.keys['LEFT'] = game.input.keyboard.addKey(Phaser.Keyboard.LEFT);
            GameSpace.keys['LEFT'].onDown.add(GameSpace.wolf.moveWolfLeft, this);

            GameSpace.keys['RIGHT'] = game.input.keyboard.addKey(Phaser.Keyboard.RIGHT);
            GameSpace.keys['RIGHT'].onDown.add(GameSpace.wolf.moveWolfRight, this);

            GameSpace.keys['UP'] = game.input.keyboard.addKey(Phaser.Keyboard.UP);
            GameSpace.keys['UP'].onDown.add(GameSpace.wolf.moveBasketUp, this);

            GameSpace.keys['DOWN'] = game.input.keyboard.addKey(Phaser.Keyboard.DOWN);
            GameSpace.keys['DOWN'].onDown.add(GameSpace.wolf.moveBasketDown, this);

        }

        function update() {
            if (game.time.now > eggMoveTimer) {
                for (var i = 0; i < GameSpace.eggs.length; i++) {
                    GameSpace.eggs[i].move();
                }
                
                eggMoveTimer = game.time.now + 1000;
            }

            if (game.time.now > newEggTimer) {
                GameSpace.eggs.push(new Egg('left-up'));
                newEggTimer = game.time.now + 6000;
            }
        }

        function actionButtonLeftDown() {
            GameSpace.wolf.moveWolfLeft();
            GameSpace.wolf.moveBasketDown();
        }

        function actionButtonLeftUp() {
            GameSpace.wolf.moveWolfLeft();
            GameSpace.wolf.moveBasketUp();
        }

        function actionButtonRightDown() {
            GameSpace.wolf.moveWolfRight();
            GameSpace.wolf.moveBasketDown();
        }

        function actionButtonRightUp() {
            GameSpace.wolf.moveWolfRight();
            GameSpace.wolf.moveBasketUp();
        }

    };
})();


