var TEMPLATE = TEMPLATE || {};
TEMPLATE.COMMON = {};

/*-------------------------------------
3点リーダー
-------------------------------------*/

TEMPLATE.COMMON.ELLIPSIS = function(target,num){
		this.$target = $(target);
		this.cutFigure = num;
		this.init();
};

TEMPLATE.COMMON.ELLIPSIS.prototype = {
	init : function(){
		this.shortenText();
	},
	shortenText : function(){
		var myself = this;
		var afterText = '...';
		this.$target.each(function(){
			var textLength = $(this).text().length;
			var textTrim = $(this).text().substr(0,(myself.cutFigure));
			if(myself.cutFigure < textLength){
				$(this).html(textTrim + afterText).css({visible:'visible'});
			}else if(myself.cutFigure >= textLength){
				$(this).css({visible:'visible'});
			}
		});
	}
}

$(function(){
	new TEMPLATE.COMMON.ELLIPSIS('.jsc-ellipsis-target-1',5);
	new TEMPLATE.COMMON.ELLIPSIS('.jsc-ellipsis-target-2',10);
});

/*-------------------------------------
アコーディオン
-------------------------------------*/
TEMPLATE.COMMON.ACCORDION_CONTROLLER = {
	init : function(){
		if(!this.setParameters()) return;
		this.instantiateModel();
	},
	setParameters : function(){
		this.$wrappers = $('.jsc-accordion-multi-wrap');
		if(this.$wrappers.size() === 0) return false;
		this.wrappersArray = [];
		return true;
	},
	instantiateModel : function(){
		for(var i = 0, length = this.$wrappers.length; i < length; i++)
			this.wrappersArray.push(new TEMPLATE.COMMON.ACCORDION_MULTIPLE_CONSTRUCTOR(this.$wrappers.eq(i)));
	}
};

TEMPLATE.COMMON.ACCORDION_MULTIPLE_CONSTRUCTOR = function($wrapper){
	this.$wrapper = $wrapper;
	this.init();
};

TEMPLATE.COMMON.ACCORDION_MULTIPLE_CONSTRUCTOR.prototype = {
	init : function(){
		this.setParameters();

		//show、hideの挙動の場合
		// this.toggleContent();

		//slideの挙動の場合
		this.bindEvents();
	},
	setParameters : function(){
		this.$trigger = this.$wrapper.find('.jsc-accordion-multi-trigger');
		this.$hideContent = this.$wrapper.find('.jsc-accordion-multi-content');
	},
	toggleContent : function(){
		var _self = this;
		this.$trigger.on('click',function(e){
			e.preventDefault();
			_self.$hideContent.toggle();
		});
	},
	bindEvents : function(){
		var _self = this;
		this.$trigger.on('click',function(e){
			e.preventDefault();
			if(_self.$hideContent.is(':animated')) return;

			if(_self.$hideContent.is(':visible')){
				_self.hideContent(_self.$hideContent);
			}else{
				_self.showContent(_self.$hideContent);
			}
		});
	},
	hideContent : function($hideContent){
		$hideContent.slideUp(300);
	},
	showContent : function($hideContent){
		$hideContent.slideDown(300);
	}
};

$(function(){
	TEMPLATE.COMMON.ACCORDION_CONTROLLER.init();
});
