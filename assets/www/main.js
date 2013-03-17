(function($) {
	$.widget("mobile.arisan", $.mobile.widget, {  
		options: {
			title:'Arisan',
			url:'http://arisan.noercholis.com'
		},
		_$title:null,
		_$header:null,
		_$content:null,
		_$footer:null,
		_$button:{},
		_create:function() {  
			this._createHeader();
			this._creatTitle();
			this._createContent();
			this._createFooter();
			alert('created');
		},
		destroy:function() {             
		},  		
		_setOption:function(option, value) {  
		    $.Widget.prototype._setOption.apply( this, arguments );  
		  
		},
		_createHeader:function(){
            this._$header = $('<div />')
            .attr('data-role','content')
            .attr('data-position','fixed')
            .appendTo(this.element);		
		},
		_creatTitle:function(){
			this._$title = $('<h1>' + this.options.title + '</h1>').appendTo(this._$header);
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
		_createContent:function(){
            this._$content = $('<div />')
            .attr('data-role','content')
            .appendTo(this.element);		
		},
		_createFooter:function(){
            this._$footer = $('<div />')
            .attr('data-role','footer')
            .attr('data-position','fixed')
            .appendTo(this.element);		
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
	}); 
})(jQuery);