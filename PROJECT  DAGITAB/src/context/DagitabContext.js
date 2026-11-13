import React, { createContext, useContext, useState, useCallback } from 'react';
import { sampleSensors, sampleHistoryRecords, dagitabDeviceInfo, cropProfiles } from '../data';

const DagitabContext = createContext();

export function DagitabProvider({ children }) {
  const [sensors, setSensors] = useState(sampleSensors);
  const [historyRecords, setHistoryRecords] = useState(sampleHistoryRecords);
  const [deviceInfo, setDeviceInfo] = useState(dagitabDeviceInfo);
  const [selectedCrop, setSelectedCrop] = useState(cropProfiles[0]);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [lastRefreshedAt, setLastRefreshedAt] = useState(new Date().toLocaleTimeString());

  // Simulates a fresh sensor telemetry sync (with subtle realistic jitter)
  const refreshSensorData = useCallback(() => {
    setIsRefreshing(true);

    const now = new Date();
    const timeFormatted = now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    const fullDateFormatted = now.toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric',
    });
    const timestampStr = `${fullDateFormatted} • ${timeFormatted}`;

    // Slightly simulate live telemetry updates
    const updatedSensors = sensors.map((sensor) => {
      let newValue = sensor.currentValue;
      let newStatus = sensor.status;
      let newLevel = sensor.statusLevel;

      if (sensor.sensorId === 'DAG-SM-01') {
        // Moisture fluctuation ±2%
        const delta = (Math.random() * 4 - 2);
        newValue = Math.max(25, Math.min(65, Math.round((sensor.currentValue + delta) * 10) / 10));
        newStatus = newValue >= 35 && newValue <= 55 ? 'Optimal' : newValue < 35 ? 'Attention Needed' : 'High Moisture';
        newLevel = newValue >= 35 && newValue <= 55 ? 'optimal' : 'warning';
      } else if (sensor.sensorId === 'DAG-ST-02') {
        // Temperature fluctuation ±0.4°C
        const delta = (Math.random() * 0.8 - 0.4);
        newValue = Math.round((sensor.currentValue + delta) * 10) / 10;
        newStatus = newValue >= 20 && newValue <= 28 ? 'Normal' : 'Elevated';
        newLevel = newValue >= 20 && newValue <= 28 ? 'normal' : 'warning';
      } else if (sensor.sensorId === 'DAG-PH-03') {
        // pH fluctuation ±0.1
        const delta = (Math.random() * 0.2 - 0.1);
        newValue = Math.round((sensor.currentValue + delta) * 10) / 10;
        newStatus = newValue >= 6.0 && newValue <= 7.0 ? 'Optimal' : 'Slightly Shifted';
        newLevel = newValue >= 6.0 && newValue <= 7.0 ? 'optimal' : 'warning';
      }

      return {
        ...sensor,
        currentValue: newValue,
        status: newStatus,
        statusLevel: newLevel,
        lastUpdated: `Refreshed at ${timeFormatted} (Sample Telemetry)`,
      };
    });

    // Create a new simulated reading history entry
    const newRecord = {
      id: `REC-${now.getFullYear()}-${String(Math.floor(Math.random() * 9000) + 1000)}`,
      sensorId: 'DAG-SM-01',
      sensorName: 'Soil Moisture',
      sensorType: 'Capacitive Moisture',
      value: updatedSensors[0].currentValue,
      unit: '%',
      status: updatedSensors[0].status,
      statusLevel: updatedSensors[0].statusLevel,
      timestamp: timestampStr,
      nodeLocation: 'Plot Alpha – Seedling Nursery Bed',
      deviceUsed: 'DAGITAB Node 01 (ESP32-S3 / Arduino Uno)',
      notes: 'Live telemetry polling sample triggered via application refresh.',
    };

    setSensors(updatedSensors);
    setHistoryRecords((prev) => [newRecord, ...prev]);
    setLastRefreshedAt(timeFormatted);

    setTimeout(() => {
      setIsRefreshing(false);
    }, 600);
  }, [sensors]);

  const addHistoryRecord = (record) => {
    setHistoryRecords((prev) => [record, ...prev]);
  };

  return (
    <DagitabContext.Provider
      value={{
        sensors,
        historyRecords,
        deviceInfo,
        cropProfiles,
        selectedCrop,
        setSelectedCrop,
        isRefreshing,
        lastRefreshedAt,
        refreshSensorData,
        addHistoryRecord,
      }}
    >
      {children}
    </DagitabContext.Provider>
  );
}

export function useDagitab() {
  const context = useContext(DagitabContext);
  if (!context) {
    throw new Error('useDagitab must be used within a DagitabProvider');
  }
  return context;
}

