const canvas = document.getElementById("canvas");
const context = canvas.getContext("2d");
var ctx = canvas.getContext('2d');
var x = 0.01
var y = 0
var z = 0
var s = 10
var r = 28
var b = 8/3
var i = 0
var a = 0
var d = 0
function hex(n){
    var nybHexString = "0123456789ABCDEF";
    return String(nybHexString.substr((n >> 4) & 0x0F,1)) + nybHexString.substr(n & 0x0F,1);
  }
function equation(){
    i = i+1
    var red   = Math.sin(Math.PI/2000*i+2+1)*127+128
    var green  = Math.sin(Math.PI/2000*i+1)*127+128
    var blue   = Math.sin(Math.PI/2000*i+4+1)*127+128
    ctx.lineWidth = 1 + ((y+80)/90)+")"
    ctx.strokeStyle = "rgba("+red+", "+green+", "+blue+", "+((y+50)/90)+")"
    ctx.beginPath()
    ctx.lineTo(x*15+375,z*15+100)
    var dt = 0.01
    var  dx = (s * (y - x)) * dt
    var dy = (((r - z) * x ) - y) * dt
    var dz = (x * y - b * z) * dt
    x = dx + x
    y = dy + y
    z = dz + z
    ctx.lineTo(x*15+375,z*15+100)
    ctx.stroke()
    ctx.fillStyle = "rgba(0, 0, 0, 0.006)"
    // ctx.fillRect(0,0,1200,1200)
}

setInterval(equation)