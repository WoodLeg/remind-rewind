(function(){
    'use strict';

    angular
        .module('remindRewind.admin.posts')
        .controller('postAdminController', PostAdminController);

    PostAdminController.$inject = ['graphqlFactory', '$timeout', '$log', '$state'];

    function PostAdminController(graphqlFactory, $timeout, $log, $state){

        var self = this;
        console.log('POST');

        this.loadPosts = function(){
            graphqlFactory.query('{posts {id title content likes artist date author {id firstName lastName }}}').then(function(response){
                $log.debug('SUCC LIST POSTS: ', response);
                self.posts = response.data.posts;
            }).catch(function(reason){
                $log.debug('ERROR LIST POSTS: ', reason);
            });
        };

        this.goToUser = function(userID){
            $state.go('remindRewind.admin.users.solo', {id: userID});
        };

        $timeout(function(){
            self.loadPosts();
        });

    }


})();
