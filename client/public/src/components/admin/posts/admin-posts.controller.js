(function(){
    'use strict';

    angular
        .module('remindRewind.admin.posts')
        .controller('postAdminController', PostAdminController);

    PostAdminController.$inject = ['graphqlFactory', '$timeout'];

    function PostAdminController(graphqlFactory, $timeout){

        var self = this;
        console.log('POST');



    }


})();
