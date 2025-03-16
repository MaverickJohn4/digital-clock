import React, { useState, useEffect } from "react";

const LiveClock = () => {
  const [time, setTime] = useState(new Date().toLocaleTimeString());
  const [isRunning, setIsRunning] = useState(false);
  const [is24HourFormat, setIs24HourFormat] = useState(true);

  let intervalId;

  useEffect(() => {
    if (isRunning) {
      intervalId = setInterval(() => {
        setTime(new Date().toLocaleTimeString(is24HourFormat ? 'en-GB' : 'en-US'));
      }, 1000);
    } else {
      clearInterval(intervalId);
    }

    return () => clearInterval(intervalId);
  }, [isRunning, is24HourFormat]);

  const handleStart = () => {
    setIsRunning(true);
  };

  const handleStop = () => {
    setIsRunning(false);
  };

  const handleToggleFormat = () => {
    setIs24HourFormat((prevFormat) => !prevFormat);
  };

  return (
    <div className="flex flex-col justify-center items-center min-h-screen bg-gray-900">
      <h1 className="text-8xl font-extrabold text-white mb-6">{time}</h1>
      <div className="space-y-4">
        <button
          onClick={handleStart}
          disabled={isRunning}
          className="w-48 bg-green-600 text-white py-2 rounded-md disabled:bg-gray-500 text-lg font-medium transition duration-300 hover:bg-green-700 focus:outline-none"
        >
          Start
        </button>
        <button
          onClick={handleStop}
          disabled={!isRunning}
          className="w-48 bg-red-600 text-white py-2 rounded-md disabled:bg-gray-500 text-lg font-medium transition duration-300 hover:bg-red-700 focus:outline-none"
        >
          Stop
        </button>
        <button
          onClick={handleToggleFormat}
          className="w-48 bg-blue-600 text-white py-2 rounded-md text-lg font-medium transition duration-300 hover:bg-blue-700 focus:outline-none"
        >
          {is24HourFormat ? "Switch to 12-Hour" : "Switch to 24-Hour"}
        </button>
      </div>
    </div>
  );
};

export default LiveClock;