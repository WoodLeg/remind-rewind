(function(){
    'use strict';

    angular
        .module('remindRewind.admin.artists')
        .controller('artistsAdminController', ArtistsAdminController);

    ArtistsAdminController.$inject = ['graphqlFactory', '$log', 'modalFactory', '$timeout'];

    function ArtistsAdminController(graphqlFactory, $log, modalFactory, $timeout){
        var self = this;

        this.saveArtist = function(artist){
            $log.debug(artist);
            graphqlFactory.addArtistMutation(artist).then(function(response){

            }).catch(function(reason){

            });
        };

        this.searchArtist = function(){
            graphqlFactory.query('{ artist(name: \"'+ self.artistToSearch +'\"){id name}}').then(function(response){
                $log.debug('search artist: ', response);
                modalFactory.launch({
                    title: 'Found !',
                    content: 'Would you like to save it ?',
                    template: '/src/components/admin/artists/modal/artist-found.html',
                    artist: response.data.artist,
                    windowClass: 'admin__content-artists-modal',
                    confirm: 'Save',
                    cancel: 'Cancel'
                }).then(function(artist){
                    self.saveArtist(artist);
                });
            }).catch(function(reason){
                $log.debug(reason);
            });
        };

        this.listArtist = function(){
            graphqlFactory.query('{artists{id name}}').then(function(response){
                self.artists = response.data.artists;
            }).catch(function(reason){

            });
        };

        $timeout(function(){
            self.listArtist();
        });

    }


})();
