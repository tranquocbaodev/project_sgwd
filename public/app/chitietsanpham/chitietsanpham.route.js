/* Routes */
(function() {
    'use strict';

    angular
        .module('app.trangchu')
        .config(config);

    //config
    function config($stateProvider, $urlRouterProvider) {
        $stateProvider
        .state('chitietsanpham', {
            url: '/chitietsanpham',
            views: {
                "default": {
                    templateUrl: "app/chitietsanpham/chitietsanpham.html"
                }
            }
        })
    }
})();
