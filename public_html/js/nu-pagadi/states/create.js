/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
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
        ['bird-left-1', 'bird-left-1', 164, 203],
        ['bird-left-2', 'bird-left-2', 160, 186],
        ['bird-left-3', 'bird-left-3', 152, 197],
        ['bird-left-4', 'bird-left-4', 140, 197],
        ['bird-left-5', 'bird-left-5', 126, 197],
        ['bird-right-1', 'bird-right-1', 276, 200],
        ['bird-right-2', 'bird-right-2', 309, 187],
        ['bird-right-3', 'bird-right-3', 324, 194],
        ['bird-right-4', 'bird-right-4', 333, 196],
        ['bird-right-5', 'bird-right-5', 349, 196],
    ];

    for (var i = 0; i < spritesData.length; i++) {
        GameSpace.sprites[spritesData[i][0]] =
                GameSpace.game.add.sprite(
                        spritesData[i][2] * GameSpace.scale,
                        spritesData[i][3] * GameSpace.scale,
                        spritesData[i][1]
                        );
        GameSpace.sprites[spritesData[i][0]].scale.setTo(GameSpace.scale, GameSpace.scale);
        GameSpace.sprites[spritesData[i][0]].kill();
    }

    var fontSize = GameSpace.scale * 16;

    var savedText = GameSpace.game.add.text(GameSpace.scale * 300, GameSpace.scale * 80, "0", {
        font: fontSize + "px lets_go_digitalregular",
        fill: "#000000",
        align: "right"
    });
    var brokenText = GameSpace.game.add.text(GameSpace.scale * 300, GameSpace.scale * 100, "0", {
        font: fontSize + "px lets_go_digitalregular",
        fill: "#da251d",
        align: "right"
    });

    GameSpace.score = new Score(savedText, brokenText);

    GameSpace.wolf.render();

    GameSpace.buttons['left-down'] = GameSpace.game.add.button(38 * GameSpace.scale, 234 * GameSpace.scale, 'button-left-down', actionButtonLeftDown, this);
    GameSpace.buttons['left-down'].scale.setTo(GameSpace.scale, GameSpace.scale);
    GameSpace.buttons['left-up'] = GameSpace.game.add.button(38 * GameSpace.scale, 178 * GameSpace.scale, 'button-left-up', actionButtonLeftUp, this);
    GameSpace.buttons['left-up'].scale.setTo(GameSpace.scale, GameSpace.scale);
    GameSpace.buttons['right-down'] = GameSpace.game.add.button(401 * GameSpace.scale, 234 * GameSpace.scale, 'button-right-down', actionButtonRightDown, this);
    GameSpace.buttons['right-down'].scale.setTo(GameSpace.scale, GameSpace.scale);
    GameSpace.buttons['right-up'] = GameSpace.game.add.button(401 * GameSpace.scale, 178 * GameSpace.scale, 'button-right-up', actionButtonRightUp, this);
    GameSpace.buttons['right-up'].scale.setTo(GameSpace.scale, GameSpace.scale);

    GameSpace.keys['LEFT'] = GameSpace.game.input.keyboard.addKey(Phaser.Keyboard.LEFT);
    GameSpace.keys['LEFT'].onDown.add(GameSpace.wolf.moveWolfLeft, GameSpace.wolf);

    GameSpace.keys['RIGHT'] = GameSpace.game.input.keyboard.addKey(Phaser.Keyboard.RIGHT);
    GameSpace.keys['RIGHT'].onDown.add(GameSpace.wolf.moveWolfRight, GameSpace.wolf);

    GameSpace.keys['UP'] = GameSpace.game.input.keyboard.addKey(Phaser.Keyboard.UP);
    GameSpace.keys['UP'].onDown.add(GameSpace.wolf.moveBasketUp, GameSpace.wolf);

    GameSpace.keys['DOWN'] = GameSpace.game.input.keyboard.addKey(Phaser.Keyboard.DOWN);
    GameSpace.keys['DOWN'].onDown.add(GameSpace.wolf.moveBasketDown, GameSpace.wolf);

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

