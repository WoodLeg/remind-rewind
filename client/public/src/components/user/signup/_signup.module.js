(function(){
    'use strict';

    angular
        .module('remindRewind.user.signup', [])
        .config(config);

    config.$inject = ['$stateProvider'];

    function config($stateProvider){
        $stateProvider
            .state('remindRewind.signup', {
                url: '/signup',
                views: {
                    'content@': {
                        templateUrl: '/src/components/user/signup/signup.html',
                        controller: 'signupController as ctrl'
                    }
                }
            })
    }

})();
