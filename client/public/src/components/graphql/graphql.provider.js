(function(){
    'use strict';

    angular
        .module('remindRewind.graphql')
        .provider('graphqlProvider', GraphqlProvider);

    GraphqlProvider.$inject = [];

    function GraphqlProvider() {

        this.$get = [function() {
            return {
                prepareFacebookLogin : function(id) {
                    return {
                        query: 'mutation {addUser{facebookId: '+id+'}}',
                        variables: null
                    };
                },
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
                preparePromoteUserMutation: function(id, moderator) {
                    return {
                        query: 'mutation {promoteUser(id: \"'+id+'\", isModerator: '+moderator+'){id isModerator}}',
                        variables: null
                    };
                },
                prepareDiggearRequestMutation: function(userId){
                    return {
                        query: 'mutation {diggearRequest(id: \"'+userId+'\"){id}}',
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
                        query: 'mutation {addPost (title: \"'+ post.title +'\", content: \"'+ post.content +'\", author: \"'+user+'\", artist: \"'+ post.artist+'\", featured: '+post.featured+', online: '+post.online+') {id title content author{id firstName lastName} artist{id name}}}',
                        variables: null
                    };
                },
                prepapreEditPostMutation: function(post) {
                    return {
                        query: 'mutation {editPost (id: \"'+post.id+'\", title: \"'+ post.title +'\", content: \"'+ post.content +'\", artist: \"'+ post.artist+'\") {id}}',
                        variables: null
                    };
                },
                prepareDestroyPostMutation: function (postID){
                    return {
                        query: 'mutation {destroyPost (id: \"'+postID+'\") {id}}',
                        variables: null
                    };
                },
                prepareLikesPostMutation: function (postId, userId, liked){
                    return {
                        query: 'mutation {updateLikes(postId: \"'+ postId+'\", userId: \"'+userId+'\", liked: '+ liked +'){id likes }}',
                        variables: null
                    };
                },
                prepareAddArtistMutation: function(artist){
                    return {
                        query: 'mutation {addArtist (spotify_id: \"'+artist.id+'\", name: \"'+artist.name+'\"){id name}}',
                        variables: null
                    };
                },
                prepareUpdateFeatureMutation: function(id, value){
                    return {
                        query: 'mutation {updateFeaturedPost(id: \"'+ id +'\", featured: '+ value +'){featured}}',
                        variables: null
                    };
                },
                prepareUpdateOnlineMutation: function(id, value){
                    return {
                        query: 'mutation {updateOnlinePost(id: \"'+ id +'\", online: '+ value +'){online}}',
                        variables: null
                    };
                }
            };
        }];

    }
})();
