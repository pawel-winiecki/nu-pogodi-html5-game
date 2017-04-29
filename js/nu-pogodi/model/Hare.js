/**
* @author Paweł Winiecki <pawel.winiecki@nerdlab.pl>
* @copyright 2014 NerdLab.pl
* @license MIT License
*/
var NuPogodi = NuPogodi || {};

/**
 * Hare constructor
 * 
 * @class NuPogodi.Hare
 * @constructor
 * @param {NuPogodi.GameState} state - a reference to the currently running game state.
 */
NuPogodi.Hare = function(state) {
    'use strict';
    
    /**
     * @property {NuPogodi.GameState} state - local reference to game state.
     */
    this.state = state;
    
    /**
     * @property {number} dingCount - number of bell's moves.
     */
    this.dingCount = 0;

    // reset of hare and bell sprite
    this.state.sprites['hare'].reset(
            this.state.sprites['hare'].x,
            this.state.sprites['hare'].y
            );
    this.state.sprites['bell-' + this.dingCount].reset(
            this.state.sprites['bell-' + this.dingCount].x,
            this.state.sprites['bell-' + this.dingCount].y
            );
    
    this.state.isHare = true;
};

NuPogodi.Hare.prototype = {
    /**
     * Movin hare's bell on screen.
     *
     * @method NuPogodi.Hare#move 
     */
    move() {
        'use strict';
        
        // kill actual bell sprite
        this.state.sprites['bell-' + (this.dingCount % 2)].kill();

        if (this.dingCount < 7) {
            this.dingCount++;

            this.state.sprites['bell-' + (this.dingCount % 2)].reset(
                    this.state.sprites['bell-' + (this.dingCount % 2)].x,
                    this.state.sprites['bell-' + (this.dingCount % 2)].y
                    );
        } else {
            this.hide();
        }
    },
    /**
     * Removing hare from screen.
     *
     * @method NuPogodi.Hare#move 
     */
    hide() {
        this.state.sprites['hare'].kill();
        this.state.animations.splice(this.state.animations.indexOf(this), 1);
        this.state.isHare = false;
    }
};


