(function(){
    'use strict';

    angular
        .module('remindRewind.menu')
        .controller('menuController', MenuController);

    MenuController.$inject = ['modalFactory', 'userFactory', '$log', '$state', 'ezfb', '$timeout', 'graphqlFactory'];

    function MenuController(modalFactory, userFactory, $log, $state, ezfb, $timeout, graphqlFactory){

        var self = this;
        this.user = userFactory.getUser() || null;
        $log.debug(this.user);

        this.facebookLoggedIn = function() {
            ezfb.getLoginStatus(function(response){
                $log.debug('Facebook status: ', response);
                if (response.status === 'connected') {
                    ezfb.api('/me?fields=id,name,email,picture').then(function(facebookData){
                        userFactory.signin(facebookData).then(function(response){
                            self.user = response.data.user;
                            self.user.picture = facebookData.picture;
                            userFactory.setUser(self.user);
                        });
                    });
                } else {
                    userFactory.clean();
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
                    self.user.picture = user.picture;
                    userFactory.setUser(self.user);
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


        this.diggearModal = function(){
            modalFactory.launch({
                title: 'What\'s a diggear ?',
                template: '/src/components/menu/template/diggear-modal.html',
                windowClass: 'menu__diggear-modal-window',
                confirm: 'Sure I do !',
                user: userFactory.getUser(),
                cancel: 'Hell no !'
            }).then(function(){
                graphqlFactory.diggearRequestMutation(self.user.id).catch(function(err){
                    $log.debug('FAILED DIGGEAR REQUEST: ', err);
                    modalFactory.launch({
                        title: 'Success !',
                        content: 'You have been added to the diggearz waiting list !'
                    });
                });
            });
        };

        $timeout(function(){
            self.facebookLoggedIn();
        });

    }

})();
