(function(){
    'use strict';


    angular
        .module('remindRewind.ticker')
        .service('tickerService', TickerService);

    TickerService.$inject = ['$q'];

    function TickerService($q){

        this.getUserLiveshares = function(){
            var deferred = $q.defer();

            deferred.resolve([
                {
                    name: '',
                    liveshareId: 0,
                    owner: {
                        firstName: 'Elliot',
                        lastName: 'Alderson'
                    },
                    device: {
                        name: 'Sony Xperia Z5 ',
                        version : '6.0.1 - API 19'
                    }
                },{
                    name: '',
                    liveshareId: 0,
                    liveshareOwner: {
                        firstName: 'Elliot',
                        lastName: 'Alderson'
                    },
                    device: {
                        name: 'Sony Xperia Z5',
                        version : '6.0.1 - API 19'
                    }
                }, {
                    name: '',
                    liveshareId: 0,
                    liveshareOwner: {
                        firstName: 'Elliot',
                        lastName: 'Alderson'
                    },
                    device: {
                        name: 'Sony Xperia Z5',
                        version : '6.0.1 - API 19'
                    }
                }
            ]);

            return deferred.promise;
        };

    }

})();
