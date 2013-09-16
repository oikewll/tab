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
				var tabOpt = !/*@cc_on!@*/0 ? localStorage.getItem("tabOpt") : userData.getAttribute("tabOpt");
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
						!/*@cc_on!@*/0 ? localStorage.setItem("tabOpt",index) : userData.setAttribute("tabOpt",index);// 兼容现代浏览器和ie记住选择
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
})(jQuery);