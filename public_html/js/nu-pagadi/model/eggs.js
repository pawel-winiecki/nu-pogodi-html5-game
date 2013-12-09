/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
function Eggs() {
    this.length = 0;
    this.head = null;
    this.nextEgg = null;

//    this.add = function(egg) {
//        var node = {
//            data: egg,
//            next: null
//        };
//
//        if (head === null) {
//            this.head = node;
//        } else {
//            var current = this.head;
//
//            while (current.next) {
//                current = current.next;
//            }
//
//            current.next = node;
//        }
//
//        this.length++;
//    };
//
//    this.remove = function(egg) {
//        if (this.length > 0) {
//
//            var current = this.head;
//            var previous;
//
//            while (current.data !== egg) {
//                previous = current;
//                current = current.next;
//            }
//
//            if (previous !== null) {
//                previous.next = current.next;
//            } else {
//                this.head = current;
//            }
//
//            if (current === this.nextEgg) {
//                this.nextEgg = current;
//            }
//        }
//    };
//
//    this.moveNextEgg = function() {
//        if (this.nextEgg) {
//            this.nextEgg.data.move();
//
//            this.nextEgg = this.nextEgg.next;
//        }
//    };
};

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


//        if (this.head === null) {
//            this.head = node;
//            this.nextEgg = node;
//        } else {
//            var current = this.head;
//
//            while (current.next) {
//                current = current.next;
//            }
//
//            current.next = node;
//        }

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
                if(current.next) {
                    this.nextEgg = current.next;
                } else {
                    this.nextEgg = this.head;
                }
                
            }
            this.length--;
        }
    },
    
    moveNextEgg: function() {
        if (this.nextEgg) {
            this.nextEgg.data.move();
            
            if(this.nextEgg.next) {
                this.nextEgg = this.nextEgg.next;
            } else {
                this.nextEgg = this.head;
            }
        }
    }
};


