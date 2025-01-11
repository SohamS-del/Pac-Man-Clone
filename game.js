const canvas = document.getElementById("canvas");
const canvasContext = canvas.getContext("2d");
const pacmanFrames = document.getElementById("animations");
const ghostFrames = document.getElementById("ghosts");

let createRect = (x,y,width,height,color) => {
    canvasContext.fillStyle = color;
    canvasContext.fillRect(x,y,width,height);
};
let fps = 30;
let oneBlockSize =20;
let wallcolor = "red";
let wallSpaceWidth = oneBlockSize /1.5;
let wallOffset = (oneBlockSize - wallSpaceWidth)/2;
let wallInnerColor = "black";
let foodColor = "white";
let score = 0;


//Move Direction
const DIRECTION_RIGHT = 4;
const DIRECTION_UP = 3;
const DIRECTION_LEFT = 2;
const DIRECTION_BOTTOM = 1;

let map = [
    [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
    [1, 2, 2, 2, 2, 2, 2, 2, 2, 2, 1, 2, 2, 2, 2, 2, 2, 2, 2, 2, 1],
    [1, 2, 1, 1, 1, 2, 1, 1, 1, 2, 1, 2, 1, 1, 1, 2, 1, 1, 1, 2, 1],
    [1, 2, 1, 1, 1, 2, 1, 1, 1, 2, 1, 2, 1, 1, 1, 2, 1, 1, 1, 2, 1],
    [1, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 1],
    [1, 2, 1, 1, 1, 2, 1, 2, 1, 1, 1, 1, 1, 2, 1, 2, 1, 1, 1, 2, 1],
    [1, 2, 2, 2, 2, 2, 1, 2, 2, 2, 1, 2, 2, 2, 1, 2, 2, 2, 2, 2, 1],
    [1, 1, 1, 1, 1, 2, 1, 1, 1, 2, 1, 2, 1, 1, 1, 2, 1, 1, 1, 1, 1],
    [0, 0, 0, 0, 1, 2, 1, 2, 2, 2, 2, 2, 2, 2, 1, 2, 1, 0, 0, 0, 0],
    [1, 1, 1, 1, 1, 2, 1, 2, 1, 1, 2, 1, 1, 2, 1, 2, 1, 1, 1, 1, 1],
    [1, 2, 2, 2, 2, 2, 2, 2, 1, 2, 2, 2, 1, 2, 2, 2, 2, 2, 2, 2, 1],
    [1, 1, 1, 1, 1, 2, 1, 2, 1, 2, 2, 2, 1, 2, 1, 2, 1, 1, 1, 1, 1],
    [0, 0, 0, 0, 1, 2, 1, 2, 1, 1, 1, 1, 1, 2, 1, 2, 1, 0, 0, 0, 0],
    [0, 0, 0, 0, 1, 2, 1, 2, 2, 2, 2, 2, 2, 2, 1, 2, 1, 0, 0, 0, 0],
    [1, 1, 1, 1, 1, 2, 2, 2, 1, 1, 1, 1, 1, 2, 2, 2, 1, 1, 1, 1, 1],
    [1, 2, 2, 2, 2, 2, 2, 2, 2, 2, 1, 2, 2, 2, 2, 2, 2, 2, 2, 2, 1],
    [1, 2, 1, 1, 1, 2, 1, 1, 1, 2, 1, 2, 1, 1, 1, 2, 1, 1, 1, 2, 1],
    [1, 2, 2, 2, 1, 2, 2, 2, 2, 2, 1, 2, 2, 2, 2, 2, 1, 2, 2, 2, 1],
    [1, 1, 2, 2, 1, 2, 1, 2, 1, 1, 1, 1, 1, 2, 1, 2, 1, 2, 2, 1, 1],
    [1, 2, 2, 2, 2, 2, 1, 2, 2, 2, 1, 2, 2, 2, 1, 2, 2, 2, 2, 2, 1],
    [1, 2, 1, 1, 1, 1, 1, 1, 1, 2, 1, 2, 1, 1, 1, 1, 1, 1, 1, 2, 1],
    [1, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 1],
    [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
    
];

let drawFoods = () => {
    for(i=0;i<map.length;i++){
        for(j=0;j<map[0].length;j++){
            if(map[i][j] == 2){
                createRect(j*oneBlockSize+ oneBlockSize/3,
                    i*oneBlockSize + oneBlockSize/3,
                    oneBlockSize/3,
                    oneBlockSize/3,
                    foodColor
                );
            }
        }
    }
}

let gameloop = () => {
    update();
    draw();
    
}
 
let update = () => {
    //todo
    pacman.moveProcess();  
    pacman.eat();
}

let drawScore = () =>{
    canvasContext.font = "20px Emulogic";
    canvasContext.fillstyle = "white";
    canvasContext.fillText("Score: " + score,
        0,
        oneBlockSize *(map.length+1)) ;


};

let draw = () => {
     //todo
     createRect(0,0,canvas.width,canvas.height,"black")
     drawWalls();
     drawFoods();
     pacman.draw();
     drawScore();
}

let gameInterval = setInterval(gameloop,1000/fps)

let drawWalls = () => {
    for(let i=0;i<map.length;i++){
        for(let j=0;j<map[0].length;j++){
            if(map[i][j] == 1){ //then it is a wall
                createRect(
                    j*oneBlockSize,
                    i*oneBlockSize,
                    oneBlockSize,
                    oneBlockSize,
                    wallcolor
                )
                if(j > 0 && map[i][j-1] == 1){
                    createRect(
                        j*oneBlockSize,
                        i*oneBlockSize + wallOffset,
                        wallSpaceWidth + wallOffset,
                        wallSpaceWidth,
                        wallInnerColor

                    )
                };
                if(j < map[0].length - 1 && map[i][j+1] == 1) {
                    createRect(
                        j*oneBlockSize + wallOffset,
                        i*oneBlockSize + wallOffset,
                        wallSpaceWidth + wallOffset,
                        wallSpaceWidth ,
                        wallInnerColor

                    );
                };
                if(i > 0 && map[i-1][j] == 1){
                    createRect(
                        j*oneBlockSize + wallOffset,
                        i*oneBlockSize  ,
                        wallSpaceWidth ,
                        wallSpaceWidth + wallOffset,
                        wallInnerColor

                    )
                };
                if(i < map.length - 1 && map[i+1][j] == 1) {
                    createRect(
                        j*oneBlockSize + wallOffset,
                        i*oneBlockSize + wallOffset,
                        wallSpaceWidth,
                        wallSpaceWidth  + wallOffset,
                        wallInnerColor

                    );
                
                }
            }
        }
    }
};

let createNewPacman = () => {
    pacman = new Pacman(
        oneBlockSize,
        oneBlockSize,
        oneBlockSize,
        oneBlockSize,
        oneBlockSize/5
    );
};

createNewPacman();
gameloop();

window.addEventListener("keydown", (event) =>{
    let k = event.key;

    setTimeout(() =>{
        if(k==='a' || k==='A'|| k==="ArrowLeft"){
            //left
            pacman.nextDirection = DIRECTION_LEFT;
        }else if(k==='w' || k==='W'|| k==="ArrowUp"){
            //up
            pacman.nextDirection = DIRECTION_UP;
        }else if(k==='d' || k==='D'|| k==="ArrowRight"){
            //right
            pacman.nextDirection = DIRECTION_RIGHT;
        }else if(k==='s' || k==='S'|| k==="ArrowDown"){
            //bottom
            pacman.nextDirection = DIRECTION_BOTTOM;
        }

    },1)
})