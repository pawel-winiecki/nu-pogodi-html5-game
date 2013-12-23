/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
GameSpace = {} || GameSpace;

GameSpace.Sounds = function() {

};

GameSpace.Sounds.prototype = {
    createGameSounds: function(game, audioData) {
        for (var i = 0; i < audioData.length; i++) {
            this[audioData[i]] = game.add.audio(audioData[i]);
        }
    },
    createSounds: function(audioData) {
        for (var i = 0; i < audioData.length; i++) {
            this[audioData[i]] = new Media('/android_asset/www/audio/' + audioData[i] + '.mp3' );
        }
    }
};

