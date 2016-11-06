(function(){
    'use strict';

    angular
        .module('remindRewind.sharing')
        .directive('sharing', Sharing);

    function Sharing(){
        return {
            restrict: 'E',
            scope: true,
            transclude: true,
            templateUrl: '/src/common/sharing/sharing.html',
            bindToController: getBindings(),
            controller: 'sharingController as ctrl'
        };

    }

    function getBindings(){
        return {
            'title': '@',
            'mode': '@',
            'advanced': '@',
            'options': '=',
            'api': '=',
            'transclude': '@'
        };
    }

})();
