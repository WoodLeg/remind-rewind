(function(){
    'use strict';

    angular
        .module('remindRewind.graphql')
        .service('graphqlService', GraphqlService);

    GraphqlService.$inject = ['$http', 'API'];

    function GraphqlService($http, API){


        this.send = function(payload) {
            return $http.post(API.URL + API.ENDPOINT.GRAPHQL, payload);
        };



    }


})();
