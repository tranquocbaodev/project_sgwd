/* Routes */
(function() {
    'use strict';

    angular
        .module('app.ctthucte')
        .config(config);

    //config
    function config($stateProvider, $urlRouterProvider) {
        $stateProvider
        .state('ctthucte', {
            url: '/ctthucte',
            views: {
                "default": {
                    templateUrl: "app/ctthucte/ctthucte.html"
                }
            }
        })

        $urlRouterProvider.otherwise('/');
    }
})();
