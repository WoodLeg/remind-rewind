(function(){
    'use strict';

    angular
        .module('remindRewind.admin.users.solo')
        .controller('userAdminController', UserAdminController);

    UserAdminController.$inject = ['$stateParams', 'graphqlFactory', '$timeout', '$log'];

    function UserAdminController($stateParams, graphqlFactory, $timeout, $log){

        var self = this;

        this.getUserInfo = function(id){
            graphqlFactory.query('{ user(id: \"'+id+'\") {id firstName lastName email isAdmin isModerator posts {id title likes}}}').then(function(response){
                $log.debug('SUCC GET USER INFO: ', response);
                self.user = response.data.user;
            }).catch(function(reason){
                $log.debug('ERR GET USER INFO: ', reason);
            });
        };

        this.promoteUser = function(id, moderator) {
            graphqlFactory.promoteUserMutation(id, moderator).then(function(response){
                self.user.isModerator = response.data.promoteUser.isModerator;
            }).catch(function(reason){
                $log.debug('ERR PROMOTE USER: ',reason);
            });
        };


        $timeout(function(){
            self.getUserInfo($stateParams.id);
        });


    }

})();
