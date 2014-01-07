/**
* @author Paweł Winiecki <pawel.winiecki@nerdlab.pl>
* @copyright 2014 NerdLab.pl
* @license MIT License
*/

var NuPogodi = NuPogodi || {};

/**
 * BootState constructor
 *
 * @class NuPogodi.BootState
 * @constructor
 * @see Phaser.State
 */
NuPogodi.BootState = function() {

};

NuPogodi.BootState.prototype = {
    preload: function() {
        // loading assets for PreloadState
        this.game.load.image('loader-empty', './assets/sprites/loader-empty.svg');
        this.game.load.image('loader-full', './assets/sprites/loader-full.svg');
        this.game.load.image('logo-nerd', './assets/sprites/logo-nerd.svg');
    },
    create: function() {    
        // set scalling mode and resize game
        this.game.stage.scaleMode = Phaser.StageScaleMode.SHOW_ALL;
        this.game.stage.scale.refresh();

        this.game.state.start('Preload');
    },
    update: function() {

    }
};


