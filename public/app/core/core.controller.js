/* Controllers */
(function() {
		'use strict';
		angular
				.module('app.core')
				.controller('Core', Core);

		//core 
		function Core($scope,$rootScope, dataSvc,$timeout,$window,$location) {
				var vcm = this;

				$scope.scrollTop = function () {
					$window.scrollTo(0, 0);
				} 
				$scope.goTrangChu = function () {
					$rootScope.locationName = "Trang Chủ";
					$location.path('/trangchu');
				}

				$scope.goSanPham = function () {
					$rootScope.locationName = "Sản Phẩm";
					$location.path('/sanpham');
				}

				$scope.goChiTietSanPham = function () {
					$rootScope.locationName = "Chi Tiết Sản Phẩm";
					$location.path('/chitietsanpham');
				}

				$scope.goLienHe = function () {
					$rootScope.locationName = "Liên Hệ";
					$location.path('/lienhe');
				}

				$scope.goCtThucTe = function () {
					$rootScope.locationName = "Công Trình Thực Tế";
					$location.path('/ctthucte');
				}

				//get data Json
				$scope.dataSlides = [];
				dataSvc.query('slideData').then(function(data) {
					 $scope.dataSlides = data;
				});

				//get data Json San Pham
				$scope.dataSanPham = [];
				$scope.dataSanPhamNoiBat = [];
				dataSvc.query('sanpham').then(function(data) {
						$scope.dataSanPham = data;
						angular.forEach(data, function (item) {
							 if (item.favorite) {
								$scope.dataSanPhamNoiBat.push(item);                 
							 }
					 })   
				});


				//get data Json San Pham Chinh
				$scope.dataSanPhamChinh = [];
				dataSvc.query('sanphamchinh').then(function(data) {
						$scope.dataSanPhamChinh = data;
				});

				//get data Json San Pham
				$scope.dataCtThucTe = [];
				dataSvc.query('ctthucte').then(function(data) {
						$scope.dataCtThucTe = data;
				});

				//get data Json San Pham Chinh
				$scope.dataCtThucteChinh = [];
				dataSvc.query('ctthuctechinh').then(function(data) {
						$scope.dataCtThucteChinh = data;
				});

				//get data Json address
        dataSvc.query('address').then(function(data) {
						$scope.addressData = data;
				});


				//set Material sp
				vcm.materialInfo = "";
				$scope.setMaterialInfo = function (material) {
					vcm.materialInfo = material;
				}

				$scope.getMaterialInfo = function () {
					return vcm.materialInfo;
				}	

				//click detail san pham
				vcm.itemDetailProduct =[];
				$scope.setItemDetailProduct = function (item) {
					vcm.itemDetailProduct = item;
				}

				$scope.getItemDetailProduct = function () {
					return vcm.itemDetailProduct ;
				}

				$scope.clickDetailProduct = function (item) {
					$scope.setItemDetailProduct(item);
					$scope.goChiTietSanPham();
				}

				$rootScope.$on("clickDetailProduct", function (event,agrs) {
					$scope.clickDetailProduct(agrs.data);
				})

				$scope.isShowNavMobile = false;
				$scope.setIsShowNavMobile = function (data) {
					$scope.isShowNavMobile  = data;
					$scope.scrollTop();
				}

				$scope.hiddenNavMobile = function () {
					$scope.isShowNavMobile = false;
					$scope.isShowSlideCTTT = false;
					$rootScope.$broadcast("hiddenInfoCTTT");
				}

				$scope.getIsShowNavMobile = function () {
					return $scope.isShowNavMobile;
				}

				//set Heigth
				$scope.setHeightFnc = function () {
					$timeout(function(){
						var heigthSet = angular.element(document.querySelectorAll(".sg-windows"))[0].clientHeight;
						angular.element(document.querySelectorAll(".dark-overlay")).css("height",heigthSet +"px");
						angular.element(document.querySelectorAll(".slide-menu-mobi")).css("height",heigthSet +"px");
					}, 500);
				}

				//show View ctthucte
				$scope.isShowSlideCTTT = false;
				$rootScope.$on("showInfoCTTT",function (event,args) {
					$scope.isShowSlideCTTT = true;

				})

				$rootScope.$on("clickCloseButtonSlider",function (event,args) {
					$scope.isShowSlideCTTT = false;
				})

				//click Item Slide Bottom
				$rootScope.$on("clickItemSlideBottom",function (event,args) {
					$scope.goCtThucTe();
				});


		}
})();
