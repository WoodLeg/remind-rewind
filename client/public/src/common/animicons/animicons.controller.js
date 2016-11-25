(function(){
    'use strict';

    angular
        .module('remindRewind.animicons')
        .controller('animiController', AnimiController);

    AnimiController.$inject = ['$log'];


    function AnimiController($log){

        var self = this;

        $log.debug('Current likes: ', this.likes);
        $log.debug('User liked it: ', this.isLiked);

        this.toggleLike = function(){
            if (self.isLiked) {
                self.isLiked = !self.isLiked;
                self.likes--;
            } else {
                self.isLiked = !self.isLiked;
                self.likes++;
            }
        }


    }

})();
