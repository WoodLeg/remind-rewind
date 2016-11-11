(function() {
    'use strict';

    angular
    .module('remindRewind.home')
    .controller('homeController', HomeController);

    HomeController.$inject = ['graphqlFactory', '$log', '$timeout'];

    function HomeController(graphqlFactory, $log, $timeout) {

        var self = this;
        this.featuredPosts = [];
        this.posts = [];


        this.getPosts = function(){
            graphqlFactory.query('{ posts { id title artist featured author {firstName}}}').then(function(response){
                for (var i = 0; i < response.data.posts.length; i++) {
                    if (response.data.posts[i].featured){
                        self.featuredPosts.push(response.data.posts[i]);
                    } else {
                        self.posts.push(response.data.posts[i]);
                    }
                }
                $log.debug('FEatured: ', self.featuredPosts);
                $log.debug('Post: ', self.posts);
            }).catch(function(reason){
                $log.debug('ERR LIST POST: ', reason)
            });
        };

        $timeout(function(){
            self.getPosts();
        });

    }

})();
