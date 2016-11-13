(function() {
    'use strict';

    angular
    .module('remindRewind.home')
    .controller('homeController', HomeController);

    HomeController.$inject = ['graphqlFactory', '$log', '$timeout', '$state'];

    function HomeController(graphqlFactory, $log, $timeout, $state) {

        var self = this;
        this.featuredPosts = [];
        this.posts = [];

        this.getPosts = function(){
            graphqlFactory.query('{ posts { id title artist { name  albums { images {url}}} featured author {firstName}}}').then(function(response){
                for (var i = 0; i < response.data.posts.length; i++) {
                    if (response.data.posts[i].featured){
                        self.featuredPosts.push(response.data.posts[i]);
                    } else {
                        self.posts.push(response.data.posts[i]);
                    }
                }
                self.featurePostRandom = Math.floor(Math.random() * (self.featuredPosts.length - 0) + 0);
                $log.debug(self.featurePostRandom);
                $log.debug(self.posts);
            }).catch(function(reason){
                $log.debug('ERR LIST POST: ', reason);
            });
        };

        this.goToPost = function(postID){
            $state.go('remindRewind.posts', {id: postID});
        };

        $timeout(function(){
            self.getPosts();
        });

    }

})();
