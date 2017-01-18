/* Controllers */
(function() {
    'use strict';

    angular
        .module('app.sanpham')
        .controller('sanphamCtrl', sanphamCtrl);

    //login
    function sanphamCtrl($scope,$rootScope, $filter, $location,dataSvc) {
        var vm = this;
        $rootScope.locationName = "Sản Phẩm";
        $scope.setIsShowNavMobile(false);
        $scope.setHeightFnc();

        if ($scope.getMaterialInfo()==='') {
            vm.material = "Nhựa"
        }else{
            vm.material = $scope.getMaterialInfo();
        }

        //Lựa Chọn Chất Liệu Sản Phẩm
        $scope.selectMaterial = function (material) {
            vm.material = material;
            $rootScope.$broadcast("selectMaterial", {data:vm.material});
        }
        $scope.selectMaterial(vm.material);
    }
})();
