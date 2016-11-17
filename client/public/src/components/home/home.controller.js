(function() {
    'use strict';

    angular
    .module('remindRewind.home')
    .controller('homeController', HomeController);

    HomeController.$inject = ['graphqlFactory', '$log', '$timeout', '$state', '$base64'];

    function HomeController(graphqlFactory, $log, $timeout, $state, $base64) {

        var self = this;
        this.featuredPosts = [];
        this.posts = [];

        this.getPosts = function(){
            graphqlFactory.query('{ posts (admin: false){ id title date content artist { name  albums { images {url}}} featured author {firstName}}}').then(function(response){
                for (var i = 0; i < response.data.posts.length; i++) {
                    response.data.posts[i].content = $base64.decode(response.data.posts[i].content);
                    if (response.data.posts[i].featured){
                        self.featuredPosts.push(response.data.posts[i]);
                    } else {
                        self.posts.push(response.data.posts[i]);
                    }
                }
                self.featurePostRandom = Math.floor(Math.random() * (self.featuredPosts.length - 0) + 0);
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
