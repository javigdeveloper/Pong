// variables for the ball:
let xBall;
let yBall;
let size;
let circle;
// variables for the goalies:
let goalie;
let goalies = [];
let goalieSize = 100;
// again button and state of the game:
let again;
let lost;

function setup() {
  let cnv = createCanvas(windowWidth, windowHeight);
  cnv.style("display", "block");

  // creating the ball:
  xBall = windowWidth / 2;
  yBall = windowHeight / 2;
  size = 80;
  circle = new Circle(xBall, yBall, size);

  // creating the goalies:
  // array with the x points for left and right goalie:
  let xArr = [15, windowWidth - 15];
  // creating new goalie and pushing it to goalies array:
  for (let i = 0; i < xArr.length; i++) {
    let goalieData = {
      goalieXPos: xArr[i],
      goalieYPos: 200,
    };
    goalie = new Goalie(
      goalieData.goalieXPos,
      goalieData.goalieYPos,
      goalieData.goalieYPos + goalieSize
    );
    goalies.push(goalie);
  }

  again = createButton("Play again");
  again.style("font-size", "28px");
  again.style("display", "none");
  again.position(windowWidth / 2 - 50, windowHeight / 2);

  let instructionOne = createP("Player 1 press A to go up, Z to go down.");
  let instructionTwo = createP(
    "Player 2 press arrow up to go up, arrow down to go down."
  );
  instructionOne.position(100, 100);
  instructionTwo.position(900, 100);

  let start = createButton("Start");
  start.style("font-size", "28px");
  start.position(windowWidth / 2 - 40, 100);

  again.mousePressed(changeStyle);
  start.mousePressed(removeAndStart);

  function changeStyle() {
    again.style("display", "none");
    location.reload();
  }

  function removeAndStart() {
    start.style("display", "none");
    instructionOne.style("display", "none");
    instructionTwo.style("display", "none");
    lost = false;
  }
}

document.addEventListener("keydown", (e) => {
  switch (e.code) {
    case "ArrowDown":
      goalies[1].pressedDown();
      break;
    case "ArrowUp":
      goalies[1].pressedUp();
      break;
    case "KeyZ":
      goalies[0].pressedDown();
      break;
    case "KeyA":
      goalies[0].pressedUp();
      break;
    default:
      break;
  }
});

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
}

function draw() {
  background(200, 200, 220);
  circle.show();
  for (let i = 0; i < goalies.length; i++) {
    goalies[i].show();
  }
}

lost = true;
let xUp = true;
let yUp = true;
let speed = 7;
let give = 40;
let continueWhenLost = 20;
class Circle {
  constructor(xPos, yPos, r) {
    this.x = xPos;
    this.y = yPos;
    this.size = size;
  }

  show() {
    stroke(0, 0, 255);
    strokeWeight(10);
    noFill();
    ellipse(this.x, this.y, this.size);

    // bouncing off the goalies:
    if (xUp && !lost) {
      if (this.x + this.size / 2 + 5 < windowWidth - 22) {
        this.x += speed;
      } else {
        if (
          this.y < goalies[1].getPosition() - give ||
          this.y > goalies[1].getPosition() + goalieSize + give
        ) {
          this.x += speed * continueWhenLost;
          this.y += speed * continueWhenLost;
          lost = true;
          again.style("display", "block");
        } else {
          xUp = false;
        }
      }
    }

    if (!xUp && !lost) {
      if (this.x + this.size / 2 + 5 > this.size + 34) {
        this.x -= speed;
      } else {
        if (
          this.y < goalies[0].getPosition() - give ||
          this.y > goalies[0].getPosition() + goalieSize + give
        ) {
          this.x -= speed * continueWhenLost;
          this.y -= speed * continueWhenLost;
          lost = true;
          again.style("display", "block");
        } else {
          xUp = true;
        }
      }
    }

    // bouncing off the floor and ceiling:
    if (yUp && !lost) {
      if (this.y + this.size / 2 + 5 < windowHeight) {
        this.y += speed;
      } else {
        yUp = false;
      }
    }

    if (!yUp && !lost) {
      if (this.y + this.size / 2 + 5 > this.size + 10) {
        this.y -= speed;
      } else {
        yUp = true;
      }
    }
  }
}

class Goalie {
  constructor(xOne, yOne, yTwo) {
    this.xOne = xOne;
    this.yOne = yOne;
    this.xTwo = xOne;
    this.yTwo = yTwo;
  }

  show() {
    stroke(0, 50, 50);
    strokeWeight(20);
    line(this.xOne, this.yOne, this.xTwo, this.yTwo);
  }

  // moving goalie down:
  pressedDown() {
    this.yOne += 10;
    this.yTwo += 10;
  }

  // moving goalie up:
  pressedUp() {
    this.yOne -= 10;
    this.yTwo -= 10;
  }

  getPosition() {
    return this.yOne;
  }
}
