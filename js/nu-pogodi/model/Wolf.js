/**
 * @author Paweł Winiecki <pawel.winiecki@nerdlab.pl>
 * @copyright 2014 NerdLab.pl
 * @license MIT License
 */
var NuPogodi = NuPogodi || {};

/**
 * Wolf constructor
 * 
 * @class NuPogodi.Wolf
 * @constructor
 * @param {NuPogodi.GameState} state - a reference to the currently running game state.
 * @param {boolean} basketPosition - starter position of basket.
 * @param {boolean} wolfPosition - starter position of wolf.
 */
NuPogodi.Wolf = function(state, basketPosition, wolfPosition) {
    'use strict';

    if (typeof basketPosition == 'undefined') {
        basketPosition = false;
    }
    if (typeof wolfPosition == 'undefined') {
        wolfPosition = false;
    }

    /**
     * @property {NuPogodi.GameState} state - local reference to game state.
     */
    this.state = state;

    /**
     * @property {boolean} basketPosition - if true basket is 'up' otherwise is 'down'.
     */
    this.basketPosition = basketPosition;

    /**
     * @property {boolean} wolfPosition - if true basket is 'rigth' otherwise is 'left'.
     */
    this.wolfPosition = wolfPosition;

};

NuPogodi.Wolf.prototype = {
    /**
     * Display wolf on screen.
     *
     * @method NuPogodi.Wolf#render 
     */
    render() {
        'use strict';
        
        var wolfStringPosition = (this.wolfPosition ? 'right' : 'left');
        var basketStringPosition = (this.basketPosition ? 'up' : 'down');
        
        // display wolf sprite
        this.state.sprites['wolf-' + wolfStringPosition].reset(
                this.state.sprites['wolf-' + wolfStringPosition].x,
                this.state.sprites['wolf-' + wolfStringPosition].y
                );
        
        // display wolf's basket sprite
        this.state.sprites['basket-' + wolfStringPosition + '-' + basketStringPosition].reset(
                this.state.sprites['basket-' + wolfStringPosition + '-' + basketStringPosition].x,
                this.state.sprites['basket-' + wolfStringPosition + '-' + basketStringPosition].y
                );
    },
    /**
     * Move wolf left.
     *
     * @method NuPogodi.Wolf#moveLeft
     */
    moveWolfLeft() {
        'use strict';
        
        if (this.wolfPosition) {

            this.move('wolf-right', 'wolf-left');

            if (this.basketPosition) {
                this.move('basket-right-up', 'basket-left-up');
            } else {
                this.move('basket-right-down', 'basket-left-down');
            }

            this.wolfPosition = false;

        }
    },
    /**
     * Move wolf rigth.
     *
     * @method NuPogodi.Wolf#moveRight
     */
    moveWolfRight() {
        'use strict';
        
        if (!this.wolfPosition) {

            this.move('wolf-left', 'wolf-right');

            if (this.basketPosition) {
                this.move('basket-left-up', 'basket-right-up');
            } else {
                this.move('basket-left-down', 'basket-right-down');
            }

            this.wolfPosition = true;

        }
    },
    /**
     * Move basket up.
     *
     * @method NuPogodi.Wolf#moveBasketUp
     */
    moveBasketUp() {
        'use strict';
        
        if (!this.basketPosition) {
            if (this.wolfPosition) {
                this.move('basket-right-down', 'basket-right-up');
            } else {
                this.move('basket-left-down', 'basket-left-up');
            }

            this.basketPosition = true;
        }
    },
    /**
     * Move basket down.
     *
     * @method NuPogodi.Wolf#moveBasketDown
     */
    moveBasketDown() {
        'use strict';
        
        if (this.basketPosition) {
            if (this.wolfPosition) {
                this.move('basket-right-up', 'basket-right-down');
            } else {
                this.move('basket-left-up', 'basket-left-down');
            }

            this.basketPosition = false;
        }
    },
    /**
     * This function 'move' object on screen. Killing sprite FROM and reset sprite TO.
     *
     * @method NuPogodi.Wolf#move
     * @param {string} spriteToKill - label of sprite to kill.
     * @param {string} spriteToReset - label of sprite to reset.
     */
    move(spriteToKill, spriteToReset) {
        'use strict';
        
        this.state.sprites[spriteToKill].kill();
        this.state.sprites[spriteToReset].reset(
                this.state.sprites[spriteToReset].x,
                this.state.sprites[spriteToReset].y
                );
    },
    /**
     * basket position getter
     *
     * @method NuPogodi.Wolf#getBasketPosition
     * @return {boolean}
     */
    getBasketPosition() {
        return this.basketPosition;
    },
    /**
     * wolf position getter
     *
     * @method NuPogodi.Wolf#wolfPosition
     * @return {boolean}
     */
    getWolfPosition() {
        return this.wolfPosition;
    }

};


