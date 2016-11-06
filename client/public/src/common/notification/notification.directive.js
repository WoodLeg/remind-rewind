(function() {
    'use strict';

    angular
    .module('remindRewind.notification')
    .directive('notification', Notification);

    Notification.$inject = ['notificationFactory'];

    function Notification(notificationFactory) {
        return {
            restrict: 'E',
            controller: [function() {
                this.closeAlert = function(item) {
                    notificationFactory.pop(item);
                };
            }],
            controllerAs: 'API',
            templateUrl: '/src/common/notification/notification.html'
        };
    }
})();
