/*
 * @Author: yan7
 * @Date:   2016-07-24 15:24:25
 * @Last Modified by:   yan7
 * @Last Modified time: 2016-07-30 00:49:39
 */

(function(angular) {
    // start working!
    'use strict';
    var app = angular.module('MovieGuide', [
        'search',
        'details',
        'home_page',
        'movie_list',
        'auto-active'
    ]);

    // 配置路由
    app.config(['$routeProvider', function($routeProvider) {
        $routeProvider.otherwise({
            redirectTo: '/home_page'
        })
    }]);

    // 创建控制器
    app.controller('mainController', ['$scope', '$location', function($scope, $location) {
        $scope.query = '';
        $scope.search = function() {
            // 穿入一个字符串参数，就是用来改变字符串的锚点值
            $location.url('/search?q=' + $scope.query);
        }
    }]);

})(angular);
