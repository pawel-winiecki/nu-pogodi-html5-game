/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
function Eggs() {
    this.length = 0;
    this.head = null;
    this.nextEgg = null;

}

Eggs.prototype = {
    add: function(egg) {
        var node = {
            data: egg,
            next: null
        };

        if (!this.head) {
            this.head = node;
            this.nextEgg = node;
        } else {
            node.next = this.head;
            this.head = node;
        }

        this.length++;
    },
    remove: function(egg) {
        if (this.length > 0) {

            var current = this.head;
            var previous;

            while (current.data !== egg) {
                previous = current;
                current = current.next;
            }

            if (previous) {
                previous.next = current.next;
            } else {
                this.head = current.next;
            }

            if (current === this.nextEgg) {
                if (current.next) {
                    this.nextEgg = current.next;
                } else {
                    this.nextEgg = this.head;
                }

            }
            this.length--;
        }
    },
    addNewEgg: function() {
              
        var horizontal = (Math.random() > 0.5) ? 'left' : 'right';

        var vertical = (Math.random() > 0.5) ? 'up' : 'down';
        
        if(!GameSpace.sprites['egg-'+horizontal+'-'+vertical+'-1'].alive) {
            this.add(new Egg(horizontal, vertical));
            
            return true;
        } else {
            return false;
        }
    },
    moveNextEgg: function() {
        var hasMoved = false;

        if (this.nextEgg) {
            hasMoved = this.nextEgg.data.move();

            if (this.nextEgg.next) {
                this.nextEgg = this.nextEgg.next;
            } else {
                this.nextEgg = this.head;
            }
        }

        return hasMoved;
    }
};


