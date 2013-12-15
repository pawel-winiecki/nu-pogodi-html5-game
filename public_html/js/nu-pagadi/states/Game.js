/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
function GameState() {

    this.sprites = {};
    this.animations = new Array();
    this.audio = {};

    this.score = new Score(this);

    this.wolf = new Wolf(this);
    this.eggs = new Eggs(this);

    this.isHare = false;

    //[<key>,<image>,<posX>,<posY>]
    this.spritesData = [
        ['hare', 'hare', 155, 72],
        ['background', 'background', 0, 0],
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
        ['bird-life-1', 'bird-life', 300, 100],
        ['bird-life-2', 'bird-life', 275, 100],
        ['bird-life-3', 'bird-life', 250, 100],
        ['bell-0', 'bell-0', 199, 77],
        ['bell-1', 'bell-1', 199, 97],
        ['hare', 'hare', 157, 72]
    ];
}
;

GameState.prototype = {
    create: function() {
        this.eggs.clear();
        this.animations = new Array();
        
        var scale = GameSpace.scaler.spriteScale;

        for (var i = 0; i < this.spritesData.length; i++) {
                    //console.log(this.spritesData[i][0]);
            this.sprites[this.spritesData[i][0]] =
                    this.game.add.sprite(
                            this.spritesData[i][2] * scale,
                            this.spritesData[i][3] * scale,
                            this.spritesData[i][1]
                            );
            this.sprites[this.spritesData[i][0]].scale.setTo(scale, scale);
            this.sprites[this.spritesData[i][0]].kill();
        }
        
        //console.log('game: '+scale);

        var audioData = [
            'basket',
            'egg-crash',
            'egg-left-up',
            'egg-left-down',
            'egg-right-up',
            'egg-right-down'
        ];

        for (var i = 0; i < audioData.length; i++) {
            this.audio[audioData[i]] = this.game.add.audio(audioData[i]);
        }

        var fontSize = 16;

        var savedText = this.game.add.text(scale * 300, scale * 80, "0", {
            font: scale * fontSize + "px lets_go_digitalregular",
            fill: "#000000",
            align: "right"
        });

        this.score.savedText = savedText;

        this.score.resetScore();
        this.wolf.render();

        GameSpace.controls.prepareGameControls(this.wolf);

        //scaleGame();

        this.newEggTimer = this.game.time.now + 1000;
        this.eggMoveTimer = this.game.time.now + 1300;
        this.animationsTimer = this.game.time.now + 2500;
        this.hareShowTimer = this.game.time.now + 5000;

    },
    update: function() {
        if (this.game.time.now > this.newEggTimer) {
            var added = this.eggs.addNewEgg();
            this.newEggTimer = this.game.time.now + (2000 - this.score.level * 50) + ((added) ? this.eggs.length * (500 - this.score.level * 12) : 0);
            var add = this.newEggTimer - this.game.time.now;
            //console.log(added + ' ' + add);

        }

        if ((this.animations.length > 0)
                && (this.game.time.now > this.animationsTimer)) {
            for (var i = 0; i < this.animations.length; i++) {
                this.animations[i].move();

                this.animationsTimer = this.game.time.now + 600;
            }
        }


        if (this.game.time.now > this.eggMoveTimer) {

            var moved = this.eggs.moveNextEgg();
            this.eggMoveTimer = this.game.time.now + ((moved) ? ((1000 - this.score.level * 50) / this.eggs.length) : 0);

        }


        if (this.game.time.now > this.hareShowTimer) {

            this.animations.push(new Hare(this));
            this.hareShowTimer = this.game.time.now + 10000 + 10000 * (Math.random());

        }

    },
//    resize: function() {
//        for (var key in this.sprites) {
//            this.sprites[key].scale.setTo(scale,scale);
//        } 
//    }
    endGame: function() {
        this.newEggTimer = this.game.time.now + 10000;
        this.eggMoveTimer = this.game.time.now + 10000;
        this.birdMoveTimer = this.game.time.now + 10000;
        
//        for(var key in this.sprites) {
//            this.sprites[key].destroy();
//        }

        GameSpace.score = this.score.savedEggs;

        this.game.state.start('Menu');
    }
};


