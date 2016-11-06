(function() {
    'use strict';

    angular.module('remindRewind.modal')
        .controller('modalController', ModalController);

    ModalController.$inject = ['$uibModalInstance', 'options'];
    function ModalController($uibModalInstance, options) {

        this.options = options;


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
