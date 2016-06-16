var ctx;
var canvas;

var f=[];
var cW = 500;	//キャンバス横サイズ
var cH = 500;	//キャンバス縦サイズ
var mouseX;
var mouseY;


var barrage=false;//弾幕を張るか
var bollsize=1;//ボールの大きさ
var t=0;
var timescale=50;
var boll=[];
var n=10;
var timer;

var myon=false;//切る
var Frandle=false;//分散
var Apart=false;//バラバラ
function reset(){boll=[];
		//矩形を描く
		ctx.beginPath();
		ctx.fillStyle = "#ffffff";
		ctx.fillRect(0, 0, cW, cH);

  ctx.beginPath();
draw();
}
function myclick(){}
window.onload = function() {//キャンバスの初期処理
canvas = document.getElementById('my-canvas');
	if ( ! canvas || ! canvas.getContext ) return false;
	ctx = canvas.getContext('2d');
ctx.translate(250,250); 
reset();
};
function Selc(Obj){
console.log(Obj.selectedIndex);
clearInterval(timer);
switch(Obj.selectedIndex){
case 0:
n=10;
timescale=50;
myon=false;
Frandle=false;
Apart=false;
break;
case 1:timescale=0;	break;
case 2:velocity(10);	break;
case 3:velocity(0.1);	break;
case 4:n*=10;		break;
case 5:n/=10;		break;
case 6:			return;
case 7:reset();		break;
case 8:myon=true;	break;
case 9:Frandle=true;	break;
case 10:Apart=true;	break;
}
clock();
}
function clock(){timer =setInterval("show()", timescale);}
function draw() {clock();
	//イベント：マウス移動
	canvas.onmousemove = mouseMoveListner;
	function mouseMoveListner(e) {adjustXY(e);}
	//イベント：マウスダウン
	canvas.onmousedown = mouseDownListner;
	function mouseDownListner(e) {adjustXY(e);barrage=true}
	//イベント：マウスアップ
	canvas.onmouseup = mouseUpListner;
	function mouseUpListner(e) {adjustXY(e);barrage=false}

	//イベント：マウスアウト
	canvas.onmouseout = mouseOutListner;
	function mouseOutListner(e) {adjustXY(e);barrage=false}
	function adjustXY(e) {
		var rect = e.target.getBoundingClientRect();
		mouseX = e.clientX - rect.left-250;
		mouseY = e.clientY - rect.top-250;
	}
}

function division(){

for(var i in boll)
if(boll[i][4]>Math.abs(mouseX-boll[i][0])&&
	boll[i][4]>Math.abs(mouseY-boll[i][1])){
var r=Math.sqrt(boll[i][2]*boll[i][2]+boll[i][3]*boll[i][3]);
boll[i][4]/=Math.sqrt(2);
boll.push([
boll[i][0]-2*boll[i][2]/r*boll[i][4],
boll[i][1]-2*boll[i][3]/r*boll[i][4],
-boll[i][2],-boll[i][3],boll[i][4]]);
boll[i][0]+=sign(boll[i][2])*boll[i][4];
boll[i][1]+=sign(boll[i][3])*boll[i][4];
break;
}

}
function scattering(){
for(var i in boll)
if(boll[i][4]>Math.abs(mouseX-boll[i][0])&&
	boll[i][4]>Math.abs(mouseY-boll[i][1])){

for(var j=0;j<boll[i][4]*n;j++){
boll.push([mouseX+i*Math.cos(i/boll[i][4]*2*Math.PI)*4
	  ,mouseY+i*Math.sin(i/boll[i][4]*2*Math.PI)*4
	  ,Math.cos(i/n*2*Math.PI)
	  ,Math.sin(i/n*2*Math.PI),1]);
console.log(j,boll[i][4]);
}
boll.splice(i,1);console.log(i);
break;
}
}
function add(){
var Myrandom=Math.random()*2*Math.PI;
for(var i=0;i<n;i++)
boll.push([mouseX+n*Math.cos(i/n*2*Math.PI)
	  ,mouseY+n*Math.sin(i/n*2*Math.PI)
	  ,2*Math.cos(i/n*2*Math.PI+Myrandom)
	  ,2*Math.sin(i/n*2*Math.PI+Myrandom),1]);
}
function velocity(v){//accelerate 10
for(var i=0;i<boll.length;i++){
if(boll[i][2]==0&&boll[i][3]==0){
var rand =Math.random()*2*Math.PI;
boll[i][2]=Math.cos(rand);
boll[i][3]=Math.sin(rand);
}
boll[i][2]*=v;
boll[i][3]*=v;

}
}
function show(){
		ctx.beginPath();
		ctx.fillStyle = "#ffffff";
		ctx.fillRect(-250, -250, cW, cH);
ctx.fillStyle = "#7f7fff";
  ctx.beginPath();
  ctx.arc(0,0, 250,0, 2 * Math.PI, false);
  ctx.fill();

ctx.fillStyle = "#ffffff";
a:for(var i in boll){
if(boll[i][4]>250||boll[i][4]<=0){boll.splice(i,1);continue;}
boll[i][0]+=boll[i][2];
boll[i][1]+=boll[i][3];
if(250<Math.sqrt(boll[i][0]*boll[i][0]
			+boll[i][1]*boll[i][1])+boll[i][4]){
var tmp=(boll[i][0]*boll[i][2]+boll[i][1]*boll[i][3])
/(boll[i][0]*boll[i][0]+boll[i][1]*boll[i][1]);
boll[i][2]-=2*tmp*boll[i][0];
boll[i][3]-=2*tmp*boll[i][1];
tmp=(250-boll[i][4])/Math.sqrt(boll[i][0]*boll[i][0]+boll[i][1]*boll[i][1]);
boll[i][0]*=tmp;
boll[i][1]*=tmp;
}
  ctx.beginPath();
  ctx.arc(boll[i][0], boll[i][1], boll[i][4],0, 2 * Math.PI, false);
  ctx.fill();
for(var j=0;j<i;j++){
var dr=
Math.sqrt((boll[i][0]-boll[j][0])*(boll[i][0]-boll[j][0])
	  +(boll[i][1]-boll[j][1])*(boll[i][1]-boll[j][1]));
	if(dr<boll[i][4]+boll[j][4]){
if(Apart){
boll[i][2]*=-1;
boll[i][3]*=-1;

boll[j][2]*=-1;
boll[j][3]*=-1;
}else{
boll[j][2]=
sign(boll[j][2])*(Math.abs(boll[i][2])+Math.abs(boll[j][2]));
boll[j][3]=
sign(boll[j][3])*(Math.abs(boll[i][3])+Math.abs(boll[j][3]));
boll[j][4]=Math.sqrt(boll[j][4]*boll[j][4]+boll[i][4]*boll[i][4]);
boll.splice(i,1);
}

continue a;
}
}
}
if(myon)division();
if(Frandle)scattering();
if(barrage)add();
t++;
}

function sign(n) {
    return !(n < 0) - !(n > 0);
}