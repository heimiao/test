$(function() {
	//初始化导航用户拉信息下拉效果
	$(".urserhead").on({
    mouseover:function(){$(".urserconte").show();},  
    mouseout:function(){$(".urserconte").hide();} 
  }); 
	curBg();
});
window.onresize = function() {
	curBg()
};
function curBg() {
	//页面加载时执行
	$navBox = $(".nav");
	$.each($navBox, function(i, n) {
		$liCur = $(this).find(".cur");
		if ($liCur.position() != undefined) {
			curP = $liCur.position().left; //相对于左侧父元素的距离
			curW = $(this).find(".cur").innerWidth(); //element + padding 
			$slider = $(this).find(".curBg");
			$slider.animate({
				"left": curP,
				"width": curW
			});
			//当鼠标指针移动到<a>上
			$targetEle = $(this).find("ul li a");
			$targetEle.mouseenter(function() {
				var $_parent = $(this).parent();
				_width = $_parent.innerWidth();
				posL = $_parent.position().left;
				$(this).parent().parent().siblings(".curBg").stop(true, true).animate({
					"left": posL,
					"width": _width
				}, "fast");
			});
			$(this).mouseleave(function() {
				$(this).find(".curBg").stop(true, true).animate({
					"left": $(this).find(".cur").position().left,
					"width": $(this).find(".cur").innerWidth()
				}, "fast");
			});
		}
	});
}