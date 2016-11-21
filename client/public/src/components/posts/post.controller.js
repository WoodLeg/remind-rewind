(function(){
    'use strict';

    angular
        .module('remindRewind.posts')
        .controller('postController', PostController);

    PostController.$inject = ['$stateParams', 'graphqlFactory', '$timeout', '$log', 'post', '$sce', '$scope', '$window', 'userFactory'];

    function PostController($stateParams, graphqlFactory, $timeout, $log, post, $sce, $scope, $window, userFactory){
        var self = this;

        self.post = post;
        this.albumDetail = null;

        $log.debug(self.post);

        this.getAlbum  = function(id){
            graphqlFactory.query('query { album (id: \"'+id+'\"){ id name label images {url} tracks{id name duration track_number preview_url}}}').then(function(response){
                $log.debug('GET ALBUM SUCCESS:' , response);
                self.albumDetail = response.data.album;
                $window.Intercom('trackEvent', 'album_clicked', {
                    'album_id': self.albumDetail.id,
                    'artist': self.post.artist.name,
                    'album': self.albumDetail.name,
                });
            }).catch(function(reason){
                $log.debug('GET ALBUM FAILED: ', reason);
            });
        };

        this.resetAlbum = function(){
            self.albumDetail = null;
        };

        var activeUrl = null;

        this.paused = true;


        $scope.$on('wavesurferInit', function (e, wavesurfer) {
            self.wavesurfer = wavesurfer;

            self.wavesurfer.on('play', function () {
                self.paused = false;
            });

            self.wavesurfer.on('pause', function () {
                self.paused = true;
            });

            self.wavesurfer.on('finish', function () {
                self.paused = true;
                self.wavesurfer.seekTo(0);
                $scope.$apply();
            });
        });

        self.play = function (url) {
            if (!self.wavesurfer) {
                return;
            }

            activeUrl = url;

            self.wavesurfer.once('ready', function () {
                self.wavesurfer.play();
                $scope.$apply();
            });

            self.wavesurfer.load(activeUrl);
        };

        self.isPlaying = function (url) {
            return url == activeUrl;
        };

    }


})();
