(function(){
    'use strict';

    angular
        .module('remindRewind.admin.artists')
        .controller('artistsAdminController', ArtistsAdminController);

    ArtistsAdminController.$inject = ['errorFactory', 'graphqlFactory', '$log', 'modalFactory', '$timeout', '$state', '$localStorage'];

    function ArtistsAdminController(errorFactory,graphqlFactory, $log, modalFactory, $timeout, $state, $localStorage){
        var self = this;
        this.artistToSave = null;
        this.searchResult = [];
        this.noArtistFound = null;
        delete $localStorage.adminArtist;
        var timeout = null;

        this.saveArtist = function(artist){
            graphqlFactory.addArtistMutation(artist).then(function(response){
                $log.debug(response);
                if (response.errors){
                    var error = errorFactory.handle(response.errors[0]);
                    modalFactory.launch({
                        title: error.errorTitle,
                        content: error.errorContent,
                        confirm: 'OK'
                    });
                } else {
                    self.artists.push(response.data.addArtist);
                }
                self.artistToSave = null;
                self.artistToSearch = '';
                self.searchResult = [];
            }).catch(function(reason){
                $log.debug(reason);
            });
        };

        this.searchArtist = function(){
            if (self.artistToSearch !== self.artistToSave) {
                self.artistToSave = null;
            }
            if (self.artistToSearch === ''){
                self.searchResult = [];
            } else {
                if (timeout){
                    $timeout.cancel(timeout);
                }
                timeout = $timeout(function(){
                    graphqlFactory.query('{ artist(name: \"'+ self.artistToSearch +'\"){id name}}').then(function(response){
                        $log.debug('search artist: ', response);
                        if (response.hasOwnProperty('errors') && (response.data.artist === null)){
                            if (self.artistToSearch === '') {
                                self.noArtistFound = null;
                            } else {
                                self.noArtistFound = response.errors[0].message;
                            }
                            self.searchResult = [];
                        } else {
                            self.searchResult = response.data.artist;
                            self.noArtistFound = null;
                        }
                        timeout = null;
                    }).catch(function(reason){
                        $log.debug(reason);
                    });
                }, 500);
            }
        };

        this.selectArtist = function(artist){
            self.artistToSearch = artist.name;
            self.artistToSave = artist;
        };

        this.listArtist = function(){
            graphqlFactory.query('{artists{id name spotify_id images {url}}}').then(function(response){
                $log.debug('LIST ARTISTS: ', response.data.artists);
                self.artists = response.data.artists;
            });
        };

        this.goToArtist = function(artist){
            $state.go('remindRewind.admin.artists.solo', {id: artist.id, artist: artist});
        };

        $timeout(function(){
            self.listArtist();
        });

    }


})();
