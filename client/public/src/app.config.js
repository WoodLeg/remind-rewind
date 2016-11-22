(function() {
    'use strict';

    angular
    .module('remindRewind')
    .config(config)
    .run(run);

    config.$inject = ['FACEBOOK_APP', 'ezfbProvider', '$sceProvider','$locationProvider', '$httpProvider', '$logProvider', '$translatePartialLoaderProvider', '$compileProvider', 'PROD'];
    function config(FACEBOOK_APP, ezfbProvider, $sceProvider, $locationProvider, $httpProvider, $logProvider, $translatePartialLoaderProvider, $compileProvider, PROD) {
        $locationProvider.html5Mode(true).hashPrefix('!');

        $httpProvider.defaults.headers.common['Content-Type'] = 'application/json';
        $httpProvider.interceptors.push('spinnerInterceptor');
        $httpProvider.interceptors.push('authHttpResponseInterceptor');

        $compileProvider.debugInfoEnabled(false);
        // Setup jwt interceptor
        // HTTP calls can override with { skipAuthorization: true }
        ezfbProvider.setInitParams({
            appId      : FACEBOOK_APP,
            xfbml      : true,
            cookie     : true,
            version    : 'v2.8'
        });

        if (PROD){
            $logProvider.debugEnabled(false);
        }

        $sceProvider.enabled(false);
        // Common i18n
        $translatePartialLoaderProvider.addPart('app');
        $translatePartialLoaderProvider.addPart('error');

    }



    run.$inject = ['$window','$rootScope', '$state', 'authenticationFactory', '$timeout', '$translate'];
    function run($window, $rootScope, $state, authenticationFactory, $timeout, $translate) {

        $rootScope.$on('$translatePartialLoaderStructureChanged', function() {
            $translate.refresh();
        });

        $window.Intercom("boot", {
            app_id: "sager85e"
        });
        // Set change start handler
        $rootScope.$on('$stateChangeStart', function(evnt, toState, toStateParams) {

            $window.Intercom('update');

            // Check if state wants to redirect
            if (toState.redirectTo) {
                evnt.preventDefault();
                return $state.go(toState.redirectTo, toStateParams);
            }

            // Capture toState
            $rootScope.toState = toState;
            $rootScope.toState.data = $rootScope.toState.data || {};
            $rootScope.toStateParams = toStateParams;

            // Fire authorization
            authenticationFactory.authorize();

            // Handle protected states
            if (toState.protected) {
                authenticationFactory.getAuthenticatedUser().then(function(response) {
                    // Do nothing if authenticated
                }, function() {
                    // Redirect to signin otherwise
                    $state.go('remindRewind.home');
                });
            }

        });

        $rootScope.$on('$stateChangeSuccess', function() {

        });
    }
})();
