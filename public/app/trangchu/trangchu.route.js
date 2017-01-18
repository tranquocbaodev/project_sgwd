/* Routes */
(function() {
    'use strict';

    angular
        .module('app.trangchu')
        .config(config);

    //config
    function config($stateProvider, $urlRouterProvider) {
        $stateProvider
        // anonymous
            .state('anonymous', {
            url: '/',
            views: {
                "default": {
                    templateUrl: "app/trangchu/trangchu.html"
                }
            }
        })

        .state('trangchu', {
            url: '/trangchu',
            views: {
                "default": {
                    templateUrl: "app/trangchu/trangchu.html"
                }

            }
        })

        $urlRouterProvider.otherwise('/');
    }
})();
