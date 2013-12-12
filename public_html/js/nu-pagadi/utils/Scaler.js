/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
function Scaler() {
    this.scale = 1;
}

Scaler.prototype = {
    
    calcFirstScale: function() {
        var x,y;
        
        //alert('width: '+screen.width + 'height: '+screen.height);
        
        if(screen.width > screen.height) {
            x = screen.width;
            y = screen.height;
        } else {
            x = screen.height;
            y = screen.width;
        }
        
        if ((x / y) > 1.6) {
            this.scale = y / 300;
        } else {
            this.scale = x / 480;
        }
    },
    
    calcScale: function() {
        if (($(document).width() / $(document).height()) > 1.6) {
            return $(document).height() / 300;
        } else {
            return $(document).width() / 480;
        }
    },
    scaleGame: function() {
        var scale = this.calcScale();
        
        var game = GameSpace.game;
        
        game.stage.scale.width = 480 * scale;
        game.stage.scale.height = 300 * scale;
        game.stage.scale.refresh();
        
        //GameSpace.GameState.resize();

    }
};


