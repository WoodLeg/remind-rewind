(function(){
    'use strict';

    angular
        .module('remindRewind.admin.artists.solo')
        .controller('adminArtistController', AdminArtistController);

    AdminArtistController.$inject = ['$stateParams', '$log', 'graphqlFactory', '$timeout', '$localStorage'];

    function AdminArtistController ($stateParams, $log, graphqlFactory, $timeout, $localStorage){
        var self = this;

        if (!$localStorage.adminArtist) {
            $localStorage.adminArtist = $stateParams.artist;
        }
        this.artist = $localStorage.adminArtist;

        this.getDetails = function(){
            graphqlFactory.query('{artistDetail (id: \"'+self.artist.digital_id+'\") {id name image}}').then(function(response){
                self.artist = response.data.artistDetail;
            }).catch(function(reason){
                $log.debug('ERR GET ARTIST DETAIL: ', reason);
            });
        };

        $timeout(function(){
            self.getDetails();
        });

    }


})();
