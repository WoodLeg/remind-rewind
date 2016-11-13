(function(){
    'use strict';

    angular
        .module('remindRewind.footer')
        .directive('remindFooter', Footer);

    Footer.$inject = [];

    function Footer(){
        return {
            restrict: 'E',
            templateUrl: '/src/components/footer/footer.html'
        };
    }


})();
