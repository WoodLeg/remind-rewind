(function() {
    'use strict';

    angular
    .module('remindRewind.i18n')
    .factory('missingTranslationHandler', MissingTranslationHandler);

    MissingTranslationHandler.$inject = [];

    function MissingTranslationHandler() {
        return function (translationKey) {
            return '?' + translationKey + '?';
        };
    }
})();
