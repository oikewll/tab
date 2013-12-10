;(function($) {

	"use strict"

	// 简易封装localStorage和UserData方法, 更多请参考:
	// https://developer.mozilla.org/en-US/docs/Web/Guide/API/DOM/Storage
	// https://github.com/marcuswestin/store.js
	// http://msdn.microsoft.com/en-us/library/ms531424(v=vs.85).aspx
	var UserData = (function(global) {
		return global.localStorage ? global.localStorage : (function(){
			var userData = null;
			var name = location.hostname;
			try {
                userData = document.createElement('INPUT');
                userData.type = "hidden";
                userData.style.display = "none";
                userData.addBehavior("#default#userData");
                document.body.appendChild(userData);
                userData.expires = new Date(365 * 24 * 60 * 60 * 1000 + $.now()).toUTCString();
            } catch(e) {
                return {
                	setItem: function(){},
                	getItem: function(){},
                	removeItem: function(){}
                };
            }
            return {
            	setItem: function(key, value){
            		userData.load(name);
	                userData.setAttribute(key, value);
	                userData.save(name);
            	},
            	getItem: function(key){
            		userData.load(name);
		            return userData.getAttribute(key)
            	},
            	removeItem: function(key){
            		userData.load(name);
		            userData.removeAttribute(key);
		            userData.save(name);
            	}
            }
		})();
	})(window);

	$.extend($.fn, {

	    taber : function(opt) {

	    	// options
	    	opt = $.extend({
				target   : undefined,
				tabClass : 'current',
				mode     : 'hover',    //'hover','click'
				show     : 'default',  //'default','fade'
				delay    : 400,        //mouseover的停留时间
				setMem   : false,      //记住最后一次打开的tab
				memName  : 'tabOpt'    //默认的localStorage
			}, opt);

			var $this = $(this);

			var setActive = function(index) {
				index = index >> 0;
				$(opt.target).eq(index)[opt.show === 'fade' ? 'fadeIn' : 'hide']().siblings(opt.target).hide();
				$this.removeClass(opt.tabClass).eq(index).addClass(opt.tabClass);
				opt.setMem && UserData.setItem(opt.memName, index);
			}

			setActive(UserData.getItem(opt.memName));

			$(this).each(function (index){
				$(this).hoverEvt(function(){
					setActive(index);
				}, opt.delay, opt.mode);
			});
	    },
	    hoverEvt : function(fn, time, mode){
		 	var waitInterval = 0;
			switch (mode) {
	            case "click":
	                $(this).click(function(event){
	                	event.preventDefault();
	                	fn();
	                });
	            	break;
	            case "hover":
	            default:
	                $(this).bind({
	                	mouseover:function(){
		                    waitInterval && clearTimeout(waitInterval);
		                    waitInterval = setTimeout(function () {
		                        fn();
		                    }, time);
	                	},
	                	mouseout:function(){
		                	clearTimeout(waitInterval);
	                	}
	                });
	        }
	    }
	});
})(jQuery);