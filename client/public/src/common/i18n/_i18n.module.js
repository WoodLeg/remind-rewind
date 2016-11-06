(function() {
    'use strict';

    angular
    .module('remindRewind.i18n', ['pascalprecht.translate', 'ngCookies'])
    .config(config);

    config.$inject = ['$translateProvider'];

    function config($translateProvider) {
        $translateProvider
        .useLoader('$translatePartialLoader', {
            urlTemplate: 'assets/i18n/{part}.i18n_{lang}.json'
        })
        .useLoaderCache('$translationCache')
        .preferredLanguage('en')
        .registerAvailableLanguageKeys(['en'])
        .fallbackLanguage('en')
        .useSanitizeValueStrategy('escape')
        .useMissingTranslationHandler('missingTranslationHandler');
    }
})();
