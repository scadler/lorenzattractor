const canvas = document.getElementById("canvas");
const context = canvas.getContext("2d");
var ctx = canvas.getContext('2d');
var n = {
    x: 0.01,
    y: 0,
    z: 0,
    i: 0,
}
var sigma = 10
var rho = 28
var beta = 8/3
var graph = {
    axis : [ [n.x, n.y, n.z], [n.x, n.z, n.y], [n.y, n.z, n.x],],
    //these are the maxs of z,y,x * 50 +10
    xOffset: [332.5,332.5,460],   //x, x, y
    yOffset: [460,835,835],   //y, z, z
    maxVal: [55,30,21.5], 
    minVal: [0,29,21],
    fadeOut: false,
    n:1,
    drawColors: true,
    pause: false,
    lines: true,
};

function hex(n){
    var nybHexString = "0123456789ABCDEF";
    return String(nybHexString.substr((n >> 4) & 0x0F,1)) + nybHexString.substr(n & 0x0F,1);
  }
  //z min 0 max 55 813, x min -21 max 21.5 322.4, y min -29 max 30 -425.5 442.5
function equation(){
    graph.axis = [ [n.x, n.y, n.z], [n.x, n.z, n.y], [n.y, n.z, n.x] ];
    var c = 2*(graph.axis[graph.n][2]+graph.minVal[graph.n])/(graph.maxVal[graph.n]+graph.minVal[graph.n])
    n.i += 1
    if(graph.drawColors === true){
        var red   = Math.sin((Math.PI*c)+2+1)*127+128
        var green  = Math.sin((Math.PI*c)+1)*127+128
        var blue   = Math.sin((Math.PI*c)+4+1)*127+128
    }
    else if(graph.drawColors === false){
        var red = 56+(100*c)
        var green = 56+(100*c)
        var blue = 56+(100*c)
    }
    var width = 0.5*(graph.axis[graph.n][2]+graph.minVal[graph.n])/(graph.maxVal[graph.n]+graph.minVal[graph.n])
    var opacity = 0.6*(graph.axis[graph.n][2]+graph.minVal[graph.n])/(graph.maxVal[graph.n]+graph.minVal[graph.n])+0.4
    ctx.lineWidth = 0.5 + width
    ctx.strokeStyle = "rgba("+red+", "+green+", "+blue+", "+(opacity)+")"
    ctx.fillStyle = "rgba("+red+", "+green+", "+blue+", "+(opacity)+")"
    if(graph.lines === true){
        ctx.beginPath()
        ctx.lineTo(graph.axis[graph.n][0]*15+graph.xOffset[graph.n],-1*graph.axis[graph.n][1]*15+graph.yOffset[graph.n])
    }
    var dt = 0.01
    var  dx = (sigma * (n.y - n.x)) * dt
    var dy = (((rho - n.z) * n.x ) - n.y) * dt
    var dz = (n.x * n.y - beta * n.z) * dt
    n.x = dx + n.x
    n.y = dy + n.y
    n.z = dz + n.z
    graph.axis = [ [n.x, n.y, n.z], [n.x, n.z, n.y], [n.y, n.z, n.x] ];
    if(graph.lines === true){
        ctx.lineTo(graph.axis[graph.n][0]*15+graph.xOffset[graph.n],-1*graph.axis[graph.n][1]*15+graph.yOffset[graph.n])
        ctx.stroke()
    }
    else{
        var widthRect = 0.5*(graph.axis[graph.n][2]+graph.minVal[graph.n])/(graph.maxVal[graph.n]+graph.minVal[graph.n]) + 1.5
        // ctx.fillRect(100, 100, width, width)
        ctx.fillRect(graph.axis[graph.n][0]*15+graph.xOffset[graph.n], -1*graph.axis[graph.n][1]*15+graph.yOffset[graph.n], widthRect, widthRect)
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
function toggleColors(){
    graph.drawColors = !graph.drawColors 
    let label = (graph.drawColors === true) ? "Colorful" : "Monochrome"
    $("#colorBtn").text(label)
}
function toggleDrawing(){
    graph.pause = !graph.pause;
    let label = (graph.pause === false) ? "Pause" : "Resume"
    $("#drawingBtn").text(label)
}
function toggleLines(){
    graph.lines = !graph.lines;
    let label = (graph.lines === true) ? "Draw Dots" : "Draw Lines"
    $("#linesBtn").text(label)
}
function reset(){
    clear()
    n.x = 0.01
    n.y = 0
    n.z = 0
    n.i = 0
}
setInterval(function(){if(graph.pause === false){equation()}})

$("button").mousedown(function(e){
    e.preventDefault();
})