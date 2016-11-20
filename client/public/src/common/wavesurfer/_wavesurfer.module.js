(function(){

    angular
        .module('ngWavesurfer', [])
        .directive('ngWavesurfer', function () {
            return {
                restrict: 'E',
                link: function (scope, element, attrs) {
                    element.css('display', 'block');

                    var options = angular.extend({ container: element[0] }, attrs);
                    var wavesurfer = WaveSurfer.create(options);

                    if (attrs.url) {
                        wavesurfer.load(attrs.url, attrs.data || null);
                    }

                    wavesurfer.params.minPxPerSec = 5;



                    scope.$emit('wavesurferInit', wavesurfer);
                }
            };
        });


})();
