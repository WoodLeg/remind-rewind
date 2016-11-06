(function() {
    'use strict';

    angular
    .module('remindRewind.form', [
        'remindRewind.form.email',
        'remindRewind.form.password'
    ])
    .config(config);

    config.$inject = ['$translatePartialLoaderProvider'];

    function config($translatePartialLoaderProvider) {
        $translatePartialLoaderProvider.addPart('form');
    }

})();
