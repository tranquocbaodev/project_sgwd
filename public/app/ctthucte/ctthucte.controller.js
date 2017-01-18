/* Controllers */
(function() {
    'use strict';

    angular
        .module('app.ctthucte')
        .controller('ctthucteCtrl', ctthucteCtrl);

    //login
    function ctthucteCtrl($scope,$rootScope, $filter, $location,dataSvc) {
        var vm = this;
        $rootScope.locationName = "Công Trình Thực Tế";
        $scope.setIsShowNavMobile(false);
        $scope.setHeightFnc();

        $scope.selectCategoryCt = function (category, event) {
        	$rootScope.$broadcast("selectCategoryCt", {data:category});
        	angular.element(document.querySelectorAll('.intro-content .i-intro')).removeClass('active');
        	angular.element(event.currentTarget).addClass('active');
        }
    }
})();
