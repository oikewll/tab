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
> 'String' —— `hover` || `click` ,mouse event, default `hover` to switch trigger,you can set daley time in `delay` option;

* show
> 'String' —— `default` || `fade`, switch content mode;

* delay
> 'Number' ——  , default is `400` ms,1000ms＝1s;

* setMem
> 'Boolean' —— `true` || `false`, remember the tab you choose when you close/refresh browser, default is false;

* memName
> 'String' ——  , name of the localStorage by custom, default `tabOpt`

## License

tab+ is released under the [MIT](http://opensource.org/licenses/MIT) license。