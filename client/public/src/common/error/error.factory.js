(function() {
    'use strict';

    angular.module('remindRewind.error')
        .factory('errorFactory', ErrorFactory);

    ErrorFactory.$inject = ['$log', '$filter'];

    function ErrorFactory($log, $filter) {
        var errorFactory = {};
        var error, errorCode, errorTitle, errorContent;

        errorFactory.handle = function(component, reason) {
            if (angular.isDefined(reason.error)) {
                errorCode = reason.error.code;

                switch (component) {
                    case 'accountActivation':
                        error = handleAccountActivationError();
                        break;
                    case 'vdCreate':
                        error = handleVDCreationError(errorCode);
                        break;
                    case 'vdStart':
                        error = handleVDStartError(errorCode);
                        break;
                    case 'vdStop':
                        error = handleVDStopError();
                        break;
                    case 'appStart':
                        error = handleAppStartError(errorCode);
                        break;
                    case 'liveshareStart':
                        error = handleLiveshareStartError(errorCode);
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

        function handleVDStopError(){
            errorTitle      = $filter('translate')('ERROR.VD_STOP.TITLE');
            errorContent    = $filter('translate')('ERROR.VD_STOP.BODY');

            return {
                errorTitle: errorTitle,
                errorContent: errorContent
            };
        }

        function handleAccountActivationError() {
            errorTitle      = $filter('translate')('ERROR.ACCOUNT_ACTIVATION.TITLE');
            errorContent    = $filter('translate')('ERROR.ACCOUNT_ACTIVATION.BODY');
        }

        function handleVDCreationError(errorCode) {
            switch (errorCode) {
                case 303:
                    errorTitle      = $filter('translate')('ERROR.VD_CREATE.TITLE');
                    errorContent    = $filter('translate')('ERROR.VD_CREATE.BODY');
                    $log.debug('The template id is invalid.');
                    break;
                case 308:
                    errorTitle      = $filter('translate')('ERROR.VD_CREATE.TITLE');
                    errorContent    = $filter('translate')('ERROR.VD_CREATE.BODY');
                    $log.debug('Unable to locate specified OVA file.');
                    break;
                case 316:
                    errorTitle      = $filter('translate')('ERROR.VD_CREATE.MAX_CAP.TITLE');
                    errorContent    = $filter('translate')('ERROR.VD_CREATE.MAX_CAP.BODY');
                    $log.debug('Unable to locate specified OVA file.');
                    break;
                default:
                    errorTitle      = $filter('translate')('ERROR.VD_CREATE.TITLE');
                    errorContent    = $filter('translate')('ERROR.VD_CREATE.BODY');
                    $log.debug('Error!');
                    break;
            }

            return {
                errorTitle: errorTitle,
                errorContent: errorContent
            };
        }

        function handleVDStartError(errorCode) {
            switch (errorCode) {
                case 302:
                    errorTitle      = $filter('translate')('ERROR.VD_START.TITLE');
                    errorContent    = $filter('translate')('ERROR.VD_START.BODY');
                    $log.debug('The instance id is invalid.');
                    break;
                default:
                    errorTitle      = $filter('translate')('ERROR.VD_START.TITLE');
                    errorContent    = $filter('translate')('ERROR.VD_START.BODY');
                    $log.debug('Error!');
                    break;
            }

            return {
                errorTitle: errorTitle,
                errorContent: errorContent
            };
        }

        function handleAppStartError(errorCode) {
            switch(errorCode) {
                case 301:
                    errorTitle      = $filter('translate')('ERROR.VD_START.TITLE');
                    errorContent    = $filter('translate')('ERROR.VD_START.BODY');
                    $log.debug('The app context id is invalid.');
                    break;
                case 302:
                    errorTitle      = $filter('translate')('ERROR.VD_START.TITLE');
                    errorContent    = $filter('translate')('ERROR.VD_START.BODY');
                    $log.debug('The instance id is invalid.');
                    break;
                case 303:
                    errorTitle      = $filter('translate')('ERROR.VD_START.TITLE');
                    errorContent    = $filter('translate')('ERROR.VD_START.BODY');
                    $log.debug('The template id is invalid.');
                    break;
                case 304:
                    errorTitle      = $filter('translate')('ERROR.VD_START.TITLE');
                    errorContent    = $filter('translate')('ERROR.VD_START.BODY');
                    $log.debug('The shared app id is invalid.');
                    break;
                case 305:
                    errorTitle      = $filter('translate')('ERROR.VD_START.TITLE');
                    errorContent    = $filter('translate')('ERROR.VD_START.BODY');
                    $log.debug('The template requests does not exist in DB.');
                    break;
                case 306:
                    errorTitle      = $filter('translate')('ERROR.VD_START.TITLE');
                    errorContent    = $filter('translate')('ERROR.VD_START.BODY');
                    $log.debug('The requested resource has not yet been uploaded.');
                    break;
                case 307:
                    errorTitle      = $filter('translate')('ERROR.VD_START.TITLE');
                    errorContent    = $filter('translate')('ERROR.VD_START.BODY');
                    $log.debug('Unable to locate specified APK file.');
                    break;
                case 308:
                    errorTitle      = $filter('translate')('ERROR.VD_START.TITLE');
                    errorContent    = $filter('translate')('ERROR.VD_START.BODY');
                    $log.debug('Unable to locate specified OVA file.');
                    break;
                default:
                    errorTitle      = $filter('translate')('ERROR.VD_START.TITLE');
                    errorContent    = $filter('translate')('ERROR.VD_START.BODY');
                    $log.debug('Error!');
                    break;
            }

            return {
                errorTitle: errorTitle,
                errorContent: errorContent
            };
        }

        function handleLiveshareStartError() {
            switch (errorCode) {
                case 112:
                    errorTitle      = $filter('translate')('ERROR.LIVESHARE_START.TITLE');
                    errorContent    = $filter('translate')('ERROR.LIVESHARE_START.BODY');
                    $log.debug('The provided email list is invalid.');
                    break;
                default:
                    errorTitle      = $filter('translate')('ERROR.LIVESHARE_START.TITLE');
                    errorContent    = $filter('translate')('ERROR.LIVESHARE_START.BODY');
                    $log.debug('Error!');
                    break;
            }

            return {
                errorTitle: errorTitle,
                errorContent: errorContent
            };
        }

        function throwGenericError() {
            errorTitle      = $filter('translate')('ERROR.GENERIC.TITLE');
            errorContent    = $filter('translate')('ERROR.GENERIC.BODY');

            return {
                errorTitle: errorTitle,
                errorContent: errorContent
            };
        }

        return errorFactory;
    }
})();
