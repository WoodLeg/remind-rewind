(function(){
    'use strict';

    angular
        .module('remindRewind.admin')
        .controller('adminController', AdminController);

    AdminController.$inject = ['userFactory'];

    function AdminController(userFactory){

        this.me = userFactory.getUser();

    }

})();
