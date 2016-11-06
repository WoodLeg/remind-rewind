(function(){
    'use strict';

    angular
        .module('remindRewind.spinner', [])
        .config(config);

    config.$inject = ['$translatePartialLoaderProvider'];

    function config($translatePartialLoaderProvider){
        $translatePartialLoaderProvider.addPart('spinner');
    }

})();
