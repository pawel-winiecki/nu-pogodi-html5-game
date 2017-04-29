/**
* @author Paweł Winiecki <pawel.winiecki@nerdlab.pl>
* @copyright 2014 NerdLab.pl
* @license MIT License
*/

var NuPogodi = NuPogodi || {};

/**
 * MenuState constructor
 * 
 * @class NuPogodi.MenuState
 * @constructor
 * @see Phaser.State
 */
NuPogodi.MenuState = () => {

};

NuPogodi.MenuState.prototype = {
    /**
     * Setup operations for Menu state
     * 
     * @method NuPogodi.MenuState#create 
     * @see Phaser.State#create
     */
    create() {
        // showing score if was set
        if (typeof NuPogodi.score != 'undefined') {
            this.game.add.text(
                    this.game.world.centerX - 90,
                    this.game.world.centerY + 70,
                    "Your score: " + NuPogodi.score,
                    {
                        font: 32 + "px lets_go_digitalregular",
                        fill: "#000000",
                        align: "center"
                    }
            );
        }

        //adding NerdLab logo and NuPogodi name
        this.game.add.sprite(this.game.world.centerX - 150, 200, 'logo-nerd');
        this.game.add.text(
                this.game.world.centerX + 30,
                200,
                "Nu Pogodi",
                {
                    font: "30px lets_go_digitalregular",
                    fill: "#000000",
                    align: "right"
                }
        );

        // adding beginGame function for space and enter
        var enter = this.game.input.keyboard.addKey(Phaser.Keyboard.ENTER);
        enter.onDown.add(this.beginGame, this);
        var space = this.game.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR);
        space.onDown.add(this.beginGame, this);

        // adding buttons whit beginGame function
        this.game.add.button(this.game.world.centerX - 120,
                this.game.world.centerY - 55,
                'start',
                this.beginGame, this);
        this.game.add.button(60, 472, 'button-left-down', this.beginGame, this);
        this.game.add.button(60, 360, 'button-left-up', this.beginGame, this);
        this.game.add.button(786, 472, 'button-right-down', this.beginGame, this);
        this.game.add.button(786, 360, 'button-right-up', this.beginGame, this);


    },
    /**
     * Function for start start Game state.
     * 
     * @method NuPogodi.MenuState#startGame
     */
    beginGame() {
        this.game.input.keyboard.clearCaptures();
        this.game.state.start('Game');
    }
};


