/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
function Hare(state) {
    this.state = state;
    this.dingCount = 0;

    this.state.sprites['hare'].reset(
            this.state.sprites['hare'].x,
            this.state.sprites['hare'].y
            );
    this.state.sprites['bell-' + this.dingCount].reset(
            this.state.sprites['bell-' + this.dingCount].x,
            this.state.sprites['bell-' + this.dingCount].y
            );
}

Hare.prototype = {
    move: function() {
        this.state.sprites['bell-' + (this.dingCount % 2)].kill();

        if (this.dingCount < 7) {
            this.dingCount++;

            this.state.sprites['bell-' + (this.dingCount % 2)].reset(
                    this.state.sprites['bell-' + (this.dingCount % 2)].x,
                    this.state.sprites['bell-' + (this.dingCount % 2)].y
                    );
        } else {
            this.hide();
        }
    },
    hide: function() {
        this.state.sprites['hare'].kill();
        this.state.animations.splice(this.state.animations.indexOf(this), 1);
    }
};


