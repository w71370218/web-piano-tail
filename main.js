
export function main(status, percent_w, percent_h) {
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
    exit.start(480,700,"Exit");
    
    start.display();
    setting.display();
    exit.display();
    
    if (IsClick(480, 720, 500, 580)){
      status=2;
    }
    if (IsClick(480,720,600,680)){
      status=7;
    }
    
    if (IsClick(480,720,700,780)){
      exit();
    }
}