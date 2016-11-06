(function(){
    'use strict';

    angular
        .module('remindRewind.spinner')
        .controller('spinnerController', SpinnerController);

    SpinnerController.$inject = ['$rootScope', '$filter'];

    function SpinnerController($rootScope, $filter) {

        var self = this;
        self.msg = $filter('translate')('SPINNER.GENERIC');

        $rootScope.$on('spinner-msg', function(event, data){
            self.msg = data.msg || $filter('translate')('SPINNER.GENERIC');
        });

    }

})();
