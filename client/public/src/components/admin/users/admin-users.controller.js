(function(){
    'use strict';

    angular
        .module('remindRewind.admin.users')
        .controller('usersAdminController', UsersAdminController);

    UsersAdminController.$inject = ['graphqlFactory', '$timeout', '$log', '$state'];

    function UsersAdminController(graphqlFactory, $timeout, $log, $state){

        var self = this;
        this.displayListUsers = true;
        self.newUserData = {};
        self.newUserData.isAdmin = false;
        self.newUserData.isModerator = false;

        this.toggleAddUser = function(){
            self.displayListUsers = !self.displayListUsers;
        };

        this.listUsers = function(){
            graphqlFactory.query('{users {id firstName lastName email isAdmin isModerator }}').then(function(response){
                self.users = response.data.users;
            }).catch(function(reason){
                $log.debug(reason);
            });
        };

        this.addUser = function(){
            graphqlFactory.addUserMutation(self.newUserData).then(function(response){
                $log.debug('SUCCESS Add user: ', response);
                self.users.push(response.data.addUser);
                self.newUserData = {};
                self.newUserData.isAdmin = false;
                self.newUserData.isModerator = false;
                self.toggleAddUser();
            }).catch(function(reason){
                $log.debug('ERROR ADD USER: ', reason);
            });
        };

        this.destroyUser = function(id){
            graphqlFactory.destroyUserMutation(id).then(function(response){
                for (var i = 0; i < self.users.length; i++) {
                    if (self.users[i].id === response.data.destroyUser.id) {
                        self.users.splice(i, 1);
                    }
                }
            }).catch(function(reason){
                $log.debug('ERROR DEL USER: ', reason);
            });
        };

        this.goToUser = function(userID){
            $state.go('remindRewind.admin.users.solo', {id: userID});
        };

        $timeout(function(){
            self.listUsers();
        });


    }



})();
