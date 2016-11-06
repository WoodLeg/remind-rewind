(function() {
    'use strict';

    angular
    .module('remindRewind.notification')
    .factory('notificationFactory', NotificationFactory);

    NotificationFactory.$inject = ['$rootScope', '$timeout'];

    function NotificationFactory($rootScope, $timeout) {

        var notificationFactory = {};
        var queue = [];

        var listenerQueue = [
            'successConnection',
            'closeWrongToken',
            'closeConnection',
            'closeConnectionUnavailable',
            'userListUpdated'
        ];

        notificationFactory.queue = queue;

        notificationFactory.display = function(notification) {
            $rootScope.$apply(function() {
                notificationFactory.add({type: notification.type, body: notification.body, title: notification.title, delay: notification.delay});
            });
        };

        for (var i = 0; i < listenerQueue.length; i++) {
            $rootScope.$on(listenerQueue[i], function(event, notification){
                notificationFactory.display(notification);
            });
        }

        notificationFactory.add = function(item) {
            var index = -1;
            for (var i = 0; i < this.queue.length; i++) {
                if (queue[i].body == item.body) {
                    index = i;
                    break;
                }
            }
            if (index !== -1) {
                return;
            }
            queue.push(item);

            $timeout(function() {
                notificationFactory.pop(item.body);
            }, item.delay);
        };

        notificationFactory.pop = function(item) {
            var index = -1;
            for (var i = 0; i < this.queue.length; i++) {
                if (queue[i].body == item) {
                    index = i;
                    break;
                }
            }
            if (index !== -1) {
                queue.splice(index, 1);
            }
            return this.queue;
        };

        return notificationFactory;
    }
})();
