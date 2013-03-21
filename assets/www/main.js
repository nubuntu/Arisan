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
		_$window:null,
		_fb:{appid:'426883230735517',
			secret:'db2b253d145e37c786650582ab49e8c8',
			redirect:'http://www.facebook.com/connect/login_success.html',
			scope:'publish_stream,user_photos,email,user_online_presence,offline_access',
			token:null
		},
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
			var session = this._getSession();
			if(session.stat===false){
				this._loginForm();
			}
		},
		_getSession:function(){
			param={
				cmd:'getsession'
			};
			var res = this._api(param);
			return res;
		},
		_loginForm:function(){
			this._$title.html("Login");
			var self = this;
			var $fbbutton=$('<img src="images/fbconnect.png"/>')
			.click(function(){
				var authorize_url  = "https://graph.facebook.com/oauth/authorize?";
				authorize_url += "client_id="+self._fb.appid;
				authorize_url += "&redirect_uri="+self._fb.redirect;
				authorize_url += "&display=popup";
				authorize_url += "&response_type=token";
				authorize_url += "&scope="+self._fb.scope;
				self._$window = window.open(authorize_url,'_blank', 'location=no');
				self._$window.addEventListener('loadstop',function(res){
					if (/access_token/.test(res.url)) {
						res = self._urlVars(res.url);
						self._fb.token = res.access_token;
						var me = self._fbapi("/me?access_token=" + res.access_token);
						console.log(me);
						self._$content.html(me);
						self._$window.close();
					}						
				});			
			})
			.appendTo(this._$content);
		},
		_fbapi:function(cmd){
			var self = this;
			var res;
			var furl = 'https://graph.facebook.com';
			furl = furl + cmd; 
			console.log(furl);
			$.ajax({
				  url:furl,
				  async: false
				}).done(function( respon ) {
					res = respon;
				}
			);			
			return res;
		},
		_api:function(param){
			var self = this;
			var res;
			param.uuid = this._device.uuid;
			$.ajax({
				  type: "POST",
				  url:self._url,
				  dataType:'json',
				  async: false,
				  data:param
				}).done(function( respon ) {
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
		_urlVars:function(url){
			url = url.replace("#","?");
			url = url.split('?')[1];			
			return $.parseJSON('{"' + decodeURI(url.replace(/&/g, "\",\"").replace(/=/g,"\":\"")) + '"}');
		}
};