/*
* @Author: yan7
* @Date:   2016-07-24 14:54:40
* @Last Modified by:   yan7
* @Last Modified time: 2016-07-24 20:56:26
*/

(function(angular) {
	'use strict';
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
	app.controller("in_theatersController", ["$scope", "$http", function($scope, $http) {
		$scope.loading = true;
		// 利用postman解析的假数据
		$scope.data;

    // 利用angular的http发送请求数据
    // then的第一个参数是成功的回调函数，第二个参数是失败的回调函数
    $http.get('./in_theaters/in_theaters.json').then(function(response) {
      // 将请求到的数据通过$scope.data暴露出去
      $scope.data = response.data;
    })


	}])
})(angular);