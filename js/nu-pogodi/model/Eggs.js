/**
 * @author Paweł Winiecki <pawel.winiecki@nerdlab.pl>
 * @copyright 2014 NerdLab.pl
 * @license MIT License
 */
var NuPogodi = NuPogodi || {};

/**
 * Eggs constructor
 * 
 * @class NuPogodi.Eggs
 * @classdesc Collection of Egg objects 
 * @constructor
 * @param {NuPogodi.GameState} state - a reference to the currently running game state.
 */
NuPogodi.Eggs = function(state) {
    'use strict';

    /**
     * @property {NuPogodi.GameState} state - local reference to game state.
     */
    this.state = state;

    /**
     * @property {number} length - number of eggs in colection.
     * @default
     */
    this.length = 0;

    /**
     * @property {object} head - first node in collection with egg.
     * @default
     */
    this.head = null;

    /**
     * @property {object} nextEgg - node with next egg to move.
     * @default
     */
    this.nextEgg = null;

};

NuPogodi.Eggs.prototype = {
    /**
     * Adding egg to collection
     *
     * @method NuPogodi.Eggs#add
     * @param {NuPogodi.Egg} egg - egg to add
     */
    add: function(egg) {
        'use strict';

        // simple object as node. Both property are NuPogodi.Egg
        var node = {
            data: egg,
            next: null
        };

        // If eggs hasn't egg added egg will set as head, 
        // otherwise we add egg to begining of collection
        if (!this.head) {
            this.head = node;
            this.nextEgg = node;
        } else {
            node.next = this.head;
            this.head = node;
        }

        this.length++;
    },
    /**
     * Removing egg from collection
     *
     * @method NuPogodi.Eggs#remove
     * @param {NuPogodi.Egg} egg - egg to remove. 
     */
    remove: function(egg) {
        'use strict';

        // checking does collection have eny egg.
        if (this.length > 0) {

            var current = this.head;
            var previous;

            // searching in collection for node with egg to remove
            while (current.data !== egg) {
                previous = current;
                current = current.next;
            }

            // removing current from collection
            // if previous isn't defined that head will be remove 
            if (previous) {
                previous.next = current.next;
            } else {
                this.head = current.next;
            }

            // setting new next egg to move if we remove actual
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
    /**
     * Creating in random route and add it to collection
     *
     * @method NuPogodi.Eggs#addNewEgg
     * @return {boolean} Return true if egg has added otherwise return false.
     */
    addNewEgg: function() {
        'use strict';

        var horizontal = (Math.random() > 0.5) ? true : false;
        var vertical = (Math.random() > 0.5) ? true : false;

        // checking are rand egg sprite alive
        if (!this.state.sprites['egg-'
                + (horizontal ? 'right' : 'left')
                + '-'
                + (vertical ? 'up' : 'down')
                + '-1'].alive)
        {
            this.add(new NuPogodi.Egg(this.state, horizontal, vertical));
            return true;
        } else {
            return false;
        }
    },
    /**
     * moving egg if possible
     *
     * @method NuPogodi.Eggs#moveNextEgg
     * @return {boolean} Return true if egg has moved otherwise return false.
     */
    moveNextEgg: function() {
        'use strict';

        var hasMoved = false;
        var node = this.nextEgg;

        if (this.nextEgg) {
            hasMoved = node.data.move();
            if (this.length > 0) {
                if (node.next) {
                    this.nextEgg = node.next;
                } else {
                    this.nextEgg = this.head;
                }
            } else {
                this.addNewEgg();
            }
        }

        return hasMoved;
    },
    /**
     * Clear whole collection
     *
     * @method NuPogodi.Eggs#clear
     */
    clear: function() {
        'use strict';

        this.head = null;
        this.next = null;
        this.length = 0;
    }
};


