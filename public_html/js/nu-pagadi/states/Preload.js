/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
GameSpace = GameSpace || {};

GameSpace.PreloadState = function() {
    
};

GameSpace.PreloadState.prototype = {
    preload: function() {
        var imagesData = [
            'hare',
            'wolf-left',
            'basket-left-up',
            'basket-left-down',
            'wolf-right',
            'basket-right-up',
            'basket-right-down',
            'bell-0',
            'bell-1',
            'bird-life',
            'egg-left-1',
            'egg-left-2',
            'egg-left-3',
            'egg-left-4',
            'egg-left-5',
            'egg-right-1',
            'egg-right-2',
            'egg-right-3',
            'egg-right-4',
            'egg-right-5',
            'bird-left-1',
            'bird-left-2',
            'bird-left-3',
            'bird-left-4',
            'bird-left-5',
            'bird-right-1',
            'bird-right-2',
            'bird-right-3',
            'bird-right-4',
            'bird-right-5',
            'button-left-down',
            'button-left-up',
            'button-right-down',
            'button-right-up',
            'start'
        ];

        for (var i = 0; i < imagesData.length; i++) {
            this.game.load.image(imagesData[i], './img/svg/' + imagesData[i] + '.svg');
        }
        
        var audioData = [
            'basket',
            'egg-crash',
            'egg-left-up',
            'egg-left-down',
            'egg-right-up',
            'egg-right-down'
        ];

        for (var i = 0; i < audioData.length; i++) {
            this.game.load.audio(audioData[i], ['./audio/' + audioData[i] + '.mp3']);
        }
        

    },
    
    create: function() {
        GameSpace.controls = new Controls(this.game); 
        
        this.game.state.start('Menu');
    },
    
    update: function() {
        
    }
};
