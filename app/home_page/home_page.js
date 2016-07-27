/*
* @Author: yan7
* @Date:   2016-07-27 20:25:51
* @Last Modified by:   yan7
* @Last Modified time: 2016-07-27 20:36:41
*/

(function(angular) {
	'use strict';
	// 1.0 创建首页的模块
	var app = angular.module('home_page', ['ngRoute']);

	// 匹配路由的规格
	app.config(['$routeProvider', function($routeProvider) {
		$routeProvider.when('/home_page', {
			templateUrl: './home_page/view.html'
		})
	}])
})(angular);