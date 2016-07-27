/*
 * @Author: yan7
 * @Date:   2016-07-24 14:54:40
 * @Last Modified by:   yan7
 * @Last Modified time: 2016-07-27 15:07:39
 */

(function(angular) {
    'use strict';
    // 1.0创建正在热映模块
    var app = angular.module("top250", ["ngRoute", "http-server"]);

    // 2.0配置路由
    app.config(["$routeProvider", function($routeProvider) {
        // 写具体的规格
        // 使用路由参数来动态匹配页码
        // 加上？号表示匹配不写页码的情况
        $routeProvider.when('/top250/:page?', {
            // 指定一个模板路径
            // 模板字符串的路径是根据主模块的路径开始计算的
            templateUrl: "./top250/view.html",
            controller: "top250Controller"
        })
    }])

    // 3.0创建控制器
    // 要在控制器中使用Myservice，则必须也要注入之后才能
    app.controller("top250Controller", [
        "$scope",
        "$http",
        "$routeParams",
        "$route", // 这个参数是用来改变url中锚点值的
        "Myservice",
        function($scope, $http, $routeParams, $route, Myservice) {
            $scope.loading = true;
            // 利用postman解析的假数据
            // $scope.data;

            // 利用angular的http发送请求数据
            // then的第一个参数是成功的回调函数，第二个参数是失败的回调函数
            // $http.get('./top250/top250.json').then(function(response) {
            // 将请求到的数据通过$scope.data暴露出去
            // $scope.data = response.data;

            //angular中的跨域请求需要加上JSON_CALLBACK参数
            // 由于angular不支持这种有点的参数，所以不能用angular的jsonp方法，需要自己封装一个跨域请求方法
            // $http.jsonp('http://api.douban.com//v2/movie/top250?JSON_CALLBACK').then(function(data) {
            //   console.log(data);
            // })

            // })

            // 开始进行分页处理
            var count = 10; // 每页渲染的数据
            var page = ($routeParams.page || '1') - 0; // -0 是为了将page从字符串转为整型
            // 将当前页暴露出来，方便给上一页，下一页点击事件使用
            $scope.nowPage = page;
            // 最大页数
            var maxPage = 0;

            var start = (page - 1) * count;


            // 使用Myservice服务来请求第三方api
            Myservice.jsonp("https://api.douban.com//v2/movie/top250", { start: start, count: count }, function(data) {
                // 因为angular请求数据是异步的，而js执行是同步的，所以angular不能自动检测到数据模型已发生改变并渲染数据
                // 这里就需要$apply方法去手动告诉angular数据模型发生改变时重新渲染数据
                // 但凡是异步操作，都需要这一句话
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
            	// 限制页数在0和最大页数之间
            	if(gopage <= 0 || gopage > maxPage) {
            		return;
            	}

            	// updateParams是用来改变url中锚点值的参数的,这样就会重新匹配路由规格，不需要在这里发jsonp请求了
            	// 其实这个思路就是angular动态的改变了url中page参数的值，这样路由就会重新匹配，然后重新发送jsonp请求.
            	// 要求传入一个对象
            	$route.updateParams({page: gopage})
            }


        }
    ])
})(angular);
