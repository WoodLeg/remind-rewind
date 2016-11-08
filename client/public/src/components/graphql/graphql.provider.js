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
                        query: 'mutation {destroyUser (id: \"' + id + '\") {id}}',
                        variables: null
                    };
                },
                prepapreAddPostMutation: function(post, user) {
                    return {
                        query: 'mutation {addPost (title: \"'+ post.title +'\", content: \"'+ post.body +'\", author: \"'+user+'\", artist: \"'+ post.artist+'\") {id title content author{id firstName lastName} artist}}',
                        variables: null
                    }
                },
                prepareDestroyPostMutation: function (postID){
                    return {
                        query: 'mutation {destroyPost (id: \"'+postID+'\") {id}}',
                        variables: null
                    }
                },
                prepareAddArtistMutation: function(artist){
                    return {
                        query: 'mutation {addArtist (digital_id: \"'+artist.id+'\", name: \"'+artist.name+'\"){id name}}',
                        variables: null
                    }
                }
            };
        }];

    }
})();
