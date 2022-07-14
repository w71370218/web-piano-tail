export default class Button {
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