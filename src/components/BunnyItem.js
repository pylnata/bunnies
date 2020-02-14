import * as PIXI from "pixi.js";
import { OutlineFilter } from "@pixi/filter-outline";

const BUNNY_SRC =
  "https://s3-us-west-2.amazonaws.com/s.cdpn.io/693612/IaUrttj.png";

const outlineFilterBlue = new OutlineFilter(2, 0x99ff99);

const gridItemWidth = 50;
const gridItemHeight = 50;
const gridMargin = 30;

export default class extends PIXI.Sprite {
  constructor(id) {
    super(PIXI.Texture.from(BUNNY_SRC));

    this.id = id;
    this.interactive = true;
    this.anchor.x = 0.5;
    this.anchor.y = 0.5;

    this.on("mousedown", this.onDown);
    this.on("touchstart", this.onDown);
  }

  onDown(e) {
    if (this._selected) {
      this._selected = false;
      this.filters = [];
      this.parent.emit("bunnydeselected", this);
    } else {
      this._selected = true;
      this.filters = [outlineFilterBlue];
      this.parent.emit("bunnyselected", this);
    }
  }

  position(canvasWidth) {
    let index = this.parent.getChildIndex(this);
    const bunniesPerRow = Math.floor((canvasWidth - 2 * gridMargin) / gridItemWidth) + 1;
    this.x = gridMargin + (index % bunniesPerRow) * gridItemWidth;
    this.y = gridMargin + Math.floor(index / bunniesPerRow) * gridItemHeight;
  }

  setScale(value) {
    this.scale.x = value;
    this.scale.y = value;
  }

  setRotate(value) {
    this.rotation = value;
  }

  dispose() {
    if (this._selected) {
      this.parent.emit("bunnydeselected", this);
    }
  }

}
