(function(){const e=document.createElement("link").relList;if(e&&e.supports&&e.supports("modulepreload"))return;for(const s of document.querySelectorAll('link[rel="modulepreload"]'))n(s);new MutationObserver(s=>{for(const r of s)if(r.type==="childList")for(const o of r.addedNodes)o.tagName==="LINK"&&o.rel==="modulepreload"&&n(o)}).observe(document,{childList:!0,subtree:!0});function t(s){const r={};return s.integrity&&(r.integrity=s.integrity),s.referrerPolicy&&(r.referrerPolicy=s.referrerPolicy),s.crossOrigin==="use-credentials"?r.credentials="include":s.crossOrigin==="anonymous"?r.credentials="omit":r.credentials="same-origin",r}function n(s){if(s.ep)return;s.ep=!0;const r=t(s);fetch(s.href,r)}})();const Wo=384,Xo=216,Gh={ArrowUp:"up",KeyW:"up",ArrowDown:"down",KeyS:"down",ArrowLeft:"left",KeyA:"left",ArrowRight:"right",KeyD:"right",Enter:"confirm",KeyZ:"confirm",Space:"confirm",Escape:"cancel",KeyX:"cancel",KeyM:"map",KeyE:"enemies"};class Rp{constructor(e=window){this.down=new Set,this.pressed=new Set,e.addEventListener("keydown",t=>{const n=Gh[t.code];n&&(t.preventDefault(),!t.repeat&&!this.down.has(n)&&this.pressed.add(n),this.down.add(n))}),e.addEventListener("keyup",t=>{const n=Gh[t.code];n&&(t.preventDefault(),this.down.delete(n))}),e.addEventListener("blur",()=>this.down.clear())}held(e){return this.down.has(e)}justPressed(e){return this.pressed.has(e)}endFrame(){this.pressed.clear()}}class Cp{constructor(e){this.scale=1,this.view=e;const t=e.getContext("2d");if(!t)throw new Error("2d context unavailable");this.ctx=t,this.ctx.imageSmoothingEnabled=!1,this.resize(),window.addEventListener("resize",()=>this.resize())}resize(){const e=Math.max(1,Math.floor(Math.min(window.innerWidth/Wo,window.innerHeight/Xo)));this.scale=e,this.view.width=Wo*e,this.view.height=Xo*e,this.view.style.width=`${Wo*e}px`,this.view.style.height=`${Xo*e}px`,this.ctx.imageSmoothingEnabled=!1}get scaleFactor(){return this.scale}}function wn(i){let e=i>>>0;return()=>{e|=0,e=e+1831565813|0;let t=Math.imul(e^e>>>15,1|e);return t=t+Math.imul(t^t>>>7,61|t)^t,((t^t>>>14)>>>0)/4294967296}}function Pp(i,e){let t=performance.now();const n=s=>{const r=Math.min(.05,Math.max(0,(s-t)/1e3));t=s,i(r),e(),requestAnimationFrame(n)};requestAnimationFrame(n)}const Nc={ember:"#e8663c",frost:"#5fb4e6",gale:"#6fd28a",stone:"#c79a5b",spirit:"#c07fe0"};function ao(i,e){if(i==="spirit"||e==="spirit")return 1;const t={ember:"gale",gale:"stone",stone:"frost",frost:"ember",spirit:"spirit"};return t[i]===e?1.5:t[e]===i?.75:1}const zs={emberlash:{id:"emberlash",name:"Ember Lash",cost:4,power:15,element:"ember",kind:"attack",target:"enemy",desc:"A whip of fire sears one foe."},frostbite:{id:"frostbite",name:"Frostbite",cost:5,power:17,element:"frost",kind:"attack",target:"enemy",desc:"Biting cold scours a single foe."},galewind:{id:"galewind",name:"Galewind",cost:7,power:11,element:"gale",kind:"attack",target:"all-enemies",desc:"A cutting gust tears every foe."},mend:{id:"mend",name:"Mend",cost:4,power:22,element:"spirit",kind:"heal",target:"ally",desc:"Knits an ally's wounds shut."},stoneskin:{id:"stoneskin",name:"Stoneskin",cost:5,power:4,element:"stone",kind:"ward",target:"ally",desc:"Stoneskin raises an ally's guard."}};function nd(){return[{id:"arcstel",name:"Arcstel",role:"Swordhand",element:"ember",lv:1,hp:36,maxHp:36,mp:6,maxMp:6,atk:12,def:9,spd:7,guard:0,spells:[],art:"warrior"},{id:"orin",name:"Orin",role:"Warden",element:"stone",lv:1,hp:30,maxHp:30,mp:13,maxMp:13,atk:8,def:7,spd:5,guard:0,spells:["mend","stoneskin"],art:"cleric"},{id:"nemne",name:"Nemne",role:"Emberwright",element:"ember",lv:1,hp:24,maxHp:24,mp:18,maxMp:18,atk:6,def:5,spd:6,guard:0,spells:["emberlash","frostbite","galewind"],art:"mage"},{id:"vesper",name:"Vesper",role:"Familiar",element:"gale",lv:1,hp:22,maxHp:22,mp:12,maxMp:12,atk:9,def:4,spd:10,guard:0,spells:["galewind"],art:"spirit"}]}const Ip=[{id:"hound",name:"Marrow Hound",element:"stone",hp:20,atk:8,def:5,spd:7,xp:6,gold:5,art:"hound"},{id:"wisp",name:"Ash Wisp",element:"ember",hp:15,atk:7,def:2,spd:9,xp:5,gold:4,art:"wisp"},{id:"mite",name:"Rime Mite",element:"frost",hp:13,atk:6,def:3,spd:8,xp:5,gold:4,art:"mite"},{id:"golem",name:"Vault Sentinel",element:"stone",hp:30,atk:11,def:9,spd:4,xp:12,gold:10,art:"golem"}];function id(i,e){const t=wn(i),n=Ip,s=[];for(let r=0;r<e;r++){const o=n[Math.floor(t()*n.length)];s.push({...o,uid:r,maxHp:o.hp})}return s}const Wh={draught:{name:"Cinder Draught",kind:"heal",power:25},dew:{name:"Spirit Dew",kind:"mp",power:10}},sd=[{id:"bronze_gladius",name:"Bronze Gladius",kind:"weapon",atk:3,def:0,tier:1,value:20},{id:"leather_jerkin",name:"Leather Jerkin",kind:"armor",atk:0,def:2,tier:1,value:18},{id:"ash_buckler",name:"Ash Buckler",kind:"armor",atk:0,def:3,tier:1,value:22},{id:"iron_falchion",name:"Iron Falchion",kind:"weapon",atk:6,def:0,tier:2,value:55},{id:"smith_hammer",name:"Warden's Hammer",kind:"weapon",atk:5,def:1,tier:2,value:60},{id:"chain_hauberk",name:"Chain Hauberk",kind:"armor",atk:0,def:5,tier:2,value:58},{id:"steel_warblade",name:"Steel Warblade",kind:"weapon",atk:10,def:0,tier:3,value:120},{id:"emberfang",name:"Emberfang",kind:"weapon",atk:9,def:0,tier:3,value:130},{id:"scale_mail",name:"Scale Mail",kind:"armor",atk:0,def:8,tier:3,value:115},{id:"runed_claymore",name:"Runed Claymore",kind:"weapon",atk:15,def:0,tier:4,value:240},{id:"frostbrand",name:"Frostbrand",kind:"weapon",atk:14,def:1,tier:4,value:250},{id:"runeplate",name:"Runeplate",kind:"armor",atk:0,def:12,tier:4,value:235},{id:"duskrend",name:"Duskrend",kind:"weapon",atk:22,def:0,tier:5,value:480},{id:"dragonhide",name:"Dragonhide Coat",kind:"armor",atk:0,def:17,tier:5,value:470},{id:"starcleaver",name:"Starcleaver",kind:"weapon",atk:30,def:2,tier:6,value:900},{id:"aegis_plate",name:"Aegis Plate",kind:"armor",atk:0,def:24,tier:6,value:880}],Lp=Object.fromEntries(sd.map(i=>[i.id,i]));function Np(i,e=Math.random){const t=Math.min(6,Math.floor((i+2)/3)+1),n=Math.max(1,t-2),s=n+Math.floor(e()*(t-n+1)),r=sd.filter(o=>o.tier===s);return r[Math.floor(e()*r.length)]}function sa(i,e){const t=e==="weapon"?i.weapon:i.armor;return t?Lp[t]??null:null}function Na(i){return i.atk+(sa(i,"weapon")?.atk??0)}function Dp(i){return i.def+(sa(i,"armor")?.def??0)}function Up(i,e){e.kind==="weapon"?i.weapon=e.id:i.armor=e.id}const Ft=0,Qt=1,Gs=2,Sa=3,wa=4,rs=5,Dc=6,Ws=7,ns=8,Tr=9;function os(i){return i===Qt||i===wa||i===rs||i===Ws}function rd(i,e=1){const t=wn(e>>>0),n=(o,a)=>o>=0&&a>=0&&o<i.w&&a<i.h&&!os(i.tiles[a*i.w+o]),s=[];for(let o=1;o<i.h-1;o++)for(let a=1;a<i.w-1;a++)if(n(a,o))for(const c of Dn){const l=a+c.x,h=o+c.y;if(l<0||h<0||l>=i.w||h>=i.h||i.tiles[h*i.w+l]!==Qt)continue;let u=!1;for(const f of s)if(Math.abs(f.x-l)+Math.abs(f.y-h)<2){u=!0;break}u||t()<.2||s.push({x:l,y:h,dx:-c.x,dy:-c.y})}const r=[];for(let o=1;o<i.h-1;o++)for(let a=1;a<i.w-1;a++){if(!n(a,o))continue;let c=0;for(const h of Dn)n(a+h.x,o+h.y)&&c++;if(c<3)continue;let l=!1;for(const h of r)if(Math.abs(h.x-a)+Math.abs(h.y-o)<5){l=!0;break}l||t()<.35||r.push({x:a,y:o})}i.lights=s,i.sky=r}function Nl(i){const n=new Uint8Array(1089).fill(Qt),s=wn(i),r=C=>Math.floor(s()*C),o=(C,N)=>{C>0&&N>0&&C<32&&N<32&&(n[N*33+C]=Ft)},a=[];for(let C=0;C<12;C++)for(let N=0;N<40;N++){const U=4+r(5),k=4+r(5),V=1+r(33-U-2),ee=1+r(33-k-2);let re=!0;for(const Se of a)if(V-2<Se.x+Se.w&&V+U+2>Se.x&&ee-2<Se.y+Se.h&&ee+k+2>Se.y){re=!1;break}if(re){for(let Se=ee;Se<ee+k;Se++)for(let be=V;be<V+U;be++)o(be,Se);a.push({x:V,y:ee,w:U,h:k,cx:Math.floor(V+U/2),cy:Math.floor(ee+k/2)});break}}const c=(C,N)=>a.some(U=>C>=U.x&&C<U.x+U.w&&N>=U.y&&N<U.y+U.h),l=[],h=(C,N)=>{const U=[];let k=C.cx,V=C.cy;const ee=2+r(29),re=2+r(29),Se=(be,Ve)=>{for(;k!==be;)k+=Math.sign(be-k),o(k,V),U.push(V*33+k);for(;V!==Ve;)V+=Math.sign(Ve-V),o(k,V),U.push(V*33+k)};Se(ee,C.cy),Se(ee,re),Se(N.cx,re),Se(N.cx,N.cy),l.push(U)};for(let C=1;C<a.length;C++)h(a[C-1],a[C]);for(let C=0;C<2&&a.length>4;C++){const N=a[r(a.length)],U=a[r(a.length)];N!==U&&h(N,U)}const u=a[0],f={x:u.cx,y:u.cy,dir:1},d=a[a.length-1];n[d.cy*33+d.cx]=Sa;let p=null;{let C=-1,N=-1,U=99;for(let k=u.y;k<u.y+u.h;k++)for(let V=u.x;V<u.x+u.w;V++){if(V===f.x&&k===f.y||n[k*33+V]!==Ft)continue;const ee=Math.abs(V-f.x)+Math.abs(k-f.y),re=Math.abs(ee-3);re<U&&(U=re,C=V,N=k)}if(C>=0){n[N*33+C]=ns,p={x:C,y:N};const k=C-f.x,V=N-f.y;f.dir=Math.abs(k)>=Math.abs(V)?k>0?1:3:V>0?2:0}}const _=[],g=l[a.length-2];let m=null;if(g)for(const C of g){const N=C%33,U=C/33|0;if(!c(N,U)){n[C]=Ws,m={x:N,y:U},_.push({x:N,y:U});break}}const M=[],b=[],v=(C,N)=>b.some(U=>Math.abs(U.x-C)<3&&Math.abs(U.y-N)<3),w=()=>{for(let C=0;C<90;C++){const N=2+r(26),U=2+r(26);if(v(N,U))continue;let k=!0;for(let ee=U;ee<U+3&&k;ee++)for(let re=N;re<N+3;re++)if(n[ee*33+re]!==Qt){k=!1;break}if(!k)continue;const V=[{dx:0,dy:-1},{dx:1,dy:0},{dx:0,dy:1},{dx:-1,dy:0}];for(const ee of V){const re=ee.dx!==0?ee.dx<0?N:N+2:N+1,Se=ee.dy!==0?ee.dy<0?U:U+2:U+1,be=re+ee.dx,Ve=Se+ee.dy;if(!(be<0||Ve<0||be>=33||Ve>=33)&&n[Ve*33+be]===Ft){for(let J=U;J<U+3;J++)for(let j=N;j<N+3;j++)n[J*33+j]=Ft;for(let J=0;J<3;J++){const j=ee.dy!==0?N+J:re,de=ee.dx!==0?U+J:Se;n[de*33+j]=wa}return n[Se*33+re]=rs,_.push({x:re,y:Se}),b.push({x:N,y:U}),n[(U+1)*33+N+1]===Ft&&(n[(U+1)*33+N+1]=Gs),{x:N,y:U+1}}}}return null};for(let C=0;C<2;C++){const N=w();N&&M.push(N)}const S=new Uint8Array(1089);{const C=[f.y*33+f.x];for(S[f.y*33+f.x]=1;C.length;){const N=C.pop(),U=N%33,k=N/33|0;for(const V of Dn){const ee=U+V.x,re=k+V.y;if(ee<0||re<0||ee>=33||re>=33)continue;const Se=re*33+ee;S[Se]||os(n[Se])||(S[Se]=1,C.push(Se))}}}let T=0;for(let C=0;C<400&&T<_.length;C++){const N=1+r(31),U=1+r(31),k=U*33+N;!S[k]||n[k]!==Ft||Math.abs(N-f.x)+Math.abs(U-f.y)<4||(n[k]=Dc,T++)}for(let C=T;C<_.length;C++){const N=_[C];n[N.y*33+N.x]===rs&&(n[N.y*33+N.x]=Ft)}for(const C of a.slice(1,-1))s()<.28&&n[C.cy*33+C.cx]===Ft&&(n[C.cy*33+C.cx]=Gs);{let C=0;for(let N=0;N<60&&C<4;N++){const U=d.x+r(d.w),k=d.y+r(d.h),V=k*33+U;n[V]===Ft&&(Math.abs(U-d.cx)+Math.abs(k-d.cy)<2||(n[V]=Gs,C++))}}const x={name:"Sunken Vault — B1",w:33,h:33,tiles:n,start:f};rd(x,i);const R=[],D=a.slice(1,-1),P=C=>{for(let N=C.y;N<C.y+C.h;N++)for(let U=C.x;U<C.x+C.w;U++)for(const k of Dn){const V=U+k.x,ee=N+k.y;if(V>=C.x&&V<C.x+C.w&&ee>=C.y&&ee<C.y+C.h||V<0||ee<0||V>=33||ee>=33||os(n[ee*33+V])||c(V,ee))continue;const re=k.y,Se=k.x,be=[U+re,N+Se],Ve=[U-re,N-Se],J=be[0]>=C.x&&be[0]<C.x+C.w&&be[1]>=C.y&&be[1]<C.y+C.h&&n[be[1]*33+be[0]]===Ft,j=Ve[0]>=C.x&&Ve[0]<C.x+C.w&&Ve[1]>=C.y&&Ve[1]<C.y+C.h&&n[Ve[1]*33+Ve[0]]===Ft;if(J&&j)return[be,Ve]}return[]};for(const C of[a[0],a[a.length-1]])if(C)for(const[N,U]of P(C))R.push({kind:"gargoyle",x:N,y:U,dx:0,dy:0});if(p){const N=Math.abs(p.x-f.x)>=Math.abs(p.y-f.y)?[[p.x,p.y-1],[p.x,p.y+1]]:[[p.x-1,p.y],[p.x+1,p.y]];for(const[U,k]of N)U<0||k<0||U>=33||k>=33||n[k*33+U]===Ft&&(U===f.x&&k===f.y||R.push({kind:"gargoyle",x:U,y:k,dx:0,dy:0}))}for(const C of D){const N=s();if(N<.14)n[C.cy*33+C.cx]===Ft&&R.push({kind:"fountain",x:C.cx,y:C.cy,dx:0,dy:0});else if(N<.34)for(let U=0;U<6;U++){const k=C.x+r(C.w),V=C.y+r(C.h);if(n[V*33+k]===Ft){R.push({kind:"table",x:k,y:V,dx:0,dy:0});break}}else if(N<.52)for(const[U,k]of P(C))R.push({kind:"gargoyle",x:U,y:k,dx:0,dy:0});else if(N<.8){const U=1+r(2);for(let k=0;k<U;k++){const V=C.x+r(C.w),ee=C.y+r(C.h);n[ee*33+V]===Ft&&R.push({kind:"skeleton",x:V,y:ee,dx:0,dy:0})}}}if(m)for(let C=d.y;C<d.y+d.h;C++)for(let N=d.x;N<d.x+d.w;N++){const U=m.x-N,k=m.y-C;if(Math.abs(U)+Math.abs(k)!==1)continue;const V=k,ee=U;for(const re of[1,-1]){const Se=N+V*re,be=C+ee*re;Se>=d.x&&Se<d.x+d.w&&be>=d.y&&be<d.y+d.h&&n[be*33+Se]===Ft&&R.push({kind:"gargoyle",x:Se,y:be,dx:0,dy:0})}C=d.y+d.h;break}const F=new Set;for(const C of R)F.add(C.y*33+C.x);for(const C of D)if(s()<.5){const N=1+r(3);for(let U=0;U<N;U++){const k=C.x+r(C.w),V=C.y+r(C.h),ee=V*33+k;n[ee]!==Ft||F.has(ee)||(F.add(ee),R.push({kind:s()<.5?"urn":"barrel",x:k,y:V,dx:0,dy:0}))}}for(const C of D)if(s()<.35)for(const[N,U]of[[C.x,C.y],[C.x+C.w-1,C.y],[C.x,C.y+C.h-1],[C.x+C.w-1,C.y+C.h-1]])n[U*33+N]===Ft&&s()<.5&&R.push({kind:"web",x:N,y:U,dx:0,dy:0});for(const C of M)R.push({kind:"chain",x:C.x+1,y:C.y,dx:0,dy:0});const A=D.filter(()=>s()<.22).slice(0,2);for(const C of A){const N=2+r(2);for(let U=0;U<N;U++){const k=C.x+r(C.w),V=C.y+r(C.h);n[V*33+k]===Ft&&R.push({kind:"rat",x:k,y:V,dx:0,dy:0})}}for(const C of M)R.push({kind:"skeleton",x:C.x,y:C.y,dx:0,dy:0});const I=new Set((x.lights??[]).map(C=>C.y*33+C.x));let O=0,H=0;for(let C=1;C<32&&(O<6||H<5);C++)for(let N=1;N<32;N++)if(!os(n[C*33+N]))for(const U of Dn){const k=N+U.x,V=C+U.y;if(k<1||V<1||k>=32||V>=32||n[V*33+k]!==Qt||I.has(V*33+k))continue;const ee=s();if(O<6&&ee<.05){R.push({kind:"map",x:k,y:V,dx:-U.x,dy:-U.y}),O++;break}if(H<5&&ee>.94){R.push({kind:"grate",x:k,y:V,dx:-U.x,dy:-U.y}),H++;break}}return x.decor=R,x}function Xh(i){const n=new Uint8Array(1681).fill(Ft),s=wn(i);for(let P=0;P<41;P++)n[P]=Qt,n[1640+P]=Qt;for(let P=0;P<41;P++)n[P*41]=Qt,n[P*41+41-1]=Qt;const r=[],o=4,a=(P,F,A,I,O=0)=>r.push({kind:P,x:F/o,y:A/o,dx:0,dy:0,model:I,rot:O}),c=Math.floor(41/2),l=c*o,h=40*o,u=o*.5,f=h-u,p=Math.max(1,Math.round(f/5.89)),_=7;for(let P=0;P<=p;P++){const F=u+f*P/p;Math.abs(F-l)>_&&(a("wall",F,u,"wall_straight_hd",0),a("wall",F,h,"wall_straight_hd",0)),Math.abs(F-l)>_&&(a("wall",u,F,"wall_straight_hd",Math.PI/2),a("wall",h,F,"wall_straight_hd",Math.PI/2))}for(const[P,F]of[[u,u],[h,u],[h,h],[u,h]])a("wall",P,F,"wall_corner_hd",0);for(const[P,F]of[[u+9,u+9],[h-9,u+9],[h-9,h-9],[u+9,h-9]])a("prop",P,F,"round_watchtower_hd",0);a("gate",l,h,"gate_open_hd",Math.PI),a("gate",l,u,"gate_open_hd",0);const g=(P,F)=>Math.atan2(-(l-P),-(l-F)),m=8;for(let P=-2;P<=2;P++)for(let F=-2;F<=2;F++)P===0&&F===0||a("prop",l+P*m,l+F*m,"castle_courtyard_plaza_hd",0);a("well",l,l,"grand_royal_fountain_hd",s()*Math.PI);for(const[P,F,A]of[[0,-7,0],[0,7,0],[-7,0,Math.PI/2],[7,0,Math.PI/2]])a("prop",l+P,l+F,"courtyard_balustrade_hd",A);for(const[P,F,A]of[[-17,-17,Math.PI/4],[17,-17,-Math.PI/4],[-17,17,3*Math.PI/4],[17,17,-3*Math.PI/4]])a("prop",l+P,l+F,"courtyard_arcade_hd",A);const M=(P,F,A)=>{const I=Math.max(1,Math.round(Math.abs(A-F)/4.31));for(let O=0;O<=I;O++)a("prop",P,F+(A-F)*O/I,"cobble_straight_hd",0)};M(l,l+20,h-8),M(l,l-20,u+8);const b=(P,F,A)=>{const I=Math.max(1,Math.round(Math.abs(A-F)/4.31));for(let O=0;O<=I;O++)a("prop",F+(A-F)*O/I,P,"cobble_straight_hd",Math.PI/2)};b(l,l+20,h-10),b(l,l-20,u+10);const v=[["inn","inn_hd",l,l-40],["inn","tavern_hd",l-31,l-31],["blacksmith","blacksmith_open_forge_hd",l+34,l-12],["magician","magic_library_shop_hd",l+24,l-38],["stall","general_store_hd",l-34,l-8],["prop","house_large_hd",l+30,l+30],["prop","house_medium_hd",l-40,l+20],["prop","house_small_hd",l-12,l-44],["prop","house_small_hd",l-22,l+44],["prop","house_medium_hd",l+46,l-20],["prop","house_large_hd",l-52,l+40],["prop","house_medium_hd",l+52,l+40],["prop","house_small_hd",l+40,l+8],["prop","house_small_hd",l-44,l-34],["prop","house_large_hd",l+62,l+18],["prop","house_medium_hd",l-62,l-8],["prop","house_small_hd",l-8,l-62],["prop","house_medium_hd",l+12,l+62],["prop","house_small_hd",l-62,l+44],["prop","house_large_hd",l+62,l+56],["prop","house_small_hd",l+34,l-58],["prop","house_medium_hd",l-30,l-60],["prop","house_small_hd",l+58,l-40],["prop","house_medium_hd",l-60,l+58]];for(let P=0;P<10;P++){const F=P/10*Math.PI*2+.31,A=66+s()*6;v.push(["prop",s()<.55?"house_small_hd":s()<.8?"house_medium_hd":"house_large_hd",l+Math.cos(F)*A,l+Math.sin(F)*A])}for(const[P,F,A,I]of v)a(P,A,I,F,g(A,I));for(const P of[l+30,l+44,l+58,l-30,l-44,l-58])a("lamp",l-3,P,"lamp_post"),a("lamp",l+3,P,"lamp_post"),a("lamp",P,l-3,"lamp_post"),a("lamp",P,l+3,"lamp_post");const w=[["food_stall_hd",l-9,l-13],["fruit_vegetable_stall_hd",l+9,l-13],["merchant_stall_hd",l-17,l-4],["cloth_stall_hd",l+17,l-4],["potion_stall_hd",l-17,l+9],["accessories_stall_hd",l+17,l+9],["weapon_stall_hd",l-8,l+16],["merchant_stall_hd",l+8,l+16],["food_stall_hd",l-6,l+30],["fruit_vegetable_stall_hd",l+6,l+30],["merchant_stall_hd",l-13,l+38],["cloth_stall_hd",l+13,l+38],["potion_stall_hd",l-6,l+46],["accessories_stall_hd",l+6,l+46]];for(const[P,F,A]of w)a("stall",F,A,P,g(F,A));for(let P=0;P<12;P++){const F=P/12*Math.PI*2;a("lamp",l+Math.cos(F)*21,l+Math.sin(F)*21,"lamp_post")}for(const[P,F,A,I]of[[l-22,l+22,"crate_stack",.3],[l+22,l+22,"barrel_cluster",0],[l+22,l-22,"cart",.8],[l-22,l-22,"cart",1.9],[l+30,l+2,"hay_bale",0],[l-30,l-14,"hay_bale",.5],[l+26,l+30,"wood_fence",.3],[l-26,l+34,"wood_fence",1.2],[l+3,l-24,"signpost",.6],[l-3,l+24,"signpost",-.6],[l-48,l-30,"crate_stack",.2],[l+48,l+16,"barrel_cluster",.7],[l-36,l+36,"cart",.4],[l+36,l-36,"hay_bale",1],[l+56,l+56,"barrel_cluster",.1],[l-56,l+8,"crate_stack",.9]])a("prop",P,F,A,I);const S=l+50,T=l+50;a("prop",S,T,"stone_arch_bridge_hd",Math.PI/4),a("prop",S-8,T+8,"waterfront_dock_hd",Math.PI/4),a("prop",S+8,T-10,"wooden_bridge_hd",Math.PI/4);const x=[],R=(P,F)=>Math.abs(P-l)<8||Math.abs(F-l)<8||Math.abs(P-l)<7&&F<u+16&&F>0||Math.abs(P-l)<7&&F>h-16||Math.abs(F-l)<7&&P<u+16||Math.abs(F-l)<7&&P>h-16||v.some(([,,A,I])=>Math.hypot(P-A,F-I)<11)||w.some(([,A,I])=>Math.hypot(P-A,F-I)<8)||Math.hypot(P-(l+50),F-(l+50))<24;for(let P=0;P<1200&&x.length<130;P++){const F=u+6+s()*(h-u-12),A=u+6+s()*(h-u-12);Math.hypot(F-l,A-l)<38||R(F,A)||x.push([F,A])}for(let P=u+9;P<=h-9;P+=6.5)Math.abs(P-l)<14||(x.push([P+(s()-.5)*2,u+4.5+s()*2]),x.push([P+(s()-.5)*2,h-4.5-s()*2]),x.push([u+4.5+s()*2,P+(s()-.5)*2]),x.push([h-4.5-s()*2,P+(s()-.5)*2]));for(const[P,F]of x)a("prop",P,F,s()<.6?"tree_small":"tree_large",s()*Math.PI*2);return n[1599+c]=ns,n[41+c]=Tr,{name:"Market Town",w:41,h:41,tiles:n,start:{x:c,y:35,dir:0},decor:r,kind:"town"}}const Dn=[{x:0,y:-1},{x:1,y:0},{x:0,y:1},{x:-1,y:0}],Fp="modulepreload",Op=function(i){return"/spiritdeck/"+i},qh={},Bp=function(e,t,n){let s=Promise.resolve();if(t&&t.length>0){let o=function(l){return Promise.all(l.map(h=>Promise.resolve(h).then(u=>({status:"fulfilled",value:u}),u=>({status:"rejected",reason:u}))))};document.getElementsByTagName("link");const a=document.querySelector("meta[property=csp-nonce]"),c=a?.nonce||a?.getAttribute("nonce");s=o(t.map(l=>{if(l=Op(l),l in qh)return;qh[l]=!0;const h=l.endsWith(".css"),u=h?'[rel="stylesheet"]':"";if(document.querySelector(`link[href="${l}"]${u}`))return;const f=document.createElement("link");if(f.rel=h?"stylesheet":Fp,h||(f.as="script"),f.crossOrigin="",f.href=l,c&&f.setAttribute("nonce",c),document.head.appendChild(f),h)return new Promise((d,p)=>{f.addEventListener("load",d),f.addEventListener("error",()=>p(new Error(`Unable to preload CSS for ${l}`)))})}))}function r(o){const a=new Event("vite:preloadError",{cancelable:!0});if(a.payload=o,window.dispatchEvent(a),!a.defaultPrevented)throw o}return s.then(o=>{for(const a of o||[])a.status==="rejected"&&r(a.reason);return e().catch(r)})};/**
 * @license
 * Copyright 2010-2026 Three.js Authors
 * SPDX-License-Identifier: MIT
 */const Uc="186",kp=0,Yh=1,zp=2,qo=1,od=2,Er=3,Xi=0,un=1,Vn=2,oi=0,Lr=1,as=2,$h=3,Kh=4,Hp=5,Fs=100,Vp=101,Gp=102,Wp=103,Xp=104,qp=200,Yp=201,$p=202,Kp=203,ad=204,ld=205,Jp=206,Zp=207,jp=208,Qp=209,em=210,tm=211,nm=212,im=213,sm=214,Dl=0,Ul=1,Fl=2,zr=3,Ol=4,Bl=5,kl=6,zl=7,Fc=0,rm=1,om=2,ai=0,Oc=1,Bc=2,kc=3,ba=4,zc=5,Hc=6,Vc=7,Jh="attached",am="detached",cd=300,ls=301,Qs=302,Da=303,Ua=304,Ta=306,qi=1e3,ii=1001,ra=1002,kt=1003,hd=1004,Ar=1005,zt=1006,Yo=1007,bi=1008,xn=1009,ud=1010,fd=1011,Hr=1012,Gc=1013,li=1014,In=1015,fn=1016,Wc=1017,Xc=1018,Vr=1020,dd=35902,pd=35899,md=1021,gd=1022,Ln=1023,Ri=1026,ss=1027,qc=1028,Yc=1029,cs=1030,$c=1031,Kc=1033,$o=33776,Ko=33777,Jo=33778,Zo=33779,Hl=35840,Vl=35841,Gl=35842,Wl=35843,Xl=36196,ql=37492,Yl=37496,$l=37488,Kl=37489,oa=37490,Jl=37491,Zl=37808,jl=37809,Ql=37810,ec=37811,tc=37812,nc=37813,ic=37814,sc=37815,rc=37816,oc=37817,ac=37818,lc=37819,cc=37820,hc=37821,uc=36492,fc=36494,dc=36495,pc=36283,mc=36284,aa=36285,gc=36286,Gr=2300,Wr=2301,Fa=2302,Zh=2303,jh=2400,Qh=2401,eu=2402,lm=2500,cm=0,_d=1,_c=2,hm=3200,la=0,um=1,Hi="",Pt="srgb",yn="srgb-linear",ca="linear",_t="srgb",Oa=7680,fm=519,dm=512,pm=513,mm=514,Jc=515,gm=516,_m=517,Zc=518,xm=519,xd=35044,tu="300 es",si=2e3,Xr=2001;function vm(i){for(let e=i.length-1;e>=0;--e)if(i[e]>=65535)return!0;return!1}function Mm(i){return ArrayBuffer.isView(i)&&!(i instanceof DataView)}function qr(i){return document.createElementNS("http://www.w3.org/1999/xhtml",i)}function ym(){const i=qr("canvas");return i.style.display="block",i}const nu={};function ha(...i){const e="THREE."+i.shift();console.log(e,...i)}function vd(i){const e=i[0];if(typeof e=="string"&&e.startsWith("TSL:")){const t=i[1];t&&t.isStackTrace?i[0]+=" "+t.getLocation():i[1]='Stack trace not available. Enable "THREE.Node.captureStackTrace" to capture stack traces.'}return i}function Oe(...i){i=vd(i);const e="THREE."+i.shift();{const t=i[0];t&&t.isStackTrace?console.warn(t.getError(e)):console.warn(e,...i)}}function $e(...i){i=vd(i);const e="THREE."+i.shift();{const t=i[0];t&&t.isStackTrace?console.error(t.getError(e)):console.error(e,...i)}}function Xs(...i){const e=i.join(" ");e in nu||(nu[e]=!0,Oe(...i))}function Sm(i,e,t){return new Promise(function(n,s){function r(){switch(i.clientWaitSync(e,i.SYNC_FLUSH_COMMANDS_BIT,0)){case i.WAIT_FAILED:s();break;case i.TIMEOUT_EXPIRED:setTimeout(r,t);break;default:n()}}setTimeout(r,t)})}const wm={[Dl]:Ul,[Fl]:kl,[Ol]:zl,[zr]:Bl,[Ul]:Dl,[kl]:Fl,[zl]:Ol,[Bl]:zr};class fs{addEventListener(e,t){this._listeners===void 0&&(this._listeners={});const n=this._listeners;n[e]===void 0&&(n[e]=[]),n[e].indexOf(t)===-1&&n[e].push(t)}hasEventListener(e,t){const n=this._listeners;return n===void 0?!1:n[e]!==void 0&&n[e].indexOf(t)!==-1}removeEventListener(e,t){const n=this._listeners;if(n===void 0)return;const s=n[e];if(s!==void 0){const r=s.indexOf(t);r!==-1&&s.splice(r,1)}}dispatchEvent(e){const t=this._listeners;if(t===void 0)return;const n=t[e.type];if(n!==void 0){e.target=this;const s=n.slice(0);for(let r=0,o=s.length;r<o;r++)s[r].call(this,e);e.target=null}}}const Kt=["00","01","02","03","04","05","06","07","08","09","0a","0b","0c","0d","0e","0f","10","11","12","13","14","15","16","17","18","19","1a","1b","1c","1d","1e","1f","20","21","22","23","24","25","26","27","28","29","2a","2b","2c","2d","2e","2f","30","31","32","33","34","35","36","37","38","39","3a","3b","3c","3d","3e","3f","40","41","42","43","44","45","46","47","48","49","4a","4b","4c","4d","4e","4f","50","51","52","53","54","55","56","57","58","59","5a","5b","5c","5d","5e","5f","60","61","62","63","64","65","66","67","68","69","6a","6b","6c","6d","6e","6f","70","71","72","73","74","75","76","77","78","79","7a","7b","7c","7d","7e","7f","80","81","82","83","84","85","86","87","88","89","8a","8b","8c","8d","8e","8f","90","91","92","93","94","95","96","97","98","99","9a","9b","9c","9d","9e","9f","a0","a1","a2","a3","a4","a5","a6","a7","a8","a9","aa","ab","ac","ad","ae","af","b0","b1","b2","b3","b4","b5","b6","b7","b8","b9","ba","bb","bc","bd","be","bf","c0","c1","c2","c3","c4","c5","c6","c7","c8","c9","ca","cb","cc","cd","ce","cf","d0","d1","d2","d3","d4","d5","d6","d7","d8","d9","da","db","dc","dd","de","df","e0","e1","e2","e3","e4","e5","e6","e7","e8","e9","ea","eb","ec","ed","ee","ef","f0","f1","f2","f3","f4","f5","f6","f7","f8","f9","fa","fb","fc","fd","fe","ff"];let iu=1234567;const Nr=Math.PI/180,er=180/Math.PI;function Un(){const i=Math.random()*4294967295|0,e=Math.random()*4294967295|0,t=Math.random()*4294967295|0,n=Math.random()*4294967295|0;return(Kt[i&255]+Kt[i>>8&255]+Kt[i>>16&255]+Kt[i>>24&255]+"-"+Kt[e&255]+Kt[e>>8&255]+"-"+Kt[e>>16&15|64]+Kt[e>>24&255]+"-"+Kt[t&63|128]+Kt[t>>8&255]+"-"+Kt[t>>16&255]+Kt[t>>24&255]+Kt[n&255]+Kt[n>>8&255]+Kt[n>>16&255]+Kt[n>>24&255]).toLowerCase()}function st(i,e,t){return Math.max(e,Math.min(t,i))}function jc(i,e){return(i%e+e)%e}function bm(i,e,t,n,s){return n+(i-e)*(s-n)/(t-e)}function Tm(i,e,t){return i!==e?(t-i)/(e-i):0}function Dr(i,e,t){return(1-t)*i+t*e}function Em(i,e,t,n){return Dr(i,e,1-Math.exp(-t*n))}function Am(i,e=1){return e-Math.abs(jc(i,e*2)-e)}function Rm(i,e,t){return i<=e?0:i>=t?1:(i=(i-e)/(t-e),i*i*(3-2*i))}function Cm(i,e,t){return i<=e?0:i>=t?1:(i=(i-e)/(t-e),i*i*i*(i*(i*6-15)+10))}function Pm(i,e){return i+Math.floor(Math.random()*(e-i+1))}function Im(i,e){return i+Math.random()*(e-i)}function Lm(i){return i*(.5-Math.random())}function Nm(i){i!==void 0&&(iu=i);let e=iu+=1831565813;return e=Math.imul(e^e>>>15,e|1),e^=e+Math.imul(e^e>>>7,e|61),((e^e>>>14)>>>0)/4294967296}function Dm(i){return i*Nr}function Um(i){return i*er}function Fm(i){return i>0&&Number.isInteger(i)&&2**Math.round(Math.log2(i))===i}function Om(i){return Math.pow(2,Math.ceil(Math.log(i)/Math.LN2))}function Bm(i){return Math.pow(2,Math.floor(Math.log(i)/Math.LN2))}function km(i,e,t,n,s){const r=Math.cos,o=Math.sin,a=r(t/2),c=o(t/2),l=r((e+n)/2),h=o((e+n)/2),u=r((e-n)/2),f=o((e-n)/2),d=r((n-e)/2),p=o((n-e)/2);switch(s){case"XYX":i.set(a*h,c*u,c*f,a*l);break;case"YZY":i.set(c*f,a*h,c*u,a*l);break;case"ZXZ":i.set(c*u,c*f,a*h,a*l);break;case"XZX":i.set(a*h,c*p,c*d,a*l);break;case"YXY":i.set(c*d,a*h,c*p,a*l);break;case"ZYZ":i.set(c*p,c*d,a*h,a*l);break;default:Oe("MathUtils: .setQuaternionFromProperEuler() encountered an unknown order: "+s)}}function Gn(i,e){switch(e.constructor){case Float32Array:return i;case Uint32Array:return i/4294967295;case Uint16Array:return i/65535;case Uint8Array:case Uint8ClampedArray:return i/255;case Int32Array:return Math.max(i/2147483647,-1);case Int16Array:return Math.max(i/32767,-1);case Int8Array:return Math.max(i/127,-1);default:throw new Error("THREE.MathUtils: Invalid component type.")}}function xt(i,e){switch(e.constructor){case Float32Array:return i;case Uint32Array:return Math.round(i*4294967295);case Uint16Array:return Math.round(i*65535);case Uint8Array:case Uint8ClampedArray:return Math.round(i*255);case Int32Array:return Math.round(i*2147483647);case Int16Array:return Math.round(i*32767);case Int8Array:return Math.round(i*127);default:throw new Error("THREE.MathUtils: Invalid component type.")}}const zm={DEG2RAD:Nr,RAD2DEG:er,generateUUID:Un,clamp:st,euclideanModulo:jc,mapLinear:bm,inverseLerp:Tm,lerp:Dr,damp:Em,pingpong:Am,smoothstep:Rm,smootherstep:Cm,randInt:Pm,randFloat:Im,randFloatSpread:Lm,seededRandom:Nm,degToRad:Dm,radToDeg:Um,isPowerOfTwo:Fm,ceilPowerOfTwo:Om,floorPowerOfTwo:Bm,setQuaternionFromProperEuler:km,normalize:xt,denormalize:Gn},Rh=class Rh{constructor(e=0,t=0){this.x=e,this.y=t}get width(){return this.x}set width(e){this.x=e}get height(){return this.y}set height(e){this.y=e}set(e,t){return this.x=e,this.y=t,this}setScalar(e){return this.x=e,this.y=e,this}setX(e){return this.x=e,this}setY(e){return this.y=e,this}setComponent(e,t){switch(e){case 0:this.x=t;break;case 1:this.y=t;break;default:throw new Error("THREE.Vector2: index is out of range: "+e)}return this}getComponent(e){switch(e){case 0:return this.x;case 1:return this.y;default:throw new Error("THREE.Vector2: index is out of range: "+e)}}clone(){return new this.constructor(this.x,this.y)}copy(e){return this.x=e.x,this.y=e.y,this}add(e){return this.x+=e.x,this.y+=e.y,this}addScalar(e){return this.x+=e,this.y+=e,this}addVectors(e,t){return this.x=e.x+t.x,this.y=e.y+t.y,this}addScaledVector(e,t){return this.x+=e.x*t,this.y+=e.y*t,this}sub(e){return this.x-=e.x,this.y-=e.y,this}subScalar(e){return this.x-=e,this.y-=e,this}subVectors(e,t){return this.x=e.x-t.x,this.y=e.y-t.y,this}multiply(e){return this.x*=e.x,this.y*=e.y,this}multiplyScalar(e){return this.x*=e,this.y*=e,this}divide(e){return this.x/=e.x,this.y/=e.y,this}divideScalar(e){return this.multiplyScalar(1/e)}applyMatrix3(e){const t=this.x,n=this.y,s=e.elements;return this.x=s[0]*t+s[3]*n+s[6],this.y=s[1]*t+s[4]*n+s[7],this}min(e){return this.x=Math.min(this.x,e.x),this.y=Math.min(this.y,e.y),this}max(e){return this.x=Math.max(this.x,e.x),this.y=Math.max(this.y,e.y),this}clamp(e,t){return this.x=st(this.x,e.x,t.x),this.y=st(this.y,e.y,t.y),this}clampScalar(e,t){return this.x=st(this.x,e,t),this.y=st(this.y,e,t),this}clampLength(e,t){const n=this.length();return this.divideScalar(n||1).multiplyScalar(st(n,e,t))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this}negate(){return this.x=-this.x,this.y=-this.y,this}dot(e){return this.x*e.x+this.y*e.y}cross(e){return this.x*e.y-this.y*e.x}lengthSq(){return this.x*this.x+this.y*this.y}length(){return Math.sqrt(this.x*this.x+this.y*this.y)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)}normalize(){return this.divideScalar(this.length()||1)}angle(){return Math.atan2(-this.y,-this.x)+Math.PI}angleTo(e){const t=Math.sqrt(this.lengthSq()*e.lengthSq());if(t===0)return Math.PI/2;const n=this.dot(e)/t;return Math.acos(st(n,-1,1))}distanceTo(e){return Math.sqrt(this.distanceToSquared(e))}distanceToSquared(e){const t=this.x-e.x,n=this.y-e.y;return t*t+n*n}manhattanDistanceTo(e){return Math.abs(this.x-e.x)+Math.abs(this.y-e.y)}setLength(e){return this.normalize().multiplyScalar(e)}lerp(e,t){return this.x+=(e.x-this.x)*t,this.y+=(e.y-this.y)*t,this}lerpVectors(e,t,n){return this.x=e.x+(t.x-e.x)*n,this.y=e.y+(t.y-e.y)*n,this}equals(e){return e.x===this.x&&e.y===this.y}fromArray(e,t=0){return this.x=e[t],this.y=e[t+1],this}toArray(e=[],t=0){return e[t]=this.x,e[t+1]=this.y,e}fromBufferAttribute(e,t){return this.x=e.getX(t),this.y=e.getY(t),this}rotateAround(e,t){const n=Math.cos(t),s=Math.sin(t),r=this.x-e.x,o=this.y-e.y;return this.x=r*n-o*s+e.x,this.y=r*s+o*n+e.y,this}random(){return this.x=Math.random(),this.y=Math.random(),this}*[Symbol.iterator](){yield this.x,yield this.y}};Rh.prototype.isVector2=!0;let oe=Rh;class hi{constructor(e=0,t=0,n=0,s=1){this.isQuaternion=!0,this._x=e,this._y=t,this._z=n,this._w=s}static slerpFlat(e,t,n,s,r,o,a){let c=n[s+0],l=n[s+1],h=n[s+2],u=n[s+3],f=r[o+0],d=r[o+1],p=r[o+2],_=r[o+3];if(u!==_||c!==f||l!==d||h!==p){let g=c*f+l*d+h*p+u*_;g<0&&(f=-f,d=-d,p=-p,_=-_,g=-g);let m=1-a;if(g<.9995){const M=Math.acos(g),b=Math.sin(M);m=Math.sin(m*M)/b,a=Math.sin(a*M)/b,c=c*m+f*a,l=l*m+d*a,h=h*m+p*a,u=u*m+_*a}else{c=c*m+f*a,l=l*m+d*a,h=h*m+p*a,u=u*m+_*a;const M=1/Math.sqrt(c*c+l*l+h*h+u*u);c*=M,l*=M,h*=M,u*=M}}e[t]=c,e[t+1]=l,e[t+2]=h,e[t+3]=u}static multiplyQuaternionsFlat(e,t,n,s,r,o){const a=n[s],c=n[s+1],l=n[s+2],h=n[s+3],u=r[o],f=r[o+1],d=r[o+2],p=r[o+3];return e[t]=a*p+h*u+c*d-l*f,e[t+1]=c*p+h*f+l*u-a*d,e[t+2]=l*p+h*d+a*f-c*u,e[t+3]=h*p-a*u-c*f-l*d,e}get x(){return this._x}set x(e){this._x=e,this._onChangeCallback()}get y(){return this._y}set y(e){this._y=e,this._onChangeCallback()}get z(){return this._z}set z(e){this._z=e,this._onChangeCallback()}get w(){return this._w}set w(e){this._w=e,this._onChangeCallback()}set(e,t,n,s){return this._x=e,this._y=t,this._z=n,this._w=s,this._onChangeCallback(),this}clone(){return new this.constructor(this._x,this._y,this._z,this._w)}copy(e){return this._x=e.x,this._y=e.y,this._z=e.z,this._w=e.w,this._onChangeCallback(),this}setFromEuler(e,t=!0){const n=e._x,s=e._y,r=e._z,o=e._order,a=Math.cos,c=Math.sin,l=a(n/2),h=a(s/2),u=a(r/2),f=c(n/2),d=c(s/2),p=c(r/2);switch(o){case"XYZ":this._x=f*h*u+l*d*p,this._y=l*d*u-f*h*p,this._z=l*h*p+f*d*u,this._w=l*h*u-f*d*p;break;case"YXZ":this._x=f*h*u+l*d*p,this._y=l*d*u-f*h*p,this._z=l*h*p-f*d*u,this._w=l*h*u+f*d*p;break;case"ZXY":this._x=f*h*u-l*d*p,this._y=l*d*u+f*h*p,this._z=l*h*p+f*d*u,this._w=l*h*u-f*d*p;break;case"ZYX":this._x=f*h*u-l*d*p,this._y=l*d*u+f*h*p,this._z=l*h*p-f*d*u,this._w=l*h*u+f*d*p;break;case"YZX":this._x=f*h*u+l*d*p,this._y=l*d*u+f*h*p,this._z=l*h*p-f*d*u,this._w=l*h*u-f*d*p;break;case"XZY":this._x=f*h*u-l*d*p,this._y=l*d*u-f*h*p,this._z=l*h*p+f*d*u,this._w=l*h*u+f*d*p;break;default:Oe("Quaternion: .setFromEuler() encountered an unknown order: "+o)}return t===!0&&this._onChangeCallback(),this}setFromAxisAngle(e,t){const n=t/2,s=Math.sin(n);return this._x=e.x*s,this._y=e.y*s,this._z=e.z*s,this._w=Math.cos(n),this._onChangeCallback(),this}setFromRotationMatrix(e){const t=e.elements,n=t[0],s=t[4],r=t[8],o=t[1],a=t[5],c=t[9],l=t[2],h=t[6],u=t[10],f=n+a+u;if(f>0){const d=.5/Math.sqrt(f+1);this._w=.25/d,this._x=(h-c)*d,this._y=(r-l)*d,this._z=(o-s)*d}else if(n>a&&n>u){const d=2*Math.sqrt(1+n-a-u);this._w=(h-c)/d,this._x=.25*d,this._y=(s+o)/d,this._z=(r+l)/d}else if(a>u){const d=2*Math.sqrt(1+a-n-u);this._w=(r-l)/d,this._x=(s+o)/d,this._y=.25*d,this._z=(c+h)/d}else{const d=2*Math.sqrt(1+u-n-a);this._w=(o-s)/d,this._x=(r+l)/d,this._y=(c+h)/d,this._z=.25*d}return this._onChangeCallback(),this}setFromUnitVectors(e,t){let n=e.dot(t)+1;return n<1e-8?(n=0,Math.abs(e.x)>Math.abs(e.z)?(this._x=-e.y,this._y=e.x,this._z=0,this._w=n):(this._x=0,this._y=-e.z,this._z=e.y,this._w=n)):(this._x=e.y*t.z-e.z*t.y,this._y=e.z*t.x-e.x*t.z,this._z=e.x*t.y-e.y*t.x,this._w=n),this.normalize()}angleTo(e){return 2*Math.acos(Math.abs(st(this.dot(e),-1,1)))}rotateTowards(e,t){const n=this.angleTo(e);if(n===0)return this;const s=Math.min(1,t/n);return this.slerp(e,s),this}identity(){return this.set(0,0,0,1)}invert(){return this.conjugate()}conjugate(){return this._x*=-1,this._y*=-1,this._z*=-1,this._onChangeCallback(),this}dot(e){return this._x*e._x+this._y*e._y+this._z*e._z+this._w*e._w}lengthSq(){return this._x*this._x+this._y*this._y+this._z*this._z+this._w*this._w}length(){return Math.sqrt(this._x*this._x+this._y*this._y+this._z*this._z+this._w*this._w)}normalize(){let e=this.length();return e===0?(this._x=0,this._y=0,this._z=0,this._w=1):(e=1/e,this._x=this._x*e,this._y=this._y*e,this._z=this._z*e,this._w=this._w*e),this._onChangeCallback(),this}multiply(e){return this.multiplyQuaternions(this,e)}premultiply(e){return this.multiplyQuaternions(e,this)}multiplyQuaternions(e,t){const n=e._x,s=e._y,r=e._z,o=e._w,a=t._x,c=t._y,l=t._z,h=t._w;return this._x=n*h+o*a+s*l-r*c,this._y=s*h+o*c+r*a-n*l,this._z=r*h+o*l+n*c-s*a,this._w=o*h-n*a-s*c-r*l,this._onChangeCallback(),this}slerp(e,t){let n=e._x,s=e._y,r=e._z,o=e._w,a=this.dot(e);a<0&&(n=-n,s=-s,r=-r,o=-o,a=-a);let c=1-t;if(a<.9995){const l=Math.acos(a),h=Math.sin(l);c=Math.sin(c*l)/h,t=Math.sin(t*l)/h,this._x=this._x*c+n*t,this._y=this._y*c+s*t,this._z=this._z*c+r*t,this._w=this._w*c+o*t,this._onChangeCallback()}else this._x=this._x*c+n*t,this._y=this._y*c+s*t,this._z=this._z*c+r*t,this._w=this._w*c+o*t,this.normalize();return this}slerpQuaternions(e,t,n){return this.copy(e).slerp(t,n)}random(){const e=2*Math.PI*Math.random(),t=2*Math.PI*Math.random(),n=Math.random(),s=Math.sqrt(1-n),r=Math.sqrt(n);return this.set(s*Math.sin(e),s*Math.cos(e),r*Math.sin(t),r*Math.cos(t))}equals(e){return e._x===this._x&&e._y===this._y&&e._z===this._z&&e._w===this._w}fromArray(e,t=0){return this._x=e[t],this._y=e[t+1],this._z=e[t+2],this._w=e[t+3],this._onChangeCallback(),this}toArray(e=[],t=0){return e[t]=this._x,e[t+1]=this._y,e[t+2]=this._z,e[t+3]=this._w,e}fromBufferAttribute(e,t){return this._x=e.getX(t),this._y=e.getY(t),this._z=e.getZ(t),this._w=e.getW(t),this._onChangeCallback(),this}toJSON(){return this.toArray()}_onChange(e){return this._onChangeCallback=e,this}_onChangeCallback(){}*[Symbol.iterator](){yield this._x,yield this._y,yield this._z,yield this._w}}const Ch=class Ch{constructor(e=0,t=0,n=0){this.x=e,this.y=t,this.z=n}set(e,t,n){return n===void 0&&(n=this.z),this.x=e,this.y=t,this.z=n,this}setScalar(e){return this.x=e,this.y=e,this.z=e,this}setX(e){return this.x=e,this}setY(e){return this.y=e,this}setZ(e){return this.z=e,this}setComponent(e,t){switch(e){case 0:this.x=t;break;case 1:this.y=t;break;case 2:this.z=t;break;default:throw new Error("THREE.Vector3: index is out of range: "+e)}return this}getComponent(e){switch(e){case 0:return this.x;case 1:return this.y;case 2:return this.z;default:throw new Error("THREE.Vector3: index is out of range: "+e)}}clone(){return new this.constructor(this.x,this.y,this.z)}copy(e){return this.x=e.x,this.y=e.y,this.z=e.z,this}add(e){return this.x+=e.x,this.y+=e.y,this.z+=e.z,this}addScalar(e){return this.x+=e,this.y+=e,this.z+=e,this}addVectors(e,t){return this.x=e.x+t.x,this.y=e.y+t.y,this.z=e.z+t.z,this}addScaledVector(e,t){return this.x+=e.x*t,this.y+=e.y*t,this.z+=e.z*t,this}sub(e){return this.x-=e.x,this.y-=e.y,this.z-=e.z,this}subScalar(e){return this.x-=e,this.y-=e,this.z-=e,this}subVectors(e,t){return this.x=e.x-t.x,this.y=e.y-t.y,this.z=e.z-t.z,this}multiply(e){return this.x*=e.x,this.y*=e.y,this.z*=e.z,this}multiplyScalar(e){return this.x*=e,this.y*=e,this.z*=e,this}multiplyVectors(e,t){return this.x=e.x*t.x,this.y=e.y*t.y,this.z=e.z*t.z,this}applyEuler(e){return this.applyQuaternion(su.setFromEuler(e))}applyAxisAngle(e,t){return this.applyQuaternion(su.setFromAxisAngle(e,t))}applyMatrix3(e){const t=this.x,n=this.y,s=this.z,r=e.elements;return this.x=r[0]*t+r[3]*n+r[6]*s,this.y=r[1]*t+r[4]*n+r[7]*s,this.z=r[2]*t+r[5]*n+r[8]*s,this}applyNormalMatrix(e){return this.applyMatrix3(e).normalize()}applyMatrix4(e){const t=this.x,n=this.y,s=this.z,r=e.elements,o=1/(r[3]*t+r[7]*n+r[11]*s+r[15]);return this.x=(r[0]*t+r[4]*n+r[8]*s+r[12])*o,this.y=(r[1]*t+r[5]*n+r[9]*s+r[13])*o,this.z=(r[2]*t+r[6]*n+r[10]*s+r[14])*o,this}applyQuaternion(e){const t=this.x,n=this.y,s=this.z,r=e.x,o=e.y,a=e.z,c=e.w,l=2*(o*s-a*n),h=2*(a*t-r*s),u=2*(r*n-o*t);return this.x=t+c*l+o*u-a*h,this.y=n+c*h+a*l-r*u,this.z=s+c*u+r*h-o*l,this}project(e){return this.applyMatrix4(e.matrixWorldInverse).applyMatrix4(e.projectionMatrix)}unproject(e){return this.applyMatrix4(e.projectionMatrixInverse).applyMatrix4(e.matrixWorld)}transformDirection(e){const t=this.x,n=this.y,s=this.z,r=e.elements;return this.x=r[0]*t+r[4]*n+r[8]*s,this.y=r[1]*t+r[5]*n+r[9]*s,this.z=r[2]*t+r[6]*n+r[10]*s,this.normalize()}divide(e){return this.x/=e.x,this.y/=e.y,this.z/=e.z,this}divideScalar(e){return this.multiplyScalar(1/e)}min(e){return this.x=Math.min(this.x,e.x),this.y=Math.min(this.y,e.y),this.z=Math.min(this.z,e.z),this}max(e){return this.x=Math.max(this.x,e.x),this.y=Math.max(this.y,e.y),this.z=Math.max(this.z,e.z),this}clamp(e,t){return this.x=st(this.x,e.x,t.x),this.y=st(this.y,e.y,t.y),this.z=st(this.z,e.z,t.z),this}clampScalar(e,t){return this.x=st(this.x,e,t),this.y=st(this.y,e,t),this.z=st(this.z,e,t),this}clampLength(e,t){const n=this.length();return this.divideScalar(n||1).multiplyScalar(st(n,e,t))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this.z=Math.floor(this.z),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this.z=Math.ceil(this.z),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this.z=Math.round(this.z),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this.z=Math.trunc(this.z),this}negate(){return this.x=-this.x,this.y=-this.y,this.z=-this.z,this}dot(e){return this.x*e.x+this.y*e.y+this.z*e.z}lengthSq(){return this.x*this.x+this.y*this.y+this.z*this.z}length(){return Math.sqrt(this.x*this.x+this.y*this.y+this.z*this.z)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)+Math.abs(this.z)}normalize(){return this.divideScalar(this.length()||1)}setLength(e){return this.normalize().multiplyScalar(e)}lerp(e,t){return this.x+=(e.x-this.x)*t,this.y+=(e.y-this.y)*t,this.z+=(e.z-this.z)*t,this}lerpVectors(e,t,n){return this.x=e.x+(t.x-e.x)*n,this.y=e.y+(t.y-e.y)*n,this.z=e.z+(t.z-e.z)*n,this}cross(e){return this.crossVectors(this,e)}crossVectors(e,t){const n=e.x,s=e.y,r=e.z,o=t.x,a=t.y,c=t.z;return this.x=s*c-r*a,this.y=r*o-n*c,this.z=n*a-s*o,this}projectOnVector(e){const t=e.lengthSq();if(t===0)return this.set(0,0,0);const n=e.dot(this)/t;return this.copy(e).multiplyScalar(n)}projectOnPlane(e){return Ba.copy(this).projectOnVector(e),this.sub(Ba)}reflect(e){return this.sub(Ba.copy(e).multiplyScalar(2*this.dot(e)))}angleTo(e){const t=Math.sqrt(this.lengthSq()*e.lengthSq());if(t===0)return Math.PI/2;const n=this.dot(e)/t;return Math.acos(st(n,-1,1))}distanceTo(e){return Math.sqrt(this.distanceToSquared(e))}distanceToSquared(e){const t=this.x-e.x,n=this.y-e.y,s=this.z-e.z;return t*t+n*n+s*s}manhattanDistanceTo(e){return Math.abs(this.x-e.x)+Math.abs(this.y-e.y)+Math.abs(this.z-e.z)}setFromSpherical(e){return this.setFromSphericalCoords(e.radius,e.phi,e.theta)}setFromSphericalCoords(e,t,n){const s=Math.sin(t)*e;return this.x=s*Math.sin(n),this.y=Math.cos(t)*e,this.z=s*Math.cos(n),this}setFromCylindrical(e){return this.setFromCylindricalCoords(e.radius,e.theta,e.y)}setFromCylindricalCoords(e,t,n){return this.x=e*Math.sin(t),this.y=n,this.z=e*Math.cos(t),this}setFromMatrixPosition(e){const t=e.elements;return this.x=t[12],this.y=t[13],this.z=t[14],this}setFromMatrixScale(e){const t=this.setFromMatrixColumn(e,0).length(),n=this.setFromMatrixColumn(e,1).length(),s=this.setFromMatrixColumn(e,2).length();return this.x=t,this.y=n,this.z=s,this}setFromMatrixColumn(e,t){return this.fromArray(e.elements,t*4)}setFromMatrix3Column(e,t){return this.fromArray(e.elements,t*3)}setFromEuler(e){return this.x=e._x,this.y=e._y,this.z=e._z,this}setFromColor(e){return this.x=e.r,this.y=e.g,this.z=e.b,this}equals(e){return e.x===this.x&&e.y===this.y&&e.z===this.z}fromArray(e,t=0){return this.x=e[t],this.y=e[t+1],this.z=e[t+2],this}toArray(e=[],t=0){return e[t]=this.x,e[t+1]=this.y,e[t+2]=this.z,e}fromBufferAttribute(e,t){return this.x=e.getX(t),this.y=e.getY(t),this.z=e.getZ(t),this}random(){return this.x=Math.random(),this.y=Math.random(),this.z=Math.random(),this}randomDirection(){const e=Math.random()*Math.PI*2,t=Math.random()*2-1,n=Math.sqrt(1-t*t);return this.x=n*Math.cos(e),this.y=t,this.z=n*Math.sin(e),this}*[Symbol.iterator](){yield this.x,yield this.y,yield this.z}};Ch.prototype.isVector3=!0;let B=Ch;const Ba=new B,su=new hi,Ph=class Ph{constructor(e,t,n,s,r,o,a,c,l){this.elements=[1,0,0,0,1,0,0,0,1],e!==void 0&&this.set(e,t,n,s,r,o,a,c,l)}set(e,t,n,s,r,o,a,c,l){const h=this.elements;return h[0]=e,h[1]=s,h[2]=a,h[3]=t,h[4]=r,h[5]=c,h[6]=n,h[7]=o,h[8]=l,this}identity(){return this.set(1,0,0,0,1,0,0,0,1),this}copy(e){const t=this.elements,n=e.elements;return t[0]=n[0],t[1]=n[1],t[2]=n[2],t[3]=n[3],t[4]=n[4],t[5]=n[5],t[6]=n[6],t[7]=n[7],t[8]=n[8],this}extractBasis(e,t,n){return e.setFromMatrix3Column(this,0),t.setFromMatrix3Column(this,1),n.setFromMatrix3Column(this,2),this}setFromMatrix4(e){const t=e.elements;return this.set(t[0],t[4],t[8],t[1],t[5],t[9],t[2],t[6],t[10]),this}multiply(e){return this.multiplyMatrices(this,e)}premultiply(e){return this.multiplyMatrices(e,this)}multiplyMatrices(e,t){const n=e.elements,s=t.elements,r=this.elements,o=n[0],a=n[3],c=n[6],l=n[1],h=n[4],u=n[7],f=n[2],d=n[5],p=n[8],_=s[0],g=s[3],m=s[6],M=s[1],b=s[4],v=s[7],w=s[2],S=s[5],T=s[8];return r[0]=o*_+a*M+c*w,r[3]=o*g+a*b+c*S,r[6]=o*m+a*v+c*T,r[1]=l*_+h*M+u*w,r[4]=l*g+h*b+u*S,r[7]=l*m+h*v+u*T,r[2]=f*_+d*M+p*w,r[5]=f*g+d*b+p*S,r[8]=f*m+d*v+p*T,this}multiplyScalar(e){const t=this.elements;return t[0]*=e,t[3]*=e,t[6]*=e,t[1]*=e,t[4]*=e,t[7]*=e,t[2]*=e,t[5]*=e,t[8]*=e,this}determinant(){const e=this.elements,t=e[0],n=e[1],s=e[2],r=e[3],o=e[4],a=e[5],c=e[6],l=e[7],h=e[8];return t*o*h-t*a*l-n*r*h+n*a*c+s*r*l-s*o*c}invert(){const e=this.elements,t=e[0],n=e[1],s=e[2],r=e[3],o=e[4],a=e[5],c=e[6],l=e[7],h=e[8],u=h*o-a*l,f=a*c-h*r,d=l*r-o*c,p=t*u+n*f+s*d;if(p===0)return this.set(0,0,0,0,0,0,0,0,0);const _=1/p;return e[0]=u*_,e[1]=(s*l-h*n)*_,e[2]=(a*n-s*o)*_,e[3]=f*_,e[4]=(h*t-s*c)*_,e[5]=(s*r-a*t)*_,e[6]=d*_,e[7]=(n*c-l*t)*_,e[8]=(o*t-n*r)*_,this}transpose(){let e;const t=this.elements;return e=t[1],t[1]=t[3],t[3]=e,e=t[2],t[2]=t[6],t[6]=e,e=t[5],t[5]=t[7],t[7]=e,this}getNormalMatrix(e){return this.setFromMatrix4(e).invert().transpose()}transposeIntoArray(e){const t=this.elements;return e[0]=t[0],e[1]=t[3],e[2]=t[6],e[3]=t[1],e[4]=t[4],e[5]=t[7],e[6]=t[2],e[7]=t[5],e[8]=t[8],this}setUvTransform(e,t,n,s,r,o,a){const c=Math.cos(r),l=Math.sin(r);return this.set(n*c,n*l,-n*(c*o+l*a)+o+e,-s*l,s*c,-s*(-l*o+c*a)+a+t,0,0,1),this}scale(e,t){return Xs("Matrix3: .scale() is deprecated. Use .makeScale() instead."),this.premultiply(ka.makeScale(e,t)),this}rotate(e){return Xs("Matrix3: .rotate() is deprecated. Use .makeRotation() instead."),this.premultiply(ka.makeRotation(-e)),this}translate(e,t){return Xs("Matrix3: .translate() is deprecated. Use .makeTranslation() instead."),this.premultiply(ka.makeTranslation(e,t)),this}makeTranslation(e,t){return e.isVector2?this.set(1,0,e.x,0,1,e.y,0,0,1):this.set(1,0,e,0,1,t,0,0,1),this}makeRotation(e){const t=Math.cos(e),n=Math.sin(e);return this.set(t,-n,0,n,t,0,0,0,1),this}makeScale(e,t){return this.set(e,0,0,0,t,0,0,0,1),this}equals(e){const t=this.elements,n=e.elements;for(let s=0;s<9;s++)if(t[s]!==n[s])return!1;return!0}fromArray(e,t=0){for(let n=0;n<9;n++)this.elements[n]=e[n+t];return this}toArray(e=[],t=0){const n=this.elements;return e[t]=n[0],e[t+1]=n[1],e[t+2]=n[2],e[t+3]=n[3],e[t+4]=n[4],e[t+5]=n[5],e[t+6]=n[6],e[t+7]=n[7],e[t+8]=n[8],e}clone(){return new this.constructor().fromArray(this.elements)}};Ph.prototype.isMatrix3=!0;let Ze=Ph;const ka=new Ze,ru=new Ze().set(.4123908,.3575843,.1804808,.212639,.7151687,.0721923,.0193308,.1191948,.9505322),ou=new Ze().set(3.2409699,-1.5373832,-.4986108,-.9692436,1.8759675,.0415551,.0556301,-.203977,1.0569715);function Hm(){const i={enabled:!0,workingColorSpace:yn,spaces:{},convert:function(s,r,o){return this.enabled===!1||r===o||!r||!o||(this.spaces[r].transfer===_t&&(s.r=Ai(s.r),s.g=Ai(s.g),s.b=Ai(s.b)),this.spaces[r].primaries!==this.spaces[o].primaries&&(s.applyMatrix3(this.spaces[r].toXYZ),s.applyMatrix3(this.spaces[o].fromXYZ)),this.spaces[o].transfer===_t&&(s.r=qs(s.r),s.g=qs(s.g),s.b=qs(s.b))),s},workingToColorSpace:function(s,r){return this.convert(s,this.workingColorSpace,r)},colorSpaceToWorking:function(s,r){return this.convert(s,r,this.workingColorSpace)},getPrimaries:function(s){return this.spaces[s].primaries},getTransfer:function(s){return s===Hi?ca:this.spaces[s].transfer},getToneMappingMode:function(s){return this.spaces[s].outputColorSpaceConfig.toneMappingMode||"standard"},getLuminanceCoefficients:function(s,r=this.workingColorSpace){return s.fromArray(this.spaces[r].luminanceCoefficients)},define:function(s){Object.assign(this.spaces,s)},_getMatrix:function(s,r,o){return s.copy(this.spaces[r].toXYZ).multiply(this.spaces[o].fromXYZ)},_getDrawingBufferColorSpace:function(s){return this.spaces[s].outputColorSpaceConfig.drawingBufferColorSpace},_getUnpackColorSpace:function(s=this.workingColorSpace){return this.spaces[s].workingColorSpaceConfig.unpackColorSpace},fromWorkingColorSpace:function(s,r){return Xs("ColorManagement: .fromWorkingColorSpace() has been renamed to .workingToColorSpace()."),i.workingToColorSpace(s,r)},toWorkingColorSpace:function(s,r){return Xs("ColorManagement: .toWorkingColorSpace() has been renamed to .colorSpaceToWorking()."),i.colorSpaceToWorking(s,r)}},e=[.64,.33,.3,.6,.15,.06],t=[.2126,.7152,.0722],n=[.3127,.329];return i.define({[yn]:{primaries:e,whitePoint:n,transfer:ca,toXYZ:ru,fromXYZ:ou,luminanceCoefficients:t,workingColorSpaceConfig:{unpackColorSpace:Pt},outputColorSpaceConfig:{drawingBufferColorSpace:Pt}},[Pt]:{primaries:e,whitePoint:n,transfer:_t,toXYZ:ru,fromXYZ:ou,luminanceCoefficients:t,outputColorSpaceConfig:{drawingBufferColorSpace:Pt}}}),i}const at=Hm();function Ai(i){return i<.04045?i*.0773993808:Math.pow(i*.9478672986+.0521327014,2.4)}function qs(i){return i<.0031308?i*12.92:1.055*Math.pow(i,.41666)-.055}let gs;class Vm{static getDataURL(e,t="image/png"){if(/^data:/i.test(e.src)||typeof HTMLCanvasElement>"u")return e.src;let n;if(e instanceof HTMLCanvasElement)n=e;else{gs===void 0&&(gs=qr("canvas")),gs.width=e.width,gs.height=e.height;const s=gs.getContext("2d");e instanceof ImageData?s.putImageData(e,0,0):s.drawImage(e,0,0,e.width,e.height),n=gs}return n.toDataURL(t)}static sRGBToLinear(e){if(typeof HTMLImageElement<"u"&&e instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&e instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&e instanceof ImageBitmap){const t=qr("canvas");t.width=e.width,t.height=e.height;const n=t.getContext("2d");n.drawImage(e,0,0,e.width,e.height);const s=n.getImageData(0,0,e.width,e.height),r=s.data;for(let o=0;o<r.length;o++)r[o]=Ai(r[o]/255)*255;return n.putImageData(s,0,0),t}else if(e.data){const t=e.data.slice(0);for(let n=0;n<t.length;n++)t instanceof Uint8Array||t instanceof Uint8ClampedArray?t[n]=Math.floor(Ai(t[n]/255)*255):t[n]=Ai(t[n]);return{data:t,width:e.width,height:e.height}}else return Oe("ImageUtils.sRGBToLinear(): Unsupported image type. No color space conversion applied."),e}}let Gm=0;class Qc{constructor(e=null){this.isTextureSource=!0,Object.defineProperty(this,"id",{value:Gm++}),this.uuid=Un(),this.data=e,this.dataReady=!0,this.version=0}getSize(e){const t=this.data;return typeof HTMLVideoElement<"u"&&t instanceof HTMLVideoElement?e.set(t.videoWidth,t.videoHeight,0):typeof VideoFrame<"u"&&t instanceof VideoFrame?e.set(t.displayWidth,t.displayHeight,0):t!==null?e.set(t.width,t.height,t.depth||0):e.set(0,0,0),e}set needsUpdate(e){e===!0&&this.version++}toJSON(e){const t=e===void 0||typeof e=="string";if(!t&&e.images[this.uuid]!==void 0)return e.images[this.uuid];const n={uuid:this.uuid,url:""},s=this.data;if(s!==null){let r;if(Array.isArray(s)){r=[];for(let o=0,a=s.length;o<a;o++)s[o].isDataTexture?r.push(za(s[o].image)):r.push(za(s[o]))}else r=za(s);n.url=r}return t||(e.images[this.uuid]=n),n}}function za(i){return typeof HTMLImageElement<"u"&&i instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&i instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&i instanceof ImageBitmap?Vm.getDataURL(i):i.data?{data:Array.from(i.data),width:i.width,height:i.height,type:i.data.constructor.name}:(Oe("Texture: Unable to serialize Texture."),{})}let Wm=0;const Ha=new B;class Ht extends fs{constructor(e=Ht.DEFAULT_IMAGE,t=Ht.DEFAULT_MAPPING,n=ii,s=ii,r=zt,o=bi,a=Ln,c=xn,l=Ht.DEFAULT_ANISOTROPY,h=Hi){super(),this.isTexture=!0,Object.defineProperty(this,"id",{value:Wm++}),this.uuid=Un(),this.name="",this.source=new Qc(e),this.mipmaps=[],this.mapping=t,this.channel=0,this.wrapS=n,this.wrapT=s,this.magFilter=r,this.minFilter=o,this.anisotropy=l,this.format=a,this.internalFormat=null,this.type=c,this.offset=new oe(0,0),this.repeat=new oe(1,1),this.center=new oe(0,0),this.rotation=0,this.matrixAutoUpdate=!0,this.matrix=new Ze,this.generateMipmaps=!0,this.premultiplyAlpha=!1,this.flipY=!0,this.unpackAlignment=4,this.colorSpace=h,this.userData={},this.updateRanges=[],this.version=0,this.onUpdate=null,this.renderTarget=null,this.isRenderTargetTexture=!1,this.isArrayTexture=!!(e&&e.depth&&e.depth>1),this.pmremVersion=0,this.normalized=!1}get width(){return this.source.getSize(Ha).x}get height(){return this.source.getSize(Ha).y}get depth(){return this.source.getSize(Ha).z}get image(){return this.source.data}set image(e){this.source.data=e}updateMatrix(){this.matrix.setUvTransform(this.offset.x,this.offset.y,this.repeat.x,this.repeat.y,this.rotation,this.center.x,this.center.y)}addUpdateRange(e,t){this.updateRanges.push({start:e,count:t})}clearUpdateRanges(){this.updateRanges.length=0}clone(){return new this.constructor().copy(this)}copy(e){return this.name=e.name,this.source=e.source,this.mipmaps=e.mipmaps.slice(0),this.mapping=e.mapping,this.channel=e.channel,this.wrapS=e.wrapS,this.wrapT=e.wrapT,this.magFilter=e.magFilter,this.minFilter=e.minFilter,this.anisotropy=e.anisotropy,this.format=e.format,this.internalFormat=e.internalFormat,this.type=e.type,this.normalized=e.normalized,this.offset.copy(e.offset),this.repeat.copy(e.repeat),this.center.copy(e.center),this.rotation=e.rotation,this.matrixAutoUpdate=e.matrixAutoUpdate,this.matrix.copy(e.matrix),this.generateMipmaps=e.generateMipmaps,this.premultiplyAlpha=e.premultiplyAlpha,this.flipY=e.flipY,this.unpackAlignment=e.unpackAlignment,this.colorSpace=e.colorSpace,this.renderTarget=e.renderTarget,this.isRenderTargetTexture=e.isRenderTargetTexture,this.isArrayTexture=e.isArrayTexture,this.userData=JSON.parse(JSON.stringify(e.userData)),this.needsUpdate=!0,this}setValues(e){for(const t in e){const n=e[t];if(n===void 0){Oe(`Texture.setValues(): parameter '${t}' has value of undefined.`);continue}const s=this[t];if(s===void 0){Oe(`Texture.setValues(): property '${t}' does not exist.`);continue}s&&n&&s.isVector2&&n.isVector2||s&&n&&s.isVector3&&n.isVector3||s&&n&&s.isMatrix3&&n.isMatrix3?s.copy(n):this[t]=n}}toJSON(e){const t=e===void 0||typeof e=="string";if(!t&&e.textures[this.uuid]!==void 0)return e.textures[this.uuid];const n={metadata:{version:4.7,type:"Texture",generator:"Texture.toJSON"},uuid:this.uuid,name:this.name,image:this.source.toJSON(e).uuid,mapping:this.mapping,channel:this.channel,repeat:[this.repeat.x,this.repeat.y],offset:[this.offset.x,this.offset.y],center:[this.center.x,this.center.y],rotation:this.rotation,wrap:[this.wrapS,this.wrapT],format:this.format,internalFormat:this.internalFormat,type:this.type,normalized:this.normalized,colorSpace:this.colorSpace,minFilter:this.minFilter,magFilter:this.magFilter,anisotropy:this.anisotropy,flipY:this.flipY,generateMipmaps:this.generateMipmaps,premultiplyAlpha:this.premultiplyAlpha,unpackAlignment:this.unpackAlignment};return Object.keys(this.userData).length>0&&(n.userData=this.userData),t||(e.textures[this.uuid]=n),n}dispose(){this.dispatchEvent({type:"dispose"})}transformUv(e){if(this.mapping!==cd)return e;if(e.applyMatrix3(this.matrix),e.x<0||e.x>1)switch(this.wrapS){case qi:e.x=e.x-Math.floor(e.x);break;case ii:e.x=e.x<0?0:1;break;case ra:Math.abs(Math.floor(e.x)%2)===1?e.x=Math.ceil(e.x)-e.x:e.x=e.x-Math.floor(e.x);break}if(e.y<0||e.y>1)switch(this.wrapT){case qi:e.y=e.y-Math.floor(e.y);break;case ii:e.y=e.y<0?0:1;break;case ra:Math.abs(Math.floor(e.y)%2)===1?e.y=Math.ceil(e.y)-e.y:e.y=e.y-Math.floor(e.y);break}return this.flipY&&(e.y=1-e.y),e}set needsUpdate(e){e===!0&&(this.version++,this.source.needsUpdate=!0)}set needsPMREMUpdate(e){e===!0&&this.pmremVersion++}}Ht.DEFAULT_IMAGE=null;Ht.DEFAULT_MAPPING=cd;Ht.DEFAULT_ANISOTROPY=1;const Ih=class Ih{constructor(e=0,t=0,n=0,s=1){this.x=e,this.y=t,this.z=n,this.w=s}get width(){return this.z}set width(e){this.z=e}get height(){return this.w}set height(e){this.w=e}set(e,t,n,s){return this.x=e,this.y=t,this.z=n,this.w=s,this}setScalar(e){return this.x=e,this.y=e,this.z=e,this.w=e,this}setX(e){return this.x=e,this}setY(e){return this.y=e,this}setZ(e){return this.z=e,this}setW(e){return this.w=e,this}setComponent(e,t){switch(e){case 0:this.x=t;break;case 1:this.y=t;break;case 2:this.z=t;break;case 3:this.w=t;break;default:throw new Error("THREE.Vector4: index is out of range: "+e)}return this}getComponent(e){switch(e){case 0:return this.x;case 1:return this.y;case 2:return this.z;case 3:return this.w;default:throw new Error("THREE.Vector4: index is out of range: "+e)}}clone(){return new this.constructor(this.x,this.y,this.z,this.w)}copy(e){return this.x=e.x,this.y=e.y,this.z=e.z,this.w=e.w!==void 0?e.w:1,this}add(e){return this.x+=e.x,this.y+=e.y,this.z+=e.z,this.w+=e.w,this}addScalar(e){return this.x+=e,this.y+=e,this.z+=e,this.w+=e,this}addVectors(e,t){return this.x=e.x+t.x,this.y=e.y+t.y,this.z=e.z+t.z,this.w=e.w+t.w,this}addScaledVector(e,t){return this.x+=e.x*t,this.y+=e.y*t,this.z+=e.z*t,this.w+=e.w*t,this}sub(e){return this.x-=e.x,this.y-=e.y,this.z-=e.z,this.w-=e.w,this}subScalar(e){return this.x-=e,this.y-=e,this.z-=e,this.w-=e,this}subVectors(e,t){return this.x=e.x-t.x,this.y=e.y-t.y,this.z=e.z-t.z,this.w=e.w-t.w,this}multiply(e){return this.x*=e.x,this.y*=e.y,this.z*=e.z,this.w*=e.w,this}multiplyScalar(e){return this.x*=e,this.y*=e,this.z*=e,this.w*=e,this}applyMatrix4(e){const t=this.x,n=this.y,s=this.z,r=this.w,o=e.elements;return this.x=o[0]*t+o[4]*n+o[8]*s+o[12]*r,this.y=o[1]*t+o[5]*n+o[9]*s+o[13]*r,this.z=o[2]*t+o[6]*n+o[10]*s+o[14]*r,this.w=o[3]*t+o[7]*n+o[11]*s+o[15]*r,this}divide(e){return this.x/=e.x,this.y/=e.y,this.z/=e.z,this.w/=e.w,this}divideScalar(e){return this.multiplyScalar(1/e)}setAxisAngleFromQuaternion(e){this.w=2*Math.acos(e.w);const t=Math.sqrt(1-e.w*e.w);return t<1e-4?(this.x=1,this.y=0,this.z=0):(this.x=e.x/t,this.y=e.y/t,this.z=e.z/t),this}setAxisAngleFromRotationMatrix(e){let t,n,s,r;const c=e.elements,l=c[0],h=c[4],u=c[8],f=c[1],d=c[5],p=c[9],_=c[2],g=c[6],m=c[10];if(Math.abs(h-f)<.01&&Math.abs(u-_)<.01&&Math.abs(p-g)<.01){if(Math.abs(h+f)<.1&&Math.abs(u+_)<.1&&Math.abs(p+g)<.1&&Math.abs(l+d+m-3)<.1)return this.set(1,0,0,0),this;t=Math.PI;const b=(l+1)/2,v=(d+1)/2,w=(m+1)/2,S=(h+f)/4,T=(u+_)/4,x=(p+g)/4;return b>v&&b>w?b<.01?(n=0,s=.707106781,r=.707106781):(n=Math.sqrt(b),s=S/n,r=T/n):v>w?v<.01?(n=.707106781,s=0,r=.707106781):(s=Math.sqrt(v),n=S/s,r=x/s):w<.01?(n=.707106781,s=.707106781,r=0):(r=Math.sqrt(w),n=T/r,s=x/r),this.set(n,s,r,t),this}let M=Math.sqrt((g-p)*(g-p)+(u-_)*(u-_)+(f-h)*(f-h));return Math.abs(M)<.001&&(M=1),this.x=(g-p)/M,this.y=(u-_)/M,this.z=(f-h)/M,this.w=Math.acos((l+d+m-1)/2),this}setFromMatrixPosition(e){const t=e.elements;return this.x=t[12],this.y=t[13],this.z=t[14],this.w=t[15],this}min(e){return this.x=Math.min(this.x,e.x),this.y=Math.min(this.y,e.y),this.z=Math.min(this.z,e.z),this.w=Math.min(this.w,e.w),this}max(e){return this.x=Math.max(this.x,e.x),this.y=Math.max(this.y,e.y),this.z=Math.max(this.z,e.z),this.w=Math.max(this.w,e.w),this}clamp(e,t){return this.x=st(this.x,e.x,t.x),this.y=st(this.y,e.y,t.y),this.z=st(this.z,e.z,t.z),this.w=st(this.w,e.w,t.w),this}clampScalar(e,t){return this.x=st(this.x,e,t),this.y=st(this.y,e,t),this.z=st(this.z,e,t),this.w=st(this.w,e,t),this}clampLength(e,t){const n=this.length();return this.divideScalar(n||1).multiplyScalar(st(n,e,t))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this.z=Math.floor(this.z),this.w=Math.floor(this.w),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this.z=Math.ceil(this.z),this.w=Math.ceil(this.w),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this.z=Math.round(this.z),this.w=Math.round(this.w),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this.z=Math.trunc(this.z),this.w=Math.trunc(this.w),this}negate(){return this.x=-this.x,this.y=-this.y,this.z=-this.z,this.w=-this.w,this}dot(e){return this.x*e.x+this.y*e.y+this.z*e.z+this.w*e.w}lengthSq(){return this.x*this.x+this.y*this.y+this.z*this.z+this.w*this.w}length(){return Math.sqrt(this.x*this.x+this.y*this.y+this.z*this.z+this.w*this.w)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)+Math.abs(this.z)+Math.abs(this.w)}normalize(){return this.divideScalar(this.length()||1)}setLength(e){return this.normalize().multiplyScalar(e)}lerp(e,t){return this.x+=(e.x-this.x)*t,this.y+=(e.y-this.y)*t,this.z+=(e.z-this.z)*t,this.w+=(e.w-this.w)*t,this}lerpVectors(e,t,n){return this.x=e.x+(t.x-e.x)*n,this.y=e.y+(t.y-e.y)*n,this.z=e.z+(t.z-e.z)*n,this.w=e.w+(t.w-e.w)*n,this}equals(e){return e.x===this.x&&e.y===this.y&&e.z===this.z&&e.w===this.w}fromArray(e,t=0){return this.x=e[t],this.y=e[t+1],this.z=e[t+2],this.w=e[t+3],this}toArray(e=[],t=0){return e[t]=this.x,e[t+1]=this.y,e[t+2]=this.z,e[t+3]=this.w,e}fromBufferAttribute(e,t){return this.x=e.getX(t),this.y=e.getY(t),this.z=e.getZ(t),this.w=e.getW(t),this}random(){return this.x=Math.random(),this.y=Math.random(),this.z=Math.random(),this.w=Math.random(),this}*[Symbol.iterator](){yield this.x,yield this.y,yield this.z,yield this.w}};Ih.prototype.isVector4=!0;let St=Ih;class Xm extends fs{constructor(e=1,t=1,n={}){super(),n=Object.assign({generateMipmaps:!1,internalFormat:null,minFilter:zt,depthBuffer:!0,stencilBuffer:!1,resolveColorBuffer:!0,resolveDepthBuffer:!0,resolveStencilBuffer:!0,storeMultisampledColorBuffer:!0,storeMultisampledDepthBuffer:!0,storeMultisampledStencilBuffer:!0,depthTexture:null,samples:0,count:1,depth:1,multiview:!1,useArrayDepthTexture:!1},n),this.isRenderTarget=!0,this.width=e,this.height=t,this.depth=n.depth,this.scissor=new St(0,0,e,t),this.scissorTest=!1,this.viewport=new St(0,0,e,t),this.textures=[];const s={width:e,height:t,depth:n.depth},r=new Ht(s),o=n.count;for(let a=0;a<o;a++)this.textures[a]=r.clone(),this.textures[a].isRenderTargetTexture=!0,this.textures[a].renderTarget=this;this._setTextureOptions(n),this.depthBuffer=n.depthBuffer,this.stencilBuffer=n.stencilBuffer,this.resolveColorBuffer=n.resolveColorBuffer,this.resolveDepthBuffer=n.resolveDepthBuffer,this.resolveStencilBuffer=n.resolveStencilBuffer,this.storeMultisampledColorBuffer=n.storeMultisampledColorBuffer,this.storeMultisampledDepthBuffer=n.storeMultisampledDepthBuffer,this.storeMultisampledStencilBuffer=n.storeMultisampledStencilBuffer,this._depthTexture=null,this.depthTexture=n.depthTexture,this.samples=n.samples,this.multiview=n.multiview,this.useArrayDepthTexture=n.useArrayDepthTexture}_setTextureOptions(e={}){const t={minFilter:zt,generateMipmaps:!1,flipY:!1,internalFormat:null};e.mapping!==void 0&&(t.mapping=e.mapping),e.wrapS!==void 0&&(t.wrapS=e.wrapS),e.wrapT!==void 0&&(t.wrapT=e.wrapT),e.wrapR!==void 0&&(t.wrapR=e.wrapR),e.magFilter!==void 0&&(t.magFilter=e.magFilter),e.minFilter!==void 0&&(t.minFilter=e.minFilter),e.format!==void 0&&(t.format=e.format),e.type!==void 0&&(t.type=e.type),e.anisotropy!==void 0&&(t.anisotropy=e.anisotropy),e.colorSpace!==void 0&&(t.colorSpace=e.colorSpace),e.flipY!==void 0&&(t.flipY=e.flipY),e.generateMipmaps!==void 0&&(t.generateMipmaps=e.generateMipmaps),e.internalFormat!==void 0&&(t.internalFormat=e.internalFormat);for(let n=0;n<this.textures.length;n++)this.textures[n].setValues(t)}get texture(){return this.textures[0]}set texture(e){this.textures[0]=e}set depthTexture(e){this._depthTexture!==null&&this._depthTexture.renderTarget===this&&(this._depthTexture.renderTarget=null),e!==null&&e.renderTarget===null&&(e.renderTarget=this),this._depthTexture=e}get depthTexture(){return this._depthTexture}setSize(e,t,n=1){if(this.width!==e||this.height!==t||this.depth!==n){this.width=e,this.height=t,this.depth=n;for(let s=0,r=this.textures.length;s<r;s++)this.textures[s].image.width=e,this.textures[s].image.height=t,this.textures[s].image.depth=n,this.textures[s].isData3DTexture!==!0&&(this.textures[s].isArrayTexture=this.textures[s].image.depth>1);this.dispose()}this.viewport.set(0,0,e,t),this.scissor.set(0,0,e,t)}clone(){return new this.constructor().copy(this)}copy(e){this.width=e.width,this.height=e.height,this.depth=e.depth,this.scissor.copy(e.scissor),this.scissorTest=e.scissorTest,this.viewport.copy(e.viewport),this.textures.length=0;for(let t=0,n=e.textures.length;t<n;t++){this.textures[t]=e.textures[t].clone(),this.textures[t].isRenderTargetTexture=!0,this.textures[t].renderTarget=this;const s=Object.assign({},e.textures[t].image);this.textures[t].source=new Qc(s)}if(this.depthBuffer=e.depthBuffer,this.stencilBuffer=e.stencilBuffer,this.resolveColorBuffer=e.resolveColorBuffer,this.resolveDepthBuffer=e.resolveDepthBuffer,this.resolveStencilBuffer=e.resolveStencilBuffer,this.storeMultisampledColorBuffer=e.storeMultisampledColorBuffer,this.storeMultisampledDepthBuffer=e.storeMultisampledDepthBuffer,this.storeMultisampledStencilBuffer=e.storeMultisampledStencilBuffer,e.depthTexture!==null)if(e.depthTexture.renderTarget===e){const t=e.depthTexture.clone();t.renderTarget=null,this.depthTexture=t}else this.depthTexture=e.depthTexture;return this.samples=e.samples,this.multiview=e.multiview,this.useArrayDepthTexture=e.useArrayDepthTexture,this}dispose(){this.dispatchEvent({type:"dispose"})}}class cn extends Xm{constructor(e=1,t=1,n={}){super(e,t,n),this.isWebGLRenderTarget=!0}}class Md extends Ht{constructor(e=null,t=1,n=1,s=1){super(null),this.isDataArrayTexture=!0,this.image={data:e,width:t,height:n,depth:s},this.magFilter=kt,this.minFilter=kt,this.wrapR=ii,this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1,this.layerUpdates=new Set}copy(e){return super.copy(e),this.wrapR=e.wrapR,this}addLayerUpdate(e){this.layerUpdates.add(e)}clearLayerUpdates(){this.layerUpdates.clear()}}class qm extends Ht{constructor(e=null,t=1,n=1,s=1){super(null),this.isData3DTexture=!0,this.image={data:e,width:t,height:n,depth:s},this.magFilter=kt,this.minFilter=kt,this.wrapR=ii,this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1}copy(e){return super.copy(e),this.wrapR=e.wrapR,this}}const ya=class ya{constructor(e,t,n,s,r,o,a,c,l,h,u,f,d,p,_,g){this.elements=[1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1],e!==void 0&&this.set(e,t,n,s,r,o,a,c,l,h,u,f,d,p,_,g)}set(e,t,n,s,r,o,a,c,l,h,u,f,d,p,_,g){const m=this.elements;return m[0]=e,m[4]=t,m[8]=n,m[12]=s,m[1]=r,m[5]=o,m[9]=a,m[13]=c,m[2]=l,m[6]=h,m[10]=u,m[14]=f,m[3]=d,m[7]=p,m[11]=_,m[15]=g,this}identity(){return this.set(1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1),this}clone(){return new ya().fromArray(this.elements)}copy(e){const t=this.elements,n=e.elements;return t[0]=n[0],t[1]=n[1],t[2]=n[2],t[3]=n[3],t[4]=n[4],t[5]=n[5],t[6]=n[6],t[7]=n[7],t[8]=n[8],t[9]=n[9],t[10]=n[10],t[11]=n[11],t[12]=n[12],t[13]=n[13],t[14]=n[14],t[15]=n[15],this}copyPosition(e){const t=this.elements,n=e.elements;return t[12]=n[12],t[13]=n[13],t[14]=n[14],this}setFromMatrix3(e){const t=e.elements;return this.set(t[0],t[3],t[6],0,t[1],t[4],t[7],0,t[2],t[5],t[8],0,0,0,0,1),this}extractBasis(e,t,n){return this.determinantAffine()===0?(e.set(1,0,0),t.set(0,1,0),n.set(0,0,1),this):(e.setFromMatrixColumn(this,0),t.setFromMatrixColumn(this,1),n.setFromMatrixColumn(this,2),this)}makeBasis(e,t,n){return this.set(e.x,t.x,n.x,0,e.y,t.y,n.y,0,e.z,t.z,n.z,0,0,0,0,1),this}extractRotation(e){if(e.determinantAffine()===0)return this.identity();const t=this.elements,n=e.elements,s=1/_s.setFromMatrixColumn(e,0).length(),r=1/_s.setFromMatrixColumn(e,1).length(),o=1/_s.setFromMatrixColumn(e,2).length();return t[0]=n[0]*s,t[1]=n[1]*s,t[2]=n[2]*s,t[3]=0,t[4]=n[4]*r,t[5]=n[5]*r,t[6]=n[6]*r,t[7]=0,t[8]=n[8]*o,t[9]=n[9]*o,t[10]=n[10]*o,t[11]=0,t[12]=0,t[13]=0,t[14]=0,t[15]=1,this}makeRotationFromEuler(e){const t=this.elements,n=e.x,s=e.y,r=e.z,o=Math.cos(n),a=Math.sin(n),c=Math.cos(s),l=Math.sin(s),h=Math.cos(r),u=Math.sin(r);if(e.order==="XYZ"){const f=o*h,d=o*u,p=a*h,_=a*u;t[0]=c*h,t[4]=-c*u,t[8]=l,t[1]=d+p*l,t[5]=f-_*l,t[9]=-a*c,t[2]=_-f*l,t[6]=p+d*l,t[10]=o*c}else if(e.order==="YXZ"){const f=c*h,d=c*u,p=l*h,_=l*u;t[0]=f+_*a,t[4]=p*a-d,t[8]=o*l,t[1]=o*u,t[5]=o*h,t[9]=-a,t[2]=d*a-p,t[6]=_+f*a,t[10]=o*c}else if(e.order==="ZXY"){const f=c*h,d=c*u,p=l*h,_=l*u;t[0]=f-_*a,t[4]=-o*u,t[8]=p+d*a,t[1]=d+p*a,t[5]=o*h,t[9]=_-f*a,t[2]=-o*l,t[6]=a,t[10]=o*c}else if(e.order==="ZYX"){const f=o*h,d=o*u,p=a*h,_=a*u;t[0]=c*h,t[4]=p*l-d,t[8]=f*l+_,t[1]=c*u,t[5]=_*l+f,t[9]=d*l-p,t[2]=-l,t[6]=a*c,t[10]=o*c}else if(e.order==="YZX"){const f=o*c,d=o*l,p=a*c,_=a*l;t[0]=c*h,t[4]=_-f*u,t[8]=p*u+d,t[1]=u,t[5]=o*h,t[9]=-a*h,t[2]=-l*h,t[6]=d*u+p,t[10]=f-_*u}else if(e.order==="XZY"){const f=o*c,d=o*l,p=a*c,_=a*l;t[0]=c*h,t[4]=-u,t[8]=l*h,t[1]=f*u+_,t[5]=o*h,t[9]=d*u-p,t[2]=p*u-d,t[6]=a*h,t[10]=_*u+f}return t[3]=0,t[7]=0,t[11]=0,t[12]=0,t[13]=0,t[14]=0,t[15]=1,this}makeRotationFromQuaternion(e){return this.compose(Ym,e,$m)}lookAt(e,t,n){const s=this.elements;return pn.subVectors(e,t),pn.lengthSq()===0&&(pn.z=1),pn.normalize(),Li.crossVectors(n,pn),Li.lengthSq()===0&&(Math.abs(n.z)===1?pn.x+=1e-4:pn.z+=1e-4,pn.normalize(),Li.crossVectors(n,pn)),Li.normalize(),lo.crossVectors(pn,Li),s[0]=Li.x,s[4]=lo.x,s[8]=pn.x,s[1]=Li.y,s[5]=lo.y,s[9]=pn.y,s[2]=Li.z,s[6]=lo.z,s[10]=pn.z,this}multiply(e){return this.multiplyMatrices(this,e)}premultiply(e){return this.multiplyMatrices(e,this)}multiplyMatrices(e,t){const n=e.elements,s=t.elements,r=this.elements,o=n[0],a=n[4],c=n[8],l=n[12],h=n[1],u=n[5],f=n[9],d=n[13],p=n[2],_=n[6],g=n[10],m=n[14],M=n[3],b=n[7],v=n[11],w=n[15],S=s[0],T=s[4],x=s[8],R=s[12],D=s[1],P=s[5],F=s[9],A=s[13],I=s[2],O=s[6],H=s[10],C=s[14],N=s[3],U=s[7],k=s[11],V=s[15];return r[0]=o*S+a*D+c*I+l*N,r[4]=o*T+a*P+c*O+l*U,r[8]=o*x+a*F+c*H+l*k,r[12]=o*R+a*A+c*C+l*V,r[1]=h*S+u*D+f*I+d*N,r[5]=h*T+u*P+f*O+d*U,r[9]=h*x+u*F+f*H+d*k,r[13]=h*R+u*A+f*C+d*V,r[2]=p*S+_*D+g*I+m*N,r[6]=p*T+_*P+g*O+m*U,r[10]=p*x+_*F+g*H+m*k,r[14]=p*R+_*A+g*C+m*V,r[3]=M*S+b*D+v*I+w*N,r[7]=M*T+b*P+v*O+w*U,r[11]=M*x+b*F+v*H+w*k,r[15]=M*R+b*A+v*C+w*V,this}multiplyScalar(e){const t=this.elements;return t[0]*=e,t[4]*=e,t[8]*=e,t[12]*=e,t[1]*=e,t[5]*=e,t[9]*=e,t[13]*=e,t[2]*=e,t[6]*=e,t[10]*=e,t[14]*=e,t[3]*=e,t[7]*=e,t[11]*=e,t[15]*=e,this}determinant(){const e=this.elements,t=e[0],n=e[4],s=e[8],r=e[12],o=e[1],a=e[5],c=e[9],l=e[13],h=e[2],u=e[6],f=e[10],d=e[14],p=e[3],_=e[7],g=e[11],m=e[15],M=c*d-l*f,b=a*d-l*u,v=a*f-c*u,w=o*d-l*h,S=o*f-c*h,T=o*u-a*h;return t*(_*M-g*b+m*v)-n*(p*M-g*w+m*S)+s*(p*b-_*w+m*T)-r*(p*v-_*S+g*T)}determinantAffine(){const e=this.elements,t=e[0],n=e[4],s=e[8],r=e[1],o=e[5],a=e[9],c=e[2],l=e[6],h=e[10];return t*(o*h-a*l)-n*(r*h-a*c)+s*(r*l-o*c)}transpose(){const e=this.elements;let t;return t=e[1],e[1]=e[4],e[4]=t,t=e[2],e[2]=e[8],e[8]=t,t=e[6],e[6]=e[9],e[9]=t,t=e[3],e[3]=e[12],e[12]=t,t=e[7],e[7]=e[13],e[13]=t,t=e[11],e[11]=e[14],e[14]=t,this}setPosition(e,t,n){const s=this.elements;return e.isVector3?(s[12]=e.x,s[13]=e.y,s[14]=e.z):(s[12]=e,s[13]=t,s[14]=n),this}invert(){const e=this.elements,t=e[0],n=e[1],s=e[2],r=e[3],o=e[4],a=e[5],c=e[6],l=e[7],h=e[8],u=e[9],f=e[10],d=e[11],p=e[12],_=e[13],g=e[14],m=e[15],M=t*a-n*o,b=t*c-s*o,v=t*l-r*o,w=n*c-s*a,S=n*l-r*a,T=s*l-r*c,x=h*_-u*p,R=h*g-f*p,D=h*m-d*p,P=u*g-f*_,F=u*m-d*_,A=f*m-d*g,I=M*A-b*F+v*P+w*D-S*R+T*x;if(I===0)return this.set(0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0);const O=1/I;return e[0]=(a*A-c*F+l*P)*O,e[1]=(s*F-n*A-r*P)*O,e[2]=(_*T-g*S+m*w)*O,e[3]=(f*S-u*T-d*w)*O,e[4]=(c*D-o*A-l*R)*O,e[5]=(t*A-s*D+r*R)*O,e[6]=(g*v-p*T-m*b)*O,e[7]=(h*T-f*v+d*b)*O,e[8]=(o*F-a*D+l*x)*O,e[9]=(n*D-t*F-r*x)*O,e[10]=(p*S-_*v+m*M)*O,e[11]=(u*v-h*S-d*M)*O,e[12]=(a*R-o*P-c*x)*O,e[13]=(t*P-n*R+s*x)*O,e[14]=(_*b-p*w-g*M)*O,e[15]=(h*w-u*b+f*M)*O,this}scale(e){const t=this.elements,n=e.x,s=e.y,r=e.z;return t[0]*=n,t[4]*=s,t[8]*=r,t[1]*=n,t[5]*=s,t[9]*=r,t[2]*=n,t[6]*=s,t[10]*=r,t[3]*=n,t[7]*=s,t[11]*=r,this}getMaxScaleOnAxis(){const e=this.elements,t=e[0]*e[0]+e[1]*e[1]+e[2]*e[2],n=e[4]*e[4]+e[5]*e[5]+e[6]*e[6],s=e[8]*e[8]+e[9]*e[9]+e[10]*e[10];return Math.sqrt(Math.max(t,n,s))}makeTranslation(e,t,n){return e.isVector3?this.set(1,0,0,e.x,0,1,0,e.y,0,0,1,e.z,0,0,0,1):this.set(1,0,0,e,0,1,0,t,0,0,1,n,0,0,0,1),this}makeRotationX(e){const t=Math.cos(e),n=Math.sin(e);return this.set(1,0,0,0,0,t,-n,0,0,n,t,0,0,0,0,1),this}makeRotationY(e){const t=Math.cos(e),n=Math.sin(e);return this.set(t,0,n,0,0,1,0,0,-n,0,t,0,0,0,0,1),this}makeRotationZ(e){const t=Math.cos(e),n=Math.sin(e);return this.set(t,-n,0,0,n,t,0,0,0,0,1,0,0,0,0,1),this}makeRotationAxis(e,t){const n=Math.cos(t),s=Math.sin(t),r=1-n,o=e.x,a=e.y,c=e.z,l=r*o,h=r*a;return this.set(l*o+n,l*a-s*c,l*c+s*a,0,l*a+s*c,h*a+n,h*c-s*o,0,l*c-s*a,h*c+s*o,r*c*c+n,0,0,0,0,1),this}makeScale(e,t,n){return this.set(e,0,0,0,0,t,0,0,0,0,n,0,0,0,0,1),this}makeShear(e,t,n,s,r,o){return this.set(1,n,r,0,e,1,o,0,t,s,1,0,0,0,0,1),this}compose(e,t,n){const s=this.elements,r=t._x,o=t._y,a=t._z,c=t._w,l=r+r,h=o+o,u=a+a,f=r*l,d=r*h,p=r*u,_=o*h,g=o*u,m=a*u,M=c*l,b=c*h,v=c*u,w=n.x,S=n.y,T=n.z;return s[0]=(1-(_+m))*w,s[1]=(d+v)*w,s[2]=(p-b)*w,s[3]=0,s[4]=(d-v)*S,s[5]=(1-(f+m))*S,s[6]=(g+M)*S,s[7]=0,s[8]=(p+b)*T,s[9]=(g-M)*T,s[10]=(1-(f+_))*T,s[11]=0,s[12]=e.x,s[13]=e.y,s[14]=e.z,s[15]=1,this}decompose(e,t,n){const s=this.elements;e.x=s[12],e.y=s[13],e.z=s[14];const r=this.determinantAffine();if(r===0)return n.set(1,1,1),t.identity(),this;let o=_s.set(s[0],s[1],s[2]).length();const a=_s.set(s[4],s[5],s[6]).length(),c=_s.set(s[8],s[9],s[10]).length();r<0&&(o=-o),Bn.copy(this);const l=1/o,h=1/a,u=1/c;return Bn.elements[0]*=l,Bn.elements[1]*=l,Bn.elements[2]*=l,Bn.elements[4]*=h,Bn.elements[5]*=h,Bn.elements[6]*=h,Bn.elements[8]*=u,Bn.elements[9]*=u,Bn.elements[10]*=u,t.setFromRotationMatrix(Bn),n.x=o,n.y=a,n.z=c,this}makePerspective(e,t,n,s,r,o,a=si,c=!1){const l=this.elements,h=2*r/(t-e),u=2*r/(n-s),f=(t+e)/(t-e),d=(n+s)/(n-s);let p,_;if(c)p=r/(o-r),_=o*r/(o-r);else if(a===si)p=-(o+r)/(o-r),_=-2*o*r/(o-r);else if(a===Xr)p=-o/(o-r),_=-o*r/(o-r);else throw new Error("THREE.Matrix4.makePerspective(): Invalid coordinate system: "+a);return l[0]=h,l[4]=0,l[8]=f,l[12]=0,l[1]=0,l[5]=u,l[9]=d,l[13]=0,l[2]=0,l[6]=0,l[10]=p,l[14]=_,l[3]=0,l[7]=0,l[11]=-1,l[15]=0,this}makeOrthographic(e,t,n,s,r,o,a=si,c=!1){const l=this.elements,h=2/(t-e),u=2/(n-s),f=-(t+e)/(t-e),d=-(n+s)/(n-s);let p,_;if(c)p=1/(o-r),_=o/(o-r);else if(a===si)p=-2/(o-r),_=-(o+r)/(o-r);else if(a===Xr)p=-1/(o-r),_=-r/(o-r);else throw new Error("THREE.Matrix4.makeOrthographic(): Invalid coordinate system: "+a);return l[0]=h,l[4]=0,l[8]=0,l[12]=f,l[1]=0,l[5]=u,l[9]=0,l[13]=d,l[2]=0,l[6]=0,l[10]=p,l[14]=_,l[3]=0,l[7]=0,l[11]=0,l[15]=1,this}equals(e){const t=this.elements,n=e.elements;for(let s=0;s<16;s++)if(t[s]!==n[s])return!1;return!0}fromArray(e,t=0){for(let n=0;n<16;n++)this.elements[n]=e[n+t];return this}toArray(e=[],t=0){const n=this.elements;return e[t]=n[0],e[t+1]=n[1],e[t+2]=n[2],e[t+3]=n[3],e[t+4]=n[4],e[t+5]=n[5],e[t+6]=n[6],e[t+7]=n[7],e[t+8]=n[8],e[t+9]=n[9],e[t+10]=n[10],e[t+11]=n[11],e[t+12]=n[12],e[t+13]=n[13],e[t+14]=n[14],e[t+15]=n[15],e}};ya.prototype.isMatrix4=!0;let Qe=ya;const _s=new B,Bn=new Qe,Ym=new B(0,0,0),$m=new B(1,1,1),Li=new B,lo=new B,pn=new B,au=new Qe,lu=new hi;class ci{constructor(e=0,t=0,n=0,s=ci.DEFAULT_ORDER){this.isEuler=!0,this._x=e,this._y=t,this._z=n,this._order=s}get x(){return this._x}set x(e){this._x=e,this._onChangeCallback()}get y(){return this._y}set y(e){this._y=e,this._onChangeCallback()}get z(){return this._z}set z(e){this._z=e,this._onChangeCallback()}get order(){return this._order}set order(e){this._order=e,this._onChangeCallback()}set(e,t,n,s=this._order){return this._x=e,this._y=t,this._z=n,this._order=s,this._onChangeCallback(),this}clone(){return new this.constructor(this._x,this._y,this._z,this._order)}copy(e){return this._x=e._x,this._y=e._y,this._z=e._z,this._order=e._order,this._onChangeCallback(),this}setFromRotationMatrix(e,t=this._order,n=!0){const s=e.elements,r=s[0],o=s[4],a=s[8],c=s[1],l=s[5],h=s[9],u=s[2],f=s[6],d=s[10];switch(t){case"XYZ":this._y=Math.asin(st(a,-1,1)),Math.abs(a)<.9999999?(this._x=Math.atan2(-h,d),this._z=Math.atan2(-o,r)):(this._x=Math.atan2(f,l),this._z=0);break;case"YXZ":this._x=Math.asin(-st(h,-1,1)),Math.abs(h)<.9999999?(this._y=Math.atan2(a,d),this._z=Math.atan2(c,l)):(this._y=Math.atan2(-u,r),this._z=0);break;case"ZXY":this._x=Math.asin(st(f,-1,1)),Math.abs(f)<.9999999?(this._y=Math.atan2(-u,d),this._z=Math.atan2(-o,l)):(this._y=0,this._z=Math.atan2(c,r));break;case"ZYX":this._y=Math.asin(-st(u,-1,1)),Math.abs(u)<.9999999?(this._x=Math.atan2(f,d),this._z=Math.atan2(c,r)):(this._x=0,this._z=Math.atan2(-o,l));break;case"YZX":this._z=Math.asin(st(c,-1,1)),Math.abs(c)<.9999999?(this._x=Math.atan2(-h,l),this._y=Math.atan2(-u,r)):(this._x=0,this._y=Math.atan2(a,d));break;case"XZY":this._z=Math.asin(-st(o,-1,1)),Math.abs(o)<.9999999?(this._x=Math.atan2(f,l),this._y=Math.atan2(a,r)):(this._x=Math.atan2(-h,d),this._y=0);break;default:Oe("Euler: .setFromRotationMatrix() encountered an unknown order: "+t)}return this._order=t,n===!0&&this._onChangeCallback(),this}setFromQuaternion(e,t,n){return au.makeRotationFromQuaternion(e),this.setFromRotationMatrix(au,t,n)}setFromVector3(e,t=this._order){return this.set(e.x,e.y,e.z,t)}reorder(e){return lu.setFromEuler(this),this.setFromQuaternion(lu,e)}equals(e){return e._x===this._x&&e._y===this._y&&e._z===this._z&&e._order===this._order}fromArray(e){return this._x=e[0],this._y=e[1],this._z=e[2],e[3]!==void 0&&(this._order=e[3]),this._onChangeCallback(),this}toArray(e=[],t=0){return e[t]=this._x,e[t+1]=this._y,e[t+2]=this._z,e[t+3]=this._order,e}_onChange(e){return this._onChangeCallback=e,this}_onChangeCallback(){}*[Symbol.iterator](){yield this._x,yield this._y,yield this._z,yield this._order}}ci.DEFAULT_ORDER="XYZ";class yd{constructor(){this.mask=1}set(e){this.mask=(1<<e|0)>>>0}enable(e){this.mask|=1<<e|0}enableAll(){this.mask=-1}toggle(e){this.mask^=1<<e|0}disable(e){this.mask&=~(1<<e|0)}disableAll(){this.mask=0}test(e){return(this.mask&e.mask)!==0}isEnabled(e){return(this.mask&(1<<e|0))!==0}}let Km=0;const cu=new B,xs=new hi,mi=new Qe,co=new B,cr=new B,Jm=new B,Zm=new hi,hu=new B(1,0,0),uu=new B(0,1,0),fu=new B(0,0,1),du={type:"added"},jm={type:"removed"},vs={type:"childadded",child:null},Va={type:"childremoved",child:null};class Rt extends fs{constructor(){super(),this.isObject3D=!0,Object.defineProperty(this,"id",{value:Km++}),this.uuid=Un(),this.name="",this.type="Object3D",this.parent=null,this.children=[],this.up=Rt.DEFAULT_UP.clone();const e=new B,t=new ci,n=new hi,s=new B(1,1,1);function r(){n.setFromEuler(t,!1)}function o(){t.setFromQuaternion(n,void 0,!1)}t._onChange(r),n._onChange(o),Object.defineProperties(this,{position:{configurable:!0,enumerable:!0,value:e},rotation:{configurable:!0,enumerable:!0,value:t},quaternion:{configurable:!0,enumerable:!0,value:n},scale:{configurable:!0,enumerable:!0,value:s},modelViewMatrix:{value:new Qe},normalMatrix:{value:new Ze}}),this.matrix=new Qe,this.matrixWorld=new Qe,this.matrixAutoUpdate=Rt.DEFAULT_MATRIX_AUTO_UPDATE,this.matrixWorldAutoUpdate=Rt.DEFAULT_MATRIX_WORLD_AUTO_UPDATE,this.matrixWorldNeedsUpdate=!1,this.layers=new yd,this.visible=!0,this.castShadow=!1,this.receiveShadow=!1,this.frustumCulled=!0,this.renderOrder=0,this.animations=[],this.customDepthMaterial=void 0,this.customDistanceMaterial=void 0,this.static=!1,this.userData={},this.pivot=null}onBeforeShadow(){}onAfterShadow(){}onBeforeRender(){}onAfterRender(){}applyMatrix4(e){this.matrixAutoUpdate&&this.updateMatrix(),this.matrix.premultiply(e),this.matrix.decompose(this.position,this.quaternion,this.scale)}applyQuaternion(e){return this.quaternion.premultiply(e),this}setRotationFromAxisAngle(e,t){this.quaternion.setFromAxisAngle(e,t)}setRotationFromEuler(e){this.quaternion.setFromEuler(e,!0)}setRotationFromMatrix(e){this.quaternion.setFromRotationMatrix(e)}setRotationFromQuaternion(e){this.quaternion.copy(e)}rotateOnAxis(e,t){return xs.setFromAxisAngle(e,t),this.quaternion.multiply(xs),this}rotateOnWorldAxis(e,t){return xs.setFromAxisAngle(e,t),this.quaternion.premultiply(xs),this}rotateX(e){return this.rotateOnAxis(hu,e)}rotateY(e){return this.rotateOnAxis(uu,e)}rotateZ(e){return this.rotateOnAxis(fu,e)}translateOnAxis(e,t){return cu.copy(e).applyQuaternion(this.quaternion),this.position.add(cu.multiplyScalar(t)),this}translateX(e){return this.translateOnAxis(hu,e)}translateY(e){return this.translateOnAxis(uu,e)}translateZ(e){return this.translateOnAxis(fu,e)}localToWorld(e){return this.updateWorldMatrix(!0,!1),e.applyMatrix4(this.matrixWorld)}worldToLocal(e){return this.updateWorldMatrix(!0,!1),e.applyMatrix4(mi.copy(this.matrixWorld).invert())}lookAt(e,t,n){e.isVector3?co.copy(e):co.set(e,t,n);const s=this.parent;this.updateWorldMatrix(!0,!1),cr.setFromMatrixPosition(this.matrixWorld),this.isCamera||this.isLight?mi.lookAt(cr,co,this.up):mi.lookAt(co,cr,this.up),this.quaternion.setFromRotationMatrix(mi),s&&(mi.extractRotation(s.matrixWorld),xs.setFromRotationMatrix(mi),this.quaternion.premultiply(xs.invert()))}add(e){if(arguments.length>1){for(let t=0;t<arguments.length;t++)this.add(arguments[t]);return this}return e===this?($e("Object3D.add: object can't be added as a child of itself.",e),this):(e&&e.isObject3D?(e.removeFromParent(),e.parent=this,this.children.push(e),e.dispatchEvent(du),vs.child=e,this.dispatchEvent(vs),vs.child=null):$e("Object3D.add: object not an instance of THREE.Object3D.",e),this)}remove(e){if(arguments.length>1){for(let n=0;n<arguments.length;n++)this.remove(arguments[n]);return this}const t=this.children.indexOf(e);return t!==-1&&(e.parent=null,this.children.splice(t,1),e.dispatchEvent(jm),Va.child=e,this.dispatchEvent(Va),Va.child=null),this}removeFromParent(){const e=this.parent;return e!==null&&e.remove(this),this}clear(){return this.remove(...this.children)}attach(e){return this.updateWorldMatrix(!0,!1),mi.copy(this.matrixWorld).invert(),e.parent!==null&&(e.parent.updateWorldMatrix(!0,!1),mi.multiply(e.parent.matrixWorld)),e.applyMatrix4(mi),e.removeFromParent(),e.parent=this,this.children.push(e),e.updateWorldMatrix(!1,!0),e.dispatchEvent(du),vs.child=e,this.dispatchEvent(vs),vs.child=null,this}getObjectById(e){return this.getObjectByProperty("id",e)}getObjectByName(e){return this.getObjectByProperty("name",e)}getObjectByProperty(e,t){if(this[e]===t)return this;for(let n=0,s=this.children.length;n<s;n++){const o=this.children[n].getObjectByProperty(e,t);if(o!==void 0)return o}}getObjectsByProperty(e,t,n=[]){this[e]===t&&n.push(this);const s=this.children;for(let r=0,o=s.length;r<o;r++)s[r].getObjectsByProperty(e,t,n);return n}getWorldPosition(e){return this.updateWorldMatrix(!0,!1),e.setFromMatrixPosition(this.matrixWorld)}getWorldQuaternion(e){return this.updateWorldMatrix(!0,!1),this.matrixWorld.decompose(cr,e,Jm),e}getWorldScale(e){return this.updateWorldMatrix(!0,!1),this.matrixWorld.decompose(cr,Zm,e),e}getWorldDirection(e){this.updateWorldMatrix(!0,!1);const t=this.matrixWorld.elements;return e.set(t[8],t[9],t[10]).normalize()}raycast(){}intersectsFrustum(){}traverse(e){e(this);const t=this.children;for(let n=0,s=t.length;n<s;n++)t[n].traverse(e)}traverseVisible(e){if(this.visible===!1)return;e(this);const t=this.children;for(let n=0,s=t.length;n<s;n++)t[n].traverseVisible(e)}traverseAncestors(e){const t=this.parent;t!==null&&(e(t),t.traverseAncestors(e))}updateMatrix(){this.matrix.compose(this.position,this.quaternion,this.scale);const e=this.pivot;if(e!==null){const t=e.x,n=e.y,s=e.z,r=this.matrix.elements;r[12]+=t-r[0]*t-r[4]*n-r[8]*s,r[13]+=n-r[1]*t-r[5]*n-r[9]*s,r[14]+=s-r[2]*t-r[6]*n-r[10]*s}this.matrixWorldNeedsUpdate=!0}updateMatrixWorld(e){this.matrixAutoUpdate&&this.updateMatrix(),(this.matrixWorldNeedsUpdate||e)&&(this.matrixWorldAutoUpdate===!0&&(this.parent===null?this.matrixWorld.copy(this.matrix):this.matrixWorld.multiplyMatrices(this.parent.matrixWorld,this.matrix)),this.matrixWorldNeedsUpdate=!1,e=!0);const t=this.children;for(let n=0,s=t.length;n<s;n++)t[n].updateMatrixWorld(e)}updateWorldMatrix(e,t,n=!1){const s=this.parent;if(e===!0&&s!==null&&s.updateWorldMatrix(!0,!1),this.matrixAutoUpdate&&this.updateMatrix(),(this.matrixWorldNeedsUpdate||n)&&(this.matrixWorldAutoUpdate===!0&&(this.parent===null?this.matrixWorld.copy(this.matrix):this.matrixWorld.multiplyMatrices(this.parent.matrixWorld,this.matrix)),this.matrixWorldNeedsUpdate=!1,n=!0),t===!0){const r=this.children;for(let o=0,a=r.length;o<a;o++)r[o].updateWorldMatrix(!1,!0,n)}}toJSON(e){const t=e===void 0||typeof e=="string",n={};t&&(e={geometries:{},materials:{},textures:{},images:{},shapes:{},skeletons:{},animations:{},nodes:{}},n.metadata={version:4.7,type:"Object",generator:"Object3D.toJSON"});const s={};s.uuid=this.uuid,s.type=this.type,s.name=this.name,s.castShadow=this.castShadow,s.receiveShadow=this.receiveShadow,s.visible=this.visible,s.frustumCulled=this.frustumCulled,s.renderOrder=this.renderOrder,s.static=this.static,s.matrixAutoUpdate=this.matrixAutoUpdate,Object.keys(this.userData).length>0&&(s.userData=this.userData),s.layers=this.layers.mask,s.matrix=this.matrix.toArray(),s.up=this.up.toArray(),this.pivot!==null&&(s.pivot=this.pivot.toArray()),this.morphTargetDictionary!==void 0&&(s.morphTargetDictionary=Object.assign({},this.morphTargetDictionary)),this.morphTargetInfluences!==void 0&&(s.morphTargetInfluences=this.morphTargetInfluences.slice()),this.isInstancedMesh&&(s.type="InstancedMesh",s.count=this.count,s.instanceMatrix=this.instanceMatrix.toJSON(),this.instanceColor!==null&&(s.instanceColor=this.instanceColor.toJSON())),this.isBatchedMesh&&(s.type="BatchedMesh",s.perObjectFrustumCulled=this.perObjectFrustumCulled,s.sortObjects=this.sortObjects,s.drawRanges=this._drawRanges,s.reservedRanges=this._reservedRanges,s.geometryInfo=this._geometryInfo.map(a=>({...a,boundingBox:a.boundingBox?a.boundingBox.toJSON():void 0,boundingSphere:a.boundingSphere?a.boundingSphere.toJSON():void 0})),s.instanceInfo=this._instanceInfo.map(a=>({...a})),s.availableInstanceIds=this._availableInstanceIds.slice(),s.availableGeometryIds=this._availableGeometryIds.slice(),s.nextIndexStart=this._nextIndexStart,s.nextVertexStart=this._nextVertexStart,s.geometryCount=this._geometryCount,s.maxInstanceCount=this._maxInstanceCount,s.maxVertexCount=this._maxVertexCount,s.maxIndexCount=this._maxIndexCount,s.geometryInitialized=this._geometryInitialized,s.matricesTexture=this._matricesTexture.toJSON(e),s.indirectTexture=this._indirectTexture.toJSON(e),this._colorsTexture!==null&&(s.colorsTexture=this._colorsTexture.toJSON(e)),this.boundingSphere!==null&&(s.boundingSphere=this.boundingSphere.toJSON()),this.boundingBox!==null&&(s.boundingBox=this.boundingBox.toJSON()));function r(a,c){return a[c.uuid]===void 0&&(a[c.uuid]=c.toJSON(e)),c.uuid}if(this.isScene)this.background&&(this.background.isColor?s.background=this.background.toJSON():this.background.isTexture&&(s.background=this.background.toJSON(e).uuid)),this.environment&&this.environment.isTexture&&this.environment.isRenderTargetTexture!==!0&&(s.environment=this.environment.toJSON(e).uuid);else if(this.isMesh||this.isLine||this.isPoints){s.geometry=r(e.geometries,this.geometry);const a=this.geometry.parameters;if(a!==void 0&&a.shapes!==void 0){const c=a.shapes;if(Array.isArray(c))for(let l=0,h=c.length;l<h;l++){const u=c[l];r(e.shapes,u)}else r(e.shapes,c)}}if(this.isSkinnedMesh&&(s.bindMode=this.bindMode,s.bindMatrix=this.bindMatrix.toArray(),this.skeleton!==void 0&&(r(e.skeletons,this.skeleton),s.skeleton=this.skeleton.uuid)),this.material!==void 0)if(Array.isArray(this.material)){const a=[];for(let c=0,l=this.material.length;c<l;c++)a.push(r(e.materials,this.material[c]));s.material=a}else s.material=r(e.materials,this.material);if(this.children.length>0){s.children=[];for(let a=0;a<this.children.length;a++)s.children.push(this.children[a].toJSON(e).object)}if(this.animations.length>0){s.animations=[];for(let a=0;a<this.animations.length;a++){const c=this.animations[a];s.animations.push(r(e.animations,c))}}if(t){const a=o(e.geometries),c=o(e.materials),l=o(e.textures),h=o(e.images),u=o(e.shapes),f=o(e.skeletons),d=o(e.animations),p=o(e.nodes);a.length>0&&(n.geometries=a),c.length>0&&(n.materials=c),l.length>0&&(n.textures=l),h.length>0&&(n.images=h),u.length>0&&(n.shapes=u),f.length>0&&(n.skeletons=f),d.length>0&&(n.animations=d),p.length>0&&(n.nodes=p)}return n.object=s,n;function o(a){const c=[];for(const l in a){const h=a[l];delete h.metadata,c.push(h)}return c}}clone(e){return new this.constructor().copy(this,e)}copy(e,t=!0){if(this.name=e.name,this.up.copy(e.up),this.position.copy(e.position),this.rotation.order=e.rotation.order,this.quaternion.copy(e.quaternion),this.scale.copy(e.scale),this.pivot=e.pivot!==null?e.pivot.clone():null,this.matrix.copy(e.matrix),this.matrixWorld.copy(e.matrixWorld),this.matrixAutoUpdate=e.matrixAutoUpdate,this.matrixWorldAutoUpdate=e.matrixWorldAutoUpdate,this.matrixWorldNeedsUpdate=e.matrixWorldNeedsUpdate,this.layers.mask=e.layers.mask,this.visible=e.visible,this.castShadow=e.castShadow,this.receiveShadow=e.receiveShadow,this.frustumCulled=e.frustumCulled,this.renderOrder=e.renderOrder,this.static=e.static,this.animations=e.animations.slice(),this.userData=JSON.parse(JSON.stringify(e.userData)),t===!0)for(let n=0;n<e.children.length;n++){const s=e.children[n];this.add(s.clone())}return this}dispose(){this.dispatchEvent({type:"dispose"})}}Rt.DEFAULT_UP=new B(0,1,0);Rt.DEFAULT_MATRIX_AUTO_UPDATE=!0;Rt.DEFAULT_MATRIX_WORLD_AUTO_UPDATE=!0;class tt extends Rt{constructor(){super(),this.isGroup=!0,this.type="Group"}}const Qm={type:"move"};class Ga{constructor(){this._targetRay=null,this._grip=null,this._hand=null}getHandSpace(){return this._hand===null&&(this._hand=new tt,this._hand.matrixAutoUpdate=!1,this._hand.visible=!1,this._hand.joints={},this._hand.inputState={pinching:!1}),this._hand}getTargetRaySpace(){return this._targetRay===null&&(this._targetRay=new tt,this._targetRay.matrixAutoUpdate=!1,this._targetRay.visible=!1,this._targetRay.hasLinearVelocity=!1,this._targetRay.linearVelocity=new B,this._targetRay.hasAngularVelocity=!1,this._targetRay.angularVelocity=new B),this._targetRay}getGripSpace(){return this._grip===null&&(this._grip=new tt,this._grip.matrixAutoUpdate=!1,this._grip.visible=!1,this._grip.hasLinearVelocity=!1,this._grip.linearVelocity=new B,this._grip.hasAngularVelocity=!1,this._grip.angularVelocity=new B,this._grip.eventsEnabled=!1),this._grip}dispatchEvent(e){return this._targetRay!==null&&this._targetRay.dispatchEvent(e),this._grip!==null&&this._grip.dispatchEvent(e),this._hand!==null&&this._hand.dispatchEvent(e),this}connect(e){if(e&&e.hand){const t=this._hand;if(t)for(const n of e.hand.values())this._getHandJoint(t,n)}return this.dispatchEvent({type:"connected",data:e}),this}disconnect(e){return this.dispatchEvent({type:"disconnected",data:e}),this._targetRay!==null&&(this._targetRay.visible=!1),this._grip!==null&&(this._grip.visible=!1),this._hand!==null&&(this._hand.visible=!1),this}update(e,t,n){let s=null,r=null,o=null;const a=this._targetRay,c=this._grip,l=this._hand;if(e&&t.session.visibilityState!=="visible-blurred"){if(l&&e.hand){o=!0;for(const _ of e.hand.values()){const g=t.getJointPose(_,n),m=this._getHandJoint(l,_);g!==null&&(m.matrix.fromArray(g.transform.matrix),m.matrix.decompose(m.position,m.rotation,m.scale),m.matrixWorldNeedsUpdate=!0,m.jointRadius=g.radius),m.visible=g!==null}const h=l.joints["index-finger-tip"],u=l.joints["thumb-tip"],f=h.position.distanceTo(u.position),d=.02,p=.005;l.inputState.pinching&&f>d+p?(l.inputState.pinching=!1,this.dispatchEvent({type:"pinchend",handedness:e.handedness,target:this})):!l.inputState.pinching&&f<=d-p&&(l.inputState.pinching=!0,this.dispatchEvent({type:"pinchstart",handedness:e.handedness,target:this}))}else c!==null&&e.gripSpace&&(r=t.getPose(e.gripSpace,n),r!==null&&(c.matrix.fromArray(r.transform.matrix),c.matrix.decompose(c.position,c.rotation,c.scale),c.matrixWorldNeedsUpdate=!0,r.linearVelocity?(c.hasLinearVelocity=!0,c.linearVelocity.copy(r.linearVelocity)):c.hasLinearVelocity=!1,r.angularVelocity?(c.hasAngularVelocity=!0,c.angularVelocity.copy(r.angularVelocity)):c.hasAngularVelocity=!1,c.eventsEnabled&&c.dispatchEvent({type:"gripUpdated",data:e,target:this})));a!==null&&(s=t.getPose(e.targetRaySpace,n),s===null&&r!==null&&(s=r),s!==null&&(a.matrix.fromArray(s.transform.matrix),a.matrix.decompose(a.position,a.rotation,a.scale),a.matrixWorldNeedsUpdate=!0,s.linearVelocity?(a.hasLinearVelocity=!0,a.linearVelocity.copy(s.linearVelocity)):a.hasLinearVelocity=!1,s.angularVelocity?(a.hasAngularVelocity=!0,a.angularVelocity.copy(s.angularVelocity)):a.hasAngularVelocity=!1,this.dispatchEvent(Qm)))}return a!==null&&(a.visible=s!==null),c!==null&&(c.visible=r!==null),l!==null&&(l.visible=o!==null),this}_getHandJoint(e,t){if(e.joints[t.jointName]===void 0){const n=new tt;n.matrixAutoUpdate=!1,n.visible=!1,e.joints[t.jointName]=n,e.add(n)}return e.joints[t.jointName]}}const Sd={aliceblue:15792383,antiquewhite:16444375,aqua:65535,aquamarine:8388564,azure:15794175,beige:16119260,bisque:16770244,black:0,blanchedalmond:16772045,blue:255,blueviolet:9055202,brown:10824234,burlywood:14596231,cadetblue:6266528,chartreuse:8388352,chocolate:13789470,coral:16744272,cornflowerblue:6591981,cornsilk:16775388,crimson:14423100,cyan:65535,darkblue:139,darkcyan:35723,darkgoldenrod:12092939,darkgray:11119017,darkgreen:25600,darkgrey:11119017,darkkhaki:12433259,darkmagenta:9109643,darkolivegreen:5597999,darkorange:16747520,darkorchid:10040012,darkred:9109504,darksalmon:15308410,darkseagreen:9419919,darkslateblue:4734347,darkslategray:3100495,darkslategrey:3100495,darkturquoise:52945,darkviolet:9699539,deeppink:16716947,deepskyblue:49151,dimgray:6908265,dimgrey:6908265,dodgerblue:2003199,firebrick:11674146,floralwhite:16775920,forestgreen:2263842,fuchsia:16711935,gainsboro:14474460,ghostwhite:16316671,gold:16766720,goldenrod:14329120,gray:8421504,green:32768,greenyellow:11403055,grey:8421504,honeydew:15794160,hotpink:16738740,indianred:13458524,indigo:4915330,ivory:16777200,khaki:15787660,lavender:15132410,lavenderblush:16773365,lawngreen:8190976,lemonchiffon:16775885,lightblue:11393254,lightcoral:15761536,lightcyan:14745599,lightgoldenrodyellow:16448210,lightgray:13882323,lightgreen:9498256,lightgrey:13882323,lightpink:16758465,lightsalmon:16752762,lightseagreen:2142890,lightskyblue:8900346,lightslategray:7833753,lightslategrey:7833753,lightsteelblue:11584734,lightyellow:16777184,lime:65280,limegreen:3329330,linen:16445670,magenta:16711935,maroon:8388608,mediumaquamarine:6737322,mediumblue:205,mediumorchid:12211667,mediumpurple:9662683,mediumseagreen:3978097,mediumslateblue:8087790,mediumspringgreen:64154,mediumturquoise:4772300,mediumvioletred:13047173,midnightblue:1644912,mintcream:16121850,mistyrose:16770273,moccasin:16770229,navajowhite:16768685,navy:128,oldlace:16643558,olive:8421376,olivedrab:7048739,orange:16753920,orangered:16729344,orchid:14315734,palegoldenrod:15657130,palegreen:10025880,paleturquoise:11529966,palevioletred:14381203,papayawhip:16773077,peachpuff:16767673,peru:13468991,pink:16761035,plum:14524637,powderblue:11591910,purple:8388736,rebeccapurple:6697881,red:16711680,rosybrown:12357519,royalblue:4286945,saddlebrown:9127187,salmon:16416882,sandybrown:16032864,seagreen:3050327,seashell:16774638,sienna:10506797,silver:12632256,skyblue:8900331,slateblue:6970061,slategray:7372944,slategrey:7372944,snow:16775930,springgreen:65407,steelblue:4620980,tan:13808780,teal:32896,thistle:14204888,tomato:16737095,turquoise:4251856,violet:15631086,wheat:16113331,white:16777215,whitesmoke:16119285,yellow:16776960,yellowgreen:10145074},Ni={h:0,s:0,l:0},ho={h:0,s:0,l:0};function Wa(i,e,t){return t<0&&(t+=1),t>1&&(t-=1),t<1/6?i+(e-i)*6*t:t<1/2?e:t<2/3?i+(e-i)*6*(2/3-t):i}class Ne{constructor(e,t,n){return this.isColor=!0,this.r=1,this.g=1,this.b=1,this.set(e,t,n)}set(e,t,n){if(t===void 0&&n===void 0){const s=e;s&&s.isColor?this.copy(s):typeof s=="number"?this.setHex(s):typeof s=="string"&&this.setStyle(s)}else this.setRGB(e,t,n);return this}setScalar(e){return this.r=e,this.g=e,this.b=e,this}setHex(e,t=Pt){return e=Math.floor(e),this.r=(e>>16&255)/255,this.g=(e>>8&255)/255,this.b=(e&255)/255,at.colorSpaceToWorking(this,t),this}setRGB(e,t,n,s=at.workingColorSpace){return this.r=e,this.g=t,this.b=n,at.colorSpaceToWorking(this,s),this}setHSL(e,t,n,s=at.workingColorSpace){if(e=jc(e,1),t=st(t,0,1),n=st(n,0,1),t===0)this.r=this.g=this.b=n;else{const r=n<=.5?n*(1+t):n+t-n*t,o=2*n-r;this.r=Wa(o,r,e+1/3),this.g=Wa(o,r,e),this.b=Wa(o,r,e-1/3)}return at.colorSpaceToWorking(this,s),this}setStyle(e,t=Pt){function n(r){r!==void 0&&parseFloat(r)<1&&Oe("Color: Alpha component of "+e+" will be ignored.")}let s;if(s=/^(\w+)\(([^\)]*)\)/.exec(e)){let r;const o=s[1],a=s[2];switch(o){case"rgb":case"rgba":if(r=/^\s*(\d+)\s*,\s*(\d+)\s*,\s*(\d+)\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(a))return n(r[4]),this.setRGB(Math.min(255,parseInt(r[1],10))/255,Math.min(255,parseInt(r[2],10))/255,Math.min(255,parseInt(r[3],10))/255,t);if(r=/^\s*(\d+)\%\s*,\s*(\d+)\%\s*,\s*(\d+)\%\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(a))return n(r[4]),this.setRGB(Math.min(100,parseInt(r[1],10))/100,Math.min(100,parseInt(r[2],10))/100,Math.min(100,parseInt(r[3],10))/100,t);break;case"hsl":case"hsla":if(r=/^\s*(\d*\.?\d+)\s*,\s*(\d*\.?\d+)\%\s*,\s*(\d*\.?\d+)\%\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(a))return n(r[4]),this.setHSL(parseFloat(r[1])/360,parseFloat(r[2])/100,parseFloat(r[3])/100,t);break;default:Oe("Color: Unknown color model "+e)}}else if(s=/^\#([A-Fa-f\d]+)$/.exec(e)){const r=s[1],o=r.length;if(o===3)return this.setRGB(parseInt(r.charAt(0),16)/15,parseInt(r.charAt(1),16)/15,parseInt(r.charAt(2),16)/15,t);if(o===6)return this.setHex(parseInt(r,16),t);Oe("Color: Invalid hex color "+e)}else if(e&&e.length>0)return this.setColorName(e,t);return this}setColorName(e,t=Pt){const n=Sd[e.toLowerCase()];return n!==void 0?this.setHex(n,t):Oe("Color: Unknown color "+e),this}clone(){return new this.constructor(this.r,this.g,this.b)}copy(e){return this.r=e.r,this.g=e.g,this.b=e.b,this}copySRGBToLinear(e){return this.r=Ai(e.r),this.g=Ai(e.g),this.b=Ai(e.b),this}copyLinearToSRGB(e){return this.r=qs(e.r),this.g=qs(e.g),this.b=qs(e.b),this}convertSRGBToLinear(){return this.copySRGBToLinear(this),this}convertLinearToSRGB(){return this.copyLinearToSRGB(this),this}getHex(e=Pt){return at.workingToColorSpace(Jt.copy(this),e),Math.round(st(Jt.r*255,0,255))*65536+Math.round(st(Jt.g*255,0,255))*256+Math.round(st(Jt.b*255,0,255))}getHexString(e=Pt){return("000000"+this.getHex(e).toString(16)).slice(-6)}getHSL(e,t=at.workingColorSpace){at.workingToColorSpace(Jt.copy(this),t);const n=Jt.r,s=Jt.g,r=Jt.b,o=Math.max(n,s,r),a=Math.min(n,s,r);let c,l;const h=(a+o)/2;if(a===o)c=0,l=0;else{const u=o-a;switch(l=h<=.5?u/(o+a):u/(2-o-a),o){case n:c=(s-r)/u+(s<r?6:0);break;case s:c=(r-n)/u+2;break;case r:c=(n-s)/u+4;break}c/=6}return e.h=c,e.s=l,e.l=h,e}getRGB(e,t=at.workingColorSpace){return at.workingToColorSpace(Jt.copy(this),t),e.r=Jt.r,e.g=Jt.g,e.b=Jt.b,e}getStyle(e=Pt){at.workingToColorSpace(Jt.copy(this),e);const t=Jt.r,n=Jt.g,s=Jt.b;return e!==Pt?`color(${e} ${t.toFixed(3)} ${n.toFixed(3)} ${s.toFixed(3)})`:`rgb(${Math.round(t*255)},${Math.round(n*255)},${Math.round(s*255)})`}offsetHSL(e,t,n){return this.getHSL(Ni),this.setHSL(Ni.h+e,Ni.s+t,Ni.l+n)}add(e){return this.r+=e.r,this.g+=e.g,this.b+=e.b,this}addColors(e,t){return this.r=e.r+t.r,this.g=e.g+t.g,this.b=e.b+t.b,this}addScalar(e){return this.r+=e,this.g+=e,this.b+=e,this}sub(e){return this.r=Math.max(0,this.r-e.r),this.g=Math.max(0,this.g-e.g),this.b=Math.max(0,this.b-e.b),this}multiply(e){return this.r*=e.r,this.g*=e.g,this.b*=e.b,this}multiplyScalar(e){return this.r*=e,this.g*=e,this.b*=e,this}lerp(e,t){return this.r+=(e.r-this.r)*t,this.g+=(e.g-this.g)*t,this.b+=(e.b-this.b)*t,this}lerpColors(e,t,n){return this.r=e.r+(t.r-e.r)*n,this.g=e.g+(t.g-e.g)*n,this.b=e.b+(t.b-e.b)*n,this}lerpHSL(e,t){this.getHSL(Ni),e.getHSL(ho);const n=Dr(Ni.h,ho.h,t),s=Dr(Ni.s,ho.s,t),r=Dr(Ni.l,ho.l,t);return this.setHSL(n,s,r),this}setFromVector3(e){return this.r=e.x,this.g=e.y,this.b=e.z,this}applyMatrix3(e){const t=this.r,n=this.g,s=this.b,r=e.elements;return this.r=r[0]*t+r[3]*n+r[6]*s,this.g=r[1]*t+r[4]*n+r[7]*s,this.b=r[2]*t+r[5]*n+r[8]*s,this}equals(e){return e.r===this.r&&e.g===this.g&&e.b===this.b}fromArray(e,t=0){return this.r=e[t],this.g=e[t+1],this.b=e[t+2],this}toArray(e=[],t=0){return e[t]=this.r,e[t+1]=this.g,e[t+2]=this.b,e}fromBufferAttribute(e,t){return this.r=e.getX(t),this.g=e.getY(t),this.b=e.getZ(t),this}toJSON(){return this.getHex()}*[Symbol.iterator](){yield this.r,yield this.g,yield this.b}}const Jt=new Ne;Ne.NAMES=Sd;class ua{constructor(e,t=25e-5){this.isFogExp2=!0,this.name="",this.color=new Ne(e),this.density=t}clone(){return new ua(this.color,this.density)}toJSON(){return{type:"FogExp2",name:this.name,color:this.color.getHex(),density:this.density}}}class eh{constructor(e,t=1,n=1e3){this.isFog=!0,this.name="",this.color=new Ne(e),this.near=t,this.far=n}clone(){return new eh(this.color,this.near,this.far)}toJSON(){return{type:"Fog",name:this.name,color:this.color.getHex(),near:this.near,far:this.far}}}class wd extends Rt{constructor(){super(),this.isScene=!0,this.type="Scene",this.background=null,this.environment=null,this.fog=null,this.backgroundBlurriness=0,this.backgroundIntensity=1,this.backgroundRotation=new ci,this.environmentIntensity=1,this.environmentRotation=new ci,this.overrideMaterial=null,typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("observe",{detail:this}))}copy(e,t){return super.copy(e,t),e.background!==null&&(this.background=e.background.clone()),e.environment!==null&&(this.environment=e.environment.clone()),e.fog!==null&&(this.fog=e.fog.clone()),this.backgroundBlurriness=e.backgroundBlurriness,this.backgroundIntensity=e.backgroundIntensity,this.backgroundRotation.copy(e.backgroundRotation),this.environmentIntensity=e.environmentIntensity,this.environmentRotation.copy(e.environmentRotation),e.overrideMaterial!==null&&(this.overrideMaterial=e.overrideMaterial.clone()),this.matrixAutoUpdate=e.matrixAutoUpdate,this}toJSON(e){const t=super.toJSON(e);return this.fog!==null&&(t.object.fog=this.fog.toJSON()),t.object.backgroundBlurriness=this.backgroundBlurriness,t.object.backgroundIntensity=this.backgroundIntensity,t.object.backgroundRotation=this.backgroundRotation.toArray(),t.object.environmentIntensity=this.environmentIntensity,t.object.environmentRotation=this.environmentRotation.toArray(),t}}const kn=new B,gi=new B,Xa=new B,_i=new B,Ms=new B,ys=new B,pu=new B,qa=new B,Ya=new B,$a=new B,Ka=new St,Ja=new St,Za=new St;class Pn{constructor(e=new B,t=new B,n=new B){this.a=e,this.b=t,this.c=n}static getNormal(e,t,n,s){s.subVectors(n,t),kn.subVectors(e,t),s.cross(kn);const r=s.lengthSq();return r>0?s.multiplyScalar(1/Math.sqrt(r)):s.set(0,0,0)}static getBarycoord(e,t,n,s,r){kn.subVectors(s,t),gi.subVectors(n,t),Xa.subVectors(e,t);const o=kn.dot(kn),a=kn.dot(gi),c=kn.dot(Xa),l=gi.dot(gi),h=gi.dot(Xa),u=o*l-a*a;if(u===0)return r.set(0,0,0),null;const f=1/u,d=(l*c-a*h)*f,p=(o*h-a*c)*f;return r.set(1-d-p,p,d)}static containsPoint(e,t,n,s){return this.getBarycoord(e,t,n,s,_i)===null?!1:_i.x>=0&&_i.y>=0&&_i.x+_i.y<=1}static getInterpolation(e,t,n,s,r,o,a,c){return this.getBarycoord(e,t,n,s,_i)===null?(c.x=0,c.y=0,"z"in c&&(c.z=0),"w"in c&&(c.w=0),null):(c.setScalar(0),c.addScaledVector(r,_i.x),c.addScaledVector(o,_i.y),c.addScaledVector(a,_i.z),c)}static getInterpolatedAttribute(e,t,n,s,r,o){return Ka.setScalar(0),Ja.setScalar(0),Za.setScalar(0),Ka.fromBufferAttribute(e,t),Ja.fromBufferAttribute(e,n),Za.fromBufferAttribute(e,s),o.setScalar(0),o.addScaledVector(Ka,r.x),o.addScaledVector(Ja,r.y),o.addScaledVector(Za,r.z),o}static isFrontFacing(e,t,n,s){return kn.subVectors(n,t),gi.subVectors(e,t),kn.cross(gi).dot(s)<0}set(e,t,n){return this.a.copy(e),this.b.copy(t),this.c.copy(n),this}setFromPointsAndIndices(e,t,n,s){return this.a.copy(e[t]),this.b.copy(e[n]),this.c.copy(e[s]),this}setFromAttributeAndIndices(e,t,n,s){return this.a.fromBufferAttribute(e,t),this.b.fromBufferAttribute(e,n),this.c.fromBufferAttribute(e,s),this}clone(){return new this.constructor().copy(this)}copy(e){return this.a.copy(e.a),this.b.copy(e.b),this.c.copy(e.c),this}getArea(){return kn.subVectors(this.c,this.b),gi.subVectors(this.a,this.b),kn.cross(gi).length()*.5}getMidpoint(e){return e.addVectors(this.a,this.b).add(this.c).multiplyScalar(1/3)}getNormal(e){return Pn.getNormal(this.a,this.b,this.c,e)}getPlane(e){return e.setFromCoplanarPoints(this.a,this.b,this.c)}getBarycoord(e,t){return Pn.getBarycoord(e,this.a,this.b,this.c,t)}getInterpolation(e,t,n,s,r){return Pn.getInterpolation(e,this.a,this.b,this.c,t,n,s,r)}containsPoint(e){return Pn.containsPoint(e,this.a,this.b,this.c)}isFrontFacing(e){return Pn.isFrontFacing(this.a,this.b,this.c,e)}intersectsBox(e){return e.intersectsTriangle(this)}closestPointToPoint(e,t){const n=this.a,s=this.b,r=this.c;let o,a;Ms.subVectors(s,n),ys.subVectors(r,n),qa.subVectors(e,n);const c=Ms.dot(qa),l=ys.dot(qa);if(c<=0&&l<=0)return t.copy(n);Ya.subVectors(e,s);const h=Ms.dot(Ya),u=ys.dot(Ya);if(h>=0&&u<=h)return t.copy(s);const f=c*u-h*l;if(f<=0&&c>=0&&h<=0)return o=c/(c-h),t.copy(n).addScaledVector(Ms,o);$a.subVectors(e,r);const d=Ms.dot($a),p=ys.dot($a);if(p>=0&&d<=p)return t.copy(r);const _=d*l-c*p;if(_<=0&&l>=0&&p<=0)return a=l/(l-p),t.copy(n).addScaledVector(ys,a);const g=h*p-d*u;if(g<=0&&u-h>=0&&d-p>=0)return pu.subVectors(r,s),a=(u-h)/(u-h+(d-p)),t.copy(s).addScaledVector(pu,a);const m=1/(g+_+f);return o=_*m,a=f*m,t.copy(n).addScaledVector(Ms,o).addScaledVector(ys,a)}equals(e){return e.a.equals(this.a)&&e.b.equals(this.b)&&e.c.equals(this.c)}}class ui{constructor(e=new B(1/0,1/0,1/0),t=new B(-1/0,-1/0,-1/0)){this.isBox3=!0,this.min=e,this.max=t}set(e,t){return this.min.copy(e),this.max.copy(t),this}setFromArray(e){this.makeEmpty();for(let t=0,n=e.length;t<n;t+=3)this.expandByPoint(zn.fromArray(e,t));return this}setFromBufferAttribute(e){this.makeEmpty();for(let t=0,n=e.count;t<n;t++)this.expandByPoint(zn.fromBufferAttribute(e,t));return this}setFromPoints(e){this.makeEmpty();for(let t=0,n=e.length;t<n;t++)this.expandByPoint(e[t]);return this}setFromCenterAndSize(e,t){const n=zn.copy(t).multiplyScalar(.5);return this.min.copy(e).sub(n),this.max.copy(e).add(n),this}setFromObject(e,t=!1){return this.makeEmpty(),this.expandByObject(e,t)}clone(){return new this.constructor().copy(this)}copy(e){return this.min.copy(e.min),this.max.copy(e.max),this}makeEmpty(){return this.min.x=this.min.y=this.min.z=1/0,this.max.x=this.max.y=this.max.z=-1/0,this}isEmpty(){return this.max.x<this.min.x||this.max.y<this.min.y||this.max.z<this.min.z}getCenter(e){return this.isEmpty()?e.set(0,0,0):e.addVectors(this.min,this.max).multiplyScalar(.5)}getSize(e){return this.isEmpty()?e.set(0,0,0):e.subVectors(this.max,this.min)}expandByPoint(e){return this.min.min(e),this.max.max(e),this}expandByVector(e){return this.min.sub(e),this.max.add(e),this}expandByScalar(e){return this.min.addScalar(-e),this.max.addScalar(e),this}expandByObject(e,t=!1){e.updateWorldMatrix(!1,!1);const n=e.geometry;if(n!==void 0){const r=n.getAttribute("position");if(t===!0&&r!==void 0&&e.isInstancedMesh!==!0)for(let o=0,a=r.count;o<a;o++)e.isMesh===!0?e.getVertexPosition(o,zn):zn.fromBufferAttribute(r,o),zn.applyMatrix4(e.matrixWorld),this.expandByPoint(zn);else e.boundingBox!==void 0?(e.boundingBox===null&&e.computeBoundingBox(),uo.copy(e.boundingBox)):(n.boundingBox===null&&n.computeBoundingBox(),uo.copy(n.boundingBox)),uo.applyMatrix4(e.matrixWorld),this.union(uo)}const s=e.children;for(let r=0,o=s.length;r<o;r++)this.expandByObject(s[r],t);return this}containsPoint(e){return e.x>=this.min.x&&e.x<=this.max.x&&e.y>=this.min.y&&e.y<=this.max.y&&e.z>=this.min.z&&e.z<=this.max.z}containsBox(e){return this.min.x<=e.min.x&&e.max.x<=this.max.x&&this.min.y<=e.min.y&&e.max.y<=this.max.y&&this.min.z<=e.min.z&&e.max.z<=this.max.z}getParameter(e,t){return t.set((e.x-this.min.x)/(this.max.x-this.min.x),(e.y-this.min.y)/(this.max.y-this.min.y),(e.z-this.min.z)/(this.max.z-this.min.z))}intersectsBox(e){return e.max.x>=this.min.x&&e.min.x<=this.max.x&&e.max.y>=this.min.y&&e.min.y<=this.max.y&&e.max.z>=this.min.z&&e.min.z<=this.max.z}intersectsSphere(e){return this.clampPoint(e.center,zn),zn.distanceToSquared(e.center)<=e.radius*e.radius}intersectsPlane(e){let t,n;return e.normal.x>0?(t=e.normal.x*this.min.x,n=e.normal.x*this.max.x):(t=e.normal.x*this.max.x,n=e.normal.x*this.min.x),e.normal.y>0?(t+=e.normal.y*this.min.y,n+=e.normal.y*this.max.y):(t+=e.normal.y*this.max.y,n+=e.normal.y*this.min.y),e.normal.z>0?(t+=e.normal.z*this.min.z,n+=e.normal.z*this.max.z):(t+=e.normal.z*this.max.z,n+=e.normal.z*this.min.z),t<=-e.constant&&n>=-e.constant}intersectsTriangle(e){if(this.isEmpty())return!1;this.getCenter(hr),fo.subVectors(this.max,hr),Ss.subVectors(e.a,hr),ws.subVectors(e.b,hr),bs.subVectors(e.c,hr),Di.subVectors(ws,Ss),Ui.subVectors(bs,ws),Ki.subVectors(Ss,bs);let t=[0,-Di.z,Di.y,0,-Ui.z,Ui.y,0,-Ki.z,Ki.y,Di.z,0,-Di.x,Ui.z,0,-Ui.x,Ki.z,0,-Ki.x,-Di.y,Di.x,0,-Ui.y,Ui.x,0,-Ki.y,Ki.x,0];return!ja(t,Ss,ws,bs,fo)||(t=[1,0,0,0,1,0,0,0,1],!ja(t,Ss,ws,bs,fo))?!1:(po.crossVectors(Di,Ui),t=[po.x,po.y,po.z],ja(t,Ss,ws,bs,fo))}clampPoint(e,t){return t.copy(e).clamp(this.min,this.max)}distanceToPoint(e){return this.clampPoint(e,zn).distanceTo(e)}getBoundingSphere(e){return this.isEmpty()?e.makeEmpty():(this.getCenter(e.center),e.radius=this.getSize(zn).length()*.5),e}intersect(e){return this.min.max(e.min),this.max.min(e.max),this.isEmpty()&&this.makeEmpty(),this}union(e){return this.min.min(e.min),this.max.max(e.max),this}applyMatrix4(e){return this.isEmpty()?this:(xi[0].set(this.min.x,this.min.y,this.min.z).applyMatrix4(e),xi[1].set(this.min.x,this.min.y,this.max.z).applyMatrix4(e),xi[2].set(this.min.x,this.max.y,this.min.z).applyMatrix4(e),xi[3].set(this.min.x,this.max.y,this.max.z).applyMatrix4(e),xi[4].set(this.max.x,this.min.y,this.min.z).applyMatrix4(e),xi[5].set(this.max.x,this.min.y,this.max.z).applyMatrix4(e),xi[6].set(this.max.x,this.max.y,this.min.z).applyMatrix4(e),xi[7].set(this.max.x,this.max.y,this.max.z).applyMatrix4(e),this.setFromPoints(xi),this)}translate(e){return this.min.add(e),this.max.add(e),this}equals(e){return e.min.equals(this.min)&&e.max.equals(this.max)}toJSON(){return{min:this.min.toArray(),max:this.max.toArray()}}fromJSON(e){return this.min.fromArray(e.min),this.max.fromArray(e.max),this}}const xi=[new B,new B,new B,new B,new B,new B,new B,new B],zn=new B,uo=new ui,Ss=new B,ws=new B,bs=new B,Di=new B,Ui=new B,Ki=new B,hr=new B,fo=new B,po=new B,Ji=new B;function ja(i,e,t,n,s){for(let r=0,o=i.length-3;r<=o;r+=3){Ji.fromArray(i,r);const a=s.x*Math.abs(Ji.x)+s.y*Math.abs(Ji.y)+s.z*Math.abs(Ji.z),c=e.dot(Ji),l=t.dot(Ji),h=n.dot(Ji);if(Math.max(-Math.max(c,l,h),Math.min(c,l,h))>a)return!1}return!0}const Ut=new B,mo=new oe;let e0=0;class qt extends fs{constructor(e,t,n=!1){if(super(),Array.isArray(e))throw new TypeError("THREE.BufferAttribute: array should be a Typed Array.");this.isBufferAttribute=!0,Object.defineProperty(this,"id",{value:e0++}),this.name="",this.array=e,this.itemSize=t,this.count=e!==void 0?e.length/t:0,this.normalized=n,this.usage=xd,this.updateRanges=[],this.gpuType=In,this.version=0}onUploadCallback(){}set needsUpdate(e){e===!0&&this.version++}setUsage(e){return this.usage=e,this}addUpdateRange(e,t){this.updateRanges.push({start:e,count:t})}clearUpdateRanges(){this.updateRanges.length=0}copy(e){return this.name=e.name,this.array=new e.array.constructor(e.array),this.itemSize=e.itemSize,this.count=e.count,this.normalized=e.normalized,this.usage=e.usage,this.gpuType=e.gpuType,this}copyAt(e,t,n){e*=this.itemSize,n*=t.itemSize;for(let s=0,r=this.itemSize;s<r;s++)this.array[e+s]=t.array[n+s];return this}copyArray(e){return this.array.set(e),this}applyMatrix3(e){if(this.itemSize===2)for(let t=0,n=this.count;t<n;t++)mo.fromBufferAttribute(this,t),mo.applyMatrix3(e),this.setXY(t,mo.x,mo.y);else if(this.itemSize===3)for(let t=0,n=this.count;t<n;t++)Ut.fromBufferAttribute(this,t),Ut.applyMatrix3(e),this.setXYZ(t,Ut.x,Ut.y,Ut.z);return this}applyMatrix4(e){for(let t=0,n=this.count;t<n;t++)Ut.fromBufferAttribute(this,t),Ut.applyMatrix4(e),this.setXYZ(t,Ut.x,Ut.y,Ut.z);return this}applyNormalMatrix(e){for(let t=0,n=this.count;t<n;t++)Ut.fromBufferAttribute(this,t),Ut.applyNormalMatrix(e),this.setXYZ(t,Ut.x,Ut.y,Ut.z);return this}transformDirection(e){for(let t=0,n=this.count;t<n;t++)Ut.fromBufferAttribute(this,t),Ut.transformDirection(e),this.setXYZ(t,Ut.x,Ut.y,Ut.z);return this}set(e,t=0){return this.array.set(e,t),this}getComponent(e,t){let n=this.array[e*this.itemSize+t];return this.normalized&&(n=Gn(n,this.array)),n}setComponent(e,t,n){return this.normalized&&(n=xt(n,this.array)),this.array[e*this.itemSize+t]=n,this}getX(e){let t=this.array[e*this.itemSize];return this.normalized&&(t=Gn(t,this.array)),t}setX(e,t){return this.normalized&&(t=xt(t,this.array)),this.array[e*this.itemSize]=t,this}getY(e){let t=this.array[e*this.itemSize+1];return this.normalized&&(t=Gn(t,this.array)),t}setY(e,t){return this.normalized&&(t=xt(t,this.array)),this.array[e*this.itemSize+1]=t,this}getZ(e){let t=this.array[e*this.itemSize+2];return this.normalized&&(t=Gn(t,this.array)),t}setZ(e,t){return this.normalized&&(t=xt(t,this.array)),this.array[e*this.itemSize+2]=t,this}getW(e){let t=this.array[e*this.itemSize+3];return this.normalized&&(t=Gn(t,this.array)),t}setW(e,t){return this.normalized&&(t=xt(t,this.array)),this.array[e*this.itemSize+3]=t,this}setXY(e,t,n){return e*=this.itemSize,this.normalized&&(t=xt(t,this.array),n=xt(n,this.array)),this.array[e+0]=t,this.array[e+1]=n,this}setXYZ(e,t,n,s){return e*=this.itemSize,this.normalized&&(t=xt(t,this.array),n=xt(n,this.array),s=xt(s,this.array)),this.array[e+0]=t,this.array[e+1]=n,this.array[e+2]=s,this}setXYZW(e,t,n,s,r){return e*=this.itemSize,this.normalized&&(t=xt(t,this.array),n=xt(n,this.array),s=xt(s,this.array),r=xt(r,this.array)),this.array[e+0]=t,this.array[e+1]=n,this.array[e+2]=s,this.array[e+3]=r,this}onUpload(e){return this.onUploadCallback=e,this}clone(){return new this.constructor(this.array,this.itemSize).copy(this)}toJSON(){const e={itemSize:this.itemSize,type:this.array.constructor.name,array:Array.from(this.array),normalized:this.normalized};return e.name=this.name,e.usage=this.usage,e.gpuType=this.gpuType,e}dispose(){this.dispatchEvent({type:"dispose"})}}class bd extends qt{constructor(e,t,n){super(new Uint16Array(e),t,n)}}class Td extends qt{constructor(e,t,n){super(new Uint32Array(e),t,n)}}class Je extends qt{constructor(e,t,n){super(new Float32Array(e),t,n)}}const t0=new ui,ur=new B,Qa=new B;class fi{constructor(e=new B,t=-1){this.isSphere=!0,this.center=e,this.radius=t}set(e,t){return this.center.copy(e),this.radius=t,this}setFromPoints(e,t){const n=this.center;t!==void 0?n.copy(t):t0.setFromPoints(e).getCenter(n);let s=0;for(let r=0,o=e.length;r<o;r++)s=Math.max(s,n.distanceToSquared(e[r]));return this.radius=Math.sqrt(s),this}copy(e){return this.center.copy(e.center),this.radius=e.radius,this}isEmpty(){return this.radius<0}makeEmpty(){return this.center.set(0,0,0),this.radius=-1,this}containsPoint(e){return e.distanceToSquared(this.center)<=this.radius*this.radius}distanceToPoint(e){return e.distanceTo(this.center)-this.radius}intersectsSphere(e){const t=this.radius+e.radius;return e.center.distanceToSquared(this.center)<=t*t}intersectsBox(e){return e.intersectsSphere(this)}intersectsPlane(e){return Math.abs(e.distanceToPoint(this.center))<=this.radius}clampPoint(e,t){const n=this.center.distanceToSquared(e);return t.copy(e),n>this.radius*this.radius&&(t.sub(this.center).normalize(),t.multiplyScalar(this.radius).add(this.center)),t}getBoundingBox(e){return this.isEmpty()?(e.makeEmpty(),e):(e.set(this.center,this.center),e.expandByScalar(this.radius),e)}applyMatrix4(e){return this.center.applyMatrix4(e),this.radius=this.radius*e.getMaxScaleOnAxis(),this}translate(e){return this.center.add(e),this}expandByPoint(e){if(this.isEmpty())return this.center.copy(e),this.radius=0,this;ur.subVectors(e,this.center);const t=ur.lengthSq();if(t>this.radius*this.radius){const n=Math.sqrt(t),s=(n-this.radius)*.5;this.center.addScaledVector(ur,s/n),this.radius+=s}return this}union(e){return e.isEmpty()?this:this.isEmpty()?(this.copy(e),this):(this.center.equals(e.center)===!0?this.radius=Math.max(this.radius,e.radius):(Qa.subVectors(e.center,this.center).setLength(e.radius),this.expandByPoint(ur.copy(e.center).add(Qa)),this.expandByPoint(ur.copy(e.center).sub(Qa))),this)}equals(e){return e.center.equals(this.center)&&e.radius===this.radius}clone(){return new this.constructor().copy(this)}toJSON(){return{radius:this.radius,center:this.center.toArray()}}fromJSON(e){return this.radius=e.radius,this.center.fromArray(e.center),this}}let n0=0;const Tn=new Qe,el=new Rt,Ts=new B,mn=new ui,fr=new ui,Wt=new B;class Mt extends fs{constructor(){super(),this.isBufferGeometry=!0,Object.defineProperty(this,"id",{value:n0++}),this.uuid=Un(),this.name="",this.type="BufferGeometry",this.index=null,this.indirect=null,this.indirectOffset=0,this.attributes={},this.morphAttributes={},this.morphTargetsRelative=!1,this.groups=[],this.boundingBox=null,this.boundingSphere=null,this.drawRange={start:0,count:1/0},this.userData={},this._transformed=!1}getIndex(){return this.index}setIndex(e){return Array.isArray(e)?this.index=new(vm(e)?Td:bd)(e,1):this.index=e,this}setIndirect(e,t=0){return this.indirect=e,this.indirectOffset=t,this}getIndirect(){return this.indirect}getAttribute(e){return this.attributes[e]}setAttribute(e,t){return this.attributes[e]=t,this}deleteAttribute(e){return delete this.attributes[e],this}hasAttribute(e){return this.attributes[e]!==void 0}addGroup(e,t,n=0){this.groups.push({start:e,count:t,materialIndex:n})}clearGroups(){this.groups=[]}setDrawRange(e,t){this.drawRange.start=e,this.drawRange.count=t}applyMatrix4(e){const t=this.attributes.position;t!==void 0&&(t.applyMatrix4(e),t.needsUpdate=!0);const n=this.attributes.normal;if(n!==void 0){const r=new Ze().getNormalMatrix(e);n.applyNormalMatrix(r),n.needsUpdate=!0}const s=this.attributes.tangent;return s!==void 0&&(s.transformDirection(e),s.needsUpdate=!0),this.boundingBox!==null&&this.computeBoundingBox(),this.boundingSphere!==null&&this.computeBoundingSphere(),this._transformed=!0,this}applyQuaternion(e){return Tn.makeRotationFromQuaternion(e),this.applyMatrix4(Tn),this}rotateX(e){return Tn.makeRotationX(e),this.applyMatrix4(Tn),this}rotateY(e){return Tn.makeRotationY(e),this.applyMatrix4(Tn),this}rotateZ(e){return Tn.makeRotationZ(e),this.applyMatrix4(Tn),this}translate(e,t,n){return Tn.makeTranslation(e,t,n),this.applyMatrix4(Tn),this}scale(e,t,n){return Tn.makeScale(e,t,n),this.applyMatrix4(Tn),this}lookAt(e){return el.lookAt(e),el.updateMatrix(),this.applyMatrix4(el.matrix),this}center(){return this.computeBoundingBox(),this.boundingBox.getCenter(Ts).negate(),this.translate(Ts.x,Ts.y,Ts.z),this}setFromPoints(e){const t=this.getAttribute("position");if(t===void 0){const n=[];for(let s=0,r=e.length;s<r;s++){const o=e[s];n.push(o.x,o.y,o.z||0)}this.setAttribute("position",new Je(n,3))}else{const n=Math.min(e.length,t.count);for(let s=0;s<n;s++){const r=e[s];t.setXYZ(s,r.x,r.y,r.z||0)}e.length>t.count&&Oe("BufferGeometry: Buffer size too small for points data. Use .dispose() and create a new geometry."),t.needsUpdate=!0}return this}computeBoundingBox(){this.boundingBox===null&&(this.boundingBox=new ui);const e=this.attributes.position,t=this.morphAttributes.position;if(e&&e.isGLBufferAttribute){$e("BufferGeometry.computeBoundingBox(): GLBufferAttribute requires a manual bounding box.",this),this.boundingBox.set(new B(-1/0,-1/0,-1/0),new B(1/0,1/0,1/0));return}if(e!==void 0){if(this.boundingBox.setFromBufferAttribute(e),t)for(let n=0,s=t.length;n<s;n++){const r=t[n];mn.setFromBufferAttribute(r),this.morphTargetsRelative?(Wt.addVectors(this.boundingBox.min,mn.min),this.boundingBox.expandByPoint(Wt),Wt.addVectors(this.boundingBox.max,mn.max),this.boundingBox.expandByPoint(Wt)):(this.boundingBox.expandByPoint(mn.min),this.boundingBox.expandByPoint(mn.max))}}else this.boundingBox.makeEmpty();(isNaN(this.boundingBox.min.x)||isNaN(this.boundingBox.min.y)||isNaN(this.boundingBox.min.z))&&$e('BufferGeometry.computeBoundingBox(): Computed min/max have NaN values. The "position" attribute is likely to have NaN values.',this)}computeBoundingSphere(){this.boundingSphere===null&&(this.boundingSphere=new fi);const e=this.attributes.position,t=this.morphAttributes.position;if(e&&e.isGLBufferAttribute){$e("BufferGeometry.computeBoundingSphere(): GLBufferAttribute requires a manual bounding sphere.",this),this.boundingSphere.set(new B,1/0);return}if(e){const n=this.boundingSphere.center;if(mn.setFromBufferAttribute(e),t)for(let r=0,o=t.length;r<o;r++){const a=t[r];fr.setFromBufferAttribute(a),this.morphTargetsRelative?(Wt.addVectors(mn.min,fr.min),mn.expandByPoint(Wt),Wt.addVectors(mn.max,fr.max),mn.expandByPoint(Wt)):(mn.expandByPoint(fr.min),mn.expandByPoint(fr.max))}mn.getCenter(n);let s=0;for(let r=0,o=e.count;r<o;r++)Wt.fromBufferAttribute(e,r),s=Math.max(s,n.distanceToSquared(Wt));if(t)for(let r=0,o=t.length;r<o;r++){const a=t[r],c=this.morphTargetsRelative;for(let l=0,h=a.count;l<h;l++)Wt.fromBufferAttribute(a,l),c&&(Ts.fromBufferAttribute(e,l),Wt.add(Ts)),s=Math.max(s,n.distanceToSquared(Wt))}this.boundingSphere.radius=Math.sqrt(s),isNaN(this.boundingSphere.radius)&&$e('BufferGeometry.computeBoundingSphere(): Computed radius is NaN. The "position" attribute is likely to have NaN values.',this)}}computeTangents(){const e=this.index,t=this.attributes;if(e===null||t.position===void 0||t.normal===void 0||t.uv===void 0){$e("BufferGeometry: .computeTangents() failed. Missing required attributes (index, position, normal or uv)");return}const n=t.position,s=t.normal,r=t.uv;let o=this.getAttribute("tangent");(o===void 0||o.count!==n.count)&&(o=new qt(new Float32Array(4*n.count),4),this.setAttribute("tangent",o));const a=[],c=[];for(let x=0;x<n.count;x++)a[x]=new B,c[x]=new B;const l=new B,h=new B,u=new B,f=new oe,d=new oe,p=new oe,_=new B,g=new B;function m(x,R,D){l.fromBufferAttribute(n,x),h.fromBufferAttribute(n,R),u.fromBufferAttribute(n,D),f.fromBufferAttribute(r,x),d.fromBufferAttribute(r,R),p.fromBufferAttribute(r,D),h.sub(l),u.sub(l),d.sub(f),p.sub(f);const P=1/(d.x*p.y-p.x*d.y);isFinite(P)&&(_.copy(h).multiplyScalar(p.y).addScaledVector(u,-d.y).multiplyScalar(P),g.copy(u).multiplyScalar(d.x).addScaledVector(h,-p.x).multiplyScalar(P),a[x].add(_),a[R].add(_),a[D].add(_),c[x].add(g),c[R].add(g),c[D].add(g))}let M=this.groups;M.length===0&&(M=[{start:0,count:e.count}]);for(let x=0,R=M.length;x<R;++x){const D=M[x],P=D.start,F=D.count;for(let A=P,I=P+F;A<I;A+=3)m(e.getX(A+0),e.getX(A+1),e.getX(A+2))}const b=new B,v=new B,w=new B,S=new B;function T(x){w.fromBufferAttribute(s,x),S.copy(w);const R=a[x];b.copy(R),b.sub(w.multiplyScalar(w.dot(R))).normalize(),v.crossVectors(S,R);const P=v.dot(c[x])<0?-1:1;o.setXYZW(x,b.x,b.y,b.z,P)}for(let x=0,R=M.length;x<R;++x){const D=M[x],P=D.start,F=D.count;for(let A=P,I=P+F;A<I;A+=3)T(e.getX(A+0)),T(e.getX(A+1)),T(e.getX(A+2))}this._transformed=!0}computeVertexNormals(){const e=this.index,t=this.getAttribute("position");if(t!==void 0){let n=this.getAttribute("normal");if(n===void 0||n.count!==t.count)n=new qt(new Float32Array(t.count*3),3),this.setAttribute("normal",n);else for(let f=0,d=n.count;f<d;f++)n.setXYZ(f,0,0,0);const s=new B,r=new B,o=new B,a=new B,c=new B,l=new B,h=new B,u=new B;if(e)for(let f=0,d=e.count;f<d;f+=3){const p=e.getX(f+0),_=e.getX(f+1),g=e.getX(f+2);s.fromBufferAttribute(t,p),r.fromBufferAttribute(t,_),o.fromBufferAttribute(t,g),h.subVectors(o,r),u.subVectors(s,r),h.cross(u),a.fromBufferAttribute(n,p),c.fromBufferAttribute(n,_),l.fromBufferAttribute(n,g),a.add(h),c.add(h),l.add(h),n.setXYZ(p,a.x,a.y,a.z),n.setXYZ(_,c.x,c.y,c.z),n.setXYZ(g,l.x,l.y,l.z)}else for(let f=0,d=t.count;f<d;f+=3)s.fromBufferAttribute(t,f+0),r.fromBufferAttribute(t,f+1),o.fromBufferAttribute(t,f+2),h.subVectors(o,r),u.subVectors(s,r),h.cross(u),n.setXYZ(f+0,h.x,h.y,h.z),n.setXYZ(f+1,h.x,h.y,h.z),n.setXYZ(f+2,h.x,h.y,h.z);this.normalizeNormals(),n.needsUpdate=!0}}normalizeNormals(){const e=this.attributes.normal;for(let t=0,n=e.count;t<n;t++)Wt.fromBufferAttribute(e,t),Wt.normalize(),e.setXYZ(t,Wt.x,Wt.y,Wt.z)}toNonIndexed(){function e(a,c){const l=a.array,h=a.itemSize,u=a.normalized,f=new l.constructor(c.length*h);let d=0,p=0;for(let _=0,g=c.length;_<g;_++){a.isInterleavedBufferAttribute?d=c[_]*a.data.stride+a.offset:d=c[_]*h;for(let m=0;m<h;m++)f[p++]=l[d++]}return new qt(f,h,u)}if(this.index===null)return Oe("BufferGeometry.toNonIndexed(): BufferGeometry is already non-indexed."),this;const t=new Mt,n=this.index.array,s=this.attributes;for(const a in s){const c=s[a],l=e(c,n);t.setAttribute(a,l)}const r=this.morphAttributes;for(const a in r){const c=[],l=r[a];for(let h=0,u=l.length;h<u;h++){const f=l[h],d=e(f,n);c.push(d)}t.morphAttributes[a]=c}t.morphTargetsRelative=this.morphTargetsRelative;const o=this.groups;for(let a=0,c=o.length;a<c;a++){const l=o[a];t.addGroup(l.start,l.count,l.materialIndex)}return t}toJSON(){const e={metadata:{version:4.7,type:"BufferGeometry",generator:"BufferGeometry.toJSON"}};if(e.uuid=this.uuid,e.type=this.parameters!==void 0&&this._transformed===!0?"BufferGeometry":this.type,e.name=this.name,Object.keys(this.userData).length>0&&(e.userData=this.userData),this.parameters!==void 0&&this._transformed!==!0){const c=this.parameters;for(const l in c)c[l]!==void 0&&(e[l]=c[l]);return e}e.data={attributes:{}};const t=this.index;t!==null&&(e.data.index={type:t.array.constructor.name,array:Array.prototype.slice.call(t.array)});const n=this.attributes;for(const c in n){const l=n[c];e.data.attributes[c]=l.toJSON(e.data)}const s={};let r=!1;for(const c in this.morphAttributes){const l=this.morphAttributes[c],h=[];for(let u=0,f=l.length;u<f;u++){const d=l[u];h.push(d.toJSON(e.data))}h.length>0&&(s[c]=h,r=!0)}r&&(e.data.morphAttributes=s,e.data.morphTargetsRelative=this.morphTargetsRelative);const o=this.groups;o.length>0&&(e.data.groups=JSON.parse(JSON.stringify(o)));const a=this.boundingSphere;return a!==null&&(e.data.boundingSphere=a.toJSON()),e}clone(){return new this.constructor().copy(this)}copy(e){this.index=null,this.attributes={},this.morphAttributes={},this.groups=[],this.boundingBox=null,this.boundingSphere=null;const t={};this.name=e.name;const n=e.index;n!==null&&this.setIndex(n.clone());const s=e.attributes;for(const l in s){const h=s[l];this.setAttribute(l,h.clone(t))}const r=e.morphAttributes;for(const l in r){const h=[],u=r[l];for(let f=0,d=u.length;f<d;f++)h.push(u[f].clone(t));this.morphAttributes[l]=h}this.morphTargetsRelative=e.morphTargetsRelative;const o=e.groups;for(let l=0,h=o.length;l<h;l++){const u=o[l];this.addGroup(u.start,u.count,u.materialIndex)}const a=e.boundingBox;a!==null&&(this.boundingBox=a.clone());const c=e.boundingSphere;return c!==null&&(this.boundingSphere=c.clone()),this.drawRange.start=e.drawRange.start,this.drawRange.count=e.drawRange.count,this.userData=e.userData,this._transformed=e._transformed,this}dispose(){this.dispatchEvent({type:"dispose"})}}class Ed{constructor(e,t){this.isInterleavedBuffer=!0,this.array=e,this.stride=t,this.count=e!==void 0?e.length/t:0,this.usage=xd,this.updateRanges=[],this.version=0,this.uuid=Un()}onUploadCallback(){}set needsUpdate(e){e===!0&&this.version++}setUsage(e){return this.usage=e,this}addUpdateRange(e,t){this.updateRanges.push({start:e,count:t})}clearUpdateRanges(){this.updateRanges.length=0}copy(e){return this.array=new e.array.constructor(e.array),this.count=e.count,this.stride=e.stride,this.usage=e.usage,this}copyAt(e,t,n){e*=this.stride,n*=t.stride;for(let s=0,r=this.stride;s<r;s++)this.array[e+s]=t.array[n+s];return this}set(e,t=0){return this.array.set(e,t),this}clone(e){e.arrayBuffers===void 0&&(e.arrayBuffers={}),this.array.buffer._uuid===void 0&&(this.array.buffer._uuid=Un()),e.arrayBuffers[this.array.buffer._uuid]===void 0&&(e.arrayBuffers[this.array.buffer._uuid]=this.array.slice(0).buffer);const t=new this.array.constructor(e.arrayBuffers[this.array.buffer._uuid]),n=new this.constructor(t,this.stride);return n.setUsage(this.usage),n}onUpload(e){return this.onUploadCallback=e,this}toJSON(e){e.arrayBuffers===void 0&&(e.arrayBuffers={}),this.array.buffer._uuid===void 0&&(this.array.buffer._uuid=Un()),e.arrayBuffers[this.array.buffer._uuid]===void 0&&(e.arrayBuffers[this.array.buffer._uuid]=Array.from(new Uint32Array(this.array.buffer)));const t={uuid:this.uuid,buffer:this.array.buffer._uuid,type:this.array.constructor.name,stride:this.stride};return t.usage=this.usage,t}}const nn=new B;class Yr{constructor(e,t,n,s=!1){this.isInterleavedBufferAttribute=!0,this.name="",this.data=e,this.itemSize=t,this.offset=n,this.normalized=s}get count(){return this.data.count}get array(){return this.data.array}set needsUpdate(e){this.data.needsUpdate=e}applyMatrix4(e){for(let t=0,n=this.data.count;t<n;t++)nn.fromBufferAttribute(this,t),nn.applyMatrix4(e),this.setXYZ(t,nn.x,nn.y,nn.z);return this}applyNormalMatrix(e){for(let t=0,n=this.count;t<n;t++)nn.fromBufferAttribute(this,t),nn.applyNormalMatrix(e),this.setXYZ(t,nn.x,nn.y,nn.z);return this}transformDirection(e){for(let t=0,n=this.count;t<n;t++)nn.fromBufferAttribute(this,t),nn.transformDirection(e),this.setXYZ(t,nn.x,nn.y,nn.z);return this}getComponent(e,t){let n=this.array[e*this.data.stride+this.offset+t];return this.normalized&&(n=Gn(n,this.array)),n}setComponent(e,t,n){return this.normalized&&(n=xt(n,this.array)),this.data.array[e*this.data.stride+this.offset+t]=n,this}setX(e,t){return this.normalized&&(t=xt(t,this.array)),this.data.array[e*this.data.stride+this.offset]=t,this}setY(e,t){return this.normalized&&(t=xt(t,this.array)),this.data.array[e*this.data.stride+this.offset+1]=t,this}setZ(e,t){return this.normalized&&(t=xt(t,this.array)),this.data.array[e*this.data.stride+this.offset+2]=t,this}setW(e,t){return this.normalized&&(t=xt(t,this.array)),this.data.array[e*this.data.stride+this.offset+3]=t,this}getX(e){let t=this.data.array[e*this.data.stride+this.offset];return this.normalized&&(t=Gn(t,this.array)),t}getY(e){let t=this.data.array[e*this.data.stride+this.offset+1];return this.normalized&&(t=Gn(t,this.array)),t}getZ(e){let t=this.data.array[e*this.data.stride+this.offset+2];return this.normalized&&(t=Gn(t,this.array)),t}getW(e){let t=this.data.array[e*this.data.stride+this.offset+3];return this.normalized&&(t=Gn(t,this.array)),t}setXY(e,t,n){return e=e*this.data.stride+this.offset,this.normalized&&(t=xt(t,this.array),n=xt(n,this.array)),this.data.array[e+0]=t,this.data.array[e+1]=n,this}setXYZ(e,t,n,s){return e=e*this.data.stride+this.offset,this.normalized&&(t=xt(t,this.array),n=xt(n,this.array),s=xt(s,this.array)),this.data.array[e+0]=t,this.data.array[e+1]=n,this.data.array[e+2]=s,this}setXYZW(e,t,n,s,r){return e=e*this.data.stride+this.offset,this.normalized&&(t=xt(t,this.array),n=xt(n,this.array),s=xt(s,this.array),r=xt(r,this.array)),this.data.array[e+0]=t,this.data.array[e+1]=n,this.data.array[e+2]=s,this.data.array[e+3]=r,this}clone(e){if(e===void 0){ha("InterleavedBufferAttribute.clone(): Cloning an interleaved buffer attribute will de-interleave buffer data.");const t=[];for(let n=0;n<this.count;n++){const s=n*this.data.stride+this.offset;for(let r=0;r<this.itemSize;r++)t.push(this.data.array[s+r])}return new qt(new this.array.constructor(t),this.itemSize,this.normalized)}else return e.interleavedBuffers===void 0&&(e.interleavedBuffers={}),e.interleavedBuffers[this.data.uuid]===void 0&&(e.interleavedBuffers[this.data.uuid]=this.data.clone(e)),new Yr(e.interleavedBuffers[this.data.uuid],this.itemSize,this.offset,this.normalized)}toJSON(e){if(e===void 0){ha("InterleavedBufferAttribute.toJSON(): Serializing an interleaved buffer attribute will de-interleave buffer data.");const t=[];for(let n=0;n<this.count;n++){const s=n*this.data.stride+this.offset;for(let r=0;r<this.itemSize;r++)t.push(this.data.array[s+r])}return{itemSize:this.itemSize,type:this.array.constructor.name,array:t,normalized:this.normalized}}else return e.interleavedBuffers===void 0&&(e.interleavedBuffers={}),e.interleavedBuffers[this.data.uuid]===void 0&&(e.interleavedBuffers[this.data.uuid]=this.data.toJSON(e)),{isInterleavedBufferAttribute:!0,itemSize:this.itemSize,data:this.data.uuid,offset:this.offset,normalized:this.normalized}}}const tl=new B,i0=new B,s0=new Ze;class ki{constructor(e=new B(1,0,0),t=0){this.isPlane=!0,this.normal=e,this.constant=t}set(e,t){return this.normal.copy(e),this.constant=t,this}setComponents(e,t,n,s){return this.normal.set(e,t,n),this.constant=s,this}setFromNormalAndCoplanarPoint(e,t){return this.normal.copy(e),this.constant=-t.dot(this.normal),this}setFromCoplanarPoints(e,t,n){const s=tl.subVectors(n,t).cross(i0.subVectors(e,t)).normalize();return this.setFromNormalAndCoplanarPoint(s,e),this}copy(e){return this.normal.copy(e.normal),this.constant=e.constant,this}normalize(){const e=1/this.normal.length();return this.normal.multiplyScalar(e),this.constant*=e,this}negate(){return this.constant*=-1,this.normal.negate(),this}distanceToPoint(e){return this.normal.dot(e)+this.constant}distanceToSphere(e){return this.distanceToPoint(e.center)-e.radius}projectPoint(e,t){return t.copy(e).addScaledVector(this.normal,-this.distanceToPoint(e))}intersectLine(e,t,n=!0){const s=e.delta(tl),r=this.normal.dot(s);if(r===0)return this.distanceToPoint(e.start)===0?t.copy(e.start):null;const o=-(e.start.dot(this.normal)+this.constant)/r;return n===!0&&(o<0||o>1)?null:t.copy(e.start).addScaledVector(s,o)}intersectsLine(e){const t=this.distanceToPoint(e.start),n=this.distanceToPoint(e.end);return t<0&&n>0||n<0&&t>0}intersectsBox(e){return e.intersectsPlane(this)}intersectsSphere(e){return e.intersectsPlane(this)}coplanarPoint(e){return e.copy(this.normal).multiplyScalar(-this.constant)}applyMatrix4(e,t){const n=t||s0.getNormalMatrix(e),s=this.coplanarPoint(tl).applyMatrix4(e),r=this.normal.applyMatrix3(n).normalize();return this.constant=-s.dot(r),this}translate(e){return this.constant-=e.dot(this.normal),this}equals(e){return e.normal.equals(this.normal)&&e.constant===this.constant}clone(){return new this.constructor().copy(this)}toJSON(){return{normal:this.normal.toArray(),constant:this.constant}}fromJSON(e){return this.normal.fromArray(e.normal),this.constant=e.constant,this}}let r0=0;class dn extends fs{constructor(){super(),this.isMaterial=!0,Object.defineProperty(this,"id",{value:r0++}),this.uuid=Un(),this.name="",this.type="Material",this.blending=Lr,this.side=Xi,this.vertexColors=!1,this.opacity=1,this.transparent=!1,this.alphaHash=!1,this.blendSrc=ad,this.blendDst=ld,this.blendEquation=Fs,this.blendSrcAlpha=null,this.blendDstAlpha=null,this.blendEquationAlpha=null,this.blendColor=new Ne(0,0,0),this.blendAlpha=0,this.depthFunc=zr,this.depthTest=!0,this.depthWrite=!0,this.stencilWriteMask=255,this.stencilFunc=fm,this.stencilRef=0,this.stencilFuncMask=255,this.stencilFail=Oa,this.stencilZFail=Oa,this.stencilZPass=Oa,this.stencilWrite=!1,this.clippingPlanes=null,this.clipIntersection=!1,this.clipShadows=!1,this.shadowSide=null,this.colorWrite=!0,this.precision=null,this.polygonOffset=!1,this.polygonOffsetFactor=0,this.polygonOffsetUnits=0,this.dithering=!1,this.alphaToCoverage=!1,this.premultipliedAlpha=!1,this.forceSinglePass=!1,this.allowOverride=!0,this.visible=!0,this.toneMapped=!0,this.userData={},this.version=0,this._alphaTest=0}get alphaTest(){return this._alphaTest}set alphaTest(e){this._alphaTest>0!=e>0&&this.version++,this._alphaTest=e}onBeforeRender(){}onBeforeCompile(){}customProgramCacheKey(){return this.onBeforeCompile.toString()}setValues(e){if(e!==void 0)for(const t in e){const n=e[t];if(n===void 0){Oe(`Material: parameter '${t}' has value of undefined.`);continue}const s=this[t];if(s===void 0){Oe(`Material: '${t}' is not a property of THREE.${this.type}.`);continue}s&&s.isColor?s.set(n):s&&s.isVector2&&n&&n.isVector2||s&&s.isEuler&&n&&n.isEuler||s&&s.isVector3&&n&&n.isVector3?s.copy(n):this[t]=n}}toJSON(e){const t=e===void 0||typeof e=="string";t&&(e={textures:{},images:{}});const n={metadata:{version:4.7,type:"Material",generator:"Material.toJSON"}};n.uuid=this.uuid,n.type=this.type,n.blending=this.blending,n.side=this.side,n.shadowSide=this.shadowSide,n.vertexColors=this.vertexColors,n.opacity=this.opacity,n.transparent=this.transparent,n.blendSrc=this.blendSrc,n.blendDst=this.blendDst,n.blendEquation=this.blendEquation,n.blendSrcAlpha=this.blendSrcAlpha,n.blendDstAlpha=this.blendDstAlpha,n.blendEquationAlpha=this.blendEquationAlpha,n.blendColor=this.blendColor.getHex(),n.blendAlpha=this.blendAlpha,n.depthFunc=this.depthFunc,n.depthTest=this.depthTest,n.depthWrite=this.depthWrite,n.colorWrite=this.colorWrite,n.clipIntersection=this.clipIntersection,n.clipShadows=this.clipShadows,n.stencilWriteMask=this.stencilWriteMask,n.stencilFunc=this.stencilFunc,n.stencilRef=this.stencilRef,n.stencilFuncMask=this.stencilFuncMask,n.stencilFail=this.stencilFail,n.stencilZFail=this.stencilZFail,n.stencilZPass=this.stencilZPass,n.stencilWrite=this.stencilWrite,n.polygonOffset=this.polygonOffset,n.polygonOffsetFactor=this.polygonOffsetFactor,n.polygonOffsetUnits=this.polygonOffsetUnits,n.dithering=this.dithering,n.alphaTest=this.alphaTest,n.alphaHash=this.alphaHash,n.alphaToCoverage=this.alphaToCoverage,n.premultipliedAlpha=this.premultipliedAlpha,n.forceSinglePass=this.forceSinglePass,n.allowOverride=this.allowOverride,n.visible=this.visible,n.toneMapped=this.toneMapped,n.name=this.name,this.color&&this.color.isColor&&(n.color=this.color.getHex()),this.roughness!==void 0&&(n.roughness=this.roughness),this.metalness!==void 0&&(n.metalness=this.metalness),this.sheen!==void 0&&(n.sheen=this.sheen),this.sheenColor&&this.sheenColor.isColor&&(n.sheenColor=this.sheenColor.getHex()),this.sheenRoughness!==void 0&&(n.sheenRoughness=this.sheenRoughness),this.emissive&&this.emissive.isColor&&(n.emissive=this.emissive.getHex()),this.emissiveIntensity!==void 0&&(n.emissiveIntensity=this.emissiveIntensity),this.specular&&this.specular.isColor&&(n.specular=this.specular.getHex()),this.specularIntensity!==void 0&&(n.specularIntensity=this.specularIntensity),this.specularColor&&this.specularColor.isColor&&(n.specularColor=this.specularColor.getHex()),this.shininess!==void 0&&(n.shininess=this.shininess),this.clearcoat!==void 0&&(n.clearcoat=this.clearcoat),this.clearcoatRoughness!==void 0&&(n.clearcoatRoughness=this.clearcoatRoughness),this.clearcoatMap&&this.clearcoatMap.isTexture&&(n.clearcoatMap=this.clearcoatMap.toJSON(e).uuid),this.clearcoatRoughnessMap&&this.clearcoatRoughnessMap.isTexture&&(n.clearcoatRoughnessMap=this.clearcoatRoughnessMap.toJSON(e).uuid),this.clearcoatNormalMap&&this.clearcoatNormalMap.isTexture&&(n.clearcoatNormalMap=this.clearcoatNormalMap.toJSON(e).uuid,n.clearcoatNormalScale=this.clearcoatNormalScale.toArray()),this.sheenColorMap&&this.sheenColorMap.isTexture&&(n.sheenColorMap=this.sheenColorMap.toJSON(e).uuid),this.sheenRoughnessMap&&this.sheenRoughnessMap.isTexture&&(n.sheenRoughnessMap=this.sheenRoughnessMap.toJSON(e).uuid),this.dispersion!==void 0&&(n.dispersion=this.dispersion),this.retroreflectivity!==void 0&&(n.retroreflectivity=this.retroreflectivity),this.iridescence!==void 0&&(n.iridescence=this.iridescence),this.iridescenceIOR!==void 0&&(n.iridescenceIOR=this.iridescenceIOR),this.iridescenceThicknessRange!==void 0&&(n.iridescenceThicknessRange=this.iridescenceThicknessRange),this.iridescenceMap&&this.iridescenceMap.isTexture&&(n.iridescenceMap=this.iridescenceMap.toJSON(e).uuid),this.iridescenceThicknessMap&&this.iridescenceThicknessMap.isTexture&&(n.iridescenceThicknessMap=this.iridescenceThicknessMap.toJSON(e).uuid),this.anisotropy!==void 0&&(n.anisotropy=this.anisotropy),this.anisotropyRotation!==void 0&&(n.anisotropyRotation=this.anisotropyRotation),this.anisotropyMap&&this.anisotropyMap.isTexture&&(n.anisotropyMap=this.anisotropyMap.toJSON(e).uuid),this.map&&this.map.isTexture&&(n.map=this.map.toJSON(e).uuid),this.matcap&&this.matcap.isTexture&&(n.matcap=this.matcap.toJSON(e).uuid),this.alphaMap&&this.alphaMap.isTexture&&(n.alphaMap=this.alphaMap.toJSON(e).uuid),this.lightMap&&this.lightMap.isTexture&&(n.lightMap=this.lightMap.toJSON(e).uuid,n.lightMapIntensity=this.lightMapIntensity),this.aoMap&&this.aoMap.isTexture&&(n.aoMap=this.aoMap.toJSON(e).uuid,n.aoMapIntensity=this.aoMapIntensity),this.bumpMap&&this.bumpMap.isTexture&&(n.bumpMap=this.bumpMap.toJSON(e).uuid,n.bumpScale=this.bumpScale),this.normalMap&&this.normalMap.isTexture&&(n.normalMap=this.normalMap.toJSON(e).uuid,n.normalMapType=this.normalMapType,n.normalScale=this.normalScale.toArray()),this.displacementMap&&this.displacementMap.isTexture&&(n.displacementMap=this.displacementMap.toJSON(e).uuid,n.displacementScale=this.displacementScale,n.displacementBias=this.displacementBias),this.roughnessMap&&this.roughnessMap.isTexture&&(n.roughnessMap=this.roughnessMap.toJSON(e).uuid),this.metalnessMap&&this.metalnessMap.isTexture&&(n.metalnessMap=this.metalnessMap.toJSON(e).uuid),this.emissiveMap&&this.emissiveMap.isTexture&&(n.emissiveMap=this.emissiveMap.toJSON(e).uuid),this.specularMap&&this.specularMap.isTexture&&(n.specularMap=this.specularMap.toJSON(e).uuid),this.specularIntensityMap&&this.specularIntensityMap.isTexture&&(n.specularIntensityMap=this.specularIntensityMap.toJSON(e).uuid),this.specularColorMap&&this.specularColorMap.isTexture&&(n.specularColorMap=this.specularColorMap.toJSON(e).uuid),this.envMap&&this.envMap.isTexture&&(n.envMap=this.envMap.toJSON(e).uuid,this.combine!==void 0&&(n.combine=this.combine)),this.envMapRotation!==void 0&&(n.envMapRotation=this.envMapRotation.toArray()),this.envMapIntensity!==void 0&&(n.envMapIntensity=this.envMapIntensity),this.reflectivity!==void 0&&(n.reflectivity=this.reflectivity),this.refractionRatio!==void 0&&(n.refractionRatio=this.refractionRatio),this.gradientMap&&this.gradientMap.isTexture&&(n.gradientMap=this.gradientMap.toJSON(e).uuid),this.transmission!==void 0&&(n.transmission=this.transmission),this.transmissionMap&&this.transmissionMap.isTexture&&(n.transmissionMap=this.transmissionMap.toJSON(e).uuid),this.thickness!==void 0&&(n.thickness=this.thickness),this.thicknessMap&&this.thicknessMap.isTexture&&(n.thicknessMap=this.thicknessMap.toJSON(e).uuid),this.attenuationDistance!==void 0&&(n.attenuationDistance=this.attenuationDistance),this.attenuationColor!==void 0&&(n.attenuationColor=this.attenuationColor.getHex()),this.size!==void 0&&(n.size=this.size),this.sizeAttenuation!==void 0&&(n.sizeAttenuation=this.sizeAttenuation),Array.isArray(this.clippingPlanes)&&this.clippingPlanes.length>0&&(n.clippingPlanes=this.clippingPlanes.map(r=>r.toJSON())),this.rotation!==void 0&&(n.rotation=this.rotation),this.depthPacking!==void 0&&(n.depthPacking=this.depthPacking),this.linewidth!==void 0&&(n.linewidth=this.linewidth),this.linecap!==void 0&&(n.linecap=this.linecap),this.linejoin!==void 0&&(n.linejoin=this.linejoin),this.dashSize!==void 0&&(n.dashSize=this.dashSize),this.gapSize!==void 0&&(n.gapSize=this.gapSize),this.scale!==void 0&&(n.scale=this.scale),this.wireframe!==void 0&&(n.wireframe=this.wireframe),this.wireframeLinewidth!==void 0&&(n.wireframeLinewidth=this.wireframeLinewidth),this.wireframeLinecap!==void 0&&(n.wireframeLinecap=this.wireframeLinecap),this.wireframeLinejoin!==void 0&&(n.wireframeLinejoin=this.wireframeLinejoin),this.flatShading!==void 0&&(n.flatShading=this.flatShading),this.fog!==void 0&&(n.fog=this.fog),Object.keys(this.userData).length>0&&(n.userData=this.userData);function s(r){const o=[];for(const a in r){const c=r[a];delete c.metadata,o.push(c)}return o}if(t){const r=s(e.textures),o=s(e.images);r.length>0&&(n.textures=r),o.length>0&&(n.images=o)}return n}fromJSON(e,t){if(e.uuid!==void 0&&(this.uuid=e.uuid),e.name!==void 0&&(this.name=e.name),e.color!==void 0&&this.color!==void 0&&this.color.setHex(e.color),e.roughness!==void 0&&(this.roughness=e.roughness),e.metalness!==void 0&&(this.metalness=e.metalness),e.sheen!==void 0&&(this.sheen=e.sheen),e.sheenColor!==void 0&&(this.sheenColor=new Ne().setHex(e.sheenColor)),e.sheenRoughness!==void 0&&(this.sheenRoughness=e.sheenRoughness),e.emissive!==void 0&&this.emissive!==void 0&&this.emissive.setHex(e.emissive),e.specular!==void 0&&this.specular!==void 0&&this.specular.setHex(e.specular),e.specularIntensity!==void 0&&(this.specularIntensity=e.specularIntensity),e.specularColor!==void 0&&this.specularColor!==void 0&&this.specularColor.setHex(e.specularColor),e.shininess!==void 0&&(this.shininess=e.shininess),e.clearcoat!==void 0&&(this.clearcoat=e.clearcoat),e.clearcoatRoughness!==void 0&&(this.clearcoatRoughness=e.clearcoatRoughness),e.dispersion!==void 0&&(this.dispersion=e.dispersion),e.retroreflectivity!==void 0&&(this.retroreflectivity=e.retroreflectivity),e.iridescence!==void 0&&(this.iridescence=e.iridescence),e.iridescenceIOR!==void 0&&(this.iridescenceIOR=e.iridescenceIOR),e.iridescenceThicknessRange!==void 0&&(this.iridescenceThicknessRange=e.iridescenceThicknessRange),e.transmission!==void 0&&(this.transmission=e.transmission),e.thickness!==void 0&&(this.thickness=e.thickness),e.attenuationDistance!==void 0&&(this.attenuationDistance=e.attenuationDistance),e.attenuationColor!==void 0&&this.attenuationColor!==void 0&&this.attenuationColor.setHex(e.attenuationColor),e.anisotropy!==void 0&&(this.anisotropy=e.anisotropy),e.anisotropyRotation!==void 0&&(this.anisotropyRotation=e.anisotropyRotation),e.fog!==void 0&&(this.fog=e.fog),e.flatShading!==void 0&&(this.flatShading=e.flatShading),e.blending!==void 0&&(this.blending=e.blending),e.combine!==void 0&&(this.combine=e.combine),e.side!==void 0&&(this.side=e.side),e.shadowSide!==void 0&&(this.shadowSide=e.shadowSide),e.opacity!==void 0&&(this.opacity=e.opacity),e.transparent!==void 0&&(this.transparent=e.transparent),e.alphaTest!==void 0&&(this.alphaTest=e.alphaTest),e.alphaHash!==void 0&&(this.alphaHash=e.alphaHash),e.depthFunc!==void 0&&(this.depthFunc=e.depthFunc),e.depthTest!==void 0&&(this.depthTest=e.depthTest),e.depthWrite!==void 0&&(this.depthWrite=e.depthWrite),e.colorWrite!==void 0&&(this.colorWrite=e.colorWrite),e.clippingPlanes!==void 0&&(this.clippingPlanes=e.clippingPlanes.map(n=>new ki().fromJSON(n))),e.clipIntersection!==void 0&&(this.clipIntersection=e.clipIntersection),e.clipShadows!==void 0&&(this.clipShadows=e.clipShadows),e.depthPacking!==void 0&&(this.depthPacking=e.depthPacking),e.blendSrc!==void 0&&(this.blendSrc=e.blendSrc),e.blendDst!==void 0&&(this.blendDst=e.blendDst),e.blendEquation!==void 0&&(this.blendEquation=e.blendEquation),e.blendSrcAlpha!==void 0&&(this.blendSrcAlpha=e.blendSrcAlpha),e.blendDstAlpha!==void 0&&(this.blendDstAlpha=e.blendDstAlpha),e.blendEquationAlpha!==void 0&&(this.blendEquationAlpha=e.blendEquationAlpha),e.blendColor!==void 0&&this.blendColor!==void 0&&this.blendColor.setHex(e.blendColor),e.blendAlpha!==void 0&&(this.blendAlpha=e.blendAlpha),e.stencilWriteMask!==void 0&&(this.stencilWriteMask=e.stencilWriteMask),e.stencilFunc!==void 0&&(this.stencilFunc=e.stencilFunc),e.stencilRef!==void 0&&(this.stencilRef=e.stencilRef),e.stencilFuncMask!==void 0&&(this.stencilFuncMask=e.stencilFuncMask),e.stencilFail!==void 0&&(this.stencilFail=e.stencilFail),e.stencilZFail!==void 0&&(this.stencilZFail=e.stencilZFail),e.stencilZPass!==void 0&&(this.stencilZPass=e.stencilZPass),e.stencilWrite!==void 0&&(this.stencilWrite=e.stencilWrite),e.wireframe!==void 0&&(this.wireframe=e.wireframe),e.wireframeLinewidth!==void 0&&(this.wireframeLinewidth=e.wireframeLinewidth),e.wireframeLinecap!==void 0&&(this.wireframeLinecap=e.wireframeLinecap),e.wireframeLinejoin!==void 0&&(this.wireframeLinejoin=e.wireframeLinejoin),e.rotation!==void 0&&(this.rotation=e.rotation),e.linewidth!==void 0&&(this.linewidth=e.linewidth),e.linecap!==void 0&&(this.linecap=e.linecap),e.linejoin!==void 0&&(this.linejoin=e.linejoin),e.dashSize!==void 0&&(this.dashSize=e.dashSize),e.gapSize!==void 0&&(this.gapSize=e.gapSize),e.scale!==void 0&&(this.scale=e.scale),e.polygonOffset!==void 0&&(this.polygonOffset=e.polygonOffset),e.polygonOffsetFactor!==void 0&&(this.polygonOffsetFactor=e.polygonOffsetFactor),e.polygonOffsetUnits!==void 0&&(this.polygonOffsetUnits=e.polygonOffsetUnits),e.dithering!==void 0&&(this.dithering=e.dithering),e.alphaToCoverage!==void 0&&(this.alphaToCoverage=e.alphaToCoverage),e.premultipliedAlpha!==void 0&&(this.premultipliedAlpha=e.premultipliedAlpha),e.forceSinglePass!==void 0&&(this.forceSinglePass=e.forceSinglePass),e.allowOverride!==void 0&&(this.allowOverride=e.allowOverride),e.visible!==void 0&&(this.visible=e.visible),e.toneMapped!==void 0&&(this.toneMapped=e.toneMapped),e.userData!==void 0&&(this.userData=e.userData),e.vertexColors!==void 0&&(typeof e.vertexColors=="number"?this.vertexColors=e.vertexColors>0:this.vertexColors=e.vertexColors),e.size!==void 0&&(this.size=e.size),e.sizeAttenuation!==void 0&&(this.sizeAttenuation=e.sizeAttenuation),e.map!==void 0&&(this.map=t[e.map]||null),e.matcap!==void 0&&(this.matcap=t[e.matcap]||null),e.alphaMap!==void 0&&(this.alphaMap=t[e.alphaMap]||null),e.bumpMap!==void 0&&(this.bumpMap=t[e.bumpMap]||null),e.bumpScale!==void 0&&(this.bumpScale=e.bumpScale),e.normalMap!==void 0&&(this.normalMap=t[e.normalMap]||null),e.normalMapType!==void 0&&(this.normalMapType=e.normalMapType),e.normalScale!==void 0){let n=e.normalScale;Array.isArray(n)===!1&&(n=[n,n]),this.normalScale=new oe().fromArray(n)}return e.displacementMap!==void 0&&(this.displacementMap=t[e.displacementMap]||null),e.displacementScale!==void 0&&(this.displacementScale=e.displacementScale),e.displacementBias!==void 0&&(this.displacementBias=e.displacementBias),e.roughnessMap!==void 0&&(this.roughnessMap=t[e.roughnessMap]||null),e.metalnessMap!==void 0&&(this.metalnessMap=t[e.metalnessMap]||null),e.emissiveMap!==void 0&&(this.emissiveMap=t[e.emissiveMap]||null),e.emissiveIntensity!==void 0&&(this.emissiveIntensity=e.emissiveIntensity),e.specularMap!==void 0&&(this.specularMap=t[e.specularMap]||null),e.specularIntensityMap!==void 0&&(this.specularIntensityMap=t[e.specularIntensityMap]||null),e.specularColorMap!==void 0&&(this.specularColorMap=t[e.specularColorMap]||null),e.envMap!==void 0&&(this.envMap=t[e.envMap]||null),e.envMapRotation!==void 0&&this.envMapRotation.fromArray(e.envMapRotation),e.envMapIntensity!==void 0&&(this.envMapIntensity=e.envMapIntensity),e.reflectivity!==void 0&&(this.reflectivity=e.reflectivity),e.refractionRatio!==void 0&&(this.refractionRatio=e.refractionRatio),e.lightMap!==void 0&&(this.lightMap=t[e.lightMap]||null),e.lightMapIntensity!==void 0&&(this.lightMapIntensity=e.lightMapIntensity),e.aoMap!==void 0&&(this.aoMap=t[e.aoMap]||null),e.aoMapIntensity!==void 0&&(this.aoMapIntensity=e.aoMapIntensity),e.gradientMap!==void 0&&(this.gradientMap=t[e.gradientMap]||null),e.clearcoatMap!==void 0&&(this.clearcoatMap=t[e.clearcoatMap]||null),e.clearcoatRoughnessMap!==void 0&&(this.clearcoatRoughnessMap=t[e.clearcoatRoughnessMap]||null),e.clearcoatNormalMap!==void 0&&(this.clearcoatNormalMap=t[e.clearcoatNormalMap]||null),e.clearcoatNormalScale!==void 0&&(this.clearcoatNormalScale=new oe().fromArray(e.clearcoatNormalScale)),e.iridescenceMap!==void 0&&(this.iridescenceMap=t[e.iridescenceMap]||null),e.iridescenceThicknessMap!==void 0&&(this.iridescenceThicknessMap=t[e.iridescenceThicknessMap]||null),e.transmissionMap!==void 0&&(this.transmissionMap=t[e.transmissionMap]||null),e.thicknessMap!==void 0&&(this.thicknessMap=t[e.thicknessMap]||null),e.anisotropyMap!==void 0&&(this.anisotropyMap=t[e.anisotropyMap]||null),e.sheenColorMap!==void 0&&(this.sheenColorMap=t[e.sheenColorMap]||null),e.sheenRoughnessMap!==void 0&&(this.sheenRoughnessMap=t[e.sheenRoughnessMap]||null),this}clone(){return new this.constructor().copy(this)}copy(e){this.name=e.name,this.blending=e.blending,this.side=e.side,this.vertexColors=e.vertexColors,this.opacity=e.opacity,this.transparent=e.transparent,this.blendSrc=e.blendSrc,this.blendDst=e.blendDst,this.blendEquation=e.blendEquation,this.blendSrcAlpha=e.blendSrcAlpha,this.blendDstAlpha=e.blendDstAlpha,this.blendEquationAlpha=e.blendEquationAlpha,this.blendColor.copy(e.blendColor),this.blendAlpha=e.blendAlpha,this.depthFunc=e.depthFunc,this.depthTest=e.depthTest,this.depthWrite=e.depthWrite,this.stencilWriteMask=e.stencilWriteMask,this.stencilFunc=e.stencilFunc,this.stencilRef=e.stencilRef,this.stencilFuncMask=e.stencilFuncMask,this.stencilFail=e.stencilFail,this.stencilZFail=e.stencilZFail,this.stencilZPass=e.stencilZPass,this.stencilWrite=e.stencilWrite;const t=e.clippingPlanes;let n=null;if(t!==null){const s=t.length;n=new Array(s);for(let r=0;r!==s;++r)n[r]=t[r].clone()}return this.clippingPlanes=n,this.clipIntersection=e.clipIntersection,this.clipShadows=e.clipShadows,this.shadowSide=e.shadowSide,this.colorWrite=e.colorWrite,this.precision=e.precision,this.polygonOffset=e.polygonOffset,this.polygonOffsetFactor=e.polygonOffsetFactor,this.polygonOffsetUnits=e.polygonOffsetUnits,this.dithering=e.dithering,this.alphaTest=e.alphaTest,this.alphaHash=e.alphaHash,this.alphaToCoverage=e.alphaToCoverage,this.premultipliedAlpha=e.premultipliedAlpha,this.forceSinglePass=e.forceSinglePass,this.allowOverride=e.allowOverride,this.visible=e.visible,this.toneMapped=e.toneMapped,this.userData=JSON.parse(JSON.stringify(e.userData)),this}dispose(){this.dispatchEvent({type:"dispose"})}set needsUpdate(e){e===!0&&this.version++}}class th extends dn{constructor(e){super(),this.isSpriteMaterial=!0,this.type="SpriteMaterial",this.color=new Ne(16777215),this.map=null,this.alphaMap=null,this.rotation=0,this.sizeAttenuation=!0,this.transparent=!0,this.fog=!0,this.setValues(e)}copy(e){return super.copy(e),this.color.copy(e.color),this.map=e.map,this.alphaMap=e.alphaMap,this.rotation=e.rotation,this.sizeAttenuation=e.sizeAttenuation,this.fog=e.fog,this}}let Es;const dr=new B,As=new B,Rs=new B,Cs=new oe,pr=new oe,Ad=new Qe,go=new B,mr=new B,_o=new B,mu=new oe,nl=new oe,gu=new oe;class Rd extends Rt{constructor(e=new th){if(super(),this.isSprite=!0,this.type="Sprite",Es===void 0){Es=new Mt;const t=new Float32Array([-.5,-.5,0,0,0,.5,-.5,0,1,0,.5,.5,0,1,1,-.5,.5,0,0,1]),n=new Ed(t,5);Es.setIndex([0,1,2,0,2,3]),Es.setAttribute("position",new Yr(n,3,0,!1)),Es.setAttribute("uv",new Yr(n,2,3,!1))}this.geometry=Es,this.material=e,this.center=new oe(.5,.5),this.count=1}intersectsFrustum(e){return e.intersectsSprite(this)}raycast(e,t){e.camera===null&&$e('Sprite: "Raycaster.camera" needs to be set in order to raycast against sprites.'),As.setFromMatrixScale(this.matrixWorld),Ad.copy(e.camera.matrixWorld),this.modelViewMatrix.multiplyMatrices(e.camera.matrixWorldInverse,this.matrixWorld),Rs.setFromMatrixPosition(this.modelViewMatrix),e.camera.isPerspectiveCamera&&this.material.sizeAttenuation===!1&&As.multiplyScalar(-Rs.z);const n=this.material.rotation;let s,r;n!==0&&(r=Math.cos(n),s=Math.sin(n));const o=this.center;xo(go.set(-.5,-.5,0),Rs,o,As,s,r),xo(mr.set(.5,-.5,0),Rs,o,As,s,r),xo(_o.set(.5,.5,0),Rs,o,As,s,r),mu.set(0,0),nl.set(1,0),gu.set(1,1);let a=e.ray.intersectTriangle(go,mr,_o,!1,dr);if(a===null&&(xo(mr.set(-.5,.5,0),Rs,o,As,s,r),nl.set(0,1),a=e.ray.intersectTriangle(go,_o,mr,!1,dr),a===null))return;const c=e.ray.origin.distanceTo(dr);c<e.near||c>e.far||t.push({distance:c,point:dr.clone(),uv:Pn.getInterpolation(dr,go,mr,_o,mu,nl,gu,new oe),face:null,object:this})}copy(e,t){return super.copy(e,t),e.center!==void 0&&this.center.copy(e.center),this.material=e.material,this}}function xo(i,e,t,n,s,r){Cs.subVectors(i,t).addScalar(.5).multiply(n),s!==void 0?(pr.x=r*Cs.x-s*Cs.y,pr.y=s*Cs.x+r*Cs.y):pr.copy(Cs),i.copy(e),i.x+=pr.x,i.y+=pr.y,i.applyMatrix4(Ad)}const vi=new B,il=new B,vo=new B,Mo=new B;class Ea{constructor(e=new B,t=new B(0,0,-1)){this.origin=e,this.direction=t}set(e,t){return this.origin.copy(e),this.direction.copy(t),this}copy(e){return this.origin.copy(e.origin),this.direction.copy(e.direction),this}at(e,t){return t.copy(this.origin).addScaledVector(this.direction,e)}lookAt(e){return this.direction.copy(e).sub(this.origin).normalize(),this}recast(e){return this.origin.copy(this.at(e,vi)),this}closestPointToPoint(e,t){t.subVectors(e,this.origin);const n=t.dot(this.direction);return n<0?t.copy(this.origin):t.copy(this.origin).addScaledVector(this.direction,n)}distanceToPoint(e){return Math.sqrt(this.distanceSqToPoint(e))}distanceSqToPoint(e){const t=vi.subVectors(e,this.origin).dot(this.direction);return t<0?this.origin.distanceToSquared(e):(vi.copy(this.origin).addScaledVector(this.direction,t),vi.distanceToSquared(e))}distanceSqToSegment(e,t,n,s){il.copy(e).add(t).multiplyScalar(.5),vo.copy(t).sub(e).normalize(),Mo.copy(this.origin).sub(il);const r=e.distanceTo(t)*.5,o=-this.direction.dot(vo),a=Mo.dot(this.direction),c=-Mo.dot(vo),l=Mo.lengthSq(),h=Math.abs(1-o*o);let u,f,d,p;if(h>0)if(u=o*c-a,f=o*a-c,p=r*h,u>=0)if(f>=-p)if(f<=p){const _=1/h;u*=_,f*=_,d=u*(u+o*f+2*a)+f*(o*u+f+2*c)+l}else f=r,u=Math.max(0,-(o*f+a)),d=-u*u+f*(f+2*c)+l;else f=-r,u=Math.max(0,-(o*f+a)),d=-u*u+f*(f+2*c)+l;else f<=-p?(u=Math.max(0,-(-o*r+a)),f=u>0?-r:Math.min(Math.max(-r,-c),r),d=-u*u+f*(f+2*c)+l):f<=p?(u=0,f=Math.min(Math.max(-r,-c),r),d=f*(f+2*c)+l):(u=Math.max(0,-(o*r+a)),f=u>0?r:Math.min(Math.max(-r,-c),r),d=-u*u+f*(f+2*c)+l);else f=o>0?-r:r,u=Math.max(0,-(o*f+a)),d=-u*u+f*(f+2*c)+l;return n&&n.copy(this.origin).addScaledVector(this.direction,u),s&&s.copy(il).addScaledVector(vo,f),d}intersectSphere(e,t){if(e.radius<0)return null;vi.subVectors(e.center,this.origin);const n=vi.dot(this.direction),s=vi.dot(vi)-n*n,r=e.radius*e.radius;if(s>r)return null;const o=Math.sqrt(r-s),a=n-o,c=n+o;return c<0?null:a<0?this.at(c,t):this.at(a,t)}intersectsSphere(e){return e.radius<0?!1:this.distanceSqToPoint(e.center)<=e.radius*e.radius}distanceToPlane(e){const t=e.normal.dot(this.direction);if(t===0)return e.distanceToPoint(this.origin)===0?0:null;const n=-(this.origin.dot(e.normal)+e.constant)/t;return n>=0?n:null}intersectPlane(e,t){const n=this.distanceToPlane(e);return n===null?null:this.at(n,t)}intersectsPlane(e){const t=e.distanceToPoint(this.origin);return t===0||e.normal.dot(this.direction)*t<0}intersectBox(e,t){let n,s,r,o,a,c;const l=1/this.direction.x,h=1/this.direction.y,u=1/this.direction.z,f=this.origin;return l>=0?(n=(e.min.x-f.x)*l,s=(e.max.x-f.x)*l):(n=(e.max.x-f.x)*l,s=(e.min.x-f.x)*l),h>=0?(r=(e.min.y-f.y)*h,o=(e.max.y-f.y)*h):(r=(e.max.y-f.y)*h,o=(e.min.y-f.y)*h),n>o||r>s||((r>n||isNaN(n))&&(n=r),(o<s||isNaN(s))&&(s=o),u>=0?(a=(e.min.z-f.z)*u,c=(e.max.z-f.z)*u):(a=(e.max.z-f.z)*u,c=(e.min.z-f.z)*u),n>c||a>s)||((a>n||n!==n)&&(n=a),(c<s||s!==s)&&(s=c),s<0)?null:this.at(n>=0?n:s,t)}intersectsBox(e){return this.intersectBox(e,vi)!==null}intersectTriangle(e,t,n,s,r){const o=this.origin,a=this.direction,c=a.x,l=a.y,h=a.z,u=e.x-o.x,f=e.y-o.y,d=e.z-o.z,p=t.x-o.x,_=t.y-o.y,g=t.z-o.z,m=n.x-o.x,M=n.y-o.y,b=n.z-o.z,v=Math.abs(c),w=Math.abs(l),S=Math.abs(h);let T,x,R,D,P,F,A,I,O,H,C,N;if(v>=w&&v>=S?(R=c,F=u,O=p,N=m,c>=0?(T=l,x=h,D=f,P=d,A=_,I=g,H=M,C=b):(T=h,x=l,D=d,P=f,A=g,I=_,H=b,C=M)):w>=S?(R=l,F=f,O=_,N=M,l>=0?(T=h,x=c,D=d,P=u,A=g,I=p,H=b,C=m):(T=c,x=h,D=u,P=d,A=p,I=g,H=m,C=b)):(R=h,F=d,O=g,N=b,h>=0?(T=c,x=l,D=u,P=f,A=p,I=_,H=m,C=M):(T=l,x=c,D=f,P=u,A=_,I=p,H=M,C=m)),R===0)return null;const U=T/R,k=x/R,V=1/R,ee=D-U*F,re=P-k*F,Se=A-U*O,be=I-k*O,Ve=H-U*N,J=C-k*N,j=Ve*be-J*Se,de=ee*J-re*Ve,Ue=Se*re-be*ee;if(s){if(j<0||de<0||Ue<0)return null}else if((j<0||de<0||Ue<0)&&(j>0||de>0||Ue>0))return null;const ve=j+de+Ue;if(ve===0)return null;const Ge=V*(j*F+de*O+Ue*N);return(ve>0?Ge<0:Ge>0)?null:this.at(Ge/ve,r)}applyMatrix4(e){return this.origin.applyMatrix4(e),this.direction.transformDirection(e),this}equals(e){return e.origin.equals(this.origin)&&e.direction.equals(this.direction)}clone(){return new this.constructor().copy(this)}}class vn extends dn{constructor(e){super(),this.isMeshBasicMaterial=!0,this.type="MeshBasicMaterial",this.color=new Ne(16777215),this.map=null,this.lightMap=null,this.lightMapIntensity=1,this.aoMap=null,this.aoMapIntensity=1,this.specularMap=null,this.alphaMap=null,this.envMap=null,this.envMapRotation=new ci,this.combine=Fc,this.reflectivity=1,this.refractionRatio=.98,this.wireframe=!1,this.wireframeLinewidth=1,this.wireframeLinecap="round",this.wireframeLinejoin="round",this.fog=!0,this.setValues(e)}copy(e){return super.copy(e),this.color.copy(e.color),this.map=e.map,this.lightMap=e.lightMap,this.lightMapIntensity=e.lightMapIntensity,this.aoMap=e.aoMap,this.aoMapIntensity=e.aoMapIntensity,this.specularMap=e.specularMap,this.alphaMap=e.alphaMap,this.envMap=e.envMap,this.envMapRotation.copy(e.envMapRotation),this.combine=e.combine,this.reflectivity=e.reflectivity,this.refractionRatio=e.refractionRatio,this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this.wireframeLinecap=e.wireframeLinecap,this.wireframeLinejoin=e.wireframeLinejoin,this.fog=e.fog,this}}const _u=new Qe,Zi=new Ea,yo=new fi,xu=new B,So=new B,wo=new B,bo=new B,sl=new B,To=new B,vu=new B,Eo=new B;class K extends Rt{constructor(e=new Mt,t=new vn){super(),this.isMesh=!0,this.type="Mesh",this.geometry=e,this.material=t,this.morphTargetDictionary=void 0,this.morphTargetInfluences=void 0,this.count=1,this.updateMorphTargets()}copy(e,t){return super.copy(e,t),e.morphTargetInfluences!==void 0&&(this.morphTargetInfluences=e.morphTargetInfluences.slice()),e.morphTargetDictionary!==void 0&&(this.morphTargetDictionary=Object.assign({},e.morphTargetDictionary)),this.material=Array.isArray(e.material)?e.material.slice():e.material,this.geometry=e.geometry,this}updateMorphTargets(){const t=this.geometry.morphAttributes,n=Object.keys(t);if(n.length>0){const s=t[n[0]];if(s!==void 0){this.morphTargetInfluences=[],this.morphTargetDictionary={};for(let r=0,o=s.length;r<o;r++){const a=s[r].name||String(r);this.morphTargetInfluences.push(0),this.morphTargetDictionary[a]=r}}}}getVertexPosition(e,t){const n=this.geometry,s=n.attributes.position,r=n.morphAttributes.position,o=n.morphTargetsRelative;t.fromBufferAttribute(s,e);const a=this.morphTargetInfluences;if(r&&a){To.set(0,0,0);for(let c=0,l=r.length;c<l;c++){const h=a[c],u=r[c];h!==0&&(sl.fromBufferAttribute(u,e),o?To.addScaledVector(sl,h):To.addScaledVector(sl.sub(t),h))}t.add(To)}return t}intersectsFrustum(e){return e.intersectsObject(this)}raycast(e,t){const n=this.geometry,s=this.material,r=this.matrixWorld;s!==void 0&&(n.boundingSphere===null&&n.computeBoundingSphere(),yo.copy(n.boundingSphere),yo.applyMatrix4(r),Zi.copy(e.ray).recast(e.near),!(yo.containsPoint(Zi.origin)===!1&&(Zi.intersectSphere(yo,xu)===null||Zi.origin.distanceToSquared(xu)>(e.far-e.near)**2))&&(_u.copy(r).invert(),Zi.copy(e.ray).applyMatrix4(_u),!(n.boundingBox!==null&&Zi.intersectsBox(n.boundingBox)===!1)&&this._computeIntersections(e,t,Zi)))}_computeIntersections(e,t,n){let s;const r=this.geometry,o=this.material,a=r.index,c=r.attributes.position,l=r.attributes.uv,h=r.attributes.uv1,u=r.attributes.normal,f=r.groups,d=r.drawRange;if(a!==null)if(Array.isArray(o))for(let p=0,_=f.length;p<_;p++){const g=f[p],m=o[g.materialIndex],M=Math.max(g.start,d.start),b=Math.min(a.count,Math.min(g.start+g.count,d.start+d.count));for(let v=M,w=b;v<w;v+=3){const S=a.getX(v),T=a.getX(v+1),x=a.getX(v+2);s=Ao(this,m,e,n,l,h,u,S,T,x),s&&(s.faceIndex=Math.floor(v/3),s.face.materialIndex=g.materialIndex,t.push(s))}}else{const p=Math.max(0,d.start),_=Math.min(a.count,d.start+d.count);for(let g=p,m=_;g<m;g+=3){const M=a.getX(g),b=a.getX(g+1),v=a.getX(g+2);s=Ao(this,o,e,n,l,h,u,M,b,v),s&&(s.faceIndex=Math.floor(g/3),t.push(s))}}else if(c!==void 0)if(Array.isArray(o))for(let p=0,_=f.length;p<_;p++){const g=f[p],m=o[g.materialIndex],M=Math.max(g.start,d.start),b=Math.min(c.count,Math.min(g.start+g.count,d.start+d.count));for(let v=M,w=b;v<w;v+=3){const S=v,T=v+1,x=v+2;s=Ao(this,m,e,n,l,h,u,S,T,x),s&&(s.faceIndex=Math.floor(v/3),s.face.materialIndex=g.materialIndex,t.push(s))}}else{const p=Math.max(0,d.start),_=Math.min(c.count,d.start+d.count);for(let g=p,m=_;g<m;g+=3){const M=g,b=g+1,v=g+2;s=Ao(this,o,e,n,l,h,u,M,b,v),s&&(s.faceIndex=Math.floor(g/3),t.push(s))}}}}function o0(i,e,t,n,s,r,o,a){let c;if(e.side===un?c=n.intersectTriangle(o,r,s,!0,a):c=n.intersectTriangle(s,r,o,e.side===Xi,a),c===null)return null;Eo.copy(a),Eo.applyMatrix4(i.matrixWorld);const l=t.ray.origin.distanceTo(Eo);return l<t.near||l>t.far?null:{distance:l,point:Eo.clone(),object:i}}function Ao(i,e,t,n,s,r,o,a,c,l){i.getVertexPosition(a,So),i.getVertexPosition(c,wo),i.getVertexPosition(l,bo);const h=o0(i,e,t,n,So,wo,bo,vu);if(h){const u=new B;Pn.getBarycoord(vu,So,wo,bo,u),s&&(h.uv=Pn.getInterpolatedAttribute(s,a,c,l,u,new oe)),r&&(h.uv1=Pn.getInterpolatedAttribute(r,a,c,l,u,new oe)),o&&(h.normal=Pn.getInterpolatedAttribute(o,a,c,l,u,new B),h.normal.dot(n.direction)>0&&h.normal.multiplyScalar(-1));const f={a,b:c,c:l,normal:new B,materialIndex:0};Pn.getNormal(So,wo,bo,f.normal),h.face=f,h.barycoord=u}return h}const gr=new St,Mu=new St,yu=new St,a0=new St,Su=new Qe,Ro=new B,rl=new fi,wu=new Qe,ol=new Ea;class l0 extends K{constructor(e,t){super(e,t),this.isSkinnedMesh=!0,this.type="SkinnedMesh",this.bindMode=Jh,this.bindMatrix=new Qe,this.bindMatrixInverse=new Qe,this.boundingBox=null,this.boundingSphere=null}computeBoundingBox(){const e=this.geometry;this.boundingBox===null&&(this.boundingBox=new ui),this.boundingBox.makeEmpty();const t=e.getAttribute("position");for(let n=0;n<t.count;n++)this.getVertexPosition(n,Ro),this.boundingBox.expandByPoint(Ro)}computeBoundingSphere(){const e=this.geometry;this.boundingSphere===null&&(this.boundingSphere=new fi),this.boundingSphere.makeEmpty();const t=e.getAttribute("position");for(let n=0;n<t.count;n++)this.getVertexPosition(n,Ro),this.boundingSphere.expandByPoint(Ro)}copy(e,t){return super.copy(e,t),this.bindMode=e.bindMode,this.bindMatrix.copy(e.bindMatrix),this.bindMatrixInverse.copy(e.bindMatrixInverse),this.skeleton=e.skeleton,e.boundingBox!==null&&(this.boundingBox=e.boundingBox.clone()),e.boundingSphere!==null&&(this.boundingSphere=e.boundingSphere.clone()),this}raycast(e,t){const n=this.material,s=this.matrixWorld;n!==void 0&&(this.boundingSphere===null&&this.computeBoundingSphere(),rl.copy(this.boundingSphere),rl.applyMatrix4(s),e.ray.intersectsSphere(rl)!==!1&&(wu.copy(s).invert(),ol.copy(e.ray).applyMatrix4(wu),!(this.boundingBox!==null&&ol.intersectsBox(this.boundingBox)===!1)&&this._computeIntersections(e,t,ol)))}getVertexPosition(e,t){return super.getVertexPosition(e,t),this.applyBoneTransform(e,t),t}bind(e,t){this.skeleton=e,t===void 0&&(this.updateMatrixWorld(!0),this.skeleton.calculateInverses(),t=this.matrixWorld),this.bindMatrix.copy(t),this.bindMatrixInverse.copy(t).invert()}pose(){this.skeleton.pose()}normalizeSkinWeights(){const e=new St,t=this.geometry.attributes.skinWeight;for(let n=0,s=t.count;n<s;n++){e.fromBufferAttribute(t,n);const r=1/e.manhattanLength();r!==1/0?e.multiplyScalar(r):e.set(1,0,0,0),t.setXYZW(n,e.x,e.y,e.z,e.w)}}updateMatrixWorld(e){super.updateMatrixWorld(e),this.bindMode===Jh?this.bindMatrixInverse.copy(this.matrixWorld).invert():this.bindMode===am?this.bindMatrixInverse.copy(this.bindMatrix).invert():Oe("SkinnedMesh: Unrecognized bindMode: "+this.bindMode)}applyBoneTransform(e,t){const n=this.skeleton,s=this.geometry;Mu.fromBufferAttribute(s.attributes.skinIndex,e),yu.fromBufferAttribute(s.attributes.skinWeight,e),t.isVector4?(gr.copy(t),t.set(0,0,0,0)):(gr.set(...t,1),t.set(0,0,0)),gr.applyMatrix4(this.bindMatrix);for(let r=0;r<4;r++){const o=yu.getComponent(r);if(o!==0){const a=Mu.getComponent(r);Su.multiplyMatrices(n.bones[a].matrixWorld,n.boneInverses[a]),t.addScaledVector(a0.copy(gr).applyMatrix4(Su),o)}}return t.isVector4&&(t.w=gr.w),t.applyMatrix4(this.bindMatrixInverse)}}class Cd extends Rt{constructor(){super(),this.isBone=!0,this.type="Bone"}}class nh extends Ht{constructor(e=null,t=1,n=1,s,r,o,a,c,l=kt,h=kt,u,f){super(null,o,a,c,l,h,s,r,u,f),this.isDataTexture=!0,this.image={data:e,width:t,height:n},this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1}}const bu=new Qe,c0=new Qe;class ih{constructor(e=[],t=[]){this.uuid=Un(),this.bones=e.slice(0),this.boneInverses=t,this.boneMatrices=null,this.boneTexture=null,this.init()}init(){const e=this.bones,t=this.boneInverses;if(this.boneMatrices=new Float32Array(e.length*16),t.length===0)this.calculateInverses();else if(e.length!==t.length){Oe("Skeleton: Number of inverse bone matrices does not match amount of bones."),this.boneInverses=[];for(let n=0,s=this.bones.length;n<s;n++)this.boneInverses.push(new Qe)}}calculateInverses(){this.boneInverses.length=0;for(let e=0,t=this.bones.length;e<t;e++){const n=new Qe;this.bones[e]&&n.copy(this.bones[e].matrixWorld).invert(),this.boneInverses.push(n)}}pose(){for(let e=0,t=this.bones.length;e<t;e++){const n=this.bones[e];n&&n.matrixWorld.copy(this.boneInverses[e]).invert()}for(let e=0,t=this.bones.length;e<t;e++){const n=this.bones[e];n&&(n.parent&&n.parent.isBone?(n.matrix.copy(n.parent.matrixWorld).invert(),n.matrix.multiply(n.matrixWorld)):n.matrix.copy(n.matrixWorld),n.matrix.decompose(n.position,n.quaternion,n.scale))}}update(){const e=this.bones,t=this.boneInverses,n=this.boneMatrices,s=this.boneTexture;for(let r=0,o=e.length;r<o;r++){const a=e[r]?e[r].matrixWorld:c0;bu.multiplyMatrices(a,t[r]),bu.toArray(n,r*16)}s!==null&&(s.needsUpdate=!0)}clone(){return new ih(this.bones,this.boneInverses)}computeBoneTexture(){let e=Math.sqrt(this.bones.length*4);e=Math.ceil(e/4)*4,e=Math.max(e,4);const t=new Float32Array(e*e*4);t.set(this.boneMatrices);const n=new nh(t,e,e,Ln,In);return n.needsUpdate=!0,this.boneMatrices=t,this.boneTexture=n,this}getBoneByName(e){for(let t=0,n=this.bones.length;t<n;t++){const s=this.bones[t];if(s.name===e)return s}}dispose(){this.boneTexture!==null&&(this.boneTexture.dispose(),this.boneTexture=null)}fromJSON(e,t){this.uuid=e.uuid;for(let n=0,s=e.bones.length;n<s;n++){const r=e.bones[n];let o=t[r];o===void 0&&(Oe("Skeleton: No bone found with UUID:",r),o=new Cd),this.bones.push(o),this.boneInverses.push(new Qe().fromArray(e.boneInverses[n]))}return this.init(),this}toJSON(){const e={metadata:{version:4.7,type:"Skeleton",generator:"Skeleton.toJSON"},bones:[],boneInverses:[]};e.uuid=this.uuid;const t=this.bones,n=this.boneInverses;for(let s=0,r=t.length;s<r;s++){const o=t[s];e.bones.push(o.uuid);const a=n[s];e.boneInverses.push(a.toArray())}return e}}class fa extends qt{constructor(e,t,n,s=1){super(e,t,n),this.isInstancedBufferAttribute=!0,this.meshPerAttribute=s}copy(e){return super.copy(e),this.meshPerAttribute=e.meshPerAttribute,this}toJSON(){const e=super.toJSON();return e.meshPerAttribute=this.meshPerAttribute,e.isInstancedBufferAttribute=!0,e}}const Ps=new Qe,Tu=new Qe,Co=[],Eu=new ui,h0=new Qe,_r=new K,xr=new fi;class Pd extends K{constructor(e,t,n){super(e,t),this.isInstancedMesh=!0,this.instanceMatrix=new fa(new Float32Array(n*16),16),this.instanceColor=null,this.morphTexture=null,this.count=n,this.boundingBox=null,this.boundingSphere=null;for(let s=0;s<n;s++)this.setMatrixAt(s,h0)}computeBoundingBox(){const e=this.geometry,t=this.count;this.boundingBox===null&&(this.boundingBox=new ui),e.boundingBox===null&&e.computeBoundingBox(),this.boundingBox.makeEmpty();for(let n=0;n<t;n++)this.getMatrixAt(n,Ps),Eu.copy(e.boundingBox).applyMatrix4(Ps),this.boundingBox.union(Eu)}computeBoundingSphere(){const e=this.geometry,t=this.count;this.boundingSphere===null&&(this.boundingSphere=new fi),e.boundingSphere===null&&e.computeBoundingSphere(),this.boundingSphere.makeEmpty();for(let n=0;n<t;n++)this.getMatrixAt(n,Ps),xr.copy(e.boundingSphere).applyMatrix4(Ps),this.boundingSphere.union(xr)}copy(e,t){return super.copy(e,t),this.instanceMatrix.copy(e.instanceMatrix),e.morphTexture!==null&&(this.morphTexture=e.morphTexture.clone()),e.instanceColor!==null&&(this.instanceColor=e.instanceColor.clone()),this.count=e.count,e.boundingBox!==null&&(this.boundingBox=e.boundingBox.clone()),e.boundingSphere!==null&&(this.boundingSphere=e.boundingSphere.clone()),this}getColorAt(e,t){return this.instanceColor===null?t.setRGB(1,1,1):t.fromArray(this.instanceColor.array,e*3)}getMatrixAt(e,t){return t.fromArray(this.instanceMatrix.array,e*16)}getMorphAt(e,t){const n=t.morphTargetInfluences,s=this.morphTexture.source.data.data,r=n.length+1,o=e*r+1;for(let a=0;a<n.length;a++)n[a]=s[o+a]}raycast(e,t){const n=this.matrixWorld,s=this.count;if(_r.geometry=this.geometry,_r.material=this.material,_r.material!==void 0&&(this.boundingSphere===null&&this.computeBoundingSphere(),xr.copy(this.boundingSphere),xr.applyMatrix4(n),e.ray.intersectsSphere(xr)!==!1))for(let r=0;r<s;r++){this.getMatrixAt(r,Ps),Tu.multiplyMatrices(n,Ps),_r.matrixWorld=Tu,_r.raycast(e,Co);for(let o=0,a=Co.length;o<a;o++){const c=Co[o];c.instanceId=r,c.object=this,t.push(c)}Co.length=0}}setColorAt(e,t){return this.instanceColor===null&&(this.instanceColor=new fa(new Float32Array(this.instanceMatrix.count*3).fill(1),3)),t.toArray(this.instanceColor.array,e*3),this}setMatrixAt(e,t){return t.toArray(this.instanceMatrix.array,e*16),this}setMorphAt(e,t){const n=t.morphTargetInfluences,s=n.length+1;this.morphTexture===null&&(this.morphTexture=new nh(new Float32Array(s*this.count),s,this.count,qc,In));const r=this.morphTexture.source.data.data;let o=0;for(let l=0;l<n.length;l++)o+=n[l];const a=this.geometry.morphTargetsRelative?1:1-o,c=s*e;return r[c]=a,r.set(n,c+1),this}updateMorphTargets(){}dispose(){super.dispose(),this.morphTexture!==null&&(this.morphTexture.dispose(),this.morphTexture=null)}}const ji=new fi,u0=new oe(.5,.5),Po=new B;class sh{constructor(e=new ki,t=new ki,n=new ki,s=new ki,r=new ki,o=new ki){this.planes=[e,t,n,s,r,o]}set(e,t,n,s,r,o){const a=this.planes;return a[0].copy(e),a[1].copy(t),a[2].copy(n),a[3].copy(s),a[4].copy(r),a[5].copy(o),this}copy(e){const t=this.planes;for(let n=0;n<6;n++)t[n].copy(e.planes[n]);return this}setFromProjectionMatrix(e,t=si,n=!1){const s=this.planes,r=e.elements,o=r[0],a=r[1],c=r[2],l=r[3],h=r[4],u=r[5],f=r[6],d=r[7],p=r[8],_=r[9],g=r[10],m=r[11],M=r[12],b=r[13],v=r[14],w=r[15];if(s[0].setComponents(l-o,d-h,m-p,w-M).normalize(),s[1].setComponents(l+o,d+h,m+p,w+M).normalize(),s[2].setComponents(l+a,d+u,m+_,w+b).normalize(),s[3].setComponents(l-a,d-u,m-_,w-b).normalize(),n)s[4].setComponents(c,f,g,v).normalize(),s[5].setComponents(l-c,d-f,m-g,w-v).normalize();else if(s[4].setComponents(l-c,d-f,m-g,w-v).normalize(),t===si)s[5].setComponents(l+c,d+f,m+g,w+v).normalize();else if(t===Xr)s[5].setComponents(c,f,g,v).normalize();else throw new Error("THREE.Frustum.setFromProjectionMatrix(): Invalid coordinate system: "+t);return this}intersectsObject(e){if(e.boundingSphere!==void 0)e.boundingSphere===null&&e.computeBoundingSphere(),ji.copy(e.boundingSphere).applyMatrix4(e.matrixWorld);else{const t=e.geometry;t.boundingSphere===null&&t.computeBoundingSphere(),ji.copy(t.boundingSphere).applyMatrix4(e.matrixWorld)}return this.intersectsSphere(ji)}intersectsSprite(e){ji.center.set(0,0,0);const t=u0.distanceTo(e.center);return ji.radius=.7071067811865476+t,ji.applyMatrix4(e.matrixWorld),this.intersectsSphere(ji)}intersectsSphere(e){const t=this.planes,n=e.center,s=-e.radius;for(let r=0;r<6;r++)if(t[r].distanceToPoint(n)<s)return!1;return!0}intersectsBox(e){const t=this.planes;for(let n=0;n<6;n++){const s=t[n];if(Po.x=s.normal.x>0?e.max.x:e.min.x,Po.y=s.normal.y>0?e.max.y:e.min.y,Po.z=s.normal.z>0?e.max.z:e.min.z,s.distanceToPoint(Po)<0)return!1}return!0}containsPoint(e){const t=this.planes;for(let n=0;n<6;n++)if(t[n].distanceToPoint(e)<0)return!1;return!0}clone(){return new this.constructor().copy(this)}}class Ur extends dn{constructor(e){super(),this.isLineBasicMaterial=!0,this.type="LineBasicMaterial",this.color=new Ne(16777215),this.map=null,this.linewidth=1,this.linecap="round",this.linejoin="round",this.fog=!0,this.setValues(e)}copy(e){return super.copy(e),this.color.copy(e.color),this.map=e.map,this.linewidth=e.linewidth,this.linecap=e.linecap,this.linejoin=e.linejoin,this.fog=e.fog,this}}const da=new B,pa=new B,Au=new Qe,vr=new Ea,Io=new fi,al=new B,Ru=new B;class rh extends Rt{constructor(e=new Mt,t=new Ur){super(),this.isLine=!0,this.type="Line",this.geometry=e,this.material=t,this.morphTargetDictionary=void 0,this.morphTargetInfluences=void 0,this.updateMorphTargets()}copy(e,t){return super.copy(e,t),this.material=Array.isArray(e.material)?e.material.slice():e.material,this.geometry=e.geometry,this}computeLineDistances(){const e=this.geometry;if(e.index===null){const t=e.attributes.position,n=[0];for(let s=1,r=t.count;s<r;s++)da.fromBufferAttribute(t,s-1),pa.fromBufferAttribute(t,s),n[s]=n[s-1],n[s]+=da.distanceTo(pa);e.setAttribute("lineDistance",new Je(n,1))}else Oe("Line.computeLineDistances(): Computation only possible with non-indexed BufferGeometry.");return this}intersectsFrustum(e){return e.intersectsObject(this)}raycast(e,t){const n=this.geometry,s=this.matrixWorld,r=e.params.Line.threshold,o=n.drawRange;if(n.boundingSphere===null&&n.computeBoundingSphere(),Io.copy(n.boundingSphere),Io.applyMatrix4(s),Io.radius+=r,e.ray.intersectsSphere(Io)===!1)return;Au.copy(s).invert(),vr.copy(e.ray).applyMatrix4(Au);const a=r/((this.scale.x+this.scale.y+this.scale.z)/3),c=a*a,l=this.isLineSegments?2:1,h=n.index,f=n.attributes.position;if(h!==null){const d=Math.max(0,o.start),p=Math.min(h.count,o.start+o.count);for(let _=d,g=p-1;_<g;_+=l){const m=h.getX(_),M=h.getX(_+1),b=Lo(this,e,vr,c,m,M,_);b&&t.push(b)}if(this.isLineLoop){const _=h.getX(p-1),g=h.getX(d),m=Lo(this,e,vr,c,_,g,p-1);m&&t.push(m)}}else{const d=Math.max(0,o.start),p=Math.min(f.count,o.start+o.count);for(let _=d,g=p-1;_<g;_+=l){const m=Lo(this,e,vr,c,_,_+1,_);m&&t.push(m)}if(this.isLineLoop){const _=Lo(this,e,vr,c,p-1,d,p-1);_&&t.push(_)}}}updateMorphTargets(){const t=this.geometry.morphAttributes,n=Object.keys(t);if(n.length>0){const s=t[n[0]];if(s!==void 0){this.morphTargetInfluences=[],this.morphTargetDictionary={};for(let r=0,o=s.length;r<o;r++){const a=s[r].name||String(r);this.morphTargetInfluences.push(0),this.morphTargetDictionary[a]=r}}}}}function Lo(i,e,t,n,s,r,o){const a=i.geometry.attributes.position;if(da.fromBufferAttribute(a,s),pa.fromBufferAttribute(a,r),t.distanceSqToSegment(da,pa,al,Ru)>n)return;al.applyMatrix4(i.matrixWorld);const l=e.ray.origin.distanceTo(al);if(!(l<e.near||l>e.far))return{distance:l,point:Ru.clone().applyMatrix4(i.matrixWorld),index:o,face:null,faceIndex:null,barycoord:null,object:i}}const Cu=new B,Pu=new B;class xc extends rh{constructor(e,t){super(e,t),this.isLineSegments=!0,this.type="LineSegments"}computeLineDistances(){const e=this.geometry;if(e.index===null){const t=e.attributes.position,n=[];for(let s=0,r=t.count;s<r;s+=2)Cu.fromBufferAttribute(t,s),Pu.fromBufferAttribute(t,s+1),n[s]=s===0?0:n[s-1],n[s+1]=n[s]+Cu.distanceTo(Pu);e.setAttribute("lineDistance",new Je(n,1))}else Oe("LineSegments.computeLineDistances(): Computation only possible with non-indexed BufferGeometry.");return this}}class f0 extends rh{constructor(e,t){super(e,t),this.isLineLoop=!0,this.type="LineLoop"}}class Vi extends dn{constructor(e){super(),this.isPointsMaterial=!0,this.type="PointsMaterial",this.color=new Ne(16777215),this.map=null,this.alphaMap=null,this.size=1,this.sizeAttenuation=!0,this.fog=!0,this.setValues(e)}copy(e){return super.copy(e),this.color.copy(e.color),this.map=e.map,this.alphaMap=e.alphaMap,this.size=e.size,this.sizeAttenuation=e.sizeAttenuation,this.fog=e.fog,this}}const Iu=new Qe,vc=new Ea,No=new fi,Do=new B;class Ys extends Rt{constructor(e=new Mt,t=new Vi){super(),this.isPoints=!0,this.type="Points",this.geometry=e,this.material=t,this.morphTargetDictionary=void 0,this.morphTargetInfluences=void 0,this.updateMorphTargets()}copy(e,t){return super.copy(e,t),this.material=Array.isArray(e.material)?e.material.slice():e.material,this.geometry=e.geometry,this}intersectsFrustum(e){return e.intersectsObject(this)}raycast(e,t){const n=this.geometry,s=this.matrixWorld,r=e.params.Points.threshold,o=n.drawRange;if(n.boundingSphere===null&&n.computeBoundingSphere(),No.copy(n.boundingSphere),No.applyMatrix4(s),No.radius+=r,e.ray.intersectsSphere(No)===!1)return;Iu.copy(s).invert(),vc.copy(e.ray).applyMatrix4(Iu);const a=r/((this.scale.x+this.scale.y+this.scale.z)/3),c=a*a,l=n.index,u=n.attributes.position;if(l!==null){const f=Math.max(0,o.start),d=Math.min(l.count,o.start+o.count);for(let p=f,_=d;p<_;p++){const g=l.getX(p);Do.fromBufferAttribute(u,g),Lu(Do,g,c,s,e,t,this)}}else{const f=Math.max(0,o.start),d=Math.min(u.count,o.start+o.count);for(let p=f,_=d;p<_;p++)Do.fromBufferAttribute(u,p),Lu(Do,p,c,s,e,t,this)}}updateMorphTargets(){const t=this.geometry.morphAttributes,n=Object.keys(t);if(n.length>0){const s=t[n[0]];if(s!==void 0){this.morphTargetInfluences=[],this.morphTargetDictionary={};for(let r=0,o=s.length;r<o;r++){const a=s[r].name||String(r);this.morphTargetInfluences.push(0),this.morphTargetDictionary[a]=r}}}}}function Lu(i,e,t,n,s,r,o){const a=vc.distanceSqToPoint(i);if(a<t){const c=new B;vc.closestPointToPoint(i,c),c.applyMatrix4(n);const l=s.ray.origin.distanceTo(c);if(l<s.near||l>s.far)return;r.push({distance:l,distanceToRay:Math.sqrt(a),point:c,index:e,face:null,faceIndex:null,barycoord:null,object:o})}}class Id extends Ht{constructor(e=[],t=ls,n,s,r,o,a,c,l,h){super(e,t,n,s,r,o,a,c,l,h),this.isCubeTexture=!0,this.flipY=!1}get images(){return this.image}set images(e){this.image=e}}class d0 extends Ht{constructor(e,t,n,s,r,o,a,c,l){super(e,t,n,s,r,o,a,c,l),this.isCanvasTexture=!0,this.needsUpdate=!0}}class $r extends Ht{constructor(e,t,n=li,s,r,o,a=kt,c=kt,l,h=Ri,u=1){if(h!==Ri&&h!==ss)throw new Error("THREE.DepthTexture: format must be either THREE.DepthFormat or THREE.DepthStencilFormat");const f={width:e,height:t,depth:u};super(f,s,r,o,a,c,h,n,l),this.isDepthTexture=!0,this.flipY=!1,this.generateMipmaps=!1,this.compareFunction=null}copy(e){return super.copy(e),this.source=new Qc(Object.assign({},e.image)),this.compareFunction=e.compareFunction,this}toJSON(e){const t=super.toJSON(e);return t.compareFunction=this.compareFunction,t}}class p0 extends $r{constructor(e,t=li,n=ls,s,r,o=kt,a=kt,c,l=Ri){const h={width:e,height:e,depth:1},u=[h,h,h,h,h,h];super(e,e,t,n,s,r,o,a,c,l),this.image=u,this.isCubeDepthTexture=!0,this.isCubeTexture=!0}get images(){return this.image}set images(e){this.image=e}}class Ld extends Ht{constructor(e=null){super(),this.sourceTexture=e,this.isExternalTexture=!0}copy(e){return super.copy(e),this.sourceTexture=e.sourceTexture,this}}class He extends Mt{constructor(e=1,t=1,n=1,s=1,r=1,o=1){super(),this.type="BoxGeometry",this.parameters={width:e,height:t,depth:n,widthSegments:s,heightSegments:r,depthSegments:o};const a=this;s=Math.floor(s),r=Math.floor(r),o=Math.floor(o);const c=[],l=[],h=[],u=[];let f=0,d=0;p("z","y","x",-1,-1,n,t,e,o,r,0),p("z","y","x",1,-1,n,t,-e,o,r,1),p("x","z","y",1,1,e,n,t,s,o,2),p("x","z","y",1,-1,e,n,-t,s,o,3),p("x","y","z",1,-1,e,t,n,s,r,4),p("x","y","z",-1,-1,e,t,-n,s,r,5),this.setIndex(c),this.setAttribute("position",new Je(l,3)),this.setAttribute("normal",new Je(h,3)),this.setAttribute("uv",new Je(u,2));function p(_,g,m,M,b,v,w,S,T,x,R){const D=v/T,P=w/x,F=v/2,A=w/2,I=S/2,O=T+1,H=x+1;let C=0,N=0;const U=new B;for(let k=0;k<H;k++){const V=k*P-A;for(let ee=0;ee<O;ee++){const re=ee*D-F;U[_]=re*M,U[g]=V*b,U[m]=I,l.push(U.x,U.y,U.z),U[_]=0,U[g]=0,U[m]=S>0?1:-1,h.push(U.x,U.y,U.z),u.push(ee/T),u.push(1-k/x),C+=1}}for(let k=0;k<x;k++)for(let V=0;V<T;V++){const ee=f+V+O*k,re=f+V+O*(k+1),Se=f+(V+1)+O*(k+1),be=f+(V+1)+O*k;c.push(ee,re,be),c.push(re,Se,be),N+=6}a.addGroup(d,N,R),d+=N,f+=C}}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new He(e.width,e.height,e.depth,e.widthSegments,e.heightSegments,e.depthSegments)}}class oh extends Mt{constructor(e=1,t=1,n=4,s=8,r=1){super(),this.type="CapsuleGeometry",this.parameters={radius:e,height:t,capSegments:n,radialSegments:s,heightSegments:r},t=Math.max(0,t),n=Math.max(1,Math.floor(n)),s=Math.max(3,Math.floor(s)),r=Math.max(1,Math.floor(r));const o=[],a=[],c=[],l=[],h=t/2,u=Math.PI/2*e,f=t,d=2*u+f,p=n*2+r,_=s+1,g=new B,m=new B;for(let M=0;M<=p;M++){let b=0,v=0,w=0,S=0;if(M<=n){const R=M/n,D=R*Math.PI/2;v=-h-e*Math.cos(D),w=e*Math.sin(D),S=-e*Math.cos(D),b=R*u}else if(M<=n+r){const R=(M-n)/r;v=-h+R*t,w=e,S=0,b=u+R*f}else{const R=(M-n-r)/n,D=R*Math.PI/2;v=h+e*Math.sin(D),w=e*Math.cos(D),S=e*Math.sin(D),b=u+f+R*u}const T=Math.max(0,Math.min(1,b/d));let x=0;M===0?x=.5/s:M===p&&(x=-.5/s);for(let R=0;R<=s;R++){const D=R/s,P=D*Math.PI*2,F=Math.sin(P),A=Math.cos(P);m.x=-w*A,m.y=v,m.z=w*F,a.push(m.x,m.y,m.z),g.set(-w*A,S,w*F),g.normalize(),c.push(g.x,g.y,g.z),l.push(D+x,T)}if(M>0){const R=(M-1)*_;for(let D=0;D<s;D++){const P=R+D,F=R+D+1,A=M*_+D,I=M*_+D+1;o.push(P,F,A),o.push(F,I,A)}}}this.setIndex(o),this.setAttribute("position",new Je(a,3)),this.setAttribute("normal",new Je(c,3)),this.setAttribute("uv",new Je(l,2))}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new oh(e.radius,e.height,e.capSegments,e.radialSegments,e.heightSegments)}}class Yi extends Mt{constructor(e=1,t=32,n=0,s=Math.PI*2){super(),this.type="CircleGeometry",this.parameters={radius:e,segments:t,thetaStart:n,thetaLength:s},t=Math.max(3,t);const r=[],o=[],a=[],c=[],l=new B,h=new oe;o.push(0,0,0),a.push(0,0,1),c.push(.5,.5);for(let u=0,f=3;u<=t;u++,f+=3){const d=n+u/t*s;l.x=e*Math.cos(d),l.y=e*Math.sin(d),o.push(l.x,l.y,l.z),a.push(0,0,1),h.x=(o[f]/e+1)/2,h.y=(o[f+1]/e+1)/2,c.push(h.x,h.y)}for(let u=1;u<=t;u++)r.push(u,u+1,0);this.setIndex(r),this.setAttribute("position",new Je(o,3)),this.setAttribute("normal",new Je(a,3)),this.setAttribute("uv",new Je(c,2))}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new Yi(e.radius,e.segments,e.thetaStart,e.thetaLength)}}class At extends Mt{constructor(e=1,t=1,n=1,s=32,r=1,o=!1,a=0,c=Math.PI*2){super(),this.type="CylinderGeometry",this.parameters={radiusTop:e,radiusBottom:t,height:n,radialSegments:s,heightSegments:r,openEnded:o,thetaStart:a,thetaLength:c};const l=this;s=Math.floor(s),r=Math.floor(r);const h=[],u=[],f=[],d=[];let p=0;const _=[],g=n/2;let m=0;M(),o===!1&&(e>0&&b(!0),t>0&&b(!1)),this.setIndex(h),this.setAttribute("position",new Je(u,3)),this.setAttribute("normal",new Je(f,3)),this.setAttribute("uv",new Je(d,2));function M(){const v=new B,w=new B;let S=0;const T=(t-e)/n;for(let x=0;x<=r;x++){const R=[],D=x/r,P=D*(t-e)+e;for(let F=0;F<=s;F++){const A=F/s,I=A*c+a,O=Math.sin(I),H=Math.cos(I);w.x=P*O,w.y=-D*n+g,w.z=P*H,u.push(w.x,w.y,w.z),v.set(O,T,H).normalize(),f.push(v.x,v.y,v.z),d.push(A,1-D),R.push(p++)}_.push(R)}for(let x=0;x<s;x++)for(let R=0;R<r;R++){const D=_[R][x],P=_[R+1][x],F=_[R+1][x+1],A=_[R][x+1];(e>0||R!==0)&&(h.push(D,P,A),S+=3),(t>0||R!==r-1)&&(h.push(P,F,A),S+=3)}l.addGroup(m,S,0),m+=S}function b(v){const w=p,S=new oe,T=new B;let x=0;const R=v===!0?e:t,D=v===!0?1:-1;for(let F=1;F<=s;F++)u.push(0,g*D,0),f.push(0,D,0),d.push(.5,.5),p++;const P=p;for(let F=0;F<=s;F++){const I=F/s*c+a,O=Math.cos(I),H=Math.sin(I);T.x=R*H,T.y=g*D,T.z=R*O,u.push(T.x,T.y,T.z),f.push(0,D,0),S.x=O*.5+.5,S.y=H*.5*D+.5,d.push(S.x,S.y),p++}for(let F=0;F<s;F++){const A=w+F,I=P+F;v===!0?h.push(I,I+1,A):h.push(I+1,I,A),x+=3}l.addGroup(m,x,v===!0?1:2),m+=x}}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new At(e.radiusTop,e.radiusBottom,e.height,e.radialSegments,e.heightSegments,e.openEnded,e.thetaStart,e.thetaLength)}}class Wn extends At{constructor(e=1,t=1,n=32,s=1,r=!1,o=0,a=Math.PI*2){super(0,e,t,n,s,r,o,a),this.type="ConeGeometry",this.parameters={radius:e,height:t,radialSegments:n,heightSegments:s,openEnded:r,thetaStart:o,thetaLength:a}}static fromJSON(e){return new Wn(e.radius,e.height,e.radialSegments,e.heightSegments,e.openEnded,e.thetaStart,e.thetaLength)}}class ah extends Mt{constructor(e=[],t=[],n=1,s=0){super(),this.type="PolyhedronGeometry",this.parameters={vertices:e,indices:t,radius:n,detail:s};const r=[],o=[];a(s),l(n),h(),this.setAttribute("position",new Je(r,3)),this.setAttribute("normal",new Je(r.slice(),3)),this.setAttribute("uv",new Je(o,2)),s===0?this.computeVertexNormals():this.normalizeNormals();function a(M){const b=new B,v=new B,w=new B;for(let S=0;S<t.length;S+=3)d(t[S+0],b),d(t[S+1],v),d(t[S+2],w),c(b,v,w,M)}function c(M,b,v,w){const S=w+1,T=[];for(let x=0;x<=S;x++){T[x]=[];const R=M.clone().lerp(v,x/S),D=b.clone().lerp(v,x/S),P=S-x;for(let F=0;F<=P;F++)F===0&&x===S?T[x][F]=R:T[x][F]=R.clone().lerp(D,F/P)}for(let x=0;x<S;x++)for(let R=0;R<2*(S-x)-1;R++){const D=Math.floor(R/2);R%2===0?(f(T[x][D+1]),f(T[x+1][D]),f(T[x][D])):(f(T[x][D+1]),f(T[x+1][D+1]),f(T[x+1][D]))}}function l(M){const b=new B;for(let v=0;v<r.length;v+=3)b.x=r[v+0],b.y=r[v+1],b.z=r[v+2],b.normalize().multiplyScalar(M),r[v+0]=b.x,r[v+1]=b.y,r[v+2]=b.z}function h(){const M=new B;for(let b=0;b<r.length;b+=3){M.x=r[b+0],M.y=r[b+1],M.z=r[b+2];const v=g(M)/2/Math.PI+.5,w=m(M)/Math.PI+.5;o.push(v,1-w)}p(),u()}function u(){for(let M=0;M<o.length;M+=6){const b=o[M+0],v=o[M+2],w=o[M+4],S=Math.max(b,v,w),T=Math.min(b,v,w);S>.9&&T<.1&&(b<.2&&(o[M+0]+=1),v<.2&&(o[M+2]+=1),w<.2&&(o[M+4]+=1))}}function f(M){r.push(M.x,M.y,M.z)}function d(M,b){const v=M*3;b.x=e[v+0],b.y=e[v+1],b.z=e[v+2]}function p(){const M=new B,b=new B,v=new B,w=new B,S=new oe,T=new oe,x=new oe;for(let R=0,D=0;R<r.length;R+=9,D+=6){M.set(r[R+0],r[R+1],r[R+2]),b.set(r[R+3],r[R+4],r[R+5]),v.set(r[R+6],r[R+7],r[R+8]),S.set(o[D+0],o[D+1]),T.set(o[D+2],o[D+3]),x.set(o[D+4],o[D+5]),w.copy(M).add(b).add(v).divideScalar(3);const P=g(w);_(S,D+0,M,P),_(T,D+2,b,P),_(x,D+4,v,P)}}function _(M,b,v,w){w<0&&M.x===1&&(o[b]=M.x-1),v.x===0&&v.z===0&&(o[b]=w/2/Math.PI+.5)}function g(M){return Math.atan2(M.z,-M.x)}function m(M){return Math.atan2(-M.y,Math.sqrt(M.x*M.x+M.z*M.z))}}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new ah(e.vertices,e.indices,e.radius,e.detail)}}class di{constructor(){this.type="Curve",this.arcLengthDivisions=200,this.needsUpdate=!1,this.cacheArcLengths=null}getPoint(){Oe("Curve: .getPoint() not implemented.")}getPointAt(e,t){const n=this.getUtoTmapping(e);return this.getPoint(n,t)}getPoints(e=5){const t=[];for(let n=0;n<=e;n++)t.push(this.getPoint(n/e));return t}getSpacedPoints(e=5){const t=[];for(let n=0;n<=e;n++)t.push(this.getPointAt(n/e));return t}getLength(){const e=this.getLengths();return e[e.length-1]}getLengths(e=this.arcLengthDivisions){if(this.cacheArcLengths&&this.cacheArcLengths.length===e+1&&!this.needsUpdate)return this.cacheArcLengths;this.needsUpdate=!1;const t=[];let n,s=this.getPoint(0),r=0;t.push(0);for(let o=1;o<=e;o++)n=this.getPoint(o/e),r+=n.distanceTo(s),t.push(r),s=n;return this.cacheArcLengths=t,t}updateArcLengths(){this.needsUpdate=!0,this.getLengths()}getUtoTmapping(e,t=null){const n=this.getLengths();let s=0;const r=n.length;let o;t?o=t:o=e*n[r-1];let a=0,c=r-1,l;for(;a<=c;)if(s=Math.floor(a+(c-a)/2),l=n[s]-o,l<0)a=s+1;else if(l>0)c=s-1;else{c=s;break}if(s=c,n[s]===o)return s/(r-1);const h=n[s],f=n[s+1]-h,d=(o-h)/f;return(s+d)/(r-1)}getTangent(e,t){let s=e-1e-4,r=e+1e-4;s<0&&(s=0),r>1&&(r=1);const o=this.getPoint(s),a=this.getPoint(r),c=t||(o.isVector2?new oe:new B);return c.copy(a).sub(o).normalize(),c}getTangentAt(e,t){const n=this.getUtoTmapping(e);return this.getTangent(n,t)}computeFrenetFrames(e,t=!1){const n=new B,s=[],r=[],o=[],a=new B,c=new Qe;for(let d=0;d<=e;d++){const p=d/e;s[d]=this.getTangentAt(p,new B)}r[0]=new B,o[0]=new B;let l=Number.MAX_VALUE;const h=Math.abs(s[0].x),u=Math.abs(s[0].y),f=Math.abs(s[0].z);h<=l&&(l=h,n.set(1,0,0)),u<=l&&(l=u,n.set(0,1,0)),f<=l&&n.set(0,0,1),a.crossVectors(s[0],n).normalize(),r[0].crossVectors(s[0],a),o[0].crossVectors(s[0],r[0]);for(let d=1;d<=e;d++){if(r[d]=r[d-1].clone(),o[d]=o[d-1].clone(),a.crossVectors(s[d-1],s[d]),a.length()>Number.EPSILON){a.normalize();const p=Math.acos(st(s[d-1].dot(s[d]),-1,1));r[d].applyMatrix4(c.makeRotationAxis(a,p))}o[d].crossVectors(s[d],r[d])}if(t===!0){let d=Math.acos(st(r[0].dot(r[e]),-1,1));d/=e,s[0].dot(a.crossVectors(r[0],r[e]))>0&&(d=-d);for(let p=1;p<=e;p++)r[p].applyMatrix4(c.makeRotationAxis(s[p],d*p)),o[p].crossVectors(s[p],r[p])}return{tangents:s,normals:r,binormals:o}}clone(){return new this.constructor().copy(this)}copy(e){return this.arcLengthDivisions=e.arcLengthDivisions,this}toJSON(){const e={metadata:{version:4.7,type:"Curve",generator:"Curve.toJSON"}};return e.arcLengthDivisions=this.arcLengthDivisions,e.type=this.type,e}fromJSON(e){return this.arcLengthDivisions=e.arcLengthDivisions,this}}class lh extends di{constructor(e=0,t=0,n=1,s=1,r=0,o=Math.PI*2,a=!1,c=0){super(),this.isEllipseCurve=!0,this.type="EllipseCurve",this.aX=e,this.aY=t,this.xRadius=n,this.yRadius=s,this.aStartAngle=r,this.aEndAngle=o,this.aClockwise=a,this.aRotation=c}getPoint(e,t=new oe){const n=t,s=Math.PI*2;let r=this.aEndAngle-this.aStartAngle;const o=Math.abs(r)<Number.EPSILON;for(;r<0;)r+=s;for(;r>s;)r-=s;r<Number.EPSILON&&(o?r=0:r=s),this.aClockwise===!0&&!o&&(r===s?r=-s:r=r-s);const a=this.aStartAngle+e*r;let c=this.aX+this.xRadius*Math.cos(a),l=this.aY+this.yRadius*Math.sin(a);if(this.aRotation!==0){const h=Math.cos(this.aRotation),u=Math.sin(this.aRotation),f=c-this.aX,d=l-this.aY;c=f*h-d*u+this.aX,l=f*u+d*h+this.aY}return n.set(c,l)}copy(e){return super.copy(e),this.aX=e.aX,this.aY=e.aY,this.xRadius=e.xRadius,this.yRadius=e.yRadius,this.aStartAngle=e.aStartAngle,this.aEndAngle=e.aEndAngle,this.aClockwise=e.aClockwise,this.aRotation=e.aRotation,this}toJSON(){const e=super.toJSON();return e.aX=this.aX,e.aY=this.aY,e.xRadius=this.xRadius,e.yRadius=this.yRadius,e.aStartAngle=this.aStartAngle,e.aEndAngle=this.aEndAngle,e.aClockwise=this.aClockwise,e.aRotation=this.aRotation,e}fromJSON(e){return super.fromJSON(e),this.aX=e.aX,this.aY=e.aY,this.xRadius=e.xRadius,this.yRadius=e.yRadius,this.aStartAngle=e.aStartAngle,this.aEndAngle=e.aEndAngle,this.aClockwise=e.aClockwise,this.aRotation=e.aRotation,this}}class m0 extends lh{constructor(e,t,n,s,r,o){super(e,t,n,n,s,r,o),this.isArcCurve=!0,this.type="ArcCurve"}}function ch(){let i=0,e=0,t=0,n=0;function s(r,o,a,c){i=r,e=a,t=-3*r+3*o-2*a-c,n=2*r-2*o+a+c}return{initCatmullRom:function(r,o,a,c,l){s(o,a,l*(a-r),l*(c-o))},initNonuniformCatmullRom:function(r,o,a,c,l,h,u){let f=(o-r)/l-(a-r)/(l+h)+(a-o)/h,d=(a-o)/h-(c-o)/(h+u)+(c-a)/u;f*=h,d*=h,s(o,a,f,d)},calc:function(r){const o=r*r,a=o*r;return i+e*r+t*o+n*a}}}const Nu=new B,Du=new B,ll=new ch,cl=new ch,hl=new ch;class g0 extends di{constructor(e=[],t=!1,n="centripetal",s=.5){super(),this.isCatmullRomCurve3=!0,this.type="CatmullRomCurve3",this.points=e,this.closed=t,this.curveType=n,this.tension=s}getPoint(e,t=new B){const n=t,s=this.points,r=s.length,o=(r-(this.closed?0:1))*e;let a=Math.floor(o),c=o-a;this.closed?a+=a>0?0:(Math.floor(Math.abs(a)/r)+1)*r:c===0&&a===r-1&&(a=r-2,c=1);let l,h;this.closed||a>0?l=s[(a-1)%r]:(Du.subVectors(s[0],s[1]).add(s[0]),l=Du);const u=s[a%r],f=s[(a+1)%r];if(this.closed||a+2<r?h=s[(a+2)%r]:(Nu.subVectors(s[r-1],s[r-2]).add(s[r-1]),h=Nu),this.curveType==="centripetal"||this.curveType==="chordal"){const d=this.curveType==="chordal"?.5:.25;let p=Math.pow(l.distanceToSquared(u),d),_=Math.pow(u.distanceToSquared(f),d),g=Math.pow(f.distanceToSquared(h),d);_<1e-4&&(_=1),p<1e-4&&(p=_),g<1e-4&&(g=_),ll.initNonuniformCatmullRom(l.x,u.x,f.x,h.x,p,_,g),cl.initNonuniformCatmullRom(l.y,u.y,f.y,h.y,p,_,g),hl.initNonuniformCatmullRom(l.z,u.z,f.z,h.z,p,_,g)}else this.curveType==="catmullrom"&&(ll.initCatmullRom(l.x,u.x,f.x,h.x,this.tension),cl.initCatmullRom(l.y,u.y,f.y,h.y,this.tension),hl.initCatmullRom(l.z,u.z,f.z,h.z,this.tension));return n.set(ll.calc(c),cl.calc(c),hl.calc(c)),n}copy(e){super.copy(e),this.points=[];for(let t=0,n=e.points.length;t<n;t++){const s=e.points[t];this.points.push(s.clone())}return this.closed=e.closed,this.curveType=e.curveType,this.tension=e.tension,this}toJSON(){const e=super.toJSON();e.points=[];for(let t=0,n=this.points.length;t<n;t++){const s=this.points[t];e.points.push(s.toArray())}return e.closed=this.closed,e.curveType=this.curveType,e.tension=this.tension,e}fromJSON(e){super.fromJSON(e),this.points=[];for(let t=0,n=e.points.length;t<n;t++){const s=e.points[t];this.points.push(new B().fromArray(s))}return this.closed=e.closed,this.curveType=e.curveType,this.tension=e.tension,this}}function Uu(i,e,t,n,s){const r=(n-e)*.5,o=(s-t)*.5,a=i*i,c=i*a;return(2*t-2*n+r+o)*c+(-3*t+3*n-2*r-o)*a+r*i+t}function _0(i,e){const t=1-i;return t*t*e}function x0(i,e){return 2*(1-i)*i*e}function v0(i,e){return i*i*e}function Fr(i,e,t,n){return _0(i,e)+x0(i,t)+v0(i,n)}function M0(i,e){const t=1-i;return t*t*t*e}function y0(i,e){const t=1-i;return 3*t*t*i*e}function S0(i,e){return 3*(1-i)*i*i*e}function w0(i,e){return i*i*i*e}function Or(i,e,t,n,s){return M0(i,e)+y0(i,t)+S0(i,n)+w0(i,s)}class Nd extends di{constructor(e=new oe,t=new oe,n=new oe,s=new oe){super(),this.isCubicBezierCurve=!0,this.type="CubicBezierCurve",this.v0=e,this.v1=t,this.v2=n,this.v3=s}getPoint(e,t=new oe){const n=t,s=this.v0,r=this.v1,o=this.v2,a=this.v3;return n.set(Or(e,s.x,r.x,o.x,a.x),Or(e,s.y,r.y,o.y,a.y)),n}copy(e){return super.copy(e),this.v0.copy(e.v0),this.v1.copy(e.v1),this.v2.copy(e.v2),this.v3.copy(e.v3),this}toJSON(){const e=super.toJSON();return e.v0=this.v0.toArray(),e.v1=this.v1.toArray(),e.v2=this.v2.toArray(),e.v3=this.v3.toArray(),e}fromJSON(e){return super.fromJSON(e),this.v0.fromArray(e.v0),this.v1.fromArray(e.v1),this.v2.fromArray(e.v2),this.v3.fromArray(e.v3),this}}class b0 extends di{constructor(e=new B,t=new B,n=new B,s=new B){super(),this.isCubicBezierCurve3=!0,this.type="CubicBezierCurve3",this.v0=e,this.v1=t,this.v2=n,this.v3=s}getPoint(e,t=new B){const n=t,s=this.v0,r=this.v1,o=this.v2,a=this.v3;return n.set(Or(e,s.x,r.x,o.x,a.x),Or(e,s.y,r.y,o.y,a.y),Or(e,s.z,r.z,o.z,a.z)),n}copy(e){return super.copy(e),this.v0.copy(e.v0),this.v1.copy(e.v1),this.v2.copy(e.v2),this.v3.copy(e.v3),this}toJSON(){const e=super.toJSON();return e.v0=this.v0.toArray(),e.v1=this.v1.toArray(),e.v2=this.v2.toArray(),e.v3=this.v3.toArray(),e}fromJSON(e){return super.fromJSON(e),this.v0.fromArray(e.v0),this.v1.fromArray(e.v1),this.v2.fromArray(e.v2),this.v3.fromArray(e.v3),this}}class Dd extends di{constructor(e=new oe,t=new oe){super(),this.isLineCurve=!0,this.type="LineCurve",this.v1=e,this.v2=t}getPoint(e,t=new oe){const n=t;return e===1?n.copy(this.v2):(n.copy(this.v2).sub(this.v1),n.multiplyScalar(e).add(this.v1)),n}getPointAt(e,t){return this.getPoint(e,t)}getTangent(e,t=new oe){return t.subVectors(this.v2,this.v1).normalize()}getTangentAt(e,t){return this.getTangent(e,t)}copy(e){return super.copy(e),this.v1.copy(e.v1),this.v2.copy(e.v2),this}toJSON(){const e=super.toJSON();return e.v1=this.v1.toArray(),e.v2=this.v2.toArray(),e}fromJSON(e){return super.fromJSON(e),this.v1.fromArray(e.v1),this.v2.fromArray(e.v2),this}}class T0 extends di{constructor(e=new B,t=new B){super(),this.isLineCurve3=!0,this.type="LineCurve3",this.v1=e,this.v2=t}getPoint(e,t=new B){const n=t;return e===1?n.copy(this.v2):(n.copy(this.v2).sub(this.v1),n.multiplyScalar(e).add(this.v1)),n}getPointAt(e,t){return this.getPoint(e,t)}getTangent(e,t=new B){return t.subVectors(this.v2,this.v1).normalize()}getTangentAt(e,t){return this.getTangent(e,t)}copy(e){return super.copy(e),this.v1.copy(e.v1),this.v2.copy(e.v2),this}toJSON(){const e=super.toJSON();return e.v1=this.v1.toArray(),e.v2=this.v2.toArray(),e}fromJSON(e){return super.fromJSON(e),this.v1.fromArray(e.v1),this.v2.fromArray(e.v2),this}}class Ud extends di{constructor(e=new oe,t=new oe,n=new oe){super(),this.isQuadraticBezierCurve=!0,this.type="QuadraticBezierCurve",this.v0=e,this.v1=t,this.v2=n}getPoint(e,t=new oe){const n=t,s=this.v0,r=this.v1,o=this.v2;return n.set(Fr(e,s.x,r.x,o.x),Fr(e,s.y,r.y,o.y)),n}copy(e){return super.copy(e),this.v0.copy(e.v0),this.v1.copy(e.v1),this.v2.copy(e.v2),this}toJSON(){const e=super.toJSON();return e.v0=this.v0.toArray(),e.v1=this.v1.toArray(),e.v2=this.v2.toArray(),e}fromJSON(e){return super.fromJSON(e),this.v0.fromArray(e.v0),this.v1.fromArray(e.v1),this.v2.fromArray(e.v2),this}}class E0 extends di{constructor(e=new B,t=new B,n=new B){super(),this.isQuadraticBezierCurve3=!0,this.type="QuadraticBezierCurve3",this.v0=e,this.v1=t,this.v2=n}getPoint(e,t=new B){const n=t,s=this.v0,r=this.v1,o=this.v2;return n.set(Fr(e,s.x,r.x,o.x),Fr(e,s.y,r.y,o.y),Fr(e,s.z,r.z,o.z)),n}copy(e){return super.copy(e),this.v0.copy(e.v0),this.v1.copy(e.v1),this.v2.copy(e.v2),this}toJSON(){const e=super.toJSON();return e.v0=this.v0.toArray(),e.v1=this.v1.toArray(),e.v2=this.v2.toArray(),e}fromJSON(e){return super.fromJSON(e),this.v0.fromArray(e.v0),this.v1.fromArray(e.v1),this.v2.fromArray(e.v2),this}}class Fd extends di{constructor(e=[]){super(),this.isSplineCurve=!0,this.type="SplineCurve",this.points=e}getPoint(e,t=new oe){const n=t,s=this.points,r=(s.length-1)*e,o=Math.floor(r),a=r-o,c=s[o===0?o:o-1],l=s[o],h=s[o>s.length-2?s.length-1:o+1],u=s[o>s.length-3?s.length-1:o+2];return n.set(Uu(a,c.x,l.x,h.x,u.x),Uu(a,c.y,l.y,h.y,u.y)),n}copy(e){super.copy(e),this.points=[];for(let t=0,n=e.points.length;t<n;t++){const s=e.points[t];this.points.push(s.clone())}return this}toJSON(){const e=super.toJSON();e.points=[];for(let t=0,n=this.points.length;t<n;t++){const s=this.points[t];e.points.push(s.toArray())}return e}fromJSON(e){super.fromJSON(e),this.points=[];for(let t=0,n=e.points.length;t<n;t++){const s=e.points[t];this.points.push(new oe().fromArray(s))}return this}}var Mc=Object.freeze({__proto__:null,ArcCurve:m0,CatmullRomCurve3:g0,CubicBezierCurve:Nd,CubicBezierCurve3:b0,EllipseCurve:lh,LineCurve:Dd,LineCurve3:T0,QuadraticBezierCurve:Ud,QuadraticBezierCurve3:E0,SplineCurve:Fd});class A0 extends di{constructor(){super(),this.type="CurvePath",this.curves=[],this.autoClose=!1}add(e){this.curves.push(e)}closePath(){const e=this.curves[0].getPoint(0),t=this.curves[this.curves.length-1].getPoint(1);if(!e.equals(t)){const n=e.isVector2===!0?"LineCurve":"LineCurve3";this.curves.push(new Mc[n](t,e))}return this}getPoint(e,t){const n=e*this.getLength(),s=this.getCurveLengths();let r=0;for(;r<s.length;){if(s[r]>=n){const o=s[r]-n,a=this.curves[r],c=a.getLength(),l=c===0?0:1-o/c;return a.getPointAt(l,t)}r++}return null}getLength(){const e=this.getCurveLengths();return e[e.length-1]}updateArcLengths(){this.needsUpdate=!0,this.cacheLengths=null,this.getCurveLengths()}getCurveLengths(){if(this.cacheLengths&&this.cacheLengths.length===this.curves.length)return this.cacheLengths;const e=[];let t=0;for(let n=0,s=this.curves.length;n<s;n++)t+=this.curves[n].getLength(),e.push(t);return this.cacheLengths=e,e}getSpacedPoints(e=40){const t=[];for(let n=0;n<=e;n++)t.push(this.getPoint(n/e));return this.autoClose&&t.push(t[0]),t}getPoints(e=12){const t=[];let n;for(let s=0,r=this.curves;s<r.length;s++){const o=r[s],a=o.isEllipseCurve?e*2:o.isLineCurve||o.isLineCurve3?1:o.isSplineCurve?e*o.points.length:e,c=o.getPoints(a);for(let l=0;l<c.length;l++){const h=c[l];n&&n.equals(h)||(t.push(h),n=h)}}return this.autoClose&&t.length>1&&!t[t.length-1].equals(t[0])&&t.push(t[0]),t}copy(e){super.copy(e),this.curves=[];for(let t=0,n=e.curves.length;t<n;t++){const s=e.curves[t];this.curves.push(s.clone())}return this.autoClose=e.autoClose,this}toJSON(){const e=super.toJSON();e.autoClose=this.autoClose,e.curves=[];for(let t=0,n=this.curves.length;t<n;t++){const s=this.curves[t];e.curves.push(s.toJSON())}return e}fromJSON(e){super.fromJSON(e),this.autoClose=e.autoClose,this.curves=[];for(let t=0,n=e.curves.length;t<n;t++){const s=e.curves[t];this.curves.push(new Mc[s.type]().fromJSON(s))}return this}}class ma extends A0{constructor(e){super(),this.type="Path",this.currentPoint=new oe,e&&this.setFromPoints(e)}setFromPoints(e){this.moveTo(e[0].x,e[0].y);for(let t=1,n=e.length;t<n;t++)this.lineTo(e[t].x,e[t].y);return this}moveTo(e,t){return this.currentPoint.set(e,t),this}lineTo(e,t){const n=new Dd(this.currentPoint.clone(),new oe(e,t));return this.curves.push(n),this.currentPoint.set(e,t),this}quadraticCurveTo(e,t,n,s){const r=new Ud(this.currentPoint.clone(),new oe(e,t),new oe(n,s));return this.curves.push(r),this.currentPoint.set(n,s),this}bezierCurveTo(e,t,n,s,r,o){const a=new Nd(this.currentPoint.clone(),new oe(e,t),new oe(n,s),new oe(r,o));return this.curves.push(a),this.currentPoint.set(r,o),this}splineThru(e){const t=[this.currentPoint.clone()].concat(e),n=new Fd(t);return this.curves.push(n),this.currentPoint.copy(e[e.length-1]),this}arc(e,t,n,s,r,o){const a=this.currentPoint.x,c=this.currentPoint.y;return this.absarc(e+a,t+c,n,s,r,o),this}absarc(e,t,n,s,r,o){return this.absellipse(e,t,n,n,s,r,o),this}ellipse(e,t,n,s,r,o,a,c){const l=this.currentPoint.x,h=this.currentPoint.y;return this.absellipse(e+l,t+h,n,s,r,o,a,c),this}absellipse(e,t,n,s,r,o,a,c){const l=new lh(e,t,n,s,r,o,a,c);if(this.curves.length>0){const u=l.getPoint(0);u.equals(this.currentPoint)||this.lineTo(u.x,u.y)}this.curves.push(l);const h=l.getPoint(1);return this.currentPoint.copy(h),this}copy(e){return super.copy(e),this.currentPoint.copy(e.currentPoint),this}toJSON(){const e=super.toJSON();return e.currentPoint=this.currentPoint.toArray(),e}fromJSON(e){return super.fromJSON(e),this.currentPoint.fromArray(e.currentPoint),this}}class Kr extends ma{constructor(e){super(e),this.uuid=Un(),this.type="Shape",this.holes=[]}getPointsHoles(e){const t=[];for(let n=0,s=this.holes.length;n<s;n++)t[n]=this.holes[n].getPoints(e);return t}extractPoints(e){return{shape:this.getPoints(e),holes:this.getPointsHoles(e)}}copy(e){super.copy(e),this.holes=[];for(let t=0,n=e.holes.length;t<n;t++){const s=e.holes[t];this.holes.push(s.clone())}return this}toJSON(){const e=super.toJSON();e.uuid=this.uuid,e.holes=[];for(let t=0,n=this.holes.length;t<n;t++){const s=this.holes[t];e.holes.push(s.toJSON())}return e}fromJSON(e){super.fromJSON(e),this.uuid=e.uuid,this.holes=[];for(let t=0,n=e.holes.length;t<n;t++){const s=e.holes[t];this.holes.push(new ma().fromJSON(s))}return this}}function R0(i,e,t=2){const n=e&&e.length,s=n?e[0]*t:i.length;let r=Od(i,0,s,t,!0);const o=[];if(!r||r.next===r.prev)return o;let a,c,l;if(n&&(r=N0(i,e,r,t)),i.length>80*t){a=i[0],c=i[1];let h=a,u=c;for(let f=t;f<s;f+=t){const d=i[f],p=i[f+1];d<a&&(a=d),p<c&&(c=p),d>h&&(h=d),p>u&&(u=p)}l=Math.max(h-a,u-c),l=l!==0?32767/l:0}return Jr(r,o,t,a,c,l,0),o}function Od(i,e,t,n,s){let r;if(s===W0(i,e,t,n)>0)for(let o=e;o<t;o+=n)r=Fu(o/n|0,i[o],i[o+1],r);else for(let o=t-n;o>=e;o-=n)r=Fu(o/n|0,i[o],i[o+1],r);return r&&tr(r,r.next)&&(jr(r),r=r.next),r}function hs(i,e){if(!i)return i;e||(e=i);let t=i,n;do if(n=!1,!t.steiner&&(tr(t,t.next)||It(t.prev,t,t.next)===0)){if(jr(t),t=e=t.prev,t===t.next)break;n=!0}else t=t.next;while(n||t!==e);return e}function Jr(i,e,t,n,s,r,o){if(!i)return;!o&&r&&B0(i,n,s,r);let a=i;for(;i.prev!==i.next;){const c=i.prev,l=i.next;if(r?P0(i,n,s,r):C0(i)){e.push(c.i,i.i,l.i),jr(i),i=l.next,a=l.next;continue}if(i=l,i===a){o?o===1?(i=I0(hs(i),e),Jr(i,e,t,n,s,r,2)):o===2&&L0(i,e,t,n,s,r):Jr(hs(i),e,t,n,s,r,1);break}}}function C0(i){const e=i.prev,t=i,n=i.next;if(It(e,t,n)>=0)return!1;const s=e.x,r=t.x,o=n.x,a=e.y,c=t.y,l=n.y,h=Math.min(s,r,o),u=Math.min(a,c,l),f=Math.max(s,r,o),d=Math.max(a,c,l);let p=n.next;for(;p!==e;){if(p.x>=h&&p.x<=f&&p.y>=u&&p.y<=d&&Rr(s,a,r,c,o,l,p.x,p.y)&&It(p.prev,p,p.next)>=0)return!1;p=p.next}return!0}function P0(i,e,t,n){const s=i.prev,r=i,o=i.next;if(It(s,r,o)>=0)return!1;const a=s.x,c=r.x,l=o.x,h=s.y,u=r.y,f=o.y,d=Math.min(a,c,l),p=Math.min(h,u,f),_=Math.max(a,c,l),g=Math.max(h,u,f),m=yc(d,p,e,t,n),M=yc(_,g,e,t,n);let b=i.prevZ,v=i.nextZ;for(;b&&b.z>=m&&v&&v.z<=M;){if(b.x>=d&&b.x<=_&&b.y>=p&&b.y<=g&&b!==s&&b!==o&&Rr(a,h,c,u,l,f,b.x,b.y)&&It(b.prev,b,b.next)>=0||(b=b.prevZ,v.x>=d&&v.x<=_&&v.y>=p&&v.y<=g&&v!==s&&v!==o&&Rr(a,h,c,u,l,f,v.x,v.y)&&It(v.prev,v,v.next)>=0))return!1;v=v.nextZ}for(;b&&b.z>=m;){if(b.x>=d&&b.x<=_&&b.y>=p&&b.y<=g&&b!==s&&b!==o&&Rr(a,h,c,u,l,f,b.x,b.y)&&It(b.prev,b,b.next)>=0)return!1;b=b.prevZ}for(;v&&v.z<=M;){if(v.x>=d&&v.x<=_&&v.y>=p&&v.y<=g&&v!==s&&v!==o&&Rr(a,h,c,u,l,f,v.x,v.y)&&It(v.prev,v,v.next)>=0)return!1;v=v.nextZ}return!0}function I0(i,e){let t=i;do{const n=t.prev,s=t.next.next;!tr(n,s)&&kd(n,t,t.next,s)&&Zr(n,s)&&Zr(s,n)&&(e.push(n.i,t.i,s.i),jr(t),jr(t.next),t=i=s),t=t.next}while(t!==i);return hs(t)}function L0(i,e,t,n,s,r){let o=i;do{let a=o.next.next;for(;a!==o.prev;){if(o.i!==a.i&&H0(o,a)){let c=zd(o,a);o=hs(o,o.next),c=hs(c,c.next),Jr(o,e,t,n,s,r,0),Jr(c,e,t,n,s,r,0);return}a=a.next}o=o.next}while(o!==i)}function N0(i,e,t,n){const s=[];for(let r=0,o=e.length;r<o;r++){const a=e[r]*n,c=r<o-1?e[r+1]*n:i.length,l=Od(i,a,c,n,!1);l===l.next&&(l.steiner=!0),s.push(z0(l))}s.sort(D0);for(let r=0;r<s.length;r++)t=U0(s[r],t);return t}function D0(i,e){let t=i.x-e.x;if(t===0&&(t=i.y-e.y,t===0)){const n=(i.next.y-i.y)/(i.next.x-i.x),s=(e.next.y-e.y)/(e.next.x-e.x);t=n-s}return t}function U0(i,e){const t=F0(i,e);if(!t)return e;const n=zd(t,i);return hs(n,n.next),hs(t,t.next)}function F0(i,e){let t=e;const n=i.x,s=i.y;let r=-1/0,o;if(tr(i,t))return t;do{if(tr(i,t.next))return t.next;if(s<=t.y&&s>=t.next.y&&t.next.y!==t.y){const u=t.x+(s-t.y)*(t.next.x-t.x)/(t.next.y-t.y);if(u<=n&&u>r&&(r=u,o=t.x<t.next.x?t:t.next,u===n))return o}t=t.next}while(t!==e);if(!o)return null;const a=o,c=o.x,l=o.y;let h=1/0;t=o;do{if(n>=t.x&&t.x>=c&&n!==t.x&&Bd(s<l?n:r,s,c,l,s<l?r:n,s,t.x,t.y)){const u=Math.abs(s-t.y)/(n-t.x);Zr(t,i)&&(u<h||u===h&&(t.x>o.x||t.x===o.x&&O0(o,t)))&&(o=t,h=u)}t=t.next}while(t!==a);return o}function O0(i,e){return It(i.prev,i,e.prev)<0&&It(e.next,i,i.next)<0}function B0(i,e,t,n){let s=i;do s.z===0&&(s.z=yc(s.x,s.y,e,t,n)),s.prevZ=s.prev,s.nextZ=s.next,s=s.next;while(s!==i);s.prevZ.nextZ=null,s.prevZ=null,k0(s)}function k0(i){let e,t=1;do{let n=i,s;i=null;let r=null;for(e=0;n;){e++;let o=n,a=0;for(let l=0;l<t&&(a++,o=o.nextZ,!!o);l++);let c=t;for(;a>0||c>0&&o;)a!==0&&(c===0||!o||n.z<=o.z)?(s=n,n=n.nextZ,a--):(s=o,o=o.nextZ,c--),r?r.nextZ=s:i=s,s.prevZ=r,r=s;n=o}r.nextZ=null,t*=2}while(e>1);return i}function yc(i,e,t,n,s){return i=(i-t)*s|0,e=(e-n)*s|0,i=(i|i<<8)&16711935,i=(i|i<<4)&252645135,i=(i|i<<2)&858993459,i=(i|i<<1)&1431655765,e=(e|e<<8)&16711935,e=(e|e<<4)&252645135,e=(e|e<<2)&858993459,e=(e|e<<1)&1431655765,i|e<<1}function z0(i){let e=i,t=i;do(e.x<t.x||e.x===t.x&&e.y<t.y)&&(t=e),e=e.next;while(e!==i);return t}function Bd(i,e,t,n,s,r,o,a){return(s-o)*(e-a)>=(i-o)*(r-a)&&(i-o)*(n-a)>=(t-o)*(e-a)&&(t-o)*(r-a)>=(s-o)*(n-a)}function Rr(i,e,t,n,s,r,o,a){return!(i===o&&e===a)&&Bd(i,e,t,n,s,r,o,a)}function H0(i,e){return i.next.i!==e.i&&i.prev.i!==e.i&&!V0(i,e)&&(Zr(i,e)&&Zr(e,i)&&G0(i,e)&&(It(i.prev,i,e.prev)||It(i,e.prev,e))||tr(i,e)&&It(i.prev,i,i.next)>0&&It(e.prev,e,e.next)>0)}function It(i,e,t){return(e.y-i.y)*(t.x-e.x)-(e.x-i.x)*(t.y-e.y)}function tr(i,e){return i.x===e.x&&i.y===e.y}function kd(i,e,t,n){const s=Fo(It(i,e,t)),r=Fo(It(i,e,n)),o=Fo(It(t,n,i)),a=Fo(It(t,n,e));return!!(s!==r&&o!==a||s===0&&Uo(i,t,e)||r===0&&Uo(i,n,e)||o===0&&Uo(t,i,n)||a===0&&Uo(t,e,n))}function Uo(i,e,t){return e.x<=Math.max(i.x,t.x)&&e.x>=Math.min(i.x,t.x)&&e.y<=Math.max(i.y,t.y)&&e.y>=Math.min(i.y,t.y)}function Fo(i){return i>0?1:i<0?-1:0}function V0(i,e){let t=i;do{if(t.i!==i.i&&t.next.i!==i.i&&t.i!==e.i&&t.next.i!==e.i&&kd(t,t.next,i,e))return!0;t=t.next}while(t!==i);return!1}function Zr(i,e){return It(i.prev,i,i.next)<0?It(i,e,i.next)>=0&&It(i,i.prev,e)>=0:It(i,e,i.prev)<0||It(i,i.next,e)<0}function G0(i,e){let t=i,n=!1;const s=(i.x+e.x)/2,r=(i.y+e.y)/2;do t.y>r!=t.next.y>r&&t.next.y!==t.y&&s<(t.next.x-t.x)*(r-t.y)/(t.next.y-t.y)+t.x&&(n=!n),t=t.next;while(t!==i);return n}function zd(i,e){const t=Sc(i.i,i.x,i.y),n=Sc(e.i,e.x,e.y),s=i.next,r=e.prev;return i.next=e,e.prev=i,t.next=s,s.prev=t,n.next=t,t.prev=n,r.next=n,n.prev=r,n}function Fu(i,e,t,n){const s=Sc(i,e,t);return n?(s.next=n.next,s.prev=n,n.next.prev=s,n.next=s):(s.prev=s,s.next=s),s}function jr(i){i.next.prev=i.prev,i.prev.next=i.next,i.prevZ&&(i.prevZ.nextZ=i.nextZ),i.nextZ&&(i.nextZ.prevZ=i.prevZ)}function Sc(i,e,t){return{i,x:e,y:t,prev:null,next:null,z:0,prevZ:null,nextZ:null,steiner:!1}}function W0(i,e,t,n){let s=0;for(let r=e,o=t-n;r<t;r+=n)s+=(i[o]-i[r])*(i[r+1]+i[o+1]),o=r;return s}class X0{static triangulate(e,t,n=2){return R0(e,t,n)}}class Ti{static area(e){const t=e.length;let n=0;for(let s=t-1,r=0;r<t;s=r++)n+=e[s].x*e[r].y-e[r].x*e[s].y;return n*.5}static isClockWise(e){return Ti.area(e)<0}static triangulateShape(e,t){const n=[],s=[],r=[];Ou(e),Bu(n,e);let o=e.length;t.forEach(Ou);for(let c=0;c<t.length;c++)s.push(o),o+=t[c].length,Bu(n,t[c]);const a=X0.triangulate(n,s);for(let c=0;c<a.length;c+=3)r.push(a.slice(c,c+3));return r}}function Ou(i){const e=i.length;e>2&&i[e-1].equals(i[0])&&i.pop()}function Bu(i,e){for(let t=0;t<e.length;t++)i.push(e[t].x),i.push(e[t].y)}class Aa extends Mt{constructor(e=new Kr([new oe(.5,.5),new oe(-.5,.5),new oe(-.5,-.5),new oe(.5,-.5)]),t={}){super(),this.type="ExtrudeGeometry",this.parameters={shapes:e,options:t},e=Array.isArray(e)?e:[e];const n=this,s=[],r=[];for(let a=0,c=e.length;a<c;a++){const l=e[a];o(l)}this.setAttribute("position",new Je(s,3)),this.setAttribute("uv",new Je(r,2)),this.computeVertexNormals();function o(a){const c=[],l=t.curveSegments!==void 0?t.curveSegments:12,h=t.steps!==void 0?t.steps:1,u=t.depth!==void 0?t.depth:1;let f=t.bevelEnabled!==void 0?t.bevelEnabled:!0,d=t.bevelThickness!==void 0?t.bevelThickness:.2,p=t.bevelSize!==void 0?t.bevelSize:d-.1,_=t.bevelOffset!==void 0?t.bevelOffset:0,g=t.bevelSegments!==void 0?t.bevelSegments:3;const m=t.extrudePath,M=t.UVGenerator!==void 0?t.UVGenerator:q0;let b,v=!1,w,S,T,x;if(m){b=m.getSpacedPoints(h),v=!0,f=!1;const ie=m.isCatmullRomCurve3?m.closed:!1;w=m.computeFrenetFrames(h,ie),S=new B,T=new B,x=new B}f||(g=0,d=0,p=0,_=0);const R=a.extractPoints(l);let D=R.shape;const P=R.holes;if(!Ti.isClockWise(D)){D=D.reverse();for(let ie=0,le=P.length;ie<le;ie++){const he=P[ie];Ti.isClockWise(he)&&(P[ie]=he.reverse())}}function A(ie){const he=10000000000000001e-36;let ce=ie[0];for(let ue=1;ue<=ie.length;ue++){const Xe=ue%ie.length,Be=ie[Xe],Ye=Be.x-ce.x,Ke=Be.y-ce.y,z=Ye*Ye+Ke*Ke,ut=Math.max(Math.abs(Be.x),Math.abs(Be.y),Math.abs(ce.x),Math.abs(ce.y)),je=he*ut*ut;if(z<=je){ie.splice(Xe,1),ue--;continue}ce=Be}}A(D),P.forEach(A);const I=P.length,O=D;for(let ie=0;ie<I;ie++){const le=P[ie];D=D.concat(le)}function H(ie,le,he){return le||$e("ExtrudeGeometry: vec does not exist"),ie.clone().addScaledVector(le,he)}const C=D.length;function N(ie,le,he){let ce,ue,Xe;const Be=ie.x-le.x,Ye=ie.y-le.y,Ke=he.x-ie.x,z=he.y-ie.y,ut=Be*Be+Ye*Ye,je=Be*z-Ye*Ke;if(Math.abs(je)>Number.EPSILON){const L=Math.sqrt(ut),y=Math.sqrt(Ke*Ke+z*z),X=le.x-Ye/L,$=le.y+Be/L,Q=he.x-z/y,fe=he.y+Ke/y,pe=((Q-X)*z-(fe-$)*Ke)/(Be*z-Ye*Ke);ce=X+Be*pe-ie.x,ue=$+Ye*pe-ie.y;const te=ce*ce+ue*ue;if(te<=2)return new oe(ce,ue);Xe=Math.sqrt(te/2)}else{let L=!1;Be>Number.EPSILON?Ke>Number.EPSILON&&(L=!0):Be<-Number.EPSILON?Ke<-Number.EPSILON&&(L=!0):Math.sign(Ye)===Math.sign(z)&&(L=!0),L?(ce=-Ye,ue=Be,Xe=Math.sqrt(ut)):(ce=Be,ue=Ye,Xe=Math.sqrt(ut/2))}return new oe(ce/Xe,ue/Xe)}const U=[];for(let ie=0,le=O.length,he=le-1,ce=ie+1;ie<le;ie++,he++,ce++)he===le&&(he=0),ce===le&&(ce=0),U[ie]=N(O[ie],O[he],O[ce]);const k=[];let V,ee=U.concat();for(let ie=0,le=I;ie<le;ie++){const he=P[ie];V=[];for(let ce=0,ue=he.length,Xe=ue-1,Be=ce+1;ce<ue;ce++,Xe++,Be++)Xe===ue&&(Xe=0),Be===ue&&(Be=0),V[ce]=N(he[ce],he[Xe],he[Be]);k.push(V),ee=ee.concat(V)}let re;if(g===0)re=Ti.triangulateShape(O,P);else{const ie=[],le=[];for(let he=0;he<g;he++){const ce=he/g,ue=d*Math.cos(ce*Math.PI/2),Xe=p*Math.sin(ce*Math.PI/2)+_;for(let Be=0,Ye=O.length;Be<Ye;Be++){const Ke=H(O[Be],U[Be],Xe);de(Ke.x,Ke.y,-ue),ce===0&&ie.push(Ke)}for(let Be=0,Ye=I;Be<Ye;Be++){const Ke=P[Be];V=k[Be];const z=[];for(let ut=0,je=Ke.length;ut<je;ut++){const L=H(Ke[ut],V[ut],Xe);de(L.x,L.y,-ue),ce===0&&z.push(L)}ce===0&&le.push(z)}}re=Ti.triangulateShape(ie,le)}const Se=re.length,be=p+_;for(let ie=0;ie<C;ie++){const le=f?H(D[ie],ee[ie],be):D[ie];v?(T.copy(w.normals[0]).multiplyScalar(le.x),S.copy(w.binormals[0]).multiplyScalar(le.y),x.copy(b[0]).add(T).add(S),de(x.x,x.y,x.z)):de(le.x,le.y,0)}for(let ie=1;ie<=h;ie++)for(let le=0;le<C;le++){const he=f?H(D[le],ee[le],be):D[le];v?(T.copy(w.normals[ie]).multiplyScalar(he.x),S.copy(w.binormals[ie]).multiplyScalar(he.y),x.copy(b[ie]).add(T).add(S),de(x.x,x.y,x.z)):de(he.x,he.y,u/h*ie)}for(let ie=g-1;ie>=0;ie--){const le=ie/g,he=d*Math.cos(le*Math.PI/2),ce=p*Math.sin(le*Math.PI/2)+_;for(let ue=0,Xe=O.length;ue<Xe;ue++){const Be=H(O[ue],U[ue],ce);de(Be.x,Be.y,u+he)}for(let ue=0,Xe=P.length;ue<Xe;ue++){const Be=P[ue];V=k[ue];for(let Ye=0,Ke=Be.length;Ye<Ke;Ye++){const z=H(Be[Ye],V[Ye],ce);v?de(z.x,z.y+b[h-1].y,b[h-1].x+he):de(z.x,z.y,u+he)}}}Ve(),J();function Ve(){const ie=s.length/3;if(f){let le=0,he=C*le;for(let ce=0;ce<Se;ce++){const ue=re[ce];Ue(ue[2]+he,ue[1]+he,ue[0]+he)}le=h+g*2,he=C*le;for(let ce=0;ce<Se;ce++){const ue=re[ce];Ue(ue[0]+he,ue[1]+he,ue[2]+he)}}else{for(let le=0;le<Se;le++){const he=re[le];Ue(he[2],he[1],he[0])}for(let le=0;le<Se;le++){const he=re[le];Ue(he[0]+C*h,he[1]+C*h,he[2]+C*h)}}n.addGroup(ie,s.length/3-ie,0)}function J(){const ie=s.length/3;let le=0;j(O,le),le+=O.length;for(let he=0,ce=P.length;he<ce;he++){const ue=P[he];j(ue,le),le+=ue.length}n.addGroup(ie,s.length/3-ie,1)}function j(ie,le){let he=ie.length;for(;--he>=0;){const ce=he;let ue=he-1;ue<0&&(ue=ie.length-1);for(let Xe=0,Be=h+g*2;Xe<Be;Xe++){const Ye=C*Xe,Ke=C*(Xe+1),z=le+ce+Ye,ut=le+ue+Ye,je=le+ue+Ke,L=le+ce+Ke;ve(z,ut,je,L)}}}function de(ie,le,he){c.push(ie),c.push(le),c.push(he)}function Ue(ie,le,he){Ge(ie),Ge(le),Ge(he);const ce=s.length/3,ue=M.generateTopUV(n,s,ce-3,ce-2,ce-1);ht(ue[0]),ht(ue[1]),ht(ue[2])}function ve(ie,le,he,ce){Ge(ie),Ge(le),Ge(ce),Ge(le),Ge(he),Ge(ce);const ue=s.length/3,Xe=M.generateSideWallUV(n,s,ue-6,ue-3,ue-2,ue-1);ht(Xe[0]),ht(Xe[1]),ht(Xe[3]),ht(Xe[1]),ht(Xe[2]),ht(Xe[3])}function Ge(ie){s.push(c[ie*3+0]),s.push(c[ie*3+1]),s.push(c[ie*3+2])}function ht(ie){r.push(ie.x),r.push(ie.y)}}}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}toJSON(){const e=super.toJSON(),t=this.parameters.shapes,n=this.parameters.options;return Y0(t,n,e)}static fromJSON(e,t){const n=[];for(let r=0,o=e.shapes.length;r<o;r++){const a=t[e.shapes[r]];n.push(a)}const s=e.options.extrudePath;return s!==void 0&&(e.options.extrudePath=new Mc[s.type]().fromJSON(s)),new Aa(n,e.options)}}const q0={generateTopUV:function(i,e,t,n,s){const r=e[t*3],o=e[t*3+1],a=e[n*3],c=e[n*3+1],l=e[s*3],h=e[s*3+1];return[new oe(r,o),new oe(a,c),new oe(l,h)]},generateSideWallUV:function(i,e,t,n,s,r){const o=e[t*3],a=e[t*3+1],c=e[t*3+2],l=e[n*3],h=e[n*3+1],u=e[n*3+2],f=e[s*3],d=e[s*3+1],p=e[s*3+2],_=e[r*3],g=e[r*3+1],m=e[r*3+2];return Math.abs(a-h)<Math.abs(o-l)?[new oe(o,1-c),new oe(l,1-u),new oe(f,1-p),new oe(_,1-m)]:[new oe(a,1-c),new oe(h,1-u),new oe(d,1-p),new oe(g,1-m)]}};function Y0(i,e,t){if(t.shapes=[],Array.isArray(i))for(let n=0,s=i.length;n<s;n++){const r=i[n];t.shapes.push(r.uuid)}else t.shapes.push(i.uuid);return t.options=Object.assign({},e),e.extrudePath!==void 0&&(t.options.extrudePath=e.extrudePath.toJSON()),t}class hh extends ah{constructor(e=1,t=0){const n=(1+Math.sqrt(5))/2,s=[-1,n,0,1,n,0,-1,-n,0,1,-n,0,0,-1,n,0,1,n,0,-1,-n,0,1,-n,n,0,-1,n,0,1,-n,0,-1,-n,0,1],r=[0,11,5,0,5,1,0,1,7,0,7,10,0,10,11,1,5,9,5,11,4,11,10,2,10,7,6,7,1,8,3,9,4,3,4,2,3,2,6,3,6,8,3,8,9,4,9,5,2,4,11,6,2,10,8,6,7,9,8,1];super(s,r,e,t),this.type="IcosahedronGeometry",this.parameters={radius:e,detail:t}}static fromJSON(e){return new hh(e.radius,e.detail)}}class uh extends Mt{constructor(e=[new oe(0,-.5),new oe(.5,0),new oe(0,.5)],t=12,n=0,s=Math.PI*2){super(),this.type="LatheGeometry",this.parameters={points:e,segments:t,phiStart:n,phiLength:s},t=Math.floor(t),s=st(s,0,Math.PI*2);const r=[],o=[],a=[],c=[],l=[],h=1/t,u=new B,f=new oe,d=new B,p=new B,_=new B;let g=0,m=0;for(let M=0;M<=e.length-1;M++)switch(M){case 0:g=e[M+1].x-e[M].x,m=e[M+1].y-e[M].y,d.x=m*1,d.y=-g,d.z=m*0,_.copy(d),d.normalize(),c.push(d.x,d.y,d.z);break;case e.length-1:c.push(_.x,_.y,_.z);break;default:g=e[M+1].x-e[M].x,m=e[M+1].y-e[M].y,d.x=m*1,d.y=-g,d.z=m*0,p.copy(d),d.x+=_.x,d.y+=_.y,d.z+=_.z,d.normalize(),c.push(d.x,d.y,d.z),_.copy(p)}for(let M=0;M<=t;M++){const b=n+M*h*s,v=Math.sin(b),w=Math.cos(b);for(let S=0;S<=e.length-1;S++){u.x=e[S].x*v,u.y=e[S].y,u.z=e[S].x*w,o.push(u.x,u.y,u.z),f.x=M/t,f.y=S/(e.length-1),a.push(f.x,f.y);const T=c[3*S+0]*v,x=c[3*S+1],R=c[3*S+0]*w;l.push(T,x,R)}}for(let M=0;M<t;M++)for(let b=0;b<e.length-1;b++){const v=b+M*e.length,w=v,S=v+e.length,T=v+e.length+1,x=v+1;r.push(w,S,x),r.push(T,x,S)}this.setIndex(r),this.setAttribute("position",new Je(o,3)),this.setAttribute("uv",new Je(a,2)),this.setAttribute("normal",new Je(l,3))}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new uh(e.points,e.segments,e.phiStart,e.phiLength)}}class Ot extends Mt{constructor(e=1,t=1,n=1,s=1){super(),this.type="PlaneGeometry",this.parameters={width:e,height:t,widthSegments:n,heightSegments:s};const r=e/2,o=t/2,a=Math.floor(n),c=Math.floor(s),l=a+1,h=c+1,u=e/a,f=t/c,d=[],p=[],_=[],g=[];for(let m=0;m<h;m++){const M=m*f-o;for(let b=0;b<l;b++){const v=b*u-r;p.push(v,-M,0),_.push(0,0,1),g.push(b/a),g.push(1-m/c)}}for(let m=0;m<c;m++)for(let M=0;M<a;M++){const b=M+l*m,v=M+l*(m+1),w=M+1+l*(m+1),S=M+1+l*m;d.push(b,v,S),d.push(v,w,S)}this.setIndex(d),this.setAttribute("position",new Je(p,3)),this.setAttribute("normal",new Je(_,3)),this.setAttribute("uv",new Je(g,2))}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new Ot(e.width,e.height,e.widthSegments,e.heightSegments)}}class fh extends Mt{constructor(e=new Kr([new oe(0,.5),new oe(-.5,-.5),new oe(.5,-.5)]),t=12){super(),this.type="ShapeGeometry",this.parameters={shapes:e,curveSegments:t};const n=[],s=[],r=[],o=[];let a=0,c=0;if(Array.isArray(e)===!1)l(e);else for(let h=0;h<e.length;h++)l(e[h]),this.addGroup(a,c,h),a+=c,c=0;this.setIndex(n),this.setAttribute("position",new Je(s,3)),this.setAttribute("normal",new Je(r,3)),this.setAttribute("uv",new Je(o,2));function l(h){const u=s.length/3,f=h.extractPoints(t);let d=f.shape;const p=f.holes;Ti.isClockWise(d)===!1&&(d=d.reverse());for(let g=0,m=p.length;g<m;g++){const M=p[g];Ti.isClockWise(M)===!0&&(p[g]=M.reverse())}const _=Ti.triangulateShape(d,p);for(let g=0,m=p.length;g<m;g++){const M=p[g];d=d.concat(M)}for(let g=0,m=d.length;g<m;g++){const M=d[g];s.push(M.x,M.y,0),r.push(0,0,1),o.push(M.x,M.y)}for(let g=0,m=_.length;g<m;g++){const M=_[g],b=M[0]+u,v=M[1]+u,w=M[2]+u;n.push(b,v,w),c+=3}}}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}toJSON(){const e=super.toJSON(),t=this.parameters.shapes;return $0(t,e)}static fromJSON(e,t){const n=[];for(let s=0,r=e.shapes.length;s<r;s++){const o=t[e.shapes[s]];n.push(o)}return new fh(n,e.curveSegments)}}function $0(i,e){if(e.shapes=[],Array.isArray(i))for(let t=0,n=i.length;t<n;t++){const s=i[t];e.shapes.push(s.uuid)}else e.shapes.push(i.uuid);return e}class Mn extends Mt{constructor(e=1,t=32,n=16,s=0,r=Math.PI*2,o=0,a=Math.PI){super(),this.type="SphereGeometry",this.parameters={radius:e,widthSegments:t,heightSegments:n,phiStart:s,phiLength:r,thetaStart:o,thetaLength:a},t=Math.max(3,Math.floor(t)),n=Math.max(2,Math.floor(n));const c=Math.min(o+a,Math.PI);let l=0;const h=[],u=new B,f=new B,d=[],p=[],_=[],g=[];for(let m=0;m<=n;m++){const M=[],b=m/n,v=o+b*a,w=e*Math.cos(v),S=Math.sqrt(e*e-w*w);let T=0;m===0&&o===0?T=.5/t:m===n&&c===Math.PI&&(T=-.5/t);for(let x=0;x<=t;x++){const R=x/t,D=s+R*r;u.x=-S*Math.cos(D),u.y=w,u.z=S*Math.sin(D),p.push(u.x,u.y,u.z),f.copy(u).normalize(),_.push(f.x,f.y,f.z),g.push(R+T,1-b),M.push(l++)}h.push(M)}for(let m=0;m<n;m++)for(let M=0;M<t;M++){const b=h[m][M+1],v=h[m][M],w=h[m+1][M],S=h[m+1][M+1];(m!==0||o>0)&&d.push(b,v,S),(m!==n-1||c<Math.PI)&&d.push(v,w,S)}this.setIndex(d),this.setAttribute("position",new Je(p,3)),this.setAttribute("normal",new Je(_,3)),this.setAttribute("uv",new Je(g,2))}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new Mn(e.radius,e.widthSegments,e.heightSegments,e.phiStart,e.phiLength,e.thetaStart,e.thetaLength)}}class Yt extends Mt{constructor(e=1,t=.4,n=12,s=48,r=Math.PI*2,o=0,a=Math.PI*2){super(),this.type="TorusGeometry",this.parameters={radius:e,tube:t,radialSegments:n,tubularSegments:s,arc:r,thetaStart:o,thetaLength:a},n=Math.floor(n),s=Math.floor(s);const c=[],l=[],h=[],u=[],f=new B,d=new B,p=new B;for(let _=0;_<=n;_++){const g=o+_/n*a;for(let m=0;m<=s;m++){const M=m/s*r;d.x=(e+t*Math.cos(g))*Math.cos(M),d.y=(e+t*Math.cos(g))*Math.sin(M),d.z=t*Math.sin(g),l.push(d.x,d.y,d.z),f.x=e*Math.cos(M),f.y=e*Math.sin(M),p.subVectors(d,f).normalize(),h.push(p.x,p.y,p.z),u.push(m/s),u.push(_/n)}}for(let _=1;_<=n;_++)for(let g=1;g<=s;g++){const m=(s+1)*_+g-1,M=(s+1)*(_-1)+g-1,b=(s+1)*(_-1)+g,v=(s+1)*_+g;c.push(m,M,v),c.push(M,b,v)}this.setIndex(c),this.setAttribute("position",new Je(l,3)),this.setAttribute("normal",new Je(h,3)),this.setAttribute("uv",new Je(u,2))}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new Yt(e.radius,e.tube,e.radialSegments,e.tubularSegments,e.arc,e.thetaStart,e.thetaLength)}}function nr(i){const e={};for(const t in i){e[t]={};for(const n in i[t]){const s=i[t][n];if(ku(s))s.isRenderTargetTexture?(Oe("UniformsUtils: Textures of render targets cannot be cloned via cloneUniforms() or mergeUniforms()."),e[t][n]=null):e[t][n]=s.clone();else if(Array.isArray(s))if(ku(s[0])){const r=[];for(let o=0,a=s.length;o<a;o++)r[o]=s[o].clone();e[t][n]=r}else e[t][n]=s.slice();else e[t][n]=s}}return e}function an(i){const e={};for(let t=0;t<i.length;t++){const n=nr(i[t]);for(const s in n)e[s]=n[s]}return e}function ku(i){return i&&(i.isColor||i.isMatrix3||i.isMatrix4||i.isVector2||i.isVector3||i.isVector4||i.isTexture||i.isQuaternion)}function K0(i){const e=[];for(let t=0;t<i.length;t++)e.push(i[t].clone());return e}function Hd(i){const e=i.getRenderTarget();return e===null?i.outputColorSpace:e.isXRRenderTarget===!0?e.texture.colorSpace:at.workingColorSpace}const Qr={clone:nr,merge:an};var J0=`void main() {
	gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );
}`,Z0=`void main() {
	gl_FragColor = vec4( 1.0, 0.0, 0.0, 1.0 );
}`;class en extends dn{constructor(e){super(),this.isShaderMaterial=!0,this.type="ShaderMaterial",this.defines={},this.uniforms={},this.uniformsGroups=[],this.vertexShader=J0,this.fragmentShader=Z0,this.linewidth=1,this.wireframe=!1,this.wireframeLinewidth=1,this.fog=!1,this.lights=!1,this.clipping=!1,this.forceSinglePass=!0,this.extensions={clipCullDistance:!1,multiDraw:!1},this.defaultAttributeValues={color:[1,1,1],uv:[0,0],uv1:[0,0]},this.index0AttributeName=void 0,this.uniformsNeedUpdate=!1,this.glslVersion=null,e!==void 0&&this.setValues(e)}copy(e){return super.copy(e),this.fragmentShader=e.fragmentShader,this.vertexShader=e.vertexShader,this.uniforms=nr(e.uniforms),this.uniformsGroups=K0(e.uniformsGroups),this.defines=Object.assign({},e.defines),this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this.fog=e.fog,this.lights=e.lights,this.clipping=e.clipping,this.extensions=Object.assign({},e.extensions),this.glslVersion=e.glslVersion,this.defaultAttributeValues=Object.assign({},e.defaultAttributeValues),this.index0AttributeName=e.index0AttributeName,this.uniformsNeedUpdate=e.uniformsNeedUpdate,this}toJSON(e){const t=super.toJSON(e);t.glslVersion=this.glslVersion,t.uniforms={};for(const s in this.uniforms){const o=this.uniforms[s].value;o&&o.isTexture?t.uniforms[s]={type:"t",value:o.toJSON(e).uuid}:o&&o.isColor?t.uniforms[s]={type:"c",value:o.getHex()}:o&&o.isVector2?t.uniforms[s]={type:"v2",value:o.toArray()}:o&&o.isVector3?t.uniforms[s]={type:"v3",value:o.toArray()}:o&&o.isVector4?t.uniforms[s]={type:"v4",value:o.toArray()}:o&&o.isMatrix3?t.uniforms[s]={type:"m3",value:o.toArray()}:o&&o.isMatrix4?t.uniforms[s]={type:"m4",value:o.toArray()}:t.uniforms[s]={value:o}}Object.keys(this.defines).length>0&&(t.defines=this.defines),t.vertexShader=this.vertexShader,t.fragmentShader=this.fragmentShader,t.lights=this.lights,t.clipping=this.clipping;const n={};for(const s in this.extensions)this.extensions[s]===!0&&(n[s]=!0);return Object.keys(n).length>0&&(t.extensions=n),t}fromJSON(e,t){if(super.fromJSON(e,t),e.uniforms!==void 0)for(const n in e.uniforms){const s=e.uniforms[n];switch(this.uniforms[n]={},s.type){case"t":this.uniforms[n].value=t[s.value]||null;break;case"c":this.uniforms[n].value=new Ne().setHex(s.value);break;case"v2":this.uniforms[n].value=new oe().fromArray(s.value);break;case"v3":this.uniforms[n].value=new B().fromArray(s.value);break;case"v4":this.uniforms[n].value=new St().fromArray(s.value);break;case"m3":this.uniforms[n].value=new Ze().fromArray(s.value);break;case"m4":this.uniforms[n].value=new Qe().fromArray(s.value);break;default:this.uniforms[n].value=s.value}}if(e.defines!==void 0&&(this.defines=e.defines),e.vertexShader!==void 0&&(this.vertexShader=e.vertexShader),e.fragmentShader!==void 0&&(this.fragmentShader=e.fragmentShader),e.glslVersion!==void 0&&(this.glslVersion=e.glslVersion),e.extensions!==void 0)for(const n in e.extensions)this.extensions[n]=e.extensions[n];return e.lights!==void 0&&(this.lights=e.lights),e.clipping!==void 0&&(this.clipping=e.clipping),this}}class Vd extends en{constructor(e){super(e),this.isRawShaderMaterial=!0,this.type="RawShaderMaterial"}}class rt extends dn{constructor(e){super(),this.isMeshStandardMaterial=!0,this.type="MeshStandardMaterial",this.defines={STANDARD:""},this.color=new Ne(16777215),this.roughness=1,this.metalness=0,this.map=null,this.lightMap=null,this.lightMapIntensity=1,this.aoMap=null,this.aoMapIntensity=1,this.emissive=new Ne(0),this.emissiveIntensity=1,this.emissiveMap=null,this.bumpMap=null,this.bumpScale=1,this.normalMap=null,this.normalMapType=la,this.normalScale=new oe(1,1),this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.roughnessMap=null,this.metalnessMap=null,this.alphaMap=null,this.envMap=null,this.envMapRotation=new ci,this.envMapIntensity=1,this.wireframe=!1,this.wireframeLinewidth=1,this.wireframeLinecap="round",this.wireframeLinejoin="round",this.flatShading=!1,this.fog=!0,this.setValues(e)}copy(e){return super.copy(e),this.defines={STANDARD:""},this.color.copy(e.color),this.roughness=e.roughness,this.metalness=e.metalness,this.map=e.map,this.lightMap=e.lightMap,this.lightMapIntensity=e.lightMapIntensity,this.aoMap=e.aoMap,this.aoMapIntensity=e.aoMapIntensity,this.emissive.copy(e.emissive),this.emissiveMap=e.emissiveMap,this.emissiveIntensity=e.emissiveIntensity,this.bumpMap=e.bumpMap,this.bumpScale=e.bumpScale,this.normalMap=e.normalMap,this.normalMapType=e.normalMapType,this.normalScale.copy(e.normalScale),this.displacementMap=e.displacementMap,this.displacementScale=e.displacementScale,this.displacementBias=e.displacementBias,this.roughnessMap=e.roughnessMap,this.metalnessMap=e.metalnessMap,this.alphaMap=e.alphaMap,this.envMap=e.envMap,this.envMapRotation.copy(e.envMapRotation),this.envMapIntensity=e.envMapIntensity,this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this.wireframeLinecap=e.wireframeLinecap,this.wireframeLinejoin=e.wireframeLinejoin,this.flatShading=e.flatShading,this.fog=e.fog,this}}class pi extends rt{constructor(e){super(),this.isMeshPhysicalMaterial=!0,this.defines={STANDARD:"",PHYSICAL:""},this.type="MeshPhysicalMaterial",this.anisotropyRotation=0,this.anisotropyMap=null,this.clearcoatMap=null,this.clearcoatRoughness=0,this.clearcoatRoughnessMap=null,this.clearcoatNormalScale=new oe(1,1),this.clearcoatNormalMap=null,this.ior=1.5,Object.defineProperty(this,"reflectivity",{get:function(){return st(2.5*(this.ior-1)/(this.ior+1),0,1)},set:function(t){this.ior=(1+.4*t)/(1-.4*t)}}),this.iridescenceMap=null,this.iridescenceIOR=1.3,this.iridescenceThicknessRange=[100,400],this.iridescenceThicknessMap=null,this.sheenColor=new Ne(0),this.sheenColorMap=null,this.sheenRoughness=1,this.sheenRoughnessMap=null,this.transmissionMap=null,this.thickness=0,this.thicknessMap=null,this.attenuationDistance=1/0,this.attenuationColor=new Ne(1,1,1),this.specularIntensity=1,this.specularIntensityMap=null,this.specularColor=new Ne(1,1,1),this.specularColorMap=null,this._anisotropy=0,this._clearcoat=0,this._dispersion=0,this._iridescence=0,this._retroreflectivity=0,this._sheen=0,this._transmission=0,this.setValues(e)}get anisotropy(){return this._anisotropy}set anisotropy(e){this._anisotropy>0!=e>0&&this.version++,this._anisotropy=e}get clearcoat(){return this._clearcoat}set clearcoat(e){this._clearcoat>0!=e>0&&this.version++,this._clearcoat=e}get iridescence(){return this._iridescence}set iridescence(e){this._iridescence>0!=e>0&&this.version++,this._iridescence=e}get dispersion(){return this._dispersion}set dispersion(e){this._dispersion>0!=e>0&&this.version++,this._dispersion=e}get retroreflectivity(){return this._retroreflectivity}set retroreflectivity(e){this._retroreflectivity>0!=e>0&&this.version++,this._retroreflectivity=e}get sheen(){return this._sheen}set sheen(e){this._sheen>0!=e>0&&this.version++,this._sheen=e}get transmission(){return this._transmission}set transmission(e){this._transmission>0!=e>0&&this.version++,this._transmission=e}copy(e){return super.copy(e),this.defines={STANDARD:"",PHYSICAL:""},this.anisotropy=e.anisotropy,this.anisotropyRotation=e.anisotropyRotation,this.anisotropyMap=e.anisotropyMap,this.clearcoat=e.clearcoat,this.clearcoatMap=e.clearcoatMap,this.clearcoatRoughness=e.clearcoatRoughness,this.clearcoatRoughnessMap=e.clearcoatRoughnessMap,this.clearcoatNormalMap=e.clearcoatNormalMap,this.clearcoatNormalScale.copy(e.clearcoatNormalScale),this.dispersion=e.dispersion,this.ior=e.ior,this.iridescence=e.iridescence,this.iridescenceMap=e.iridescenceMap,this.iridescenceIOR=e.iridescenceIOR,this.iridescenceThicknessRange=[...e.iridescenceThicknessRange],this.iridescenceThicknessMap=e.iridescenceThicknessMap,this.retroreflectivity=e.retroreflectivity,this.sheen=e.sheen,this.sheenColor.copy(e.sheenColor),this.sheenColorMap=e.sheenColorMap,this.sheenRoughness=e.sheenRoughness,this.sheenRoughnessMap=e.sheenRoughnessMap,this.transmission=e.transmission,this.transmissionMap=e.transmissionMap,this.thickness=e.thickness,this.thicknessMap=e.thicknessMap,this.attenuationDistance=e.attenuationDistance,this.attenuationColor.copy(e.attenuationColor),this.specularIntensity=e.specularIntensity,this.specularIntensityMap=e.specularIntensityMap,this.specularColor.copy(e.specularColor),this.specularColorMap=e.specularColorMap,this}}class j0 extends dn{constructor(e){super(),this.isMeshPhongMaterial=!0,this.type="MeshPhongMaterial",this.color=new Ne(16777215),this.specular=new Ne(1118481),this.shininess=30,this.map=null,this.lightMap=null,this.lightMapIntensity=1,this.aoMap=null,this.aoMapIntensity=1,this.emissive=new Ne(0),this.emissiveIntensity=1,this.emissiveMap=null,this.bumpMap=null,this.bumpScale=1,this.normalMap=null,this.normalMapType=la,this.normalScale=new oe(1,1),this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.specularMap=null,this.alphaMap=null,this.envMap=null,this.envMapRotation=new ci,this.combine=Fc,this.reflectivity=1,this.envMapIntensity=1,this.refractionRatio=.98,this.wireframe=!1,this.wireframeLinewidth=1,this.wireframeLinecap="round",this.wireframeLinejoin="round",this.flatShading=!1,this.fog=!0,this.setValues(e)}copy(e){return super.copy(e),this.color.copy(e.color),this.specular.copy(e.specular),this.shininess=e.shininess,this.map=e.map,this.lightMap=e.lightMap,this.lightMapIntensity=e.lightMapIntensity,this.aoMap=e.aoMap,this.aoMapIntensity=e.aoMapIntensity,this.emissive.copy(e.emissive),this.emissiveMap=e.emissiveMap,this.emissiveIntensity=e.emissiveIntensity,this.bumpMap=e.bumpMap,this.bumpScale=e.bumpScale,this.normalMap=e.normalMap,this.normalMapType=e.normalMapType,this.normalScale.copy(e.normalScale),this.displacementMap=e.displacementMap,this.displacementScale=e.displacementScale,this.displacementBias=e.displacementBias,this.specularMap=e.specularMap,this.alphaMap=e.alphaMap,this.envMap=e.envMap,this.envMapRotation.copy(e.envMapRotation),this.combine=e.combine,this.reflectivity=e.reflectivity,this.envMapIntensity=e.envMapIntensity,this.refractionRatio=e.refractionRatio,this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this.wireframeLinecap=e.wireframeLinecap,this.wireframeLinejoin=e.wireframeLinejoin,this.flatShading=e.flatShading,this.fog=e.fog,this}}class Q0 extends dn{constructor(e){super(),this.isMeshDepthMaterial=!0,this.type="MeshDepthMaterial",this.depthPacking=hm,this.map=null,this.alphaMap=null,this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.wireframe=!1,this.wireframeLinewidth=1,this.setValues(e)}copy(e){return super.copy(e),this.depthPacking=e.depthPacking,this.map=e.map,this.alphaMap=e.alphaMap,this.displacementMap=e.displacementMap,this.displacementScale=e.displacementScale,this.displacementBias=e.displacementBias,this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this}}class eg extends dn{constructor(e){super(),this.isMeshDistanceMaterial=!0,this.type="MeshDistanceMaterial",this.map=null,this.alphaMap=null,this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.setValues(e)}copy(e){return super.copy(e),this.map=e.map,this.alphaMap=e.alphaMap,this.displacementMap=e.displacementMap,this.displacementScale=e.displacementScale,this.displacementBias=e.displacementBias,this}}function zi(i,e){return!i||i.constructor===e?i:typeof e.BYTES_PER_ELEMENT=="number"?new e(i):Array.prototype.slice.call(i)}function jo(i){return i!==void 0&&i.inTangents!==void 0&&i.outTangents!==void 0}function tg(i){function e(s,r){return i[s]-i[r]}const t=i.length,n=new Array(t);for(let s=0;s!==t;++s)n[s]=s;return n.sort(e),n}function zu(i,e,t){const n=i.length,s=new i.constructor(n);for(let r=0,o=0;o!==n;++r){const a=t[r]*e;for(let c=0;c!==e;++c)s[o++]=i[a+c]}return s}function ng(i,e,t,n){let s=1,r=i[0];for(;r!==void 0&&r[n]===void 0;)r=i[s++];if(r===void 0)return;let o=r[n];if(o!==void 0)if(Array.isArray(o))do o=r[n],o!==void 0&&(e.push(r.time),t.push(...o)),r=i[s++];while(r!==void 0);else if(o.toArray!==void 0)do o=r[n],o!==void 0&&(e.push(r.time),o.toArray(t,t.length)),r=i[s++];while(r!==void 0);else do o=r[n],o!==void 0&&(e.push(r.time),t.push(o)),r=i[s++];while(r!==void 0)}class sr{constructor(e,t,n,s){this.parameterPositions=e,this._cachedIndex=0,this.resultBuffer=s!==void 0?s:new t.constructor(n),this.sampleValues=t,this.valueSize=n,this.settings=null,this.DefaultSettings_={}}evaluate(e){const t=this.parameterPositions;let n=this._cachedIndex,s=t[n],r=t[n-1];n:{e:{let o;t:{i:if(!(e<s)){for(let a=n+2;;){if(s===void 0){if(e<r)break i;return n=t.length,this._cachedIndex=n,this.copySampleValue_(n-1)}if(n===a)break;if(r=s,s=t[++n],e<s)break e}o=t.length;break t}if(!(e>=r)){const a=t[1];e<a&&(n=2,r=a);for(let c=n-2;;){if(r===void 0)return this._cachedIndex=0,this.copySampleValue_(0);if(n===c)break;if(s=r,r=t[--n-1],e>=r)break e}o=n,n=0;break t}break n}for(;n<o;){const a=n+o>>>1;e<t[a]?o=a:n=a+1}if(s=t[n],r=t[n-1],r===void 0)return this._cachedIndex=0,this.copySampleValue_(0);if(s===void 0)return n=t.length,this._cachedIndex=n,this.copySampleValue_(n-1)}this._cachedIndex=n,this.intervalChanged_(n,r,s)}return this.interpolate_(n,r,e,s)}getSettings_(){return this.settings||this.DefaultSettings_}copySampleValue_(e){const t=this.resultBuffer,n=this.sampleValues,s=this.valueSize,r=e*s;for(let o=0;o!==s;++o)t[o]=n[r+o];return t}interpolate_(){throw new Error("THREE.Interpolant: Call to abstract method.")}intervalChanged_(){}}class ig extends sr{constructor(e,t,n,s){super(e,t,n,s),this._weightPrev=-0,this._offsetPrev=-0,this._weightNext=-0,this._offsetNext=-0,this.DefaultSettings_={endingStart:jh,endingEnd:jh}}intervalChanged_(e,t,n){const s=this.parameterPositions;let r=e-2,o=e+1,a=s[r],c=s[o];if(a===void 0)switch(this.getSettings_().endingStart){case Qh:r=e,a=2*t-n;break;case eu:r=s.length-2,a=t+s[r]-s[r+1];break;default:r=e,a=n}if(c===void 0)switch(this.getSettings_().endingEnd){case Qh:o=e,c=2*n-t;break;case eu:o=1,c=n+s[1]-s[0];break;default:o=e-1,c=t}const l=(n-t)*.5,h=this.valueSize;this._weightPrev=l/(t-a),this._weightNext=l/(c-n),this._offsetPrev=r*h,this._offsetNext=o*h}interpolate_(e,t,n,s){const r=this.resultBuffer,o=this.sampleValues,a=this.valueSize,c=e*a,l=c-a,h=this._offsetPrev,u=this._offsetNext,f=this._weightPrev,d=this._weightNext,p=(n-t)/(s-t),_=p*p,g=_*p,m=-f*g+2*f*_-f*p,M=(1+f)*g+(-1.5-2*f)*_+(-.5+f)*p+1,b=(-1-d)*g+(1.5+d)*_+.5*p,v=d*g-d*_;for(let w=0;w!==a;++w)r[w]=m*o[h+w]+M*o[l+w]+b*o[c+w]+v*o[u+w];return r}}class sg extends sr{constructor(e,t,n,s){super(e,t,n,s)}interpolate_(e,t,n,s){const r=this.resultBuffer,o=this.sampleValues,a=this.valueSize,c=e*a,l=c-a,h=(n-t)/(s-t),u=1-h;for(let f=0;f!==a;++f)r[f]=o[l+f]*u+o[c+f]*h;return r}}class rg extends sr{constructor(e,t,n,s){super(e,t,n,s)}interpolate_(e){return this.copySampleValue_(e-1)}}class og extends sr{interpolate_(e,t,n,s){const r=this.resultBuffer,o=this.sampleValues,a=this.valueSize,c=e*a,l=c-a,h=this.inTangents,u=this.outTangents;if(!h||!u){const p=(n-t)/(s-t),_=1-p;for(let g=0;g!==a;++g)r[g]=o[l+g]*_+o[c+g]*p;return r}const f=a*2,d=e-1;for(let p=0;p!==a;++p){const _=o[l+p],g=o[c+p],m=d*f+p*2,M=u[m],b=u[m+1],v=e*f+p*2,w=h[v],S=h[v+1],T=lg(n,t,M,w,s);r[p]=Gd(T,_,b,S,g)}return r}}function Gd(i,e,t,n,s){const r=1-i;return r*r*r*e+3*r*r*i*t+3*r*i*i*n+i*i*i*s}function ag(i,e,t,n,s){const r=1-i;return 3*r*r*(t-e)+6*r*i*(n-t)+3*i*i*(s-n)}function lg(i,e,t,n,s){let r=(i-e)/(s-e);for(let o=0;o<8;o++){const a=Gd(r,e,t,n,s)-i;if(Math.abs(a)<1e-10)break;const c=ag(r,e,t,n,s);if(Math.abs(c)<1e-10)break;r=Math.max(0,Math.min(1,r-a/c))}return r}class Xn{constructor(e,t,n,s){if(e===void 0)throw new Error("THREE.KeyframeTrack: track name is undefined");if(t===void 0||t.length===0)throw new Error("THREE.KeyframeTrack: no keyframes in track named "+e);this.name=e,this.times=zi(t,this.TimeBufferType),this.values=zi(n,this.ValueBufferType),this.setInterpolation(s||this.DefaultInterpolation)}static toJSON(e){const t=e.constructor;let n;if(t.toJSON!==this.toJSON)n=t.toJSON(e);else{n={name:e.name,times:zi(e.times,Array),values:zi(e.values,Array)};const s=e.getInterpolation();s!==e.DefaultInterpolation&&(n.interpolation=s),jo(e.settings)&&(n.settings={inTangents:zi(e.settings.inTangents,Array),outTangents:zi(e.settings.outTangents,Array)})}return n.type=e.ValueTypeName,n}InterpolantFactoryMethodDiscrete(e){return new rg(this.times,this.values,this.getValueSize(),e)}InterpolantFactoryMethodLinear(e){return new sg(this.times,this.values,this.getValueSize(),e)}InterpolantFactoryMethodSmooth(e){return new ig(this.times,this.values,this.getValueSize(),e)}InterpolantFactoryMethodBezier(e){const t=new og(this.times,this.values,this.getValueSize(),e);return this.settings&&(t.inTangents=this.settings.inTangents,t.outTangents=this.settings.outTangents),t}setInterpolation(e){let t;switch(e){case Gr:t=this.InterpolantFactoryMethodDiscrete;break;case Wr:t=this.InterpolantFactoryMethodLinear;break;case Fa:t=this.InterpolantFactoryMethodSmooth;break;case Zh:t=this.InterpolantFactoryMethodBezier;break}if(t===void 0){const n="unsupported interpolation for "+this.ValueTypeName+" keyframe track named "+this.name;if(this.createInterpolant===void 0)if(e!==this.DefaultInterpolation)this.setInterpolation(this.DefaultInterpolation);else throw new Error(n);return Oe("KeyframeTrack:",n),this}return this.createInterpolant=t,this}getInterpolation(){switch(this.createInterpolant){case this.InterpolantFactoryMethodDiscrete:return Gr;case this.InterpolantFactoryMethodLinear:return Wr;case this.InterpolantFactoryMethodSmooth:return Fa;case this.InterpolantFactoryMethodBezier:return Zh}}getValueSize(){return this.values.length/this.times.length}shift(e){if(e!==0){const t=this.times;for(let n=0,s=t.length;n!==s;++n)t[n]+=e}return this}scale(e){if(e!==1){const t=this.times;for(let n=0,s=t.length;n!==s;++n)t[n]*=e;jo(this.settings)&&(Hu(this.settings.inTangents,e),Hu(this.settings.outTangents,e))}return this}trim(e,t){const n=this.times,s=n.length;let r=0,o=s-1;for(;r!==s&&n[r]<e;)++r;for(;o!==-1&&n[o]>t;)--o;if(++o,r!==0||o!==s){r>=o&&(o=Math.max(o,1),r=o-1);const a=this.getValueSize();this.times=n.slice(r,o),this.values=this.values.slice(r*a,o*a)}return this}validate(){let e=!0;const t=this.getValueSize();t-Math.floor(t)!==0&&($e("KeyframeTrack: Invalid value size in track.",this),e=!1);const n=this.times,s=this.values,r=n.length;r===0&&($e("KeyframeTrack: Track is empty.",this),e=!1);let o=null;for(let a=0;a!==r;a++){const c=n[a];if(typeof c=="number"&&isNaN(c)){$e("KeyframeTrack: Time is not a valid number.",this,a,c),e=!1;break}if(o!==null&&o>c){$e("KeyframeTrack: Out of order keys.",this,a,c,o),e=!1;break}o=c}if(s!==void 0&&Mm(s))for(let a=0,c=s.length;a!==c;++a){const l=s[a];if(isNaN(l)){$e("KeyframeTrack: Value is not a valid number.",this,a,l),e=!1;break}}return e}optimize(){const e=this.times.slice(),t=this.values.slice(),n=this.getValueSize(),s=this.getInterpolation()===Fa,r=e.length-1;let o=1;for(let a=1;a<r;++a){let c=!1;const l=e[a],h=e[a+1];if(l!==h&&(a!==1||l!==e[0]))if(s)c=!0;else{const u=a*n,f=u-n,d=u+n;for(let p=0;p!==n;++p){const _=t[u+p];if(_!==t[f+p]||_!==t[d+p]){c=!0;break}}}if(c){if(a!==o){e[o]=e[a];const u=a*n,f=o*n;for(let d=0;d!==n;++d)t[f+d]=t[u+d]}++o}}if(r>0){e[o]=e[r];for(let a=r*n,c=o*n,l=0;l!==n;++l)t[c+l]=t[a+l];++o}return o!==e.length?(this.times=e.slice(0,o),this.values=t.slice(0,o*n)):(this.times=e,this.values=t),this}clone(){const e=this.times.slice(),t=this.values.slice(),n=this.constructor,s=new n(this.name,e,t);return s.createInterpolant=this.createInterpolant,jo(this.settings)&&(s.settings={inTangents:this.settings.inTangents.slice(),outTangents:this.settings.outTangents.slice()}),s}}function Hu(i,e){for(let t=0,n=i.length;t!==n;t+=2)i[t]*=e}Xn.prototype.ValueTypeName="";Xn.prototype.TimeBufferType=Float32Array;Xn.prototype.ValueBufferType=Float32Array;Xn.prototype.DefaultInterpolation=Wr;class rr extends Xn{constructor(e,t,n){super(e,t,n)}}rr.prototype.ValueTypeName="bool";rr.prototype.ValueBufferType=Array;rr.prototype.DefaultInterpolation=Gr;rr.prototype.InterpolantFactoryMethodLinear=void 0;rr.prototype.InterpolantFactoryMethodSmooth=void 0;class Wd extends Xn{constructor(e,t,n,s){super(e,t,n,s)}}Wd.prototype.ValueTypeName="color";class eo extends Xn{constructor(e,t,n,s){super(e,t,n,s)}}eo.prototype.ValueTypeName="number";class cg extends sr{constructor(e,t,n,s){super(e,t,n,s)}interpolate_(e,t,n,s){const r=this.resultBuffer,o=this.sampleValues,a=this.valueSize,c=(n-t)/(s-t);let l=e*a;for(let h=l+a;l!==h;l+=4)hi.slerpFlat(r,0,o,l-a,o,l,c);return r}}class to extends Xn{constructor(e,t,n,s){super(e,t,n,s)}InterpolantFactoryMethodLinear(e){return new cg(this.times,this.values,this.getValueSize(),e)}}to.prototype.ValueTypeName="quaternion";to.prototype.InterpolantFactoryMethodSmooth=void 0;class or extends Xn{constructor(e,t,n){super(e,t,n)}}or.prototype.ValueTypeName="string";or.prototype.ValueBufferType=Array;or.prototype.DefaultInterpolation=Gr;or.prototype.InterpolantFactoryMethodLinear=void 0;or.prototype.InterpolantFactoryMethodSmooth=void 0;class ga extends Xn{constructor(e,t,n,s){super(e,t,n,s)}}ga.prototype.ValueTypeName="vector";class hg{constructor(e="",t=-1,n=[],s=lm){this.name=e,this.tracks=n,this.duration=t,this.blendMode=s,this.uuid=Un(),this.userData={},this.duration<0&&this.resetDuration()}static parse(e){const t=[],n=e.tracks,s=1/(e.fps||1);for(let o=0,a=n.length;o!==a;++o)t.push(fg(n[o]).scale(s));const r=new this(e.name,e.duration,t,e.blendMode);return r.uuid=e.uuid,r.userData=JSON.parse(e.userData||"{}"),r}static toJSON(e){const t=[],n=e.tracks,s={name:e.name,duration:e.duration,tracks:t,uuid:e.uuid,blendMode:e.blendMode,userData:JSON.stringify(e.userData)};for(let r=0,o=n.length;r!==o;++r)t.push(Xn.toJSON(n[r]));return s}static CreateFromMorphTargetSequence(e,t,n,s){const r=t.length,o=[];for(let a=0;a<r;a++){let c=[],l=[];c.push((a+r-1)%r,a,(a+1)%r),l.push(0,1,0);const h=tg(c);c=zu(c,1,h),l=zu(l,1,h),!s&&c[0]===0&&(c.push(r),l.push(l[0])),o.push(new eo(".morphTargetInfluences["+t[a].name+"]",c,l).scale(1/n))}return new this(e,-1,o)}static findByName(e,t){let n=e;if(!Array.isArray(e)){const s=e;n=s.geometry&&s.geometry.animations||s.animations}for(let s=0;s<n.length;s++)if(n[s].name===t)return n[s];return null}static CreateClipsFromMorphTargetSequences(e,t,n){const s={},r=/^([\w-]*?)([\d]+)$/;for(let a=0,c=e.length;a<c;a++){const l=e[a],h=l.name.match(r);if(h&&h.length>1){const u=h[1];let f=s[u];f||(s[u]=f=[]),f.push(l)}}const o=[];for(const a in s)o.push(this.CreateFromMorphTargetSequence(a,s[a],t,n));return o}resetDuration(){const e=this.tracks;let t=0;for(let n=0,s=e.length;n!==s;++n){const r=this.tracks[n];t=Math.max(t,r.times[r.times.length-1])}return this.duration=t,this}trim(){for(let e=0;e<this.tracks.length;e++)this.tracks[e].trim(0,this.duration);return this}validate(){let e=!0;for(let t=0;t<this.tracks.length;t++)e=e&&this.tracks[t].validate();return e}optimize(){for(let e=0;e<this.tracks.length;e++)this.tracks[e].optimize();return this}clone(){const e=[];for(let n=0;n<this.tracks.length;n++)e.push(this.tracks[n].clone());const t=new this.constructor(this.name,this.duration,e,this.blendMode);return t.userData=JSON.parse(JSON.stringify(this.userData)),t}toJSON(){return this.constructor.toJSON(this)}}function ug(i){switch(i.toLowerCase()){case"scalar":case"double":case"float":case"number":case"integer":return eo;case"vector":case"vector2":case"vector3":case"vector4":return ga;case"color":return Wd;case"quaternion":return to;case"bool":case"boolean":return rr;case"string":return or}throw new Error("THREE.KeyframeTrack: Unsupported typeName: "+i)}function fg(i){if(i.type===void 0)throw new Error("THREE.KeyframeTrack: track type undefined, can not parse");const e=ug(i.type);if(i.times===void 0){const n=[],s=[];ng(i.keys,n,s,"value"),i.times=n,i.values=s}let t;return e.parse!==void 0?t=e.parse(i):t=new e(i.name,i.times,i.values,i.interpolation),jo(i.settings)&&(t.settings={inTangents:zi(i.settings.inTangents,Float32Array),outTangents:zi(i.settings.outTangents,Float32Array)}),t}const Ei={enabled:!1,files:{},add:function(i,e){this.enabled!==!1&&(Vu(i)||(this.files[i]=e))},get:function(i){if(this.enabled!==!1&&!Vu(i))return this.files[i]},remove:function(i){delete this.files[i]},clear:function(){this.files={}}};function Vu(i){try{const e=i.slice(i.indexOf(":")+1);return new URL(e).protocol==="blob:"}catch{return!1}}class dg{constructor(e,t,n){const s=this;let r=!1,o=0,a=0,c;const l=[];this.onStart=void 0,this.onLoad=e,this.onProgress=t,this.onError=n,this._abortController=null,this.itemStart=function(h){a++,r===!1&&s.onStart!==void 0&&s.onStart(h,o,a),r=!0},this.itemEnd=function(h){o++,s.onProgress!==void 0&&s.onProgress(h,o,a),o===a&&(r=!1,s.onLoad!==void 0&&s.onLoad())},this.itemError=function(h){s.onError!==void 0&&s.onError(h)},this.resolveURL=function(h){return h=h.normalize("NFC"),c?c(h):h},this.setURLModifier=function(h){return c=h,this},this.addHandler=function(h,u){return l.push(h,u),this},this.removeHandler=function(h){const u=l.indexOf(h);return u!==-1&&l.splice(u,2),this},this.getHandler=function(h){for(let u=0,f=l.length;u<f;u+=2){const d=l[u],p=l[u+1];if(d.global&&(d.lastIndex=0),d.test(h))return p}return null},this.abort=function(){return this.abortController.abort(),this._abortController=null,this}}get abortController(){return this._abortController||(this._abortController=new AbortController),this._abortController}}const pg=new dg;class ds{constructor(e){this.manager=e!==void 0?e:pg,this.crossOrigin="anonymous",this.withCredentials=!1,this.path="",this.resourcePath="",this.requestHeader={},typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("observe",{detail:this}))}load(){}loadAsync(e,t){const n=this;return new Promise(function(s,r){n.load(e,s,t,r)})}parse(){}setCrossOrigin(e){return this.crossOrigin=e,this}setWithCredentials(e){return this.withCredentials=e,this}setPath(e){return this.path=e,this}setResourcePath(e){return this.resourcePath=e,this}setRequestHeader(e){return this.requestHeader=e,this}abort(){return this}}ds.DEFAULT_MATERIAL_NAME="__DEFAULT";const Mi={};class mg extends Error{constructor(e,t){super(e),this.response=t}}class dh extends ds{constructor(e){super(e),this.mimeType="",this.responseType="",this._abortController=new AbortController}load(e,t,n,s){e===void 0&&(e=""),this.path!==void 0&&(e=this.path+e),e=this.manager.resolveURL(e);const r=Ei.get(`file:${e}`);if(r!==void 0){this.manager.itemStart(e),setTimeout(()=>{t&&t(r),this.manager.itemEnd(e)},0);return}if(Mi[e]!==void 0){Mi[e].push({onLoad:t,onProgress:n,onError:s});return}Mi[e]=[],Mi[e].push({onLoad:t,onProgress:n,onError:s});const o=new Request(e,{headers:new Headers(this.requestHeader),credentials:this.withCredentials?"include":"same-origin",signal:typeof AbortSignal.any=="function"?AbortSignal.any([this._abortController.signal,this.manager.abortController.signal]):this._abortController.signal}),a=this.mimeType,c=this.responseType;fetch(o).then(l=>{if(l.status===200||l.status===0){if(l.status===0&&Oe("FileLoader: HTTP Status 0 received."),typeof ReadableStream>"u"||l.body===void 0||l.body.getReader===void 0)return l;const h=Mi[e],u=l.body.getReader(),f=l.headers.get("X-File-Size")||l.headers.get("Content-Length"),d=f?parseInt(f):0,p=d!==0;let _=0;const g=new ReadableStream({start(m){M();function M(){u.read().then(({done:b,value:v})=>{if(b)m.close();else{_+=v.byteLength;const w=new ProgressEvent("progress",{lengthComputable:p,loaded:_,total:d});for(let S=0,T=h.length;S<T;S++){const x=h[S];x.onProgress&&x.onProgress(w)}m.enqueue(v),M()}},b=>{m.error(b)})}}});return new Response(g)}else throw new mg(`fetch for "${l.url}" responded with ${l.status}: ${l.statusText}`,l)}).then(l=>{switch(c){case"arraybuffer":return l.arrayBuffer();case"blob":return l.blob();case"document":return l.text().then(h=>new DOMParser().parseFromString(h,a));case"json":return l.json();default:if(a==="")return l.text();{const u=/charset="?([^;"\s]*)"?/i.exec(a),f=u&&u[1]?u[1].toLowerCase():void 0,d=new TextDecoder(f);return l.arrayBuffer().then(p=>d.decode(p))}}}).then(l=>{Ei.add(`file:${e}`,l);const h=Mi[e];delete Mi[e];for(let u=0,f=h.length;u<f;u++){const d=h[u];d.onLoad&&d.onLoad(l)}}).catch(l=>{const h=Mi[e];if(h===void 0)throw this.manager.itemError(e),l;delete Mi[e];for(let u=0,f=h.length;u<f;u++){const d=h[u];d.onError&&d.onError(l)}this.manager.itemError(e)}).finally(()=>{this.manager.itemEnd(e)}),this.manager.itemStart(e)}setResponseType(e){return this.responseType=e,this}setMimeType(e){return this.mimeType=e,this}abort(){return this._abortController.abort(),this._abortController=new AbortController,this}}const Is=new WeakMap;class gg extends ds{constructor(e){super(e)}load(e,t,n,s){this.path!==void 0&&(e=this.path+e),e=this.manager.resolveURL(e);const r=this,o=Ei.get(`image:${e}`);if(o!==void 0){if(o.complete===!0)r.manager.itemStart(e),setTimeout(function(){t&&t(o),r.manager.itemEnd(e)},0);else{let u=Is.get(o);u===void 0&&(u=[],Is.set(o,u)),u.push({onLoad:t,onError:s})}return o}const a=qr("img");function c(){h(),t&&t(this);const u=Is.get(this)||[];for(let f=0;f<u.length;f++){const d=u[f];d.onLoad&&d.onLoad(this)}Is.delete(this),r.manager.itemEnd(e)}function l(u){h(),s&&s(u),Ei.remove(`image:${e}`);const f=Is.get(this)||[];for(let d=0;d<f.length;d++){const p=f[d];p.onError&&p.onError(u)}Is.delete(this),r.manager.itemError(e),r.manager.itemEnd(e)}function h(){a.removeEventListener("load",c,!1),a.removeEventListener("error",l,!1)}return a.addEventListener("load",c,!1),a.addEventListener("error",l,!1),e.slice(0,5)!=="data:"&&this.crossOrigin!==void 0&&(a.crossOrigin=this.crossOrigin),Ei.add(`image:${e}`,a),r.manager.itemStart(e),a.src=e,a}}class Xd extends ds{constructor(e){super(e)}load(e,t,n,s){const r=new Ht,o=new gg(this.manager);return o.setCrossOrigin(this.crossOrigin),o.setPath(this.path),o.load(e,function(a){r.image=a,r.needsUpdate=!0,t!==void 0&&t(r)},n,s),r}}class io extends Rt{constructor(e,t=1){super(),this.isLight=!0,this.type="Light",this.color=new Ne(e),this.intensity=t}copy(e,t){return super.copy(e,t),this.color.copy(e.color),this.intensity=e.intensity,this}toJSON(e){const t=super.toJSON(e);return t.object.color=this.color.getHex(),t.object.intensity=this.intensity,t}}class ul extends io{constructor(e,t,n){super(e,n),this.isHemisphereLight=!0,this.type="HemisphereLight",this.position.copy(Rt.DEFAULT_UP),this.updateMatrix(),this.groundColor=new Ne(t)}copy(e,t){return super.copy(e,t),this.groundColor.copy(e.groundColor),this}toJSON(e){const t=super.toJSON(e);return t.object.groundColor=this.groundColor.getHex(),t}}const fl=new Qe,Gu=new B,Wu=new B;class ph{constructor(e){this.camera=e,this.intensity=1,this.bias=0,this.biasNode=null,this.normalBias=0,this.radius=1,this.blurSamples=8,this.mapSize=new oe(512,512),this.mapType=xn,this.map=null,this.mapPass=null,this.matrix=new Qe,this.autoUpdate=!0,this.needsUpdate=!1,this._frustum=new sh,this._frameExtents=new oe(1,1),this._viewportCount=1,this._viewports=[new St(0,0,1,1)]}getViewportCount(){return this._viewportCount}getCamera(){return this.camera}getFrustum(){return this._frustum}updateMatrices(e){const t=this.camera;Gu.setFromMatrixPosition(e.matrixWorld),t.position.copy(Gu),Wu.setFromMatrixPosition(e.target.matrixWorld),t.lookAt(Wu),t.updateMatrixWorld(),this._updateMatrix(t,this.matrix,this._frustum)}_updateMatrix(e,t,n,s){fl.multiplyMatrices(e.projectionMatrix,e.matrixWorldInverse),n.setFromProjectionMatrix(fl,e.coordinateSystem,e.reversedDepth);const r=this._frameExtents,o=s?s.z/r.x:1,a=s?s.w/r.y:1,c=s?s.x/r.x:0,l=s?s.y/r.y:0;e.coordinateSystem===Xr||e.reversedDepth?t.set(.5*o,0,0,.5*o+c,0,.5*a,0,.5*a+l,0,0,1,0,0,0,0,1):t.set(.5*o,0,0,.5*o+c,0,.5*a,0,.5*a+l,0,0,.5,.5,0,0,0,1),t.multiply(fl)}getViewport(e){return this._viewports[e]}getFrameExtents(){return this._frameExtents}dispose(){this.map&&this.map.dispose(),this.mapPass&&this.mapPass.dispose()}copy(e){return this.camera=e.camera.clone(),this.intensity=e.intensity,this.bias=e.bias,this.radius=e.radius,this.autoUpdate=e.autoUpdate,this.needsUpdate=e.needsUpdate,this.normalBias=e.normalBias,this.blurSamples=e.blurSamples,this.mapSize.copy(e.mapSize),this.biasNode=e.biasNode,this}clone(){return new this.constructor().copy(this)}toJSON(){const e={};return e.intensity=this.intensity,e.bias=this.bias,e.normalBias=this.normalBias,e.radius=this.radius,e.blurSamples=this.blurSamples,e.mapSize=this.mapSize.toArray(),e.camera=this.camera.toJSON(!1).object,delete e.camera.matrix,e}}const Oo=new B,Bo=new hi,$n=new B;class qd extends Rt{constructor(){super(),this.isCamera=!0,this.type="Camera",this.matrixWorldInverse=new Qe,this.projectionMatrix=new Qe,this.projectionMatrixInverse=new Qe,this.coordinateSystem=si,this._reversedDepth=!1}get reversedDepth(){return this._reversedDepth}copy(e,t){return super.copy(e,t),this.matrixWorldInverse.copy(e.matrixWorldInverse),this.projectionMatrix.copy(e.projectionMatrix),this.projectionMatrixInverse.copy(e.projectionMatrixInverse),this.coordinateSystem=e.coordinateSystem,this}getWorldDirection(e){return super.getWorldDirection(e).negate()}updateMatrixWorld(e){super.updateMatrixWorld(e),this.matrixWorld.decompose(Oo,Bo,$n),$n.x===1&&$n.y===1&&$n.z===1?this.matrixWorldInverse.copy(this.matrixWorld).invert():this.matrixWorldInverse.compose(Oo,Bo,$n.set(1,1,1)).invert()}updateWorldMatrix(e,t,n=!1){super.updateWorldMatrix(e,t,n),this.matrixWorld.decompose(Oo,Bo,$n),$n.x===1&&$n.y===1&&$n.z===1?this.matrixWorldInverse.copy(this.matrixWorld).invert():this.matrixWorldInverse.compose(Oo,Bo,$n.set(1,1,1)).invert()}clone(){return new this.constructor().copy(this)}}const Fi=new B,Xu=new oe,qu=new oe;class jt extends qd{constructor(e=50,t=1,n=.1,s=2e3){super(),this.isPerspectiveCamera=!0,this.type="PerspectiveCamera",this.fov=e,this.zoom=1,this.near=n,this.far=s,this.focus=10,this.aspect=t,this.view=null,this.filmGauge=35,this.filmOffset=0,this.updateProjectionMatrix()}copy(e,t){return super.copy(e,t),this.fov=e.fov,this.zoom=e.zoom,this.near=e.near,this.far=e.far,this.focus=e.focus,this.aspect=e.aspect,this.view=e.view===null?null:Object.assign({},e.view),this.filmGauge=e.filmGauge,this.filmOffset=e.filmOffset,this}setFocalLength(e){const t=.5*this.getFilmHeight()/e;this.fov=er*2*Math.atan(t),this.updateProjectionMatrix()}getFocalLength(){const e=Math.tan(Nr*.5*this.fov);return .5*this.getFilmHeight()/e}getEffectiveFOV(){return er*2*Math.atan(Math.tan(Nr*.5*this.fov)/this.zoom)}getFilmWidth(){return this.filmGauge*Math.min(this.aspect,1)}getFilmHeight(){return this.filmGauge/Math.max(this.aspect,1)}getViewBounds(e,t,n){Fi.set(-1,-1,.5).applyMatrix4(this.projectionMatrixInverse),t.set(Fi.x,Fi.y).multiplyScalar(-e/Fi.z),Fi.set(1,1,.5).applyMatrix4(this.projectionMatrixInverse),n.set(Fi.x,Fi.y).multiplyScalar(-e/Fi.z)}getViewSize(e,t){return this.getViewBounds(e,Xu,qu),t.subVectors(qu,Xu)}setViewOffset(e,t,n,s,r,o){this.aspect=e/t,this.view===null&&(this.view={enabled:!0,fullWidth:1,fullHeight:1,offsetX:0,offsetY:0,width:1,height:1}),this.view.enabled=!0,this.view.fullWidth=e,this.view.fullHeight=t,this.view.offsetX=n,this.view.offsetY=s,this.view.width=r,this.view.height=o,this.updateProjectionMatrix()}clearViewOffset(){this.view!==null&&(this.view.enabled=!1),this.updateProjectionMatrix()}updateProjectionMatrix(){const e=this.near;let t=e*Math.tan(Nr*.5*this.fov)/this.zoom,n=2*t,s=this.aspect*n,r=-.5*s;const o=this.view;if(this.view!==null&&this.view.enabled){const c=o.fullWidth,l=o.fullHeight;r+=o.offsetX*s/c,t-=o.offsetY*n/l,s*=o.width/c,n*=o.height/l}const a=this.filmOffset;a!==0&&(r+=e*a/this.getFilmWidth()),this.projectionMatrix.makePerspective(r,r+s,t,t-n,e,this.far,this.coordinateSystem,this.reversedDepth),this.projectionMatrixInverse.copy(this.projectionMatrix).invert()}toJSON(e){const t=super.toJSON(e);return t.object.fov=this.fov,t.object.zoom=this.zoom,t.object.near=this.near,t.object.far=this.far,t.object.focus=this.focus,t.object.aspect=this.aspect,this.view!==null&&(t.object.view=Object.assign({},this.view)),t.object.filmGauge=this.filmGauge,t.object.filmOffset=this.filmOffset,t}}class _g extends ph{constructor(){super(new jt(50,1,.5,500)),this.isSpotLightShadow=!0,this.focus=1,this.aspect=1}updateMatrices(e){const t=this.camera,n=er*2*e.angle*this.focus,s=this.mapSize.width/this.mapSize.height*this.aspect,r=e.distance||t.far;(n!==t.fov||s!==t.aspect||r!==t.far)&&(t.fov=n,t.aspect=s,t.far=r,t.updateProjectionMatrix()),super.updateMatrices(e)}copy(e){return super.copy(e),this.focus=e.focus,this.aspect=e.aspect,this}toJSON(){const e=super.toJSON();return e.focus=this.focus,e.aspect=this.aspect,e}}class xg extends io{constructor(e,t,n=0,s=Math.PI/3,r=0,o=2){super(e,t),this.isSpotLight=!0,this.type="SpotLight",this.position.copy(Rt.DEFAULT_UP),this.updateMatrix(),this.target=new Rt,this.distance=n,this.angle=s,this.penumbra=r,this.decay=o,this.map=null,this.shadow=new _g}get power(){return this.intensity*Math.PI}set power(e){this.intensity=e/Math.PI}dispose(){super.dispose(),this.shadow.dispose()}copy(e,t){return super.copy(e,t),this.distance=e.distance,this.angle=e.angle,this.penumbra=e.penumbra,this.decay=e.decay,this.target=e.target.clone(),this.map=e.map,this.shadow=e.shadow.clone(),this}toJSON(e){const t=super.toJSON(e);return t.object.distance=this.distance,t.object.angle=this.angle,t.object.decay=this.decay,t.object.penumbra=this.penumbra,t.object.target=this.target.uuid,this.map&&this.map.isTexture&&(t.object.map=this.map.toJSON(e).uuid),t.object.shadow=this.shadow.toJSON(),t}}class vg extends ph{constructor(){super(new jt(90,1,.5,500)),this.isPointLightShadow=!0}}class Zt extends io{constructor(e,t,n=0,s=2){super(e,t),this.isPointLight=!0,this.type="PointLight",this.distance=n,this.decay=s,this.shadow=new vg}get power(){return this.intensity*4*Math.PI}set power(e){this.intensity=e/(4*Math.PI)}dispose(){super.dispose(),this.shadow.dispose()}copy(e,t){return super.copy(e,t),this.distance=e.distance,this.decay=e.decay,this.shadow=e.shadow.clone(),this}toJSON(e){const t=super.toJSON(e);return t.object.distance=this.distance,t.object.decay=this.decay,t.object.shadow=this.shadow.toJSON(),t}}class so extends qd{constructor(e=-1,t=1,n=1,s=-1,r=.1,o=2e3){super(),this.isOrthographicCamera=!0,this.type="OrthographicCamera",this.zoom=1,this.view=null,this.left=e,this.right=t,this.top=n,this.bottom=s,this.near=r,this.far=o,this.updateProjectionMatrix()}copy(e,t){return super.copy(e,t),this.left=e.left,this.right=e.right,this.top=e.top,this.bottom=e.bottom,this.near=e.near,this.far=e.far,this.zoom=e.zoom,this.view=e.view===null?null:Object.assign({},e.view),this}setViewOffset(e,t,n,s,r,o){this.view===null&&(this.view={enabled:!0,fullWidth:1,fullHeight:1,offsetX:0,offsetY:0,width:1,height:1}),this.view.enabled=!0,this.view.fullWidth=e,this.view.fullHeight=t,this.view.offsetX=n,this.view.offsetY=s,this.view.width=r,this.view.height=o,this.updateProjectionMatrix()}clearViewOffset(){this.view!==null&&(this.view.enabled=!1),this.updateProjectionMatrix()}updateProjectionMatrix(){const e=(this.right-this.left)/(2*this.zoom),t=(this.top-this.bottom)/(2*this.zoom),n=(this.right+this.left)/2,s=(this.top+this.bottom)/2;let r=n-e,o=n+e,a=s+t,c=s-t;if(this.view!==null&&this.view.enabled){const l=(this.right-this.left)/this.view.fullWidth/this.zoom,h=(this.top-this.bottom)/this.view.fullHeight/this.zoom;r+=l*this.view.offsetX,o=r+l*this.view.width,a-=h*this.view.offsetY,c=a-h*this.view.height}this.projectionMatrix.makeOrthographic(r,o,a,c,this.near,this.far,this.coordinateSystem,this.reversedDepth),this.projectionMatrixInverse.copy(this.projectionMatrix).invert()}toJSON(e){const t=super.toJSON(e);return t.object.zoom=this.zoom,t.object.left=this.left,t.object.right=this.right,t.object.top=this.top,t.object.bottom=this.bottom,t.object.near=this.near,t.object.far=this.far,this.view!==null&&(t.object.view=Object.assign({},this.view)),t}}class Mg extends ph{constructor(){super(new so(-5,5,5,-5,.5,500)),this.isDirectionalLightShadow=!0}}class no extends io{constructor(e,t){super(e,t),this.isDirectionalLight=!0,this.type="DirectionalLight",this.position.copy(Rt.DEFAULT_UP),this.updateMatrix(),this.target=new Rt,this.shadow=new Mg}dispose(){super.dispose(),this.shadow.dispose()}copy(e){return super.copy(e),this.target=e.target.clone(),this.shadow=e.shadow.clone(),this}toJSON(e){const t=super.toJSON(e);return t.object.shadow=this.shadow.toJSON(),t.object.target=this.target.uuid,t}}class Qo extends io{constructor(e,t){super(e,t),this.isAmbientLight=!0,this.type="AmbientLight"}}class Br{static extractUrlBase(e){const t=e.lastIndexOf("/");return t===-1?"./":e.slice(0,t+1)}static resolveURL(e,t){return typeof e!="string"||e===""?"":(/^https?:\/\//i.test(t)&&/^\//.test(e)&&(t=t.replace(/(^https?:\/\/[^\/]+).*/i,"$1")),/^(https?:)?\/\//i.test(e)||/^data:.*,.*$/i.test(e)||/^blob:.*$/i.test(e)?e:t+e)}}const dl=new WeakMap;class yg extends ds{constructor(e){super(e),this.isImageBitmapLoader=!0,typeof createImageBitmap>"u"&&Oe("ImageBitmapLoader: createImageBitmap() not supported."),typeof fetch>"u"&&Oe("ImageBitmapLoader: fetch() not supported."),this.options={premultiplyAlpha:"none"},this._abortController=new AbortController}setOptions(e){return this.options=e,this}load(e,t,n,s){e===void 0&&(e=""),this.path!==void 0&&(e=this.path+e),e=this.manager.resolveURL(e);const r=this,o=Ei.get(`image-bitmap:${e}`);if(o!==void 0){if(r.manager.itemStart(e),o.then){o.then(l=>{dl.has(o)===!0?(s&&s(dl.get(o)),r.manager.itemError(e),r.manager.itemEnd(e)):(t&&t(l),r.manager.itemEnd(e))});return}setTimeout(function(){t&&t(o),r.manager.itemEnd(e)},0);return}const a={};a.credentials=this.crossOrigin==="anonymous"?"same-origin":"include",a.headers=this.requestHeader,a.signal=typeof AbortSignal.any=="function"?AbortSignal.any([this._abortController.signal,this.manager.abortController.signal]):this._abortController.signal;const c=fetch(e,a).then(function(l){return l.blob()}).then(function(l){return createImageBitmap(l,Object.assign({},r.options,{colorSpaceConversion:"none"}))}).then(function(l){return Ei.add(`image-bitmap:${e}`,l),t&&t(l),r.manager.itemEnd(e),l}).catch(function(l){s&&s(l),dl.set(c,l),Ei.remove(`image-bitmap:${e}`),r.manager.itemError(e),r.manager.itemEnd(e)});Ei.add(`image-bitmap:${e}`,c),r.manager.itemStart(e)}abort(){return this._abortController.abort(),this._abortController=new AbortController,this}}const Ls=-90,Ns=1;class Sg extends Rt{constructor(e,t,n){super(),this.type="CubeCamera",this.renderTarget=n,this.coordinateSystem=null,this.activeMipmapLevel=0;const s=new jt(Ls,Ns,e,t);s.layers=this.layers,this.add(s);const r=new jt(Ls,Ns,e,t);r.layers=this.layers,this.add(r);const o=new jt(Ls,Ns,e,t);o.layers=this.layers,this.add(o);const a=new jt(Ls,Ns,e,t);a.layers=this.layers,this.add(a);const c=new jt(Ls,Ns,e,t);c.layers=this.layers,this.add(c);const l=new jt(Ls,Ns,e,t);l.layers=this.layers,this.add(l)}updateCoordinateSystem(){const e=this.coordinateSystem,t=this.children.concat(),[n,s,r,o,a,c]=t;for(const l of t)this.remove(l);if(e===si)n.up.set(0,1,0),n.lookAt(1,0,0),s.up.set(0,1,0),s.lookAt(-1,0,0),r.up.set(0,0,-1),r.lookAt(0,1,0),o.up.set(0,0,1),o.lookAt(0,-1,0),a.up.set(0,1,0),a.lookAt(0,0,1),c.up.set(0,1,0),c.lookAt(0,0,-1);else if(e===Xr)n.up.set(0,-1,0),n.lookAt(-1,0,0),s.up.set(0,-1,0),s.lookAt(1,0,0),r.up.set(0,0,1),r.lookAt(0,1,0),o.up.set(0,0,-1),o.lookAt(0,-1,0),a.up.set(0,-1,0),a.lookAt(0,0,1),c.up.set(0,-1,0),c.lookAt(0,0,-1);else throw new Error("THREE.CubeCamera.updateCoordinateSystem(): Invalid coordinate system: "+e);for(const l of t)this.add(l),l.updateMatrixWorld()}update(e,t){this.parent===null&&this.updateMatrixWorld();const{renderTarget:n,activeMipmapLevel:s}=this;this.coordinateSystem!==e.coordinateSystem&&(this.coordinateSystem=e.coordinateSystem,this.updateCoordinateSystem());const[r,o,a,c,l,h]=this.children,u=e.getRenderTarget(),f=e.getActiveCubeFace(),d=e.getActiveMipmapLevel(),p=e.xr.enabled;e.xr.enabled=!1;const _=n.texture.generateMipmaps;n.texture.generateMipmaps=!1;let g=!1;e.isWebGLRenderer===!0?g=e.state.buffers.depth.getReversed():g=e.reversedDepthBuffer,e.setRenderTarget(n,0,s),g&&e.autoClear===!1&&e.clearDepth(),e.render(t,r),e.setRenderTarget(n,1,s),g&&e.autoClear===!1&&e.clearDepth(),e.render(t,o),e.setRenderTarget(n,2,s),g&&e.autoClear===!1&&e.clearDepth(),e.render(t,a),e.setRenderTarget(n,3,s),g&&e.autoClear===!1&&e.clearDepth(),e.render(t,c),e.setRenderTarget(n,4,s),g&&e.autoClear===!1&&e.clearDepth(),e.render(t,l),n.texture.generateMipmaps=_,e.setRenderTarget(n,5,s),g&&e.autoClear===!1&&e.clearDepth(),e.render(t,h),e.setRenderTarget(u,f,d),e.xr.enabled=p,n.texture.needsPMREMUpdate=!0}}class wg extends jt{constructor(e=[]){super(),this.isArrayCamera=!0,this.isMultiViewCamera=!1,this.cameras=e}}class bg{constructor(){this._previousTime=0,this._currentTime=0,this._startTime=performance.now(),this._delta=0,this._elapsed=0,this._timescale=1,this._document=null,this._pageVisibilityHandler=null}connect(e){this._document=e,e.hidden!==void 0&&(this._pageVisibilityHandler=Tg.bind(this),e.addEventListener("visibilitychange",this._pageVisibilityHandler,!1))}disconnect(){this._pageVisibilityHandler!==null&&(this._document.removeEventListener("visibilitychange",this._pageVisibilityHandler),this._pageVisibilityHandler=null),this._document=null}getDelta(){return this._delta/1e3}getElapsed(){return this._elapsed/1e3}getTimescale(){return this._timescale}setTimescale(e){return this._timescale=e,this}reset(){return this._currentTime=performance.now()-this._startTime,this}dispose(){this.disconnect()}update(e){return this._pageVisibilityHandler!==null&&this._document.hidden===!0?this._delta=0:(this._previousTime=this._currentTime,this._currentTime=(e!==void 0?e:performance.now())-this._startTime,this._delta=(this._currentTime-this._previousTime)*this._timescale,this._elapsed+=this._delta),this}}function Tg(){this._document.hidden===!1&&this.reset()}const mh="\\[\\]\\.:\\/",Eg=new RegExp("["+mh+"]","g"),gh="[^"+mh+"]",Ag="[^"+mh.replace("\\.","")+"]",Rg=/((?:WC+[\/:])*)/.source.replace("WC",gh),Cg=/(WCOD+)?/.source.replace("WCOD",Ag),Pg=/(?:\.(WC+)(?:\[(.+)\])?)?/.source.replace("WC",gh),Ig=/\.(WC+)(?:\[(.+)\])?/.source.replace("WC",gh),Lg=new RegExp("^"+Rg+Cg+Pg+Ig+"$"),Ng=["material","materials","bones","map"];class Dg{constructor(e,t,n){const s=n||vt.parseTrackName(t);this._targetGroup=e,this._bindings=e.subscribe_(t,s)}getValue(e,t){this.bind();const n=this._targetGroup.nCachedObjects_,s=this._bindings[n];s!==void 0&&s.getValue(e,t)}setValue(e,t){const n=this._bindings;for(let s=this._targetGroup.nCachedObjects_,r=n.length;s!==r;++s)n[s].setValue(e,t)}bind(){const e=this._bindings;for(let t=this._targetGroup.nCachedObjects_,n=e.length;t!==n;++t)e[t].bind()}unbind(){const e=this._bindings;for(let t=this._targetGroup.nCachedObjects_,n=e.length;t!==n;++t)e[t].unbind()}}class vt{constructor(e,t,n){this.path=t,this.parsedPath=n||vt.parseTrackName(t),this.node=vt.findNode(e,this.parsedPath.nodeName),this.rootNode=e,this.getValue=this._getValue_unbound,this.setValue=this._setValue_unbound}static create(e,t,n){return e&&e.isAnimationObjectGroup?new vt.Composite(e,t,n):new vt(e,t,n)}static sanitizeNodeName(e){return e.replace(/\s/g,"_").replace(Eg,"")}static parseTrackName(e){const t=Lg.exec(e);if(t===null)throw new Error("THREE.PropertyBinding: Cannot parse trackName: "+e);const n={nodeName:t[2],objectName:t[3],objectIndex:t[4],propertyName:t[5],propertyIndex:t[6]},s=n.nodeName&&n.nodeName.lastIndexOf(".");if(s!==void 0&&s!==-1){const r=n.nodeName.substring(s+1);Ng.indexOf(r)!==-1&&(n.nodeName=n.nodeName.substring(0,s),n.objectName=r)}if(n.propertyName===null||n.propertyName.length===0)throw new Error("THREE.PropertyBinding: can not parse propertyName from trackName: "+e);return n}static findNode(e,t){if(t===void 0||t===""||t==="."||t===-1||t===e.name||t===e.uuid)return e;if(e.skeleton){const n=e.skeleton.getBoneByName(t);if(n!==void 0)return n}if(e.children){const n=function(r){for(let o=0;o<r.length;o++){const a=r[o];if(a.name===t||a.uuid===t)return a;const c=n(a.children);if(c)return c}return null},s=n(e.children);if(s)return s}return null}_getValue_unavailable(){}_setValue_unavailable(){}_getValue_direct(e,t){e[t]=this.targetObject[this.propertyName]}_getValue_array(e,t){const n=this.resolvedProperty;for(let s=0,r=n.length;s!==r;++s)e[t++]=n[s]}_getValue_arrayElement(e,t){e[t]=this.resolvedProperty[this.propertyIndex]}_getValue_toArray(e,t){this.resolvedProperty.toArray(e,t)}_setValue_direct(e,t){this.targetObject[this.propertyName]=e[t]}_setValue_direct_setNeedsUpdate(e,t){this.targetObject[this.propertyName]=e[t],this.targetObject.needsUpdate=!0}_setValue_direct_setMatrixWorldNeedsUpdate(e,t){this.targetObject[this.propertyName]=e[t],this.targetObject.matrixWorldNeedsUpdate=!0}_setValue_array(e,t){const n=this.resolvedProperty;for(let s=0,r=n.length;s!==r;++s)n[s]=e[t++]}_setValue_array_setNeedsUpdate(e,t){const n=this.resolvedProperty;for(let s=0,r=n.length;s!==r;++s)n[s]=e[t++];this.targetObject.needsUpdate=!0}_setValue_array_setMatrixWorldNeedsUpdate(e,t){const n=this.resolvedProperty;for(let s=0,r=n.length;s!==r;++s)n[s]=e[t++];this.targetObject.matrixWorldNeedsUpdate=!0}_setValue_arrayElement(e,t){this.resolvedProperty[this.propertyIndex]=e[t]}_setValue_arrayElement_setNeedsUpdate(e,t){this.resolvedProperty[this.propertyIndex]=e[t],this.targetObject.needsUpdate=!0}_setValue_arrayElement_setMatrixWorldNeedsUpdate(e,t){this.resolvedProperty[this.propertyIndex]=e[t],this.targetObject.matrixWorldNeedsUpdate=!0}_setValue_fromArray(e,t){this.resolvedProperty.fromArray(e,t)}_setValue_fromArray_setNeedsUpdate(e,t){this.resolvedProperty.fromArray(e,t),this.targetObject.needsUpdate=!0}_setValue_fromArray_setMatrixWorldNeedsUpdate(e,t){this.resolvedProperty.fromArray(e,t),this.targetObject.matrixWorldNeedsUpdate=!0}_getValue_unbound(e,t){this.bind(),this.getValue(e,t)}_setValue_unbound(e,t){this.bind(),this.setValue(e,t)}bind(){let e=this.node;const t=this.parsedPath,n=t.objectName,s=t.propertyName;let r=t.propertyIndex;if(e||(e=vt.findNode(this.rootNode,t.nodeName),this.node=e),this.getValue=this._getValue_unavailable,this.setValue=this._setValue_unavailable,!e){Oe("PropertyBinding: No target node found for track: "+this.path+".");return}if(n){let l=t.objectIndex;switch(n){case"materials":if(!e.material){$e("PropertyBinding: Can not bind to material as node does not have a material.",this);return}if(!e.material.materials){$e("PropertyBinding: Can not bind to material.materials as node.material does not have a materials array.",this);return}e=e.material.materials;break;case"bones":if(!e.skeleton){$e("PropertyBinding: Can not bind to bones as node does not have a skeleton.",this);return}e=e.skeleton.bones;for(let h=0;h<e.length;h++)if(e[h].name===l){l=h;break}break;case"map":if("map"in e){e=e.map;break}if(!e.material){$e("PropertyBinding: Can not bind to material as node does not have a material.",this);return}if(!e.material.map){$e("PropertyBinding: Can not bind to material.map as node.material does not have a map.",this);return}e=e.material.map;break;default:if(e[n]===void 0){$e("PropertyBinding: Can not bind to objectName of node undefined.",this);return}e=e[n]}if(l!==void 0){if(e[l]===void 0){$e("PropertyBinding: Trying to bind to objectIndex of objectName, but is undefined.",this,e);return}e=e[l]}}const o=e[s];if(o===void 0){const l=t.nodeName;$e("PropertyBinding: Trying to update property for track: "+l+"."+s+" but it wasn't found.",e);return}let a=this.Versioning.None;this.targetObject=e,e.isMaterial===!0?a=this.Versioning.NeedsUpdate:e.isObject3D===!0&&(a=this.Versioning.MatrixWorldNeedsUpdate);let c=this.BindingType.Direct;if(r!==void 0){if(s==="morphTargetInfluences"){if(!e.geometry){$e("PropertyBinding: Can not bind to morphTargetInfluences because node does not have a geometry.",this);return}if(!e.geometry.morphAttributes){$e("PropertyBinding: Can not bind to morphTargetInfluences because node does not have a geometry.morphAttributes.",this);return}e.morphTargetDictionary[r]!==void 0&&(r=e.morphTargetDictionary[r])}c=this.BindingType.ArrayElement,this.resolvedProperty=o,this.propertyIndex=r}else o.fromArray!==void 0&&o.toArray!==void 0?(c=this.BindingType.HasFromToArray,this.resolvedProperty=o):Array.isArray(o)?(c=this.BindingType.EntireArray,this.resolvedProperty=o):this.propertyName=s;this.getValue=this.GetterByBindingType[c],this.setValue=this.SetterByBindingTypeAndVersioning[c][a]}unbind(){this.node=null,this.getValue=this._getValue_unbound,this.setValue=this._setValue_unbound}}vt.Composite=Dg;vt.prototype.BindingType={Direct:0,EntireArray:1,ArrayElement:2,HasFromToArray:3};vt.prototype.Versioning={None:0,NeedsUpdate:1,MatrixWorldNeedsUpdate:2};vt.prototype.GetterByBindingType=[vt.prototype._getValue_direct,vt.prototype._getValue_array,vt.prototype._getValue_arrayElement,vt.prototype._getValue_toArray];vt.prototype.SetterByBindingTypeAndVersioning=[[vt.prototype._setValue_direct,vt.prototype._setValue_direct_setNeedsUpdate,vt.prototype._setValue_direct_setMatrixWorldNeedsUpdate],[vt.prototype._setValue_array,vt.prototype._setValue_array_setNeedsUpdate,vt.prototype._setValue_array_setMatrixWorldNeedsUpdate],[vt.prototype._setValue_arrayElement,vt.prototype._setValue_arrayElement_setNeedsUpdate,vt.prototype._setValue_arrayElement_setMatrixWorldNeedsUpdate],[vt.prototype._setValue_fromArray,vt.prototype._setValue_fromArray_setNeedsUpdate,vt.prototype._setValue_fromArray_setMatrixWorldNeedsUpdate]];const Lh=class Lh{constructor(e,t,n,s){this.elements=[1,0,0,1],e!==void 0&&this.set(e,t,n,s)}identity(){return this.set(1,0,0,1),this}fromArray(e,t=0){for(let n=0;n<4;n++)this.elements[n]=e[n+t];return this}set(e,t,n,s){const r=this.elements;return r[0]=e,r[2]=t,r[1]=n,r[3]=s,this}};Lh.prototype.isMatrix2=!0;let Yu=Lh;function $u(i,e,t,n){const s=Ug(n);switch(t){case md:return i*e;case qc:return i*e/s.components*s.byteLength;case Yc:return i*e/s.components*s.byteLength;case cs:return i*e*2/s.components*s.byteLength;case $c:return i*e*2/s.components*s.byteLength;case gd:return i*e*3/s.components*s.byteLength;case Ln:return i*e*4/s.components*s.byteLength;case Kc:return i*e*4/s.components*s.byteLength;case $o:case Ko:return Math.floor((i+3)/4)*Math.floor((e+3)/4)*8;case Jo:case Zo:return Math.floor((i+3)/4)*Math.floor((e+3)/4)*16;case Vl:case Wl:return Math.max(i,16)*Math.max(e,8)/4;case Hl:case Gl:return Math.max(i,8)*Math.max(e,8)/2;case Xl:case ql:case $l:case Kl:return Math.floor((i+3)/4)*Math.floor((e+3)/4)*8;case Yl:case oa:case Jl:return Math.floor((i+3)/4)*Math.floor((e+3)/4)*16;case Zl:return Math.floor((i+3)/4)*Math.floor((e+3)/4)*16;case jl:return Math.floor((i+4)/5)*Math.floor((e+3)/4)*16;case Ql:return Math.floor((i+4)/5)*Math.floor((e+4)/5)*16;case ec:return Math.floor((i+5)/6)*Math.floor((e+4)/5)*16;case tc:return Math.floor((i+5)/6)*Math.floor((e+5)/6)*16;case nc:return Math.floor((i+7)/8)*Math.floor((e+4)/5)*16;case ic:return Math.floor((i+7)/8)*Math.floor((e+5)/6)*16;case sc:return Math.floor((i+7)/8)*Math.floor((e+7)/8)*16;case rc:return Math.floor((i+9)/10)*Math.floor((e+4)/5)*16;case oc:return Math.floor((i+9)/10)*Math.floor((e+5)/6)*16;case ac:return Math.floor((i+9)/10)*Math.floor((e+7)/8)*16;case lc:return Math.floor((i+9)/10)*Math.floor((e+9)/10)*16;case cc:return Math.floor((i+11)/12)*Math.floor((e+9)/10)*16;case hc:return Math.floor((i+11)/12)*Math.floor((e+11)/12)*16;case uc:case fc:case dc:return Math.ceil(i/4)*Math.ceil(e/4)*16;case pc:case mc:return Math.ceil(i/4)*Math.ceil(e/4)*8;case aa:case gc:return Math.ceil(i/4)*Math.ceil(e/4)*16}throw new Error(`Unable to determine texture byte length for ${t} format.`)}function Ug(i){switch(i){case xn:case ud:return{byteLength:1,components:1};case Hr:case fd:case fn:return{byteLength:2,components:1};case Wc:case Xc:return{byteLength:2,components:4};case li:case Gc:case In:return{byteLength:4,components:1};case dd:case pd:return{byteLength:4,components:3}}throw new Error(`THREE.TextureUtils: Unknown texture type ${i}.`)}typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("register",{detail:{revision:Uc}}));typeof window<"u"&&(window.__THREE__?Oe("WARNING: Multiple instances of Three.js being imported."):window.__THREE__=Uc);/**
 * @license
 * Copyright 2010-2026 Three.js Authors
 * SPDX-License-Identifier: MIT
 */function Yd(){let i=null,e=!1,t=null,n=null;function s(r,o){n=i.requestAnimationFrame(s),t(r,o)}return{start:function(){e!==!0&&t!==null&&i!==null&&(n=i.requestAnimationFrame(s),e=!0)},stop:function(){i!==null&&i.cancelAnimationFrame(n),e=!1},setAnimationLoop:function(r){t=r},setContext:function(r){i=r}}}function Fg(i){const e=new WeakMap;function t(a,c){const l=a.array,h=a.usage,u=l.byteLength,f=i.createBuffer();i.bindBuffer(c,f),i.bufferData(c,l,h),a.onUploadCallback();let d;if(l instanceof Float32Array)d=i.FLOAT;else if(typeof Float16Array<"u"&&l instanceof Float16Array)d=i.HALF_FLOAT;else if(l instanceof Uint16Array)a.isFloat16BufferAttribute?d=i.HALF_FLOAT:d=i.UNSIGNED_SHORT;else if(l instanceof Int16Array)d=i.SHORT;else if(l instanceof Uint32Array)d=i.UNSIGNED_INT;else if(l instanceof Int32Array)d=i.INT;else if(l instanceof Int8Array)d=i.BYTE;else if(l instanceof Uint8Array)d=i.UNSIGNED_BYTE;else if(l instanceof Uint8ClampedArray)d=i.UNSIGNED_BYTE;else throw new Error("THREE.WebGLAttributes: Unsupported buffer data format: "+l);return{buffer:f,type:d,bytesPerElement:l.BYTES_PER_ELEMENT,version:a.version,size:u}}function n(a,c,l){const h=c.array,u=c.updateRanges;if(i.bindBuffer(l,a),u.length===0)i.bufferSubData(l,0,h);else{u.sort((d,p)=>d.start-p.start);let f=0;for(let d=1;d<u.length;d++){const p=u[f],_=u[d];_.start<=p.start+p.count+1?p.count=Math.max(p.count,_.start+_.count-p.start):(++f,u[f]=_)}u.length=f+1;for(let d=0,p=u.length;d<p;d++){const _=u[d];i.bufferSubData(l,_.start*h.BYTES_PER_ELEMENT,h,_.start,_.count)}c.clearUpdateRanges()}c.onUploadCallback()}function s(a){return a.isInterleavedBufferAttribute&&(a=a.data),e.get(a)}function r(a){a.isInterleavedBufferAttribute&&(a=a.data);const c=e.get(a);c&&(i.deleteBuffer(c.buffer),e.delete(a))}function o(a,c){if(a.isInterleavedBufferAttribute&&(a=a.data),a.isGLBufferAttribute){const h=e.get(a);(!h||h.version<a.version)&&e.set(a,{buffer:a.buffer,type:a.type,bytesPerElement:a.elementSize,version:a.version});return}const l=e.get(a);if(l===void 0)e.set(a,t(a,c));else if(l.version<a.version){if(l.size!==a.array.byteLength)throw new Error("THREE.WebGLAttributes: The size of the buffer attribute's array buffer does not match the original size. Resizing buffer attributes is not supported.");n(l.buffer,a,c),l.version=a.version}}return{get:s,remove:r,update:o}}var Og=`#ifdef USE_ALPHAHASH
	if ( diffuseColor.a < getAlphaHashThreshold( vPosition ) ) discard;
#endif`,Bg=`#ifdef USE_ALPHAHASH
	const float ALPHA_HASH_SCALE = 0.05;
	float hash2D( vec2 value ) {
		return fract( 1.0e4 * sin( 17.0 * value.x + 0.1 * value.y ) * ( 0.1 + abs( sin( 13.0 * value.y + value.x ) ) ) );
	}
	float hash3D( vec3 value ) {
		return hash2D( vec2( hash2D( value.xy ), value.z ) );
	}
	float getAlphaHashThreshold( vec3 position ) {
		float maxDeriv = max(
			length( dFdx( position.xyz ) ),
			length( dFdy( position.xyz ) )
		);
		float pixScale = 1.0 / ( ALPHA_HASH_SCALE * maxDeriv );
		vec2 pixScales = vec2(
			exp2( floor( log2( pixScale ) ) ),
			exp2( ceil( log2( pixScale ) ) )
		);
		vec2 alpha = vec2(
			hash3D( floor( pixScales.x * position.xyz ) ),
			hash3D( floor( pixScales.y * position.xyz ) )
		);
		float lerpFactor = fract( log2( pixScale ) );
		float x = ( 1.0 - lerpFactor ) * alpha.x + lerpFactor * alpha.y;
		float a = min( lerpFactor, 1.0 - lerpFactor );
		vec3 cases = vec3(
			x * x / ( 2.0 * a * ( 1.0 - a ) ),
			( x - 0.5 * a ) / ( 1.0 - a ),
			1.0 - ( ( 1.0 - x ) * ( 1.0 - x ) / ( 2.0 * a * ( 1.0 - a ) ) )
		);
		float threshold = ( x < ( 1.0 - a ) )
			? ( ( x < a ) ? cases.x : cases.y )
			: cases.z;
		return clamp( threshold , 1.0e-6, 1.0 );
	}
#endif`,kg=`#ifdef USE_ALPHAMAP
	diffuseColor.a *= texture2D( alphaMap, vAlphaMapUv ).g;
#endif`,zg=`#ifdef USE_ALPHAMAP
	uniform sampler2D alphaMap;
#endif`,Hg=`#ifdef USE_ALPHATEST
	#ifdef ALPHA_TO_COVERAGE
	diffuseColor.a = smoothstep( alphaTest, alphaTest + fwidth( diffuseColor.a ), diffuseColor.a );
	if ( diffuseColor.a == 0.0 ) discard;
	#else
	if ( diffuseColor.a < alphaTest ) discard;
	#endif
#endif`,Vg=`#ifdef USE_ALPHATEST
	uniform float alphaTest;
#endif`,Gg=`#ifdef USE_AOMAP
	float ambientOcclusion = ( texture2D( aoMap, vAoMapUv ).r - 1.0 ) * aoMapIntensity + 1.0;
	reflectedLight.indirectDiffuse *= ambientOcclusion;
	#if defined( USE_CLEARCOAT ) 
		clearcoatSpecularIndirect *= ambientOcclusion;
	#endif
	#if defined( USE_SHEEN ) 
		sheenSpecularIndirect *= ambientOcclusion;
	#endif
	#if defined( USE_ENVMAP ) && defined( STANDARD )
		float dotNV = saturate( dot( geometryNormal, geometryViewDir ) );
		reflectedLight.indirectSpecular *= computeSpecularOcclusion( dotNV, ambientOcclusion, material.roughness );
	#endif
#endif`,Wg=`#ifdef USE_AOMAP
	uniform sampler2D aoMap;
	uniform float aoMapIntensity;
#endif`,Xg=`#ifdef USE_BATCHING
	#if ! defined( GL_ANGLE_multi_draw )
	#define gl_DrawID _gl_DrawID
	uniform int _gl_DrawID;
	#endif
	uniform highp sampler2D batchingTexture;
	uniform highp usampler2D batchingIdTexture;
	mat4 getBatchingMatrix( const in float i ) {
		int size = textureSize( batchingTexture, 0 ).x;
		int j = int( i ) * 4;
		int x = j % size;
		int y = j / size;
		vec4 v1 = texelFetch( batchingTexture, ivec2( x, y ), 0 );
		vec4 v2 = texelFetch( batchingTexture, ivec2( x + 1, y ), 0 );
		vec4 v3 = texelFetch( batchingTexture, ivec2( x + 2, y ), 0 );
		vec4 v4 = texelFetch( batchingTexture, ivec2( x + 3, y ), 0 );
		return mat4( v1, v2, v3, v4 );
	}
	float getIndirectIndex( const in int i ) {
		int size = textureSize( batchingIdTexture, 0 ).x;
		int x = i % size;
		int y = i / size;
		return float( texelFetch( batchingIdTexture, ivec2( x, y ), 0 ).r );
	}
#endif
#ifdef USE_BATCHING_COLOR
	uniform sampler2D batchingColorTexture;
	vec4 getBatchingColor( const in float i ) {
		int size = textureSize( batchingColorTexture, 0 ).x;
		int j = int( i );
		int x = j % size;
		int y = j / size;
		return texelFetch( batchingColorTexture, ivec2( x, y ), 0 );
	}
#endif`,qg=`#ifdef USE_BATCHING
	mat4 batchingMatrix = getBatchingMatrix( getIndirectIndex( gl_DrawID ) );
#endif`,Yg=`vec3 transformed = vec3( position );
#ifdef USE_ALPHAHASH
	vPosition = vec3( position );
#endif`,$g=`vec3 objectNormal = vec3( normal );
#ifdef USE_TANGENT
	vec3 objectTangent = vec3( tangent.xyz );
#endif`,Kg=`float G_BlinnPhong_Implicit( ) {
	return 0.25;
}
float D_BlinnPhong( const in float shininess, const in float dotNH ) {
	return RECIPROCAL_PI * ( shininess * 0.5 + 1.0 ) * pow( dotNH, shininess );
}
vec3 BRDF_BlinnPhong( const in vec3 lightDir, const in vec3 viewDir, const in vec3 normal, const in vec3 specularColor, const in float shininess ) {
	vec3 halfDir = normalize( lightDir + viewDir );
	float dotNH = saturate( dot( normal, halfDir ) );
	float dotVH = saturate( dot( viewDir, halfDir ) );
	vec3 F = F_Schlick( specularColor, 1.0, dotVH );
	float G = G_BlinnPhong_Implicit( );
	float D = D_BlinnPhong( shininess, dotNH );
	return F * ( G * D );
} // validated`,Jg=`#ifdef USE_IRIDESCENCE
	const mat3 XYZ_TO_REC709 = mat3(
		 3.2404542, -0.9692660,  0.0556434,
		-1.5371385,  1.8760108, -0.2040259,
		-0.4985314,  0.0415560,  1.0572252
	);
	vec3 Fresnel0ToIor( vec3 fresnel0 ) {
		vec3 sqrtF0 = sqrt( fresnel0 );
		return ( vec3( 1.0 ) + sqrtF0 ) / ( vec3( 1.0 ) - sqrtF0 );
	}
	vec3 IorToFresnel0( vec3 transmittedIor, float incidentIor ) {
		return pow2( ( transmittedIor - vec3( incidentIor ) ) / ( transmittedIor + vec3( incidentIor ) ) );
	}
	float IorToFresnel0( float transmittedIor, float incidentIor ) {
		return pow2( ( transmittedIor - incidentIor ) / ( transmittedIor + incidentIor ));
	}
	vec3 evalSensitivity( float OPD, vec3 shift ) {
		float phase = 2.0 * PI * OPD * 1.0e-9;
		vec3 val = vec3( 5.4856e-13, 4.4201e-13, 5.2481e-13 );
		vec3 pos = vec3( 1.6810e+06, 1.7953e+06, 2.2084e+06 );
		vec3 var = vec3( 4.3278e+09, 9.3046e+09, 6.6121e+09 );
		vec3 xyz = val * sqrt( 2.0 * PI * var ) * cos( pos * phase + shift ) * exp( - pow2( phase ) * var );
		xyz.x += 9.7470e-14 * sqrt( 2.0 * PI * 4.5282e+09 ) * cos( 2.2399e+06 * phase + shift[ 0 ] ) * exp( - 4.5282e+09 * pow2( phase ) );
		xyz /= 1.0685e-7;
		vec3 rgb = XYZ_TO_REC709 * xyz;
		return rgb;
	}
	vec3 evalIridescence( float outsideIOR, float eta2, float cosTheta1, float thinFilmThickness, vec3 baseF0 ) {
		vec3 I;
		float iridescenceIOR = mix( outsideIOR, eta2, smoothstep( 0.0, 0.03, thinFilmThickness ) );
		float sinTheta2Sq = pow2( outsideIOR / iridescenceIOR ) * ( 1.0 - pow2( cosTheta1 ) );
		float cosTheta2Sq = 1.0 - sinTheta2Sq;
		if ( cosTheta2Sq < 0.0 ) {
			return vec3( 1.0 );
		}
		float cosTheta2 = sqrt( cosTheta2Sq );
		float R0 = IorToFresnel0( iridescenceIOR, outsideIOR );
		float R12 = F_Schlick( R0, 1.0, cosTheta1 );
		float T121 = 1.0 - R12;
		float phi12 = 0.0;
		if ( iridescenceIOR < outsideIOR ) phi12 = PI;
		float phi21 = PI - phi12;
		vec3 baseIOR = Fresnel0ToIor( clamp( baseF0, 0.0, 0.9999 ) );		vec3 R1 = IorToFresnel0( baseIOR, iridescenceIOR );
		vec3 R23 = F_Schlick( R1, 1.0, cosTheta2 );
		vec3 phi23 = vec3( 0.0 );
		if ( baseIOR[ 0 ] < iridescenceIOR ) phi23[ 0 ] = PI;
		if ( baseIOR[ 1 ] < iridescenceIOR ) phi23[ 1 ] = PI;
		if ( baseIOR[ 2 ] < iridescenceIOR ) phi23[ 2 ] = PI;
		float OPD = 2.0 * iridescenceIOR * thinFilmThickness * cosTheta2;
		vec3 phi = vec3( phi21 ) + phi23;
		vec3 R123 = clamp( R12 * R23, 1e-5, 0.9999 );
		vec3 r123 = sqrt( R123 );
		vec3 Rs = pow2( T121 ) * R23 / ( vec3( 1.0 ) - R123 );
		vec3 C0 = R12 + Rs;
		I = C0;
		vec3 Cm = Rs - T121;
		for ( int m = 1; m <= 2; ++ m ) {
			Cm *= r123;
			vec3 Sm = 2.0 * evalSensitivity( float( m ) * OPD, float( m ) * phi );
			I += Cm * Sm;
		}
		return max( I, vec3( 0.0 ) );
	}
#endif`,Zg=`#ifdef USE_BUMPMAP
	uniform sampler2D bumpMap;
	uniform float bumpScale;
	vec2 dHdxy_fwd() {
		vec2 dSTdx = dFdx( vBumpMapUv );
		vec2 dSTdy = dFdy( vBumpMapUv );
		float Hll = bumpScale * texture2D( bumpMap, vBumpMapUv ).x;
		float dBx = bumpScale * texture2D( bumpMap, vBumpMapUv + dSTdx ).x - Hll;
		float dBy = bumpScale * texture2D( bumpMap, vBumpMapUv + dSTdy ).x - Hll;
		return vec2( dBx, dBy );
	}
	vec3 perturbNormalArb( vec3 surf_pos, vec3 surf_norm, vec2 dHdxy, float faceDirection ) {
		vec3 vSigmaX = normalize( dFdx( surf_pos.xyz ) );
		vec3 vSigmaY = normalize( dFdy( surf_pos.xyz ) );
		vec3 vN = surf_norm;
		vec3 R1 = cross( vSigmaY, vN );
		vec3 R2 = cross( vN, vSigmaX );
		float fDet = dot( vSigmaX, R1 ) * faceDirection;
		vec3 vGrad = sign( fDet ) * ( dHdxy.x * R1 + dHdxy.y * R2 );
		return normalize( abs( fDet ) * surf_norm - vGrad );
	}
#endif`,jg=`#if NUM_CLIPPING_PLANES > 0
	vec4 plane;
	#ifdef ALPHA_TO_COVERAGE
		float distanceToPlane, distanceGradient;
		float clipOpacity = 1.0;
		#pragma unroll_loop_start
		for ( int i = 0; i < UNION_CLIPPING_PLANES; i ++ ) {
			plane = clippingPlanes[ i ];
			distanceToPlane = - dot( vClipPosition, plane.xyz ) + plane.w;
			distanceGradient = fwidth( distanceToPlane ) / 2.0;
			clipOpacity *= smoothstep( - distanceGradient, distanceGradient, distanceToPlane );
			if ( clipOpacity == 0.0 ) discard;
		}
		#pragma unroll_loop_end
		#if UNION_CLIPPING_PLANES < NUM_CLIPPING_PLANES
			float unionClipOpacity = 1.0;
			#pragma unroll_loop_start
			for ( int i = UNION_CLIPPING_PLANES; i < NUM_CLIPPING_PLANES; i ++ ) {
				plane = clippingPlanes[ i ];
				distanceToPlane = - dot( vClipPosition, plane.xyz ) + plane.w;
				distanceGradient = fwidth( distanceToPlane ) / 2.0;
				unionClipOpacity *= 1.0 - smoothstep( - distanceGradient, distanceGradient, distanceToPlane );
			}
			#pragma unroll_loop_end
			clipOpacity *= 1.0 - unionClipOpacity;
		#endif
		diffuseColor.a *= clipOpacity;
		if ( diffuseColor.a == 0.0 ) discard;
	#else
		#pragma unroll_loop_start
		for ( int i = 0; i < UNION_CLIPPING_PLANES; i ++ ) {
			plane = clippingPlanes[ i ];
			if ( dot( vClipPosition, plane.xyz ) > plane.w ) discard;
		}
		#pragma unroll_loop_end
		#if UNION_CLIPPING_PLANES < NUM_CLIPPING_PLANES
			bool clipped = true;
			#pragma unroll_loop_start
			for ( int i = UNION_CLIPPING_PLANES; i < NUM_CLIPPING_PLANES; i ++ ) {
				plane = clippingPlanes[ i ];
				clipped = ( dot( vClipPosition, plane.xyz ) > plane.w ) && clipped;
			}
			#pragma unroll_loop_end
			if ( clipped ) discard;
		#endif
	#endif
#endif`,Qg=`#if NUM_CLIPPING_PLANES > 0
	varying vec3 vClipPosition;
	uniform vec4 clippingPlanes[ NUM_CLIPPING_PLANES ];
#endif`,e_=`#if NUM_CLIPPING_PLANES > 0
	varying vec3 vClipPosition;
#endif`,t_=`#if NUM_CLIPPING_PLANES > 0
	vClipPosition = - mvPosition.xyz;
#endif`,n_=`#if defined( USE_COLOR ) || defined( USE_COLOR_ALPHA )
	diffuseColor *= vColor;
#endif`,i_=`#if defined( USE_COLOR ) || defined( USE_COLOR_ALPHA )
	varying vec4 vColor;
#endif`,s_=`#if defined( USE_COLOR ) || defined( USE_COLOR_ALPHA ) || defined( USE_INSTANCING_COLOR ) || defined( USE_BATCHING_COLOR )
	varying vec4 vColor;
#endif`,r_=`#if defined( USE_COLOR ) || defined( USE_COLOR_ALPHA ) || defined( USE_INSTANCING_COLOR ) || defined( USE_BATCHING_COLOR )
	vColor = vec4( 1.0 );
#endif
#ifdef USE_COLOR_ALPHA
	vColor *= color;
#elif defined( USE_COLOR )
	vColor.rgb *= color;
#endif
#ifdef USE_INSTANCING_COLOR
	vColor.rgb *= instanceColor.rgb;
#endif
#ifdef USE_BATCHING_COLOR
	vColor *= getBatchingColor( getIndirectIndex( gl_DrawID ) );
#endif`,o_=`#define PI 3.141592653589793
#define PI2 6.283185307179586
#define PI_HALF 1.5707963267948966
#define RECIPROCAL_PI 0.3183098861837907
#define RECIPROCAL_PI2 0.15915494309189535
#define EPSILON 1e-6
#ifndef saturate
#define saturate( a ) clamp( a, 0.0, 1.0 )
#endif
#define whiteComplement( a ) ( 1.0 - saturate( a ) )
float pow2( const in float x ) { return x*x; }
vec3 pow2( const in vec3 x ) { return x*x; }
float pow3( const in float x ) { return x*x*x; }
float pow4( const in float x ) { float x2 = x*x; return x2*x2; }
float max3( const in vec3 v ) { return max( max( v.x, v.y ), v.z ); }
float average( const in vec3 v ) { return dot( v, vec3( 0.3333333 ) ); }
highp float rand( const in vec2 uv ) {
	const highp float a = 12.9898, b = 78.233, c = 43758.5453;
	highp float dt = dot( uv.xy, vec2( a,b ) ), sn = mod( dt, PI );
	return fract( sin( sn ) * c );
}
#ifdef HIGH_PRECISION
	float precisionSafeLength( vec3 v ) { return length( v ); }
#else
	float precisionSafeLength( vec3 v ) {
		float maxComponent = max3( abs( v ) );
		return length( v / maxComponent ) * maxComponent;
	}
#endif
struct IncidentLight {
	vec3 color;
	vec3 direction;
	bool visible;
};
struct ReflectedLight {
	vec3 directDiffuse;
	vec3 directSpecular;
	vec3 indirectDiffuse;
	vec3 indirectSpecular;
};
#ifdef USE_ALPHAHASH
	varying vec3 vPosition;
#endif
vec3 transformDirection( in vec3 dir, in mat4 matrix ) {
	return normalize( ( matrix * vec4( dir, 0.0 ) ).xyz );
}
#define inverseTransformDirection transformDirectionByInverseViewMatrix
vec3 transformNormalByInverseViewMatrix( in vec3 normal, in mat4 viewMatrix ) {
	return normalize( ( vec4( normal, 0.0 ) * viewMatrix ).xyz );
}
vec3 transformDirectionByInverseViewMatrix( in vec3 dir, in mat4 viewMatrix ) {
	return normalize( ( vec4( dir, 0.0 ) * viewMatrix ).xyz );
}
bool isPerspectiveMatrix( mat4 m ) {
	return m[ 2 ][ 3 ] == - 1.0;
}
vec2 equirectUv( in vec3 dir ) {
	float u = atan( dir.z, dir.x ) * RECIPROCAL_PI2 + 0.5;
	float v = asin( clamp( dir.y, - 1.0, 1.0 ) ) * RECIPROCAL_PI + 0.5;
	return vec2( u, v );
}
vec3 BRDF_Lambert( const in vec3 diffuseColor ) {
	return RECIPROCAL_PI * diffuseColor;
}
vec3 F_Schlick( const in vec3 f0, const in float f90, const in float dotVH ) {
	float fresnel = exp2( ( - 5.55473 * dotVH - 6.98316 ) * dotVH );
	return f0 * ( 1.0 - fresnel ) + ( f90 * fresnel );
}
float F_Schlick( const in float f0, const in float f90, const in float dotVH ) {
	float fresnel = exp2( ( - 5.55473 * dotVH - 6.98316 ) * dotVH );
	return f0 * ( 1.0 - fresnel ) + ( f90 * fresnel );
} // validated`,a_=`#ifdef ENVMAP_TYPE_CUBE_UV
	#define cubeUV_minMipLevel 4.0
	#define cubeUV_minTileSize 16.0
	float getFace( vec3 direction ) {
		vec3 absDirection = abs( direction );
		float face = - 1.0;
		if ( absDirection.x > absDirection.z ) {
			if ( absDirection.x > absDirection.y )
				face = direction.x > 0.0 ? 0.0 : 3.0;
			else
				face = direction.y > 0.0 ? 1.0 : 4.0;
		} else {
			if ( absDirection.z > absDirection.y )
				face = direction.z > 0.0 ? 2.0 : 5.0;
			else
				face = direction.y > 0.0 ? 1.0 : 4.0;
		}
		return face;
	}
	vec2 getUV( vec3 direction, float face ) {
		vec2 uv;
		if ( face == 0.0 ) {
			uv = vec2( direction.z, direction.y ) / abs( direction.x );
		} else if ( face == 1.0 ) {
			uv = vec2( - direction.x, - direction.z ) / abs( direction.y );
		} else if ( face == 2.0 ) {
			uv = vec2( - direction.x, direction.y ) / abs( direction.z );
		} else if ( face == 3.0 ) {
			uv = vec2( - direction.z, direction.y ) / abs( direction.x );
		} else if ( face == 4.0 ) {
			uv = vec2( - direction.x, direction.z ) / abs( direction.y );
		} else {
			uv = vec2( direction.x, direction.y ) / abs( direction.z );
		}
		return 0.5 * ( uv + 1.0 );
	}
	vec3 bilinearCubeUV( sampler2D envMap, vec3 direction, float mipInt ) {
		float face = getFace( direction );
		float filterInt = max( cubeUV_minMipLevel - mipInt, 0.0 );
		mipInt = max( mipInt, cubeUV_minMipLevel );
		float faceSize = exp2( mipInt );
		highp vec2 uv = getUV( direction, face ) * ( faceSize - 2.0 ) + 1.0;
		if ( face > 2.0 ) {
			uv.y += faceSize;
			face -= 3.0;
		}
		uv.x += face * faceSize;
		uv.x += filterInt * 3.0 * cubeUV_minTileSize;
		uv.y += 4.0 * ( exp2( CUBEUV_MAX_MIP ) - faceSize );
		uv.x *= CUBEUV_TEXEL_WIDTH;
		uv.y *= CUBEUV_TEXEL_HEIGHT;
		#ifdef texture2DGradEXT
			return texture2DGradEXT( envMap, uv, vec2( 0.0 ), vec2( 0.0 ) ).rgb;
		#else
			return texture2D( envMap, uv ).rgb;
		#endif
	}
	#define cubeUV_r0 1.0
	#define cubeUV_m0 - 2.0
	#define cubeUV_r1 0.8
	#define cubeUV_m1 - 1.0
	#define cubeUV_r4 0.4
	#define cubeUV_m4 2.0
	#define cubeUV_r5 0.305
	#define cubeUV_m5 3.0
	#define cubeUV_r6 0.21
	#define cubeUV_m6 4.0
	float roughnessToMip( float roughness ) {
		float mip = 0.0;
		if ( roughness >= cubeUV_r1 ) {
			mip = ( cubeUV_r0 - roughness ) * ( cubeUV_m1 - cubeUV_m0 ) / ( cubeUV_r0 - cubeUV_r1 ) + cubeUV_m0;
		} else if ( roughness >= cubeUV_r4 ) {
			mip = ( cubeUV_r1 - roughness ) * ( cubeUV_m4 - cubeUV_m1 ) / ( cubeUV_r1 - cubeUV_r4 ) + cubeUV_m1;
		} else if ( roughness >= cubeUV_r5 ) {
			mip = ( cubeUV_r4 - roughness ) * ( cubeUV_m5 - cubeUV_m4 ) / ( cubeUV_r4 - cubeUV_r5 ) + cubeUV_m4;
		} else if ( roughness >= cubeUV_r6 ) {
			mip = ( cubeUV_r5 - roughness ) * ( cubeUV_m6 - cubeUV_m5 ) / ( cubeUV_r5 - cubeUV_r6 ) + cubeUV_m5;
		} else {
			mip = - 2.0 * log2( 1.16 * roughness );		}
		return mip;
	}
	vec4 textureCubeUV( sampler2D envMap, vec3 sampleDir, float roughness ) {
		float mip = clamp( roughnessToMip( roughness ), cubeUV_m0, CUBEUV_MAX_MIP );
		float mipF = fract( mip );
		float mipInt = floor( mip );
		vec3 color0 = bilinearCubeUV( envMap, sampleDir, mipInt );
		if ( mipF == 0.0 ) {
			return vec4( color0, 1.0 );
		} else {
			vec3 color1 = bilinearCubeUV( envMap, sampleDir, mipInt + 1.0 );
			return vec4( mix( color0, color1, mipF ), 1.0 );
		}
	}
#endif`,l_=`vec3 transformedNormal = objectNormal;
#ifdef USE_TANGENT
	vec3 transformedTangent = objectTangent;
#endif
#ifdef USE_BATCHING
	mat3 bm = mat3( batchingMatrix );
	transformedNormal /= vec3( dot( bm[ 0 ], bm[ 0 ] ), dot( bm[ 1 ], bm[ 1 ] ), dot( bm[ 2 ], bm[ 2 ] ) );
	transformedNormal = bm * transformedNormal;
	#ifdef USE_TANGENT
		transformedTangent = bm * transformedTangent;
	#endif
#endif
#ifdef USE_INSTANCING
	mat3 im = mat3( instanceMatrix );
	transformedNormal /= vec3( dot( im[ 0 ], im[ 0 ] ), dot( im[ 1 ], im[ 1 ] ), dot( im[ 2 ], im[ 2 ] ) );
	transformedNormal = im * transformedNormal;
	#ifdef USE_TANGENT
		transformedTangent = im * transformedTangent;
	#endif
#endif
transformedNormal = normalMatrix * transformedNormal;
#ifdef FLIP_SIDED
	transformedNormal = - transformedNormal;
#endif
#ifdef USE_TANGENT
	transformedTangent = ( modelViewMatrix * vec4( transformedTangent, 0.0 ) ).xyz;
#endif`,c_=`#ifdef USE_DISPLACEMENTMAP
	uniform sampler2D displacementMap;
	uniform float displacementScale;
	uniform float displacementBias;
#endif`,h_=`#ifdef USE_DISPLACEMENTMAP
	transformed += normalize( objectNormal ) * ( texture2D( displacementMap, vDisplacementMapUv ).x * displacementScale + displacementBias );
#endif`,u_=`#ifdef USE_EMISSIVEMAP
	vec4 emissiveColor = texture2D( emissiveMap, vEmissiveMapUv );
	#ifdef DECODE_VIDEO_TEXTURE_EMISSIVE
		emissiveColor = sRGBTransferEOTF( emissiveColor );
	#endif
	totalEmissiveRadiance *= emissiveColor.rgb;
#endif`,f_=`#ifdef USE_EMISSIVEMAP
	uniform sampler2D emissiveMap;
#endif`,d_="gl_FragColor = linearToOutputTexel( gl_FragColor );",p_=`vec4 LinearTransferOETF( in vec4 value ) {
	return value;
}
vec4 sRGBTransferEOTF( in vec4 value ) {
	return vec4( mix( pow( value.rgb * 0.9478672986 + vec3( 0.0521327014 ), vec3( 2.4 ) ), value.rgb * 0.0773993808, vec3( lessThanEqual( value.rgb, vec3( 0.04045 ) ) ) ), value.a );
}
vec4 sRGBTransferOETF( in vec4 value ) {
	return vec4( mix( pow( value.rgb, vec3( 0.41666 ) ) * 1.055 - vec3( 0.055 ), value.rgb * 12.92, vec3( lessThanEqual( value.rgb, vec3( 0.0031308 ) ) ) ), value.a );
}`,m_=`#ifdef USE_ENVMAP
	#ifdef ENV_WORLDPOS
		vec3 cameraToFrag;
		if ( isOrthographic ) {
			cameraToFrag = normalize( vec3( - viewMatrix[ 0 ][ 2 ], - viewMatrix[ 1 ][ 2 ], - viewMatrix[ 2 ][ 2 ] ) );
		} else {
			cameraToFrag = normalize( vWorldPosition - cameraPosition );
		}
		vec3 worldNormal = transformNormalByInverseViewMatrix( normal, viewMatrix );
		#ifdef ENVMAP_MODE_REFLECTION
			vec3 reflectVec = reflect( cameraToFrag, worldNormal );
		#else
			vec3 reflectVec = refract( cameraToFrag, worldNormal, refractionRatio );
		#endif
	#else
		vec3 reflectVec = vReflect;
	#endif
	#ifdef ENVMAP_TYPE_CUBE
		vec4 envColor = textureCube( envMap, envMapRotation * reflectVec );
		#ifdef ENVMAP_BLENDING_MULTIPLY
			outgoingLight = mix( outgoingLight, outgoingLight * envColor.xyz, specularStrength * reflectivity );
		#elif defined( ENVMAP_BLENDING_MIX )
			outgoingLight = mix( outgoingLight, envColor.xyz, specularStrength * reflectivity );
		#elif defined( ENVMAP_BLENDING_ADD )
			outgoingLight += envColor.xyz * specularStrength * reflectivity;
		#endif
	#endif
#endif`,g_=`#ifdef USE_ENVMAP
	uniform float envMapIntensity;
	uniform mat3 envMapRotation;
	#ifdef ENVMAP_TYPE_CUBE
		uniform samplerCube envMap;
	#else
		uniform sampler2D envMap;
	#endif
#endif`,__=`#ifdef USE_ENVMAP
	uniform float reflectivity;
	#if defined( USE_BUMPMAP ) || defined( USE_NORMALMAP ) || defined( PHONG ) || defined( LAMBERT )
		#define ENV_WORLDPOS
	#endif
	#ifdef ENV_WORLDPOS
		varying vec3 vWorldPosition;
		uniform float refractionRatio;
	#else
		varying vec3 vReflect;
	#endif
#endif`,x_=`#ifdef USE_ENVMAP
	#if defined( USE_BUMPMAP ) || defined( USE_NORMALMAP ) || defined( PHONG ) || defined( LAMBERT )
		#define ENV_WORLDPOS
	#endif
	#ifdef ENV_WORLDPOS
		
		varying vec3 vWorldPosition;
	#else
		varying vec3 vReflect;
		uniform float refractionRatio;
	#endif
#endif`,v_=`#ifdef USE_ENVMAP
	#ifdef ENV_WORLDPOS
		vWorldPosition = worldPosition.xyz;
	#else
		vec3 cameraToVertex;
		if ( isOrthographic ) {
			cameraToVertex = normalize( vec3( - viewMatrix[ 0 ][ 2 ], - viewMatrix[ 1 ][ 2 ], - viewMatrix[ 2 ][ 2 ] ) );
		} else {
			cameraToVertex = normalize( worldPosition.xyz - cameraPosition );
		}
		vec3 worldNormal = transformNormalByInverseViewMatrix( transformedNormal, viewMatrix );
		#ifdef ENVMAP_MODE_REFLECTION
			vReflect = reflect( cameraToVertex, worldNormal );
		#else
			vReflect = refract( cameraToVertex, worldNormal, refractionRatio );
		#endif
	#endif
#endif`,M_=`#ifdef USE_FOG
	vFogDepth = - mvPosition.z;
#endif`,y_=`#ifdef USE_FOG
	varying float vFogDepth;
#endif`,S_=`#ifdef USE_FOG
	#ifdef FOG_EXP2
		float fogFactor = 1.0 - exp( - fogDensity * fogDensity * vFogDepth * vFogDepth );
	#else
		float fogFactor = smoothstep( fogNear, fogFar, vFogDepth );
	#endif
	gl_FragColor.rgb = mix( gl_FragColor.rgb, fogColor, fogFactor );
#endif`,w_=`#ifdef USE_FOG
	uniform vec3 fogColor;
	varying float vFogDepth;
	#ifdef FOG_EXP2
		uniform float fogDensity;
	#else
		uniform float fogNear;
		uniform float fogFar;
	#endif
#endif`,b_=`#ifdef USE_GRADIENTMAP
	uniform sampler2D gradientMap;
#endif
vec3 getGradientIrradiance( vec3 normal, vec3 lightDirection ) {
	float dotNL = dot( normal, lightDirection );
	vec2 coord = vec2( dotNL * 0.5 + 0.5, 0.0 );
	#ifdef USE_GRADIENTMAP
		return vec3( texture2D( gradientMap, coord ).r );
	#else
		vec2 fw = fwidth( coord ) * 0.5;
		return mix( vec3( 0.7 ), vec3( 1.0 ), smoothstep( 0.7 - fw.x, 0.7 + fw.x, coord.x ) );
	#endif
}`,T_=`#ifdef USE_LIGHTMAP
	uniform sampler2D lightMap;
	uniform float lightMapIntensity;
#endif`,E_=`LambertMaterial material;
material.diffuseColor = diffuseColor.rgb;
material.specularStrength = specularStrength;`,A_=`varying vec3 vViewPosition;
struct LambertMaterial {
	vec3 diffuseColor;
	float specularStrength;
};
void RE_Direct_Lambert( const in IncidentLight directLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in LambertMaterial material, inout ReflectedLight reflectedLight ) {
	float dotNL = saturate( dot( geometryNormal, directLight.direction ) );
	vec3 irradiance = dotNL * directLight.color;
	reflectedLight.directDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
void RE_IndirectDiffuse_Lambert( const in vec3 irradiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in LambertMaterial material, inout ReflectedLight reflectedLight ) {
	reflectedLight.indirectDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
#define RE_Direct				RE_Direct_Lambert
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Lambert`,R_=`uniform bool receiveShadow;
uniform vec3 ambientLightColor;
#if defined( USE_LIGHT_PROBES )
	uniform vec3 lightProbe[ 9 ];
#endif
vec3 shGetIrradianceAt( in vec3 normal, in vec3 shCoefficients[ 9 ] ) {
	float x = normal.x, y = normal.y, z = normal.z;
	vec3 result = shCoefficients[ 0 ] * 0.886227;
	result += shCoefficients[ 1 ] * 2.0 * 0.511664 * y;
	result += shCoefficients[ 2 ] * 2.0 * 0.511664 * z;
	result += shCoefficients[ 3 ] * 2.0 * 0.511664 * x;
	result += shCoefficients[ 4 ] * 2.0 * 0.429043 * x * y;
	result += shCoefficients[ 5 ] * 2.0 * 0.429043 * y * z;
	result += shCoefficients[ 6 ] * ( 0.743125 * z * z - 0.247708 );
	result += shCoefficients[ 7 ] * 2.0 * 0.429043 * x * z;
	result += shCoefficients[ 8 ] * 0.429043 * ( x * x - y * y );
	return result;
}
vec3 getLightProbeIrradiance( const in vec3 lightProbe[ 9 ], const in vec3 normal ) {
	vec3 worldNormal = transformNormalByInverseViewMatrix( normal, viewMatrix );
	vec3 irradiance = shGetIrradianceAt( worldNormal, lightProbe );
	return irradiance;
}
vec3 getAmbientLightIrradiance( const in vec3 ambientLightColor ) {
	vec3 irradiance = ambientLightColor;
	return irradiance;
}
float getDistanceAttenuation( const in float lightDistance, const in float cutoffDistance, const in float decayExponent ) {
	float distanceFalloff = 1.0 / max( pow( lightDistance, decayExponent ), 0.01 );
	if ( cutoffDistance > 0.0 ) {
		distanceFalloff *= pow2( saturate( 1.0 - pow4( lightDistance / cutoffDistance ) ) );
	}
	return distanceFalloff;
}
float getSpotAttenuation( const in float coneCosine, const in float penumbraCosine, const in float angleCosine ) {
	return smoothstep( coneCosine, penumbraCosine, angleCosine );
}
#if NUM_SUN_LIGHTS > 0
	struct SunLight {
		vec3 direction;
		vec3 color;
	};
	uniform SunLight sunLights[ NUM_SUN_LIGHTS ];
	void getSunLightInfo( const in SunLight sunLight, out IncidentLight light ) {
		light.color = sunLight.color;
		light.direction = sunLight.direction;
		light.visible = true;
	}
#endif
#if NUM_DIR_LIGHTS > 0
	struct DirectionalLight {
		vec3 direction;
		vec3 color;
	};
	uniform DirectionalLight directionalLights[ NUM_DIR_LIGHTS ];
	void getDirectionalLightInfo( const in DirectionalLight directionalLight, out IncidentLight light ) {
		light.color = directionalLight.color;
		light.direction = directionalLight.direction;
		light.visible = true;
	}
#endif
#if NUM_POINT_LIGHTS > 0
	struct PointLight {
		vec3 position;
		vec3 color;
		float distance;
		float decay;
	};
	uniform PointLight pointLights[ NUM_POINT_LIGHTS ];
	void getPointLightInfo( const in PointLight pointLight, const in vec3 geometryPosition, out IncidentLight light ) {
		vec3 lVector = pointLight.position - geometryPosition;
		light.direction = normalize( lVector );
		float lightDistance = length( lVector );
		light.color = pointLight.color;
		light.color *= getDistanceAttenuation( lightDistance, pointLight.distance, pointLight.decay );
		light.visible = ( light.color != vec3( 0.0 ) );
	}
#endif
#if NUM_SPOT_LIGHTS > 0
	struct SpotLight {
		vec3 position;
		vec3 direction;
		vec3 color;
		float distance;
		float decay;
		float coneCos;
		float penumbraCos;
	};
	uniform SpotLight spotLights[ NUM_SPOT_LIGHTS ];
	void getSpotLightInfo( const in SpotLight spotLight, const in vec3 geometryPosition, out IncidentLight light ) {
		vec3 lVector = spotLight.position - geometryPosition;
		light.direction = normalize( lVector );
		float angleCos = dot( light.direction, spotLight.direction );
		float spotAttenuation = getSpotAttenuation( spotLight.coneCos, spotLight.penumbraCos, angleCos );
		if ( spotAttenuation > 0.0 ) {
			float lightDistance = length( lVector );
			light.color = spotLight.color * spotAttenuation;
			light.color *= getDistanceAttenuation( lightDistance, spotLight.distance, spotLight.decay );
			light.visible = ( light.color != vec3( 0.0 ) );
		} else {
			light.color = vec3( 0.0 );
			light.visible = false;
		}
	}
#endif
#if NUM_RECT_AREA_LIGHTS > 0
	struct RectAreaLight {
		vec3 color;
		vec3 position;
		vec3 halfWidth;
		vec3 halfHeight;
	};
	uniform sampler2D ltc_1;	uniform sampler2D ltc_2;
	uniform RectAreaLight rectAreaLights[ NUM_RECT_AREA_LIGHTS ];
#endif
#if NUM_HEMI_LIGHTS > 0
	struct HemisphereLight {
		vec3 direction;
		vec3 skyColor;
		vec3 groundColor;
	};
	uniform HemisphereLight hemisphereLights[ NUM_HEMI_LIGHTS ];
	vec3 getHemisphereLightIrradiance( const in HemisphereLight hemiLight, const in vec3 normal ) {
		float dotNL = dot( normal, hemiLight.direction );
		float hemiDiffuseWeight = 0.5 * dotNL + 0.5;
		vec3 irradiance = mix( hemiLight.groundColor, hemiLight.skyColor, hemiDiffuseWeight );
		return irradiance;
	}
#endif
#include <lightprobes_pars_fragment>`,C_=`#ifdef USE_ENVMAP
	vec3 getIBLIrradiance( const in vec3 normal ) {
		#ifdef ENVMAP_TYPE_CUBE_UV
			vec3 worldNormal = transformNormalByInverseViewMatrix( normal, viewMatrix );
			vec4 envMapColor = textureCubeUV( envMap, envMapRotation * worldNormal, 1.0 );
			return PI * envMapColor.rgb * envMapIntensity;
		#else
			return vec3( 0.0 );
		#endif
	}
	vec3 getIBLRadiance( const in vec3 viewDir, const in vec3 normal, const in float roughness ) {
		#ifdef ENVMAP_TYPE_CUBE_UV
			vec3 reflectVec = reflect( - viewDir, normal );
			reflectVec = normalize( mix( reflectVec, normal, pow4( roughness ) ) );
			reflectVec = transformDirectionByInverseViewMatrix( reflectVec, viewMatrix );
			vec4 envMapColor = textureCubeUV( envMap, envMapRotation * reflectVec, roughness );
			return envMapColor.rgb * envMapIntensity;
		#else
			return vec3( 0.0 );
		#endif
	}
	#ifdef USE_RETROREFLECTION
		vec3 getIBLRetroRadiance( const in vec3 viewDir, const in vec3 normal, const in float roughness ) {
			#ifdef ENVMAP_TYPE_CUBE_UV
				vec3 retroVec = normalize( mix( viewDir, normal, pow4( roughness ) ) );
				retroVec = transformDirectionByInverseViewMatrix( retroVec, viewMatrix );
				vec4 envMapColor = textureCubeUV( envMap, envMapRotation * retroVec, roughness );
				return envMapColor.rgb * envMapIntensity;
			#else
				return vec3( 0.0 );
			#endif
		}
	#endif
	#ifdef USE_ANISOTROPY
		vec3 getIBLAnisotropyRadiance( const in vec3 viewDir, const in vec3 normal, const in float roughness, const in vec3 bitangent, const in float anisotropy ) {
			#ifdef ENVMAP_TYPE_CUBE_UV
				vec3 bentNormal = cross( bitangent, viewDir );
				bentNormal = normalize( cross( bentNormal, bitangent ) );
				bentNormal = normalize( mix( bentNormal, normal, pow2( pow2( 1.0 - anisotropy * ( 1.0 - roughness ) ) ) ) );
				return getIBLRadiance( viewDir, bentNormal, roughness );
			#else
				return vec3( 0.0 );
			#endif
		}
		#ifdef USE_RETROREFLECTION
			vec3 getIBLAnisotropyRetroRadiance( const in vec3 viewDir, const in vec3 normal, const in float roughness, const in vec3 bitangent, const in float anisotropy ) {
				#ifdef ENVMAP_TYPE_CUBE_UV
					vec3 bentNormal = cross( bitangent, viewDir );
					bentNormal = normalize( cross( bentNormal, bitangent ) );
					bentNormal = normalize( mix( bentNormal, normal, pow2( pow2( 1.0 - anisotropy * ( 1.0 - roughness ) ) ) ) );
					return getIBLRetroRadiance( viewDir, bentNormal, roughness );
				#else
					return vec3( 0.0 );
				#endif
			}
		#endif
	#endif
#endif`,P_=`ToonMaterial material;
material.diffuseColor = diffuseColor.rgb;`,I_=`varying vec3 vViewPosition;
struct ToonMaterial {
	vec3 diffuseColor;
};
void RE_Direct_Toon( const in IncidentLight directLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in ToonMaterial material, inout ReflectedLight reflectedLight ) {
	vec3 irradiance = getGradientIrradiance( geometryNormal, directLight.direction ) * directLight.color;
	reflectedLight.directDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
void RE_IndirectDiffuse_Toon( const in vec3 irradiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in ToonMaterial material, inout ReflectedLight reflectedLight ) {
	reflectedLight.indirectDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
#define RE_Direct				RE_Direct_Toon
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Toon`,L_=`BlinnPhongMaterial material;
material.diffuseColor = diffuseColor.rgb;
material.specularColor = specular;
material.specularShininess = shininess;
material.specularStrength = specularStrength;`,N_=`varying vec3 vViewPosition;
struct BlinnPhongMaterial {
	vec3 diffuseColor;
	vec3 specularColor;
	float specularShininess;
	float specularStrength;
};
void RE_Direct_BlinnPhong( const in IncidentLight directLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in BlinnPhongMaterial material, inout ReflectedLight reflectedLight ) {
	float dotNL = saturate( dot( geometryNormal, directLight.direction ) );
	vec3 irradiance = dotNL * directLight.color;
	reflectedLight.directDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
	reflectedLight.directSpecular += irradiance * BRDF_BlinnPhong( directLight.direction, geometryViewDir, geometryNormal, material.specularColor, material.specularShininess ) * material.specularStrength;
}
void RE_IndirectDiffuse_BlinnPhong( const in vec3 irradiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in BlinnPhongMaterial material, inout ReflectedLight reflectedLight ) {
	reflectedLight.indirectDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
#define RE_Direct				RE_Direct_BlinnPhong
#define RE_IndirectDiffuse		RE_IndirectDiffuse_BlinnPhong`,D_=`PhysicalMaterial material;
material.diffuseColor = diffuseColor.rgb;
material.diffuseContribution = diffuseColor.rgb * ( 1.0 - metalnessFactor );
material.metalness = metalnessFactor;
vec3 dxy = max( abs( dFdx( nonPerturbedNormal ) ), abs( dFdy( nonPerturbedNormal ) ) );
float geometryRoughness = max( max( dxy.x, dxy.y ), dxy.z );
material.roughness = max( roughnessFactor, 0.0525 );material.roughness += geometryRoughness;
material.roughness = min( material.roughness, 1.0 );
#ifdef IOR
	material.ior = ior;
	#ifdef USE_SPECULAR
		float specularIntensityFactor = specularIntensity;
		vec3 specularColorFactor = specularColor;
		#ifdef USE_SPECULAR_COLORMAP
			specularColorFactor *= texture2D( specularColorMap, vSpecularColorMapUv ).rgb;
		#endif
		#ifdef USE_SPECULAR_INTENSITYMAP
			specularIntensityFactor *= texture2D( specularIntensityMap, vSpecularIntensityMapUv ).a;
		#endif
		material.specularF90 = mix( specularIntensityFactor, 1.0, metalnessFactor );
	#else
		float specularIntensityFactor = 1.0;
		vec3 specularColorFactor = vec3( 1.0 );
		material.specularF90 = 1.0;
	#endif
	material.specularColor = min( pow2( ( material.ior - 1.0 ) / ( material.ior + 1.0 ) ) * specularColorFactor, vec3( 1.0 ) ) * specularIntensityFactor;
	material.specularColorBlended = mix( material.specularColor, diffuseColor.rgb, metalnessFactor );
#else
	material.specularColor = vec3( 0.04 );
	material.specularColorBlended = mix( material.specularColor, diffuseColor.rgb, metalnessFactor );
	material.specularF90 = 1.0;
#endif
#ifdef USE_CLEARCOAT
	material.clearcoat = clearcoat;
	material.clearcoatRoughness = clearcoatRoughness;
	material.clearcoatF0 = vec3( 0.04 );
	material.clearcoatF90 = 1.0;
	#ifdef USE_CLEARCOATMAP
		material.clearcoat *= texture2D( clearcoatMap, vClearcoatMapUv ).x;
	#endif
	#ifdef USE_CLEARCOAT_ROUGHNESSMAP
		material.clearcoatRoughness *= texture2D( clearcoatRoughnessMap, vClearcoatRoughnessMapUv ).y;
	#endif
	material.clearcoat = saturate( material.clearcoat );	material.clearcoatRoughness = max( material.clearcoatRoughness, 0.0525 );
	material.clearcoatRoughness += geometryRoughness;
	material.clearcoatRoughness = min( material.clearcoatRoughness, 1.0 );
#endif
#ifdef USE_DISPERSION
	material.dispersion = dispersion;
#endif
#ifdef USE_RETROREFLECTION
	material.retroreflectivity = retroreflectivity;
#endif
#ifdef USE_IRIDESCENCE
	material.iridescence = iridescence;
	material.iridescenceIOR = iridescenceIOR;
	#ifdef USE_IRIDESCENCEMAP
		material.iridescence *= texture2D( iridescenceMap, vIridescenceMapUv ).r;
	#endif
	#ifdef USE_IRIDESCENCE_THICKNESSMAP
		material.iridescenceThickness = (iridescenceThicknessMaximum - iridescenceThicknessMinimum) * texture2D( iridescenceThicknessMap, vIridescenceThicknessMapUv ).g + iridescenceThicknessMinimum;
	#else
		material.iridescenceThickness = iridescenceThicknessMaximum;
	#endif
#endif
#ifdef USE_SHEEN
	material.sheenColor = sheenColor;
	#ifdef USE_SHEEN_COLORMAP
		material.sheenColor *= texture2D( sheenColorMap, vSheenColorMapUv ).rgb;
	#endif
	material.sheenRoughness = clamp( sheenRoughness, 0.0001, 1.0 );
	#ifdef USE_SHEEN_ROUGHNESSMAP
		material.sheenRoughness *= texture2D( sheenRoughnessMap, vSheenRoughnessMapUv ).a;
	#endif
#endif
#ifdef USE_ANISOTROPY
	#ifdef USE_ANISOTROPYMAP
		mat2 anisotropyMat = mat2( anisotropyVector.x, anisotropyVector.y, - anisotropyVector.y, anisotropyVector.x );
		vec3 anisotropyPolar = texture2D( anisotropyMap, vAnisotropyMapUv ).rgb;
		vec2 anisotropyV = anisotropyMat * normalize( 2.0 * anisotropyPolar.rg - vec2( 1.0 ) ) * anisotropyPolar.b;
	#else
		vec2 anisotropyV = anisotropyVector;
	#endif
	material.anisotropy = length( anisotropyV );
	if( material.anisotropy == 0.0 ) {
		anisotropyV = vec2( 1.0, 0.0 );
	} else {
		anisotropyV /= material.anisotropy;
		material.anisotropy = saturate( material.anisotropy );
	}
	material.alphaT = mix( pow2( material.roughness ), 1.0, pow2( material.anisotropy ) );
	material.anisotropyT = tbn[ 0 ] * anisotropyV.x + tbn[ 1 ] * anisotropyV.y;
	material.anisotropyB = tbn[ 1 ] * anisotropyV.x - tbn[ 0 ] * anisotropyV.y;
#endif`,U_=`uniform sampler2D dfgLUT;
struct PhysicalMaterial {
	vec3 diffuseColor;
	vec3 diffuseContribution;
	vec3 specularColor;
	vec3 specularColorBlended;
	float roughness;
	float metalness;
	float specularF90;
	float dispersion;
	vec2 dfg;
	vec3 multiScatteringCompensation;
	#ifdef USE_RETROREFLECTION
		float retroreflectivity;
	#endif
	#ifdef USE_CLEARCOAT
		float clearcoat;
		float clearcoatRoughness;
		vec3 clearcoatF0;
		float clearcoatF90;
	#endif
	#ifdef USE_IRIDESCENCE
		float iridescence;
		float iridescenceIOR;
		float iridescenceThickness;
		vec3 iridescenceFresnel;
		vec3 iridescenceF0Dielectric;
		vec3 iridescenceF0Metallic;
	#endif
	#ifdef USE_SHEEN
		vec3 sheenColor;
		float sheenRoughness;
	#endif
	#ifdef IOR
		float ior;
	#endif
	#ifdef USE_TRANSMISSION
		float transmission;
		float transmissionAlpha;
		float thickness;
		float attenuationDistance;
		vec3 attenuationColor;
	#endif
	#ifdef USE_ANISOTROPY
		float anisotropy;
		float alphaT;
		vec3 anisotropyT;
		vec3 anisotropyB;
	#endif
};
vec3 clearcoatSpecularDirect = vec3( 0.0 );
vec3 clearcoatSpecularIndirect = vec3( 0.0 );
vec3 sheenSpecularDirect = vec3( 0.0 );
vec3 sheenSpecularIndirect = vec3(0.0 );
vec3 Schlick_to_F0( const in vec3 f, const in float f90, const in float dotVH ) {
    float x = clamp( 1.0 - dotVH, 0.0, 1.0 );
    float x2 = x * x;
    float x5 = clamp( x * x2 * x2, 0.0, 0.9999 );
    return ( f - vec3( f90 ) * x5 ) / ( 1.0 - x5 );
}
float V_GGX_SmithCorrelated( const in float alpha, const in float dotNL, const in float dotNV ) {
	float a2 = pow2( alpha );
	float gv = dotNL * sqrt( a2 + ( 1.0 - a2 ) * pow2( dotNV ) );
	float gl = dotNV * sqrt( a2 + ( 1.0 - a2 ) * pow2( dotNL ) );
	return 0.5 / max( gv + gl, EPSILON );
}
float D_GGX( const in float alpha, const in float dotNH ) {
	float a2 = pow2( alpha );
	float denom = pow2( dotNH ) * ( a2 - 1.0 ) + 1.0;
	return RECIPROCAL_PI * a2 / pow2( denom );
}
#ifdef USE_ANISOTROPY
	float V_GGX_SmithCorrelated_Anisotropic( const in float alphaT, const in float alphaB, const in float dotTV, const in float dotBV, const in float dotTL, const in float dotBL, const in float dotNV, const in float dotNL ) {
		float gv = dotNL * length( vec3( alphaT * dotTV, alphaB * dotBV, dotNV ) );
		float gl = dotNV * length( vec3( alphaT * dotTL, alphaB * dotBL, dotNL ) );
		return 0.5 / max( gv + gl, EPSILON );
	}
	float D_GGX_Anisotropic( const in float alphaT, const in float alphaB, const in float dotNH, const in float dotTH, const in float dotBH ) {
		float a2 = alphaT * alphaB;
		highp vec3 v = vec3( alphaB * dotTH, alphaT * dotBH, a2 * dotNH );
		highp float v2 = dot( v, v );
		float w2 = a2 / v2;
		return RECIPROCAL_PI * a2 * pow2 ( w2 );
	}
#endif
#ifdef USE_CLEARCOAT
	vec3 BRDF_GGX_Clearcoat( const in vec3 lightDir, const in vec3 viewDir, const in vec3 normal, const in PhysicalMaterial material) {
		vec3 f0 = material.clearcoatF0;
		float f90 = material.clearcoatF90;
		float roughness = material.clearcoatRoughness;
		float alpha = pow2( roughness );
		vec3 halfDir = normalize( lightDir + viewDir );
		float dotNL = saturate( dot( normal, lightDir ) );
		float dotNV = saturate( dot( normal, viewDir ) );
		float dotNH = saturate( dot( normal, halfDir ) );
		float dotVH = saturate( dot( viewDir, halfDir ) );
		vec3 F = F_Schlick( f0, f90, dotVH );
		float V = V_GGX_SmithCorrelated( alpha, dotNL, dotNV );
		float D = D_GGX( alpha, dotNH );
		return F * ( V * D );
	}
#endif
vec3 BRDF_GGX( const in vec3 lightDir, const in vec3 viewDir, const in vec3 normal, const in PhysicalMaterial material ) {
	vec3 f0 = material.specularColorBlended;
	float f90 = material.specularF90;
	float roughness = material.roughness;
	float alpha = pow2( roughness );
	vec3 halfDir = normalize( lightDir + viewDir );
	float dotNL = saturate( dot( normal, lightDir ) );
	float dotNV = saturate( dot( normal, viewDir ) );
	float dotNH = saturate( dot( normal, halfDir ) );
	float dotVH = saturate( dot( viewDir, halfDir ) );
	vec3 F = F_Schlick( f0, f90, dotVH );
	#ifdef USE_IRIDESCENCE
		F = mix( F, material.iridescenceFresnel, material.iridescence );
	#endif
	#ifdef USE_ANISOTROPY
		float dotTL = dot( material.anisotropyT, lightDir );
		float dotTV = dot( material.anisotropyT, viewDir );
		float dotTH = dot( material.anisotropyT, halfDir );
		float dotBL = dot( material.anisotropyB, lightDir );
		float dotBV = dot( material.anisotropyB, viewDir );
		float dotBH = dot( material.anisotropyB, halfDir );
		float V = V_GGX_SmithCorrelated_Anisotropic( material.alphaT, alpha, dotTV, dotBV, dotTL, dotBL, dotNV, dotNL );
		float D = D_GGX_Anisotropic( material.alphaT, alpha, dotNH, dotTH, dotBH );
	#else
		float V = V_GGX_SmithCorrelated( alpha, dotNL, dotNV );
		float D = D_GGX( alpha, dotNH );
	#endif
	return F * ( V * D );
}
vec2 LTC_Uv( const in vec3 N, const in vec3 V, const in float roughness ) {
	const float LUT_SIZE = 64.0;
	const float LUT_SCALE = ( LUT_SIZE - 1.0 ) / LUT_SIZE;
	const float LUT_BIAS = 0.5 / LUT_SIZE;
	float dotNV = saturate( dot( N, V ) );
	vec2 uv = vec2( roughness, sqrt( 1.0 - dotNV ) );
	uv = uv * LUT_SCALE + LUT_BIAS;
	return uv;
}
float LTC_ClippedSphereFormFactor( const in vec3 f ) {
	float l = length( f );
	return max( ( l * l + f.z ) / ( l + 1.0 ), 0.0 );
}
vec3 LTC_EdgeVectorFormFactor( const in vec3 v1, const in vec3 v2 ) {
	float x = dot( v1, v2 );
	float y = abs( x );
	float a = 0.8543985 + ( 0.4965155 + 0.0145206 * y ) * y;
	float b = 3.4175940 + ( 4.1616724 + y ) * y;
	float v = a / b;
	float theta_sintheta = ( x > 0.0 ) ? v : 0.5 * inversesqrt( max( 1.0 - x * x, 1e-7 ) ) - v;
	return cross( v1, v2 ) * theta_sintheta;
}
vec3 LTC_Evaluate( const in vec3 N, const in vec3 V, const in vec3 P, const in mat3 mInv, const in vec3 rectCoords[ 4 ] ) {
	vec3 v1 = rectCoords[ 1 ] - rectCoords[ 0 ];
	vec3 v2 = rectCoords[ 3 ] - rectCoords[ 0 ];
	vec3 lightNormal = cross( v1, v2 );
	if( dot( lightNormal, P - rectCoords[ 0 ] ) < 0.0 ) return vec3( 0.0 );
	vec3 T1, T2;
	T1 = normalize( V - N * dot( V, N ) );
	T2 = - cross( N, T1 );
	mat3 mat = mInv * transpose( mat3( T1, T2, N ) );
	vec3 coords[ 4 ];
	coords[ 0 ] = mat * ( rectCoords[ 0 ] - P );
	coords[ 1 ] = mat * ( rectCoords[ 1 ] - P );
	coords[ 2 ] = mat * ( rectCoords[ 2 ] - P );
	coords[ 3 ] = mat * ( rectCoords[ 3 ] - P );
	coords[ 0 ] = normalize( coords[ 0 ] );
	coords[ 1 ] = normalize( coords[ 1 ] );
	coords[ 2 ] = normalize( coords[ 2 ] );
	coords[ 3 ] = normalize( coords[ 3 ] );
	vec3 vectorFormFactor = vec3( 0.0 );
	vectorFormFactor += LTC_EdgeVectorFormFactor( coords[ 0 ], coords[ 1 ] );
	vectorFormFactor += LTC_EdgeVectorFormFactor( coords[ 1 ], coords[ 2 ] );
	vectorFormFactor += LTC_EdgeVectorFormFactor( coords[ 2 ], coords[ 3 ] );
	vectorFormFactor += LTC_EdgeVectorFormFactor( coords[ 3 ], coords[ 0 ] );
	float result = LTC_ClippedSphereFormFactor( vectorFormFactor );
	return vec3( result );
}
#if defined( USE_SHEEN )
float D_Charlie( float roughness, float dotNH ) {
	float alpha = pow2( roughness );
	float invAlpha = 1.0 / alpha;
	float cos2h = dotNH * dotNH;
	float sin2h = max( 1.0 - cos2h, 0.0078125 );
	return ( 2.0 + invAlpha ) * pow( sin2h, invAlpha * 0.5 ) / ( 2.0 * PI );
}
float V_Neubelt( float dotNV, float dotNL ) {
	return saturate( 1.0 / ( 4.0 * ( dotNL + dotNV - dotNL * dotNV ) ) );
}
vec3 BRDF_Sheen( const in vec3 lightDir, const in vec3 viewDir, const in vec3 normal, vec3 sheenColor, const in float sheenRoughness ) {
	vec3 halfDir = normalize( lightDir + viewDir );
	float dotNL = saturate( dot( normal, lightDir ) );
	float dotNV = saturate( dot( normal, viewDir ) );
	float dotNH = saturate( dot( normal, halfDir ) );
	float D = D_Charlie( sheenRoughness, dotNH );
	float V = V_Neubelt( dotNV, dotNL );
	return sheenColor * ( D * V );
}
#endif
float IBLSheenBRDF( const in vec3 normal, const in vec3 viewDir, const in float roughness ) {
	float dotNV = saturate( dot( normal, viewDir ) );
	float r2 = roughness * roughness;
	float rInv = 1.0 / ( roughness + 0.1 );
	float a = -1.9362 + 1.0678 * roughness + 0.4573 * r2 - 0.8469 * rInv;
	float b = -0.6014 + 0.5538 * roughness - 0.4670 * r2 - 0.1255 * rInv;
	float DG = exp( a * dotNV + b );
	return saturate( DG );
}
vec3 EnvironmentBRDF( const in vec3 normal, const in vec3 viewDir, const in vec3 specularColor, const in float specularF90, const in float roughness ) {
	float dotNV = saturate( dot( normal, viewDir ) );
	vec2 fab = texture2D( dfgLUT, vec2( roughness, dotNV ) ).rg;
	return specularColor * fab.x + specularF90 * fab.y;
}
#ifdef USE_IRIDESCENCE
void computeMultiscatteringIridescence( const in vec2 fab, const in vec3 specularColor, const in float specularF90, const in float iridescence, const in vec3 iridescenceF0, inout vec3 singleScatter, inout vec3 multiScatter ) {
#else
void computeMultiscattering( const in vec2 fab, const in vec3 specularColor, const in float specularF90, inout vec3 singleScatter, inout vec3 multiScatter ) {
#endif
	#ifdef USE_IRIDESCENCE
		vec3 Fr = mix( specularColor, iridescenceF0, iridescence );
	#else
		vec3 Fr = specularColor;
	#endif
	vec3 FssEss = Fr * fab.x + specularF90 * fab.y;
	float Ess = fab.x + fab.y;
	float Ems = 1.0 - Ess;
	vec3 Favg = Fr + ( 1.0 - Fr ) * 0.047619;	vec3 Fms = FssEss * Favg / ( 1.0 - Ems * Favg );
	singleScatter += FssEss;
	multiScatter += Fms * Ems;
}
#if NUM_RECT_AREA_LIGHTS > 0
	void RE_Direct_RectArea_Physical( const in RectAreaLight rectAreaLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in PhysicalMaterial material, inout ReflectedLight reflectedLight ) {
		vec3 normal = geometryNormal;
		vec3 viewDir = geometryViewDir;
		vec3 position = geometryPosition;
		vec3 lightPos = rectAreaLight.position;
		vec3 halfWidth = rectAreaLight.halfWidth;
		vec3 halfHeight = rectAreaLight.halfHeight;
		vec3 lightColor = rectAreaLight.color;
		float roughness = material.roughness;
		vec3 rectCoords[ 4 ];
		rectCoords[ 0 ] = lightPos + halfWidth - halfHeight;		rectCoords[ 1 ] = lightPos - halfWidth - halfHeight;
		rectCoords[ 2 ] = lightPos - halfWidth + halfHeight;
		rectCoords[ 3 ] = lightPos + halfWidth + halfHeight;
		vec2 uv = LTC_Uv( normal, viewDir, roughness );
		vec4 t1 = texture2D( ltc_1, uv );
		vec4 t2 = texture2D( ltc_2, uv );
		mat3 mInv = mat3(
			vec3( t1.x, 0, t1.y ),
			vec3(    0, 1,    0 ),
			vec3( t1.z, 0, t1.w )
		);
		vec3 fresnel = ( material.specularColorBlended * t2.x + ( material.specularF90 - material.specularColorBlended ) * t2.y );
		reflectedLight.directSpecular += lightColor * fresnel * LTC_Evaluate( normal, viewDir, position, mInv, rectCoords );
		reflectedLight.directDiffuse += lightColor * material.diffuseContribution * LTC_Evaluate( normal, viewDir, position, mat3( 1.0 ), rectCoords );
		#ifdef USE_CLEARCOAT
			vec3 Ncc = geometryClearcoatNormal;
			vec2 uvClearcoat = LTC_Uv( Ncc, viewDir, material.clearcoatRoughness );
			vec4 t1Clearcoat = texture2D( ltc_1, uvClearcoat );
			vec4 t2Clearcoat = texture2D( ltc_2, uvClearcoat );
			mat3 mInvClearcoat = mat3(
				vec3( t1Clearcoat.x, 0, t1Clearcoat.y ),
				vec3(             0, 1,             0 ),
				vec3( t1Clearcoat.z, 0, t1Clearcoat.w )
			);
			vec3 fresnelClearcoat = material.clearcoatF0 * t2Clearcoat.x + ( material.clearcoatF90 - material.clearcoatF0 ) * t2Clearcoat.y;
			clearcoatSpecularDirect += lightColor * fresnelClearcoat * LTC_Evaluate( Ncc, viewDir, position, mInvClearcoat, rectCoords );
		#endif
	}
#endif
void RE_Direct_Physical( const in IncidentLight directLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in PhysicalMaterial material, inout ReflectedLight reflectedLight ) {
	float dotNL = saturate( dot( geometryNormal, directLight.direction ) );
	vec3 irradiance = dotNL * directLight.color;
	#ifdef USE_CLEARCOAT
		float dotNLcc = saturate( dot( geometryClearcoatNormal, directLight.direction ) );
		vec3 ccIrradiance = dotNLcc * directLight.color;
		clearcoatSpecularDirect += ccIrradiance * BRDF_GGX_Clearcoat( directLight.direction, geometryViewDir, geometryClearcoatNormal, material );
	#endif
	#ifdef USE_SHEEN
 
 		sheenSpecularDirect += irradiance * BRDF_Sheen( directLight.direction, geometryViewDir, geometryNormal, material.sheenColor, material.sheenRoughness );
 
 		float sheenAlbedoV = IBLSheenBRDF( geometryNormal, geometryViewDir, material.sheenRoughness );
 		float sheenAlbedoL = IBLSheenBRDF( geometryNormal, directLight.direction, material.sheenRoughness );
 
 		float sheenEnergyComp = 1.0 - max3( material.sheenColor ) * max( sheenAlbedoV, sheenAlbedoL );
 
 		irradiance *= sheenEnergyComp;
 
 	#endif
	vec3 specularBRDF = BRDF_GGX( directLight.direction, geometryViewDir, geometryNormal, material );
	#ifdef USE_RETROREFLECTION
		vec3 retroViewDir = reflect( - geometryViewDir, geometryNormal );
		vec3 retroSpecularBRDF = BRDF_GGX( directLight.direction, retroViewDir, geometryNormal, material );
		specularBRDF = mix( specularBRDF, retroSpecularBRDF, saturate( material.retroreflectivity ) );
	#endif
	reflectedLight.directSpecular += irradiance * specularBRDF * material.multiScatteringCompensation;
	vec3 halfDir = normalize( directLight.direction + geometryViewDir );
	float dotVH = saturate( dot( geometryViewDir, halfDir ) );
	vec3 F = F_Schlick( material.specularColor, material.specularF90, dotVH );
	#ifdef USE_RETROREFLECTION
		vec3 retroHalfDir = normalize( directLight.direction + retroViewDir );
		float dotRetroVH = saturate( dot( retroViewDir, retroHalfDir ) );
		vec3 retroF = F_Schlick( material.specularColor, material.specularF90, dotRetroVH );
		F = mix( F, retroF, saturate( material.retroreflectivity ) );
	#endif
	reflectedLight.directDiffuse += irradiance * BRDF_Lambert( material.diffuseContribution ) * ( 1.0 - F );
}
void RE_IndirectDiffuse_Physical( const in vec3 irradiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in PhysicalMaterial material, inout ReflectedLight reflectedLight ) {
	vec3 singleScattering = vec3( 0.0 );
	vec3 multiScattering = vec3( 0.0 );
	#ifdef USE_IRIDESCENCE
		computeMultiscatteringIridescence( material.dfg, material.specularColor, material.specularF90, material.iridescence, material.iridescenceF0Dielectric, singleScattering, multiScattering );
	#else
		computeMultiscattering( material.dfg, material.specularColor, material.specularF90, singleScattering, multiScattering );
	#endif
	vec3 diffuse = irradiance * BRDF_Lambert( material.diffuseContribution ) * ( 1.0 - singleScattering - multiScattering );
	#ifdef USE_SHEEN
		float sheenAlbedo = IBLSheenBRDF( geometryNormal, geometryViewDir, material.sheenRoughness );
		sheenSpecularIndirect += irradiance * material.sheenColor * sheenAlbedo * RECIPROCAL_PI;
		float sheenEnergyComp = 1.0 - max3( material.sheenColor ) * sheenAlbedo;
		diffuse *= sheenEnergyComp;
	#endif
	reflectedLight.indirectDiffuse += diffuse;
}
void RE_IndirectSpecular_Physical( const in vec3 radiance, const in vec3 irradiance, const in vec3 clearcoatRadiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in PhysicalMaterial material, inout ReflectedLight reflectedLight) {
	#ifdef USE_CLEARCOAT
		clearcoatSpecularIndirect += clearcoatRadiance * EnvironmentBRDF( geometryClearcoatNormal, geometryViewDir, material.clearcoatF0, material.clearcoatF90, material.clearcoatRoughness );
	#endif
	#ifdef USE_SHEEN
		sheenSpecularIndirect += irradiance * material.sheenColor * IBLSheenBRDF( geometryNormal, geometryViewDir, material.sheenRoughness ) * RECIPROCAL_PI;
 	#endif
	vec3 singleScatteringDielectric = vec3( 0.0 );
	vec3 multiScatteringDielectric = vec3( 0.0 );
	vec3 singleScatteringMetallic = vec3( 0.0 );
	vec3 multiScatteringMetallic = vec3( 0.0 );
	#ifdef USE_IRIDESCENCE
		computeMultiscatteringIridescence( material.dfg, material.specularColor, material.specularF90, material.iridescence, material.iridescenceF0Dielectric, singleScatteringDielectric, multiScatteringDielectric );
		computeMultiscatteringIridescence( material.dfg, material.diffuseColor, material.specularF90, material.iridescence, material.iridescenceF0Metallic, singleScatteringMetallic, multiScatteringMetallic );
	#else
		computeMultiscattering( material.dfg, material.specularColor, material.specularF90, singleScatteringDielectric, multiScatteringDielectric );
		computeMultiscattering( material.dfg, material.diffuseColor, material.specularF90, singleScatteringMetallic, multiScatteringMetallic );
	#endif
	vec3 singleScattering = mix( singleScatteringDielectric, singleScatteringMetallic, material.metalness );
	vec3 multiScattering = mix( multiScatteringDielectric, multiScatteringMetallic, material.metalness );
	vec3 totalScatteringDielectric = singleScatteringDielectric + multiScatteringDielectric;
	vec3 diffuse = material.diffuseContribution * ( 1.0 - totalScatteringDielectric );
	vec3 cosineWeightedIrradiance = irradiance * RECIPROCAL_PI;
	vec3 indirectSpecular = radiance * singleScattering;
	indirectSpecular += multiScattering * cosineWeightedIrradiance;
	vec3 indirectDiffuse = diffuse * cosineWeightedIrradiance;
	#ifdef USE_SHEEN
		float sheenAlbedo = IBLSheenBRDF( geometryNormal, geometryViewDir, material.sheenRoughness );
		float sheenEnergyComp = 1.0 - max3( material.sheenColor ) * sheenAlbedo;
		indirectSpecular *= sheenEnergyComp;
		indirectDiffuse *= sheenEnergyComp;
	#endif
	reflectedLight.indirectSpecular += indirectSpecular;
	reflectedLight.indirectDiffuse += indirectDiffuse;
}
#define RE_Direct				RE_Direct_Physical
#define RE_Direct_RectArea		RE_Direct_RectArea_Physical
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Physical
#define RE_IndirectSpecular		RE_IndirectSpecular_Physical
float computeSpecularOcclusion( const in float dotNV, const in float ambientOcclusion, const in float roughness ) {
	return saturate( pow( dotNV + ambientOcclusion, exp2( - 16.0 * roughness - 1.0 ) ) - 1.0 + ambientOcclusion );
}`,F_=`
vec3 geometryPosition = - vViewPosition;
vec3 geometryNormal = normal;
vec3 geometryViewDir = ( isOrthographic ) ? vec3( 0, 0, 1 ) : normalize( vViewPosition );
vec3 geometryClearcoatNormal = vec3( 0.0 );
#ifdef USE_CLEARCOAT
	geometryClearcoatNormal = clearcoatNormal;
#endif
#ifdef USE_IRIDESCENCE
	float dotNVi = saturate( dot( normal, geometryViewDir ) );
	if ( material.iridescenceThickness == 0.0 ) {
		material.iridescence = 0.0;
	} else {
		material.iridescence = saturate( material.iridescence );
	}
	if ( material.iridescence > 0.0 ) {
		vec3 iridescenceFresnelDielectric = evalIridescence( 1.0, material.iridescenceIOR, dotNVi, material.iridescenceThickness, material.specularColor );
		vec3 iridescenceFresnelMetallic = evalIridescence( 1.0, material.iridescenceIOR, dotNVi, material.iridescenceThickness, material.diffuseColor );
		material.iridescenceFresnel = mix( iridescenceFresnelDielectric, iridescenceFresnelMetallic, material.metalness );
		material.iridescenceF0Dielectric = Schlick_to_F0( iridescenceFresnelDielectric, 1.0, dotNVi );
		material.iridescenceF0Metallic = Schlick_to_F0( iridescenceFresnelMetallic, 1.0, dotNVi );
	}
#endif
#ifdef STANDARD
	float dotNVms = saturate( dot( geometryNormal, geometryViewDir ) );
	material.dfg = texture2D( dfgLUT, vec2( material.roughness, dotNVms ) ).rg;
	#if ( NUM_SUN_LIGHTS > 0 || NUM_DIR_LIGHTS > 0 || NUM_POINT_LIGHTS > 0 || NUM_SPOT_LIGHTS > 0 )
		float EssMs = material.dfg.x + material.dfg.y;
		material.multiScatteringCompensation = 1.0 + material.specularColorBlended * ( 1.0 / EssMs - 1.0 );
	#endif
#endif
IncidentLight directLight;
#if ( NUM_POINT_LIGHTS > 0 ) && defined( RE_Direct )
	PointLight pointLight;
	#if defined( USE_SHADOWMAP ) && NUM_POINT_LIGHT_SHADOWS > 0
	PointLightShadow pointLightShadow;
	#endif
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_POINT_LIGHTS; i ++ ) {
		pointLight = pointLights[ i ];
		getPointLightInfo( pointLight, geometryPosition, directLight );
		#if defined( USE_SHADOWMAP ) && ( UNROLLED_LOOP_INDEX < NUM_POINT_LIGHT_SHADOWS ) && ( defined( SHADOWMAP_TYPE_PCF ) || defined( SHADOWMAP_TYPE_BASIC ) )
		pointLightShadow = pointLightShadows[ i ];
		directLight.color *= ( directLight.visible && receiveShadow ) ? getPointShadow( pointShadowMap[ i ], pointLightShadow.shadowMapSize, pointLightShadow.shadowIntensity, pointLightShadow.shadowBias, pointLightShadow.shadowRadius, vPointShadowCoord[ i ], pointLightShadow.shadowCameraNear, pointLightShadow.shadowCameraFar ) : 1.0;
		#endif
		RE_Direct( directLight, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
	}
	#pragma unroll_loop_end
#endif
#if ( NUM_SPOT_LIGHTS > 0 ) && defined( RE_Direct )
	SpotLight spotLight;
	vec4 spotColor;
	vec3 spotLightCoord;
	bool inSpotLightMap;
	#if defined( USE_SHADOWMAP ) && NUM_SPOT_LIGHT_SHADOWS > 0
	SpotLightShadow spotLightShadow;
	#endif
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_SPOT_LIGHTS; i ++ ) {
		spotLight = spotLights[ i ];
		getSpotLightInfo( spotLight, geometryPosition, directLight );
		#if ( UNROLLED_LOOP_INDEX < NUM_SPOT_LIGHT_SHADOWS_WITH_MAPS )
		#define SPOT_LIGHT_MAP_INDEX UNROLLED_LOOP_INDEX
		#elif ( UNROLLED_LOOP_INDEX < NUM_SPOT_LIGHT_SHADOWS )
		#define SPOT_LIGHT_MAP_INDEX NUM_SPOT_LIGHT_MAPS
		#else
		#define SPOT_LIGHT_MAP_INDEX ( UNROLLED_LOOP_INDEX - NUM_SPOT_LIGHT_SHADOWS + NUM_SPOT_LIGHT_SHADOWS_WITH_MAPS )
		#endif
		#if ( SPOT_LIGHT_MAP_INDEX < NUM_SPOT_LIGHT_MAPS )
			spotLightCoord = vSpotLightCoord[ i ].xyz / vSpotLightCoord[ i ].w;
			inSpotLightMap = all( lessThan( abs( spotLightCoord * 2. - 1. ), vec3( 1.0 ) ) );
			spotColor = texture2D( spotLightMap[ SPOT_LIGHT_MAP_INDEX ], spotLightCoord.xy );
			directLight.color = inSpotLightMap ? directLight.color * spotColor.rgb : directLight.color;
		#endif
		#undef SPOT_LIGHT_MAP_INDEX
		#if defined( USE_SHADOWMAP ) && ( UNROLLED_LOOP_INDEX < NUM_SPOT_LIGHT_SHADOWS )
		spotLightShadow = spotLightShadows[ i ];
		directLight.color *= ( directLight.visible && receiveShadow ) ? getShadow( spotShadowMap[ i ], spotLightShadow.shadowMapSize, spotLightShadow.shadowIntensity, spotLightShadow.shadowBias, spotLightShadow.shadowRadius, vSpotLightCoord[ i ] ) : 1.0;
		#endif
		RE_Direct( directLight, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
	}
	#pragma unroll_loop_end
#endif
#if ( NUM_SUN_LIGHTS > 0 ) && defined( RE_Direct )
	SunLight sunLight;
	#if defined( USE_SHADOWMAP ) && NUM_SUN_LIGHT_SHADOWS > 0
	SunLightShadow sunLightShadow;
	#endif
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_SUN_LIGHTS; i ++ ) {
		sunLight = sunLights[ i ];
		getSunLightInfo( sunLight, directLight );
		#if defined( USE_SHADOWMAP ) && ( UNROLLED_LOOP_INDEX < NUM_SUN_LIGHT_SHADOWS )
		sunLightShadow = sunLightShadows[ i ];
		directLight.color *= ( directLight.visible && receiveShadow ) ? getSunShadow( sunShadowMap[ i ], sunLightShadow, UNROLLED_LOOP_INDEX ) : 1.0;
		#endif
		RE_Direct( directLight, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
	}
	#pragma unroll_loop_end
#endif
#if ( NUM_DIR_LIGHTS > 0 ) && defined( RE_Direct )
	DirectionalLight directionalLight;
	#if defined( USE_SHADOWMAP ) && NUM_DIR_LIGHT_SHADOWS > 0
	DirectionalLightShadow directionalLightShadow;
	#endif
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_DIR_LIGHTS; i ++ ) {
		directionalLight = directionalLights[ i ];
		getDirectionalLightInfo( directionalLight, directLight );
		#if defined( USE_SHADOWMAP ) && ( UNROLLED_LOOP_INDEX < NUM_DIR_LIGHT_SHADOWS )
		directionalLightShadow = directionalLightShadows[ i ];
		directLight.color *= ( directLight.visible && receiveShadow ) ? getShadow( directionalShadowMap[ i ], directionalLightShadow.shadowMapSize, directionalLightShadow.shadowIntensity, directionalLightShadow.shadowBias, directionalLightShadow.shadowRadius, vDirectionalShadowCoord[ i ] ) : 1.0;
		#endif
		RE_Direct( directLight, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
	}
	#pragma unroll_loop_end
#endif
#if ( NUM_RECT_AREA_LIGHTS > 0 ) && defined( RE_Direct_RectArea )
	RectAreaLight rectAreaLight;
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_RECT_AREA_LIGHTS; i ++ ) {
		rectAreaLight = rectAreaLights[ i ];
		RE_Direct_RectArea( rectAreaLight, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
	}
	#pragma unroll_loop_end
#endif
#if defined( RE_IndirectDiffuse )
	vec3 iblIrradiance = vec3( 0.0 );
	vec3 irradiance = getAmbientLightIrradiance( ambientLightColor );
	#if defined( USE_LIGHT_PROBES )
		irradiance += getLightProbeIrradiance( lightProbe, geometryNormal );
	#endif
	#if ( NUM_HEMI_LIGHTS > 0 )
		#pragma unroll_loop_start
		for ( int i = 0; i < NUM_HEMI_LIGHTS; i ++ ) {
			irradiance += getHemisphereLightIrradiance( hemisphereLights[ i ], geometryNormal );
		}
		#pragma unroll_loop_end
	#endif
	#ifdef USE_LIGHT_PROBES_GRID
		vec3 probeWorldPos = ( ( vec4( geometryPosition, 1.0 ) - viewMatrix[ 3 ] ) * viewMatrix ).xyz;
		vec3 probeWorldNormal = transformNormalByInverseViewMatrix( geometryNormal, viewMatrix );
		irradiance += getLightProbeGridIrradiance( probeWorldPos, probeWorldNormal );
	#endif
#endif
#if defined( RE_IndirectSpecular )
	vec3 radiance = vec3( 0.0 );
	vec3 clearcoatRadiance = vec3( 0.0 );
#endif`,O_=`#if defined( RE_IndirectDiffuse )
	#ifdef USE_LIGHTMAP
		vec4 lightMapTexel = texture2D( lightMap, vLightMapUv );
		vec3 lightMapIrradiance = lightMapTexel.rgb * lightMapIntensity;
		irradiance += lightMapIrradiance;
	#endif
	#if defined( USE_ENVMAP ) && defined( ENVMAP_TYPE_CUBE_UV )
		#if defined( STANDARD ) || defined( LAMBERT ) || defined( PHONG )
			iblIrradiance += getIBLIrradiance( geometryNormal );
		#endif
	#endif
#endif
#if defined( USE_ENVMAP ) && defined( RE_IndirectSpecular )
	#ifdef USE_ANISOTROPY
		vec3 iblRadiance = getIBLAnisotropyRadiance( geometryViewDir, geometryNormal, material.roughness, material.anisotropyB, material.anisotropy );
	#else
		vec3 iblRadiance = getIBLRadiance( geometryViewDir, geometryNormal, material.roughness );
	#endif
	#ifdef USE_RETROREFLECTION
		#ifdef USE_ANISOTROPY
			vec3 retroIBLRadiance = getIBLAnisotropyRetroRadiance( geometryViewDir, geometryNormal, material.roughness, material.anisotropyB, material.anisotropy );
		#else
			vec3 retroIBLRadiance = getIBLRetroRadiance( geometryViewDir, geometryNormal, material.roughness );
		#endif
		iblRadiance = mix( iblRadiance, retroIBLRadiance, saturate( material.retroreflectivity ) );
	#endif
	radiance += iblRadiance;
	#ifdef USE_CLEARCOAT
		clearcoatRadiance += getIBLRadiance( geometryViewDir, geometryClearcoatNormal, material.clearcoatRoughness );
	#endif
#endif`,B_=`#if defined( RE_IndirectDiffuse )
	#if defined( LAMBERT ) || defined( PHONG )
		irradiance += iblIrradiance;
	#endif
	RE_IndirectDiffuse( irradiance, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
#endif
#if defined( RE_IndirectSpecular )
	RE_IndirectSpecular( radiance, iblIrradiance, clearcoatRadiance, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
#endif`,k_=`#ifdef USE_LIGHT_PROBES_GRID
uniform highp sampler3D probesSH;
uniform vec3 probesMin;
uniform vec3 probesMax;
uniform vec3 probesResolution;
vec3 getLightProbeGridIrradiance( vec3 worldPos, vec3 worldNormal ) {
	vec3 res = probesResolution;
	vec3 gridRange = probesMax - probesMin;
	vec3 resMinusOne = res - 1.0;
	vec3 probeSpacing = gridRange / resMinusOne;
	vec3 samplePos = worldPos + worldNormal * probeSpacing * 0.5;
	vec3 uvw = clamp( ( samplePos - probesMin ) / gridRange, 0.0, 1.0 );
	uvw = uvw * resMinusOne / res + 0.5 / res;
	float nz          = res.z;
	float paddedSlices = nz + 2.0;
	float atlasDepth  = 7.0 * paddedSlices;
	float uvZBase     = uvw.z * nz + 1.0;
	vec4 s0 = texture( probesSH, vec3( uvw.xy, ( uvZBase                       ) / atlasDepth ) );
	vec4 s1 = texture( probesSH, vec3( uvw.xy, ( uvZBase +       paddedSlices   ) / atlasDepth ) );
	vec4 s2 = texture( probesSH, vec3( uvw.xy, ( uvZBase + 2.0 * paddedSlices   ) / atlasDepth ) );
	vec4 s3 = texture( probesSH, vec3( uvw.xy, ( uvZBase + 3.0 * paddedSlices   ) / atlasDepth ) );
	vec4 s4 = texture( probesSH, vec3( uvw.xy, ( uvZBase + 4.0 * paddedSlices   ) / atlasDepth ) );
	vec4 s5 = texture( probesSH, vec3( uvw.xy, ( uvZBase + 5.0 * paddedSlices   ) / atlasDepth ) );
	vec4 s6 = texture( probesSH, vec3( uvw.xy, ( uvZBase + 6.0 * paddedSlices   ) / atlasDepth ) );
	vec3 c0 = s0.xyz;
	vec3 c1 = vec3( s0.w, s1.xy );
	vec3 c2 = vec3( s1.zw, s2.x );
	vec3 c3 = s2.yzw;
	vec3 c4 = s3.xyz;
	vec3 c5 = vec3( s3.w, s4.xy );
	vec3 c6 = vec3( s4.zw, s5.x );
	vec3 c7 = s5.yzw;
	vec3 c8 = s6.xyz;
	float x = worldNormal.x, y = worldNormal.y, z = worldNormal.z;
	vec3 result = c0 * 0.886227;
	result += c1 * 2.0 * 0.511664 * y;
	result += c2 * 2.0 * 0.511664 * z;
	result += c3 * 2.0 * 0.511664 * x;
	result += c4 * 2.0 * 0.429043 * x * y;
	result += c5 * 2.0 * 0.429043 * y * z;
	result += c6 * ( 0.743125 * z * z - 0.247708 );
	result += c7 * 2.0 * 0.429043 * x * z;
	result += c8 * 0.429043 * ( x * x - y * y );
	return max( result, vec3( 0.0 ) );
}
#endif`,z_=`#if defined( USE_LOGARITHMIC_DEPTH_BUFFER )
	gl_FragDepth = vIsPerspective == 0.0 ? gl_FragCoord.z : log2( vFragDepth ) * logDepthBufFC * 0.5;
#endif`,H_=`#if defined( USE_LOGARITHMIC_DEPTH_BUFFER )
	uniform float logDepthBufFC;
	varying float vFragDepth;
	varying float vIsPerspective;
#endif`,V_=`#ifdef USE_LOGARITHMIC_DEPTH_BUFFER
	varying float vFragDepth;
	varying float vIsPerspective;
#endif`,G_=`#ifdef USE_LOGARITHMIC_DEPTH_BUFFER
	vFragDepth = 1.0 + gl_Position.w;
	vIsPerspective = float( isPerspectiveMatrix( projectionMatrix ) );
#endif`,W_=`#ifdef USE_MAP
	vec4 sampledDiffuseColor = texture2D( map, vMapUv );
	#ifdef DECODE_VIDEO_TEXTURE
		sampledDiffuseColor = sRGBTransferEOTF( sampledDiffuseColor );
	#endif
	diffuseColor *= sampledDiffuseColor;
#endif`,X_=`#ifdef USE_MAP
	uniform sampler2D map;
#endif`,q_=`#if defined( USE_MAP ) || defined( USE_ALPHAMAP )
	#if defined( USE_POINTS_UV )
		vec2 uv = vUv;
	#else
		vec2 uv = ( uvTransform * vec3( gl_PointCoord.x, 1.0 - gl_PointCoord.y, 1 ) ).xy;
	#endif
#endif
#ifdef USE_MAP
	diffuseColor *= texture2D( map, uv );
#endif
#ifdef USE_ALPHAMAP
	diffuseColor.a *= texture2D( alphaMap, uv ).g;
#endif`,Y_=`#if defined( USE_POINTS_UV )
	varying vec2 vUv;
#else
	#if defined( USE_MAP ) || defined( USE_ALPHAMAP )
		uniform mat3 uvTransform;
	#endif
#endif
#ifdef USE_MAP
	uniform sampler2D map;
#endif
#ifdef USE_ALPHAMAP
	uniform sampler2D alphaMap;
#endif`,$_=`float metalnessFactor = metalness;
#ifdef USE_METALNESSMAP
	vec4 texelMetalness = texture2D( metalnessMap, vMetalnessMapUv );
	metalnessFactor *= texelMetalness.b;
#endif`,K_=`#ifdef USE_METALNESSMAP
	uniform sampler2D metalnessMap;
#endif`,J_=`#ifdef USE_INSTANCING_MORPH
	float morphTargetInfluences[ MORPHTARGETS_COUNT ];
	float morphTargetBaseInfluence = texelFetch( morphTexture, ivec2( 0, gl_InstanceID ), 0 ).r;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		morphTargetInfluences[i] =  texelFetch( morphTexture, ivec2( i + 1, gl_InstanceID ), 0 ).r;
	}
#endif`,Z_=`#if defined( USE_MORPHCOLORS )
	vColor *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		#if defined( USE_COLOR_ALPHA )
			if ( morphTargetInfluences[ i ] != 0.0 ) vColor += getMorph( gl_VertexID, i, 2 ) * morphTargetInfluences[ i ];
		#elif defined( USE_COLOR )
			if ( morphTargetInfluences[ i ] != 0.0 ) vColor += getMorph( gl_VertexID, i, 2 ).rgb * morphTargetInfluences[ i ];
		#endif
	}
#endif`,j_=`#ifdef USE_MORPHNORMALS
	objectNormal *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		if ( morphTargetInfluences[ i ] != 0.0 ) objectNormal += getMorph( gl_VertexID, i, 1 ).xyz * morphTargetInfluences[ i ];
	}
#endif`,Q_=`#ifdef USE_MORPHTARGETS
	#ifndef USE_INSTANCING_MORPH
		uniform float morphTargetBaseInfluence;
		uniform float morphTargetInfluences[ MORPHTARGETS_COUNT ];
	#endif
	uniform sampler2DArray morphTargetsTexture;
	uniform ivec2 morphTargetsTextureSize;
	vec4 getMorph( const in int vertexIndex, const in int morphTargetIndex, const in int offset ) {
		int texelIndex = vertexIndex * MORPHTARGETS_TEXTURE_STRIDE + offset;
		int y = texelIndex / morphTargetsTextureSize.x;
		int x = texelIndex - y * morphTargetsTextureSize.x;
		ivec3 morphUV = ivec3( x, y, morphTargetIndex );
		return texelFetch( morphTargetsTexture, morphUV, 0 );
	}
#endif`,ex=`#ifdef USE_MORPHTARGETS
	transformed *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		if ( morphTargetInfluences[ i ] != 0.0 ) transformed += getMorph( gl_VertexID, i, 0 ).xyz * morphTargetInfluences[ i ];
	}
#endif`,tx=`float faceDirection = gl_FrontFacing ? 1.0 : - 1.0;
#ifdef FLAT_SHADED
	vec3 fdx = dFdx( vViewPosition );
	vec3 fdy = dFdy( vViewPosition );
	vec3 normal = normalize( cross( fdx, fdy ) );
#else
	vec3 normal = normalize( vNormal );
	#ifdef DOUBLE_SIDED
		normal *= faceDirection;
	#endif
#endif
#if defined( USE_NORMALMAP_TANGENTSPACE ) || defined( USE_CLEARCOAT_NORMALMAP ) || defined( USE_ANISOTROPY )
	#ifdef USE_TANGENT
		mat3 tbn = mat3( normalize( vTangent ), normalize( vBitangent ), normal );
	#else
		mat3 tbn = getTangentFrame( - vViewPosition, normal,
		#if defined( USE_NORMALMAP )
			vNormalMapUv
		#elif defined( USE_CLEARCOAT_NORMALMAP )
			vClearcoatNormalMapUv
		#else
			vUv
		#endif
		);
	#endif
	#ifdef DOUBLE_SIDED
		tbn[0] *= faceDirection;
		tbn[1] *= faceDirection;
	#endif
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	#ifdef USE_TANGENT
		mat3 tbn2 = mat3( normalize( vTangent ), normalize( vBitangent ), normal );
	#else
		mat3 tbn2 = getTangentFrame( - vViewPosition, normal, vClearcoatNormalMapUv );
	#endif
	#ifdef DOUBLE_SIDED
		tbn2[0] *= faceDirection;
		tbn2[1] *= faceDirection;
	#endif
#endif
vec3 nonPerturbedNormal = normal;`,nx=`#ifdef USE_NORMALMAP_OBJECTSPACE
	normal = texture2D( normalMap, vNormalMapUv ).xyz * 2.0 - 1.0;
	#ifdef FLIP_SIDED
		normal = - normal;
	#endif
	#ifdef DOUBLE_SIDED
		normal = normal * faceDirection;
	#endif
	normal = normalize( normalMatrix * normal );
#elif defined( USE_NORMALMAP_TANGENTSPACE )
	vec3 mapN = texture2D( normalMap, vNormalMapUv ).xyz * 2.0 - 1.0;
	#if defined( USE_PACKED_NORMALMAP )
		mapN = vec3( mapN.xy, sqrt( saturate( 1.0 - dot( mapN.xy, mapN.xy ) ) ) );
	#endif
	mapN.xy *= normalScale;
	normal = normalize( tbn * mapN );
#elif defined( USE_BUMPMAP )
	normal = perturbNormalArb( - vViewPosition, normal, dHdxy_fwd(), faceDirection );
#endif`,ix=`#ifndef FLAT_SHADED
	varying vec3 vNormal;
	#ifdef USE_TANGENT
		varying vec3 vTangent;
		varying vec3 vBitangent;
	#endif
#endif`,sx=`#ifndef FLAT_SHADED
	varying vec3 vNormal;
	#ifdef USE_TANGENT
		varying vec3 vTangent;
		varying vec3 vBitangent;
	#endif
#endif`,rx=`#ifndef FLAT_SHADED
	vNormal = normalize( transformedNormal );
	#ifdef USE_TANGENT
		vTangent = normalize( transformedTangent );
		vBitangent = normalize( cross( vNormal, vTangent ) * tangent.w );
		#ifdef FLIP_SIDED
			vBitangent = - vBitangent;
		#endif
	#endif
#endif`,ox=`#ifdef USE_NORMALMAP
	uniform sampler2D normalMap;
	uniform vec2 normalScale;
#endif
#ifdef USE_NORMALMAP_OBJECTSPACE
	uniform mat3 normalMatrix;
#endif
#if ! defined ( USE_TANGENT ) && ( defined ( USE_NORMALMAP_TANGENTSPACE ) || defined ( USE_CLEARCOAT_NORMALMAP ) || defined( USE_ANISOTROPY ) )
	mat3 getTangentFrame( vec3 eye_pos, vec3 surf_norm, vec2 uv ) {
		vec3 q0 = dFdx( eye_pos.xyz );
		vec3 q1 = dFdy( eye_pos.xyz );
		vec2 st0 = dFdx( uv.st );
		vec2 st1 = dFdy( uv.st );
		vec3 N = surf_norm;
		vec3 q1perp = cross( q1, N );
		vec3 q0perp = cross( N, q0 );
		vec3 T = q1perp * st0.x + q0perp * st1.x;
		vec3 B = q1perp * st0.y + q0perp * st1.y;
		float det = max( dot( T, T ), dot( B, B ) );
		float scale = ( det == 0.0 ) ? 0.0 : inversesqrt( det );
		return mat3( T * scale, B * scale, N );
	}
#endif`,ax=`#ifdef USE_CLEARCOAT
	vec3 clearcoatNormal = nonPerturbedNormal;
#endif`,lx=`#ifdef USE_CLEARCOAT_NORMALMAP
	vec3 clearcoatMapN = texture2D( clearcoatNormalMap, vClearcoatNormalMapUv ).xyz * 2.0 - 1.0;
	clearcoatMapN.xy *= clearcoatNormalScale;
	clearcoatNormal = normalize( tbn2 * clearcoatMapN );
#endif`,cx=`#ifdef USE_CLEARCOATMAP
	uniform sampler2D clearcoatMap;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	uniform sampler2D clearcoatNormalMap;
	uniform vec2 clearcoatNormalScale;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	uniform sampler2D clearcoatRoughnessMap;
#endif`,hx=`#ifdef USE_IRIDESCENCEMAP
	uniform sampler2D iridescenceMap;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	uniform sampler2D iridescenceThicknessMap;
#endif`,ux=`#ifdef OPAQUE
diffuseColor.a = 1.0;
#endif
#ifdef USE_TRANSMISSION
diffuseColor.a *= material.transmissionAlpha;
#endif
gl_FragColor = vec4( outgoingLight, diffuseColor.a );`,fx=`vec3 packNormalToRGB( const in vec3 normal ) {
	return normalize( normal ) * 0.5 + 0.5;
}
vec3 unpackRGBToNormal( const in vec3 rgb ) {
	return 2.0 * rgb.xyz - 1.0;
}
const float PackUpscale = 256. / 255.;const float UnpackDownscale = 255. / 256.;const float ShiftRight8 = 1. / 256.;
const float Inv255 = 1. / 255.;
const vec4 PackFactors = vec4( 1.0, 256.0, 256.0 * 256.0, 256.0 * 256.0 * 256.0 );
const vec2 UnpackFactors2 = vec2( UnpackDownscale, 1.0 / PackFactors.g );
const vec3 UnpackFactors3 = vec3( UnpackDownscale / PackFactors.rg, 1.0 / PackFactors.b );
const vec4 UnpackFactors4 = vec4( UnpackDownscale / PackFactors.rgb, 1.0 / PackFactors.a );
vec4 packDepthToRGBA( const in float v ) {
	if( v <= 0.0 )
		return vec4( 0., 0., 0., 0. );
	if( v >= 1.0 )
		return vec4( 1., 1., 1., 1. );
	float vuf;
	float af = modf( v * PackFactors.a, vuf );
	float bf = modf( vuf * ShiftRight8, vuf );
	float gf = modf( vuf * ShiftRight8, vuf );
	return vec4( vuf * Inv255, gf * PackUpscale, bf * PackUpscale, af );
}
vec3 packDepthToRGB( const in float v ) {
	if( v <= 0.0 )
		return vec3( 0., 0., 0. );
	if( v >= 1.0 )
		return vec3( 1., 1., 1. );
	float vuf;
	float bf = modf( v * PackFactors.b, vuf );
	float gf = modf( vuf * ShiftRight8, vuf );
	return vec3( vuf * Inv255, gf * PackUpscale, bf );
}
vec2 packDepthToRG( const in float v ) {
	if( v <= 0.0 )
		return vec2( 0., 0. );
	if( v >= 1.0 )
		return vec2( 1., 1. );
	float vuf;
	float gf = modf( v * 256., vuf );
	return vec2( vuf * Inv255, gf );
}
float unpackRGBAToDepth( const in vec4 v ) {
	return dot( v, UnpackFactors4 );
}
float unpackRGBToDepth( const in vec3 v ) {
	return dot( v, UnpackFactors3 );
}
float unpackRGToDepth( const in vec2 v ) {
	return v.r * UnpackFactors2.r + v.g * UnpackFactors2.g;
}
vec4 pack2HalfToRGBA( const in vec2 v ) {
	vec4 r = vec4( v.x, fract( v.x * 255.0 ), v.y, fract( v.y * 255.0 ) );
	return vec4( r.x - r.y / 255.0, r.y, r.z - r.w / 255.0, r.w );
}
vec2 unpackRGBATo2Half( const in vec4 v ) {
	return vec2( v.x + ( v.y / 255.0 ), v.z + ( v.w / 255.0 ) );
}
float viewZToOrthographicDepth( const in float viewZ, const in float near, const in float far ) {
	return ( viewZ + near ) / ( near - far );
}
float orthographicDepthToViewZ( const in float depth, const in float near, const in float far ) {
	#ifdef USE_REVERSED_DEPTH_BUFFER
	
		return depth * ( far - near ) - far;
	#else
		return depth * ( near - far ) - near;
	#endif
}
float viewZToPerspectiveDepth( const in float viewZ, const in float near, const in float far ) {
	return ( ( near + viewZ ) * far ) / ( ( far - near ) * viewZ );
}
float perspectiveDepthToViewZ( const in float depth, const in float near, const in float far ) {
	
	#ifdef USE_REVERSED_DEPTH_BUFFER
		return ( near * far ) / ( ( near - far ) * depth - near );
	#else
		return ( near * far ) / ( ( far - near ) * depth - far );
	#endif
}`,dx=`#ifdef PREMULTIPLIED_ALPHA
	gl_FragColor.rgb *= gl_FragColor.a;
#endif`,px=`vec4 mvPosition = vec4( transformed, 1.0 );
#ifdef USE_BATCHING
	mvPosition = batchingMatrix * mvPosition;
#endif
#ifdef USE_INSTANCING
	mvPosition = instanceMatrix * mvPosition;
#endif
mvPosition = modelViewMatrix * mvPosition;
gl_Position = projectionMatrix * mvPosition;`,mx=`#ifdef DITHERING
	gl_FragColor.rgb = dithering( gl_FragColor.rgb );
#endif`,gx=`#ifdef DITHERING
	vec3 dithering( vec3 color ) {
		float grid_position = rand( gl_FragCoord.xy );
		vec3 dither_shift_RGB = vec3( 0.25 / 255.0, -0.25 / 255.0, 0.25 / 255.0 );
		dither_shift_RGB = mix( 2.0 * dither_shift_RGB, -2.0 * dither_shift_RGB, grid_position );
		return color + dither_shift_RGB;
	}
#endif`,_x=`float roughnessFactor = roughness;
#ifdef USE_ROUGHNESSMAP
	vec4 texelRoughness = texture2D( roughnessMap, vRoughnessMapUv );
	roughnessFactor *= texelRoughness.g;
#endif`,xx=`#ifdef USE_ROUGHNESSMAP
	uniform sampler2D roughnessMap;
#endif`,vx=`#if NUM_SPOT_LIGHT_COORDS > 0
	varying vec4 vSpotLightCoord[ NUM_SPOT_LIGHT_COORDS ];
#endif
#if NUM_SPOT_LIGHT_MAPS > 0
	uniform sampler2D spotLightMap[ NUM_SPOT_LIGHT_MAPS ];
#endif
#ifdef USE_SHADOWMAP
	#if NUM_SUN_LIGHT_SHADOWS > 0
		#define SUN_LIGHT_CASCADES 2
		#if defined( SHADOWMAP_TYPE_PCF )
			uniform sampler2DShadow sunShadowMap[ NUM_SUN_LIGHT_SHADOWS ];
		#else
			uniform sampler2D sunShadowMap[ NUM_SUN_LIGHT_SHADOWS ];
		#endif
		uniform mat4 sunShadowMatrix[ NUM_SUN_LIGHT_SHADOWS * SUN_LIGHT_CASCADES ];
		uniform vec4 sunShadowCascade[ NUM_SUN_LIGHT_SHADOWS * SUN_LIGHT_CASCADES ];
		varying vec4 vSunShadowWorldPosition;
		varying vec3 vSunShadowWorldNormal;
		struct SunLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
		};
		uniform SunLightShadow sunLightShadows[ NUM_SUN_LIGHT_SHADOWS ];
	#endif
	#if NUM_DIR_LIGHT_SHADOWS > 0
		#if defined( SHADOWMAP_TYPE_PCF )
			uniform sampler2DShadow directionalShadowMap[ NUM_DIR_LIGHT_SHADOWS ];
		#else
			uniform sampler2D directionalShadowMap[ NUM_DIR_LIGHT_SHADOWS ];
		#endif
		varying vec4 vDirectionalShadowCoord[ NUM_DIR_LIGHT_SHADOWS ];
		struct DirectionalLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
		};
		uniform DirectionalLightShadow directionalLightShadows[ NUM_DIR_LIGHT_SHADOWS ];
	#endif
	#if NUM_SPOT_LIGHT_SHADOWS > 0
		#if defined( SHADOWMAP_TYPE_PCF )
			uniform sampler2DShadow spotShadowMap[ NUM_SPOT_LIGHT_SHADOWS ];
		#else
			uniform sampler2D spotShadowMap[ NUM_SPOT_LIGHT_SHADOWS ];
		#endif
		struct SpotLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
		};
		uniform SpotLightShadow spotLightShadows[ NUM_SPOT_LIGHT_SHADOWS ];
	#endif
	#if NUM_POINT_LIGHT_SHADOWS > 0
		#if defined( SHADOWMAP_TYPE_PCF )
			uniform samplerCubeShadow pointShadowMap[ NUM_POINT_LIGHT_SHADOWS ];
		#elif defined( SHADOWMAP_TYPE_BASIC )
			uniform samplerCube pointShadowMap[ NUM_POINT_LIGHT_SHADOWS ];
		#endif
		varying vec4 vPointShadowCoord[ NUM_POINT_LIGHT_SHADOWS ];
		struct PointLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
			float shadowCameraNear;
			float shadowCameraFar;
		};
		uniform PointLightShadow pointLightShadows[ NUM_POINT_LIGHT_SHADOWS ];
	#endif
	#if defined( SHADOWMAP_TYPE_PCF )
		float interleavedGradientNoise( vec2 position ) {
			return fract( 52.9829189 * fract( dot( position, vec2( 0.06711056, 0.00583715 ) ) ) );
		}
		vec2 vogelDiskSample( int sampleIndex, int samplesCount, float phi ) {
			const float goldenAngle = 2.399963229728653;
			float r = sqrt( ( float( sampleIndex ) + 0.5 ) / float( samplesCount ) );
			float theta = float( sampleIndex ) * goldenAngle + phi;
			return vec2( cos( theta ), sin( theta ) ) * r;
		}
	#endif
	#if defined( SHADOWMAP_TYPE_PCF )
		float getShadow( sampler2DShadow shadowMap, vec2 shadowMapSize, float shadowIntensity, float shadowBias, float shadowRadius, vec4 shadowCoord ) {
			float shadow = 1.0;
			shadowCoord.xyz /= shadowCoord.w;
			shadowCoord.z += shadowBias;
			bool inFrustum = shadowCoord.x >= 0.0 && shadowCoord.x <= 1.0 && shadowCoord.y >= 0.0 && shadowCoord.y <= 1.0;
			bool frustumTest = inFrustum && shadowCoord.z <= 1.0;
			if ( frustumTest ) {
				vec2 texelSize = vec2( 1.0 ) / shadowMapSize;
				float radius = shadowRadius * texelSize.x;
				float phi = interleavedGradientNoise( gl_FragCoord.xy ) * PI2;
				shadow = (
					texture( shadowMap, vec3( shadowCoord.xy + vogelDiskSample( 0, 5, phi ) * radius, shadowCoord.z ) ) +
					texture( shadowMap, vec3( shadowCoord.xy + vogelDiskSample( 1, 5, phi ) * radius, shadowCoord.z ) ) +
					texture( shadowMap, vec3( shadowCoord.xy + vogelDiskSample( 2, 5, phi ) * radius, shadowCoord.z ) ) +
					texture( shadowMap, vec3( shadowCoord.xy + vogelDiskSample( 3, 5, phi ) * radius, shadowCoord.z ) ) +
					texture( shadowMap, vec3( shadowCoord.xy + vogelDiskSample( 4, 5, phi ) * radius, shadowCoord.z ) )
				) * 0.2;
			}
			return mix( 1.0, shadow, shadowIntensity );
		}
	#elif defined( SHADOWMAP_TYPE_VSM )
		float getShadow( sampler2D shadowMap, vec2 shadowMapSize, float shadowIntensity, float shadowBias, float shadowRadius, vec4 shadowCoord ) {
			float shadow = 1.0;
			shadowCoord.xyz /= shadowCoord.w;
			#ifdef USE_REVERSED_DEPTH_BUFFER
				shadowCoord.z -= shadowBias;
			#else
				shadowCoord.z += shadowBias;
			#endif
			bool inFrustum = shadowCoord.x >= 0.0 && shadowCoord.x <= 1.0 && shadowCoord.y >= 0.0 && shadowCoord.y <= 1.0;
			bool frustumTest = inFrustum && shadowCoord.z <= 1.0;
			if ( frustumTest ) {
				vec2 distribution = texture2D( shadowMap, shadowCoord.xy ).rg;
				float mean = distribution.x;
				float variance = distribution.y * distribution.y;
				#ifdef USE_REVERSED_DEPTH_BUFFER
					float hard_shadow = step( mean, shadowCoord.z );
				#else
					float hard_shadow = step( shadowCoord.z, mean );
				#endif
				
				if ( hard_shadow == 1.0 ) {
					shadow = 1.0;
				} else {
					variance = max( variance, 0.0000001 );
					float d = shadowCoord.z - mean;
					float p_max = variance / ( variance + d * d );
					p_max = clamp( ( p_max - 0.3 ) / 0.65, 0.0, 1.0 );
					shadow = max( hard_shadow, p_max );
				}
			}
			return mix( 1.0, shadow, shadowIntensity );
		}
	#else
		float getShadow( sampler2D shadowMap, vec2 shadowMapSize, float shadowIntensity, float shadowBias, float shadowRadius, vec4 shadowCoord ) {
			float shadow = 1.0;
			shadowCoord.xyz /= shadowCoord.w;
			#ifdef USE_REVERSED_DEPTH_BUFFER
				shadowCoord.z -= shadowBias;
			#else
				shadowCoord.z += shadowBias;
			#endif
			bool inFrustum = shadowCoord.x >= 0.0 && shadowCoord.x <= 1.0 && shadowCoord.y >= 0.0 && shadowCoord.y <= 1.0;
			bool frustumTest = inFrustum && shadowCoord.z <= 1.0;
			if ( frustumTest ) {
				float depth = texture2D( shadowMap, shadowCoord.xy ).r;
				#ifdef USE_REVERSED_DEPTH_BUFFER
					shadow = step( depth, shadowCoord.z );
				#else
					shadow = step( shadowCoord.z, depth );
				#endif
			}
			return mix( 1.0, shadow, shadowIntensity );
		}
	#endif
	#if NUM_SUN_LIGHT_SHADOWS > 0
		float getSunShadow(
			#if defined( SHADOWMAP_TYPE_PCF )
				sampler2DShadow shadowMap,
			#else
				sampler2D shadowMap,
			#endif
			SunLightShadow sunLightShadow,
			int shadowIndex
		) {
			vec4 shadowWorldPosition = vec4( vSunShadowWorldPosition.xyz + vSunShadowWorldNormal * sunLightShadow.shadowNormalBias, 1.0 );
			float viewDepth = vSunShadowWorldPosition.w;
			int cascadeOffset = shadowIndex * SUN_LIGHT_CASCADES;
			float shadow = 1.0;
			for ( int i = SUN_LIGHT_CASCADES - 1; i >= 0; i -- ) {
				vec4 cascade = sunShadowCascade[ cascadeOffset + i ];
				if ( viewDepth >= cascade.x && viewDepth < cascade.y ) {
					float cascadeShadow = getShadow(
						shadowMap,
						sunLightShadow.shadowMapSize,
						sunLightShadow.shadowIntensity,
						sunLightShadow.shadowBias,
						sunLightShadow.shadowRadius,
						sunShadowMatrix[ cascadeOffset + i ] * shadowWorldPosition
					);
					shadow = mix( cascadeShadow, shadow, smoothstep( cascade.z, cascade.y, viewDepth ) );
				}
			}
			return shadow;
		}
	#endif
	#if NUM_POINT_LIGHT_SHADOWS > 0
	#if defined( SHADOWMAP_TYPE_PCF )
	float getPointShadow( samplerCubeShadow shadowMap, vec2 shadowMapSize, float shadowIntensity, float shadowBias, float shadowRadius, vec4 shadowCoord, float shadowCameraNear, float shadowCameraFar ) {
		float shadow = 1.0;
		vec3 lightToPosition = shadowCoord.xyz;
		vec3 bd3D = normalize( lightToPosition );
		vec3 absVec = abs( lightToPosition );
		float viewSpaceZ = max( max( absVec.x, absVec.y ), absVec.z );
		if ( viewSpaceZ - shadowCameraFar <= 0.0 && viewSpaceZ - shadowCameraNear >= 0.0 ) {
			#ifdef USE_REVERSED_DEPTH_BUFFER
				float dp = ( shadowCameraNear * ( shadowCameraFar - viewSpaceZ ) ) / ( viewSpaceZ * ( shadowCameraFar - shadowCameraNear ) );
				dp -= shadowBias;
			#else
				float dp = ( shadowCameraFar * ( viewSpaceZ - shadowCameraNear ) ) / ( viewSpaceZ * ( shadowCameraFar - shadowCameraNear ) );
				dp += shadowBias;
			#endif
			float texelSize = shadowRadius / shadowMapSize.x;
			vec3 absDir = abs( bd3D );
			vec3 tangent = absDir.x > absDir.z ? vec3( 0.0, 1.0, 0.0 ) : vec3( 1.0, 0.0, 0.0 );
			tangent = normalize( cross( bd3D, tangent ) );
			vec3 bitangent = cross( bd3D, tangent );
			float phi = interleavedGradientNoise( gl_FragCoord.xy ) * PI2;
			vec2 sample0 = vogelDiskSample( 0, 5, phi );
			vec2 sample1 = vogelDiskSample( 1, 5, phi );
			vec2 sample2 = vogelDiskSample( 2, 5, phi );
			vec2 sample3 = vogelDiskSample( 3, 5, phi );
			vec2 sample4 = vogelDiskSample( 4, 5, phi );
			shadow = (
				texture( shadowMap, vec4( bd3D + ( tangent * sample0.x + bitangent * sample0.y ) * texelSize, dp ) ) +
				texture( shadowMap, vec4( bd3D + ( tangent * sample1.x + bitangent * sample1.y ) * texelSize, dp ) ) +
				texture( shadowMap, vec4( bd3D + ( tangent * sample2.x + bitangent * sample2.y ) * texelSize, dp ) ) +
				texture( shadowMap, vec4( bd3D + ( tangent * sample3.x + bitangent * sample3.y ) * texelSize, dp ) ) +
				texture( shadowMap, vec4( bd3D + ( tangent * sample4.x + bitangent * sample4.y ) * texelSize, dp ) )
			) * 0.2;
		}
		return mix( 1.0, shadow, shadowIntensity );
	}
	#elif defined( SHADOWMAP_TYPE_BASIC )
	float getPointShadow( samplerCube shadowMap, vec2 shadowMapSize, float shadowIntensity, float shadowBias, float shadowRadius, vec4 shadowCoord, float shadowCameraNear, float shadowCameraFar ) {
		float shadow = 1.0;
		vec3 lightToPosition = shadowCoord.xyz;
		vec3 absVec = abs( lightToPosition );
		float viewSpaceZ = max( max( absVec.x, absVec.y ), absVec.z );
		if ( viewSpaceZ - shadowCameraFar <= 0.0 && viewSpaceZ - shadowCameraNear >= 0.0 ) {
			float dp = ( shadowCameraFar * ( viewSpaceZ - shadowCameraNear ) ) / ( viewSpaceZ * ( shadowCameraFar - shadowCameraNear ) );
			dp += shadowBias;
			vec3 bd3D = normalize( lightToPosition );
			float depth = textureCube( shadowMap, bd3D ).r;
			#ifdef USE_REVERSED_DEPTH_BUFFER
				depth = 1.0 - depth;
			#endif
			shadow = step( dp, depth );
		}
		return mix( 1.0, shadow, shadowIntensity );
	}
	#endif
	#endif
#endif`,Mx=`#if NUM_SPOT_LIGHT_COORDS > 0
	uniform mat4 spotLightMatrix[ NUM_SPOT_LIGHT_COORDS ];
	varying vec4 vSpotLightCoord[ NUM_SPOT_LIGHT_COORDS ];
#endif
#ifdef USE_SHADOWMAP
	#if NUM_SUN_LIGHT_SHADOWS > 0
		varying vec4 vSunShadowWorldPosition;
		varying vec3 vSunShadowWorldNormal;
	#endif
	#if NUM_DIR_LIGHT_SHADOWS > 0
		uniform mat4 directionalShadowMatrix[ NUM_DIR_LIGHT_SHADOWS ];
		varying vec4 vDirectionalShadowCoord[ NUM_DIR_LIGHT_SHADOWS ];
		struct DirectionalLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
		};
		uniform DirectionalLightShadow directionalLightShadows[ NUM_DIR_LIGHT_SHADOWS ];
	#endif
	#if NUM_SPOT_LIGHT_SHADOWS > 0
		struct SpotLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
		};
		uniform SpotLightShadow spotLightShadows[ NUM_SPOT_LIGHT_SHADOWS ];
	#endif
	#if NUM_POINT_LIGHT_SHADOWS > 0
		uniform mat4 pointShadowMatrix[ NUM_POINT_LIGHT_SHADOWS ];
		varying vec4 vPointShadowCoord[ NUM_POINT_LIGHT_SHADOWS ];
		struct PointLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
			float shadowCameraNear;
			float shadowCameraFar;
		};
		uniform PointLightShadow pointLightShadows[ NUM_POINT_LIGHT_SHADOWS ];
	#endif
#endif`,yx=`#if ( defined( USE_SHADOWMAP ) && ( NUM_DIR_LIGHT_SHADOWS > 0 || NUM_SUN_LIGHT_SHADOWS > 0 || NUM_POINT_LIGHT_SHADOWS > 0 ) ) || ( NUM_SPOT_LIGHT_COORDS > 0 )
	#ifdef HAS_NORMAL
		vec3 shadowWorldNormal = transformNormalByInverseViewMatrix( transformedNormal, viewMatrix );
	#else
		vec3 shadowWorldNormal = vec3( 0.0 );
	#endif
	vec4 shadowWorldPosition;
#endif
#if defined( USE_SHADOWMAP )
	#if NUM_SUN_LIGHT_SHADOWS > 0
		vSunShadowWorldPosition = vec4( worldPosition.xyz, - mvPosition.z );
		vSunShadowWorldNormal = shadowWorldNormal;
	#endif
	#if NUM_DIR_LIGHT_SHADOWS > 0
		#pragma unroll_loop_start
		for ( int i = 0; i < NUM_DIR_LIGHT_SHADOWS; i ++ ) {
			shadowWorldPosition = worldPosition + vec4( shadowWorldNormal * directionalLightShadows[ i ].shadowNormalBias, 0 );
			vDirectionalShadowCoord[ i ] = directionalShadowMatrix[ i ] * shadowWorldPosition;
		}
		#pragma unroll_loop_end
	#endif
	#if NUM_POINT_LIGHT_SHADOWS > 0
		#pragma unroll_loop_start
		for ( int i = 0; i < NUM_POINT_LIGHT_SHADOWS; i ++ ) {
			shadowWorldPosition = worldPosition + vec4( shadowWorldNormal * pointLightShadows[ i ].shadowNormalBias, 0 );
			vPointShadowCoord[ i ] = pointShadowMatrix[ i ] * shadowWorldPosition;
		}
		#pragma unroll_loop_end
	#endif
#endif
#if NUM_SPOT_LIGHT_COORDS > 0
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_SPOT_LIGHT_COORDS; i ++ ) {
		shadowWorldPosition = worldPosition;
		#if ( defined( USE_SHADOWMAP ) && UNROLLED_LOOP_INDEX < NUM_SPOT_LIGHT_SHADOWS )
			shadowWorldPosition.xyz += shadowWorldNormal * spotLightShadows[ i ].shadowNormalBias;
		#endif
		vSpotLightCoord[ i ] = spotLightMatrix[ i ] * shadowWorldPosition;
	}
	#pragma unroll_loop_end
#endif`,Sx=`float getShadowMask() {
	float shadow = 1.0;
	#ifdef USE_SHADOWMAP
	#if NUM_SUN_LIGHT_SHADOWS > 0
	SunLightShadow sunLight;
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_SUN_LIGHT_SHADOWS; i ++ ) {
		sunLight = sunLightShadows[ i ];
		shadow *= receiveShadow ? getSunShadow( sunShadowMap[ i ], sunLight, UNROLLED_LOOP_INDEX ) : 1.0;
	}
	#pragma unroll_loop_end
	#endif
	#if NUM_DIR_LIGHT_SHADOWS > 0
	DirectionalLightShadow directionalLight;
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_DIR_LIGHT_SHADOWS; i ++ ) {
		directionalLight = directionalLightShadows[ i ];
		shadow *= receiveShadow ? getShadow( directionalShadowMap[ i ], directionalLight.shadowMapSize, directionalLight.shadowIntensity, directionalLight.shadowBias, directionalLight.shadowRadius, vDirectionalShadowCoord[ i ] ) : 1.0;
	}
	#pragma unroll_loop_end
	#endif
	#if NUM_SPOT_LIGHT_SHADOWS > 0
	SpotLightShadow spotLight;
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_SPOT_LIGHT_SHADOWS; i ++ ) {
		spotLight = spotLightShadows[ i ];
		shadow *= receiveShadow ? getShadow( spotShadowMap[ i ], spotLight.shadowMapSize, spotLight.shadowIntensity, spotLight.shadowBias, spotLight.shadowRadius, vSpotLightCoord[ i ] ) : 1.0;
	}
	#pragma unroll_loop_end
	#endif
	#if NUM_POINT_LIGHT_SHADOWS > 0 && ( defined( SHADOWMAP_TYPE_PCF ) || defined( SHADOWMAP_TYPE_BASIC ) )
	PointLightShadow pointLight;
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_POINT_LIGHT_SHADOWS; i ++ ) {
		pointLight = pointLightShadows[ i ];
		shadow *= receiveShadow ? getPointShadow( pointShadowMap[ i ], pointLight.shadowMapSize, pointLight.shadowIntensity, pointLight.shadowBias, pointLight.shadowRadius, vPointShadowCoord[ i ], pointLight.shadowCameraNear, pointLight.shadowCameraFar ) : 1.0;
	}
	#pragma unroll_loop_end
	#endif
	#endif
	return shadow;
}`,wx=`#ifdef USE_SKINNING
	mat4 boneMatX = getBoneMatrix( skinIndex.x );
	mat4 boneMatY = getBoneMatrix( skinIndex.y );
	mat4 boneMatZ = getBoneMatrix( skinIndex.z );
	mat4 boneMatW = getBoneMatrix( skinIndex.w );
#endif`,bx=`#ifdef USE_SKINNING
	uniform mat4 bindMatrix;
	uniform mat4 bindMatrixInverse;
	uniform highp sampler2D boneTexture;
	mat4 getBoneMatrix( const in float i ) {
		int size = textureSize( boneTexture, 0 ).x;
		int j = int( i ) * 4;
		int x = j % size;
		int y = j / size;
		vec4 v1 = texelFetch( boneTexture, ivec2( x, y ), 0 );
		vec4 v2 = texelFetch( boneTexture, ivec2( x + 1, y ), 0 );
		vec4 v3 = texelFetch( boneTexture, ivec2( x + 2, y ), 0 );
		vec4 v4 = texelFetch( boneTexture, ivec2( x + 3, y ), 0 );
		return mat4( v1, v2, v3, v4 );
	}
#endif`,Tx=`#ifdef USE_SKINNING
	vec4 skinVertex = bindMatrix * vec4( transformed, 1.0 );
	vec4 skinned = vec4( 0.0 );
	skinned += boneMatX * skinVertex * skinWeight.x;
	skinned += boneMatY * skinVertex * skinWeight.y;
	skinned += boneMatZ * skinVertex * skinWeight.z;
	skinned += boneMatW * skinVertex * skinWeight.w;
	transformed = ( bindMatrixInverse * skinned ).xyz;
#endif`,Ex=`#ifdef USE_SKINNING
	mat4 skinMatrix = mat4( 0.0 );
	skinMatrix += skinWeight.x * boneMatX;
	skinMatrix += skinWeight.y * boneMatY;
	skinMatrix += skinWeight.z * boneMatZ;
	skinMatrix += skinWeight.w * boneMatW;
	skinMatrix = bindMatrixInverse * skinMatrix * bindMatrix;
	objectNormal = vec4( skinMatrix * vec4( objectNormal, 0.0 ) ).xyz;
	#ifdef USE_TANGENT
		objectTangent = vec4( skinMatrix * vec4( objectTangent, 0.0 ) ).xyz;
	#endif
#endif`,Ax=`float specularStrength;
#ifdef USE_SPECULARMAP
	vec4 texelSpecular = texture2D( specularMap, vSpecularMapUv );
	specularStrength = texelSpecular.r;
#else
	specularStrength = 1.0;
#endif`,Rx=`#ifdef USE_SPECULARMAP
	uniform sampler2D specularMap;
#endif`,Cx=`#if defined( TONE_MAPPING )
	gl_FragColor.rgb = toneMapping( gl_FragColor.rgb );
#endif`,Px=`#ifndef saturate
#define saturate( a ) clamp( a, 0.0, 1.0 )
#endif
uniform float toneMappingExposure;
vec3 LinearToneMapping( vec3 color ) {
	return saturate( toneMappingExposure * color );
}
vec3 ReinhardToneMapping( vec3 color ) {
	color *= toneMappingExposure;
	return saturate( color / ( vec3( 1.0 ) + color ) );
}
vec3 CineonToneMapping( vec3 color ) {
	color *= toneMappingExposure;
	color = max( vec3( 0.0 ), color - 0.004 );
	return pow( ( color * ( 6.2 * color + 0.5 ) ) / ( color * ( 6.2 * color + 1.7 ) + 0.06 ), vec3( 2.2 ) );
}
vec3 RRTAndODTFit( vec3 v ) {
	vec3 a = v * ( v + 0.0245786 ) - 0.000090537;
	vec3 b = v * ( 0.983729 * v + 0.4329510 ) + 0.238081;
	return a / b;
}
vec3 ACESFilmicToneMapping( vec3 color ) {
	const mat3 ACESInputMat = mat3(
		vec3( 0.59719, 0.07600, 0.02840 ),		vec3( 0.35458, 0.90834, 0.13383 ),
		vec3( 0.04823, 0.01566, 0.83777 )
	);
	const mat3 ACESOutputMat = mat3(
		vec3(  1.60475, -0.10208, -0.00327 ),		vec3( -0.53108,  1.10813, -0.07276 ),
		vec3( -0.07367, -0.00605,  1.07602 )
	);
	color *= toneMappingExposure / 0.6;
	color = ACESInputMat * color;
	color = RRTAndODTFit( color );
	color = ACESOutputMat * color;
	return saturate( color );
}
const mat3 LINEAR_REC2020_TO_LINEAR_SRGB = mat3(
	vec3( 1.6605, - 0.1246, - 0.0182 ),
	vec3( - 0.5876, 1.1329, - 0.1006 ),
	vec3( - 0.0728, - 0.0083, 1.1187 )
);
const mat3 LINEAR_SRGB_TO_LINEAR_REC2020 = mat3(
	vec3( 0.6274, 0.0691, 0.0164 ),
	vec3( 0.3293, 0.9195, 0.0880 ),
	vec3( 0.0433, 0.0113, 0.8956 )
);
vec3 agxDefaultContrastApprox( vec3 x ) {
	vec3 x2 = x * x;
	vec3 x4 = x2 * x2;
	return + 15.5 * x4 * x2
		- 40.14 * x4 * x
		+ 31.96 * x4
		- 6.868 * x2 * x
		+ 0.4298 * x2
		+ 0.1191 * x
		- 0.00232;
}
vec3 AgXToneMapping( vec3 color ) {
	const mat3 AgXInsetMatrix = mat3(
		vec3( 0.856627153315983, 0.137318972929847, 0.11189821299995 ),
		vec3( 0.0951212405381588, 0.761241990602591, 0.0767994186031903 ),
		vec3( 0.0482516061458583, 0.101439036467562, 0.811302368396859 )
	);
	const mat3 AgXOutsetMatrix = mat3(
		vec3( 1.1271005818144368, - 0.1413297634984383, - 0.14132976349843826 ),
		vec3( - 0.11060664309660323, 1.157823702216272, - 0.11060664309660294 ),
		vec3( - 0.016493938717834573, - 0.016493938717834257, 1.2519364065950405 )
	);
	const float AgxMinEv = - 12.47393;	const float AgxMaxEv = 4.026069;
	color *= toneMappingExposure;
	color = LINEAR_SRGB_TO_LINEAR_REC2020 * color;
	color = AgXInsetMatrix * color;
	color = max( color, 1e-10 );	color = log2( color );
	color = ( color - AgxMinEv ) / ( AgxMaxEv - AgxMinEv );
	color = clamp( color, 0.0, 1.0 );
	color = agxDefaultContrastApprox( color );
	color = AgXOutsetMatrix * color;
	color = pow( max( vec3( 0.0 ), color ), vec3( 2.2 ) );
	color = LINEAR_REC2020_TO_LINEAR_SRGB * color;
	color = clamp( color, 0.0, 1.0 );
	return color;
}
vec3 NeutralToneMapping( vec3 color ) {
	const float StartCompression = 0.8 - 0.04;
	const float Desaturation = 0.15;
	color *= toneMappingExposure;
	float x = min( color.r, min( color.g, color.b ) );
	float offset = x < 0.08 ? x - 6.25 * x * x : 0.04;
	color -= offset;
	float peak = max( color.r, max( color.g, color.b ) );
	if ( peak < StartCompression ) return color;
	float d = 1. - StartCompression;
	float newPeak = 1. - d * d / ( peak + d - StartCompression );
	color *= newPeak / peak;
	float g = 1. - 1. / ( Desaturation * ( peak - newPeak ) + 1. );
	return mix( color, vec3( newPeak ), g );
}
vec3 CustomToneMapping( vec3 color ) { return color; }`,Ix=`#ifdef USE_TRANSMISSION
	material.transmission = transmission;
	material.transmissionAlpha = 1.0;
	material.thickness = thickness;
	material.attenuationDistance = attenuationDistance;
	material.attenuationColor = attenuationColor;
	#ifdef USE_TRANSMISSIONMAP
		material.transmission *= texture2D( transmissionMap, vTransmissionMapUv ).r;
	#endif
	#ifdef USE_THICKNESSMAP
		material.thickness *= texture2D( thicknessMap, vThicknessMapUv ).g;
	#endif
	vec3 pos = vWorldPosition;
	vec3 v = normalize( cameraPosition - pos );
	vec3 n = transformNormalByInverseViewMatrix( normal, viewMatrix );
	vec4 transmitted = getIBLVolumeRefraction(
		n, v, material.roughness, material.diffuseContribution, material.specularColorBlended, material.specularF90,
		pos, modelMatrix, viewMatrix, projectionMatrix, material.dispersion, material.ior, material.thickness,
		material.attenuationColor, material.attenuationDistance );
	material.transmissionAlpha = mix( material.transmissionAlpha, transmitted.a, material.transmission );
	totalDiffuse = mix( totalDiffuse, transmitted.rgb, material.transmission );
#endif`,Lx=`#ifdef USE_TRANSMISSION
	uniform float transmission;
	uniform float thickness;
	uniform float attenuationDistance;
	uniform vec3 attenuationColor;
	#ifdef USE_TRANSMISSIONMAP
		uniform sampler2D transmissionMap;
	#endif
	#ifdef USE_THICKNESSMAP
		uniform sampler2D thicknessMap;
	#endif
	uniform vec2 transmissionSamplerSize;
	uniform sampler2D transmissionSamplerMap;
	uniform mat4 modelMatrix;
	uniform mat4 projectionMatrix;
	varying vec3 vWorldPosition;
	float w0( float a ) {
		return ( 1.0 / 6.0 ) * ( a * ( a * ( - a + 3.0 ) - 3.0 ) + 1.0 );
	}
	float w1( float a ) {
		return ( 1.0 / 6.0 ) * ( a *  a * ( 3.0 * a - 6.0 ) + 4.0 );
	}
	float w2( float a ){
		return ( 1.0 / 6.0 ) * ( a * ( a * ( - 3.0 * a + 3.0 ) + 3.0 ) + 1.0 );
	}
	float w3( float a ) {
		return ( 1.0 / 6.0 ) * ( a * a * a );
	}
	float g0( float a ) {
		return w0( a ) + w1( a );
	}
	float g1( float a ) {
		return w2( a ) + w3( a );
	}
	float h0( float a ) {
		return - 1.0 + w1( a ) / ( w0( a ) + w1( a ) );
	}
	float h1( float a ) {
		return 1.0 + w3( a ) / ( w2( a ) + w3( a ) );
	}
	vec4 bicubic( sampler2D tex, vec2 uv, vec4 texelSize, float lod ) {
		uv = uv * texelSize.zw + 0.5;
		vec2 iuv = floor( uv );
		vec2 fuv = fract( uv );
		float g0x = g0( fuv.x );
		float g1x = g1( fuv.x );
		float h0x = h0( fuv.x );
		float h1x = h1( fuv.x );
		float h0y = h0( fuv.y );
		float h1y = h1( fuv.y );
		vec2 p0 = ( vec2( iuv.x + h0x, iuv.y + h0y ) - 0.5 ) * texelSize.xy;
		vec2 p1 = ( vec2( iuv.x + h1x, iuv.y + h0y ) - 0.5 ) * texelSize.xy;
		vec2 p2 = ( vec2( iuv.x + h0x, iuv.y + h1y ) - 0.5 ) * texelSize.xy;
		vec2 p3 = ( vec2( iuv.x + h1x, iuv.y + h1y ) - 0.5 ) * texelSize.xy;
		return g0( fuv.y ) * ( g0x * textureLod( tex, p0, lod ) + g1x * textureLod( tex, p1, lod ) ) +
			g1( fuv.y ) * ( g0x * textureLod( tex, p2, lod ) + g1x * textureLod( tex, p3, lod ) );
	}
	vec4 textureBicubic( sampler2D sampler, vec2 uv, float lod ) {
		vec2 fLodSize = vec2( textureSize( sampler, int( lod ) ) );
		vec2 cLodSize = vec2( textureSize( sampler, int( lod + 1.0 ) ) );
		vec2 fLodSizeInv = 1.0 / fLodSize;
		vec2 cLodSizeInv = 1.0 / cLodSize;
		vec4 fSample = bicubic( sampler, uv, vec4( fLodSizeInv, fLodSize ), floor( lod ) );
		vec4 cSample = bicubic( sampler, uv, vec4( cLodSizeInv, cLodSize ), ceil( lod ) );
		return mix( fSample, cSample, fract( lod ) );
	}
	vec3 getVolumeTransmissionRay( const in vec3 n, const in vec3 v, const in float thickness, const in float ior, const in mat4 modelMatrix ) {
		vec3 refractionVector = refract( - v, normalize( n ), 1.0 / ior );
		vec3 modelScale;
		modelScale.x = length( vec3( modelMatrix[ 0 ].xyz ) );
		modelScale.y = length( vec3( modelMatrix[ 1 ].xyz ) );
		modelScale.z = length( vec3( modelMatrix[ 2 ].xyz ) );
		return normalize( refractionVector ) * thickness * modelScale;
	}
	float applyIorToRoughness( const in float roughness, const in float ior ) {
		return roughness * clamp( ior * 2.0 - 2.0, 0.0, 1.0 );
	}
	vec4 getTransmissionSample( const in vec2 fragCoord, const in float roughness, const in float ior ) {
		float lod = log2( transmissionSamplerSize.x ) * applyIorToRoughness( roughness, ior );
		return textureBicubic( transmissionSamplerMap, fragCoord.xy, lod );
	}
	vec3 volumeAttenuation( const in float transmissionDistance, const in vec3 attenuationColor, const in float attenuationDistance ) {
		if ( isinf( attenuationDistance ) ) {
			return vec3( 1.0 );
		} else {
			vec3 attenuationCoefficient = -log( attenuationColor ) / attenuationDistance;
			vec3 transmittance = exp( - attenuationCoefficient * transmissionDistance );			return transmittance;
		}
	}
	vec4 getIBLVolumeRefraction( const in vec3 n, const in vec3 v, const in float roughness, const in vec3 diffuseColor,
		const in vec3 specularColor, const in float specularF90, const in vec3 position, const in mat4 modelMatrix,
		const in mat4 viewMatrix, const in mat4 projMatrix, const in float dispersion, const in float ior, const in float thickness,
		const in vec3 attenuationColor, const in float attenuationDistance ) {
		vec4 transmittedLight;
		vec3 transmittance;
		#ifdef USE_DISPERSION
			float halfSpread = ( ior - 1.0 ) * 0.025 * dispersion;
			vec3 iors = vec3( ior - halfSpread, ior, ior + halfSpread );
			for ( int i = 0; i < 3; i ++ ) {
				vec3 transmissionRay = getVolumeTransmissionRay( n, v, thickness, iors[ i ], modelMatrix );
				vec3 refractedRayExit = position + transmissionRay;
				vec4 ndcPos = projMatrix * viewMatrix * vec4( refractedRayExit, 1.0 );
				vec2 refractionCoords = ndcPos.xy / ndcPos.w;
				refractionCoords += 1.0;
				refractionCoords /= 2.0;
				vec4 transmissionSample = getTransmissionSample( refractionCoords, roughness, iors[ i ] );
				transmittedLight[ i ] = transmissionSample[ i ];
				transmittedLight.a += transmissionSample.a;
				transmittance[ i ] = diffuseColor[ i ] * volumeAttenuation( length( transmissionRay ), attenuationColor, attenuationDistance )[ i ];
			}
			transmittedLight.a /= 3.0;
		#else
			vec3 transmissionRay = getVolumeTransmissionRay( n, v, thickness, ior, modelMatrix );
			vec3 refractedRayExit = position + transmissionRay;
			vec4 ndcPos = projMatrix * viewMatrix * vec4( refractedRayExit, 1.0 );
			vec2 refractionCoords = ndcPos.xy / ndcPos.w;
			refractionCoords += 1.0;
			refractionCoords /= 2.0;
			transmittedLight = getTransmissionSample( refractionCoords, roughness, ior );
			transmittance = diffuseColor * volumeAttenuation( length( transmissionRay ), attenuationColor, attenuationDistance );
		#endif
		vec3 attenuatedColor = transmittance * transmittedLight.rgb;
		vec3 F = EnvironmentBRDF( n, v, specularColor, specularF90, roughness );
		float transmittanceFactor = ( transmittance.r + transmittance.g + transmittance.b ) / 3.0;
		return vec4( ( 1.0 - F ) * attenuatedColor, 1.0 - ( 1.0 - transmittedLight.a ) * transmittanceFactor );
	}
#endif`,Nx=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
	varying vec2 vUv;
#endif
#ifdef USE_MAP
	varying vec2 vMapUv;
#endif
#ifdef USE_ALPHAMAP
	varying vec2 vAlphaMapUv;
#endif
#ifdef USE_LIGHTMAP
	varying vec2 vLightMapUv;
#endif
#ifdef USE_AOMAP
	varying vec2 vAoMapUv;
#endif
#ifdef USE_BUMPMAP
	varying vec2 vBumpMapUv;
#endif
#ifdef USE_NORMALMAP
	varying vec2 vNormalMapUv;
#endif
#ifdef USE_EMISSIVEMAP
	varying vec2 vEmissiveMapUv;
#endif
#ifdef USE_METALNESSMAP
	varying vec2 vMetalnessMapUv;
#endif
#ifdef USE_ROUGHNESSMAP
	varying vec2 vRoughnessMapUv;
#endif
#ifdef USE_ANISOTROPYMAP
	varying vec2 vAnisotropyMapUv;
#endif
#ifdef USE_CLEARCOATMAP
	varying vec2 vClearcoatMapUv;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	varying vec2 vClearcoatNormalMapUv;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	varying vec2 vClearcoatRoughnessMapUv;
#endif
#ifdef USE_IRIDESCENCEMAP
	varying vec2 vIridescenceMapUv;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	varying vec2 vIridescenceThicknessMapUv;
#endif
#ifdef USE_SHEEN_COLORMAP
	varying vec2 vSheenColorMapUv;
#endif
#ifdef USE_SHEEN_ROUGHNESSMAP
	varying vec2 vSheenRoughnessMapUv;
#endif
#ifdef USE_SPECULARMAP
	varying vec2 vSpecularMapUv;
#endif
#ifdef USE_SPECULAR_COLORMAP
	varying vec2 vSpecularColorMapUv;
#endif
#ifdef USE_SPECULAR_INTENSITYMAP
	varying vec2 vSpecularIntensityMapUv;
#endif
#ifdef USE_TRANSMISSIONMAP
	uniform mat3 transmissionMapTransform;
	varying vec2 vTransmissionMapUv;
#endif
#ifdef USE_THICKNESSMAP
	uniform mat3 thicknessMapTransform;
	varying vec2 vThicknessMapUv;
#endif`,Dx=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
	varying vec2 vUv;
#endif
#ifdef USE_MAP
	uniform mat3 mapTransform;
	varying vec2 vMapUv;
#endif
#ifdef USE_ALPHAMAP
	uniform mat3 alphaMapTransform;
	varying vec2 vAlphaMapUv;
#endif
#ifdef USE_LIGHTMAP
	uniform mat3 lightMapTransform;
	varying vec2 vLightMapUv;
#endif
#ifdef USE_AOMAP
	uniform mat3 aoMapTransform;
	varying vec2 vAoMapUv;
#endif
#ifdef USE_BUMPMAP
	uniform mat3 bumpMapTransform;
	varying vec2 vBumpMapUv;
#endif
#ifdef USE_NORMALMAP
	uniform mat3 normalMapTransform;
	varying vec2 vNormalMapUv;
#endif
#ifdef USE_DISPLACEMENTMAP
	uniform mat3 displacementMapTransform;
	varying vec2 vDisplacementMapUv;
#endif
#ifdef USE_EMISSIVEMAP
	uniform mat3 emissiveMapTransform;
	varying vec2 vEmissiveMapUv;
#endif
#ifdef USE_METALNESSMAP
	uniform mat3 metalnessMapTransform;
	varying vec2 vMetalnessMapUv;
#endif
#ifdef USE_ROUGHNESSMAP
	uniform mat3 roughnessMapTransform;
	varying vec2 vRoughnessMapUv;
#endif
#ifdef USE_ANISOTROPYMAP
	uniform mat3 anisotropyMapTransform;
	varying vec2 vAnisotropyMapUv;
#endif
#ifdef USE_CLEARCOATMAP
	uniform mat3 clearcoatMapTransform;
	varying vec2 vClearcoatMapUv;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	uniform mat3 clearcoatNormalMapTransform;
	varying vec2 vClearcoatNormalMapUv;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	uniform mat3 clearcoatRoughnessMapTransform;
	varying vec2 vClearcoatRoughnessMapUv;
#endif
#ifdef USE_SHEEN_COLORMAP
	uniform mat3 sheenColorMapTransform;
	varying vec2 vSheenColorMapUv;
#endif
#ifdef USE_SHEEN_ROUGHNESSMAP
	uniform mat3 sheenRoughnessMapTransform;
	varying vec2 vSheenRoughnessMapUv;
#endif
#ifdef USE_IRIDESCENCEMAP
	uniform mat3 iridescenceMapTransform;
	varying vec2 vIridescenceMapUv;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	uniform mat3 iridescenceThicknessMapTransform;
	varying vec2 vIridescenceThicknessMapUv;
#endif
#ifdef USE_SPECULARMAP
	uniform mat3 specularMapTransform;
	varying vec2 vSpecularMapUv;
#endif
#ifdef USE_SPECULAR_COLORMAP
	uniform mat3 specularColorMapTransform;
	varying vec2 vSpecularColorMapUv;
#endif
#ifdef USE_SPECULAR_INTENSITYMAP
	uniform mat3 specularIntensityMapTransform;
	varying vec2 vSpecularIntensityMapUv;
#endif
#ifdef USE_TRANSMISSIONMAP
	uniform mat3 transmissionMapTransform;
	varying vec2 vTransmissionMapUv;
#endif
#ifdef USE_THICKNESSMAP
	uniform mat3 thicknessMapTransform;
	varying vec2 vThicknessMapUv;
#endif`,Ux=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
	vUv = vec3( uv, 1 ).xy;
#endif
#ifdef USE_MAP
	vMapUv = ( mapTransform * vec3( MAP_UV, 1 ) ).xy;
#endif
#ifdef USE_ALPHAMAP
	vAlphaMapUv = ( alphaMapTransform * vec3( ALPHAMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_LIGHTMAP
	vLightMapUv = ( lightMapTransform * vec3( LIGHTMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_AOMAP
	vAoMapUv = ( aoMapTransform * vec3( AOMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_BUMPMAP
	vBumpMapUv = ( bumpMapTransform * vec3( BUMPMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_NORMALMAP
	vNormalMapUv = ( normalMapTransform * vec3( NORMALMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_DISPLACEMENTMAP
	vDisplacementMapUv = ( displacementMapTransform * vec3( DISPLACEMENTMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_EMISSIVEMAP
	vEmissiveMapUv = ( emissiveMapTransform * vec3( EMISSIVEMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_METALNESSMAP
	vMetalnessMapUv = ( metalnessMapTransform * vec3( METALNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_ROUGHNESSMAP
	vRoughnessMapUv = ( roughnessMapTransform * vec3( ROUGHNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_ANISOTROPYMAP
	vAnisotropyMapUv = ( anisotropyMapTransform * vec3( ANISOTROPYMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_CLEARCOATMAP
	vClearcoatMapUv = ( clearcoatMapTransform * vec3( CLEARCOATMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	vClearcoatNormalMapUv = ( clearcoatNormalMapTransform * vec3( CLEARCOAT_NORMALMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	vClearcoatRoughnessMapUv = ( clearcoatRoughnessMapTransform * vec3( CLEARCOAT_ROUGHNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_IRIDESCENCEMAP
	vIridescenceMapUv = ( iridescenceMapTransform * vec3( IRIDESCENCEMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	vIridescenceThicknessMapUv = ( iridescenceThicknessMapTransform * vec3( IRIDESCENCE_THICKNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SHEEN_COLORMAP
	vSheenColorMapUv = ( sheenColorMapTransform * vec3( SHEEN_COLORMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SHEEN_ROUGHNESSMAP
	vSheenRoughnessMapUv = ( sheenRoughnessMapTransform * vec3( SHEEN_ROUGHNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SPECULARMAP
	vSpecularMapUv = ( specularMapTransform * vec3( SPECULARMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SPECULAR_COLORMAP
	vSpecularColorMapUv = ( specularColorMapTransform * vec3( SPECULAR_COLORMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SPECULAR_INTENSITYMAP
	vSpecularIntensityMapUv = ( specularIntensityMapTransform * vec3( SPECULAR_INTENSITYMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_TRANSMISSIONMAP
	vTransmissionMapUv = ( transmissionMapTransform * vec3( TRANSMISSIONMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_THICKNESSMAP
	vThicknessMapUv = ( thicknessMapTransform * vec3( THICKNESSMAP_UV, 1 ) ).xy;
#endif`,Fx=`#if defined( USE_ENVMAP ) || defined( DISTANCE ) || defined ( USE_SHADOWMAP ) || defined ( USE_TRANSMISSION ) || NUM_SPOT_LIGHT_COORDS > 0
	vec4 worldPosition = vec4( transformed, 1.0 );
	#ifdef USE_BATCHING
		worldPosition = batchingMatrix * worldPosition;
	#endif
	#ifdef USE_INSTANCING
		worldPosition = instanceMatrix * worldPosition;
	#endif
	worldPosition = modelMatrix * worldPosition;
#endif`;const Ox=`varying vec2 vUv;
uniform mat3 uvTransform;
void main() {
	vUv = ( uvTransform * vec3( uv, 1 ) ).xy;
	gl_Position = vec4( position.xy, 1.0, 1.0 );
}`,Bx=`uniform sampler2D t2D;
uniform float backgroundIntensity;
varying vec2 vUv;
void main() {
	vec4 texColor = texture2D( t2D, vUv );
	#ifdef DECODE_VIDEO_TEXTURE
		texColor = vec4( mix( pow( texColor.rgb * 0.9478672986 + vec3( 0.0521327014 ), vec3( 2.4 ) ), texColor.rgb * 0.0773993808, vec3( lessThanEqual( texColor.rgb, vec3( 0.04045 ) ) ) ), texColor.w );
	#endif
	texColor.rgb *= backgroundIntensity;
	gl_FragColor = texColor;
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,kx=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
	gl_Position.z = gl_Position.w;
}`,zx=`#ifdef ENVMAP_TYPE_CUBE
	uniform samplerCube envMap;
#elif defined( ENVMAP_TYPE_CUBE_UV )
	uniform sampler2D envMap;
#endif
uniform float backgroundBlurriness;
uniform float backgroundIntensity;
uniform mat3 backgroundRotation;
varying vec3 vWorldDirection;
#include <cube_uv_reflection_fragment>
void main() {
	#ifdef ENVMAP_TYPE_CUBE
		vec4 texColor = textureCube( envMap, backgroundRotation * vWorldDirection );
	#elif defined( ENVMAP_TYPE_CUBE_UV )
		vec4 texColor = textureCubeUV( envMap, backgroundRotation * vWorldDirection, backgroundBlurriness );
	#else
		vec4 texColor = vec4( 0.0, 0.0, 0.0, 1.0 );
	#endif
	texColor.rgb *= backgroundIntensity;
	gl_FragColor = texColor;
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,Hx=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
	gl_Position.z = gl_Position.w;
}`,Vx=`uniform samplerCube tCube;
uniform float tFlip;
uniform float opacity;
varying vec3 vWorldDirection;
void main() {
	vec4 texColor = textureCube( tCube, vec3( tFlip * vWorldDirection.x, vWorldDirection.yz ) );
	gl_FragColor = texColor;
	gl_FragColor.a *= opacity;
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,Gx=`#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
varying vec2 vHighPrecisionZW;
void main() {
	#include <uv_vertex>
	#include <batching_vertex>
	#include <skinbase_vertex>
	#include <morphinstance_vertex>
	#ifdef USE_DISPLACEMENTMAP
		#include <beginnormal_vertex>
		#include <morphnormal_vertex>
		#include <skinnormal_vertex>
	#endif
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vHighPrecisionZW = gl_Position.zw;
}`,Wx=`#if DEPTH_PACKING == 3200
	uniform float opacity;
#endif
#include <common>
#include <packing>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
varying vec2 vHighPrecisionZW;
void main() {
	vec4 diffuseColor = vec4( 1.0 );
	#include <clipping_planes_fragment>
	#if DEPTH_PACKING == 3200
		diffuseColor.a = opacity;
	#endif
	#include <map_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <logdepthbuf_fragment>
	#ifdef USE_REVERSED_DEPTH_BUFFER
		float fragCoordZ = vHighPrecisionZW[ 0 ] / vHighPrecisionZW[ 1 ];
	#else
		float fragCoordZ = 0.5 * vHighPrecisionZW[ 0 ] / vHighPrecisionZW[ 1 ] + 0.5;
	#endif
	#if DEPTH_PACKING == 3200
		gl_FragColor = vec4( vec3( 1.0 - fragCoordZ ), opacity );
	#elif DEPTH_PACKING == 3201
		gl_FragColor = packDepthToRGBA( fragCoordZ );
	#elif DEPTH_PACKING == 3202
		gl_FragColor = vec4( packDepthToRGB( fragCoordZ ), 1.0 );
	#elif DEPTH_PACKING == 3203
		gl_FragColor = vec4( packDepthToRG( fragCoordZ ), 0.0, 1.0 );
	#endif
}`,Xx=`#define DISTANCE
varying vec3 vWorldPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <batching_vertex>
	#include <skinbase_vertex>
	#include <morphinstance_vertex>
	#ifdef USE_DISPLACEMENTMAP
		#include <beginnormal_vertex>
		#include <morphnormal_vertex>
		#include <skinnormal_vertex>
	#endif
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <worldpos_vertex>
	#include <clipping_planes_vertex>
	vWorldPosition = worldPosition.xyz;
}`,qx=`#define DISTANCE
uniform vec3 referencePosition;
uniform float nearDistance;
uniform float farDistance;
varying vec3 vWorldPosition;
#include <common>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( 1.0 );
	#include <clipping_planes_fragment>
	#include <map_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	float dist = length( vWorldPosition - referencePosition );
	dist = ( dist - nearDistance ) / ( farDistance - nearDistance );
	dist = saturate( dist );
	gl_FragColor = vec4( dist, 0.0, 0.0, 1.0 );
}`,Yx=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
}`,$x=`uniform sampler2D tEquirect;
varying vec3 vWorldDirection;
#include <common>
void main() {
	vec3 direction = normalize( vWorldDirection );
	vec2 sampleUV = equirectUv( direction );
	gl_FragColor = texture2D( tEquirect, sampleUV );
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,Kx=`uniform float scale;
attribute float lineDistance;
varying float vLineDistance;
#include <common>
#include <uv_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <morphtarget_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	vLineDistance = scale * lineDistance;
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <fog_vertex>
}`,Jx=`uniform vec3 diffuse;
uniform float opacity;
uniform float dashSize;
uniform float totalSize;
varying float vLineDistance;
#include <common>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <fog_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	if ( mod( vLineDistance, totalSize ) > dashSize ) {
		discard;
	}
	vec3 outgoingLight = vec3( 0.0 );
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	outgoingLight = diffuseColor.rgb;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
}`,Zx=`#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <envmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#if defined ( USE_ENVMAP ) || defined ( USE_SKINNING )
		#include <beginnormal_vertex>
		#include <morphnormal_vertex>
		#include <skinbase_vertex>
		#include <skinnormal_vertex>
		#include <defaultnormal_vertex>
	#endif
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <worldpos_vertex>
	#include <envmap_vertex>
	#include <fog_vertex>
}`,jx=`uniform vec3 diffuse;
uniform float opacity;
#ifndef FLAT_SHADED
	varying vec3 vNormal;
#endif
#include <common>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <envmap_common_pars_fragment>
#include <envmap_pars_fragment>
#include <fog_pars_fragment>
#include <specularmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <specularmap_fragment>
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	#ifdef USE_LIGHTMAP
		vec4 lightMapTexel = texture2D( lightMap, vLightMapUv );
		reflectedLight.indirectDiffuse += lightMapTexel.rgb * lightMapIntensity * RECIPROCAL_PI;
	#else
		reflectedLight.indirectDiffuse += vec3( 1.0 );
	#endif
	#include <aomap_fragment>
	reflectedLight.indirectDiffuse *= diffuseColor.rgb;
	vec3 outgoingLight = reflectedLight.indirectDiffuse;
	#include <envmap_fragment>
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,Qx=`#define LAMBERT
varying vec3 vViewPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <envmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <shadowmap_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vViewPosition = - mvPosition.xyz;
	#include <worldpos_vertex>
	#include <envmap_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
}`,ev=`#define LAMBERT
uniform vec3 diffuse;
uniform vec3 emissive;
uniform float opacity;
#include <common>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <emissivemap_pars_fragment>
#include <cube_uv_reflection_fragment>
#include <envmap_common_pars_fragment>
#include <envmap_pars_fragment>
#include <envmap_physical_pars_fragment>
#include <fog_pars_fragment>
#include <bsdfs>
#include <lights_pars_begin>
#include <normal_pars_fragment>
#include <lights_lambert_pars_fragment>
#include <shadowmap_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <specularmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	vec3 totalEmissiveRadiance = emissive;
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <specularmap_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	#include <emissivemap_fragment>
	#include <lights_lambert_fragment>
	#include <lights_fragment_begin>
	#include <lights_fragment_maps>
	#include <lights_fragment_end>
	#include <aomap_fragment>
	vec3 outgoingLight = reflectedLight.directDiffuse + reflectedLight.indirectDiffuse + totalEmissiveRadiance;
	#include <envmap_fragment>
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,tv=`#define MATCAP
varying vec3 vViewPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <color_pars_vertex>
#include <displacementmap_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <fog_vertex>
	vViewPosition = - mvPosition.xyz;
}`,nv=`#define MATCAP
uniform vec3 diffuse;
uniform float opacity;
uniform sampler2D matcap;
varying vec3 vViewPosition;
#include <common>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <fog_pars_fragment>
#include <normal_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	vec3 viewDir = normalize( vViewPosition );
	vec3 x = normalize( vec3( viewDir.z, 0.0, - viewDir.x ) );
	vec3 y = cross( viewDir, x );
	vec2 uv = vec2( dot( x, normal ), dot( y, normal ) ) * 0.495 + 0.5;
	#ifdef USE_MATCAP
		vec4 matcapColor = texture2D( matcap, uv );
	#else
		vec4 matcapColor = vec4( vec3( mix( 0.2, 0.8, uv.y ) ), 1.0 );
	#endif
	vec3 outgoingLight = diffuseColor.rgb * matcapColor.rgb;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,iv=`#define NORMAL
#if defined( FLAT_SHADED ) || defined( USE_BUMPMAP ) || defined( USE_NORMALMAP_TANGENTSPACE )
	varying vec3 vViewPosition;
#endif
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphinstance_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
#if defined( FLAT_SHADED ) || defined( USE_BUMPMAP ) || defined( USE_NORMALMAP_TANGENTSPACE )
	vViewPosition = - mvPosition.xyz;
#endif
}`,sv=`#define NORMAL
uniform float opacity;
#if defined( FLAT_SHADED ) || defined( USE_BUMPMAP ) || defined( USE_NORMALMAP_TANGENTSPACE )
	varying vec3 vViewPosition;
#endif
#include <uv_pars_fragment>
#include <normal_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( 0.0, 0.0, 0.0, opacity );
	#include <clipping_planes_fragment>
	#include <logdepthbuf_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	gl_FragColor = vec4( normalize( normal ) * 0.5 + 0.5, diffuseColor.a );
	#ifdef OPAQUE
		gl_FragColor.a = 1.0;
	#endif
}`,rv=`#define PHONG
varying vec3 vViewPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <envmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <shadowmap_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphinstance_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vViewPosition = - mvPosition.xyz;
	#include <worldpos_vertex>
	#include <envmap_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
}`,ov=`#define PHONG
uniform vec3 diffuse;
uniform vec3 emissive;
uniform vec3 specular;
uniform float shininess;
uniform float opacity;
#include <common>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <emissivemap_pars_fragment>
#include <cube_uv_reflection_fragment>
#include <envmap_common_pars_fragment>
#include <envmap_pars_fragment>
#include <envmap_physical_pars_fragment>
#include <fog_pars_fragment>
#include <bsdfs>
#include <lights_pars_begin>
#include <normal_pars_fragment>
#include <lights_phong_pars_fragment>
#include <shadowmap_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <specularmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	vec3 totalEmissiveRadiance = emissive;
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <specularmap_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	#include <emissivemap_fragment>
	#include <lights_phong_fragment>
	#include <lights_fragment_begin>
	#include <lights_fragment_maps>
	#include <lights_fragment_end>
	#include <aomap_fragment>
	vec3 outgoingLight = reflectedLight.directDiffuse + reflectedLight.indirectDiffuse + reflectedLight.directSpecular + reflectedLight.indirectSpecular + totalEmissiveRadiance;
	#include <envmap_fragment>
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,av=`#define STANDARD
varying vec3 vViewPosition;
#ifdef USE_TRANSMISSION
	varying vec3 vWorldPosition;
#endif
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <shadowmap_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vViewPosition = - mvPosition.xyz;
	#include <worldpos_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
#ifdef USE_TRANSMISSION
	vWorldPosition = worldPosition.xyz;
#endif
}`,lv=`#define STANDARD
#ifdef PHYSICAL
	#define IOR
	#define USE_SPECULAR
#endif
uniform vec3 diffuse;
uniform vec3 emissive;
uniform float roughness;
uniform float metalness;
uniform float opacity;
#ifdef IOR
	uniform float ior;
#endif
#ifdef USE_SPECULAR
	uniform float specularIntensity;
	uniform vec3 specularColor;
	#ifdef USE_SPECULAR_COLORMAP
		uniform sampler2D specularColorMap;
	#endif
	#ifdef USE_SPECULAR_INTENSITYMAP
		uniform sampler2D specularIntensityMap;
	#endif
#endif
#ifdef USE_CLEARCOAT
	uniform float clearcoat;
	uniform float clearcoatRoughness;
#endif
#ifdef USE_DISPERSION
	uniform float dispersion;
#endif
#ifdef USE_RETROREFLECTION
	uniform float retroreflectivity;
#endif
#ifdef USE_IRIDESCENCE
	uniform float iridescence;
	uniform float iridescenceIOR;
	uniform float iridescenceThicknessMinimum;
	uniform float iridescenceThicknessMaximum;
#endif
#ifdef USE_SHEEN
	uniform vec3 sheenColor;
	uniform float sheenRoughness;
	#ifdef USE_SHEEN_COLORMAP
		uniform sampler2D sheenColorMap;
	#endif
	#ifdef USE_SHEEN_ROUGHNESSMAP
		uniform sampler2D sheenRoughnessMap;
	#endif
#endif
#ifdef USE_ANISOTROPY
	uniform vec2 anisotropyVector;
	#ifdef USE_ANISOTROPYMAP
		uniform sampler2D anisotropyMap;
	#endif
#endif
varying vec3 vViewPosition;
#include <common>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <emissivemap_pars_fragment>
#include <iridescence_fragment>
#include <cube_uv_reflection_fragment>
#include <envmap_common_pars_fragment>
#include <envmap_physical_pars_fragment>
#include <fog_pars_fragment>
#include <lights_pars_begin>
#include <normal_pars_fragment>
#include <lights_physical_pars_fragment>
#include <transmission_pars_fragment>
#include <shadowmap_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <clearcoat_pars_fragment>
#include <iridescence_pars_fragment>
#include <roughnessmap_pars_fragment>
#include <metalnessmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	vec3 totalEmissiveRadiance = emissive;
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <roughnessmap_fragment>
	#include <metalnessmap_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	#include <clearcoat_normal_fragment_begin>
	#include <clearcoat_normal_fragment_maps>
	#include <emissivemap_fragment>
	#include <lights_physical_fragment>
	#include <lights_fragment_begin>
	#include <lights_fragment_maps>
	#include <lights_fragment_end>
	#include <aomap_fragment>
	vec3 totalDiffuse = reflectedLight.directDiffuse + reflectedLight.indirectDiffuse;
	vec3 totalSpecular = reflectedLight.directSpecular + reflectedLight.indirectSpecular;
	#include <transmission_fragment>
	vec3 outgoingLight = totalDiffuse + totalSpecular + totalEmissiveRadiance;
	#ifdef USE_SHEEN
 
		outgoingLight = outgoingLight + sheenSpecularDirect + sheenSpecularIndirect;
 
 	#endif
	#ifdef USE_CLEARCOAT
		float dotNVcc = saturate( dot( geometryClearcoatNormal, geometryViewDir ) );
		vec3 Fcc = F_Schlick( material.clearcoatF0, material.clearcoatF90, dotNVcc );
		outgoingLight = outgoingLight * ( 1.0 - material.clearcoat * Fcc ) + ( clearcoatSpecularDirect + clearcoatSpecularIndirect ) * material.clearcoat;
	#endif
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,cv=`#define TOON
varying vec3 vViewPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <shadowmap_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vViewPosition = - mvPosition.xyz;
	#include <worldpos_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
}`,hv=`#define TOON
uniform vec3 diffuse;
uniform vec3 emissive;
uniform float opacity;
#include <common>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <emissivemap_pars_fragment>
#include <gradientmap_pars_fragment>
#include <fog_pars_fragment>
#include <bsdfs>
#include <lights_pars_begin>
#include <normal_pars_fragment>
#include <lights_toon_pars_fragment>
#include <shadowmap_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	vec3 totalEmissiveRadiance = emissive;
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	#include <emissivemap_fragment>
	#include <lights_toon_fragment>
	#include <lights_fragment_begin>
	#include <lights_fragment_maps>
	#include <lights_fragment_end>
	#include <aomap_fragment>
	vec3 outgoingLight = reflectedLight.directDiffuse + reflectedLight.indirectDiffuse + totalEmissiveRadiance;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,uv=`uniform float size;
uniform float scale;
#include <common>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <morphtarget_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
#ifdef USE_POINTS_UV
	varying vec2 vUv;
	uniform mat3 uvTransform;
#endif
void main() {
	#ifdef USE_POINTS_UV
		vUv = ( uvTransform * vec3( uv, 1 ) ).xy;
	#endif
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <project_vertex>
	gl_PointSize = size;
	#ifdef USE_SIZEATTENUATION
		bool isPerspective = isPerspectiveMatrix( projectionMatrix );
		if ( isPerspective ) gl_PointSize *= ( scale / - mvPosition.z );
	#endif
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <worldpos_vertex>
	#include <fog_vertex>
}`,fv=`uniform vec3 diffuse;
uniform float opacity;
#include <common>
#include <color_pars_fragment>
#include <map_particle_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <fog_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	vec3 outgoingLight = vec3( 0.0 );
	#include <logdepthbuf_fragment>
	#include <map_particle_fragment>
	#include <color_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	outgoingLight = diffuseColor.rgb;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
}`,dv=`#include <common>
#include <batching_pars_vertex>
#include <fog_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <shadowmap_pars_vertex>
void main() {
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphinstance_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <worldpos_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
}`,pv=`uniform vec3 color;
uniform float opacity;
#include <common>
#include <fog_pars_fragment>
#include <bsdfs>
#include <lights_pars_begin>
#include <logdepthbuf_pars_fragment>
#include <shadowmap_pars_fragment>
#include <shadowmask_pars_fragment>
void main() {
	#include <logdepthbuf_fragment>
	gl_FragColor = vec4( color, opacity * ( 1.0 - getShadowMask() ) );
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
}`,mv=`uniform float rotation;
uniform vec2 center;
#include <common>
#include <uv_pars_vertex>
#include <fog_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	vec4 mvPosition = modelViewMatrix[ 3 ];
	vec2 scale = vec2( length( modelMatrix[ 0 ].xyz ), length( modelMatrix[ 1 ].xyz ) );
	#ifndef USE_SIZEATTENUATION
		bool isPerspective = isPerspectiveMatrix( projectionMatrix );
		if ( isPerspective ) scale *= - mvPosition.z;
	#endif
	vec2 alignedPosition = ( position.xy - ( center - vec2( 0.5 ) ) ) * scale;
	vec2 rotatedPosition;
	rotatedPosition.x = cos( rotation ) * alignedPosition.x - sin( rotation ) * alignedPosition.y;
	rotatedPosition.y = sin( rotation ) * alignedPosition.x + cos( rotation ) * alignedPosition.y;
	mvPosition.xy += rotatedPosition;
	gl_Position = projectionMatrix * mvPosition;
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <fog_vertex>
}`,gv=`uniform vec3 diffuse;
uniform float opacity;
#include <common>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <fog_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	vec3 outgoingLight = vec3( 0.0 );
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	outgoingLight = diffuseColor.rgb;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
}`,it={alphahash_fragment:Og,alphahash_pars_fragment:Bg,alphamap_fragment:kg,alphamap_pars_fragment:zg,alphatest_fragment:Hg,alphatest_pars_fragment:Vg,aomap_fragment:Gg,aomap_pars_fragment:Wg,batching_pars_vertex:Xg,batching_vertex:qg,begin_vertex:Yg,beginnormal_vertex:$g,bsdfs:Kg,iridescence_fragment:Jg,bumpmap_pars_fragment:Zg,clipping_planes_fragment:jg,clipping_planes_pars_fragment:Qg,clipping_planes_pars_vertex:e_,clipping_planes_vertex:t_,color_fragment:n_,color_pars_fragment:i_,color_pars_vertex:s_,color_vertex:r_,common:o_,cube_uv_reflection_fragment:a_,defaultnormal_vertex:l_,displacementmap_pars_vertex:c_,displacementmap_vertex:h_,emissivemap_fragment:u_,emissivemap_pars_fragment:f_,colorspace_fragment:d_,colorspace_pars_fragment:p_,envmap_fragment:m_,envmap_common_pars_fragment:g_,envmap_pars_fragment:__,envmap_pars_vertex:x_,envmap_physical_pars_fragment:C_,envmap_vertex:v_,fog_vertex:M_,fog_pars_vertex:y_,fog_fragment:S_,fog_pars_fragment:w_,gradientmap_pars_fragment:b_,lightmap_pars_fragment:T_,lights_lambert_fragment:E_,lights_lambert_pars_fragment:A_,lights_pars_begin:R_,lights_toon_fragment:P_,lights_toon_pars_fragment:I_,lights_phong_fragment:L_,lights_phong_pars_fragment:N_,lights_physical_fragment:D_,lights_physical_pars_fragment:U_,lights_fragment_begin:F_,lights_fragment_maps:O_,lights_fragment_end:B_,lightprobes_pars_fragment:k_,logdepthbuf_fragment:z_,logdepthbuf_pars_fragment:H_,logdepthbuf_pars_vertex:V_,logdepthbuf_vertex:G_,map_fragment:W_,map_pars_fragment:X_,map_particle_fragment:q_,map_particle_pars_fragment:Y_,metalnessmap_fragment:$_,metalnessmap_pars_fragment:K_,morphinstance_vertex:J_,morphcolor_vertex:Z_,morphnormal_vertex:j_,morphtarget_pars_vertex:Q_,morphtarget_vertex:ex,normal_fragment_begin:tx,normal_fragment_maps:nx,normal_pars_fragment:ix,normal_pars_vertex:sx,normal_vertex:rx,normalmap_pars_fragment:ox,clearcoat_normal_fragment_begin:ax,clearcoat_normal_fragment_maps:lx,clearcoat_pars_fragment:cx,iridescence_pars_fragment:hx,opaque_fragment:ux,packing:fx,premultiplied_alpha_fragment:dx,project_vertex:px,dithering_fragment:mx,dithering_pars_fragment:gx,roughnessmap_fragment:_x,roughnessmap_pars_fragment:xx,shadowmap_pars_fragment:vx,shadowmap_pars_vertex:Mx,shadowmap_vertex:yx,shadowmask_pars_fragment:Sx,skinbase_vertex:wx,skinning_pars_vertex:bx,skinning_vertex:Tx,skinnormal_vertex:Ex,specularmap_fragment:Ax,specularmap_pars_fragment:Rx,tonemapping_fragment:Cx,tonemapping_pars_fragment:Px,transmission_fragment:Ix,transmission_pars_fragment:Lx,uv_pars_fragment:Nx,uv_pars_vertex:Dx,uv_vertex:Ux,worldpos_vertex:Fx,background_vert:Ox,background_frag:Bx,backgroundCube_vert:kx,backgroundCube_frag:zx,cube_vert:Hx,cube_frag:Vx,depth_vert:Gx,depth_frag:Wx,distance_vert:Xx,distance_frag:qx,equirect_vert:Yx,equirect_frag:$x,linedashed_vert:Kx,linedashed_frag:Jx,meshbasic_vert:Zx,meshbasic_frag:jx,meshlambert_vert:Qx,meshlambert_frag:ev,meshmatcap_vert:tv,meshmatcap_frag:nv,meshnormal_vert:iv,meshnormal_frag:sv,meshphong_vert:rv,meshphong_frag:ov,meshphysical_vert:av,meshphysical_frag:lv,meshtoon_vert:cv,meshtoon_frag:hv,points_vert:uv,points_frag:fv,shadow_vert:dv,shadow_frag:pv,sprite_vert:mv,sprite_frag:gv},ye={common:{diffuse:{value:new Ne(16777215)},opacity:{value:1},map:{value:null},mapTransform:{value:new Ze},alphaMap:{value:null},alphaMapTransform:{value:new Ze},alphaTest:{value:0}},specularmap:{specularMap:{value:null},specularMapTransform:{value:new Ze}},envmap:{envMap:{value:null},envMapRotation:{value:new Ze},reflectivity:{value:1},ior:{value:1.5},refractionRatio:{value:.98},dfgLUT:{value:null}},aomap:{aoMap:{value:null},aoMapIntensity:{value:1},aoMapTransform:{value:new Ze}},lightmap:{lightMap:{value:null},lightMapIntensity:{value:1},lightMapTransform:{value:new Ze}},bumpmap:{bumpMap:{value:null},bumpMapTransform:{value:new Ze},bumpScale:{value:1}},normalmap:{normalMap:{value:null},normalMapTransform:{value:new Ze},normalScale:{value:new oe(1,1)}},displacementmap:{displacementMap:{value:null},displacementMapTransform:{value:new Ze},displacementScale:{value:1},displacementBias:{value:0}},emissivemap:{emissiveMap:{value:null},emissiveMapTransform:{value:new Ze}},metalnessmap:{metalnessMap:{value:null},metalnessMapTransform:{value:new Ze}},roughnessmap:{roughnessMap:{value:null},roughnessMapTransform:{value:new Ze}},gradientmap:{gradientMap:{value:null}},fog:{fogDensity:{value:25e-5},fogNear:{value:1},fogFar:{value:2e3},fogColor:{value:new Ne(16777215)}},lights:{ambientLightColor:{value:[]},lightProbe:{value:[]},sunLights:{value:[],properties:{direction:{},color:{}}},sunLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{}}},sunShadowMatrix:{value:[]},sunShadowCascade:{value:[]},directionalLights:{value:[],properties:{direction:{},color:{}}},directionalLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{}}},directionalShadowMatrix:{value:[]},spotLights:{value:[],properties:{color:{},position:{},direction:{},distance:{},coneCos:{},penumbraCos:{},decay:{}}},spotLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{}}},spotLightMap:{value:[]},spotLightMatrix:{value:[]},pointLights:{value:[],properties:{color:{},position:{},decay:{},distance:{}}},pointLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{},shadowCameraNear:{},shadowCameraFar:{}}},pointShadowMatrix:{value:[]},hemisphereLights:{value:[],properties:{direction:{},skyColor:{},groundColor:{}}},rectAreaLights:{value:[],properties:{color:{},position:{},width:{},height:{}}},ltc_1:{value:null},ltc_2:{value:null},probesSH:{value:null},probesMin:{value:new B},probesMax:{value:new B},probesResolution:{value:new B}},points:{diffuse:{value:new Ne(16777215)},opacity:{value:1},size:{value:1},scale:{value:1},map:{value:null},alphaMap:{value:null},alphaMapTransform:{value:new Ze},alphaTest:{value:0},uvTransform:{value:new Ze}},sprite:{diffuse:{value:new Ne(16777215)},opacity:{value:1},center:{value:new oe(.5,.5)},rotation:{value:0},map:{value:null},mapTransform:{value:new Ze},alphaMap:{value:null},alphaMapTransform:{value:new Ze},alphaTest:{value:0}}},ei={basic:{uniforms:an([ye.common,ye.specularmap,ye.envmap,ye.aomap,ye.lightmap,ye.fog]),vertexShader:it.meshbasic_vert,fragmentShader:it.meshbasic_frag},lambert:{uniforms:an([ye.common,ye.specularmap,ye.envmap,ye.aomap,ye.lightmap,ye.emissivemap,ye.bumpmap,ye.normalmap,ye.displacementmap,ye.fog,ye.lights,{emissive:{value:new Ne(0)},envMapIntensity:{value:1}}]),vertexShader:it.meshlambert_vert,fragmentShader:it.meshlambert_frag},phong:{uniforms:an([ye.common,ye.specularmap,ye.envmap,ye.aomap,ye.lightmap,ye.emissivemap,ye.bumpmap,ye.normalmap,ye.displacementmap,ye.fog,ye.lights,{emissive:{value:new Ne(0)},specular:{value:new Ne(1118481)},shininess:{value:30},envMapIntensity:{value:1}}]),vertexShader:it.meshphong_vert,fragmentShader:it.meshphong_frag},standard:{uniforms:an([ye.common,ye.envmap,ye.aomap,ye.lightmap,ye.emissivemap,ye.bumpmap,ye.normalmap,ye.displacementmap,ye.roughnessmap,ye.metalnessmap,ye.fog,ye.lights,{emissive:{value:new Ne(0)},roughness:{value:1},metalness:{value:0},envMapIntensity:{value:1}}]),vertexShader:it.meshphysical_vert,fragmentShader:it.meshphysical_frag},toon:{uniforms:an([ye.common,ye.aomap,ye.lightmap,ye.emissivemap,ye.bumpmap,ye.normalmap,ye.displacementmap,ye.gradientmap,ye.fog,ye.lights,{emissive:{value:new Ne(0)}}]),vertexShader:it.meshtoon_vert,fragmentShader:it.meshtoon_frag},matcap:{uniforms:an([ye.common,ye.bumpmap,ye.normalmap,ye.displacementmap,ye.fog,{matcap:{value:null}}]),vertexShader:it.meshmatcap_vert,fragmentShader:it.meshmatcap_frag},points:{uniforms:an([ye.points,ye.fog]),vertexShader:it.points_vert,fragmentShader:it.points_frag},dashed:{uniforms:an([ye.common,ye.fog,{scale:{value:1},dashSize:{value:1},totalSize:{value:2}}]),vertexShader:it.linedashed_vert,fragmentShader:it.linedashed_frag},depth:{uniforms:an([ye.common,ye.displacementmap]),vertexShader:it.depth_vert,fragmentShader:it.depth_frag},normal:{uniforms:an([ye.common,ye.bumpmap,ye.normalmap,ye.displacementmap,{opacity:{value:1}}]),vertexShader:it.meshnormal_vert,fragmentShader:it.meshnormal_frag},sprite:{uniforms:an([ye.sprite,ye.fog]),vertexShader:it.sprite_vert,fragmentShader:it.sprite_frag},background:{uniforms:{uvTransform:{value:new Ze},t2D:{value:null},backgroundIntensity:{value:1}},vertexShader:it.background_vert,fragmentShader:it.background_frag},backgroundCube:{uniforms:{envMap:{value:null},backgroundBlurriness:{value:0},backgroundIntensity:{value:1},backgroundRotation:{value:new Ze}},vertexShader:it.backgroundCube_vert,fragmentShader:it.backgroundCube_frag},cube:{uniforms:{tCube:{value:null},tFlip:{value:-1},opacity:{value:1}},vertexShader:it.cube_vert,fragmentShader:it.cube_frag},equirect:{uniforms:{tEquirect:{value:null}},vertexShader:it.equirect_vert,fragmentShader:it.equirect_frag},distance:{uniforms:an([ye.common,ye.displacementmap,{referencePosition:{value:new B},nearDistance:{value:1},farDistance:{value:1e3}}]),vertexShader:it.distance_vert,fragmentShader:it.distance_frag},shadow:{uniforms:an([ye.lights,ye.fog,{color:{value:new Ne(0)},opacity:{value:1}}]),vertexShader:it.shadow_vert,fragmentShader:it.shadow_frag}};ei.physical={uniforms:an([ei.standard.uniforms,{clearcoat:{value:0},clearcoatMap:{value:null},clearcoatMapTransform:{value:new Ze},clearcoatNormalMap:{value:null},clearcoatNormalMapTransform:{value:new Ze},clearcoatNormalScale:{value:new oe(1,1)},clearcoatRoughness:{value:0},clearcoatRoughnessMap:{value:null},clearcoatRoughnessMapTransform:{value:new Ze},dispersion:{value:0},retroreflectivity:{value:0},iridescence:{value:0},iridescenceMap:{value:null},iridescenceMapTransform:{value:new Ze},iridescenceIOR:{value:1.3},iridescenceThicknessMinimum:{value:100},iridescenceThicknessMaximum:{value:400},iridescenceThicknessMap:{value:null},iridescenceThicknessMapTransform:{value:new Ze},sheen:{value:0},sheenColor:{value:new Ne(0)},sheenColorMap:{value:null},sheenColorMapTransform:{value:new Ze},sheenRoughness:{value:1},sheenRoughnessMap:{value:null},sheenRoughnessMapTransform:{value:new Ze},transmission:{value:0},transmissionMap:{value:null},transmissionMapTransform:{value:new Ze},transmissionSamplerSize:{value:new oe},transmissionSamplerMap:{value:null},thickness:{value:0},thicknessMap:{value:null},thicknessMapTransform:{value:new Ze},attenuationDistance:{value:0},attenuationColor:{value:new Ne(0)},specularColor:{value:new Ne(1,1,1)},specularColorMap:{value:null},specularColorMapTransform:{value:new Ze},specularIntensity:{value:1},specularIntensityMap:{value:null},specularIntensityMapTransform:{value:new Ze},anisotropyVector:{value:new oe},anisotropyMap:{value:null},anisotropyMapTransform:{value:new Ze}}]),vertexShader:it.meshphysical_vert,fragmentShader:it.meshphysical_frag};const ko={r:0,b:0,g:0},_v=new Qe,$d=new Ze;$d.set(-1,0,0,0,1,0,0,0,1);function xv(i,e,t,n,s,r){const o=new Ne(0);let a=s===!0?0:1,c,l,h=null,u=0,f=null;function d(M){let b=M.isScene===!0?M.background:null;if(b&&b.isTexture){const v=M.backgroundBlurriness>0;b=e.get(b,v)}return b}function p(M){let b=!1;const v=d(M);v===null?g(o,a):v&&v.isColor&&(g(v,1),b=!0);const w=i.xr.getEnvironmentBlendMode();w==="additive"?t.buffers.color.setClear(0,0,0,1,r):w==="alpha-blend"&&t.buffers.color.setClear(0,0,0,0,r),(i.autoClear||b)&&(t.buffers.depth.setTest(!0),t.buffers.depth.setMask(!0),t.buffers.color.setMask(!0),i.clear(i.autoClearColor,i.autoClearDepth,i.autoClearStencil))}function _(M,b){const v=d(b);v&&(v.isCubeTexture||v.mapping===Ta)?(l===void 0&&(l=new K(new He(1,1,1),new en({name:"BackgroundCubeMaterial",uniforms:nr(ei.backgroundCube.uniforms),vertexShader:ei.backgroundCube.vertexShader,fragmentShader:ei.backgroundCube.fragmentShader,side:un,depthTest:!1,depthWrite:!1,fog:!1,allowOverride:!1})),l.geometry.deleteAttribute("normal"),l.geometry.deleteAttribute("uv"),l.onBeforeRender=function(w,S,T){this.matrixWorld.copyPosition(T.matrixWorld)},Object.defineProperty(l.material,"envMap",{get:function(){return this.uniforms.envMap.value}}),n.update(l)),l.material.uniforms.envMap.value=v,l.material.uniforms.backgroundBlurriness.value=b.backgroundBlurriness,l.material.uniforms.backgroundIntensity.value=b.backgroundIntensity,l.material.uniforms.backgroundRotation.value.setFromMatrix4(_v.makeRotationFromEuler(b.backgroundRotation)).transpose(),v.isCubeTexture&&v.isRenderTargetTexture===!1&&l.material.uniforms.backgroundRotation.value.premultiply($d),l.material.toneMapped=at.getTransfer(v.colorSpace)!==_t,(h!==v||u!==v.version||f!==i.toneMapping)&&(l.material.needsUpdate=!0,h=v,u=v.version,f=i.toneMapping),l.layers.enableAll(),M.unshift(l,l.geometry,l.material,0,0,null)):v&&v.isTexture&&(c===void 0&&(c=new K(new Ot(2,2),new en({name:"BackgroundMaterial",uniforms:nr(ei.background.uniforms),vertexShader:ei.background.vertexShader,fragmentShader:ei.background.fragmentShader,side:Xi,depthTest:!1,depthWrite:!1,fog:!1,allowOverride:!1})),c.geometry.deleteAttribute("normal"),Object.defineProperty(c.material,"map",{get:function(){return this.uniforms.t2D.value}}),n.update(c)),c.material.uniforms.t2D.value=v,c.material.uniforms.backgroundIntensity.value=b.backgroundIntensity,c.material.toneMapped=at.getTransfer(v.colorSpace)!==_t,v.matrixAutoUpdate===!0&&v.updateMatrix(),c.material.uniforms.uvTransform.value.copy(v.matrix),(h!==v||u!==v.version||f!==i.toneMapping)&&(c.material.needsUpdate=!0,h=v,u=v.version,f=i.toneMapping),c.layers.enableAll(),M.unshift(c,c.geometry,c.material,0,0,null))}function g(M,b){M.getRGB(ko,Hd(i)),t.buffers.color.setClear(ko.r,ko.g,ko.b,b,r)}function m(){l!==void 0&&(l.geometry.dispose(),l.material.dispose(),l=void 0),c!==void 0&&(c.geometry.dispose(),c.material.dispose(),c=void 0)}return{getClearColor:function(){return o},setClearColor:function(M,b=1){o.set(M),a=b,g(o,a)},getClearAlpha:function(){return a},setClearAlpha:function(M){a=M,g(o,a)},render:p,addToRenderList:_,dispose:m}}function vv(i,e){const t=i.getParameter(i.MAX_VERTEX_ATTRIBS),n={},s=f(null);let r=s,o=!1;function a(P,F,A,I,O){let H=!1;const C=u(P,I,A,F);r!==C&&(r=C,l(r.object)),H=d(P,I,A,O),H&&p(P,I,A,O),O!==null&&e.update(O,i.ELEMENT_ARRAY_BUFFER),(H||o)&&(o=!1,v(P,F,A,I),O!==null&&i.bindBuffer(i.ELEMENT_ARRAY_BUFFER,e.get(O).buffer))}function c(){return i.createVertexArray()}function l(P){return i.bindVertexArray(P)}function h(P){return i.deleteVertexArray(P)}function u(P,F,A,I){const O=I.wireframe===!0;let H=n[F.id];H===void 0&&(H={},n[F.id]=H);const C=P.isInstancedMesh===!0?P.id:0;let N=H[C];N===void 0&&(N={},H[C]=N);let U=N[A.id];U===void 0&&(U={},N[A.id]=U);let k=U[O];return k===void 0&&(k=f(c()),U[O]=k),k}function f(P){const F=[],A=[],I=[];for(let O=0;O<t;O++)F[O]=0,A[O]=0,I[O]=0;return{geometry:null,program:null,wireframe:!1,newAttributes:F,enabledAttributes:A,attributeDivisors:I,object:P,attributes:{},index:null}}function d(P,F,A,I){const O=r.attributes,H=F.attributes;let C=0;const N=A.getAttributes();for(const U in N)if(N[U].location>=0){const V=O[U];let ee=H[U];if(ee===void 0&&(U==="instanceMatrix"&&P.instanceMatrix&&(ee=P.instanceMatrix),U==="instanceColor"&&P.instanceColor&&(ee=P.instanceColor)),V===void 0||V.attribute!==ee||ee&&V.data!==ee.data)return!0;C++}return r.attributesNum!==C||r.index!==I}function p(P,F,A,I){const O={},H=F.attributes;let C=0;const N=A.getAttributes();for(const U in N)if(N[U].location>=0){let V=H[U];V===void 0&&(U==="instanceMatrix"&&P.instanceMatrix&&(V=P.instanceMatrix),U==="instanceColor"&&P.instanceColor&&(V=P.instanceColor));const ee={};ee.attribute=V,V&&V.data&&(ee.data=V.data),O[U]=ee,C++}r.attributes=O,r.attributesNum=C,r.index=I}function _(){const P=r.newAttributes;for(let F=0,A=P.length;F<A;F++)P[F]=0}function g(P){m(P,0)}function m(P,F){const A=r.newAttributes,I=r.enabledAttributes,O=r.attributeDivisors;A[P]=1,I[P]===0&&(i.enableVertexAttribArray(P),I[P]=1),O[P]!==F&&(i.vertexAttribDivisor(P,F),O[P]=F)}function M(){const P=r.newAttributes,F=r.enabledAttributes;for(let A=0,I=F.length;A<I;A++)F[A]!==P[A]&&(i.disableVertexAttribArray(A),F[A]=0)}function b(P,F,A,I,O,H,C){C===!0?i.vertexAttribIPointer(P,F,A,O,H):i.vertexAttribPointer(P,F,A,I,O,H)}function v(P,F,A,I){_();const O=I.attributes,H=A.getAttributes(),C=F.defaultAttributeValues;for(const N in H){const U=H[N];if(U.location>=0){let k=O[N];if(k===void 0&&(N==="instanceMatrix"&&P.instanceMatrix&&(k=P.instanceMatrix),N==="instanceColor"&&P.instanceColor&&(k=P.instanceColor)),k!==void 0){const V=k.normalized,ee=k.itemSize,re=e.get(k);if(re===void 0)continue;const Se=re.buffer,be=re.type,Ve=re.bytesPerElement,J=be===i.INT||be===i.UNSIGNED_INT||k.gpuType===Gc;if(k.isInterleavedBufferAttribute){const j=k.data,de=j.stride,Ue=k.offset;if(j.isInstancedInterleavedBuffer){for(let ve=0;ve<U.locationSize;ve++)m(U.location+ve,j.meshPerAttribute);P.isInstancedMesh!==!0&&I._maxInstanceCount===void 0&&(I._maxInstanceCount=j.meshPerAttribute*j.count)}else for(let ve=0;ve<U.locationSize;ve++)g(U.location+ve);i.bindBuffer(i.ARRAY_BUFFER,Se);for(let ve=0;ve<U.locationSize;ve++)b(U.location+ve,ee/U.locationSize,be,V,de*Ve,(Ue+ee/U.locationSize*ve)*Ve,J)}else{if(k.isInstancedBufferAttribute){for(let j=0;j<U.locationSize;j++)m(U.location+j,k.meshPerAttribute);P.isInstancedMesh!==!0&&I._maxInstanceCount===void 0&&(I._maxInstanceCount=k.meshPerAttribute*k.count)}else for(let j=0;j<U.locationSize;j++)g(U.location+j);i.bindBuffer(i.ARRAY_BUFFER,Se);for(let j=0;j<U.locationSize;j++)b(U.location+j,ee/U.locationSize,be,V,ee*Ve,ee/U.locationSize*j*Ve,J)}}else if(C!==void 0){const V=C[N];if(V!==void 0)switch(V.length){case 2:i.vertexAttrib2fv(U.location,V);break;case 3:i.vertexAttrib3fv(U.location,V);break;case 4:i.vertexAttrib4fv(U.location,V);break;default:i.vertexAttrib1fv(U.location,V)}}}}M()}function w(){R();for(const P in n){const F=n[P];for(const A in F){const I=F[A];for(const O in I){const H=I[O];for(const C in H)h(H[C].object),delete H[C];delete I[O]}}delete n[P]}}function S(P){if(n[P.id]===void 0)return;const F=n[P.id];for(const A in F){const I=F[A];for(const O in I){const H=I[O];for(const C in H)h(H[C].object),delete H[C];delete I[O]}}delete n[P.id]}function T(P){for(const F in n){const A=n[F];for(const I in A){const O=A[I];if(O[P.id]===void 0)continue;const H=O[P.id];for(const C in H)h(H[C].object),delete H[C];delete O[P.id]}}}function x(P){for(const F in n){const A=n[F],I=P.isInstancedMesh===!0?P.id:0,O=A[I];if(O!==void 0){for(const H in O){const C=O[H];for(const N in C)h(C[N].object),delete C[N];delete O[H]}delete A[I],Object.keys(A).length===0&&delete n[F]}}}function R(){D(),o=!0,r!==s&&(r=s,l(r.object))}function D(){s.geometry=null,s.program=null,s.wireframe=!1}return{setup:a,reset:R,resetDefaultState:D,dispose:w,releaseStatesOfGeometry:S,releaseStatesOfObject:x,releaseStatesOfProgram:T,initAttributes:_,enableAttribute:g,disableUnusedAttributes:M}}function Mv(i,e,t){let n;function s(c){n=c}function r(c,l){i.drawArrays(n,c,l),t.update(l,n,1)}function o(c,l,h){h!==0&&(i.drawArraysInstanced(n,c,l,h),t.update(l,n,h))}function a(c,l,h){if(h===0)return;e.get("WEBGL_multi_draw").multiDrawArraysWEBGL(n,c,0,l,0,h);let f=0;for(let d=0;d<h;d++)f+=l[d];t.update(f,n,1)}this.setMode=s,this.render=r,this.renderInstances=o,this.renderMultiDraw=a}function yv(i,e,t,n){let s;function r(){if(s!==void 0)return s;if(e.has("EXT_texture_filter_anisotropic")===!0){const T=e.get("EXT_texture_filter_anisotropic");s=i.getParameter(T.MAX_TEXTURE_MAX_ANISOTROPY_EXT)}else s=0;return s}function o(T){return!(T!==Ln&&n.convert(T)!==i.getParameter(i.IMPLEMENTATION_COLOR_READ_FORMAT))}function a(T){const x=T===fn&&(e.has("EXT_color_buffer_half_float")||e.has("EXT_color_buffer_float"));return!(T!==xn&&T!==In&&!x&&n.convert(T)!==i.getParameter(i.IMPLEMENTATION_COLOR_READ_TYPE))}function c(T){if(T==="highp"){if(i.getShaderPrecisionFormat(i.VERTEX_SHADER,i.HIGH_FLOAT).precision>0&&i.getShaderPrecisionFormat(i.FRAGMENT_SHADER,i.HIGH_FLOAT).precision>0)return"highp";T="mediump"}return T==="mediump"&&i.getShaderPrecisionFormat(i.VERTEX_SHADER,i.MEDIUM_FLOAT).precision>0&&i.getShaderPrecisionFormat(i.FRAGMENT_SHADER,i.MEDIUM_FLOAT).precision>0?"mediump":"lowp"}let l=t.precision!==void 0?t.precision:"highp";const h=c(l);h!==l&&(Oe("WebGLRenderer:",l,"not supported, using",h,"instead."),l=h);const u=t.logarithmicDepthBuffer===!0,f=t.reversedDepthBuffer===!0&&e.has("EXT_clip_control");t.reversedDepthBuffer===!0&&f===!1&&Oe("WebGLRenderer: Unable to use reversed depth buffer due to missing EXT_clip_control extension. Fallback to default depth buffer.");const d=i.getParameter(i.MAX_TEXTURE_IMAGE_UNITS),p=i.getParameter(i.MAX_VERTEX_TEXTURE_IMAGE_UNITS),_=i.getParameter(i.MAX_TEXTURE_SIZE),g=i.getParameter(i.MAX_CUBE_MAP_TEXTURE_SIZE),m=i.getParameter(i.MAX_VERTEX_ATTRIBS),M=i.getParameter(i.MAX_VERTEX_UNIFORM_VECTORS),b=i.getParameter(i.MAX_VARYING_VECTORS),v=i.getParameter(i.MAX_FRAGMENT_UNIFORM_VECTORS),w=i.getParameter(i.MAX_SAMPLES),S=i.getParameter(i.SAMPLES);return{isWebGL2:!0,getMaxAnisotropy:r,getMaxPrecision:c,textureFormatReadable:o,textureTypeReadable:a,precision:l,logarithmicDepthBuffer:u,reversedDepthBuffer:f,maxTextures:d,maxVertexTextures:p,maxTextureSize:_,maxCubemapSize:g,maxAttributes:m,maxVertexUniforms:M,maxVaryings:b,maxFragmentUniforms:v,maxSamples:w,samples:S}}function Sv(i){const e=this;let t=null,n=0,s=!1,r=!1;const o=new ki,a=new Ze,c={value:null,needsUpdate:!1};this.uniform=c,this.numPlanes=0,this.numIntersection=0,this.init=function(u,f){const d=u.length!==0||f||n!==0||s;return s=f,n=u.length,d},this.beginShadows=function(){r=!0,h(null)},this.endShadows=function(){r=!1},this.setGlobalState=function(u,f){t=h(u,f,0)},this.setState=function(u,f,d){const p=u.clippingPlanes,_=u.clipIntersection,g=u.clipShadows,m=i.get(u);if(!s||p===null||p.length===0||r&&!g)r?h(null):l();else{const M=r?0:n,b=M*4;let v=m.clippingState||null;c.value=v,v=h(p,f,b,d);for(let w=0;w!==b;++w)v[w]=t[w];m.clippingState=v,this.numIntersection=_?this.numPlanes:0,this.numPlanes+=M}};function l(){c.value!==t&&(c.value=t,c.needsUpdate=n>0),e.numPlanes=n,e.numIntersection=0}function h(u,f,d,p){const _=u!==null?u.length:0;let g=null;if(_!==0){if(g=c.value,p!==!0||g===null){const m=d+_*4,M=f.matrixWorldInverse;a.getNormalMatrix(M),(g===null||g.length<m)&&(g=new Float32Array(m));for(let b=0,v=d;b!==_;++b,v+=4)o.copy(u[b]).applyMatrix4(M,a),o.normal.toArray(g,v),g[v+3]=o.constant}c.value=g,c.needsUpdate=!0}return e.numPlanes=_,e.numIntersection=0,g}}const Hs=4,wv=6,bv=20,Tv=256,Mr=new so,Ku=new Ne;let pl=null,ml=0,gl=0,_l=!1;const Ev=new B,Qi=new B;class Ju{constructor(e){this._renderer=e,this._pingPongRenderTarget=null,this._lodMax=0,this._cubeSize=0,this._sizeLods=[],this._lodMeshes=[],this._backgroundBox=null,this._cubemapMaterial=null,this._equirectMaterial=null,this._blurMaterial=null,this._ggxMaterial=null}fromScene(e,t=0,n=.1,s=100,r={}){const{size:o=256,position:a=Ev}=r;pl=this._renderer.getRenderTarget(),ml=this._renderer.getActiveCubeFace(),gl=this._renderer.getActiveMipmapLevel(),_l=this._renderer.xr.enabled,this._renderer.xr.enabled=!1,this._setSize(o);const c=this._allocateTargets();return c.depthBuffer=!0,this._sceneToCubeUV(e,n,s,c,a),t>0&&this._blur(c,0,0,t),this._applyPMREM(c),this._cleanup(c),c}fromEquirectangular(e,t=null){return this._fromTexture(e,t)}fromCubemap(e,t=null){return this._fromTexture(e,t)}compileCubemapShader(){this._cubemapMaterial===null&&(this._cubemapMaterial=Qu(),this._compileMaterial(this._cubemapMaterial))}compileEquirectangularShader(){this._equirectMaterial===null&&(this._equirectMaterial=ju(),this._compileMaterial(this._equirectMaterial))}dispose(){this._dispose(),this._cubemapMaterial!==null&&this._cubemapMaterial.dispose(),this._equirectMaterial!==null&&this._equirectMaterial.dispose(),this._backgroundBox!==null&&(this._backgroundBox.geometry.dispose(),this._backgroundBox.material.dispose())}_setSize(e){this._lodMax=Math.floor(Math.log2(e)),this._cubeSize=Math.pow(2,this._lodMax)}_dispose(){this._blurMaterial!==null&&this._blurMaterial.dispose(),this._ggxMaterial!==null&&this._ggxMaterial.dispose(),this._pingPongRenderTarget!==null&&this._pingPongRenderTarget.dispose();for(let e=0;e<this._lodMeshes.length;e++)this._lodMeshes[e].geometry.dispose()}_cleanup(e){this._renderer.setRenderTarget(pl,ml,gl),this._renderer.xr.enabled=_l,e.scissorTest=!1,Ds(e,0,0,e.width,e.height)}_fromTexture(e,t){e.mapping===ls||e.mapping===Qs?this._setSize(e.image.length===0?16:e.image[0].width||e.image[0].image.width):this._setSize(e.image.width/4),pl=this._renderer.getRenderTarget(),ml=this._renderer.getActiveCubeFace(),gl=this._renderer.getActiveMipmapLevel(),_l=this._renderer.xr.enabled,this._renderer.xr.enabled=!1;const n=t||this._allocateTargets();return this._textureToCubeUV(e,n),this._applyPMREM(n),this._cleanup(n),n}_allocateTargets(){const e=3*Math.max(this._cubeSize,112),t=4*this._cubeSize,n={magFilter:zt,minFilter:zt,generateMipmaps:!1,type:fn,format:Ln,colorSpace:yn,depthBuffer:!1},s=Zu(e,t,n);if(this._pingPongRenderTarget===null||this._pingPongRenderTarget.width!==e||this._pingPongRenderTarget.height!==t){this._pingPongRenderTarget!==null&&this._dispose(),this._pingPongRenderTarget=Zu(e,t,n);const{_lodMax:r}=this;({lodMeshes:this._lodMeshes,sizeLods:this._sizeLods}=Av(r)),this._blurMaterial=Cv(r,e,t),this._ggxMaterial=Rv(r,e,t)}return s}_compileMaterial(e){const t=new K(new Mt,e);this._renderer.compile(t,Mr)}_sceneToCubeUV(e,t,n,s,r){const c=new jt(90,1,t,n),l=[1,-1,1,1,1,1],h=[1,1,1,-1,-1,-1],u=this._renderer,f=u.autoClear,d=u.toneMapping;u.getClearColor(Ku),u.toneMapping=ai,u.autoClear=!1,u.state.buffers.depth.getReversed()&&(u.setRenderTarget(s),u.clearDepth(),u.setRenderTarget(null)),this._backgroundBox===null&&(this._backgroundBox=new K(new He,new vn({name:"PMREM.Background",side:un,depthWrite:!1,depthTest:!1})));const _=this._backgroundBox,g=_.material;let m=!1;const M=e.background;M?M.isColor&&(g.color.copy(M),e.background=null,m=!0):(g.color.copy(Ku),m=!0);for(let b=0;b<6;b++){const v=b%3;v===0?(c.up.set(0,l[b],0),c.position.set(r.x,r.y,r.z),c.lookAt(r.x+h[b],r.y,r.z)):v===1?(c.up.set(0,0,l[b]),c.position.set(r.x,r.y,r.z),c.lookAt(r.x,r.y+h[b],r.z)):(c.up.set(0,l[b],0),c.position.set(r.x,r.y,r.z),c.lookAt(r.x,r.y,r.z+h[b]));const w=this._cubeSize;Ds(s,v*w,b>2?w:0,w,w),u.setRenderTarget(s),m&&u.render(_,c),u.render(e,c)}u.toneMapping=d,u.autoClear=f,e.background=M}_textureToCubeUV(e,t){const n=this._renderer,s=e.mapping===ls||e.mapping===Qs;s?(this._cubemapMaterial===null&&(this._cubemapMaterial=Qu()),this._cubemapMaterial.uniforms.flipEnvMap.value=e.isRenderTargetTexture===!1?-1:1):this._equirectMaterial===null&&(this._equirectMaterial=ju());const r=s?this._cubemapMaterial:this._equirectMaterial,o=this._lodMeshes[0];o.material=r;const a=r.uniforms;a.envMap.value=e;const c=this._cubeSize;Ds(t,0,0,3*c,2*c),n.setRenderTarget(t),n.render(o,Mr)}_applyPMREM(e){const t=this._renderer,n=t.autoClear;t.autoClear=!1;const s=this._lodMeshes.length;for(let r=1;r<s;r++)this._applyGGXFilter(e,r-1,r);t.autoClear=n}_applyGGXFilter(e,t,n){const s=this._renderer,r=this._pingPongRenderTarget,o=this._ggxMaterial,a=this._lodMeshes[n];a.material=o;const c=o.uniforms,l=n/(this._lodMeshes.length-1),h=t/(this._lodMeshes.length-1),u=Math.sqrt(l*l-h*h),f=l*1.25,d=u*f,{_lodMax:p}=this,_=this._sizeLods[n],g=3*_*(n>p-Hs?n-p+Hs:0),m=4*(this._cubeSize-_);c.envMap.value=e.texture,c.roughness.value=d,c.mipInt.value=p-t,Ds(r,g,m,3*_,2*_),s.setRenderTarget(r),s.render(a,Mr),c.envMap.value=r.texture,c.roughness.value=0,c.mipInt.value=p-n,Ds(e,g,m,3*_,2*_),s.setRenderTarget(e),s.render(a,Mr)}_blur(e,t,n,s){const r=this._pingPongRenderTarget,o=Math.min(s,Math.PI)/Math.SQRT2;this._blurPass(e,r,t,n,o),this._blurPass(r,e,n,n,o)}_blurPass(e,t,n,s,r){const o=this._renderer,a=this._blurMaterial,c=this._lodMeshes[s];c.material=a;const l=a.uniforms;l.envMap.value=e.texture,l.sigma.value=r,l.mipInt.value=this._lodMax-n;const h=this._sizeLods[s],u=3*h*(s>this._lodMax-Hs?s-this._lodMax+Hs:0),f=4*(this._cubeSize-h);Ds(t,u,f,3*h,2*h),o.setRenderTarget(t),o.render(c,Mr)}}function Av(i){const e=[],t=[];let n=i;const s=i-Hs+1+wv;for(let r=0;r<s;r++){const o=Math.pow(2,n);e.push(o);const a=1/(o-2),c=-a,l=1+a,h=[c,c,l,c,l,l,c,c,l,l,c,l],u=6,f=6,d=3,p=new Float32Array(d*f*u),_=new Float32Array(d*f*u);for(let m=0;m<u;m++){const M=m%3*2/3-1,b=m>2?0:-1,v=[M,b,0,M+2/3,b,0,M+2/3,b+1,0,M,b,0,M+2/3,b+1,0,M,b+1,0];p.set(v,d*f*m);for(let w=0;w<f;w++){const S=h[w*2]*2-1,T=h[w*2+1]*2-1;m===0?Qi.set(1,T,S):m===1?Qi.set(-S,1,-T):m===2?Qi.set(-S,T,1):m===3?Qi.set(-1,T,-S):m===4?Qi.set(-S,-1,T):Qi.set(S,T,-1),Qi.toArray(_,(m*f+w)*d)}}const g=new Mt;g.setAttribute("position",new qt(p,d)),g.setAttribute("outputDirection",new qt(_,d)),t.push(new K(g,null)),n>Hs&&n--}return{lodMeshes:t,sizeLods:e}}function Zu(i,e,t){const n=new cn(i,e,t);return n.texture.mapping=Ta,n.texture.name="PMREM.cubeUv",n.scissorTest=!0,n}function Ds(i,e,t,n,s){i.viewport.set(e,t,n,s),i.scissor.set(e,t,n,s)}function Rv(i,e,t){return new en({name:"PMREMGGXConvolution",defines:{GGX_SAMPLES:Tv,CUBEUV_TEXEL_WIDTH:1/e,CUBEUV_TEXEL_HEIGHT:1/t,CUBEUV_MAX_MIP:`${i}.0`},uniforms:{envMap:{value:null},roughness:{value:0},mipInt:{value:0}},vertexShader:Ra(),fragmentShader:`

			precision highp float;
			precision highp int;

			varying vec3 vOutputDirection;

			uniform sampler2D envMap;
			uniform float roughness;
			uniform float mipInt;

			#define ENVMAP_TYPE_CUBE_UV
			#include <cube_uv_reflection_fragment>

			#define PI 3.14159265359

			// Van der Corput radical inverse
			float radicalInverse_VdC(uint bits) {
				bits = (bits << 16u) | (bits >> 16u);
				bits = ((bits & 0x55555555u) << 1u) | ((bits & 0xAAAAAAAAu) >> 1u);
				bits = ((bits & 0x33333333u) << 2u) | ((bits & 0xCCCCCCCCu) >> 2u);
				bits = ((bits & 0x0F0F0F0Fu) << 4u) | ((bits & 0xF0F0F0F0u) >> 4u);
				bits = ((bits & 0x00FF00FFu) << 8u) | ((bits & 0xFF00FF00u) >> 8u);
				return float(bits) * 2.3283064365386963e-10; // / 0x100000000
			}

			// Hammersley sequence
			vec2 hammersley(uint i, uint N) {
				return vec2(float(i) / float(N), radicalInverse_VdC(i));
			}

			// GGX VNDF importance sampling (Eric Heitz 2018)
			// "Sampling the GGX Distribution of Visible Normals"
			// https://jcgt.org/published/0007/04/01/
			vec3 importanceSampleGGX_VNDF(vec2 Xi, vec3 V, float roughness) {
				float alpha = roughness * roughness;

				// Section 4.1: Orthonormal basis
				vec3 T1 = vec3(1.0, 0.0, 0.0);
				vec3 T2 = cross(V, T1);

				// Section 4.2: Parameterization of projected area
				float r = sqrt(Xi.x);
				float phi = 2.0 * PI * Xi.y;
				float t1 = r * cos(phi);
				float t2 = r * sin(phi);
				float s = 0.5 * (1.0 + V.z);
				t2 = (1.0 - s) * sqrt(1.0 - t1 * t1) + s * t2;

				// Section 4.3: Reprojection onto hemisphere
				vec3 Nh = t1 * T1 + t2 * T2 + sqrt(max(0.0, 1.0 - t1 * t1 - t2 * t2)) * V;

				// Section 3.4: Transform back to ellipsoid configuration
				return normalize(vec3(alpha * Nh.x, alpha * Nh.y, max(0.0, Nh.z)));
			}

			void main() {
				vec3 N = normalize(vOutputDirection);
				vec3 V = N; // Assume view direction equals normal for pre-filtering

				vec3 prefilteredColor = vec3(0.0);
				float totalWeight = 0.0;

				// For very low roughness, just sample the environment directly
				if (roughness < 0.001) {
					gl_FragColor = vec4(bilinearCubeUV(envMap, N, mipInt), 1.0);
					return;
				}

				// Tangent space basis for VNDF sampling
				vec3 up = abs(N.z) < 0.999 ? vec3(0.0, 0.0, 1.0) : vec3(1.0, 0.0, 0.0);
				vec3 tangent = normalize(cross(up, N));
				vec3 bitangent = cross(N, tangent);

				for(uint i = 0u; i < uint(GGX_SAMPLES); i++) {
					vec2 Xi = hammersley(i, uint(GGX_SAMPLES));

					// For PMREM, V = N, so in tangent space V is always (0, 0, 1)
					vec3 H_tangent = importanceSampleGGX_VNDF(Xi, vec3(0.0, 0.0, 1.0), roughness);

					// Transform H back to world space
					vec3 H = normalize(tangent * H_tangent.x + bitangent * H_tangent.y + N * H_tangent.z);
					vec3 L = normalize(2.0 * dot(V, H) * H - V);

					float NdotL = max(dot(N, L), 0.0);

					if(NdotL > 0.0) {
						// Sample environment at fixed mip level
						// VNDF importance sampling handles the distribution filtering
						vec3 sampleColor = bilinearCubeUV(envMap, L, mipInt);

						// Weight by NdotL for the split-sum approximation
						// VNDF PDF naturally accounts for the visible microfacet distribution
						prefilteredColor += sampleColor * NdotL;
						totalWeight += NdotL;
					}
				}

				if (totalWeight > 0.0) {
					prefilteredColor = prefilteredColor / totalWeight;
				}

				gl_FragColor = vec4(prefilteredColor, 1.0);
			}
		`,blending:oi,depthTest:!1,depthWrite:!1})}function Cv(i,e,t){return new en({name:"SphericalGaussianBlur",defines:{SAMPLES:bv,CUBEUV_TEXEL_WIDTH:1/e,CUBEUV_TEXEL_HEIGHT:1/t,CUBEUV_MAX_MIP:`${i}.0`},uniforms:{envMap:{value:null},sigma:{value:0},mipInt:{value:0}},vertexShader:Ra(),fragmentShader:`

			precision highp float;
			precision highp int;

			varying vec3 vOutputDirection;

			uniform sampler2D envMap;
			uniform float sigma;
			uniform float mipInt;

			#define ENVMAP_TYPE_CUBE_UV
			#include <cube_uv_reflection_fragment>

			#define PI 3.14159265359
			#define GOLDEN_ANGLE 2.39996322973

			void main() {

				if ( sigma == 0.0 ) {

					gl_FragColor = vec4( bilinearCubeUV( envMap, vOutputDirection, mipInt ), 1.0 );
					return;

				}

				vec3 outputDirection = normalize( vOutputDirection );

				vec3 up = abs( outputDirection.z ) < 0.999 ? vec3( 0.0, 0.0, 1.0 ) : vec3( 1.0, 0.0, 0.0 );
				vec3 tangent = normalize( cross( up, outputDirection ) );
				vec3 bitangent = cross( outputDirection, tangent );

				// Truncate the kernel at three standard deviations or at the antipode.
				float thetaMax = min( 3.0 * sigma, PI );
				float truncation = 1.0 - exp( - 0.5 * thetaMax * thetaMax / ( sigma * sigma ) );

				vec3 accumColor = vec3( 0.0 );
				float accumWeight = 0.0;

				for ( int i = 0; i < SAMPLES; i ++ ) {

					// Stratified inverse-CDF sampling of the Gaussian, placed on a golden-angle spiral.
					float stratum = ( float( i ) + 0.5 ) / float( SAMPLES );
					float theta = sigma * sqrt( - 2.0 * log( 1.0 - stratum * truncation ) );
					float phi = float( i ) * GOLDEN_ANGLE;

					vec3 offset = cos( phi ) * tangent + sin( phi ) * bitangent;
					vec3 sampleDirection = cos( theta ) * outputDirection + sin( theta ) * offset;

					// Correct the planar sample density to solid angle.
					float weight = sin( theta ) / theta;

					accumColor += weight * bilinearCubeUV( envMap, sampleDirection, mipInt );
					accumWeight += weight;

				}

				gl_FragColor = vec4( accumColor / accumWeight, 1.0 );

			}
		`,blending:oi,depthTest:!1,depthWrite:!1})}function ju(){return new en({name:"EquirectangularToCubeUV",uniforms:{envMap:{value:null}},vertexShader:Ra(),fragmentShader:`

			precision mediump float;
			precision mediump int;

			varying vec3 vOutputDirection;

			uniform sampler2D envMap;

			#include <common>

			void main() {

				vec3 outputDirection = normalize( vOutputDirection );
				vec2 uv = equirectUv( outputDirection );

				gl_FragColor = vec4( texture2D ( envMap, uv ).rgb, 1.0 );

			}
		`,blending:oi,depthTest:!1,depthWrite:!1})}function Qu(){return new en({name:"CubemapToCubeUV",uniforms:{envMap:{value:null},flipEnvMap:{value:-1}},vertexShader:Ra(),fragmentShader:`

			precision mediump float;
			precision mediump int;

			uniform float flipEnvMap;

			varying vec3 vOutputDirection;

			uniform samplerCube envMap;

			void main() {

				gl_FragColor = textureCube( envMap, vec3( flipEnvMap * vOutputDirection.x, vOutputDirection.yz ) );

			}
		`,blending:oi,depthTest:!1,depthWrite:!1})}function Ra(){return`

		precision mediump float;
		precision mediump int;

		attribute vec3 outputDirection;

		varying vec3 vOutputDirection;

		void main() {

			vOutputDirection = outputDirection;
			gl_Position = vec4( position, 1.0 );

		}
	`}class Kd extends cn{constructor(e=1,t={}){super(e,e,t),this.isWebGLCubeRenderTarget=!0;const n={width:e,height:e,depth:1},s=[n,n,n,n,n,n];this.texture=new Id(s),this._setTextureOptions(t),this.texture.isRenderTargetTexture=!0}fromEquirectangularTexture(e,t){this.texture.type=t.type,this.texture.colorSpace=t.colorSpace,this.texture.generateMipmaps=t.generateMipmaps,this.texture.minFilter=t.minFilter,this.texture.magFilter=t.magFilter;const n={uniforms:{tEquirect:{value:null}},vertexShader:`

				varying vec3 vWorldDirection;

				vec3 transformDirection( in vec3 dir, in mat4 matrix ) {

					return normalize( ( matrix * vec4( dir, 0.0 ) ).xyz );

				}

				void main() {

					vWorldDirection = transformDirection( position, modelMatrix );

					#include <begin_vertex>
					#include <project_vertex>

				}
			`,fragmentShader:`

				uniform sampler2D tEquirect;

				varying vec3 vWorldDirection;

				#include <common>

				void main() {

					vec3 direction = normalize( vWorldDirection );

					vec2 sampleUV = equirectUv( direction );

					gl_FragColor = texture2D( tEquirect, sampleUV );

				}
			`},s=new He(5,5,5),r=new en({name:"CubemapFromEquirect",uniforms:nr(n.uniforms),vertexShader:n.vertexShader,fragmentShader:n.fragmentShader,side:un,blending:oi});r.uniforms.tEquirect.value=t;const o=new K(s,r),a=t.minFilter;return t.minFilter===bi&&(t.minFilter=zt),new Sg(1,10,this).update(e,o),t.minFilter=a,o.geometry.dispose(),o.material.dispose(),this}clear(e,t=!0,n=!0,s=!0){const r=e.getRenderTarget();for(let o=0;o<6;o++)e.setRenderTarget(this,o),e.clear(t,n,s);e.setRenderTarget(r)}}function Pv(i){let e=new WeakMap,t=new WeakMap,n=null;function s(f,d=!1){return f==null?null:d?o(f):r(f)}function r(f){if(f&&f.isTexture){const d=f.mapping;if(d===Da||d===Ua)if(e.has(f)){const p=e.get(f).texture;return a(p,f.mapping)}else{const p=f.image;if(p&&p.height>0){const _=new Kd(p.height);return _.fromEquirectangularTexture(i,f),e.set(f,_),f.addEventListener("dispose",l),a(_.texture,f.mapping)}else return null}}return f}function o(f){if(f&&f.isTexture){const d=f.mapping,p=d===Da||d===Ua,_=d===ls||d===Qs;if(p||_){let g=t.get(f);const m=g!==void 0?g.texture.pmremVersion:0;if(f.isRenderTargetTexture&&f.pmremVersion!==m)return n===null&&(n=new Ju(i)),g=p?n.fromEquirectangular(f,g):n.fromCubemap(f,g),g.texture.pmremVersion=f.pmremVersion,t.set(f,g),g.texture;if(g!==void 0)return g.texture;{const M=f.image;return p&&M&&M.height>0||_&&M&&c(M)?(n===null&&(n=new Ju(i)),g=p?n.fromEquirectangular(f):n.fromCubemap(f),g.texture.pmremVersion=f.pmremVersion,t.set(f,g),f.addEventListener("dispose",h),g.texture):null}}}return f}function a(f,d){return d===Da?f.mapping=ls:d===Ua&&(f.mapping=Qs),f}function c(f){let d=0;const p=6;for(let _=0;_<p;_++)f[_]!==void 0&&d++;return d===p}function l(f){const d=f.target;d.removeEventListener("dispose",l);const p=e.get(d);p!==void 0&&(e.delete(d),p.dispose())}function h(f){const d=f.target;d.removeEventListener("dispose",h);const p=t.get(d);p!==void 0&&(t.delete(d),p.dispose())}function u(){e=new WeakMap,t=new WeakMap,n!==null&&(n.dispose(),n=null)}return{get:s,dispose:u}}function Iv(i){const e={};function t(n){if(e[n]!==void 0)return e[n];const s=i.getExtension(n);return e[n]=s,s}return{has:function(n){return t(n)!==null},init:function(){t("EXT_color_buffer_float"),t("WEBGL_clip_cull_distance"),t("OES_texture_float_linear"),t("EXT_color_buffer_half_float"),t("WEBGL_multisampled_render_to_texture"),t("WEBGL_render_shared_exponent")},get:function(n){const s=t(n);return s===null&&Xs("WebGLRenderer: "+n+" extension not supported."),s}}}function Lv(i,e,t,n){const s={},r=new WeakMap;function o(u){const f=u.target;f.index!==null&&e.remove(f.index);for(const p in f.attributes)e.remove(f.attributes[p]);f.removeEventListener("dispose",o),delete s[f.id];const d=r.get(f);d&&(e.remove(d),r.delete(f)),n.releaseStatesOfGeometry(f),f.isInstancedBufferGeometry===!0&&delete f._maxInstanceCount,t.memory.geometries--}function a(u,f){return s[f.id]===!0||(f.addEventListener("dispose",o),s[f.id]=!0,t.memory.geometries++),f}function c(u){const f=u.attributes;for(const d in f)e.update(f[d],i.ARRAY_BUFFER)}function l(u){const f=[],d=u.index,p=u.attributes.position;let _=0;if(p===void 0)return;if(d!==null){const M=d.array;_=d.version;for(let b=0,v=M.length;b<v;b+=3){const w=M[b+0],S=M[b+1],T=M[b+2];f.push(w,S,S,T,T,w)}}else{const M=p.array;_=p.version;for(let b=0,v=M.length/3-1;b<v;b+=3){const w=b+0,S=b+1,T=b+2;f.push(w,S,S,T,T,w)}}const g=new(p.count>=65535?Td:bd)(f,1);g.version=_;const m=r.get(u);m&&e.remove(m),r.set(u,g)}function h(u){const f=r.get(u);if(f){const d=u.index;d!==null&&f.version<d.version&&l(u)}else l(u);return r.get(u)}return{get:a,update:c,getWireframeAttribute:h}}function Nv(i,e,t){let n;function s(u){n=u}let r,o;function a(u){r=u.type,o=u.bytesPerElement}function c(u,f){i.drawElements(n,f,r,u*o),t.update(f,n,1)}function l(u,f,d){d!==0&&(i.drawElementsInstanced(n,f,r,u*o,d),t.update(f,n,d))}function h(u,f,d){if(d===0)return;e.get("WEBGL_multi_draw").multiDrawElementsWEBGL(n,f,0,r,u,0,d);let _=0;for(let g=0;g<d;g++)_+=f[g];t.update(_,n,1)}this.setMode=s,this.setIndex=a,this.render=c,this.renderInstances=l,this.renderMultiDraw=h}function Dv(i){const e={geometries:0,textures:0},t={frame:0,calls:0,triangles:0,points:0,lines:0};function n(r,o,a){switch(t.calls++,o){case i.TRIANGLES:t.triangles+=a*(r/3);break;case i.LINES:t.lines+=a*(r/2);break;case i.LINE_STRIP:t.lines+=a*(r-1);break;case i.LINE_LOOP:t.lines+=a*r;break;case i.POINTS:t.points+=a*r;break;default:$e("WebGLInfo: Unknown draw mode:",o);break}}function s(){t.calls=0,t.triangles=0,t.points=0,t.lines=0}return{memory:e,render:t,programs:null,autoReset:!0,reset:s,update:n}}function Uv(i,e,t){const n=new WeakMap,s=new St;function r(o,a,c){const l=o.morphTargetInfluences,h=a.morphAttributes.position||a.morphAttributes.normal||a.morphAttributes.color,u=h!==void 0?h.length:0;let f=n.get(a);if(f===void 0||f.count!==u){let D=function(){x.dispose(),n.delete(a),a.removeEventListener("dispose",D)};var d=D;f!==void 0&&f.texture.dispose();const p=a.morphAttributes.position!==void 0,_=a.morphAttributes.normal!==void 0,g=a.morphAttributes.color!==void 0,m=a.morphAttributes.position||[],M=a.morphAttributes.normal||[],b=a.morphAttributes.color||[];let v=0;p===!0&&(v=1),_===!0&&(v=2),g===!0&&(v=3);let w=a.attributes.position.count*v,S=1;w>e.maxTextureSize&&(S=Math.ceil(w/e.maxTextureSize),w=e.maxTextureSize);const T=new Float32Array(w*S*4*u),x=new Md(T,w,S,u);x.type=In,x.needsUpdate=!0;const R=v*4;for(let P=0;P<u;P++){const F=m[P],A=M[P],I=b[P],O=w*S*4*P;for(let H=0;H<F.count;H++){const C=H*R;p===!0&&(s.fromBufferAttribute(F,H),T[O+C+0]=s.x,T[O+C+1]=s.y,T[O+C+2]=s.z,T[O+C+3]=0),_===!0&&(s.fromBufferAttribute(A,H),T[O+C+4]=s.x,T[O+C+5]=s.y,T[O+C+6]=s.z,T[O+C+7]=0),g===!0&&(s.fromBufferAttribute(I,H),T[O+C+8]=s.x,T[O+C+9]=s.y,T[O+C+10]=s.z,T[O+C+11]=I.itemSize===4?s.w:1)}}f={count:u,texture:x,size:new oe(w,S)},n.set(a,f),a.addEventListener("dispose",D)}if(o.isInstancedMesh===!0&&o.morphTexture!==null)c.getUniforms().setValue(i,"morphTexture",o.morphTexture,t);else{let p=0;for(let g=0;g<l.length;g++)p+=l[g];const _=a.morphTargetsRelative?1:1-p;c.getUniforms().setValue(i,"morphTargetBaseInfluence",_),c.getUniforms().setValue(i,"morphTargetInfluences",l)}c.getUniforms().setValue(i,"morphTargetsTexture",f.texture,t),c.getUniforms().setValue(i,"morphTargetsTextureSize",f.size)}return{update:r}}function Fv(i,e,t,n,s){let r=new WeakMap;function o(l){const h=s.render.frame,u=l.geometry,f=e.get(l,u);if(r.get(f)!==h&&(e.update(f),r.set(f,h)),l.isInstancedMesh&&(l.hasEventListener("dispose",c)===!1&&l.addEventListener("dispose",c),r.get(l)!==h&&(t.update(l.instanceMatrix,i.ARRAY_BUFFER),l.instanceColor!==null&&t.update(l.instanceColor,i.ARRAY_BUFFER),r.set(l,h))),l.isSkinnedMesh){const d=l.skeleton;r.get(d)!==h&&(d.update(),r.set(d,h))}return f}function a(){r=new WeakMap}function c(l){const h=l.target;h.removeEventListener("dispose",c),n.releaseStatesOfObject(h),t.remove(h.instanceMatrix),h.instanceColor!==null&&t.remove(h.instanceColor)}return{update:o,dispose:a}}const Ov={[Oc]:"LINEAR_TONE_MAPPING",[Bc]:"REINHARD_TONE_MAPPING",[kc]:"CINEON_TONE_MAPPING",[ba]:"ACES_FILMIC_TONE_MAPPING",[Hc]:"AGX_TONE_MAPPING",[Vc]:"NEUTRAL_TONE_MAPPING",[zc]:"CUSTOM_TONE_MAPPING"};function Bv(i,e,t,n,s,r){const o=new cn(e,t,{type:i,depthBuffer:s,stencilBuffer:r,samples:n?4:0,storeMultisampledDepthBuffer:!1,storeMultisampledStencilBuffer:!1,resolveDepthBuffer:!1,resolveStencilBuffer:!1});let a=null,c=null;const l=new Mt;l.setAttribute("position",new Je([-1,3,0,-1,-1,0,3,-1,0],3)),l.setAttribute("uv",new Je([0,2,0,0,2,0],2));const h=new Vd({uniforms:{tDiffuse:{value:null}},vertexShader:`
			precision highp float;

			uniform mat4 modelViewMatrix;
			uniform mat4 projectionMatrix;

			attribute vec3 position;
			attribute vec2 uv;

			varying vec2 vUv;

			void main() {
				vUv = uv;
				gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );
			}`,fragmentShader:`
			precision highp float;

			uniform sampler2D tDiffuse;

			varying vec2 vUv;

			#include <tonemapping_pars_fragment>
			#include <colorspace_pars_fragment>

			void main() {
				gl_FragColor = texture2D( tDiffuse, vUv );

				#ifdef LINEAR_TONE_MAPPING
					gl_FragColor.rgb = LinearToneMapping( gl_FragColor.rgb );
				#elif defined( REINHARD_TONE_MAPPING )
					gl_FragColor.rgb = ReinhardToneMapping( gl_FragColor.rgb );
				#elif defined( CINEON_TONE_MAPPING )
					gl_FragColor.rgb = CineonToneMapping( gl_FragColor.rgb );
				#elif defined( ACES_FILMIC_TONE_MAPPING )
					gl_FragColor.rgb = ACESFilmicToneMapping( gl_FragColor.rgb );
				#elif defined( AGX_TONE_MAPPING )
					gl_FragColor.rgb = AgXToneMapping( gl_FragColor.rgb );
				#elif defined( NEUTRAL_TONE_MAPPING )
					gl_FragColor.rgb = NeutralToneMapping( gl_FragColor.rgb );
				#elif defined( CUSTOM_TONE_MAPPING )
					gl_FragColor.rgb = CustomToneMapping( gl_FragColor.rgb );
				#endif

				#ifdef SRGB_TRANSFER
					gl_FragColor = sRGBTransferOETF( gl_FragColor );
				#endif
			}`,depthTest:!1,depthWrite:!1}),u=new K(l,h),f=new so(-1,1,1,-1,0,1);let d=null,p=null,_=!1,g,m=null,M=[],b=!1;this.setSize=function(v,w){o.setSize(v,w),a!==null&&a.setSize(v,w),c!==null&&c.setSize(v,w);for(let S=0;S<M.length;S++){const T=M[S];T.setSize&&T.setSize(v,w)}},this.setEffects=function(v){M=v,b=M.length>0&&M[0].isRenderPass===!0;const w=o.width,S=o.height;M.length>0&&a===null&&(a=new cn(w,S,{type:fn,depthBuffer:!1,stencilBuffer:!1}),c=new cn(w,S,{type:fn,depthBuffer:!1,stencilBuffer:!1}));for(let T=0;T<M.length;T++){const x=M[T];x.setSize&&x.setSize(w,S)}},this.begin=function(v,w){if(_||v.toneMapping===ai&&M.length===0)return!1;if(m=w,w!==null){const S=w.width,T=w.height;(o.width!==S||o.height!==T)&&this.setSize(S,T)}return b===!1&&v.setRenderTarget(o),g=v.toneMapping,v.toneMapping=ai,!0},this.hasRenderPass=function(){return b},this.end=function(v,w){v.toneMapping=g,_=!0;let S=o,T=a;for(let x=0;x<M.length;x++){const R=M[x];R.enabled!==!1&&(R.render(v,T,S,w),R.needsSwap!==!1&&(S=T,T=T===a?c:a))}if(d!==v.outputColorSpace||p!==v.toneMapping){d=v.outputColorSpace,p=v.toneMapping,h.defines={},at.getTransfer(d)===_t&&(h.defines.SRGB_TRANSFER="");const x=Ov[p];x&&(h.defines[x]=""),h.needsUpdate=!0}h.uniforms.tDiffuse.value=S.texture,v.setRenderTarget(m),v.render(u,f),m=null,_=!1},this.isCompositing=function(){return _},this.dispose=function(){o.dispose(),a!==null&&a.dispose(),c!==null&&c.dispose(),l.dispose(),h.dispose()}}const Jd=new Ht,wc=new $r(1,1),Zd=new Md,jd=new qm,Qd=new Id,ef=[],tf=[],nf=new Float32Array(16),sf=new Float32Array(9),rf=new Float32Array(4);function ar(i,e,t){const n=i[0];if(n<=0||n>0)return i;const s=e*t;let r=ef[s];if(r===void 0&&(r=new Float32Array(s),ef[s]=r),e!==0){n.toArray(r,0);for(let o=1,a=0;o!==e;++o)a+=t,i[o].toArray(r,a)}return r}function Vt(i,e){if(i.length!==e.length)return!1;for(let t=0,n=i.length;t<n;t++)if(i[t]!==e[t])return!1;return!0}function Gt(i,e){for(let t=0,n=e.length;t<n;t++)i[t]=e[t]}function Ca(i,e){let t=tf[e];t===void 0&&(t=new Int32Array(e),tf[e]=t);for(let n=0;n!==e;++n)t[n]=i.allocateTextureUnit();return t}function kv(i,e){const t=this.cache;t[0]!==e&&(i.uniform1f(this.addr,e),t[0]=e)}function zv(i,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y)&&(i.uniform2f(this.addr,e.x,e.y),t[0]=e.x,t[1]=e.y);else{if(Vt(t,e))return;i.uniform2fv(this.addr,e),Gt(t,e)}}function Hv(i,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z)&&(i.uniform3f(this.addr,e.x,e.y,e.z),t[0]=e.x,t[1]=e.y,t[2]=e.z);else if(e.r!==void 0)(t[0]!==e.r||t[1]!==e.g||t[2]!==e.b)&&(i.uniform3f(this.addr,e.r,e.g,e.b),t[0]=e.r,t[1]=e.g,t[2]=e.b);else{if(Vt(t,e))return;i.uniform3fv(this.addr,e),Gt(t,e)}}function Vv(i,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z||t[3]!==e.w)&&(i.uniform4f(this.addr,e.x,e.y,e.z,e.w),t[0]=e.x,t[1]=e.y,t[2]=e.z,t[3]=e.w);else{if(Vt(t,e))return;i.uniform4fv(this.addr,e),Gt(t,e)}}function Gv(i,e){const t=this.cache,n=e.elements;if(n===void 0){if(Vt(t,e))return;i.uniformMatrix2fv(this.addr,!1,e),Gt(t,e)}else{if(Vt(t,n))return;rf.set(n),i.uniformMatrix2fv(this.addr,!1,rf),Gt(t,n)}}function Wv(i,e){const t=this.cache,n=e.elements;if(n===void 0){if(Vt(t,e))return;i.uniformMatrix3fv(this.addr,!1,e),Gt(t,e)}else{if(Vt(t,n))return;sf.set(n),i.uniformMatrix3fv(this.addr,!1,sf),Gt(t,n)}}function Xv(i,e){const t=this.cache,n=e.elements;if(n===void 0){if(Vt(t,e))return;i.uniformMatrix4fv(this.addr,!1,e),Gt(t,e)}else{if(Vt(t,n))return;nf.set(n),i.uniformMatrix4fv(this.addr,!1,nf),Gt(t,n)}}function qv(i,e){const t=this.cache;t[0]!==e&&(i.uniform1i(this.addr,e),t[0]=e)}function Yv(i,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y)&&(i.uniform2i(this.addr,e.x,e.y),t[0]=e.x,t[1]=e.y);else{if(Vt(t,e))return;i.uniform2iv(this.addr,e),Gt(t,e)}}function $v(i,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z)&&(i.uniform3i(this.addr,e.x,e.y,e.z),t[0]=e.x,t[1]=e.y,t[2]=e.z);else{if(Vt(t,e))return;i.uniform3iv(this.addr,e),Gt(t,e)}}function Kv(i,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z||t[3]!==e.w)&&(i.uniform4i(this.addr,e.x,e.y,e.z,e.w),t[0]=e.x,t[1]=e.y,t[2]=e.z,t[3]=e.w);else{if(Vt(t,e))return;i.uniform4iv(this.addr,e),Gt(t,e)}}function Jv(i,e){const t=this.cache;t[0]!==e&&(i.uniform1ui(this.addr,e),t[0]=e)}function Zv(i,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y)&&(i.uniform2ui(this.addr,e.x,e.y),t[0]=e.x,t[1]=e.y);else{if(Vt(t,e))return;i.uniform2uiv(this.addr,e),Gt(t,e)}}function jv(i,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z)&&(i.uniform3ui(this.addr,e.x,e.y,e.z),t[0]=e.x,t[1]=e.y,t[2]=e.z);else{if(Vt(t,e))return;i.uniform3uiv(this.addr,e),Gt(t,e)}}function Qv(i,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z||t[3]!==e.w)&&(i.uniform4ui(this.addr,e.x,e.y,e.z,e.w),t[0]=e.x,t[1]=e.y,t[2]=e.z,t[3]=e.w);else{if(Vt(t,e))return;i.uniform4uiv(this.addr,e),Gt(t,e)}}function eM(i,e,t){const n=this.cache,s=t.allocateTextureUnit();n[0]!==s&&(i.uniform1i(this.addr,s),n[0]=s);let r;this.type===i.SAMPLER_2D_SHADOW?(wc.compareFunction=t.isReversedDepthBuffer()?Zc:Jc,r=wc):r=Jd,t.setTexture2D(e||r,s)}function tM(i,e,t){const n=this.cache,s=t.allocateTextureUnit();n[0]!==s&&(i.uniform1i(this.addr,s),n[0]=s),t.setTexture3D(e||jd,s)}function nM(i,e,t){const n=this.cache,s=t.allocateTextureUnit();n[0]!==s&&(i.uniform1i(this.addr,s),n[0]=s),t.setTextureCube(e||Qd,s)}function iM(i,e,t){const n=this.cache,s=t.allocateTextureUnit();n[0]!==s&&(i.uniform1i(this.addr,s),n[0]=s),t.setTexture2DArray(e||Zd,s)}function sM(i){switch(i){case 5126:return kv;case 35664:return zv;case 35665:return Hv;case 35666:return Vv;case 35674:return Gv;case 35675:return Wv;case 35676:return Xv;case 5124:case 35670:return qv;case 35667:case 35671:return Yv;case 35668:case 35672:return $v;case 35669:case 35673:return Kv;case 5125:return Jv;case 36294:return Zv;case 36295:return jv;case 36296:return Qv;case 35678:case 36198:case 36298:case 36306:case 35682:return eM;case 35679:case 36299:case 36307:return tM;case 35680:case 36300:case 36308:case 36293:return nM;case 36289:case 36303:case 36311:case 36292:return iM}}function rM(i,e){i.uniform1fv(this.addr,e)}function oM(i,e){const t=ar(e,this.size,2);i.uniform2fv(this.addr,t)}function aM(i,e){const t=ar(e,this.size,3);i.uniform3fv(this.addr,t)}function lM(i,e){const t=ar(e,this.size,4);i.uniform4fv(this.addr,t)}function cM(i,e){const t=ar(e,this.size,4);i.uniformMatrix2fv(this.addr,!1,t)}function hM(i,e){const t=ar(e,this.size,9);i.uniformMatrix3fv(this.addr,!1,t)}function uM(i,e){const t=ar(e,this.size,16);i.uniformMatrix4fv(this.addr,!1,t)}function fM(i,e){i.uniform1iv(this.addr,e)}function dM(i,e){i.uniform2iv(this.addr,e)}function pM(i,e){i.uniform3iv(this.addr,e)}function mM(i,e){i.uniform4iv(this.addr,e)}function gM(i,e){i.uniform1uiv(this.addr,e)}function _M(i,e){i.uniform2uiv(this.addr,e)}function xM(i,e){i.uniform3uiv(this.addr,e)}function vM(i,e){i.uniform4uiv(this.addr,e)}function MM(i,e,t){const n=this.cache,s=e.length,r=Ca(t,s);Vt(n,r)||(i.uniform1iv(this.addr,r),Gt(n,r));let o;this.type===i.SAMPLER_2D_SHADOW?o=wc:o=Jd;for(let a=0;a!==s;++a)t.setTexture2D(e[a]||o,r[a])}function yM(i,e,t){const n=this.cache,s=e.length,r=Ca(t,s);Vt(n,r)||(i.uniform1iv(this.addr,r),Gt(n,r));for(let o=0;o!==s;++o)t.setTexture3D(e[o]||jd,r[o])}function SM(i,e,t){const n=this.cache,s=e.length,r=Ca(t,s);Vt(n,r)||(i.uniform1iv(this.addr,r),Gt(n,r));for(let o=0;o!==s;++o)t.setTextureCube(e[o]||Qd,r[o])}function wM(i,e,t){const n=this.cache,s=e.length,r=Ca(t,s);Vt(n,r)||(i.uniform1iv(this.addr,r),Gt(n,r));for(let o=0;o!==s;++o)t.setTexture2DArray(e[o]||Zd,r[o])}function bM(i){switch(i){case 5126:return rM;case 35664:return oM;case 35665:return aM;case 35666:return lM;case 35674:return cM;case 35675:return hM;case 35676:return uM;case 5124:case 35670:return fM;case 35667:case 35671:return dM;case 35668:case 35672:return pM;case 35669:case 35673:return mM;case 5125:return gM;case 36294:return _M;case 36295:return xM;case 36296:return vM;case 35678:case 36198:case 36298:case 36306:case 35682:return MM;case 35679:case 36299:case 36307:return yM;case 35680:case 36300:case 36308:case 36293:return SM;case 36289:case 36303:case 36311:case 36292:return wM}}class TM{constructor(e,t,n){this.id=e,this.addr=n,this.cache=[],this.type=t.type,this.setValue=sM(t.type)}}class EM{constructor(e,t,n){this.id=e,this.addr=n,this.cache=[],this.type=t.type,this.size=t.size,this.setValue=bM(t.type)}}class AM{constructor(e){this.id=e,this.seq=[],this.map={}}setValue(e,t,n){const s=this.seq;for(let r=0,o=s.length;r!==o;++r){const a=s[r];a.setValue(e,t[a.id],n)}}}const xl=/(\w+)(\])?(\[|\.)?/g;function of(i,e){i.seq.push(e),i.map[e.id]=e}function RM(i,e,t){const n=i.name,s=n.length;for(xl.lastIndex=0;;){const r=xl.exec(n),o=xl.lastIndex;let a=r[1];const c=r[2]==="]",l=r[3];if(c&&(a=a|0),l===void 0||l==="["&&o+2===s){of(t,l===void 0?new TM(a,i,e):new EM(a,i,e));break}else{let u=t.map[a];u===void 0&&(u=new AM(a),of(t,u)),t=u}}}class ea{constructor(e,t){this.seq=[],this.map={};const n=e.getProgramParameter(t,e.ACTIVE_UNIFORMS);for(let o=0;o<n;++o){const a=e.getActiveUniform(t,o),c=e.getUniformLocation(t,a.name);RM(a,c,this)}const s=[],r=[];for(const o of this.seq)o.type===e.SAMPLER_2D_SHADOW||o.type===e.SAMPLER_CUBE_SHADOW||o.type===e.SAMPLER_2D_ARRAY_SHADOW?s.push(o):r.push(o);s.length>0&&(this.seq=s.concat(r))}setValue(e,t,n,s){const r=this.map[t];r!==void 0&&r.setValue(e,n,s)}setOptional(e,t,n){const s=t[n];s!==void 0&&this.setValue(e,n,s)}static upload(e,t,n,s){for(let r=0,o=t.length;r!==o;++r){const a=t[r],c=n[a.id];c.needsUpdate!==!1&&a.setValue(e,c.value,s)}}static seqWithValue(e,t){const n=[];for(let s=0,r=e.length;s!==r;++s){const o=e[s];o.id in t&&n.push(o)}return n}}function af(i,e,t){const n=i.createShader(e);return i.shaderSource(n,t),i.compileShader(n),n}const CM=37297;let PM=0;function IM(i,e){const t=i.split(`
`),n=[],s=Math.max(e-6,0),r=Math.min(e+6,t.length);for(let o=s;o<r;o++){const a=o+1;n.push(`${a===e?">":" "} ${a}: ${t[o]}`)}return n.join(`
`)}const lf=new Ze;function LM(i){at._getMatrix(lf,at.workingColorSpace,i);const e=`mat3( ${lf.elements.map(t=>t.toFixed(4))} )`;switch(at.getTransfer(i)){case ca:return[e,"LinearTransferOETF"];case _t:return[e,"sRGBTransferOETF"];default:return Oe("WebGLProgram: Unsupported color space: ",i),[e,"LinearTransferOETF"]}}function cf(i,e,t){const n=i.getShaderParameter(e,i.COMPILE_STATUS),r=(i.getShaderInfoLog(e)||"").trim();if(n&&r==="")return"";const o=/ERROR: 0:(\d+)/.exec(r);if(o){const a=parseInt(o[1]);return t.toUpperCase()+`

`+r+`

`+IM(i.getShaderSource(e),a)}else return r}function NM(i,e){const t=LM(e);return[`vec4 ${i}( vec4 value ) {`,`	return ${t[1]}( vec4( value.rgb * ${t[0]}, value.a ) );`,"}"].join(`
`)}const DM={[Oc]:"Linear",[Bc]:"Reinhard",[kc]:"Cineon",[ba]:"ACESFilmic",[Hc]:"AgX",[Vc]:"Neutral",[zc]:"Custom"};function UM(i,e){const t=DM[e];return t===void 0?(Oe("WebGLProgram: Unsupported toneMapping:",e),"vec3 "+i+"( vec3 color ) { return LinearToneMapping( color ); }"):"vec3 "+i+"( vec3 color ) { return "+t+"ToneMapping( color ); }"}const zo=new B;function FM(){at.getLuminanceCoefficients(zo);const i=zo.x.toFixed(4),e=zo.y.toFixed(4),t=zo.z.toFixed(4);return["float luminance( const in vec3 rgb ) {",`	const vec3 weights = vec3( ${i}, ${e}, ${t} );`,"	return dot( weights, rgb );","}"].join(`
`)}function OM(i){return[i.extensionClipCullDistance?"#extension GL_ANGLE_clip_cull_distance : require":"",i.extensionMultiDraw?"#extension GL_ANGLE_multi_draw : require":""].filter(Cr).join(`
`)}function BM(i){const e=[];for(const t in i){const n=i[t];n!==!1&&e.push("#define "+t+" "+n)}return e.join(`
`)}function kM(i,e){const t={},n=i.getProgramParameter(e,i.ACTIVE_ATTRIBUTES);for(let s=0;s<n;s++){const r=i.getActiveAttrib(e,s),o=r.name;let a=1;r.type===i.FLOAT_MAT2&&(a=2),r.type===i.FLOAT_MAT3&&(a=3),r.type===i.FLOAT_MAT4&&(a=4),t[o]={type:r.type,location:i.getAttribLocation(e,o),locationSize:a}}return t}function Cr(i){return i!==""}function hf(i,e){const t=e.numSpotLightShadows+e.numSpotLightMaps-e.numSpotLightShadowsWithMaps;return i.replace(/NUM_SUN_LIGHTS/g,e.numSunLights).replace(/NUM_DIR_LIGHTS/g,e.numDirLights).replace(/NUM_SPOT_LIGHTS/g,e.numSpotLights).replace(/NUM_SPOT_LIGHT_MAPS/g,e.numSpotLightMaps).replace(/NUM_SPOT_LIGHT_COORDS/g,t).replace(/NUM_RECT_AREA_LIGHTS/g,e.numRectAreaLights).replace(/NUM_POINT_LIGHTS/g,e.numPointLights).replace(/NUM_HEMI_LIGHTS/g,e.numHemiLights).replace(/NUM_SUN_LIGHT_SHADOWS/g,e.numSunLightShadows).replace(/NUM_DIR_LIGHT_SHADOWS/g,e.numDirLightShadows).replace(/NUM_SPOT_LIGHT_SHADOWS_WITH_MAPS/g,e.numSpotLightShadowsWithMaps).replace(/NUM_SPOT_LIGHT_SHADOWS/g,e.numSpotLightShadows).replace(/NUM_POINT_LIGHT_SHADOWS/g,e.numPointLightShadows)}function uf(i,e){return i.replace(/NUM_CLIPPING_PLANES/g,e.numClippingPlanes).replace(/UNION_CLIPPING_PLANES/g,e.numClippingPlanes-e.numClipIntersection)}const zM=/^[ \t]*#include +<([\w\d./]+)>/gm;function bc(i){return i.replace(zM,VM)}const HM=new Map;function VM(i,e){let t=it[e];if(t===void 0){const n=HM.get(e);if(n!==void 0)t=it[n],Oe('WebGLRenderer: Shader chunk "%s" has been deprecated. Use "%s" instead.',e,n);else throw new Error("THREE.WebGLProgram: Can not resolve #include <"+e+">")}return bc(t)}const GM=/#pragma unroll_loop_start\s+for\s*\(\s*int\s+i\s*=\s*(\d+)\s*;\s*i\s*<\s*(\d+)\s*;\s*i\s*\+\+\s*\)\s*{([\s\S]+?)}\s+#pragma unroll_loop_end/g;function ff(i){return i.replace(GM,WM)}function WM(i,e,t,n){let s="";for(let r=parseInt(e);r<parseInt(t);r++)s+=n.replace(/\[\s*i\s*\]/g,"[ "+r+" ]").replace(/UNROLLED_LOOP_INDEX/g,r);return s}function df(i){let e=`precision ${i.precision} float;
	precision ${i.precision} int;
	precision ${i.precision} sampler2D;
	precision ${i.precision} samplerCube;
	precision ${i.precision} sampler3D;
	precision ${i.precision} sampler2DArray;
	precision ${i.precision} sampler2DShadow;
	precision ${i.precision} samplerCubeShadow;
	precision ${i.precision} sampler2DArrayShadow;
	precision ${i.precision} isampler2D;
	precision ${i.precision} isampler3D;
	precision ${i.precision} isamplerCube;
	precision ${i.precision} isampler2DArray;
	precision ${i.precision} usampler2D;
	precision ${i.precision} usampler3D;
	precision ${i.precision} usamplerCube;
	precision ${i.precision} usampler2DArray;
	`;return i.precision==="highp"?e+=`
#define HIGH_PRECISION`:i.precision==="mediump"?e+=`
#define MEDIUM_PRECISION`:i.precision==="lowp"&&(e+=`
#define LOW_PRECISION`),e}const XM={[qo]:"SHADOWMAP_TYPE_PCF",[Er]:"SHADOWMAP_TYPE_VSM"};function qM(i){return XM[i.shadowMapType]||"SHADOWMAP_TYPE_BASIC"}const YM={[ls]:"ENVMAP_TYPE_CUBE",[Qs]:"ENVMAP_TYPE_CUBE",[Ta]:"ENVMAP_TYPE_CUBE_UV"};function $M(i){return i.envMap===!1?"ENVMAP_TYPE_CUBE":YM[i.envMapMode]||"ENVMAP_TYPE_CUBE"}const KM={[Qs]:"ENVMAP_MODE_REFRACTION"};function JM(i){return i.envMap===!1?"ENVMAP_MODE_REFLECTION":KM[i.envMapMode]||"ENVMAP_MODE_REFLECTION"}const ZM={[Fc]:"ENVMAP_BLENDING_MULTIPLY",[rm]:"ENVMAP_BLENDING_MIX",[om]:"ENVMAP_BLENDING_ADD"};function jM(i){return i.envMap===!1?"ENVMAP_BLENDING_NONE":ZM[i.combine]||"ENVMAP_BLENDING_NONE"}function QM(i){const e=i.envMapCubeUVHeight;if(e===null)return null;const t=Math.log2(e)-2,n=1/e;return{texelWidth:1/(3*Math.max(Math.pow(2,t),112)),texelHeight:n,maxMip:t}}function ey(i,e,t,n){const s=i.getContext(),r=t.defines;let o=t.vertexShader,a=t.fragmentShader;const c=qM(t),l=$M(t),h=JM(t),u=jM(t),f=QM(t),d=OM(t),p=BM(r),_=s.createProgram();let g,m,M=t.glslVersion?"#version "+t.glslVersion+`
`:"";t.isRawShaderMaterial?(g=["#define SHADER_TYPE "+t.shaderType,"#define SHADER_NAME "+t.shaderName,p].filter(Cr).join(`
`),g.length>0&&(g+=`
`),m=["#define SHADER_TYPE "+t.shaderType,"#define SHADER_NAME "+t.shaderName,p].filter(Cr).join(`
`),m.length>0&&(m+=`
`)):(g=[df(t),"#define SHADER_TYPE "+t.shaderType,"#define SHADER_NAME "+t.shaderName,p,t.extensionClipCullDistance?"#define USE_CLIP_DISTANCE":"",t.batching?"#define USE_BATCHING":"",t.batchingColor?"#define USE_BATCHING_COLOR":"",t.instancing?"#define USE_INSTANCING":"",t.instancingColor?"#define USE_INSTANCING_COLOR":"",t.instancingMorph?"#define USE_INSTANCING_MORPH":"",t.useFog&&t.fog?"#define USE_FOG":"",t.useFog&&t.fogExp2?"#define FOG_EXP2":"",t.map?"#define USE_MAP":"",t.envMap?"#define USE_ENVMAP":"",t.envMap?"#define "+h:"",t.lightMap?"#define USE_LIGHTMAP":"",t.aoMap?"#define USE_AOMAP":"",t.bumpMap?"#define USE_BUMPMAP":"",t.normalMap?"#define USE_NORMALMAP":"",t.normalMapObjectSpace?"#define USE_NORMALMAP_OBJECTSPACE":"",t.normalMapTangentSpace?"#define USE_NORMALMAP_TANGENTSPACE":"",t.displacementMap?"#define USE_DISPLACEMENTMAP":"",t.emissiveMap?"#define USE_EMISSIVEMAP":"",t.anisotropy?"#define USE_ANISOTROPY":"",t.anisotropyMap?"#define USE_ANISOTROPYMAP":"",t.clearcoatMap?"#define USE_CLEARCOATMAP":"",t.clearcoatRoughnessMap?"#define USE_CLEARCOAT_ROUGHNESSMAP":"",t.clearcoatNormalMap?"#define USE_CLEARCOAT_NORMALMAP":"",t.iridescenceMap?"#define USE_IRIDESCENCEMAP":"",t.iridescenceThicknessMap?"#define USE_IRIDESCENCE_THICKNESSMAP":"",t.specularMap?"#define USE_SPECULARMAP":"",t.specularColorMap?"#define USE_SPECULAR_COLORMAP":"",t.specularIntensityMap?"#define USE_SPECULAR_INTENSITYMAP":"",t.roughnessMap?"#define USE_ROUGHNESSMAP":"",t.metalnessMap?"#define USE_METALNESSMAP":"",t.alphaMap?"#define USE_ALPHAMAP":"",t.alphaHash?"#define USE_ALPHAHASH":"",t.transmission?"#define USE_TRANSMISSION":"",t.transmissionMap?"#define USE_TRANSMISSIONMAP":"",t.thicknessMap?"#define USE_THICKNESSMAP":"",t.sheenColorMap?"#define USE_SHEEN_COLORMAP":"",t.sheenRoughnessMap?"#define USE_SHEEN_ROUGHNESSMAP":"",t.mapUv?"#define MAP_UV "+t.mapUv:"",t.alphaMapUv?"#define ALPHAMAP_UV "+t.alphaMapUv:"",t.lightMapUv?"#define LIGHTMAP_UV "+t.lightMapUv:"",t.aoMapUv?"#define AOMAP_UV "+t.aoMapUv:"",t.emissiveMapUv?"#define EMISSIVEMAP_UV "+t.emissiveMapUv:"",t.bumpMapUv?"#define BUMPMAP_UV "+t.bumpMapUv:"",t.normalMapUv?"#define NORMALMAP_UV "+t.normalMapUv:"",t.displacementMapUv?"#define DISPLACEMENTMAP_UV "+t.displacementMapUv:"",t.metalnessMapUv?"#define METALNESSMAP_UV "+t.metalnessMapUv:"",t.roughnessMapUv?"#define ROUGHNESSMAP_UV "+t.roughnessMapUv:"",t.anisotropyMapUv?"#define ANISOTROPYMAP_UV "+t.anisotropyMapUv:"",t.clearcoatMapUv?"#define CLEARCOATMAP_UV "+t.clearcoatMapUv:"",t.clearcoatNormalMapUv?"#define CLEARCOAT_NORMALMAP_UV "+t.clearcoatNormalMapUv:"",t.clearcoatRoughnessMapUv?"#define CLEARCOAT_ROUGHNESSMAP_UV "+t.clearcoatRoughnessMapUv:"",t.iridescenceMapUv?"#define IRIDESCENCEMAP_UV "+t.iridescenceMapUv:"",t.iridescenceThicknessMapUv?"#define IRIDESCENCE_THICKNESSMAP_UV "+t.iridescenceThicknessMapUv:"",t.sheenColorMapUv?"#define SHEEN_COLORMAP_UV "+t.sheenColorMapUv:"",t.sheenRoughnessMapUv?"#define SHEEN_ROUGHNESSMAP_UV "+t.sheenRoughnessMapUv:"",t.specularMapUv?"#define SPECULARMAP_UV "+t.specularMapUv:"",t.specularColorMapUv?"#define SPECULAR_COLORMAP_UV "+t.specularColorMapUv:"",t.specularIntensityMapUv?"#define SPECULAR_INTENSITYMAP_UV "+t.specularIntensityMapUv:"",t.transmissionMapUv?"#define TRANSMISSIONMAP_UV "+t.transmissionMapUv:"",t.thicknessMapUv?"#define THICKNESSMAP_UV "+t.thicknessMapUv:"",t.vertexTangents&&t.flatShading===!1?"#define USE_TANGENT":"",t.vertexNormals?"#define HAS_NORMAL":"",t.vertexColors?"#define USE_COLOR":"",t.vertexAlphas?"#define USE_COLOR_ALPHA":"",t.vertexUv1s?"#define USE_UV1":"",t.vertexUv2s?"#define USE_UV2":"",t.vertexUv3s?"#define USE_UV3":"",t.pointsUvs?"#define USE_POINTS_UV":"",t.flatShading?"#define FLAT_SHADED":"",t.skinning?"#define USE_SKINNING":"",t.morphTargets?"#define USE_MORPHTARGETS":"",t.morphNormals&&t.flatShading===!1?"#define USE_MORPHNORMALS":"",t.morphColors?"#define USE_MORPHCOLORS":"",t.morphTargetsCount>0?"#define MORPHTARGETS_TEXTURE_STRIDE "+t.morphTextureStride:"",t.morphTargetsCount>0?"#define MORPHTARGETS_COUNT "+t.morphTargetsCount:"",t.doubleSided?"#define DOUBLE_SIDED":"",t.flipSided?"#define FLIP_SIDED":"",t.shadowMapEnabled?"#define USE_SHADOWMAP":"",t.shadowMapEnabled?"#define "+c:"",t.sizeAttenuation?"#define USE_SIZEATTENUATION":"",t.numLightProbes>0?"#define USE_LIGHT_PROBES":"",t.logarithmicDepthBuffer?"#define USE_LOGARITHMIC_DEPTH_BUFFER":"",t.reversedDepthBuffer?"#define USE_REVERSED_DEPTH_BUFFER":"","uniform mat4 modelMatrix;","uniform mat4 modelViewMatrix;","uniform mat4 projectionMatrix;","uniform mat4 viewMatrix;","uniform mat3 normalMatrix;","uniform vec3 cameraPosition;","uniform bool isOrthographic;","#ifdef USE_INSTANCING","	attribute mat4 instanceMatrix;","#endif","#ifdef USE_INSTANCING_COLOR","	attribute vec3 instanceColor;","#endif","#ifdef USE_INSTANCING_MORPH","	uniform sampler2D morphTexture;","#endif","attribute vec3 position;","attribute vec3 normal;","attribute vec2 uv;","#ifdef USE_UV1","	attribute vec2 uv1;","#endif","#ifdef USE_UV2","	attribute vec2 uv2;","#endif","#ifdef USE_UV3","	attribute vec2 uv3;","#endif","#ifdef USE_TANGENT","	attribute vec4 tangent;","#endif","#if defined( USE_COLOR_ALPHA )","	attribute vec4 color;","#elif defined( USE_COLOR )","	attribute vec3 color;","#endif","#ifdef USE_SKINNING","	attribute vec4 skinIndex;","	attribute vec4 skinWeight;","#endif",`
`].filter(Cr).join(`
`),m=[df(t),"#define SHADER_TYPE "+t.shaderType,"#define SHADER_NAME "+t.shaderName,p,t.useFog&&t.fog?"#define USE_FOG":"",t.useFog&&t.fogExp2?"#define FOG_EXP2":"",t.alphaToCoverage?"#define ALPHA_TO_COVERAGE":"",t.map?"#define USE_MAP":"",t.matcap?"#define USE_MATCAP":"",t.envMap?"#define USE_ENVMAP":"",t.envMap?"#define "+l:"",t.envMap?"#define "+h:"",t.envMap?"#define "+u:"",f?"#define CUBEUV_TEXEL_WIDTH "+f.texelWidth:"",f?"#define CUBEUV_TEXEL_HEIGHT "+f.texelHeight:"",f?"#define CUBEUV_MAX_MIP "+f.maxMip+".0":"",t.lightMap?"#define USE_LIGHTMAP":"",t.aoMap?"#define USE_AOMAP":"",t.bumpMap?"#define USE_BUMPMAP":"",t.normalMap?"#define USE_NORMALMAP":"",t.normalMapObjectSpace?"#define USE_NORMALMAP_OBJECTSPACE":"",t.normalMapTangentSpace?"#define USE_NORMALMAP_TANGENTSPACE":"",t.packedNormalMap?"#define USE_PACKED_NORMALMAP":"",t.emissiveMap?"#define USE_EMISSIVEMAP":"",t.anisotropy?"#define USE_ANISOTROPY":"",t.anisotropyMap?"#define USE_ANISOTROPYMAP":"",t.clearcoat?"#define USE_CLEARCOAT":"",t.clearcoatMap?"#define USE_CLEARCOATMAP":"",t.clearcoatRoughnessMap?"#define USE_CLEARCOAT_ROUGHNESSMAP":"",t.clearcoatNormalMap?"#define USE_CLEARCOAT_NORMALMAP":"",t.dispersion?"#define USE_DISPERSION":"",t.retroreflection?"#define USE_RETROREFLECTION":"",t.iridescence?"#define USE_IRIDESCENCE":"",t.iridescenceMap?"#define USE_IRIDESCENCEMAP":"",t.iridescenceThicknessMap?"#define USE_IRIDESCENCE_THICKNESSMAP":"",t.specularMap?"#define USE_SPECULARMAP":"",t.specularColorMap?"#define USE_SPECULAR_COLORMAP":"",t.specularIntensityMap?"#define USE_SPECULAR_INTENSITYMAP":"",t.roughnessMap?"#define USE_ROUGHNESSMAP":"",t.metalnessMap?"#define USE_METALNESSMAP":"",t.alphaMap?"#define USE_ALPHAMAP":"",t.alphaTest?"#define USE_ALPHATEST":"",t.alphaHash?"#define USE_ALPHAHASH":"",t.sheen?"#define USE_SHEEN":"",t.sheenColorMap?"#define USE_SHEEN_COLORMAP":"",t.sheenRoughnessMap?"#define USE_SHEEN_ROUGHNESSMAP":"",t.transmission?"#define USE_TRANSMISSION":"",t.transmissionMap?"#define USE_TRANSMISSIONMAP":"",t.thicknessMap?"#define USE_THICKNESSMAP":"",t.vertexTangents&&t.flatShading===!1?"#define USE_TANGENT":"",t.vertexColors||t.instancingColor?"#define USE_COLOR":"",t.vertexAlphas||t.batchingColor?"#define USE_COLOR_ALPHA":"",t.vertexUv1s?"#define USE_UV1":"",t.vertexUv2s?"#define USE_UV2":"",t.vertexUv3s?"#define USE_UV3":"",t.pointsUvs?"#define USE_POINTS_UV":"",t.gradientMap?"#define USE_GRADIENTMAP":"",t.flatShading?"#define FLAT_SHADED":"",t.doubleSided?"#define DOUBLE_SIDED":"",t.flipSided?"#define FLIP_SIDED":"",t.shadowMapEnabled?"#define USE_SHADOWMAP":"",t.shadowMapEnabled?"#define "+c:"",t.premultipliedAlpha?"#define PREMULTIPLIED_ALPHA":"",t.numLightProbes>0?"#define USE_LIGHT_PROBES":"",t.numLightProbeGrids>0?"#define USE_LIGHT_PROBES_GRID":"",t.decodeVideoTexture?"#define DECODE_VIDEO_TEXTURE":"",t.decodeVideoTextureEmissive?"#define DECODE_VIDEO_TEXTURE_EMISSIVE":"",t.logarithmicDepthBuffer?"#define USE_LOGARITHMIC_DEPTH_BUFFER":"",t.reversedDepthBuffer?"#define USE_REVERSED_DEPTH_BUFFER":"","uniform mat4 viewMatrix;","uniform vec3 cameraPosition;","uniform bool isOrthographic;",t.toneMapping!==ai?"#define TONE_MAPPING":"",t.toneMapping!==ai?it.tonemapping_pars_fragment:"",t.toneMapping!==ai?UM("toneMapping",t.toneMapping):"",t.dithering?"#define DITHERING":"",t.opaque?"#define OPAQUE":"",it.colorspace_pars_fragment,NM("linearToOutputTexel",t.outputColorSpace),FM(),t.useDepthPacking?"#define DEPTH_PACKING "+t.depthPacking:"",`
`].filter(Cr).join(`
`)),o=bc(o),o=hf(o,t),o=uf(o,t),a=bc(a),a=hf(a,t),a=uf(a,t),o=ff(o),a=ff(a),t.isRawShaderMaterial!==!0&&(M=`#version 300 es
`,g=[d,"#define attribute in","#define varying out","#define texture2D texture"].join(`
`)+`
`+g,m=["#define varying in",t.glslVersion===tu?"":"layout(location = 0) out highp vec4 pc_fragColor;",t.glslVersion===tu?"":"#define gl_FragColor pc_fragColor","#define gl_FragDepthEXT gl_FragDepth","#define texture2D texture","#define textureCube texture","#define texture2DProj textureProj","#define texture2DLodEXT textureLod","#define texture2DProjLodEXT textureProjLod","#define textureCubeLodEXT textureLod","#define texture2DGradEXT textureGrad","#define texture2DProjGradEXT textureProjGrad","#define textureCubeGradEXT textureGrad"].join(`
`)+`
`+m);const b=M+g+o,v=M+m+a,w=af(s,s.VERTEX_SHADER,b),S=af(s,s.FRAGMENT_SHADER,v);s.attachShader(_,w),s.attachShader(_,S),t.index0AttributeName!==void 0?s.bindAttribLocation(_,0,t.index0AttributeName):t.hasPositionAttribute===!0&&s.bindAttribLocation(_,0,"position"),s.linkProgram(_);function T(P){if(i.debug.checkShaderErrors){const F=s.getProgramInfoLog(_)||"",A=s.getShaderInfoLog(w)||"",I=s.getShaderInfoLog(S)||"",O=F.trim(),H=A.trim(),C=I.trim();let N=!0,U=!0;if(s.getProgramParameter(_,s.LINK_STATUS)===!1)if(N=!1,typeof i.debug.onShaderError=="function")i.debug.onShaderError(s,_,w,S);else{const k=cf(s,w,"vertex"),V=cf(s,S,"fragment");$e("WebGLProgram: Shader Error "+s.getError()+" - VALIDATE_STATUS "+s.getProgramParameter(_,s.VALIDATE_STATUS)+`

Material Name: `+P.name+`
Material Type: `+P.type+`

Program Info Log: `+O+`
`+k+`
`+V)}else O!==""?Oe("WebGLProgram: Program Info Log:",O):(H===""||C==="")&&(U=!1);U&&(P.diagnostics={runnable:N,programLog:O,vertexShader:{log:H,prefix:g},fragmentShader:{log:C,prefix:m}})}s.deleteShader(w),s.deleteShader(S),x=new ea(s,_),R=kM(s,_)}let x;this.getUniforms=function(){return x===void 0&&T(this),x};let R;this.getAttributes=function(){return R===void 0&&T(this),R};let D=t.rendererExtensionParallelShaderCompile===!1;return this.isReady=function(){return D===!1&&(D=s.getProgramParameter(_,CM)),D},this.destroy=function(){n.releaseStatesOfProgram(this),s.deleteProgram(_),this.program=void 0},this.type=t.shaderType,this.name=t.shaderName,this.id=PM++,this.cacheKey=e,this.usedTimes=1,this.program=_,this.vertexShader=w,this.fragmentShader=S,this}let ty=0;class ny{constructor(){this.shaderCache=new Map,this.materialCache=new Map}update(e,t,n){const s=this._getShaderCacheForMaterial(e);return s.has(t)===!1&&(s.add(t),t.usedTimes++),s.has(n)===!1&&(s.add(n),n.usedTimes++),this}remove(e){const t=this.materialCache.get(e);for(const n of t)n.usedTimes--,n.usedTimes===0&&this.shaderCache.delete(n.code);return this.materialCache.delete(e),this}getVertexShaderStage(e){return this._getShaderStage(e.vertexShader)}getFragmentShaderStage(e){return this._getShaderStage(e.fragmentShader)}dispose(){this.shaderCache.clear(),this.materialCache.clear()}_getShaderCacheForMaterial(e){const t=this.materialCache;let n=t.get(e);return n===void 0&&(n=new Set,t.set(e,n)),n}_getShaderStage(e){const t=this.shaderCache;let n=t.get(e);return n===void 0&&(n=new iy(e),t.set(e,n)),n}}class iy{constructor(e){this.id=ty++,this.code=e,this.usedTimes=0}}function sy(i){return i===cs||i===oa||i===aa}function ry(i,e,t,n,s,r){const o=new yd,a=new ny,c=new Set,l=[],h=new Map,u=n.logarithmicDepthBuffer;let f=n.precision;const d={MeshDepthMaterial:"depth",MeshDistanceMaterial:"distance",MeshNormalMaterial:"normal",MeshBasicMaterial:"basic",MeshLambertMaterial:"lambert",MeshPhongMaterial:"phong",MeshToonMaterial:"toon",MeshStandardMaterial:"physical",MeshPhysicalMaterial:"physical",MeshMatcapMaterial:"matcap",LineBasicMaterial:"basic",LineDashedMaterial:"dashed",PointsMaterial:"points",ShadowMaterial:"shadow",SpriteMaterial:"sprite"};function p(x){return c.add(x),x===0?"uv":`uv${x}`}function _(x,R,D,P,F,A){const I=P.fog,O=F.geometry,H=x.isMeshStandardMaterial||x.isMeshLambertMaterial||x.isMeshPhongMaterial?P.environment:null,C=x.isMeshStandardMaterial||x.isMeshLambertMaterial&&!x.envMap||x.isMeshPhongMaterial&&!x.envMap,N=e.get(x.envMap||H,C),U=N&&N.mapping===Ta?N.image.height:null,k=d[x.type];x.precision!==null&&(f=n.getMaxPrecision(x.precision),f!==x.precision&&Oe("WebGLProgram.getParameters:",x.precision,"not supported, using",f,"instead."));const V=O.morphAttributes.position||O.morphAttributes.normal||O.morphAttributes.color,ee=V!==void 0?V.length:0;let re=0;O.morphAttributes.position!==void 0&&(re=1),O.morphAttributes.normal!==void 0&&(re=2),O.morphAttributes.color!==void 0&&(re=3);let Se,be,Ve,J;if(k){const bt=ei[k];Se=bt.vertexShader,be=bt.fragmentShader}else{Se=x.vertexShader,be=x.fragmentShader;const bt=a.getVertexShaderStage(x),mt=a.getFragmentShaderStage(x);a.update(x,bt,mt),Ve=bt.id,J=mt.id}const j=i.getRenderTarget(),de=i.state.buffers.depth.getReversed(),Ue=F.isInstancedMesh===!0,ve=F.isBatchedMesh===!0,Ge=!!x.map,ht=!!x.matcap,ie=!!N,le=!!x.aoMap,he=!!x.lightMap,ce=!!x.bumpMap&&x.wireframe===!1,ue=!!x.normalMap,Xe=!!x.displacementMap,Be=!!x.emissiveMap,Ye=!!x.metalnessMap,Ke=!!x.roughnessMap,z=x.anisotropy>0,ut=x.clearcoat>0,je=x.dispersion>0,L=x.retroreflectivity>0,y=x.iridescence>0,X=x.sheen>0,$=x.transmission>0,Q=z&&!!x.anisotropyMap,fe=ut&&!!x.clearcoatMap,pe=ut&&!!x.clearcoatNormalMap,te=ut&&!!x.clearcoatRoughnessMap,se=y&&!!x.iridescenceMap,me=y&&!!x.iridescenceThicknessMap,ke=X&&!!x.sheenColorMap,Me=X&&!!x.sheenRoughnessMap,ge=!!x.specularMap,ze=!!x.specularColorMap,qe=!!x.specularIntensityMap,et=$&&!!x.transmissionMap,W=$&&!!x.thicknessMap,_e=!!x.gradientMap,ne=!!x.alphaMap,xe=x.alphaTest>0,Ee=!!x.alphaHash,ae=!!x.extensions;let We=ai;x.toneMapped&&(j===null||j.isXRRenderTarget===!0)&&(We=i.toneMapping);const De={shaderID:k,shaderType:x.type,shaderName:x.name,vertexShader:Se,fragmentShader:be,defines:x.defines,customVertexShaderID:Ve,customFragmentShaderID:J,isRawShaderMaterial:x.isRawShaderMaterial===!0,glslVersion:x.glslVersion,precision:f,batching:ve,batchingColor:ve&&F._colorsTexture!==null,instancing:Ue,instancingColor:Ue&&F.instanceColor!==null,instancingMorph:Ue&&F.morphTexture!==null,outputColorSpace:j===null?i.outputColorSpace:j.isXRRenderTarget===!0?j.texture.colorSpace:at.workingColorSpace,alphaToCoverage:!!x.alphaToCoverage,map:Ge,matcap:ht,envMap:ie,envMapMode:ie&&N.mapping,envMapCubeUVHeight:U,aoMap:le,lightMap:he,bumpMap:ce,normalMap:ue,displacementMap:Xe,emissiveMap:Be,normalMapObjectSpace:ue&&x.normalMapType===um,normalMapTangentSpace:ue&&x.normalMapType===la,packedNormalMap:ue&&x.normalMapType===la&&sy(x.normalMap.format),metalnessMap:Ye,roughnessMap:Ke,anisotropy:z,anisotropyMap:Q,clearcoat:ut,clearcoatMap:fe,clearcoatNormalMap:pe,clearcoatRoughnessMap:te,dispersion:je,retroreflection:L,iridescence:y,iridescenceMap:se,iridescenceThicknessMap:me,sheen:X,sheenColorMap:ke,sheenRoughnessMap:Me,specularMap:ge,specularColorMap:ze,specularIntensityMap:qe,transmission:$,transmissionMap:et,thicknessMap:W,gradientMap:_e,opaque:x.transparent===!1&&x.blending===Lr&&x.alphaToCoverage===!1,alphaMap:ne,alphaTest:xe,alphaHash:Ee,combine:x.combine,mapUv:Ge&&p(x.map.channel),aoMapUv:le&&p(x.aoMap.channel),lightMapUv:he&&p(x.lightMap.channel),bumpMapUv:ce&&p(x.bumpMap.channel),normalMapUv:ue&&p(x.normalMap.channel),displacementMapUv:Xe&&p(x.displacementMap.channel),emissiveMapUv:Be&&p(x.emissiveMap.channel),metalnessMapUv:Ye&&p(x.metalnessMap.channel),roughnessMapUv:Ke&&p(x.roughnessMap.channel),anisotropyMapUv:Q&&p(x.anisotropyMap.channel),clearcoatMapUv:fe&&p(x.clearcoatMap.channel),clearcoatNormalMapUv:pe&&p(x.clearcoatNormalMap.channel),clearcoatRoughnessMapUv:te&&p(x.clearcoatRoughnessMap.channel),iridescenceMapUv:se&&p(x.iridescenceMap.channel),iridescenceThicknessMapUv:me&&p(x.iridescenceThicknessMap.channel),sheenColorMapUv:ke&&p(x.sheenColorMap.channel),sheenRoughnessMapUv:Me&&p(x.sheenRoughnessMap.channel),specularMapUv:ge&&p(x.specularMap.channel),specularColorMapUv:ze&&p(x.specularColorMap.channel),specularIntensityMapUv:qe&&p(x.specularIntensityMap.channel),transmissionMapUv:et&&p(x.transmissionMap.channel),thicknessMapUv:W&&p(x.thicknessMap.channel),alphaMapUv:ne&&p(x.alphaMap.channel),vertexTangents:!!O.attributes.tangent&&(ue||z),vertexNormals:!!O.attributes.normal,vertexColors:x.vertexColors,vertexAlphas:x.vertexColors===!0&&!!O.attributes.color&&O.attributes.color.itemSize===4,pointsUvs:F.isPoints===!0&&!!O.attributes.uv&&(Ge||ne),fog:!!I,useFog:x.fog===!0,fogExp2:!!I&&I.isFogExp2,flatShading:x.wireframe===!1&&(x.flatShading===!0||O.attributes.normal===void 0&&ue===!1&&(x.isMeshLambertMaterial||x.isMeshPhongMaterial||x.isMeshStandardMaterial||x.isMeshPhysicalMaterial)),sizeAttenuation:x.sizeAttenuation===!0,logarithmicDepthBuffer:u,reversedDepthBuffer:de,skinning:F.isSkinnedMesh===!0,hasPositionAttribute:O.attributes.position!==void 0,morphTargets:O.morphAttributes.position!==void 0,morphNormals:O.morphAttributes.normal!==void 0,morphColors:O.morphAttributes.color!==void 0,morphTargetsCount:ee,morphTextureStride:re,numSunLights:R.sun.length,numDirLights:R.directional.length,numPointLights:R.point.length,numSpotLights:R.spot.length,numSpotLightMaps:R.spotLightMap.length,numRectAreaLights:R.rectArea.length,numHemiLights:R.hemi.length,numSunLightShadows:R.sunShadowMap.length,numDirLightShadows:R.directionalShadowMap.length,numPointLightShadows:R.pointShadowMap.length,numSpotLightShadows:R.spotShadowMap.length,numSpotLightShadowsWithMaps:R.numSpotLightShadowsWithMaps,numLightProbes:R.numLightProbes,numLightProbeGrids:A.length,numClippingPlanes:r.numPlanes,numClipIntersection:r.numIntersection,dithering:x.dithering,shadowMapEnabled:i.shadowMap.enabled&&D.length>0,shadowMapType:i.shadowMap.type,toneMapping:We,decodeVideoTexture:Ge&&x.map.isVideoTexture===!0&&at.getTransfer(x.map.colorSpace)===_t,decodeVideoTextureEmissive:Be&&x.emissiveMap.isVideoTexture===!0&&at.getTransfer(x.emissiveMap.colorSpace)===_t,premultipliedAlpha:x.premultipliedAlpha,doubleSided:x.side===Vn,flipSided:x.side===un,useDepthPacking:x.depthPacking>=0,depthPacking:x.depthPacking||0,index0AttributeName:x.index0AttributeName,extensionClipCullDistance:ae&&x.extensions.clipCullDistance===!0&&t.has("WEBGL_clip_cull_distance"),extensionMultiDraw:(ae&&x.extensions.multiDraw===!0||ve)&&t.has("WEBGL_multi_draw"),rendererExtensionParallelShaderCompile:t.has("KHR_parallel_shader_compile"),customProgramCacheKey:x.customProgramCacheKey()};return De.vertexUv1s=c.has(1),De.vertexUv2s=c.has(2),De.vertexUv3s=c.has(3),c.clear(),De}function g(x){const R=[];if(x.shaderID?R.push(x.shaderID):(R.push(x.customVertexShaderID),R.push(x.customFragmentShaderID)),x.defines!==void 0)for(const D in x.defines)R.push(D),R.push(x.defines[D]);return x.isRawShaderMaterial===!1&&(m(R,x),M(R,x),R.push(i.outputColorSpace)),R.push(x.customProgramCacheKey),R.join()}function m(x,R){x.push(R.precision),x.push(R.outputColorSpace),x.push(R.envMapMode),x.push(R.envMapCubeUVHeight),x.push(R.mapUv),x.push(R.alphaMapUv),x.push(R.lightMapUv),x.push(R.aoMapUv),x.push(R.bumpMapUv),x.push(R.normalMapUv),x.push(R.displacementMapUv),x.push(R.emissiveMapUv),x.push(R.metalnessMapUv),x.push(R.roughnessMapUv),x.push(R.anisotropyMapUv),x.push(R.clearcoatMapUv),x.push(R.clearcoatNormalMapUv),x.push(R.clearcoatRoughnessMapUv),x.push(R.iridescenceMapUv),x.push(R.iridescenceThicknessMapUv),x.push(R.sheenColorMapUv),x.push(R.sheenRoughnessMapUv),x.push(R.specularMapUv),x.push(R.specularColorMapUv),x.push(R.specularIntensityMapUv),x.push(R.transmissionMapUv),x.push(R.thicknessMapUv),x.push(R.combine),x.push(R.fogExp2),x.push(R.sizeAttenuation),x.push(R.morphTargetsCount),x.push(R.morphAttributeCount),x.push(R.numSunLights),x.push(R.numDirLights),x.push(R.numPointLights),x.push(R.numSpotLights),x.push(R.numSpotLightMaps),x.push(R.numHemiLights),x.push(R.numRectAreaLights),x.push(R.numSunLightShadows),x.push(R.numDirLightShadows),x.push(R.numPointLightShadows),x.push(R.numSpotLightShadows),x.push(R.numSpotLightShadowsWithMaps),x.push(R.numLightProbes),x.push(R.shadowMapType),x.push(R.toneMapping),x.push(R.numClippingPlanes),x.push(R.numClipIntersection),x.push(R.depthPacking)}function M(x,R){o.disableAll(),R.instancing&&o.enable(0),R.instancingColor&&o.enable(1),R.instancingMorph&&o.enable(2),R.matcap&&o.enable(3),R.envMap&&o.enable(4),R.normalMapObjectSpace&&o.enable(5),R.normalMapTangentSpace&&o.enable(6),R.clearcoat&&o.enable(7),R.iridescence&&o.enable(8),R.alphaTest&&o.enable(9),R.vertexColors&&o.enable(10),R.vertexAlphas&&o.enable(11),R.vertexUv1s&&o.enable(12),R.vertexUv2s&&o.enable(13),R.vertexUv3s&&o.enable(14),R.vertexTangents&&o.enable(15),R.anisotropy&&o.enable(16),R.alphaHash&&o.enable(17),R.batching&&o.enable(18),R.dispersion&&o.enable(19),R.retroreflection&&o.enable(24),R.batchingColor&&o.enable(20),R.gradientMap&&o.enable(21),R.packedNormalMap&&o.enable(22),R.vertexNormals&&o.enable(23),x.push(o.mask),o.disableAll(),R.fog&&o.enable(0),R.useFog&&o.enable(1),R.flatShading&&o.enable(2),R.logarithmicDepthBuffer&&o.enable(3),R.reversedDepthBuffer&&o.enable(4),R.skinning&&o.enable(5),R.morphTargets&&o.enable(6),R.morphNormals&&o.enable(7),R.morphColors&&o.enable(8),R.premultipliedAlpha&&o.enable(9),R.shadowMapEnabled&&o.enable(10),R.doubleSided&&o.enable(11),R.flipSided&&o.enable(12),R.useDepthPacking&&o.enable(13),R.dithering&&o.enable(14),R.transmission&&o.enable(15),R.sheen&&o.enable(16),R.opaque&&o.enable(17),R.pointsUvs&&o.enable(18),R.decodeVideoTexture&&o.enable(19),R.decodeVideoTextureEmissive&&o.enable(20),R.alphaToCoverage&&o.enable(21),R.numLightProbeGrids>0&&o.enable(22),R.hasPositionAttribute&&o.enable(23),x.push(o.mask)}function b(x){const R=d[x.type];let D;if(R){const P=ei[R];D=Qr.clone(P.uniforms)}else D=x.uniforms;return D}function v(x,R){let D=h.get(R);return D!==void 0?++D.usedTimes:(D=new ey(i,R,x,s),l.push(D),h.set(R,D)),D}function w(x){if(--x.usedTimes===0){const R=l.indexOf(x);l[R]=l[l.length-1],l.pop(),h.delete(x.cacheKey),x.destroy()}}function S(x){a.remove(x)}function T(){a.dispose()}return{getParameters:_,getProgramCacheKey:g,getUniforms:b,acquireProgram:v,releaseProgram:w,releaseShaderCache:S,programs:l,dispose:T}}function oy(){let i=new WeakMap;function e(o){return i.has(o)}function t(o){let a=i.get(o);return a===void 0&&(a={},i.set(o,a)),a}function n(o){i.delete(o)}function s(o,a,c){i.get(o)[a]=c}function r(){i=new WeakMap}return{has:e,get:t,remove:n,update:s,dispose:r}}function ay(i,e){return i.groupOrder!==e.groupOrder?i.groupOrder-e.groupOrder:i.renderOrder!==e.renderOrder?i.renderOrder-e.renderOrder:i.material.id!==e.material.id?i.material.id-e.material.id:i.materialVariant!==e.materialVariant?i.materialVariant-e.materialVariant:i.z!==e.z?i.z-e.z:i.id-e.id}function pf(i,e){return i.groupOrder!==e.groupOrder?i.groupOrder-e.groupOrder:i.renderOrder!==e.renderOrder?i.renderOrder-e.renderOrder:i.z!==e.z?e.z-i.z:i.id-e.id}function mf(){const i=[];let e=0;const t=[],n=[],s=[];function r(){e=0,t.length=0,n.length=0,s.length=0}function o(f){let d=0;return f.isInstancedMesh&&(d+=2),f.isSkinnedMesh&&(d+=1),d}function a(f,d,p,_,g,m){let M=i[e];return M===void 0?(M={id:f.id,object:f,geometry:d,material:p,materialVariant:o(f),groupOrder:_,renderOrder:f.renderOrder,z:g,group:m},i[e]=M):(M.id=f.id,M.object=f,M.geometry=d,M.material=p,M.materialVariant=o(f),M.groupOrder=_,M.renderOrder=f.renderOrder,M.z=g,M.group=m),e++,M}function c(f,d,p,_,g,m,M){M.reversedDepth===!0&&(g=-g);const b=a(f,d,p,_,g,m);p.transmission>0?n.push(b):p.transparent===!0?s.push(b):t.push(b)}function l(f,d,p,_,g,m){const M=a(f,d,p,_,g,m);p.transmission>0?n.unshift(M):p.transparent===!0?s.unshift(M):t.unshift(M)}function h(f,d){t.length>1&&t.sort(f||ay),n.length>1&&n.sort(d||pf),s.length>1&&s.sort(d||pf)}function u(){for(let f=e,d=i.length;f<d;f++){const p=i[f];if(p.id===null)break;p.id=null,p.object=null,p.geometry=null,p.material=null,p.group=null}}return{opaque:t,transmissive:n,transparent:s,init:r,push:c,unshift:l,finish:u,sort:h}}function ly(){let i=new WeakMap;function e(n,s){const r=i.get(n);let o;return r===void 0?(o=new mf,i.set(n,[o])):s>=r.length?(o=new mf,r.push(o)):o=r[s],o}function t(){i=new WeakMap}return{get:e,dispose:t}}function cy(){const i={};return{get:function(e){if(i[e.id]!==void 0)return i[e.id];let t;switch(e.type){case"SunLight":case"DirectionalLight":t={direction:new B,color:new Ne};break;case"SpotLight":t={position:new B,direction:new B,color:new Ne,distance:0,coneCos:0,penumbraCos:0,decay:0};break;case"PointLight":t={position:new B,color:new Ne,distance:0,decay:0};break;case"HemisphereLight":t={direction:new B,skyColor:new Ne,groundColor:new Ne};break;case"RectAreaLight":t={color:new Ne,position:new B,halfWidth:new B,halfHeight:new B};break}return i[e.id]=t,t}}}function hy(){const i={};return{get:function(e){if(i[e.id]!==void 0)return i[e.id];let t;switch(e.type){case"SunLight":case"DirectionalLight":t={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new oe};break;case"SpotLight":t={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new oe};break;case"PointLight":t={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new oe,shadowCameraNear:1,shadowCameraFar:1e3};break}return i[e.id]=t,t}}}let uy=0;function fy(i,e){return(e.castShadow?2:0)-(i.castShadow?2:0)+(e.map?1:0)-(i.map?1:0)}function dy(i){const e=new cy,t=hy(),n={version:0,hash:{sunLength:-1,directionalLength:-1,pointLength:-1,spotLength:-1,rectAreaLength:-1,hemiLength:-1,numSunShadows:-1,numDirectionalShadows:-1,numPointShadows:-1,numSpotShadows:-1,numSpotMaps:-1,numLightProbes:-1},ambient:[0,0,0],probe:[],sun:[],sunShadow:[],sunShadowMap:[],sunShadowMatrix:[],sunShadowCascade:[],directional:[],directionalShadow:[],directionalShadowMap:[],directionalShadowMatrix:[],spot:[],spotLightMap:[],spotShadow:[],spotShadowMap:[],spotLightMatrix:[],rectArea:[],rectAreaLTC1:null,rectAreaLTC2:null,point:[],pointShadow:[],pointShadowMap:[],pointShadowMatrix:[],hemi:[],numSpotLightShadowsWithMaps:0,numLightProbes:0};for(let l=0;l<9;l++)n.probe.push(new B);const s=new B,r=new Qe,o=new Qe;function a(l){let h=0,u=0,f=0;for(let F=0;F<9;F++)n.probe[F].set(0,0,0);let d=0,p=0,_=0,g=0,m=0,M=0,b=0,v=0,w=0,S=0,T=0,x=0,R=0,D=0;l.sort(fy);for(let F=0,A=l.length;F<A;F++){const I=l[F],O=I.color,H=I.intensity,C=I.distance;let N=null;if(I.shadow&&I.shadow.map&&(I.shadow.map.texture.format===cs?N=I.shadow.map.texture:N=I.shadow.map.depthTexture||I.shadow.map.texture),I.isAmbientLight)h+=O.r*H,u+=O.g*H,f+=O.b*H;else if(I.isLightProbe){for(let U=0;U<9;U++)n.probe[U].addScaledVector(I.sh.coefficients[U],H);D++}else if(I.isSunLight){const U=e.get(I);if(U.color.copy(I.color).multiplyScalar(I.intensity),I.castShadow){const k=I.shadow,V=t.get(I);V.shadowIntensity=k.intensity,V.shadowBias=k.bias,V.shadowNormalBias=k.normalBias,V.shadowRadius=k.radius,V.shadowMapSize.copy(k.mapSize).multiply(k.getFrameExtents()),n.sunShadow[p]=V,n.sunShadowMap[p]=N;const ee=k.getViewportCount();for(let re=0;re<ee;re++)n.sunShadowMatrix[_+re]=k.getMatrix(re),n.sunShadowCascade[_+re]=k._cascadeData[re];_+=ee,p++}n.sun[d]=U,d++}else if(I.isDirectionalLight){const U=e.get(I);if(U.color.copy(I.color).multiplyScalar(I.intensity),I.castShadow){const k=I.shadow,V=t.get(I);V.shadowIntensity=k.intensity,V.shadowBias=k.bias,V.shadowNormalBias=k.normalBias,V.shadowRadius=k.radius,V.shadowMapSize=k.mapSize,n.directionalShadow[g]=V,n.directionalShadowMap[g]=N,n.directionalShadowMatrix[g]=I.shadow.matrix,w++}n.directional[g]=U,g++}else if(I.isSpotLight){const U=e.get(I);U.position.setFromMatrixPosition(I.matrixWorld),U.color.copy(O).multiplyScalar(H),U.distance=C,U.coneCos=Math.cos(I.angle),U.penumbraCos=Math.cos(I.angle*(1-I.penumbra)),U.decay=I.decay,n.spot[M]=U;const k=I.shadow;if(I.map&&(n.spotLightMap[x]=I.map,x++,k.updateMatrices(I),I.castShadow&&R++),n.spotLightMatrix[M]=k.matrix,I.castShadow){const V=t.get(I);V.shadowIntensity=k.intensity,V.shadowBias=k.bias,V.shadowNormalBias=k.normalBias,V.shadowRadius=k.radius,V.shadowMapSize=k.mapSize,n.spotShadow[M]=V,n.spotShadowMap[M]=N,T++}M++}else if(I.isRectAreaLight){const U=e.get(I);U.color.copy(O).multiplyScalar(H),U.halfWidth.set(I.width*.5,0,0),U.halfHeight.set(0,I.height*.5,0),n.rectArea[b]=U,b++}else if(I.isPointLight){const U=e.get(I);if(U.color.copy(I.color).multiplyScalar(I.intensity),U.distance=I.distance,U.decay=I.decay,I.castShadow){const k=I.shadow,V=t.get(I);V.shadowIntensity=k.intensity,V.shadowBias=k.bias,V.shadowNormalBias=k.normalBias,V.shadowRadius=k.radius,V.shadowMapSize=k.mapSize,V.shadowCameraNear=k.camera.near,V.shadowCameraFar=k.camera.far,n.pointShadow[m]=V,n.pointShadowMap[m]=N,n.pointShadowMatrix[m]=I.shadow.matrix,S++}n.point[m]=U,m++}else if(I.isHemisphereLight){const U=e.get(I);U.skyColor.copy(I.color).multiplyScalar(H),U.groundColor.copy(I.groundColor).multiplyScalar(H),n.hemi[v]=U,v++}}b>0&&(i.has("OES_texture_float_linear")===!0?(n.rectAreaLTC1=ye.LTC_FLOAT_1,n.rectAreaLTC2=ye.LTC_FLOAT_2):(n.rectAreaLTC1=ye.LTC_HALF_1,n.rectAreaLTC2=ye.LTC_HALF_2)),n.ambient[0]=h,n.ambient[1]=u,n.ambient[2]=f;const P=n.hash;(P.sunLength!==d||P.directionalLength!==g||P.pointLength!==m||P.spotLength!==M||P.rectAreaLength!==b||P.hemiLength!==v||P.numSunShadows!==p||P.numDirectionalShadows!==w||P.numPointShadows!==S||P.numSpotShadows!==T||P.numSpotMaps!==x||P.numLightProbes!==D)&&(n.sun.length=d,n.directional.length=g,n.spot.length=M,n.rectArea.length=b,n.point.length=m,n.hemi.length=v,n.sunShadow.length=p,n.sunShadowMap.length=p,n.sunShadowMatrix.length=_,n.sunShadowCascade.length=_,n.directionalShadow.length=w,n.directionalShadowMap.length=w,n.directionalShadowMatrix.length=w,n.pointShadow.length=S,n.pointShadowMap.length=S,n.pointShadowMatrix.length=S,n.spotShadow.length=T,n.spotShadowMap.length=T,n.spotLightMatrix.length=T+x-R,n.spotLightMap.length=x,n.numSpotLightShadowsWithMaps=R,n.numLightProbes=D,P.sunLength=d,P.directionalLength=g,P.pointLength=m,P.spotLength=M,P.rectAreaLength=b,P.hemiLength=v,P.numSunShadows=p,P.numDirectionalShadows=w,P.numPointShadows=S,P.numSpotShadows=T,P.numSpotMaps=x,P.numLightProbes=D,n.version=uy++)}function c(l,h){let u=0,f=0,d=0,p=0,_=0,g=0;const m=h.matrixWorldInverse;for(let M=0,b=l.length;M<b;M++){const v=l[M];if(v.isSunLight){const w=n.sun[u];w.direction.setFromMatrixPosition(v.matrixWorld),w.direction.transformDirection(m),u++}else if(v.isDirectionalLight){const w=n.directional[f];w.direction.setFromMatrixPosition(v.matrixWorld),s.setFromMatrixPosition(v.target.matrixWorld),w.direction.sub(s),w.direction.transformDirection(m),f++}else if(v.isSpotLight){const w=n.spot[p];w.position.setFromMatrixPosition(v.matrixWorld),w.position.applyMatrix4(m),w.direction.setFromMatrixPosition(v.matrixWorld),s.setFromMatrixPosition(v.target.matrixWorld),w.direction.sub(s),w.direction.transformDirection(m),p++}else if(v.isRectAreaLight){const w=n.rectArea[_];w.position.setFromMatrixPosition(v.matrixWorld),w.position.applyMatrix4(m),o.identity(),r.copy(v.matrixWorld),r.premultiply(m),o.extractRotation(r),w.halfWidth.set(v.width*.5,0,0),w.halfHeight.set(0,v.height*.5,0),w.halfWidth.applyMatrix4(o),w.halfHeight.applyMatrix4(o),_++}else if(v.isPointLight){const w=n.point[d];w.position.setFromMatrixPosition(v.matrixWorld),w.position.applyMatrix4(m),d++}else if(v.isHemisphereLight){const w=n.hemi[g];w.direction.setFromMatrixPosition(v.matrixWorld),w.direction.transformDirection(m),g++}}}return{setup:a,setupView:c,state:n}}function gf(i){const e=new dy(i),t=[],n=[],s=[];function r(f){u.camera=f,t.length=0,n.length=0,s.length=0}function o(f){t.push(f)}function a(f){n.push(f)}function c(f){s.push(f)}function l(){e.setup(t)}function h(f){e.setupView(t,f)}const u={lightsArray:t,shadowsArray:n,lightProbeGridArray:s,camera:null,lights:e,transmissionRenderTarget:{},textureUnits:0};return{init:r,state:u,setupLights:l,setupLightsView:h,pushLight:o,pushShadow:a,pushLightProbeGrid:c}}function py(i){let e=new WeakMap;function t(s,r=0){const o=e.get(s);let a;return o===void 0?(a=new gf(i),e.set(s,[a])):r>=o.length?(a=new gf(i),o.push(a)):a=o[r],a}function n(){e=new WeakMap}return{get:t,dispose:n}}const my=`void main() {
	gl_Position = vec4( position, 1.0 );
}`,gy=`uniform sampler2D shadow_pass;
uniform vec2 resolution;
uniform float radius;
void main() {
	const float samples = float( VSM_SAMPLES );
	float mean = 0.0;
	float squared_mean = 0.0;
	float uvStride = samples <= 1.0 ? 0.0 : 2.0 / ( samples - 1.0 );
	float uvStart = samples <= 1.0 ? 0.0 : - 1.0;
	for ( float i = 0.0; i < samples; i ++ ) {
		float uvOffset = uvStart + i * uvStride;
		#ifdef HORIZONTAL_PASS
			vec2 distribution = texture2D( shadow_pass, ( gl_FragCoord.xy + vec2( uvOffset, 0.0 ) * radius ) / resolution ).rg;
			mean += distribution.x;
			squared_mean += distribution.y * distribution.y + distribution.x * distribution.x;
		#else
			float depth = texture2D( shadow_pass, ( gl_FragCoord.xy + vec2( 0.0, uvOffset ) * radius ) / resolution ).r;
			mean += depth;
			squared_mean += depth * depth;
		#endif
	}
	mean = mean / samples;
	squared_mean = squared_mean / samples;
	float std_dev = sqrt( max( 0.0, squared_mean - mean * mean ) );
	gl_FragColor = vec4( mean, std_dev, 0.0, 1.0 );
}`,_y=[new B(1,0,0),new B(-1,0,0),new B(0,1,0),new B(0,-1,0),new B(0,0,1),new B(0,0,-1)],xy=[new B(0,-1,0),new B(0,-1,0),new B(0,0,1),new B(0,0,-1),new B(0,-1,0),new B(0,-1,0)],_f=new Qe,yr=new B,vl=new B;function vy(i,e,t){let n=new sh;const s=new oe,r=new oe,o=new St,a=new Q0,c=new eg,l={},h=t.maxTextureSize,u={[Xi]:un,[un]:Xi,[Vn]:Vn},f=new en({defines:{VSM_SAMPLES:8},uniforms:{shadow_pass:{value:null},resolution:{value:new oe},radius:{value:4}},vertexShader:my,fragmentShader:gy}),d=f.clone();d.defines.HORIZONTAL_PASS=1;const p=new Mt;p.setAttribute("position",new qt(new Float32Array([-1,-1,.5,3,-1,.5,-1,3,.5]),3));const _=new K(p,f),g=this;this.enabled=!1,this.autoUpdate=!0,this.needsUpdate=!1,this.type=qo;let m=this.type;this.render=function(S,T,x){if(g.enabled===!1||g.autoUpdate===!1&&g.needsUpdate===!1||S.length===0)return;this.type===od&&(Oe("WebGLShadowMap: PCFSoftShadowMap has been removed. Using PCFShadowMap instead."),this.type=qo);const R=i.getRenderTarget(),D=i.getActiveCubeFace(),P=i.getActiveMipmapLevel(),F=i.state;F.setBlending(oi),F.buffers.depth.getReversed()===!0?F.buffers.color.setClear(0,0,0,0):F.buffers.color.setClear(1,1,1,1),F.buffers.depth.setTest(!0),F.setScissorTest(!1);const A=m!==this.type;A&&T.traverse(function(I){I.material&&(Array.isArray(I.material)?I.material.forEach(O=>O.needsUpdate=!0):I.material.needsUpdate=!0)});for(let I=0,O=S.length;I<O;I++){const H=S[I],C=H.shadow;if(C===void 0){Oe("WebGLShadowMap:",H,"has no shadow.");continue}if(C.autoUpdate===!1&&C.needsUpdate===!1)continue;s.copy(C.mapSize);const N=C.getFrameExtents();s.multiply(N),r.copy(C.mapSize),(s.x>h||s.y>h)&&(s.x>h&&(r.x=Math.floor(h/N.x),s.x=r.x*N.x,C.mapSize.x=r.x),s.y>h&&(r.y=Math.floor(h/N.y),s.y=r.y*N.y,C.mapSize.y=r.y));const U=i.state.buffers.depth.getReversed();if(C.camera._reversedDepth=U,C.map===null||A===!0){if(C.map!==null&&(C.map.depthTexture!==null&&(C.map.depthTexture.dispose(),C.map.depthTexture=null),C.map.dispose()),this.type===Er){if(H.isPointLight){Oe("WebGLShadowMap: VSM shadow maps are not supported for PointLights. Use PCF or BasicShadowMap instead.");continue}C.map=new cn(s.x,s.y,{format:cs,type:fn,minFilter:zt,magFilter:zt,generateMipmaps:!1}),C.map.texture.name=H.name+".shadowMap",C.map.depthTexture=new $r(s.x,s.y,In),C.map.depthTexture.name=H.name+".shadowMapDepth",C.map.depthTexture.format=Ri,C.map.depthTexture.compareFunction=null,C.map.depthTexture.minFilter=kt,C.map.depthTexture.magFilter=kt}else H.isPointLight?(C.map=new Kd(s.x),C.map.depthTexture=new p0(s.x,li)):(C.map=new cn(s.x,s.y),C.map.depthTexture=new $r(s.x,s.y,li)),C.map.depthTexture.name=H.name+".shadowMap",C.map.depthTexture.format=Ri,this.type===qo?(C.map.depthTexture.compareFunction=U?Zc:Jc,C.map.depthTexture.minFilter=zt,C.map.depthTexture.magFilter=zt):(C.map.depthTexture.compareFunction=null,C.map.depthTexture.minFilter=kt,C.map.depthTexture.magFilter=kt);C.camera.updateProjectionMatrix()}C.map.isWebGLCubeRenderTarget!==!0&&(C.map.width!==s.x||C.map.height!==s.y)&&C.map.setSize(s.x,s.y);const k=C.map.isWebGLCubeRenderTarget?6:C.getViewportCount();H.isPointLight!==!0&&C.updateMatrices(H,x);for(let V=0;V<k;V++){const ee=C.getCamera(V);if(H.isPointLight){const re=C.camera,Se=C.matrix,be=H.distance||re.far;be!==re.far&&(re.far=be,re.updateProjectionMatrix()),yr.setFromMatrixPosition(H.matrixWorld),re.position.copy(yr),vl.copy(re.position),vl.add(_y[V]),re.up.copy(xy[V]),re.lookAt(vl),re.updateMatrixWorld(),Se.makeTranslation(-yr.x,-yr.y,-yr.z),_f.multiplyMatrices(re.projectionMatrix,re.matrixWorldInverse),C._frustum.setFromProjectionMatrix(_f,re.coordinateSystem,re.reversedDepth)}if(C.map.isWebGLCubeRenderTarget)i.setRenderTarget(C.map,V),i.clear();else{V===0&&(i.setRenderTarget(C.map),i.clear());const re=C.getViewport(V);o.set(r.x*re.x,r.y*re.y,r.x*re.z,r.y*re.w),F.viewport(o)}n=C.getFrustum(V),v(T,x,ee,H,this.type)}C.isPointLightShadow!==!0&&this.type===Er&&M(C,x),C.needsUpdate=!1}m=this.type,g.needsUpdate=!1,i.setRenderTarget(R,D,P)};function M(S,T){const x=e.update(_);f.defines.VSM_SAMPLES!==S.blurSamples&&(f.defines.VSM_SAMPLES=S.blurSamples,d.defines.VSM_SAMPLES=S.blurSamples,f.needsUpdate=!0,d.needsUpdate=!0),S.mapPass===null?S.mapPass=new cn(s.x,s.y,{format:cs,type:fn}):(S.mapPass.width!==S.map.width||S.mapPass.height!==S.map.height)&&S.mapPass.setSize(S.map.width,S.map.height),f.uniforms.shadow_pass.value=S.map.depthTexture,f.uniforms.resolution.value.set(S.map.width,S.map.height),f.uniforms.radius.value=S.radius,i.setRenderTarget(S.mapPass),i.clear(),i.renderBufferDirect(T,null,x,f,_,null),d.uniforms.shadow_pass.value=S.mapPass.texture,d.uniforms.resolution.value.set(S.map.width,S.map.height),d.uniforms.radius.value=S.radius,i.setRenderTarget(S.map),i.clear(),i.renderBufferDirect(T,null,x,d,_,null)}function b(S,T,x,R){let D=null;const P=x.isPointLight===!0?S.customDistanceMaterial:S.customDepthMaterial;if(P!==void 0)D=P;else if(D=x.isPointLight===!0?c:a,i.localClippingEnabled&&T.clipShadows===!0&&Array.isArray(T.clippingPlanes)&&T.clippingPlanes.length!==0||T.displacementMap&&T.displacementScale!==0||T.alphaMap&&T.alphaTest>0||T.map&&T.alphaTest>0||T.alphaToCoverage===!0){const F=D.uuid,A=T.uuid;let I=l[F];I===void 0&&(I={},l[F]=I);let O=I[A];O===void 0&&(O=D.clone(),I[A]=O,T.addEventListener("dispose",w)),D=O}if(D.visible=T.visible,D.wireframe=T.wireframe,R===Er?D.side=T.shadowSide!==null?T.shadowSide:T.side:D.side=T.shadowSide!==null?T.shadowSide:u[T.side],D.alphaMap=T.alphaMap,D.alphaTest=T.alphaToCoverage===!0?.5:T.alphaTest,D.map=T.map,D.clipShadows=T.clipShadows,D.clippingPlanes=T.clippingPlanes,D.clipIntersection=T.clipIntersection,D.displacementMap=T.displacementMap,D.displacementScale=T.displacementScale,D.displacementBias=T.displacementBias,D.wireframeLinewidth=T.wireframeLinewidth,D.linewidth=T.linewidth,x.isPointLight===!0&&D.isMeshDistanceMaterial===!0){const F=i.properties.get(D);F.light=x}return D}function v(S,T,x,R,D){if(S.visible===!1)return;if(S.layers.test(T.layers)&&(S.isMesh||S.isLine||S.isPoints)&&(S.castShadow||S.receiveShadow&&D===Er)&&(!S.frustumCulled||S.intersectsFrustum(n))){S.modelViewMatrix.multiplyMatrices(x.matrixWorldInverse,S.matrixWorld);const A=e.update(S),I=S.material;if(Array.isArray(I)){const O=A.groups;for(let H=0,C=O.length;H<C;H++){const N=O[H],U=I[N.materialIndex];if(U&&U.visible){const k=b(S,U,R,D);S.onBeforeShadow(i,S,T,x,A,k,N),i.renderBufferDirect(x,null,A,k,S,N),S.onAfterShadow(i,S,T,x,A,k,N)}}}else if(I.visible){const O=b(S,I,R,D);S.onBeforeShadow(i,S,T,x,A,O,null),i.renderBufferDirect(x,null,A,O,S,null),S.onAfterShadow(i,S,T,x,A,O,null)}}const F=S.children;for(let A=0,I=F.length;A<I;A++)v(F[A],T,x,R,D)}function w(S){S.target.removeEventListener("dispose",w);for(const x in l){const R=l[x],D=S.target.uuid;D in R&&(R[D].dispose(),delete R[D])}}}function My(i,e){function t(){let W=!1;const _e=new St;let ne=null;const xe=new St(0,0,0,0);return{setMask:function(Ee){ne!==Ee&&!W&&(i.colorMask(Ee,Ee,Ee,Ee),ne=Ee)},setLocked:function(Ee){W=Ee},setClear:function(Ee,ae,We,De,bt){bt===!0&&(Ee*=De,ae*=De,We*=De),_e.set(Ee,ae,We,De),xe.equals(_e)===!1&&(i.clearColor(Ee,ae,We,De),xe.copy(_e))},reset:function(){W=!1,ne=null,xe.set(-1,0,0,0)}}}function n(){let W=!1,_e=!1,ne=null,xe=null,Ee=null;return{setReversed:function(ae){if(_e!==ae){const We=e.get("EXT_clip_control");ae?We.clipControlEXT(We.LOWER_LEFT_EXT,We.ZERO_TO_ONE_EXT):We.clipControlEXT(We.LOWER_LEFT_EXT,We.NEGATIVE_ONE_TO_ONE_EXT),_e=ae;const De=Ee;Ee=null,this.setClear(De)}},getReversed:function(){return _e},setTest:function(ae){ae?j(i.DEPTH_TEST):de(i.DEPTH_TEST)},setMask:function(ae){ne!==ae&&!W&&(i.depthMask(ae),ne=ae)},setFunc:function(ae){if(_e&&(ae=wm[ae]),xe!==ae){switch(ae){case Dl:i.depthFunc(i.NEVER);break;case Ul:i.depthFunc(i.ALWAYS);break;case Fl:i.depthFunc(i.LESS);break;case zr:i.depthFunc(i.LEQUAL);break;case Ol:i.depthFunc(i.EQUAL);break;case Bl:i.depthFunc(i.GEQUAL);break;case kl:i.depthFunc(i.GREATER);break;case zl:i.depthFunc(i.NOTEQUAL);break;default:i.depthFunc(i.LEQUAL)}xe=ae}},setLocked:function(ae){W=ae},setClear:function(ae){Ee!==ae&&(Ee=ae,_e&&(ae=1-ae),i.clearDepth(ae))},reset:function(){W=!1,ne=null,xe=null,Ee=null,_e=!1}}}function s(){let W=!1,_e=null,ne=null,xe=null,Ee=null,ae=null,We=null,De=null,bt=null;return{setTest:function(mt){W||(mt?j(i.STENCIL_TEST):de(i.STENCIL_TEST))},setMask:function(mt){_e!==mt&&!W&&(i.stencilMask(mt),_e=mt)},setFunc:function(mt,On,qn){(ne!==mt||xe!==On||Ee!==qn)&&(i.stencilFunc(mt,On,qn),ne=mt,xe=On,Ee=qn)},setOp:function(mt,On,qn){(ae!==mt||We!==On||De!==qn)&&(i.stencilOp(mt,On,qn),ae=mt,We=On,De=qn)},setLocked:function(mt){W=mt},setClear:function(mt){bt!==mt&&(i.clearStencil(mt),bt=mt)},reset:function(){W=!1,_e=null,ne=null,xe=null,Ee=null,ae=null,We=null,De=null,bt=null}}}const r=new t,o=new n,a=new s,c=new WeakMap,l=new WeakMap;let h={},u={},f={},d=new WeakMap,p=[],_=null,g=!1,m=null,M=null,b=null,v=null,w=null,S=null,T=null,x=new Ne(0,0,0),R=0,D=!1,P=null,F=null,A=null,I=null,O=null;const H=i.getParameter(i.MAX_COMBINED_TEXTURE_IMAGE_UNITS);let C=!1,N=0;const U=i.getParameter(i.VERSION);U.indexOf("WebGL")!==-1?(N=parseFloat(/^WebGL (\d)/.exec(U)[1]),C=N>=1):U.indexOf("OpenGL ES")!==-1&&(N=parseFloat(/^OpenGL ES (\d)/.exec(U)[1]),C=N>=2);let k=null,V={};const ee=i.getParameter(i.SCISSOR_BOX),re=i.getParameter(i.VIEWPORT),Se=new St().fromArray(ee),be=new St().fromArray(re);function Ve(W,_e,ne,xe){const Ee=new Uint8Array(4),ae=i.createTexture();i.bindTexture(W,ae),i.texParameteri(W,i.TEXTURE_MIN_FILTER,i.NEAREST),i.texParameteri(W,i.TEXTURE_MAG_FILTER,i.NEAREST);for(let We=0;We<ne;We++)W===i.TEXTURE_3D||W===i.TEXTURE_2D_ARRAY?i.texImage3D(_e,0,i.RGBA,1,1,xe,0,i.RGBA,i.UNSIGNED_BYTE,Ee):i.texImage2D(_e+We,0,i.RGBA,1,1,0,i.RGBA,i.UNSIGNED_BYTE,Ee);return ae}const J={};J[i.TEXTURE_2D]=Ve(i.TEXTURE_2D,i.TEXTURE_2D,1),J[i.TEXTURE_CUBE_MAP]=Ve(i.TEXTURE_CUBE_MAP,i.TEXTURE_CUBE_MAP_POSITIVE_X,6),J[i.TEXTURE_2D_ARRAY]=Ve(i.TEXTURE_2D_ARRAY,i.TEXTURE_2D_ARRAY,1,1),J[i.TEXTURE_3D]=Ve(i.TEXTURE_3D,i.TEXTURE_3D,1,1),r.setClear(0,0,0,1),o.setClear(1),a.setClear(0),j(i.DEPTH_TEST),o.setFunc(zr),ce(!1),ue(Yh),j(i.CULL_FACE),le(oi);function j(W){h[W]!==!0&&(i.enable(W),h[W]=!0)}function de(W){h[W]!==!1&&(i.disable(W),h[W]=!1)}function Ue(W,_e){return f[W]!==_e?(i.bindFramebuffer(W,_e),f[W]=_e,W===i.DRAW_FRAMEBUFFER&&(f[i.FRAMEBUFFER]=_e),W===i.FRAMEBUFFER&&(f[i.DRAW_FRAMEBUFFER]=_e),!0):!1}function ve(W,_e){let ne=p,xe=!1;if(W){ne=d.get(_e),ne===void 0&&(ne=[],d.set(_e,ne));const Ee=W.textures;if(ne.length!==Ee.length||ne[0]!==i.COLOR_ATTACHMENT0){for(let ae=0,We=Ee.length;ae<We;ae++)ne[ae]=i.COLOR_ATTACHMENT0+ae;ne.length=Ee.length,xe=!0}}else ne[0]!==i.BACK&&(ne[0]=i.BACK,xe=!0);xe&&i.drawBuffers(ne)}function Ge(W){return _!==W?(i.useProgram(W),_=W,!0):!1}const ht={[Fs]:i.FUNC_ADD,[Vp]:i.FUNC_SUBTRACT,[Gp]:i.FUNC_REVERSE_SUBTRACT};ht[Wp]=i.MIN,ht[Xp]=i.MAX;const ie={[qp]:i.ZERO,[Yp]:i.ONE,[$p]:i.SRC_COLOR,[ad]:i.SRC_ALPHA,[em]:i.SRC_ALPHA_SATURATE,[jp]:i.DST_COLOR,[Jp]:i.DST_ALPHA,[Kp]:i.ONE_MINUS_SRC_COLOR,[ld]:i.ONE_MINUS_SRC_ALPHA,[Qp]:i.ONE_MINUS_DST_COLOR,[Zp]:i.ONE_MINUS_DST_ALPHA,[tm]:i.CONSTANT_COLOR,[nm]:i.ONE_MINUS_CONSTANT_COLOR,[im]:i.CONSTANT_ALPHA,[sm]:i.ONE_MINUS_CONSTANT_ALPHA};function le(W,_e,ne,xe,Ee,ae,We,De,bt,mt){if(W===oi){g===!0&&(de(i.BLEND),g=!1);return}if(g===!1&&(j(i.BLEND),g=!0),W!==Hp){if(W!==m||mt!==D){if((M!==Fs||w!==Fs)&&(i.blendEquation(i.FUNC_ADD),M=Fs,w=Fs),mt)switch(W){case Lr:i.blendFuncSeparate(i.ONE,i.ONE_MINUS_SRC_ALPHA,i.ONE,i.ONE_MINUS_SRC_ALPHA);break;case as:i.blendFunc(i.ONE,i.ONE);break;case $h:i.blendFuncSeparate(i.ZERO,i.ONE_MINUS_SRC_COLOR,i.ZERO,i.ONE);break;case Kh:i.blendFuncSeparate(i.DST_COLOR,i.ONE_MINUS_SRC_ALPHA,i.ZERO,i.ONE);break;default:$e("WebGLState: Invalid blending: ",W);break}else switch(W){case Lr:i.blendFuncSeparate(i.SRC_ALPHA,i.ONE_MINUS_SRC_ALPHA,i.ONE,i.ONE_MINUS_SRC_ALPHA);break;case as:i.blendFuncSeparate(i.SRC_ALPHA,i.ONE,i.ONE,i.ONE);break;case $h:$e("WebGLState: SubtractiveBlending requires material.premultipliedAlpha = true");break;case Kh:$e("WebGLState: MultiplyBlending requires material.premultipliedAlpha = true");break;default:$e("WebGLState: Invalid blending: ",W);break}b=null,v=null,S=null,T=null,x.set(0,0,0),R=0,m=W,D=mt}return}Ee=Ee||_e,ae=ae||ne,We=We||xe,(_e!==M||Ee!==w)&&(i.blendEquationSeparate(ht[_e],ht[Ee]),M=_e,w=Ee),(ne!==b||xe!==v||ae!==S||We!==T)&&(i.blendFuncSeparate(ie[ne],ie[xe],ie[ae],ie[We]),b=ne,v=xe,S=ae,T=We),(De.equals(x)===!1||bt!==R)&&(i.blendColor(De.r,De.g,De.b,bt),x.copy(De),R=bt),m=W,D=!1}function he(W,_e){W.side===Vn?de(i.CULL_FACE):j(i.CULL_FACE);let ne=W.side===un;_e&&(ne=!ne),ce(ne),W.blending===Lr&&W.transparent===!1?le(oi):le(W.blending,W.blendEquation,W.blendSrc,W.blendDst,W.blendEquationAlpha,W.blendSrcAlpha,W.blendDstAlpha,W.blendColor,W.blendAlpha,W.premultipliedAlpha),o.setFunc(W.depthFunc),o.setTest(W.depthTest),o.setMask(W.depthWrite),r.setMask(W.colorWrite);const xe=W.stencilWrite;a.setTest(xe),xe&&(a.setMask(W.stencilWriteMask),a.setFunc(W.stencilFunc,W.stencilRef,W.stencilFuncMask),a.setOp(W.stencilFail,W.stencilZFail,W.stencilZPass)),Be(W.polygonOffset,W.polygonOffsetFactor,W.polygonOffsetUnits),W.alphaToCoverage===!0?j(i.SAMPLE_ALPHA_TO_COVERAGE):de(i.SAMPLE_ALPHA_TO_COVERAGE)}function ce(W){P!==W&&(W?i.frontFace(i.CW):i.frontFace(i.CCW),P=W)}function ue(W){W!==kp?(j(i.CULL_FACE),W!==F&&(W===Yh?i.cullFace(i.BACK):W===zp?i.cullFace(i.FRONT):i.cullFace(i.FRONT_AND_BACK))):de(i.CULL_FACE),F=W}function Xe(W){W!==A&&(C&&i.lineWidth(W),A=W)}function Be(W,_e,ne){W?(j(i.POLYGON_OFFSET_FILL),(I!==_e||O!==ne)&&(I=_e,O=ne,o.getReversed()&&(_e=-_e),i.polygonOffset(_e,ne))):de(i.POLYGON_OFFSET_FILL)}function Ye(W){W?j(i.SCISSOR_TEST):de(i.SCISSOR_TEST)}function Ke(W){W===void 0&&(W=i.TEXTURE0+H-1),k!==W&&(i.activeTexture(W),k=W)}function z(W,_e,ne){ne===void 0&&(k===null?ne=i.TEXTURE0+H-1:ne=k);let xe=V[ne];xe===void 0&&(xe={type:void 0,texture:void 0},V[ne]=xe),(xe.type!==W||xe.texture!==_e)&&(k!==ne&&(i.activeTexture(ne),k=ne),i.bindTexture(W,_e||J[W]),xe.type=W,xe.texture=_e)}function ut(){const W=V[k];W!==void 0&&W.type!==void 0&&(i.bindTexture(W.type,null),W.type=void 0,W.texture=void 0)}function je(){try{i.compressedTexImage2D(...arguments)}catch(W){$e("WebGLState:",W)}}function L(){try{i.compressedTexImage3D(...arguments)}catch(W){$e("WebGLState:",W)}}function y(){try{i.texSubImage2D(...arguments)}catch(W){$e("WebGLState:",W)}}function X(){try{i.texSubImage3D(...arguments)}catch(W){$e("WebGLState:",W)}}function $(){try{i.compressedTexSubImage2D(...arguments)}catch(W){$e("WebGLState:",W)}}function Q(){try{i.compressedTexSubImage3D(...arguments)}catch(W){$e("WebGLState:",W)}}function fe(){try{i.texStorage2D(...arguments)}catch(W){$e("WebGLState:",W)}}function pe(){try{i.texStorage3D(...arguments)}catch(W){$e("WebGLState:",W)}}function te(){try{i.texImage2D(...arguments)}catch(W){$e("WebGLState:",W)}}function se(){try{i.texImage3D(...arguments)}catch(W){$e("WebGLState:",W)}}function me(W){return u[W]!==void 0?u[W]:i.getParameter(W)}function ke(W,_e){u[W]!==_e&&(i.pixelStorei(W,_e),u[W]=_e)}function Me(W){Se.equals(W)===!1&&(i.scissor(W.x,W.y,W.z,W.w),Se.copy(W))}function ge(W){be.equals(W)===!1&&(i.viewport(W.x,W.y,W.z,W.w),be.copy(W))}function ze(W,_e){let ne=l.get(_e);ne===void 0&&(ne=new WeakMap,l.set(_e,ne));let xe=ne.get(W);xe===void 0&&(xe=i.getUniformBlockIndex(_e,W.name),ne.set(W,xe))}function qe(W,_e){const xe=l.get(_e).get(W);c.get(_e)!==xe&&(i.uniformBlockBinding(_e,xe,W.__bindingPointIndex),c.set(_e,xe))}function et(){i.disable(i.BLEND),i.disable(i.CULL_FACE),i.disable(i.DEPTH_TEST),i.disable(i.POLYGON_OFFSET_FILL),i.disable(i.SCISSOR_TEST),i.disable(i.STENCIL_TEST),i.disable(i.SAMPLE_ALPHA_TO_COVERAGE),i.blendEquation(i.FUNC_ADD),i.blendFunc(i.ONE,i.ZERO),i.blendFuncSeparate(i.ONE,i.ZERO,i.ONE,i.ZERO),i.blendColor(0,0,0,0),i.colorMask(!0,!0,!0,!0),i.clearColor(0,0,0,0),i.depthMask(!0),i.depthFunc(i.LESS),o.setReversed(!1),i.clearDepth(1),i.stencilMask(4294967295),i.stencilFunc(i.ALWAYS,0,4294967295),i.stencilOp(i.KEEP,i.KEEP,i.KEEP),i.clearStencil(0),i.cullFace(i.BACK),i.frontFace(i.CCW),i.polygonOffset(0,0),i.activeTexture(i.TEXTURE0),i.bindFramebuffer(i.FRAMEBUFFER,null),i.bindFramebuffer(i.DRAW_FRAMEBUFFER,null),i.bindFramebuffer(i.READ_FRAMEBUFFER,null),i.useProgram(null),i.lineWidth(1),i.scissor(0,0,i.canvas.width,i.canvas.height),i.viewport(0,0,i.canvas.width,i.canvas.height),i.pixelStorei(i.PACK_ALIGNMENT,4),i.pixelStorei(i.UNPACK_ALIGNMENT,4),i.pixelStorei(i.UNPACK_FLIP_Y_WEBGL,!1),i.pixelStorei(i.UNPACK_PREMULTIPLY_ALPHA_WEBGL,!1),i.pixelStorei(i.UNPACK_COLORSPACE_CONVERSION_WEBGL,i.BROWSER_DEFAULT_WEBGL),i.pixelStorei(i.PACK_ROW_LENGTH,0),i.pixelStorei(i.PACK_SKIP_PIXELS,0),i.pixelStorei(i.PACK_SKIP_ROWS,0),i.pixelStorei(i.UNPACK_ROW_LENGTH,0),i.pixelStorei(i.UNPACK_IMAGE_HEIGHT,0),i.pixelStorei(i.UNPACK_SKIP_PIXELS,0),i.pixelStorei(i.UNPACK_SKIP_ROWS,0),i.pixelStorei(i.UNPACK_SKIP_IMAGES,0),h={},u={},k=null,V={},f={},d=new WeakMap,p=[],_=null,g=!1,m=null,M=null,b=null,v=null,w=null,S=null,T=null,x=new Ne(0,0,0),R=0,D=!1,P=null,F=null,A=null,I=null,O=null,Se.set(0,0,i.canvas.width,i.canvas.height),be.set(0,0,i.canvas.width,i.canvas.height),r.reset(),o.reset(),a.reset()}return{buffers:{color:r,depth:o,stencil:a},enable:j,disable:de,bindFramebuffer:Ue,drawBuffers:ve,useProgram:Ge,setBlending:le,setMaterial:he,setFlipSided:ce,setCullFace:ue,setLineWidth:Xe,setPolygonOffset:Be,setScissorTest:Ye,activeTexture:Ke,bindTexture:z,unbindTexture:ut,compressedTexImage2D:je,compressedTexImage3D:L,texImage2D:te,texImage3D:se,pixelStorei:ke,getParameter:me,updateUBOMapping:ze,uniformBlockBinding:qe,texStorage2D:fe,texStorage3D:pe,texSubImage2D:y,texSubImage3D:X,compressedTexSubImage2D:$,compressedTexSubImage3D:Q,scissor:Me,viewport:ge,reset:et}}function yy(i,e,t,n,s,r,o){const a=e.has("WEBGL_multisampled_render_to_texture")?e.get("WEBGL_multisampled_render_to_texture"):null,c=typeof navigator>"u"?!1:/OculusBrowser/g.test(navigator.userAgent),l=new oe,h=new WeakMap,u=new Set;let f;const d=new WeakMap;let p=!1;try{p=typeof OffscreenCanvas<"u"&&new OffscreenCanvas(1,1).getContext("2d")!==null}catch{}function _(L,y){return p?new OffscreenCanvas(L,y):qr("canvas")}function g(L,y,X){let $=1;const Q=je(L);if((Q.width>X||Q.height>X)&&($=X/Math.max(Q.width,Q.height)),$<1)if(typeof HTMLImageElement<"u"&&L instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&L instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&L instanceof ImageBitmap||typeof VideoFrame<"u"&&L instanceof VideoFrame){const fe=Math.floor($*Q.width),pe=Math.floor($*Q.height);f===void 0&&(f=_(fe,pe));const te=y?_(fe,pe):f;return te.width=fe,te.height=pe,te.getContext("2d").drawImage(L,0,0,fe,pe),Oe("WebGLRenderer: Texture has been resized from ("+Q.width+"x"+Q.height+") to ("+fe+"x"+pe+")."),te}else return"data"in L&&Oe("WebGLRenderer: Image in DataTexture is too big ("+Q.width+"x"+Q.height+")."),L;return L}function m(L){return L.generateMipmaps}function M(L){i.generateMipmap(L)}function b(L){return L.isWebGLCubeRenderTarget?i.TEXTURE_CUBE_MAP:L.isWebGL3DRenderTarget?i.TEXTURE_3D:L.isWebGLArrayRenderTarget||L.isCompressedArrayTexture?i.TEXTURE_2D_ARRAY:i.TEXTURE_2D}function v(L,y,X,$,Q,fe=!1){if(L!==null){if(i[L]!==void 0)return i[L];Oe("WebGLRenderer: Attempt to use non-existing WebGL internal format '"+L+"'")}let pe;$&&(pe=e.get("EXT_texture_norm16"),pe||Oe("WebGLRenderer: Unable to use normalized textures without EXT_texture_norm16 extension"));let te=y;if(y===i.RED&&(X===i.FLOAT&&(te=i.R32F),X===i.HALF_FLOAT&&(te=i.R16F),X===i.UNSIGNED_BYTE&&(te=i.R8),X===i.UNSIGNED_SHORT&&pe&&(te=pe.R16_EXT),X===i.SHORT&&pe&&(te=pe.R16_SNORM_EXT)),y===i.RED_INTEGER&&(X===i.UNSIGNED_BYTE&&(te=i.R8UI),X===i.UNSIGNED_SHORT&&(te=i.R16UI),X===i.UNSIGNED_INT&&(te=i.R32UI),X===i.BYTE&&(te=i.R8I),X===i.SHORT&&(te=i.R16I),X===i.INT&&(te=i.R32I)),y===i.RG&&(X===i.FLOAT&&(te=i.RG32F),X===i.HALF_FLOAT&&(te=i.RG16F),X===i.UNSIGNED_BYTE&&(te=i.RG8),X===i.UNSIGNED_SHORT&&pe&&(te=pe.RG16_EXT),X===i.SHORT&&pe&&(te=pe.RG16_SNORM_EXT)),y===i.RG_INTEGER&&(X===i.UNSIGNED_BYTE&&(te=i.RG8UI),X===i.UNSIGNED_SHORT&&(te=i.RG16UI),X===i.UNSIGNED_INT&&(te=i.RG32UI),X===i.BYTE&&(te=i.RG8I),X===i.SHORT&&(te=i.RG16I),X===i.INT&&(te=i.RG32I)),y===i.RGB_INTEGER&&(X===i.UNSIGNED_BYTE&&(te=i.RGB8UI),X===i.UNSIGNED_SHORT&&(te=i.RGB16UI),X===i.UNSIGNED_INT&&(te=i.RGB32UI),X===i.BYTE&&(te=i.RGB8I),X===i.SHORT&&(te=i.RGB16I),X===i.INT&&(te=i.RGB32I)),y===i.RGBA_INTEGER&&(X===i.UNSIGNED_BYTE&&(te=i.RGBA8UI),X===i.UNSIGNED_SHORT&&(te=i.RGBA16UI),X===i.UNSIGNED_INT&&(te=i.RGBA32UI),X===i.BYTE&&(te=i.RGBA8I),X===i.SHORT&&(te=i.RGBA16I),X===i.INT&&(te=i.RGBA32I)),y===i.RGB&&(X===i.UNSIGNED_SHORT&&pe&&(te=pe.RGB16_EXT),X===i.SHORT&&pe&&(te=pe.RGB16_SNORM_EXT),X===i.UNSIGNED_INT_5_9_9_9_REV&&(te=i.RGB9_E5),X===i.UNSIGNED_INT_10F_11F_11F_REV&&(te=i.R11F_G11F_B10F)),y===i.RGBA){const se=fe?ca:at.getTransfer(Q);X===i.FLOAT&&(te=i.RGBA32F),X===i.HALF_FLOAT&&(te=i.RGBA16F),X===i.UNSIGNED_BYTE&&(te=se===_t?i.SRGB8_ALPHA8:i.RGBA8),X===i.UNSIGNED_SHORT&&pe&&(te=pe.RGBA16_EXT),X===i.SHORT&&pe&&(te=pe.RGBA16_SNORM_EXT),X===i.UNSIGNED_SHORT_4_4_4_4&&(te=i.RGBA4),X===i.UNSIGNED_SHORT_5_5_5_1&&(te=i.RGB5_A1)}return(te===i.R16F||te===i.R32F||te===i.RG16F||te===i.RG32F||te===i.RGBA16F||te===i.RGBA32F)&&e.get("EXT_color_buffer_float"),te}function w(L,y){let X;return L?y===null||y===li||y===Vr?X=i.DEPTH24_STENCIL8:y===In?X=i.DEPTH32F_STENCIL8:y===Hr&&(X=i.DEPTH24_STENCIL8,Oe("DepthTexture: 16 bit depth attachment is not supported with stencil. Using 24-bit attachment.")):y===null||y===li||y===Vr?X=i.DEPTH_COMPONENT24:y===In?X=i.DEPTH_COMPONENT32F:y===Hr&&(X=i.DEPTH_COMPONENT16),X}function S(L,y){return m(L)===!0||L.isFramebufferTexture&&L.minFilter!==kt&&L.minFilter!==zt?Math.log2(Math.max(y.width,y.height))+1:L.mipmaps!==void 0&&L.mipmaps.length>0?L.mipmaps.length:L.isCompressedTexture&&Array.isArray(L.image)?y.mipmaps.length:1}function T(L){const y=L.target;y.removeEventListener("dispose",T),R(y),y.isVideoTexture&&h.delete(y),y.isHTMLTexture&&u.delete(y)}function x(L){const y=L.target;y.removeEventListener("dispose",x),P(y)}function R(L){const y=n.get(L);if(y.__webglInit===void 0)return;const X=L.source,$=d.get(X);if($){const Q=$[y.__cacheKey];Q.usedTimes--,Q.usedTimes===0&&D(L),Object.keys($).length===0&&d.delete(X)}n.remove(L)}function D(L){const y=n.get(L);i.deleteTexture(y.__webglTexture);const X=L.source,$=d.get(X);delete $[y.__cacheKey],o.memory.textures--}function P(L){const y=n.get(L);if(L.depthTexture&&(L.depthTexture.dispose(),n.remove(L.depthTexture)),L.isWebGLCubeRenderTarget)for(let $=0;$<6;$++){if(Array.isArray(y.__webglFramebuffer[$]))for(let Q=0;Q<y.__webglFramebuffer[$].length;Q++)i.deleteFramebuffer(y.__webglFramebuffer[$][Q]);else i.deleteFramebuffer(y.__webglFramebuffer[$]);y.__webglDepthbuffer&&i.deleteRenderbuffer(y.__webglDepthbuffer[$])}else{if(Array.isArray(y.__webglFramebuffer))for(let $=0;$<y.__webglFramebuffer.length;$++)i.deleteFramebuffer(y.__webglFramebuffer[$]);else i.deleteFramebuffer(y.__webglFramebuffer);if(y.__webglDepthbuffer&&i.deleteRenderbuffer(y.__webglDepthbuffer),y.__webglMultisampledFramebuffer&&i.deleteFramebuffer(y.__webglMultisampledFramebuffer),y.__webglColorRenderbuffer)for(let $=0;$<y.__webglColorRenderbuffer.length;$++)y.__webglColorRenderbuffer[$]&&i.deleteRenderbuffer(y.__webglColorRenderbuffer[$]);y.__webglDepthRenderbuffer&&i.deleteRenderbuffer(y.__webglDepthRenderbuffer)}const X=L.textures;for(let $=0,Q=X.length;$<Q;$++){const fe=n.get(X[$]);fe.__webglTexture&&(i.deleteTexture(fe.__webglTexture),o.memory.textures--),n.remove(X[$])}n.remove(L)}let F=0;function A(){F=0}function I(){return F}function O(L){F=L}function H(){const L=F;return L>=s.maxTextures&&Oe("WebGLTextures: Trying to use "+(L+1)+" texture units while this GPU supports only "+s.maxTextures),F+=1,L}function C(L){const y=[];return y.push(L.wrapS),y.push(L.wrapT),y.push(L.wrapR||0),y.push(L.magFilter),y.push(L.minFilter),y.push(L.anisotropy),y.push(L.internalFormat),y.push(L.format),y.push(L.type),y.push(L.generateMipmaps),y.push(L.premultiplyAlpha),y.push(L.flipY),y.push(L.unpackAlignment),y.push(L.colorSpace),y.join()}function N(L,y){const X=n.get(L);if(L.isVideoTexture&&z(L),L.isRenderTargetTexture===!1&&L.isExternalTexture!==!0&&L.version>0&&X.__version!==L.version){const $=L.image;if($===null)Oe("WebGLRenderer: Texture marked for update but no image data found.");else if($.complete===!1)Oe("WebGLRenderer: Texture marked for update but image is incomplete");else{de(X,L,y);return}}else L.isExternalTexture&&(X.__webglTexture=L.sourceTexture?L.sourceTexture:null);t.bindTexture(i.TEXTURE_2D,X.__webglTexture,i.TEXTURE0+y)}function U(L,y){const X=n.get(L);if(L.isRenderTargetTexture===!1&&L.version>0&&X.__version!==L.version){de(X,L,y);return}else L.isExternalTexture&&(X.__webglTexture=L.sourceTexture?L.sourceTexture:null);t.bindTexture(i.TEXTURE_2D_ARRAY,X.__webglTexture,i.TEXTURE0+y)}function k(L,y){const X=n.get(L);if(L.isRenderTargetTexture===!1&&L.version>0&&X.__version!==L.version){de(X,L,y);return}t.bindTexture(i.TEXTURE_3D,X.__webglTexture,i.TEXTURE0+y)}function V(L,y){const X=n.get(L);if(L.isCubeDepthTexture!==!0&&L.version>0&&X.__version!==L.version){Ue(X,L,y);return}t.bindTexture(i.TEXTURE_CUBE_MAP,X.__webglTexture,i.TEXTURE0+y)}const ee={[qi]:i.REPEAT,[ii]:i.CLAMP_TO_EDGE,[ra]:i.MIRRORED_REPEAT},re={[kt]:i.NEAREST,[hd]:i.NEAREST_MIPMAP_NEAREST,[Ar]:i.NEAREST_MIPMAP_LINEAR,[zt]:i.LINEAR,[Yo]:i.LINEAR_MIPMAP_NEAREST,[bi]:i.LINEAR_MIPMAP_LINEAR},Se={[dm]:i.NEVER,[xm]:i.ALWAYS,[pm]:i.LESS,[Jc]:i.LEQUAL,[mm]:i.EQUAL,[Zc]:i.GEQUAL,[gm]:i.GREATER,[_m]:i.NOTEQUAL};function be(L,y){if(y.type===In&&e.has("OES_texture_float_linear")===!1&&(y.magFilter===zt||y.magFilter===Yo||y.magFilter===Ar||y.magFilter===bi||y.minFilter===zt||y.minFilter===Yo||y.minFilter===Ar||y.minFilter===bi)&&Oe("WebGLRenderer: Unable to use linear filtering with floating point textures. OES_texture_float_linear not supported on this device."),i.texParameteri(L,i.TEXTURE_WRAP_S,ee[y.wrapS]),i.texParameteri(L,i.TEXTURE_WRAP_T,ee[y.wrapT]),(L===i.TEXTURE_3D||L===i.TEXTURE_2D_ARRAY)&&i.texParameteri(L,i.TEXTURE_WRAP_R,ee[y.wrapR]),i.texParameteri(L,i.TEXTURE_MAG_FILTER,re[y.magFilter]),i.texParameteri(L,i.TEXTURE_MIN_FILTER,re[y.minFilter]),y.compareFunction&&(i.texParameteri(L,i.TEXTURE_COMPARE_MODE,i.COMPARE_REF_TO_TEXTURE),i.texParameteri(L,i.TEXTURE_COMPARE_FUNC,Se[y.compareFunction])),e.has("EXT_texture_filter_anisotropic")===!0){if(y.magFilter===kt||y.minFilter!==Ar&&y.minFilter!==bi||y.type===In&&e.has("OES_texture_float_linear")===!1)return;if(y.anisotropy>1||n.get(y).__currentAnisotropy){const X=e.get("EXT_texture_filter_anisotropic");i.texParameterf(L,X.TEXTURE_MAX_ANISOTROPY_EXT,Math.min(y.anisotropy,s.getMaxAnisotropy())),n.get(y).__currentAnisotropy=y.anisotropy}}}function Ve(L,y){let X=!1;L.__webglInit===void 0&&(L.__webglInit=!0,y.addEventListener("dispose",T));const $=y.source;let Q=d.get($);Q===void 0&&(Q={},d.set($,Q));const fe=C(y);if(fe!==L.__cacheKey){Q[fe]===void 0&&(Q[fe]={texture:i.createTexture(),usedTimes:0},o.memory.textures++,X=!0),Q[fe].usedTimes++;const pe=Q[L.__cacheKey];pe!==void 0&&(Q[L.__cacheKey].usedTimes--,pe.usedTimes===0&&D(y)),L.__cacheKey=fe,L.__webglTexture=Q[fe].texture}return X}function J(L,y,X){return Math.floor(Math.floor(L/X)/y)}function j(L,y,X,$){const fe=L.updateRanges;if(fe.length===0)t.texSubImage2D(i.TEXTURE_2D,0,0,0,y.width,y.height,X,$,y.data);else{fe.sort((ke,Me)=>ke.start-Me.start);let pe=0;for(let ke=1;ke<fe.length;ke++){const Me=fe[pe],ge=fe[ke],ze=Me.start+Me.count,qe=J(ge.start,y.width,4),et=J(Me.start,y.width,4);ge.start<=ze+1&&qe===et&&J(ge.start+ge.count-1,y.width,4)===qe?Me.count=Math.max(Me.count,ge.start+ge.count-Me.start):(++pe,fe[pe]=ge)}fe.length=pe+1;const te=t.getParameter(i.UNPACK_ROW_LENGTH),se=t.getParameter(i.UNPACK_SKIP_PIXELS),me=t.getParameter(i.UNPACK_SKIP_ROWS);t.pixelStorei(i.UNPACK_ROW_LENGTH,y.width);for(let ke=0,Me=fe.length;ke<Me;ke++){const ge=fe[ke],ze=Math.floor(ge.start/4),qe=Math.ceil(ge.count/4),et=ze%y.width,W=Math.floor(ze/y.width),_e=qe,ne=1;t.pixelStorei(i.UNPACK_SKIP_PIXELS,et),t.pixelStorei(i.UNPACK_SKIP_ROWS,W),t.texSubImage2D(i.TEXTURE_2D,0,et,W,_e,ne,X,$,y.data)}L.clearUpdateRanges(),t.pixelStorei(i.UNPACK_ROW_LENGTH,te),t.pixelStorei(i.UNPACK_SKIP_PIXELS,se),t.pixelStorei(i.UNPACK_SKIP_ROWS,me)}}function de(L,y,X){let $=i.TEXTURE_2D;(y.isDataArrayTexture||y.isCompressedArrayTexture)&&($=i.TEXTURE_2D_ARRAY),y.isData3DTexture&&($=i.TEXTURE_3D);const Q=Ve(L,y),fe=y.source;t.bindTexture($,L.__webglTexture,i.TEXTURE0+X);const pe=n.get(fe);if(fe.version!==pe.__version||Q===!0){if(t.activeTexture(i.TEXTURE0+X),(typeof ImageBitmap<"u"&&y.image instanceof ImageBitmap)===!1){const ne=at.getPrimaries(at.workingColorSpace),xe=y.colorSpace===Hi?null:at.getPrimaries(y.colorSpace),Ee=y.colorSpace===Hi||ne===xe?i.NONE:i.BROWSER_DEFAULT_WEBGL;t.pixelStorei(i.UNPACK_FLIP_Y_WEBGL,y.flipY),t.pixelStorei(i.UNPACK_PREMULTIPLY_ALPHA_WEBGL,y.premultiplyAlpha),t.pixelStorei(i.UNPACK_COLORSPACE_CONVERSION_WEBGL,Ee)}t.pixelStorei(i.UNPACK_ALIGNMENT,y.unpackAlignment);let se=g(y.image,!1,s.maxTextureSize);se=ut(y,se);const me=r.convert(y.format,y.colorSpace),ke=r.convert(y.type);let Me=v(y.internalFormat,me,ke,y.normalized,y.colorSpace,y.isVideoTexture);be($,y);let ge;const ze=y.mipmaps,qe=y.isVideoTexture!==!0,et=pe.__version===void 0||Q===!0,W=fe.dataReady,_e=S(y,se);if(y.isDepthTexture)Me=w(y.format===ss,y.type),et&&(qe?t.texStorage2D(i.TEXTURE_2D,1,Me,se.width,se.height):t.texImage2D(i.TEXTURE_2D,0,Me,se.width,se.height,0,me,ke,null));else if(y.isDataTexture)if(ze.length>0){qe&&et&&t.texStorage2D(i.TEXTURE_2D,_e,Me,ze[0].width,ze[0].height);for(let ne=0,xe=ze.length;ne<xe;ne++)ge=ze[ne],qe?W&&t.texSubImage2D(i.TEXTURE_2D,ne,0,0,ge.width,ge.height,me,ke,ge.data):t.texImage2D(i.TEXTURE_2D,ne,Me,ge.width,ge.height,0,me,ke,ge.data);y.generateMipmaps=!1}else qe?(et&&t.texStorage2D(i.TEXTURE_2D,_e,Me,se.width,se.height),W&&j(y,se,me,ke)):t.texImage2D(i.TEXTURE_2D,0,Me,se.width,se.height,0,me,ke,se.data);else if(y.isCompressedTexture)if(y.isCompressedArrayTexture){qe&&et&&t.texStorage3D(i.TEXTURE_2D_ARRAY,_e,Me,ze[0].width,ze[0].height,se.depth);for(let ne=0,xe=ze.length;ne<xe;ne++)if(ge=ze[ne],y.format!==Ln)if(me!==null)if(qe){if(W)if(y.layerUpdates.size>0){const Ee=$u(ge.width,ge.height,y.format,y.type);for(const ae of y.layerUpdates){const We=ge.data.subarray(ae*Ee/ge.data.BYTES_PER_ELEMENT,(ae+1)*Ee/ge.data.BYTES_PER_ELEMENT);t.compressedTexSubImage3D(i.TEXTURE_2D_ARRAY,ne,0,0,ae,ge.width,ge.height,1,me,We)}}else t.compressedTexSubImage3D(i.TEXTURE_2D_ARRAY,ne,0,0,0,ge.width,ge.height,se.depth,me,ge.data)}else t.compressedTexImage3D(i.TEXTURE_2D_ARRAY,ne,Me,ge.width,ge.height,se.depth,0,ge.data,0,0);else Oe("WebGLRenderer: Attempt to load unsupported compressed texture format in .uploadTexture()");else qe?W&&t.texSubImage3D(i.TEXTURE_2D_ARRAY,ne,0,0,0,ge.width,ge.height,se.depth,me,ke,ge.data):t.texImage3D(i.TEXTURE_2D_ARRAY,ne,Me,ge.width,ge.height,se.depth,0,me,ke,ge.data);y.layerUpdates.size>0&&y.clearLayerUpdates()}else{qe&&et&&t.texStorage2D(i.TEXTURE_2D,_e,Me,ze[0].width,ze[0].height);for(let ne=0,xe=ze.length;ne<xe;ne++)ge=ze[ne],y.format!==Ln?me!==null?qe?W&&t.compressedTexSubImage2D(i.TEXTURE_2D,ne,0,0,ge.width,ge.height,me,ge.data):t.compressedTexImage2D(i.TEXTURE_2D,ne,Me,ge.width,ge.height,0,ge.data):Oe("WebGLRenderer: Attempt to load unsupported compressed texture format in .uploadTexture()"):qe?W&&t.texSubImage2D(i.TEXTURE_2D,ne,0,0,ge.width,ge.height,me,ke,ge.data):t.texImage2D(i.TEXTURE_2D,ne,Me,ge.width,ge.height,0,me,ke,ge.data)}else if(y.isDataArrayTexture)if(qe){if(et&&t.texStorage3D(i.TEXTURE_2D_ARRAY,_e,Me,se.width,se.height,se.depth),W)if(y.layerUpdates.size>0){const ne=$u(se.width,se.height,y.format,y.type);for(const xe of y.layerUpdates){const Ee=se.data.subarray(xe*ne/se.data.BYTES_PER_ELEMENT,(xe+1)*ne/se.data.BYTES_PER_ELEMENT);t.texSubImage3D(i.TEXTURE_2D_ARRAY,0,0,0,xe,se.width,se.height,1,me,ke,Ee)}y.clearLayerUpdates()}else t.texSubImage3D(i.TEXTURE_2D_ARRAY,0,0,0,0,se.width,se.height,se.depth,me,ke,se.data)}else t.texImage3D(i.TEXTURE_2D_ARRAY,0,Me,se.width,se.height,se.depth,0,me,ke,se.data);else if(y.isData3DTexture)qe?(et&&t.texStorage3D(i.TEXTURE_3D,_e,Me,se.width,se.height,se.depth),W&&t.texSubImage3D(i.TEXTURE_3D,0,0,0,0,se.width,se.height,se.depth,me,ke,se.data)):t.texImage3D(i.TEXTURE_3D,0,Me,se.width,se.height,se.depth,0,me,ke,se.data);else if(y.isFramebufferTexture){if(et)if(qe)t.texStorage2D(i.TEXTURE_2D,_e,Me,se.width,se.height);else{let ne=se.width,xe=se.height;for(let Ee=0;Ee<_e;Ee++)t.texImage2D(i.TEXTURE_2D,Ee,Me,ne,xe,0,me,ke,null),ne>>=1,xe>>=1}}else if(y.isHTMLTexture){if("texElementImage2D"in i){const ne=i.canvas;if(ne.hasAttribute("layoutsubtree")||ne.setAttribute("layoutsubtree","true"),se.parentNode!==ne){ne.appendChild(se),u.add(y),ne.onpaint=xe=>{const Ee=xe.changedElements;for(const ae of u)Ee.includes(ae.image)&&(ae.needsUpdate=!0)},ne.requestPaint();return}if(i.texElementImage2D.length===3)i.texElementImage2D(i.TEXTURE_2D,i.RGBA8,se);else{const Ee=i.RGBA,ae=i.RGBA,We=i.UNSIGNED_BYTE;i.texElementImage2D(i.TEXTURE_2D,0,Ee,ae,We,se)}i.texParameteri(i.TEXTURE_2D,i.TEXTURE_MIN_FILTER,i.LINEAR),i.texParameteri(i.TEXTURE_2D,i.TEXTURE_WRAP_S,i.CLAMP_TO_EDGE),i.texParameteri(i.TEXTURE_2D,i.TEXTURE_WRAP_T,i.CLAMP_TO_EDGE)}}else if(ze.length>0){if(qe&&et){const ne=je(ze[0]);t.texStorage2D(i.TEXTURE_2D,_e,Me,ne.width,ne.height)}for(let ne=0,xe=ze.length;ne<xe;ne++)ge=ze[ne],qe?W&&t.texSubImage2D(i.TEXTURE_2D,ne,0,0,me,ke,ge):t.texImage2D(i.TEXTURE_2D,ne,Me,me,ke,ge);y.generateMipmaps=!1}else if(qe){if(et){const ne=je(se);t.texStorage2D(i.TEXTURE_2D,_e,Me,ne.width,ne.height)}W&&t.texSubImage2D(i.TEXTURE_2D,0,0,0,me,ke,se)}else t.texImage2D(i.TEXTURE_2D,0,Me,me,ke,se);m(y)&&M($),pe.__version=fe.version,y.onUpdate&&y.onUpdate(y)}L.__version=y.version}function Ue(L,y,X){if(y.image.length!==6)return;const $=Ve(L,y),Q=y.source;t.bindTexture(i.TEXTURE_CUBE_MAP,L.__webglTexture,i.TEXTURE0+X);const fe=n.get(Q);if(Q.version!==fe.__version||$===!0){t.activeTexture(i.TEXTURE0+X);const pe=at.getPrimaries(at.workingColorSpace),te=y.colorSpace===Hi?null:at.getPrimaries(y.colorSpace),se=y.colorSpace===Hi||pe===te?i.NONE:i.BROWSER_DEFAULT_WEBGL;t.pixelStorei(i.UNPACK_FLIP_Y_WEBGL,y.flipY),t.pixelStorei(i.UNPACK_PREMULTIPLY_ALPHA_WEBGL,y.premultiplyAlpha),t.pixelStorei(i.UNPACK_ALIGNMENT,y.unpackAlignment),t.pixelStorei(i.UNPACK_COLORSPACE_CONVERSION_WEBGL,se);const me=y.isCompressedTexture||y.image[0].isCompressedTexture,ke=y.image[0]&&y.image[0].isDataTexture,Me=[];for(let ae=0;ae<6;ae++)!me&&!ke?Me[ae]=g(y.image[ae],!0,s.maxCubemapSize):Me[ae]=ke?y.image[ae].image:y.image[ae],Me[ae]=ut(y,Me[ae]);const ge=Me[0],ze=r.convert(y.format,y.colorSpace),qe=r.convert(y.type),et=v(y.internalFormat,ze,qe,y.normalized,y.colorSpace),W=y.isVideoTexture!==!0,_e=fe.__version===void 0||$===!0,ne=Q.dataReady;let xe=S(y,ge);be(i.TEXTURE_CUBE_MAP,y);let Ee;if(me){W&&_e&&t.texStorage2D(i.TEXTURE_CUBE_MAP,xe,et,ge.width,ge.height);for(let ae=0;ae<6;ae++){Ee=Me[ae].mipmaps;for(let We=0;We<Ee.length;We++){const De=Ee[We];y.format!==Ln?ze!==null?W?ne&&t.compressedTexSubImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+ae,We,0,0,De.width,De.height,ze,De.data):t.compressedTexImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+ae,We,et,De.width,De.height,0,De.data):Oe("WebGLRenderer: Attempt to load unsupported compressed texture format in .setTextureCube()"):W?ne&&t.texSubImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+ae,We,0,0,De.width,De.height,ze,qe,De.data):t.texImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+ae,We,et,De.width,De.height,0,ze,qe,De.data)}}}else{if(Ee=y.mipmaps,W&&_e){Ee.length>0&&xe++;const ae=je(Me[0]);t.texStorage2D(i.TEXTURE_CUBE_MAP,xe,et,ae.width,ae.height)}for(let ae=0;ae<6;ae++)if(ke){W?ne&&t.texSubImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+ae,0,0,0,Me[ae].width,Me[ae].height,ze,qe,Me[ae].data):t.texImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+ae,0,et,Me[ae].width,Me[ae].height,0,ze,qe,Me[ae].data);for(let We=0;We<Ee.length;We++){const bt=Ee[We].image[ae].image;W?ne&&t.texSubImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+ae,We+1,0,0,bt.width,bt.height,ze,qe,bt.data):t.texImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+ae,We+1,et,bt.width,bt.height,0,ze,qe,bt.data)}}else{W?ne&&t.texSubImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+ae,0,0,0,ze,qe,Me[ae]):t.texImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+ae,0,et,ze,qe,Me[ae]);for(let We=0;We<Ee.length;We++){const De=Ee[We];W?ne&&t.texSubImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+ae,We+1,0,0,ze,qe,De.image[ae]):t.texImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+ae,We+1,et,ze,qe,De.image[ae])}}}m(y)&&M(i.TEXTURE_CUBE_MAP),fe.__version=Q.version,y.onUpdate&&y.onUpdate(y)}L.__version=y.version}function ve(L,y,X,$,Q,fe){const pe=r.convert(X.format,X.colorSpace),te=r.convert(X.type),se=v(X.internalFormat,pe,te,X.normalized,X.colorSpace),me=n.get(y),ke=n.get(X);if(ke.__renderTarget=y,!me.__hasExternalTextures){const Me=Math.max(1,y.width>>fe),ge=Math.max(1,y.height>>fe);Q===i.TEXTURE_3D||Q===i.TEXTURE_2D_ARRAY?t.texImage3D(Q,fe,se,Me,ge,y.depth,0,pe,te,null):t.texImage2D(Q,fe,se,Me,ge,0,pe,te,null)}t.bindFramebuffer(i.FRAMEBUFFER,L),Ke(y)?a.framebufferTexture2DMultisampleEXT(i.FRAMEBUFFER,$,Q,ke.__webglTexture,0,Ye(y)):(Q===i.TEXTURE_2D||Q>=i.TEXTURE_CUBE_MAP_POSITIVE_X&&Q<=i.TEXTURE_CUBE_MAP_NEGATIVE_Z)&&i.framebufferTexture2D(i.FRAMEBUFFER,$,Q,ke.__webglTexture,fe),t.bindFramebuffer(i.FRAMEBUFFER,null)}function Ge(L,y,X){if(i.bindRenderbuffer(i.RENDERBUFFER,L),y.depthBuffer){const $=y.depthTexture,Q=$&&$.isDepthTexture?$.type:null,fe=w(y.stencilBuffer,Q),pe=y.stencilBuffer?i.DEPTH_STENCIL_ATTACHMENT:i.DEPTH_ATTACHMENT;Ke(y)?a.renderbufferStorageMultisampleEXT(i.RENDERBUFFER,Ye(y),fe,y.width,y.height):X?i.renderbufferStorageMultisample(i.RENDERBUFFER,Ye(y),fe,y.width,y.height):i.renderbufferStorage(i.RENDERBUFFER,fe,y.width,y.height),i.framebufferRenderbuffer(i.FRAMEBUFFER,pe,i.RENDERBUFFER,L)}else{const $=y.textures;for(let Q=0;Q<$.length;Q++){const fe=$[Q],pe=r.convert(fe.format,fe.colorSpace),te=r.convert(fe.type),se=v(fe.internalFormat,pe,te,fe.normalized,fe.colorSpace);Ke(y)?a.renderbufferStorageMultisampleEXT(i.RENDERBUFFER,Ye(y),se,y.width,y.height):X?i.renderbufferStorageMultisample(i.RENDERBUFFER,Ye(y),se,y.width,y.height):i.renderbufferStorage(i.RENDERBUFFER,se,y.width,y.height)}}i.bindRenderbuffer(i.RENDERBUFFER,null)}function ht(L,y,X){const $=y.isWebGLCubeRenderTarget===!0;if(t.bindFramebuffer(i.FRAMEBUFFER,L),!(y.depthTexture&&y.depthTexture.isDepthTexture))throw new Error("THREE.WebGLTextures: renderTarget.depthTexture must be an instance of THREE.DepthTexture.");const Q=n.get(y.depthTexture);if(Q.__renderTarget=y,(!Q.__webglTexture||y.depthTexture.image.width!==y.width||y.depthTexture.image.height!==y.height)&&(y.depthTexture.image.width=y.width,y.depthTexture.image.height=y.height,y.depthTexture.needsUpdate=!0),$){if(Q.__webglInit===void 0&&(Q.__webglInit=!0,y.depthTexture.addEventListener("dispose",T)),Q.__webglTexture===void 0){Q.__webglTexture=i.createTexture(),t.bindTexture(i.TEXTURE_CUBE_MAP,Q.__webglTexture),be(i.TEXTURE_CUBE_MAP,y.depthTexture);const me=r.convert(y.depthTexture.format),ke=r.convert(y.depthTexture.type);let Me;y.depthTexture.format===Ri?Me=i.DEPTH_COMPONENT24:y.depthTexture.format===ss&&(Me=i.DEPTH24_STENCIL8);for(let ge=0;ge<6;ge++)i.texImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+ge,0,Me,y.width,y.height,0,me,ke,null)}}else N(y.depthTexture,0);const fe=Q.__webglTexture,pe=Ye(y),te=$?i.TEXTURE_CUBE_MAP_POSITIVE_X+X:i.TEXTURE_2D,se=y.depthTexture.format===ss?i.DEPTH_STENCIL_ATTACHMENT:i.DEPTH_ATTACHMENT;if(y.depthTexture.format===Ri)Ke(y)?a.framebufferTexture2DMultisampleEXT(i.FRAMEBUFFER,se,te,fe,0,pe):i.framebufferTexture2D(i.FRAMEBUFFER,se,te,fe,0);else if(y.depthTexture.format===ss)Ke(y)?a.framebufferTexture2DMultisampleEXT(i.FRAMEBUFFER,se,te,fe,0,pe):i.framebufferTexture2D(i.FRAMEBUFFER,se,te,fe,0);else throw new Error("THREE.WebGLTextures: Unknown depthTexture format.")}function ie(L){const y=n.get(L),X=L.isWebGLCubeRenderTarget===!0;if(y.__boundDepthTexture!==L.depthTexture){const $=L.depthTexture;if(y.__depthDisposeCallback&&y.__depthDisposeCallback(),$){const Q=()=>{delete y.__boundDepthTexture,delete y.__depthDisposeCallback,$.removeEventListener("dispose",Q)};$.addEventListener("dispose",Q),y.__depthDisposeCallback=Q}y.__boundDepthTexture=$}if(L.depthTexture&&!y.__autoAllocateDepthBuffer)if(X)for(let $=0;$<6;$++)ht(y.__webglFramebuffer[$],L,$);else{const $=L.texture.mipmaps;$&&$.length>0?ht(y.__webglFramebuffer[0],L,0):ht(y.__webglFramebuffer,L,0)}else if(X){y.__webglDepthbuffer=[];for(let $=0;$<6;$++)if(t.bindFramebuffer(i.FRAMEBUFFER,y.__webglFramebuffer[$]),y.__webglDepthbuffer[$]===void 0)y.__webglDepthbuffer[$]=i.createRenderbuffer(),Ge(y.__webglDepthbuffer[$],L,!1);else{const Q=L.stencilBuffer?i.DEPTH_STENCIL_ATTACHMENT:i.DEPTH_ATTACHMENT,fe=y.__webglDepthbuffer[$];i.bindRenderbuffer(i.RENDERBUFFER,fe),i.framebufferRenderbuffer(i.FRAMEBUFFER,Q,i.RENDERBUFFER,fe)}}else{const $=L.texture.mipmaps;if($&&$.length>0?t.bindFramebuffer(i.FRAMEBUFFER,y.__webglFramebuffer[0]):t.bindFramebuffer(i.FRAMEBUFFER,y.__webglFramebuffer),y.__webglDepthbuffer===void 0)y.__webglDepthbuffer=i.createRenderbuffer(),Ge(y.__webglDepthbuffer,L,!1);else{const Q=L.stencilBuffer?i.DEPTH_STENCIL_ATTACHMENT:i.DEPTH_ATTACHMENT,fe=y.__webglDepthbuffer;i.bindRenderbuffer(i.RENDERBUFFER,fe),i.framebufferRenderbuffer(i.FRAMEBUFFER,Q,i.RENDERBUFFER,fe)}}t.bindFramebuffer(i.FRAMEBUFFER,null)}function le(L,y,X){const $=n.get(L);y!==void 0&&ve($.__webglFramebuffer,L,L.texture,i.COLOR_ATTACHMENT0,i.TEXTURE_2D,0),X!==void 0&&ie(L)}function he(L){const y=L.texture,X=n.get(L),$=n.get(y);L.addEventListener("dispose",x);const Q=L.textures,fe=L.isWebGLCubeRenderTarget===!0,pe=Q.length>1;if(pe||($.__webglTexture===void 0&&($.__webglTexture=i.createTexture()),$.__version=y.version,o.memory.textures++),fe){X.__webglFramebuffer=[];for(let te=0;te<6;te++)if(y.mipmaps&&y.mipmaps.length>0){X.__webglFramebuffer[te]=[];for(let se=0;se<y.mipmaps.length;se++)X.__webglFramebuffer[te][se]=i.createFramebuffer()}else X.__webglFramebuffer[te]=i.createFramebuffer()}else{if(y.mipmaps&&y.mipmaps.length>0){X.__webglFramebuffer=[];for(let te=0;te<y.mipmaps.length;te++)X.__webglFramebuffer[te]=i.createFramebuffer()}else X.__webglFramebuffer=i.createFramebuffer();if(pe)for(let te=0,se=Q.length;te<se;te++){const me=n.get(Q[te]);me.__webglTexture===void 0&&(me.__webglTexture=i.createTexture(),o.memory.textures++)}if(L.samples>0&&Ke(L)===!1){X.__webglMultisampledFramebuffer=i.createFramebuffer(),X.__webglColorRenderbuffer=[],t.bindFramebuffer(i.FRAMEBUFFER,X.__webglMultisampledFramebuffer);for(let te=0;te<Q.length;te++){const se=Q[te];X.__webglColorRenderbuffer[te]=i.createRenderbuffer(),i.bindRenderbuffer(i.RENDERBUFFER,X.__webglColorRenderbuffer[te]);const me=r.convert(se.format,se.colorSpace),ke=r.convert(se.type),Me=v(se.internalFormat,me,ke,se.normalized,se.colorSpace,L.isXRRenderTarget===!0),ge=Ye(L);i.renderbufferStorageMultisample(i.RENDERBUFFER,ge,Me,L.width,L.height),i.framebufferRenderbuffer(i.FRAMEBUFFER,i.COLOR_ATTACHMENT0+te,i.RENDERBUFFER,X.__webglColorRenderbuffer[te])}i.bindRenderbuffer(i.RENDERBUFFER,null),L.depthBuffer&&(X.__webglDepthRenderbuffer=i.createRenderbuffer(),Ge(X.__webglDepthRenderbuffer,L,!0)),t.bindFramebuffer(i.FRAMEBUFFER,null)}}if(fe){t.bindTexture(i.TEXTURE_CUBE_MAP,$.__webglTexture),be(i.TEXTURE_CUBE_MAP,y);for(let te=0;te<6;te++)if(y.mipmaps&&y.mipmaps.length>0)for(let se=0;se<y.mipmaps.length;se++)ve(X.__webglFramebuffer[te][se],L,y,i.COLOR_ATTACHMENT0,i.TEXTURE_CUBE_MAP_POSITIVE_X+te,se);else ve(X.__webglFramebuffer[te],L,y,i.COLOR_ATTACHMENT0,i.TEXTURE_CUBE_MAP_POSITIVE_X+te,0);m(y)&&M(i.TEXTURE_CUBE_MAP),t.unbindTexture()}else if(pe){for(let te=0,se=Q.length;te<se;te++){const me=Q[te],ke=n.get(me);let Me=i.TEXTURE_2D;(L.isWebGL3DRenderTarget||L.isWebGLArrayRenderTarget)&&(Me=L.isWebGL3DRenderTarget?i.TEXTURE_3D:i.TEXTURE_2D_ARRAY),t.bindTexture(Me,ke.__webglTexture),be(Me,me),ve(X.__webglFramebuffer,L,me,i.COLOR_ATTACHMENT0+te,Me,0),m(me)&&M(Me)}t.unbindTexture()}else{let te=i.TEXTURE_2D;if((L.isWebGL3DRenderTarget||L.isWebGLArrayRenderTarget)&&(te=L.isWebGL3DRenderTarget?i.TEXTURE_3D:i.TEXTURE_2D_ARRAY),t.bindTexture(te,$.__webglTexture),be(te,y),y.mipmaps&&y.mipmaps.length>0)for(let se=0;se<y.mipmaps.length;se++)ve(X.__webglFramebuffer[se],L,y,i.COLOR_ATTACHMENT0,te,se);else ve(X.__webglFramebuffer,L,y,i.COLOR_ATTACHMENT0,te,0);m(y)&&M(te),t.unbindTexture()}L.depthBuffer&&ie(L)}function ce(L){const y=L.textures;for(let X=0,$=y.length;X<$;X++){const Q=y[X];if(m(Q)){const fe=b(L),pe=n.get(Q).__webglTexture;t.bindTexture(fe,pe),M(fe),t.unbindTexture()}}}const ue=[],Xe=[];function Be(L){if(L.samples>0){if(Ke(L)===!1){const y=L.textures,X=L.width,$=L.height;let Q=i.COLOR_BUFFER_BIT;const fe=L.stencilBuffer?i.DEPTH_STENCIL_ATTACHMENT:i.DEPTH_ATTACHMENT,pe=n.get(L),te=y.length>1;if(te)for(let me=0;me<y.length;me++)t.bindFramebuffer(i.FRAMEBUFFER,pe.__webglMultisampledFramebuffer),i.framebufferRenderbuffer(i.FRAMEBUFFER,i.COLOR_ATTACHMENT0+me,i.RENDERBUFFER,null),t.bindFramebuffer(i.FRAMEBUFFER,pe.__webglFramebuffer),i.framebufferTexture2D(i.DRAW_FRAMEBUFFER,i.COLOR_ATTACHMENT0+me,i.TEXTURE_2D,null,0);t.bindFramebuffer(i.READ_FRAMEBUFFER,pe.__webglMultisampledFramebuffer);const se=L.texture.mipmaps;se&&se.length>0?t.bindFramebuffer(i.DRAW_FRAMEBUFFER,pe.__webglFramebuffer[0]):t.bindFramebuffer(i.DRAW_FRAMEBUFFER,pe.__webglFramebuffer);for(let me=0;me<y.length;me++){if(L.resolveDepthBuffer&&(L.depthBuffer&&(Q|=i.DEPTH_BUFFER_BIT),L.stencilBuffer&&L.resolveStencilBuffer&&(Q|=i.STENCIL_BUFFER_BIT)),te){i.framebufferRenderbuffer(i.READ_FRAMEBUFFER,i.COLOR_ATTACHMENT0,i.RENDERBUFFER,pe.__webglColorRenderbuffer[me]);const ke=n.get(y[me]).__webglTexture;i.framebufferTexture2D(i.DRAW_FRAMEBUFFER,i.COLOR_ATTACHMENT0,i.TEXTURE_2D,ke,0)}i.blitFramebuffer(0,0,X,$,0,0,X,$,Q,i.NEAREST),c===!0&&(ue.length=0,Xe.length=0,ue.push(i.COLOR_ATTACHMENT0+me),L.depthBuffer&&L.storeMultisampledDepthBuffer===!1&&(ue.push(fe),Xe.push(fe),i.invalidateFramebuffer(i.DRAW_FRAMEBUFFER,Xe)),i.invalidateFramebuffer(i.READ_FRAMEBUFFER,ue))}if(t.bindFramebuffer(i.READ_FRAMEBUFFER,null),t.bindFramebuffer(i.DRAW_FRAMEBUFFER,null),te)for(let me=0;me<y.length;me++){t.bindFramebuffer(i.FRAMEBUFFER,pe.__webglMultisampledFramebuffer),i.framebufferRenderbuffer(i.FRAMEBUFFER,i.COLOR_ATTACHMENT0+me,i.RENDERBUFFER,pe.__webglColorRenderbuffer[me]);const ke=n.get(y[me]).__webglTexture;t.bindFramebuffer(i.FRAMEBUFFER,pe.__webglFramebuffer),i.framebufferTexture2D(i.DRAW_FRAMEBUFFER,i.COLOR_ATTACHMENT0+me,i.TEXTURE_2D,ke,0)}t.bindFramebuffer(i.DRAW_FRAMEBUFFER,pe.__webglMultisampledFramebuffer)}else if(L.depthBuffer&&L.storeMultisampledDepthBuffer===!1&&c){const y=L.stencilBuffer?i.DEPTH_STENCIL_ATTACHMENT:i.DEPTH_ATTACHMENT;i.invalidateFramebuffer(i.DRAW_FRAMEBUFFER,[y])}}}function Ye(L){return Math.min(s.maxSamples,L.samples)}function Ke(L){const y=n.get(L);return L.samples>0&&e.has("WEBGL_multisampled_render_to_texture")===!0&&y.__useRenderToTexture!==!1}function z(L){const y=o.render.frame;h.get(L)!==y&&(h.set(L,y),L.update())}function ut(L,y){const X=L.colorSpace,$=L.format,Q=L.type;return L.isCompressedTexture===!0||L.isVideoTexture===!0||X!==yn&&X!==Hi&&(at.getTransfer(X)===_t?($!==Ln||Q!==xn)&&Oe("WebGLTextures: sRGB encoded textures have to use RGBAFormat and UnsignedByteType."):$e("WebGLTextures: Unsupported texture color space:",X)),y}function je(L){return typeof HTMLImageElement<"u"&&L instanceof HTMLImageElement?(l.width=L.naturalWidth||L.width,l.height=L.naturalHeight||L.height):typeof VideoFrame<"u"&&L instanceof VideoFrame?(l.width=L.displayWidth,l.height=L.displayHeight):(l.width=L.width,l.height=L.height),l}this.allocateTextureUnit=H,this.resetTextureUnits=A,this.getTextureUnits=I,this.setTextureUnits=O,this.setTexture2D=N,this.setTexture2DArray=U,this.setTexture3D=k,this.setTextureCube=V,this.rebindTextures=le,this.setupRenderTarget=he,this.updateRenderTargetMipmap=ce,this.updateMultisampleRenderTarget=Be,this.setupDepthRenderbuffer=ie,this.setupFrameBufferTexture=ve,this.useMultisampledRTT=Ke,this.isReversedDepthBuffer=function(){return t.buffers.depth.getReversed()}}function Sy(i,e){function t(n,s=Hi){let r;const o=at.getTransfer(s);if(n===xn)return i.UNSIGNED_BYTE;if(n===Wc)return i.UNSIGNED_SHORT_4_4_4_4;if(n===Xc)return i.UNSIGNED_SHORT_5_5_5_1;if(n===dd)return i.UNSIGNED_INT_5_9_9_9_REV;if(n===pd)return i.UNSIGNED_INT_10F_11F_11F_REV;if(n===ud)return i.BYTE;if(n===fd)return i.SHORT;if(n===Hr)return i.UNSIGNED_SHORT;if(n===Gc)return i.INT;if(n===li)return i.UNSIGNED_INT;if(n===In)return i.FLOAT;if(n===fn)return i.HALF_FLOAT;if(n===md)return i.ALPHA;if(n===gd)return i.RGB;if(n===Ln)return i.RGBA;if(n===Ri)return i.DEPTH_COMPONENT;if(n===ss)return i.DEPTH_STENCIL;if(n===qc)return i.RED;if(n===Yc)return i.RED_INTEGER;if(n===cs)return i.RG;if(n===$c)return i.RG_INTEGER;if(n===Kc)return i.RGBA_INTEGER;if(n===$o||n===Ko||n===Jo||n===Zo)if(o===_t)if(r=e.get("WEBGL_compressed_texture_s3tc_srgb"),r!==null){if(n===$o)return r.COMPRESSED_SRGB_S3TC_DXT1_EXT;if(n===Ko)return r.COMPRESSED_SRGB_ALPHA_S3TC_DXT1_EXT;if(n===Jo)return r.COMPRESSED_SRGB_ALPHA_S3TC_DXT3_EXT;if(n===Zo)return r.COMPRESSED_SRGB_ALPHA_S3TC_DXT5_EXT}else return null;else if(r=e.get("WEBGL_compressed_texture_s3tc"),r!==null){if(n===$o)return r.COMPRESSED_RGB_S3TC_DXT1_EXT;if(n===Ko)return r.COMPRESSED_RGBA_S3TC_DXT1_EXT;if(n===Jo)return r.COMPRESSED_RGBA_S3TC_DXT3_EXT;if(n===Zo)return r.COMPRESSED_RGBA_S3TC_DXT5_EXT}else return null;if(n===Hl||n===Vl||n===Gl||n===Wl)if(r=e.get("WEBGL_compressed_texture_pvrtc"),r!==null){if(n===Hl)return r.COMPRESSED_RGB_PVRTC_4BPPV1_IMG;if(n===Vl)return r.COMPRESSED_RGB_PVRTC_2BPPV1_IMG;if(n===Gl)return r.COMPRESSED_RGBA_PVRTC_4BPPV1_IMG;if(n===Wl)return r.COMPRESSED_RGBA_PVRTC_2BPPV1_IMG}else return null;if(n===Xl||n===ql||n===Yl||n===$l||n===Kl||n===oa||n===Jl)if(r=e.get("WEBGL_compressed_texture_etc"),r!==null){if(n===Xl||n===ql)return o===_t?r.COMPRESSED_SRGB8_ETC2:r.COMPRESSED_RGB8_ETC2;if(n===Yl)return o===_t?r.COMPRESSED_SRGB8_ALPHA8_ETC2_EAC:r.COMPRESSED_RGBA8_ETC2_EAC;if(n===$l)return r.COMPRESSED_R11_EAC;if(n===Kl)return r.COMPRESSED_SIGNED_R11_EAC;if(n===oa)return r.COMPRESSED_RG11_EAC;if(n===Jl)return r.COMPRESSED_SIGNED_RG11_EAC}else return null;if(n===Zl||n===jl||n===Ql||n===ec||n===tc||n===nc||n===ic||n===sc||n===rc||n===oc||n===ac||n===lc||n===cc||n===hc)if(r=e.get("WEBGL_compressed_texture_astc"),r!==null){if(n===Zl)return o===_t?r.COMPRESSED_SRGB8_ALPHA8_ASTC_4x4_KHR:r.COMPRESSED_RGBA_ASTC_4x4_KHR;if(n===jl)return o===_t?r.COMPRESSED_SRGB8_ALPHA8_ASTC_5x4_KHR:r.COMPRESSED_RGBA_ASTC_5x4_KHR;if(n===Ql)return o===_t?r.COMPRESSED_SRGB8_ALPHA8_ASTC_5x5_KHR:r.COMPRESSED_RGBA_ASTC_5x5_KHR;if(n===ec)return o===_t?r.COMPRESSED_SRGB8_ALPHA8_ASTC_6x5_KHR:r.COMPRESSED_RGBA_ASTC_6x5_KHR;if(n===tc)return o===_t?r.COMPRESSED_SRGB8_ALPHA8_ASTC_6x6_KHR:r.COMPRESSED_RGBA_ASTC_6x6_KHR;if(n===nc)return o===_t?r.COMPRESSED_SRGB8_ALPHA8_ASTC_8x5_KHR:r.COMPRESSED_RGBA_ASTC_8x5_KHR;if(n===ic)return o===_t?r.COMPRESSED_SRGB8_ALPHA8_ASTC_8x6_KHR:r.COMPRESSED_RGBA_ASTC_8x6_KHR;if(n===sc)return o===_t?r.COMPRESSED_SRGB8_ALPHA8_ASTC_8x8_KHR:r.COMPRESSED_RGBA_ASTC_8x8_KHR;if(n===rc)return o===_t?r.COMPRESSED_SRGB8_ALPHA8_ASTC_10x5_KHR:r.COMPRESSED_RGBA_ASTC_10x5_KHR;if(n===oc)return o===_t?r.COMPRESSED_SRGB8_ALPHA8_ASTC_10x6_KHR:r.COMPRESSED_RGBA_ASTC_10x6_KHR;if(n===ac)return o===_t?r.COMPRESSED_SRGB8_ALPHA8_ASTC_10x8_KHR:r.COMPRESSED_RGBA_ASTC_10x8_KHR;if(n===lc)return o===_t?r.COMPRESSED_SRGB8_ALPHA8_ASTC_10x10_KHR:r.COMPRESSED_RGBA_ASTC_10x10_KHR;if(n===cc)return o===_t?r.COMPRESSED_SRGB8_ALPHA8_ASTC_12x10_KHR:r.COMPRESSED_RGBA_ASTC_12x10_KHR;if(n===hc)return o===_t?r.COMPRESSED_SRGB8_ALPHA8_ASTC_12x12_KHR:r.COMPRESSED_RGBA_ASTC_12x12_KHR}else return null;if(n===uc||n===fc||n===dc)if(r=e.get("EXT_texture_compression_bptc"),r!==null){if(n===uc)return o===_t?r.COMPRESSED_SRGB_ALPHA_BPTC_UNORM_EXT:r.COMPRESSED_RGBA_BPTC_UNORM_EXT;if(n===fc)return r.COMPRESSED_RGB_BPTC_SIGNED_FLOAT_EXT;if(n===dc)return r.COMPRESSED_RGB_BPTC_UNSIGNED_FLOAT_EXT}else return null;if(n===pc||n===mc||n===aa||n===gc)if(r=e.get("EXT_texture_compression_rgtc"),r!==null){if(n===pc)return r.COMPRESSED_RED_RGTC1_EXT;if(n===mc)return r.COMPRESSED_SIGNED_RED_RGTC1_EXT;if(n===aa)return r.COMPRESSED_RED_GREEN_RGTC2_EXT;if(n===gc)return r.COMPRESSED_SIGNED_RED_GREEN_RGTC2_EXT}else return null;return n===Vr?i.UNSIGNED_INT_24_8:i[n]!==void 0?i[n]:null}return{convert:t}}const wy=`
void main() {

	gl_Position = vec4( position, 1.0 );

}`,by=`
uniform sampler2DArray depthColor;
uniform float depthWidth;
uniform float depthHeight;

void main() {

	vec2 coord = vec2( gl_FragCoord.x / depthWidth, gl_FragCoord.y / depthHeight );

	if ( coord.x >= 1.0 ) {

		gl_FragDepth = texture( depthColor, vec3( coord.x - 1.0, coord.y, 1 ) ).r;

	} else {

		gl_FragDepth = texture( depthColor, vec3( coord.x, coord.y, 0 ) ).r;

	}

}`;class Ty{constructor(){this.texture=null,this.mesh=null,this.depthNear=0,this.depthFar=0}init(e,t){if(this.texture===null){const n=new Ld(e.texture);(e.depthNear!==t.depthNear||e.depthFar!==t.depthFar)&&(this.depthNear=e.depthNear,this.depthFar=e.depthFar),this.texture=n}}getMesh(e){if(this.texture!==null&&this.mesh===null){const t=e.cameras[0].viewport,n=new en({vertexShader:wy,fragmentShader:by,uniforms:{depthColor:{value:this.texture},depthWidth:{value:t.z},depthHeight:{value:t.w}}});this.mesh=new K(new Ot(20,20),n)}return this.mesh}reset(){this.texture=null,this.mesh=null}getDepthTexture(){return this.texture}}class Ey extends fs{constructor(e,t){super();const n=this;let s=null,r=1,o=null,a="local-floor",c=1,l=null,h=null,u=null,f=null,d=null,p=null;const _=typeof XRWebGLBinding<"u",g=new Ty,m={},M=t.getContextAttributes();let b=null,v=null;const w=[],S=[],T=new oe;let x=null,R=null;const D=new jt;D.viewport=new St;const P=new jt;P.viewport=new St;const F=[D,P],A=new wg;let I=null,O=null;this.cameraAutoUpdate=!0,this.enabled=!1,this.isPresenting=!1,this.getController=function(J){let j=w[J];return j===void 0&&(j=new Ga,w[J]=j),j.getTargetRaySpace()},this.getControllerGrip=function(J){let j=w[J];return j===void 0&&(j=new Ga,w[J]=j),j.getGripSpace()},this.getHand=function(J){let j=w[J];return j===void 0&&(j=new Ga,w[J]=j),j.getHandSpace()};function H(J){const j=S.indexOf(J.inputSource);if(j===-1)return;const de=w[j];de!==void 0&&(de.update(J.inputSource,J.frame,l||o),de.dispatchEvent({type:J.type,data:J.inputSource}))}function C(){s.removeEventListener("select",H),s.removeEventListener("selectstart",H),s.removeEventListener("selectend",H),s.removeEventListener("squeeze",H),s.removeEventListener("squeezestart",H),s.removeEventListener("squeezeend",H),s.removeEventListener("end",C),s.removeEventListener("inputsourceschange",N);for(let J=0;J<w.length;J++){const j=S[J];j!==null&&(S[J]=null,w[J].disconnect(j))}I=null,O=null,g.reset();for(const J in m)delete m[J];if(e.setRenderTarget(b),d=null,f=null,u=null,s=null,v=null,Ve.stop(),n.isPresenting=!1,e.setPixelRatio(x),e.setSize(T.width,T.height,!1),R!==null){const J=R.camera;J.fov=R.fov,J.zoom=R.zoom,J.updateProjectionMatrix(),R=null}n.dispatchEvent({type:"sessionend"})}this.setFramebufferScaleFactor=function(J){r=J,n.isPresenting===!0&&Oe("WebXRManager: Cannot change framebuffer scale while presenting.")},this.setReferenceSpaceType=function(J){a=J,n.isPresenting===!0&&Oe("WebXRManager: Cannot change reference space type while presenting.")},this.getReferenceSpace=function(){return l||o},this.setReferenceSpace=function(J){l=J},this.getBaseLayer=function(){return f!==null?f:d},this.getBinding=function(){return u===null&&_&&(u=new XRWebGLBinding(s,t)),u},this.getFrame=function(){return p},this.getSession=function(){return s},this.setSession=async function(J){if(s=J,s!==null){if(b=e.getRenderTarget(),s.addEventListener("select",H),s.addEventListener("selectstart",H),s.addEventListener("selectend",H),s.addEventListener("squeeze",H),s.addEventListener("squeezestart",H),s.addEventListener("squeezeend",H),s.addEventListener("end",C),s.addEventListener("inputsourceschange",N),M.xrCompatible!==!0&&await t.makeXRCompatible(),x=e.getPixelRatio(),e.getSize(T),_&&"createProjectionLayer"in XRWebGLBinding.prototype){let de=null,Ue=null,ve=null;M.depth&&(ve=M.stencil?t.DEPTH24_STENCIL8:t.DEPTH_COMPONENT24,de=M.stencil?ss:Ri,Ue=M.stencil?Vr:li);const Ge={colorFormat:t.RGBA8,depthFormat:ve,scaleFactor:r};u=this.getBinding(),f=u.createProjectionLayer(Ge),s.updateRenderState({layers:[f]}),e.setPixelRatio(1),e.setSize(f.textureWidth,f.textureHeight,!1),v=new cn(f.textureWidth,f.textureHeight,{format:Ln,type:xn,depthTexture:new $r(f.textureWidth,f.textureHeight,Ue,void 0,void 0,void 0,void 0,void 0,void 0,de),stencilBuffer:M.stencil,colorSpace:e.outputColorSpace,samples:M.antialias?4:0,resolveDepthBuffer:f.ignoreDepthValues===!1,resolveStencilBuffer:f.ignoreDepthValues===!1,storeMultisampledDepthBuffer:f.ignoreDepthValues===!1,storeMultisampledStencilBuffer:f.ignoreDepthValues===!1})}else{const de={antialias:M.antialias,alpha:!0,depth:M.depth,stencil:M.stencil,framebufferScaleFactor:r};d=new XRWebGLLayer(s,t,de),s.updateRenderState({baseLayer:d}),e.setPixelRatio(1),e.setSize(d.framebufferWidth,d.framebufferHeight,!1),v=new cn(d.framebufferWidth,d.framebufferHeight,{format:Ln,type:xn,colorSpace:e.outputColorSpace,stencilBuffer:M.stencil,resolveDepthBuffer:d.ignoreDepthValues===!1,resolveStencilBuffer:d.ignoreDepthValues===!1,storeMultisampledDepthBuffer:d.ignoreDepthValues===!1,storeMultisampledStencilBuffer:d.ignoreDepthValues===!1})}v.isXRRenderTarget=!0,this.setFoveation(c),l=null,o=await s.requestReferenceSpace(a),Ve.setContext(s),Ve.start(),n.isPresenting=!0,n.dispatchEvent({type:"sessionstart"})}},this.getEnvironmentBlendMode=function(){if(s!==null)return s.environmentBlendMode},this.getDepthTexture=function(){return g.getDepthTexture()};function N(J){for(let j=0;j<J.removed.length;j++){const de=J.removed[j],Ue=S.indexOf(de);Ue>=0&&(S[Ue]=null,w[Ue].disconnect(de))}for(let j=0;j<J.added.length;j++){const de=J.added[j];let Ue=S.indexOf(de);if(Ue===-1){for(let Ge=0;Ge<w.length;Ge++)if(Ge>=S.length){S.push(de),Ue=Ge;break}else if(S[Ge]===null){S[Ge]=de,Ue=Ge;break}if(Ue===-1)break}const ve=w[Ue];ve&&ve.connect(de)}}const U=new B,k=new B;function V(J,j,de){U.setFromMatrixPosition(j.matrixWorld),k.setFromMatrixPosition(de.matrixWorld);const Ue=U.distanceTo(k),ve=j.projectionMatrix.elements,Ge=de.projectionMatrix.elements,ht=ve[14]/(ve[10]-1),ie=ve[14]/(ve[10]+1),le=(ve[9]+1)/ve[5],he=(ve[9]-1)/ve[5],ce=(ve[8]-1)/ve[0],ue=(Ge[8]+1)/Ge[0],Xe=ht*ce,Be=ht*ue,Ye=Ue/(-ce+ue),Ke=Ye*-ce;if(j.matrixWorld.decompose(J.position,J.quaternion,J.scale),J.translateX(Ke),J.translateZ(Ye),J.matrixWorld.compose(J.position,J.quaternion,J.scale),J.matrixWorldInverse.copy(J.matrixWorld).invert(),ve[10]===-1)J.projectionMatrix.copy(j.projectionMatrix),J.projectionMatrixInverse.copy(j.projectionMatrixInverse);else{const z=ht+Ye,ut=ie+Ye,je=Xe-Ke,L=Be+(Ue-Ke),y=le*ie/ut*z,X=he*ie/ut*z;J.projectionMatrix.makePerspective(je,L,y,X,z,ut),J.projectionMatrixInverse.copy(J.projectionMatrix).invert()}}function ee(J,j){j===null?J.matrixWorld.copy(J.matrix):J.matrixWorld.multiplyMatrices(j.matrixWorld,J.matrix),J.matrixWorldInverse.copy(J.matrixWorld).invert()}this.updateCamera=function(J){if(s===null)return;let j=J.near,de=J.far;g.texture!==null&&(g.depthNear>0&&(j=g.depthNear),g.depthFar>0&&(de=g.depthFar)),A.near=P.near=D.near=j,A.far=P.far=D.far=de,(I!==A.near||O!==A.far)&&(s.updateRenderState({depthNear:A.near,depthFar:A.far}),I=A.near,O=A.far),A.layers.mask=J.layers.mask|6,D.layers.mask=A.layers.mask&-5,P.layers.mask=A.layers.mask&-3;const Ue=J.parent,ve=A.cameras;ee(A,Ue);for(let Ge=0;Ge<ve.length;Ge++)ee(ve[Ge],Ue);ve.length===2?V(A,D,P):A.projectionMatrix.copy(D.projectionMatrix),R===null&&J.isPerspectiveCamera&&(R={camera:J,fov:J.fov,zoom:J.zoom}),re(J,A,Ue)};function re(J,j,de){de===null?J.matrix.copy(j.matrixWorld):(J.matrix.copy(de.matrixWorld),J.matrix.invert(),J.matrix.multiply(j.matrixWorld)),J.matrix.decompose(J.position,J.quaternion,J.scale),J.updateMatrixWorld(!0),J.projectionMatrix.copy(j.projectionMatrix),J.projectionMatrixInverse.copy(j.projectionMatrixInverse),J.isPerspectiveCamera&&(J.fov=er*2*Math.atan(1/J.projectionMatrix.elements[5]),J.zoom=1)}this.getCamera=function(){return A},this.getFoveation=function(){if(!(f===null&&d===null))return c},this.setFoveation=function(J){c=J,f!==null&&(f.fixedFoveation=J),d!==null&&d.fixedFoveation!==void 0&&(d.fixedFoveation=J)},this.hasDepthSensing=function(){return g.texture!==null},this.getDepthSensingMesh=function(){return g.getMesh(A)},this.getCameraTexture=function(J){return m[J]};let Se=null;function be(J,j){if(h=j.getViewerPose(l||o),p=j,h!==null){const de=h.views;d!==null&&(e.setRenderTargetFramebuffer(v,d.framebuffer),e.setRenderTarget(v));let Ue=!1;de.length!==A.cameras.length&&(A.cameras.length=0,Ue=!0);for(let ie=0;ie<de.length;ie++){const le=de[ie];let he=null;if(d!==null)he=d.getViewport(le);else{const ue=u.getViewSubImage(f,le);he=ue.viewport,ie===0&&(e.setRenderTargetTextures(v,ue.colorTexture,ue.depthStencilTexture),e.setRenderTarget(v))}let ce=F[ie];ce===void 0&&(ce=new jt,ce.layers.enable(ie),ce.viewport=new St,F[ie]=ce),ce.matrix.fromArray(le.transform.matrix),ce.matrix.decompose(ce.position,ce.quaternion,ce.scale),ce.projectionMatrix.fromArray(le.projectionMatrix),ce.projectionMatrixInverse.copy(ce.projectionMatrix).invert(),ce.viewport.set(he.x,he.y,he.width,he.height),ie===0&&(A.matrix.copy(ce.matrix),A.matrix.decompose(A.position,A.quaternion,A.scale)),Ue===!0&&A.cameras.push(ce)}const ve=s.enabledFeatures;if(ve&&ve.includes("depth-sensing")&&s.depthUsage=="gpu-optimized"&&_){u=n.getBinding();const ie=u.getDepthInformation(de[0]);ie&&ie.isValid&&ie.texture&&g.init(ie,s.renderState)}if(ve&&ve.includes("camera-access")&&_){e.state.unbindTexture(),u=n.getBinding();for(let ie=0;ie<de.length;ie++){const le=de[ie].camera;if(le){let he=m[le];he||(he=new Ld,m[le]=he);const ce=u.getCameraImage(le);he.sourceTexture=ce}}}}for(let de=0;de<w.length;de++){const Ue=S[de],ve=w[de];Ue!==null&&ve!==void 0&&ve.update(Ue,j,l||o)}Se&&Se(J,j),j.detectedPlanes&&n.dispatchEvent({type:"planesdetected",data:j}),p=null}const Ve=new Yd;Ve.setAnimationLoop(be),this.setAnimationLoop=function(J){Se=J},this.dispose=function(){}}}const Ay=new Qe,ep=new Ze;ep.set(-1,0,0,0,1,0,0,0,1);function Ry(i,e){function t(g,m){g.matrixAutoUpdate===!0&&g.updateMatrix(),m.value.copy(g.matrix)}function n(g,m){m.color.getRGB(g.fogColor.value,Hd(i)),m.isFog?(g.fogNear.value=m.near,g.fogFar.value=m.far):m.isFogExp2&&(g.fogDensity.value=m.density)}function s(g,m,M,b,v){m.isNodeMaterial?m.uniformsNeedUpdate=!1:m.isMeshBasicMaterial?r(g,m):m.isMeshLambertMaterial?(r(g,m),m.envMap&&(g.envMapIntensity.value=m.envMapIntensity)):m.isMeshToonMaterial?(r(g,m),u(g,m)):m.isMeshPhongMaterial?(r(g,m),h(g,m),m.envMap&&(g.envMapIntensity.value=m.envMapIntensity)):m.isMeshStandardMaterial?(r(g,m),f(g,m),m.isMeshPhysicalMaterial&&d(g,m,v)):m.isMeshMatcapMaterial?(r(g,m),p(g,m)):m.isMeshDepthMaterial?r(g,m):m.isMeshDistanceMaterial?(r(g,m),_(g,m)):m.isMeshNormalMaterial?r(g,m):m.isLineBasicMaterial?(o(g,m),m.isLineDashedMaterial&&a(g,m)):m.isPointsMaterial?c(g,m,M,b):m.isSpriteMaterial?l(g,m):m.isShadowMaterial?(g.color.value.copy(m.color),g.opacity.value=m.opacity):m.isShaderMaterial&&(m.uniformsNeedUpdate=!1)}function r(g,m){g.opacity.value=m.opacity,m.color&&g.diffuse.value.copy(m.color),m.emissive&&g.emissive.value.copy(m.emissive).multiplyScalar(m.emissiveIntensity),m.map&&(g.map.value=m.map,t(m.map,g.mapTransform)),m.alphaMap&&(g.alphaMap.value=m.alphaMap,t(m.alphaMap,g.alphaMapTransform)),m.bumpMap&&(g.bumpMap.value=m.bumpMap,t(m.bumpMap,g.bumpMapTransform),g.bumpScale.value=m.bumpScale,m.side===un&&(g.bumpScale.value*=-1)),m.normalMap&&(g.normalMap.value=m.normalMap,t(m.normalMap,g.normalMapTransform),g.normalScale.value.copy(m.normalScale),m.side===un&&g.normalScale.value.negate()),m.displacementMap&&(g.displacementMap.value=m.displacementMap,t(m.displacementMap,g.displacementMapTransform),g.displacementScale.value=m.displacementScale,g.displacementBias.value=m.displacementBias),m.emissiveMap&&(g.emissiveMap.value=m.emissiveMap,t(m.emissiveMap,g.emissiveMapTransform)),m.specularMap&&(g.specularMap.value=m.specularMap,t(m.specularMap,g.specularMapTransform)),m.alphaTest>0&&(g.alphaTest.value=m.alphaTest);const M=e.get(m),b=M.envMap,v=M.envMapRotation;b&&(g.envMap.value=b,g.envMapRotation.value.setFromMatrix4(Ay.makeRotationFromEuler(v)).transpose(),b.isCubeTexture&&b.isRenderTargetTexture===!1&&g.envMapRotation.value.premultiply(ep),g.reflectivity.value=m.reflectivity,g.ior.value=m.ior,g.refractionRatio.value=m.refractionRatio),m.lightMap&&(g.lightMap.value=m.lightMap,g.lightMapIntensity.value=m.lightMapIntensity,t(m.lightMap,g.lightMapTransform)),m.aoMap&&(g.aoMap.value=m.aoMap,g.aoMapIntensity.value=m.aoMapIntensity,t(m.aoMap,g.aoMapTransform))}function o(g,m){g.diffuse.value.copy(m.color),g.opacity.value=m.opacity,m.map&&(g.map.value=m.map,t(m.map,g.mapTransform))}function a(g,m){g.dashSize.value=m.dashSize,g.totalSize.value=m.dashSize+m.gapSize,g.scale.value=m.scale}function c(g,m,M,b){g.diffuse.value.copy(m.color),g.opacity.value=m.opacity,g.size.value=m.size*M,g.scale.value=b*.5,m.map&&(g.map.value=m.map,t(m.map,g.uvTransform)),m.alphaMap&&(g.alphaMap.value=m.alphaMap,t(m.alphaMap,g.alphaMapTransform)),m.alphaTest>0&&(g.alphaTest.value=m.alphaTest)}function l(g,m){g.diffuse.value.copy(m.color),g.opacity.value=m.opacity,g.rotation.value=m.rotation,m.map&&(g.map.value=m.map,t(m.map,g.mapTransform)),m.alphaMap&&(g.alphaMap.value=m.alphaMap,t(m.alphaMap,g.alphaMapTransform)),m.alphaTest>0&&(g.alphaTest.value=m.alphaTest)}function h(g,m){g.specular.value.copy(m.specular),g.shininess.value=Math.max(m.shininess,1e-4)}function u(g,m){m.gradientMap&&(g.gradientMap.value=m.gradientMap)}function f(g,m){g.metalness.value=m.metalness,m.metalnessMap&&(g.metalnessMap.value=m.metalnessMap,t(m.metalnessMap,g.metalnessMapTransform)),g.roughness.value=m.roughness,m.roughnessMap&&(g.roughnessMap.value=m.roughnessMap,t(m.roughnessMap,g.roughnessMapTransform)),m.envMap&&(g.envMapIntensity.value=m.envMapIntensity)}function d(g,m,M){g.ior.value=m.ior,m.sheen>0&&(g.sheenColor.value.copy(m.sheenColor).multiplyScalar(m.sheen),g.sheenRoughness.value=m.sheenRoughness,m.sheenColorMap&&(g.sheenColorMap.value=m.sheenColorMap,t(m.sheenColorMap,g.sheenColorMapTransform)),m.sheenRoughnessMap&&(g.sheenRoughnessMap.value=m.sheenRoughnessMap,t(m.sheenRoughnessMap,g.sheenRoughnessMapTransform))),m.clearcoat>0&&(g.clearcoat.value=m.clearcoat,g.clearcoatRoughness.value=m.clearcoatRoughness,m.clearcoatMap&&(g.clearcoatMap.value=m.clearcoatMap,t(m.clearcoatMap,g.clearcoatMapTransform)),m.clearcoatRoughnessMap&&(g.clearcoatRoughnessMap.value=m.clearcoatRoughnessMap,t(m.clearcoatRoughnessMap,g.clearcoatRoughnessMapTransform)),m.clearcoatNormalMap&&(g.clearcoatNormalMap.value=m.clearcoatNormalMap,t(m.clearcoatNormalMap,g.clearcoatNormalMapTransform),g.clearcoatNormalScale.value.copy(m.clearcoatNormalScale),m.side===un&&g.clearcoatNormalScale.value.negate())),m.dispersion>0&&(g.dispersion.value=m.dispersion),m.retroreflectivity>0&&(g.retroreflectivity.value=m.retroreflectivity),m.iridescence>0&&(g.iridescence.value=m.iridescence,g.iridescenceIOR.value=m.iridescenceIOR,g.iridescenceThicknessMinimum.value=m.iridescenceThicknessRange[0],g.iridescenceThicknessMaximum.value=m.iridescenceThicknessRange[1],m.iridescenceMap&&(g.iridescenceMap.value=m.iridescenceMap,t(m.iridescenceMap,g.iridescenceMapTransform)),m.iridescenceThicknessMap&&(g.iridescenceThicknessMap.value=m.iridescenceThicknessMap,t(m.iridescenceThicknessMap,g.iridescenceThicknessMapTransform))),m.transmission>0&&(g.transmission.value=m.transmission,g.transmissionSamplerMap.value=M.texture,g.transmissionSamplerSize.value.set(M.width,M.height),m.transmissionMap&&(g.transmissionMap.value=m.transmissionMap,t(m.transmissionMap,g.transmissionMapTransform)),g.thickness.value=m.thickness,m.thicknessMap&&(g.thicknessMap.value=m.thicknessMap,t(m.thicknessMap,g.thicknessMapTransform)),g.attenuationDistance.value=m.attenuationDistance,g.attenuationColor.value.copy(m.attenuationColor)),m.anisotropy>0&&(g.anisotropyVector.value.set(m.anisotropy*Math.cos(m.anisotropyRotation),m.anisotropy*Math.sin(m.anisotropyRotation)),m.anisotropyMap&&(g.anisotropyMap.value=m.anisotropyMap,t(m.anisotropyMap,g.anisotropyMapTransform))),g.specularIntensity.value=m.specularIntensity,g.specularColor.value.copy(m.specularColor),m.specularColorMap&&(g.specularColorMap.value=m.specularColorMap,t(m.specularColorMap,g.specularColorMapTransform)),m.specularIntensityMap&&(g.specularIntensityMap.value=m.specularIntensityMap,t(m.specularIntensityMap,g.specularIntensityMapTransform))}function p(g,m){m.matcap&&(g.matcap.value=m.matcap)}function _(g,m){const M=e.get(m).light;g.referencePosition.value.setFromMatrixPosition(M.matrixWorld),g.nearDistance.value=M.shadow.camera.near,g.farDistance.value=M.shadow.camera.far}return{refreshFogUniforms:n,refreshMaterialUniforms:s}}function Cy(i,e,t,n){let s={},r={},o=[];const a=i.getParameter(i.MAX_UNIFORM_BUFFER_BINDINGS);function c(v,w){const S=w.program;n.uniformBlockBinding(v,S)}function l(v,w){let S=s[v.id];S===void 0&&(g(v),S=h(v),s[v.id]=S,v.addEventListener("dispose",M));const T=w.program;n.updateUBOMapping(v,T);const x=e.render.frame;r[v.id]!==x&&(f(v),r[v.id]=x)}function h(v){const w=u();v.__bindingPointIndex=w;const S=i.createBuffer(),T=v.__size,x=v.usage;return i.bindBuffer(i.UNIFORM_BUFFER,S),i.bufferData(i.UNIFORM_BUFFER,T,x),i.bindBuffer(i.UNIFORM_BUFFER,null),i.bindBufferBase(i.UNIFORM_BUFFER,w,S),S}function u(){for(let v=0;v<a;v++)if(o.indexOf(v)===-1)return o.push(v),v;return $e("WebGLRenderer: Maximum number of simultaneously usable uniforms groups reached."),0}function f(v){const w=s[v.id],S=v.uniforms,T=v.__cache;i.bindBuffer(i.UNIFORM_BUFFER,w);for(let x=0,R=S.length;x<R;x++){const D=S[x];if(Array.isArray(D))for(let P=0,F=D.length;P<F;P++)d(D[P],x,P,T);else d(D,x,0,T)}i.bindBuffer(i.UNIFORM_BUFFER,null)}function d(v,w,S,T){if(_(v,w,S,T)===!0){const x=v.__offset,R=v.value;if(Array.isArray(R)){let D=0;for(let P=0;P<R.length;P++){const F=R[P],A=m(F);p(F,v.__data,D),typeof F!="number"&&typeof F!="boolean"&&!F.isMatrix3&&!ArrayBuffer.isView(F)&&(D+=A.storage/Float32Array.BYTES_PER_ELEMENT)}}else p(R,v.__data,0);i.bufferSubData(i.UNIFORM_BUFFER,x,v.__data)}}function p(v,w,S){typeof v=="number"||typeof v=="boolean"?w[0]=v:v.isMatrix3?(w[0]=v.elements[0],w[1]=v.elements[1],w[2]=v.elements[2],w[3]=0,w[4]=v.elements[3],w[5]=v.elements[4],w[6]=v.elements[5],w[7]=0,w[8]=v.elements[6],w[9]=v.elements[7],w[10]=v.elements[8],w[11]=0):ArrayBuffer.isView(v)?w.set(new v.constructor(v.buffer,v.byteOffset,w.length)):v.toArray(w,S)}function _(v,w,S,T){const x=v.value,R=w+"_"+S;if(T[R]===void 0)return typeof x=="number"||typeof x=="boolean"?T[R]=x:ArrayBuffer.isView(x)?T[R]=x.slice():T[R]=x.clone(),!0;{const D=T[R];if(typeof x=="number"||typeof x=="boolean"){if(D!==x)return T[R]=x,!0}else{if(ArrayBuffer.isView(x))return!0;if(D.equals(x)===!1)return D.copy(x),!0}}return!1}function g(v){const w=v.uniforms;let S=0;const T=16;for(let R=0,D=w.length;R<D;R++){const P=Array.isArray(w[R])?w[R]:[w[R]];for(let F=0,A=P.length;F<A;F++){const I=P[F],O=Array.isArray(I.value)?I.value:[I.value];for(let H=0,C=O.length;H<C;H++){const N=O[H],U=m(N),k=S%T,V=k%U.boundary,ee=k+V;S+=V,ee!==0&&T-ee<U.storage&&(S+=T-ee),I.__data=new Float32Array(U.storage/Float32Array.BYTES_PER_ELEMENT),I.__offset=S,S+=U.storage}}}const x=S%T;return x>0&&(S+=T-x),v.__size=S,v.__cache={},this}function m(v){const w={boundary:0,storage:0};return typeof v=="number"||typeof v=="boolean"?(w.boundary=4,w.storage=4):v.isVector2?(w.boundary=8,w.storage=8):v.isVector3||v.isColor?(w.boundary=16,w.storage=12):v.isVector4?(w.boundary=16,w.storage=16):v.isMatrix3?(w.boundary=48,w.storage=48):v.isMatrix4?(w.boundary=64,w.storage=64):v.isTexture?Oe("WebGLRenderer: Texture samplers can not be part of an uniforms group."):ArrayBuffer.isView(v)?(w.boundary=16,w.storage=v.byteLength):Oe("WebGLRenderer: Unsupported uniform value type.",v),w}function M(v){const w=v.target;w.removeEventListener("dispose",M);const S=o.indexOf(w.__bindingPointIndex);o.splice(S,1),i.deleteBuffer(s[w.id]),delete s[w.id],delete r[w.id]}function b(){for(const v in s)i.deleteBuffer(s[v]);o=[],s={},r={}}return{bind:c,update:l,dispose:b}}const Py=new Uint16Array([12469,15057,12620,14925,13266,14620,13807,14376,14323,13990,14545,13625,14713,13328,14840,12882,14931,12528,14996,12233,15039,11829,15066,11525,15080,11295,15085,10976,15082,10705,15073,10495,13880,14564,13898,14542,13977,14430,14158,14124,14393,13732,14556,13410,14702,12996,14814,12596,14891,12291,14937,11834,14957,11489,14958,11194,14943,10803,14921,10506,14893,10278,14858,9960,14484,14039,14487,14025,14499,13941,14524,13740,14574,13468,14654,13106,14743,12678,14818,12344,14867,11893,14889,11509,14893,11180,14881,10751,14852,10428,14812,10128,14765,9754,14712,9466,14764,13480,14764,13475,14766,13440,14766,13347,14769,13070,14786,12713,14816,12387,14844,11957,14860,11549,14868,11215,14855,10751,14825,10403,14782,10044,14729,9651,14666,9352,14599,9029,14967,12835,14966,12831,14963,12804,14954,12723,14936,12564,14917,12347,14900,11958,14886,11569,14878,11247,14859,10765,14828,10401,14784,10011,14727,9600,14660,9289,14586,8893,14508,8533,15111,12234,15110,12234,15104,12216,15092,12156,15067,12010,15028,11776,14981,11500,14942,11205,14902,10752,14861,10393,14812,9991,14752,9570,14682,9252,14603,8808,14519,8445,14431,8145,15209,11449,15208,11451,15202,11451,15190,11438,15163,11384,15117,11274,15055,10979,14994,10648,14932,10343,14871,9936,14803,9532,14729,9218,14645,8742,14556,8381,14461,8020,14365,7603,15273,10603,15272,10607,15267,10619,15256,10631,15231,10614,15182,10535,15118,10389,15042,10167,14963,9787,14883,9447,14800,9115,14710,8665,14615,8318,14514,7911,14411,7507,14279,7198,15314,9675,15313,9683,15309,9712,15298,9759,15277,9797,15229,9773,15166,9668,15084,9487,14995,9274,14898,8910,14800,8539,14697,8234,14590,7790,14479,7409,14367,7067,14178,6621,15337,8619,15337,8631,15333,8677,15325,8769,15305,8871,15264,8940,15202,8909,15119,8775,15022,8565,14916,8328,14804,8009,14688,7614,14569,7287,14448,6888,14321,6483,14088,6171,15350,7402,15350,7419,15347,7480,15340,7613,15322,7804,15287,7973,15229,8057,15148,8012,15046,7846,14933,7611,14810,7357,14682,7069,14552,6656,14421,6316,14251,5948,14007,5528,15356,5942,15356,5977,15353,6119,15348,6294,15332,6551,15302,6824,15249,7044,15171,7122,15070,7050,14949,6861,14818,6611,14679,6349,14538,6067,14398,5651,14189,5311,13935,4958,15359,4123,15359,4153,15356,4296,15353,4646,15338,5160,15311,5508,15263,5829,15188,6042,15088,6094,14966,6001,14826,5796,14678,5543,14527,5287,14377,4985,14133,4586,13869,4257,15360,1563,15360,1642,15358,2076,15354,2636,15341,3350,15317,4019,15273,4429,15203,4732,15105,4911,14981,4932,14836,4818,14679,4621,14517,4386,14359,4156,14083,3795,13808,3437,15360,122,15360,137,15358,285,15355,636,15344,1274,15322,2177,15281,2765,15215,3223,15120,3451,14995,3569,14846,3567,14681,3466,14511,3305,14344,3121,14037,2800,13753,2467,15360,0,15360,1,15359,21,15355,89,15346,253,15325,479,15287,796,15225,1148,15133,1492,15008,1749,14856,1882,14685,1886,14506,1783,14324,1608,13996,1398,13702,1183]);let Kn=null;function Iy(){return Kn===null&&(Kn=new nh(Py,16,16,cs,fn),Kn.name="DFG_LUT",Kn.minFilter=zt,Kn.magFilter=zt,Kn.wrapS=ii,Kn.wrapT=ii,Kn.generateMipmaps=!1,Kn.needsUpdate=!0),Kn}class tp{constructor(e={}){const{canvas:t=ym(),context:n=null,depth:s=!0,stencil:r=!1,alpha:o=!1,antialias:a=!1,premultipliedAlpha:c=!0,preserveDrawingBuffer:l=!1,powerPreference:h="default",failIfMajorPerformanceCaveat:u=!1,reversedDepthBuffer:f=!1,outputBufferType:d=xn}=e;this.isWebGLRenderer=!0;let p;if(n!==null){if(typeof WebGLRenderingContext<"u"&&n instanceof WebGLRenderingContext)throw new Error("THREE.WebGLRenderer: WebGL 1 is not supported since r163.");p=n.getContextAttributes().alpha}else p=o;const _=d,g=new Set([Kc,$c,Yc]),m=new Set([xn,li,Hr,Vr,Wc,Xc]),M=new Uint32Array(4),b=new Int32Array(4),v=new B;let w=null,S=null;const T=[],x=[];let R=null;this.domElement=t,this.debug={checkShaderErrors:!0,diagnostics:{keywords:!1},onShaderError:null},this.autoClear=!0,this.autoClearColor=!0,this.autoClearDepth=!0,this.autoClearStencil=!0,this.sortObjects=!0,this.clippingPlanes=[],this.localClippingEnabled=!1,this.toneMapping=ai,this.toneMappingExposure=1,this.transmissionResolutionScale=1;const D=this;let P=!1,F=null,A=null,I=null,O=null;this._outputColorSpace=Pt;let H=0,C=0,N=null,U=-1,k=null;const V=new St,ee=new St;let re=null;const Se=new Ne(0);let be=0,Ve=t.width,J=t.height,j=1,de=null,Ue=null;const ve=new St(0,0,Ve,J),Ge=new St(0,0,Ve,J);let ht=!1;const ie=new sh;let le=!1,he=!1;const ce=new Qe,ue=new B,Xe=new St,Be={background:null,fog:null,environment:null,overrideMaterial:null,isScene:!0};let Ye=!1;function Ke(){return N===null?j:1}let z=n;function ut(E,G){return t.getContext(E,G)}let je,L,y,X,$,Q,fe,pe,te,se,me,ke,Me,ge,ze,qe,et,W,_e,ne,xe,Ee,ae;try{const E={alpha:!0,depth:s,stencil:r,antialias:a,premultipliedAlpha:c,preserveDrawingBuffer:l,powerPreference:h,failIfMajorPerformanceCaveat:u};if("setAttribute"in t&&t.setAttribute("data-engine",`three.js r${Uc}`),t.addEventListener("webglcontextlost",bt,!1),t.addEventListener("webglcontextrestored",mt,!1),t.addEventListener("webglcontextcreationerror",On,!1),z===null){const G="webgl2";if(z=ut(G,E),z===null)throw ut(G)?new Error("THREE.WebGLRenderer: Error creating WebGL context with your selected attributes."):new Error("THREE.WebGLRenderer: Error creating WebGL context.")}We()}catch(E){throw t.removeEventListener("webglcontextlost",bt,!1),t.removeEventListener("webglcontextrestored",mt,!1),t.removeEventListener("webglcontextcreationerror",On,!1),$e("WebGLRenderer: "+E.message),E}function We(){je=new Iv(z),je.init(),xe=new Sy(z,je),L=new yv(z,je,e,xe),y=new My(z,je),L.reversedDepthBuffer&&f&&y.buffers.depth.setReversed(!0),A=z.createFramebuffer(),I=z.createFramebuffer(),O=z.createFramebuffer(),X=new Dv(z),$=new oy,Q=new yy(z,je,y,$,L,xe,X),fe=new Pv(D),pe=new Fg(z),Ee=new vv(z,pe),te=new Lv(z,pe,X,Ee),se=new Fv(z,te,pe,Ee,X),W=new Uv(z,L,Q),ze=new Sv($),me=new ry(D,fe,je,L,Ee,ze),ke=new Ry(D,$),Me=new ly,ge=new py(je),et=new xv(D,fe,y,se,p,c),qe=new vy(D,se,L),ae=new Cy(z,X,L,y),_e=new Mv(z,je,X),ne=new Nv(z,je,X),X.programs=me.programs,D.capabilities=L,D.extensions=je,D.properties=$,D.renderLists=Me,D.shadowMap=qe,D.state=y,D.info=X}_!==xn&&(R=new Bv(_,t.width,t.height,a,s,r));const De=new Ey(D,z);this.xr=De,this.getContext=function(){return z},this.getContextAttributes=function(){return z.getContextAttributes()},this.forceContextLoss=function(){const E=je.get("WEBGL_lose_context");E&&E.loseContext()},this.forceContextRestore=function(){const E=je.get("WEBGL_lose_context");E&&E.restoreContext()},this.getPixelRatio=function(){return j},this.setPixelRatio=function(E){E!==void 0&&(j=E,this.setSize(Ve,J,!1))},this.getSize=function(E){return E.set(Ve,J)},this.setSize=function(E,G,Z=!0){if(De.isPresenting){Oe("WebGLRenderer: Can't change size while VR device is presenting.");return}Ve=E,J=G,t.width=Math.floor(E*j),t.height=Math.floor(G*j),Z===!0&&(t.style.width=E+"px",t.style.height=G+"px"),R!==null&&R.setSize(t.width,t.height),this.setViewport(0,0,E,G)},this.getDrawingBufferSize=function(E){return E.set(Ve*j,J*j).floor()},this.setDrawingBufferSize=function(E,G,Z){Ve=E,J=G,j=Z,t.width=Math.floor(E*Z),t.height=Math.floor(G*Z),this.setViewport(0,0,E,G)},this.setEffects=function(E){if(_===xn){$e("WebGLRenderer: setEffects() requires outputBufferType set to HalfFloatType or FloatType.");return}if(E){for(let G=0;G<E.length;G++)if(E[G].isOutputPass===!0){Oe("WebGLRenderer: OutputPass is not needed in setEffects(). Tone mapping and color space conversion are applied automatically.");break}}R.setEffects(E||[])},this.getCurrentViewport=function(E){return E.copy(V)},this.getViewport=function(E){return E.copy(ve)},this.setViewport=function(E,G,Z,q){E.isVector4?ve.set(E.x,E.y,E.z,E.w):ve.set(E,G,Z,q),y.viewport(V.copy(ve).multiplyScalar(j).round())},this.getScissor=function(E){return E.copy(Ge)},this.setScissor=function(E,G,Z,q){E.isVector4?Ge.set(E.x,E.y,E.z,E.w):Ge.set(E,G,Z,q),y.scissor(ee.copy(Ge).multiplyScalar(j).round())},this.getScissorTest=function(){return ht},this.setScissorTest=function(E){y.setScissorTest(ht=E)},this.setOpaqueSort=function(E){de=E},this.setTransparentSort=function(E){Ue=E},this.getClearColor=function(E){return E.copy(et.getClearColor())},this.setClearColor=function(){et.setClearColor(...arguments)},this.getClearAlpha=function(){return et.getClearAlpha()},this.setClearAlpha=function(){et.setClearAlpha(...arguments)},this.clear=function(E=!0,G=!0,Z=!0){let q=0;if(E){let Y=!1;if(N!==null){const Te=N.texture.format;Y=g.has(Te)}if(Y){const Te=N.texture.type,Pe=m.has(Te),we=et.getClearColor(),Ie=et.getClearAlpha(),Fe=we.r,nt=we.g,ct=we.b;Pe?(M[0]=Fe,M[1]=nt,M[2]=ct,M[3]=Ie,z.clearBufferuiv(z.COLOR,0,M)):(b[0]=Fe,b[1]=nt,b[2]=ct,b[3]=Ie,z.clearBufferiv(z.COLOR,0,b))}else q|=z.COLOR_BUFFER_BIT}G&&(q|=z.DEPTH_BUFFER_BIT,this.state.buffers.depth.setMask(!0)),Z&&(q|=z.STENCIL_BUFFER_BIT,this.state.buffers.stencil.setMask(4294967295)),q!==0&&z.clear(q)},this.clearColor=function(){this.clear(!0,!1,!1)},this.clearDepth=function(){this.clear(!1,!0,!1)},this.clearStencil=function(){this.clear(!1,!1,!0)},this.setNodesHandler=function(E){E.setRenderer(this),F=E},this.dispose=function(){t.removeEventListener("webglcontextlost",bt,!1),t.removeEventListener("webglcontextrestored",mt,!1),t.removeEventListener("webglcontextcreationerror",On,!1),et.dispose(),Me.dispose(),ge.dispose(),$.dispose(),fe.dispose(),se.dispose(),Ee.dispose(),ae.dispose(),me.dispose(),De.dispose(),De.removeEventListener("sessionstart",Dh),De.removeEventListener("sessionend",Uh),$i.stop()};function bt(E){E.preventDefault(),ha("WebGLRenderer: Context Lost."),P=!0}function mt(){ha("WebGLRenderer: Context Restored."),P=!1;const E=X.autoReset,G=qe.enabled,Z=qe.autoUpdate,q=qe.needsUpdate,Y=qe.type;We(),X.autoReset=E,qe.enabled=G,qe.autoUpdate=Z,qe.needsUpdate=q,qe.type=Y}function On(E){$e("WebGLRenderer: A WebGL context could not be created. Reason: ",E.statusMessage)}function qn(E){const G=E.target;G.removeEventListener("dispose",qn),yp(G)}function yp(E){Sp(E),$.remove(E)}function Sp(E){const G=$.get(E).programs;G!==void 0&&(G.forEach(function(Z){me.releaseProgram(Z)}),E.isShaderMaterial&&me.releaseShaderCache(E))}this.renderBufferDirect=function(E,G,Z,q,Y,Te){G===null&&(G=Be);const Pe=Y.isMesh&&Y.matrixWorld.determinantAffine()<0,we=Tp(E,G,Z,q,Y);y.setMaterial(q,Pe);let Ie=Z.index,Fe=1;if(q.wireframe===!0){if(Ie=te.getWireframeAttribute(Z),Ie===void 0)return;Fe=2}const nt=Z.drawRange,ct=Z.attributes.position;let Le=nt.start*Fe,gt=(nt.start+nt.count)*Fe;Te!==null&&(Le=Math.max(Le,Te.start*Fe),gt=Math.min(gt,(Te.start+Te.count)*Fe)),Ie!==null?(Le=Math.max(Le,0),gt=Math.min(gt,Ie.count)):ct!=null&&(Le=Math.max(Le,0),gt=Math.min(gt,ct.count));const Dt=gt-Le;if(Dt<0||Dt===1/0)return;Ee.setup(Y,q,we,Z,Ie);let Ct,wt=_e;if(Ie!==null&&(Ct=pe.get(Ie),wt=ne,wt.setIndex(Ct)),Y.isMesh)q.wireframe===!0?(y.setLineWidth(q.wireframeLinewidth*Ke()),wt.setMode(z.LINES)):wt.setMode(z.TRIANGLES);else if(Y.isLine){let $t=q.linewidth;$t===void 0&&($t=1),y.setLineWidth($t*Ke()),Y.isLineSegments?wt.setMode(z.LINES):Y.isLineLoop?wt.setMode(z.LINE_LOOP):wt.setMode(z.LINE_STRIP)}else Y.isPoints?wt.setMode(z.POINTS):Y.isSprite&&wt.setMode(z.TRIANGLES);if(Y.isBatchedMesh)if(je.get("WEBGL_multi_draw"))wt.renderMultiDraw(Y._multiDrawStarts,Y._multiDrawCounts,Y._multiDrawCount);else{const $t=Y._multiDrawStarts,Ce=Y._multiDrawCounts,tn=Y._multiDrawCount,dt=Ie?pe.get(Ie).bytesPerElement:1,bn=$.get(q).currentProgram.getUniforms();for(let Yn=0;Yn<tn;Yn++)bn.setValue(z,"_gl_DrawID",Yn),wt.render($t[Yn]/dt,Ce[Yn])}else if(Y.isInstancedMesh)wt.renderInstances(Le,Dt,Y.count);else if(Z.isInstancedBufferGeometry){const $t=Z._maxInstanceCount!==void 0?Z._maxInstanceCount:1/0,Ce=Math.min(Z.instanceCount,$t);wt.renderInstances(Le,Dt,Ce)}else wt.render(Le,Dt)};function Nh(E,G,Z,q){F!==null&&E.isNodeMaterial&&F.setObject(q,E),le===!0&&ze.setState(E,Z,!1),E.transparent===!0&&E.side===Vn&&E.forceSinglePass===!1?(E.side=un,E.needsUpdate=!0,oo(E,G,q),E.side=Xi,E.needsUpdate=!0,oo(E,G,q),E.side=Vn):oo(E,G,q)}this.compile=function(E,G,Z=null){Z===null&&(Z=E),F!==null&&F.renderStart(E,G,Z),S=ge.get(Z),S.init(G),x.push(S),Z.traverseVisible(function(Y){Y.isLight&&Y.layers.test(G.layers)&&(S.pushLight(Y),Y.castShadow&&S.pushShadow(Y))}),E!==Z&&E.traverseVisible(function(Y){Y.isLight&&Y.layers.test(G.layers)&&(S.pushLight(Y),Y.castShadow&&S.pushShadow(Y))}),S.setupLights(),F!==null&&F.updateLights(S.state.lightsArray),he=this.localClippingEnabled,le=ze.init(this.clippingPlanes,he),le===!0&&ze.setGlobalState(this.clippingPlanes,G),F!==null&&qe.render(S.state.shadowsArray,Z,G);const q=new Set;return E.traverse(function(Y){if(!(Y.isMesh||Y.isPoints||Y.isLine||Y.isSprite))return;const Te=Y.material;if(Te)if(Array.isArray(Te))for(let Pe=0;Pe<Te.length;Pe++){const we=Te[Pe];Nh(we,Z,G,Y),q.add(we)}else Nh(Te,Z,G,Y),q.add(Te)}),S=x.pop(),F!==null&&F.renderEnd(),q},this.compileAsync=function(E,G,Z=null){const q=this.compile(E,G,Z);return new Promise(Y=>{function Te(){if(q.forEach(function(Pe){const Ie=$.get(Pe).currentProgram;(Ie===void 0||Ie.isReady())&&q.delete(Pe)}),q.size===0){Y(E);return}setTimeout(Te,10)}je.get("KHR_parallel_shader_compile")!==null?Te():setTimeout(Te,10)})};let Ia=null;function wp(E){Ia&&Ia(E)}function Dh(){$i.stop()}function Uh(){$i.start()}const $i=new Yd;$i.setAnimationLoop(wp),typeof self<"u"&&$i.setContext(self),this.setAnimationLoop=function(E){Ia=E,De.setAnimationLoop(E),E===null?$i.stop():$i.start()},De.addEventListener("sessionstart",Dh),De.addEventListener("sessionend",Uh),this.render=function(E,G){if(G!==void 0&&G.isCamera!==!0){$e("WebGLRenderer.render: camera is not an instance of THREE.Camera.");return}if(P===!0)return;F!==null&&F.renderStart(E,G);const Z=De.enabled===!0&&De.isPresenting===!0,q=R!==null&&(N===null||Z)&&R.begin(D,N);if(E.matrixWorldAutoUpdate===!0&&E.updateMatrixWorld(),G.parent===null&&G.matrixWorldAutoUpdate===!0&&G.updateMatrixWorld(),De.enabled===!0&&De.isPresenting===!0&&(R===null||R.isCompositing()===!1)&&(De.cameraAutoUpdate===!0&&De.updateCamera(G),G=De.getCamera()),E.isScene===!0&&E.onBeforeRender(D,E,G,N),S=ge.get(E,x.length),S.init(G),S.state.textureUnits=Q.getTextureUnits(),x.push(S),ce.multiplyMatrices(G.projectionMatrix,G.matrixWorldInverse),ie.setFromProjectionMatrix(ce,si,G.reversedDepth),he=this.localClippingEnabled,le=ze.init(this.clippingPlanes,he),w=Me.get(E,T.length),w.init(),T.push(w),De.enabled===!0&&De.isPresenting===!0){const Pe=D.xr.getDepthSensingMesh();Pe!==null&&La(Pe,G,-1/0,D.sortObjects)}La(E,G,0,D.sortObjects),w.finish(),F!==null&&F.updateLights(S.state.lightsArray),D.sortObjects===!0&&w.sort(de,Ue),Ye=De.enabled===!1||De.isPresenting===!1||De.hasDepthSensing()===!1,Ye&&et.addToRenderList(w,E),this.info.render.frame++,this.info.autoReset===!0&&this.info.reset(),le===!0&&ze.beginShadows();const Y=S.state.shadowsArray;if(qe.render(Y,E,G),le===!0&&ze.endShadows(),(q&&R.hasRenderPass())===!1){const Pe=w.opaque,we=w.transmissive;if(S.setupLights(),G.isArrayCamera){const Ie=G.cameras;if(we.length>0)for(let Fe=0,nt=Ie.length;Fe<nt;Fe++){const ct=Ie[Fe];Oh(Pe,we,E,ct)}Ye&&et.render(E);for(let Fe=0,nt=Ie.length;Fe<nt;Fe++){const ct=Ie[Fe];Fh(w,E,ct,ct.viewport)}}else we.length>0&&Oh(Pe,we,E,G),Ye&&et.render(E),Fh(w,E,G)}N!==null&&C===0&&(Q.updateMultisampleRenderTarget(N),Q.updateRenderTargetMipmap(N)),q&&R.end(D),E.isScene===!0&&E.onAfterRender(D,E,G),Ee.resetDefaultState(),U=-1,k=null,x.pop(),x.length>0?(S=x[x.length-1],Q.setTextureUnits(S.state.textureUnits),le===!0&&ze.setGlobalState(D.clippingPlanes,S.state.camera)):S=null,T.pop(),T.length>0?w=T[T.length-1]:w=null,F!==null&&F.renderEnd()};function La(E,G,Z,q){if(E.visible===!1)return;if(E.layers.test(G.layers)){if(E.isGroup)Z=E.renderOrder;else if(E.isLOD)E.autoUpdate===!0&&E.update(G);else if(E.isLightProbeGrid)S.pushLightProbeGrid(E);else if(E.isLight)S.pushLight(E),E.castShadow&&S.pushShadow(E);else if(E.isSprite){if(!E.frustumCulled||E.intersectsFrustum(ie)){q&&Xe.setFromMatrixPosition(E.matrixWorld).applyMatrix4(ce);const Pe=se.update(E),we=E.material;we.visible&&w.push(E,Pe,we,Z,Xe.z,null,G)}}else if((E.isMesh||E.isLine||E.isPoints)&&(!E.frustumCulled||E.intersectsFrustum(ie))){const Pe=se.update(E),we=E.material;if(q&&(E.boundingSphere!==void 0?(E.boundingSphere===null&&E.computeBoundingSphere(),Xe.copy(E.boundingSphere.center)):(Pe.boundingSphere===null&&Pe.computeBoundingSphere(),Xe.copy(Pe.boundingSphere.center)),Xe.applyMatrix4(E.matrixWorld).applyMatrix4(ce)),Array.isArray(we)){const Ie=Pe.groups;for(let Fe=0,nt=Ie.length;Fe<nt;Fe++){const ct=Ie[Fe],Le=we[ct.materialIndex];Le&&Le.visible&&w.push(E,Pe,Le,Z,Xe.z,ct,G)}}else we.visible&&w.push(E,Pe,we,Z,Xe.z,null,G)}}const Te=E.children;for(let Pe=0,we=Te.length;Pe<we;Pe++)La(Te[Pe],G,Z,q)}function Fh(E,G,Z,q){const{opaque:Y,transmissive:Te,transparent:Pe}=E;S.setupLightsView(Z),le===!0&&ze.setGlobalState(D.clippingPlanes,Z),q&&y.viewport(V.copy(q)),Y.length>0&&ro(Y,G,Z),Te.length>0&&ro(Te,G,Z),Pe.length>0&&ro(Pe,G,Z),y.buffers.depth.setTest(!0),y.buffers.depth.setMask(!0),y.buffers.color.setMask(!0),y.setPolygonOffset(!1)}function Oh(E,G,Z,q){if((Z.isScene===!0?Z.overrideMaterial:null)!==null)return;if(S.state.transmissionRenderTarget[q.id]===void 0){const Le=je.has("EXT_color_buffer_half_float")||je.has("EXT_color_buffer_float");S.state.transmissionRenderTarget[q.id]=new cn(1,1,{generateMipmaps:!0,type:Le?fn:xn,minFilter:bi,samples:Math.max(4,L.samples),stencilBuffer:r,resolveDepthBuffer:!1,resolveStencilBuffer:!1,storeMultisampledDepthBuffer:!1,storeMultisampledStencilBuffer:!1,colorSpace:at.workingColorSpace})}const Te=S.state.transmissionRenderTarget[q.id],Pe=q.viewport||V;Te.setSize(Pe.z*D.transmissionResolutionScale,Pe.w*D.transmissionResolutionScale);const we=D.getRenderTarget(),Ie=D.getActiveCubeFace(),Fe=D.getActiveMipmapLevel();D.setRenderTarget(Te),D.getClearColor(Se),be=D.getClearAlpha(),be<1&&D.setClearColor(16777215,.5),D.clear(),Ye&&et.render(Z);const nt=D.toneMapping;D.toneMapping=ai;const ct=q.viewport;if(q.viewport!==void 0&&(q.viewport=void 0),S.setupLightsView(q),le===!0&&ze.setGlobalState(D.clippingPlanes,q),ro(E,Z,q),Q.updateMultisampleRenderTarget(Te),Q.updateRenderTargetMipmap(Te),je.has("WEBGL_multisampled_render_to_texture")===!1){let Le=!1;for(let gt=0,Dt=G.length;gt<Dt;gt++){const Ct=G[gt],{object:wt,geometry:$t,material:Ce,group:tn}=Ct;if(Ce.side===Vn&&wt.layers.test(q.layers)){const dt=Ce.side;Ce.side=un,Ce.needsUpdate=!0,Bh(wt,Z,q,$t,Ce,tn),Ce.side=dt,Ce.needsUpdate=!0,Le=!0}}Le===!0&&(Q.updateMultisampleRenderTarget(Te),Q.updateRenderTargetMipmap(Te))}D.setRenderTarget(we,Ie,Fe),D.setClearColor(Se,be),ct!==void 0&&(q.viewport=ct),D.toneMapping=nt}function ro(E,G,Z){const q=G.isScene===!0?G.overrideMaterial:null;for(let Y=0,Te=E.length;Y<Te;Y++){const Pe=E[Y],{object:we,geometry:Ie,group:Fe}=Pe;let nt=Pe.material;nt.allowOverride===!0&&q!==null&&(nt=q),we.layers.test(Z.layers)&&Bh(we,G,Z,Ie,nt,Fe)}}function Bh(E,G,Z,q,Y,Te){F!==null&&Y.isNodeMaterial&&F.setObject(E,Y),E.onBeforeRender(D,G,Z,q,Y,Te),E.modelViewMatrix.multiplyMatrices(Z.matrixWorldInverse,E.matrixWorld),E.normalMatrix.getNormalMatrix(E.modelViewMatrix),Y.onBeforeRender(D,G,Z,q,E,Te),Y.transparent===!0&&Y.side===Vn&&Y.forceSinglePass===!1?(Y.side=un,Y.needsUpdate=!0,D.renderBufferDirect(Z,G,q,Y,E,Te),Y.side=Xi,Y.needsUpdate=!0,D.renderBufferDirect(Z,G,q,Y,E,Te),Y.side=Vn):D.renderBufferDirect(Z,G,q,Y,E,Te),E.onAfterRender(D,G,Z,q,Y,Te)}function oo(E,G,Z){G.isScene!==!0&&(G=Be);const q=$.get(E),Y=S.state.lights,Te=S.state.shadowsArray,Pe=Y.state.version,we=me.getParameters(E,Y.state,Te,G,Z,S.state.lightProbeGridArray),Ie=me.getProgramCacheKey(we);let Fe=q.programs;q.environment=E.isMeshStandardMaterial||E.isMeshLambertMaterial||E.isMeshPhongMaterial?G.environment:null,q.fog=G.fog;const nt=E.isMeshStandardMaterial||E.isMeshLambertMaterial&&!E.envMap||E.isMeshPhongMaterial&&!E.envMap;q.envMap=fe.get(E.envMap||q.environment,nt),q.envMapRotation=q.environment!==null&&E.envMap===null?G.environmentRotation:E.envMapRotation,Fe===void 0&&(E.addEventListener("dispose",qn),Fe=new Map,q.programs=Fe);let ct=Fe.get(Ie);if(ct!==void 0){if(q.currentProgram===ct&&q.lightsStateVersion===Pe)return zh(E,we),ct}else we.uniforms=me.getUniforms(E),F!==null&&E.isNodeMaterial&&F.build(E,Z,we),E.onBeforeCompile(we,D),ct=me.acquireProgram(we,Ie),Fe.set(Ie,ct),q.uniforms=we.uniforms;const Le=q.uniforms;return(!E.isShaderMaterial&&!E.isRawShaderMaterial||E.clipping===!0)&&(Le.clippingPlanes=ze.uniform),zh(E,we),q.needsLights=Ap(E),q.lightsStateVersion=Pe,q.needsLights&&(Le.ambientLightColor.value=Y.state.ambient,Le.lightProbe.value=Y.state.probe,Le.sunLights.value=Y.state.sun,Le.sunLightShadows.value=Y.state.sunShadow,Le.directionalLights.value=Y.state.directional,Le.directionalLightShadows.value=Y.state.directionalShadow,Le.spotLights.value=Y.state.spot,Le.spotLightShadows.value=Y.state.spotShadow,Le.rectAreaLights.value=Y.state.rectArea,Le.ltc_1.value=Y.state.rectAreaLTC1,Le.ltc_2.value=Y.state.rectAreaLTC2,Le.pointLights.value=Y.state.point,Le.pointLightShadows.value=Y.state.pointShadow,Le.hemisphereLights.value=Y.state.hemi,Le.sunShadowMatrix.value=Y.state.sunShadowMatrix,Le.sunShadowCascade.value=Y.state.sunShadowCascade,Le.directionalShadowMatrix.value=Y.state.directionalShadowMatrix,Le.spotLightMatrix.value=Y.state.spotLightMatrix,Le.spotLightMap.value=Y.state.spotLightMap,Le.pointShadowMatrix.value=Y.state.pointShadowMatrix),q.lightProbeGrid=S.state.lightProbeGridArray.length>0,q.currentProgram=ct,q.uniformsList=null,ct}function kh(E){if(E.uniformsList===null){const G=E.currentProgram.getUniforms();E.uniformsList=ea.seqWithValue(G.seq,E.uniforms)}return E.uniformsList}function zh(E,G){const Z=$.get(E);Z.outputColorSpace=G.outputColorSpace,Z.batching=G.batching,Z.batchingColor=G.batchingColor,Z.instancing=G.instancing,Z.instancingColor=G.instancingColor,Z.instancingMorph=G.instancingMorph,Z.skinning=G.skinning,Z.morphTargets=G.morphTargets,Z.morphNormals=G.morphNormals,Z.morphColors=G.morphColors,Z.morphTargetsCount=G.morphTargetsCount,Z.numClippingPlanes=G.numClippingPlanes,Z.numIntersection=G.numClipIntersection,Z.vertexAlphas=G.vertexAlphas,Z.vertexTangents=G.vertexTangents,Z.toneMapping=G.toneMapping}function bp(E,G){if(E.length===0)return null;if(E.length===1)return E[0].texture!==null?E[0]:null;v.setFromMatrixPosition(G.matrixWorld);for(let Z=0,q=E.length;Z<q;Z++){const Y=E[Z];if(Y.texture!==null&&Y.boundingBox.containsPoint(v))return Y}return null}function Tp(E,G,Z,q,Y){G.isScene!==!0&&(G=Be),Q.resetTextureUnits();const Te=G.fog,Pe=q.isMeshStandardMaterial||q.isMeshLambertMaterial||q.isMeshPhongMaterial?G.environment:null,we=N===null?D.outputColorSpace:N.isXRRenderTarget===!0?N.texture.colorSpace:at.workingColorSpace,Ie=q.isMeshStandardMaterial||q.isMeshLambertMaterial&&!q.envMap||q.isMeshPhongMaterial&&!q.envMap,Fe=fe.get(q.envMap||Pe,Ie),nt=q.vertexColors===!0&&!!Z.attributes.color&&Z.attributes.color.itemSize===4,ct=!!Z.attributes.tangent&&(!!q.normalMap||q.anisotropy>0),Le=!!Z.morphAttributes.position,gt=!!Z.morphAttributes.normal,Dt=!!Z.morphAttributes.color;let Ct=ai;q.toneMapped&&(N===null||N.isXRRenderTarget===!0)&&(Ct=D.toneMapping);const wt=Z.morphAttributes.position||Z.morphAttributes.normal||Z.morphAttributes.color,$t=wt!==void 0?wt.length:0,Ce=$.get(q),tn=S.state.lights;if(le===!0&&(he===!0||E!==k)){const Tt=E===k&&q.id===U;ze.setState(q,E,Tt)}let dt=!1;q.version===Ce.__version?(Ce.needsLights&&Ce.lightsStateVersion!==tn.state.version||Ce.outputColorSpace!==we||Y.isBatchedMesh&&Ce.batching===!1||!Y.isBatchedMesh&&Ce.batching===!0||Y.isBatchedMesh&&Ce.batchingColor===!0&&Y._colorsTexture===null||Y.isBatchedMesh&&Ce.batchingColor===!1&&Y._colorsTexture!==null||Y.isInstancedMesh&&Ce.instancing===!1||!Y.isInstancedMesh&&Ce.instancing===!0||Y.isSkinnedMesh&&Ce.skinning===!1||!Y.isSkinnedMesh&&Ce.skinning===!0||Y.isInstancedMesh&&Ce.instancingColor===!0&&Y.instanceColor===null||Y.isInstancedMesh&&Ce.instancingColor===!1&&Y.instanceColor!==null||Y.isInstancedMesh&&Ce.instancingMorph===!0&&Y.morphTexture===null||Y.isInstancedMesh&&Ce.instancingMorph===!1&&Y.morphTexture!==null||Ce.envMap!==Fe||q.fog===!0&&Ce.fog!==Te||Ce.numClippingPlanes!==void 0&&(Ce.numClippingPlanes!==ze.numPlanes||Ce.numIntersection!==ze.numIntersection)||Ce.vertexAlphas!==nt||Ce.vertexTangents!==ct||Ce.morphTargets!==Le||Ce.morphNormals!==gt||Ce.morphColors!==Dt||Ce.toneMapping!==Ct||Ce.morphTargetsCount!==$t||!!Ce.lightProbeGrid!=S.state.lightProbeGridArray.length>0)&&(dt=!0):(dt=!0,Ce.__version=q.version);let bn=Ce.currentProgram;dt===!0&&(bn=oo(q,G,Y),F&&q.isNodeMaterial&&F.onUpdateProgram(q,bn,Ce));let Yn=!1,Ci=!1,ps=!1;const yt=bn.getUniforms(),Lt=Ce.uniforms;if(y.useProgram(bn.program)&&(Yn=!0,Ci=!0,ps=!0),q.id!==U&&(U=q.id,Ci=!0),Ce.needsLights){const Tt=bp(S.state.lightProbeGridArray,Y);Ce.lightProbeGrid!==Tt&&(Ce.lightProbeGrid=Tt,Ci=!0)}if(Yn||k!==E){y.buffers.depth.getReversed()&&E.reversedDepth!==!0&&(E._reversedDepth=!0,E.updateProjectionMatrix()),yt.setValue(z,"projectionMatrix",E.projectionMatrix),yt.setValue(z,"viewMatrix",E.matrixWorldInverse);const Ii=yt.map.cameraPosition;Ii!==void 0&&Ii.setValue(z,ue.setFromMatrixPosition(E.matrixWorld)),L.logarithmicDepthBuffer&&yt.setValue(z,"logDepthBufFC",2/(Math.log(E.far+1)/Math.LN2)),(q.isMeshPhongMaterial||q.isMeshToonMaterial||q.isMeshLambertMaterial||q.isMeshBasicMaterial||q.isMeshStandardMaterial||q.isShaderMaterial)&&yt.setValue(z,"isOrthographic",E.isOrthographicCamera===!0),k!==E&&(k=E,Ci=!0,ps=!0)}if(Ce.needsLights&&(tn.state.sunShadowMap.length>0&&yt.setValue(z,"sunShadowMap",tn.state.sunShadowMap,Q),tn.state.directionalShadowMap.length>0&&yt.setValue(z,"directionalShadowMap",tn.state.directionalShadowMap,Q),tn.state.spotShadowMap.length>0&&yt.setValue(z,"spotShadowMap",tn.state.spotShadowMap,Q),tn.state.pointShadowMap.length>0&&yt.setValue(z,"pointShadowMap",tn.state.pointShadowMap,Q)),Y.isSkinnedMesh){yt.setOptional(z,Y,"bindMatrix"),yt.setOptional(z,Y,"bindMatrixInverse");const Tt=Y.skeleton;Tt&&(Tt.boneTexture===null&&Tt.computeBoneTexture(),yt.setValue(z,"boneTexture",Tt.boneTexture,Q))}Y.isBatchedMesh&&(yt.setOptional(z,Y,"batchingTexture"),yt.setValue(z,"batchingTexture",Y._matricesTexture,Q),yt.setOptional(z,Y,"batchingIdTexture"),yt.setValue(z,"batchingIdTexture",Y._indirectTexture,Q),yt.setOptional(z,Y,"batchingColorTexture"),Y._colorsTexture!==null&&yt.setValue(z,"batchingColorTexture",Y._colorsTexture,Q));const Pi=Z.morphAttributes;if((Pi.position!==void 0||Pi.normal!==void 0||Pi.color!==void 0)&&W.update(Y,Z,bn),(Ci||Ce.receiveShadow!==Y.receiveShadow)&&(Ce.receiveShadow=Y.receiveShadow,yt.setValue(z,"receiveShadow",Y.receiveShadow)),(q.isMeshStandardMaterial||q.isMeshLambertMaterial||q.isMeshPhongMaterial)&&q.envMap===null&&G.environment!==null&&(Lt.envMapIntensity.value=G.environmentIntensity),Lt.dfgLUT!==void 0&&(Lt.dfgLUT.value=Iy()),Ci){if(yt.setValue(z,"toneMappingExposure",D.toneMappingExposure),Ce.needsLights&&Ep(Lt,ps),Te&&q.fog===!0&&ke.refreshFogUniforms(Lt,Te),ke.refreshMaterialUniforms(Lt,q,j,J,S.state.transmissionRenderTarget[E.id]),Ce.needsLights&&Ce.lightProbeGrid){const Tt=Ce.lightProbeGrid;Lt.probesSH.value=Tt.texture,Lt.probesMin.value.copy(Tt.boundingBox.min),Lt.probesMax.value.copy(Tt.boundingBox.max),Lt.probesResolution.value.copy(Tt.resolution)}ea.upload(z,kh(Ce),Lt,Q)}if(q.isShaderMaterial&&q.uniformsNeedUpdate===!0&&(ea.upload(z,kh(Ce),Lt,Q),q.uniformsNeedUpdate=!1),q.isSpriteMaterial&&yt.setValue(z,"center",Y.center),yt.setValue(z,"modelViewMatrix",Y.modelViewMatrix),yt.setValue(z,"normalMatrix",Y.normalMatrix),yt.setValue(z,"modelMatrix",Y.matrixWorld),q.uniformsGroups!==void 0){const Tt=q.uniformsGroups;for(let Ii=0,ms=Tt.length;Ii<ms;Ii++){const Vh=Tt[Ii];ae.update(Vh,bn),ae.bind(Vh,bn)}}return bn}function Ep(E,G){E.ambientLightColor.needsUpdate=G,E.lightProbe.needsUpdate=G,E.sunLights.needsUpdate=G,E.sunLightShadows.needsUpdate=G,E.directionalLights.needsUpdate=G,E.directionalLightShadows.needsUpdate=G,E.pointLights.needsUpdate=G,E.pointLightShadows.needsUpdate=G,E.spotLights.needsUpdate=G,E.spotLightShadows.needsUpdate=G,E.rectAreaLights.needsUpdate=G,E.hemisphereLights.needsUpdate=G}function Ap(E){return E.isMeshLambertMaterial||E.isMeshToonMaterial||E.isMeshPhongMaterial||E.isMeshStandardMaterial||E.isShadowMaterial||E.isShaderMaterial&&E.lights===!0}this.getActiveCubeFace=function(){return H},this.getActiveMipmapLevel=function(){return C},this.getRenderTarget=function(){return N},this.setRenderTargetTextures=function(E,G,Z){const q=$.get(E);q.__autoAllocateDepthBuffer=E.resolveDepthBuffer===!1,q.__autoAllocateDepthBuffer===!1&&(q.__useRenderToTexture=!1),$.get(E.texture).__webglTexture=G,$.get(E.depthTexture).__webglTexture=q.__autoAllocateDepthBuffer?void 0:Z,q.__hasExternalTextures=!0},this.setRenderTargetFramebuffer=function(E,G){const Z=$.get(E);Z.__webglFramebuffer=G,Z.__useDefaultFramebuffer=G===void 0},this.setRenderTarget=function(E,G=0,Z=0){N=E,H=G,C=Z;let q=null,Y=!1,Te=!1;if(E){const we=$.get(E);if(we.__useDefaultFramebuffer!==void 0){y.bindFramebuffer(z.FRAMEBUFFER,we.__webglFramebuffer),V.copy(E.viewport),ee.copy(E.scissor),re=E.scissorTest,y.viewport(V),y.scissor(ee),y.setScissorTest(re),U=-1;return}else if(we.__webglFramebuffer===void 0)Q.setupRenderTarget(E);else if(we.__hasExternalTextures)Q.rebindTextures(E,$.get(E.texture).__webglTexture,$.get(E.depthTexture).__webglTexture);else if(E.depthBuffer){const nt=E.depthTexture;if(we.__boundDepthTexture!==nt){if(nt!==null&&$.has(nt)&&(E.width!==nt.image.width||E.height!==nt.image.height))throw new Error("THREE.WebGLRenderer: Attached DepthTexture is initialized to the incorrect size.");Q.setupDepthRenderbuffer(E)}}const Ie=E.texture;(Ie.isData3DTexture||Ie.isDataArrayTexture||Ie.isCompressedArrayTexture)&&(Te=!0);const Fe=$.get(E).__webglFramebuffer;E.isWebGLCubeRenderTarget?(Array.isArray(Fe[G])?q=Fe[G][Z]:q=Fe[G],Y=!0):E.samples>0&&Q.useMultisampledRTT(E)===!1?q=$.get(E).__webglMultisampledFramebuffer:Array.isArray(Fe)?q=Fe[Z]:q=Fe,V.copy(E.viewport),ee.copy(E.scissor),re=E.scissorTest}else V.copy(ve).multiplyScalar(j).floor(),ee.copy(Ge).multiplyScalar(j).floor(),re=ht;if(Z!==0&&(q=A),y.bindFramebuffer(z.FRAMEBUFFER,q)&&y.drawBuffers(E,q),y.viewport(V),y.scissor(ee),y.setScissorTest(re),Y){const we=$.get(E.texture);z.framebufferTexture2D(z.FRAMEBUFFER,z.COLOR_ATTACHMENT0,z.TEXTURE_CUBE_MAP_POSITIVE_X+G,we.__webglTexture,Z)}else if(Te){const we=G;for(let Ie=0;Ie<E.textures.length;Ie++){const Fe=$.get(E.textures[Ie]);z.framebufferTextureLayer(z.FRAMEBUFFER,z.COLOR_ATTACHMENT0+Ie,Fe.__webglTexture,Z,we)}}else if(E!==null&&Z!==0){const we=$.get(E.texture);z.framebufferTexture2D(z.FRAMEBUFFER,z.COLOR_ATTACHMENT0,z.TEXTURE_2D,we.__webglTexture,Z)}U=-1};function Hh(E){const G=$.get(E);return(G.__readFormat!==E.format||G.__readType!==E.type)&&(G.__readFormat=E.format,G.__readType=E.type,G.__formatReadable=L.textureFormatReadable(E.format),G.__typeReadable=L.textureTypeReadable(E.type)),G}this.readRenderTargetPixels=function(E,G,Z,q,Y,Te,Pe,we=0){if(!(E&&E.isWebGLRenderTarget)){$e("WebGLRenderer.readRenderTargetPixels: renderTarget is not THREE.WebGLRenderTarget.");return}let Ie=$.get(E).__webglFramebuffer;if(E.isWebGLCubeRenderTarget&&Pe!==void 0&&(Ie=Ie[Pe]),Ie){y.bindFramebuffer(z.FRAMEBUFFER,Ie);try{const Fe=E.textures[we],nt=Fe.format,ct=Fe.type;E.textures.length>1&&z.readBuffer(z.COLOR_ATTACHMENT0+we);const Le=Hh(Fe);if(Le.__formatReadable===!1){$e("WebGLRenderer.readRenderTargetPixels: renderTarget is not in RGBA or implementation defined format.");return}if(Le.__typeReadable===!1){$e("WebGLRenderer.readRenderTargetPixels: renderTarget is not in UnsignedByteType or implementation defined type.");return}G>=0&&G<=E.width-q&&Z>=0&&Z<=E.height-Y&&z.readPixels(G,Z,q,Y,xe.convert(nt),xe.convert(ct),Te)}finally{const Fe=N!==null?$.get(N).__webglFramebuffer:null;y.bindFramebuffer(z.FRAMEBUFFER,Fe)}}},this.readRenderTargetPixelsAsync=async function(E,G,Z,q,Y,Te,Pe,we=0){if(!(E&&E.isWebGLRenderTarget))throw new Error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not THREE.WebGLRenderTarget.");let Ie=$.get(E).__webglFramebuffer;if(E.isWebGLCubeRenderTarget&&Pe!==void 0&&(Ie=Ie[Pe]),Ie)if(G>=0&&G<=E.width-q&&Z>=0&&Z<=E.height-Y){y.bindFramebuffer(z.FRAMEBUFFER,Ie);const Fe=E.textures[we],nt=Fe.format,ct=Fe.type;E.textures.length>1&&z.readBuffer(z.COLOR_ATTACHMENT0+we);const Le=Hh(Fe);if(Le.__formatReadable===!1)throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: renderTarget is not in RGBA or implementation defined format.");if(Le.__typeReadable===!1)throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: renderTarget is not in UnsignedByteType or implementation defined type.");const gt=z.createBuffer();z.bindBuffer(z.PIXEL_PACK_BUFFER,gt),z.bufferData(z.PIXEL_PACK_BUFFER,Te.byteLength,z.STREAM_READ),z.readPixels(G,Z,q,Y,xe.convert(nt),xe.convert(ct),0),z.bindBuffer(z.PIXEL_PACK_BUFFER,null);const Dt=N!==null?$.get(N).__webglFramebuffer:null;y.bindFramebuffer(z.FRAMEBUFFER,Dt);const Ct=z.fenceSync(z.SYNC_GPU_COMMANDS_COMPLETE,0);return z.flush(),await Sm(z,Ct,4),z.bindBuffer(z.PIXEL_PACK_BUFFER,gt),z.getBufferSubData(z.PIXEL_PACK_BUFFER,0,Te),z.bindBuffer(z.PIXEL_PACK_BUFFER,null),z.deleteBuffer(gt),z.deleteSync(Ct),Te}else throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: requested read bounds are out of range.")},this.copyFramebufferToTexture=function(E,G=null,Z=0){const q=Math.pow(2,-Z),Y=Math.floor(E.image.width*q),Te=Math.floor(E.image.height*q),Pe=G!==null?G.x:0,we=G!==null?G.y:0;Q.setTexture2D(E,0),z.copyTexSubImage2D(z.TEXTURE_2D,Z,0,0,Pe,we,Y,Te),y.unbindTexture()},this.copyTextureToTexture=function(E,G,Z=null,q=null,Y=0,Te=0){let Pe,we,Ie,Fe,nt,ct,Le,gt,Dt;const Ct=E.isCompressedTexture?E.mipmaps[Te]:E.image;if(Z!==null)Pe=Z.max.x-Z.min.x,we=Z.max.y-Z.min.y,Ie=Z.isBox3?Z.max.z-Z.min.z:1,Fe=Z.min.x,nt=Z.min.y,ct=Z.isBox3?Z.min.z:0;else{const Lt=Math.pow(2,-Y);Pe=Math.floor(Ct.width*Lt),we=Math.floor(Ct.height*Lt),E.isDataArrayTexture?Ie=Ct.depth:E.isData3DTexture?Ie=Math.floor(Ct.depth*Lt):Ie=1,Fe=0,nt=0,ct=0}q!==null?(Le=q.x,gt=q.y,Dt=q.z):(Le=0,gt=0,Dt=0);const wt=xe.convert(G.format),$t=xe.convert(G.type);let Ce;G.isData3DTexture?(Q.setTexture3D(G,0),Ce=z.TEXTURE_3D):G.isDataArrayTexture||G.isCompressedArrayTexture?(Q.setTexture2DArray(G,0),Ce=z.TEXTURE_2D_ARRAY):(Q.setTexture2D(G,0),Ce=z.TEXTURE_2D),y.activeTexture(z.TEXTURE0),y.pixelStorei(z.UNPACK_FLIP_Y_WEBGL,G.flipY),y.pixelStorei(z.UNPACK_PREMULTIPLY_ALPHA_WEBGL,G.premultiplyAlpha),y.pixelStorei(z.UNPACK_ALIGNMENT,G.unpackAlignment);const tn=y.getParameter(z.UNPACK_ROW_LENGTH),dt=y.getParameter(z.UNPACK_IMAGE_HEIGHT),bn=y.getParameter(z.UNPACK_SKIP_PIXELS),Yn=y.getParameter(z.UNPACK_SKIP_ROWS),Ci=y.getParameter(z.UNPACK_SKIP_IMAGES);y.pixelStorei(z.UNPACK_ROW_LENGTH,Ct.width),y.pixelStorei(z.UNPACK_IMAGE_HEIGHT,Ct.height),y.pixelStorei(z.UNPACK_SKIP_PIXELS,Fe),y.pixelStorei(z.UNPACK_SKIP_ROWS,nt),y.pixelStorei(z.UNPACK_SKIP_IMAGES,ct);const ps=E.isDataArrayTexture||E.isData3DTexture,yt=G.isDataArrayTexture||G.isData3DTexture;if(E.isDepthTexture){const Lt=$.get(E),Pi=$.get(G),Tt=$.get(Lt.__renderTarget),Ii=$.get(Pi.__renderTarget);y.bindFramebuffer(z.READ_FRAMEBUFFER,Tt.__webglFramebuffer),y.bindFramebuffer(z.DRAW_FRAMEBUFFER,Ii.__webglFramebuffer);for(let ms=0;ms<Ie;ms++)ps&&(z.framebufferTextureLayer(z.READ_FRAMEBUFFER,z.COLOR_ATTACHMENT0,$.get(E).__webglTexture,Y,ct+ms),z.framebufferTextureLayer(z.DRAW_FRAMEBUFFER,z.COLOR_ATTACHMENT0,$.get(G).__webglTexture,Te,Dt+ms)),z.blitFramebuffer(Fe,nt,Pe,we,Le,gt,Pe,we,z.DEPTH_BUFFER_BIT,z.NEAREST);y.bindFramebuffer(z.READ_FRAMEBUFFER,null),y.bindFramebuffer(z.DRAW_FRAMEBUFFER,null)}else if(Y!==0||E.isRenderTargetTexture||$.has(E)){const Lt=$.get(E),Pi=$.get(G);y.bindFramebuffer(z.READ_FRAMEBUFFER,I),y.bindFramebuffer(z.DRAW_FRAMEBUFFER,O);for(let Tt=0;Tt<Ie;Tt++)ps?z.framebufferTextureLayer(z.READ_FRAMEBUFFER,z.COLOR_ATTACHMENT0,Lt.__webglTexture,Y,ct+Tt):z.framebufferTexture2D(z.READ_FRAMEBUFFER,z.COLOR_ATTACHMENT0,z.TEXTURE_2D,Lt.__webglTexture,Y),yt?z.framebufferTextureLayer(z.DRAW_FRAMEBUFFER,z.COLOR_ATTACHMENT0,Pi.__webglTexture,Te,Dt+Tt):z.framebufferTexture2D(z.DRAW_FRAMEBUFFER,z.COLOR_ATTACHMENT0,z.TEXTURE_2D,Pi.__webglTexture,Te),Y!==0?z.blitFramebuffer(Fe,nt,Pe,we,Le,gt,Pe,we,z.COLOR_BUFFER_BIT,z.NEAREST):yt?z.copyTexSubImage3D(Ce,Te,Le,gt,Dt+Tt,Fe,nt,Pe,we):z.copyTexSubImage2D(Ce,Te,Le,gt,Fe,nt,Pe,we);y.bindFramebuffer(z.READ_FRAMEBUFFER,null),y.bindFramebuffer(z.DRAW_FRAMEBUFFER,null)}else yt?E.isDataTexture||E.isData3DTexture?z.texSubImage3D(Ce,Te,Le,gt,Dt,Pe,we,Ie,wt,$t,Ct.data):G.isCompressedArrayTexture?z.compressedTexSubImage3D(Ce,Te,Le,gt,Dt,Pe,we,Ie,wt,Ct.data):z.texSubImage3D(Ce,Te,Le,gt,Dt,Pe,we,Ie,wt,$t,Ct):E.isDataTexture?z.texSubImage2D(z.TEXTURE_2D,Te,Le,gt,Pe,we,wt,$t,Ct.data):E.isCompressedTexture?z.compressedTexSubImage2D(z.TEXTURE_2D,Te,Le,gt,Ct.width,Ct.height,wt,Ct.data):z.texSubImage2D(z.TEXTURE_2D,Te,Le,gt,Pe,we,wt,$t,Ct);y.pixelStorei(z.UNPACK_ROW_LENGTH,tn),y.pixelStorei(z.UNPACK_IMAGE_HEIGHT,dt),y.pixelStorei(z.UNPACK_SKIP_PIXELS,bn),y.pixelStorei(z.UNPACK_SKIP_ROWS,Yn),y.pixelStorei(z.UNPACK_SKIP_IMAGES,Ci),Te===0&&G.generateMipmaps&&z.generateMipmap(Ce),y.unbindTexture()},this.initRenderTarget=function(E){$.get(E).__webglFramebuffer===void 0&&Q.setupRenderTarget(E)},this.initTexture=function(E){E.isCubeTexture?Q.setTextureCube(E,0):E.isData3DTexture?Q.setTexture3D(E,0):E.isDataArrayTexture||E.isCompressedArrayTexture?Q.setTexture2DArray(E,0):Q.setTexture2D(E,0),y.unbindTexture()},this.resetState=function(){H=0,C=0,N=null,y.reset(),Ee.reset()},typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("observe",{detail:this}))}get coordinateSystem(){return si}get outputColorSpace(){return this._outputColorSpace}set outputColorSpace(e){this._outputColorSpace=e;const t=this.getContext();t.drawingBufferColorSpace=at._getDrawingBufferColorSpace(e),t.unpackColorSpace=at._getUnpackColorSpace()}}const ta={name:"CopyShader",uniforms:{tDiffuse:{value:null},opacity:{value:1}},vertexShader:`

		varying vec2 vUv;

		void main() {

			vUv = uv;
			gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );

		}`,fragmentShader:`

		uniform float opacity;

		uniform sampler2D tDiffuse;

		varying vec2 vUv;

		void main() {

			vec4 texel = texture2D( tDiffuse, vUv );
			gl_FragColor = opacity * texel;


		}`};class lr{constructor(){this.isPass=!0,this.enabled=!0,this.needsSwap=!0,this.clear=!1,this.renderToScreen=!1}setSize(){}render(){console.error("THREE.Pass: .render() must be implemented in derived pass.")}dispose(){}}const Ly=new so(-1,1,1,-1,0,1);class Ny extends Mt{constructor(){super(),this.setAttribute("position",new Je([-1,3,0,-1,-1,0,3,-1,0],3)),this.setAttribute("uv",new Je([0,2,0,0,2,0],2))}}const Dy=new Ny;class _h{constructor(e){this._mesh=new K(Dy,e)}dispose(){this._mesh.geometry.dispose()}render(e){e.render(this._mesh,Ly)}get material(){return this._mesh.material}set material(e){this._mesh.material=e}}class Uy extends lr{constructor(e,t="tDiffuse"){super(),this.textureID=t,this.uniforms=null,this.material=null,e instanceof en?(this.uniforms=e.uniforms,this.material=e):e&&(this.uniforms=Qr.clone(e.uniforms),this.material=new en({name:e.name!==void 0?e.name:"unspecified",defines:Object.assign({},e.defines),uniforms:this.uniforms,vertexShader:e.vertexShader,fragmentShader:e.fragmentShader})),this._fsQuad=new _h(this.material)}render(e,t,n){this.uniforms[this.textureID]&&(this.uniforms[this.textureID].value=n.texture),this._fsQuad.material=this.material,this.renderToScreen?(e.setRenderTarget(null),this._fsQuad.render(e)):(e.setRenderTarget(t),this.clear&&e.clear(e.autoClearColor,e.autoClearDepth,e.autoClearStencil),this._fsQuad.render(e))}dispose(){this.material.dispose(),this._fsQuad.dispose()}}class xf extends lr{constructor(e,t){super(),this.scene=e,this.camera=t,this.clear=!0,this.needsSwap=!1,this.inverse=!1}render(e,t,n){const s=e.getContext(),r=e.state;r.buffers.color.setMask(!1),r.buffers.depth.setMask(!1),r.buffers.color.setLocked(!0),r.buffers.depth.setLocked(!0);let o,a;this.inverse?(o=0,a=1):(o=1,a=0),r.buffers.stencil.setTest(!0),r.buffers.stencil.setOp(s.REPLACE,s.REPLACE,s.REPLACE),r.buffers.stencil.setFunc(s.ALWAYS,o,4294967295),r.buffers.stencil.setClear(a),r.buffers.stencil.setLocked(!0),e.setRenderTarget(n),this.clear&&e.clear(),e.render(this.scene,this.camera),e.setRenderTarget(t),this.clear&&e.clear(),e.render(this.scene,this.camera),r.buffers.color.setLocked(!1),r.buffers.depth.setLocked(!1),r.buffers.color.setMask(!0),r.buffers.depth.setMask(!0),r.buffers.stencil.setLocked(!1),r.buffers.stencil.setFunc(s.EQUAL,1,4294967295),r.buffers.stencil.setOp(s.KEEP,s.KEEP,s.KEEP),r.buffers.stencil.setLocked(!0)}}class Fy extends lr{constructor(){super(),this.needsSwap=!1}render(e){e.state.buffers.stencil.setLocked(!1),e.state.buffers.stencil.setTest(!1)}}class Oy{constructor(e,t){if(this.renderer=e,this._pixelRatio=e.getPixelRatio(),t===void 0){const n=e.getSize(new oe);this._width=n.width,this._height=n.height,t=new cn(this._width*this._pixelRatio,this._height*this._pixelRatio,{type:fn}),t.texture.name="EffectComposer.rt1"}else this._width=t.width,this._height=t.height;this.renderTarget1=t,this.renderTarget2=t.clone(),this.renderTarget2.texture.name="EffectComposer.rt2",this.writeBuffer=this.renderTarget1,this.readBuffer=this.renderTarget2,this.renderToScreen=!0,this.passes=[],this.copyPass=new Uy(ta),this.copyPass.material.blending=oi,this.timer=new bg}swapBuffers(){const e=this.readBuffer;this.readBuffer=this.writeBuffer,this.writeBuffer=e}addPass(e){this.passes.push(e),e.setSize(this._width*this._pixelRatio,this._height*this._pixelRatio)}insertPass(e,t){this.passes.splice(t,0,e),e.setSize(this._width*this._pixelRatio,this._height*this._pixelRatio)}removePass(e){const t=this.passes.indexOf(e);t!==-1&&this.passes.splice(t,1)}isLastEnabledPass(e){for(let t=e+1;t<this.passes.length;t++)if(this.passes[t].enabled)return!1;return!0}render(e){this.timer.update(),e===void 0&&(e=this.timer.getDelta());const t=this.renderer.getRenderTarget();let n=!1;for(let s=0,r=this.passes.length;s<r;s++){const o=this.passes[s];if(o.enabled!==!1){if(o.renderToScreen=this.renderToScreen&&this.isLastEnabledPass(s),o.render(this.renderer,this.writeBuffer,this.readBuffer,e,n),o.needsSwap){if(n){const a=this.renderer.getContext(),c=this.renderer.state.buffers.stencil;c.setFunc(a.NOTEQUAL,1,4294967295),this.copyPass.render(this.renderer,this.writeBuffer,this.readBuffer,e),c.setFunc(a.EQUAL,1,4294967295)}this.swapBuffers()}xf!==void 0&&(o instanceof xf?n=!0:o instanceof Fy&&(n=!1))}}this.renderer.setRenderTarget(t)}reset(e){if(e===void 0){const t=this.renderer.getSize(new oe);this._pixelRatio=this.renderer.getPixelRatio(),this._width=t.width,this._height=t.height,e=this.renderTarget1.clone(),e.setSize(this._width*this._pixelRatio,this._height*this._pixelRatio)}this.renderTarget1.dispose(),this.renderTarget2.dispose(),this.renderTarget1=e,this.renderTarget2=e.clone(),this.writeBuffer=this.renderTarget1,this.readBuffer=this.renderTarget2}setSize(e,t){this._width=e,this._height=t;const n=this._width*this._pixelRatio,s=this._height*this._pixelRatio;this.renderTarget1.setSize(n,s),this.renderTarget2.setSize(n,s);for(let r=0;r<this.passes.length;r++)this.passes[r].setSize(n,s)}setPixelRatio(e){this._pixelRatio=e,this.setSize(this._width,this._height)}dispose(){this.renderTarget1.dispose(),this.renderTarget2.dispose(),this.copyPass.dispose()}}class By extends lr{constructor(e,t,n=null,s=null,r=null){super(),this.scene=e,this.camera=t,this.overrideMaterial=n,this.clearColor=s,this.clearAlpha=r,this.clear=!0,this.clearDepth=!1,this.needsSwap=!1,this.isRenderPass=!0,this._oldClearColor=new Ne}render(e,t,n){const s=e.autoClear;e.autoClear=!1;let r,o;this.overrideMaterial!==null&&(o=this.scene.overrideMaterial,this.scene.overrideMaterial=this.overrideMaterial),this.clearColor!==null&&(e.getClearColor(this._oldClearColor),e.setClearColor(this.clearColor,e.getClearAlpha())),this.clearAlpha!==null&&(r=e.getClearAlpha(),e.setClearAlpha(this.clearAlpha)),this.clearDepth==!0&&e.clearDepth(),e.setRenderTarget(this.renderToScreen?null:n),this.clear===!0&&e.clear(e.autoClearColor,e.autoClearDepth,e.autoClearStencil),e.render(this.scene,this.camera),this.clearColor!==null&&e.setClearColor(this._oldClearColor),this.clearAlpha!==null&&e.setClearAlpha(r),this.overrideMaterial!==null&&(this.scene.overrideMaterial=o),e.autoClear=s}}const ky={uniforms:{tDiffuse:{value:null},luminosityThreshold:{value:1},smoothWidth:{value:1},defaultColor:{value:new Ne(0)},defaultOpacity:{value:0}},vertexShader:`

		varying vec2 vUv;

		void main() {

			vUv = uv;

			gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );

		}`,fragmentShader:`

		uniform sampler2D tDiffuse;
		uniform vec3 defaultColor;
		uniform float defaultOpacity;
		uniform float luminosityThreshold;
		uniform float smoothWidth;

		varying vec2 vUv;

		void main() {

			vec4 texel = texture2D( tDiffuse, vUv );

			float v = luminance( texel.xyz );

			vec4 outputColor = vec4( defaultColor.rgb, defaultOpacity );

			float alpha = smoothstep( luminosityThreshold, luminosityThreshold + smoothWidth, v );

			gl_FragColor = mix( outputColor, texel, alpha );

		}`};class ir extends lr{constructor(e,t=1,n,s){super(),this.strength=t,this.radius=n,this.threshold=s,this.resolution=e!==void 0?new oe(e.x,e.y):new oe(256,256),this.clearColor=new Ne(0,0,0),this.needsSwap=!1,this.renderTargetsHorizontal=[],this.renderTargetsVertical=[],this.nMips=5;let r=Math.round(this.resolution.x/2),o=Math.round(this.resolution.y/2);this.renderTargetBright=new cn(r,o,{type:fn,depthBuffer:!1}),this.renderTargetBright.texture.name="UnrealBloomPass.bright",this.renderTargetBright.texture.generateMipmaps=!1;for(let h=0;h<this.nMips;h++){const u=new cn(r,o,{type:fn,depthBuffer:!1});u.texture.name="UnrealBloomPass.h"+h,u.texture.generateMipmaps=!1,this.renderTargetsHorizontal.push(u);const f=new cn(r,o,{type:fn,depthBuffer:!1});f.texture.name="UnrealBloomPass.v"+h,f.texture.generateMipmaps=!1,this.renderTargetsVertical.push(f),r=Math.round(r/2),o=Math.round(o/2)}const a=ky;this.highPassUniforms=Qr.clone(a.uniforms),this.highPassUniforms.luminosityThreshold.value=s,this.highPassUniforms.smoothWidth.value=.01,this.materialHighPassFilter=new en({uniforms:this.highPassUniforms,vertexShader:a.vertexShader,fragmentShader:a.fragmentShader}),this.separableBlurMaterials=[];const c=[6,10,14,18,22];r=Math.round(this.resolution.x/2),o=Math.round(this.resolution.y/2);for(let h=0;h<this.nMips;h++)this.separableBlurMaterials.push(this._getSeparableBlurMaterial(c[h])),this.separableBlurMaterials[h].uniforms.invSize.value=new oe(1/r,1/o),r=Math.round(r/2),o=Math.round(o/2);this.compositeMaterial=this._getCompositeMaterial(this.nMips),this.compositeMaterial.uniforms.blurTexture1.value=this.renderTargetsVertical[0].texture,this.compositeMaterial.uniforms.blurTexture2.value=this.renderTargetsVertical[1].texture,this.compositeMaterial.uniforms.blurTexture3.value=this.renderTargetsVertical[2].texture,this.compositeMaterial.uniforms.blurTexture4.value=this.renderTargetsVertical[3].texture,this.compositeMaterial.uniforms.blurTexture5.value=this.renderTargetsVertical[4].texture,this.compositeMaterial.uniforms.bloomStrength.value=t,this.compositeMaterial.uniforms.bloomRadius.value=.1;const l=[1,.8,.6,.4,.2];this.compositeMaterial.uniforms.bloomFactors.value=l,this.bloomTintColors=[new B(1,1,1),new B(1,1,1),new B(1,1,1),new B(1,1,1),new B(1,1,1)],this.compositeMaterial.uniforms.bloomTintColors.value=this.bloomTintColors,this.copyUniforms=Qr.clone(ta.uniforms),this.blendMaterial=new en({uniforms:this.copyUniforms,vertexShader:ta.vertexShader,fragmentShader:ta.fragmentShader,premultipliedAlpha:!0,blending:as,depthTest:!1,depthWrite:!1,transparent:!0}),this._oldClearColor=new Ne,this._oldClearAlpha=1,this._basic=new vn,this._fsQuad=new _h(null)}dispose(){for(let e=0;e<this.renderTargetsHorizontal.length;e++)this.renderTargetsHorizontal[e].dispose();for(let e=0;e<this.renderTargetsVertical.length;e++)this.renderTargetsVertical[e].dispose();this.renderTargetBright.dispose();for(let e=0;e<this.separableBlurMaterials.length;e++)this.separableBlurMaterials[e].dispose();this.compositeMaterial.dispose(),this.blendMaterial.dispose(),this._basic.dispose(),this._fsQuad.dispose()}setSize(e,t){let n=Math.round(e/2),s=Math.round(t/2);this.renderTargetBright.setSize(n,s);for(let r=0;r<this.nMips;r++)this.renderTargetsHorizontal[r].setSize(n,s),this.renderTargetsVertical[r].setSize(n,s),this.separableBlurMaterials[r].uniforms.invSize.value=new oe(1/n,1/s),n=Math.round(n/2),s=Math.round(s/2)}render(e,t,n,s,r){e.getClearColor(this._oldClearColor),this._oldClearAlpha=e.getClearAlpha();const o=e.autoClear;e.autoClear=!1,e.setClearColor(this.clearColor,0),r&&e.state.buffers.stencil.setTest(!1),this.renderToScreen&&(this._fsQuad.material=this._basic,this._basic.map=n.texture,e.setRenderTarget(null),e.clear(),this._fsQuad.render(e)),this.highPassUniforms.tDiffuse.value=n.texture,this.highPassUniforms.luminosityThreshold.value=this.threshold,this._fsQuad.material=this.materialHighPassFilter,e.setRenderTarget(this.renderTargetBright),e.clear(),this._fsQuad.render(e);let a=this.renderTargetBright;for(let c=0;c<this.nMips;c++)this._fsQuad.material=this.separableBlurMaterials[c],this.separableBlurMaterials[c].uniforms.colorTexture.value=a.texture,this.separableBlurMaterials[c].uniforms.direction.value=ir.BlurDirectionX,e.setRenderTarget(this.renderTargetsHorizontal[c]),e.clear(),this._fsQuad.render(e),this.separableBlurMaterials[c].uniforms.colorTexture.value=this.renderTargetsHorizontal[c].texture,this.separableBlurMaterials[c].uniforms.direction.value=ir.BlurDirectionY,e.setRenderTarget(this.renderTargetsVertical[c]),e.clear(),this._fsQuad.render(e),a=this.renderTargetsVertical[c];this._fsQuad.material=this.compositeMaterial,this.compositeMaterial.uniforms.bloomStrength.value=this.strength,this.compositeMaterial.uniforms.bloomRadius.value=this.radius,this.compositeMaterial.uniforms.bloomTintColors.value=this.bloomTintColors,e.setRenderTarget(this.renderTargetsHorizontal[0]),e.clear(),this._fsQuad.render(e),this._fsQuad.material=this.blendMaterial,this.copyUniforms.tDiffuse.value=this.renderTargetsHorizontal[0].texture,r&&e.state.buffers.stencil.setTest(!0),this.renderToScreen?(e.setRenderTarget(null),this._fsQuad.render(e)):(e.setRenderTarget(n),this._fsQuad.render(e)),e.setClearColor(this._oldClearColor,this._oldClearAlpha),e.autoClear=o}_getSeparableBlurMaterial(e){const t=[],n=e/3;for(let o=0;o<e;o++)t.push(.39894*Math.exp(-.5*o*o/(n*n))/n);const s=[],r=[];for(let o=1;o<e;o+=2){const a=t[o],c=o+1<e?t[o+1]:0,l=a+c;s.push((o*a+(o+1)*c)/l),r.push(l)}return new en({defines:{KERNEL_PAIRS:s.length},uniforms:{colorTexture:{value:null},invSize:{value:new oe(.5,.5)},direction:{value:new oe(.5,.5)},centerWeight:{value:t[0]},gaussianOffsets:{value:s},gaussianWeights:{value:r}},vertexShader:`

				varying vec2 vUv;

				void main() {

					vUv = uv;
					gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );

				}`,fragmentShader:`

				#include <common>

				varying vec2 vUv;

				uniform sampler2D colorTexture;
				uniform vec2 invSize;
				uniform vec2 direction;
				uniform float centerWeight;
				uniform float gaussianOffsets[KERNEL_PAIRS];
				uniform float gaussianWeights[KERNEL_PAIRS];

				void main() {

					vec3 diffuseSum = texture2D( colorTexture, vUv ).rgb * centerWeight;

					for ( int i = 0; i < KERNEL_PAIRS; i ++ ) {

						vec2 uvOffset = direction * invSize * gaussianOffsets[ i ];
						vec3 sample1 = texture2D( colorTexture, vUv + uvOffset ).rgb;
						vec3 sample2 = texture2D( colorTexture, vUv - uvOffset ).rgb;
						diffuseSum += ( sample1 + sample2 ) * gaussianWeights[ i ];

					}

					gl_FragColor = vec4( diffuseSum, 1.0 );

				}`})}_getCompositeMaterial(e){return new en({defines:{NUM_MIPS:e},uniforms:{blurTexture1:{value:null},blurTexture2:{value:null},blurTexture3:{value:null},blurTexture4:{value:null},blurTexture5:{value:null},bloomStrength:{value:1},bloomFactors:{value:null},bloomTintColors:{value:null},bloomRadius:{value:0}},vertexShader:`

				varying vec2 vUv;

				void main() {

					vUv = uv;
					gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );

				}`,fragmentShader:`

				varying vec2 vUv;

				uniform sampler2D blurTexture1;
				uniform sampler2D blurTexture2;
				uniform sampler2D blurTexture3;
				uniform sampler2D blurTexture4;
				uniform sampler2D blurTexture5;
				uniform float bloomStrength;
				uniform float bloomRadius;
				uniform float bloomFactors[NUM_MIPS];
				uniform vec3 bloomTintColors[NUM_MIPS];

				float lerpBloomFactor( const in float factor ) {

					float mirrorFactor = 1.2 - factor;
					return mix( factor, mirrorFactor, bloomRadius );

				}

				void main() {

					// 3.0 for backwards compatibility with previous alpha-based intensity
					vec3 bloom = 3.0 * bloomStrength * (
						lerpBloomFactor( bloomFactors[ 0 ] ) * bloomTintColors[ 0 ] * texture2D( blurTexture1, vUv ).rgb +
						lerpBloomFactor( bloomFactors[ 1 ] ) * bloomTintColors[ 1 ] * texture2D( blurTexture2, vUv ).rgb +
						lerpBloomFactor( bloomFactors[ 2 ] ) * bloomTintColors[ 2 ] * texture2D( blurTexture3, vUv ).rgb +
						lerpBloomFactor( bloomFactors[ 3 ] ) * bloomTintColors[ 3 ] * texture2D( blurTexture4, vUv ).rgb +
						lerpBloomFactor( bloomFactors[ 4 ] ) * bloomTintColors[ 4 ] * texture2D( blurTexture5, vUv ).rgb
					);

					float bloomAlpha = max( bloom.r, max( bloom.g, bloom.b ) );
					gl_FragColor = vec4( bloom, bloomAlpha );

				}`})}}ir.BlurDirectionX=new oe(1,0);ir.BlurDirectionY=new oe(0,1);const Ho={name:"OutputShader",uniforms:{tDiffuse:{value:null},toneMappingExposure:{value:1}},vertexShader:`
		precision highp float;

		uniform mat4 modelViewMatrix;
		uniform mat4 projectionMatrix;

		attribute vec3 position;
		attribute vec2 uv;

		varying vec2 vUv;

		void main() {

			vUv = uv;
			gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );

		}`,fragmentShader:`

		precision highp float;

		uniform sampler2D tDiffuse;

		#include <tonemapping_pars_fragment>
		#include <colorspace_pars_fragment>

		varying vec2 vUv;

		void main() {

			gl_FragColor = texture2D( tDiffuse, vUv );

			// tone mapping

			#ifdef LINEAR_TONE_MAPPING

				gl_FragColor.rgb = LinearToneMapping( gl_FragColor.rgb );

			#elif defined( REINHARD_TONE_MAPPING )

				gl_FragColor.rgb = ReinhardToneMapping( gl_FragColor.rgb );

			#elif defined( CINEON_TONE_MAPPING )

				gl_FragColor.rgb = CineonToneMapping( gl_FragColor.rgb );

			#elif defined( ACES_FILMIC_TONE_MAPPING )

				gl_FragColor.rgb = ACESFilmicToneMapping( gl_FragColor.rgb );

			#elif defined( AGX_TONE_MAPPING )

				gl_FragColor.rgb = AgXToneMapping( gl_FragColor.rgb );

			#elif defined( NEUTRAL_TONE_MAPPING )

				gl_FragColor.rgb = NeutralToneMapping( gl_FragColor.rgb );

			#elif defined( CUSTOM_TONE_MAPPING )

				gl_FragColor.rgb = CustomToneMapping( gl_FragColor.rgb );

			#endif

			// color space

			#ifdef SRGB_TRANSFER

				gl_FragColor = sRGBTransferOETF( gl_FragColor );

			#endif

		}`};class zy extends lr{constructor(){super(),this.isOutputPass=!0,this.uniforms=Qr.clone(Ho.uniforms),this.material=new Vd({name:Ho.name,uniforms:this.uniforms,vertexShader:Ho.vertexShader,fragmentShader:Ho.fragmentShader}),this._fsQuad=new _h(this.material),this._outputColorSpace=null,this._toneMapping=null}render(e,t,n){this.uniforms.tDiffuse.value=n.texture,this.uniforms.toneMappingExposure.value=e.toneMappingExposure,(this._outputColorSpace!==e.outputColorSpace||this._toneMapping!==e.toneMapping)&&(this._outputColorSpace=e.outputColorSpace,this._toneMapping=e.toneMapping,this.material.defines={},at.getTransfer(this._outputColorSpace)===_t&&(this.material.defines.SRGB_TRANSFER=""),this._toneMapping===Oc?this.material.defines.LINEAR_TONE_MAPPING="":this._toneMapping===Bc?this.material.defines.REINHARD_TONE_MAPPING="":this._toneMapping===kc?this.material.defines.CINEON_TONE_MAPPING="":this._toneMapping===ba?this.material.defines.ACES_FILMIC_TONE_MAPPING="":this._toneMapping===Hc?this.material.defines.AGX_TONE_MAPPING="":this._toneMapping===Vc?this.material.defines.NEUTRAL_TONE_MAPPING="":this._toneMapping===zc&&(this.material.defines.CUSTOM_TONE_MAPPING=""),this.material.needsUpdate=!0),this.renderToScreen===!0?(e.setRenderTarget(null),this._fsQuad.render(e)):(e.setRenderTarget(t),this.clear&&e.clear(e.autoClearColor,e.autoClearDepth,e.autoClearStencil),this._fsQuad.render(e))}dispose(){this.material.dispose(),this._fsQuad.dispose()}}function Hy(i,e=!1){const t=i[0].index!==null,n=new Set(Object.keys(i[0].attributes)),s=new Set(Object.keys(i[0].morphAttributes)),r={},o={},a=i[0].morphTargetsRelative,c=new Mt;let l=0;for(let h=0;h<i.length;++h){const u=i[h];let f=0;if(t!==(u.index!==null))return console.error("THREE.BufferGeometryUtils: .mergeGeometries() failed with geometry at index "+h+". All geometries must have compatible attributes; make sure index attribute exists among all geometries, or in none of them."),null;for(const d in u.attributes){if(!n.has(d))return console.error("THREE.BufferGeometryUtils: .mergeGeometries() failed with geometry at index "+h+'. All geometries must have compatible attributes; make sure "'+d+'" attribute exists among all geometries, or in none of them.'),null;r[d]===void 0&&(r[d]=[]),r[d].push(u.attributes[d]),f++}if(f!==n.size)return console.error("THREE.BufferGeometryUtils: .mergeGeometries() failed with geometry at index "+h+". Make sure all geometries have the same number of attributes."),null;if(a!==u.morphTargetsRelative)return console.error("THREE.BufferGeometryUtils: .mergeGeometries() failed with geometry at index "+h+". .morphTargetsRelative must be consistent throughout all geometries."),null;for(const d in u.morphAttributes){if(!s.has(d))return console.error("THREE.BufferGeometryUtils: .mergeGeometries() failed with geometry at index "+h+".  .morphAttributes must be consistent throughout all geometries."),null;o[d]===void 0&&(o[d]=[]),o[d].push(u.morphAttributes[d])}if(e){let d;if(t)d=u.index.count;else if(u.attributes.position!==void 0)d=u.attributes.position.count;else return console.error("THREE.BufferGeometryUtils: .mergeGeometries() failed with geometry at index "+h+". The geometry must have either an index or a position attribute"),null;c.addGroup(l,d,h),l+=d}}if(t){let h=0;const u=[];for(let f=0;f<i.length;++f){const d=i[f].index;for(let p=0;p<d.count;++p)u.push(d.getX(p)+h);h+=i[f].attributes.position.count}c.setIndex(u)}for(const h in r){const u=vf(r[h]);if(!u)return console.error("THREE.BufferGeometryUtils: .mergeGeometries() failed while trying to merge the "+h+" attribute."),null;c.setAttribute(h,u)}for(const h in o){const u=o[h][0].length;if(u!==0){c.morphAttributes=c.morphAttributes||{},c.morphAttributes[h]=[];for(let f=0;f<u;++f){const d=[];for(let _=0;_<o[h].length;++_)d.push(o[h][_][f]);const p=vf(d);if(!p)return console.error("THREE.BufferGeometryUtils: .mergeGeometries() failed while trying to merge the "+h+" morphAttribute."),null;c.morphAttributes[h].push(p)}}}return c}function vf(i){let e,t,n,s=-1,r=0;for(let l=0;l<i.length;++l){const h=i[l];if(e===void 0&&(e=h.array.constructor),e!==h.array.constructor)return console.error("THREE.BufferGeometryUtils: .mergeAttributes() failed. BufferAttribute.array must be of consistent array types across matching attributes."),null;if(t===void 0&&(t=h.itemSize),t!==h.itemSize)return console.error("THREE.BufferGeometryUtils: .mergeAttributes() failed. BufferAttribute.itemSize must be consistent across matching attributes."),null;if(n===void 0&&(n=h.normalized),n!==h.normalized)return console.error("THREE.BufferGeometryUtils: .mergeAttributes() failed. BufferAttribute.normalized must be consistent across matching attributes."),null;if(s===-1&&(s=h.gpuType),s!==h.gpuType)return console.error("THREE.BufferGeometryUtils: .mergeAttributes() failed. BufferAttribute.gpuType must be consistent across matching attributes."),null;r+=h.count*t}const o=new e(r),a=new qt(o,t,n);let c=0;for(let l=0;l<i.length;++l){const h=i[l];if(h.isInterleavedBufferAttribute){const u=c/t;for(let f=0,d=h.count;f<d;f++)for(let p=0;p<t;p++){const _=h.getComponent(f,p);a.setComponent(f+u,p,_)}}else o.set(h.array,c);c+=h.count*t}return s!==void 0&&(a.gpuType=s),a}function Mf(i,e){if(e===cm)return console.warn("THREE.BufferGeometryUtils.toTrianglesDrawMode(): Geometry already defined as triangles."),i;if(e===_c||e===_d){let t=i.getIndex();if(t===null){const r=[],o=i.getAttribute("position");if(o!==void 0){for(let a=0;a<o.count;a++)r.push(a);i.setIndex(r),t=i.getIndex()}else return console.error("THREE.BufferGeometryUtils.toTrianglesDrawMode(): Undefined position attribute. Processing not possible."),i}const n=t.count-2,s=[];if(e===_c)for(let r=1;r<=n;r++)s.push(t.getX(0)),s.push(t.getX(r)),s.push(t.getX(r+1));else for(let r=0;r<n;r++)r%2===0?(s.push(t.getX(r)),s.push(t.getX(r+1)),s.push(t.getX(r+2))):(s.push(t.getX(r+2)),s.push(t.getX(r+1)),s.push(t.getX(r)));return s.length/3!==n&&console.error("THREE.BufferGeometryUtils.toTrianglesDrawMode(): Unable to generate correct amount of triangles."),i.setIndex(s),i.clearGroups(),i}else return console.error("THREE.BufferGeometryUtils.toTrianglesDrawMode(): Unknown draw mode:",e),i}function xh(i,e){const t=document.createElement("canvas");t.width=i,t.height=e;const n=t.getContext("2d");if(!n)throw new Error("no 2d ctx");return n.imageSmoothingEnabled=!1,n}function vh(i,e,t){return{w:e,h:t,data:i.getImageData(0,0,e,t).data}}function Mh(i,e){const t=Math.max(0,Math.min(255,i*(.9+e*.02))),n=Math.max(0,Math.min(255,i*.98)),s=Math.max(0,Math.min(255,i*(1.14-e*.02)));return`rgb(${t|0},${n|0},${s|0})`}function yh(i,e,t,n,s){const r=e*t*s|0;for(let o=0;o<r;o++){const a=n()*e|0,c=n()*t|0;i.fillStyle=n()<.5?"rgba(255,255,255,0.05)":"rgba(0,0,0,0.07)",i.fillRect(a,c,1,1)}}function Vy(i,e,t,n,s){i.strokeStyle="rgba(3,5,9,0.55)",i.lineWidth=1;for(let r=0;r<s;r++){let o=n()*e,a=n()*t;i.beginPath(),i.moveTo(o,a);const c=3+(n()*5|0);for(let l=0;l<c;l++)o+=(n()-.5)*e*.1,a+=n()*t*.08,i.lineTo(o,a);i.stroke()}}function Gy(i,e,t,n,s,r){const a=e+3,c=t+3,l=n-6,h=s-6;if(l<6||h<6)return;const u=58+r()*44;i.fillStyle=Mh(u,r()),i.fillRect(a,c,l,h);const f=8+(r()*10|0);for(let _=0;_<f;_++){const g=a+r()*l,m=c+r()*h,M=6+r()*Math.min(30,Math.min(l,h)),b=.035+r()*.07;i.fillStyle=r()<.5?`rgba(210,220,235,${b})`:`rgba(0,0,0,${b})`,i.beginPath(),i.ellipse(g,m,M,M*.7,r()*Math.PI,0,Math.PI*2),i.fill()}const d=Math.max(2,l*.02|0);i.fillStyle="rgba(225,235,250,0.16)",i.fillRect(a,c,l,d),i.fillRect(a,c,d,h),i.fillStyle="rgba(0,0,0,0.45)",i.fillRect(a,c+h-d,l,d),i.fillRect(a+l-d,c,d,h);const p=i.createLinearGradient(0,c+h-h*.4,0,c+h);if(p.addColorStop(0,"rgba(0,0,0,0)"),p.addColorStop(1,"rgba(0,0,0,0.22)"),i.fillStyle=p,i.fillRect(a,c+h-h*.4,l,h*.4),r()<.35){i.fillStyle="rgba(0,0,0,0.22)";const _=r()<.5?a:a+l-8;i.fillRect(_,c,8,3)}}function Wy(i,e,t){const n=document.createElement("canvas");n.width=Math.max(4,Math.ceil(i)),n.height=Math.max(4,Math.ceil(e));const s=n.getContext("2d");if(!s)throw new Error("no ctx");return Gy(s,0,0,n.width,n.height,wn(t)),n}function Xy(i,e,t,n){const s=e*.6*n|0;for(let o=0;o<s;o++){const a=t()*e,c=e*(.3+.7*t()),l=5+t()*26;i.fillStyle=`rgba(${36+t()*40|0},${64+t()*66|0},${28+t()*30|0},${(.08+t()*.2).toFixed(3)})`,i.beginPath(),i.ellipse(a,c,l,l*.6,t()*Math.PI,0,Math.PI*2),i.fill()}const r=e*.08*n|0;for(let o=0;o<r;o++){const a=t()*e,c=t()*e*.5,l=20+t()*130;i.strokeStyle=`rgba(58,78,44,${(.05+t()*.12).toFixed(3)})`,i.lineWidth=1+t()*3,i.beginPath(),i.moveTo(a,c),i.lineTo(a,c+l),i.stroke()}}function $s(i,e,t=512){const n=xh(t,t),s=wn(i+e*977);n.fillStyle=e===2?"#0a0e10":"#0b0e14",n.fillRect(0,0,t,t);const o=t/6,a=[];let c=-o*.5;for(;c<t;){let h=-Math.floor(s()*150);for(;h<t;){const u=92+s()*84;a.push({x:h,y:c,bw:u,bh:o,seed:s()*1e9|0}),h+=u+6}c+=o+6}for(const h of a){const u=Wy(h.bw,h.bh,h.seed);for(const f of[-t,0,t])for(const d of[-t,0,t])n.drawImage(u,h.x+f,h.y+d)}Xy(n,t,s,e===2?1:.45),yh(n,t,t,s,.07),Vy(n,t,t,s,e===2?5:3);const l=n.createLinearGradient(0,0,0,t);return l.addColorStop(0,"rgba(0,0,0,0.30)"),l.addColorStop(.5,"rgba(0,0,0,0)"),l.addColorStop(1,"rgba(0,0,0,0.30)"),n.fillStyle=l,n.fillRect(0,0,t,t),vh(n,t,t)}function Tc(i,e=512){const t=xh(e,e),n=wn(i+131);t.fillStyle="#0b0e14",t.fillRect(0,0,e,e);const s=e/2;for(let r=0;r<e;r+=s)for(let o=0;o<e;o+=s){const a=40+n()*26;t.fillStyle=Mh(a,n()),t.fillRect(o+3,r+3,s-6,s-6);const c=6+(n()*8|0);for(let l=0;l<c;l++){const h=o+6+n()*(s-12),u=r+6+n()*(s-12),f=8+n()*34,d=.05+n()*.09;t.fillStyle=n()<.5?`rgba(200,215,235,${d})`:`rgba(0,0,0,${d})`,t.beginPath(),t.ellipse(h,u,f,f*.8,n()*Math.PI,0,Math.PI*2),t.fill()}t.fillStyle="rgba(225,235,250,0.07)",t.fillRect(o+3,r+3,s-6,2),t.fillStyle="rgba(0,0,0,0.4)",t.fillRect(o+3,r+s-4,s-6,2)}return yh(t,e,e,n,.05),vh(t,e,e)}function Ec(i,e=512){const t=xh(e,e),n=wn(i+271);t.fillStyle="#0a0c11",t.fillRect(0,0,e,e);const s=e*.4|0;for(let r=0;r<s;r++){const o=n()*e,a=n()*e,c=e*.01+n()*e*.035,l=16+n()*16;t.fillStyle=Mh(l,n()),t.globalAlpha=.25+n()*.25,t.beginPath(),t.ellipse(o,a,c,c*.8,n()*Math.PI,0,Math.PI*2),t.fill()}return t.globalAlpha=1,yh(t,e,e,n,.12),vh(t,e,e)}function es(i,e){const{w:t,h:n,data:s}=i,r=new Uint8ClampedArray(t*n*4),o=(a,c)=>{const l=(a%t+t)%t,u=((c%n+n)%n*t+l)*4;return(s[u]*.299+s[u+1]*.587+s[u+2]*.114)/255};for(let a=0;a<n;a++)for(let c=0;c<t;c++){const l=o(c-1,a-1),h=o(c,a-1),u=o(c+1,a-1),f=o(c-1,a),d=o(c+1,a),p=o(c-1,a+1),_=o(c,a+1),g=o(c+1,a+1),m=l+2*f+p-(u+2*d+g),M=l+2*h+u-(p+2*_+g);let b=m*e,v=M*e;const w=1,S=Math.hypot(b,v,w)||1;b/=S,v/=S;const T=(a*t+c)*4;r[T]=(b*.5+.5)*255,r[T+1]=(v*.5+.5)*255,r[T+2]=(w/S*.5+.5)*255,r[T+3]=255}return r}function qy(i){const e=new Map,t=new Map,n=i.clone();return np(i,n,function(s,r){e.set(r,s),t.set(s,r)}),n.traverse(function(s){if(!s.isSkinnedMesh)return;const r=s,o=e.get(s),a=o.skeleton.bones;r.skeleton=o.skeleton.clone(),r.bindMatrix.copy(o.bindMatrix),r.skeleton.bones=a.map(function(c){return t.get(c)}),r.bind(r.skeleton,r.bindMatrix)}),n}function np(i,e,t){t(i,e);for(let n=0;n<i.children.length;n++)np(i.children[n],e.children[n],t)}class Sh extends ds{constructor(e){super(e),this.dracoLoader=null,this.ktx2Loader=null,this.meshoptDecoder=null,this.pluginCallbacks=[],this.register(function(t){return new Zy(t)}),this.register(function(t){return new jy(t)}),this.register(function(t){return new aS(t)}),this.register(function(t){return new lS(t)}),this.register(function(t){return new cS(t)}),this.register(function(t){return new eS(t)}),this.register(function(t){return new tS(t)}),this.register(function(t){return new nS(t)}),this.register(function(t){return new iS(t)}),this.register(function(t){return new Jy(t)}),this.register(function(t){return new sS(t)}),this.register(function(t){return new Qy(t)}),this.register(function(t){return new oS(t)}),this.register(function(t){return new rS(t)}),this.register(function(t){return new $y(t)}),this.register(function(t){return new yf(t,lt.EXT_MESHOPT_COMPRESSION)}),this.register(function(t){return new yf(t,lt.KHR_MESHOPT_COMPRESSION)}),this.register(function(t){return new hS(t)})}load(e,t,n,s){const r=this;let o;if(this.resourcePath!=="")o=this.resourcePath;else if(this.path!==""){const l=Br.extractUrlBase(e);o=Br.resolveURL(l,this.path)}else o=Br.extractUrlBase(e);this.manager.itemStart(e);const a=function(l){s?s(l):console.error(l),r.manager.itemError(e),r.manager.itemEnd(e)},c=new dh(this.manager);c.setPath(this.path),c.setResponseType("arraybuffer"),c.setRequestHeader(this.requestHeader),c.setWithCredentials(this.withCredentials),c.load(e,function(l){try{r.parse(l,o,function(h){t(h),r.manager.itemEnd(e)},a)}catch(h){a(h)}},n,a)}setDRACOLoader(e){return this.dracoLoader=e,this}setKTX2Loader(e){return this.ktx2Loader=e,this}setMeshoptDecoder(e){return this.meshoptDecoder=e,this}register(e){return this.pluginCallbacks.indexOf(e)===-1&&this.pluginCallbacks.push(e),this}unregister(e){return this.pluginCallbacks.indexOf(e)!==-1&&this.pluginCallbacks.splice(this.pluginCallbacks.indexOf(e),1),this}parse(e,t,n,s){let r;const o={},a={},c=new TextDecoder;if(typeof e=="string")r=JSON.parse(e);else if(e instanceof ArrayBuffer)if(c.decode(new Uint8Array(e,0,4))===ip){try{o[lt.KHR_BINARY_GLTF]=new uS(e)}catch(u){s&&s(u);return}r=JSON.parse(o[lt.KHR_BINARY_GLTF].content)}else r=JSON.parse(c.decode(e));else r=e;if(r.asset===void 0||r.asset.version[0]<2){s&&s(new Error("THREE.GLTFLoader: Unsupported asset. glTF versions >=2.0 are supported."));return}const l=new bS(r,{path:t||this.resourcePath||"",crossOrigin:this.crossOrigin,requestHeader:this.requestHeader,manager:this.manager,ktx2Loader:this.ktx2Loader,meshoptDecoder:this.meshoptDecoder});l.fileLoader.setRequestHeader(this.requestHeader);for(let h=0;h<this.pluginCallbacks.length;h++){const u=this.pluginCallbacks[h](l);u.name||console.error("THREE.GLTFLoader: Invalid plugin found: missing name"),a[u.name]=u,o[u.name]=!0}if(r.extensionsUsed)for(let h=0;h<r.extensionsUsed.length;++h){const u=r.extensionsUsed[h],f=r.extensionsRequired||[];switch(u){case lt.KHR_MATERIALS_UNLIT:o[u]=new Ky;break;case lt.KHR_DRACO_MESH_COMPRESSION:o[u]=new fS(r,this.dracoLoader);break;case lt.KHR_TEXTURE_TRANSFORM:o[u]=new dS;break;case lt.KHR_MESH_QUANTIZATION:o[u]=new pS;break;default:f.indexOf(u)>=0&&a[u]===void 0&&console.warn('THREE.GLTFLoader: Unknown extension "'+u+'".')}}l.setExtensions(o),l.setPlugins(a),l.parse(n,s)}parseAsync(e,t){const n=this;return new Promise(function(s,r){n.parse(e,t,s,r)})}}function Yy(){let i={};return{get:function(e){return i[e]},add:function(e,t){i[e]=t},remove:function(e){delete i[e]},removeAll:function(){i={}}}}function Nt(i,e,t){const n=i.json.materials[e];return n.extensions&&n.extensions[t]?n.extensions[t]:null}const lt={KHR_BINARY_GLTF:"KHR_binary_glTF",KHR_DRACO_MESH_COMPRESSION:"KHR_draco_mesh_compression",KHR_LIGHTS_PUNCTUAL:"KHR_lights_punctual",KHR_MATERIALS_CLEARCOAT:"KHR_materials_clearcoat",KHR_MATERIALS_DISPERSION:"KHR_materials_dispersion",KHR_MATERIALS_IOR:"KHR_materials_ior",KHR_MATERIALS_SHEEN:"KHR_materials_sheen",KHR_MATERIALS_SPECULAR:"KHR_materials_specular",KHR_MATERIALS_TRANSMISSION:"KHR_materials_transmission",KHR_MATERIALS_IRIDESCENCE:"KHR_materials_iridescence",KHR_MATERIALS_ANISOTROPY:"KHR_materials_anisotropy",KHR_MATERIALS_UNLIT:"KHR_materials_unlit",KHR_MATERIALS_VOLUME:"KHR_materials_volume",KHR_TEXTURE_BASISU:"KHR_texture_basisu",KHR_TEXTURE_TRANSFORM:"KHR_texture_transform",KHR_MESH_QUANTIZATION:"KHR_mesh_quantization",KHR_MATERIALS_EMISSIVE_STRENGTH:"KHR_materials_emissive_strength",EXT_MATERIALS_BUMP:"EXT_materials_bump",EXT_TEXTURE_WEBP:"EXT_texture_webp",EXT_TEXTURE_AVIF:"EXT_texture_avif",EXT_MESHOPT_COMPRESSION:"EXT_meshopt_compression",KHR_MESHOPT_COMPRESSION:"KHR_meshopt_compression",EXT_MESH_GPU_INSTANCING:"EXT_mesh_gpu_instancing"};class $y{constructor(e){this.parser=e,this.name=lt.KHR_LIGHTS_PUNCTUAL,this.cache={refs:{},uses:{}}}_markDefs(){const e=this.parser,t=this.parser.json.nodes||[];for(let n=0,s=t.length;n<s;n++){const r=t[n];r.extensions&&r.extensions[this.name]&&r.extensions[this.name].light!==void 0&&e._addNodeRef(this.cache,r.extensions[this.name].light)}}_loadLight(e){const t=this.parser,n="light:"+e;let s=t.cache.get(n);if(s)return s;const r=t.json,c=((r.extensions&&r.extensions[this.name]||{}).lights||[])[e];let l;const h=new Ne(16777215);c.color!==void 0&&h.setRGB(c.color[0],c.color[1],c.color[2],yn);const u=c.range!==void 0?c.range:0;switch(c.type){case"directional":l=new no(h),l.target.position.set(0,0,-1),l.add(l.target);break;case"point":l=new Zt(h),l.distance=u;break;case"spot":l=new xg(h),l.distance=u,c.spot=c.spot||{},c.spot.innerConeAngle=c.spot.innerConeAngle!==void 0?c.spot.innerConeAngle:0,c.spot.outerConeAngle=c.spot.outerConeAngle!==void 0?c.spot.outerConeAngle:Math.PI/4,l.angle=c.spot.outerConeAngle,l.penumbra=1-c.spot.innerConeAngle/c.spot.outerConeAngle,l.target.position.set(0,0,-1),l.add(l.target);break;default:throw new Error("THREE.GLTFLoader: Unexpected light type: "+c.type)}return l.position.set(0,0,0),jn(l,c),c.intensity!==void 0&&(l.intensity=c.intensity),l.name=t.createUniqueName(c.name||"light_"+e),s=Promise.resolve(l),t.cache.add(n,s),s}getDependency(e,t){if(e==="light")return this._loadLight(t)}createNodeAttachment(e){const t=this,n=this.parser,r=n.json.nodes[e],a=(r.extensions&&r.extensions[this.name]||{}).light;return a===void 0?null:this._loadLight(a).then(function(c){return n._getNodeRef(t.cache,a,c)})}}class Ky{constructor(){this.name=lt.KHR_MATERIALS_UNLIT}getMaterialType(){return vn}extendParams(e,t,n){const s=[];e.color=new Ne(1,1,1),e.opacity=1;const r=t.pbrMetallicRoughness;if(r){if(Array.isArray(r.baseColorFactor)){const o=r.baseColorFactor;e.color.setRGB(o[0],o[1],o[2],yn),e.opacity=o[3]}r.baseColorTexture!==void 0&&s.push(n.assignTexture(e,"map",r.baseColorTexture,Pt))}return Promise.all(s)}}class Jy{constructor(e){this.parser=e,this.name=lt.KHR_MATERIALS_EMISSIVE_STRENGTH}extendMaterialParams(e,t){const n=Nt(this.parser,e,this.name);return n===null||n.emissiveStrength!==void 0&&(t.emissiveIntensity=n.emissiveStrength),Promise.resolve()}}class Zy{constructor(e){this.parser=e,this.name=lt.KHR_MATERIALS_CLEARCOAT}getMaterialType(e){return Nt(this.parser,e,this.name)!==null?pi:null}extendMaterialParams(e,t){const n=Nt(this.parser,e,this.name);if(n===null)return Promise.resolve();const s=[];if(n.clearcoatFactor!==void 0&&(t.clearcoat=n.clearcoatFactor),n.clearcoatTexture!==void 0&&s.push(this.parser.assignTexture(t,"clearcoatMap",n.clearcoatTexture)),n.clearcoatRoughnessFactor!==void 0&&(t.clearcoatRoughness=n.clearcoatRoughnessFactor),n.clearcoatRoughnessTexture!==void 0&&s.push(this.parser.assignTexture(t,"clearcoatRoughnessMap",n.clearcoatRoughnessTexture)),n.clearcoatNormalTexture!==void 0&&(s.push(this.parser.assignTexture(t,"clearcoatNormalMap",n.clearcoatNormalTexture)),n.clearcoatNormalTexture.scale!==void 0)){const r=n.clearcoatNormalTexture.scale;t.clearcoatNormalScale=new oe(r,r)}return Promise.all(s)}}class jy{constructor(e){this.parser=e,this.name=lt.KHR_MATERIALS_DISPERSION}getMaterialType(e){return Nt(this.parser,e,this.name)!==null?pi:null}extendMaterialParams(e,t){const n=Nt(this.parser,e,this.name);return n===null||(t.dispersion=n.dispersion!==void 0?n.dispersion:0),Promise.resolve()}}class Qy{constructor(e){this.parser=e,this.name=lt.KHR_MATERIALS_IRIDESCENCE}getMaterialType(e){return Nt(this.parser,e,this.name)!==null?pi:null}extendMaterialParams(e,t){const n=Nt(this.parser,e,this.name);if(n===null)return Promise.resolve();const s=[];return n.iridescenceFactor!==void 0&&(t.iridescence=n.iridescenceFactor),n.iridescenceTexture!==void 0&&s.push(this.parser.assignTexture(t,"iridescenceMap",n.iridescenceTexture)),n.iridescenceIor!==void 0&&(t.iridescenceIOR=n.iridescenceIor),t.iridescenceThicknessRange===void 0&&(t.iridescenceThicknessRange=[100,400]),n.iridescenceThicknessMinimum!==void 0&&(t.iridescenceThicknessRange[0]=n.iridescenceThicknessMinimum),n.iridescenceThicknessMaximum!==void 0&&(t.iridescenceThicknessRange[1]=n.iridescenceThicknessMaximum),n.iridescenceThicknessTexture!==void 0&&s.push(this.parser.assignTexture(t,"iridescenceThicknessMap",n.iridescenceThicknessTexture)),Promise.all(s)}}class eS{constructor(e){this.parser=e,this.name=lt.KHR_MATERIALS_SHEEN}getMaterialType(e){return Nt(this.parser,e,this.name)!==null?pi:null}extendMaterialParams(e,t){const n=Nt(this.parser,e,this.name);if(n===null)return Promise.resolve();const s=[];if(t.sheenColor=new Ne(0,0,0),t.sheenRoughness=0,t.sheen=1,n.sheenColorFactor!==void 0){const r=n.sheenColorFactor;t.sheenColor.setRGB(r[0],r[1],r[2],yn)}return n.sheenRoughnessFactor!==void 0&&(t.sheenRoughness=n.sheenRoughnessFactor),n.sheenColorTexture!==void 0&&s.push(this.parser.assignTexture(t,"sheenColorMap",n.sheenColorTexture,Pt)),n.sheenRoughnessTexture!==void 0&&s.push(this.parser.assignTexture(t,"sheenRoughnessMap",n.sheenRoughnessTexture)),Promise.all(s)}}class tS{constructor(e){this.parser=e,this.name=lt.KHR_MATERIALS_TRANSMISSION}getMaterialType(e){return Nt(this.parser,e,this.name)!==null?pi:null}extendMaterialParams(e,t){const n=Nt(this.parser,e,this.name);if(n===null)return Promise.resolve();const s=[];return n.transmissionFactor!==void 0&&(t.transmission=n.transmissionFactor),n.transmissionTexture!==void 0&&s.push(this.parser.assignTexture(t,"transmissionMap",n.transmissionTexture)),Promise.all(s)}}class nS{constructor(e){this.parser=e,this.name=lt.KHR_MATERIALS_VOLUME}getMaterialType(e){return Nt(this.parser,e,this.name)!==null?pi:null}extendMaterialParams(e,t){const n=Nt(this.parser,e,this.name);if(n===null)return Promise.resolve();const s=[];t.thickness=n.thicknessFactor!==void 0?n.thicknessFactor:0,n.thicknessTexture!==void 0&&s.push(this.parser.assignTexture(t,"thicknessMap",n.thicknessTexture)),t.attenuationDistance=n.attenuationDistance||1/0;const r=n.attenuationColor||[1,1,1];return t.attenuationColor=new Ne().setRGB(r[0],r[1],r[2],yn),Promise.all(s)}}class iS{constructor(e){this.parser=e,this.name=lt.KHR_MATERIALS_IOR}getMaterialType(e){return Nt(this.parser,e,this.name)!==null?pi:null}extendMaterialParams(e,t){const n=Nt(this.parser,e,this.name);return n===null||(t.ior=n.ior!==void 0?n.ior:1.5,t.ior===0&&(t.ior=1e3)),Promise.resolve()}}class sS{constructor(e){this.parser=e,this.name=lt.KHR_MATERIALS_SPECULAR}getMaterialType(e){return Nt(this.parser,e,this.name)!==null?pi:null}extendMaterialParams(e,t){const n=Nt(this.parser,e,this.name);if(n===null)return Promise.resolve();const s=[];t.specularIntensity=n.specularFactor!==void 0?n.specularFactor:1,n.specularTexture!==void 0&&s.push(this.parser.assignTexture(t,"specularIntensityMap",n.specularTexture));const r=n.specularColorFactor||[1,1,1];return t.specularColor=new Ne().setRGB(r[0],r[1],r[2],yn),n.specularColorTexture!==void 0&&s.push(this.parser.assignTexture(t,"specularColorMap",n.specularColorTexture,Pt)),Promise.all(s)}}class rS{constructor(e){this.parser=e,this.name=lt.EXT_MATERIALS_BUMP}getMaterialType(e){return Nt(this.parser,e,this.name)!==null?pi:null}extendMaterialParams(e,t){const n=Nt(this.parser,e,this.name);if(n===null)return Promise.resolve();const s=[];return t.bumpScale=n.bumpFactor!==void 0?n.bumpFactor:1,n.bumpTexture!==void 0&&s.push(this.parser.assignTexture(t,"bumpMap",n.bumpTexture)),Promise.all(s)}}class oS{constructor(e){this.parser=e,this.name=lt.KHR_MATERIALS_ANISOTROPY}getMaterialType(e){return Nt(this.parser,e,this.name)!==null?pi:null}extendMaterialParams(e,t){const n=Nt(this.parser,e,this.name);if(n===null)return Promise.resolve();const s=[];return n.anisotropyStrength!==void 0&&(t.anisotropy=n.anisotropyStrength),n.anisotropyRotation!==void 0&&(t.anisotropyRotation=n.anisotropyRotation),n.anisotropyTexture!==void 0&&s.push(this.parser.assignTexture(t,"anisotropyMap",n.anisotropyTexture)),Promise.all(s)}}class aS{constructor(e){this.parser=e,this.name=lt.KHR_TEXTURE_BASISU}loadTexture(e){const t=this.parser,n=t.json,s=n.textures[e];if(!s.extensions||!s.extensions[this.name])return null;const r=s.extensions[this.name],o=t.options.ktx2Loader;if(!o){if(n.extensionsRequired&&n.extensionsRequired.indexOf(this.name)>=0)throw new Error("THREE.GLTFLoader: setKTX2Loader must be called before loading KTX2 textures");return null}return t.loadTextureImage(e,r.source,o)}}class lS{constructor(e){this.parser=e,this.name=lt.EXT_TEXTURE_WEBP}loadTexture(e){const t=this.name,n=this.parser,s=n.json,r=s.textures[e];if(!r.extensions||!r.extensions[t])return null;const o=r.extensions[t],a=s.images[o.source];let c=n.textureLoader;if(a.uri){const l=n.options.manager.getHandler(a.uri);l!==null&&(c=l)}return n.loadTextureImage(e,o.source,c)}}class cS{constructor(e){this.parser=e,this.name=lt.EXT_TEXTURE_AVIF}loadTexture(e){const t=this.name,n=this.parser,s=n.json,r=s.textures[e];if(!r.extensions||!r.extensions[t])return null;const o=r.extensions[t],a=s.images[o.source];let c=n.textureLoader;if(a.uri){const l=n.options.manager.getHandler(a.uri);l!==null&&(c=l)}return n.loadTextureImage(e,o.source,c)}}class yf{constructor(e,t){this.name=t,this.parser=e}loadBufferView(e){const t=this.parser.json,n=t.bufferViews[e];if(n.extensions&&n.extensions[this.name]){const s=n.extensions[this.name],r=this.parser.getDependency("buffer",s.buffer),o=this.parser.options.meshoptDecoder;if(!o||!o.supported){if(t.extensionsRequired&&t.extensionsRequired.indexOf(this.name)>=0)throw new Error("THREE.GLTFLoader: setMeshoptDecoder must be called before loading compressed files");return null}return r.then(function(a){const c=s.byteOffset||0,l=s.byteLength||0,h=s.count,u=s.byteStride,f=new Uint8Array(a,c,l);return o.decodeGltfBufferAsync?o.decodeGltfBufferAsync(h,u,f,s.mode,s.filter).then(function(d){return d.buffer}):o.ready.then(function(){const d=new ArrayBuffer(h*u);return o.decodeGltfBuffer(new Uint8Array(d),h,u,f,s.mode,s.filter),d})})}else return null}}class hS{constructor(e){this.name=lt.EXT_MESH_GPU_INSTANCING,this.parser=e}createNodeMesh(e){const t=this.parser.json,n=t.nodes[e];if(!n.extensions||!n.extensions[this.name]||n.mesh===void 0)return null;const s=t.meshes[n.mesh];for(const l of s.primitives)if(l.mode!==Cn.TRIANGLES&&l.mode!==Cn.TRIANGLE_STRIP&&l.mode!==Cn.TRIANGLE_FAN&&l.mode!==void 0)return null;const o=n.extensions[this.name].attributes,a=[],c={};for(const l in o)a.push(this.parser.getDependency("accessor",o[l]).then(h=>(c[l]=h,c[l])));return a.length<1?null:(a.push(this.parser.createNodeMesh(e)),Promise.all(a).then(l=>{const h=l.pop(),u=h.isGroup?h.children:[h],f=l[0].count,d=[];for(const p of u){const _=new Qe,g=new B,m=new hi,M=new B(1,1,1),b=new Pd(p.geometry,p.material,f);for(let w=0;w<f;w++)c.TRANSLATION&&g.fromBufferAttribute(c.TRANSLATION,w),c.ROTATION&&m.fromBufferAttribute(c.ROTATION,w),c.SCALE&&M.fromBufferAttribute(c.SCALE,w),b.setMatrixAt(w,_.compose(g,m,M));let v=null;for(const w in c)if(w==="_COLOR_0"){const S=c[w];b.instanceColor=new fa(S.array,S.itemSize,S.normalized)}else if(w!=="TRANSLATION"&&w!=="ROTATION"&&w!=="SCALE"){if(v===null){const T=b.geometry;v=new Mt,v.name=T.name;for(const x in T.attributes)v.setAttribute(x,T.attributes[x]);for(const x in T.morphAttributes)v.morphAttributes[x]=T.morphAttributes[x];T.index!==null&&v.setIndex(T.index),v.morphTargetsRelative=T.morphTargetsRelative;for(const x of T.groups)v.addGroup(x.start,x.count,x.materialIndex);T.boundingBox!==null&&(v.boundingBox=T.boundingBox.clone()),T.boundingSphere!==null&&(v.boundingSphere=T.boundingSphere.clone()),v.drawRange.start=T.drawRange.start,v.drawRange.count=T.drawRange.count,v.userData=Object.assign({},T.userData),b.geometry=v}const S=c[w];v.setAttribute(w,new fa(S.array,S.itemSize,S.normalized))}Rt.prototype.copy.call(b,p),this.parser.assignFinalMaterial(b),d.push(b)}return h.isGroup?(h.clear(),h.add(...d),h):d[0]}))}}const ip="glTF",Sr=12,Sf={JSON:1313821514,BIN:5130562};class uS{constructor(e){this.name=lt.KHR_BINARY_GLTF,this.content=null,this.body=null;const t=new DataView(e,0,Sr),n=new TextDecoder;if(this.header={magic:n.decode(new Uint8Array(e.slice(0,4))),version:t.getUint32(4,!0),length:t.getUint32(8,!0)},this.header.magic!==ip)throw new Error("THREE.GLTFLoader: Unsupported glTF-Binary header.");if(this.header.version<2)throw new Error("THREE.GLTFLoader: Legacy binary file detected.");const s=this.header.length-Sr,r=new DataView(e,Sr);let o=0;for(;o<s;){const a=r.getUint32(o,!0);o+=4;const c=r.getUint32(o,!0);if(o+=4,c===Sf.JSON){const l=new Uint8Array(e,Sr+o,a);this.content=n.decode(l)}else if(c===Sf.BIN){const l=Sr+o;this.body=e.slice(l,l+a)}o+=a}if(this.content===null)throw new Error("THREE.GLTFLoader: JSON content not found.")}}class fS{constructor(e,t){if(!t)throw new Error("THREE.GLTFLoader: No DRACOLoader instance provided.");this.name=lt.KHR_DRACO_MESH_COMPRESSION,this.json=e,this.dracoLoader=t,this.dracoLoader.preload()}decodePrimitive(e,t){const n=this.json,s=this.dracoLoader,r=e.extensions[this.name].bufferView,o=e.extensions[this.name].attributes,a={},c={},l={};for(const h in o){const u=Ac[h]||h.toLowerCase();a[u]=o[h]}for(const h in e.attributes){const u=Ac[h]||h.toLowerCase();if(o[h]!==void 0){const f=n.accessors[e.attributes[h]],d=Ks[f.componentType];l[u]=d.name,c[u]=f.normalized===!0}}return t.getDependency("bufferView",r).then(function(h){return new Promise(function(u,f){s.decodeDracoFile(h,function(d){for(const p in d.attributes){const _=d.attributes[p],g=c[p];g!==void 0&&(_.normalized=g)}u(d)},a,l,yn,f)})})}}class dS{constructor(){this.name=lt.KHR_TEXTURE_TRANSFORM}extendTexture(e,t){if((t.texCoord===void 0||t.texCoord===e.channel)&&t.offset===void 0&&t.rotation===void 0&&t.scale===void 0)return e;if(e=e.clone(),t.texCoord!==void 0&&(e.channel=t.texCoord),t.offset!==void 0&&e.offset.fromArray(t.offset),t.rotation!==void 0&&(e.rotation=t.rotation),t.scale!==void 0&&e.repeat.fromArray(t.scale),t.rotation!==void 0){const n=Math.cos(e.rotation),s=Math.sin(e.rotation);e.matrix.set(e.repeat.x*n,e.repeat.y*s,e.offset.x,-e.repeat.x*s,e.repeat.y*n,e.offset.y,0,0,1),e.matrixAutoUpdate=!1}return e.needsUpdate=!0,e}}class pS{constructor(){this.name=lt.KHR_MESH_QUANTIZATION}}class sp extends sr{constructor(e,t,n,s){super(e,t,n,s)}copySampleValue_(e){const t=this.resultBuffer,n=this.sampleValues,s=this.valueSize,r=e*s*3+s;for(let o=0;o!==s;o++)t[o]=n[r+o];return t}interpolate_(e,t,n,s){const r=this.resultBuffer,o=this.sampleValues,a=this.valueSize,c=a*2,l=a*3,h=s-t,u=(n-t)/h,f=u*u,d=f*u,p=e*l,_=p-l,g=-2*d+3*f,m=d-f,M=1-g,b=m-f+u;for(let v=0;v!==a;v++){const w=o[_+v+a],S=o[_+v+c]*h,T=o[p+v+a],x=o[p+v]*h;r[v]=M*w+b*S+g*T+m*x}return r}}const mS=new hi;class gS extends sp{interpolate_(e,t,n,s){const r=super.interpolate_(e,t,n,s);return mS.fromArray(r).normalize().toArray(r),r}}const Cn={POINTS:0,LINES:1,LINE_LOOP:2,LINE_STRIP:3,TRIANGLES:4,TRIANGLE_STRIP:5,TRIANGLE_FAN:6},Ks={5120:Int8Array,5121:Uint8Array,5122:Int16Array,5123:Uint16Array,5125:Uint32Array,5126:Float32Array},wf={9728:kt,9729:zt,9984:hd,9985:Yo,9986:Ar,9987:bi},bf={33071:ii,33648:ra,10497:qi},Ml={SCALAR:1,VEC2:2,VEC3:3,VEC4:4,MAT2:4,MAT3:9,MAT4:16},Ac={POSITION:"position",NORMAL:"normal",TANGENT:"tangent",TEXCOORD_0:"uv",TEXCOORD_1:"uv1",TEXCOORD_2:"uv2",TEXCOORD_3:"uv3",COLOR_0:"color",WEIGHTS_0:"skinWeight",JOINTS_0:"skinIndex"},Oi={scale:"scale",translation:"position",rotation:"quaternion",weights:"morphTargetInfluences"},_S={CUBICSPLINE:void 0,LINEAR:Wr,STEP:Gr},yl={OPAQUE:"OPAQUE",MASK:"MASK",BLEND:"BLEND"};function xS(i){return i.DefaultMaterial===void 0&&(i.DefaultMaterial=new rt({color:16777215,emissive:0,metalness:1,roughness:1,transparent:!1,depthTest:!0,side:Xi})),i.DefaultMaterial}function ts(i,e,t){for(const n in t.extensions)i[n]===void 0&&(e.userData.gltfExtensions=e.userData.gltfExtensions||{},e.userData.gltfExtensions[n]=t.extensions[n])}function jn(i,e){e.extras!==void 0&&(typeof e.extras=="object"?Object.assign(i.userData,e.extras):console.warn("THREE.GLTFLoader: Ignoring primitive type .extras, "+e.extras))}function vS(i,e,t){let n=!1,s=!1,r=!1;for(let l=0,h=e.length;l<h;l++){const u=e[l];if(u.POSITION!==void 0&&(n=!0),u.NORMAL!==void 0&&(s=!0),u.COLOR_0!==void 0&&(r=!0),n&&s&&r)break}if(!n&&!s&&!r)return Promise.resolve(i);const o=[],a=[],c=[];for(let l=0,h=e.length;l<h;l++){const u=e[l];if(n){const f=u.POSITION!==void 0?t.getDependency("accessor",u.POSITION):i.attributes.position;o.push(f)}if(s){const f=u.NORMAL!==void 0?t.getDependency("accessor",u.NORMAL):i.attributes.normal;a.push(f)}if(r){const f=u.COLOR_0!==void 0?t.getDependency("accessor",u.COLOR_0):i.attributes.color;c.push(f)}}return Promise.all([Promise.all(o),Promise.all(a),Promise.all(c)]).then(function(l){const h=l[0],u=l[1],f=l[2];return n&&(i.morphAttributes.position=h),s&&(i.morphAttributes.normal=u),r&&(i.morphAttributes.color=f),i.morphTargetsRelative=!0,i})}function MS(i,e){if(i.updateMorphTargets(),e.weights!==void 0)for(let t=0,n=e.weights.length;t<n;t++)i.morphTargetInfluences[t]=e.weights[t];if(e.extras&&Array.isArray(e.extras.targetNames)){const t=e.extras.targetNames;if(i.morphTargetInfluences.length===t.length){i.morphTargetDictionary={};for(let n=0,s=t.length;n<s;n++)i.morphTargetDictionary[t[n]]=n}else console.warn("THREE.GLTFLoader: Invalid extras.targetNames length. Ignoring names.")}}function yS(i){let e;const t=i.extensions&&i.extensions[lt.KHR_DRACO_MESH_COMPRESSION];if(t?e="draco:"+t.bufferView+":"+t.indices+":"+Sl(t.attributes):e=i.indices+":"+Sl(i.attributes)+":"+i.mode,i.targets!==void 0)for(let n=0,s=i.targets.length;n<s;n++)e+=":"+Sl(i.targets[n]);return e}function Sl(i){let e="";const t=Object.keys(i).sort();for(let n=0,s=t.length;n<s;n++)e+=t[n]+":"+i[t[n]]+";";return e}function Rc(i){switch(i){case Int8Array:return 1/127;case Uint8Array:return 1/255;case Int16Array:return 1/32767;case Uint16Array:return 1/65535;default:throw new Error("THREE.GLTFLoader: Unsupported normalized accessor component type.")}}function SS(i){return i.search(/\.jpe?g($|\?)/i)>0||i.search(/^data\:image\/jpeg/)===0?"image/jpeg":i.search(/\.webp($|\?)/i)>0||i.search(/^data\:image\/webp/)===0?"image/webp":i.search(/\.ktx2($|\?)/i)>0||i.search(/^data\:image\/ktx2/)===0?"image/ktx2":"image/png"}const wS=new Qe;class bS{constructor(e={},t={}){this.json=e,this.extensions={},this.plugins={},this.options=t,this.cache=new Yy,this.associations=new Map,this.primitiveCache={},this.nodeCache={},this.meshCache={refs:{},uses:{}},this.cameraCache={refs:{},uses:{}},this.lightCache={refs:{},uses:{}},this.sourceCache={},this.textureCache={},this.nodeNamesUsed={};let n=!1,s=-1,r=!1,o=-1;if(typeof navigator<"u"&&typeof navigator.userAgent<"u"){const a=navigator.userAgent;n=/^((?!chrome|android).)*safari/i.test(a)===!0;const c=a.match(/Version\/(\d+)/);s=n&&c?parseInt(c[1],10):-1,r=a.indexOf("Firefox")>-1,o=r?a.match(/Firefox\/([0-9]+)\./)[1]:-1}typeof createImageBitmap>"u"||n&&s<17||r&&o<98?this.textureLoader=new Xd(this.options.manager):this.textureLoader=new yg(this.options.manager),this.textureLoader.setCrossOrigin(this.options.crossOrigin),this.textureLoader.setRequestHeader(this.options.requestHeader),this.fileLoader=new dh(this.options.manager),this.fileLoader.setResponseType("arraybuffer"),this.options.crossOrigin==="use-credentials"&&this.fileLoader.setWithCredentials(!0)}setExtensions(e){this.extensions=e}setPlugins(e){this.plugins=e}parse(e,t){const n=this,s=this.json,r=this.extensions;this.cache.removeAll(),this.nodeCache={},this._invokeAll(function(o){return o._markDefs&&o._markDefs()}),Promise.all(this._invokeAll(function(o){return o.beforeRoot&&o.beforeRoot()})).then(function(){return Promise.all([n.getDependencies("scene"),n.getDependencies("animation"),n.getDependencies("camera")])}).then(function(o){const a={scene:o[0][s.scene||0],scenes:o[0],animations:o[1],cameras:o[2],asset:s.asset,parser:n,userData:{}};return ts(r,a,s),jn(a,s),Promise.all(n._invokeAll(function(c){return c.afterRoot&&c.afterRoot(a)})).then(function(){for(const c of a.scenes)c.updateMatrixWorld();e(a)})}).catch(t)}_markDefs(){const e=this.json.nodes||[],t=this.json.skins||[],n=this.json.meshes||[];for(let s=0,r=t.length;s<r;s++){const o=t[s].joints;for(let a=0,c=o.length;a<c;a++)e[o[a]].isBone=!0}for(let s=0,r=e.length;s<r;s++){const o=e[s];o.mesh!==void 0&&(this._addNodeRef(this.meshCache,o.mesh),o.skin!==void 0&&(n[o.mesh].isSkinnedMesh=!0)),o.camera!==void 0&&this._addNodeRef(this.cameraCache,o.camera)}}_addNodeRef(e,t){t!==void 0&&(e.refs[t]===void 0&&(e.refs[t]=e.uses[t]=0),e.refs[t]++)}_getNodeRef(e,t,n){if(e.refs[t]<=1)return n;const s=n.clone(),r=(o,a)=>{const c=this.associations.get(o);c!=null&&this.associations.set(a,c);for(const[l,h]of o.children.entries())r(h,a.children[l])};return r(n,s),s.name+="_instance_"+e.uses[t]++,s}_invokeOne(e){const t=Object.values(this.plugins);t.push(this);for(let n=0;n<t.length;n++){const s=e(t[n]);if(s)return s}return null}_invokeAll(e){const t=Object.values(this.plugins);t.unshift(this);const n=[];for(let s=0;s<t.length;s++){const r=e(t[s]);r&&n.push(r)}return n}getDependency(e,t){const n=e+":"+t;let s=this.cache.get(n);if(!s){switch(e){case"scene":s=this.loadScene(t);break;case"node":s=this._invokeOne(function(r){return r.loadNode&&r.loadNode(t)});break;case"mesh":s=this._invokeOne(function(r){return r.loadMesh&&r.loadMesh(t)});break;case"accessor":s=this.loadAccessor(t);break;case"bufferView":s=this._invokeOne(function(r){return r.loadBufferView&&r.loadBufferView(t)});break;case"buffer":s=this.loadBuffer(t);break;case"material":s=this._invokeOne(function(r){return r.loadMaterial&&r.loadMaterial(t)});break;case"texture":s=this._invokeOne(function(r){return r.loadTexture&&r.loadTexture(t)});break;case"skin":s=this.loadSkin(t);break;case"animation":s=this._invokeOne(function(r){return r.loadAnimation&&r.loadAnimation(t)});break;case"camera":s=this.loadCamera(t);break;default:if(s=this._invokeOne(function(r){return r!=this&&r.getDependency&&r.getDependency(e,t)}),!s)throw new Error("Unknown type: "+e);break}this.cache.add(n,s)}return s}getDependencies(e){let t=this.cache.get(e);if(!t){const n=this,s=this.json[e+(e==="mesh"?"es":"s")]||[];t=Promise.all(s.map(function(r,o){return n.getDependency(e,o)})),this.cache.add(e,t)}return t}loadBuffer(e){const t=this.json.buffers[e],n=this.fileLoader;if(t.type&&t.type!=="arraybuffer")throw new Error("THREE.GLTFLoader: "+t.type+" buffer type is not supported.");if(t.uri===void 0&&e===0)return Promise.resolve(this.extensions[lt.KHR_BINARY_GLTF].body);const s=this.options;return new Promise(function(r,o){n.load(Br.resolveURL(t.uri,s.path),r,void 0,function(){o(new Error('THREE.GLTFLoader: Failed to load buffer "'+t.uri+'".'))})})}loadBufferView(e){const t=this.json.bufferViews[e];return this.getDependency("buffer",t.buffer).then(function(n){const s=t.byteLength||0,r=t.byteOffset||0;return n.slice(r,r+s)})}loadAccessor(e){const t=this,n=this.json,s=this.json.accessors[e];if(s.bufferView===void 0&&s.sparse===void 0){const o=Ml[s.type],a=Ks[s.componentType],c=s.normalized===!0,l=new a(s.count*o);return Promise.resolve(new qt(l,o,c))}const r=[];return s.bufferView!==void 0?r.push(this.getDependency("bufferView",s.bufferView)):r.push(null),s.sparse!==void 0&&(r.push(this.getDependency("bufferView",s.sparse.indices.bufferView)),r.push(this.getDependency("bufferView",s.sparse.values.bufferView))),Promise.all(r).then(function(o){const a=o[0],c=Ml[s.type],l=Ks[s.componentType],h=l.BYTES_PER_ELEMENT,u=h*c,f=s.byteOffset||0,d=s.bufferView!==void 0?n.bufferViews[s.bufferView].byteStride:void 0,p=s.normalized===!0;let _,g;if(d&&d!==u){const m=Math.floor(f/d),M="InterleavedBuffer:"+s.bufferView+":"+s.componentType+":"+m+":"+s.count;let b=t.cache.get(M);b||(_=new l(a,m*d,s.count*d/h),b=new Ed(_,d/h),t.cache.add(M,b)),g=new Yr(b,c,f%d/h,p)}else a===null?_=new l(s.count*c):_=new l(a,f,s.count*c),g=new qt(_,c,p);if(s.sparse!==void 0){const m=Ml.SCALAR,M=Ks[s.sparse.indices.componentType],b=s.sparse.indices.byteOffset||0,v=s.sparse.values.byteOffset||0,w=new M(o[1],b,s.sparse.count*m),S=new l(o[2],v,s.sparse.count*c);a!==null&&(g=new qt(g.array.slice(),g.itemSize,g.normalized)),g.normalized=!1;for(let T=0,x=w.length;T<x;T++){const R=w[T];if(g.setX(R,S[T*c]),c>=2&&g.setY(R,S[T*c+1]),c>=3&&g.setZ(R,S[T*c+2]),c>=4&&g.setW(R,S[T*c+3]),c>=5)throw new Error("THREE.GLTFLoader: Unsupported itemSize in sparse BufferAttribute.")}g.normalized=p}return g})}loadTexture(e){const t=this.json,n=this.options,r=t.textures[e].source,o=t.images[r];let a=this.textureLoader;if(o.uri){const c=n.manager.getHandler(o.uri);c!==null&&(a=c)}return this.loadTextureImage(e,r,a)}loadTextureImage(e,t,n){const s=this,r=this.json,o=r.textures[e],a=r.images[t],c=(a.uri||a.bufferView)+":"+o.sampler;if(this.textureCache[c])return this.textureCache[c];const l=this.loadImageSource(t,n).then(function(h){h.flipY=!1,h.name=o.name||a.name||"",h.name===""&&typeof a.uri=="string"&&a.uri.startsWith("data:image/")===!1&&(h.name=a.uri);const f=(r.samplers||{})[o.sampler]||{};return h.magFilter=wf[f.magFilter]||zt,h.minFilter=wf[f.minFilter]||bi,h.wrapS=bf[f.wrapS]||qi,h.wrapT=bf[f.wrapT]||qi,h.generateMipmaps=!h.isCompressedTexture&&h.minFilter!==kt&&h.minFilter!==zt,s.associations.set(h,{textures:e}),h}).catch(function(){return null});return this.textureCache[c]=l,l}loadImageSource(e,t){const n=this,s=this.json,r=this.options;if(this.sourceCache[e]!==void 0)return this.sourceCache[e].then(u=>u.clone());const o=s.images[e],a=self.URL||self.webkitURL;let c=o.uri||"",l=!1;if(o.bufferView!==void 0)c=n.getDependency("bufferView",o.bufferView).then(function(u){l=!0;const f=new Blob([u],{type:o.mimeType});return c=a.createObjectURL(f),c});else if(o.uri===void 0)throw new Error("THREE.GLTFLoader: Image "+e+" is missing URI and bufferView");const h=Promise.resolve(c).then(function(u){return new Promise(function(f,d){let p=f;t.isImageBitmapLoader===!0&&(p=function(_){const g=new Ht(_);g.needsUpdate=!0,f(g)}),t.load(Br.resolveURL(u,r.path),p,void 0,d)})}).then(function(u){return l===!0&&a.revokeObjectURL(c),jn(u,o),u.userData.mimeType=o.mimeType||SS(o.uri),u}).catch(function(u){throw console.error("THREE.GLTFLoader: Couldn't load texture",c),u});return this.sourceCache[e]=h,h}assignTexture(e,t,n,s){const r=this;return this.getDependency("texture",n.index).then(function(o){if(!o)return null;if(n.texCoord!==void 0&&n.texCoord>0&&(o=o.clone(),o.channel=n.texCoord),r.extensions[lt.KHR_TEXTURE_TRANSFORM]){const a=n.extensions!==void 0?n.extensions[lt.KHR_TEXTURE_TRANSFORM]:void 0;if(a){const c=r.associations.get(o);o=r.extensions[lt.KHR_TEXTURE_TRANSFORM].extendTexture(o,a),r.associations.set(o,c)}}return s!==void 0&&(o.colorSpace=s),e[t]=o,o})}assignFinalMaterial(e){const t=e.geometry;let n=e.material;const s=t.attributes.tangent===void 0,r=t.attributes.color!==void 0,o=t.attributes.normal===void 0;if(e.isPoints){const a="PointsMaterial:"+n.uuid;let c=this.cache.get(a);c||(c=new Vi,dn.prototype.copy.call(c,n),c.color.copy(n.color),c.map=n.map,c.sizeAttenuation=!1,this.cache.add(a,c)),n=c}else if(e.isLine){const a="LineBasicMaterial:"+n.uuid;let c=this.cache.get(a);c||(c=new Ur,dn.prototype.copy.call(c,n),c.color.copy(n.color),c.map=n.map,this.cache.add(a,c)),n=c}if(s||r||o){let a="ClonedMaterial:"+n.uuid+":";s&&(a+="derivative-tangents:"),r&&(a+="vertex-colors:"),o&&(a+="flat-shading:");let c=this.cache.get(a);c||(c=n.clone(),r&&(c.vertexColors=!0),o&&(c.flatShading=!0),s&&(c.normalScale&&(c.normalScale.y*=-1),c.clearcoatNormalScale&&(c.clearcoatNormalScale.y*=-1)),this.cache.add(a,c),this.associations.set(c,this.associations.get(n))),n=c}e.material=n}getMaterialType(){return rt}loadMaterial(e){const t=this,n=this.json,s=this.extensions,r=n.materials[e];let o;const a={},c=r.extensions||{},l=[];if(c[lt.KHR_MATERIALS_UNLIT]){const u=s[lt.KHR_MATERIALS_UNLIT];o=u.getMaterialType(),l.push(u.extendParams(a,r,t))}else{const u=r.pbrMetallicRoughness||{};if(a.color=new Ne(1,1,1),a.opacity=1,Array.isArray(u.baseColorFactor)){const f=u.baseColorFactor;a.color.setRGB(f[0],f[1],f[2],yn),a.opacity=f[3]}u.baseColorTexture!==void 0&&l.push(t.assignTexture(a,"map",u.baseColorTexture,Pt)),a.metalness=u.metallicFactor!==void 0?u.metallicFactor:1,a.roughness=u.roughnessFactor!==void 0?u.roughnessFactor:1,u.metallicRoughnessTexture!==void 0&&(l.push(t.assignTexture(a,"metalnessMap",u.metallicRoughnessTexture)),l.push(t.assignTexture(a,"roughnessMap",u.metallicRoughnessTexture))),o=this._invokeOne(function(f){return f.getMaterialType&&f.getMaterialType(e)}),l.push(Promise.all(this._invokeAll(function(f){return f.extendMaterialParams&&f.extendMaterialParams(e,a)})))}r.doubleSided===!0&&(a.side=Vn);const h=r.alphaMode||yl.OPAQUE;if(h===yl.BLEND?(a.transparent=!0,a.depthWrite=!1):(a.transparent=!1,h===yl.MASK&&(a.alphaTest=r.alphaCutoff!==void 0?r.alphaCutoff:.5)),r.normalTexture!==void 0&&o!==vn&&(l.push(t.assignTexture(a,"normalMap",r.normalTexture)),a.normalScale=new oe(1,1),r.normalTexture.scale!==void 0)){const u=r.normalTexture.scale;a.normalScale.set(u,u)}if(r.occlusionTexture!==void 0&&o!==vn&&(l.push(t.assignTexture(a,"aoMap",r.occlusionTexture)),r.occlusionTexture.strength!==void 0&&(a.aoMapIntensity=r.occlusionTexture.strength)),r.emissiveFactor!==void 0&&o!==vn){const u=r.emissiveFactor;a.emissive=new Ne().setRGB(u[0],u[1],u[2],yn)}return r.emissiveTexture!==void 0&&o!==vn&&l.push(t.assignTexture(a,"emissiveMap",r.emissiveTexture,Pt)),Promise.all(l).then(function(){const u=new o(a);return r.name&&(u.name=r.name),jn(u,r),t.associations.set(u,{materials:e}),r.extensions&&ts(s,u,r),u})}createUniqueName(e){const t=vt.sanitizeNodeName(e||"");return t in this.nodeNamesUsed?t+"_"+ ++this.nodeNamesUsed[t]:(this.nodeNamesUsed[t]=0,t)}loadGeometries(e){const t=this,n=this.extensions,s=this.primitiveCache;function r(a){return n[lt.KHR_DRACO_MESH_COMPRESSION].decodePrimitive(a,t).then(function(c){return Tf(c,a,t)})}const o=[];for(let a=0,c=e.length;a<c;a++){const l=e[a],h=yS(l),u=s[h];if(u)o.push(u.promise);else{let f;l.extensions&&l.extensions[lt.KHR_DRACO_MESH_COMPRESSION]?f=r(l):f=Tf(new Mt,l,t),l.mode===Cn.TRIANGLE_STRIP?f=f.then(d=>Mf(d,_d)):l.mode===Cn.TRIANGLE_FAN&&(f=f.then(d=>Mf(d,_c))),s[h]={primitive:l,promise:f},o.push(f)}}return Promise.all(o)}loadMesh(e){const t=this,n=this.json,s=this.extensions,r=n.meshes[e],o=r.primitives,a=[];for(let c=0,l=o.length;c<l;c++){const h=o[c].material===void 0?xS(this.cache):this.getDependency("material",o[c].material);a.push(h)}return a.push(t.loadGeometries(o)),Promise.all(a).then(async function(c){const l=c.slice(0,c.length-1),h=c[c.length-1],u=[];for(let d=0,p=h.length;d<p;d++){const _=h[d],g=o[d];let m;const M=l[d];if(g.mode===Cn.TRIANGLES||g.mode===Cn.TRIANGLE_STRIP||g.mode===Cn.TRIANGLE_FAN||g.mode===void 0){const b=r.isSkinnedMesh===!0,v=_.hasAttribute("skinIndex")&&_.hasAttribute("skinWeight");b&&v===!1&&console.warn("THREE.GLTFLoader: Missing skinIndex or skinWeight attributes. Skinning disabled."),m=b&&v?new l0(_,M):new K(_,M),m.isSkinnedMesh===!0&&m.normalizeSkinWeights()}else if(g.mode===Cn.LINES)m=new xc(_,M);else if(g.mode===Cn.LINE_STRIP)m=new rh(_,M);else if(g.mode===Cn.LINE_LOOP)m=new f0(_,M);else if(g.mode===Cn.POINTS)m=new Ys(_,M);else throw new Error("THREE.GLTFLoader: Primitive mode unsupported: "+g.mode);Object.keys(m.geometry.morphAttributes).length>0&&MS(m,r),m.name=t.createUniqueName(r.name||"mesh_"+e),jn(m,r),g.extensions&&ts(s,m,g),t.assignFinalMaterial(m),u.push(m)}for(let d=0,p=u.length;d<p;d++)t.associations.set(u[d],{meshes:e,primitives:d});if(u.length===1)return r.extensions&&ts(s,u[0],r),u[0];const f=new tt;r.extensions&&ts(s,f,r),t.associations.set(f,{meshes:e});for(let d=0,p=u.length;d<p;d++)f.add(u[d]);return f})}loadCamera(e){let t;const n=this.json.cameras[e],s=n[n.type];if(!s){console.warn("THREE.GLTFLoader: Missing camera parameters.");return}return n.type==="perspective"?t=new jt(zm.radToDeg(s.yfov),s.aspectRatio||1,s.znear||1,s.zfar||2e6):n.type==="orthographic"&&(t=new so(-s.xmag,s.xmag,s.ymag,-s.ymag,s.znear,s.zfar)),n.name&&(t.name=this.createUniqueName(n.name)),jn(t,n),Promise.resolve(t)}loadSkin(e){const t=this.json.skins[e],n=[];for(let s=0,r=t.joints.length;s<r;s++)n.push(this._loadNodeShallow(t.joints[s]));return t.inverseBindMatrices!==void 0?n.push(this.getDependency("accessor",t.inverseBindMatrices)):n.push(null),Promise.all(n).then(function(s){const r=s.pop(),o=s,a=[],c=[];for(let l=0,h=o.length;l<h;l++){const u=o[l];if(u){a.push(u);const f=new Qe;r!==null&&f.fromArray(r.array,l*16),c.push(f)}else console.warn('THREE.GLTFLoader: Joint "%s" could not be found.',t.joints[l])}return new ih(a,c)})}loadAnimation(e){const t=this.json,n=this,s=t.animations[e],r=s.name?s.name:"animation_"+e,o=[],a=[],c=[],l=[],h=[];for(let u=0,f=s.channels.length;u<f;u++){const d=s.channels[u],p=s.samplers[d.sampler],_=d.target,g=_.node,m=s.parameters!==void 0?s.parameters[p.input]:p.input,M=s.parameters!==void 0?s.parameters[p.output]:p.output;_.node!==void 0&&(o.push(this.getDependency("node",g)),a.push(this.getDependency("accessor",m)),c.push(this.getDependency("accessor",M)),l.push(p),h.push(_))}return Promise.all([Promise.all(o),Promise.all(a),Promise.all(c),Promise.all(l),Promise.all(h)]).then(function(u){const f=u[0],d=u[1],p=u[2],_=u[3],g=u[4],m=[];for(let b=0,v=f.length;b<v;b++){const w=f[b],S=d[b],T=p[b],x=_[b],R=g[b];if(w===void 0)continue;w.updateMatrix&&w.updateMatrix();const D=n._createAnimationTracks(w,S,T,x,R);if(D)for(let P=0;P<D.length;P++)m.push(D[P])}const M=new hg(r,void 0,m);return jn(M,s),M})}createNodeMesh(e){const t=this.json,n=this,s=t.nodes[e];return s.mesh===void 0?null:n.getDependency("mesh",s.mesh).then(function(r){const o=n._getNodeRef(n.meshCache,s.mesh,r);return s.weights!==void 0&&o.traverse(function(a){if(a.isMesh)for(let c=0,l=s.weights.length;c<l;c++)a.morphTargetInfluences[c]=s.weights[c]}),o})}loadNode(e){const t=this.json,n=this,s=t.nodes[e],r=n._loadNodeShallow(e),o=[],a=s.children||[];for(let l=0,h=a.length;l<h;l++)o.push(n.getDependency("node",a[l]));const c=s.skin===void 0?Promise.resolve(null):n.getDependency("skin",s.skin);return Promise.all([r,Promise.all(o),c]).then(function(l){const h=l[0],u=l[1],f=l[2];f!==null&&h.traverse(function(d){d.isSkinnedMesh&&d.bind(f,wS)});for(let d=0,p=u.length;d<p;d++)h.add(u[d]);if(h.userData.pivot!==void 0&&u.length>0){const d=h.userData.pivot,p=u[0];h.pivot=new B().fromArray(d),h.position.x-=d[0],h.position.y-=d[1],h.position.z-=d[2],p.position.set(0,0,0),delete h.userData.pivot}return h})}_loadNodeShallow(e){const t=this.json,n=this.extensions,s=this;if(this.nodeCache[e]!==void 0)return this.nodeCache[e];const r=t.nodes[e],o=r.name?s.createUniqueName(r.name):"",a=[],c=s._invokeOne(function(l){return l.createNodeMesh&&l.createNodeMesh(e)});return c&&a.push(c),r.camera!==void 0&&a.push(s.getDependency("camera",r.camera).then(function(l){return s._getNodeRef(s.cameraCache,r.camera,l)})),s._invokeAll(function(l){return l.createNodeAttachment&&l.createNodeAttachment(e)}).forEach(function(l){a.push(l)}),this.nodeCache[e]=Promise.all(a).then(function(l){let h;if(r.isBone===!0?h=new Cd:l.length>1?h=new tt:l.length===1?h=l[0]:h=new Rt,h!==l[0])for(let u=0,f=l.length;u<f;u++)h.add(l[u]);if(r.name&&(h.userData.name=r.name,h.name=o),jn(h,r),r.extensions&&ts(n,h,r),r.matrix!==void 0){const u=new Qe;u.fromArray(r.matrix),h.applyMatrix4(u)}else r.translation!==void 0&&h.position.fromArray(r.translation),r.rotation!==void 0&&h.quaternion.fromArray(r.rotation),r.scale!==void 0&&h.scale.fromArray(r.scale);if(!s.associations.has(h))s.associations.set(h,{});else if(r.mesh!==void 0&&s.meshCache.refs[r.mesh]>1){const u=s.associations.get(h);s.associations.set(h,{...u})}return s.associations.get(h).nodes=e,h}),this.nodeCache[e]}loadScene(e){const t=this.extensions,n=this.json.scenes[e],s=this,r=new tt;n.name&&(r.name=s.createUniqueName(n.name)),jn(r,n),n.extensions&&ts(t,r,n);const o=n.nodes||[],a=[];for(let c=0,l=o.length;c<l;c++)a.push(s.getDependency("node",o[c]));return Promise.all(a).then(function(c){for(let h=0,u=c.length;h<u;h++){const f=c[h];f.parent!==null?r.add(qy(f)):r.add(f)}const l=h=>{const u=new Map;for(const[f,d]of s.associations)(f instanceof dn||f instanceof Ht)&&u.set(f,d);return h.traverse(f=>{const d=s.associations.get(f);d!=null&&u.set(f,d)}),u};return s.associations=l(r),r})}_createAnimationTracks(e,t,n,s,r){const o=[],a=e.name?e.name:e.uuid,c=[];function l(d){d.morphTargetInfluences&&c.push(d.name?d.name:d.uuid)}Oi[r.path]===Oi.weights?(l(e),e.isGroup&&e.children.forEach(l)):c.push(a);let h;switch(Oi[r.path]){case Oi.weights:h=eo;break;case Oi.rotation:h=to;break;case Oi.translation:case Oi.scale:h=ga;break;default:switch(n.itemSize){case 1:h=eo;break;case 2:case 3:default:h=ga;break}break}const u=s.interpolation!==void 0?_S[s.interpolation]:Wr,f=this._getArrayFromAccessor(n);for(let d=0,p=c.length;d<p;d++){const _=new h(c[d]+"."+Oi[r.path],t.array,f,u);s.interpolation==="CUBICSPLINE"&&this._createCubicSplineTrackInterpolant(_),o.push(_)}return o}_getArrayFromAccessor(e){let t=e.array;if(e.normalized){const n=Rc(t.constructor),s=new Float32Array(t.length);for(let r=0,o=t.length;r<o;r++)s[r]=t[r]*n;t=s}return t}_createCubicSplineTrackInterpolant(e){e.createInterpolant=function(n){const s=this instanceof to?gS:sp;return new s(this.times,this.values,this.getValueSize()/3,n)},e.createInterpolant.isInterpolantFactoryMethodGLTFCubicSpline=!0}}function TS(i,e,t){const n=e.attributes,s=new ui;if(n.POSITION!==void 0){const a=t.json.accessors[n.POSITION],c=a.min,l=a.max;if(c!==void 0&&l!==void 0){if(s.set(new B(c[0],c[1],c[2]),new B(l[0],l[1],l[2])),a.normalized){const h=Rc(Ks[a.componentType]);s.min.multiplyScalar(h),s.max.multiplyScalar(h)}}else{console.warn("THREE.GLTFLoader: Missing min/max properties for accessor POSITION.");return}}else return;const r=e.targets;if(r!==void 0){const a=new B,c=new B;for(let l=0,h=r.length;l<h;l++){const u=r[l];if(u.POSITION!==void 0){const f=t.json.accessors[u.POSITION],d=f.min,p=f.max;if(d!==void 0&&p!==void 0){if(c.setX(Math.max(Math.abs(d[0]),Math.abs(p[0]))),c.setY(Math.max(Math.abs(d[1]),Math.abs(p[1]))),c.setZ(Math.max(Math.abs(d[2]),Math.abs(p[2]))),f.normalized){const _=Rc(Ks[f.componentType]);c.multiplyScalar(_)}a.max(c)}else console.warn("THREE.GLTFLoader: Missing min/max properties for accessor POSITION.")}}s.expandByVector(a)}i.boundingBox=s;const o=new fi;s.getCenter(o.center),o.radius=s.min.distanceTo(s.max)/2,i.boundingSphere=o}function Tf(i,e,t){const n=e.attributes,s=[];function r(o,a){return t.getDependency("accessor",o).then(function(c){i.setAttribute(a,c)})}for(const o in n){const a=Ac[o]||o.toLowerCase();a in i.attributes||s.push(r(n[o],a))}if(e.indices!==void 0&&!i.index){const o=t.getDependency("accessor",e.indices).then(function(a){i.setIndex(a)});s.push(o)}return at.workingColorSpace!==yn&&"COLOR_0"in n&&console.warn(`THREE.GLTFLoader: Converting vertex colors from "srgb-linear" to "${at.workingColorSpace}" not supported.`),jn(i,e),TS(i,e,t),Promise.all(s).then(function(){return e.targets!==void 0?vS(i,e.targets,t):i})}const ES="/spiritdeck/",Vs=["gargoyle_horned_sentinel","gargoyle_winged_lion","gargoyle_skull_watcher"],wh=new Map;let Ef=!1;function AS(){if(Ef)return;Ef=!0,Vs.length;const i=new Sh;for(const e of Vs)i.load(`${ES}models/gargoyles/${e}.glb`,t=>{const n=t.scene;n.rotation.x=-Math.PI/2,n.traverse(r=>{const o=r;if(o.isMesh&&o.material){const a=Array.isArray(o.material)?o.material:[o.material];for(const c of a){const l=c;l.vertexColors=!1,l.color=new Ne(10131340),l.roughness=.9,l.metalness=0,l.map=null,l.needsUpdate=!0}}});const s=new tt;s.add(n),wh.set(e,s)},void 0,()=>{})}function RS(){return wh.size>0}function CS(i){const e=Vs[(i%Vs.length+Vs.length)%Vs.length],t=wh.get(e);return t?t.clone(!0):null}const PS="/spiritdeck/",Af=["inn","tavern","blacksmith_shop","magic_shop","general_store","town_house_A","town_house_B","inn_hd","blacksmith_hd","magic_shop_hd","town_wall_gate","town_wall_straight","cobblestone_square","town_fountain","well","lamp_post","signpost","cart","barrel_cluster","crate_stack","food_stall","merchant_stall","cloth_stall","potion_stall","general_goods_stall","hay_bale","wood_fence","wooden_bridge"],bh=new Map;let Rf=!1,na=0;function IS(){if(Rf)return;Rf=!0,na=Af.length;const i=new Sh;for(const e of Af)i.load(`${PS}models/town/${e}.glb`,t=>{const n=t.scene;n.rotation.x=-Math.PI/2,(e==="town_wall_straight"||e==="town_wall_gate")&&n.scale.set(8/10.27,1,1),n.traverse(r=>{const o=r;if(o.isMesh&&(o.castShadow=!1,o.receiveShadow=!1,o.material)){const a=Array.isArray(o.material)?o.material:[o.material];for(const c of a){const l=c;l.map&&(l.map.colorSpace=Pt),l.roughness=Math.min(1,(l.roughness??1)*1)}}});const s=new tt;s.add(n),bh.set(e,s),na--},void 0,()=>{na--})}function LS(){return na===0&&bh.size>0}function NS(i){const e=bh.get(i);return e?e.clone(!0):null}const DS="/spiritdeck/",Cf=["house_small_hd","house_medium_hd","house_large_hd","blacksmith_open_forge_hd","inn_hd","magic_library_shop_hd","general_store_hd","tavern_hd","food_stall_hd","merchant_stall_hd","cloth_stall_hd","potion_stall_hd","weapon_stall_hd","accessories_stall_hd","fruit_vegetable_stall_hd"],Pf=["wall_straight_hd","wall_corner_hd","gate_closed_hd","gate_open_hd","round_watchtower_hd","fortification_stairs_hd","battlement_hd","castle_courtyard_plaza_hd","cobble_plaza_hd","cobble_straight_hd","cobble_corner_hd","cobble_crossroad_hd","cobble_t_junction_hd","dirt_path_hd","grass_edge_path_hd","courtyard_arcade_hd","courtyard_balustrade_hd","grand_royal_fountain_hd","stone_arch_bridge_hd","wooden_bridge_hd","waterfront_dock_hd"],Th=new Map;let Cc=!1,_a=0;function US(i){i.rotation.x=-Math.PI/2,i.traverse(e=>{const t=e;if(!t.isMesh)return;t.castShadow=!0,t.receiveShadow=!0;const n=Array.isArray(t.material)?t.material:[t.material];for(const s of n){const r=s;!r||!r.isMeshStandardMaterial||(r.vertexColors=!0,r.color.setRGB(1,1,1),s.name.toLowerCase().includes("fountain")?(r.roughness=.55,r.metalness=.05):(r.roughness=.9,r.metalness=0),r.needsUpdate=!0)}})}function If(i,e,t){t.load(`${DS}models/${e}/${i}.glb`,n=>{try{const s=n.scene;US(s);const r=new tt;r.add(s),Th.set(i,r)}catch(s){console.error("townhd load failed",i,s)}finally{_a--}},void 0,()=>{_a--})}function FS(){if(Cc)return;Cc=!0,_a=Cf.length+Pf.length;const i=new Sh;for(const e of Cf)If(e,"townhd",i);for(const e of Pf)If(e,"fort",i)}function OS(){return Cc&&_a===0&&Th.size>0}function BS(i){const e=Th.get(i);return e?e.clone(!0):null}let Pc=0;function rp(){Pc++;let i=!1;return()=>{i||(i=!0,Pc--)}}function wl(){return Pc}function Lf(){return LS()&&RS()&&OS()}const kS=/^[og]\s*(.+)?/,zS=/^mtllib /,HS=/^usemtl /,VS=/^usemap /,Nf=/\s+/,Df=new B,bl=new B,Uf=new B,Ff=new B,En=new B,Vo=new Ne;function GS(){const i={objects:[],object:{},vertices:[],normals:[],colors:[],uvs:[],materials:{},materialLibraries:[],startObject:function(e,t){if(this.object&&this.object.fromDeclaration===!1){this.object.name=e,this.object.fromDeclaration=t!==!1;return}const n=this.object&&typeof this.object.currentMaterial=="function"?this.object.currentMaterial():void 0;if(this.object&&typeof this.object._finalize=="function"&&this.object._finalize(!0),this.object={name:e||"",fromDeclaration:t!==!1,geometry:{vertices:[],normals:[],colors:[],uvs:[],hasUVIndices:!1},materials:[],smooth:!0,startMaterial:function(s,r){const o=this._finalize(!1);o&&(o.inherited||o.groupCount<=0)&&this.materials.splice(o.index,1);const a={index:this.materials.length,name:s||"",mtllib:Array.isArray(r)&&r.length>0?r[r.length-1]:"",smooth:o!==void 0?o.smooth:this.smooth,groupStart:o!==void 0?o.groupEnd:0,groupEnd:-1,groupCount:-1,inherited:!1,clone:function(c){const l={index:typeof c=="number"?c:this.index,name:this.name,mtllib:this.mtllib,smooth:this.smooth,groupStart:0,groupEnd:-1,groupCount:-1,inherited:!1};return l.clone=this.clone.bind(l),l}};return this.materials.push(a),a},currentMaterial:function(){if(this.materials.length>0)return this.materials[this.materials.length-1]},_finalize:function(s){const r=this.currentMaterial();if(r&&r.groupEnd===-1&&(r.groupEnd=this.geometry.vertices.length/3,r.groupCount=r.groupEnd-r.groupStart,r.inherited=!1),s&&this.materials.length>1)for(let o=this.materials.length-1;o>=0;o--)this.materials[o].groupCount<=0&&this.materials.splice(o,1);return s&&this.materials.length===0&&this.materials.push({name:"",smooth:this.smooth}),r}},n&&n.name&&typeof n.clone=="function"){const s=n.clone(0);s.inherited=!0,this.object.materials.push(s)}this.objects.push(this.object)},finalize:function(){this.object&&typeof this.object._finalize=="function"&&this.object._finalize(!0)},parseVertexIndex:function(e,t){const n=parseInt(e,10);return(n>=0?n-1:n+t/3)*3},parseNormalIndex:function(e,t){const n=parseInt(e,10);return(n>=0?n-1:n+t/3)*3},parseUVIndex:function(e,t){const n=parseInt(e,10);return(n>=0?n-1:n+t/2)*2},addVertex:function(e,t,n){const s=this.vertices,r=this.object.geometry.vertices;r.push(s[e+0],s[e+1],s[e+2]),r.push(s[t+0],s[t+1],s[t+2]),r.push(s[n+0],s[n+1],s[n+2])},addVertexPoint:function(e){const t=this.vertices;this.object.geometry.vertices.push(t[e+0],t[e+1],t[e+2])},addVertexLine:function(e){const t=this.vertices;this.object.geometry.vertices.push(t[e+0],t[e+1],t[e+2])},addNormal:function(e,t,n){const s=this.normals,r=this.object.geometry.normals;r.push(s[e+0],s[e+1],s[e+2]),r.push(s[t+0],s[t+1],s[t+2]),r.push(s[n+0],s[n+1],s[n+2])},addFaceNormal:function(e,t,n){const s=this.vertices,r=this.object.geometry.normals;Df.fromArray(s,e),bl.fromArray(s,t),Uf.fromArray(s,n),En.subVectors(Uf,bl),Ff.subVectors(Df,bl),En.cross(Ff),En.normalize(),r.push(En.x,En.y,En.z),r.push(En.x,En.y,En.z),r.push(En.x,En.y,En.z)},addColor:function(e,t,n){const s=this.colors,r=this.object.geometry.colors;s[e]!==void 0&&r.push(s[e+0],s[e+1],s[e+2]),s[t]!==void 0&&r.push(s[t+0],s[t+1],s[t+2]),s[n]!==void 0&&r.push(s[n+0],s[n+1],s[n+2])},addUV:function(e,t,n){const s=this.uvs,r=this.object.geometry.uvs;r.push(s[e+0],s[e+1]),r.push(s[t+0],s[t+1]),r.push(s[n+0],s[n+1])},addDefaultUV:function(){const e=this.object.geometry.uvs;e.push(0,0),e.push(0,0),e.push(0,0)},addUVLine:function(e){const t=this.uvs;this.object.geometry.uvs.push(t[e+0],t[e+1])},addFace:function(e,t,n,s,r,o,a,c,l){const h=this.vertices.length;let u=this.parseVertexIndex(e,h),f=this.parseVertexIndex(t,h),d=this.parseVertexIndex(n,h);if(this.addVertex(u,f,d),this.addColor(u,f,d),a!==void 0&&a!==""){const p=this.normals.length;u=this.parseNormalIndex(a,p),f=this.parseNormalIndex(c,p),d=this.parseNormalIndex(l,p),this.addNormal(u,f,d)}else this.addFaceNormal(u,f,d);if(s!==void 0&&s!==""){const p=this.uvs.length;u=this.parseUVIndex(s,p),f=this.parseUVIndex(r,p),d=this.parseUVIndex(o,p),this.addUV(u,f,d),this.object.geometry.hasUVIndices=!0}else this.addDefaultUV()},addPointGeometry:function(e){this.object.geometry.type="Points";const t=this.vertices.length;for(let n=0,s=e.length;n<s;n++){const r=this.parseVertexIndex(e[n],t);this.addVertexPoint(r),this.addColor(r)}},addLineGeometry:function(e,t){this.object.geometry.type="Line";const n=this.vertices.length,s=this.uvs.length;for(let r=0,o=e.length;r<o;r++)this.addVertexLine(this.parseVertexIndex(e[r],n));for(let r=0,o=t.length;r<o;r++)this.addUVLine(this.parseUVIndex(t[r],s))}};return i.startObject("",!1),i}class WS extends ds{constructor(e){super(e),this.materials=null}load(e,t,n,s){const r=this,o=new dh(this.manager);o.setPath(this.path),o.setRequestHeader(this.requestHeader),o.setWithCredentials(this.withCredentials),o.load(e,function(a){try{t(r.parse(a))}catch(c){s?s(c):console.error(c),r.manager.itemError(e)}},n,s)}setMaterials(e){return this.materials=e,this}parse(e){const t=new GS;e.indexOf(`\r
`)!==-1&&(e=e.replace(/\r\n/g,`
`)),e.indexOf(`\\
`)!==-1&&(e=e.replace(/\\\n/g,""));const n=e.split(`
`);let s=[];for(let a=0,c=n.length;a<c;a++){const l=n[a].trimStart();if(l.length===0)continue;const h=l.charAt(0);if(h!=="#")if(h==="v"){const u=l.split(Nf);switch(u[0]){case"v":t.vertices.push(parseFloat(u[1]),parseFloat(u[2]),parseFloat(u[3])),u.length>=7?(Vo.setRGB(parseFloat(u[4]),parseFloat(u[5]),parseFloat(u[6]),Pt),t.colors.push(Vo.r,Vo.g,Vo.b)):t.colors.push(void 0,void 0,void 0);break;case"vn":t.normals.push(parseFloat(u[1]),parseFloat(u[2]),parseFloat(u[3]));break;case"vt":t.uvs.push(parseFloat(u[1]),parseFloat(u[2]));break}}else if(h==="f"){const f=l.slice(1).trim().split(Nf),d=[];for(let _=0,g=f.length;_<g;_++){const m=f[_];if(m.length>0){const M=m.split("/");d.push(M)}}const p=d[0];for(let _=1,g=d.length-1;_<g;_++){const m=d[_],M=d[_+1];t.addFace(p[0],m[0],M[0],p[1],m[1],M[1],p[2],m[2],M[2])}}else if(h==="l"){const u=l.substring(1).trim().split(" ");let f=[];const d=[];if(l.indexOf("/")===-1)f=u;else for(let p=0,_=u.length;p<_;p++){const g=u[p].split("/");g[0]!==""&&f.push(g[0]),g[1]!==""&&d.push(g[1])}t.addLineGeometry(f,d)}else if(h==="p"){const f=l.slice(1).trim().split(" ");t.addPointGeometry(f)}else if((s=kS.exec(l))!==null){const u=(" "+s[0].slice(1).trim()).slice(1);t.startObject(u)}else if(HS.test(l))t.object.startMaterial(l.substring(7).trim(),t.materialLibraries);else if(zS.test(l))t.materialLibraries.push(l.substring(7).trim());else if(VS.test(l))console.warn('THREE.OBJLoader: Rendering identifier "usemap" not supported. Textures must be defined in MTL files.');else if(h==="s"){if(s=l.split(" "),s.length>1){const f=s[1].trim().toLowerCase();t.object.smooth=f!=="0"&&f!=="off"}else t.object.smooth=!0;const u=t.object.currentMaterial();u&&(u.smooth=t.object.smooth)}else{if(l==="\0")continue;console.warn('THREE.OBJLoader: Unexpected line: "'+l+'"')}}t.finalize();const r=new tt;if(r.materialLibraries=[].concat(t.materialLibraries),!(t.objects.length===1&&t.objects[0].geometry.vertices.length===0)===!0)for(let a=0,c=t.objects.length;a<c;a++){const l=t.objects[a],h=l.geometry,u=l.materials,f=h.type==="Line",d=h.type==="Points";let p=!1;if(h.vertices.length===0)continue;const _=new Mt;_.setAttribute("position",new Je(h.vertices,3)),h.normals.length>0&&_.setAttribute("normal",new Je(h.normals,3)),h.colors.length>0&&(p=!0,_.setAttribute("color",new Je(h.colors,3))),h.hasUVIndices===!0&&_.setAttribute("uv",new Je(h.uvs,2));const g=[];for(let M=0,b=u.length;M<b;M++){const v=u[M],w=v.name+"_"+v.smooth+"_"+p;let S=t.materials[w];if(this.materials!==null){if(S=this.materials.create(v.name),f&&S&&!(S instanceof Ur)){const T=new Ur;dn.prototype.copy.call(T,S),T.color.copy(S.color),S=T}else if(d&&S&&!(S instanceof Vi)){const T=new Vi({size:10,sizeAttenuation:!1});dn.prototype.copy.call(T,S),T.color.copy(S.color),T.map=S.map,S=T}}S===void 0&&(f?S=new Ur:d?S=new Vi({size:1,sizeAttenuation:!1}):S=new j0,S.name=v.name,S.flatShading=!v.smooth,S.vertexColors=p,t.materials[w]=S),g.push(S)}let m;if(g.length>1){for(let M=0,b=u.length;M<b;M++){const v=u[M];_.addGroup(v.groupStart,v.groupCount,M)}f?m=new xc(_,g):d?m=new Ys(_,g):m=new K(_,g)}else f?m=new xc(_,g[0]):d?m=new Ys(_,g[0]):m=new K(_,g[0]);m.name=l.name,r.add(m)}else if(t.vertices.length>0){const a=new Vi({size:1,sizeAttenuation:!1}),c=new Mt;c.setAttribute("position",new Je(t.vertices,3)),t.colors.length>0&&t.colors[0]!==void 0&&(c.setAttribute("color",new Je(t.colors,3)),a.vertexColors=!0);const l=new Ys(c,a);r.add(l)}return r}}const Si=160,Of=4,XS="/spiritdeck/",op=["arcstel","orin","nemne","vesper"],qS={arcstel:"models/blue_mage_avatar.obj",orin:"models/king_warrior_editable.obj",nemne:"models/celestial_sorceress/celestial_sorceress_full_body.obj",vesper:"models/ethereal_sorceress_avatar.obj"},YS={arcstel:6990079,orin:14205066,nemne:15133951,vesper:10479280},$S={arcstel:0,orin:0,nemne:0,vesper:0};class KS{constructor(){this.ready=!1,this.entries=[],this.t=0,this.canvas=document.createElement("canvas"),this.canvas.width=Si*Of,this.canvas.height=Si,this.renderer=new tp({canvas:this.canvas,alpha:!0,antialias:!0,preserveDrawingBuffer:!0}),this.renderer.setClearColor(0,0),this.renderer.outputColorSpace=Pt,this.renderer.setScissorTest(!0),this.camera=new jt(30,1,.05,200),this.camera.position.set(0,0,3.2),this.camera.lookAt(0,0,0);const e=new WS;op.forEach((t,n)=>{const s=new wd;s.add(new Qo(16777215,1.1));const r=new no(15397631,2.4);r.position.set(1.4,1.8,2.2),s.add(r);const o=new no(6737151,1.6);o.position.set(-1.6,.6,-1.4),s.add(o);const a=new Rt;s.add(a),this.entries.push({scene:s,pivot:a,loaded:!1}),e.load(`${XS}${qS[t]}`,c=>{c.traverse(d=>{const p=d;p.isMesh&&(p.material=new rt({color:YS[t],roughness:.55,metalness:.05}))}),c.rotation.x=$S[t]??0,c.updateMatrixWorld(!0);const l=new ui().setFromObject(c),h=l.getSize(new B),u=l.getCenter(new B);c.position.sub(u),a.add(c);const f=h.y||Math.max(h.x,h.z)||1;a.scale.setScalar(1.6/f),this.entries[n].loaded=!0,this.entries.every(d=>d.loaded)&&(this.ready=!0)},void 0,()=>{})})}render(e){this.t+=e;for(let t=0;t<Of;t++){const n=this.entries[t];!n||!n.loaded||(n.pivot.rotation.y=0,this.renderer.setViewport(t*Si,0,Si,Si),this.renderer.setScissor(t*Si,0,Si,Si),this.renderer.render(n.scene,this.camera))}}}let Js=null;function JS(){Js||(Js=new KS)}function ZS(i){Js?.render(i)}function jS(){return Js?{canvas:Js.canvas,ready:Js.ready}:null}function QS(i){return op.indexOf(i)}const wr=Si,Ae={bg:"#08080e",panel:"#14141f",panelHi:"#1e1e2e",bevelLo:"#0b0b14",bevelHi:"#33334d",text:"#e9e9f2",dim:"#8b8ba3",gold:"#d9b45c",goldLo:"#8a6f2f",hp:"#d8534f",mp:"#4f8fd8"};function Re(i,e,t,n,s,r){i.fillStyle=r,i.fillRect(e|0,t|0,n|0,s|0)}function Bt(i,e,t,n,s=Ae.text,r=8){i.font=`${r}px "DejaVu Sans Mono", monospace`,i.textBaseline="top",i.fillStyle=s,i.fillText(e,t|0,n|0)}function ap(i,e,t=8){return i.font=`${t}px "DejaVu Sans Mono", monospace`,i.measureText(e).width}function ni(i,e,t,n,s=Ae.text,r=8){Bt(i,e,t-ap(i,e,r)/2,n,s,r)}function us(i,e,t,n,s,r=Ae.panel,o=Ae.bevelHi,a=Ae.bevelLo){Re(i,e,t,n,s,r),Re(i,e,t,n,1,o),Re(i,e,t,1,s,o),Re(i,e,t+s-1,n,1,a),Re(i,e+n-1,t,1,s,a)}function ew(i){const e=parseInt(i.slice(1),16);return[e>>16&255,e>>8&255,e&255]}function Zs(i,e){const[t,n,s]=ew(i),r=o=>Math.max(0,Math.min(255,Math.round(o*e)));return`rgb(${r(t)},${r(n)},${r(s)})`}let xa=[],lp=null,cp=null,Os=null,ia=null,hp=null,Bf=0,kf=0;function tw(){xa.length||(xa=[$s(20958,0),$s(20958,1),$s(20958,2)],lp=Tc(45324),cp=Ec(49937))}function nw(i,e){if(Os&&Bf===i&&kf===e)return;Bf=i,kf=e,Os=document.createElement("canvas"),Os.width=i,Os.height=e;const t=Os.getContext("2d");if(!t)throw new Error("no view ctx");ia=t,ia.imageSmoothingEnabled=!1,hp=ia.createImageData(i,e)}function iw(i,e,t,n,s,r,o,a,c,l){tw(),nw(a,c);const h=lp,u=cp,f=hp,d=f.data,p=t+.5,_=n+.5,g=Dn[s],m=g.x,M=g.y,b=-M*1.5,v=m*1.5,w=c>>1,S=1+.07*Math.sin(l*11)+.04*Math.sin(l*26+1.7),T=(A,I)=>A<0||I<0||A>=e.w||I>=e.h?!0:e.tiles[I*e.w+A]===Qt,x=m-b,R=M-v,D=m+b,P=M+v,F=.5*c;for(let A=0;A<c;A++){const I=A>w,O=I?A-w:w-A;if(O<=0){let J=A*a*4;for(let j=0;j<a;j++)d[J]=8,d[J+1]=9,d[J+2]=13,d[J+3]=255,J+=4;continue}const H=F/O,C=H*(D-x)/a,N=H*(P-R)/a;let U=p+H*x,k=_+H*R,V=1/(1+H*.34);V>1&&(V=1),I||(V*=.6);const ee=I?h:u,re=ee.w,Se=ee.h,be=ee.data;let Ve=A*a*4;for(let J=0;J<a;J++){const j=Math.floor(U),de=Math.floor(k);let Ue=(U-j)*re|0,ve=(k-de)*Se|0;Ue<0?Ue=0:Ue>=re&&(Ue=re-1),ve<0?ve=0:ve>=Se&&(ve=Se-1);const Ge=(ve*re+Ue)*4;d[Ve]=be[Ge]*V,d[Ve+1]=be[Ge+1]*V,d[Ve+2]=be[Ge+2]*V,d[Ve+3]=255,Ve+=4,U+=C,k+=N}}for(let A=0;A<a;A++){const I=2*A/a-1,O=m+b*I,H=M+v*I;let C=Math.floor(p),N=Math.floor(_);const U=O===0?1e30:Math.abs(1/O),k=H===0?1e30:Math.abs(1/H);let V,ee,re,Se;O<0?(V=-1,re=(p-C)*U):(V=1,re=(C+1-p)*U),H<0?(ee=-1,Se=(_-N)*k):(ee=1,Se=(N+1-_)*k);let be=0,Ve=0;for(;Ve++<64&&(re<Se?(re+=U,C+=V,be=0):(Se+=k,N+=ee,be=1),!T(C,N)););const J=be===0?(C-p+(1-V)/2)/O:(N-_+(1-ee)/2)/H,j=Math.max(1e-4,J),de=Math.min(c*5,c/j),Ue=w-de/2,ve=(C*73856093^N*19349663)>>>0,Ge=xa[ve%xa.length],ht=Ge.w,ie=Ge.h,le=Ge.data;let he=be===0?_+j*H:p+j*O;he-=Math.floor(he);let ce=he*ht|0;(be===0&&O>0||be===1&&H<0)&&(ce=ht-ce-1),ce<0?ce=0:ce>=ht&&(ce=ht-1);let ue=1/(1+j*.3);ue>1&&(ue=1),be===1&&(ue*=.74),ue*=S;const Xe=Math.max(0,1-j/3.2)*.3*S,Be=Math.max(0,Math.ceil(Ue)),Ye=Math.min(c,Math.ceil(Ue+de)),Ke=ie/de;let z=(Be-Ue)*Ke;for(let ut=Be;ut<Ye;ut++){let je=z|0;je<0?je=0:je>=ie&&(je=ie-1),z+=Ke;const L=(je*ht+ce)*4,y=(ut*a+A)*4;d[y]=le[L]*ue*(1+Xe*.18),d[y+1]=le[L+1]*ue,d[y+2]=le[L+2]*ue*(1-Xe*.1),d[y+3]=255}}ia.putImageData(f,0,0),i.drawImage(Os,r,o)}let br=null,zf=!1;function sw(){if(!zf){zf=!0;const i=new Image;i.onload=()=>{br=i},i.onerror=()=>{if(i.src.endsWith(".png")){const e=new Image;e.onload=()=>{br=e},e.onerror=()=>{br=null},e.src="/spiritdeck/textures/portrait_frame.jpg"}else br=null},i.src="/spiritdeck/textures/portrait_frame.png"}return br}let Bi=null,Tl=null;function rw(i,e){if(Bi||(Bi=document.createElement("canvas"),Tl=Bi.getContext("2d")),Bi.width<i&&(Bi.width=i),Bi.height<e&&(Bi.height=e),!Tl)throw new Error("no scratch ctx");return{c:Bi,g:Tl}}const ow={warrior:11,mage:47,cleric:83,spirit:129};function aw(i,e,t,n,s,r){const o=i.createLinearGradient(e,t,e,t+s);o.addColorStop(0,"#0a1020"),o.addColorStop(1,"#0a0e1a"),i.fillStyle=o,i.fillRect(e,t,n,s);const a=wn(r),c=performance.now()/1e3,l=Math.max(40,Math.floor(n*s/40));for(let h=0;h<l;h++){const u=e+a()*n,f=t+a()*s,d=a(),p=.5+.5*Math.sin(c*2+h*1.7);i.fillStyle=`rgba(${170+a()*85|0},${200+a()*55|0},255,${(.25+.75*p).toFixed(2)})`;const _=d<.85?1:2;i.fillRect(u,f,_,_)}}function lw(i,e,t,n,s){i.fillStyle="#241b0e",i.fillRect(e,t,n,s);const r=["#6b5528","#a8894a","#dcc17e","#f2e6b8"];for(let a=0;a<r.length;a++)i.strokeStyle=r[a],i.lineWidth=1,i.strokeRect(e+a+.5,t+a+.5,n-a*2-1,s-a*2-1);i.fillStyle="#f2e6b8";const o=2.5;for(const[a,c]of[[e+2,t+2],[e+n-2,t+2],[e+2,t+s-2],[e+n-2,t+s-2]])i.beginPath(),i.moveTo(a,c-o),i.lineTo(a+o,c),i.lineTo(a,c+o),i.lineTo(a-o,c),i.closePath(),i.fill()}function cw(i,e,t,n,s,r,o,a){const c=e.naturalWidth,l=e.naturalHeight,h=Math.min(a,Math.floor(Math.min(c,l)/3)),u=Math.min(o,Math.floor(Math.min(s,r)/3));i.drawImage(e,0,0,h,h,t,n,u,u),i.drawImage(e,c-h,0,h,h,t+s-u,n,u,u),i.drawImage(e,0,l-h,h,h,t,n+r-u,u,u),i.drawImage(e,c-h,l-h,h,h,t+s-u,n+r-u,u,u),i.drawImage(e,h,0,c-2*h,h,t+u,n,s-2*u,u),i.drawImage(e,h,l-h,c-2*h,h,t+u,n+r-u,s-2*u,u),i.drawImage(e,0,h,h,l-2*h,t,n+u,u,r-2*u),i.drawImage(e,c-h,h,h,l-2*h,t+s-u,n+u,u,r-2*u),i.drawImage(e,h,h,c-2*h,l-2*h,t+u,n+u,s-2*u,r-2*u)}function hw(i,e,t,n,s,r,o,a){const c=performance.now()/1e3,l=sw();let h,u,f,d;if(l&&l.complete&&l.naturalWidth>0){const M=Math.max(6,Math.round(Math.min(r,o)*.15));cw(i,l,n,s,r,o,M,150),h=n+M,u=s+M,f=r-M*2,d=o-M*2}else{aw(i,n,s,r,o,ow[e]),lw(i,n,s,r,o);const M=Math.round(r*.13),b=Math.round(o*.13);h=n+M,u=s+b,f=r-M*2,d=o-b*2}const p=jS(),_=a!==void 0?QS(a):-1,g=!!p&&p.ready&&_>=0;if(i.save(),i.beginPath(),i.rect(h,u,f,d),i.clip(),i.globalAlpha=.95,i.globalCompositeOperation="source-over",g&&p){const M=_*wr;i.drawImage(p.canvas,M,0,wr,wr,h,u,f,d),i.globalCompositeOperation="lighter",i.globalAlpha=.5,i.drawImage(p.canvas,M,0,wr,wr,h,u,f,d)}else{const M=rw(r,o);M.g.clearRect(0,0,r,o),pw(M.g,e,0,0,r,o,t),i.drawImage(M.c,0,0,r,o,h,u,f,d),i.globalCompositeOperation="lighter",i.globalAlpha=.45,i.drawImage(M.c,0,0,r,o,h,u,f,d)}i.globalCompositeOperation="screen",i.globalAlpha=.25,i.fillStyle="#5fc8ff",i.fillRect(h,u,f,d),i.globalCompositeOperation="source-over",i.globalAlpha=.16,i.fillStyle="#000814";for(let M=u;M<u+d;M+=3)i.fillRect(h,M,f,1);const m=u+(c*20%(d+8)|0)-4;i.globalAlpha=.22,i.fillStyle="#cdf1ff",i.fillRect(h,m,f,2),i.globalAlpha=1,i.restore()}const wi=new Map;function uw(i){if(wi.has(i)){const t=wi.get(i);return t&&t.complete&&t.naturalWidth>0?t:null}const e=new Image;return wi.set(i,e),e.onload=()=>wi.set(i,e),e.onerror=()=>wi.set(i,null),e.src=`/spiritdeck/textures/cards/${i}.jpg`,null}function fw(i){for(const e of i){if(wi.has(e))continue;const t=rp(),n=new Image;wi.set(e,n),n.onload=()=>{wi.set(e,n),t()},n.onerror=()=>{wi.set(e,null),t()},n.src=`/spiritdeck/textures/cards/${e}.jpg`}}function dw(i,e,t,n,s,r){const o=e.naturalWidth/e.naturalHeight,a=s/r;let c=0,l=0,h=e.naturalWidth,u=e.naturalHeight;o>a?(h=e.naturalHeight*a,c=(e.naturalWidth-h)/2):(u=e.naturalWidth/a,l=(e.naturalHeight-u)/2),i.drawImage(e,c,l,h,u,t,n,s,r)}function Nn(i,e,t,n,s,r,o){const a=uw(e.id);if(a){us(i,t,n,s,r,o?Ae.panelHi:Ae.panel,o?Ae.gold:Ae.bevelHi,Ae.bevelLo);const f=i.imageSmoothingEnabled;i.imageSmoothingEnabled=!0,dw(i,a,t+2,n+2,s-4,r-4),i.imageSmoothingEnabled=f;return}us(i,t,n,s,r,o?Ae.panelHi:Ae.panel,o?Ae.gold:Ae.bevelHi,Ae.bevelLo);const c=s-8,l=Math.floor(r*.46);hw(i,e.art,e.element,t+4,n+4,c,l,e.id),Bt(i,e.name,t+4,n+l+6,o?Ae.gold:Ae.text,8),Bt(i,`L${e.lv}`,t+s-4-ap(i,`L${e.lv}`),n+l+6,Ae.dim,8);const h=n+l+16,u=s-8;Re(i,t+4,h,u,3,"#000"),Re(i,t+4,h,Math.round(u*(e.hp/e.maxHp)),3,Ae.hp),Bt(i,`HP${e.hp}`,t+4,h+5,Ae.text,8),Re(i,t+4,h+15,u,3,"#000"),Re(i,t+4,h+15,Math.round(u*(e.mp/e.maxMp)),3,Ae.mp),Bt(i,`MP${e.mp}`,t+4,h+20,Ae.text,8)}function pw(i,e,t,n,s,r,o){const a=t+(s>>1),c="#e6c39a",l=Nc[o];Re(i,t+2,n+r-10,s-4,8,Zs(l,.4)),e==="warrior"?(Re(i,a-7,n+6,14,12,c),Re(i,a-8,n+3,16,5,"#5a3d28"),Re(i,a-9,n+8,3,8,"#3a2a1c"),Re(i,a+6,n+8,3,8,"#3a2a1c"),Re(i,a-6,n+11,3,2,"#243040"),Re(i,a+3,n+11,3,2,"#243040"),Re(i,a-12,n+r-20,24,10,"#42506a"),Re(i,a-3,n+r-22,6,12,l)):e==="mage"?(Re(i,a-6,n+6,12,12,c),Re(i,a-9,n+2,18,6,"#6a4a8a"),Re(i,a-9,n+6,3,12,"#6a4a8a"),Re(i,a+6,n+6,3,12,"#6a4a8a"),Re(i,a-5,n+11,3,2,"#2a2038"),Re(i,a+2,n+11,3,2,"#2a2038"),Re(i,a-11,n+r-20,22,10,"#3a2c52")):e==="cleric"?(Re(i,a-7,n+6,14,12,c),Re(i,a-8,n+3,16,4,"#cfc8b0"),Re(i,a-5,n+11,3,2,"#3a3020"),Re(i,a+2,n+11,3,2,"#3a3020"),Re(i,a-12,n+r-20,24,10,"#8a8468"),Re(i,a-2,n+r-22,4,8,l),Re(i,a-5,n+r-19,10,3,l)):(i.fillStyle=Zs(l,1.1),i.beginPath(),i.arc(a,n+r*.42,s*.26,0,Math.PI*2),i.fill(),i.fillStyle=Zs(l,1.6),i.beginPath(),i.arc(a-3,n+r*.36,s*.09,0,Math.PI*2),i.fill(),Re(i,a-6,n+r*.42,3,3,"#101020"),Re(i,a+3,n+r*.42,3,3,"#101020"))}function up(i,e){const t=i.split(/\s+/),n=[];let s="";for(const r of t)(s+(s?" ":"")+r).length>e?(s&&n.push(s),s=r):s+=(s?" ":"")+r;return s&&n.push(s),n}function kr(i,e,t,n,s,r){us(i,e,t,n,s,"#0d0d16",Ae.bevelHi,Ae.bevelLo);const o=Math.floor((n-10)/6);let a=t+6;const c=[];for(const l of r)c.push(...up(l,o));for(const l of c.slice(-Math.floor((s-10)/11)))Bt(i,l,e+5,a,Ae.text,8),a+=11}function fp(i,e,t,n,s,r,o,a,c,l){us(i,o,a,c,l,"#05050a",Ae.goldLo,Ae.bevelLo);const h=Math.max(3,Math.min((c-16)/e.w,(l-16)/e.h)),u=o+(c-h*e.w)/2,f=a+(l-h*e.h)/2;for(let g=0;g<e.h;g++)for(let m=0;m<e.w;m++){if(!t[g*e.w+m])continue;const M=e.tiles[g*e.w+m];let b=M===Qt?"#2b2b3a":"#6b6b86";M===Gs&&(b=Ae.gold),M===Sa&&(b="#7fd1c0"),M===wa&&(b="#3d4152"),M===rs&&(b="#8a6a2e"),M===Dc&&(b="#ffe08a"),M===Ws&&(b="#e8c15a"),Re(i,u+m*h,f+g*h,Math.ceil(h),Math.ceil(h),b)}const d=u+(n+.5)*h,p=f+(s+.5)*h;i.fillStyle="#ff5e5e",i.beginPath();const _=Dn[r];i.moveTo(d+_.x*h*.7,p+_.y*h*.7),i.lineTo(d-_.y*h*.45-_.x*h*.4,p+_.x*h*.45-_.y*h*.4),i.lineTo(d+_.y*h*.45-_.x*h*.4,p-_.x*h*.45-_.y*h*.4),i.closePath(),i.fill(),Bt(i,e.name,o+5,a+4,Ae.dim,8)}const El=["N","E","S","W"];function dp(i,e,t,n){Re(i,t-13,n-6,26,12,"#0d0d16"),Bt(i,El[(e+3)%4],t-11,n-5,Ae.dim,8),Bt(i,El[e],t-3,n-5,Ae.gold,8),Bt(i,El[(e+1)%4],t+7,n-5,Ae.dim,8)}function mw(i,e,t,n,s,r,o,a){const c=Nc[e.element];us(i,t,n,s,r,o?"#20203a":"#16161f",o?Ae.gold:"#3a3a52",Ae.bevelLo);const l=t+4,h=n+4,u=s-8,f=r-20;Re(i,l,h,u,f,"#0b0b14"),Re(i,l,h,u,3,Zs(c,.8)),gw(i,e.art,e.element,l,h,u,f),a>0&&(i.fillStyle=`rgba(255,255,255,${Math.min(.6,a)})`,i.fillRect(l,h,u,f));const d=up(e.name,Math.floor(u/5));Bt(i,d[0],t+4,n+r-15,o?Ae.gold:Ae.text,8);const p=s-8;Re(i,t+4,n+r-5,p,3,"#000"),Re(i,t+4,n+r-5,Math.round(p*(e.hp/e.maxHp)),3,Ae.hp)}function gw(i,e,t,n,s,r,o){const a=Nc[t],c=n+(r>>1),l=s+(o>>1),h=Zs(a,1.35),u=Zs(a,.6);if(i.fillStyle=u,i.strokeStyle=h,i.lineWidth=1,e==="hound")Re(i,c-r*.3,l-o*.05,r*.55,o*.22,u),Re(i,c+r*.18,l-o*.16,r*.18,o*.2,u),Re(i,c-r*.28,l+o*.16,r*.1,o*.18,u),Re(i,c+r*.12,l+o*.16,r*.1,o*.18,u),Re(i,c+r*.26,l-o*.12,3,3,"#ffd090");else if(e==="wisp"){i.beginPath();for(let f=0;f<=12;f++){const d=f/12*Math.PI*2,p=r*.24*(1+.25*Math.sin(d*3)),_=c+Math.cos(d)*p,g=l+Math.sin(d)*p*1.25;f===0?i.moveTo(_,g):i.lineTo(_,g)}i.closePath(),i.fill(),i.fillStyle="#fff2c0",i.beginPath(),i.arc(c,l,r*.08,0,Math.PI*2),i.fill()}else if(e==="golem")Re(i,c-r*.22,l-o*.3,r*.44,o*.34,u),Re(i,c-r*.3,l+o*.02,r*.6,o*.26,u),Re(i,c-r*.3,l-o*.26,r*.1,o*.3,u),Re(i,c+r*.2,l-o*.26,r*.1,o*.3,u),Re(i,c-r*.12,l-o*.22,r*.08,3,"#ffd090"),Re(i,c+r*.04,l-o*.22,r*.08,3,"#ffd090");else{Re(i,c-r*.12,l-o*.12,r*.24,o*.24,u),i.strokeStyle=h;for(let f=-1;f<=1;f+=2)i.beginPath(),i.moveTo(c+f*r*.1,l-o*.08),i.lineTo(c+f*r*.3,l-o*.22),i.stroke(),i.beginPath(),i.moveTo(c+f*r*.1,l+o*.08),i.lineTo(c+f*r*.3,l+o*.22),i.stroke();Re(i,c-4,l-4,3,3,"#ffd090"),Re(i,c+1,l-4,3,3,"#ffd090")}}const Eh="v0.7.2",_w=0,Hf=1,Vf=2,Gf=3,xw=4,vw=5,Mw=6,yw=["#2b5f8a","#d9c48a","#4a7a3a","#2f5a2a","#6b6350","#8a8a90","#b9a06a"],Wf=["Emberfall","Thornwick","Duskmere","Coldharbour","Ashfen","Greyford"];function Al(i){const e=wn(i>>>0),t=64,n=new Float32Array(t*t);for(let a=0;a<t*t;a++)n[a]=e();const s=(a,c)=>n[(c%t+t)%t*t+(a%t+t)%t],r=(a,c,l)=>a+(c-a)*l,o=a=>a*a*(3-2*a);return(a,c)=>{const l=Math.floor(a),h=Math.floor(c),u=o(a-l),f=o(c-h);return r(r(s(l,h),s(l+1,h),u),r(s(l,h+1),s(l+1,h+1),u),f)}}function Xf(i,e,t,n,s){let r=n.x,o=n.y;const a=(c,l)=>{c<0||l<0||c>=e||l>=t||(i[l*e+c]=Mw)};for(;r!==s.x;)r+=Math.sign(s.x-r),a(r,o),a(r,o+1);for(;o!==s.y;)o+=Math.sign(s.y-o),a(r,o),a(r+1,o)}function Rl(i){const n=new Uint8Array(2304),s=Al(i),r=Al(i*7919+13),o=Al(i*104729+7),a=wn((i^1540483477)>>>0);for(let f=0;f<36;f++)for(let d=0;d<64;d++){const p=d/11,_=f/11,g=s(p,_)*.62+r(p*2.1,_*2.1)*.27+o(p*4.3,_*4.3)*.11,m=(d-64/2)/(64/2),M=(f-36/2)/(36/2),b=Math.sqrt(m*m+M*M),v=g-Math.max(0,b-.6)*2.3;let w;v<.32?w=_w:v<.355?w=Hf:v<.5?w=Vf:v<.62?w=Gf:v<.73?w=xw:w=vw,n[f*64+d]=w}const c=(f,d)=>{for(let p=0;p<44;p++)for(let _=0;_<28;_++){const g=_/28*Math.PI*2,m=Math.round(f+Math.cos(g)*p),M=Math.round(d+Math.sin(g)*p);if(m<1||M<1||m>=63||M>=35)continue;const b=n[M*64+m];if(b===Vf||b===Gf||b===Hf)return{x:m,y:M}}return{x:Math.round(f),y:Math.round(d)}},l=c(64*.32,36*.5),h=c(64*.7,36*.5),u=[{x:l.x,y:l.y,kind:"dungeon",name:"Sunken Vault"},{x:h.x,y:h.y,kind:"city",name:Wf[Math.floor(a()*Wf.length)]}];return Xf(n,64,36,u[0],u[1]),Xf(n,64,36,u[1],u[0]),{w:64,h:36,tiles:n,nodes:u,seed:i}}function Sw(i,e){let t=i*374761393+e*668265263;return t=(t^t>>13)*1274126177,((t^t>>16)>>>0)/4294967295}function ww(i,e,t,n,s,r){const o=Math.min(s/e.w,r/e.h),a=(s-o*e.w)/2,c=(r-o*e.h)/2;i.fillStyle="#0a0d12",i.fillRect(0,0,s,r);for(let h=0;h<e.h;h++)for(let u=0;u<e.w;u++){const f=e.tiles[h*e.w+u],d=Sw(u,h)*.12-.06;i.fillStyle=bw(yw[f],d),i.fillRect(a+u*o,c+h*o,Math.ceil(o),Math.ceil(o))}e.nodes.forEach((h,u)=>{const f=a+(h.x+.5)*o,d=c+(h.y+.5)*o;if(h.kind==="city"){i.fillStyle="#6b4a2a";for(const[g,m]of[[-1,-1],[0,-1],[1,-1]])i.fillRect(f+g*o-o*.3,d+m*o-o*.4,o*.7,o*.9);i.fillStyle="#c9a24a",i.fillRect(f-o*.35,d-o*1.3,o*.7,o*.5)}else i.fillStyle="#1a1a22",i.beginPath(),i.arc(f,d,o*.7,0,7),i.fill(),i.fillStyle="#3a3a46",i.fillRect(f-o*.3,d-o*.1,o*.6,o*.6);const p=u===t,_=.6+.4*Math.sin(n*4);i.strokeStyle=p?`rgba(255,90,90,${_.toFixed(2)})`:"rgba(255,255,255,0.35)",i.lineWidth=p?2:1,i.strokeRect(f-o,d-o,o*2,o*2)});const l=e.nodes[t];i.fillStyle="rgba(8,8,14,0.82)",i.fillRect(0,r-34,s,34),i.strokeStyle="#c9a24a",i.lineWidth=1,i.strokeRect(.5,r-33.5,s-1,33),i.font="10px monospace",i.textAlign="center",i.fillStyle="#e8d9a8",i.fillText(l.name,s/2,r-19),i.fillStyle="#9a9aa8",i.fillText("[<] [>] choose      [Z] enter",s/2,r-6),i.textAlign="left"}function bw(i,e){const t=parseInt(i.slice(1,3),16),n=parseInt(i.slice(3,5),16),s=parseInt(i.slice(5,7),16),r=o=>Math.max(0,Math.min(255,Math.round(o*(1+e))));return`rgb(${r(t)},${r(n)},${r(s)})`}const Tw=12;class is{constructor(e,t,n="L O A D I N G"){this.host=e,this.prepare=t,this.label=n,this.target=null,this.built=!1,this.phase=0,this.t=0,this.waited=0,this.frames=0;const s=new URLSearchParams(location.search),r=s.get("loadms");this.minShow=r===null?.4:Math.max(0,Number(r)||0)/1e3,this.debug=s.get("loaddebug")==="1"}enter(){this.t=0,this.waited=0,this.frames=0}update(e){this.t+=e,this.waited+=e,this.frames++;const t=this.waited<Tw;if(!this.built){if((!Lf()||wl()>0)&&t)return;this.target=this.prepare(),this.built=!0,this.waited=0;return}if(!(wl()>0&&t)){if(this.phase===0){this.phase=1,this.waited=0,this.target.preload?.();return}if(this.phase===1){this.phase=2,this.waited=0,this.target.preload?.();return}this.target&&this.t>=this.minShow&&this.frames>3&&this.host.setScene(this.target)}}render(e){Re(e,0,0,384,216,"#05050a");const t=.7+.3*Math.sin(this.t*2);e.globalAlpha=t,ni(e,this.label,192,100,Ae.gold,16),e.globalAlpha=1,this.debug&&(ni(e,`kits ${Lf()?"ok":"wait"}  assets ${wl()}`,192,124,Ae.dim,8),ni(e,`phase ${this.phase}  ${this.t.toFixed(1)}s`,192,134,Ae.dim,8)),ni(e,Eh,192,210,Ae.dim,8)}}const pt={x:80,y:6,w:224,h:134},Go=76,An=3.4,sn=An/2,rn=4.8,Hn=6,Zn=-20,Rn=Hn-Zn,Pr=7,Cl=Rn/Pr,yi=-1.3,Pl=[0,-Math.PI/2,Math.PI,Math.PI/2],Ew="/spiritdeck/textures/ph";function Ah(i,e){const t=document.createElement("canvas");t.width=i,t.height=e;const n=t.getContext("2d");if(!n)throw new Error("no 2d ctx");return{c:t,g:n}}function Ic(i=256){const{c:e,g:t}=Ah(i,i),n=wn(4242),s=t.createLinearGradient(0,0,0,i);s.addColorStop(0,"#eaf4ff"),s.addColorStop(.55,"#adc9ef"),s.addColorStop(1,"#7396c6"),t.fillStyle=s,t.fillRect(0,0,i,i);for(let r=0;r<60;r++){const o=n()*i,a=n()*i,c=20+n()*80;t.fillStyle=`rgba(255,255,255,${(.03+n()*.08).toFixed(3)})`,t.beginPath(),t.ellipse(o,a,c,c*.5,n()*Math.PI,0,Math.PI*2),t.fill()}return e}function qf(i=128){const{c:e,g:t}=Ah(i,i),n=t.createRadialGradient(i/2,i/2,0,i/2,i/2,i/2);return n.addColorStop(0,"rgba(255,246,214,1)"),n.addColorStop(.2,"rgba(255,182,86,0.95)"),n.addColorStop(.5,"rgba(255,116,34,0.4)"),n.addColorStop(1,"rgba(255,80,10,0)"),t.fillStyle=n,t.fillRect(0,0,i,i),e}function Yf(i=32){const{c:e,g:t}=Ah(i,i),n=t.createRadialGradient(i/2,i/2,0,i/2,i/2,i/2);return n.addColorStop(0,"rgba(255,235,200,0.9)"),n.addColorStop(1,"rgba(255,235,200,0)"),t.fillStyle=n,t.fillRect(0,0,i,i),e}function ti(i,e){const t=new d0(i);return t.colorSpace=Pt,t}function ft(i,e,t,n){const s=rp(),r=new Xd().load(`${Ew}/${i}`,s,void 0,s);return r.wrapS=qi,r.wrapT=qi,r.repeat.set(t,n),r.anisotropy=8,e&&(r.colorSpace=Pt),r}function Bs(i){const e=i.getAttribute("uv");return e&&!i.getAttribute("uv1")&&i.setAttribute("uv1",e),i}function Fn(){return new rt({color:2829619,roughness:.5,metalness:.85})}function pp(){return new rt({color:13214282,roughness:.32,metalness:.9})}function Aw(){return new rt({color:14209208,roughness:.8,metalness:0})}function Pa(){return new rt({color:4600606,roughness:.85,metalness:.03})}function Sn(){return new rt({color:6973793,roughness:.96,metalness:0})}function Wi(){return new rt({color:1776674,roughness:1,metalness:0})}function Rw(){return new rt({color:3879724,roughness:1,metalness:0})}function Cw(){const i=new tt,e=Fn(),t=new K(new He(.1,.1,.55),e);t.position.set(0,0,-.24),i.add(t);const n=new K(new He(.08,.62,.08),e);n.position.set(0,-.28,-.42),n.rotation.x=.6,i.add(n);const s=new K(new At(.3,.15,.26,12,1,!0),e);s.position.set(0,.16,.02),i.add(s);const r=new K(new Yt(.3,.028,6,14),e);r.rotation.x=Math.PI/2,r.position.set(0,.29,.02),i.add(r);const o=new K(new Mn(.21,10,7),new rt({color:1576198,emissive:16731408,emissiveIntensity:1.4,roughness:1}));return o.scale.y=.55,o.position.set(0,.24,.02),i.add(o),i.userData.flame={x:0,y:.52,z:.02},i.userData.light={color:16753226,intensity:18,dist:13},i}function Pw(){const i=new tt,e=Sn(),t=new K(new At(1.15,1.32,.72,8),e);t.position.y=.36,i.add(t);const n=new K(new At(.92,.92,.5,8,1,!0),Wi());n.position.y=.52,i.add(n);const s=new K(new Yi(.92,8),Wi());s.rotation.x=-Math.PI/2,s.position.y=.3,i.add(s);const r=new K(new Yt(1.12,.08,6,16),e);r.rotation.x=Math.PI/2,r.position.y=.72,i.add(r);const o=new K(new At(.18,.26,1.15,8),e);o.position.y=1.15,i.add(o);const a=new K(new At(.46,.3,.24,8,1,!0),e);a.position.y=1.78,i.add(a);const c=new K(new Yi(.42,8),Wi());return c.rotation.x=-Math.PI/2,c.position.y=1.72,i.add(c),i}function mp(){const i=new tt,e=Sn(),t=new K(new He(.92,1.1,.92),e);t.position.y=.55,i.add(t);const n=new K(new He(1.02,.12,1.02),e);n.position.y=1.16,i.add(n);const s=new K(new Mn(.42,12,9),e);s.scale.set(1,1.25,1.15),s.position.y=1.78,i.add(s);const r=new K(new Mn(.27,12,9),e);r.position.set(0,2.28,.14),i.add(r);const o=new K(new Wn(.12,.26,6),e);o.rotation.x=Math.PI/2,o.position.set(0,2.22,.36),i.add(o);for(const a of[-1,1]){const c=new K(new Wn(.06,.3,6),e);c.position.set(a*.15,2.5,.06),c.rotation.x=-.5,i.add(c);const l=new K(new Wn(.52,1.15,4),e);l.scale.set(1,1,.12),l.position.set(a*.52,1.95,-.24),l.rotation.z=a*.55,l.rotation.x=.32,i.add(l);const h=new K(new He(.16,.5,.16),e);h.position.set(a*.4,1.35,.22),h.rotation.x=.5,i.add(h)}return i}function Iw(){const i=new tt,e=Pa();for(const[r,o]of[[-.6,-.34],[.6,-.34],[-.6,.34]]){const a=new K(new He(.12,.72,.12),e);a.position.set(r,.36,o),i.add(a)}const t=new K(new He(1.5,.08,.42),e);t.position.set(0,.74,-.13),i.add(t);const n=new K(new He(1.4,.08,.38),e);n.position.set(.08,.72,.28),n.rotation.z=.05,i.add(n);const s=new K(new He(1.1,.08,.38),e);return s.position.set(-.15,.06,.72),s.rotation.set(.08,.5,.12),i.add(s),i}function Lw(i=256){const e=document.createElement("canvas");e.width=e.height=i;const t=e.getContext("2d"),n=wn(9182);t.fillStyle="#c9b587",t.fillRect(0,0,i,i);for(let l=0;l<240;l++)t.fillStyle=`rgba(90,68,36,${(.02+n()*.06).toFixed(3)})`,t.beginPath(),t.arc(n()*i,n()*i,2+n()*20,0,7),t.fill();t.fillStyle="#9f8c5e",t.strokeStyle="#57431f",t.lineWidth=2,t.beginPath();const s=i*.5,r=i*.5;for(let l=0;l<=24;l++){const h=l/24*Math.PI*2,u=i*.3+Math.sin(h*3+1)*i*.06+Math.sin(h*7)*i*.03,f=s+Math.cos(h)*u,d=r+Math.sin(h)*u*.85;l===0?t.moveTo(f,d):t.lineTo(f,d)}t.closePath(),t.fill(),t.stroke(),t.strokeStyle="rgba(70,54,26,0.35)",t.lineWidth=1;for(let l=1;l<8;l++)t.beginPath(),t.moveTo(i/8*l,0),t.lineTo(i/8*l,i),t.moveTo(0,i/8*l),t.lineTo(i,i/8*l),t.stroke();t.strokeStyle="#3c2c12",t.lineWidth=3;const o=i*.74,a=i*.28,c=i*.09;t.beginPath(),t.arc(o,a,c,0,7),t.stroke();for(let l=0;l<4;l++){const h=l/4*Math.PI*2;t.beginPath(),t.moveTo(o+Math.cos(h)*c,a+Math.sin(h)*c),t.lineTo(o+Math.cos(h)*c*1.7,a+Math.sin(h)*c*1.7),t.stroke()}return e}function Nw(){const i=new tt,e=new K(new He(1.3,1.05,.06),Pa());i.add(e);const t=new K(new Ot(1.16,.9),new rt({map:ti(Lw()),roughness:.9,metalness:0}));return t.position.z=.04,i.add(t),i}function Dw(i){const e=new tt,t=Fn(),n=Math.max(4,Math.round(i/.42));for(let o=0;o<n;o++){const a=new K(new At(.035,.035,3.3,6),t);a.position.set(-i/2+o/(n-1)*i,1.75,0),e.add(a)}for(const o of[.5,1.75,3]){const a=new K(new He(i,.07,.07),t);a.position.set(0,o,0),e.add(a)}const s=new K(new He(i+.5,1.6,.5),Sn());s.position.set(0,3.95,0),e.add(s);const r=new K(new He(i+.5,.36,.5),Sn());return r.position.set(0,.18,0),e.add(r),e}function Uw(){const i=new tt,e=Fn(),t=new K(new He(1,1.25,.12),Wi());i.add(t);for(let s=0;s<4;s++){const r=new K(new At(.028,.028,1.25,6),e);r.position.set(-.36+s*.24,0,.06),i.add(r)}for(const s of[-.42,.42]){const r=new K(new He(1,.06,.06),e);r.position.set(0,s,.06),i.add(r)}const n=new K(new He(1.16,1.42,.08),Sn());return n.position.z=-.03,i.add(n),i}function gp(){const i=new tt,e=Pa(),t=new K(new He(2.9,2.6,.16),e);t.position.y=1.3,i.add(t);for(const r of[.5,1.3,2.1]){const o=new K(new He(3,.14,.2),Fn());o.position.set(0,r,.02),i.add(o)}const n=Fn();for(let r=-2;r<=2;r++){const o=new K(new Mn(.05,6,5),n);o.position.set(r*.55,1.3,.14),i.add(o)}const s=new K(new Yt(.12,.026,6,10),Fn());return s.position.set(.95,1.25,.14),i.add(s),i}function Fw(){const i=new tt;i.add(gp());for(const t of[-1,1]){const n=new K(new He(.22,2.7,.44),Sn());n.position.set(t*1.56,1.35,0),i.add(n)}const e=new K(new He(3.5,.55,.44),Sn());return e.position.y=2.9,i.add(e),i}function Ow(){const i=new tt,e=pp(),t=new K(new At(.035,.035,.44,6),e);t.rotation.z=Math.PI/2,i.add(t);const n=new K(new Yt(.11,.032,6,12),e);n.position.x=-.28,i.add(n);for(let r=0;r<3;r++){const o=new K(new He(.05,.09,.05),e);o.position.set(.16-r*.08,-.08,0),i.add(o)}const s=new Zt(16765562,7,6,2);return s.position.y=.3,i.add(s),i.userData.spin=!0,i}function Bw(){const i=new tt,e=Aw();for(let a=0;a<10;a++){const c=new K(new At(.045,.045,.055,6),e);c.rotation.z=Math.PI/2,c.position.set(-.16+a*.047,.055,0),i.add(c)}const t=new K(new Mn(.135,12,9),e);t.scale.set(1.1,1,1.05),t.position.set(-.3,.1,0),i.add(t);const n=new K(new He(.13,.05,.15),e);n.position.set(-.33,.035,0),i.add(n);for(const a of[-1,1]){const c=new K(new Mn(.028,6,5),Wi());c.position.set(-.35,.13,a*.055),i.add(c)}for(let a=0;a<5;a++){const c=new K(new Yt(.14-a*.006,.016,5,10,Math.PI*1.25),e);c.rotation.x=Math.PI/2,c.rotation.z=-Math.PI*.12,c.position.set(0+a*.062,.06,0),i.add(c)}const s=new K(new Yt(.13,.028,5,10),e);s.rotation.x=Math.PI/2,s.position.set(.37,.06,0),i.add(s);const r=a=>new K(new oh(.022,a,4,6),e);for(const a of[-1,1]){const c=r(.36);c.rotation.z=Math.PI/2,c.rotation.y=a*.5,c.position.set(.12,.05,a*.22),i.add(c);const l=r(.34);l.rotation.z=Math.PI/2,l.rotation.y=a*.2,l.position.set(.5,.05,a*.33),i.add(l);const h=r(.42);h.rotation.z=Math.PI/2,h.rotation.y=a*.35,h.position.set(.6,.05,a*.16),i.add(h)}const o=r(.2);return o.rotation.z=Math.PI/2,o.position.set(.06,.045,.62),i.add(o),i.rotation.y=(Math.sin(i.position.x)+1)*2,i}function kw(){const i=new tt,e=new rt({color:3811863,roughness:.7,metalness:.1}),t=pp();for(const c of[-1,1]){const l=new K(new He(1.42,2.75,.2),e);l.position.set(c*.73,1.38,0),i.add(l);for(const u of[.45,1.38,2.3]){const f=new K(new He(1.46,.16,.26),t);f.position.set(c*.73,u,.03),i.add(f)}const h=new K(new Mn(.07,8,6),t);h.position.set(c*.73,1.38,.16),i.add(h)}const n=new K(new Yt(.42,.07,8,20),t);n.position.set(0,1.95,.18),i.add(n);const s=new K(new At(.34,.34,.1,8),e);s.rotation.x=Math.PI/2,s.position.set(0,1.95,.16),i.add(s);const r=new K(new He(.1,.24,.06),Wi());r.position.set(0,1.95,.22),i.add(r);for(const c of[-1,1]){const l=new K(new Yt(.15,.03,6,12),t);l.position.set(c*.5,1.35,.2),i.add(l);const h=new K(new At(.16,.18,3.2,8),Sn());h.position.set(c*1.62,1.6,0),i.add(h);const u=mp();u.scale.set(.62,.62,.62),u.position.set(c*1.62,3.2,.1),i.add(u)}const o=new K(new He(3.7,.7,.5),Sn());o.position.y=3.1,i.add(o);const a=new Zt(16765562,4,6,2);return a.position.set(0,2.4,.5),i.add(a),i}function zw(i={halfW:1.72,height:4.8,depth:3.4}){const e=new tt,t=Sn(),{halfW:n,height:s,depth:r}=i,o=1.35,a=Math.min(2.5,s-.55);for(const _ of[-1,1]){const g=new K(new He(n-o,s,r),t);g.position.set(_*(o+(n-o)/2),s/2,0),e.add(g)}const c=new K(new He(o*2+.04,s-a,r),t);c.position.set(0,a+(s-a)/2,0),e.add(c);const l=new K(new He(o*2+.3,.12,r),t);l.position.set(0,.06,0),e.add(l);const h=new K(new He(.5,.6,.3),t);h.position.set(0,a+.18,r/2-.02),e.add(h);const u=gp();u.scale.setScalar(.92);const f=new tt;f.position.set(-o+.1,.12,-r/2+.14),f.rotation.y=-1.6,u.position.set(1.33,0,0),f.add(u),e.add(f);const d=new K(new Ot(2.7,a),new vn({map:ti(Ic(128)),toneMapped:!0,color:9348806}));d.position.set(0,a/2+.12,-r/2+.07),e.add(d);const p=new Zt(16771520,2.6,9,2);return p.position.set(0,1.9,-.7),e.add(p),e}function Hw(){const i=new tt,e=Rw(),t=new K(new Mn(.11,8,6),e);t.scale.set(1,.85,1.7),t.position.y=.1,i.add(t);const n=new K(new Mn(.07,8,6),e);n.position.set(0,.1,.19),i.add(n);const s=new K(new Wn(.04,.09,6),e);s.rotation.x=Math.PI/2,s.position.set(0,.09,.28),i.add(s);for(const o of[-1,1]){const a=new K(new Yi(.045,8),e);a.position.set(o*.05,.16,.16),a.rotation.y=o*.6,i.add(a);const c=new K(new Mn(.012,5,4),new vn({color:2101264}));c.position.set(o*.04,.12,.23),i.add(c);for(const l of[.13,-.13]){const h=new K(new At(.012,.012,.1,5),e);h.position.set(o*.07,.05,l),i.add(h)}}const r=new K(new At(.014,.006,.4,5),e);return r.rotation.x=Math.PI/2.4,r.position.set(0,.12,-.32),i.add(r),i.userData.rat=!0,i}function ln(i,e=.9){return new rt({color:i,roughness:e,metalness:0})}function Il(i){const e=new tt,t=document.createElement("canvas");t.width=128,t.height=64;const n=t.getContext("2d");n.fillStyle="#3a2a17",n.fillRect(0,0,128,64),n.strokeStyle="#c9a24a",n.lineWidth=4,n.strokeRect(3,3,122,58),n.fillStyle="#e8d9a8",n.font="bold 26px monospace",n.textAlign="center",n.fillText(i,64,42);const s=new K(new He(1.3,.7,.1),new rt({map:ti(t),roughness:.8}));e.add(s);for(const r of[-1,1]){const o=new K(new He(.06,.4,.06),Fn());o.position.set(r*.55,.5,0),e.add(o)}return e}function $f(i,e,t,n,s){const r=new tt,o=new K(new He(i,t,e),ln(n,.92));o.position.y=t/2,r.add(o);const a=new K(new Wn(Math.max(i,e)*.76,t*.72,4),ln(s,.85));a.rotation.y=Math.PI/4,a.position.y=t+t*.36,r.add(a);const c=ln(3811866,.95);for(const f of[-1,1]){const d=new K(new He(.18,t,.18),c);d.position.set(f*(i/2-.12),t/2,e/2),r.add(d)}const l=new K(new He(i,.18,.18),c);l.position.set(0,t*.64,e/2),r.add(l);const h=new K(new He(1,1.7,.12),ln(3745818));h.position.set(0,.85,e/2+.03),r.add(h);const u=new rt({color:16765562,emissive:16756816,emissiveIntensity:.6,roughness:.6});for(const f of[-1,1]){const d=new K(new He(.5,.5,.08),u);d.position.set(f*(i/2-.8),t*.62,e/2+.02),r.add(d)}return r}function Vw(i){const e=new tt,t=ln(5914918,.9),n=new K(new He(2.2,.12,1.1),t);n.position.y=.9,e.add(n);for(const[o,a]of[[-1,-.45],[1,-.45],[-1,.45],[1,.45]]){const c=new K(new He(.1,.9,.1),t);c.position.set(o,.45,a),e.add(c)}for(const o of[-1.05,1.05]){const a=new K(new At(.04,.04,2.3,6),t);a.position.set(o,1.15,-.5),e.add(a)}const s=new K(new He(2.5,.08,1.7),ln(i,.8));s.position.set(0,2.25,-.1),s.rotation.x=-.13,e.add(s);const r=[13777710,15245626,9158458];for(let o=0;o<3;o++){const a=new K(new He(.5,.2,.5),t);a.position.set(-.7+o*.7,1.05,.1),e.add(a);for(let c=0;c<4;c++){const l=new K(new Mn(.09,7,6),ln(r[o],.7));l.position.set(-.7+o*.7+(c%2?.11:-.11),1.22,.1+(c<2?.11:-.11)),e.add(l)}}return e}function Gw(i){const e=new tt,t=new K(new Wn(1.55,2.5,10),ln(i,.9));t.position.y=1.25,e.add(t);const n=new K(new At(.05,.05,2.7,6),ln(5914918));n.position.y=1.35,e.add(n);const s=new K(new Ot(.55,.32),ln(15260072,.9));return s.position.set(.3,2.55,0),e.add(s),e}function Ww(){const i=new tt,e=Sn(),t=new K(new At(.9,.98,.9,12,1,!0),e);t.position.y=.45,i.add(t);const n=new K(new Yt(.92,.1,6,16),e);n.rotation.x=Math.PI/2,n.position.y=.9,i.add(n);const s=new K(new Yi(.8,12),Wi());s.rotation.x=-Math.PI/2,s.position.y=.35,i.add(s);for(const a of[-1,1]){const c=new K(new He(.14,2,.14),ln(5914918));c.position.set(a*.8,1.6,0),i.add(c)}const r=new K(new Wn(1.35,.7,4),ln(5913122,.9));r.rotation.y=Math.PI/4,r.position.y=2.85,i.add(r);const o=new K(new At(.18,.14,.3,8),ln(5914918));return o.position.set(0,1.6,0),i.add(o),i}function Xw(){const i=new tt,e=new K(new At(.07,.09,3,8),Fn());e.position.y=1.5,i.add(e);const t=new K(new He(.36,.5,.36),new rt({color:2761752,emissive:16756816,emissiveIntensity:1,roughness:.6}));t.position.y=3.05,i.add(t);const n=new K(new Wn(.3,.25,4),Fn());n.position.y=3.42,i.add(n);const s=new Zt(16760944,6,11,2);return s.position.y=3.05,i.add(s),i}function qw(i){const e=new tt,t=i===0?1.5:2.4,n=new K(new At(.16,.26,t,7),new rt({color:5915430,roughness:1}));n.position.y=t/2,e.add(n);const s=[4156210,4880952,3498028],r=i===0?2:3;for(let o=0;o<r;o++){const a=(i===0?1.5:2.1)*(1-o*.24),c=new K(new hh(a,0),new rt({color:s[o%s.length],roughness:1,flatShading:!0}));c.position.set((o-1)*.22,t+o*a*.72,o%2?.18:-.18),c.rotation.set(o,o*1.7,0),e.add(c)}return e}function Kf(){const i=new tt,e=new K(new He(.7,.7,.7),ln(6965802,.95));e.position.y=.35,i.add(e);for(const t of[.12,.58]){const n=new K(new He(.74,.06,.74),ln(3811866));n.position.y=t,i.add(n)}return i}function Yw(){const i=new tt,e=Sn(),t=new K(new Ot(3,3),Wi());t.rotation.x=-Math.PI/2,t.position.set(0,.04,0),i.add(t);for(const[s,r]of[[1,0],[-1,0],[0,1],[0,-1]]){const o=new K(new He(s===0?3.4:.28,.26,r===0?3.4:.28),e);o.position.set(s*1.56,.13,r*1.56),i.add(o)}for(let s=0;s<5;s++){const r=.34-s*.055,o=new K(new He(2.5,r,.5),e);o.position.set(0,r/2+.04,-1.15+s*.5),i.add(o)}const n=new Zt(10469631,7,9,2);return n.position.set(0,1,0),i.add(n),i}function $w(){const i=new tt,e=new rt({color:7162419,roughness:.85,metalness:.05}),t=[[.03,0],[.17,.02],[.25,.22],[.29,.46],[.23,.7],[.14,.8],[.18,.9],[.16,.96]],n=new K(new uh(t.map(([r,o])=>new oe(r,o)),14),e);i.add(n);const s=new K(new Yt(.17,.02,6,14),e);return s.rotation.x=Math.PI/2,s.position.y=.96,i.add(s),i}function Kw(){const i=new tt,e=new rt({color:4863778,roughness:.85,metalness:.03}),t=new K(new At(.3,.3,.82,12),e);t.position.y=.41,i.add(t);for(const s of[.12,.41,.7]){const r=new K(new Yt(.3,.022,6,14),Fn());r.rotation.x=Math.PI/2,r.position.y=s,i.add(r)}const n=new K(new Yi(.29,12),e);return n.rotation.x=-Math.PI/2,n.position.y=.82,i.add(n),i}function Jw(i=64){const e=document.createElement("canvas");e.width=e.height=i;const t=e.getContext("2d");t.clearRect(0,0,i,i),t.strokeStyle="rgba(222,228,238,0.9)",t.lineWidth=1;const n=i/2,s=i/2;for(let r=0;r<8;r++){const o=r/8*Math.PI*2;t.beginPath(),t.moveTo(n,s),t.lineTo(n+Math.cos(o)*i*.5,s+Math.sin(o)*i*.5),t.stroke()}for(let r=i*.09;r<i*.5;r+=i*.085)t.beginPath(),t.arc(n,s,r,0,Math.PI*2),t.stroke();return e}function Zw(){const i=new tt,e=new vn({map:ti(Jw(64)),transparent:!0,opacity:.4,depthWrite:!1,side:Vn,toneMapped:!1});for(let t=0;t<3;t++){const n=new K(new Ot(1.3,1.3),e);n.rotation.set(-Math.PI/2+.35,t*1.1,0),n.position.set(0,3.9-t*.18,0),i.add(n)}return i}function jw(){const i=new tt,e=Fn();for(const t of[-.32,.32]){for(let s=0;s<7;s++){const r=new K(new Yt(.07,.018,5,8),e);r.rotation.y=s%2===0?0:Math.PI/2,r.position.set(t,4.4-s*.13,0),i.add(r)}const n=new K(new Yt(.1,.02,6,10),e);n.position.set(t,3.42,0),i.add(n)}return i}function _p(i,e,t,n){const s=new ma,r=t-n;return s.moveTo(i-n,e),s.lineTo(i-n,r),s.absarc(i,r,n,Math.PI,0,!0),s.lineTo(i+n,e),s.closePath(),s}function Jf(i,e,t,n){const s=new Kr;s.moveTo(0,0),s.lineTo(i,0),s.lineTo(i,e),s.lineTo(0,e),s.closePath();const r=i/t,o=r*.6,a=.85,c=e-1,l=o/2;for(let u=0;u<t;u++)s.holes.push(_p(r*(u+.5),a,c,l));const h=new Aa(s,{depth:n,bevelEnabled:!1,curveSegments:12});return h.computeVertexNormals(),Bs(h)}function Qw(i){const e=new Rd(new th({map:i,color:16756832,blending:as,depthWrite:!1,transparent:!0,toneMapped:!1}));return e.scale.set(.5,.72,1),e}class eb{constructor(e,t){this.canvas=e,this.grid=t,this.scene=new wd,this.flames=[],this.rats=[],this.blocks=new Set,this.doorMeshes=new Map,this.exitCell=null,this.exitCell2=null,this.shops=[],this.kind="dungeon",this.radius=.42,this.stepTween=null,this.turnTween=null,this.dust=null,this.dustPos=null,this.shaft=null,this.pos=new B(0,1.62,5),this.yaw=0,this.t=0,this.ready=!1,this.lastW=-1,this.lastH=-1,this.gcs=3.4,this.lightPool=[],this.playerLight=null,this.props=[],this.renderer=new tp({canvas:e,antialias:!0,powerPreference:"high-performance"}),this.renderer.outputColorSpace=Pt,this.renderer.toneMapping=ba,this.renderer.toneMappingExposure=1.06,this.renderer.setPixelRatio(Math.min(window.devicePixelRatio||1,1.25)),this.camera=new jt(70,16/9,.05,200),this.grid&&this.placeAtStart(this.grid),this.applyPoseParam(),this.camera.position.copy(this.pos),this.scene.fog=new ua(329484,.032),this.scene.background=new Ne(263434),this.composer=new Oy(this.renderer),this.composer.addPass(new By(this.scene,this.camera));const n=new ir(new oe(1024,576),.55,.55,.82);this.composer.addPass(n),this.composer.addPass(new zy),this.build();for(let s=0;s<14;s++){const r=new Zt(16754784,0,6.5,2);this.scene.add(r),this.lightPool.push(r)}this.grid&&(this.playerLight=new Zt(16769200,2.8,9,2),this.scene.add(this.playerLight)),this.ready=!0}applyPoseParam(){const e=new URLSearchParams(location.search).get("pose");if(e&&this.grid){const t=e.split(",").map(Number);Number.isFinite(t[0])&&Number.isFinite(t[1])&&this.pos.set(t[0]*this.gcs,1.62,t[1]*this.gcs),Number.isFinite(t[2])&&(this.yaw=Pl[(t[2]%4+4)%4])}}placeAtStart(e){const t=e.start;this.pos.set(t.x*this.gcs,1.62,t.y*this.gcs);const n=(c,l)=>c>=0&&l>=0&&c<e.w&&l<e.h&&e.tiles[l*e.w+c]!==Qt,s=(c,l)=>{let h=0;for(let u=1;u<16&&n(t.x+c*u,t.y+l*u);u++)h++;return h};let r=t.dir;const o=Dn[r];if(n(t.x+o.x,t.y+o.y)){this.yaw=Pl[r];return}let a=-1;for(let c=0;c<4;c++){const l=Dn[c],h=s(l.x,l.y);h>a&&(a=h,r=c)}this.yaw=Pl[r]}reset(e){this.kind="dungeon",this.renderer.shadowMap.enabled=!1,this.gcs=3.4,this.scene.fog=new ua(329484,.032),this.scene.background=new Ne(263434),this.renderer.toneMappingExposure=1.06;for(const t of[...this.scene.children])this.scene.remove(t);this.flames=[],this.rats=[],this.blocks=new Set,this.doorMeshes=new Map,this.exitCell=null,this.exitCell2=null,this.props=[],this.stepTween=null,this.turnTween=null,this.dust=null,this.dustPos=null,this.shaft=null,this.lightPool=[],this.playerLight=null,this.grid=e,this.placeAtStart(e),this.build();for(let t=0;t<14;t++){const n=new Zt(16754784,0,6.5,2);this.scene.add(n),this.lightPool.push(n)}this.playerLight=new Zt(16769200,2.8,9,2),this.scene.add(this.playerLight)}cell(){return[Math.round(this.pos.x/this.gcs),Math.round(this.pos.z/this.gcs)]}exit(){return this.exitCell}exitAt(e,t){return this.exitCell&&this.exitCell[0]===e&&this.exitCell[1]===t?"map":this.exitCell2&&this.exitCell2[0]===e&&this.exitCell2[1]===t?"dungeon":null}isTown(){return this.kind==="town"}nearestShop(e,t){let n=null,s=99;for(const r of this.shops){const o=Math.abs(r.gx-e)+Math.abs(r.gy-t);o<s&&(s=o,n=r)}return s<=2?n:null}loadTown(e){for(const t of[...this.scene.children])this.scene.remove(t);this.kind="town",this.gcs=4,this.flames=[],this.rats=[],this.blocks=new Set,this.doorMeshes=new Map,this.exitCell=null,this.exitCell2=null,this.shops=[],this.props=[],this.stepTween=null,this.turnTween=null,this.dust=null,this.dustPos=null,this.shaft=null,this.lightPool=[],this.playerLight=null,this.grid=e,this.placeAtStart(e),this.applyPoseParam(),this.buildTown(e)}blockRect(e,t,n,s){const r=this.grid;if(!r)return;const o=this.gcs,a=Math.round((e*o-n)/o),c=Math.round((e*o+n)/o),l=Math.round((t*o-s)/o),h=Math.round((t*o+s)/o);for(let u=l;u<=h;u++)for(let f=a;f<=c;f++)f<0||u<0||f>=r.w||u>=r.h||this.blocks.add(u*r.w+f)}buildTown(e){const t=this.gcs,n=(e.w-1)*t;this.scene.fog=new eh(12374762,90,300),this.scene.background=new Ne(10471146),this.renderer.toneMappingExposure=.98,this.renderer.shadowMap.enabled=!0,this.renderer.shadowMap.type=od;const s=new rt({map:ft("cobblestone_floor_08_Diffuse.jpg",!0,e.w*t/4,e.h*t/4),normalMap:ft("cobblestone_floor_08_nor_gl.jpg",!1,e.w*t/4,e.h*t/4),roughnessMap:ft("cobblestone_floor_08_Rough.jpg",!1,e.w*t/4,e.h*t/4),aoMap:ft("cobblestone_floor_08_AO.jpg",!1,e.w*t/4,e.h*t/4),aoMapIntensity:.75,roughness:1,metalness:0,color:11709340}),r=new Ot(e.w*t,e.h*t).rotateX(-Math.PI/2);Bs(r);const o=new K(r,s);o.position.set(n/2,.01,n/2),o.receiveShadow=!0,this.scene.add(o);const a=new K(new Ot(e.w*t+160,e.h*t+160).rotateX(-Math.PI/2),new rt({color:5073716,roughness:1}));a.position.set(n/2,-.02,n/2),this.scene.add(a);const c=new K(new Yi(15,40).rotateX(-Math.PI/2),new rt({color:3108755,roughness:.18,metalness:.35,transparent:!0,opacity:.92}));c.position.set(n/2+50,.05,n/2+50),this.scene.add(c),this.scene.add(new Qo(11124952,.35)),this.scene.add(new ul(13624575,6048302,.55));const l=new no(16773328,1.7);l.position.set(n-70,120,n-90),l.target.position.set(n/2,0,n/2),l.castShadow=!0,l.shadow.mapSize.set(2048,2048);const h=l.shadow.camera,u=110;h.left=-u,h.right=u,h.top=u,h.bottom=-u,h.near=1,h.far=400,l.shadow.bias=-6e-4,l.shadow.normalBias=.6,this.scene.add(l),this.scene.add(l.target);const f=(p,_,g,m)=>{p.position.set(_*t,0,g*t),p.rotation.y=m,this.scene.add(p)},d={inn_hd:[5.1,4.8],tavern_hd:[4.4,4.15],blacksmith_open_forge_hd:[4.8,3.8],magic_library_shop_hd:[4.8,4.2],general_store_hd:[3.75,3.9],house_large_hd:[4.4,3.9],house_medium_hd:[3.75,3.5],house_small_hd:[3.1,3.3],food_stall_hd:[2.4,1.9],merchant_stall_hd:[2.4,1.9],cloth_stall_hd:[2.4,1.9],potion_stall_hd:[2.4,1.9],weapon_stall_hd:[2.4,1.9],accessories_stall_hd:[2.4,1.9],fruit_vegetable_stall_hd:[2.4,1.9],grand_royal_fountain_hd:[3,3],round_watchtower_hd:[2.3,2.3],crate_stack:[1,.8],barrel_cluster:[1,.8],cart:[1,.8],hay_bale:[1,.8],wood_fence:[1,.8],tree_small:[.5,.5],tree_large:[.6,.6]};for(const p of e.decor??[]){const _=p.rot??0,g=p.model??"",m=p.x*t,M=p.y*t,b=g?BS(g)??NS(g):null;if(b)f(b,p.x,p.y,_);else if(g==="tree_small"||g==="tree_large")f(qw(g==="tree_small"?0:1),p.x,p.y,_);else if(p.kind==="inn")f($f(7,6,4.5,15260864,8010282),p.x,p.y,_);else if(p.kind==="blacksmith")f($f(5.5,5,3.8,9075304,4864554),p.x,p.y,_);else if(p.kind==="magician")f(Gw(5913226),p.x,p.y,_);else if(p.kind==="stall")f(Vw([11024954,3828282,3100554,12092975][(p.x+p.y)%4]),p.x,p.y,_);else if(p.kind==="well")f(Ww(),p.x,p.y,_);else if(p.kind==="lamp")f(Xw(),p.x,p.y,_);else if(p.kind==="crate")f(Kf(),p.x,p.y,_);else if(p.kind==="wall"){const S=new K(new He(t*2,3,.6),Sn());f(S,p.x,p.y,_)}else p.kind==="prop"&&f(Kf(),p.x,p.y,_);const v=d[g];if(v){const S=Math.abs(Math.cos(_))>.5;this.blockRect(p.x,p.y,S?v[0]:v[1],S?v[1]:v[0])}const w=Math.atan2(n/2-m,M-n/2);if(p.kind==="inn"&&g){const S=Il(g==="inn_hd"?"INN":"TAVERN");S.position.set(m+Math.sin(w)*6.4,3.2,M+Math.cos(w)*6.4),S.rotation.y=w,this.scene.add(S)}if(p.kind==="blacksmith"){const S=Il("SMITH");S.position.set(m+Math.sin(w)*6,3.2,M+Math.cos(w)*6),S.rotation.y=w,this.scene.add(S);const T=new Zt(16734750,9,14,2);T.position.set(m+Math.sin(w)*5,1.6,M+Math.cos(w)*5),this.scene.add(T);const x=new K(new He(.7,.24,.34),Fn());x.position.set(m+Math.sin(w)*6.2+.9,.7,M+Math.cos(w)*6.2),x.castShadow=!0,this.scene.add(x);const R=new K(new At(.32,.36,.6,10),Pa());R.position.set(x.position.x,.3,x.position.z),this.scene.add(R)}if(p.kind==="magician"){const S=Il("MAGE");S.position.set(m+Math.sin(w)*6,3.4,M+Math.cos(w)*6),S.rotation.y=w,this.scene.add(S);const T=new Zt(10115839,9,14,2);T.position.set(m+Math.sin(w)*5.2,2.2,M+Math.cos(w)*5.2),this.scene.add(T);const x=new rt({color:9067775,emissive:6962431,emissiveIntensity:1.2,roughness:.3,metalness:.1});for(const[R,D,P]of[[1.6,.6,1],[2,-.5,.7],[1.2,-1.4,.85]]){const F=new K(new Wn(.28*P,1.2*P,6),x);F.position.set(m+Math.sin(w)*5.4+R,.6*P,M+Math.cos(w)*5.4+D),F.castShadow=!0,this.scene.add(F)}}if(p.kind==="lamp"){const S=new Zt(16760944,4.5,14,2);S.position.set(m,3.1,M),this.scene.add(S)}(p.kind==="inn"||p.kind==="blacksmith"||p.kind==="magician"||p.kind==="stall"||p.kind==="well")&&this.shops.push({kind:p.kind,gx:p.x,gy:p.y,name:g})}for(let p=0;p<e.h;p++)for(let _=0;_<e.w;_++){const g=e.tiles[p*e.w+_];g===ns?this.exitCell=[_,p]:g===Tr&&(this.exitCell2=[_,p])}}takeAt(e,t){const n=this.props.findIndex(r=>r.gx===e&&r.gy===t);if(n<0)return null;const s=this.props[n];return s.obj.removeFromParent(),this.props.splice(n,1),(s.type==="chest"||s.type==="key")&&this.grid&&(this.grid.tiles[s.gy*this.grid.w+s.gx]=0),s.type}build(){if(this.grid){this.buildGrid(this.grid);return}const e=new rt({map:ft("rustic_stone_wall_Diffuse.jpg",!0,.5,.5),normalMap:ft("rustic_stone_wall_nor_gl.jpg",!1,.5,.5),roughnessMap:ft("rustic_stone_wall_Rough.jpg",!1,.5,.5),aoMap:ft("rustic_stone_wall_AO.jpg",!1,.5,.5),aoMapIntensity:1.1,roughness:1,metalness:0,color:13028822}),t=new rt({map:ft("rustic_stone_wall_Diffuse.jpg",!0,.9,.9),normalMap:ft("rustic_stone_wall_nor_gl.jpg",!1,.9,.9),roughnessMap:ft("rustic_stone_wall_Rough.jpg",!1,.9,.9),aoMap:ft("rustic_stone_wall_AO.jpg",!1,.9,.9),aoMapIntensity:1,roughness:1,metalness:0,color:12169892}),n=new rt({map:ft("cobblestone_floor_08_Diffuse.jpg",!0,An/2.4,Rn/2.4),normalMap:ft("cobblestone_floor_08_nor_gl.jpg",!1,An/2.4,Rn/2.4),roughnessMap:ft("cobblestone_floor_08_Rough.jpg",!1,An/2.4,Rn/2.4),aoMap:ft("cobblestone_floor_08_AO.jpg",!1,An/2.4,Rn/2.4),aoMapIntensity:1,roughness:1,metalness:0}),s=new rt({map:ft("rustic_stone_wall_Diffuse.jpg",!0,.7,.7),normalMap:ft("rustic_stone_wall_nor_gl.jpg",!1,.7,.7),roughnessMap:ft("rustic_stone_wall_Rough.jpg",!1,.7,.7),aoMap:ft("rustic_stone_wall_AO.jpg",!1,.7,.7),roughness:1,metalness:0,color:7236192}),r=new rt({color:854793,roughness:1}),o=new rt({color:1315088,roughness:.55,metalness:.75}),a=new tt;this.scene.add(a);const c=new K(Bs(new Ot(An,Rn)),n);c.rotation.x=-Math.PI/2,c.position.set(0,0,(Hn+Zn)/2),a.add(c);const l=new Kr;l.moveTo(0,0),l.lineTo(An,0),l.lineTo(An,Rn),l.lineTo(0,Rn),l.closePath();const h=new ma,u=sn-1,f=sn+1,d=Hn-(yi+1.4),p=Hn-(yi-1.4);h.moveTo(u,d),h.lineTo(f,d),h.lineTo(f,p),h.lineTo(u,p),h.closePath(),l.holes.push(h);const _=new K(Bs(new fh(l,12)),s);_.rotation.x=-Math.PI/2,_.position.set(-sn,rn,Hn),a.add(_);const g=1.1,m=new rt({map:ft("rustic_stone_wall_Diffuse.jpg",!0,.8,.5),normalMap:ft("rustic_stone_wall_nor_gl.jpg",!1,.8,.5),roughness:1,metalness:0,color:14410990,emissive:2240575,emissiveIntensity:1}),M=(N,U,k,V)=>{const ee=new K(new Ot(N,g),m);return ee.position.set(U,rn+g/2,k),ee.rotation.y=V,ee};a.add(M(2.8,1,yi,-Math.PI/2)),a.add(M(2.8,-1,yi,Math.PI/2)),a.add(M(2,0,yi+1.4,Math.PI)),a.add(M(2,0,yi-1.4,0));const b=new K(new Ot(2,2.8),new vn({map:ti(Ic(256)),toneMapped:!1}));b.rotation.x=Math.PI/2,b.position.set(0,rn+g-.02,yi),a.add(b),this.shaft=null;const v=new K(Jf(Rn,rn,Pr,.45),e);v.rotation.y=-Math.PI/2,v.position.set(-sn,0,Zn),a.add(v);const w=new K(Jf(Rn,rn,Pr,.45),e);w.rotation.y=Math.PI/2,w.position.set(sn,0,Hn),a.add(w);for(const N of[-1,1]){const U=new K(new Ot(Rn,rn),r);U.rotation.y=N<0?Math.PI/2:-Math.PI/2,U.position.set(N*(sn+.62),rn/2,(Hn+Zn)/2),a.add(U)}const S=Bs(new Yt(sn,.15,10,52,Math.PI));for(let N=1;N<Pr;N++){const U=new K(S,t);U.position.set(0,rn-sn,Hn-N*Cl),U.scale.set(1,1,1.7),a.add(U)}const T=new Kr;T.moveTo(0,0),T.lineTo(An,0),T.lineTo(An,rn),T.lineTo(0,rn),T.closePath(),T.holes.push(_p(sn,0,2.9,.82));const x=new K(Bs(new Aa(T,{depth:.45,bevelEnabled:!1,curveSegments:14})),e);x.position.set(-sn,0,Zn-.45),a.add(x);const R=new K(new Ot(An,rn),r);R.position.set(0,rn/2,Zn-.7),a.add(R);const D=ti(qf(128));for(let N=0;N<=Pr;N++){const U=N%2===0?-1:1,k=Hn-N*Cl+Cl/2;if(k>Hn-.4||k<Zn+1)continue;const V=new K(new At(.03,.03,.32,6),o);V.rotation.z=Math.PI/2,V.position.set(U*(sn-.15),2.62,k),a.add(V);const ee=new K(new At(.09,.055,.15,8),o);ee.position.set(U*(sn-.28),2.72,k),a.add(ee);const re=new Rd(new th({map:D,color:16756832,blending:as,depthWrite:!1,transparent:!0,toneMapped:!1}));re.scale.set(.5,.72,1),re.position.set(U*(sn-.28),2.86,k),a.add(re),this.flames.push({sprite:re,phase:N*1.7,x:U*(sn-.4),y:2.86,z:k,ly:2.86})}const P=new Zt(16751957,6,6.5,2);P.position.set(0,2,Zn+.4),a.add(P);const F=new Zt(12375295,34,20,2);F.position.set(0,rn+2.6,yi),a.add(F);const A=new no(10468607,1.5);A.position.set(1.2,12,2),A.target.position.set(0,0,yi),a.add(A),a.add(A.target),this.scene.add(new Qo(2371648,.6)),this.scene.add(new ul(2832978,460298,.3));const I=500,O=new Float32Array(I*3);for(let N=0;N<I;N++)O[N*3]=(Math.random()-.5)*An*.95,O[N*3+1]=.2+Math.random()*(rn-.6),O[N*3+2]=Zn+Math.random()*Rn;this.dustPos=O;const H=new Mt;H.setAttribute("position",new qt(O,3));const C=new Ys(H,new Vi({map:ti(Yf(32)),color:16770224,size:.028,transparent:!0,opacity:.35,blending:as,depthWrite:!1,sizeAttenuation:!0,toneMapped:!1}));this.dust=C,this.scene.add(C)}buildGrid(e){const t=this.gcs,n=4.8,s=(A,I)=>A<0||I<0||A>=e.w||I>=e.h||e.tiles[I*e.w+A]===Qt,r=new rt({map:ft("rustic_stone_wall_Diffuse.jpg",!0,t/2.4,n/2.4),normalMap:ft("rustic_stone_wall_nor_gl.jpg",!1,t/2.4,n/2.4),roughnessMap:ft("rustic_stone_wall_Rough.jpg",!1,t/2.4,n/2.4),aoMap:ft("rustic_stone_wall_AO.jpg",!1,t/2.4,n/2.4),aoMapIntensity:1.1,roughness:1,metalness:0,color:13028822}),o=new rt({map:ft("cobblestone_floor_08_Diffuse.jpg",!0,t/2.4,t/2.4),normalMap:ft("cobblestone_floor_08_nor_gl.jpg",!1,t/2.4,t/2.4),roughnessMap:ft("cobblestone_floor_08_Rough.jpg",!1,t/2.4,t/2.4),aoMap:ft("cobblestone_floor_08_AO.jpg",!1,t/2.4,t/2.4),aoMapIntensity:1,roughness:1,metalness:0}),a=new rt({map:ft("rustic_stone_wall_Diffuse.jpg",!0,t/2.4,t/2.4),normalMap:ft("rustic_stone_wall_nor_gl.jpg",!1,t/2.4,t/2.4),roughness:1,metalness:0,color:7236192}),c=[],l=[],h=[],u=new Set((e.sky??[]).map(A=>A.y*e.w+A.x));for(let A=0;A<e.h;A++)for(let I=0;I<e.w;I++){if(s(I,A))continue;const O=I*t,H=A*t;l.push(new Ot(t,t).rotateX(-Math.PI/2).translate(O,0,H)),u.has(A*e.w+I)||h.push(new Ot(t,t).rotateX(Math.PI/2).translate(O,n,H));const C=[[1,0],[-1,0],[0,1],[0,-1]];for(const[N,U]of C){if(!s(I+N,A+U))continue;const k=new Ot(t,n);N===1?k.rotateY(-Math.PI/2):N===-1?k.rotateY(Math.PI/2):U===1&&k.rotateY(Math.PI),k.translate(O+N*t/2,n/2,H+U*t/2),c.push(k)}}const f=new tt,d=(A,I)=>{if(!A.length)return;const O=Hy(A,!1);if(!O)return;const H=O.getAttribute("uv");H&&!O.getAttribute("uv1")&&O.setAttribute("uv1",H),f.add(new K(O,I))};d(l,o),d(h,a),d(c,r),this.scene.add(f);const p=new Yt(t/2,.14,8,20,Math.PI),_=new rt({map:ft("rustic_stone_wall_Diffuse.jpg",!0,.8,.8),normalMap:ft("rustic_stone_wall_nor_gl.jpg",!1,.8,.8),roughness:1,metalness:0,color:12433064}),g=[],m=new Set;for(const A of e.lights??[])m.add(A.y*e.w+A.x);for(let A=0;A<e.h;A++)for(let I=0;I<e.w;I++){if(s(I,A))continue;const O=!s(I,A-1),H=!s(I,A+1),C=!s(I+1,A),N=!s(I-1,A),U=A*e.w+I;O&&H&&!(C&&N)&&m.has(U)?g.push({x:I*t,z:A*t,rot:0}):C&&N&&!(O&&H)&&m.has(U)&&g.push({x:I*t,z:A*t,rot:Math.PI/2})}if(g.length){const A=new Pd(p,_,g.length),I=new Qe,O=new hi,H=new ci,C=new B,N=new B(1,1,1.8);g.forEach((U,k)=>{H.set(0,U.rot,0),O.setFromEuler(H),C.set(U.x,n-t/2,U.z),I.compose(C,O,N),A.setMatrixAt(k,I)}),A.instanceMatrix.needsUpdate=!0,f.add(A)}for(const A of e.sky??[]){const I=A.x*t,O=A.y*t,H=new K(new Ot(t,t),new vn({map:ti(Ic(128)),toneMapped:!1}));H.rotation.x=Math.PI/2,H.position.set(I,n+.9,O),f.add(H);const C=new Zt(12375295,30,18,2);C.position.set(I,n+.4,O),f.add(C)}const M=ti(qf(128));let b=0;for(const A of e.lights??[]){const I=A.x+A.dx,O=A.y+A.dy,H=e.tiles[A.y*e.w+A.x],C=I>=0&&O>=0&&I<e.w&&O<e.h?e.tiles[O*e.w+I]:Qt;if(H===ns||H===Tr||C===ns||C===Tr)continue;const N=A.x*t+A.dx*(t/2-.02),U=A.y*t+A.dy*(t/2-.02),k=Cw();k.position.set(N,1.72,U),k.rotation.y=Math.atan2(A.dx,A.dy);const V=k.userData.flame,ee=Qw(M);ee.position.set(V.x,V.y,V.z),k.add(ee),f.add(k);const re=new B;k.updateMatrixWorld(!0),ee.getWorldPosition(re),this.flames.push({sprite:ee,phase:b*1.7,x:re.x,y:re.y,z:re.z,ly:V.y}),b++}const v=new rt({color:4863264,roughness:.7,metalness:.1}),w=new rt({color:13214282,roughness:.35,metalness:.9}),S=(A,I)=>I*e.w+A,T=(A,I)=>A<0||I<0||A>=e.w||I>=e.h||os(e.tiles[S(A,I)]),x=(A,I)=>{const O=!T(A,I-1)||!T(A,I+1),H=!T(A+1,I)||!T(A-1,I);return O&&!H?0:H&&!O?Math.PI/2:0},R=[];for(let A=0;A<e.h;A++)for(let I=0;I<e.w;I++){const O=e.tiles[S(I,A)],H=I*t,C=A*t;if(O===Gs){const N=new tt,U=new K(new He(.8,.5,.55),v);U.position.y=.25,N.add(U);const k=new K(new He(.84,.18,.6),v);k.position.y=.56,N.add(k);for(const V of[-.16,.16]){const ee=new K(new He(.86,.54,.06),w);ee.position.set(0,.28,V),N.add(ee)}N.rotation.y=(I*1.7+A*2.3)%Math.PI,N.position.set(H,0,C),f.add(N),this.props.push({obj:N,gx:I,gy:A,type:"chest"})}else if(O===Sa){const N=Yw();N.position.set(H,0,C),f.add(N),this.props.push({obj:N,gx:I,gy:A,type:"stairs"})}else if(O===Dc){const N=Ow();N.position.set(H,.9,C),f.add(N),this.props.push({obj:N,gx:I,gy:A,type:"key"})}else if(O===wa){const N=Dw(t-.1);N.position.set(H,0,C),N.rotation.y=x(I,A),f.add(N)}else if(O===rs){const N=Fw();N.position.set(H,0,C),N.rotation.y=x(I,A),f.add(N),this.doorMeshes.set(S(I,A),N)}else if(O===Ws){const N=kw();N.position.set(H,0,C),N.rotation.y=x(I,A),f.add(N),this.doorMeshes.set(S(I,A),N)}else if(O===ns||O===Tr){const N=zw();N.position.set(H,0,C),N.rotation.y=Math.atan2(e.start.x-I,e.start.y-A),f.add(N),O===ns?this.exitCell=[I,A]:this.exitCell2=[I,A]}}for(const A of e.decor??[]){const I=A.x*t,O=A.y*t;if(A.kind==="fountain"){const H=Pw();H.position.set(I,0,O),f.add(H),this.blocks.add(S(A.x,A.y))}else if(A.kind==="table"){const H=Iw();H.position.set(I,0,O),H.rotation.y=(A.x*1.3+A.y)%Math.PI,f.add(H),this.blocks.add(S(A.x,A.y))}else if(A.kind==="gargoyle"){const H=CS(A.x*3+A.y);if(H)H.scale.setScalar(.66),H.position.set(I,0,O),H.rotation.y=Math.atan2(-A.y+e.h/2,-A.x+e.w/2),f.add(H);else{const C=mp();C.position.set(I,0,O),C.rotation.y=Math.atan2(-A.y+e.h/2,-A.x+e.w/2),f.add(C)}this.blocks.add(S(A.x,A.y))}else if(A.kind==="skeleton"){const H=Bw();H.position.set(I,0,O),H.rotation.y=(A.x*2.1+A.y*3.7)%(Math.PI*2),f.add(H)}else if(A.kind==="map"){const H=A.x*t+A.dx*(t/2-.05),C=A.y*t+A.dy*(t/2-.05),N=Nw();N.position.set(H,2.1,C),N.rotation.y=Math.atan2(A.dx,A.dy),f.add(N)}else if(A.kind==="grate"){const H=A.x*t+A.dx*(t/2-.06),C=A.y*t+A.dy*(t/2-.06),N=Uw();N.position.set(H,2.3,C),N.rotation.y=Math.atan2(A.dx,A.dy),f.add(N)}else if(A.kind==="rat")R.push({x:I,z:O});else if(A.kind==="urn"||A.kind==="barrel"){const H=A.kind==="urn"?$w():Kw();H.position.set(I,0,O),H.rotation.y=(A.x*.7+A.y*1.9)%Math.PI,f.add(H),this.blocks.add(S(A.x,A.y))}else if(A.kind==="web"){const H=Zw();H.position.set(I,0,O),H.rotation.y=(A.x+A.y)%Math.PI,f.add(H)}else if(A.kind==="chain"){const H=jw();H.position.set(I,0,O),f.add(H)}}for(const A of R){const I=Hw(),O=Math.random()*Math.PI*2;I.position.set(A.x,0,A.z),I.rotation.y=O,f.add(I),this.rats.push({obj:I,hx:A.x,hz:A.z,tx:A.x,tz:A.z,speed:.9+Math.random()*.7,phase:Math.random()*10})}this.scene.add(new Qo(2371648,.6)),this.scene.add(new ul(2832978,460298,.3));const D=600,P=new Float32Array(D*3);for(let A=0;A<D;A++)P[A*3]=Math.random()*e.w*t,P[A*3+1]=.2+Math.random()*4,P[A*3+2]=Math.random()*e.h*t;this.dustPos=P;const F=new Mt;F.setAttribute("position",new qt(P,3)),this.dust=new Ys(F,new Vi({map:ti(Yf(32)),color:16770224,size:.03,transparent:!0,opacity:.35,blending:as,depthWrite:!1,sizeAttenuation:!0,toneMapped:!1})),this.scene.add(this.dust)}canStand(e,t){const n=this.grid;if(!n)return!0;const s=this.radius,r=[[0,0],[-s,-s],[s,-s],[-s,s],[s,s],[-s,0],[s,0],[0,-s],[0,s]];for(const[o,a]of r){const c=Math.round((e+o)/this.gcs),l=Math.round((t+a)/this.gcs);if(c<0||l<0||c>=n.w||l>=n.h)return!1;const h=l*n.w+c;if(os(n.tiles[h])||this.blocks.has(h))return!1}return!0}layout(e,t={x:0,y:0,w:384,h:216}){const n=e.getBoundingClientRect(),s=n.width/384,r=n.height/216,o=n.left+t.x*s,a=n.top+t.y*r,c=t.w*s,l=t.h*r,h=this.canvas.style;h.left=`${o}px`,h.top=`${a}px`,h.width=`${c}px`,h.height=`${l}px`;const u=Math.min(window.devicePixelRatio||1,1.25);(c!==this.lastW||l!==this.lastH)&&(this.lastW=c,this.lastH=l,this.renderer.setPixelRatio(u),this.renderer.setSize(c,l,!1),this.composer.setPixelRatio(u),this.composer.setSize(c,l),this.camera.aspect=c/l,this.camera.updateProjectionMatrix())}update(e,t){this.t+=e;const n=.24,s=.16;let r=0;if(this.turnTween){this.turnTween.t+=e;const h=Math.min(1,this.turnTween.t/this.turnTween.dur),u=h*h*(3-2*h);this.yaw=this.turnTween.from+(this.turnTween.to-this.turnTween.from)*u,h>=1&&(this.yaw=this.turnTween.to,this.turnTween=null)}else if(this.stepTween){this.stepTween.t+=e;const h=Math.min(1,this.stepTween.t/this.stepTween.dur),u=h*h*(3-2*h);this.pos.x=this.stepTween.fx+(this.stepTween.tx-this.stepTween.fx)*u,this.pos.z=this.stepTween.fz+(this.stepTween.tz-this.stepTween.fz)*u,h>=1&&(this.pos.x=this.stepTween.tx,this.pos.z=this.stepTween.tz,this.stepTween=null,r=this.gcs)}else if(t.held("left"))this.turnTween={from:this.yaw,to:this.yaw+Math.PI/2,t:0,dur:s};else if(t.held("right"))this.turnTween={from:this.yaw,to:this.yaw-Math.PI/2,t:0,dur:s};else{const h=t.held("up")?1:t.held("down")?-1:0;if(h!==0){const u=-Math.sin(this.yaw),f=-Math.cos(this.yaw),d=this.pos.x+u*this.gcs*h,p=this.pos.z+f*this.gcs*h;(!this.grid||this.canStand(d,p))&&(this.stepTween={fx:this.pos.x,fz:this.pos.z,tx:d,tz:p,t:0,dur:n})}}const o=this.stepTween?.03*Math.sin(Math.min(1,this.stepTween.t/this.stepTween.dur)*Math.PI):0;if(!this.grid){const h=sn-.55;this.pos.x=Math.max(-h,Math.min(h,this.pos.x)),this.pos.z=Math.max(Zn+1.4,Math.min(Hn-.6,this.pos.z))}this.camera.position.set(this.pos.x,1.62+o,this.pos.z),this.camera.rotation.set(0,this.yaw,0);const a=this.pos.x,c=this.pos.z,l=this.flames.map((h,u)=>({f:h,idx:u,d2:(h.x-a)**2+(h.z-c)**2})).sort((h,u)=>h.d2-u.d2);for(let h=0;h<this.lightPool.length;h++){const u=this.lightPool[h];if(h<l.length){const f=l[h].f,d=.78+.22*Math.sin(this.t*15+f.phase)+.1*Math.sin(this.t*37+f.phase*2.1);u.position.set(f.x,f.y,f.z),u.intensity=12*d}else u.intensity=0}for(const h of this.flames){const f=.38+.07*(.78+.22*Math.sin(this.t*15+h.phase)+.1*Math.sin(this.t*37+h.phase*2.1));h.sprite.scale.set(f,f*1.45,1),h.sprite.position.y=h.ly+.02*Math.sin(this.t*21+h.phase),h.sprite.visible=(h.x-a)**2+(h.z-c)**2<900}if(this.dustPos&&this.dust){const h=this.dustPos;for(let u=0;u<h.length;u+=3)h[u+1]+=e*.035*(.5+u%7/7),h[u]+=e*.02*Math.sin(this.t*.4+u),h[u+1]>rn-.3&&(h[u+1]=.25);this.dust.geometry.getAttribute("position").needsUpdate=!0}if(this.shaft){const h=this.shaft.material;h.opacity=.022+.012*(.5+.5*Math.sin(this.t*.7))}return this.playerLight&&this.playerLight.position.set(a,1.95,c),this.updateRats(e),r}walkableCell(e,t){const n=this.grid;if(!n||e<0||t<0||e>=n.w||t>=n.h)return!1;const s=t*n.w+e;return!os(n.tiles[s])&&!this.blocks.has(s)}updateRats(e){const t=this.pos.x,n=this.pos.z;for(const s of this.rats){const r=s.obj.position.x-t,o=s.obj.position.z-n,a=Math.hypot(r,o)<3.2;a&&(s.tx=s.obj.position.x+r*2,s.tz=s.obj.position.z+o*2);const c=s.tx-s.obj.position.x,l=s.tz-s.obj.position.z,h=Math.hypot(c,l);if(h<.12)for(let u=0;u<8;u++){const f=Math.round(s.hx/this.gcs)+(Math.random()*5|0)-2,d=Math.round(s.hz/this.gcs)+(Math.random()*5|0)-2;if(this.walkableCell(f,d)){s.tx=f*this.gcs,s.tz=d*this.gcs;break}}else{const u=Math.min(h,s.speed*(a?2.1:1)*e);s.obj.position.x+=c/h*u,s.obj.position.z+=l/h*u;let d=Math.atan2(c,l)-s.obj.rotation.y;for(;d>Math.PI;)d-=Math.PI*2;for(;d<-Math.PI;)d+=Math.PI*2;s.obj.rotation.y+=d*Math.min(1,e*8)}s.obj.position.y=.03*Math.abs(Math.sin(this.t*12+s.phase))}}unlock(e,t){const n=this.grid;if(!n)return!1;const s=t*n.w+e;if(n.tiles[s]!==rs&&n.tiles[s]!==Ws)return!1;n.tiles[s]=0;const r=this.doorMeshes.get(s);return r&&(r.parent?.remove(r),this.doorMeshes.delete(s)),!0}doorNeighbor(){const e=this.grid;if(!e)return null;const[t,n]=this.cell();for(const s of Dn){const r=t+s.x,o=n+s.y;if(!(r<0||o<0||r>=e.w||o>=e.h)&&(e.tiles[o*e.w+r]===rs||e.tiles[o*e.w+r]===Ws))return[r,o]}return null}heading(){return(-Math.round(this.yaw/(Math.PI/2))%4+4)%4}render(){if(this.ready){if(this.camera.position.set(this.pos.x,1.62,this.pos.z),this.camera.rotation.set(0,this.yaw,0),new URLSearchParams(location.search).get("top")==="1"&&this.grid){const e=(this.grid.w-1)*this.gcs/2,t=(this.grid.h-1)*this.gcs/2;this.camera.position.set(e,Math.max(this.grid.w,this.grid.h)*this.gcs*.8,t+.01),this.camera.lookAt(e,0,t),this.camera.updateMatrixWorld()}this.composer.render()}}}class ks{constructor(e,t){this.host=e,this.dungeon=t,this.hall=null,this.dist=0,this.nextDist=24+Math.random()*32,this.floor=1,this.seen=null,this.showMap=!1,this.enemies=!0,this.keys=0,this.revealAll=!1,this.lockedMsg="",this.world="dungeon",this.map=null,this.mapMarker=0,this.lastCell="",this.town=null,this.msg=["The Sunken Vault — B1. The air is cold and still."];const n=new URLSearchParams(location.search);n.get("map")==="1"&&(this.showMap=!0),this.revealAll=n.get("plan")==="1",n.get("scene")==="world"&&(this.world="map"),n.get("scene")==="town"&&(this.world="town",this.town=Xh(Number(n.get("seed")??12345)),this.msg=["Market Town."])}ensureHall(){if(this.hall)return;const e=document.getElementById("view");if(e)try{this.hall=new eb(e,this.dungeon),this.world==="town"&&this.town&&this.hall.loadTown(this.town)}catch(t){document.title="HALLERR "+t.message,this.hall=null}}preload(){if(this.world==="map"||(this.ensureHall(),!this.hall))return;const e=document.getElementById("c");e&&(this.hall.layout(e,pt),this.hall.render())}glRender(e,t){this.world!=="map"&&(this.ensureHall(),this.hall&&(this.showMap||(this.hall.layout(t,pt),this.hall.render())))}transition(e){this.host.setScene(new is(this.host,()=>(e(),this)))}update(e,t){if(this.world==="map"){this.updateMap(t);return}if(t.justPressed("map")&&(this.showMap=!this.showMap),t.justPressed("enemies")&&(this.enemies=!this.enemies,this.msg=[this.enemies?"Wandering foes stir again.":"The halls lie quiet — no foes."]),this.dungeon&&!this.seen&&(this.seen=new Uint8Array(this.dungeon.w*this.dungeon.h)),this.seen&&this.revealAll&&this.seen.fill(1),this.showMap){this.markSeen();return}const n=this.hall?.update(e,t)??0,s=this.hall?.isTown()??!1;if(n>0&&!s&&(this.markSeen(),this.dist+=n,this.dist>=this.nextDist&&(this.dist=0,this.nextDist=24+Math.random()*32,this.enemies))){this.startEncounter();return}if(this.hall){const[r,o]=this.hall.cell(),a=r+","+o,c=this.hall.exitAt(r,o);if(a!==this.lastCell){if(this.lastCell=a,c){c==="dungeon"?this.toDungeon():this.enterMap(s?1:0);return}if(s&&t.justPressed("confirm")&&this.townInteract(r,o),!s){const h=this.hall.takeAt(r,o);if(h==="chest")this.msg=[this.loot()];else if(h==="stairs"){this.descend();return}else h==="key"&&(this.keys++,this.msg=[`A cold iron key.  (keys ${this.keys})`])}}if(s&&t.justPressed("confirm")&&this.townInteract(r,o),s)return;const l=this.hall.doorNeighbor();if(l){const h=l[0]+","+l[1];this.keys>0?this.hall.unlock(l[0],l[1])&&(this.keys--,this.msg=["The iron door groans open."],this.lockedMsg=""):this.lockedMsg!==h&&(this.msg=["The way is barred — a key is needed."],this.lockedMsg=h)}}}markSeen(){if(!this.hall||!this.dungeon||!this.seen)return;const[e,t]=this.hall.cell(),n=4;for(let s=t-n;s<=t+n;s++)for(let r=e-n;r<=e+n;r++)r<0||s<0||r>=this.dungeon.w||s>=this.dungeon.h||(r-e)*(r-e)+(s-t)*(s-t)>n*n+3||(this.seen[s*this.dungeon.w+r]=1)}loot(){const e=Math.random();if(e<.42){const c=15+(Math.random()*45|0)+this.floor*6;return this.host.gold+=c,`A chest — ${c} gold glitters inside.`}if(e<.6)return this.host.inventory.potion=(this.host.inventory.potion??0)+1,"A flask of amber draught.";if(e<.68){const c=this.host.party[Math.random()*this.host.party.length|0];return c.atk+=1,`${c.name} finds an ember shard (+1 ATK).`}const t=Np(this.floor);let n=null,s=1/0;for(const c of this.host.party){const l=sa(c,t.kind)?.tier??0;l<s&&(s=l,n=c)}if(!n)return"The chest is empty.";const r=sa(n,t.kind);if(r&&r.tier>=t.tier)return this.host.gold+=t.value,`A ${t.name} — lesser than ${n.name}'s ${r.name}. Sold for ${t.value} gold.`;Up(n,t);const o=t.kind==="weapon"?`+${t.atk} ATK`:`+${t.def} DEF`,a=r?` (replacing ${r.name})`:"";return`${n.name} equips the ${t.name} — ${o}${a}.`}descend(){this.transition(()=>this.descendNow())}descendNow(){this.floor++;const e=Nl(Math.random()*1e9|0);this.dungeon=e,this.seen=new Uint8Array(e.w*e.h),this.lockedMsg="",this.hall?.reset(e),this.lastCell="",this.markSeen(),this.dist=0,this.msg=[`You descend the stair to B${this.floor}. The dark grows hungrier.`]}async startEncounter(){const e=Math.min(4,2+Math.floor((this.floor-1)/2)+(Math.random()<.3?1:0)),t=id(Math.random()*1e9|0,e),{BattleScene:n}=await Bp(async()=>{const{BattleScene:r}=await Promise.resolve().then(()=>nb);return{BattleScene:r}},void 0),s=new n(this.host,t,r=>{if(r==="win")this.msg=["The corridor falls silent again."];else{this.msg=["You wake at the vault mouth, bruised."];for(const o of this.host.party)o.hp=Math.max(1,Math.floor(o.maxHp/2))}this.host.setScene(this)});this.msg=[`${t.length} cards are dealt!`],this.host.setScene(s)}toDungeon(){this.transition(()=>this.toDungeonNow())}toDungeonNow(){const e=this.dungeon??Nl(Math.random()*1e9|0);this.dungeon=e,this.world="dungeon",this.lastCell="",this.showMap=!1,this.keys=0,this.hall&&this.hall.reset(e),this.msg=["You follow the road back down into the vault."]}enterMap(e=0){this.world="map",this.mapMarker=e,this.map=Rl(Math.random()*1e9|0),this.msg=["You step back out under open sky."]}enterTown(){this.transition(()=>this.enterTownNow())}enterTownNow(){const e=Xh(Math.random()*1e9|0);this.world="town",this.lastCell="",this.showMap=!1,this.hall?this.hall.loadTown(e):this.town=e,this.msg=[`${e.name}: stalls, an inn, a smith and a mage.  [Z] to use.`]}townInteract(e,t){const n=this.hall?.nearestShop(e,t);if(n){if(n.kind==="inn")if(this.host.gold>=10){this.host.gold-=10;for(const s of this.host.party)s.hp=s.maxHp,s.mp=s.maxMp;this.msg=["You rest by the hearth. The party is fully restored."]}else this.msg=["The innkeeper wants 10 gold for a night's rest."];else if(n.kind==="blacksmith"){const s=this.host.party[0];this.host.gold>=25?(this.host.gold-=25,s.atk+=1,this.msg=[`The smith tempers ${s.name}'s blade.  (ATK ${s.atk})`]):this.msg=["The smith charges 25 gold to improve a weapon."]}else if(n.kind==="magician"){const s=new Set(this.host.party.flatMap(a=>a.spells)),o=Object.keys(zs).find(a=>!s.has(a));if(!o)this.msg=["The mage has taught you all she knows."];else if(this.host.gold>=40){this.host.gold-=40;const a=this.host.party.reduce((c,l)=>c.spells.length<=l.spells.length?c:l);a.spells.push(o),this.msg=[`The mage teaches ${a.name} ${zs[o].name}.`]}else this.msg=["The mage asks 40 gold to teach a new spell."]}else if(n.kind==="stall")this.host.gold>=12?(this.host.gold-=12,this.host.inventory.potion=(this.host.inventory.potion??0)+1,this.msg=["A merchant sells you an amber draught."]):this.msg=["The merchant wants 12 gold for a draught."];else if(n.kind==="well"){for(const s of this.host.party)s.hp=Math.min(s.maxHp,s.hp+6);this.msg=["You draw from the fountain and drink. (+6 HP each)"]}}}updateMap(e){this.map||(this.map=Rl(Math.random()*1e9|0)),e.justPressed("left")&&(this.mapMarker=Math.max(0,this.mapMarker-1)),e.justPressed("right")&&(this.mapMarker=Math.min(this.map.nodes.length-1,this.mapMarker+1)),e.justPressed("confirm")&&(this.map.nodes[this.mapMarker].kind==="dungeon"?this.toDungeon():this.enterTown())}drawMapView(e){this.map||(this.map=Rl(1)),ww(e,this.map,this.mapMarker,performance.now()/1e3,384,216),Re(e,0,0,384,16,"rgba(8,8,14,0.82)"),Bt(e,this.msg[0]??"",6,4,Ae.text,8)}render(e){if(e.canvas.style.imageRendering="pixelated",this.world==="map"){this.drawMapView(e);return}Re(e,0,0,384,216,Ae.bg),e.clearRect(pt.x,pt.y,pt.w,pt.h);const t=this.hall?.isTown()??!1;if(this.showMap&&!t&&this.dungeon&&this.seen&&this.hall){const[n,s]=this.hall.cell();fp(e,this.dungeon,this.seen,n,s,this.hall.heading(),pt.x,pt.y,pt.w,pt.h)}Re(e,pt.x-2,pt.y-2,pt.w+4,1,Ae.gold),Re(e,pt.x-2,pt.y+pt.h+1,pt.w+4,1,Ae.gold),Re(e,pt.x-2,pt.y-2,1,pt.h+4,Ae.gold),Re(e,pt.x+pt.w+1,pt.y-2,1,pt.h+4,Ae.gold),Nn(e,this.host.party[0],0,4,Go,100,!1),Nn(e,this.host.party[1],0,108,Go,100,!1),Nn(e,this.host.party[2],308,4,Go,100,!1),Nn(e,this.host.party[3],308,108,Go,100,!1),dp(e,this.hall?this.hall.heading():0,192,124),kr(e,pt.x,150,pt.w,62,[...this.msg,"",t?`Town   Gold ${this.host.gold}`:`B${this.floor}   Gold ${this.host.gold}   Keys ${this.keys}`]),t?Bt(e,"[Z] talk / use",pt.x+4,141,Ae.dim,8):(Bt(e,this.showMap?"[M] close map":"[M] map",pt.x+4,141,Ae.dim,8),Bt(e,this.enemies?"[E] foes: on":"[E] foes: off",pt.x+74,141,this.enemies?Ae.dim:Ae.gold,8)),Bt(e,Eh,pt.x+pt.w-34,141,Ae.dim,8)}}const va=0,Ma=308,Gi=76,ot={x:80,y:6,w:224,h:134},Et={x:80,y:150,w:224,h:62},Zf=["N","E","S","W"];class xp{constructor(e){this.host=e,this.t=0,this.img=null,this.imgState="loading"}ensureImage(){if(this.img)return;const e=new Image;e.onload=()=>{this.imgState="ready"},e.onerror=()=>{this.imgState="failed"},e.src="/spiritdeck/video/title.jpg",this.img=e}update(e,t){this.t+=e,this.ensureImage(),t.justPressed("confirm")&&this.host.setScene(new is(this.host,()=>new ks(this.host,this.host.dungeon)))}render(e){if(Re(e,0,0,384,216,"#05050a"),e.canvas.style.imageRendering=this.imgState==="ready"?"auto":"pixelated",this.imgState==="ready"&&this.img)e.imageSmoothingEnabled=!0,e.drawImage(this.img,0,0,384,216),e.imageSmoothingEnabled=!1;else if(this.imgState==="failed"){for(let s=20;s<120;s+=4){const r=.06+.05*Math.sin((s+this.t*30)*.2);Re(e,0,s,384,2,`rgba(200,140,60,${r.toFixed(3)})`)}ni(e,"S P I R I T D E C K",192,62,Ae.gold,16),ni(e,"Arcanaetheum",192,84,Ae.dim,8)}const t=e.createLinearGradient(0,0,0,30);t.addColorStop(0,"rgba(4,4,10,0.7)"),t.addColorStop(1,"rgba(4,4,10,0)"),e.fillStyle=t,e.fillRect(0,0,384,30);const n=e.createLinearGradient(0,168,0,216);n.addColorStop(0,"rgba(4,4,10,0)"),n.addColorStop(1,"rgba(4,4,10,0.88)"),e.fillStyle=n,e.fillRect(0,168,384,48),Math.floor(this.t*2)%2===0&&ni(e,"PRESS  ENTER",192,176,"#ffe9b0",8),ni(e,"arrows / WASD   M map   E foes   Z confirm   X cancel",192,200,Ae.dim,8),ni(e,Eh,192,210,Ae.dim,8)}}class vp{constructor(e){this.host=e,this.showMap=!1,this.stepTimer=0,this.shake=0,this.time=0,this.seen=new Uint8Array(e.dungeon.w*e.dungeon.h),this.px=e.dungeon.start.x,this.py=e.dungeon.start.y,this.dir=e.dungeon.start.dir,this.discover(),this.msg=[`${e.dungeon.name}. The air is cold and still.`]}get d(){return this.host.dungeon}discover(){for(let e=this.py-2;e<=this.py+2;e++)for(let t=this.px-2;t<=this.px+2;t++)t<0||e<0||t>=this.d.w||e>=this.d.h||(this.seen[e*this.d.w+t]=1)}setPose(e,t,n){this.px=e,this.py=t,this.dir=n,this.discover(),this.msg=[`Facing ${Zf[this.dir]}.`]}viewState(){return this.showMap?null:{map:this.d,pos:[this.px+.5,this.py+.5],dir:this.dir,time:this.time}}update(e,t){this.stepTimer-=e,this.shake=Math.max(0,this.shake-e),this.time+=e,t.justPressed("map")&&(this.showMap=!this.showMap),!(this.stepTimer>0)&&(t.held("left")?(this.dir=(this.dir+3)%4,this.stepTimer=.16):t.held("right")?(this.dir=(this.dir+1)%4,this.stepTimer=.16):t.held("up")?(this.step(1),this.stepTimer=.18):t.held("down")&&(this.step(-1),this.stepTimer=.18))}step(e){const t=Dn[this.dir],n=this.px+t.x*e,s=this.py+t.y*e;if(n<0||s<0||n>=this.d.w||s>=this.d.h)return;const r=this.d.tiles[s*this.d.w+n];if(r===Qt){this.msg=["A rough stone wall blocks the way."],this.shake=.12;return}if(this.px=n,this.py=s,this.discover(),r===Gs){this.d.tiles[s*this.d.w+n]=0;const o=Math.random();o<.5?(this.host.inventory.draught=(this.host.inventory.draught??0)+1,this.msg=["A reliquary! You gain a Cinder Draught."]):o<.8?(this.host.inventory.dew=(this.host.inventory.dew??0)+1,this.msg=["A vellum pouch. You gain Spirit Dew."]):(this.host.gold+=30,this.msg=["Loose coins spill from a broken casket. +30 gold."]);return}if(r===Sa){this.msg=["A stair spirals down, but the way is sealed. (End of slice.)"];return}if(e>0&&Math.random()<.08){const o=Math.random()<.3?3:2,a=id(Math.random()*1e9|0,o),c=new Mp(this.host,a,l=>{if(l==="win")this.msg=["The corridor falls silent again."];else{this.msg=["You wake at the vault mouth, bruised."];for(const h of this.host.party)h.hp=Math.max(1,Math.floor(h.maxHp/2));this.px=this.d.start.x,this.py=this.d.start.y,this.dir=this.d.start.dir,this.discover()}this.host.setScene(this)});this.host.setScene(c);return}this.msg=[`Corridor. Facing ${Zf[this.dir]}.`]}render(e){e.canvas.style.imageRendering="pixelated",Re(e,0,0,256,224,Ae.bg);const t=this.shake>0?Math.random()<.5?-1:1:0;this.showMap?(e.save(),e.translate(t,0),fp(e,this.d,this.seen,this.px,this.py,this.dir,ot.x,ot.y,ot.w,ot.h),e.restore()):this.host.gpu?e.clearRect(ot.x,ot.y,ot.w,ot.h):(e.save(),e.translate(t,0),iw(e,this.d,this.px,this.py,this.dir,ot.x,ot.y,ot.w,ot.h,this.time),e.restore()),tb(e),Nn(e,this.host.party[0],va,4,Gi,100,!1),Nn(e,this.host.party[1],va,108,Gi,100,!1),Nn(e,this.host.party[2],Ma,4,Gi,100,!1),Nn(e,this.host.party[3],Ma,108,Gi,100,!1),dp(e,this.dir,192,124),kr(e,Et.x,Et.y,Et.w,Et.h,[...this.msg,"",`Gold ${this.host.gold}`]),Bt(e,this.showMap?"[M] view":"[M] map",Et.x+4,Et.y-9,Ae.dim,8)}}function tb(i){Re(i,ot.x-2,ot.y-2,ot.w+4,1,Ae.gold),Re(i,ot.x-2,ot.y+ot.h+1,ot.w+4,1,Ae.gold),Re(i,ot.x-2,ot.y-2,1,ot.h+4,Ae.gold),Re(i,ot.x+ot.w+1,ot.y-2,1,ot.h+4,Ae.gold)}class Mp{constructor(e,t,n){this.host=e,this.monsters=t,this.onEnd=n,this.phase="intro",this.log=[],this.wait=0,this.queue=[],this.qi=0,this.enemyQ=[],this.ei=0,this.menu=0,this.sub=0,this.target=0,this.shake=0,this.pendingSpell=null,this.pendingItem=null,this.menuOptions=["Attack","Skill","Item","Guard"],this.flash=t.map(()=>0),this.push([`${t.length} cards are dealt!`]),this.beginRound()}actor(){return this.host.party[this.queue[this.qi]]}actorIndex(){return this.phase==="command"?this.queue[this.qi]:-1}livingEnemies(){return this.monsters.map((e,t)=>e.hp>0?t:-1).filter(e=>e>=0)}livingAllies(){return this.host.party.map((e,t)=>e.hp>0?t:-1).filter(e=>e>=0)}push(e){this.log.push(...e),this.log.length>6&&(this.log=this.log.slice(-6))}beginRound(){this.queue=this.host.party.map((e,t)=>({i:t,s:e.spd})).filter(e=>this.host.party[e.i].hp>0).sort((e,t)=>t.s-e.s).map(e=>e.i),this.qi=0,this.beginActor()}beginActor(){if(this.qi>=this.queue.length){this.phase="busy",this.enemyQ=this.livingEnemies(),this.ei=0,this.wait=.35;return}this.phase="command",this.menu=0}endActor(){this.qi++,this.beginActor()}resolveAttack(e,t){const n=this.monsters[t],s=ao(e.element,n.element),r=Math.max(1,Math.round((Na(e)*2-n.def)*s*(.9+Math.random()*.2)));n.hp=Math.max(0,n.hp-r),this.flash[t]=.5,this.shake=.15;const o=s>1?"crushes":s<1?"clips":"strikes";this.push([`${e.name} ${o} ${n.name} — ${r} dmg.`]),n.hp<=0&&this.push([`${n.name} shatters into light.`])}resolveSpell(e,t,n){const s=zs[t];if(e.mp-=s.cost,s.kind==="attack")if(s.target==="all-enemies"){for(let r=0;r<this.monsters.length;r++){const o=this.monsters[r];if(o.hp<=0)continue;const a=ao(s.element,o.element),c=Math.max(1,Math.round((s.power+Na(e))*a));o.hp=Math.max(0,o.hp-c),this.flash[r]=.5,o.hp<=0&&this.push([`${o.name} shatters into light.`])}this.shake=.2,this.push([`${e.name} looses ${s.name} at every foe!`])}else{const r=this.monsters[n],o=ao(s.element,r.element),a=Math.max(1,Math.round((s.power+Na(e))*o));r.hp=Math.max(0,r.hp-a),this.flash[n]=.6,this.shake=.18,this.push([`${e.name} casts ${s.name} — ${a} dmg.`]),r.hp<=0&&this.push([`${r.name} shatters into light.`])}else if(s.kind==="heal"){const r=this.host.party[n],o=Math.min(r.maxHp-r.hp,s.power+e.lv*2);r.hp+=o,this.push([`${e.name} casts ${s.name}. ${r.name} recovers ${o} HP.`])}else{const r=this.host.party[n];r.guard+=s.power,this.push([`${e.name} casts ${s.name}. ${r.name}'s guard rises.`])}}useItem(e,t,n){const s=Wh[t];this.host.inventory[t]=(this.host.inventory[t]??0)-1;const r=this.host.party[n];if(s.kind==="heal"){const o=Math.min(r.maxHp-r.hp,s.power);r.hp+=o,this.push([`${e.name} uses ${s.name}. ${r.name} recovers ${o} HP.`])}else{const o=Math.min(r.maxMp-r.mp,s.power);r.mp+=o,this.push([`${e.name} uses ${s.name}. ${r.name} recovers ${o} MP.`])}}checkEnd(){if(this.livingEnemies().length===0){this.phase="victory";const e=this.monsters.reduce((n,s)=>n+s.xp,0),t=this.monsters.reduce((n,s)=>n+s.gold,0);return this.host.gold+=t,this.push([`Victory! +${e} XP, +${t} gold.`,"Press Z."]),!0}return this.livingAllies().length===0?(this.phase="defeat",this.push(["The party falls...","Press Z."]),!0):!1}enemyAct(){const e=this.livingAllies(),t=e[Math.random()*e.length|0],n=this.host.party[t],s=this.enemyQ[this.ei],r=this.monsters[s];if(!r||r.hp<=0){this.ei++;return}const o=ao(r.element,n.element),a=Math.max(1,Math.round((r.atk*2-(Dp(n)+n.guard))*o*(.9+Math.random()*.2)));n.hp=Math.max(0,n.hp-a),this.shake=.18,this.push([`${r.name} strikes ${n.name} — ${a} dmg.`]),n.hp<=0&&this.push([`${n.name} can fight no longer!`]),this.ei++}update(e,t){this.flash=this.flash.map(n=>Math.max(0,n-e*2.5)),this.shake=Math.max(0,this.shake-e);for(const n of this.host.party)n.guard=Math.max(0,n.guard-e*4);if(this.wait>0){this.wait-=e;return}switch(this.phase){case"intro":this.phase="command";break;case"busy":if(this.checkEnd())return;if(this.ei<this.enemyQ.length){if(this.enemyAct(),this.wait=.5,this.checkEnd())return;this.ei>=this.enemyQ.length&&this.beginRound()}else this.beginRound();break;case"command":{if(t.justPressed("up")&&(this.menu=(this.menu+3)%4),t.justPressed("down")&&(this.menu=(this.menu+1)%4),t.justPressed("confirm")){const n=this.actor();this.menu===0?(this.phase="target",this.target=this.livingEnemies()[0]??0):this.menu===1?n.spells.length===0?this.push([`${n.name} knows no arts.`]):(this.phase="skill",this.sub=0):this.menu===2?(this.phase="item",this.sub=0):(n.guard+=6,this.push([`${n.name} guards.`]),this.endActor())}break}case"target":{const n=this.livingEnemies(),s=Math.max(0,n.indexOf(this.target));if(t.justPressed("left")&&(this.target=n[(s+n.length-1)%n.length]),t.justPressed("right")&&(this.target=n[(s+1)%n.length]),t.justPressed("cancel")&&(this.phase="command",this.pendingSpell=null),t.justPressed("confirm")){if(this.pendingSpell?(this.resolveSpell(this.actor(),this.pendingSpell,this.target),this.pendingSpell=null):this.resolveAttack(this.actor(),this.target),this.checkEnd())return;this.wait=.45,this.endActor()}break}case"skill":{const n=this.actor();if(n.spells.length===0){this.phase="command";break}if(t.justPressed("up")&&(this.sub=(this.sub+n.spells.length-1)%n.spells.length),t.justPressed("down")&&(this.sub=(this.sub+1)%n.spells.length),t.justPressed("cancel")&&(this.phase="command"),t.justPressed("confirm")){const s=zs[n.spells[this.sub]];if(n.mp<s.cost)this.push([`Not enough MP for ${s.name}.`]);else if(s.target==="enemy")this.pendingSpell=s.id,this.phase="target",this.target=this.livingEnemies()[0]??0;else if(s.target==="all-enemies"){if(this.resolveSpell(n,s.id,0),this.checkEnd())return;this.wait=.5,this.endActor()}else this.pendingSpell=s.id,this.phase="ally",this.target=this.livingAllies()[0]??0}break}case"ally":{const n=this.livingAllies(),s=Math.max(0,n.indexOf(this.target));t.justPressed("left")&&(this.target=n[(s+n.length-1)%n.length]),t.justPressed("right")&&(this.target=n[(s+1)%n.length]),t.justPressed("cancel")&&(this.pendingSpell=null,this.pendingItem=null,this.phase="command"),t.justPressed("confirm")&&(this.pendingItem?this.useItem(this.actor(),this.pendingItem,this.target):this.pendingSpell&&this.resolveSpell(this.actor(),this.pendingSpell,this.target),this.pendingSpell=null,this.pendingItem=null,this.wait=.45,this.endActor());break}case"item":{const n=Object.keys(this.host.inventory).filter(s=>(this.host.inventory[s]??0)>0);if(n.length===0){this.phase="command";break}t.justPressed("up")&&(this.sub=(this.sub+n.length-1)%n.length),t.justPressed("down")&&(this.sub=(this.sub+1)%n.length),t.justPressed("cancel")&&(this.phase="command"),t.justPressed("confirm")&&(this.pendingItem=n[this.sub],this.phase="ally",this.target=this.livingAllies()[0]??0);break}case"victory":case"defeat":t.justPressed("confirm")&&this.onEnd(this.phase==="victory"?"win":"lose");break}}render(e){e.canvas.style.imageRendering="pixelated",Re(e,0,0,256,224,Ae.bg);const t=this.shake>0?Math.random()<.5?-1:1:0;e.save(),e.translate(t,0),us(e,ot.x-2,ot.y-2,ot.w+4,ot.h+4,"#0a0a10",Ae.gold,Ae.goldLo);const n=this.monsters.length,s=36,r=Math.min(10,Math.max(2,Math.floor((ot.w-n*s)/(n+1)))),o=n*s+(n-1)*r;let a=ot.x+(ot.w-o)/2;for(let l=0;l<n;l++){const h=this.monsters[l],u=this.phase==="target"&&this.target===l;h.hp>0?mw(e,h,a,ot.y+26,s,74,u,this.flash[l]):(Re(e,a,ot.y+26,s,74,"#101018"),ni(e,"—",a+s/2,ot.y+58,Ae.dim,8)),a+=s+r}e.restore();const c=this.actorIndex();if(Nn(e,this.host.party[0],va,4,Gi,100,c===0),Nn(e,this.host.party[1],va,108,Gi,100,c===1),Nn(e,this.host.party[2],Ma,4,Gi,100,c===2),Nn(e,this.host.party[3],Ma,108,Gi,100,c===3),this.phase==="command")this.drawMenu(e,this.menuOptions,this.menu,"Command");else if(this.phase==="skill"){const l=this.actor();this.drawMenu(e,l.spells.map(h=>`${zs[h].name}  ${zs[h].cost}mp`),this.sub,"Arts")}else if(this.phase==="item"){const l=Object.keys(this.host.inventory).filter(h=>(this.host.inventory[h]??0)>0);this.drawMenu(e,l.length?l.map(h=>`${Wh[h].name} x${this.host.inventory[h]}`):["(none)"],this.sub,"Items")}else this.phase==="target"||this.phase==="ally"?kr(e,Et.x,Et.y,Et.w,Et.h,["Choose a card.  < >  pick,  Z  confirm,  X  back."]):kr(e,Et.x,Et.y,Et.w,Et.h,this.log)}drawMenu(e,t,n,s){kr(e,Et.x,Et.y,Et.w,Et.h,this.log),us(e,Et.x+4,Et.y+4,Et.w-8,Et.h-8,"#101018",Ae.bevelHi,Ae.bevelLo),Bt(e,s,Et.x+8,Et.y+7,Ae.gold,8);let r=Et.y+19;for(let o=0;o<t.length;o++){const a=o===n;Bt(e,`${a?">":" "} ${t[o]}`,Et.x+8,r,a?Ae.gold:Ae.text,8),r+=11}}}const nb=Object.freeze(Object.defineProperty({__proto__:null,BattleScene:Mp,DungeonScene:vp,TitleScene:xp,VIEW:ot},Symbol.toStringTag,{value:"Module"})),Xt="/spiritdeck/",Us=16,jf=8,ib=`#version 300 es
void main() {
  vec2 p = vec2(float((gl_VertexID << 1) & 2), float(gl_VertexID & 2));
  gl_Position = vec4(p * 2.0 - 1.0, 0.0, 1.0);
}`,sb=`#version 300 es
precision highp float;
precision highp sampler2DArray;
out vec4 fragColor;

#define MAXL 16
#define MAXS 8

uniform vec2 uRes;
uniform vec2 uPos;
uniform vec2 uDir;
uniform vec2 uPlane;
uniform vec2 uMapSize;
uniform sampler2D uMap;
uniform sampler2DArray uTex;
uniform sampler2DArray uNrm;
uniform sampler2DArray uTile;
uniform sampler2DArray uTileNrm;
uniform sampler2DArray uAO;
uniform float uTime;
uniform float uWallScale;
uniform float uWallV;
uniform float uTileScale;
uniform float uHalfFov;
uniform float uCyl;
uniform int uNumLights;
uniform vec3 uLightPos[MAXL];
uniform vec3 uLightCol[MAXL];
uniform vec4 uLightPar[MAXL];
uniform int uNumSky;
uniform vec2 uSkyCell[MAXS];
uniform int uNumSpr;
uniform vec4 uSpr[MAXL];

float tileAt(vec2 c) {
  if (c.x < 0.0 || c.y < 0.0 || c.x >= uMapSize.x || c.y >= uMapSize.y) return 1.0;
  return texelFetch(uMap, ivec2(c), 0).r;
}

vec3 applyNormal(vec3 N, vec3 T, vec3 nmap) {
  vec3 B = cross(N, T);
  return normalize(T * nmap.x + B * nmap.y + N * nmap.z);
}

vec3 aces(vec3 x) {
  const float a = 2.51, b = 0.03, c = 2.43, d = 0.59, e = 0.14;
  return clamp((x * (a * x + b)) / (x * (c * x + d) + e), 0.0, 1.0);
}

float hash12(vec2 p) {
  p = fract(p * vec2(123.34, 456.21));
  p += dot(p, p + 45.32);
  return fract(p.x * p.y);
}

float vnoise(vec2 p) {
  vec2 i = floor(p);
  vec2 f = fract(p);
  f = f * f * (3.0 - 2.0 * f);
  float a = hash12(i);
  float b = hash12(i + vec2(1.0, 0.0));
  float c = hash12(i + vec2(0.0, 1.0));
  float d = hash12(i + vec2(1.0, 1.0));
  return mix(mix(a, b, f.x), mix(c, d, f.x), f.y);
}

void main() {
  vec2 frag = gl_FragCoord.xy;
  float camX = 2.0 * frag.x / uRes.x - 1.0;
  vec2 ray;
  if (uCyl > 0.5) {
    float theta = camX * uHalfFov;
    float ct = cos(theta), st = sin(theta);
    ray = vec2(uDir.x * ct - uDir.y * st, uDir.x * st + uDir.y * ct);
  } else {
    ray = uDir + uPlane * camX;
  }

  vec2 mapc = floor(uPos);
  vec2 delta = abs(1.0 / ray);
  vec2 stepv = sign(ray);
  vec2 sideDist;
  sideDist.x = (stepv.x > 0.0 ? (mapc.x + 1.0 - uPos.x) : (uPos.x - mapc.x)) * delta.x;
  sideDist.y = (stepv.y > 0.0 ? (mapc.y + 1.0 - uPos.y) : (uPos.y - mapc.y)) * delta.y;

  float side = 0.0;
  bool hit = false;
  for (int i = 0; i < 160; i++) {
    if (sideDist.x < sideDist.y) { sideDist.x += delta.x; mapc.x += stepv.x; side = 0.0; }
    else { sideDist.y += delta.y; mapc.y += stepv.y; side = 1.0; }
    if (tileAt(mapc) > 0.5) { hit = true; break; }
  }

  float perp = (side == 0.0)
    ? (mapc.x - uPos.x + (1.0 - stepv.x) * 0.5) / ray.x
    : (mapc.y - uPos.y + (1.0 - stepv.y) * 0.5) / ray.y;
  perp = max(perp, 1e-4);

  float centerY = uRes.y * 0.5;
  float lineH = uRes.y / perp;
  float wallBottom = centerY - lineH * 0.5;
  float wallTop = centerY + lineH * 0.5;

  vec3 albedo;
  vec3 N;
  vec3 wpos;
  float dist;
  float ao = 1.0;
  bool isSky = false;

  if (hit && frag.y >= wallBottom && frag.y <= wallTop) {
    float v = 1.0 - (frag.y - wallBottom) / lineH;
    float wx = (side == 0.0) ? uPos.y + perp * ray.y : uPos.x + perp * ray.x;
    int layer = int(mod(mapc.x * 7.0 + mapc.y * 13.0, 3.0));
    vec2 uv = vec2(wx * uWallScale, v * uWallV);
    albedo = texture(uTex, vec3(uv, float(layer))).rgb;
    albedo *= 0.86 + 0.24 * hash12(mapc + 0.5);
    albedo *= 0.84 + 0.18 * vnoise(vec2(wx * 0.55, v * 1.7));
    ao = texture(uAO, vec3(uv, float(layer))).r;
    vec3 nrm = texture(uNrm, vec3(uv, float(layer))).rgb * 2.0 - 1.0;
    vec3 baseN = (side == 0.0) ? vec3(-stepv.x, 0.0, 0.0) : vec3(0.0, 0.0, -stepv.y);
    N = applyNormal(baseN, vec3(0.0, 1.0, 0.0), nrm);
    wpos = vec3(uPos.x + ray.x * perp, v, uPos.y + ray.y * perp);
    dist = perp;
  } else {
    bool floorPix = frag.y < centerY;
    float p = floorPix ? (centerY - frag.y) : (frag.y - centerY);
    p = max(p, 0.0001);
    float rowDist = 0.5 * uRes.y / p;
    vec2 world = uPos + ray * rowDist;
    int layer = floorPix ? 0 : 1;
    vec2 uv = world * uTileScale;
    albedo = texture(uTile, vec3(uv, float(layer))).rgb;
    vec3 nrm = texture(uTileNrm, vec3(uv, float(layer))).rgb * 2.0 - 1.0;
    vec3 baseN = floorPix ? vec3(0.0, 1.0, 0.0) : vec3(0.0, -1.0, 0.0);
    N = applyNormal(baseN, vec3(1.0, 0.0, 0.0), nrm);
    wpos = vec3(world.x, floorPix ? 0.0 : 1.0, world.y);
    dist = rowDist;
    if (!floorPix) {
      vec2 cell = floor(world);
      for (int i = 0; i < MAXS; i++) {
        if (i >= uNumSky) break;
        if (distance(cell, uSkyCell[i]) < 0.5) { isSky = true; break; }
      }
    }
  }

  vec3 eye = vec3(uPos.x, 0.5, uPos.y);
  vec3 col = albedo * vec3(0.040, 0.046, 0.066) * (0.35 + 0.65 * ao);

  for (int i = 0; i < MAXL; i++) {
    if (i >= uNumLights) break;
    vec3 lp = uLightPos[i];
    vec4 par = uLightPar[i];
    vec3 lv = lp - wpos;
    float d2 = dot(lv, lv);
    vec3 L = lv * inversesqrt(max(d2, 1e-4));
    float atten = par.y / (1.0 + d2 / (par.x * par.x));
    float fl = 1.0;
    if (par.w < 0.5) {
      fl = 0.80 + 0.16 * sin(uTime * 13.0 + par.z) + 0.07 * sin(uTime * 31.0 + par.z * 1.7);
    } else if (par.w < 1.5) {
      fl = 0.96 + 0.04 * sin(uTime * 1.7 + par.z);
    }
    float ndl = max(dot(N, L), 0.0);
    vec3 lc = uLightCol[i] * fl;
    col += albedo * lc * atten * (0.16 + 0.95 * ndl) * mix(0.78, 1.0, ao);
    vec3 Vl = normalize(eye - wpos);
    vec3 Hv = normalize(L + Vl);
    float spec = pow(max(dot(N, Hv), 0.0), 48.0) * 0.10 * atten;
    col += lc * spec;
  }

  if (isSky) {
    vec2 suv = wpos.xz * 0.16;
    float cl = vnoise(suv * 3.0) * 0.6 + vnoise(suv * 9.0) * 0.4;
    vec3 skyC = mix(vec3(0.30, 0.46, 0.72), vec3(0.68, 0.82, 1.0), cl);
    col += skyC * 2.1;
  }

  for (int i = 0; i < MAXL; i++) {
    if (i >= uNumSpr) break;
    vec4 s = uSpr[i];
    if (s.w <= 0.0) continue;
    if (s.w > dist + 0.18) continue;
    float dd = distance(frag, s.xy) / max(s.z, 1.0);
    if (dd < 1.0) {
      float core = pow(1.0 - dd, 2.2);
      float fl = 0.82 + 0.18 * sin(uTime * 19.0 + float(i) * 2.1);
      vec3 flame = mix(vec3(1.6, 0.55, 0.12), vec3(2.4, 1.6, 0.7), pow(1.0 - dd, 4.0));
      col += flame * core * fl;
    }
  }

  float fog = 1.0 - exp(-dist * 0.10);
  col = mix(col, vec3(0.010, 0.012, 0.020), clamp(fog, 0.0, 1.0));

  col = aces(col * 0.9);
  col = pow(col, vec3(1.0 / 2.2));

  vec2 q = frag / uRes - 0.5;
  float vig = smoothstep(0.88, 0.28, length(q));
  col *= 0.52 + 0.48 * vig;

  col += (hash12(frag) - 0.5) * 0.010;
  fragColor = vec4(col, 1.0);
}`;function Qf(i,e,t){const n=i.createShader(e);if(!n)throw new Error("shader");if(i.shaderSource(n,t),i.compileShader(n),!i.getShaderParameter(n,i.COMPILE_STATUS))throw new Error(i.getShaderInfoLog(n)??"shader compile failed");return n}function Jn(i,e,t){const n=i.createTexture();if(!n)throw new Error("tex");const s=e[0].w;i.bindTexture(i.TEXTURE_2D_ARRAY,n),i.texImage3D(i.TEXTURE_2D_ARRAY,0,i.RGBA8,s,s,e.length,0,i.RGBA,i.UNSIGNED_BYTE,null);for(let o=0;o<e.length;o++)i.texSubImage3D(i.TEXTURE_2D_ARRAY,0,0,0,o,s,s,1,i.RGBA,i.UNSIGNED_BYTE,e[o].data);i.generateMipmap(i.TEXTURE_2D_ARRAY),i.texParameteri(i.TEXTURE_2D_ARRAY,i.TEXTURE_MIN_FILTER,i.LINEAR_MIPMAP_LINEAR),i.texParameteri(i.TEXTURE_2D_ARRAY,i.TEXTURE_MAG_FILTER,i.LINEAR),i.texParameteri(i.TEXTURE_2D_ARRAY,i.TEXTURE_WRAP_S,t),i.texParameteri(i.TEXTURE_2D_ARRAY,i.TEXTURE_WRAP_T,t);const r=i.getExtension("EXT_texture_filter_anisotropic");if(r){const o=i.getParameter(r.MAX_TEXTURE_MAX_ANISOTROPY_EXT);i.texParameterf(i.TEXTURE_2D_ARRAY,r.TEXTURE_MAX_ANISOTROPY_EXT,Math.min(8,o))}return n}function gn(i,e=512){const t=document.createElement("canvas");t.width=e,t.height=e;const n=t.getContext("2d");if(!n)throw new Error("no ctx");return n.imageSmoothingEnabled=!0,n.drawImage(i,0,0,i.width,i.height,0,0,e,e),{w:e,h:e,data:n.getImageData(0,0,e,e).data}}function rb(i){return new Promise(e=>{const t=new Image;t.onload=()=>e(t),t.onerror=()=>e(null),t.src=i})}function ed(i,e){const t=[];for(let n=0;n<i;n++){const s=new Uint8ClampedArray(e*e*4);for(let r=0;r<s.length;r++)s[r]=255;t.push({w:e,h:e,data:s})}return t}async function _n(i){for(const e of i){const t=await rb(e);if(t)return t}return null}class ob{constructor(e){this.ok=!1,this.halfFov=.98,this.cyl=!1,this.gl=null,this.prog=null,this.vao=null,this.wallTex=null,this.wallNrm=null,this.tileTex=null,this.tileNrm=null,this.aoTex=null,this.mapTex=null,this.u={},this.lastMap=null,this.canvas=e;const t=e.getContext("webgl2",{antialias:!1,alpha:!1,powerPreference:"high-performance"});if(!t)return;this.gl=t;const n=Qf(t,t.VERTEX_SHADER,ib),s=Qf(t,t.FRAGMENT_SHADER,sb),r=t.createProgram();if(!r)return;if(t.attachShader(r,n),t.attachShader(r,s),t.linkProgram(r),!t.getProgramParameter(r,t.LINK_STATUS))throw new Error(t.getProgramInfoLog(r)??"link failed");this.prog=r,t.useProgram(r),this.vao=t.createVertexArray(),t.bindVertexArray(this.vao);for(const h of["uRes","uPos","uDir","uPlane","uMapSize","uMap","uTex","uNrm","uTile","uTileNrm","uAO","uTime","uWallScale","uWallV","uTileScale","uHalfFov","uCyl","uNumLights","uLightPos","uLightCol","uLightPar","uNumSky","uSkyCell","uNumSpr","uSpr"])this.u[h]=t.getUniformLocation(r,h);const o=[$s(20958,0),$s(20958,1),$s(20958,2)],a=o.map(h=>({w:h.w,h:h.h,data:es(h,1.6)})),c=[Tc(45324),Ec(49937)],l=c.map(h=>({w:h.w,h:h.h,data:es(h,1.2)}));this.wallTex=Jn(t,o,t.REPEAT),this.wallNrm=Jn(t,a,t.REPEAT),this.tileTex=Jn(t,c,t.MIRRORED_REPEAT),this.tileNrm=Jn(t,l,t.MIRRORED_REPEAT),this.aoTex=Jn(t,ed(3,512),t.REPEAT),this.mapTex=t.createTexture(),t.bindTexture(t.TEXTURE_2D,this.mapTex),t.texParameteri(t.TEXTURE_2D,t.TEXTURE_MIN_FILTER,t.NEAREST),t.texParameteri(t.TEXTURE_2D,t.TEXTURE_MAG_FILTER,t.NEAREST),t.uniform1i(this.u.uTex??null,0),t.uniform1i(this.u.uNrm??null,1),t.uniform1i(this.u.uMap??null,2),t.uniform1i(this.u.uTile??null,3),t.uniform1i(this.u.uTileNrm??null,4),t.uniform1i(this.u.uAO??null,5),t.clearColor(.01,.012,.02,1),this.ok=!0,this.loadUserTextures()}loadUserTextures(){(async()=>{const e=await _n([Xt+"textures/wall.png",Xt+"textures/wall.jpg"]);if(!e||!this.gl)return;const[t,n,s,r,o,a,c,l,h,u,f,d]=await Promise.all([_n([Xt+"textures/wall2.png",Xt+"textures/wall2.jpg"]),_n([Xt+"textures/wall3.png",Xt+"textures/wall3.jpg"]),_n([Xt+"textures/floor.png",Xt+"textures/floor.jpg"]),_n([Xt+"textures/ceil.png",Xt+"textures/ceil.jpg"]),_n([Xt+"textures/wall_n.png"]),_n([Xt+"textures/wall2_n.png"]),_n([Xt+"textures/wall3_n.png"]),_n([Xt+"textures/floor_n.png"]),_n([Xt+"textures/ceil_n.png"]),_n([Xt+"textures/wall_ao.png"]),_n([Xt+"textures/wall2_ao.png"]),_n([Xt+"textures/wall3_ao.png"])]),p=gn(e,512),_=[p,t?gn(t,512):p,n?gn(n,512):p],g=[o?gn(o,512):{w:p.w,h:p.h,data:es(p,1.6)},a?gn(a,512):{w:p.w,h:p.h,data:es(_[1],1.6)},c?gn(c,512):{w:p.w,h:p.h,data:es(_[2],1.6)}],m=ed(1,512)[0],M=[u?gn(u,512):m,f?gn(f,512):m,d?gn(d,512):m],b=s?gn(s):Tc(45324),v=r?gn(r):Ec(49937),w=[b,v],S=[l?gn(l):{w:b.w,h:b.h,data:es(b,1.2)},h?gn(h):{w:v.w,h:v.h,data:es(v,1.2)}],T=this.gl;if(T){for(const x of[this.wallTex,this.wallNrm,this.tileTex,this.tileNrm,this.aoTex])x&&T.deleteTexture(x);this.wallTex=Jn(T,_,T.REPEAT),this.wallNrm=Jn(T,g,T.REPEAT),this.tileTex=Jn(T,w,T.MIRRORED_REPEAT),this.tileNrm=Jn(T,S,T.MIRRORED_REPEAT),this.aoTex=Jn(T,M,T.REPEAT)}})()}layout(e,t){const n=e.getBoundingClientRect(),s=n.width/Wo,r=n.height/Xo,o=n.left+t.x*s,a=n.top+t.y*r,c=t.w*s,l=t.h*r,h=this.canvas.style;h.left=`${o}px`,h.top=`${a}px`,h.width=`${c}px`,h.height=`${l}px`;const u=Math.min(window.devicePixelRatio||1,2),f=1.5,d=Math.max(1,Math.round(c*u*f)),p=Math.max(1,Math.round(l*u*f));(this.canvas.width!==d||this.canvas.height!==p)&&(this.canvas.width=d,this.canvas.height=p)}render(e){const t=this.gl;if(!t||!this.ok)return;if(e.map!==this.lastMap){this.lastMap=e.map;const T=e.map.w,x=e.map.h,R=new Uint8Array(T*x);for(let D=0;D<T*x;D++)R[D]=e.map.tiles[D]===1?255:0;t.activeTexture(t.TEXTURE2),t.bindTexture(t.TEXTURE_2D,this.mapTex),t.pixelStorei(t.UNPACK_ALIGNMENT,1),t.texImage2D(t.TEXTURE_2D,0,t.R8,T,x,0,t.RED,t.UNSIGNED_BYTE,R)}t.viewport(0,0,this.canvas.width,this.canvas.height),t.useProgram(this.prog),t.bindVertexArray(this.vao),t.activeTexture(t.TEXTURE0),t.bindTexture(t.TEXTURE_2D_ARRAY,this.wallTex),t.activeTexture(t.TEXTURE1),t.bindTexture(t.TEXTURE_2D_ARRAY,this.wallNrm),t.activeTexture(t.TEXTURE2),t.bindTexture(t.TEXTURE_2D,this.mapTex),t.activeTexture(t.TEXTURE3),t.bindTexture(t.TEXTURE_2D_ARRAY,this.tileTex),t.activeTexture(t.TEXTURE4),t.bindTexture(t.TEXTURE_2D_ARRAY,this.tileNrm),t.activeTexture(t.TEXTURE5),t.bindTexture(t.TEXTURE_2D_ARRAY,this.aoTex);const n=Dn[e.dir],s=n.x,r=n.y,o=Math.tan(this.halfFov),a=-r,c=s,l=this.canvas.width,h=this.canvas.height,u=e.pos[0],f=e.pos[1],d=[];for(const T of e.map.lights??[]){const x=T.x+.5+T.dx*.42,R=T.y+.5+T.dy*.42;d.push({depth:(x-u)*s+(R-f)*r,x,z:R,h:.6,col:[1.05,.5,.2],radius:2.8,intensity:.8,type:0,phase:T.x*1.7+T.y*2.3})}for(const T of e.map.sky??[]){const x=T.x+.5,R=T.y+.5;d.push({depth:(x-u)*s+(R-f)*r,x,z:R,h:3,col:[.44,.62,1],radius:7,intensity:.55,type:1,phase:T.x+T.y})}d.sort((T,x)=>T.depth-x.depth);const p=d.slice(0,Us-1);p.push({depth:.01,x:u+s*.3,z:f+r*.3,h:.5,col:[1,.74,.46],radius:2.2,intensity:.3,type:2,phase:0});const _=new Float32Array(Us*3),g=new Float32Array(Us*3),m=new Float32Array(Us*4),M=new Float32Array(Us*4);let b=0,v=0;for(const T of p)if(_[b*3]=T.x,_[b*3+1]=T.h,_[b*3+2]=T.z,g[b*3]=T.col[0],g[b*3+1]=T.col[1],g[b*3+2]=T.col[2],m[b*4]=T.radius,m[b*4+1]=T.intensity,m[b*4+2]=T.phase,m[b*4+3]=T.type,b++,T.type===0&&v<Us){const x=(T.x-u)*s+(T.z-f)*r;if(x>.1&&x<18){const P=(((T.x-u)*a+(T.z-f)*c)/x/o+1)*.5*l,F=h*.5+(T.h-.5)*(h/x),A=.17*(h/x);M[v*4]=P,M[v*4+1]=F,M[v*4+2]=A,M[v*4+3]=x,v++}}const w=new Float32Array(jf*2);let S=0;for(const T of e.map.sky??[]){if(S>=jf)break;w[S*2]=T.x,w[S*2+1]=T.y,S++}t.uniform1i(this.u.uNumLights??null,b),t.uniform3fv(this.u.uLightPos??null,_),t.uniform3fv(this.u.uLightCol??null,g),t.uniform4fv(this.u.uLightPar??null,m),t.uniform1i(this.u.uNumSky??null,S),t.uniform2fv(this.u.uSkyCell??null,w),t.uniform1i(this.u.uNumSpr??null,v),t.uniform4fv(this.u.uSpr??null,M),t.uniform2f(this.u.uRes??null,this.canvas.width,this.canvas.height),t.uniform2f(this.u.uPos??null,e.pos[0],e.pos[1]),t.uniform2f(this.u.uDir??null,s,r),t.uniform2f(this.u.uPlane??null,-r*Math.tan(this.halfFov),s*Math.tan(this.halfFov)),t.uniform2f(this.u.uMapSize??null,e.map.w,e.map.h),t.uniform1f(this.u.uTime??null,e.time),t.uniform1f(this.u.uWallScale??null,.25),t.uniform1f(this.u.uWallV??null,1),t.uniform1f(this.u.uTileScale??null,.5),t.uniform1f(this.u.uHalfFov??null,this.halfFov),t.uniform1f(this.u.uCyl??null,this.cyl?1:0),t.clear(t.COLOR_BUFFER_BIT),t.drawArrays(t.TRIANGLES,0,3)}}function ab(){const t=new Uint8Array(81).fill(Qt);for(let s=1;s<8;s++)t[s*9+4]=0;for(let s=1;s<8;s++)t[36+s]=0;const n={name:"Test Corridor",w:9,h:9,tiles:t,start:{x:4,y:6,dir:0}};return rd(n,32343),n}const Lc=document.getElementById("c"),Ir=document.getElementById("view"),Ll=new Cp(Lc),td=new Rp;JS();fw(nd().map(i=>i.id));IS();FS();AS();const js=new URLSearchParams(location.search),Qn=js.get("scene"),lb=Number(js.get("seed")??12648430),ri=Qn==="dungeon"||Qn==="testroom"?new ob(Ir):null;if(ri){js.get("proj")==="rect"&&(ri.cyl=!1),js.get("proj")==="cyl"&&(ri.cyl=!0);const i=Number(js.get("fov"));Number.isFinite(i)&&i>0&&(ri.halfFov=i*Math.PI/360)}const on={party:nd(),inventory:{draught:2,dew:1},gold:0,dungeon:Qn==="testroom"?ab():Nl(lb),gpu:ri?ri.ok:!1,setScene(i){hn=i,i.enter?.()}};let hn;if(Qn==="hall")hn=new is(on,()=>new ks(on));else if(Qn==="floor")hn=new is(on,()=>new ks(on,on.dungeon));else if(Qn==="world")hn=new is(on,()=>new ks(on,on.dungeon));else if(Qn==="town")hn=new is(on,()=>new ks(on));else if(Qn==="loading")hn=new is(on,()=>new ks(on,on.dungeon));else if(Qn==="dungeon"||Qn==="testroom"){const i=new vp(on),e=js.get("pose");if(e){const[t,n,s]=e.split(",").map(Number);i.setPose(t,n,s)}hn=i}else hn=new xp(on);Pp(i=>{try{ZS(i),hn.update(i,td),td.endFrame()}catch(e){document.title="UPDERR "+e.message}},()=>{try{const i=Ll.ctx;i.setTransform(Ll.scaleFactor,0,0,Ll.scaleFactor,0,0),i.imageSmoothingEnabled=!1,hn.render(i);const e=hn.viewState,t=e?e.call(hn):null,n=hn.glRender;n?(Ir.style.display="block",n.call(hn,Ir,Lc)):t&&ri&&ri.ok?(Ir.style.display="block",ri.layout(Lc,ot),ri.render(t)):Ir.style.display="none"}catch(i){document.title="RENDERERR "+i.message}});
