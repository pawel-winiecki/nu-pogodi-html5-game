/**
 * @author Paweł Winiecki <pawel.winiecki@nerdlab.pl>
 * @copyright 2014 NerdLab.pl
 * @license MIT License
 */
var NuPogodi = NuPogodi || {};

/**
 * Bird constructor
 * 
 * @class NuPogodi.Bird
 * @constructor
 * @param {boolean} horizontal - horizontal position of new bird.
 * @param {NuPogodi.GameState} state - A reference to the currently running game state.
 */
NuPogodi.Bird = function(horizontal, state) {
    'use strict';

    /**
     * @property {String} horizontal - horizontal position of bird. 
     * It can be 'left' or 'rigth'.
     */
    this.route = 'bird-' + (horizontal ? 'right' : 'left');

    /**
     * @property {number} step - number of actual bird sprite.
     * @default
     */
    this.step = 0;

    /**
     * @property {NuPogodi.GameState} state - local reference to game state.
     */
    this.state = state;
};

NuPogodi.Bird.prototype = {
    /**
     * This method move bird on screen
     *
     * @method NuPogodi.Bird#move
     */
    move: function() {
        'use strict';
        // actual bird sprite is killed
        if (this.step > 0) {
            this.state.sprites[this.route + '-' + this.step].kill();
        }

        if (this.step < 5) {
            // step increment 
            this.step++;

            // reset new bird sprite 
            this.state.sprites[this.route + '-' + this.step].reset(
                    this.state.sprites[this.route + '-' + this.step].x,
                    this.state.sprites[this.route + '-' + this.step].y
                    );
        } else {
            // removing actual bird from game state 'animations'
            this.state.animations.splice(this.state.animations.indexOf(this), 1);
        }

    }
};