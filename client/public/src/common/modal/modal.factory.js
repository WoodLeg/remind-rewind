(function() {
    'use strict';

    angular.module('remindRewind.modal')
        .factory('modalFactory', ModalFactory);

    ModalFactory.$inject = ['$uibModal'];
    function ModalFactory($uibModal) {
        var modalFactory = {};

        /**
         * Launches a new modal.
         *
         * @param {Object} options
         *   - {String} title
         *   - {String} content
         *   - {String} confirm
         *   - {String} cancel
         *
         * @returns {Promise}
         */
        modalFactory.launch = function(options) {
            options.template = options.template || '/src/common/modal/modal.html';
            options.size = options.size || 'md';
            options.img = options.img || null;
            options.windowClass = options.windowClass || null;
            options.message = options.message || null;

            var instance = $uibModal.open({
                animation: true,
                templateUrl: options.template,
                controller: 'modalController as ctrl',
                windowClass: options.windowClass,
                resolve: {
                    options: function() { return options; }
                }
            });

            // Deliver result promise
            return instance.result;
        };

        return modalFactory;
    }
})();
