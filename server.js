const express = require('express');
const cors = require('cors');
const app = express();

app.use(cors());
app.use(express.json());
app.use(express.static('public'));

let sensorData = {
  bpm: 0,
  spo2: 0,
  validBpm: false,
  validSpo2: false,
  lastUpdate: null
};

// ESP32 داده میفرسته
app.post('/data', (req, res) => {
  sensorData = {
    bpm:        req.body.bpm,
    spo2:       req.body.spo2,
    validBpm:   req.body.validBpm,
    validSpo2:  req.body.validSpo2,
    lastUpdate: new Date().toISOString()
  };
  console.log(`BPM: ${sensorData.bpm} | SpO2: ${sensorData.spo2}%`);
  res.json({ success: true });
});

// سایت داده میخونه
app.get('/sensor', (req, res) => {
  res.json(sensorData);
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, '0.0.0.0', () => {
  console.log(`Server running on port ${PORT}`);
});
