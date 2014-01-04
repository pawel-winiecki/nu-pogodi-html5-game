/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

var GameSpace = GameSpace || {};

GameSpace.GameState = function () {

    this.sprites = {};
    this.animations = new Array();
    this.audio = {};

    this.score = new GameSpace.Score(this);

    this.wolf = new GameSpace.Wolf(this);
    this.eggs = new GameSpace.Eggs(this);

    this.isHare = false;

    //[<key>,<image>,<posX>,<posY>]
    this.spritesData = [
        ['wolf-left', 'wolf-left', 390, 264],
        ['basket-left-up', 'basket-left-up', 342, 276],
        ['basket-left-down', 'basket-left-down', 334, 346],
        ['wolf-right', 'wolf-right', 482, 266],
        ['basket-right-up', 'basket-right-up', 560, 280],
        ['basket-right-down', 'basket-right-down', 554, 346],
        ['egg-left-up-1', 'egg-left-1', 270, 246],
        ['egg-left-up-2', 'egg-left-2', 286, 258],
        ['egg-left-up-3', 'egg-left-3', 306, 264],
        ['egg-left-up-4', 'egg-left-4', 320, 276],
        ['egg-left-up-5', 'egg-left-5', 332, 290],
        ['egg-left-down-1', 'egg-left-1', 270, 318],
        ['egg-left-down-2', 'egg-left-2', 286, 332],
        ['egg-left-down-3', 'egg-left-3', 306, 336],
        ['egg-left-down-4', 'egg-left-4', 320, 352],
        ['egg-left-down-5', 'egg-left-5', 332, 362],
        ['egg-right-up-1', 'egg-right-1', 676, 248],
        ['egg-right-up-2', 'egg-right-2', 662, 254],
        ['egg-right-up-3', 'egg-right-3', 648, 262],
        ['egg-right-up-4', 'egg-right-4', 632, 270],
        ['egg-right-up-5', 'egg-right-5', 616, 282],
        ['egg-right-down-1', 'egg-right-1', 676, 320],
        ['egg-right-down-2', 'egg-right-2', 662, 328],
        ['egg-right-down-3', 'egg-right-3', 648, 334],
        ['egg-right-down-4', 'egg-right-4', 632, 342],
        ['egg-right-down-5', 'egg-right-5', 616, 354],
        ['bird-left-1', 'bird-left-1', 328, 426],
        ['bird-left-2', 'bird-left-2', 320, 392],
        ['bird-left-3', 'bird-left-3', 304, 414],
        ['bird-left-4', 'bird-left-4', 280, 414],
        ['bird-left-5', 'bird-left-5', 252, 414],
        ['bird-right-1', 'bird-right-1', 552, 420],
        ['bird-right-2', 'bird-right-2', 618, 394],
        ['bird-right-3', 'bird-right-3', 648, 408],
        ['bird-right-4', 'bird-right-4', 333, 412],
        ['bird-right-5', 'bird-right-5', 698, 412],
        ['bird-life-1', 'bird-life', 600, 220],
        ['bird-life-2', 'bird-life', 550, 220],
        ['bird-life-3', 'bird-life', 500, 220],
        ['bell-0', 'bell-0', 398, 174],
        ['bell-1', 'bell-1', 398, 214],
        ['hare', 'hare', 314, 164]
    ];
};

GameSpace.GameState.prototype = {
    create: function() {
        this.eggs.clear();
        this.animations = new Array();
        
        //var scale = 1; //GameSpace.scaler.spriteScale;

        for (var i = 0; i < this.spritesData.length; i++) {
                    //console.log(this.spritesData[i][0]);
            this.sprites[this.spritesData[i][0]] =
                    this.game.add.sprite(
                            this.spritesData[i][2],
                            this.spritesData[i][3],
                            this.spritesData[i][1]
                            );
            //this.sprites[this.spritesData[i][0]].scale.setTo(scale, scale);
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

        var fontSize = 36;

        var savedText = this.game.add.text(600, 180, "0", {
            font: fontSize + "px lets_go_digitalregular",
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

            this.animations.push(new GameSpace.Hare(this));
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


