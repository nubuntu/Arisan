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
		_$buttonleft:null,
		_$buttonright:null,
		page:null,
		_fb:{appid:'426883230735517',
			secret:'db2b253d145e37c786650582ab49e8c8',
			redirect:'http://www.facebook.com/connect/login_success.html',
			scope:'publish_stream,user_photos,email,user_online_presence,offline_access',
			token:null
		},
		_profile:{},
		getObj:function(data){
			$.support.cors = true;
			$.mobile.allowCrossDomainPages = true;
			var self = this;
			$.each(data,function(key,value){
				self['_' + key]=value;
			});
			this._createHeader();
			this._$buttonleft = $('<a data-role="button" class="ui-btn-left" data-icon="arrow-l" data-iconpos="left">Prev</a>').appendTo(this._$header);			
			this._createTitle(this._title);
			this._$buttonright = $('<a data-role="button" class="ui-btn-right" data-icon="arrow-r" data-iconpos="left">Next</a>').appendTo(this._$header);			
			this._createContent();
			this._createFooter();
			return this;
		},
		_createHeader:function(){
			this._$header = $('<div />')
			.attr('data-role','header')
			.attr('data-position','fixed')
			.appendTo(this._$main);			
		},
		_createTitle:function(title){
			this._$title = $('<h1>' + title + '</h1>').appendTo(this._$header);
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
		backbutton:function(event){
		    this.page();
		},
		_getSession:function(){
			param={
				cmd:'getsession'
			};
			var res = this._api(param);
			return res;
		},
		_clear:function(){
			//this._$header.html("");
			this._$content.html("");
			this._$footer.html("");
			
		},
		_loginForm:function(){
			this._$buttonleft.hide();
			this._$buttonright.hide();
			this._$title.html('Login');
			this._clear();
			var self = this;
			var $fbbutton=$('<img src="images/fbconnect.png" align="center"/>')
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
						self._$window.close();
						//self._fbForm(res);
						self.loadPage(this._loginForm,this._fbForm,res)
					}						
				});			
			});
			this._$content.html($fbbutton);
		},
		loadPage:function(prev,next){
			this.page = prev;
			next(arguments[2]);
		},
		_fbForm:function(res){
			this._$buttonleft.show();
			this._clear();
			var self = this;
			res = self._urlVars(res.url);
			self._fb.token = res.access_token;
			var param = {cmd:'fbme',token:res.access_token}
			var me = self._api(param);
			this._$buttonleft.click(function(){
				self._loginForm();
			});
			this._$title.html('Facebook');
			var $pic = $('<img src="' + me.img +'" align="center"/>')
				.appendTo(this._$content);
		},
		_api:function(param){
			var self = this;
			var res;
			param.uuid = this._device.uuid;
			$.ajax({
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