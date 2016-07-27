/*
 * @Author: yan7
 * @Date:   2016-07-27 15:53:54
 * @Last Modified by:   yan7
 * @Last Modified time: 2016-07-27 20:15:07
 */


(function(angular) {
    // 'use strict';
    // 1.0这里是自定义指令模块，用于对导航栏焦点状态切换
    var app = angular.module("auto-active", []);

    // 2.0 创建自定义指令
    // 名字必须以驼峰命名法的形式来书写
    app.directive('autoActive', ['$location', function($location) {
        // link可以指定一个方法用于对自定义指令所在标签进行处理
        return {
            link: function(scope, element, attributes) {
                // scope,暴露数据到模板中使用
                // element是自定义指令所在标签的jQuite对象
                // angular.element
                // attributes是自定义指令所在标签的所有属性的集合,是一个object对象


                // 给li标签注册点击事件
                // 通过监视url的锚点值的变化来改变焦点，
                // 点击按钮会改变锚点值，所以不再需要点击事件了
                // element.on("click", function() {
                //     // 添加active样式，移除所有兄弟li标签的active样式
                //     // angular没有提供siblings()方法
                // 	element.parent().children().removeClass('active');
                // 	element.addClass('active');
                // });

                // 自定义指令的scope也有$watch方法，和控制器中的$scope.$watch的方法是一样的
                // watch只能监视scope的属性，所以要先把$location赋值给scope.
                scope.loca = $location;
                scope.$watch('loca.url()', function(newValue, oldValue) {
                	var hash = element.children()[0].href.split('#')[1];
                	// startsWith是h5的新属性，判断一个字符是否是以括号内的字符开始的，返回一个布尔值
                	// ends同理
                	if (newValue.startsWith(hash)) {
                		element.parent().children().removeClass('active');
                		element.addClass('active');
                	}

                })

            }

        }

    }])


})(angular)
