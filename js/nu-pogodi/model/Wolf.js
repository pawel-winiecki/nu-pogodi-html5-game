/**
* @author Paweł Winiecki <pawel.winiecki@nerdlab.pl>
* @copyright 2014 NerdLab.pl
* @license MIT License
*/
NuPogodi = NuPogodi || {};

NuPogodi.Wolf = function(state, basketPosition, wolfPosition) {

    this.state = state;

    this.basketPosition = basketPosition || false;
    this.wolfPosition = wolfPosition || false;
    
};

NuPogodi.Wolf.prototype = {
    render: function() {
        if (this.wolfPosition) {
            this.state.sprites['wolf-right'].reset(
                    this.state.sprites['wolf-right'].x,
                    this.state.sprites['wolf-right'].y
                    );
            if (this.basketPosition) {
                this.state.sprites['basket-right-up'].reset(
                    this.state.sprites['basket-right-up'].x,
                    this.state.sprites['basket-right-up'].y
                    );
            } else {
                this.state.sprites['basket-right-down'].reset(
                    this.state.sprites['basket-right-down'].x,
                    this.state.sprites['basket-right-down'].y
                    );
            }
        } else {
            this.state.sprites['wolf-left'].reset(
                    this.state.sprites['wolf-left'].x,
                    this.state.sprites['wolf-left'].y
                    );
            if (this.basketPosition) {
                this.state.sprites['basket-left-up'].reset(
                    this.state.sprites['basket-left-up'].x,
                    this.state.sprites['basket-left-up'].y
                    );
            } else {
                this.state.sprites['basket-left-down'].reset(
                    this.state.sprites['basket-left-down'].x,
                    this.state.sprites['basket-left-down'].y
                    );
            }
        }
    },

    moveWolfLeft: function() {
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

    moveWolfRight: function() {
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

    moveBasketUp:function() {
        if (!this.basketPosition) {
            if (this.wolfPosition) {
                this.move('basket-right-down', 'basket-right-up');
            } else {
                this.move('basket-left-down', 'basket-left-up');
            }

            this.basketPosition = true;
        }
    },

    moveBasketDown: function() {
        if (this.basketPosition) {
            if (this.wolfPosition) {
                this.move('basket-right-up', 'basket-right-down');
            } else {
                this.move('basket-left-up', 'basket-left-down');
            }

            this.basketPosition = false;
        }
    },

    move: function(spriteToKill, spriteToReset) {
        this.state.sprites[spriteToKill].kill();
        this.state.sprites[spriteToReset].reset(
                this.state.sprites[spriteToReset].x,
                this.state.sprites[spriteToReset].y
                );
    },
    
    getBasketPosition: function() {
        return this.basketPosition;
    },
    
    getWolfPosition: function() {
        return this.wolfPosition;
    }

};


