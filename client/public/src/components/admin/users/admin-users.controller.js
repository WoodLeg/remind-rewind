(function(){
    'use strict';

    angular
        .module('remindRewind.admin.users')
        .controller('usersAdminController', UsersAdminController);

    UsersAdminController.$inject = ['graphqlFactory', '$timeout', '$log'];

    function UsersAdminController(graphqlFactory, $timeout, $log){

        var self = this;
        this.displayListUsers = true;
        self.newUserData = {};
        self.newUserData.isAdmin = false;

        this.toggleAddUser = function(){
            self.displayListUsers = !self.displayListUsers;
        };

        this.listUsers = function(){
            graphqlFactory.query('{users {id firstName lastName email isAdmin}}').then(function(response){
                self.users = response.data.users;
            }).catch(function(reason){
                $log.debug(reason);
            });
        };

        this.addUser = function(){
            graphqlFactory.mutation(self.newUserData).then(function(response){
                $log.debug('SUCCESS Add user: ', response);
                self.users.push(response.data.addUser);
                self.newUserData = {};
            }).catch(function(reason){
                $log.debug('ERROR ADD USER: ', reason);
            });
        };

        $timeout(function(){
            self.listUsers();;
        });


    }



})();
