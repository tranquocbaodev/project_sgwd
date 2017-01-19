$(function() {
	angular.module('app.core')
		.directive('footerTemp', footerTemp)
		.directive('headerTemp', headerTemp)
		.directive('navMobile', navMobile)
		.directive('sliderTemp', sliderTemp)
		.directive('sliderBottom', sliderBottom)
		.directive('sliderBottomDetail', sliderBottomDetail)
		.directive('validNumber', validNumber)
		.directive('blockNhaPho', blockNhaPho)
		.directive('blockSanPham', blockSanPham)
		.directive('sliderDetailReal', sliderDetailReal);
	
	function headerTemp() {
		return {
			restrict: 'AE',
			templateUrl: 'app/templates/header-temp.html'
		}
	}

	function footerTemp() {
		return {
			restrict: 'AE',

			templateUrl: 'app/templates/footer-temp.html'
		}
	}

	function navMobile() {
		return {
			restrict: 'AE',
			templateUrl: 'app/templates/nav-mobile.html'
		}
	}
	
	function sliderTemp() {
		return {
			restrict: 'A',
			scope: {
				list: "=sliderTemp"
				// tableRole:"@"
			},
			templateUrl: function(element, attrs) {
				  return "app/blocks/slide-top.html";
			},
			controller: function($scope,$filter,$rootScope){
				
			},
			link: function(scope, el, attr) {
				// top slider
				setTimeout(function() {
					$('.bxslider.head-main').slick({
						slidesToShow: 1,
						slidesToScroll: 1,
						fade: true,
						dots: true,
						arrows: false,
						autoplay: true,
						autoplaySpeed: 3000
					});
				}, 100);
			}
		}
	}

	function sliderBottom() {
		return {
			restrict: 'A',
			scope: {
				list: "=sliderBottom"
				// tableRole:"@"
			},
			templateUrl: function(element, attrs) {
				  return "app/blocks/slide-bottom.html";
			},
			controller: function($scope,$filter,$rootScope){
				$scope.clickItemSlideBottom = function () {
					$rootScope.$broadcast('clickItemSlideBottom');
				}
			},
			link: function(scope, el, attr) {
				// top slider
				scope.slidesToShowValue = 3
				if ($(window).width()>=320 && $(window).width()<=767) {
					scope.slidesToShowValue = 1;
				}
				setTimeout(function() {
					$('.slider1.bottom-slider').slick({
						slidesToShow: scope.slidesToShowValue,
						slidesToScroll: 1,
						autoplay: true,
						autoplaySpeed: 2000,
						dots: false,
						variableWidth: true
					});
				}, 100);
			}
		}
	}

	function sliderBottomDetail() {
		return {
			restrict: 'A',
			scope: {
				list: "=sliderBottomDetail"
				// tableRole:"@"
			},
			templateUrl: function(element, attrs) {
				  return "app/blocks/slide-bottom-detail.html";
			},
			controller: function($scope,$filter,$rootScope){
				$scope.clickDetailProduct = function (item) {
					$rootScope.$broadcast("clickDetailProductFromSilde",{data:item});
				}
			},
			link: function(scope, el, attr) {
				scope.slidesToShowValueCtsp = 3
				if ($(window).width()>=320 && $(window).width()<=767) {
					scope.slidesToShowValueCtsp = 1;
				}
				if ($(window).width()>=768 && $(window).width()<=1024) {
					scope.slidesToShowValueCtsp = 2;
				}
				setTimeout(function() {
					$('.slider2.bottom-slider').slick({
						slidesToShow: scope.slidesToShowValueCtsp,
						slidesToScroll: 1,
						autoplay: true,
						autoplaySpeed: 2000,
						dots: false,
						variableWidth: true
					});
				}, 100);
			}
		}
	}

	function sliderDetailReal() {
		return {
			restrict: 'A',
			scope: {
				list: "=sliderDetailReal",
				addressData:"="
			},
			templateUrl: function(element, attrs) {
				  return "app/blocks/slide-detail-real.html";
			},
			controller: function($scope,$filter,$rootScope,$window){
				$scope.isShowSlide= false;
				$scope.arraySlide = [];
				var indexEl = 0;

				$rootScope.$on("showInfoCTTT",function (event,args) {
					$scope.isShowSlide = true;
					$window.scrollTo(0, 0);
					angular.forEach($scope.list,function(item, index) {
						if (item.category === args.data.category) {
							$scope.arraySlide.push(item);
						}
						if (item.id === args.data.id) {
							indexEl = index;
						}
					});
					$scope.createSlider();
					$scope.goToItemSlide(indexEl);
				});

				$scope.clickCloseSlideInfo = function () {
					$scope.isShowSlide = false;
					$rootScope.$broadcast("clickCloseButtonSlider");
					$scope.resetSlide();
				}

				//hidden 
				$rootScope.$on("hiddenInfoCTTT",function (event,args) {
					$scope.isShowSlide = false;
					$scope.resetSlide();
				})
			},
			link: function(scope, el, attr) {
				// creat slide
				scope.createSlider = function() {
					setTimeout(function() {
						$('.slide-repeat-box').slick({
							slidesToShow: 1,
							slidesToScroll: 1,
							dots: false,
							arrows: true,
							autoplay: false,
							autoplaySpeed: 3000,
							variableWidth: true
						});
					}, 100);
				}

				// reset slide
				scope.resetSlide = function() {
					if ($('.slide-repeat-box').length) {
						$('.slide-repeat-box').slick('unslick');
					}
				}

				// go to number slide
				scope.goToItemSlide = function(index) {
					setTimeout(function() {
						$('.slide-repeat-box').slick('slickGoTo', index);
			       	}, 150);
				}
			}
		}
	}

	//input only number
	function validNumber() {
	    return {
		    require: '?ngModel',
		    link: function(scope, element, attrs, ngModelCtrl) {
		      if(!ngModelCtrl) {
		        return; 
		      }

		      ngModelCtrl.$parsers.push(function(val) {
		        if (angular.isUndefined(val)) {
		            var val = '';
		        }
		        
		        var clean = val.replace(/[^-0-9\.]/g, '');
		        var negativeCheck = clean.split('-');
		        var decimalCheck = clean.split('.');
		        if(!angular.isUndefined(negativeCheck[1])) {
		            negativeCheck[1] = negativeCheck[1].slice(0, negativeCheck[1].length);
		            clean =negativeCheck[0] + '-' + negativeCheck[1];
		            if(negativeCheck[0].length > 0) {
		                clean =negativeCheck[0];
		            }
		            
		        }
		          
		        if(!angular.isUndefined(decimalCheck[1])) {
		            decimalCheck[1] = decimalCheck[1].slice(0,4);
		            clean =decimalCheck[0] + '.' + decimalCheck[1];
		        }

		        if (val !== clean) {
		          ngModelCtrl.$setViewValue(clean);
		          ngModelCtrl.$render();
		        }
		        return clean;
		      });

		      element.bind('keypress', function(event) {
		        if(event.keyCode === 32) {
		          event.preventDefault();
		        }
		      });
		    }
	  	}
	}

	//San Pham,
	function blockSanPham() {
		return {
			restrict: 'A',
			scope: {
				list: "=blockSanPham",
				material:"="
			},
			templateUrl: function(element, attrs) {
				  return "app/blocks/blockSanPham.html";
			},
			controller: function($scope,$filter,$rootScope){
				$scope.category ="Cửa sổ";
				$scope.titleMaterial = "CỬA NHÔM";

				$rootScope.$on("selectMaterial", function (event,agrs) {
					$scope.setDataMaterial(agrs.data);
					$scope.category ="Cửa sổ";
					$scope.search();
				})

				$scope.setDataMaterial = function (data) {
					if (data === "Nhựa") {
						$scope.material = "Nhựa";
						$scope.titleMaterial = "CỬA NHỰA";
					}else if(data === "Hợp kim nhôm"){
						$scope.material = "Hợp kim nhôm";
						$scope.titleMaterial = "CỬA NHÔM";
					}else if(data === "Kính cường lực"){
						$scope.material = "Kính cường lực";
						$scope.titleMaterial = "CỬA KÍNH CƯỜNG LỰC";
					}
				}

				$scope.setDataMaterial($scope.material);

				$scope.filterCategoty = function (category) {
					$scope.category = category;
					$scope.search();
				}

				//filter Data
				$scope.filteredItems = [];
				$scope.groupedItems = [];
				$scope.itemsPerPage = 12;
				$scope.pagedItems = [];
				$scope.currentPage = 1;
				$scope.querySearch="";
				// init the filtered items
				var searchMatch = function (haystack, needle) {
					haystack = haystack.toString();
					if (!needle) {
						return true;
					}
					return haystack.toLowerCase().indexOf(needle.toLowerCase()) !== -1;
				};

				$scope.search = function () {
					$scope.filteredItems = $filter('filter')($scope.list, function (item) {
						for (var attr in item) {
							if (searchMatch(item[attr], $scope.material)){
								return true;
							}
						}
						return false;
					});

					$scope.filteredItems = $filter('filter')($scope.filteredItems, function (item) {
						for (var attr in item) {
							if (searchMatch(item[attr], $scope.category)){
								return true;
							}
						}
						return false;
					});
					$scope.currentPage = 1;
					$scope.groupToPages();
				};

				// calculate page in place
				$scope.groupToPages = function () {
					$scope.pagedItems = [];
					for (var i = 0; i < $scope.filteredItems.length; i++) {
						if (i % $scope.itemsPerPage === 0) {
							$scope.pagedItems[Math.floor(i / $scope.itemsPerPage)] = [$scope.filteredItems[i]];
						} else {
							$scope.pagedItems[Math.floor(i / $scope.itemsPerPage)].push($scope.filteredItems[i]);
						}
					}
				};

				$scope.range = function (start, end) {
				  var ret = [];
				  if (!end) {
					  end = start;
					  start = 0;
				  }
				  for (var i = start; i < end; i++) {
					  ret.push(i);
				  }
				  return ret;
				};

				$scope.prevPage = function () {
				  if ($scope.currentPage > 1) {
					  $scope.currentPage--;
				  }
				};

				$scope.nextPage = function () {
				  if ($scope.currentPage < $scope.pagedItems.length) {
					  $scope.currentPage++;
				  }
				};

				
				$scope.setPage = function () {
					if ($scope.currentPage<1|| $scope.currentPage>$scope.pagedItems.length) {
						$scope.currentPage =1;
					}
				};

				$scope.search();

				$scope.clickDetailProduct = function (item) {
					$rootScope.$broadcast("clickDetailProduct",{data:item});
				}

			},
			link: function(scope, el, attr) {
				
			}
		}
	}

	//nha pho
	function blockNhaPho() {
		return {
			restrict: 'A',
			scope: {
				list: "=blockNhaPho"
			},
			templateUrl: function(element, attrs) {
				  return "app/blocks/blockNhaPho.html";
			},
			controller: function($scope,$filter,$rootScope){
				$scope.category ="Nhà phố, biệt thự";

				$scope.filterCategoty = function (category) {
					$scope.category = category;
					$scope.search();
				}

				$rootScope.$on("selectCategoryCt",function (event,args) {
					$scope.category = args.data;
					$scope.search();
				})

				//filter Data
				$scope.filteredItems = [];
				$scope.groupedItems = [];
				$scope.itemsPerPage = 12;
				$scope.pagedItems = [];
				$scope.currentPage = 1;
				// init the filtered items
				var searchMatch = function (haystack, needle) {
					haystack = haystack.toString();
					if (!needle) {
						return true;
					}
					return haystack.toLowerCase().indexOf(needle.toLowerCase()) !== -1;
				};

				$scope.search = function () {
					$scope.filteredItems = $filter('filter')($scope.list, function (item) {
						for (var attr in item) {
							if (searchMatch(item[attr], $scope.category)){
								return true;
							}
						}
						return false;
					});
					
					$scope.currentPage = 1;
					$scope.groupToPages();
				};

				// calculate page in place
				$scope.groupToPages = function () {
					$scope.pagedItems = [];
					for (var i = 0; i < $scope.filteredItems.length; i++) {
						if (i % $scope.itemsPerPage === 0) {
							$scope.pagedItems[Math.floor(i / $scope.itemsPerPage)] = [$scope.filteredItems[i]];
						} else {
							$scope.pagedItems[Math.floor(i / $scope.itemsPerPage)].push($scope.filteredItems[i]);
						}
					}
				};

				$scope.range = function (start, end) {
				  var ret = [];
				  if (!end) {
					  end = start;
					  start = 0;
				  }
				  for (var i = start; i < end; i++) {
					  ret.push(i);
				  }
				  return ret;
				};

				$scope.prevPage = function () {
				  if ($scope.currentPage > 1) {
					  $scope.currentPage--;
				  }
				};

				$scope.nextPage = function () {
				  if ($scope.currentPage < $scope.pagedItems.length) {
					  $scope.currentPage++;
				  }
				};

				$scope.setPage = function () {
					if ($scope.currentPage<1|| $scope.currentPage>$scope.pagedItems.length) {
						$scope.currentPage =1;
					}
				};

				$scope.showInfoItem = function (item) {
					$rootScope.$broadcast("showInfoCTTT",{data:item});
				}

				$scope.search();
			},
			link: function(scope, el, attr) {
				
			}
		}
	}
	
});
