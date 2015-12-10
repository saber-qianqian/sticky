/**
 * @description sticky封装
 * @author qianyun
 * @augments {sticky ele classname}
 * @todo 支持上滑隐藏，下滑出现
 *       fixed时, top值定位
 *       支持定位元素
 *
 * @limit
 * 		width: 100%;
 * 		top: 0;
 * 		left: 0;
 *
 * @done sticky 基本功能完成
 *				支持多组sticky控件
 *				设置无限大
 *
 * @param
 * 		'infinity': '无限高，默认为false, 开启可以用来做Ajax吸顶，yeah'
 *		, 'checkEle': '检查sticky元素是否有设置样式'
 *
		sticky.init('.sticky', {
			'infinity' : false
			, 'checkEle' : true
		}
 *
 */
;(function($, window, document){
	var stickyIndex = 0

	function getParentId(){
		var id = '#wrap_ykcits_' + stickyIndex
		stickyIndex += 1
		return id
	}

	var Sticky = function(ele, options){
		this.$ele = $(ele)
		this.$win = $(window)
		this.options = options
		this.endPos = 0
		this.fixTop = 0
		this.startPos = 0
		this.bottomTop = 0
	}

	Sticky.prototype = {
		defaults: {
			'infinity': false
			, 'checkEle': true
			, 'sticky_top': 0
		},

		init: function(){
			var _self = this

			_self.config = $.extend({}, _self.defaults, _self.options)
			_self.fixTop = _self.config.sticky_top

			if(!_self.hasSticky()){
				_self.useFixed()
			} else {
				_self.stickyCssAdd()
			}

			return _self
		},

		hasSticky: function(){
			var element = document.createElement('div')

			if ('position' in element.style){
				element.style['position'] = '-webkit-sticky'
				element.style['position'] = '-moz-sticky'
				element.style['position'] = '-o-sticky'
				element.style['position'] = '-ms-sticky'
				element.style['position'] = 'sticky'
				return element.style['position'].indexOf('sticky') > -1
			} else {
				return false
			}
		},

		stickyCssAdd: function(){
			var _self = this

			_self.eleInit()

			var old_style = _self.$ele.attr('style')

			if(typeof old_style == 'string'){
				old_style += 'position: -webkit-sticky;position: sticky;'
			} else {
				old_style = 'position: -webkit-sticky;position: sticky;'
			}

			old_style += 'top:' + _self.fixTop + 'px;'

			_self.$ele.attr('style', old_style)
		},

		useFixed: function(){
			var _self = this

			_self.parentInit()
			_self.eleInit()

			_self.setPos()

			_self.handleScroll()
			_self.bindEvents()
		},

		eleInit: function(){
			var _self = this

			if(!_self.config.checkEle) return false

			var $ele = _self.$ele
				, top = $ele.css('top')
				, left = $ele.css('left')
				, width = $ele.css('width')
				, ele_style = {
					'z-index' : 100
				}

			ele_style['top'] = top == 'auto' ? 0 : top
			ele_style['left'] = left == 'auto' ? 0 : left
			ele_style['width'] = width

			$ele.css(ele_style)
		},

		parentInit: function(){
			var _self = this
				, $ele = _self.$ele
				, $parent

			// getParentId()之后 stickyIndex 会自动加1
			_self.stickyIndex = stickyIndex

			$ele.wrapAll('<div style="overflow: hidden;position: relative;" id="' + getParentId() + '" class="sticky_ele_copy"></div>')

			$parent = $ele.parents('.sticky_ele_copy')
			$parent.css({'height': $parent.height(), 'width': $parent.width(), 'overflow': 'visible'})

			_self.$parent = $parent
		},

		handleScroll: function(){
			var _self = this
				, winPos = _self.$win.scrollTop()

			if(_self.config.infinity){
				if(winPos > _self.startPos){
					_self.$ele.css({'position': 'fixed', 'top': _self.fixTop})
				} else {
					_self.$ele.css({'position': 'static', 'top': 0})
				}
			} else {
				if(winPos > _self.endPos){
					_self.$ele.css({'position': 'absolute', 'top': _self.bottomTop})
				} else if(winPos < _self.startPos) {
					_self.$ele.css({'position': 'static', 'top': 0})
				} else if(winPos < _self.endPos && winPos > _self.startPos){
					_self.$ele.css({'position': 'fixed', 'top': _self.fixTop})
				}
			}
		},

		handleResize: function(){
			var _self = this

			_self.setPos()
		},

		setPos: function(){
			var _self = this

			_self.startPos = _self.$parent.offset().top - _self.fixTop

			var container = _self.$parent.parent()
				, containerPt = parseInt(container.css('padding-top'), 10) || 0
				, containerPb = parseInt(container.css('padding-bottom'), 10) || 0
				, containerBt = parseInt(container.css('border-top'), 10) || 0
				, containerBb = parseInt(container.css('border-bottom'), 10) || 0
				, eleH = _self.$ele.height()
				, containerH = container.height()
				, containerT = container.offset().top

			_self.endPos = containerH - containerPb - containerBb - eleH + containerT
			_self.bottomTop = _self.endPos - _self.startPos
		},

		bindEvents: function() {
			var _self = this;

			_self.$win.on('scroll.sticky' + _self.stickyIndex, $.proxy(_self.handleScroll, _self));
			_self.$win.on('resize.sticky' + _self.stickyIndex, $.proxy(_self.handleResize, _self));
		},

		destroy: function(){
			var _self = this;

			if(!_self.hasSticky()){
				_self.$win.off('scroll.sticky' + _self.stickyIndex);
				_self.$win.off('resize.sticky' + _self.stickyIndex);
			} else {
				var old_style = _self.$ele.attr('style')

				if(typeof old_style == 'string'){
					old_style = old_style.replace(/position:.*;/g, '')

					_self.$ele.attr('style', old_style)
				}
			}
		}
	}

	$.fn.stick = function(options){
		this.destroy = function(){
			this.each(function(){
				new Sticky(this, options).destroy()
			})
		}

		this.reset = function(){
			this.each(function(){
				new Sticky(this, options).resize()
			})
		}

		return this.each(function(){
			new Sticky(this, options).init()
		})
	}
})(Zepto, window, document)
