(function() {
    'use strict';

    angular
    .module('remindRewind.home')
    .controller('homeController', HomeController);

    HomeController.$inject = ['graphqlFactory', '$log', '$timeout'];

    function HomeController(graphqlFactory, $log, $timeout) {

        var self = this;



        this.getPosts = function(){
            graphqlFactory.query('{ posts { id title artist author {firstName}}}').then(function(response){
                self.posts = response.data.posts;
            }).catch(function(reason){
                $log.debug('ERR LIST POST: ', reason)
            });
        };

        $timeout(function(){
            self.getPosts();
        });

    }

})();
