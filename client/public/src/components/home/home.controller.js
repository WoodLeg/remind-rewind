(function() {
    'use strict';

    angular
    .module('remindRewind.home')
    .controller('homeController', HomeController);

    HomeController.$inject = ['HAPPYHOUR'];

    function HomeController(HAPPYHOUR) {
        this.happyHour = HAPPYHOUR;


    }

})();
