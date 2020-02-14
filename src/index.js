import React from "react";
import ReactDOM from "react-dom";
import App from "./App";

import "./index.css";

import CanvasApp from './components/CanvasApp'

const CANVAS_ROOT = document.getElementById("canvas-root");
const canvas = new CanvasApp(CANVAS_ROOT);
CANVAS_ROOT.appendChild(canvas.view);

ReactDOM.render(<App canvas={canvas} />, document.getElementById("app-root"));
