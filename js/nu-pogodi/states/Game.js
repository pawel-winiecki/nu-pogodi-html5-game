/**
 * @author Paweł Winiecki <pawel.winiecki@nerdlab.pl>
 * @copyright 2014 NerdLab.pl
 * @license MIT License
 */

var NuPogodi = NuPogodi || {};

/**
 * PreloadState constructor
 *
 * @class NuPogodi.GameState
 * @constructor
 * @see Phaser.State
 */
NuPogodi.GameState = function() {
    'use strict';

    /**
     * @property {object} audio - simple key-value container for Phaser.Sound objects.
     * @default
     */
    this.audio = {};

    /**
     * @property {object} sprites - simple key-value container for Phaser.Sprite objects.
     * @default
     */
    this.sprites = {};

    /**
     * @property {Array} animations - array of 'animation' objects.
     * @default
     */
    this.animations = new Array();

    /**
     * @property {NuPogodi.Score} score - score of actual game.
     * @default
     */
    this.score = new NuPogodi.Score(this);

    /**
     * @property {NuPogodi.Wolf} wolf - object handlig wolf on screen.
     * @default
     */
    this.wolf = new NuPogodi.Wolf(this);

    /**
     * @property {NuPogodi.Eggs} eggs - container of eggs.
     * @default
     */
    this.eggs = new NuPogodi.Eggs(this);

    /**
     * @property {number} newEggTimer - timer of adding new egg.
     * @default
     */
    this.newEggTimer = 0;

    /**
     * @property {number} eggMoveTimer - timer of moving next egg.
     * @default
     */
    this.eggMoveTimer = 0;

    /**
     * @property {number} animationsTimer - timer of moving all 'animations'.
     * @default
     */
    this.animationsTimer = 0;

    /**
     * @property {number} hareShowTimer - timer of showing hare on screen.
     * @default
     */
    this.hareShowTimer = 0;

    /**
     * @property {boolean} isHare - true if hare is shown on screen otherwise is false.
     * @default
     */
    this.isHare = false;

};

NuPogodi.GameState.prototype = {
    /**
     * Setup operations for Game state
     * 
     * @method NuPogodi.GameState#create 
     * @see Phaser.State#create
     */
    create: function() {
        // clearing data
        this.eggs.clear();
        this.animations = new Array();

        // array of data to create sprites
        //[<key>,<image>,<posX>,<posY>]
        var spritesData = [
            ['wolf-left', 'wolf-left', 390, 264],
            ['basket-left-up', 'basket-left-up', 342, 276],
            ['basket-left-down', 'basket-left-down', 335, 347],
            ['wolf-right', 'wolf-right', 482, 266],
            ['basket-right-up', 'basket-right-up', 560, 280],
            ['basket-right-down', 'basket-right-down', 554, 346],
            ['egg-left-up-1', 'egg-left-1', 276, 246],
            ['egg-left-up-2', 'egg-left-2', 287, 257],
            ['egg-left-up-3', 'egg-left-3', 307, 263],
            ['egg-left-up-4', 'egg-left-4', 320, 270],
            ['egg-left-up-5', 'egg-left-5', 333, 288],
            ['egg-left-down-1', 'egg-left-1', 271, 317],
            ['egg-left-down-2', 'egg-left-2', 286, 332],
            ['egg-left-down-3', 'egg-left-3', 306, 339],
            ['egg-left-down-4', 'egg-left-4', 319, 350],
            ['egg-left-down-5', 'egg-left-5', 332, 362],
            ['egg-right-up-1', 'egg-right-1', 676, 248],
            ['egg-right-up-2', 'egg-right-2', 662, 254],
            ['egg-right-up-3', 'egg-right-3', 648, 262],
            ['egg-right-up-4', 'egg-right-4', 630, 273],
            ['egg-right-up-5', 'egg-right-5', 616, 282],
            ['egg-right-down-1', 'egg-right-1', 676, 320],
            ['egg-right-down-2', 'egg-right-2', 663, 332],
            ['egg-right-down-3', 'egg-right-3', 649, 335],
            ['egg-right-down-4', 'egg-right-4', 632, 347],
            ['egg-right-down-5', 'egg-right-5', 618, 357],
            ['bird-left-1', 'bird-left-1', 328, 426],
            ['bird-left-2', 'bird-left-2', 320, 392],
            ['bird-left-3', 'bird-left-3', 304, 414],
            ['bird-left-4', 'bird-left-4', 280, 414],
            ['bird-left-5', 'bird-left-5', 252, 414],
            ['bird-right-1', 'bird-right-1', 552, 420],
            ['bird-right-2', 'bird-right-2', 618, 394],
            ['bird-right-3', 'bird-right-3', 648, 410],
            ['bird-right-4', 'bird-right-4', 666, 414],
            ['bird-right-5', 'bird-right-5', 698, 414],
            ['bird-life-1', 'bird-life', 600, 220],
            ['bird-life-2', 'bird-life', 550, 220],
            ['bird-life-3', 'bird-life', 500, 220],
            ['bell-0', 'bell-0', 398, 174],
            ['bell-1', 'bell-1', 398, 214],
            ['hare', 'hare', 313, 165]
        ];

        // adding all sprites using in game
        for (var i = 0; i < spritesData.length; i++) {
            this.sprites[spritesData[i][0]] =
                    this.game.add.sprite(
                            spritesData[i][2],
                            spritesData[i][3],
                            spritesData[i][1]
                            );
            // All are killed. We refresh them during the game.
            this.sprites[spritesData[i][0]].kill();
        }

        var audioData = [
            'basket',
            'egg-crash',
            'egg-left-up',
            'egg-left-down',
            'egg-right-up',
            'egg-right-down'
        ];

        // adding all sounds using in game
        for (var i = 0; i < audioData.length; i++) {
            this.audio[audioData[i]] = this.game.add.audio(audioData[i]);
        }

        // adding text showing actual score
        this.score.savedText = this.game.add.text(600, 180, "0", {
            font: "36px lets_go_digitalregular",
            fill: "#000000",
            align: "right"
        });
        this.score.resetScore();

        this.wolf.render();

        var left = this.game.input.keyboard.addKey(Phaser.Keyboard.LEFT);
        var right = this.game.input.keyboard.addKey(Phaser.Keyboard.RIGHT);
        var up = this.game.input.keyboard.addKey(Phaser.Keyboard.UP);
        var down = this.game.input.keyboard.addKey(Phaser.Keyboard.DOWN);

        left.onDown.add(this.wolf.moveWolfLeft, this.wolf);
        right.onDown.add(this.wolf.moveWolfRight, this.wolf);
        up.onDown.add(this.wolf.moveBasketUp, this.wolf);
        down.onDown.add(this.wolf.moveBasketDown, this.wolf);

        this.game.add.button(60, 472, 'button-left-down', this.actionButtonLeftDown, this);
        this.game.add.button(60, 360, 'button-left-up', this.actionButtonLeftUp, this);
        this.game.add.button(786, 472, 'button-right-down', this.actionButtonRightDown, this);
        this.game.add.button(786, 360, 'button-right-up', this.actionButtonRightUp, this);

        // setting timers for begin the game
        this.newEggTimer = this.game.time.now + 1000;
        this.eggMoveTimer = this.game.time.now + 1300;
        this.animationsTimer = this.game.time.now + 2500;
        this.hareShowTimer = this.game.time.now + 5000;

    },
    /**
     * Setup operations for Game state
     * 
     * @method NuPogodi.GameState#update
     * @see Phaser.State#update
     */
    update: function() {
        if (this.game.time.now > this.newEggTimer) {
            var added = this.eggs.addNewEgg();
            var factor = this.factor();
            this.newEggTimer = this.game.time.now
                    + (1250 - (1250 * factor))
                    + ((added) ? this.eggs.length * (250 - (250 * factor)) : 0);
        }

        if (this.game.time.now > this.eggMoveTimer) {
            console.log('saved eggs: '+this.score.savedEggs);
            var moved = this.eggs.moveNextEgg();
            this.eggMoveTimer = this.game.time.now
                    + ((moved) ? ((1000 - (1000 * this.factor())) / this.eggs.length + 1) : 0);
            console.log('saved eggs: '+this.score.savedEggs)
            console.log('moved: '+moved);
        }


        if ((this.animations.length > 0)
                && (this.game.time.now > this.animationsTimer)) {
            for (var i = 0; i < this.animations.length; i++) {
                this.animations[i].move();
                this.animationsTimer = this.game.time.now + 600;
            }
        }

        if (this.game.time.now > this.hareShowTimer) {

            this.animations.push(new NuPogodi.Hare(this));
            this.hareShowTimer = this.game.time.now + 15000 + 10000 * (Math.random());

        }

    },
    /**
     * Function for end game and start menu state.
     * 
     * @method NuPogodi.GameState#endGame
     */
    endGame: function() {
        // it's clear all keyboards actions before change state
        this.game.input.keyboard.clearCaptures()

        // setting timers to avoid problems in another game
        this.newEggTimer = this.game.time.now + 10000;
        this.eggMoveTimer = this.game.time.now + 10000;
        this.birdMoveTimer = this.game.time.now + 10000;

        // score for display in MenuState
        NuPogodi.score = this.score.savedEggs;

        this.game.state.start('Menu');
    },
    /**
     * Callback for button.
     * 
     * @method NuPogodi.GameState#actionButtonLeftDown
     */
    actionButtonLeftDown: function() {
        this.wolf.moveWolfLeft();
        this.wolf.moveBasketDown();
    },
    /**
     * Callback for button.
     * 
     * @method NuPogodi.GameState#actionButtonLeftUp
     */
    actionButtonLeftUp: function() {
        this.wolf.moveWolfLeft();
        this.wolf.moveBasketUp();
    },
    /**
     * Callback for button.
     * 
     * @method NuPogodi.GameState#actionButtonRightDown
     */
    actionButtonRightDown: function() {
        this.wolf.moveWolfRight();
        this.wolf.moveBasketDown();
    },
    /**
     * Callback for button.
     * 
     * @method NuPogodi.GameState#actionButtonRightUp
     */
    actionButtonRightUp: function() {
        this.wolf.moveWolfRight();
        this.wolf.moveBasketUp();
    },
    /**
     * Method for calcualting factor for timers. Factor is using for calculate 
     * timers for new egg end move egg. 143 level is limit, later log() give to higher value
     * 
     * @method NuPogodi.GameState#factor
     * @return {number} factor for calcualte timers.
     */
    factor: function() {
        return (this.score.level < 143) ? (Math.log(this.score.level + 1) / 5) : 0.99;
    }
};
