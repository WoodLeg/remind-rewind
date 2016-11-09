(function(){
    'use strict';

    angular
        .module('remindRewind.admin.artists')
        .controller('artistsAdminController', ArtistsAdminController);

    ArtistsAdminController.$inject = ['graphqlFactory', '$log', 'modalFactory', '$timeout'];

    function ArtistsAdminController(graphqlFactory, $log, modalFactory, $timeout){
        var self = this;
        this.artistToSave = null;
        this.searchResult = [];
        this.noArtistFound = null;

        this.saveArtist = function(artist){
            $log.debug(artist);
            graphqlFactory.addArtistMutation(artist).then(function(response){

            }).catch(function(reason){

            });
        };

        this.searchArtist = function(){
            if (self.artistToSearch === ''){
                self.searchResult = [];
            } else {
                graphqlFactory.query('{ artist(name: \"'+ self.artistToSearch +'\"){id name}}').then(function(response){
                    $log.debug('search artist: ', response);
                    if (response.hasOwnProperty('errors') && (response.data.artist === null)){
                        self.noArtistFound = response.errors[0].message;
                        self.searchResult = [];
                    } else {
                        self.searchResult = response.data.artist;
                        self.noArtistFound = null;
                    }
                }).catch(function(reason){
                    $log.debug(reason);
                });
            }
        };

        this.selectArtist = function(artist){
            self.artistToSearch = artist.name;
            self.artistToSave = artist;
        };

        this.listArtist = function(){
            graphqlFactory.query('{artists{id name}}').then(function(response){
                self.artists = response.data.artists;
            }).catch(function(reason){

            });
        };

        $timeout(function(){
            // self.listArtist();
        });

    }


})();
