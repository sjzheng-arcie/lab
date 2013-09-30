/* Create a new XMLHttpRequest object to talk to the Web server */
var xmlHttp = false;
/*@cc_on @*/
/*@if (@_jscript_version >= 5)
try {
xmlHttp = new ActiveXObject("Msxml2.XMLHTTP");
} catch (e) {
try {
xmlHttp = new ActiveXObject("Microsoft.XMLHTTP");
} catch (e2) {
xmlHttp = false;
}
}
@end @*/
if (!xmlHttp && typeof XMLHttpRequest != 'undefined') {
xmlHttp = new XMLHttpRequest();
}

/*
添加下拉菜单（path:相对路径 ，actionName:数据来源 ，idName：下拉菜单id ，fieldName：下拉菜单name，findName:数据查找名称， value：下拉菜单value ）
*/
function addSelect(path,actionName,idName,fieldName,findName,value)
{
	document.getElementById(idName).innerHTML = "<select name='"+fieldName+"' style='width:132px'><option>数据更新中…</option></select>";
	xmlHttp.open("POST",path+"/"+actionName+".do?method=findForSelect&id="+findName+"&value="+value,false);
	xmlHttp.onreadystatechange=function(){
		if(xmlHttp.readyState==4 && xmlHttp.status==200)
		{
			document.getElementById(idName).innerHTML = "<select name='"+fieldName+"' style='width:132px'>"+xmlHttp.responseText+"</select>";
		}else if(xmlHttp.readyState==4 && xmlHttp.status!=200){
			document.getElementById(idName).innerHTML = "<select name='"+fieldName+"' style='width:132px'><option style='color:red'>数据错误！</option></select>";
		}
	}
	xmlHttp.send();

}

/*
添加编号（path:相对路径 ，idName：标签id ，fieldName：input框name，findName:数据查找编号名称 ）
*/
function addNo(path,idName,fieldName,findName)
{
	document.getElementById(idName).innerHTML = "<input name='"+fieldName+"' readonly value='数据生成中…' style='color:red'>";
	xmlHttp.open("POST",path+"/sequence.do?method=getNO&id="+findName,false);
	xmlHttp.onreadystatechange=function(){
		if(xmlHttp.readyState==4 && xmlHttp.status==200)
		{
			document.getElementById(idName).innerHTML = "<input name='"+fieldName+"' readonly value='"+xmlHttp.responseText+"' >";
		}else if(xmlHttp.readyState==4 && xmlHttp.status!=200){
			document.getElementById(idName).innerHTML = "<input name='"+fieldName+"' readonly value='数据生成错误！' style='color:red'>";
		}
	}
	xmlHttp.send();

}
