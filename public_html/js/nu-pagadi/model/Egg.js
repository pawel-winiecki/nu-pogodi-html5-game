/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
function Egg(route) {
    var fullRoute = 'egg-' + route + '-';
    var position = 1;
    
    GameSpace.sprites[fullRoute + position].reset(
            GameSpace.sprites[fullRoute + position].x,
            GameSpace.sprites[fullRoute + position].y
            );

    this.move = function() {
        GameSpace.sprites[fullRoute + position].kill();

        position++;

        if (position < 6) {
            GameSpace.sprites[fullRoute + position].reset(
                    GameSpace.sprites[fullRoute + position].x,
                    GameSpace.sprites[fullRoute + position].y
                    );
        } else {
            var index = GameSpace.eggs.lastIndexOf(this);
            GameSpace.eggs.splice(index,1);
        }
    };
}



