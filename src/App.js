import React, { useState, useEffect } from "react";
import Plot from "react-plotly.js";
import "./App.css";

function App() {
  const [generator1Data, setGenerator1Data] = useState([]);
  const [generator2Data, setGenerator2Data] = useState([]);
  const [isRunning, setIsRunning] = useState(false);

  useEffect(() => {
    if (isRunning) {
      const interval = setInterval(() => {
        const randomNumber = Math.floor(Math.random() * 11);

        setGenerator1Data((prevData) => [...prevData, randomNumber]);
        setGenerator2Data((prevData) => [...prevData, randomNumber]);
      }, 1000);

      return () => clearInterval(interval);
    }
  }, [isRunning]);

  const startGenerators = () => {
    setIsRunning(true);
  };

  const stopGenerators = () => {
    setIsRunning(false);
  };

  const generateTrace = (data, color) => ({
    x: Array.from({ length: data.length }, (_, i) => i + 1),
    y: data,
    type: "bar",
    marker: { color },
  });

  const layout = {
    title: "Random Number Generator",
    xaxis: { title: "Time" },
    yaxis: { title: "Random Number" },
  };

  return (
    <div className="App">
      <button onClick={startGenerators}>Start</button>
      <button onClick={stopGenerators}>Stop</button>

      <div className="chart">
        <Plot data={[generateTrace(generator1Data, "blue")]} layout={layout} />
      </div>

      <div className="chart">
        <Plot data={[generateTrace(generator2Data, "green")]} layout={layout} />
      </div>
    </div>
  );
}

export default App;
