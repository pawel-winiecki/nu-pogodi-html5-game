/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
function Controls(game) {
    this.game = game;

    this.menuKeys = {};
    this.menuKeys['ENTER'] = this.game.input.keyboard.addKey(Phaser.Keyboard.ENTER);
    this.menuKeys['SPACE'] = this.game.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR);

    this.gameKeys = {};
    this.gameKeys['LEFT'] = this.game.input.keyboard.addKey(Phaser.Keyboard.LEFT);
    this.gameKeys['RIGHT'] = this.game.input.keyboard.addKey(Phaser.Keyboard.RIGHT);
    this.gameKeys['UP'] = this.game.input.keyboard.addKey(Phaser.Keyboard.UP);
    this.gameKeys['DOWN'] = this.game.input.keyboard.addKey(Phaser.Keyboard.DOWN);

}

Controls.prototype = {
    prepareMenuControls: function() {
        for (var key in this.gameKeys) {
            this.gameKeys[key].onDown.removeAll();
        }

        this.menuKeys['ENTER'].onDown.add(this.beginGame, this);
        this.menuKeys['SPACE'].onDown.add(this.beginGame, this);

        var buttons = new Array();

        buttons.push(this.game.add.button(this.game.world.centerX - (60 * GameSpace.scaler.scale),
                this.game.world.centerY - (23 * GameSpace.scaler.scale),
                'start',
                this.beginGame, this));
        buttons.push(this.game.add.button(38 * GameSpace.scaler.scale, 234 * GameSpace.scaler.scale, 'button-left-down', this.beginGame, this));
        buttons.push(this.game.add.button(38 * GameSpace.scaler.scale, 178 * GameSpace.scaler.scale, 'button-left-up', this.beginGame, this));
        buttons.push(this.game.add.button(401 * GameSpace.scaler.scale, 234 * GameSpace.scaler.scale, 'button-right-down', this.beginGame, this));
        buttons.push(this.game.add.button(401 * GameSpace.scaler.scale, 178 * GameSpace.scaler.scale, 'button-right-up', this.beginGame, this));

        for (var i = 0; i < buttons.length; i++) {
            buttons[i].scale.setTo(GameSpace.scaler.scale, GameSpace.scaler.scale);
        }
    },
    beginGame: function() {
        this.game.state.start('Game');
    },
    prepareGameControls: function(wolf) {
        this.wolf = wolf;
        
        for (var key in this.menuKeys) {
            this.menuKeys[key].onDown.removeAll();
        }

        this.gameKeys['LEFT'].onDown.add(wolf.moveWolfLeft, wolf);
        this.gameKeys['RIGHT'].onDown.add(wolf.moveWolfRight, wolf);
        this.gameKeys['UP'].onDown.add(wolf.moveBasketUp, wolf);
        this.gameKeys['DOWN'].onDown.add(wolf.moveBasketDown, wolf);

        var buttons = new Array();

        buttons.push(this.game.add.button(38 * GameSpace.scaler.scale, 234 * GameSpace.scaler.scale, 'button-left-down', this.actionButtonLeftDown, this));
        buttons.push(this.game.add.button(38 * GameSpace.scaler.scale, 178 * GameSpace.scaler.scale, 'button-left-up', this.actionButtonLeftUp, this));
        buttons.push(this.game.add.button(401 * GameSpace.scaler.scale, 234 * GameSpace.scaler.scale, 'button-right-down', this.actionButtonRightDown, this));
        buttons.push(this.game.add.button(401 * GameSpace.scaler.scale, 178 * GameSpace.scaler.scale, 'button-right-up', this.actionButtonRightUp, this));

        for (var i = 0; i < buttons.length; i++) {
            buttons[i].scale.setTo(GameSpace.scaler.scale, GameSpace.scaler.scale);
        }

    },
    actionButtonLeftDown: function() {
        this.wolf.moveWolfLeft();
        this.wolf.moveBasketDown();
    },
    actionButtonLeftUp: function() {
        this.wolf.moveWolfLeft();
        this.wolf.moveBasketUp();
    },
    actionButtonRightDown: function() {
        this.wolf.moveWolfRight();
        this.wolf.moveBasketDown();
    },
    actionButtonRightUp: function() {
        this.wolf.moveWolfRight();
        this.wolf.moveBasketUp();
    }
};

