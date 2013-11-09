/*
 * Licensed to the Apache Software Foundation (ASF) under one
 * or more contributor license agreements.  See the NOTICE file
 * distributed with this work for additional information
 * regarding copyright ownership.  The ASF licenses this file
 * to you under the Apache License, Version 2.0 (the
 * "License"); you may not use this file except in compliance
 * with the License.  You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing,
 * software distributed under the License is distributed on an
 * "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
 * KIND, either express or implied.  See the License for the
 * specific language governing permissions and limitations
 * under the License.
 */
function animBullet(i){
	aux = $('#carregando span')
	$('#carregando span').removeClass('active').animate({
		color:'#ce004e'
	});
	$(aux[i]).addClass('active').animate({
		color:'#fff'
	});
}

function animSplash(){
	window.setTimeout('animBullet(0)',500);
	window.setTimeout('animBullet(1)',1000);
	window.setTimeout('animBullet(2)',1500);
	window.setInterval( ""+
						"window.setTimeout('animBullet(0)',500);"+
						"window.setTimeout('animBullet(1)',1000);"+
						"window.setTimeout('animBullet(2)',1500);"
					   , 1500);
}
function animNext(id){
	$(id).css({ background: '#fff' });
	aux = $(id+' span');
	$(id+' span').show().animate({ color:'#fff'});
	window.setTimeout("aux = $('"+id+" span');$(aux[0]).animate({ color:'#ce004e'});",300);
	window.setTimeout("aux = $('"+id+" span');$(aux[1]).animate({ color:'#ce004e'});",600);
	window.setTimeout("aux = $('"+id+" span');$(aux[2]).animate({ color:'#ce004e'});",900);
	window.setTimeout("$('"+id+" span').fadeOut();",1200);
	
}
function ini(){
	$('#splash').fadeOut(500);
	window.setTimeout("$('#home').fadeIn(500);",500);
} 

var app = {
    // Application Constructor
    initialize: function() {
        this.bindEvents();
    },
    // Bind Event Listeners
    //
    // Bind any events that are required on startup. Common events are:
    // 'load', 'deviceready', 'offline', and 'online'.
    bindEvents: function() {
        //document.addEventListener('deviceready', this.onDeviceReady, false);
        document.addEventListener('load', this.onDeviceReady, false);
    },
    
    
    // deviceready Event Handler
    onDeviceReady: function() {
		$('.window').hide();
		$('#splash').show();
		animSplash();
		window.setTimeout('ini()',2000);
		s = 0;
		
		$('a').click(function(){
			if($(this).attr('href') == '#end'){
				//finalizar aqui :)
				navigator.app.exitApp();
			}
			else if($(this).parent().hasClass('center')){
				//fazer o game
				if($(this).attr('id') == "play-random"){
					img = Math.floor((Math.random()*12));
					animNext('#'+$(this).attr('id'));
					window.setTimeout("$('#"+$(this).attr('id')+"').css({background: 'url(./imgs/"+img+".png) center center'});",1500);
				}else{
					img = s;
					animNext('#'+$(this).attr('id'));
					window.setTimeout("$('#"+$(this).attr('id')+"').css({background: 'url(./imgs/"+img+".png) center center'});",1500);
					s++;
					if (s==12) s=0;
				}
			}
			else{
				$('div.center a').css({ background: '#fff', color:'#ce004e' });
				$('div.center a span').css({color:'#ce004e' }).show();
				$(this).parent().parent().fadeOut(500)
				$($(this).attr('href')).delay(500).fadeIn('slow')
			}
			
		});
    }

};
