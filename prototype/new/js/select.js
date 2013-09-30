/**
 * 员工下拉框
 * @param no 员工NO emp_sno
 * @param tagName 标签ID
 * @param path 工程路径
 */
function getEmpSelect(no,tagName,path,compno,depno,jobno,classno,teamno){
	var flag = false; 
	var dataPath = "form.emp_sno="+no; 
	if(compno!=undefined&&compno!=null&&compno!=""){
		dataPath+="&form.comp_sno="+compno;
	}
	if(depno!=undefined&&depno!=null&&depno!=""){
		dataPath+="&form.dep_sno="+depno;
	}
	if(jobno!=undefined&&jobno!=null&&jobno!=""){
		dataPath+="&form.job_sno="+jobno;
	}
	if(classno!=undefined&&classno!=null&&classno!=""){
		dataPath+="&form.class_sno="+classno;
	}
	if(teamno!=undefined&&teamno!=null&&teamno!=""){
		dataPath+="&form.team_sno="+teamno;
	} 
	$.ajax({
		async:false,//同步
		type:"post",//post方式提交
		url:path+"/tree!selectEmp",//提交地址
		data:dataPath,
		dataType:"html",
		success:function(data){
				$('#'+tagName).empty();
				$('#'+tagName).append("<option value=''>--请选择--</option>");
      			$('#'+tagName).append(data);
      			flag = true;
		},
		error:function(){
			$('#'+tagName).empty();
			$('#'+tagName).append("<option style='color:red'>数据错误！</option>") ;
			flag =  false;
		}
	}); 
	return flag;
}

/**
 * 单位下拉框
 * @param no 单位NO  
 * @param tagName 标签ID
 * @param path 工程路径
 */
function getCompSelect(no,tagName,path,compno){
	var flag = false; 
	var dataPath = "form.comp_sno="+no;
	if(compno!=undefined&&compno!=null&&compno!=""){
		dataPath+="&form.comp_ssuper="+compno;
	} 
	$.ajax({
		async:false,//同步
		type:"post",//post方式提交
		url:path+"/tree!selectComp",//提交地址
		data:dataPath,
		dataType:"html",
		success:function(data){
			$('#'+tagName).empty();
			$('#'+tagName).append("<option value=''>--请选择--</option>");
      			$('#'+tagName).append(data);
      			flag = true;
		},
		error:function(){
			$('#'+tagName).empty();
			$('#'+tagName).append("<option style='color:red'>数据错误！</option>") ;
			flag =  false;
		}
	}); 
	return flag;
}

/**
 * 部门下拉框
 * @param no 部门NO  
 * @param tagName 标签ID
 * @param path 工程路径
 */
function getDepSelect(no,tagName,path,compno ){
	var flag = false; 
	var dataPath = "form.dep_sno="+no;
	if(compno!=undefined&&compno!=null&&compno!=""){
		dataPath+="&form.comp_sno="+compno;
	}
	 
	$.ajax({
		async:false,//同步
		type:"post",//post方式提交
		url:path+"/tree!selectDep",//提交地址
		data:dataPath,
		dataType:"html",
		success:function(data){
			$('#'+tagName).empty();
			$('#'+tagName).append("<option value=''>--请选择--</option>");
      			$('#'+tagName).append(data);
      			flag = true;
		},
		error:function(){
			$('#'+tagName).empty();
			$('#'+tagName).append("<option style='color:red'>数据错误！</option>") ;
			flag =  false;
		}
	}); 
	return flag;
}

/**
 * 岗位下拉框
 * @param no 岗位NO  
 * @param tagName 标签ID
 * @param path 工程路径
 */
function getJobSelect(no,tagName,path,depno){
	var flag = false; 
	var dataPath = "form.job_sno="+no;
	 
	if(depno!=undefined&&depno!=null&&depno!=""){
		dataPath+="&form.dep_sno="+depno;
	}
	 
	$.ajax({
		async:false,//同步
		type:"post",//post方式提交
		url:path+"/tree!selectJob",//提交地址
		data:dataPath,
		dataType:"html",
		success:function(data){
			$('#'+tagName).empty();
			$('#'+tagName).append("<option value=''>--请选择--</option>");
      			$('#'+tagName).append(data);
      			flag = true;
		},
		error:function(){
			$('#'+tagName).empty();
			$('#'+tagName).append("<option style='color:red'>数据错误！</option>") ;
			flag =  false;
		}
	}); 
	return flag;
}

/**
 * 班组下拉框
 * @param no 班组NO 
 * @param tagName 标签ID
 * @param path 工程路径
 */
function getClassSelect(no,tagName,path,depno){
	var flag = false; 
	var dataPath = "form.class_sno="+no; 
	if(depno!=undefined&&depno!=null&&depno!=""){
		dataPath+="&form.dep_sno="+depno;
	} 
	$.ajax({
		async:false,//同步
		type:"post",//post方式提交
		url:path+"/tree!selectClass",//提交地址
		data:dataPath,
		dataType:"html",
		success:function(data){
			$('#'+tagName).empty();
			$('#'+tagName).append("<option value=''>--请选择--</option>");
      			$('#'+tagName).append(data);
      			flag = true;
		},
		error:function(){
			$('#'+tagName).empty();
			$('#'+tagName).append("<option style='color:red'>数据错误！</option>") ;
			flag =  false;
		}
	}); 
	return flag;
}

/**
 * 团队下拉框
 * @param no 团队NO 
 * @param tagName 标签ID
 * @param path 工程路径
 */
function getTeamSelect(no,tagName,path,classno){
	var flag = false; 
	var dataPath = "form.team_sno="+no; 
	if(classno!=undefined&&classno!=null&&classno!=""){
		dataPath+="&form.class_sno="+classno;
	} 
	$.ajax({
		async:false,//同步
		type:"post",//post方式提交
		url:path+"/tree!selectTeam",//提交地址
		data:dataPath,
		dataType:"html",
		success:function(data){
			$('#'+tagName).empty();
			$('#'+tagName).append("<option value=''>--请选择--</option>");
      			$('#'+tagName).append(data);
      			flag = true;
		},
		error:function(){
			$('#'+tagName).empty();
			$('#'+tagName).append("<option style='color:red'>数据错误！</option>") ;
			flag =  false;
		}
	}); 
	return flag;
}
/**
 * 数据字典下拉框
 * @param value 字典项值
 * @param tagName 标签ID
 * @param name 字典名
 * @param compno 所属单位
 * @param dictType 字典类型 0.系统字典 1.用户字典
 * @param path 工程路径
 */
function getDictSelect(value,tagName,name,compno,dictType,path){
	var flag = false; 
	var dataPath = "form.ditem_svalue="+value;
	dataPath+="&form.dict_sname="+name;
	dataPath+="&form.dict_ntype="+dictType;
	if(compno!=undefined&&compno!=null&&compno!=""){
		dataPath+="&form.comp_sno="+compno;
	}

	$.ajax({
		async:false,//同步
		type:"post",//post方式提交
		url:path+"/tree!selectDict",//提交地址
		data:dataPath,
		dataType:"html",
		success:function(data){	
			$('#'+tagName).empty();
			$('#'+tagName).append("<option value=''>--请选择--</option>");
      			$('#'+tagName).append(data);
      			flag = true;
		},
		error:function(){
			$('#'+tagName).empty();
			$('#'+tagName).append("<option style='color:red'>数据错误！</option>") ;
			flag =  false;
		}
	}); 
	return flag;
}

/**
 * 客户类别下拉框
 * @param no 客户类别NO 
 * @param tagName 标签ID
 * @param path 工程路径
 */
function getCtypeSelect(no,tagName,path){
	var flag = false; 
	var dataPath = "form.ctype_sno="+no; 
	$.ajax({
		async:false,//同步
		type:"post",//post方式提交
		url:path+"/tree!selectCtype",//提交地址
		data:dataPath,
		dataType:"html",
		success:function(data){
			$('#'+tagName).empty();
			$('#'+tagName).append("<option value=''>--请选择--</option>");
      			$('#'+tagName).append(data);
      			flag = true;
		},
		error:function(){
			$('#'+tagName).empty();
			$('#'+tagName).append("<option style='color:red'>数据错误！</option>") ;
			flag =  false;
		}
	}); 
	return flag;
}
/**
 * 合作企业类别下拉框
 * @param no 合作企业NO 
 * @param tagName 标签ID
 * @param path 工程路径
 */
function getCooptSelect(no,tagName,path ){
	var flag = false; 
	var dataPath = "form.coopt_sno="+no;  
	$.ajax({
		async:false,//同步
		type:"post",//post方式提交
		url:path+"/tree!selectCoopt",//提交地址
		data:dataPath,
		dataType:"html",
		success:function(data){
			$('#'+tagName).empty();
			$('#'+tagName).append("<option value=''>--请选择--</option>");
      			$('#'+tagName).append(data);
      			flag = true;
		},
		error:function(){
			$('#'+tagName).empty();
			$('#'+tagName).append("<option style='color:red'>数据错误！</option>") ;
			flag =  false;
		}
	}); 
	return flag;
}
/**
 * 放大镜
 * @param text1 第一个返回值
 * @param text2 第二个返回值
 * @param path  放大镜地址
 * @param Height 高度
 * @param Width 宽度
 */
function tree1(text1,text2,path,Height,Width)
{
	if(Height==undefined)
	{
		Height = '300px';
	}
	if(Width==undefined)
	{
		Width = '760px';
	}
	if(path==undefined){
		path="";
	} 
	var returnValue = window.showModalDialog(path,window,'dialogHeight:'+Height+';dialogWidth:'+Width+';center:yes;help:no;resizable:yes;status:no;scroll:no;location:no;');
	if(returnValue!="default"&&returnValue!=undefined&&returnValue!=null)
	{
		document.all[text1].value = returnValue.split("|")[0];
		document.all[text2].value = returnValue.split("|")[1];
	}else
	{
		document.all[text1].value = "";
		document.all[text2].value = "";
	}
}

/**
 * 放大镜
 * @param text1 第一个返回值
 * @param text2 第二个返回值
 * @param path  放大镜地址
 * @param Height 高度
 * @param Width 宽度
 */
function tree(text1,text2,path,Height,Width)
{
	var obj = [document.getElementById(text1),document.getElementById(text2)];
	if(Height==undefined)
	{
		Height = '350px';
	}
	if(Width==undefined)
	{
		Width = '860px';
	}
	if(path==undefined){
		path="";
	} 
	
	var returnValue = window.showModalDialog(path,obj,'dialogHeight:'+Height+';dialogWidth:'+Width+';center:yes;help:no;resizable:no;status:no;scroll:no;location:no;');
//	if(returnValue!="default"&&returnValue!=undefined&&returnValue!=null)
//	{
//		document.all[text1].value = returnValue.split("|")[0];
//		document.all[text2].value = returnValue.split("|")[1];
//	}else
//	{
//		document.all[text1].value = "";
//		document.all[text2].value = "";
//	}
}
