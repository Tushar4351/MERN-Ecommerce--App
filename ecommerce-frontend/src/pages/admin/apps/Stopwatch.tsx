import React, { useState, useEffect, useCallback } from "react";
import AdminSidebar from "@/components/Shared/admin/AdminSidebar";
import { Button } from "@/components/ui/button";

const Stopwatch: React.FC = () => {
  const [time, setTime] = useState<number>(0);
  const [isRunning, setIsRunning] = useState<boolean>(false);
  const [intervalId, setIntervalId] = useState<NodeJS.Timeout | null>(null);

  useEffect(() => {
    return () => {
      clearInterval(intervalId);
    };
  }, [intervalId]);

  const startTimer = useCallback(() => {
    if (!isRunning) {
      const newIntervalId = setInterval(() => {
        setTime((prevTime) => prevTime + 10);
      }, 10);
      setIntervalId(newIntervalId);
      setIsRunning(true);
    }
  }, [isRunning]);

  const stopTimer = useCallback(() => {
    clearInterval(intervalId);
    setIntervalId(null);
    setIsRunning(false);
  }, [intervalId]);

  const resetTimer = useCallback(() => {
    clearInterval(intervalId);
    setIntervalId(null);
    setIsRunning(false);
    setTime(0);
  }, [intervalId]);

  const formatTime = (time: number) => {
    const hours = Math.floor(time / 3600000)
      .toString()
      .padStart(2, "0");
    const minutes = Math.floor((time % 3600000) / 60000)
      .toString()
      .padStart(2, "0");
    const seconds = Math.floor((time % 60000) / 1000)
      .toString()
      .padStart(2, "0");
    const centiseconds = Math.floor((time % 1000) / 10)
      .toString()
      .padStart(2, "0");

    return `${hours}:${minutes}:${seconds}:${centiseconds}`;
  };

  return (
    <div className="admin-container min-h-screen grid grid-cols-6 bg-gray-50/50">
      <div>
        <AdminSidebar />
      </div>
      <main className="dashboard-app-container col-span-4 md:col-span-5 g-clip-border rounded-xl bg-white shadow-md p-5 overflow-y-auto">
        <h1 className="text-3xl font-bold mt-10 ml-8">Stopwatch</h1>
        <section className="flex flex-col justify-center items-center gap-2 h-screen">
          <div className="stopwatch flex flex-col justify-center items-center ">
            <div className="text-center text-6xl" id="time">
              {formatTime(time)}
            </div>
            <div className="mt-6 flex gap-2">
              <Button
                className="bg-green-500 hover:bg-green-600"
                onClick={startTimer}
              >
                Start
              </Button>
              <Button
                className="bg-blue-500 hover:bg-blue-600"
                onClick={stopTimer}
              >
                Stop
              </Button>
              <Button
                className="bg-red-500 hover:bg-red-600"
                onClick={resetTimer}
              >
                Reset
              </Button>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
};

export default Stopwatch;
