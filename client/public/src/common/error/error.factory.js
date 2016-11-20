(function() {
    'use strict';

    angular.module('remindRewind.error')
        .factory('errorFactory', ErrorFactory);

    ErrorFactory.$inject = ['$log', '$filter'];

    function ErrorFactory($log, $filter) {
        var errorFactory = {};
        var error, errorCode, errorTitle, errorContent;

        errorFactory.handle = function(error) {
            console.log(error);
            if (angular.isDefined(error.message)) {
                switch (error.message) {
                    case 'ARTIST_ALREADY_EXISTS':
                        error = handleArtistAlreadyExist();
                        break;
                    default:
                        error = throwGenericError();
                        break;
                }
                return error;
            } else {
                $log.error(reason);
                return throwGenericError();
            }

        };

        function handleArtistAlreadyExist(){
            errorTitle      = 'Already exists!';
            errorContent    = 'The artist is already in the database.';

            return {
                errorTitle: errorTitle,
                errorContent: errorContent
            };
        }

        function throwGenericError(){
            errorTitle      = 'An error occured';
            errorContent    = 'Sorry please retry later';

            return {
                errorTitle: errorTitle,
                errorContent: errorContent
            };
        }

        return errorFactory;
    }
})();
