let Bb, Bw, B, L, R, La, Lb, Lc, Ld, Le, Lf, M, Gf, Ga, Gb, Gc, Gd, Ge;
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
  createCanvas(375, 812);
  mic = new p5.AudioIn();
  mic.start();
  getAudioContext().resume();

  angleMode(DEGREES);
  imageMode(CENTER);
  startMicButton = createButton("Start Mic").position(20, 10).mousePressed(startMic);

  audioContext = getAudioContext();
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

  bird();

//     if (frameCount % 180 == 0){
//       mode++;
//   }
//   if (mode == 0){
//       mountain();
//   }
//   else if (mode == 1){
//       larva();
//   }
//   else if (mode == 2){
//     grass();
// }
//   else {
//       moon();
//   if(frameCount % 720 == 0) 
//       mode=0;
//   }

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

  let value = map(micLevel, 0,1,0,100);
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
 
  let value = micLevel*30;
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
  let value = micLevel*30;
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
  let value = micLevel*50;
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
  let value = micLevel * 50; // 소리 크기 기반 값
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