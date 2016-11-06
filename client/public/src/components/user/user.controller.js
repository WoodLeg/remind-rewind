(function() {
    'use strict';

    angular
    .module('remindRewind.user')
    .controller('userController', UserController);

    UserController.$inject = [];

    function UserController() {

        var self = this;

        this.dummyFunction = function() {
            self.name = 'user';
        };

    }
})();
