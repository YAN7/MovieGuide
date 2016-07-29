/*
 * @Author: yan7
 * @Date:   2016-07-27 20:25:51
 * @Last Modified by:   yan7
 * @Last Modified time: 2016-07-29 20:20:50
 */

(function(angular) {
    'use strict';
    // 1.0创建正在热映模块
    var app = angular.module("home_page", ["ngRoute", "http-server"]);

    // 2.0配置路由
    app.config(["$routeProvider", function($routeProvider) {
        $routeProvider.when('/home_page', {
            templateUrl: "./home_page/view.html",
            controller: "home_pageController"
        })
    }])

    // 3.0创建控制器
    app.controller("home_pageController", [
        "$scope",
        "Myservice",
        function($scope, Myservice) {
        	$scope.loading = true;
            Myservice.jsonp("https://api.douban.com//v2/movie/us_box", {}, function(data) {
                $scope.data = data;
                $scope.loading = false;
                $scope.$apply();
            })
        }
    ])
})(angular);
