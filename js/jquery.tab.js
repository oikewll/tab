(function($) {
	//set default
	$.tabOption = {
		target   : undefined,
		tabClass : 'current',
		mode     : 'hover',    //'hover','click'
		show     : 'default',  //'default','fade'
		delay    : 400,        //mouseover的停留时间
		setMem   : false,      //记住最后一次打开的tab
		memName  : 'tabOpt'    //默认的localStorage
	};
	$.extend($.fn, {
	    taber : function(opt){
	    	var def = $.tabOption;
	    	opt.mode ? opt.mode : opt.mode = def.mode;
	    	opt.show ? opt.show : opt.show = def.show;
	    	opt.delay ? opt.delay : opt.delay = def.delay;
	    	opt.setMem ? opt.setMem : opt.setMem = def.setMem;
	    	opt.memName ? opt.memName : opt.memName = def.memName;
			if(opt.setMem){
				var tabOpt = UserData.getItem(opt.memName);
				opt.target.eq(tabOpt)
					.show()
					.siblings(opt.target)
					.hide();
				$(this).eq(tabOpt)
					.addClass(opt.tabClass)
					.siblings($(this))
					.removeClass(opt.tabClass);
			}
			$(this).each(function (){
				var index = $(this).index();
				var _that = this;
				$(this).hoverEvt(function(){
					$(_that).addClass(opt.tabClass)
						.siblings($(this))
						.removeClass(opt.tabClass);
					if(opt.show == 'fade'){
						opt.target.eq(index)
							.fadeIn()
							.siblings(opt.target)
							.hide();
					}else{
						opt.target.eq(index)
							.show()
							.siblings(opt.target)
							.hide();
					}
					if(opt.setMem){
						UserData.setItem(opt.memName,index)
					}
				}, opt.delay, opt.mode);
			});
	    },
	    hoverEvt : function(fn, time, mode){
		 	var waitInterval;
			switch (mode) {
	            case "click":
	                if (waitInterval) {
	                    window.clearTimeout(waitInterval);
	                }
	                $(this).click(function(){
	                	fn();
	                })
	            break;
	            case "hover":
	                $(this).bind({
	                	mouseover:function(){
		                    if (waitInterval) {
		                        window.clearTimeout(waitInterval);
		                    }
		                    waitInterval = window.setTimeout(function () {
		                        fn();
		                    }, time);
	                	},
	                	mouseout:function(){
		                	if (waitInterval != undefined) {
		                        window.clearTimeout(waitInterval);
		                    }	
	                	}
	                })
	            break;
	        }
	    }
	});
	//封装localStorage和UserData方法
	var UserData = {
        userData        : null,
        name            : location.hostname,
        isLocalStorage  : window.localStorage ? true : false,
        init : function(){
            if (!UserData.userData) {
                try {
                    UserData.userData = document.createElement('INPUT');
                    UserData.userData.type = "hidden";
                    UserData.userData.style.display = "none";
                    UserData.userData.addBehavior ("#default#userData");
                    document.body.appendChild(UserData.userData);
                    var expires = new Date();
                    expires.setDate(expires.getDate()+365);
                    UserData.userData.expires = expires.toUTCString();
                } catch(e) {
                    return false;
                }
            }
            return true;
        },
        setItem : function(key, value) {
        	if(this.isLocalStorage){
        		localStorage.setItem(key,value)
        	}else{
	        	if(UserData.init()){
	                UserData.userData.load(UserData.name);
	                UserData.userData.setAttribute(key, value);
	                UserData.userData.save(UserData.name);
	            }
        	}
        },
        getItem : function(key) {
        	if(this.isLocalStorage){
        		return window.localStorage.getItem(key);
        	}else{
	        	if(UserData.init()){
		            UserData.userData.load(UserData.name);
		            return UserData.userData.getAttribute(key)
	            }
        	}
        },
        remove : function(key) {
        	if(this.isLocalStorage) {
        		localStorage.removeItem(key);
        	}else{
	        	if(UserData.init()){
		            UserData.userData.load(UserData.name);
		            UserData.userData.removeAttribute(key);
		            UserData.userData.save(UserData.name);
	            }
        	}
        }
    };
})(jQuery);