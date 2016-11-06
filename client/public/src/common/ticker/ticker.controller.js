(function(){
    'use strict';

    angular
        .module('remindRewind.ticker')
        .controller('tickerController', TickerController);

    TickerController.$inject = ['tickerFactory', '$timeout', '$log'];


    function TickerController(tickerFactory, $timeout, $log){

        var self = this;


        $timeout(function(){
            tickerFactory.getUserLiveshares().then(function(data){
                $log.debug('Get liveshare success');
                $log.debug(data);
                self.tickerLiveshare = data[0];
            }, function(){
                $log.debug('Get liveshare failes');
            });

        });

    }

})();
