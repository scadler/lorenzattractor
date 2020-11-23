const canvas = document.getElementById("canvas");
const context = canvas.getContext("2d");
var ctx = canvas.getContext('2d');
var x = 0.01
var y = 0
var z = 0
var sigma = 10
var rho = 28
var beta = 8/3
var xm = 100
var xM = 0
var ym = 100
var yM = 0
var zm = 100
var zM = 0
//vars n and i are counters
var graph = {
    axis : [ [x, y, z], [x, z, y], [y, z, x],],
    //these are the maxs of z,y,x * 50 +10
    xOffset: [332.5,332.5,460],   //x, x, y
    yOffset: [460,835,835],   //y, z, z
    maxVal: [55,30,21.5], 
    minVal: [0,29,21],
    fadeOut: false,
    n:1,
};
var i = 0
function hex(n){
    var nybHexString = "0123456789ABCDEF";
    return String(nybHexString.substr((n >> 4) & 0x0F,1)) + nybHexString.substr(n & 0x0F,1);
  }
  //z min 0 max 55 813
  //x min -21 max 21.5 322.4
  //y min -29 max 30 -425.5 442.5
function equation(){
    graph.axis = [ [x, y, z], [x, z, y], [y, z, x] ];
    i = (i+1) % 2000
    var red   = Math.sin(Math.PI/2000*i+2+1)*127+128
    var green  = Math.sin(Math.PI/2000*i+1)*127+128
    var blue   = Math.sin(Math.PI/2000*i+4+1)*127+128
    var width = 0.5*(graph.axis[graph.n][2]+graph.minVal[graph.n])/(graph.maxVal[graph.n]+graph.minVal[graph.n])
    var opacity = 0.6*(graph.axis[graph.n][2]+graph.minVal[graph.n])/(graph.maxVal[graph.n]+graph.minVal[graph.n])+0.4
    ctx.lineWidth = 0.5 + width
    ctx.strokeStyle = "rgba("+red+", "+green+", "+blue+", "+(opacity)+")"
    ctx.beginPath()
    ctx.lineTo(graph.axis[graph.n][0]*15+graph.xOffset[graph.n],-1*graph.axis[graph.n][1]*15+graph.yOffset[graph.n])
    var dt = 0.01
    var  dx = (sigma * (y - x)) * dt
    var dy = (((rho - z) * x ) - y) * dt
    var dz = (x * y - beta * z) * dt
    x = dx + x
    y = dy + y
    z = dz + z
    if(yM < y){
        yM = y
        console.log(yM*15+" "+"Ymax")
    }
    if(y < ym){
        ym = y
        console.log(ym*15+" "+"Ymin")
    }
    if(xM < x){
        xM = x
        console.log(xM*15+" "+"Xmax")
    }
    if(xm > x){
        xm = x
        console.log(xm*15+" "+"Xmin")
    }
    if(zM < z){
        zM = z
        console.log(zM*15+" "+"Zmax")
    }
    if(zm > z){
        zm = z
        console.log(zm*15+" "+"Zmin")
    }
    graph.axis = [ [x, y, z], [x, z, y], [y, z, x] ];
    ctx.lineTo(graph.axis[graph.n][0]*15+graph.xOffset[graph.n],-1*graph.axis[graph.n][1]*15+graph.yOffset[graph.n])
    ctx.stroke()
    if(graph.fadeOut === true){
    ctx.fillStyle = "rgba(0, 0, 0, 0.006)"
    ctx.fillRect(0,0,1200,1200)
    }
}
function clear(){
    ctx.fillStyle = "#000000"
    ctx.fillRect(0,0,1200,1200)
}
function wipe(){
    clear()
}
function switchAxis(){
    clear()
    graph.n = (graph.n+1)%3
}
function toggleFade(){
    graph.fadeOut = !graph.fadeOut
}

setInterval(equation)

$("button").mousedown(function(e){
    e.preventDefault();
})