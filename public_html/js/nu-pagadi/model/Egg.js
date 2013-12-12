/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
function Egg(horizontal, vertical, state) {

    this.horizontal = horizontal;
    this.vertical = vertical;
    this.route = 'egg-' + horizontal + '-' + vertical;
    this.position = 1;

    this.state = state;

    this.state.sprites[this.route + '-' + this.position].reset(
            this.state.sprites[this.route + '-' + this.position].x,
            this.state.sprites[this.route + '-' + this.position].y
            );

}

Egg.prototype = {
    move: function() {

        if (this.position < 5) {

            var newSprite = this.state.sprites[this.route + '-' + (this.position + 1)];

            if (!newSprite.alive) {
                this.state.sprites[this.route + '-' + this.position].kill();

                this.position++;

                newSprite.reset(newSprite.x, newSprite.y);
                this.state.audio['egg-' + this.horizontal + '-' + this.vertical].play('', 0, 1, false);

                return true;
            } else {
                return false;
            }
        } else {
            this.state.sprites[this.route + '-' + this.position].kill();

            this.state.eggs.remove(this);


            var vertical = (this.vertical === 'up') ? 1 : 0;
            var horizontal = (this.horizontal === 'right') ? 1 : 0;

            if ((this.state.wolf.getBasketPosition() === vertical) && (this.state.wolf.getWolfPosition() === horizontal)) {
                this.state.score.eggSaved();
                this.state.audio['basket'].play('', 0, 1, false);
            } else {
                this.state.score.eggBroken();
                this.state.audio['egg-crash'].play('', 0, 1, false);
                this.state.animations.push(new Bird(this.horizontal, this.state));
            }

            return true;
        }

    }
};
