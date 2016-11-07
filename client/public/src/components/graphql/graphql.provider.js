(function(){
    'use strict';

    angular
        .module('remindRewind.graphql')
        .provider('graphqlProvider', GraphqlProvider);

    GraphqlProvider.$inject = [];

    function GraphqlProvider() {

        this.$get = [function() {
            return {
                prepareQuery: function(dataQuery) {
                    return {
                        query: "query " + dataQuery,
                        variables: null
                    };
                }
            };
        }];

    }
})();
