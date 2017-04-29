/**
* @author Paweł Winiecki <pawel.winiecki@nerdlab.pl>
* @copyright 2014 NerdLab.pl
* @license MIT License
*/
var NuPogodi = NuPogodi || {};

/**
 * Egg constructor
 * 
 * @class NuPogodi.Egg
 * @param {NuPogodi.GameState} state - a reference to the currently running game state.
 * @param {boolean} horizontal - horizontal position of new egg.
 * @param {boolean} vertical - vertical position of new egg.
 * @constructor
 */
NuPogodi.Egg = function(state, horizontal, vertical) {
    'use strict';

    /**
     * @property {boolean} horizontal - horizontal position of egg. 
     */
    this.horizontal = horizontal;

    /**
     * @property {boolean} vertical - vertical position of egg. 
     */
    this.vertical = vertical;
    
    /**
     * @property {String} route - it's combination of egg sprite without step.
     * Vertical and horizontal are more often using together.
     */
    this.route = 'egg-' 
            + (this.horizontal ? 'right' : 'left')
            + '-' 
            + (this.vertical ? 'up' : 'down');
    
    /**
     * @property {number} step - number of actual bird sprite.
     */
    this.step = 1;
    
    /**
     * @property {NuPogodi.GameState} state - local reference to game state.
     */
    this.state = state;
    
    this.state.sprites[this.route + '-' + this.step].reset(
            this.state.sprites[this.route + '-' + this.step].x,
            this.state.sprites[this.route + '-' + this.step].y
            );

};

NuPogodi.Egg.prototype = {
    /**
     * This method move egg on screen
     *
     * @method NuPogodi.Egg#move
     * @return {boolean} Return true if egg has moved otherwise return false.
     */
    move() {
        'use strict';
        
        // checking it it is last step
        if (this.step < 5) {
            
            // sprite to show in this step
            var newSprite = this.state.sprites[this.route + '-' + (this.step + 1)];

            // if sprite isn't alive (no egg using it) we can move egg.
            if (!newSprite.alive) {
                
                // killing old sprite
                this.state.sprites[this.route + '-' + this.step].kill();

                // increment step
                this.step++;
                
                // reset new sprite and play audio for this
                newSprite.reset(newSprite.x, newSprite.y);
                this.state.audio[this.route].play('', 0, 1, false);

                return true;
            } else {
                return false;
            }
        } else {
            
            // killing actual sprite
            this.state.sprites[this.route + '-' + this.step].kill();

            // removing this egg from eggs collection
            this.state.eggs.remove(this);
            
            // checking is wolf and egg have the same position
            if ((this.state.wolf.getBasketPosition() === this.vertical) 
                    && (this.state.wolf.getWolfPosition() === this.horizontal)) 
            {
                // infomration to score and playing success sound
                this.state.score.eggSaved();
                this.state.audio['basket'].play('', 0, 1, false);
            } else {
                // infomration to score, playing fail sound and adding new Bird
                this.state.score.eggBroken();
                this.state.audio['egg-crash'].play('', 0, 1, false);
                this.state.animations.push(new NuPogodi.Bird(this.horizontal, this.state));
            }

            return true;
        }

    }
};
