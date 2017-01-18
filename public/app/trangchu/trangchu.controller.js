/* Controllers */
(function() {
    'use strict';

    angular
        .module('app.trangchu')
        .controller('trangchuCtrl', trangchuCtrl);

    //login
    function trangchuCtrl($scope,$rootScope, $filter, $location,dataSvc) {
        var vm = this;
        $scope.setIsShowNavMobile(false);
        $rootScope.locationName = "Trang Chủ";
        $scope.setHeightFnc();
    }
})();
