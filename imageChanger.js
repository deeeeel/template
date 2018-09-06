var imageChanger = function(target,interval){
		this.$wrap = $(target);
		this.interval = interval;
		this.init();
};

imageChanger.prototype = {
  init : function(){
    this.setPrams();
		this.setDefult();
		this.judge();
		this.bind();
  },
  setPrams : function(){
	  this.$window = $(window);
    this.$img =  this.$wrap.children('.jsc-image');
		this.num = this.$img.length;
		this.wrapHeight = this.$wrap.height();
    this.timerIds = [];
		this.index = 0;
		this.flg;
  },
	setDefult : function(){
		this.$img.hide();
		this.$img.eq(0).show();
	},
  setTimer : function(){
		var _self = this;
		this.timerIds.push(setInterval($.proxy(this.changeImage,this),this.interval));
	},
  clearTimer : function(){
		while (this.timerIds.length > 0) {
			clearInterval(this.timerIds.pop());
		}
	},
	bind : function(){
		this.$window.on('scroll',$.proxy(this.judge,this));
	},
	judge : function(){
		var wt = this.$window.scrollTop(),
				wh = this.$window.outerHeight(),
				wb = wt + wh,
				contentTop = this.$wrap.offset().top,
				contentBottom = contentTop + this.wrapHeight;

		if(wt < contentTop && wb > contentTop || wb > contentBottom && wt < contentBottom){
			if(!this.flg) return;
			this.setTimer();
			this.flg = false;
		}else{
			if(this.flg) return;
			this.setDefult();
			this.clearTimer();
			this.flg = true;
		}
	},
  changeImage : function(){
    this.$img.eq(this.index).hide();
    this.$img.eq(this.index + 1).show();
		if(this.index == this.num - 1){
			this.$img.eq(this.index).hide();
			this.$img.eq(0).show();
			this.index = 0;
		}else{
			this.$img.eq(this.index).hide();
			this.$img.eq(this.index + 1).show();
			this.index ++;
		}
  }
}

$(function(){
	new imageChanger('.jsc-image-wrap',500);
});
