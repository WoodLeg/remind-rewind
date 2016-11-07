(function(){
    'use strict';

    angular
        .module('remindRewind.admin')
        .controller('adminController', AdminController);

    AdminController.$inject = ['graphqlFactory', '$timeout'];

    function AdminController(graphqlFactory, $timeout){

        var self = this;

        this.listUsers = function(){
            graphqlFactory.query('{users {id firstName lastName email}}').then(function(response){
                self.users = response.data.users;
            }).catch(function(reason){
                console.log(reason);
            });
        };

        $timeout(function(){
            self.listUsers();
        });
    }

})();
