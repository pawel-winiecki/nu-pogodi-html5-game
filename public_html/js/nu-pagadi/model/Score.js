/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
function Score(state) {
    this.state = state;
}

Score.prototype = {
    level: 0,
    savedEggs: 0,
    brokenEggs: 0,
    savedText: null,
    eggSaved: function() {
        this.savedEggs++;
        if (!(this.savedEggs % 10)) {
            this.level++;
        }
        this.savedText.setText(this.savedEggs);

    },
    eggBroken: function() {
        if (this.state.isHare) {
            this.brokenEggs += 0.5;
        } else {
            this.brokenEggs++;
            //this.brokenEggs += 0.5;
        }

        //this.brokenText.setText(this.brokenEggs);
        switch (this.brokenEggs) {
            case 0.5:
                this.state.sprites['bird-life-1'].reset(
                        this.state.sprites['bird-life-1'].x,
                        this.state.sprites['bird-life-1'].y
                        );
                this.state.sprites['bird-life-1'].animations.add('blink');
                this.state.sprites['bird-life-1'].animations.play('blink',2,true);
            break;
            case 1:
                this.state.sprites['bird-life-1'].animations.stop('blink','bird-life');
                this.state.sprites['bird-life-1'].reset(
                        this.state.sprites['bird-life-1'].x,
                        this.state.sprites['bird-life-1'].y
                        );
                break;
            case 1.5:
                this.state.sprites['bird-life-1'].animations.stop('blink','bird-life');
                this.state.sprites['bird-life-2'].reset(
                        this.state.sprites['bird-life-2'].x,
                        this.state.sprites['bird-life-2'].y
                        );
                this.state.sprites['bird-life-2'].animations.add('blink');
                this.state.sprites['bird-life-2'].animations.play('blink',2,true);
                break;
            case 2:
                this.state.sprites['bird-life-2'].animations.stop('blink','bird-life',0);
                this.state.sprites['bird-life-2'].reset(
                        this.state.sprites['bird-life-2'].x,
                        this.state.sprites['bird-life-2'].y
                        );
                break;
            case 2.5:
                this.state.sprites['bird-life-2'].animations.stop('blink','bird-life',0);
                this.state.sprites['bird-life-3'].reset(
                        this.state.sprites['bird-life-3'].x,
                        this.state.sprites['bird-life-3'].y
                        );
                this.state.sprites['bird-life-3'].animations.add('blink');
                this.state.sprites['bird-life-3'].animations.play('blink',2,true);
                break;
            case 3:
                this.state.sprites['bird-life-3'].animations.stop('blink','bird-life',0);
                this.state.sprites['bird-life-3'].reset(
                        this.state.sprites['bird-life-3'].x,
                        this.state.sprites['bird-life-3'].y
                        );
                break;
            default:
                this.state.endGame();
        }
    },
    resetScore: function() {
        this.savedEggs = 0;
        this.brokenEggs = 0;
        this.level = 0;
        this.savedText.setText('0');
    }
};

