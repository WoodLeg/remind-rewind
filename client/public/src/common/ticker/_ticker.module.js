(function(){

    'use strict';

    angular
        .module('remindRewind.ticker', [])
        .config(config);

    config.$inject = ['$translatePartialLoaderProvider'];

    function config($translatePartialLoaderProvider){

        $translatePartialLoaderProvider.addPart('ticker');

    }



})();
