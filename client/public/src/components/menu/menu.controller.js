(function(){
    'use strict';

    angular
        .module('remindRewind.menu')
        .controller('menuController', MenuController);

    MenuController.$inject = ['modalFactory', 'userFactory', '$log', '$state']

    function MenuController(modalFactory, userFactory, $log, $state){

        var self = this;
        this.user = userFactory.getUser() || null;

        this.login = function(){
            modalFactory.launch({
                title: 'Yo',
                content: 'Bouyaka',
                template: '/src/components/menu/template/user.login.modal.html',
                windowClass: 'menu__signin-modal-container',
                confirm: 'Send',
                cancel: 'Close'
            }).then(function(user){
                userFactory.signin(user).then(function(response){
                    self.user = response.data.user;
                }).catch(function(err){
                    modalFactory.launch({
                        title: 'ERR',
                        content: err.data.msg,
                        confirm: 'Ok'
                    });
                });
            });
        };

        this.logout = function(){
            userFactory.clean();
            self.user = null;
            $state.go('remindRewind.home');
        };

    }

})();
