(function(){
    'use strict';

    angular
        .module('remindRewind.sharing', [])
        .config(config);

    config.$inject= ['$translatePartialLoaderProvider'];

    function config($translatePartialLoaderProvider){

        $translatePartialLoaderProvider.addPart('sharing');

    }

})();
