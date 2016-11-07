(function() {
    'use strict';

    angular
        .module('remindRewind', [
            // Libs
            'ui.router',
            'ui.bootstrap',
            'ngAnimate',
            'ngCookies',
            'ngStorage',
            'ngMessages',
            'angular-jwt',

            // Components
            'remindRewind.i18n',
            'remindRewind.notification',
            'remindRewind.form',
            'remindRewind.list',
            'remindRewind.soon',
            'remindRewind.units',
            'remindRewind.authentication',
            'remindRewind.user',
            'remindRewind.spinner',
            'remindRewind.modal',
            'remindRewind.menu',
            'remindRewind.error',
            'remindRewind.home',
            'remindRewind.admin'
        ]);
})();
