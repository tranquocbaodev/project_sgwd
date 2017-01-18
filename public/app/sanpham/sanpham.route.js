/* Routes */
(function() {
    'use strict';

    angular
        .module('app.sanpham')
        .config(config);

    //config
    function config($stateProvider, $urlRouterProvider) {
        $stateProvider
        .state('sanpham', {
            url: '/sanpham',
            views: {
                "default": {
                    templateUrl: "app/sanpham/sanpham.html"
                }
            }
        })
    }
})();
