/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
function Bird(horizontal) {
    this.horizontal = horizontal;
    this.position = 0;

    this.sprites = GameSpace.sprites;
}

Bird.prototype = {
    move: function() {
        if (this.position > 0) {
            this.sprites['bird-' + this.horizontal + '-' + this.position].kill();
        }

        if (this.position < 5) {
            this.position++;

            this.sprites['bird-' + this.horizontal + '-' + this.position].reset(
                    this.sprites['bird-' + this.horizontal + '-' + this.position].x,
                    this.sprites['bird-' + this.horizontal + '-' + this.position].y
                    );
        } else {
            GameSpace.birds.splice(GameSpace.birds.indexOf(this), 1);
        }

    }
};