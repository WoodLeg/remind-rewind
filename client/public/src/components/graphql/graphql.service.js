(function(){
    'use strict';

    angular
        .module('remindRewind.graphql')
        .service('graphqlService', GraphqlService);

    GraphqlService.$inject = ['$http'];

    function GraphqlService($http){


        this.send = function(payload) {
            return $http.post('http://localhost:8080/graphql', payload);
        };



    }


})();
