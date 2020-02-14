import * as PIXI from "pixi.js";
import BunnyItem from "./BunnyItem";

export default class extends PIXI.Application {
  constructor(rootElement) {
    super({
      width: rootElement.clientWidth,
      height: rootElement.clientHeight,
      transparent: true
    });
    this._rootElementWidth = rootElement.clientWidth;
    this._selectedBunnies = {};

    this.stage.on("bunnyselected", bunny => {
      this._selectedBunnies[bunny.id] = bunny;
      bunny.setScale(this._selectedScale);
      bunny.setRotate(this._selectedRotation);
    });
    this.stage.on("bunnydeselected", bunny => {
      delete this._selectedBunnies[bunny.id];
    });
  }

  get bunnies() {
    return this.stage.children.filter(child => child instanceof BunnyItem);
  }

  addBunny(id) {
    let bunny = new BunnyItem(id);
    this.stage.addChild(bunny);
    bunny.position(this._rootElementWidth);
  }

  removeLastBunny() {
    const childToRemove = this.bunnies[this.bunnies.length - 1];
    if (!childToRemove) return;
    childToRemove.dispose();
    this.stage.removeChild(childToRemove);
  }

  scaleSelectedItems(value) {
    this._selectedScale = value;
    Object.values(this._selectedBunnies).forEach(bunnyItem =>
      bunnyItem.setScale(value)
    );
  }

  rotateSelectedItems(value) {
    this._selectedRotation = value;
    Object.values(this._selectedBunnies).forEach(bunnyItem =>
      bunnyItem.setRotate(value)
    );
  }
}
