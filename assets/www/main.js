var Arisan={
		_title:'Arisan',
		_url:'http://202.148.28.10/arisan/main.php',
		_device:null,
		_$main:null,
		_$title:null,
		_$header:null,
		_$content:null,
		_$footer:null,
		_$button:{},
		getObj:function(data){
			var self = this;
			$.each(data,function(key,value){
				self['_' + key]=value;
			});
			this._createHeader();
			this._createTitle();
			this._createContent();
			this._createFooter();
			this._$title.html(this._title);
			return this;
		},
		_createHeader:function(){
			this._$header = $('<div />')
			.attr('data-role','header')
			.attr('data-position','fixed')
			.appendTo(this._$main);			
		},
		_createTitle:function(){
			this._$title = $('<h1 />').appendTo(this._$header);
		},
		_createContent:function(){
			this._$content = $('<div />')
			.attr('data-role','content')
			.appendTo(this._$main);			
		},
		_createFooter:function(){
			this._$footer = $('<div />')
			.attr('data-role','footer')
			.attr('data-position','fixed')
			.appendTo(this._$main);
		},
		setTitle:function(title){
			
		},
		getTitle:function(){
			return this._title;
		},
		setDevice:function(d){
			this._device = d;
			this._isSession();
		},
		_isSession:function(){
			param={
				cmd:'ceksession',
				uuid:md5(this._device.uuid)
			};
			var res = this._api(param);
			alert(res.msg);
		},
		_api:function(param){
			var self = this;
			var res = {};
			$.ajax({
				  type: "POST",
				  url:self._url,
				  dataType:'json',
				  data:param
				}).done(function( respon ) {
					console.log(respon.msg);
					res = respon;
				}
			);			
			return res;
		},
		_createButton:function(param){
			if(this._$button[param.name]){
				this._$button[param.name].show();
			}
			this._$button[param.name] = $('<a />')
			.attr('data-icon',param.icon)
			.addClass("ui-btn-left")
			.attr('data-role',"button")
			.attr('data-inline','true')
			.html(param.caption)
			.appendTo(this._$header);			
		},
		_getObjUrl:function(url){
			url = url.replace("#","?");
			console.log(url);
			url = url.split('?')[1];
			console.log(url);			
			return $.parseJSON('{"' + decodeURI(url.replace(/&/g, "\",\"").replace(/=/g,"\":\"")) + '"}');
		},
		getVars:function(url){
			url = url.replace("#","?");
			var vars = [], hash;
			var hashes = window.location.href.slice(window.location.href.indexOf('?') + 1).split('&');
			for(var i = 0; i < hashes.length; i++){
				hash = hashes[i].split('=');
			    vars.push(hash[0]);
			    vars[hash[0]] = hash[1];
			}
			return vars;
		}		
};