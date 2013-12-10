/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
function update() {
    if (GameSpace.game.time.now > GameSpace.eggMoveTimer) {
        
        var moved = GameSpace.eggs.moveNextEgg();
        GameSpace.eggMoveTimer = GameSpace.game.time.now + ((moved) ? (300/GameSpace.eggs.length) : 0);
        
    }

    if (GameSpace.game.time.now > GameSpace.newEggTimer) {
        
        var added = GameSpace.eggs.addNewEgg();
        GameSpace.newEggTimer = GameSpace.game.time.now + 300 + ((added) ? GameSpace.eggs.length * 300 : 0);
        
    }
    
    if ((GameSpace.birds.length > 0) 
            && (GameSpace.game.time.now > GameSpace.birdMoveTimer)) {
        for(var i = 0; i < GameSpace.birds.length; i++) {
            GameSpace.birds[i].move();
            
            GameSpace.birdMoveTimer = GameSpace.game.time.now + 600;
        }
    }
}
