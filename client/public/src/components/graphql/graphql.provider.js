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
                        query: 'query ' + dataQuery,
                        variables: null
                    };
                },
                prepareAddUserMutation: function(dataMutation){
                    return {
                        query: 'mutation {addUser(firstName: ' + dataMutation.firstName + ', lastName: ' + dataMutation.lastName + ', email: '+ dataMutation.email + ', isAdmin: ' + dataMutation.isAdmin +'){id firstName lastName email isAdmin}}',
                        variables: null
                    };
                }
            };
        }];

    }
})();
