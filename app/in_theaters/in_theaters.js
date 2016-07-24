/*
* @Author: yan7
* @Date:   2016-07-24 14:54:40
* @Last Modified by:   yan7
* @Last Modified time: 2016-07-24 15:32:07
*/

'use strict';
(function(angular) {
	// 1.0创建正在热映模块
	var app = angular.module("in_theaters",["ngRoute"]);

	// 2.0配置路由
	app.config(["$routeProvider", function ($routeProvider) {
		 // 写具体的规格
		 $routeProvider.when('/in_theaters', {
		 	// 指定一个模板路径
		 	// 模板字符串的路径是根据主模块的路径开始计算的
		 	templateUrl: "./in_theaters/view.html",
		 	controller: "in_theatersController"
		 })
	}])

	// 3.0创建控制器
	app.controller("in_theatersController", ["$scope", function($scope) {

	}])
})(angular);