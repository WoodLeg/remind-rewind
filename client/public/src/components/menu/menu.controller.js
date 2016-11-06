(function(){
    'use strict';

    angular
        .module('remindRewind.menu')
        .controller('menuController', MenuController);

    MenuController.$inject = ['$state', '$log', '$rootScope', '$scope', '$localStorage', 'userFactory', 'modalFactory', '$filter'];

    function MenuController($state, $log, $rootScope, $scope, $localStorage, userFactory, modalFactory, $filter){

        var self = this;
        this.liveshareAvailable = false;
        this.dropdownMenu = false;
        this.runningDevice = false;

        this.page = 'home';
        this.user = userFactory.getUser();

        // Toggles liveshare menu item display
        $scope.$watch(function() { return $localStorage.liveshare; }, function() {
            self.liveshareAvailable = angular.isDefined($localStorage.liveshare);
        });

        $scope.$watch(function() { return $localStorage.instanceId; }, function(){
            self.runningDevice = angular.isDefined($localStorage.instanceId);
        });

        $scope.$watch(function(){ return $state.current.name; }, function(){
            var page = self.processStateCurrent($state.current.name);
            self.setCurrentPage(page);
        });

        $scope.$watch(function(){ return $localStorage.user; }, function(){
            $log.debug('Menu: User updated');
            self.user = userFactory.getUser();
        });

        this.toggleDropdownMenu = function(){
            self.dropdownMenu = !self.dropdownMenu;
        };

        this.showPage = function(page) {
            $log.debug('going to page: ', page);
            self.page = page;
            self.setCurrentPage(page);
            $state.go('remindRewind.core.' + page);
        };

        this.logout = function() {
            // Confirmation dialog
            modalFactory.launch({
                title: $filter('translate')('i18n.COMMON.MODAL.LOGOUT.TITLE'),
                content: $filter('translate')('i18n.COMMON.MODAL.LOGOUT.CONTENT'),
                img: '/assets/img/ic_logout.svg',
                confirm: $filter('translate')('i18n.COMMON.ANSWER_YES'),
                cancel: $filter('translate')('i18n.COMMON.ANSWER_NO')
            }).then(function() {
                // This call will flush running VDs on the backend side of things, independently from the frontend
                userFactory.signout().then(function() {
                    $log.debug('Successfully signed out.');
                }).finally(function() {
                    // Flush everything on the frontend...
                    userFactory.clear();

                    // ... And redirect user to home
                    $state.go('remindRewind.home');
                });
            }, function() {
                // Dismiss sign out
                $log.debug('Session will continue now.');
            });

        };

        this.processStateCurrent = function(name){
            var array = name.split('.');
            var page = array.pop();
            return page;
        };

        this.setCurrentPage = function(page){
            switch (page) {
                case 'vms':
                    self.currentPage = $filter('translate')('i18n.COMMON.MENU_RUNNING');
                    break;
                case 'live':
                    self.currentPage = $filter('translate')('i18n.COMMON.MENU_LIVESHARE');
                    break;
                case 'liveshare-ended':
                    self.currentPage = $filter('translate')('i18n.COMMON.MENU_LIVESHARE');
                    break;
                case 'liveshare-invite':
                    self.currentPage = null;
                    break;
                case 'liveshare-unavailable':
                    self.currentPage = $filter('translate')('i18n.COMMON.MENU_LIVESHARE');
                    break;
                case 'liveshare-list':
                    self.currentPage = $filter('translate')('i18n.COMMON.MENU_LIVESHARE');
                    break;
                default:
                    self.currentPage = $filter('translate')('i18n.COMMON.MENU_RESOURCES');
            }
        };

    }

})();
