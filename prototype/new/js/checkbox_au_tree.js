var rootIcon       = "images/tree_img/root_close.gif"; 	//根目录关起时状态图标
var openRootIcon   = "images/tree_img/root_open.gif"; 	//根目录展开时状态图标
var folderIcon     = "images/tree_img/folder_close.gif";	//子文件夹关起时状态图标
var openFolderIcon = "images/tree_img/folder_open.gif";	//子文件夹展开时状态图标
var fileIcon       = "images/tree_img/tree_linker.gif";	//链接叶子节点图标
var iIcon          = "images/tree_img/i_line.gif";		//普通的连接线（直的）
var lIcon          = "images/tree_img/l_line.gif";		//最后一个节点的连接线
var lMinusIcon     = "images/tree_img/l_point_open.gif";	//最后一个文件夹节点（展开时的）图标
var lPlusIcon      = "images/tree_img/l_point_close.gif";//最后一个文件夹节点（关起时的）图标
var tIcon          = "images/tree_img/t_line.gif";		//中间节点的连接线
var tMinusIcon     = "images/tree_img/t_point_open.gif";	//中间文件夹节点（展开时的）图标
var tPlusIcon      = "images/tree_img/t_point_close.gif";//中间文件夹节点（关起时的）图标
var blankIcon      = "images/tree_img/blank.gif";		//中间空白的图标图标

var defaultText    = "Tree Item";
var defaultAction  = "";	//javascript:void(0);
var targetStr="main";
var bgcolor_sel="#FFCC99";
var selectedObj = null;
var treeBkColor="F3F3F3";

var preID="-1";

var webFXTreeHandler = {
	idCounter : 0,
	idPrefix  : "webfx-tree-object-",
	all       : {},
	behavior  : "classic",
	getId     : function () { return this.idPrefix + this.idCounter++; },
	toggle    : function (oItem) { this.all[oItem.id.replace("-plus","")].toggle(); },
	select    : function (oItem) { this.all[oItem.id.replace("-icon","")].select(); },
	focus     : function (oItem) { this.all[oItem.id.replace("-anchor","")].focus(); },
	blur      : function (oItem) { this.all[oItem.id.replace("-anchor","")].blur(); }
};

function WebFXTree(sText, sAction, sBehavior) {
	this._subItems = [];
	this.id        = webFXTreeHandler.getId();
	this.text      = sText || defaultText;
	this.action    = sAction || defaultAction;
	this._wasLast  = false; // Used to keep track of the last item in each sub tree
	this.open      = (getCookie(this.id.substr(18,this.id.length - 18)) == "0")?false:true;
	this.icon      = rootIcon;
	this.openIcon  = openRootIcon;
	this.target	   = targetStr;
	webFXTreeHandler.behavior =  sBehavior || "classic";
	webFXTreeHandler.all[this.id] = this;
}

WebFXTree.prototype.setBehavior = function (sBehavior) {
	webFXTreeHandler.behavior =  sBehavior;
};
WebFXTree.prototype.getBehavior = function (sBehavior) {
	return webFXTreeHandler.behavior;
};

WebFXTree.prototype.add = function (treeItem) {
	treeItem.parent = this;
	this._subItems[this._subItems.length] = treeItem;
};

WebFXTree.prototype.toString = function () {
	var str = "<div id=\"" + this.id + "\" ondblclick=\"webFXTreeHandler.toggle(this);\" class=\"webfx-tree-item\">";
	str += "<table height=\"10\" border=\"0\" cellpadding=\"0\" cellspacing=\"0\"><tr><td width=\"10\">";
	str += "<img id=\"" + this.id + "-icon\" src=\"" + ((webFXTreeHandler.behavior == 'classic' && this.open)?this.openIcon:this.icon) + "\" >";
	str += "</td><td valign=\"bottom\" nowrap>&nbsp; <onclick=\"treeitem_Click('" + this.id + "');\" onDblClick=\"treeitem_DblClick('" + this.action + "','"+this.text+"');\" id=\"" + this.id + "-anchor\" onfocus=\"webFXTreeHandler.focus(this);\">" + this.text + "</td></tr></table></div>";
	//str += "</td><td valign=\"bottom\" nowrap>&nbsp;<a href=\"rolefunction.jsp\" onclick=\"treeitem_Click('" + this.id + "');\" onDblClick=\"treeitem_DblClick('" + this.action + "','"+this.text+"');\" id=\"" + this.id + "-anchor\" onfocus=\"webFXTreeHandler.focus(this);\">" + this.text + "</a></td></tr></table></div>";
	str += "<div id=\"" + this.id + "-cont\" class=\"webfx-tree-container\" style=\"display: " + ((this.open)?'block':'none') + ";\">";
	for (var i = 0; i < this._subItems.length; i++) {
		str += this._subItems[i].toString(i,this._subItems.length);
	}
	str += "</div>";	
	return str;
};

WebFXTree.prototype.getSelected = function () {
	if (selectedObj) { return selectedObj.id; }
	else { return null; }
}

WebFXTree.prototype.toggle = function () {
	if (this.open) { this.collapse(); }
	else { this.expand(); }
}

WebFXTree.prototype.select = function () {
	document.getElementById(this.id + '-anchor').focus();
}

WebFXTree.prototype.focus = function () {
	if (selectedObj) { selectedObj.blur(); }
	selectedObj = this;
	if ((this.openIcon) && (webFXTreeHandler.behavior != 'classic')) { document.getElementById(this.id + '-icon').src = this.openIcon; }
	//document.getElementById(this.id + '-anchor').style.backgroundColor = 'highlight';
	//document.getElementById(this.id + '-anchor').style.border = '1px dotted threedshadow';
	document.getElementById(this.id + '-anchor').style.color = '#E77B39';
}

WebFXTree.prototype.blur = function () {
	if ((this.openIcon) && (webFXTreeHandler.behavior != 'classic')) { document.getElementById(this.id + '-icon').src = this.icon; }
	//document.getElementById(this.id + '-anchor').style.backgroundColor = bgcolor_sel;
	//document.getElementById(this.id + '-anchor').style.border = '0px';
	document.getElementById(this.id + '-anchor').style.color = '#000000';
}

WebFXTree.prototype.expand = function () {
	if (webFXTreeHandler.behavior == 'classic') {
		document.getElementById(this.id + '-icon').src = this.openIcon;
	}
	document.getElementById(this.id + '-cont').style.display = 'block';
	this.open = true;
	setCookie(this.id.substr(18,this.id.length - 18), '1');
}

WebFXTree.prototype.collapse = function () {
	if (webFXTreeHandler.behavior == 'classic') {
		document.getElementById(this.id + '-icon').src = this.icon;
	}
	document.getElementById(this.id + '-cont').style.display = 'none';
	this.open = false;
	setCookie(this.id.substr(18,this.id.length - 18), '0');
}

WebFXTree.prototype.expandAll = function () {
	this.expandChildren();
	this.expand();
}

WebFXTree.prototype.expandChildren = function () {
	for (var i = 0; i < this._subItems.length; i++) {
		this._subItems[i].expandAll();
	}
}

WebFXTree.prototype.collapseAll = function () {
	this.collapse();
	this.collapseChildren();
}

WebFXTree.prototype.collapseChildren = function () {
	for (var i = 0; i < this._subItems.length; i++) {
		this._subItems[i].collapseAll();
	}
}
 function   change(obj)   
  {   
     var   objs=document.getElementsByName(obj.name);  
      
  //  alert("obj.id="+obj.id);
//	for(var   i=0;   i<objs.length;   i++)   
//    {   
//     if(objs[i].id.substr(0,obj.id.length)==obj.id   &&   objs[i].checked   &&   objs[i]!=obj)
//        return   false;   
//    }
   // alert("总长度=="+objs.length); 

  for(var   i=0;   i<objs.length;   i++)   
  {   
    // alert("checked="+i+" 是否打勾: "+obj.checked+"  size=="+objs[i].id.length+" 遍历取出的值:"+obj.id.substr(0,objs[i].id.length)+"   点选的id值= "+obj.id);
      if(obj.checked   &&   obj.id.substr(0,objs[i].id.length)==objs[i].id)
       {
       //  alert("当前打勾的编码为:"+objs[i].id);
         objs[i].checked=true; 
        }
   }   
  for(var   i=0;   i<objs.length;   i++)   
  {   

     if(objs[i].id.substr(0,obj.id.length)==obj.id)
         objs[i].checked=obj.checked;   
  }  
  
  if(obj.checked)
  {
  	
  }else{
      //个人加入的代码   
       var len=obj.id.length;   //获取点选取消项的id长度
       var stk=obj.id.substr(0,len-2);  //获取点选项除最后两位以外的编码
      // for( var j=0;j<len
        //同目录下是否有被选
      
        for(var i=0;i<objs.length;i++)
        {  //当同级有被选取的则跳出这个过程
           if(objs[i].id.length==len && objs[i].id.substr(0,len-2)==stk && objs[i].checked  && objs[i]!=obj)
           {
             return true; 
           }
        }
        for(var i=0;i<objs.length;i++)
        {  //无同级有被选取的则上级取消选择
           if(objs[i].id==stk )
           {
             objs[i].checked=false;
             change(objs[i]);
           }
        }
       
      
      
  }
    return true; 

  }   
function WebFXTreeItem(sText, sAction,selType,treeID,ifChecked,nodeId) {
	this._subItems  = [];
	this._wasLast   = false;
	this.text       = sText || defaultText;
	this.action     = sAction || defaultAction;
	this.id         = webFXTreeHandler.getId();
	/*alert("id=="+this.id);*/
	this.open       = (getCookie(this.id.substr(18,this.id.length - 18)) == '1')?true:false;
	this.selType	= selType;
	this.treeID		= treeID;
	this.target		= targetStr;
	webFXTreeHandler.all[this.id] = this;
	this.ifChecked  = ifChecked;
	this.nodeId     = nodeId;
};

WebFXTreeItem.prototype.getTreeID = function () {
	return this.treeID;
};

WebFXTreeItem.prototype.add = function (treeItem) {
	treeItem.parent = this;
	this._subItems[this._subItems.length] = treeItem;
};

WebFXTreeItem.prototype.toggle = function () {
	if (this.open) { this.collapse(); }
	else { this.expand(); }
}

WebFXTreeItem.prototype.select = function () {
	document.getElementById(this.id + '-anchor').focus();
}

WebFXTreeItem.prototype.focus = function () {
	if (selectedObj) { selectedObj.blur(); }
	selectedObj = this;
	if ((this.openIcon) && (webFXTreeHandler.behavior != 'classic')) { document.getElementById(this.id + '-icon').src = this.openIcon; }
	//document.getElementById(this.id + '-anchor').style.backgroundColor = 'highlight';
	//document.getElementById(this.id + '-anchor').style.border = '1px dotted threedshadow';
	document.getElementById(this.id + '-anchor').style.color = '#E77B39';
}

WebFXTreeItem.prototype.blur = function () {
	if ((this.openIcon) && (webFXTreeHandler.behavior != 'classic')) { document.getElementById(this.id + '-icon').src = this.icon; }
	//document.getElementById(this.id + '-anchor').style.backgroundColor = bgcolor_sel;
	//document.getElementById(this.id + '-anchor').style.border = '0px';
	document.getElementById(this.id + '-anchor').style.color = 'menutext';
}

WebFXTreeItem.prototype.expand = function () {
	if (this._subItems.length > 0) { 
		document.getElementById(this.id + '-cont').style.display = 'block';
	}
	if (webFXTreeHandler.behavior == 'classic') {
		document.getElementById(this.id + '-icon').src = this.openIcon;
	}
	document.getElementById(this.id + '-plus').src = this.minusIcon;
	this.open = true;
	setCookie(this.id.substr(18,this.id.length - 18), '1');
}

WebFXTreeItem.prototype.collapse = function () {
	if (this._subItems.length > 0) {
		document.getElementById(this.id + '-cont').style.display = 'none';
	}
	if (webFXTreeHandler.behavior == 'classic') {
		document.getElementById(this.id + '-icon').src = this.icon;
	}
	document.getElementById(this.id + '-plus').src = this.plusIcon;
	this.open = false;
	setCookie(this.id.substr(18,this.id.length - 18), '0');
}

WebFXTreeItem.prototype.expandAll = function () {
	this.expandChildren();
	this.expand();
}

WebFXTreeItem.prototype.expandChildren = function () {
	for (var i = 0; i < this._subItems.length; i++) {
		this._subItems[i].expandAll();
	}
}

WebFXTreeItem.prototype.collapseAll = function () {
	this.collapse();
	this.collapseChildren();
}

WebFXTreeItem.prototype.collapseChildren = function () {
	for (var i = 0; i < this._subItems.length; i++) {
		this._subItems[i].collapseAll();
	}
}

WebFXTreeItem.prototype.toString = function (nItem,nItemCount) {
	var foo = this.parent;
	var st=new Array("checkbox","radio");
	var indent = '';
	if (nItem + 1 == nItemCount) { this.parent._wasLast = true; }
	while (foo.parent) {
		foo = foo.parent;
		indent = "<img src=\"" + ((foo._wasLast)?blankIcon:iIcon) + "\">" + indent;
	}
	if (this._subItems.length) { this.folder = 1;}
	
	if (this.folder) {
		if (!this.icon) { this.icon = folderIcon; }
		if (!this.openIcon) { this.openIcon = openFolderIcon; }
		var str = "<div id=\"" + this.id + "\" onclick=\"change(this);\" ondblclick=\"change(this);\" class=\"webfx-tree-item\">";
		str += "<table height=\"10\" border=\"0\" cellpadding=\"0\" cellspacing=\"0\"><tr><td width=\"10\">";
		str += "<tr><td nowrap>"+indent;
		str += "<img id=\"" + this.id + "-plus\" src=\"" + ((this.open)?((this.parent._wasLast)?lMinusIcon:tMinusIcon):((this.parent._wasLast)?lPlusIcon:tPlusIcon)) + "\" onclick=\"webFXTreeHandler.toggle(this);\">"
		str += "<img id=\"" + this.id + "-icon\" src=\"" + ((webFXTreeHandler.behavior == 'classic' && this.open)?this.openIcon:this.icon) + "\" ></td>";
		str += "<td nowrap valign=\"bottom\">&nbsp;";
        
        //****************目录结点*************************
        
		if (this.selType !=null && this.selType !="")
			str +="<input type="+st[parseInt(this.selType)]+" name=\"dept"+ this.nodeId +"\" id=\""+this.action+"\" value=\""+this.treeID+"\" onclick=\"change(this);\" "+ this.ifChecked +">";
		
		////////////////////////////////////////////////////
		str +="<input type=\"hidden\" name=\"hid"+ this.nodeId +"\" value=\""+this.treeID+"\" >";
		
		str += "<onclick=\"treeitem_Click('" + this.id +  "','" + this.text + "','" + this.treeID + "','" + this.nodeId + "');\" onDblClick=\"change(this);\" id=\"" + this.id + "-anchor\" onfocus=\"webFXTreeHandler.focus(this);\" title=\""+this.text+"\">" + this.text;
		/*str += "<a href=\"\" onclick=\"treeitem_Click('" + this.id +  "','" + this.text + "','" + this.treeID + "','" + this.nodeId + "');\" onDblClick=\"change(this);\" id=\"" + this.id + "-anchor\" onfocus=\"webFXTreeHandler.focus(this);\" title=\""+this.text+"\">" + this.text + "</a>";*/
		
		
		
		str +="</td></tr></table></div>";
		str += "<div id=\"" + this.id + "-cont\" class=\"webfx-tree-container\" style=\"display: " + ((this.open)?'block':'none') + ";\">";
		for (var i = 0; i < this._subItems.length; i++) {
			if (this._subItems[i].text !="@@@"){
				str += this._subItems[i].toString(i,this._subItems.length);
			}
		}
		str += "</div>";
		//alert("str====="+str);
	}
	else {
		if (!this.icon) {
			if (webFXTreeHandler.behavior == 'classic') {
				this.icon = fileIcon;
			}
			else {
				this.icon = folderIcon; 
				this.openIcon = openFolderIcon;
			}
		}
		var str = "<div id=\"" + this.id + "\" class=\"webfx-tree-item\">";
		str += "<table height=\"10\" border=\"0\" cellpadding=\"0\" cellspacing=\"0\"><tr><td width=\"10\">";
		str += "<tr><td nowrap>"+indent;
		str += "<img id=\"" + this.id + "-plus\" src=\"" + ((this.parent._wasLast)?lIcon:tIcon) + "\">"
		str += "<img id=\"" + this.id + "-icon\" src=\"" + this.icon + "\" onclick=\"webFXTreeHandler.select(this);\"></td>";
		str += "<td nowrap valign=\"bottom\">&nbsp;";
				
		//****************叶子结点*************************
		
		if (this.selType !=null && this.selType !="")
			str +="<input type="+st[parseInt(this.selType)]+" name=\"dept"+ this.nodeId +"\" id=\""+this.action+"\" value=\""+this.treeID+"\" onclick=\"change(this);\" "+ this.ifChecked +">";
		
		///////////////////////////////////////////////////////
		str +="<input type=\"hidden\" name=\"hid"+ this.nodeId +"\" value=\""+this.treeID+"\" >";
		
		str += "<onclick=\"treeitem_Click('" + this.id +  "','" + this.text + "','" + this.treeID + "','" + this.nodeId + "');\" onDblClick =\"treeitem_DblClick('"+this.action + "','"+this.text+"');\" id=\"" + this.id + "-anchor\" onfocus=\"webFXTreeHandler.focus(this);\" title=\""+this.text+"\">" + this.text;
		/*str += "<a href=\"iwant_do.do\" onclick=\"treeitem_Click('" + this.id +  "','" + this.text + "','" + this.treeID + "','" + this.nodeId + "');\" onDblClick =\"treeitem_DblClick('"+this.action + "','"+this.text+"');\" id=\"" + this.id + "-anchor\" onfocus=\"webFXTreeHandler.focus(this);\" title=\""+this.text+"\">" + this.text + "</a>";*/

		str +="</td></tr></table></div>";
	}
	this.plusIcon = ((this.parent._wasLast)?lPlusIcon:tPlusIcon);
	this.minusIcon = ((this.parent._wasLast)?lMinusIcon:tMinusIcon);
	return str;
}
function setCookie(key, value) {
	document.cookie = key + "=" + escape(value);
}

function getCookie(key) {

	if (document.cookie.length) {
		var cookies = ' ' + document.cookie;
		var start = cookies.indexOf(' ' + key + '=');
		if (start == -1) { return null; }
		var end = cookies.indexOf(";", start);
		if (end == -1) { end = cookies.length; }
		end -= start;
		var cookie = cookies.substr(start,end);
		return unescape(cookie.substr(cookie.indexOf('=') + 1, cookie.length - cookie.indexOf('=') + 1));
	}
	else { return null; }
}

function seltree(){
	/*var srcElement = event.srcElement;//当前选定的对象
	arrayOfStrings = srcElement.value.split(",")
	var iSize = document.form1.iSize.value;
	//得到当前选定的行数 即 checkbox的name
	var iRow =(srcElement.name).substring(4,srcElement.name.length);
	var strMenuId =  arrayOfStrings[0];//选中的checkbox的值

  	if(srcElement.checked){
		for(var i = 1;i<=parseInt(iRow);i++){
	       var element = eval("document.form1.dept"+i);
		   arrayOfStrings2 = element.value.split(",")
	       if(arrayOfStrings2[0].length<strMenuId.length 
	              && arrayOfStrings2[0] == strMenuId.substring(0,arrayOfStrings2[0].length)){
                element.checked = srcElement.checked;
				insertbox(arrayOfStrings2[0],arrayOfStrings2[1]);
	       }
	   }	
	   insertbox(arrayOfStrings[0],arrayOfStrings[1]);
 	}
	else{
	}*/
}
function checkAll(){  

  	if(form.idcheckbox == null)
  		return;
  	var numRow = form.idcheckbox.length;
  	if(numRow == null) {
		form.idcheckbox.checked = form.myCheckAll.checked;	
  	}
  	if(form.myCheckAll.checked) {
		for (var i = 0; i < numRow; i++) {
			form.idcheckbox[i].checked = true;
		}
	} else {
		for (var i = 0; i < numRow; i++) {
			form.idcheckbox[i].checked = false;
		}
	}
  }
function insertbox(value,text)
{

}
function treeitem_Click(id, text, treeID, nodeId){

	/*if(preID!="-1")
		document.all[preID].style.background='#E9F4FF';
	document.all[id].style.background='#0080FF';
	
	preID=id;
	document.all.selText.value = text;
	document.all.selTreeID.value = treeID;
	document.all.selNodeID.value = nodeId;*/
}
function setGray(){
	//document.all[preID].style.background='#999999';
	//preID="-1";
}
function unSetGray(){
	//if(preID!="-1")
		//document.all[preID].style.background='#E9F4FF';
}
