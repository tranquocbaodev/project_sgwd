/* angular modules */
(function() {
    'use strict';

    angular.module('app', [
        'app.core',
        'ngSanitize',
        /*
         * Feature areas
         */
         'app.trangchu',
         'app.sanpham',
         'app.chitietsanpham',
         'app.lienhe',
         'app.ctthucte'
    ]);
})();