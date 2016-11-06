(function() {
    'use strict';

    angular.module('remindRewind.units')
    .filter('filesize', Filesize)
    .filter('truncate', Truncate);

    function Filesize() {
        var units = [
            'bytes',
            'KB',
            'MB',
            'GB',
            'TB',
            'PB'
        ];

        return function( bytes, precision ) {
            if ( isNaN( parseFloat( bytes )) || ! isFinite( bytes ) ) {
                return '?';
            }

            var unit = 0;

            while ( bytes >= 1024 ) {
                bytes /= 1024;
                unit ++;
            }

            return bytes.toFixed( + precision ) + ' ' + units[ unit ];
        };
    }

    function Truncate(){
        return function (value, wordwise, max, tail) {
            if (!value) return '';

            max = parseInt(max, 10);
            if (!max) return value;
            if (value.length <= max) return value;

            value = value.substr(0, max);
            if (wordwise) {
                var lastspace = value.lastIndexOf(' ');
                if (lastspace != -1) {
                    //Also remove . and , so its gives a cleaner result.
                    if (value.charAt(lastspace-1) == '.' || value.charAt(lastspace-1) == ',') {
                        lastspace = lastspace - 1;
                    }
                    value = value.substr(0, lastspace);
                }
            }

            return value + (tail || ' …');
        };
    }

})();
