/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
function Egg(horizontal, vertical) {

    this.horizontal = horizontal;
    this.vertical = vertical;
    this.route = 'egg-' + horizontal + '-' + vertical;
    this.position = 1;

    this.sprites = GameSpace.sprites;
    this.eggs = GameSpace.eggs;
    this.wolf = GameSpace.wolf;
    this.score = GameSpace.score;

    this.sprites[this.route + '-' + this.position].reset(
            this.sprites[this.route + '-' + this.position].x,
            this.sprites[this.route + '-' + this.position].y
            );

}

Egg.prototype = {
    move: function() {

        if (this.position < 5) {
            var newSprite = this.sprites[this.route + '-' + (this.position + 1)];

            if (!newSprite.alive) {
                this.sprites[this.route + '-' + this.position].kill();

                this.position++;

                newSprite.reset(newSprite.x,newSprite.y);
                
                return true;
            } else {
                return false;
            }
        } else {
            this.sprites[this.route + '-' + this.position].kill();

            this.eggs.remove(this);

            var vertical = (this.vertical === 'up') ? 1 : 0;
            var horizontal = (this.horizontal === 'right') ? 1 : 0;

            if ((this.wolf.getBasketPosition() === vertical) && (this.wolf.getWolfPosition() === horizontal)) {
                this.score.eggSaved();
            } else {
                this.score.eggBroken();
                GameSpace.birds.push(new Bird(this.horizontal));
            }

            return true;
        }

    }
};
