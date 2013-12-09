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
        this.sprites[this.route + '-' + this.position].kill();

        this.position++;

        if (this.position < 6) {
            this.sprites[this.route + '-' + this.position].reset(
                    this.sprites[this.route + '-' + this.position].x,
                    this.sprites[this.route + '-' + this.position].y
                    );
        } else {
            this.eggs.remove(this);

            var vertical;

            if(this.vertical === 'up') {
                vertical = 1;
            } else {
                vertical = 0;
            }
            
            var horizontal;
            
            if(this.horizontal === 'right') {
                horizontal = 1;
            } else {
                horizontal = 0;
            }
            
//            alert('wolf: '+GameSpace.wolf.basketPosition+' '
//                    +GameSpace.wolf.wolfPosition
//                    +' egg'+ this.horizontal + ' '+horizontal
//                    + this.vertical + ' '+ vertical);
                
            if ((this.wolf.getBasketPosition() === vertical) && (this.wolf.getWolfPosition() === horizontal)) {
                this.score.eggSaved();
            } else {
                this.score.eggBroken();
            }
        }
    }
};
