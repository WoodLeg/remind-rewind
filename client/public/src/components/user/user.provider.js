(function() {
    'use strict';

    angular
    .module('remindRewind.user')
    .provider('userProvider', UserProvider);

    UserProvider.$inject = [];

    /**
     * UserProvider
     * Provides consistend model of user object
     */
    function UserProvider() {

        this.$get = [function() {
            return {
                basic: function() {
                    return {
                        email: '',
                        firstName: '',
                        lastName: '',
                        id: '',
                        activated: false
                    };
                },
                full: function() {
                    // Build off basic model
                    var basic = this.basic();

                    // Add additional fields
                    basic.password = '';

                    return basic;
                },
                step2: function(){
                    return {
                        email: 'billyjean@genymobile.com',
                        password: '',
                        last_name: '',
                        first_name: ''
                    };
                },
                activationKey: function(){
                    return {
                        activation_key: ''
                    };
                },
                passwordReset: function() {
                    return {
                        new_password: '',
                        reset_key: ''
                    };
                }
            };
        }];

    }
})();
