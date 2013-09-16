#tab+ plugin

tab+是一个基于jQuery框架的tab切换插件,[Live demo](https://oikewll.github.io/tab)

##useage

1. 头部引入tab.min.js

```
<head>
    <script type="text/javascript" src="http://ajax.googleapis.com/ajax/libs/jquery/1.7/jquery.min.js"></script>
    <script src="https://oikewll.github.io/tab/js/tab.min.js"></script>
</head>
```

2. 设置切换对象

```js
$("#tabber li").taber({              //这个是切换触发的元素
	target    : $("#wrapCont li"),   //切换区元素
	tabClass  : 'current'            //触发元素的class
});
```

##Setting

另外的一些参数用法：

* mode
> `hover` || `click`  ,默认是`hover`鼠标划过，灵敏度用`delay`参数设置

* show
> `default` || `fade`, 切换内容区的显示效果，默认是`default`，`fade`是淡出效果

* delay
> int , mode是hover设置这项，默认是`400`毫秒，1000毫秒＝1秒

* setMem
> `true` || `false`, 是否记住最后一个切换选项，默认`false`

##License

tab+ is released under the MIT license。