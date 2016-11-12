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
            graphqlFactory.query('{ posts { id title artist { name images {url}} featured author {firstName}}}').then(function(response){
                for (var i = 0; i < response.data.posts.length; i++) {
                    if (response.data.posts[i].featured){
                        self.featuredPosts.push(response.data.posts[i]);
                    } else {
                        self.posts.push(response.data.posts[i]);
                    }
                }
                console.log(self.featuredPosts);
            }).catch(function(reason){
                $log.debug('ERR LIST POST: ', reason)
            });
        };

        $timeout(function(){
            self.getPosts();
        });

    }

})();
