(function(a){a.tabOption={target:undefined,tabClass:"current",mode:"hover",show:"default",delay:400,setMem:false};a.extend(a.fn,{taber:function(b){var c=a.tabOption;b.mode?b.mode:b.mode=c.mode;b.show?b.show:b.show=c.show;b.delay?b.delay:b.delay=c.delay;b.setMem?b.setMem:b.setMem=c.setMem;if(b.setMem){var d=a.localData.get("tabOpt");b.target.eq(d).show().siblings(b.target).hide();a(this).eq(d).addClass(b.tabClass).siblings(a(this)).removeClass(b.tabClass)}a(this).each(function(){var e=a(this).index();var f=this;a(this).hoverEvt(function(){a(f).addClass(b.tabClass).siblings(a(this)).removeClass(b.tabClass);if(b.show=="fade"){b.target.eq(e).fadeIn().siblings(b.target).hide()}else{b.target.eq(e).show().siblings(b.target).hide()}if(b.setMem){a.localData.set("tabOpt",e)}},b.delay,b.mode)})},hoverEvt:function(b,c,e){var d;switch(e){case"click":if(d){window.clearTimeout(d)}a(this).click(function(){b()});break;case"hover":a(this).bind({mouseover:function(){if(d){window.clearTimeout(d)}d=window.setTimeout(function(){b()},c)},mouseout:function(){if(d!=undefined){window.clearTimeout(d)}}});break}}});a.localData={hname:location.hostname?location.hostname:"localStatus",isLocalStorage:window.localStorage?true:false,dataDom:null,initDom:function(){if(!this.dataDom){try{this.dataDom=document.createElement("input");this.dataDom.type="hidden";this.dataDom.style.display="none";this.dataDom.addBehavior("#default#userData");document.body.appendChild(this.dataDom);var c=new Date();c=c.getDate()+30;this.dataDom.expires=c.toUTCString()}catch(b){return false}}return true},set:function(b,c){if(this.isLocalStorage){window.localStorage.setItem(b,c)}else{if(this.initDom()){this.dataDom.load(this.hname);this.dataDom.setAttribute(b,c);this.dataDom.save(this.hname)}}},get:function(b){if(this.isLocalStorage){return window.localStorage.getItem(b)}else{if(this.initDom()){this.dataDom.load(this.hname);return this.dataDom.getAttribute(b)}}},remove:function(b){if(this.isLocalStorage){localStorage.removeItem(b)}else{if(this.initDom()){this.dataDom.load(this.hname);this.dataDom.removeAttribute(b);this.dataDom.save(this.hname)}}}}})(jQuery);