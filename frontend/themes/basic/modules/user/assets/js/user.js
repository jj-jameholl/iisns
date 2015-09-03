/*!
 * Copyright 2012, Chris Wanstrath
 * Released under the MIT License
 * https://github.com/defunkt/jquery-pjax
 */
(function(h){function l(H,I,J){var K=this;return this.on("click.pjax",H,function(M){var L=h.extend({},u(I,J));if(!L.container){L.container=h(this).attr("data-pjax")||K}m(M,L)})}function m(M,I,J){J=u(I,J);var L=M.currentTarget;if(L.tagName.toUpperCase()!=="A"){throw"$.fn.pjax or $.pjax.click requires an anchor element"}if(M.which>1||M.metaKey||M.ctrlKey||M.shiftKey||M.altKey){return}if(location.protocol!==L.protocol||location.hostname!==L.hostname){return}if(L.href.indexOf("#")>-1&&z(L)==z(location)){return}if(M.isDefaultPrevented()){return}var N={url:L.href,container:h(L).attr("data-pjax"),target:L};var K=h.extend({},N,J);var H=h.Event("pjax:click");h(L).trigger(H,[K]);if(!H.isDefaultPrevented()){C(K);M.preventDefault();h(L).trigger("pjax:clicked",[K])}}function s(K,H,I){I=u(H,I);var J=K.currentTarget;if(J.tagName.toUpperCase()!=="FORM"){throw"$.pjax.submit requires a form element"}var L={type:J.method.toUpperCase(),url:J.action,container:h(J).attr("data-pjax"),target:J};if(L.type!=="GET"&&window.FormData!==undefined){L.data=new FormData(J);L.processData=false;L.contentType=false}else{if(h(J).find(":file").length){return}L.data=h(J).serializeArray()}C(h.extend({},L,I));K.preventDefault()}function C(H){H=h.extend(true,{},h.ajaxSettings,C.defaults,H);if(h.isFunction(H.url)){H.url=H.url()}var M=H.target;var L=r(H.url).hash;var I=H.context=t(H.container);if(!H.data){H.data={}}if(h.isArray(H.data)){H.data.push({name:"_pjax",value:I.selector})}else{H.data._pjax=I.selector}function K(Q,O,P){if(!P){P={}}P.relatedTarget=M;var R=h.Event(Q,P);I.trigger(R,O);return !R.isDefaultPrevented()}var J;H.beforeSend=function(Q,P){if(P.type!=="GET"){P.timeout=0}Q.setRequestHeader("X-PJAX","true");Q.setRequestHeader("X-PJAX-Container",I.selector);if(!K("pjax:beforeSend",[Q,P])){return false}if(P.timeout>0){J=setTimeout(function(){if(K("pjax:timeout",[Q,H])){Q.abort("timeout")}},P.timeout);P.timeout=0}var O=r(P.url);if(L){O.hash=L}H.requestUrl=q(O)};H.complete=function(O,P){if(J){clearTimeout(J)}K("pjax:complete",[O,P,H]);K("pjax:end",[O,H])};H.error=function(R,S,P){var O=y("",R,H);var Q=K("pjax:error",[R,S,P,H]);if(H.type=="GET"&&S!=="abort"&&Q){A(O.url)}};H.success=function(S,R,Z){var V=C.state;var Y=(typeof h.pjax.defaults.version==="function")?h.pjax.defaults.version():h.pjax.defaults.version;var aa=Z.getResponseHeader("X-PJAX-Version");var Q=y(S,Z,H);var P=r(Q.url);if(L){P.hash=L;Q.url=P.href}if(Y&&aa&&Y!==aa){A(Q.url);return}if(!Q.contents){A(Q.url);return}C.state={id:H.id||n(),url:Q.url,title:Q.title,container:I.selector,fragment:H.fragment,timeout:H.timeout};if(H.push||H.replace){window.history.replaceState(C.state,Q.title,Q.url)}try{document.activeElement.blur()}catch(X){}if(Q.title){document.title=Q.title}K("pjax:beforeReplace",[Q.contents,H],{state:C.state,previousState:V});I.html(Q.contents);var U=I.find("input[autofocus], textarea[autofocus]").last()[0];if(U&&document.activeElement!==U){U.focus()}a(Q.scripts);var T=H.scrollTo;if(L){var O=decodeURIComponent(L.slice(1));var W=document.getElementById(O)||document.getElementsByName(O)[0];if(W){T=h(W).offset().top}}if(typeof T=="number"){h(window).scrollTop(T)}K("pjax:success",[S,R,Z,H])};if(!C.state){C.state={id:n(),url:window.location.href,title:document.title,container:I.selector,fragment:H.fragment,timeout:H.timeout};window.history.replaceState(C.state,document.title)}F(C.xhr);C.options=H;var N=C.xhr=h.ajax(H);if(N.readyState>0){if(H.push&&!H.replace){k(C.state.id,D(I));window.history.pushState(null,"",H.requestUrl)}K("pjax:start",[N,H]);K("pjax:send",[N,H])}return C.xhr}function x(H,I){var J={url:window.location.href,push:false,replace:true,scrollTo:false};return C(h.extend(J,u(H,I)))}function A(H){window.history.replaceState(null,"",C.state.url);window.location.replace(H)}var j=true;var G=window.location.href;var E=window.history.state;if(E&&E.container){C.state=E}if("state" in window.history){j=false}function c(J){if(!j){F(C.xhr)}var O=C.state;var I=J.state;var P;if(I&&I.container){if(j&&G==I.url){return}if(O){if(O.id===I.id){return}P=O.id<I.id?"forward":"back"}var H=f[I.id]||[];var K=h(H[0]||I.container),M=H[1];if(K.length){if(O){v(P,O.id,D(K))}var N=h.Event("pjax:popstate",{state:I,direction:P});K.trigger(N);var Q={id:I.id,url:I.url,container:K,push:false,fragment:I.fragment,timeout:I.timeout,scrollTo:false};if(M){K.trigger("pjax:start",[null,Q]);C.state=I;if(I.title){document.title=I.title}var L=h.Event("pjax:beforeReplace",{state:I,previousState:O});K.trigger(L,[M,Q]);K.html(M);K.trigger("pjax:end",[null,Q])}else{C(Q)}K[0].offsetHeight}else{A(location.href)}}j=false}function e(I){var H=h.isFunction(I.url)?I.url():I.url,M=I.type?I.type.toUpperCase():"GET";var K=h("<form>",{method:M==="GET"?"GET":"POST",action:H,style:"display:none"});if(M!=="GET"&&M!=="POST"){K.append(h("<input>",{type:"hidden",name:"_method",value:M.toLowerCase()}))}var L=I.data;if(typeof L==="string"){h.each(L.split("&"),function(N,O){var P=O.split("=");K.append(h("<input>",{type:"hidden",name:P[0],value:P[1]}))})}else{if(h.isArray(L)){h.each(L,function(N,O){K.append(h("<input>",{type:"hidden",name:O.name,value:O.value}))})}else{if(typeof L==="object"){var J;for(J in L){K.append(h("<input>",{type:"hidden",name:J,value:L[J]}))}}}}h(document.body).append(K);K.submit()}function F(H){if(H&&H.readyState<4){H.onreadystatechange=h.noop;H.abort()}}function n(){return(new Date).getTime()}function D(I){var H=I.clone();H.find("script").each(function(){if(!this.src){jQuery._data(this,"globalEval",false)}});return[I.selector,H.contents()]}function q(H){H.search=H.search.replace(/([?&])(_pjax|_)=[^&]*/g,"");return H.href.replace(/\?($|#)/,"$1")}function r(I){var H=document.createElement("a");H.href=I;return H}function z(H){return H.href.replace(/#.*/,"")}function u(H,I){if(H&&I){I.container=H}else{if(h.isPlainObject(H)){I=H}else{I={container:H}}}if(I.container){I.container=t(I.container)}return I}function t(H){H=h(H);if(!H.length){throw"no pjax container for "+H.selector}else{if(H.selector!==""&&H.context===document){return H}else{if(H.attr("id")){return h("#"+H.attr("id"))}else{throw"cant get selector for pjax container!"}}}}function o(I,H){return I.filter(H).add(I.find(H))}function w(H){return h.parseHTML(H,document,true)}function y(L,N,P){var K={},H=/<html/i.test(L);var I=N.getResponseHeader("X-PJAX-URL");K.url=I?q(r(I)):P.requestUrl;if(H){var M=h(w(L.match(/<head[^>]*>([\s\S.]*)<\/head>/i)[0]));var J=h(w(L.match(/<body[^>]*>([\s\S.]*)<\/body>/i)[0]))}else{var M=J=h(w(L))}if(J.length===0){return K}K.title=o(M,"title").last().text();if(P.fragment){if(P.fragment==="body"){var O=J}else{var O=o(J,P.fragment).first()}if(O.length){K.contents=P.fragment==="body"?O:O.contents();if(!K.title){K.title=O.attr("title")||O.data("title")}}}else{if(!H){K.contents=J}}if(K.contents){K.contents=K.contents.not(function(){return h(this).is("title")});K.contents.find("title").remove();K.scripts=o(K.contents,"script[src]").remove();K.contents=K.contents.not(K.scripts)}if(K.title){K.title=h.trim(K.title)}return K}function a(H){if(!H){return}var I=h("script[src]");H.each(function(){var L=this.src;var M=I.filter(function(){return this.src===L});if(M.length){return}var J=document.createElement("script");var K=h(this).attr("type");if(K){J.type=K}J.src=h(this).attr("src");document.head.appendChild(J)})}var f={};var g=[];var i=[];function k(I,H){f[I]=H;i.push(I);b(g,0);b(i,C.defaults.maxCacheLength)}function v(J,L,I){var K,H;f[L]=I;if(J==="forward"){K=i;H=g}else{K=g;H=i}K.push(L);if(L=H.pop()){delete f[L]}b(K,C.defaults.maxCacheLength)}function b(H,I){while(H.length>I){delete f[H.shift()]}}function B(){return h("meta").filter(function(){var H=h(this).attr("http-equiv");return H&&H.toUpperCase()==="X-PJAX-VERSION"}).attr("content")}function p(){h.fn.pjax=l;h.pjax=C;h.pjax.enable=h.noop;h.pjax.disable=d;h.pjax.click=m;h.pjax.submit=s;h.pjax.reload=x;h.pjax.defaults={timeout:650,push:true,replace:false,type:"GET",dataType:"html",scrollTo:0,maxCacheLength:20,version:B};h(window).on("popstate.pjax",c)}function d(){h.fn.pjax=function(){return this};h.pjax=e;h.pjax.enable=p;h.pjax.disable=h.noop;h.pjax.click=h.noop;h.pjax.submit=h.noop;h.pjax.reload=function(){window.location.reload()};h(window).off("popstate.pjax",c)}if(h.inArray("state",h.event.props)<0){h.event.props.push("state")}h.support.pjax=window.history&&window.history.pushState&&window.history.replaceState&&!navigator.userAgent.match(/((iPod|iPhone|iPad).+\bOS\s+[1-4]\D|WebApps\/.+CFNetwork)/);h.support.pjax?p():d()})(jQuery);

/*!
 * Copyright 2015, Shiyang
 * Released under the MIT License
 * https://www.iisns.com
 */
$(function() {
	'use strict';

	//顶部导航宽度
	var topNavWidth = parseInt($('#main-container').css('width')) + parseInt($('aside.skin-1').css('width'));
	$('#top-nav').css('width', topNavWidth + 'px');

	//scroll to top of the page
	$("#scroll-to-top").click(function() {
    	$("html, body").animate({ scrollTop: 0 }, 600);
		 return false;
	});
	
	//scrollable sidebar
	$('.scrollable-sidebar').slimScroll({
		height: '100%',
		size: '0px'
	});
	
	//Sidebar menu dropdown
	$('aside li').hover(
       function(){ $(this).addClass('open') },
       function(){ $(this).removeClass('open') }
	)
	
	//Collapsible Sidebar Menu
	$('.openable > a').click(function()	{	
		if(!$('#wrapper').hasClass('sidebar-mini'))	{
			if( $(this).parent().children('.submenu').is(':hidden') ) {
				$(this).parent().siblings().removeClass('open').children('.submenu').slideUp();
				$(this).parent().addClass('open').children('.submenu').slideDown();
			}
			else	{
				$(this).parent().removeClass('open').children('.submenu').slideUp();
			}
		}
		
		return false;
	});
		
	//Toggle Menu
	$('#sidebarToggle').click(function()	{
		$('#wrapper').toggleClass('sidebar-display');
		$('.main-menu').find('.openable').removeClass('open');
		$('.main-menu').find('.submenu').removeAttr('style');
	});

	$('#sizeToggle').click(function()	{
	
		$('#wrapper').off("resize");
	
		$('#wrapper').toggleClass('sidebar-mini');
		$('.main-menu').find('.openable').removeClass('open');
		$('.main-menu').find('.submenu').removeAttr('style');
		$.cookie('sizeToggle', $('#wrapper').attr('class'), {expires:365,path:'/'});
	});

	if(jQuery.type($.cookie('sizeToggle')) != 'undefined')	{
		$('#wrapper').removeClass('sizeToggle');
		$('#wrapper').addClass($.cookie('sizeToggle'));
	}

	if(!$('#wrapper').hasClass('sidebar-mini'))	{ 
		if (Modernizr.mq('(min-width: 768px)') && Modernizr.mq('(max-width: 868px)')) {
			$('#wrapper').addClass('sidebar-mini');
		}
		else if (Modernizr.mq('(min-width: 869px)'))	{
			if(!$('#wrapper').hasClass('sidebar-mini'))	{
			}
		}
	}

	//show/hide menu
	$('#menuToggle').click(function()	{
		$('#wrapper').toggleClass('sidebar-hide');
		$('.main-menu').find('.openable').removeClass('open');
		$('.main-menu').find('.submenu').removeAttr('style');
	});
	
	$(window).resize(function() {
		if (Modernizr.mq('(min-width: 768px)') && Modernizr.mq('(max-width: 868px)')) {
			$('#wrapper').addClass('sidebar-mini').addClass('window-resize');
			$('.main-menu').find('.openable').removeClass('open');
			$('.main-menu').find('.submenu').removeAttr('style');
		}
		else if (Modernizr.mq('(min-width: 869px)'))	{
			if($('#wrapper').hasClass('window-resize'))	{
				$('#wrapper').removeClass('sidebar-mini window-resize');
				$('.main-menu').find('.openable').removeClass('open');
				$('.main-menu').find('.submenu').removeAttr('style');
			}
		}
		else	{
			$('#wrapper').removeClass('sidebar-mini window-resize');
			$('.main-menu').find('.openable').removeClass('open');
			$('.main-menu').find('.submenu').removeAttr('style');
		}
	});
	
	//fixed Sidebar
	$('#fixedSidebar').click(function()	{
		if($(this).prop('checked'))	{
			$('aside').addClass('fixed');
		}	
		else	{
			$('aside').removeClass('fixed');
		}
	});
	
	//Inbox sidebar (inbox.html)
	$('#inboxMenuToggle').click(function()	{
		$('#inboxMenu').toggleClass('menu-display');
	});
	
	//Collapse panel
	$('.collapse-toggle').click(function()	{
	
		$(this).parent().toggleClass('active');
	
		var parentElm = $(this).parent().parent().parent().parent();
		
		var targetElm = parentElm.find('.panel-body');
		
		targetElm.toggleClass('collapse');
	});
	
	
	//Hover effect on touch device
	$('.image-wrapper').bind('touchstart', function(e) {
		$('.image-wrapper').removeClass('active');
		$(this).addClass('active');
    });
	
	//Dropdown menu with hover
	$('.hover-dropdown').hover(
       function(){ $(this).addClass('open') },
       function(){ $(this).removeClass('open') }
	)

	//选择系统头像
	$('#set-avatar').click(function() {
	    $.ajax({
	        url: $(this).attr('href'),
	        type:'post',
	        error: function(){alert('error');},
	        success:function(html){
	            $('#avatar-container').html(html);
	            $('#avatarModal').modal('show');
	        }
	    });
	});

    //头像提示用户信息
	$('[rel=author]').popover({
	    trigger : 'manual',
        container: 'body',
	    html : true,
        placement: 'auto right',
	    content : '<div class="popover-user"></div>',
	}).on('mouseenter', function(){
	    var _this = this;
	    $(this).popover('show');
	    $.ajax({
	        url: $(this).attr('href'),
	        success: function(html){
	            $('.popover-user').html(html);
                $('.popover .btn-success, .popover .btn-danger').click(function(){
                    $.ajax({
                        url: $(this).attr('href'),
                        success: function(data) {
                            $('.popover .btn-success').text('关注成功').addClass('disabled');
                            $('.popover .btn-danger').text('取消成功').addClass('disabled');
                        },
                        error: function (XMLHttpRequest, textStatus) {
                            $(_this).popover('hide');
                            $('#modal').modal({ remote: '/site/login'});
                        }
                    });
                    return false;
                });
	        }
	    });
	    $('.popover').on('mouseleave', function () {
	        $(_this).popover('hide');
	    });
	}).on('mouseleave', function () {
	    var _this = this;
	    setTimeout(function () {
	        if(!$('.popover:hover').length) {
	            $(_this).popover('hide')
	        }
	    }, 100);
	});
});

(function() {
	//删除
	$('body').on('mouseenter', '[data-clicklog=delete]', function(event) {
		$('[data-clicklog=delete]').popover({
		    trigger : 'click',
	        container: 'body',
	        placement: 'top',
	        title: this.title,
		    content : '<div class="delete"><a class="btn-ok" href="javascript:void(0)"><i class="glyphicon glyphicon-ok"></i> 确定</a>&nbsp;&nbsp;&nbsp;&nbsp;<a href="javascript:void(0)" onclick="$(\'.popover\').popover(\'hide\')"><i class="glyphicon glyphicon-remove"></i> 取消</a></div>',
		    html: true
		}).on('click', function(){
		    var _this = this;
		    var url = $(this).attr('href');
		    var div_id = url.substr(url.indexOf('=') + 1);
		    $(this).popover('show');
		    $('.popover').on('mouseleave', function () {
		        $(_this).popover('hide');
		    });
		    $('.btn-ok').on('click', function(){
			    $.ajax({
			    	type: 'POST',
			        url: url,
			        success: function() {
			        	$(_this).popover('hide');
			        	$('#'+div_id).fadeOut(1000);
			        }
			    });
		    	return false;
		    });
		}).on('mouseleave', function () {
		    var _this = this;
		    setTimeout(function () {
		        if(!$('.popover:hover').length) {
		            $(_this).popover('hide')
		        }
		    }, 500);
		});
		return false;
	});

	//添加评论
	$('body').on('click', '[data-clicklog=comment]', function(event) {
		var _this = this;
		$(this).css('display', 'none');
		$(this).after('<div class="comment-box-wrap"><textarea class="form-control" id="comment-textarea"></textarea><a href="" class="btn btn-default btn-comment">Send</a></div>');
		$('.btn-comment').on('click', function(){
		    $.ajax({
		    	type: 'GET',
		        url: $(_this).children().attr('href'),
		        data: {content : $('#comment-textarea').val()},
		        success: function() {
		        }
		    });
		    return false;
		});
	 	$(document).click(function (e) {
	 		var id = $(e.target).attr('class');
	    	if (id != 'comment-box-wrap' && id != 'form-control' && id != 'btn-comment') {
	    		$('.comment-box-wrap').remove();
				$(_this).css('display', 'block');
	    	};
	    });
		return false;
	});
}).call(this);

$(window).scroll(function(){
	 var position = $(window).scrollTop();
	 //Display a scroll to top button
	 if(position >= 200)	{
		$('#scroll-to-top').attr('style','bottom:16%;');	
	 }
	 else	{
		$('#scroll-to-top').removeAttr('style');
	 }
});
