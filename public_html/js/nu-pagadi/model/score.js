/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
function Score(savedText, brokenText) {
    this.savedEggs = 0;
    this.brokenEggs = 0;
    
    this.savedText = savedText;
    this.brokenText = brokenText;
}

Score.prototype = {
    eggSaved: function() {
        this.savedEggs++;
        this.savedText.setText(this.savedEggs);
    },
    eggBroken: function() {
        this.brokenEggs++;
        this.brokenText.setText(this.brokenEggs);
    },
    resetScore: function() {
        this.savedEggs = 0;
        this.brokenEggs = 0;
        this.savedText.setText('0');
        this.brokenText.setText('0');
    }
};

