document.addEventListener("DOMContentLoaded", () => {
  const grid = document.querySelector(".grid");
  const bird = document.createElement("div");

  const height = 600;
  const width = 400;
  let gameOver = false;
  let birdBottomSpace = 0;
  let pillars = [];
  let numberOfPillars = 2;
  let upTimerId;
  let downTImerId;
  let isJumping = false;

  function createBird() {
    grid.appendChild(bird);
    bird.classList.add("bird");
    birdBottomSpace = pillars[0].bottomPillarHeight + 75;
    bird.style.bottom = birdBottomSpace + "px";
    bird.style.left = pillars[0].left + "px";
  }

  class Pillar {
    constructor(left) {
      this.left = left;
      this.minHeight = 200;
      this.maxHeight = 400;
      this.gap = 200;
      this.topPillarHeight =
        Math.random() * (this.maxHeight - this.minHeight + 1 + this.minHeight);
      this.bottomPillarHeight = height - (this.gap + this.topPillarHeight);
      this.topPillarVisual = document.createElement("div");
      this.bottomPillarVisual = document.createElement("div");

      const topPillarVisual = this.topPillarVisual;
      grid.appendChild(topPillarVisual);
      topPillarVisual.classList.add("pillar-top");
      topPillarVisual.style.height = this.topPillarHeight + "px";
      topPillarVisual.style.left = this.left + "px";

      const bottomPillarVisual = this.bottomPillarVisual;
      grid.appendChild(bottomPillarVisual);
      bottomPillarVisual.classList.add("pillar-bottom");
      bottomPillarVisual.style.height = this.bottomPillarHeight + "px";
      bottomPillarVisual.style.left = this.left + "px";
    }
  }

  function createPillar() {
    for (let i = 0; i < numberOfPillars; i++) {
      let left = 100 + (width / numberOfPillars) * i;
      let pillar = new Pillar(left);
      pillars.push(pillar);
    }
  }

  function jump() {
    clearInterval(downTImerId);
    isJumping = true;
    let counter = 0;

    upTimerId = setInterval(function () {
      counter++;
      if (counter < 15) {
        birdBottomSpace += 20;
        bird.style.bottom = birdBottomSpace + "px";
      } else {
        fall();
      }
    }, 50);
  }

  function fall(){
      clearInterval(upTimerId);
      isJumping = false;
      downTImerId = setInterval(function(){
          if(birdBottomSpace>=0){
            birdBottomSpace-=15;
            bird.style.bottom = birdBottomSpace + 'px';
          }
          else{
              endGame();
          }
          
      },50)
  }
  function endGame(){
      gameOver = true;
      clearInterval(upTimerId);
      clearInterval(downTImerId);
  }

  function start() {
    if (gameOver) {
      return;
    }
    createPillar();
    createBird();
    jump();
  }

  start();
});
