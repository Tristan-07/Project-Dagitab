/**
 * PROJECT DAGITAB - Sample Sensor Dataset
 * Smart Soil • Smarter Tomorrow
 * 
 * Note: Clearly labeled as sample-data mode for simulation and UI validation.
 * Designed to connect seamlessly with ESP32-S3 WiFi telemetry and cloud database endpoints.
 */

export const sampleSensors = [
  {
    sensorId: 'DAG-SM-01',
    sensorName: 'Soil Moisture',
    sensorType: 'Capacitive Soil Moisture',
    currentValue: 42,
    unit: '%',
    status: 'Optimal',
    statusLevel: 'optimal', // 'optimal' | 'normal' | 'warning' | 'danger'
    icon: '💧',
    lastUpdated: '10 mins ago (Sample Telemetry)',
    idealRange: '35% - 55%',
    minThreshold: 30,
    maxThreshold: 60,
    hardwareModel: 'Capacitive Soil Moisture Sensor v1.2 (Analog)',
    pinConnection: 'ESP32-S3 GPIO 34 (ADC1_CH6)',
    controller: 'ESP32-S3 IoT Module',
    description:
      'Monitors volumetric soil water content in the root zone. Prevents water stress, under-watering dehydration, and oversaturation that leads to fungal root rot.',
    interpretation:
      'Current moisture level is balanced and within the target retention curve for most garden crops and nursery beds.',
    recommendation:
      'Soil moisture is sufficient (42%). Keep automatic irrigation valves on standby. No supplemental watering required today.',
    historyTrend: [
      { time: '06:00 AM', value: 48, status: 'Optimal' },
      { time: '09:00 AM', value: 45, status: 'Optimal' },
      { time: '12:00 PM', value: 41, status: 'Optimal' },
      { time: '03:00 PM', value: 42, status: 'Optimal' },
    ],
    technicalNotes:
      'Corrosion-resistant capacitive PCB plates eliminate galvanic degradation typical of resistive probes. Operates at 3.3V logic level.',
  },
  {
    sensorId: 'DAG-ST-02',
    sensorName: 'Soil Temperature',
    sensorType: 'DS18B20 Digital Thermometer',
    currentValue: 26.8,
    unit: '°C',
    status: 'Normal',
    statusLevel: 'normal',
    icon: '🌡️',
    lastUpdated: '10 mins ago (Sample Telemetry)',
    idealRange: '20.0°C - 28.0°C',
    minThreshold: 18.0,
    maxThreshold: 32.0,
    hardwareModel: 'Dallas DS18B20 Waterproof 1-Wire Digital Probe',
    pinConnection: 'ESP32-S3 GPIO 4 (1-Wire Bus with 4.7kΩ Pull-up)',
    controller: 'ESP32-S3 IoT Module',
    description:
      'Measures subterranean thermal energy in the soil bed. Soil temperature directly impacts microbial metabolic rates, seed germination speed, and capillary water uptake.',
    interpretation:
      'Root zone temperature is in a favorable metabolic range. Microbial breakdown of organic matter is active and stable.',
    recommendation:
      'Temperature is within normal daylight bounds (26.8°C). Provide light organic mulch if afternoon ambient sun causes surface spikes above 32°C.',
    historyTrend: [
      { time: '06:00 AM', value: 23.4, status: 'Normal' },
      { time: '09:00 AM', value: 25.1, status: 'Normal' },
      { time: '12:00 PM', value: 27.6, status: 'Normal' },
      { time: '03:00 PM', value: 26.8, status: 'Normal' },
    ],
    technicalNotes:
      'Digital transmission over 1-Wire interface with 12-bit precision (±0.5°C accuracy). Stainless steel probe casing resists chemical oxidation.',
  },
  {
    sensorId: 'DAG-PH-03',
    sensorName: 'Soil pH',
    sensorType: 'Electrochemical pH Probe',
    currentValue: 6.5,
    unit: 'pH',
    status: 'Optimal',
    statusLevel: 'optimal',
    icon: '🧪',
    lastUpdated: '10 mins ago (Sample Telemetry)',
    idealRange: '6.0 - 7.0 pH',
    minThreshold: 5.8,
    maxThreshold: 7.2,
    hardwareModel: 'Industrial Analog pH Electrode + Signal Conditioner Board',
    pinConnection: 'Arduino Uno Analog Pin A0',
    controller: 'Arduino Uno Main Controller',
    description:
      'Determines relative hydrogen ion activity in the soil solution. Soil pH governs chemical solubility and dictates whether crops can absorb essential N-P-K nutrients.',
    interpretation:
      'Substrate pH is slightly acidic to neutral (6.5 pH). This creates the ideal biochemical environment for mineral solubilization without heavy metal toxicity.',
    recommendation:
      'Nutrient bioavailability is optimal. Maintain current organic compost regimen. Do not apply lime or sulfur amendments at this stage.',
    historyTrend: [
      { time: '06:00 AM', value: 6.6, status: 'Optimal' },
      { time: '09:00 AM', value: 6.5, status: 'Optimal' },
      { time: '12:00 PM', value: 6.4, status: 'Optimal' },
      { time: '03:00 PM', value: 6.5, status: 'Optimal' },
    ],
    technicalNotes:
      'Glass bulb electrode calibrated with standard pH 4.01 and pH 6.86 buffer solutions. Amplified analog output conditioned via onboard LM358 op-amp.',
  },
];

