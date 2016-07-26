#Movie Guide


## [**demo**](https://yan7.github.io/MovieGuide/app/index.html)

## 遇到的bug

1. 控制器的写法写错，报bug
2. 坑爹的豆瓣API还是有次数限制的，有APIkey的话每分钟能访问40次，没有的话每分钟只能访问10次，一不小心就给封ip了，还原DNS缓存也没用，导致工作只能暂停。

## 理解过程

### 直接使用模板字符串
1. 当锚点值为in\_theaters时，路由匹配成功，输出文件路径，然后通过ng-view在页面上输出，这些路由器的工作都是由in\_theaters完成的，但是完成后通过在app.js输出工作内容.
2. ng-view的作用:把指定的模板字符串插入到ng-view中。

### 利用postman来请求到即时数据，在渲染到页面上
1. 利用控制器中的$scope将请求的数据暴露出来，在渲染到页面上,
2. 渲染图片时，如果直接使用src属性，浏览器会在angula未渲染图片前将src中的内容当做路径来请求，因为会报bug，解决方法是就src改为ng-src.同理，在angular中href属性也可以用ng-href来代替.
3. 渲染数据时，遇到json数据中含有数组的，可以使用数组的join方法，将数组按照指定的符号拆分成一个字符串。
	- join() 方法用于把数组中的所有元素放入一个字符串。
	- 元素是通过指定的分隔符进行分隔的，如果不传参则默认使用逗号分隔。
4. 基本思路搞清楚了，都是匹配路由，就是匹配锚点值，当匹配成功后就将该路由的模板文件的内容渲染到页面中，三个模块都是这样的。

### 利用控制器的$http参数的get方法发送ajax请求获取本地json数据
1. 要想在angular中发送ajax请求，必须给控制器中传入$http参数。
2. angular中发送ajax的方法$http，其中又有两个简便分方法get和post，然后可以通过then方法执行回调函数。
3. then方法的第一个参数为成功的回调函数，第二个参数哦为失败的回调函数.
4. 将数据保存在一个json文件中，利用ajax请求获取数据并渲染在页面，可以让页面减少很多代码，简洁又实用.

### 利用jsonp调用豆瓣API完成实时数据渲染

#### 自己封装jsonp跨域请求函数
1. 由于豆瓣api规定接受的callback参数只能包含数字、字母、下划线，长度不大于50，所以angular自带的跨域方法jsonp由于callback参数是带有.的，所以在这里直接用jsonp方法调用豆瓣API会失败，必须自己封装一个jsonp跨域方法.
2. 创建myJsonp函数，其中有三个函数
	+ url: 请求的路径，这里是豆瓣API的地址;
	+ arg: 请求的参数，这个参数是由豆瓣API提供的，一个是start：从第几条数据开始返回，count： 返回几条数据;
	+ fn: 请求成功的回调函数,因为fn是一个匿名函数，所以将其拼接到url中的时候要先给它一个名字mycallbackName.
3. 首先需要合并参数到url中，这里需要合并arg的参数和angular要求的callback参数,都是使用拼接字符串的方法.
4. 为了防止调用多次的时候后面的回调函数覆盖了前面的回调函数，这样会使多次请求的数据就都被最后一次请求的数据覆盖了。所以每次都要给fn函数一个随机名字
5. 为了让mycallbackName可以全局作用，可以让它成为window的一个属性，这样它就是全局作用域了.
6. 为了避免调用多次之后生成很多个script标签所以要在请求数据成功并返回数据之后移出该script标签，所以把mycallbackName作为一个函数执行，每次请求成功并改回数据后则移除该script标签.
7. 以下是myJsonp函数的完整代码(注释在源码里有):
```javascript
function myJsonp(url, arg, fn) {
  var queryString = '';
  for (var key in arg) {
  	queryString += key + '=' + arg[key] + '&';
  }
  url = url + '?' + queryString;
  var mycallbackName = "jsonp_" + Math.random().toString().substr(2);

  window[mycallbackName] = function(data) {
    fn(data);
    document.body.removeChild(scriptEle);
  }

  url = url + "callback=" + mycallbackName;

  var scriptEle = document.createElement('script');
  scriptEle.src = url;
  document.body.appendChild(scriptEle);
    }
```

#### 将自己封装jsonp跨域运用到项目中
1. 先创建一个http-server模块，通过service创建一个服务，将封装的myjsonp函数放进去
  + 需要注意的是，angular中有自己的全局对象$window，要用这个来代替window
  + 在index页面中也需要引入这个模块
2. 接着在需要用到跨域请求数据的模块中注入这个模块,因为需要通过控制器暴露请求到的数据，所以在控制器中也需要注入这个模块。
3. 因为angular请求数据是异步的，而js执行是同步的，所以angular不能自动检测到数据模型已发生改变并渲染数据。
4. 所以直接通过`$scope.data = data`不会报错，但angular不会将新的数据模型渲染到页面上.
5. 要解决这个办法，需要在回调函数的最后面加上`$scope.$apply()`.
6. 注意：在angular中，但凡是异步操作，都需要`$scope.$apply()`这一句代码。

#### 在请求数据成功后未返回数据前给页面加上遮罩层
1. google‘css loading’可以得出很多个css遮罩层，选择其中一种将代码复制进自己的项目即可
2. 将html贴在数据渲染模板中，自己可以根据需求更改一些css样式。
3. 给遮罩层div盒子加上`ng-show=loading`,一开始在控制器中设置`$scope.loading = true`,在请求回调函数中设置`$scope.loading = false`，即可实现在加载数据时展现，在数据加载完成后消失.








