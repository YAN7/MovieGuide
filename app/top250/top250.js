/*
* @Author: yan7
* @Date:   2016-07-24 19:37:22
* @Last Modified by:   yan7
* @Last Modified time: 2016-07-24 19:54:24
*/

(function(angular) {
	'use strict';
	// 1.0创建top250模块
	var app = angular.module('top250', ['ngRoute']);

	// 2.0配置路由
	app.config(['$routeProvider', function($routeProvider) {
		$routeProvider.when('/top250', {
			templateUrl: "./top250/view.html",
			controller: "top250Controller"
		})
	}])

	// 创建控制器
	app.controller('top250Controller', ['$scope', function($scope) {

	}])
})(angular)