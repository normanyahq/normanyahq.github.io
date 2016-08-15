var dt = 0.03;
var dt_vec = new Victor(dt, dt);
var G = 1e-3;
var GravityPower = 1;
var m1 = Math.random();
// var m2 = Math.random();
// var m3 = Math.random();
var m2 = m1;
var m3 = m1;
var pos1 = new Victor(1 - Math.random()/10, 0);
var pos2 = new Victor(0, 1-Math.random()/10);
var pos3 = new Victor(-1 + Math.random()/10, 0);
var pos_scale = 10;
var speed_scale = 50;
var w = window.innerWidth - 20;
var h = window.innerHeight;
canvas = document.getElementById('threeBodyBox');
canvas.setAttribute('width', w);
canvas.setAttribute('height', h);

pos1.divide(new Victor(pos_scale, pos_scale));
pos2.divide(new Victor(pos_scale, pos_scale));
pos3.divide(new Victor(pos_scale, pos_scale));

var v1 = new Victor(1 + Math.random()/10, 1 - Math.random()/10);
var v2 = new Victor(-1 - Math.random()/10, -1 + Math.random()/10);
v1.normalize();
v2.normalize();
//ensure the momentum of the whole system is zero.
var v3 = v1.clone().multiply(new Victor(m1, m1)).add(v2.clone().multiply(new Victor(m2, m2))).multiply(new Victor(-1./m3, -1./m3));
v1.divide(new Victor(speed_scale, speed_scale));
v2.divide(new Victor(speed_scale, speed_scale));
v3.divide(new Victor(speed_scale, speed_scale));

var new_pos1 = new Victor();
var new_pos2 = new Victor();
var new_pos3 = new Victor();

var c = document.getElementById("threeBodyBox");
var ctx = c.getContext("2d");
ctx.translate(w/2, h/2);
ctx.lineWidth = 10;
ctx.lineCap = 'round';
// init();
var drawTimer = setInterval(drawThreeBody, 1);

function bounceBackX(v) {
    v.x = - v.x;
    return v;
}

function bounceBackY(v) {
    v.y = - v.y;
    return v;
}

function bounce(pos, pos_threshold, v) {
    if (Math.abs(pos.x) > pos_threshold)
        v = bounceBackX(v);
    if (Math.abs(pos.y) > pos_threshold)
        v = bounceBackY(v);
    return v;
}

function isOutOfBound(pos, pos_threshold) {
    if (Math.abs(pos.x) > pos_threshold || Math.abs(pos.y) > pos_threshold)
        return true;
    return false;
}


function drawThreeBody() {
    var r12 = new Victor();
    var r13 = new Victor();
    var r23 = new Victor();


    r12.copy(pos2.clone().subtract(pos1));
    r13.copy(pos3.clone().subtract(pos1));
    r23.copy(pos3.clone().subtract(pos2));
    var r12_len = r12.length();
    var r13_len = r13.length();
    var r23_len = r23.length();
    r12.normalize();
    r13.normalize();
    r23.normalize();
    a12 = G * m2 / Math.pow(r12_len, GravityPower) ;
    a13 = G * m3 / Math.pow(r13_len, GravityPower);
    a1 = r12.clone().multiply(new Victor(a12, a12)).add(r13.clone().multiply(new Victor(a13, a13)));
    a21 = - G * m1 / Math.pow(r12_len, GravityPower);
    a23 = G * m3 / Math.pow(r23_len, GravityPower);
    a2 = r12.clone().multiply(new Victor(a21, a21)).add(r23.clone().multiply(new Victor(a23, a23)));
    a31 = - G * m1 / Math.pow(r13_len, GravityPower);
    a32 = - G * m2 / Math.pow(r23_len, GravityPower);
    a3 = r13.clone().multiply(new Victor(a31, a31)).add(r23.clone().multiply(new Victor(a32, a32)));

    ctx.fillStyle = 'rgba(255, 255, 255, .15)';
    ctx.fillRect(-w/2, -h/2, w, h);
    ctx.beginPath();
    ctx.moveTo(pos1.x * w, pos1.y * h);
    new_pos1.copy(v1.clone().multiply(dt_vec).add(pos1));
    ctx.lineTo(new_pos1.x * w, new_pos1.y * h);
    ctx.strokeStyle = "#ff0000";
    ctx.stroke();

    ctx.beginPath();
    ctx.moveTo(pos2.x * w, pos2.y * h);
    new_pos2.copy(v2.clone().multiply(dt_vec).add(pos2));
    ctx.lineTo(new_pos2.x * w, new_pos2.y * h);
    ctx.strokeStyle = "#00ff00";
    ctx.stroke();

    ctx.beginPath();
    ctx.moveTo(pos3.x * w, pos3.y * h);
    new_pos3.copy(v3.clone().multiply(dt_vec).add(pos3));
    ctx.lineTo(new_pos3.x * w, new_pos3.y * h);
    ctx.strokeStyle = "#0000ff";
    ctx.stroke();

    v1.add(a1.multiply(dt_vec));
    v2.add(a2.multiply(dt_vec));
    v3.add(a3.multiply(dt_vec));
    pos1.copy(new_pos1);
    pos2.copy(new_pos2);
    pos3.copy(new_pos3);

};
