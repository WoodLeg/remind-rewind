(function(){
    'use strict';

    angular
        .module('remindRewind.admin')
        .controller('adminController', AdminController);

    AdminController.$inject = ['userFactory'];

    function AdminController(userFactory){

        var self = this;
        this.me = userFactory.getUser();

    }

})();
