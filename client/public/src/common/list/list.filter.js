(function() {
    'use strict';

    angular.module('remindRewind.list')
    .filter('removeDoublons', RemoveDoublons)
    .filter('pageIndex', PageIndex)
    .filter('truncateText', TruncateText)
    .filter('filterDevices', FilterDevices);

    function RemoveDoublons() {
        return function(object, key) {
            var output = [];
            var keys = [];
            angular.forEach(object, function(item) {
                var value = item[key];
                if(keys.indexOf(value) === -1) {
                    keys.push(value);
                    output.push(item);
                }
            });

            return output;
        };
    }

    function PageIndex() {
        return function(input, start) {
            start = +start;
            return input.slice(start);
        };
    }

    function TruncateText() {
        return function (text, length, end) {
            if (isNaN(length)) {
                length = 10;
            }

            if (angular.isUndefined(end)) {
                end = '...';
            }

            if (text.length <= length || text.length - end.length <= length) {
                return text;
            }
            else {
                return String(text).substring(0, length-end.length) + end;
            }

        };
    }

    function FilterDevices() {
        return function(devices, filters) {
            var i;

            var hasPlatform = [];
            var hasVersion = [];
            var hasDensity = [];
            var hasSize = [];

            // Build a simpler array based on filters input object
            for (i = 0; i < filters.length; i++) {
                if (filters[i].hasOwnProperty('platform')) {
                    hasPlatform.push(filters[i].platform);
                }

                if (filters[i].hasOwnProperty('aosp_version')) {
                    hasVersion.push(filters[i].aosp_version);
                }

                if (filters[i].hasOwnProperty('density')) {
                    hasDensity.push(filters[i].density);
                }

                if (filters[i].hasOwnProperty('size')) {
                    hasSize.push(filters[i].size);
                }
            }

            if (angular.isDefined(devices)) {
                var filteredDevicesList = devices.filter(function(device) {
                    // Loop through platform filters to detect potential devices match
                    if (hasPlatform.length > 0) {
                        for (var k in hasPlatform) {
                            if (String(device.system_version.platform) == hasPlatform[k]) {
                                return true;
                            }
                        }
                    } else {
                        // This will guarantee independance of filters and directly jump to the next matching sequence (version-based)
                        return true;
                    }

                    // Returns all results with no filters selected
                    if (filters.length === 0) {
                        return true;
                    }

                }).filter(function(device) {

                    if (hasVersion.length > 0) {
                        for (var k in hasVersion) {
                            if (String(device.system_version.aosp_version) == hasVersion[k]) {
                                return true;
                            }
                        }
                    } else {
                        return true;
                    }

                    if (filters.length === 0) {
                        return true;
                    }

                }).filter(function(device) {

                    if (hasDensity.length > 0) {
                        for (var k in hasDensity) {
                            if (String(device.density) == hasDensity[k]) {
                                return true;
                            }
                        }
                    } else {
                        return true;
                    }

                    if (filters.length === 0) {
                        return true;
                    }

                }).filter(function(device) {

                    if (hasSize.length > 0) {
                        for (var k in hasSize) {
                            if ((String(device.resolution_width)+'x'+String(device.resolution_height)) == hasSize[k]) {
                                return true;
                            }
                        }
                    } else {
                        return true;
                    }

                    if (filters.length === 0) {
                        return true;
                    }

                });

                return filteredDevicesList;
            }
        };
    }


})();
