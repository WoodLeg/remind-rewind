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
            'hc.marked',
            'hljs',
            'angular-markdown-editor',
            'base64',



            // Components
            'remindRewind.i18n',
            'remindRewind.notification',
            'remindRewind.form',
            'remindRewind.list',
            'remindRewind.authentication',
            'remindRewind.spinner',
            'remindRewind.modal',
            'remindRewind.error',
            'remindRewind.graphql',
            'remindRewind.menu',
            'remindRewind.user',
            'remindRewind.home',
            'remindRewind.admin',
            'remindRewind.posts',
            'remindRewind.footer'
        ]);
})();
