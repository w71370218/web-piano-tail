class Button {
  start(x1,y1,str) {
    this.w = 240;
    this.h = 80;
    this.x = x1;
    this.y = y1;
    this.r = 255;
    this.g = 255;
    this.b = 255;
    this.text = str;
    this.text_size = 50;
  }
  display() {
    fill(this.r,this.g,this.b);
    noStroke();
    rect(this.x, this.y, this.w, this.h);
    fill(0);
    textSize(this.text_size);
    text(this.text, this.x + (this.w - this.text.length * 25) / 2, this.y + 60);
  }
}

class MenuItem {
  start(number,name,time){
    this.min = int(time)/60;
    this.sec = int(time)%60;
    this.text = name;
    if (this.text.length>=19){
      this.text = this.text.substring(0,19)+"...";
    }
    this.text_size = 50;
    this.num = number;
    this.w = 600;
    this.h = 150;
    this.x = 600;
    this.y = 15 + this.num * 30 + this.num * this.h;
    this.py = y;
    this.r = 70;
    this.g = 130;
    this.b = 180;
  }
  display(){
    noStroke();
    if (this.y > this.py){
      this.y-=60;
    }
    if (this.y < this.py){
      this.y+=60;
    }
    
    if (this.y == 15 + 2 * 30 + 2 * this.h){
      this.x = 600;
      stroke(255);
      strokeWeight(10);
      fill(110, 170, 220);
    } else{
      this.x = 630;
      noStroke();
      fill(255);
    }
    rect(this.x,this.y,this.w,this.h);
    fill(0);
    textSize(this.text_size);
    text(this.text, this.x +30,this.y+this.h/2+this.text_size);
    textSize(this.text_size-20);
    text(this.min+"m"+this.sec+"s", this.x +30,this.y+this.text_size-20);
  }
  up() {
    this.num +=1;
    this.py = 15 + this.num * 30 + this.num * this.h;
  }
  down() {
    this.num -=1;
    this.py = 15 + this.num * 30 + this.num * this.h;
  }
}

function IsClick(x1,x2,y1,y2) {
  return mouseIsPressed === true && mouseButton === LEFT && mouseX > x1*percent_w && mouseX < x2*percent_w && mouseY > y1*percent_h && mouseY < y2*percent_h
}

const screen_w = window.innerWidth;
const screen_h = window.innerHeight;

const percent_w = screen_w/1200;
const percent_h = screen_h/900;

let file = [];
let countdown_sound;
let numsounds;
let numPic = 2; //picture of music
let music_index;
let music_on;

let num = 20;
let m = 15;
let x1 = [[]];
let y1 = [[]];
let r = [[]];
let g = [[]];
let b = [[]];
let a = [[]];
let x2 = [[]];
let y2 = [[]];

let snow_x = [];
let snow_y = [];
let snow_v = [];

let score;
let full_score;
let degree;
let time0 = 0; //time
let t = 3;
let countdown_on = true;
let status;
let select_song = false;
let selected_song;

let y = 2400;
let adlr = 4;
let map = [];
let y_index = 0;
let y_adlr;

let line_spaceing = 50;
let i_y = (screen_h-line_spaceing)/10;
let index_map =[];

let a_y = 0;
let d_y = 0;
let l_y = 0;
let r_y = 0;

let w=100;
let h=10;
let spacing=50;

let shine; 

let xpos;
let ypos;
let drag = 30.0;

let cursor = 1;
let bg = 1; //background

let start = new Button();
let exit = new Button();
let setting = new Button();
let playB = new Button(); //play
let again = new Button();
let menu = new Button();
let menulist = [];

let music_file =[];

//let table = new Table();/////
let maps = [];


 //csv




function preload() {
  let music_list;
  fetch("./music_list.json").then(response => {
      return response.json;
  })
  .then(jsondata => console.log(jsondata))
  /*
  music_list = response.json();
  music_list.forEach((item) => {
    console.log(item);
  })
  */
  /*
  httpRequest = new XMLHttpRequest();
  httpRequest.open('GET', './assets/music',true);
  httpRequest.send();
  httpRequest.onreadystatechange = function() {
    if (httpRequest.readyState === 4) {
      html = httpRequest.response;
      console.log(html);
      var d = $(html);
      d[13].getElementsByTagName('a').forEach((ele) => {
        console.log(ele);
        if (ele.getAttribute("href").includes(".mp3")){
          music_filed = ele.href.replace((window.location.href).replace("game.html",""),"");
          //console.log(music_filed);
          music_file.push (loadSound(music_filed));
          music_name = music_filed.replace("assets/music/","");
          //music_file.push(music_name);
          numsounds +=1;
        }

      });
    }
  }
  */

  //m = loadSound('assets/music/La Campanella.mp3');
}

function setup() {
  createCanvas(displayWidth, displayHeight);
  background(105, 105, 105);
  textSize(300);
  text("Loading...", 30, 30);
  
  let a_rgb = color(255, 79, 109);
  let d_rgb = color(60, 232, 227);
  let l_rgb = color(80, 250, 130);
  let r_rgb = color(255, 189, 79);

  ypos = height * 0.25;
  
  music_index = 2;

  status = 1;
  for (let i = num-1; i > 0; i--) {
      x1[i] = new Array();
      y1[i] = new Array();
      x2[i] = new Array();
      y2[i] = new Array();
      r[i] = new Array();
      g[i] = new Array();
      b[i] = new Array();
      a[i] = new Array();
  } 

  for (let i= 0;i<music_file.length;i++){
    menulist[i] = new MenuItem();
    menulist[i].start(i,"123", music_file[i].duration());
  }
}

function draw() {
  if (status< 3 || status >5){
    background(0);
    if(bg == 1){
      fill(255);
      for (let i = num-1; i > 0; i--) {
        if (snow_y[i]<screen_h){
           ellipse(snow_x[i], snow_y[i], 10,10);
         } else {
           snow_x[i] = int(random(0,screen_w));
           snow_y[i] = 0;
           snow_v[i] = int(random(5,50));
         }
        snow_y[i] += snow_v[i];
      }
    }
  }
  if (status< 3 || status >5){
    if (cursor == 1){
      for (let i = num-1; i > 0; i--) {
       for (let j = 0; j < m; j++) {
         x1[i][j] = x1[i-1][j];
         y1[i][j] = y1[i-1][j];
         x2[i][j] = x2[i-1][j];
         y2[i][j] = y2[i-1][j];
         r[i][j] = r[i-1][j];
         g[i][j] = g[i-1][j];
         b[i][j] = b[i-1][j];
         a[i][j] = a[i-1][j];
       }
     } 
   
    // Add the new values to the beginning of the array
     for (let j = 0; j < m; j++) {
       x1[0][j] = mouseX;
       y1[0][j] = mouseY;
       x2[0][j] = mouseX +int(random(-50,50));
       y2[0][j] = mouseY +int(random(-25,50));
       r[0][j] = 255;
       g[0][j] = 225;
       b[0][j] = 170;
       a[0][j] = int(random(100,255));
       
     }
     // Draw
     for (let i = num-1; i > 0; i--) {
       for (let j = 0; j < m; j++) {
       strokeWeight(1);
       stroke(r[i][j],g[i][j],b[i][j],a[i][j]-i*10);
       fill(r[i][j],g[i][j],b[i][j]);
         line(10+x1[i][j], 20+i*10+y1[i][j],10+x2[i][j]+(x2[i][j]-x1[i][j])*int(random(-i*0.1,i*0.1)) ,20+i*10+y2[i][j] +(y2[i][j]-y1[i][j])*int(random(-i*0.1,i*0.1)));
       
       //ellipse(x[i][j], y[i][j], i/2.0, i/2.0);
       //ellipse(x2[i][j], y2[i][j], i/2.0, i/2.0);
       }
     }
    }
    if (cursor == 2){
      for (let i = num-1; i > 0; i--) {
       for (let j = 0; j < m; j++) {
         x1[i][j] = x1[i-1][j];
         y1[i][j] = y1[i-1][j];
         x2[i][j] = x2[i-1][j];
         y2[i][j] = y2[i-1][j];
         r[i][j] = r[i-1][j];
         g[i][j] = g[i-1][j];
         b[i][j] = b[i-1][j];
         a[i][j] = a[i-1][j];
       }
     } 
 
     // Add the new values to the beginning of the array
     for (let j = 0; j < m; j++) {
       x1[0][j] = mouseX;
       y1[0][j] = mouseY;
       x2[0][j] = mouseX +int(random(-50,50));
       y2[0][j] = mouseY +int(random(-25,50));
       r[0][j] = 255;
       g[0][j] = 225;
       b[0][j] = 170;
       a[0][j] = int(random(100,255));
       
     }
   // Draw the circles
       for (let i = num-1; i > 0; i--) {
         for (let j = 0; j < m; j++) {
         
         
         fill(r[i][j],g[i][j],b[i][j]);
         
         
         ellipse(x1[i][j], y1[i][j], (num-i)/10.0, (num-i)/10.0);
         ellipse(x2[i][j]+(x2[i][j]-x1[i][j])*0.1, y2[i][j]+(y2[i][j]-y1[i][j])*0.1, (num-i)/7.0, (num-i)/7.0);
         }
       }
    }   
    
  }

  if (status===1){
    //frameRate(24);
    
    //music_file[music_index].stop();
    scale(percent_w, percent_h);
    fill(255);
    textSize(125);
    text("Piano Tiles", 250, 300);
    textSize(35);
    text("By UR & Julie", 480, 400);
    textSize(20);
    text("Simple graphics, easy to play and everybody gets playing the piano!", 280, 480);
    text("Fu Jen University Library and Information Science Department", 300, 850);
    start.start(480,500,"Start");
    setting.start(480,600,"Setting");
    
    start.display();
    setting.display();
    
    if (IsClick(480, 720, 500, 580)){
      status=2;
    }
    if (IsClick(480,720,600,680)){
      status=7;
    }
  }

  if (status==2){ //menu screen
    if (music_on==true) {
      noLoop();
      //frameRate(24);
      for (let i = 0; i < numsounds; i++) {
        music_file[i].stop();
      }
      //music_file[music_index].cue(music_file[music_index].duration()/2);
      music_file[music_index].play();
      music_on = false;
    }


    loop();
    scale(percent_w, percent_h);
    for (let i = 0; i < numsounds; i++) {
      menulist[i].display();
    }
    
    if ( music_file[music_index].isPlaying()== false){
      music_on=true;
    }
    
    fill(255);
    ellipse(40,40,80,80);
    fill(0);
    
    textSize(60);
    text("←", 10, 60);
    fill(255);
    textSize(20);
    text("Best With Headphones", 160, 850);
    play = new Button();
    play.start(160,750,"Play");
    play.display();
    
    if (IsClick(0, 80, 0, 80)){
      status = 1;
    }
    if (keyIsPressed == true){
      if (key==CODED && keyCode==UP){
        if (music_index -1 != -1){
          music_index -=1;
          for (let i = 0; i < numsounds; i++) {
            menulist[i].up();
          }
        }
      }
      if (key==CODED && keyCode==DOWN){
        if (music_index+1 != numsounds){
          music_index +=1;
          for (let i = 0; i < numsounds; i++) {
            menulist[i].down();
          }
        }
      }
    }
    if (IsClick(160,400,750,830)){
      for (let i = 0; i < numsounds; i++) {
        music_file[i].stop();
      }
      countdown_on=true;
      t=3;
      status=3;
    }
  }

  //setting
  if (status == 7){
    scale(percent_w, percent_h);
    fill(255);
    ellipse(40,40,80,80);
    fill(0);
    
    textSize(60);
    text("←", 10, 60);
    fill(255);
    if (IsClick(0,80, 0 , 80)){
      status = 1;
    }
    textSize(50);
    //text("volume", 100,100);
    text("cursor", 100,200);
    text("background", 100,500);

    textSize(30);
    strokeWeight(1);
    stroke(255,255,170);
    noFill();
    rect(135*(1+cursor),320,120,40);
    rect(135*(1+bg),620,120,40);
    
    fill(255);
    noStroke();
    text("none", 160,350);
    if (IsClick(135, 255, 320 , 360)){
      cursor = 0;
    }
    text("sparkle", 280,350);
    if (IsClick(270, 390, 320, 360)){
      cursor = 1;
    }
    text("glitter", 420,350);
    if (IsClick(405, 520, 320, 360)){
      cursor = 2;
    }
    
    text("none", 160,650);
    if (IsClick(135, 255, 620, 660)){
      bg = 0;
    }
    text("snow", 290,650);
    if (IsClick(270, 390, 620, 660)){
      bg = 1;
    }
    
  }
}
function mouseIsPressed() { 
  
}

function windowResized() {
  resizeCanvas(screen_w, screen_h);
}