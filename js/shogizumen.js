/* 
 shogizumen.js ver.20170713 
 (c) maasa. | http://www.geocities.jp/ookami_maasa/shogizumen/
*/
(function( func ){
	if( typeof(SSZumen) == "undefined" ){
		SSZumen=func;
		window.addEventListener("load",SSZumen,false);
	}
})( function(){
	function svgavailable(){
		var dummy=document.createElement("div");
		dummy.innerHTML="<svg/>";
		return dummy.firstChild&&dummy.firstChild.viewBox!=undefined;
	}
	if( !svgavailable() ){ return; }

	var selector=".shogizumen";
	var selectorTag="pre";
	var defaultSize=0;
	var minSize=0;
	var maxSize=0;
	var drawall=function(){
		var a=document.querySelectorAll(selector);
		for(var i=0;i<a.length;i++){
			var b=a[i];
			var c;
			if(b.tagName.toLowerCase()!=selectorTag){
				c=b.querySelector(selectorTag);
			}else{
				//console.log("pre");
				c=b;
				b=b.parentNode;
			}
			var ban=readzumen(c.innerHTML);
			if(ban!=false){
			var pw=c.offsetWidth;
			var ph=c.offsetHeight;
			c.style.display="none";
			var e=b.insertBefore(svgdraw(pw,ph,ban),c);
			e.appendChild(c);
			}
		}
	}
	var HanSuuji="123456789";
	var ZenSuuji="１２３４５６７８９";
	var KanSuuji="一二三四五六七八九";
	var KomaStr="玉飛角金銀桂香歩玉龍馬金全圭杏と";
	var convMgRepeat=function(str){
		var re=new RegExp("["+ZenSuuji+KanSuuji+"]","g");
		str=str.replace(re,function(a){ return HanSuuji.charAt((ZenSuuji+KanSuuji).indexOf(a)%9); } );
		str=str.replace("０","0");
		str=str.replace(/十([1-9])/,"1$1");
		str=str.replace("十","10");
		str=str.replace(/(.)(1?[0-9])/g,
			function(a,b,c){ for(var i=0,s=""; i<c ; i++){ s+=b; } return s; } );
		return str;
	}
	var convKomaStr=function(str){
		str=str.replace("王","玉");
		str=str.replace("竜","龍");
		str=str.replace("仝",'杏');
		str=str.replace("个",'と');
		return str;
	}
	var readzumen=function(text){
		var mr,mk,x,y,s,c,i,re2;
		var ban=new Array(98);
		for(var i=0;i<95;i++){ ban[i]=0; }
		ban[95]="先手";
		ban[96]="後手";
		ban[97]=-1;
		var mgStrSente="";
		var mgStrGote="";
		var re=/^([先下後上]手の)?持駒：([^\n]*)/mg;
		while( (mr = re.exec(text)) != null ){
			if( /[後上]/.test(mr[1]) ){ mgStrGote=mr[2]; }else{ mgStrSente=mr[2]; }
		}
		re=/^([先下後上]手)：(.*)\n/mg;
		while( (mr=re.exec(text)) != null){
			mr[2].replace(/^\s+/,'');
			mr[2].replace(/(\s|　).*$/,'');
			if( /[後上]/.test(mr[1]) ){ ban[96]=mr[2]; }else{ ban[95]=mr[2]; }
		}
		y=1;
		re=/^\|([^\n]*)/mg;
		while((mr = re.exec(text))!=null){
			mr[1]=convKomaStr(mr[1]);
			x=9;
			re2=new RegExp("([\\+\\-vV\\^\\s])(.)","g");
			while( (mk=re2.exec(mr[1]))!=null ){
				s=("vV-".indexOf(mk[1])>-1) ? 2 : 0 ;
				if( (c=KomaStr.indexOf(mk[2])) >-1 ){
					if(c>7){ c-=8; s=s|1; }
					//xysAry[c]+=""+x+y+s;
					ban[y*9-x]=s*8+c+1;
				}
				if( --x<1 ){ break; }
			}
			if( ++y>9 ){ break; }
		}
		if(y==1){ return false; }
		mgStrSente=convMgRepeat(mgStrSente);
		for(i=0;i<mgStrSente.length;i++){
			if( (c=KomaStr.indexOf(mgStrSente.charAt(i))) >0 ){ 
				ban[81+c-1]+=1;
			}
		}
		mgStrGote=convMgRepeat(mgStrGote);
		for(i=0;i<mgStrGote.length;i++){
			if( (c=KomaStr.indexOf(mgStrGote.charAt(i))) >0 ){ 
				ban[88+c-1]+=1;
			}
		}
		re=/^手数＝\d+\s+[▲△▽]?(.)(.)(.*)まで/mg;
		if( (mr=re.exec(text))!=null ){
			var mx=-100;
			if( (c=0+mr[1])>0){ mx=8-c;}
			else if( (c=ZenSuuji.indexOf(mr[1]))>0 ){ mx=8-c; }
			if( (c=0+mr[2])>0){ mx+=c*9;}
			else if( (c=ZenSuuji.indexOf(mr[2]))>0 ){ mx+=c*9; }
			else if( (c=KanSuuji.indexOf(mr[2]))>0 ){ mx+=c*9; }
			ban[97]=mx;
		}
		return ban;
	}
	
	var svgNS = "http://www.w3.org/2000/svg";
	var mincho="inherit";
	var sgm=1;
	var scolor="currentColor";
	
	var mgpack=function(v,ban){
		var r="";
		for(var i=1;i<8;i++){
			var a=ban[81+v*7+i-1];
			if( a>0 ){
				r+= KomaStr.charAt(i);
				if( a>1 ){
					if( a>10 ){ r+="十"; a-=10; }
					r+=KanSuuji.charAt(a-1);
				}
			}
		}
		if( r=="" ){ return "なし"; }
		return r;
	}
	var mgtext=function(v,d,kx,ban){
		var g=d.createElementNS(svgNS, "g");
		var t=(v==0)?"☗"+ban[95]+"　":"☖"+ban[96]+"　";
		t+=mgpack(v,ban);
		for(var i=0;i<t.length-sgm;i++){
			var s=d.createElementNS(svgNS,"text");
			s.textContent=t.charAt(t.length-i-1);
			s.setAttribute("font-family",mincho);
			s.setAttribute("font-size",kx*9/14);
			s.setAttribute("fill",scolor);
			s.setAttribute("text-anchor","middle");
			s.setAttribute("x",0);
			s.setAttribute("y",-i*kx*9/14);
			g.appendChild(s);
		}
		if(sgm){
			var s=d.createElementNS(svgNS, "polygon");
			var py=-t.length*kx*9/14
			s.setAttribute("points","0,"+py+" "+kx*.23+","+(py+kx*.1)+" "+kx*.3+","+(py+kx*.6)+" "+kx*-.3+","+(py+kx*.6)+" "+kx*-.23+","+(py+kx*.1));
			if(v!=0){
				s.setAttribute("fill","none");
			}else{
				s.setAttribute("fill",scolor);
			}
			s.setAttribute("stroke",scolor);
			s.setAttribute("stroke-width",kx/25);
			
			g.appendChild(s);
		}
		//
		var r=(t.length>14)?14/t.length:1;
		if(v==0){
			g.setAttribute("transform","translate("+(kx*11.35)+","+(kx*9.7)+") scale(1,"+r+")");
		}else{
			g.setAttribute("transform","translate("+(kx*0.65)+","+(kx*0.8)+") scale(-1,"+(-r)+")");
		}
		return g;
	}

	var svgdraw=function(w,h,ban){
		var d = document;
		var svg = d.createElementNS(svgNS, "svg");
		var bxy=ban[97];

		var kx=defaultSize;
		if(kx==0){
			kx=(w/12<h/10)?Math.floor(w/12):Math.floor(h/10);
			if(kx<minSize){kx=minSize;}
			if(maxSize&&kx>maxSize){kx=maxSize;}
		}
		console.log(w,h,kx);

		svg.setAttribute("width", kx*12);
		svg.setAttribute("height", kx*10);
		svg.style.verticalAlign="bottom";
		var dx=Math.floor(kx*1.25) 
		var dy=Math.floor(kx*0.75)

		var dp;
		if(window.devicePixelRatio&&window.devicePixelRatio>=2){ dp=1/2; }else{ dp=1; }

		var g = d.createElementNS(svgNS, "g");

		var rect= d.createElementNS(svgNS, "rect");
		rect.setAttribute("x",dx);
		rect.setAttribute("y",dy);
		rect.setAttribute("width",kx*9+1);
		rect.setAttribute("height",kx*9+1);
		rect.setAttribute("stroke-width",2);
		rect.setAttribute("stroke",scolor);
		rect.setAttribute("fill","none");
		g.appendChild(rect);

		for(var i=0;i<9;i++){
			if(i){
				var liney = d.createElementNS(svgNS,"line");
				var linex = d.createElementNS(svgNS,"line");
				liney.setAttribute("x1",i*kx+dx+dp/2);
				liney.setAttribute("x2",i*kx+dx+dp/2);
				liney.setAttribute("y1",dy+dp/2);
				liney.setAttribute("y2",dy+kx*9+dp/2);
				liney.setAttribute("stroke-width",dp);
				liney.setAttribute("stroke",scolor);
				linex.setAttribute("y1",i*kx+dy+dp/2);
				linex.setAttribute("y2",i*kx+dy+dp/2);
				linex.setAttribute("x1",dx+dp/2);
				linex.setAttribute("x2",dx+kx*9+dp/2);
				linex.setAttribute("stroke-width",dp);
				linex.setAttribute("stroke",scolor);
				g.appendChild(liney);
				g.appendChild(linex);
			}
			var texty = d.createElementNS(svgNS,"text");
			var textx = d.createElementNS(svgNS,"text");
			texty.setAttribute("x",i*kx+dx+kx/2);
			texty.setAttribute("y",dy-kx/6);
			texty.setAttribute("font-family",mincho);
			texty.textContent=ZenSuuji.charAt(8-i);
			texty.setAttribute("font-size",kx*.4);
			texty.setAttribute("fill",scolor);
			texty.setAttribute("text-anchor","middle");		
			g.appendChild(texty);
			textx.setAttribute("x",dx+kx*9+kx*.35);
			textx.setAttribute("y",i*kx+dy+kx*.6);
			textx.textContent=KanSuuji.charAt(i);
			textx.setAttribute("font-size",kx*.4);
			textx.setAttribute("font-family",mincho);
			textx.setAttribute("fill",scolor);
			textx.setAttribute("text-anchor","middle");		
			g.appendChild(textx);
		}
		svg.appendChild(g);
		for(var i=0;i<81;i++){
			if(ban[i]>0){
				var x=(i%9)*kx+dx+kx/2+dp/2;
				var y=Math.floor(i/9)*kx+dy+kx/2+dp/2;
				var tg=d.createElementNS(svgNS, "g");
			
				var t=KomaStr.charAt((ban[i]-1)&15);
				var textk=d.createElementNS(svgNS, "text");
				textk.setAttribute("fill",scolor);
				if( "全圭杏".indexOf(t)!=-1 ){
					var textk=d.createElementNS(svgNS, "text");
					textk.setAttribute("font-size",kx*.82);
					t=KomaStr.charAt((ban[i]-1)&7);
					if(i==bxy){
						textk.setAttribute("class","szLastMove");
					}else{
						textk.setAttribute("font-family",mincho);
					}
					textk.setAttribute("text-anchor","middle");
					textk.setAttribute("dy",-kx*.09);
					textk.textContent="成";
					tg.appendChild(textk);
					textk=d.createElementNS(svgNS, "text");
					textk.setAttribute("dy",kx*.32+kx*.41); 
					if(ban[i]>16){
						tg.setAttribute("transform","translate("+(x)+","+(y)+") scale(-1,-0.5)");
					}else{
						tg.setAttribute("transform","translate("+(x)+","+(y)+") scale(1,0.5)");
					}
				}else{
					textk.setAttribute("dy",kx*.32);
					if(ban[i]>16){
						tg.setAttribute("transform","translate("+(x)+","+(y)+") scale(-1,-1)");
					}else{
						tg.setAttribute("transform","translate("+(x)+","+(y)+")");
					}
				}
				textk.setAttribute("font-size",kx*.82);
				if(i==bxy){
					textk.setAttribute("class","szLastMove");
				}else{
					textk.setAttribute("font-family",mincho);
				}
				textk.setAttribute("text-anchor","middle");
				textk.textContent=t;
				
				tg.appendChild(textk);
				svg.appendChild(tg);
			}
		}

		var mg0=mgtext(0,d,kx,ban);
		svg.appendChild(mg0);

		var mg1=mgtext(1,d,kx,ban);
		svg.appendChild(mg1);

		var wrap=document.createElement("div");
		wrap.style.position="relative";
		wrap.style.width=kx*12+"px";
		wrap.style.height=kx*10+"px";
		wrap.style.overflow="auto";
		(function(u){
			u.onmouseover=function(e){
				this.childNodes[1].style.display="block";
			}
			u.onmouseout=function(e){
				this.childNodes[1].style.display="none";
			}
		})(wrap);
		var btn=document.createElement("div");
		btn.style.position="absolute";
		btn.style.right=0+"px";
		btn.style.top=0+"px";
		btn.style.zIndex="9999";
		btn.style.width="30px";
		btn.style.height="16px";
		btn.style.borderRadius="4px";
		btn.style.backgroundColor="#CCC";
		btn.style.display="none";
		btn.style.fontSize="14px";
		btn.style.lineHeight="1";
		btn.style.color="black";
		btn.style.cursor="pointer";
		btn.style.baseline="middle";
		btn.title="表示切替（局面図⇔kif形式）";
		btn.style.textAlign="center";
		
		btn.innerHTML="⇔";
		btn.onclick=function(){
			var d=this.parentNode;
			if(this.previousSibling.style.display=="none"){
				this.previousSibling.style.display="";
				this.nextSibling.style.display="none";
			}else{
				this.previousSibling.style.display="none";
				this.nextSibling.style.display="";
			}
		}
		wrap.appendChild(svg);
		wrap.appendChild(btn);
		return wrap;
	}
	drawall();
} );