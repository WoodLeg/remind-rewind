(function() {
    'use strict';

    angular
    .module('remindRewind.form.email')
    .directive('validateEmail', ValidateEmail)
    .directive('stylingForm', StylingForm);

    function ValidateEmail() {
        return {
            restrict: 'A',
            require: '?ngModel',
            link : function(scope, element, attrs, ngModel) {
                if (!ngModel) return;

                var emailRegex = /^(?!.*\.{2})[a-zA-Z0-9_.+-]{1,63}@[a-zA-Z0-9-]{1,63}\.[a-z.]{2,63}$/;

                ngModel.$parsers.push(function(value) {
                    if(value) {
                        var validEmail = emailRegex.test(value);
                        ngModel.$setValidity('emailFormat', validEmail);
                    }
                    return value;
                });
            }
        };
    }

    function StylingForm(){
        return {
            restrict: 'A',
            link: function(scope,element, attrs){
                element.on('focus', function(){
                    switch(attrs.type){
                        case 'password':
                            angular.element('.'+ attrs.feature +'__form-password-img').css('background', 'url(\'/assets/img/ic_password_active.svg\') no-repeat top center');
                            angular.element('.'+ attrs.features+'__form-password-img').css('background-position', '0 50%');
                            break;
                        case 'email':
                            angular.element('.'+ attrs.feature +'__form-email-img').css('background', 'url(\'/assets/img/ic_email_active.svg\') no-repeat top center');
                            angular.element('.'+ attrs.feature +'__form-email-img').css('background-position', '0 50%');
                            break;
                        default:
                    }
                });
                element.on('blur', function(){
                    switch(attrs.type){
                        case 'password':
                            angular.element('.'+ attrs.feature +'__form-password-img').css('background', 'url(\'/assets/img/ic_password_default.svg\') no-repeat top center');
                            angular.element('.'+ attrs.feature +'__form-password-img').css('background-position', '0 50%');
                            break;
                        case 'email':
                            angular.element('.'+ attrs.feature +'__form-email-img').css('background', 'url(\'/assets/img/ic_email_default.svg\') no-repeat top center');
                            angular.element('.'+ attrs.feature +'__form-email-img').css('background-position', '0 50%');
                            break;
                        default:
                    }
                });
            }
        };
    }

})();
