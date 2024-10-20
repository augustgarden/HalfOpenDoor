let Doi, Doo, Doc, Dot, Dol, Da, Db, Dc, Dt, Dba, Dbb, Dbc, Dbt, G, S, Rb, Re, Rh, Rla, Rll, Rra, Rrl, F, Bb, Bw, B, L, R, La, Lb, Lc, Ld, Le, Lf, M, Gf, Ga, Gb, Gc, Gd, Ge;
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
  S = loadImage('img/snail.png');
  G = loadImage('img/ghost.png');
  Da = loadImage('img/dog-a.png');
  Db = loadImage('img/dog-b.png');
  Dc = loadImage('img/dog-c.png');
  Dt = loadImage('img/dog-t.png');
  Dba = loadImage('img/dog-ba.png');
  Dbb = loadImage('img/dog-bb.png');
  Dbc = loadImage('img/dog-bc.png');
  Dbt = loadImage('img/dog-bt.png');
  Doo = loadImage('img/door-o.png');
  Doc = loadImage('img/door-c.png');
  Dot = loadImage('img/door-text.png');
  Dol = loadImage('img/door-logo.png');
  Doi = loadImage('img/door-i.png');
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
  createCanvas(windowWidth, windowHeight);
  mic = new p5.AudioIn();
  getAudioContext().resume();
  angleMode(DEGREES);
  imageMode(CENTER);
  startMicButton = createButton('Open!').position(120, 80).mousePressed(startMic);

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




let toggle = true; // 이미지를 전환할 때 사용할 변수

function stage1() {
  background('#7DD0E5');
  
  push();
    scale(0.7);
    image(Dot, 420, 50);
  pop();
  image(Dol, 45, 40);
  image(Doi, 240, 260); // 고정된 이미지

  // frameCount를 이용하여 이미지를 번갈아 표시
  if (frameCount % 60 < 30) { // 60 프레임마다 30프레임씩 교체
    image(Doc, 245, 265); 
  } else {
    image(Doo, 256, 278);
  }
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
      dog();
  }
  else if (mode == 2){
    ghost();
  }  
  else if (mode == 3){
    moon2();
  }
  else if (mode == 4){
    bird();
  }
  else if (mode == 5){
    rice();
  }
  else if (mode == 6){
    snail();
  }
  else if (mode == 7){
    larva();
  }
  else if (mode == 8){
    grass();
  }
  else {
    fish();
  if(frameCount % 1800 == 0) 
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

function windowResized() {
  resizeCanvas(windowWidth, windowHeight); // 새 창 크기에 맞게 캔버스 조정
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
 
  let value = micLevel*400;
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




  function moon2(){
    background('#373640');
    let value = micLevel*800;
    text(value,50,100);

    push();
      let angle = frameCount * 0.1;
      rotate(angle);
      tint(255, 100+value*50);
      image(M, 190, 70);
    pop();

    push();
      let angle2 = frameCount * 0.05;
      rotate(-angle2);
      tint(255, 100+value*50);
      image(M, -200, 500);
    pop();

    push();
      let angle3 = frameCount * 0.01;
      rotate(-angle3);
      tint(255, 100+value*50);
      image(M, 600, 600);
    pop();

}

// function moon(){
//   background('#373640');
//   let value = micLevel*800;
//   text(value,50,100);
  
//   push();
//     let angle = frameCount * 0.1;
//     rotate(angle);
//     tint(255, 100+value*50);
//     image(M, 190, 400);
//   pop();
//   push();
//     let angle2 = frameCount* 0.1;
//     rotate(angle2);
//     tint(255, 100+value*50);
//     image(M, 500, 50);
//   pop();

//   push();
//     let angle6 = frameCount* 0.1;
//     rotate(angle6);
//     tint(255, 100+value*50);
//     image(M, -250, 100);
//   pop();

//   push();
//   let angle3 = frameCount* 0.06;
//     rotate(-angle3);
//     tint(255, 100+value*50);
//     image(M, -400, 800);
//   pop();

//   push();
//   let angle4 = frameCount* 0.06;
//     rotate(-angle4);
//     tint(255, 100+value*50);
//     image(M, -800, 200);
//   pop();

//   push();
//   let angle5 = frameCount* 0.16;
//     rotate(-angle5);
//     tint(255, 100+value*50);
//     image(M, -200, -100);
//   pop();
// }





function grass(){
  background('#D1C52C');
  let value = micLevel*1400;
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
  let value = micLevel * 400; // 소리 크기 기반 값
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
    let angle = sin(frameCount * 5 * (1 + micLevel/1.5)) ;
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
  let value = micLevel * 800;

  // 모든 물고기들에 대해 업데이트 및 그리기
  for (let fish of fishImages) {
    // 위치 업데이트 (소리 크기에 따라 이동 속도 조정)
    fish.x += fish.vx * value;
    fish.y += fish.vy * value;

    // 화면 경계를 벗어나면 속도 반전
    if (fish.x < 0 || fish.x > width) fish.vx *= -1;
    if (fish.y < 0 || fish.y > height) fish.vy *= -1;

    // 회전 각도 업데이트
    fish.angle = sin(frameCount * 2) * 15; // 부드러운 회전

    fish.angle += fish.rotationSpeed;
    let size = value > 0.01 ? 300 : 200; // 소리가 일정 크기 이상이면 크기 증가


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
  let value = map(micLevel, 0,1,0,14000);
  text(value, 50, 100);

  push();
    translate(195, 370);
    image(Rb, 0, 0, 130+value/2, 130+value/2);
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




let x = 50; // 초기 X 위치
let y = 80; // 초기 Y 위치
let speed = 1; // 초기 속도 (마이크 입력으로 변경됨)
let direction = 'right'; // 현재 이동 방향
let angle = 0; // 현재 회전 각도 (머리의 방향)
let targetAngle = 0; // 목표 회전 각도 (방향 변경 시)
let stretchFactor = 0.2; // X축 확대/축소 정도
let imgWidth = 100; // 이미지 너비 (예시)
let imgHeight = 50; // 이미지 높이 (예시)

function snail() {
  background('#E9E9E3');

  // 마이크 레벨에 따라 속도 조절
  speed = map(micLevel, 0, 1, 0.5, 20);
  let stretchSpeed = map(micLevel, 0, 1, 0.2, 1); // 소리가 클수록 더 빠르게 늘어남
  text('Speed: ' + speed.toFixed(2), 50, 100);

  // 이동 경로 계산 (테두리 내에서 반시계 방향 이동)
  if (direction === 'right') x = min(x + speed, width - imgWidth / 2); 
  if (direction === 'down') y = min(y + speed, height - imgHeight / 2);
  if (direction === 'left') x = max(x - speed, imgWidth / 2);
  if (direction === 'up') y = max(y - speed, imgHeight / 2);

  // 테두리에 도달하면 방향과 목표 각도 변경
  if (x >= width - imgWidth / 2 && direction === 'right') {
    direction = 'down';
    targetAngle = 90;
  }
  if (y >= height - imgHeight / 2 && direction === 'down') {
    direction = 'left';
    targetAngle = 180;
  }
  if (x <= imgWidth / 2 && direction === 'left') {
    direction = 'up';
    targetAngle = 270;
  }
  if (y <= imgHeight / 2 && direction === 'up') {
    direction = 'right';
    targetAngle = 0;
  }

  // 각도 wrap-around 처리 (최단 경로로 회전)
  let angleDiff = (targetAngle - angle + 540) % 360 - 180;
  angle += angleDiff * 0.01;

  // 소리 입력에 따라 늘어나는 정도 계산
  stretchFactor = 1 + 0.2 * sin(frameCount * stretchSpeed * 7);

  // 이미지 그리기
  push();
  translate(x, y);
  rotate(angle);
  scale(stretchFactor*0.8, 0.8);
  imageMode(CENTER);
  image(S, 0, 0);
  pop();
}




let x1 = 180; // 첫 번째 유령의 초기 X 위치
let y1 = 220; // 첫 번째 유령의 Y 위치

let x2 = 180; // 두 번째 유령의 초기 X 위치
let y2 = 660; // 두 번째 유령의 Y 위치

let amplitude = 150; // 최대 이동 거리 (진폭)
let baseSpeed = 0.01; // 기본 속도 (프레임당 이동 비율)

function ghost() {
  background('#D3429C');

  let value = micLevel * 4;
  text('Mic Level: ' + value.toFixed(2), 50, 100);

  // 첫 번째 유령: 왼쪽으로 갔다가 되돌아오기 (sin 함수 사용)
  let xOffset1 = amplitude * sin(frameCount * (baseSpeed + value));

  push();
  translate(x1 - xOffset1, y1);
  image(G, 0, 0);
  pop();

  // 두 번째 유령: 오른쪽으로 갔다가 되돌아오기 (위상 차이 추가)
  let xOffset2 = amplitude * sin(frameCount * (baseSpeed + value) + PI); // 반대쪽 움직임

  push();
  translate(x2 + xOffset2, y2);
  image(G, 0, 0);
  pop();
}




let jumpOffset = 0; // 점프 이동량 저장 변수
let legsOffset = 0; 
let frontOffset = 0;

function dog() {
  background('#FFDC81');

  let value = micLevel * 140; // 마이크 입력값 스케일링
  text('Mic Level: ' + value.toFixed(2), 50, 100);

  // 회전 각도 계산: 회전 범위는 -5 ~ +5도
  let bounce = sin(40 + frameCount * 30); 

  // 마이크 레벨이 0.04 이상일 때 점프와 회전
  if (micLevel > 0.03) {
    jumpOffset = sin(frameCount * 0.3) * -50; // 점프 효과
    legsOffset = sin(frameCount * 0.1) * 30; // 점프 효과
    frontOffset = sin(frameCount * 0.1) * 30; // 점프 효과
  } else {
    jumpOffset = 0; // 점프 중지
    legsOffset = 0; // 점프 중지
    frontOffset = 0; // 점프 중지
  }

  // Da 이미지 (고정)
  push();
  translate(135, 185 + jumpOffset); // y축에 점프 적용
  scale(0.8);
  rotate(0+frontOffset); // Dc 회전 적용
  image(Da, 0, 0);
  pop();

  // Db 이미지 (고정)
  push();
  translate(170, 130 + jumpOffset); // y축에 점프 적용
  scale(0.8);
  image(Db, 0, 0);
  pop();

  // Dc 이미지 (회전 및 점프)
  push();
  translate(260, 195 + jumpOffset); // y축에 점프 적용
  rotate(0-legsOffset); // Dc 회전 적용
  scale(0.8);
  image(Dc, 0, 0);
  pop();

  // Dt 이미지 (회전과 점프)
  push();
  translate(260, 120 + jumpOffset); // y축에 점프 적용
  rotate(bounce); 
  scale(0.8);
  image(Dt, 0, 0);
  pop();

  // Dbb 이미지 (고정)
  push();
  translate(-150, 480 + jumpOffset); // y축에 점프 적용
  scale(1.3);
  image(Dbb, 0, 0);
  pop();

  // Dbc 이미지 (회전 및 점프)
  push();
  translate(250, 730 + jumpOffset); // y축에 점프 적용
  rotate(0-legsOffset); // Dbc 회전 적용
  scale(1.3);
  image(Dbc, 0, 0);
  pop();

  // Dbt 이미지 (회전과 점프)
  push();
  translate(210, 460 + jumpOffset); // y축에 점프 적용
  rotate(bounce);
  scale(1.3);
  image(Dbt, 0, 0);
  pop();
}




