/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
GameSpace.MenuState = function() {

};

GameSpace.MenuState.prototype = {
    create: function() {
        if (typeof GameSpace.score != 'undefined') {
            this.game.add.text(this.game.world.centerX - (GameSpace.scaler.scale * 40), GameSpace.scaler.scale * 80, "Your score: " + GameSpace.score, {
                font: GameSpace.scaler.scale * 15 + "px lets_go_digitalregular",
                fill: "#000000",
                align: "center"
            });
        }
        
        GameSpace.controls.prepareMenuControls();

//        var buttons = new Array();
//        buttons['start'] = this.game.add.button(this.game.world.centerX - (60 * GameSpace.scaler.scale),
//                this.game.world.centerY - (23 * GameSpace.scaler.scale),
//                'start',
//                this.beginGame, this);
//        buttons['start'].scale.setTo(GameSpace.scaler.scale, GameSpace.scaler.scale);
//        buttons['left-down'] = this.game.add.button(38 * GameSpace.scaler.scale, 234 * GameSpace.scaler.scale, 'button-left-down', this.beginGame, this);
//        buttons['left-down'].scale.setTo(GameSpace.scaler.scale, GameSpace.scaler.scale);
//        buttons['left-up'] = this.game.add.button(38 * GameSpace.scaler.scale, 178 * GameSpace.scaler.scale, 'button-left-up', this.beginGame, this);
//        buttons['left-up'].scale.setTo(GameSpace.scaler.scale, GameSpace.scaler.scale);
//        buttons['right-down'] = this.game.add.button(401 * GameSpace.scaler.scale, 234 * GameSpace.scaler.scale, 'button-right-down', this.beginGame, this);
//        buttons['right-down'].scale.setTo(GameSpace.scaler.scale, GameSpace.scaler.scale);
//        buttons['right-up'] = this.game.add.button(401 * GameSpace.scaler.scale, 178 * GameSpace.scaler.scale, 'button-right-up', this.beginGame, this);
//        buttons['right-up'].scale.setTo(GameSpace.scaler.scale, GameSpace.scaler.scale);
//
//        var keys = new Array();
//
//        keys['ENTER'] = this.game.input.keyboard.addKey(Phaser.Keyboard.ENTER);
//        keys['ENTER'].onDown.add(this.beginGame, this);
//
//        keys['SPACE'] = this.game.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR);
//        keys['SPACE'].onDown.add(this.beginGame, this);
    }
//    beginGame: function() {
//        this.game.state.start('Game');
//    }
};


