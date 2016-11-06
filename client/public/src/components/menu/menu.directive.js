(function(){
    'use strict';

    angular
        .module('remindRewind.menu')
        .directive('menu', Menu);

    function Menu(){
        return {
            restrict: 'E',
            bindToController: getBindings(),
            controller: 'menuController as ctrl',
            scope: true,
            templateUrl: '/src/components/menu/menu.html'
        };
    }

    function getBindings(){
        return {

        };
    }

})();
