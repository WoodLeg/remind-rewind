(function(){
    'use strict';

    angular
        .module('remindRewind.graphql')
        .factory('graphqlFactory', GraphqlFactory);

    GraphqlFactory.$inject = ['graphqlProvider', 'graphqlService', '$q', '$base64'];

    function GraphqlFactory(graphqlProvider, graphqlService, $q, $base64){
        var graphqlFactory = {};


        graphqlFactory.query = function(dataRequested){
            var payload = graphqlProvider.prepareQuery(dataRequested);
            return graphqlService.send(payload).then(function(response){
                return $q.resolve(response.data);
            }).catch(function(reason){
                return $q.reject(reason);
            });
        };

        graphqlFactory.facebookLogin = function(id){
            return graphqlService.send(payload).then(function(response){
                return $q.resolve(response.data);
            }).catch(function(reason){
                return $q.reject(reason);
            });
        }

        graphqlFactory.addUserMutation = function(user) {
            var payload = graphqlProvider.prepareAddUserMutation(user);
            return graphqlService.send(payload).then(function(response){
                return $q.resolve(response.data);
            }).catch(function(reason){
                return $q.reject(reason);
            });
        };

        graphqlFactory.promoteUserMutation = function(id, moderator) {
            var payload = graphqlProvider.preparePromoteUserMutation(id, moderator);
            return graphqlService.send(payload).then(function(response) {
                return $q.resolve(response.data);
            }).catch(function(reason) {
                return $q.reject(reason);
            });
        };

        graphqlFactory.destroyUserMutation = function(user) {
            var payload = graphqlProvider.prepareDestroyUserMutation(user);
            return graphqlService.send(payload).then(function(response){
                return $q.resolve(response.data);
            }).catch(function(reason){
                return $q.reject(reason);
            });
        };

        graphqlFactory.addPostMutation = function(post, user){
            post.content = $base64.encode(post.content);
            var payload = graphqlProvider.prepapreAddPostMutation(post, user);
            return graphqlService.send(payload).then(function(response){
                return $q.resolve(response.data);
            }).catch(function(reason){
                return $q.reject(reason);
            });
        };

        graphqlFactory.editPostMutation = function(post, user){
            post.content = $base64.encode(post.content);
            var payload = graphqlProvider.prepapreEditPostMutation(post, user);
            return graphqlService.send(payload).then(function(response){
                return $q.resolve(response.data);
            }).catch(function(reason){
                return $q.reject(reason);
            });
        };

        graphqlFactory.drestroyPostMutation = function(postID){
            var payload = graphqlProvider.prepareDestroyPostMutation(postID);
            return graphqlService.send(payload).then(function(response){
                return $q.resolve(response.data);
            }).catch(function(reason){
                return $q.reject(reason);
            });
        };

        graphqlFactory.addArtistMutation = function(artist){
            var payload = graphqlProvider.prepareAddArtistMutation(artist);
            return graphqlService.send(payload).then(function(response){
                return $q.resolve(response.data);
            }).catch(function(reason){
                return $q.reject(reason);
            });
        };

        graphqlFactory.updateFeaturePost = function(id, value){
            var payload = graphqlProvider.prepareUpdateFeatureMutation(id, value);
            return graphqlService.send(payload).then(function(response){
                return $q.resolve(response.data);
            }).catch(function(reason){
                return $q.reject(reason);
            });
        };
        graphqlFactory.updateOnlinePost = function(id, value){
            var payload = graphqlProvider.prepareUpdateOnlineMutation(id, value);
            return graphqlService.send(payload).then(function(response){
                return $q.resolve(response.data);
            }).catch(function(reason){
                return $q.reject(reason);
            });
        };

        return graphqlFactory;
    }


})();
