;
(function($, _w) {
	var _box,
		_$window = $(window),
		_$document = $(document),
		_$html = $('html'),
		_elem = document.documentElement,
		_isIE6 = window.VBArray && !window.XMLHttpRequest;
	var dialog = {};
	dialog.fn = dialog.prototype = {
		version: '0.1',
		closed: true,
		dataOpen: '',
		_init: function(config) {
			//初始化的时候把弹框放到body中处理好至于里边的事件等后期更新
			var that = this;
			that.DOM = DOM = that.DOM || that._baseDialog();
			//预留后边会写 
			DOM.wrap.addClass(config.skin);
			//设置弹窗的大小  
			/*DOM.wrap.width(config.sumWidth);
		    DOM.wrap.height(config.sumHeight);*/
			DOM.wrap.width(config.width);
			DOM.wrap.height(config.height);


			DOM.title.html(config.title);
			DOM.cont.html(config.content);
			//判断对话框类型 
			DOM.marsk.show();
			_box = null;
			switch (config.dialogType) {
				case "alert":
					{
						that._alerObj(config);
						break;
					}
				case "confirm":
					{
						that._confirmObj(config);
						break;
					}
				case "open":
					{
						that._openObj(config);

						DOM.wrap.width(DOM.open.width() + 100);
						DOM.wrap.height(DOM.open.height() + 80);
						break;
					}
			}
			that._initsize();
			that._addEven(config);
			return false;
		},
		_alerObj: function(config) {
			var that = this;
			DOM.okbtn.show();
			DOM.sbm.hide();
			DOM.rst.hide();

			DOM.open.hide();
			DOM.body.show(true);
			DOM.foot.show(true);
		},
		_confirmObj: function(config) {
			var that = this;
			DOM.open.hide();
			DOM.body.show(true);
			DOM.foot.show(true);

			DOM.okbtn.hide();

			DOM.sbm.show();
			DOM.rst.show();
		},
		_openObj: function(config) {
			var that = this;
			DOM.ifm[0].setAttribute("src", config.address);
			DOM.open.show();
			DOM.body.hide(true);
			DOM.foot.hide(true);
			dialog.data = DOM.ifm[0];
		},
		_getDOM: function(obj, DOM) {
			var name, i = 0;
			els = obj.getElementsByTagName('*'),
				elsLen = els.length;
			for (; i < elsLen; i++) {
				name = els[i].className.split('mui_')[1];
				if (name) DOM[name] = $(els[i]);
			};
			return DOM;
		},
		_initsize: function() {
			var that = this;
			var that = this;
			that.DOM.marsk.width(Math.max(_$window.width(), _$document.width()));
			that.DOM.marsk.height(Math.max(_$window.height(), _$document.height()));
			that.DOM.wrap[0].style.top = (_$html[0].clientHeight - that.DOM.wrap.height()) / 2 + "px";
			that.DOM.wrap[0].style.left = (_$html[0].clientWidth - that.DOM.wrap.width()) / 2 + "px";
			that.DOM.Icon.height(that.DOM.cont.height() + 1);
		},
		_addEven: function(config) {
			var that = this;
			that.DOM.cancel[0].onclick = function() {
				that._close()
			}
			that.DOM.okbtn[0].onclick = function() {
				that._close()
			}
			that.DOM.sbm[0].onclick = function() {
				config.fn();
				that._close();
			}
			that.DOM.rst[0].onclick = function() {
				config.fn2();
				that._close();
			}
			_$window.resize(function() {
				that._initsize()
			});
			// close=that._close(); 
			//拖拉之前判断是否允许  已经失效
			/*config.drag ? new function() {
				that.DOM.top.css("cursor", "move");
				that.DOM.top.mousedown(that._drag)
				that.DOM.marsk.mousemove(that._drag);
				that.DOM.marsk.mouseup(that._drag);
			} : {}*/
		},
		_close: function() {
			var that = this.DOM == undefined ? dialog.fn : this;
			that.DOM.marsk.hide();
			/* _box ? that.DOM.marsk.remove():_box = that;*/
			_box = that
			return that;
		},
		_drag: function(event) {
			var that = this;
			var ev = that._getEvent(event);
			switch (ev.type) {
				case "mousedown":
					{ //判断弹框的位置 
						dialog._h = ev.clientY - that.DOM.wrap[0].offsetTop;
						dialog._w = ev.clientX - that.DOM.wrap[0].offsetLeft;
						dialog.flag = true;
						break;
					}
				case "mousemove":
					{
						if (dialog.flag) {
							var _n = ev.clientY - dialog._h;
							var _m = ev.clientX - dialog._w;
							var _x = that.DOM.marsk.height() - that.DOM.wrap.height();
							var _y = that.DOM.marsk.width() - that.DOM.wrap.width();
							_n >= _x ? _n = _x : _n = _n;
							_n <= 0 ? _n = 0 : _n = _n;
							_m >= _y ? _m = _y : _m = _m;
							_m <= 0 ? _m = 0 : _m = _m;
							that.DOM.wrap[0].style.left = parseInt(_m) + "px";
							that.DOM.wrap[0].style.top = parseInt(_n) + "px";
						}
						break;
					}
				case "mouseup":
					{
						dialog.flag = false;
						dialog._w = 0;
						dialog._h = 0;
						break;
					}
			}
		},
		_getEvent: function(event) {
			return event ? event : window.event;
		},
		_getTarget: function(event) {
			return event.target || event.srcElement;
		},
		_preventDefault: function(event) {
			if (event.preventDefault) {
				event.preventDefault();
			} else {
				event.returnValue = false;
			}
		},
		_baseDialog: function() {
			var that = this,
				DOM = {};
			var shadeObj = document.createElement("div");
			mscrollHeight = Math.max(_$window.height(), _$html.height());
			mscrollWidth = Math.max(_$window.width(), _$html.width());
			shadeObj.id = "shadediv";
			shadeObj.name = "shadediv";
			//			shadeObj.setAttribute("class","mui_shadediv");
			with(shadeObj.style) {
				position = "absolute";
				width = mscrollWidth + "px";
				height = mscrollHeight + "px";
				top = 0;
				left = 0;
				background = "black";
				filter = "alpha(opacity=80)";
				opacity = "0.8";
				zIndex = '100000',
					display = 'none'
			};
			var wrap = document.createElement('div');
			body = document.body;
			wrap.style.cssText = 'position:absolute;';
			wrap.innerHTML = dialog._templates;
			shadeObj.appendChild(wrap);
			body.insertBefore(shadeObj, body.firstChild);
			DOM.marsk = $(shadeObj);
			DOM.wrap = $(wrap);
			that._getDOM(wrap, DOM);
			return DOM;
		},
		_alertBtTp: function() {
			var obj = document.createElement("div");
			obj.innerHTML = '<div class="mui_okbtn">确定</div>';
			return obj;
		},
		_confirmBtTp: function() {
			var obj = document.createElement("div");
			var mui_sbm = document.createElement("div");
			var mui_reset = document.createElement("div");
			mui_sbm.setAttribute("class", "mui_sbm");
			mui_reset.setAttribute("class", "mui_rst");
			obj.appendChild(mui_sbm);
			obj.appendChild(mui_reset);
			return obj;
		}
	};
	
	dialog.list = [];
	dialog.fn._init.prototype = dialog.fn;
	dialog.defaults = {
		// 消息内容
		content: '<div class="aui_loading"><span>loading..</span></div>',
		title: '\u6d88\u606f', // 标题. 默认'消息'
		button: null, // 自定义按钮
		ok: null, // 确定按钮回调函数
		cancel: null, // 取消按钮回调函数
		init: null, // 对话框初始化后执行的函数
		close: null, // 对话框关闭前执行的函数
		okVal: '\u786E\u5B9A', // 确定按钮文本. 默认'确定'
		cancelVal: '\u53D6\u6D88', // 取消按钮文本. 默认'取消'
		width: 'auto', // 内容宽度
		height: 'auto', // 内容高度
		sumWidth: '350px',
		sumHeight: '300px',
		minWidth: 96, // 最小宽度限制
		minHeight: 32, // 最小高度限制
		padding: '20px 25px', // 内容与边界填充距离
		skin: '', // 皮肤名(预留接口,尚未实现)
		icon: null, // 消息图标名称
		time: null, // 自动关闭时间
		esc: true, // 是否支持Esc键关闭
		focus: true, // 是否支持对话框按钮自动聚焦
		show: true, // 初始化后是否显示对话框
		follow: null, // 跟随某元素(即让对话框在元素附近弹出)
		address: null,
		//		path: _path, // artDialog路径
		lock: false, // 是否锁屏
		background: '#000', // 遮罩颜色
		opacity: .7, // 遮罩透明度
		duration: 300, // 遮罩透明度渐变动画速度
		fixed: false, // 是否静止定位
		left: '50%', // X轴坐标
		top: '38.2%', // Y轴坐标
		zIndex: 1987, // 对话框叠加高度值(重要：此值不能超过浏览器最大限制)
		resize: true, // 是否允许用户调节尺寸
		drag: false, // 是否允许用户拖动位置 
		dialogType: 'alert'
	};
	dialog._templates =
		'<div  class="mui_dailog">' + '<div  class="mui_top">' + '<div class="mui_title"></div>' + '<div class="mui_cancel"></div> ' + '</div>' + '<div class="mui_body">' + '<div class="mui_Icon"> </div>' + '<div class="mui_cont"> </div>' + '</div>' + '<div class="mui_foot">' + '<div class="mui_btn"><div class="mui_sbm">确定</div ><div class="mui_rst">取消</div><div class="mui_okbtn">确定</div></div>' + '</div>' + '<div class="mui_open"><iframe class="mui_ifm"  frameborder="0" id="mui_ifm" src=""></iframe></div></div>';
	dialog._combineProgram = function(config) {
		if (typeof config === 'string') {
			config = {
				content: config
			};
		} else {
			config = config || {};
		}
		defaults = dialog.defaults;
		// 合并默认配置 
		for (var i in defaults) {
			if (config[i] === undefined) config[i] = defaults[i];
		};
		return config;
	} 
	dialog.confirm = function() {
		var config = arguments[0];
		var configs = dialog._combineProgram(config);
		configs.dialogType = "confirm";
		configs.fn = arguments[1];
		configs.fn2 = arguments[2];
		return _box ? _box._init(configs) : new dialog.fn._init(configs);
	}
	dialog.open = function(config) {
		var configs = dialog._combineProgram(config);
		configs.dialogType = "open";
		configs.address = configs.content;
		return _box ? _box._init(configs) : new dialog.fn._init(configs);
	}
	dialog.alert = function(config) {
		var configs = dialog._combineProgram(config);
		return _box ?
			_box._init(configs) : new dialog.fn._init(configs);
	}
	dialog.close = function() {
		$("#shadediv").hide();
	}
	_w.dialog = dialog;
}($, window));