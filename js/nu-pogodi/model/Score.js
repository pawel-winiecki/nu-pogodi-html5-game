/**
 * @author Paweł Winiecki <pawel.winiecki@nerdlab.pl>
 * @copyright 2014 NerdLab.pl
 * @license MIT License
 */
var NuPogodi = NuPogodi || {};

/**
 * Score constructor
 * 
 * @class NuPogodi.Hare
 * @constructor
 * @param {NuPogodi.GameState} state - a reference to the currently running game state.
 */
NuPogodi.Score = function(state) {
    'use strict';

    /**
     * @property {NuPogodi.GameState} state - local reference to game state.
     * @default
     */
    this.state = state;

    /**
     * @property {number} level - level of difficulty.
     * @default
     */
    this.level = 0;

    /**
     * @property {number} savedEggs - eggs saved by player.
     * @default
     */
    this.savedEggs = 0;

    /**
     * @property {number} brokenEggs - eggs didn't save by player.
     * @default
     */
    this.brokenEggs = 0;

    /**
     * @property {Phaser. Text} savedText - text showing saved eggs.
     * @default
     */
    this.savedText = null;
};

NuPogodi.Score.prototype = {
    /**
     * Change score with saved egg.
     *
     * @method NuPogodi.Score#eggSaved 
     */
    eggSaved: function() {
        'use strict';

        this.savedEggs++;
        if (!(this.savedEggs % 10)) {
            this.level++;
        }
        if (this.savedText) {
            this.savedText.setText(this.savedEggs);
        }

    },
    eggBroken: function() {
        'use strict';

        // hare on screen give more chance for player
        if (this.state.isHare) {
            this.brokenEggs += 0.5;
        } else {
            this.brokenEggs++;
        }

        var spriteStop;
        var spriteReset;
        var spritePlay;
        
        // chosing Bird Life sprite to reset or play/stop animation
        switch (this.brokenEggs) {
            case 0.5:
                spriteReset = 'bird-life-1';
                spritePlay = 'bird-life-1';
                break;
            case 1:
                spriteStop = 'bird-life-1';
                spriteReset = 'bird-life-1';
                break;
            case 1.5:
                spriteStop = 'bird-life-1';
                spriteReset = 'bird-life-2';
                spritePlay = 'bird-life-2';
                break;
            case 2:
                spriteStop = 'bird-life-2';
                spriteReset = 'bird-life-2';
                break;
            case 2.5:
                spriteStop = 'bird-life-2';
                spriteReset = 'bird-life-3';
                spritePlay = 'bird-life-3';
                break;
            case 3:
                spriteStop = 'bird-life-3';
                spriteReset = 'bird-life-3';
                break;
            default:
                this.state.endGame();
        }
        
        // stopping sprite annimation
        if (spriteStop) {
            this.state.sprites[spriteStop].animations.stop('blink', 'bird-life', true);
            this.state.sprites[spriteStop].loadTexture('bird-life', 0);
        }

        // reset sprite
        if (spriteReset) {
            this.state.sprites[spriteReset].reset(
                    this.state.sprites[spriteReset].x,
                    this.state.sprites[spriteReset].y
                    );
        }
        
        // starting sprite annimation
        if (spritePlay) {
            this.state.sprites[spritePlay].animations.add('blink');
            this.state.sprites[spritePlay].animations.play('blink', 2, true);
        }
    },
    /**
     * Change score with broken egg.
     *
     * @method NuPogodi.Score#brokenEgg 
     */
    resetScore: function() {
        'use strict';

        this.savedEggs = 0;
        this.brokenEggs = 0;
        this.level = 0;
        this.savedText.setText('0');
    }
};

