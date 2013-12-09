/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
function Wolf(basketPosition, wolfPosition) {

    this.basketPosition = basketPosition || 0;
    this.wolfPosition = wolfPosition || 0;

    this.render = function() {
        if (this.wolfPosition) {
            GameSpace.sprites['wolf-right'].reset(
                    GameSpace.sprites['wolf-right'].x,
                    GameSpace.sprites['wolf-right'].y
                    );
            if (this.basketPosition) {
                GameSpace.sprites['basket-right-up'].reset(
                    GameSpace.sprites['basket-right-up'].x,
                    GameSpace.sprites['basket-right-up'].y
                    );
            } else {
                GameSpace.sprites['basket-right-down'].reset(
                    GameSpace.sprites['basket-right-down'].x,
                    GameSpace.sprites['basket-right-down'].y
                    );
            }
        } else {
            GameSpace.sprites['wolf-left'].reset(
                    GameSpace.sprites['wolf-left'].x,
                    GameSpace.sprites['wolf-left'].y
                    );
            if (this.basketPosition) {
                GameSpace.sprites['basket-left-up'].reset(
                    GameSpace.sprites['basket-left-up'].x,
                    GameSpace.sprites['basket-left-up'].y
                    );
            } else {
                GameSpace.sprites['basket-left-down'].reset(
                    GameSpace.sprites['basket-left-down'].x,
                    GameSpace.sprites['basket-left-down'].y
                    );
            }
        }
    };

    this.moveWolfLeft = function() {
        if (this.wolfPosition) {

            move('wolf-right', 'wolf-left');

            if (this.basketPosition) {
                move('basket-right-up', 'basket-left-up');
            } else {
                move('basket-right-down', 'basket-left-down');
            }

            this.wolfPosition = 0;

        }
    };

    this.moveWolfRight = function() {
        if (!this.wolfPosition) {

            move('wolf-left', 'wolf-right');

            if (this.basketPosition) {
                move('basket-left-up', 'basket-right-up');
            } else {
                move('basket-left-down', 'basket-right-down');
            }

            this.wolfPosition = 1;

        }
    };

    this.moveBasketUp = function() {
        if (!this.basketPosition) {
            if (this.wolfPosition) {
                move('basket-right-down', 'basket-right-up');
            } else {
                move('basket-left-down', 'basket-left-up');
            }

            this.basketPosition = 1;
        }
    };

    this.moveBasketDown = function() {
        if (this.basketPosition) {
            if (this.wolfPosition) {
                move('basket-right-up', 'basket-right-down');
            } else {
                move('basket-left-up', 'basket-left-down');
            }

            this.basketPosition = 0;
        }
    };

    var move = function(spriteToKill, spriteToReset) {
        GameSpace.sprites[spriteToKill].kill();
        GameSpace.sprites[spriteToReset].reset(
                GameSpace.sprites[spriteToReset].x,
                GameSpace.sprites[spriteToReset].y
                );
    };
    
    this.getBasketPosition = function() {
        return this.basketPosition;
    };
    
    this.getWolfPosition = function() {
        return this.wolfPosition;
    };

}


