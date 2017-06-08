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

/*-------------------------------------
ツールチップ
-------------------------------------*/
TEMPLATE.COMMON.TOOLTIP = {
	ANIMATION_SPEED : 300,
	init : function(){
		this.setParameters();
		//HTMLの構造によって制限がある場合
		this.bindEvents();
		//HTMLの構造によって制限がない場合
		// this.toggleContent();
	},
	setParameters : function(){
		this.$wrapper = $('.jsc-tooltip-wrap');
		this.$trigger = $('.jsc-tooltip-trigger');
		this.$hideContetnt = $('.jsc-tooltip-content');
	},
	bindEvents : function(){
		var _self = this;
		this.$trigger.on('mouseover',function(){
			_self.showContent($(this));
		});
		this.$trigger.on('mouseout',function(){
			_self.hideContent($(this));
		});
	},
	toggleContent : function(){
		var _self = this;
		this.$wrapper.each(function(){
			var $wrapper = $(this);
			$wrapper.find('.jsc-tooltip-trigger').on('mouseover',function(){
				var hideContent = $wrapper.find('.jsc-tooltip-content');
				hideContent.fadeIn(_self .ANIMATION_SPEED);
			});
			$wrapper.find('.jsc-tooltip-trigger').on('mouseout',function(){
				var hideContent = $wrapper.find('.jsc-tooltip-content');
				hideContent.fadeOut(_self .ANIMATION_SPEED);
			});
		});
	},
	showContent : function($trigger){
		$trigger.parent('.jsc-tooltip-trigger-wrap').next('.jsc-tooltip-content').fadeIn(this.ANIMATION_SPEED);
	},
	hideContent : function($trigger){
		$trigger.parent('.jsc-tooltip-trigger-wrap').next('.jsc-tooltip-content').fadeOut(this.ANIMATION_SPEED);
	}
};

$(function(){
	TEMPLATE.COMMON.TOOLTIP.init();
});
