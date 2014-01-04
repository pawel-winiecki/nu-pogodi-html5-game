/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
var GameSpace = GameSpace || {};

GameSpace.Bird = function(horizontal, state) {
    this.horizontal = horizontal;
    this.position = 0;

    this.state = state;
}

GameSpace.Bird.prototype = {
    move: function() {
        if (this.position > 0) {
            this.state.sprites['bird-' + this.horizontal + '-' + this.position].kill();
        }

        if (this.position < 5) {
            this.position++;

            this.state.sprites['bird-' + this.horizontal + '-' + this.position].reset(
                    this.state.sprites['bird-' + this.horizontal + '-' + this.position].x,
                    this.state.sprites['bird-' + this.horizontal + '-' + this.position].y
                    );
        } else {
            this.state.animations.splice(this.state.animations.indexOf(this), 1);
        }

    }
};