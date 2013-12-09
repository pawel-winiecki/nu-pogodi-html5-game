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
        GameSpace.eggs = new Eggs();
        
        var newEggTimer = 0;
        var eggMoveTimer = 0;

        function preload() {

            //[<key>]
            var imagesData = [
                'hare',
                'wolf-left',
                'basket-left-up',
                'basket-left-down',
                'wolf-right',
                'basket-right-up',
                'basket-right-down',
                'egg-left-1',
                'egg-left-2',
                'egg-left-3',
                'egg-left-4',
                'egg-left-5',
                'egg-right-1',
                'egg-right-2',
                'egg-right-3',
                'egg-right-4',
                'egg-right-5',
                'button-left-down',
                'button-left-up',
                'button-right-down',
                'button-right-up'
            ];

            for (var i = 0; i < imagesData.length; i++) {
                game.load.image(imagesData[i], 'img/svg/' + imagesData[i] + '.svg');
            }

        }

        function create() {

            //[<key>,<image>,<posX>,<posY>]
            var spritesData = [
                ['hare', 'hare', 155, 72],
                ['wolf-left', 'wolf-left', 195, 122],
                ['basket-left-up', 'basket-left-up', 171, 128],
                ['basket-left-down', 'basket-left-down', 167, 163],
                ['wolf-right', 'wolf-right', 241, 123],
                ['basket-right-up', 'basket-right-up', 280, 130],
                ['basket-right-down', 'basket-right-down', 277, 163],
                ['egg-left-up-1', 'egg-left-1', 135, 113],
                ['egg-left-up-2', 'egg-left-2', 143, 119],
                ['egg-left-up-3', 'egg-left-3', 153, 122],
                ['egg-left-up-4', 'egg-left-4', 160, 128],
                ['egg-left-up-5', 'egg-left-5', 166, 135],
                ['egg-left-down-1', 'egg-left-1', 135, 149],
                ['egg-left-down-2', 'egg-left-2', 143, 156],
                ['egg-left-down-3', 'egg-left-3', 153, 158],
                ['egg-left-down-4', 'egg-left-4', 160, 166],
                ['egg-left-down-5', 'egg-left-5', 166, 171],
                ['egg-right-up-1', 'egg-right-1', 338, 114],
                ['egg-right-up-2', 'egg-right-2', 331, 117],
                ['egg-right-up-3', 'egg-right-3', 324, 121],
                ['egg-right-up-4', 'egg-right-4', 316, 125],
                ['egg-right-up-5', 'egg-right-5', 308, 131],
                ['egg-right-down-1', 'egg-right-1', 338, 150],
                ['egg-right-down-2', 'egg-right-2', 331, 154],
                ['egg-right-down-3', 'egg-right-3', 324, 157],
                ['egg-right-down-4', 'egg-right-4', 316, 161],
                ['egg-right-down-5', 'egg-right-5', 308, 167],
            ];

            for (var i = 0; i < spritesData.length; i++) {
                GameSpace.sprites[spritesData[i][0]] =
                        game.add.sprite(
                                spritesData[i][2] * GameSpace.scale,
                                spritesData[i][3] * GameSpace.scale,
                                spritesData[i][1]
                                );
                GameSpace.sprites[spritesData[i][0]].scale.setTo(GameSpace.scale, GameSpace.scale);
                GameSpace.sprites[spritesData[i][0]].kill();
            }
            
            var fontSize = GameSpace.scale * 16;

            var savedText = game.add.text(GameSpace.scale*300, GameSpace.scale*80, "0", {

                font: fontSize+"px lets_go_digitalregular",
                fill: "#000000",
                align: "center"
            });
            var brokenText = game.add.text(GameSpace.scale*300, GameSpace.scale*100, "0", {

                font: fontSize+"px lets_go_digitalregular",
                fill: "#da251d",
                align: "center"
            });
            
            GameSpace.score = new Score(savedText,brokenText);

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
            GameSpace.keys['LEFT'].onDown.add(GameSpace.wolf.moveWolfLeft, GameSpace.wolf);

            GameSpace.keys['RIGHT'] = game.input.keyboard.addKey(Phaser.Keyboard.RIGHT);
            GameSpace.keys['RIGHT'].onDown.add(GameSpace.wolf.moveWolfRight, GameSpace.wolf);

            GameSpace.keys['UP'] = game.input.keyboard.addKey(Phaser.Keyboard.UP);
            GameSpace.keys['UP'].onDown.add(GameSpace.wolf.moveBasketUp, GameSpace.wolf);

            GameSpace.keys['DOWN'] = game.input.keyboard.addKey(Phaser.Keyboard.DOWN);
            GameSpace.keys['DOWN'].onDown.add(GameSpace.wolf.moveBasketDown, GameSpace.wolf);

        }

        function update() {
            if (game.time.now > eggMoveTimer) {
                GameSpace.eggs.moveNextEgg();

                eggMoveTimer = game.time.now + 300;
            }

            if (game.time.now > newEggTimer) {

                var horizontal;

                if (Math.random() > 0.5) {
                    horizontal = 'left';
                } else {
                    horizontal = 'right';
                }

                var vertical;

                if (Math.random() > 0.5) {
                    vertical = 'up';
                } else {
                    vertical = 'down';
                }

//                var egg = new Egg(horizontal + '-' + vertical);
//                egg.move();
                GameSpace.eggs.add(new Egg(horizontal,vertical));
                newEggTimer = game.time.now + 1500;
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


