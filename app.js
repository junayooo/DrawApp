const canvas = document.querySelector("canvas");
const ctx = canvas.getContext("2d");

const lineWidth = document.getElementById("line-width");
const color = document.getElementById("color");
const colorOptions = Array.from(document.getElementsByClassName("color-option")) // Array.from으로 배열 생성해야 forEach를 사용할 수 있음
const modeBtn = document.getElementById("mode-btn");
const destroyBtn = document.getElementById("destroy-btn");
const eraserBtn = document.getElementById("eraser-btn");

const CANVAS_WIDTH = 800;
const CANVAS_HEIGHT = 800;

canvas.width=CANVAS_WIDTH;
canvas.height=CANVAS_HEIGHT;
ctx.lineWidth=lineWidth.value; //canvas width/height 아래에 lineWidth코드를 넣어야 적용 됨.

let isPainting = false;
let isFilling = false;

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

function onColorClick(event){
    const colorValue = event.target.dataset.color; //data-color에 있는 값을 가져옴
    ctx.strokeStyle = colorValue;
    ctx.fillStyle = colorValue;
    color.value = colorValue; //사용자가 클릭한 걸 알아차릴 수 있게 클릭 시 컬러 색상 변경
}

function onModeClick(){
    if (isFilling) {
        isFilling = false;
        modeBtn.innerText = "Fill";
    }
    else{
        isFilling=true;
        modeBtn.innerText="Draw";
    }
}

function onCanvasClick(){
    if(isFilling){
        ctx.fillRect(0,0,CANVAS_WIDTH,CANVAS_HEIGHT);
    }
}

function onDestroyClick(){
    ctx.fillStyle = "white";
    ctx.fillRect(0,0,CANVAS_WIDTH,CANVAS_HEIGHT);
}

function onEraserClick(){
    ctx.strokeStyle = "white";
    isFilling = false;
    modeBtn.innerText = "Fill";
}

canvas.addEventListener("mousemove",onMove);
canvas.addEventListener("mousedown",startPainting);
canvas.addEventListener("mouseup",cancelPainting);
canvas.addEventListener("mouseleave",cancelPainting); //버그 해결

lineWidth.addEventListener("change",onLineWidthChange); // 선 굵기 변경
color.addEventListener("change",onColorChange); //color 선택

colorOptions.forEach((color)=>color.addEventListener("click",onColorClick)); // color-option 선택

modeBtn.addEventListener("click",onModeClick); // draw, fill 선택하기
canvas.addEventListener("click",onCanvasClick); //canvas fill하기

destroyBtn.addEventListener("click",onDestroyClick); // canvas 전체 다 지우기
eraserBtn.addEventListener("click",onEraserClick); // canvas 부분 지우기


