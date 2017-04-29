/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
GameSpace = {} || GameSpace;

GameSpace.Sounds = () => {

};

GameSpace.Sounds.prototype = {
    createGameSounds(game, audioData) {
        for (var i = 0; i < audioData.length; i++) {
            this[audioData[i]] = game.add.audio(audioData[i]);
        }
    },
    createSounds(audioData) {
        for (var i = 0; i < audioData.length; i++) {
            this[audioData[i]] = new Media('/android_asset/www/audio/' + audioData[i] + '.mp3' );
        }
    }
};

