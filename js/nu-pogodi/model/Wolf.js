/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
GameSpace = GameSpace || {};

GameSpace.Wolf = function(state, basketPosition, wolfPosition) {

    this.state = state;

    this.basketPosition = basketPosition || 0;
    this.wolfPosition = wolfPosition || 0;
    
};

GameSpace.Wolf.prototype = {
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

            this.wolfPosition = 0;

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

            this.wolfPosition = 1;

        }
    },

    moveBasketUp:function() {
        if (!this.basketPosition) {
            if (this.wolfPosition) {
                this.move('basket-right-down', 'basket-right-up');
            } else {
                this.move('basket-left-down', 'basket-left-up');
            }

            this.basketPosition = 1;
        }
    },

    moveBasketDown: function() {
        if (this.basketPosition) {
            if (this.wolfPosition) {
                this.move('basket-right-up', 'basket-right-down');
            } else {
                this.move('basket-left-up', 'basket-left-down');
            }

            this.basketPosition = 0;
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


