(function() {
    'use strict';

    angular.module('remindRewind.modal')
        .controller('modalController', ModalController);

    ModalController.$inject = ['$uibModalInstance', 'options','ezfb', '$log', 'graphqlFactory', 'userFactory'];
    function ModalController($uibModalInstance, options, ezfb, $log, graphqlFactory, userFactory) {

        this.options = options;


        this.facebookLogin = function () {
            ezfb.login(function (res) {
                $log.debug(res);
                ezfb.api('/me?fields=id,name,email,picture').then(function(response){
                    $log.debug(response);
                    userFactory.setUser(response);
                    self.user = userFactory.getUser();
                    $uibModalInstance.close(response);
                })
                // graphqlFactory.facebookLogin(userID)

            });
        };

        this.cancel = function() {
            $uibModalInstance.dismiss('cancel');
        };

        this.confirm = function(data) {

            if (data) {
                $uibModalInstance.close(data);
            } else {
                $uibModalInstance.close('confirmed');
            }
        };


    }
})();
