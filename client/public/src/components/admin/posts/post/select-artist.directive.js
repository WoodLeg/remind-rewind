(function(){
    'use strict';

    angular
        .module('remindRewind.admin.posts.solo')
        .directive('selectArtist', SelectArtist);

    SelectArtist.$inject = [];

    function SelectArtist(){
        return {
            restrict: 'A',
            link: function(_, elem){
                elem.on('click', function(){
                    $('.selected').removeClass('selected');
                    elem.addClass('selected');
                })

            }
        }
    }


})();
