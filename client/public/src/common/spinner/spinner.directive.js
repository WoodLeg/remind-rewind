(function(){
    'use strict';

    angular
        .module('remindRewind.spinner')
        .directive('spinner', Spinner);

    function Spinner(){
        return {
            restrict: 'E',
            scope: true,
            templateUrl: '/src/common/spinner/spinner.html',
            bindToController: getBindings(),
            controller: 'spinnerController as ctrl'
        };

    }

    function getBindings(){
        return {
            options: '='
        };
    }

})();
