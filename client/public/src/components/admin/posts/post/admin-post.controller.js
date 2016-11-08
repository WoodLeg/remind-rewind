(function(){
    'use strict';

    angular
        .module('remindRewind.admin.posts.solo')
        .controller('postAdminController', PostAdminController);

    PostAdminController.$inject = ['userFactory', 'graphqlFactory', '$log', '$state'];

    function PostAdminController(userFactory, graphqlFactory, $log, $state){

        var self = this;
        this.user = userFactory.getUser();

        this.createPost = function(){
            graphqlFactory.addPostMutation(self.newPost, this.user.id).then(function(response){
                $state.go('remindRewind.admin.posts.many');
            }).catch(function(reason){
                $log.debug('ERR ADD POST: ', reason);
            });
        };

    }


})();
