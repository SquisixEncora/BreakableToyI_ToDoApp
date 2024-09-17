import { useState } from "react";
import { useToDoContext } from "../context/ToDoContext";
import { Card, Select } from "@material-tailwind/react";

export function AverageTime() {
  const { calculateAverageCompletionTime, calculateAverageTimeByPriority } = useToDoContext();
  
  const [unit, setUnit] = useState<'days' | 'hours' | 'minutes' | 'seconds'>('days');

  const handleUnitChange = (arg: string) => {
    setUnit(arg as 'days' | 'hours' | 'minutes' | 'seconds');
  };

  const averageCompletionTime = calculateAverageCompletionTime(unit);
  const averageHighPriorityTime = calculateAverageTimeByPriority('High', unit);
  const averageMediumPriorityTime = calculateAverageTimeByPriority('Medium', unit);
  const averageLowPriorityTime = calculateAverageTimeByPriority('Low', unit);

  const formatTime = (time: number, unit: 'days' | 'hours' | 'minutes' | 'seconds') => {
    const days = Math.floor(time);
    const hours = Math.floor((time % 1) * 24);
    const minutes = Math.floor(((time % 1) * 24 * 60) % 60);
    const seconds = Math.floor((((time % 1) * 24 * 60 * 60) % 3600) % 60);
  
    switch (unit) {
      case 'days':
        return `${days}d ${hours}h ${minutes}m ${seconds}s`;
      case 'hours':
        const totalHours = Math.floor(time);
        const remainingMinutes = Math.floor((time % 1) * 60);
        const remainingSeconds = Math.floor((((time % 1) * 60 * 60) % 3600) % 60);
        return `${totalHours}h ${remainingMinutes}m ${remainingSeconds}s`;
      case 'minutes':
        const totalMinutes = Math.floor(time);
        const remainingSecs = Math.floor((time % 1) * 60);
        return `${totalMinutes}m ${remainingSecs}s`;
      case 'seconds':
        return `${Math.floor(time)}s`;
      default:
        return `${days}d ${hours}h ${minutes}m ${seconds}s`;
    }
  };

  return (
    <Card>
      <div className="w-full p-6">
        {/* Título centrado */}
        <h2 className="text-lg font-semibold text-gray-800 text-center mb-4">
          Average Time
        </h2>

        <div className="grid grid-cols-2 gap-4">
          {/* Columna izquierda */}
          
          <div>
          <h3 className="text-lg font-semibold text-gray-800 mb-2">
              Average time for finish tasks:
            </h3>
            <h3 className="text-md font-medium text-gray-800 mb-2">
              Overall: {formatTime(averageCompletionTime, unit)}
            </h3>
          </div>
          
          {/* Columna derecha */}
          <div>
            <h3 className="text-lg font-semibold text-gray-800 mb-2">
              Average time for finish task by priority:
            </h3>
            <h4 className="text-md font-medium text-gray-700">
              Low Priority: {formatTime(averageLowPriorityTime, unit)}
            </h4>
            <h4 className="text-md font-medium text-gray-700">
              Medium Priority: {formatTime(averageMediumPriorityTime, unit)}
            </h4>
            <h4 className="text-md font-medium text-gray-700">
              High Priority: {formatTime(averageHighPriorityTime, unit)}
            </h4>
          </div>
        </div>

        {/* Selector de unidad en una sola sección */}
        <div className="mt-6 ">
          <label htmlFor="unit" className="text-gray-700 mb-2 block">Select time unit:</label>
          <Select value={unit} onValueChange={handleUnitChange} id="unit" className="w-1/2 mx-auto">
            <Select.Trigger/>
            <Select.List>
              <Select.Option value="days">Days</Select.Option>
              <Select.Option value="hours">Hours</Select.Option>
              <Select.Option value="minutes">Minutes</Select.Option>
              <Select.Option value="seconds">Seconds</Select.Option>
            </Select.List>
          </Select>
        </div>
      </div>
    </Card>
  );
}
