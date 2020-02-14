import React, { useState, useEffect } from "react";

import BunnyControls from "./components/BunnyControls";

function App({ canvas }) {
  const [amount, setAmount] = useState({
    id: "amount",
    type: "number",
    value: 12,
    min: 1,
    max: 64,
    step: 1,
    label: "Bunnies No.",
    onChange: onChangeAmount
  });

  const [scale, setScale] = useState({
    id: "scale",
    type: "range",
    value: 1,
    min: 1,
    max: 1.6,
    step: 0.1,
    label: "Bunny Size",
    onChange: onChangeScale
  });

  const [rotation, setRotation] = useState({
    id: "rotation",
    type: "range",
    value: 0,
    min: -1,
    max: 1,
    step: 0.1,
    label: "Bunny Rotation",
    onChange: onChangeRotation
  });

  const [itemsSelected, setItemsSelected] = useState(0);

  useEffect(() => {
    canvas.stage.on("bunnyselected", _ => {
      setItemsSelected(state => state + 1);
    });
    canvas.stage.on("bunnydeselected", _ => {
      setItemsSelected(state => state - 1);
    });
    return () => {
      canvas.stage.off("bunnyselected");
      canvas.stage.off("bunnydeselected");
    };
  }, [canvas]);

  useEffect(() => {
    canvas.scaleSelectedItems(scale.value);
  }, [scale.value, canvas]);

  useEffect(() => {
    canvas.rotateSelectedItems(rotation.value);
  }, [rotation.value, canvas]);

  useEffect(() => {
    const bunniesLength = canvas.bunnies.length;
    if (amount.value > bunniesLength) {
      for (let i = bunniesLength; i < amount.value; i++) {
        canvas.addBunny(i);
      }
    } else {
      for (let i = amount.value; i < bunniesLength; i++) {
        canvas.removeLastBunny();
      }
    }
  }, [amount.value, canvas]);

  function onChangeAmount(e) {
    setAmount({ ...amount, value: Number(e.target.value) });
  }

  function onChangeScale(e) {
    setScale({ ...scale, value: Number(e.target.value) });
  }

  function onChangeRotation(e) {
    setRotation({ ...rotation, value: Number(e.target.value) });
  }

  return <BunnyControls {...{ rotation, itemsSelected, scale, amount }} />;
}

export default App;
