(function(){
    'use strict';

    angular
        .module('remindRewind.spinner')
        .controller('spinnerController', SpinnerController);

    SpinnerController.$inject = ['$rootScope'];

    function SpinnerController($rootScope) {

        var self = this;
        this.display = false;

        $rootScope.$on('spinner', function(event, data){
            self.display = data;
        });

    }

})();
