const canvas = document.querySelector('#game');
const ctx = canvas.getContext('2d');
const canvas_Width = canvas.width = 1000;
const canvas_Height = canvas.height = 800;
const playerImage = new Image();
const playerImage2 = new Image();
const playerImage3 = new Image();
playerImage.src = './QueenMarcy.png'
playerImage2.src = './FlameP.png'
playerImage3.src = './Goliad.png'
//playerImage4.src = './.png'
//}

class Component {
    constructor(x, y, width, height, color, img) {
        this.x = x;
        this.y = y;
        this.width = width;
        this.height = height;
        this.color = color;
        this.img = img
    }

    moveUp() {
        this.y -= 15;
    }
    moveDown() {
        this.y += 15;
    }
    moveLeft() {
        this.x -= 15;
    }
    moveRight() {
        this.x += 15;
    }
    collisionCheck(obstacle) {
        if (
            this.x < obstacle.x + obstacle.width &&
            this.x + this.width > obstacle.x &&
            this.y < obstacle.y + obstacle.height &&
            this.height + this.y > obstacle.y
        ) {
            // Collision detected!
            return true;
        } else {
            return false;
            // No collision
        }
    }


    draw() {
        //ctx.fillStyle = this.color;
        //ctx.fillRect(this.x, this.y, this.width, this.height)
        ctx.drawImage(this.img, this.x, this.y, this.width, this.height)
    }



    // draw() {
    //     ctx.fillStyle = this.color;
    //     ctx.fillRect(this.x, this.y, this.width, this.height)


    // }


}

class Obstacle extends Component {
    constructor(x, y, width, height, color, img) {
        super(x, y, width, height, color, img)
    }
    draw() {

        ctx.drawImage(this.img, this.x, this.y, this.width, this.height)
        //ctx.drawImage()
    }

}
///switch(event.code)moveUp(){
const player = new Component(0, 0, 40, 40, "red", playerImage);
window.addEventListener("keydown", function (event) {
    switch (event.code) {
        case 'ArrowUp':
            player.moveUp()
            break;
        case 'ArrowDown':
            player.moveDown()
            break
        case 'ArrowLeft':
            player.moveLeft()
            break;
        case 'ArrowRight':
            player.moveRight()
            break;
    }
});
const player2 = new Component(0, 0, 40, 40, "blue", playerImage2);
window.addEventListener("keydown", function (event) {
    switch (event.code) {
        case 'KeyW':
            player2.moveUp()
            break;
        case 'KeyS':
            player2.moveDown()
            break
        case 'KeyA':
            player2.moveLeft()
            break;
        case 'KeyD':
            player2.moveRight()
            break;
    }
});








let myIntervalId;

let frameCount = 10;

const obstacleArray = []

const animationloop = () => {

    frameCount++;

    if (frameCount % 10 == 0) {
        const ob1 = new Obstacle(canvas.width, Math.random() * canvas.height, 20, 20, 'yellow', playerImage3);
        const ob2 = new Obstacle(canvas.width, Math.random() * canvas.height, 100, 100, 'white', playerImage3);

        obstacleArray.push(ob1);
        obstacleArray.push(ob2);
    }





    ctx.clearRect(0, 0, canvas.width, canvas.height);

    for (let i = 0; i < obstacleArray.length; i++) {
        obstacleArray[i].moveLeft();
        if (player2.collisionCheck(obstacleArray[i])) {

            clearInterval(myIntervalId)

        }
        if (player.collisionCheck(obstacleArray[i])) {

            clearInterval(myIntervalId)
        }
        obstacleArray[i].draw();
    }

    //draw player
    player.draw();

    player2.draw()
};

let myStartButton = document.querySelector('#SG')
myStartButton.addEventListener('click', () => {
    myIntervalId = setInterval(animationloop, 50);
})


