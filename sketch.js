let Rb, Re, Rh, Rla, Rll, Rra, Rrl, F, Bb, Bw, B, L, R, La, Lb, Lc, Ld, Le, Lf, M, Gf, Ga, Gb, Gc, Gd, Ge;
let mic;
let mode = 0;
let micLevel =0;
let audioContext;
let micStarted = false;
let curState = 1;
let birdX = 190; // 초기 X 위치 (오른쪽 하단 시작)
let birdY = 600; // 초기 Y 위치 (오른쪽 하단 시작)
let birdSpeed = 2; // 이동 속도

function preload() {
  B = loadImage('img/mount-B.png');
  L = loadImage('img/mount-L.png');
  R = loadImage('img/mount-R.png');
  La = loadImage('img/lar-1.png');
  Lb = loadImage('img/lar-2.png');
  Lc = loadImage('img/lar-3.png');
  Ld = loadImage('img/lar-4.png');
  Le = loadImage('img/lar-5.png');
  Lf = loadImage('img/lar-6.png');
  M = loadImage('img/moon.png');
  Ga = loadImage('img/grass-a.png');
  Gb = loadImage('img/grass-b.png');
  Gc = loadImage('img/grass-c.png');
  Gd = loadImage('img/grass-d.png');
  Ge = loadImage('img/grass-e.png');
  Gf = loadImage('img/grass-f.png');
  Bb = loadImage('img/bird-b.png');
  Bw = loadImage('img/bird-w.png');
  F = loadImage('img/fish.png');
  Rb = loadImage('img/rice-b.png');
  Re = loadImage('img/rice-e.png');
  Rh = loadImage('img/rice-h.png');
  Rla = loadImage('img/rice-la.png');
  Rll = loadImage('img/rice-ll.png');
  Rra = loadImage('img/rice-ra.png');
  Rrl = loadImage('img/rice-rl.png');
}


function startMic() {
  if (!micStarted) {
    getAudioContext().resume();
    mic.start();
  } else {
    mic.stop();
  }

  micStarted = !micStarted;
}


function setup() {
  createCanvas(390, 900);
  mic = new p5.AudioIn();
  mic.start();
  getAudioContext().resume();

  angleMode(DEGREES);
  imageMode(CENTER);
  startMicButton = createButton("Start Mic").position(20, 10).mousePressed(startMic);

  audioContext = getAudioContext();


  // 물고기 객체 초기화
  for (let i = 0; i < numFish; i++) {
    fishImages.push({
      x: random(width),         // 초기 X 위치
      y: random(height),        // 초기 Y 위치
      vx: random(-fishSpeed, fishSpeed), // X 축 속도
      vy: random(-fishSpeed, fishSpeed), // Y 축 속도
      angle: random(TWO_PI),    // 초기 회전 각도 (0부터 2*PI 사이의 랜덤값)
      rotationSpeed: random(0.02, 0.05) // 회전 속도
    });
  }
}


function draw(){


  if(curState ==1) stage1();
  if(curState ==2) stage2();
  
  
}



function stage1(){
  background(200);
  image(M,150,200);

}


function stage2(){
  micLevel = mic.getLevel();

    if (frameCount % 180 == 0){
      mode++;
  }
  if (mode == 0){
      mountain();
  }
  else if (mode == 1){
      larva();
  }
  else if (mode == 2){
    grass();
  }  
  else if (mode == 3){
  moon();
  }
  else if (mode == 4){
  bird();
  }
  else if (mode == 5){
    rice();
    }
  else {
    fish();
  if(frameCount % 1360 == 0) 
      mode=0;
  }

  text(mouseX +' ' + mouseY, mouseX, mouseY);

  console.log(micLevel);
  startMicButton.hide();
}


function mousePressed() {
  if (
    mouseX > 0 &&
    mouseX < windowWidth &&
    mouseY > 0 &&
    mouseY < windowHeight
  ) {
    
    curState = 2;
    let fs = fullscreen();
    fullscreen(!fs);
  }
}

function mountain(){
  background('#C9E5FF');

  let value = map(micLevel, 0,1,0,800);
  text(value,50,100);
  
  push();
    imageMode(CORNER);
    translate(30,410);
    rotate(-5+value*2);
    image(L, 0, 0-value*10);
  pop();
  push();
    imageMode(CORNER);
    translate(185,420);
    rotate(10+value*-2);
    image(R, 0, 0+value-80);
  pop();
  push();
    image(B, 190, 420-value*6-100);
  pop();
  //image(L, 170, 600-value*4-80);
}





function larva(){
  background('#76D4E0');
 
  let value = micLevel*800;
  text(value,50,100);
  
  push();
    image(La, 190+value*20, 170);
    image(Lb, 190-value*20, 300);
    image(Lc, 190+value*20, 410);
    image(Ld, 190-value*20, 500);
    image(Le, 190+value*20, 595);
    image(Lf, 190-value*20, 680);
  pop();
}




function moon(){
  background('#373640');
  let value = micLevel*800;
  text(value,50,100);
  
  push();
    let angle = frameCount * 0.1;
    rotate(angle);
    tint(255, 100+value*50);
    image(M, 190, 400);
  pop();
  push();
    let angle2 = frameCount* 0.1;
    rotate(angle2);
    tint(255, 100+value*50);
    image(M, 500, 50);
  pop();
}



function grass(){
  background('#D1C52C');
  let value = micLevel*800;
  text(value, 50, 100);

  push();
    translate(-20,700);
    rotate(value*2);
    image(Ga, 0, 0);
  pop();
  push();
    translate(110,630);
    rotate(-value);
    image(Gb, 0, 0);
  pop();
  push();
    translate(200,570);
    rotate(value);
    image(Gc, 0, 0);
  pop();
  push();
    translate(280,570);
    rotate(-value);
    image(Gd, 0, 0);
  pop();
  push();
    translate(340,680);
    rotate(value);
    image(Ge, 0, 0);
  pop();
  push();
    translate(190, 750);
    rotate(-value);
    image(Gf, 0, 0);
  pop();


  push();
    translate(-20,220);
    rotate(-value*2);
    image(Ga, 0, 0);
  pop();
  push();
    translate(110,170);
    rotate(value);
    image(Gb, 0, 0);
  pop();
  push();
    translate(200,110);
    rotate(-value);
    image(Gc, 0, 0);
  pop();
  push();
    translate(280,110);
    rotate(value);
    image(Gd, 0, 0);
  pop();
  push();
    translate(340,210);
    rotate(value);
    image(Ge, 0, 0);
  pop();
  push();
    translate(190, 290);
    rotate(value);
    image(Gf, 0, 0);
  pop();
}




function bird() {
  background('#54D778');
  let value = micLevel * 800; // 소리 크기 기반 값
  text(value, 50, 100);

  // Bb 이미지 - 위아래로 진동 + 소리 크기에 따른 범위 확대
  let bounce = sin(frameCount * 10) * (10 + value); // 진동 범위가 value에 따라 커짐

  push();
    imageMode(CENTER);
    translate(170, 600 + bounce); // 진동 값을 더해 위아래 이동
    image(Bb, 0, value * -40); 
  pop();

  // Bw 이미지 - 일정 각도 내에서 반복 회전 + 소리 크기에 따른 회전 속도
  push();
    imageMode(CORNER);
    translate(190, 530+ bounce);

    // 회전 각도 계산: -30도 ~ +30도 범위에서 진동
    let angle = sin(frameCount * 5 * (1 + micLevel * 5)) * 15;
    rotate(angle);

    image(Bw, 0, value * -40);
  pop();
}


let fishImages = []; // 물고기 정보를 담을 배열
let numFish = 5; // 물고기 개수
let fishSpeed = 1; // 이동 속도 기본값



  

function fish(){


  background('#DAEA42');

  micLevel = mic.getLevel(); // 마이크 입력값 업데이트
  let slowFactor = micLevel > 0.01 ? 0.1 : 1; // 소리가 크면 속도 느리게

  // 모든 물고기들에 대해 업데이트 및 그리기
  for (let fish of fishImages) {
    // 위치 업데이트 (소리 크기에 따라 이동 속도 조정)
    fish.x += fish.vx * slowFactor;
    fish.y += fish.vy * slowFactor;

    // 화면 경계를 벗어나면 속도 반전
    if (fish.x < 0 || fish.x > width) fish.vx *= -1;
    if (fish.y < 0 || fish.y > height) fish.vy *= -1;

    // 회전 각도 업데이트
    fish.angle = sin(frameCount * 2) * 15; // 부드러운 회전

    fish.angle += fish.rotationSpeed;
    let size = micLevel > 0.01 ? 300 : 200; // 소리가 일정 크기 이상이면 크기 증가


    // 물고기 그리기
    push();
    translate(fish.x, fish.y); // 물고기 위치로 이동
    rotate(fish.angle);        // 각도 회전
    imageMode(CENTER);         // 이미지를 중심 기준으로
    image(F, 0, 0, size, size);    // 물고기 이미지 크기 80x80
    pop();
  }

  // 디버그: 소리 크기 표시
  fill(0);
  textSize(16);
  text('Mic Level: ' + micLevel.toFixed(2), 10, 20);
}




function rice(){
  background('#2C97A3');
  let value = map(micLevel, 0,1,0,800);
  text(value, 50, 100);

  push();
    translate(195, 370);
    image(Rb, 0, 0, 130+value, 130+value);
  pop();

  push();
    translate(195, 340);
    image(Rh, 0, 0-value);
  pop();

  push();
    translate(165, 325);
    image(Re, 0-value*3, 0-value*2);
  pop();

  push();
    translate(205, 320);
    image(Re, 0+value*3, 0-value*3);
  pop();

  push();
    translate(100, 390);
    image(Rla, 0-value, 0-value);
  pop();

  push();
    translate(135, 450);
    rotate(0+value*0.5)
    image(Rll, 0-value, 0+value*1.5);
  pop();

  push();
    translate(260, 390);
    rotate(0-value*0.5)
    image(Rra, 0+value*1.5, 0-value);
  pop();

  push();
    translate(250, 450);
    image(Rrl, 0+value, 0+value*2);
  pop();
}
