(function() {
    'use strict';

    angular
    .module('remindRewind.form.password')
    .directive('passwordComparator', PasswordComparator)
    .directive('passwordComparison', PasswordComparison)
    .directive('passwordStrength', PasswordStrength)
    .directive('passwordStrengthStandalone', PasswordStrengthStandalone);

    function PasswordComparator() {
        return {
            restrict: 'E',
            templateUrl: '/src/common/form/password/password.html',
            bindToController: getBindings(),
            controller: 'passwordController as ctrl',
            scope: true,
            link: function (scope, element, attributes, ctrl) {
                ctrl.password = null;
            }
        };
    }

    function getBindings(){
        return {
            form: '=',
            password: '='
        };
    }

    function PasswordComparison() {
        return {
            require: ['ngModel', '^passwordComparator'],
            link: function (scope, element, attributes, ctrl) {
                var firstPassword = '#' + attributes.passwordComparison;

                element.add(firstPassword).on('keyup', function () {
                    scope.$apply(function () {
                        var passwordValidity = element.val() === angular.element(firstPassword).val();
                        ctrl[0].$setValidity('passwordMatch', passwordValidity);
                        ctrl[1].password = element.val();
                    });
                });
            }
        };
    }

    function PasswordStrength() {
        return {
            require: ['ngModel', '^passwordComparator'],
            link: function (scope, element, attributes, ctrl) {
                ctrl[0].$parsers.unshift(function(password) {
                    var pwdValidLength, pwdHasLetter, pwdHasNumber;

                    pwdValidLength = (password && password.length >= 8 ? true : false);
                    pwdHasLetter = (password && /[A-z]/.test(password)) ? true : false;
                    pwdHasNumber = (password && /\d/.test(password)) ? true : false;

                    if (pwdValidLength && pwdHasLetter && pwdHasNumber) {
                        ctrl[0].$setValidity('passwordStrength', true);
                        ctrl[1].password = password;
                    } else {
                        ctrl[0].$setValidity('passwordStrength', false);
                    }
                    return password;
                });
            }
        };
    }

    function PasswordStrengthStandalone(){
        return {
            require: ['ngModel'],
            link: function(scope, element, attributes, ctrl) {
                ctrl[0].$parsers.unshift(function(password) {
                    var pwdValidLength, pwdHasLetter, pwdHasNumber;
                    pwdValidLength = (password && password.length >= 8 ? true : false);
                    pwdHasLetter = (password && /[A-z]/.test(password)) ? true : false;
                    pwdHasNumber = (password && /\d/.test(password)) ? true : false;

                    if (pwdValidLength && pwdHasLetter && pwdHasNumber) {
                        ctrl[0].$setValidity('passwordStrength', true);
                        ctrl[0].password = password;
                    } else {
                        ctrl[0].$setValidity('passwordStrength', false);
                        ctrl[0].password = null;
                    }
                    return password;
                });
            }
        };
    }

})();
