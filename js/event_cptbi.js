var EventUtil = {
	//处理绑定事件 兼容
	window
	location
	
	
	addHandler: function(element, type, handler) {
		if (element.addEventListener) {
			element.addEventListener(type, handler, false);
		} else if (element.attachEvent) {
			element.attachEvent("on" + type, handler);
		} else {
			element["on" + type] = handler;
		}
	},
	//处理事件解绑的兼容
	removeHandler: function(element, type, handler) {
		if (element.removeEventListener) {
			element.removeEventListener(type, handler, false);
		} else if (element.detachEvent) {
			element.detachEvent("on" + type, handler);
		} else {
			element["on" + type] = null;
		}
	},
	//获取对象的兼容方法
	getEvent: function(event) {
		return event ? event : window.event;
	},
	//它返回事件的目标
	getTarget: function(event) {
		return event.target || event.srcElement;
	},
	//取消事件的默认行为
	preventDefault: function(event) {
		if (event.preventDefault) {
			event.preventDefault();
		} else {
			event.returnValue = false;
		}
	},
	//阻止事件冒泡
	stopPropagation: function(event) {
		if (event.stopPropagation) {
			event.stopPropagation();
		} else {
			event.cancelBubble = true;
		}
	},
	//获得相关元素只发生在mouseOver或者mouserOut其他事件都是返回null
	getRelatedTarget: function(event) {
		if (event.relatedTarget) {
			return event.relatedTarget;
		} else if (event.toElement) {
			return event.toElement;
		} else if (event.fromElement) {
			return event.fromElement;
		} else {
			return null;
		}
	},
	//鼠标事件
	getButton: function(event) {
		if (document.implementation.hasFeature("MouseEvents", "2.0")) {
			return event.button;
		} else {
			switch (event.button) {
				case 0:
				case 1:
				case 3:
				case 5:
				case 7:
					return 0;
				case 2:
				case 6:
					return 2;
				case 4:
					return 1;
			}
		}
	},
	//获得鼠标滚轮事件
	getWheelDelta: function(event) {
		if (event.wheelDelta) {
			return (client.engine.opera && client.engine.opera < 9.5 ?
				-event.wheelDelta : event.wheelDelta);
		} else {
			return -event.detail * 40;
		}
	},
	//获取键盘编码ASCII
	getCharCode: function(event) {
		if (typeof event.charCode == "number") {
			return event.charCode;
		} else {
			return event.keyCode;
		}
	},
};