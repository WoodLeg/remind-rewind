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
                        query: 'mutation {addUser(firstName: \"' + dataMutation.firstName + '\", lastName: \"' + dataMutation.lastName + '\", email: \"'+ dataMutation.email + '\", isAdmin: ' + dataMutation.isAdmin + ', isModerator: ' + dataMutation.isModerator + ',password: \"'+ dataMutation.password + '\") {id firstName lastName email isAdmin isModerator}}',
                        variables: null
                    };
                },
                prepareDestroyUserMutation: function(id){
                    return {
                        query: 'mutation {destroyUser (id: \"' + id + '\") {id firstName lastName email isAdmin isModerator}}',
                        variables: null
                    };
                }
            };
        }];

    }
})();
