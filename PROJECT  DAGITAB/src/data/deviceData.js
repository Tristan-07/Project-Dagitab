/**
 * PROJECT DAGITAB - Hardware & Device Specifications
 * Smart Soil • Smarter Tomorrow
 */

export const dagitabDeviceInfo = {
  deviceName: 'DAGITAB Soil Monitoring Device',
  tagline: 'Smart Soil • Smarter Tomorrow',
  nodeId: 'DAGITAB-NODE-01',
  firmwareVersion: 'v1.4.2-preview',
  hardwareRevision: 'PCB-Rev-B',
  connectionStatus: 'Connected (Sample Mode)',
  networkType: 'ESP32-S3 Wi-Fi 802.11 b/g/n (2.4 GHz)',
  signalStrength: '-58 dBm (Strong)',
  lastTransmission: 'Just now',
  transmissionInterval: '15 Minutes',
  powerSource: '3.7V 2500mAh Li-ion + 5V Solar Charge Controller',
  batteryLevel: '94%',
  cloudEndpoint: 'https://dagitab-smartsoil-default-rtdb.firebaseio.com/telemetry',
  isHardwareSimulated: true,

  controllers: [
    {
      title: 'Main Microcontroller',
      model: 'Arduino Uno (ATmega328P)',
      role: 'Sensor signal acquisition, analog-to-digital filtering, and local safety logic.',
      clockSpeed: '16 MHz',
      operatingVoltage: '5.0V',
      status: 'Active',
    },
    {
      title: 'IoT & Telemetry Module',
      model: 'ESP32-S3-WROOM-1',
      role: 'Dual-core 240MHz Xtensa LX7 processor handling Wi-Fi/BLE communication, HTTPS payload formatting, and cloud synchronization.',
      clockSpeed: '240 MHz',
      operatingVoltage: '3.3V',
      status: 'Online',
    },
  ],

  sensors: [
    {
      name: 'Soil Moisture Sensor',
      model: 'Capacitive Soil Moisture Sensor v1.2',
      type: 'Capacitive / Analog',
      range: '0% - 100% Volumetric Water Content',
      accuracy: '±3%',
      interface: 'Analog Voltage (0 - 3.0V)',
      connectedTo: 'ESP32-S3 GPIO 34 (ADC1_CH6)',
      status: 'Operating Normally',
    },
    {
      name: 'Temperature Sensor',
      model: 'Dallas DS18B20 Digital Waterproof Probe',
      type: '1-Wire Digital Thermal Sensor',
      range: '-55°C to +125°C',
      accuracy: '±0.5°C (-10°C to +85°C)',
      interface: '1-Wire Serial Data (4.7kΩ Pull-up)',
      connectedTo: 'ESP32-S3 GPIO 4',
      status: 'Operating Normally',
    },
    {
      name: 'Soil pH Sensor',
      model: 'Analog pH Electrode Kit + Signal Board',
      type: 'Potentiometric Glass Electrode',
      range: '0.0 - 14.0 pH',
      accuracy: '±0.1 pH at 25°C',
      interface: 'Analog Voltage (0 - 5.0V with LM358 op-amp)',
      connectedTo: 'Arduino Uno A0 (Analog Input)',
      status: 'Operating Normally (Calibrated)',
    },
    {
      name: 'Onboard Display',
      model: '0.96-inch Monochrome OLED Display',
      type: 'SSD1306 Driver (128x64 resolution)',
      range: 'Graphical & Real-Time Local Text Output',
      accuracy: 'High contrast organic LED',
      interface: 'I2C Bus (SDA / SCL)',
      connectedTo: 'Arduino Uno A4 (SDA), A5 (SCL)',
      status: 'Displaying Field Summary',
    },
  ],
};

export const cropProfiles = [
  {
    id: 'general',
    name: 'General Garden / Nursery',
    moistureIdeal: '35% - 55%',
    tempIdeal: '20°C - 28°C',
    phIdeal: '6.0 - 7.0 pH',
    notes: 'Balanced thresholds suitable for common vegetable gardens, potted seedlings, and nursery mixes.',
  },
  {
    id: 'tomatoes',
    name: 'Tomatoes & Nightshades',
    moistureIdeal: '40% - 65%',
    tempIdeal: '21°C - 29°C',
    phIdeal: '6.2 - 6.8 pH',
    notes: 'Requires steady moisture to prevent blossom end rot; sensitive to water fluctuations and acidic soil below 6.0.',
  },
  {
    id: 'lettuce',
    name: 'Leafy Greens & Lettuce',
    moistureIdeal: '45% - 70%',
    tempIdeal: '15°C - 24°C',
    phIdeal: '6.0 - 6.8 pH',
    notes: 'Shallow root systems need consistent surface moisture. Cooler soil temperatures prevent premature bolting.',
  },
  {
    id: 'bell_pepper',
    name: 'Sweet & Bell Peppers',
    moistureIdeal: '35% - 50%',
    tempIdeal: '22°C - 30°C',
    phIdeal: '6.0 - 6.8 pH',
    notes: 'Prefers warm, well-draining soil. Over-watering causes root asphyxiation and premature blossom drop.',
  },
];

