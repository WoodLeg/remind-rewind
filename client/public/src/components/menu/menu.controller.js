(function(){
    'use strict';

    angular
        .module('remindRewind.menu')
        .controller('menuController', MenuController);

    MenuController.$inject = ['modalFactory', 'userFactory', '$log']

    function MenuController(modalFactory, userFactory, $log){

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
                    $log.debug('SUCC: ', response);
                    self.user = response.data;
                }).catch(function(err){
                    $log.debug('ERR: ', err);
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
        };

    }

})();
