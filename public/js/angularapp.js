var myApp = angular.module('Mordordemo', ['ui.bootstrap']);
	myApp.directive('dataanalysis', ['$window', function ($window) {
     return {
		restrict: "E",
			controller: function($scope, $attrs) {
				var click =1;
				$scope.togglemenu = function(){
					if(click%2==1){
						angular.element(document.querySelector("#contentarea")).removeClass("col-md-10");
						angular.element(document.querySelector("#contentarea")).removeClass("col-xs-9");
						angular.element(document.querySelector("#contentarea")).addClass("col-md-12");
						angular.element(document.querySelector("#contentarea")).addClass("col-xs-12");
						angular.element(document.querySelector("#sidebar")).hide();
						angular.element(document.querySelector("#menutoggle")).text("Open Menu");
					}else if(click%2==0){
						angular.element(document.querySelector("#sidebar")).show();
						angular.element(document.querySelector("#contentarea")).addClass("col-md-10");
						angular.element(document.querySelector("#contentarea")).addClass("col-xs-9");
						angular.element(document.querySelector("#contentarea")).removeClass("col-md-12");
						angular.element(document.querySelector("#menutoggle")).text("Close Menu");
					}
					click++;
				}
				$scope.$on('showsubnav', function(event,msgFromParent) {
					if(msgFromParent.data == 'hidenav'){
						 $scope.$apply(function () {
							$scope.accordion2 = true;
							$scope.accordion1 = false;
							$scope.subnav = false;
						  });
					}else if(msgFromParent.data == 'subnav'){
						$scope.$apply(function () {
							$scope.accordion1 = true;
							$scope.accordion2 = false;
							$scope.subnav = true;
						});
					}
				});
			},
			replace:true,
			transclude: true,
		templateUrl: "/templates/data&analysis.html"
	}  
	}]);
	myApp.directive('company', ['$window', function ($window) {
		return {
		    restrict: "E",
			controller: function($scope, $attrs) {
				var click =1;
				$scope.togglemenu = function(){
					if(click%2==1){
						angular.element(document.querySelector("#contentarea")).removeClass("col-md-10");
						angular.element(document.querySelector("#contentarea")).removeClass("col-xs-9");
						angular.element(document.querySelector("#contentarea")).addClass("col-md-12");
						angular.element(document.querySelector("#contentarea")).addClass("col-xs-12");
						angular.element(document.querySelector("#sidebar")).hide();
						angular.element(document.querySelector("#menutoggle")).text("Open Menu");
					}else if(click%2==0){
						angular.element(document.querySelector("#sidebar")).show();
						angular.element(document.querySelector("#contentarea")).addClass("col-md-10");
						angular.element(document.querySelector("#contentarea")).addClass("col-xs-9");
						angular.element(document.querySelector("#contentarea")).removeClass("col-md-12");
						angular.element(document.querySelector("#menutoggle")).text("Close Menu");
					}
					click++;
				}
				$scope.$on('showsubnav', function(event,msgFromParent) {
					if(msgFromParent.data == 'hidenav'){
						 $scope.$apply(function () {
							$scope.accordion2 = true;
							$scope.accordion1 = false;
							$scope.subnav = false;
						  });
					}else if(msgFromParent.data == 'subnav'){
						$scope.$apply(function () {
							$scope.accordion1 = true;
							$scope.accordion2 = false;
							$scope.subnav = true;
						});
					}
				});
			},
			replace:true,
			transclude: true,
			templateUrl: '/templates/company.html'
		}
    }]);
	myApp.controller('Dynamicloadcontroller', ['$scope','$location','$timeout','$window','$rootScope','$compile','$filter',function($scope,$location,$timeout,$window,$rootScope,$compile,$filter) {
		var appWindow = angular.element($window);
		appWindow.bind('resize', function () {
			setnavbar();
		});
		$scope.load = function () {
			var template = $compile("<dataanalysis></dataanalysis>")($scope);
			var contentdiv = document.getElementById('content');
			var clr = angular.element(contentdiv)
			clr.empty();
			angular.element(contentdiv).append(template);
			angular.element(document.querySelector("#analysis")).trigger("mouseenter");
			setnavbar();
		};
		$scope.gettemplate = function(tempname){
			if(tempname == 'dataanalysis'){
				var template = $compile("<dataanalysis></dataanalysis>")($scope);
			}else if(tempname == 'companies'){
				var template = $compile("<company></company>")($scope);
			}
			var contentdiv = document.getElementById('content');
			var clr = angular.element(contentdiv)
			clr.empty();
			angular.element(contentdiv).append(template);
			setnavbar();
		};
		function setnavbar(){
			var w = angular.element($window);
			if(w.width()>=1254){
				setTimeout(function() {
					$rootScope.$broadcast('showsubnav', {
						data: "subnav"
					});
				},500);
			}else if(w.width()<1254){
				setTimeout(function() {
					$rootScope.$broadcast('showsubnav', {
						data: "hidenav"
					});
				},500);
			}
		}
	}]);