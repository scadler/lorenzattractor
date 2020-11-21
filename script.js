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
function hex(n){
    var nybHexString = "0123456789ABCDEF";
    return String(nybHexString.substr((n >> 4) & 0x0F,1)) + nybHexString.substr(n & 0x0F,1);
  }
function equation(){
    
    // ctx.moveTo((xo*12)+500,yo*12+500)
    i = i+1
    var red   = Math.sin(Math.PI/2000*i+2+1)*127+128
    var green  = Math.sin(Math.PI/2000*i+1)*127+128
    var blue   = Math.sin(Math.PI/2000*i+4+1)*127+128
    var color = "#" + hex(red) + hex(green) + hex(blue)
    ctx.lineWidth = z/30
    ctx.strokeStyle = "rgba("+red+", "+green+", "+blue+", "+z/50+")"
    ctx.beginPath()
    ctx.lineTo(x*12+375,y*12+375)
    var dt = 0.01
    var  dx = (s * (y - x)) * dt
    var dy = (((r - z) * x ) - y) * dt
    var dz = (x * y - b * z) * dt
    x = dx + x
    y = dy + y
    z = dz + z
    ctx.lineTo(x*12+375,y*12+375)
    ctx.stroke()
    ctx.fillStyle = "rgba(0, 0, 0, 0.005)"
    // ctx.fillRect(0,0,1000,1000)
}

setInterval(equation)