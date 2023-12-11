// Display Setting
let board;
let boardWidth = 800;
let boardHeight = 300;
let context;

// Player Setting
let playerWidth = 64;
let playerHeight = 64;
let playerX = 50;
let playerY = boardHeight - playerHeight;
let playerImg;
let player = {
    x: playerX,
    y: playerY,
    width: playerWidth,
    height: playerHeight
}

// physics
let velocitiY = 0;
let gravity = 0.25;

//tree setting
let treeImg;
let treeWidth = 70;
let treeHeight = 105;
let treeX = 700;
let treeY = boardHeight - treeHeight;

//generate tree
let treeArray = []
let treeSpeed = -3.5;

//game over
let gameOver = false;

//score system
let score = 0;

window.onload = function() {
     //display
     board = document.getElementById("board");
     board.height = boardHeight;
     board.width = boardWidth;
     context = board.getContext("2d");

     //player
     playerImg = new Image();
     playerImg.src="./Images/player.png";
     playerImg.onload = function() {
        context.drawImage(playerImg, player.x, player.y, player.width, player.height);
     }

     // tree
     treeImg = new Image();
     treeImg.src="./Images/tree.png";

     requestAnimationFrame(update);
     setInterval(createTree, 3000);
     document.addEventListener("keydown", movePlayer);
}

// Update Animation
function update() {
    requestAnimationFrame(update);

    if(gameOver) {
        return;
    }

    context.clearRect(0, 0, board.width, board.height)
    velocitiY += gravity;

    //create player object
    player.y = Math.min(player.y + velocitiY, playerY);
    context.drawImage(playerImg, player.x, player.y, player.width, player.height);

    //create tree object
    for(let i = 0; i < treeArray.length; i++) {
        let treeLoop = treeArray[i];
        treeLoop.x += treeSpeed;
        context.drawImage(treeLoop.img, treeLoop.x, treeLoop.y, treeLoop.width, treeLoop.height);

        if(onCollision(player, treeLoop)) {
            gameOver = true;
            context.font ="normal bold 20px Kodchasan";
            context.textAlign ="center";
            context.fillText("Game Over!", boardWidth / 2 , boardHeight / 2);
        }
    }
    // display score
    score++;
    context.font ="20px Kodchasan";
    context.textAlign ="left";
    context.fillText("score = " + score, 5, 20);
}

// Move Player
function movePlayer(event) {

    if(gameOver) {
        return;
    }

    if(event.code === "Space" && player.y === playerY) {
        velocitiY = -10;
    }
}

function createTree() {

    if(gameOver) {
        return;
    }

    let tree = {
        img: treeImg,
        x: treeX,
        y: treeY,
        width: treeWidth,
        height: treeHeight
    }
    treeArray.push(tree);

    if(treeArray.length > 5) {
        treeArray.shift();
    }
    // console.log(treeArray);
}

function onCollision(obj1, obj2) {
    return obj1.x<obj2.x+obj2.width &&
    obj1.x+obj1.width>obj2.x &&
    obj1.y<obj2.y+obj2.height &&
    obj1.y+obj1.height>obj2.y;
}

function restartGame(){
    location.reload();
}

// // ลากเส้น
// context.beginPath();
// context.lineWidth = 5;
// context.moveTo(40, 40);
// context.lineTo(240, 40);
// context.lineTo(240, 240);
// context.lineTo(40, 240);
// context.lineTo(40, 40);
// context.closePath();

// // สีเส้น
// context.strokeStyle = 'red';
// context.stroke();
// // เติมสี
// context.fillStyle = 'gold';
// context.fill()

// // รูปเลขาคณิต
// context.fillStyle = 'green';
// context.fillRect(80, 80, 100, 100);

// // เส้นขอบ
// context.lineWidth = 2;
// context.strokeStyle = 'green';
// context.strokeRect(60, 60, 100, 100);

// // Text
// context.lineWidth = 20;
// context.font = 'bold italic 60px Arial';
// context.strokeStyle = 'purple';
// context.strokeText('aomRunner', 100, 100);
// context.fillStyle = 'blue';
// context.fillText('aomRunner', 100, 100);