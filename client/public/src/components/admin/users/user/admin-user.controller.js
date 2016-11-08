(function(){
    'use strict';

    angular
        .module('remindRewind.admin.users.solo')
        .controller('userAdminController', UserAdminController);

    UserAdminController.$inject = ['$stateParams', 'graphqlFactory', '$timeout', '$log'];

    function UserAdminController($stateParams, graphqlFactory, $timeout, $log){
        console.log('USER SOLO: ', $stateParams.id);

        var self = this;

        this.getUserInfo = function(id){
            graphqlFactory.query('{ user(id: \"'+id+'\") {id firstName lastName email isAdmin isModerator}}').then(function(response){
                $log.debug('SUCC GET USER INFO: ', response);
                self.user = response.data.user;
            }).catch(function(reason){
                $log.debug('ERR GET USER INFO: ', reason);
            });
        };


        $timeout(function(){
            self.getUserInfo($stateParams.id);
        });


    }

})();
