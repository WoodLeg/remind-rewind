(function(){
    'use strict';


    angular
        .module('remindRewind.ticker')
        .directive('ticker', Ticker);

    function Ticker(){
        return {
            restrict: 'E',
            scope: true,
            templateUrl: '/src/common/ticker/ticker.html',
            bindToController: getBindings(),
            controller: 'tickerController as ctrl'
        };
    }


    function getBindings(){
        return {
        };
    }


})();
