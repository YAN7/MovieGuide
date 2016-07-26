/*
* @Author: yan7
* @Date:   2016-07-24 14:54:40
* @Last Modified by:   yan7
* @Last Modified time: 2016-07-25 19:43:00
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
    // $http.get('./in_theaters/in_theaters.json').then(function(response) {
      // 将请求到的数据通过$scope.data暴露出去
      // $scope.data = response.data;

      //angular中的跨域请求需要加上JSON_CALLBACK参数
      // 由于angular不支持这种有点的参数，所以不能用angular的jsonp方法，需要自己封装一个跨域请求方法
      $http.jsonp('http://api.douban.com//v2/movie/in_theaters?JSON_CALLBACK').then(function(data) {
        console.log(data);
      })

    // })

	}])
})(angular);