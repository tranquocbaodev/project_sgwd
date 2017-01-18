/* Routes */
(function() {
    'use strict';

    angular
        .module('app.trangchu')
        .config(config);

    //config
    function config($stateProvider, $urlRouterProvider) {
        $stateProvider
        .state('lienhe', {
            url: '/lienhe',
            views: {
                "default": {
                    templateUrl: "app/lienhe/lienhe.html"
                }
            }
        })
    }
})();
