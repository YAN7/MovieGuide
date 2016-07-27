/*
* @Author: yan7
* @Date:   2016-07-24 15:24:25
* @Last Modified by:   yan7
* @Last Modified time: 2016-07-27 20:34:06
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

})(angular);