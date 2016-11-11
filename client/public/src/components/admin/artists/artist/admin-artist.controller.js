(function(){
    'use strict';

    angular
        .module('remindRewind.admin.artists.solo')
        .controller('adminArtistController', AdminArtistController);

    AdminArtistController.$inject = ['$stateParams', '$log', 'graphqlFactory', '$timeout', '$localStorage'];

    function AdminArtistController ($stateParams, $log, graphqlFactory, $timeout, $localStorage){
        var self = this;



        this.getDetails = function(artist){
            $log.debug(artist);
            graphqlFactory.query('{artistDetail (id: \"'+artist.spotify_id+'\") {id name albums {id artists {id name} name images {url}}}}').then(function(response){
                self.artist = response.data.artistDetail;
                $log.debug('Artist detail: ', self.artist);
            }).catch(function(reason){
                $log.debug('ERR GET ARTIST DETAIL: ', reason);
            });
        };

        $timeout(function(){
            if (!$localStorage.adminArtist) {
                $localStorage.adminArtist = $stateParams.artist;
            }

            self.artist = $localStorage.adminArtist;

            self.getDetails(self.artist);
        });

    }


})();
