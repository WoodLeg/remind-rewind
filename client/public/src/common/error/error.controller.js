(function(){
    'use strict';

    angular
        .module('remindRewind.error')
        .controller('errorController', ErrorController);

    ErrorController.$inject = ['$stateParams'];

    function ErrorController($stateParams){
        this.errorTitle = $stateParams.errorTitle || 'That\'s all folks!';
        this.errorContent = $stateParams.errorContent || 'This resource is not available anymore.';
    }

})();
