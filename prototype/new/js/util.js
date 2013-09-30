//处理键盘事件 禁止后退键（Backspace）密码或单行、多行文本框除外
function forbidBackSpace(e) {
    var ev = e || window.event; //获取event对象
    var obj = ev.target || ev.srcElement; //获取事件源
    var t = obj.type || obj.getAttribute('type'); //获取事件源类型
    //获取作为判断条件的事件类型
    var vReadOnly = obj.readOnly;
    var vDisabled = obj.disabled;
    //处理undefined值情况
    vReadOnly = (vReadOnly == undefined) ? false : vReadOnly;
    vDisabled = (vDisabled == undefined) ? true : vDisabled;
    //当敲Backspace键时，事件源类型为密码或单行、多行文本的，
    //并且readOnly属性为true或disabled属性为true的，则退格键失效
    var flag1 = ev.keyCode == 8 && (t == "password" || t == "text" || t == "textarea") && (vReadOnly == true || vDisabled == true);
    //当敲Backspace键时，事件源类型非密码或单行、多行文本的，则退格键失效
    var flag2 = ev.keyCode == 8 && t != "password" && t != "text" && t != "textarea";
    //判断
    if (flag2 || flag1) return false;
        }
//禁止后退键 作用于Firefox、Opera
document.onkeypress = forbidBackSpace;
//禁止后退键  作用于IE、Chrome
document.onkeydown = forbidBackSpace;

var  highlightcolor='#d5f4fe';
//此处clickcolor只能用win系统颜色代码才能成功,如果用#xxxxxx的代码就不行,还没搞清楚为什么:(
var  clickcolor='#51b2f6';
function  changeto(){
source=event.srcElement;
if  (source.tagName=="TR"||source.tagName=="TABLE")
return;
while(source.tagName!="TD")
source=source.parentElement;
source=source.parentElement;
cs  =  source.children;
//alert(cs.length);
if  (cs[1].style.backgroundColor!=highlightcolor&&source.id!="nc"&&cs[1].style.backgroundColor!=clickcolor)
for(i=0;i<cs.length;i++){
	cs[i].style.backgroundColor=highlightcolor;
}
}

function  changeback(){
if  (event.fromElement.contains(event.toElement)||source.contains(event.toElement)||source.id=="nc")
return
if  (event.toElement!=source&&cs[1].style.backgroundColor!=clickcolor)
//source.style.backgroundColor=originalcolor
for(i=0;i<cs.length;i++){
	cs[i].style.backgroundColor="";
}
}


function fixImage(img, width, height) {
   var isIE = navigator.userAgent.toLowerCase().indexOf("msie") >= 0;
   if (!isIE)
      return;

   var currentSrc = img.src;

   var imgStyle = "progid:DXImageTransform.Microsoft.AlphaImageLoader(src='" + currentSrc + "', sizingMethod='scale')";
   img.src = 'images/clearpixel.gif';
   img.style.width  = width + "px";
   img.style.height = height + "px";
   img.style.filter =  imgStyle;
}

var navigationPages = [ "home.page",  "demos.page", "docs.page",  "downloads.page" ];
var navigationLinks = [ "homeLink",  "demosLink", "resourcesLink", "downloadsLink" ];

function showMenuContext() {
   var currentLocation = document.location.href;
   for ( var i = 0 ; i < navigationPages.length ; i++ )
      if ( currentLocation.indexOf(navigationPages[i]) != -1 ) { setLinkStyle($(navigationLinks[i])); break; }
}

function setLinkStyle(link) {
   link.style.fontWeight = 'bold';
   var currentFontSize = parseInt(RicoUtil.getElementsComputedStyle(link, "fontSize", "font-size" ));
   link.style.fontSize = (currentFontSize+2) + "px";
   link.style.color    = 'white';
}
/* add by zmj 2008-09-10*/


//my common function
function strToDate(str)
{
  var arys= new Array();
  arys=str.split('-');
  var newDate=new Date(arys[0],arys[1],arys[2]); 
  return newDate;
} 

function isNum(num){
	var i,j,strTemp;
	strTemp="0123456789";
	if (num.length == 0){
		return false;
	}
	for (i=0;i<num.length;i++){
		j=strTemp.indexOf(num.charAt(i));
		if (j==-1){
			return false;	
		}
	}
	return true;
}


function isCertNum(num){
	var i,j,strTemp;
	strTemp="0123456789x";
	if (num.length == 0){
		return false;
	}
	for (i=0;i<num.length;i++){
		j=strTemp.indexOf(num.charAt(i));
		if (j==-1){
			return false;	
		}
	}
	return true;
}

function isTelNum(num){
	var i,j,strTemp;
	strTemp="0123456789-";
	if (num.length == 0){
		return false;
	}
	for (i=0;i<num.length;i++){
		j=strTemp.indexOf(num.charAt(i));
		if (j==-1){
			return false;	
		}
	}
	return true;
}

function isNum2(num){
	var i,j,strTemp;
	strTemp="0123456789.";
	if (num.length == 0){
		return false;
	}
	for (i=0;i<num.length;i++){
		j=strTemp.indexOf(num.charAt(i));
		if (j==-1){
			return false;	
		}
	}
	return true;
}
//remove the trim
function trim(str){
	return str.replace(/(^\s*)|(\s*$)/g, "");
} 
function getDateDiff(begin,end){
	var beginDate = strToDate(begin);
	var endDate =  strToDate(end);
	var bMill = Date.parse(beginDate);
	var eMill = Date.parse(endDate);
	var diffMill = eMill - bMill;
	return (diffMill / (3600 * 1000 * 24 ));
}

function strToDate(str)
{
	var arys= new Array();
	arys=str.split('-');
	var newDate=new Date(arys[0],arys[1],arys[2]); 
	return newDate;
} 


/**
 * 十进制（&#00000）转汉字
 * @param str10 十进制字符串
 * @returns  解码的字符串
 */
function toString16(str10){//十进制（&#00000）转汉字
 	var reg = /&#([^;]*);/gi;
 	 
 	str10 = str10.replace(reg,"%u$1;");//&#替换为\u
 	var s = str10.split(";");
 	str10 = "";
 	for(var i=0;i<s.length;i++){
 		var ss = s[i].split("%u");
 		
 		if(ss.length>1){
 		s[i] = "";
 			for(var j=0;j<ss.length;j++){ 
 			
 				if(j==ss.length-1){
 					ss[j] = isNaN(parseInt(ss[j]))?ss[j]:parseInt(ss[j]).toString(16);
 				}
 				s[i]+=ss[j];
 				if(j<ss.length-1){
 					s[i]+="%u";
 				}
 			}
 		}
 		str10+=s[i];
 		  
 	}
 	str10 = unescape(str10);
 	return str10;
 	
 }

//禁止用F5键      
document.onkeydown= function()      
{      
          if    (    event.keyCode==116)      
           {      
                   event.keyCode    =    0;      
                   event.cancelBubble    =   true;      
                  return   false;      
           }      
};      
       

//屏蔽鼠标右键、Ctrl+N、Shift+F10、F11、F5刷新、退格键   
//document.oncontextmenu = function(){event.returnValue=false;};//屏蔽鼠标右键   
 window.onhelp = function(){return false;}; //屏蔽F1帮助   
document.onkeydown = function ()   {   
	if ((window.event.altKey)&&   
			((window.event.keyCode==37)|| //屏蔽 Alt+ 方向键 ←   
				(window.event.keyCode==39))) //屏蔽 Alt+ 方向键 →   
	{   
		//alert("不准你使用ALT+方向键前进或后退网页！");   
		event.returnValue=false;   
	}   
	if (
//			(event.keyCode==8) || //屏蔽退格删除键   
			(event.keyCode==116)|| //屏蔽 F5 刷新键   
			(event.ctrlKey && event.keyCode==82)){ //Ctrl + R   
		event.keyCode=0;   
		event.returnValue=false;   
	}   
if (event.keyCode==122){event.keyCode=0;event.returnValue=false;} //屏蔽F11   
if (event.ctrlKey && event.keyCode==78) event.returnValue=false; //屏蔽 Ctrl+n   
if (event.shiftKey && event.keyCode==121)event.returnValue=false; //屏蔽 shift+F10   
if (window.event.srcElement.tagName == "A" && window.event.shiftKey)   
window.event.returnValue = false; //屏蔽 shift 加鼠标左键新开一网页   
if ((window.event.altKey)&&(window.event.keyCode==115)) //屏蔽Alt+F4   
{   
window.showModelessDialog("about:blank","","dialogWidth:1px;dialogheight:1px");   
return false;   
}   
}; 
