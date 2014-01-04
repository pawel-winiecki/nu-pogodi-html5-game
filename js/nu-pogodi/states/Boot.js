/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
"use strict";

var GameSpace = GameSpace || {};

GameSpace.BootState = function() {

};

GameSpace.BootState.prototype = {
    preload: function() {

    },
    create: function() {

        this.game.stage.scaleMode = Phaser.StageScaleMode.SHOW_ALL;
        this.game.stage.scale.refresh();

        this.game.state.start('Preload');
    },
    update: function() {

    }
};


