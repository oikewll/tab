# jquery tab+ plugin

tab+ is a jQuery plugin for switching,[try it here](http://oikewll.github.io/tab).

## Usage

base on jquery.js,and include [jquery.tab.js](http://oikewll.github.io/tab/js/jquery.tab.js) or [jquery.tab-min.js](http://oikewll.github.io/tab/js/jquery.tab-min.js) like this:

```
<head>
    <script src="http://ajax.googleapis.com/ajax/libs/jquery/1.7/jquery.min.js"></script>
    <script src="http://oikewll.github.io/tab/js/jquery.tab.js"></script>
</head>
```

set the object need switch.

```js
$("#tabber li").taber({              //switch trigger element
	target    : $("#wrapCont li"),   //switch content
	tabClass  : 'current'            //current class for style
});
```

## Setting

another parameter：

* mode
> 'String' —— `hover` || `click`  ,默认是`hover`鼠标划过，灵敏度用`delay`参数设置

* show
> 'String' —— `default` || `fade`, 切换内容区的显示效果，默认是`default`，`fade`是淡出效果

* delay
> 'Number' ——  , mode是hover设置这项，默认是`400`毫秒，1000毫秒＝1秒

* setMem
> 'Boolean' —— `true` || `false`, 是否记住最后一个切换选项，默认`false`

* memName
> 'String' ——  , 自定义setMem的名字，默认`tabOpt`

## License

tab+ is released under the MIT license。