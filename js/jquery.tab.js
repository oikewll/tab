(function($) {
	//set default
	$.tabOption = {
		target   : undefined,
		tabClass : 'current',
		mode     : 'hover',    //'hover','click'
		show     : 'default',  //'default','fade'
		delay    : 400,        //mouseover的停留时间
		setMem   : false       //记住最后一次打开的tab
	};
	$.extend($.fn, {
	    taber : function(opt){
	    	var def = $.tabOption;
	    	opt.mode ? opt.mode : opt.mode = def.mode;
	    	opt.show ? opt.show : opt.show = def.show;
	    	opt.delay ? opt.delay : opt.delay = def.delay;
	    	opt.setMem ? opt.setMem : opt.setMem = def.setMem;
			if(opt.setMem){
				var tabOpt = $.localData.get("tabOpt");
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
						$.localData.set("tabOpt",index)
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
	$.localData = {
        hname          : location.hostname ? location.hostname : 'localStatus',
        isLocalStorage : window.localStorage ? true : false,
        dataDom        : null,

        initDom:function(){ //初始化userData
            if(!this.dataDom){
                try{
                    this.dataDom = document.createElement('input');//这里使用hidden的input元素
                    this.dataDom.type = 'hidden';
                    this.dataDom.style.display = "none";
                    this.dataDom.addBehavior('#default#userData');//这是userData的语法
                    document.body.appendChild(this.dataDom);
                    var exDate = new Date();
                    exDate = exDate.getDate()+30;
                    this.dataDom.expires = exDate.toUTCString();//设定过期时间
                }catch(ex){
                    return false;
                }
            }
            return true;
        },
        set:function(key,value){
            if(this.isLocalStorage){
                window.localStorage.setItem(key,value);
            }else{
                if(this.initDom()){
                    this.dataDom.load(this.hname);
                    this.dataDom.setAttribute(key,value);
                    this.dataDom.save(this.hname)
                }
            }
        },
        get:function(key){
            if(this.isLocalStorage){
                return window.localStorage.getItem(key);
            }else{
                if(this.initDom()){
                    this.dataDom.load(this.hname);
                    return this.dataDom.getAttribute(key);
                }
            }
        },
        remove:function(key){
            if(this.isLocalStorage){
                localStorage.removeItem(key);
            }else{
                if(this.initDom()){
                    this.dataDom.load(this.hname);
                    this.dataDom.removeAttribute(key);
                    this.dataDom.save(this.hname)
                }
            }
        }
    }
})(jQuery);