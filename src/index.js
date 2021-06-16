import React from "react";
import ReactDOM from "react-dom";
import * as vega from "vega";
import * as vegaLite from "vega-lite";
import * as vl from "vega-lite-api";
import { Handler } from "vega-tooltip";
import { config } from "./config/config";
import { getData } from "./utils/getData";
import { viz } from "./utils/viz";

const App = () => {
  vl.register(vega, vegaLite, {
    view: { renderer: "svg" },
    init: (view) => {
      view.tooltip(new Handler().call);
    },
  });

  const run = async () => {
    const marks = viz
      .data(await getData())
      .width(window.innerWidth)
      .height(window.innerHeight)
      .autosize({ type: "fit", contains: "padding" })
      .config(config);

    const child = await marks.render();

    document.getElementById("root").appendChild(child);
  };

  run();

  return null;
};

const rootElement = document.getElementById("root");
ReactDOM.render(<App />, rootElement);
