const canvas = document.querySelector("canvas");
const ctx = canvas.getContext("2d");

const lineWidth = document.getElementById("line-width");
const color = document.getElementById("color");

canvas.width=800;
canvas.height=800;
ctx.lineWidth=lineWidth.value; //canvas width/height 아래에 lineWidth코드를 넣어야 적용 됨.

let isPainting = false;

function onMove(event){
    if(isPainting){
        ctx.lineTo(event.offsetX, event.offsetY);
        ctx.stroke();
    }
    ctx.moveTo(event.offsetX,event.offsetY);
}

function startPainting(){
    isPainting = true;
}

function cancelPainting(){
    isPainting=false;
    ctx.beginPath();
}

function onLineWidthChange(event){
    ctx.lineWidth = event.target.value;
}

function onColorChange(event){
    ctx.strokeStyle = event.target.value;
    ctx.fillStyle = event.target.value;
}
canvas.addEventListener("mousemove",onMove);
canvas.addEventListener("mousedown",startPainting);
canvas.addEventListener("mouseup",cancelPainting);
canvas.addEventListener("mouseleave",cancelPainting); //버그 해결

lineWidth.addEventListener("change",onLineWidthChange);
color.addEventListener("change",onColorChange);



