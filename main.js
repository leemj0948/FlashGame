const MC = document.querySelector('.myCanvas');
const ctx = MC.getContext('2d');
document.addEventListener("mousemove",mouseMoveHandler,false);

let x = MC.width/2;
let y = MC.height - 30;

let dx=2;
let dy=-2;

let ballRadius = 5;

let paddleHeight =10;
let paddleWeight= 75;
let paddleX= (MC.width - paddleWeight)/2;

let rightPressed= false;
let leftPressed= false;

let brickRowCount= 3;
let brickColumnCount = 5;
let brickWidth= 40;
let brickHeight=10;
let brickPadding=8;
let brickOffsetTop= 10;
let brickOffsetLeft= 40;

let score =0;

let lives = 3; 

function drawLives() {
    ctx.font = "10px Arial";
    ctx.fillStyle =  'Black';
    ctx.fillText("Life: "+lives, MC.width-35,10);
}

let bricks= [];
for(let c=0; c<brickColumnCount; c++) {
    bricks[c] = [];
    for(let r=0; r<brickRowCount; r++) {
        bricks[c][r]= {x:0, y:0, status:1 };
    }
}

function collisionDetection(){
    for(let c=0; c<brickColumnCount; c++) {
        for(let r=0; r<brickRowCount; r++){
            let b= bricks[c][r];
            if(b.status == 1){
                if(x > b.x && x<b.x+brickWidth && y>b.y && y<b.y+brickHeight){
                    dy=-dy;
                    b.status = 0;
                    score+=10;
                    if(score ==brickRowCount*brickColumnCount* 10){

                        alert(`you win😾 you are score ${score}`);
                        document.location.reload();
                    }
                }
                
            }
            //calculations
        }
    }
}

function mouseMoveHandler(event){
    let relativeX = event.clientX - MC.offsetLeft;
    if(relativeX > 0 && relativeX < MC.width){
        paddleX = relativeX - paddleWeight/2;
    }
}

function drowScore(){
    ctx.font= "10px Arial";
    ctx.fillStyle = "black";
    ctx.fillText("Score: " + score, 8, 10);
}


function drawBricks(){
    for(let c=0; c<brickColumnCount;c++) {
        for(var r=0; r<brickRowCount; r++) {
            if(bricks[c][r].status == 1){
                let brickX= (c*(brickWidth+brickPadding))+brickOffsetLeft;
                let brickY= (r*(brickHeight+brickPadding))+brickOffsetTop;
                bricks[c][r].x = brickX;
                bricks[c][r].y=brickY;
                ctx.beginPath();
                ctx.rect(brickX,brickY, brickWidth, brickHeight);
                ctx.fillStyle = 'red';
                ctx.fill();
                ctx.closePath();
            } else if(bricks[c][r].status == 0){
                ctx.fillStyle = 'blue';
                ctx.fill();
            }
        }
    }
}

document.addEventListener("keydown",keyDownHandler,false);
document.addEventListener("keyup",keyUpHandler,false);

function keyDownHandler(event){
    if(event.keyCode == 39) {
        rightPressed = true;
    } else if ( event.keyCode == 37) {
        leftPressed = true;
    }
}

function keyUpHandler(event) {
    if(event.keyCode == 39){
        rightPressed = false;
    }else if (event.keyCode == 37){
        leftPressed = false;
    }
}



function drawPaddle(){
    ctx.beginPath();
    ctx.rect(paddleX,MC.height-paddleHeight,paddleWeight,paddleHeight);
    ctx.fillStyle="black";
    ctx.fill();
    ctx.closePath();
}


function drawBall(){
    ctx.beginPath();
    ctx.arc(x,y,ballRadius,0, Math.PI*2);
    ctx.fillStyle="green";
    ctx.fill();
    ctx.closePath();
    
}

function draw(){
    ctx.clearRect(0,0,MC.width,MC.height);
    drawBall();
    drawPaddle();
    drawBricks();
    collisionDetection();
    drowScore();
    drawLives()
    y +=dy;
    x +=dx;
    

    if(y+dy< ballRadius){
        
        dy=-dy;
    }else if (y+dy> MC.height - ballRadius){
        if(x> paddleX && x<paddleX+paddleWeight){
            dy=-dy;
        }else {
            lives --;
            if(!lives){
                alert(`GAME OVER😿 You'r Score = ${score} 👍🏻`);
                document.location.reload();
                
            }else if(lives==2) {
                x= MC.width/2;
                y=MC.height-30;
                dx = 1.5;
                dy = -1.5;
                paddleX= (MC.width-paddleWeight)/2;
            }else if(lives==1) {
                    x= MC.width/2;
                y=MC.height-30;
                dx = 1;
                dy = -1;
                paddleX= (MC.width-paddleWeight)/2;

            }
            

                
                
            }
        }
    
    
    

    if(x+dx> MC.width - ballRadius|| x+dx< ballRadius) {
        dx=-dx;
    }

    if(rightPressed && paddleX <MC.width-paddleWeight){
        paddleX +=2;
    }else if(leftPressed && paddleX >0){
        paddleX -=2;
    }
    
    x+=dx;
    y+=dy;
    requestAnimationFrame(draw);


}
draw();