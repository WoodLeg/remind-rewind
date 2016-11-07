(function(){
    'use strict';

    angular
        .module('remindRewind.graphql')
        .factory('graphqlFactory', GraphqlFactory);

    GraphqlFactory.$inject = ['graphqlProvider', 'graphqlService', '$q'];

    function GraphqlFactory(graphqlProvider, graphqlService, $q){
        var graphqlFactory = {};


        graphqlFactory.query = function(dataRequested){
            var payload = graphqlProvider.prepareQuery(dataRequested);
            return graphqlService.query(payload).then(function(response){
                return $q.resolve(response.data);
            }).catch(function(reason){
                return $q.reject(reason);
            });
        }

        return graphqlFactory;
    }


})();
