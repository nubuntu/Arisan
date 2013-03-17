var Arisan={
		_title:'Arisan nnnn',
		_url:'http://arisan.noercholis.com',
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
				console.log(self['_' + key]);
			});
			self._$header = self._$main.children("#header");
			self._$content = self._$main.children("#content");
			self._$footer = self._$main.children("#footer");
			self._$title = self._$header.children('h1');
			self._$title.html(self._title);
			console.log(self._title);
			return self;
		},
		setTitle:function(title){
			
		},
		getTitle:function(){
			return this._title;
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