(function(){
    'use strict';

    angular
        .module('remindRewind.menu')
        .controller('menuController', MenuController);

    MenuController.$inject = ['modalFactory', 'userFactory', '$log', '$state', 'ezfb', '$timeout'];

    function MenuController(modalFactory, userFactory, $log, $state, ezfb, $timeout){

        var self = this;
        this.user = userFactory.getUser() || null;

        this.facebookLoggedIn = function() {
            ezfb.getLoginStatus(function(response){
                if (response.status === 'connected') {
                    ezfb.api('/me?fields=id,name,email,picture').then(function(response){
                        $log.debug(response);
                        userFactory.setUser(response);
                        self.user = userFactory.getUser();
                    });
                }
            });
        };

        this.login = function(){
            modalFactory.launch({
                title: 'Sign in',
                template: '/src/components/menu/template/user.login.modal.html',
                windowClass: 'menu__signin-modal-container',
                confirm: 'Send',
                cancel: 'Close'
            }).then(function(user){
                userFactory.signin(user).then(function(response){
                    self.user = response.data.user;
                }).catch(function(err){
                    // ERRor manager
                    modalFactory.launch({
                        title: 'ERR',
                        content: err.data.msg,
                        confirm: 'Ok'
                    });
                });
            });
        };

        this.logout = function(){
            ezfb.logout().then(function(){
                userFactory.clean();
                self.user = null;
                $state.go('remindRewind.home');
            });
        };

        $timeout(function(){
            self.facebookLoggedIn();
        });

    }

})();
