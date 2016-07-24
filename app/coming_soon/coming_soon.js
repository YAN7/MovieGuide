/*
* @Author: yan7
* @Date:   2016-07-24 18:40:07
* @Last Modified by:   yan7
* @Last Modified time: 2016-07-24 19:29:31
*/

(function (angular) {
	'use strict';
	// 1.0创建正在热映模块
	var app = angular.module('coming_soon',['ngRoute']);

	// 2.0配置路由
	app.config(["$routeProvider", function($routeProvider) {
		$routeProvider.when('/coming_soon', {
			templateUrl: './coming_soon/view.html',
			controller: 'coming_soonController'
		})
	}])

	// 3.0创建控制器
	app.controller('coming_soonController', ['$scope', function($scope) {

	}])

})(angular)