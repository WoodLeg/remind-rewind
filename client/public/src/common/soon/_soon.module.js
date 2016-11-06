(function(){
    'use strict';

    angular
        .module('remindRewind.soon', [])
        .config(config);

    config.$inject = ['$stateProvider', '$translatePartialLoaderProvider'];

    function config($stateProvider, $translatePartialLoaderProvider) {

        $translatePartialLoaderProvider.addPart('soon');

        $stateProvider
            .state('remindRewind.soon', {
                url: '/soon',
                views: {
                    'content@': {
                        templateUrl: '/src/common/soon/soon.html'
                    },
                    'background@': {
                        templateUrl: '/src/common/background/background.html'
                    }
                }
            });
    }

})();
