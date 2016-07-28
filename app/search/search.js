/*
* @Author: yan7
* @Date:   2016-07-28 18:01:16
* @Last Modified by:   yan7
* @Last Modified time: 2016-07-28 21:06:32
*/

(function(angular) {
	'use strict';
	// 1.0 创建搜索模块
	var app = angular.module("search", ['ngRoute', 'http-server']);

	// 2.0 配置路由
    app.config(["$routeProvider", function($routeProvider) {
        $routeProvider.when('/search/:page?', {
            templateUrl: "./search/view.html",
            controller: "searchController"
        })
    }])

    // 3.0 创建控制器
    app.controller("searchController", [
        "$scope",
        "$http",
        "$routeParams",
        "$route", // 这个参数是用来改变url中锚点值的
        "Myservice",
        function($scope, $http, $routeParams, $route, Myservice) {
            $scope.loading = true;
            // 开始进行分页处理
            var count = 10; // 每页渲染的数据
            var page = ($routeParams.page || '1') - 0; // -0 是为了将page从字符串转为整型
            var maxPage = 0;
            var start = (page - 1) * count;
            $scope.nowPage = page;

            // 使用Myservice服务来请求第三方api
            // 需要动态改变的是这个url的锚点值
            var url = "https://api.douban.com//v2/movie/search?q=" + $routeParams.q;
            Myservice.jsonp(url, { start: start, count: count }, function(data) {
                $scope.data = data;
                maxPage = Math.ceil($scope.data.total / count);
                $scope.loading = false;
                $scope.maxPage = maxPage;
                $scope.page = page;
                $scope.total = $scope.data.total;
                $scope.$apply();
            })

            // 实现点击按钮分页功能
            $scope.goPage = function (gopage) {
            	if(gopage <= 0 || gopage > maxPage) {
            		return;
            	}
            	$route.updateParams({page: gopage})
            }
        }
    ])
})(angular);