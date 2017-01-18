/* Controllers */
(function() {
    'use strict';

    angular
        .module('app.lienhe')
        .controller('lienheCtrl', lienheCtrl);

    //login
    function lienheCtrl($scope,$rootScope, $filter, $location,dataSvc) {
        var vm = this;
        $rootScope.locationName = "Liên Hệ";
        $scope.setIsShowNavMobile(false);
        $scope.setHeightFnc();
        
        vm.addressData=[];
        dataSvc.query('address').then(function(data) {
						vm.addressData = data;
						$scope.initMap();
				});

        $scope.initMap = function() {
          var companyLocation = {lat: vm.addressData.latitude, lng: vm.addressData.longitude};
          var map = new google.maps.Map(document.getElementById('map'), {
            zoom: 17,
            center: companyLocation
          });
          var marker = new google.maps.Marker({
            position: companyLocation,
            map: map,
            title: vm.addressData.address
          });
        }

    }
})();
