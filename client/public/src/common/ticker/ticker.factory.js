(function(){
    'use strict';


    angular
        .module('remindRewind.ticker')
        .factory('tickerFactory', TickerFactory);

    TickerFactory.$inject = ['tickerService'];


    function TickerFactory(tickerService){

        var tickerFactory = {};


        tickerFactory.getUserLiveshares = function(){
            return tickerService.getUserLiveshares();
        };

        return tickerFactory;
    }



})();
