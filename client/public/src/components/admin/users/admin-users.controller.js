(function(){
    'use strict';

    angular
        .module('remindRewind.admin.users')
        .controller('usersAdminController', UsersAdminController);

    UsersAdminController.$inject = ['graphqlFactory', '$timeout'];

    function UsersAdminController(graphqlFactory, $timeout){

        var self = this;


        this.listUsers = function(){
            graphqlFactory.query('{users {id firstName lastName email isAdmin}}').then(function(response){
                self.users = response.data.users;
            }).catch(function(reason){
                $log.debug(reason);
            });
        };

        $timeout(function(){
            self.listUsers();;
        });


    }



})();
