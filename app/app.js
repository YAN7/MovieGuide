/*
* @Author: yan7
* @Date:   2016-07-24 15:24:25
* @Last Modified by:   yan7
* @Last Modified time: 2016-07-28 17:48:10
*/

(function (angular) {
    // start your ride
    var app = angular.module('MovieGuide',[
    	// 匹配规则是先引用先匹配
    	'home_page',
    	'movie_list',
    	'auto-active'

    	// 'coming_soon',
    	// 'top250'
    	]);

      // 创建控制器
      app.controller('mainController', ['$scope', '$location', function($scope, $location) {
        $scope.query = '';
        $scope.search = function () {
          // 穿入一个字符串参数，就是用来改变字符串的锚点值
          $location.url('/search?q=' + $scope.query);
        }
      }]);



})(angular);
