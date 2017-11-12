import { Component } from '@angular/core';
import {BackendService} from "./backend.service";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'app';
  data = [];
  width = 128;
  height = 128;
  bufferArray = new Uint8ClampedArray(this.width * this.height * 4);
  imageFlag = false;
  imageSrc = "";

  constructor(private backend: BackendService) {
    console.log(this.bufferArray);
    this.getData();
  }

  getData() {
    this.backend.getRandomNumbers().subscribe(
      (data: any) => {
        this.data = data._body.split("\n");
        this.processData();
      }
    );
  }

  processData() {
    let i;
    let j;
    for (i = 0; i < this.height; i++) {
      for (j = 0; j < this.width; j++) {
        let x = (i * this.width + j) * 4;
        this.bufferArray[x] = this.data[(i * j) % 10000] % 255;
        this.bufferArray[x + 1] = (Math.ceil(this.data[(i * j) % 10000] / 2)) % 255;
        this.bufferArray[x + 2] = (Math.ceil(this.data[(i * j) % 10000] / 3)) % 255;
        this.bufferArray[x + 3] = (Math.ceil(this.data[(i * j) % 10000] / 4)) % 255;
      }
    }
    this.renderData();
  }

  renderData() {
    let svg = document.createElement("canvas");
    let ctx = svg.getContext("2d");
    svg.height = this.height;
    svg.width = this.width;
    let imageData = ctx.createImageData(this.width, this.height);
    imageData.data.set(this.bufferArray);
    ctx.putImageData(imageData, 0, 0);
    this.imageSrc = svg.toDataURL();
    console.log(this.imageSrc);
    this.imageFlag = true;
  }

}
