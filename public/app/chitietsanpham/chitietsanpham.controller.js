/* Controllers */
(function() {
	'use strict';

	angular
		.module('app.chitietsanpham')
		.controller('chitietsanphamCtrl', chitietsanphamCtrl);

	//login
	function chitietsanphamCtrl($scope,$rootScope,$timeout,$window) {
		var vm = this;
		$rootScope.locationName = "Chi Tiết Sản Phẩm";
		$scope.setHeightFnc();
		$scope.setIsShowNavMobile(false);
		if ($scope.getItemDetailProduct().length!==0) {
				vm.detailProduct = $scope.getItemDetailProduct();
				localStorage.setItem("chitietsanpham",JSON.stringify($scope.getItemDetailProduct()));
		}else{
				vm.detailProduct = JSON.parse(localStorage.getItem("chitietsanpham"));
		}
		
		$rootScope.$on("clickDetailProductFromSilde",function (event,args) {
				vm.detailProduct = args.data;
		})

		$timeout(function(){
			if ($window.innerWidth >= 768 && $window.innerWidth <=991) {
				console.log(angular.element(document.querySelectorAll(".content-detail .img-detail"))[0].clientWidth);
				var heightAdd = angular.element(document.querySelectorAll(".content-detail .img-detail"))[0].clientWidth *9 / 16;
				angular.element(document.querySelectorAll(".content-detail .img-detail")).css("height",heightAdd + "px");
			}
		}, 100);
	}
})();
