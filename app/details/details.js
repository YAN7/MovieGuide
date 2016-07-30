/*
 * @Author: yan7
 * @Date:   2016-07-28 18:39:27
 * @Last Modified by:   yan7
 * @Last Modified time: 2016-07-30 00:49:37
 */

(function(angular) {
    'use strict';
    // 1.0 创建details模块
    var app = angular.module('details', ['ngRoute', 'http-server']);

    // 2.0 配置路由规格
    app.config(['$routeProvider', function($routeProvider) {
        $routeProvider.when('/details/:id', {
            templateUrl: './details/view.html',
            controller: 'detailsController'
        })
    }])

    // 3.0 创建控制器
    app.controller('detailsController', [
        '$scope',
        '$routeParams',
        'Myservice',
        function($scope, $routeParams, Myservice) {
        	$scope.loading = true;
            Myservice.jsonp('https://api.douban.com/v2/movie/subject/' + $routeParams.id, {}, function(data) {
                $scope.data = data;
                $scope.loading = false;
                // $scope.$apply()是为让angular手动加载不同的数据模型.
                $scope.$apply();
            })
        }
    ])
})(angular);
