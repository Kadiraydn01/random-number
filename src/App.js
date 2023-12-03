import React, { useState, useEffect } from "react";
import Plot from "react-plotly.js";

function App() {
  const [generator1Data, setGenerator1Data] = useState([]);
  const [generator2Data, setGenerator2Data] = useState([]);
  const [isRunning, setIsRunning] = useState(false);
  const [intervalId, setIntervalId] = useState(null);
  const [numberRange, setNumberRange] = useState(10);
  const [generationInterval, setGenerationInterval] = useState(1000);

  useEffect(() => {
    let id;

    const generateRandomNumbers = () => {
      const randomNumber1 = Math.floor(Math.random() * (numberRange + 1));
      const randomNumber2 = Math.floor(Math.random() * (numberRange + 1));

      setGenerator1Data((prevData) => [...prevData, randomNumber1]);
      setGenerator2Data((prevData) => [...prevData, randomNumber2]);
    };

    if (isRunning) {
      id = setInterval(generateRandomNumbers, generationInterval);
    }

    return () => clearInterval(id);
  }, [isRunning, numberRange, generationInterval]);

  const startGenerators = () => {
    setIsRunning(true);
  };

  const stopGenerators = () => {
    setIsRunning(false);
  };

  const resetData = () => {
    setGenerator1Data([]);
    setGenerator2Data([]);
  };

  const generateTrace = (data, color, channelNumber) => ({
    x: Array.from({ length: data.length }, (_, i) => i + 1),
    y: data,
    type: "bar",
    marker: { color },
    name: `Channel ${channelNumber}`,
    text: data.map((value) => `Value: ${value}`),
  });

  const layout = {
    title: "Random Number Generator",
    xaxis: {
      title: "Time",
      showline: true,
      showgrid: false,
      showticklabels: true,
      linecolor: "black",
      linewidth: 2,
      ticks: "outside",
      tickfont: {
        family: "Arial",
        size: 12,
        color: "black",
      },
    },
    yaxis: {
      title: "Random Number",
      showline: true,
      showgrid: false,
      showticklabels: true,
      linecolor: "black",
      linewidth: 2,
      ticks: "outside",
      tickfont: {
        family: "Arial",
        size: 12,
        color: "black",
      },
    },
    legend: {
      x: 0.5,
      y: 1.2,
      bgcolor: "rgba(255, 255, 255, 0)",
      bordercolor: "rgba(255, 255, 255, 0)",
      orientation: "h",
    },
    autosize: true,
    margin: {
      l: 50,
      r: 50,
      b: 50,
      t: 150,
    },
  };

  const saveData = () => {
    localStorage.setItem("generator1Data", JSON.stringify(generator1Data));
    localStorage.setItem("generator2Data", JSON.stringify(generator2Data));
  };

  const loadData = () => {
    const loadedGenerator1Data =
      JSON.parse(localStorage.getItem("generator1Data")) || [];
    const loadedGenerator2Data =
      JSON.parse(localStorage.getItem("generator2Data")) || [];

    setGenerator1Data(loadedGenerator1Data);
    setGenerator2Data(loadedGenerator2Data);

    setIsRunning(false);
    clearInterval(intervalId);
    setIsRunning(true);
  };

  return (
    <div className="flex flex-col gap-5 items-center mt-6 justify-center">
      <div className="gap-5 flex">
        <button
          className="p-5 border rounded-xl bg-amber-500 text-white"
          onClick={startGenerators}
        >
          Start
        </button>
        <button
          className="p-5 border rounded-xl bg-sky-950 text-white"
          onClick={stopGenerators}
        >
          Stop
        </button>
        <button
          className="p-5 border rounded-xl bg-red-500 text-white"
          onClick={resetData}
        >
          Reset
        </button>
      </div>

      <div className="gap-5 flex">
        <label>
          Generation Interval (ms):
          <input
            type="number"
            value={generationInterval}
            onChange={(e) => setGenerationInterval(parseInt(e.target.value))}
          />
        </label>

        <label>
          Number Range:
          <input
            type="number"
            value={numberRange}
            onChange={(e) => setNumberRange(parseInt(e.target.value))}
          />
        </label>
      </div>

      <div className="mt-5">
        <Plot
          data={[
            generateTrace(generator1Data, "#fde047", 1),
            generateTrace(generator2Data, "f87171", 2),
          ]}
          layout={layout}
        />
        <div className="flex gap-5 items-center justify-center">
          <button
            className="p-5 border rounded-xl bg-sky-950 text-white"
            onClick={saveData}
          >
            Save
          </button>
          <button
            className="p-5 border rounded-xl bg-amber-500 text-white"
            onClick={loadData}
          >
            Load
          </button>
        </div>
      </div>
    </div>
  );
}

export default App;
