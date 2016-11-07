(function(){
    'use strict';

    angular
        .module('remindRewind.admin', [
            'remindRewind.admin.posts',
            'remindRewind.admin.users',
            'remindRewind.admin.artists'
        ])
        .config(config);

    config.$inject = ['$stateProvider'];

    function config($stateProvider){
        $stateProvider
            .state('remindRewind.admin', {
                url: '/admin',
                abstract: true,
                views: {
                    'content@': {
                        templateUrl: '/src/components/admin/admin.html',
                        controller: 'adminController as ctrl'
                    }
                }
            });

    }


})();
