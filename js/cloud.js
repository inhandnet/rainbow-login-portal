/**
 * Created by zhouyunkui on 14-7-2.
 */
    var cloud=new Object();
    cloud.html=$("div#wrapper");
//iframe对象
var iframeEle=$(document).find("#rainbow_forCrossOrigin");
cloud.iframeWindow=iframeEle[0].contentWindow;
cloud.iframeDocument=cloud.iframeWindow.document;
//获取机构id、后台ip和会员认证方式
cloud.getStaticParam=function(){
    var uri=Rainbow.cloud.inPortalApiHost+Rainbow.cloud.getStaticParamUri;
    //uri="js/bug.js";
    var jsonObj={
    };
    var url=formatData(uri,jsonObj,"callback_get_static_param");
    var id="forStaticScript";
    //很挫，需要改进
    setTimeout(function(){
        addScript(url,id);
    },100);
};
//设置获取手机码的间隔
    cloud.number=90;
    cloud.wait=true;
    cloud.oneClickPc=cloud.html.find("#pc_one_click");
    cloud.qqBtnPc=cloud.html.find("#pc_rainbow_qqLoginBtn");
    cloud.sinaBtnPc=cloud.html.find("#pc_rainbow_sinaLoginBtn");
    cloud.wechatBtnPc=cloud.html.find("#pc_rainbow_wechatLoginBtn");

    cloud.oneClickMobile=cloud.html.find("#mobile_one_click");
    cloud.qqBtnMobile=cloud.html.find("#mobile_rainbow_qqLoginBtn");
    cloud.sinaBtnMobile=cloud.html.find("#mobile_rainbow_sinaLoginBtn");
    cloud.wechatBtnMobile=cloud.html.find("#mobile_rainbow_wechatLoginBtn");

    cloud.qrLabel=cloud.html.find("#qr_text");
    cloud.returnBack=cloud.html.find("#return_back");
    cloud.conditionTerm=cloud.html.find("#conditions_terms");
    cloud.agree=cloud.html.find("#agree");
    cloud.rememberMe=cloud.html.find("#remember_me");
    cloud.otherLoginWay=cloud.html.find("#other_login_way");
    cloud.wifiAccess=cloud.html.find("#access_wifi");
    cloud.wifiAccessMethod=cloud.html.find("#access_wifi_method");
    cloud.phoneInput=cloud.html.find("#rainbow_user_phone_number");
    cloud.passwordInput=cloud.html.find("#rainbow_user_password");
    cloud.getSMSBtn=cloud.html.find("#rainbow_get_user_password");
    cloud.remberElement=cloud.html.find("#rainbow-remember-me");
    cloud.agreeElement=cloud.html.find("#rainbow_agree_conditions_terms");
    cloud.loginBtn=cloud.html.find("#rainbow_loginBtn");
    cloud.loginBtnBak=cloud.html.find("#rainbow_loginBtn_bak");
    cloud.regexUserName=new RegExp("^(1)[0-9]{10,10}$");
    cloud.regexRequired=new RegExp("^(\s)*$");
    cloud.errorLine=cloud.html.find("#error_line");
    cloud.phoneError=cloud.errorLine;
    cloud.passwordError=cloud.errorLine;
    cloud.weixin_wrapper=cloud.errorLine;
//cloud.loginError=document.getElementById("login_error");
    cloud.loginErrorTipEle=cloud.errorLine;
//设置页面文字
    cloud.renderCharacter=function(){
//        cloud.oneClickBak.text(Rainbow.locale.get("one_click"));
//        cloud.oneClick.text(Rainbow.locale.get("one_click"));
        cloud.conditionTerm.text(Rainbow.locale.get("conditions_terms"));
        cloud.agree.append(Rainbow.locale.get("agree"));
        cloud.rememberMe.append(Rainbow.locale.get("remember_me"));
        cloud.otherLoginWay.text(Rainbow.locale.get("other_login_way"));
        cloud.wifiAccess.text(Rainbow.locale.get("access_wifi"));
        cloud.phoneInput.attr({
            "placeholder":Rainbow.locale.get("enter_mobile_number")
        });
        cloud.passwordInput.attr({
            "placeholder":Rainbow.locale.get("enter_password")
        });
        cloud.getSMSBtn.text(Rainbow.locale.get("get_code"));
        cloud.loginBtn.text(Rainbow.locale.get("login"));
        cloud.loginBtnBak.text(Rainbow.locale.get("login"));
        cloud.returnBack.attr({
            "href":Rainbow.cloud.url
        });
        cloud.qrLabel.text(Rainbow.locale.get("qr_code"));
        cloud.wifiAccessMethod.text(Rainbow.locale.get("access_wifi_method"));
    };
//手机输入框错误提示
    cloud.checkPhoneInput=function(){
        var value=cloud.phoneInput.val();
        if(value){
            var userNameFlag=cloud.regexUserName.test(value);
            if(!userNameFlag){
                cloud.phoneError.text(Rainbow.locale.get("phone_number_format_error"));
                return false;
            }else{
                cloud.phoneError.text("");
                return true;
            };
        }
    };
//密码输入框错误提示
    cloud.checkPassWordInput=function(){
        var value=cloud.passwordInput.val();
        if(value){
            var passWordFlag=cloud.regexRequired.test();
            if(passWordFlag){
                cloud.passwordError.text(Rainbow.locale.get("password_invalid"));
                return false;
            }else{
                cloud.passwordError.text("");
                return true;
            }
        }
    };
//检测所有输入
    cloud.checkAllInput=function(){
        var flag1=cloud.checkPhoneInput();
        var flag2=cloud.checkPassWordInput();
        if(flag1&&flag2){
            return true;
        }else{
            return false;
        }
    };
//同意服务协议和自动登录
    cloud.agreeElement.attr("checked",true)||cloud.agreeElement.prop("checked",true);
//设置cookie
    cloud.setCookie=function(username,password){
        var date=new Date("1970-1-1 00:00.000");
        document.cookie="username_m="+";expires="+date.toGMTString();
        document.cookie="password_m="+";expires="+date.toGMTString();
        date=new Date();
        date.setDate(date.getDate()+3650);
        document.cookie="username_m="+username+";"+"expires="+date.toGMTString();
        document.cookie="password_m="+password+";"+"expires="+date.toGMTString();
    };
//获取cookie
    cloud.getCookie=function(){
        var cookie=document.cookie;
        var countArr=cookie.split(";");
        var nameCodeObj={};
        for(var i=0;i<countArr.length;i++){
            var tempArr=countArr[i].split("=");
            var index=tempArr[0];
            index=index.trim();
            var value=tempArr[1];
            if(index=="username_m"){
                nameCodeObj.username=value;
            }else if(index=="password_m"){
                nameCodeObj.password=value;
            }else if(index=="checkboxvalue_m"){
                nameCodeObj.checkboxvalue=value;
            }
        };
        return nameCodeObj;
    };
//自动填充，并判断是否自动登录
    cloud.autoLogin=function(){
        var href=location.href;
        var index=href.indexOf("?");
        var paramStr=href.slice(index+1);
        var paramArr=paramStr.split("=");
        var autoLogin=paramArr[1];
        if(!autoLogin){
            var obj=cloud.getCookie();
            if(obj.username&&obj.password){
                if(obj.username){
                    cloud.phoneInput.val(obj.username);
                }
                if(obj.password){
                    cloud.passwordInput.val(obj.password);
                }
                var uri=Rainbow.cloud.platformApiHost+Rainbow.cloud.phoneLoginCodeApiUri;
                var jsonObj={
                    "username":obj.username,
                    "password":Rainbow.cloud.md5(Rainbow.cloud.preStr+Rainbow.cloud.md5(obj.password)),
                    "client_id":Rainbow.cloud.clientId,
                    "client_secret":Rainbow.cloud.clientSecret,
                    "oid":Rainbow.cloud.organId,
                    "grant_type":"authorization_code"
                };
                cloud.username=obj.username;
                var url=formatData(uri,jsonObj,"callback_wifi_user");
                var id="forCodeScript";
                addScript(url,id);
                cloud.loginBtn.attr("disabled","disabled");
            }
        }
    };
//在iframe中添加script标签
    function addScript(url,id){
        var scriptEle=$("<script>");
        scriptEle.attr({
            "id":id,
            "type":"text/javascript",
            "src":url
        });
        var index=url.indexOf("call_back");
        var tempStr=url.slice(index);
        var tempArr=tempStr.split("=");
        var property=tempArr[1];
        var headEle=$(cloud.iframeDocument).find("body#bodyPart");
        headEle.empty().append(scriptEle);
        setTimeout(function(){
            if(window[property].timeout){
                cloud.loginErrorTipEle.text(Rainbow.locale.get("rquest_timeout"));
                //cloud.loginErrorTipEle.text(id);
                //window[property].timeout=false;
            }else{
                window[property].timeout=true;
            }
            if(id!="forStaticScript"){
                if(cloud.oncClickJudge){
                    cloud.currentClickedOneClick.removeAttr("disabled");
                }
                cloud.loginBtn.removeAttr("disabled");
            }
        },10000);
    };
//序列化查询参数
    function formatData(uri,jsonObj,callbackName){
        var urlParams="";
        jsonObj.time_send=(new Date()).getTime();
        for(i in jsonObj)                                                                   {
            urlParams=urlParams+i+"="+encodeURIComponent(jsonObj[i])+"&";
        }
        urlParams=urlParams+"call_back="+callbackName;
        return uri+"?"+urlParams;
    };

//获取机构id、后台ip和会员认证方式的回调函数
    window.callback_get_static_param=function(data){
        arguments.callee.timeout=false;
        if(data.error){
            cloud.loginErrorTipEle.text(Rainbow.locale.get(data.error_code));
        }else{
            Rainbow.cloud.platformApiHost="http://"+data.platform;
            Rainbow.cloud.organId=data.orgId;
            cloud.memberAuthMethod=data.loginMethod;
            var compareTrans={
                authThird:{
                    flag:false,
                    sina:"",
                    qq:"",
                    weixin:""
                },
                sms:"",
                one_click:""
            };
            var methodArr=data.loginMethod.split(",");
            for(var i=0;i<methodArr.length;i++){
                if(methodArr[i]=="weibo"){
                    compareTrans.authThird.flag=true;
                    compareTrans.authThird.sina=true;
                }else  if(methodArr[i]=="qq"){
                    compareTrans.authThird.flag=true;
                    compareTrans.authThird.qq=true;
                }else if(methodArr[i]=="weixin"){
                    compareTrans.authThird.flag=true;
                    compareTrans.authThird.weixin=true;
                }else if(methodArr[i]=="sms"){
                    compareTrans.sms=true;
                }else if(methodArr[i]=="one-click"){
                    compareTrans.one_click=true;
                }
            }
            cloud.oncClickJudge=compareTrans.one_click;
            cloud.modifyMemberLoginMethod(compareTrans);
            if(compareTrans.sms){
                cloud.autoLogin();
            }
        }
    };
window.callback_get_static_param.timeout=true;
//隐藏或显示登录入口
cloud.modifyMemberLoginMethod=function(compareTrans){
    if(!compareTrans.authThird.flag){
        $("div.mobile_specific").addClass("config_display");
        $("div.pc_specific").addClass("config_display");
    }else{
        if(!compareTrans.authThird.sina){
//            cloud.sinaBtn.hide();
            cloud.sinaBtnPc.addClass("config_display");
            cloud.sinaBtnMobile.addClass("config_display");
        }
        if(!compareTrans.authThird.qq){
//            cloud.qqBtn.hide();
            cloud.qqBtnPc.addClass("config_display");
            cloud.qqBtnMobile.addClass("config_display");
        }
        if(!compareTrans.authThird.weixin){
//            cloud.weixin_wrapper.hide();
            cloud.wechatBtnPc.addClass("config_display");
            cloud.wechatBtnMobile.addClass("config_display");
        }
    }
    if(!compareTrans.one_click){
        cloud.oneClickPc.addClass("config_display");
        cloud.oneClickMobile.addClass("config_display");
        $("span.diff_buttons").addClass("config_display");
    }
    if(!compareTrans.sms){
        cloud.getSMSBtn.attr("disabled","disabled");
        cloud.loginBtn.attr("disabled","disabled");
        cloud.phoneInput.attr("disabled","disabled");
        cloud.passwordInput.attr("disabled","disabled");
    }
}
//申请手机smscode的回调函数
    window.callback_sms=function(data){
        arguments.callee.timeout=false;
        cloud.wait=true;
        if(data.error){
            cloud.loginErrorTipEle.text(Rainbow.locale.get(data.error_code));
        }else{
            if(data.result){
                cloud.tempPhone=data.result.phone;
                cloud.passwordInput.val(data.result.smsCode);
            }
        }
    };
window.callback_sms.timeout=true;
//手机账号登录的回调函数
    window.callback_wifi_user=function(data){
        arguments.callee.timeout=false;
        if(data.error){
            //在此设置错误提示
            cloud.loginBtn.removeAttr("disabled");
            cloud.loginErrorTipEle.text(Rainbow.locale.get(data.error_code));
        }else{
            if(data.code){
                var code=data.code;
                var uri=Rainbow.cloud.inPortalApiHost+Rainbow.cloud.phoneLoginTokenApiUri;
                var jsonObj={
                    "client_id":Rainbow.cloud.clientId,
                    "client_secret":Rainbow.cloud.clientSecret,
                    "grant_type":"authorization_code",
                    "username":cloud.username,
                    "code":code
                };
                var url=formatData(uri,jsonObj,"callback_access_token");
                var id="forTokenScript";
                addScript(url,id);
            }
        }
    };
window.callback_wifi_user.timeout=true;
//手机登录后的回调函数
    window.callback_access_token=function(data){
        arguments.callee.timeout=false;
        cloud.loginBtn.removeAttr("disabled");
        if(data.error){
            cloud.loginErrorTipEle.text(Rainbow.locale.get(data.error_code));
        }else{
            cloud.setCookie(cloud.phoneInput.val(),cloud.passwordInput.val());
            window.location.href=Rainbow.cloud.afterLoginSucessPage;
        }
    };
window.callback_access_token.timeout=true;
//一键登录的回调函数
    window.callback_one_key=function(data){
        arguments.callee.timeout=false;
        cloud.currentClickedOneClick.removeAttr("disabled");
        if(data.error){
            cloud.loginErrorTipEle.text(Rainbow.locale.get(data.error_code));
        }else{
            window.location.href=Rainbow.cloud.afterLoginSucessPage;
        }
    };
    window.callback_one_key.timeout=true;
//获取手机码点击事件
cloud.getSMSBtn.bind("click",function(e){
    cloud.loginErrorTipEle.text("");
    e.preventDefault();
    if(cloud.wait&&cloud.checkPhoneInput()){
        cloud.wait=false;
        cloud.getSMSBtn.attr("disabled","disabled");
        function textLoop(){
            if(cloud.number>0){
                cloud.number--;
                cloud.getSMSBtn.text(cloud.number+" "+Rainbow.locale.get("seconds"));
            }
            else{
                clearInterval(cloud.textCycle);
                cloud.number=90;
                cloud.getSMSBtn.removeAttr("disabled");
                cloud.getSMSBtn.text(Rainbow.locale.get("get_code"));
                cloud.wait=true;
            }
        };
        cloud.textCycle=setInterval(textLoop,"1000");
        var uri=Rainbow.cloud.inPortalApiHost+Rainbow.cloud.getSmsCodeApiUri;
        var language=Rainbow.locale.language.substring(0,2);
        var jsonObj={
            "phone":cloud.phoneInput.val(),
            "language":language
        };
        var url=formatData(uri,jsonObj,"callback_sms");
        var id="forSmsScript";
        addScript(url,id);
    }
});
//点击登录按钮事件
cloud.loginBtn.bind("click",function(e){
    e.preventDefault();
    cloud.username=cloud.phoneInput.val();
    cloud.password=cloud.passwordInput.val();
    var test=cloud.checkAllInput();
    if(test){
        cloud.loginBtn.attr("disabled","disabled");
        var uri=Rainbow.cloud.platformApiHost+Rainbow.cloud.phoneLoginCodeApiUri;
        var jsonObj={
            "username":cloud.username,
            "password":Rainbow.cloud.md5(Rainbow.cloud.preStr+Rainbow.cloud.md5(cloud.password)),
            "oid":Rainbow.cloud.organId,
            "client_id":Rainbow.cloud.clientId,
            "client_secret":Rainbow.cloud.clientSecret,
            "grant_type":"authorization_code"
        };
        var url=formatData(uri,jsonObj,"callback_wifi_user");
        var id="forCodeScript";
        addScript(url,id);
    }
});
//一键登录按钮点击事件
function oneClickFactorr(target){
    cloud.currentClickedOneClick=target;
    cloud.currentClickedOneClick.attr("disabled","disabled");
    var uri=Rainbow.cloud.inPortalApiHost+Rainbow.cloud.oneKeyLoginApiUri;
    var jsonObj={
        "client_id":Rainbow.cloud.clientId,
        "client_secret":Rainbow.cloud.clientSecret,
        "as_type":6,
        "code":"86FD8B1A0B2FFCB2A7DF76DF00C5EE22"
    };
    var url=formatData(uri,jsonObj,"callback_one_key");
    var id="oneKeyScript";
    addScript(url,id);
}
cloud.oneClickPc.bind("click",function(e){
    e.preventDefault();
    oneClickFactorr(cloud.oneClickPc)
});
cloud.oneClickMobile.bind("click",function(e){
    e.preventDefault();
    oneClickFactorr(cloud.oneClickMobile);
});
//同意服务协议按钮点击事件
cloud.agreeElement.bind("click",function(e){
    if(!cloud.agreeElement.prop("checked")){
        cloud.loginBtn.attr("disabled","disabled");
        cloud.getSMSBtn.attr("disabled","disabled");
        cloud.oneClickPc.attr("disabled","disabled");
        cloud.oneClickMobile.attr("disabled","disabled");
        cloud.qqBtnPc.attr("disabled","disabled");
        cloud.sinaBtnPc.attr("disabled","disabled");
        cloud.wechatBtnPc.attr("disabled","disabled");
        cloud.qqBtnMobile.attr("disabled","disabled");
        cloud.sinaBtnMobile.attr("disabled","disabled");
        cloud.wechatBtnMobile.attr("disabled","disabled");
        $("span.check").removeClass("color_white").addClass("color_green");
    }else{
        cloud.loginBtn.removeAttr("disabled");
        cloud.getSMSBtn.removeAttr("disabled");
        cloud.oneClickPc.removeAttr("disabled");
        cloud.oneClickMobile.removeAttr("disabled");
        cloud.qqBtnPc.removeAttr("disabled");
        cloud.sinaBtnPc.removeAttr("disabled");
        cloud.wechatBtnPc.removeAttr("disabled");
        cloud.qqBtnMobile.removeAttr("disabled");
        cloud.sinaBtnMobile.removeAttr("disabled");
        cloud.wechatBtnMobile.removeAttr("disabled");
        $("span.check").removeClass("color_green").addClass("color_white");
    }
});
cloud.passwordInput.blur(function(){
    cloud.checkPassWordInput()
});
cloud.phoneInput.blur(function(){
    cloud.checkPhoneInput();
});