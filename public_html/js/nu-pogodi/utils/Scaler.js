/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
function Scaler() {
    this.gameScale = 1;
    this.spriteScale = 1;
    this.firstSpriteScaling = 1;
    this.hasScaled = false;
}

Scaler.prototype = {
    
    calcScale: function() {
        
        /*if (($(window).width() / $(window).height()) > 1.6) {
            this.gameScale = $(window).height() / 300;
        } else {
            this.gameScale = $(window).width() / 480;
        }
        
        if(this.hasScaled) {
            this.spriteScale = this.gameScale/this.spriteScale;
        } else {
            
            
            this.spriteScale =this.gameScale;
            this.firstSpriteScaling = this.gameScale;
            this.hasScaled = true;
        }*/
        
    },
    scaleGame: function() {
        
        this.calcScale();
        
        var game = GameSpace.game;
        
        game.stage.scale.width = 480 * this.gameScale;
        game.stage.scale.height = 300 * this.gameScale;
        
        game.stage.scale.refresh();

    }
};


