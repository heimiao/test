			var code ; //在全局定义验证码 
			//产生验证码
			function createCode(){
				 code = ""; 
				 var codeLength = 5;//验证码的长度
				 var checkCode = document.getElementById("code"); 
				 var random = new Array(0,1,2,3,4,5,6,7,8,9,'A','B','C','D','E','F','G','H','I','J','K','L','M','N','O','P','Q','R',
				 'S','T','U','V','W','X','Y','Z');//随机数
				 for(var i = 0; i < codeLength; i++) {//循环操作
					var index = Math.floor(Math.random()*36);//取得随机数的索引（0~35）
					code += random[index];//根据索引取得随机数加到code上
				}
				checkCode.value = code;//把code值赋给验证码
			}
function f1(){
		//验证用户名
		$("#name").focus(function(){
			$(".nme").html("");
		})
		$("#name").blur(function(){
			var name=$(this).val().trim();
			var pa=/^[a-zA-Z][a-zA-Z0-9]{6,8}$/;
			if(name.length==0){
				$(".nme").html("请输入用户名");
			}else if(!pa.test(name)){
				$(".nme").html("用户名必须以字母开头，而且用户名的长度为6-8");
			}
		})
		//验证手机
		$("#tel").focus(function(){
			$(".telp").html("");
		})
		$("#tel").blur(function(){
			var tel=$(this).val().trim();
			var patten=/^(13[0-9]|15[0-9]|14[7]|17[6|7|8]|18[0|2|3|5|6|7|8|9])\d{8}$/;
			if(tel.length==0){
				$(".telp").html("请输入您的手机号");
				return false;
			}else if(!patten.test(tel)){
				$(".telp").html("请输入正确的手机号");
				return false;
			}
		})
		//验证邮箱
		$("#email").focus(function(){
	    	$(".el").html("");
	    })
		$("#email").blur(function(){
			var email = $(this).val().trim();
			var emailnum = new RegExp(/^[a-zA-Z0-9]{1,}@[a-zA-Z0-9]{1,10}[.](com|cn|net)$/);
		    if(email.length==0){
		    	$(".el").html("请输入邮箱");
		    	return false;
		    }else if(!emailnum.test(email)){
		    	$(".el").html("请输入正确的邮箱格式");
		    	return false;
		    }
	});
	//验证密码
	$("#pawss").focus(function(){
    	$(".paw").html("");
    })
	$("#pawss").blur(function(){
			var pawss = $(this).val().trim();
			var qrpass=$(".qrpawss").val().trim();
			var paw=/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,10}$/;
		    if(pawss.length==0){
		    	$(".paw").html("请输入密码");
		    	return false;
		    }else if(!paw.test(pawss)){
		    	$(".paw").html("密码必须包含数字，大小写字母,不能使用特殊字符且长度在8-10之间");
		    	return false;
		    }
	});
	//再次输入密码
	$(".qrpawss").focus(function(){
    	$(".trpawss").html("");
    })
	$(".qrpawss").blur(function(){
		var pawss = $("#pawss").val().trim();
		var qrpass= $(this).val().trim();
		if(qrpass.length==0){
	    	$(".trpawss").html("请输入确认密码");
	    	return false;
	    }else if(qrpass!=pawss){ 
	     	$(".trpawss").html("两次密码不一致");
	     	return false;
	    }
	});
    //验证验证码
    $(".form-yan").focus(function(){
    	$(".form-zheng").html("");
    })
    $(".form-yan").blur(function(){
    	var code=$(".form-yan").val().trim();
    	if(code.length==0){
    		$(".form-zheng").html("请输入验证码");
    		return false;
    	}
    	var inputCode = document.getElementById("input").value.toUpperCase(); //取得输入的验证码并转化为大写      
		if(inputCode.length <= 0) { //若输入的验证码长度为0
			$(".form-zheng").html("请输入验证码！"); //请输入验证码
			$(".form-zheng").css("color","#f00");
			return false;
		}       
		else if(inputCode != code ) { //若输入的验证码与产生的验证码不一致时
			$(".form-zheng").html("验证码输入错误!"); //验证码输入错误
			createCode();//刷新验证码
			document.getElementById("input").value ="";//清空文本框
			$(".form-zheng").css("color","#f00");
			return false;
		}else { //输入正确时
			$(".form-zheng").html("验证码正确");//验证码正确
			$(".form-zheng").css("color","#0f0");
		}   
    })
			}