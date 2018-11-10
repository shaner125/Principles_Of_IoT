function LocalData(sound, light, Voltage,Rotation_LED_Brightness,Rotary_sensor_value, rotary_degrees, Data) {
  capAt100Records(Data.soundData);
  capAt100Records(Data.lightData);
  capAt100Records(Data.VoltageData);
  capAt100Records(Data.Rotation_LED_BrightnessData);
  capAt100Records(Data.Rotary_sensor_valueData);
  capAt100Records(Data.rotary_degreesData);
  addRecords(sound, Data.soundData);
  addRecords(light, Data.lightData);
  addRecords(Voltage, Data.VoltageData);
  addRecords(Rotation_LED_Brightness, Data.Rotation_LED_BrightnessData);
  addRecords(rotary_degrees, Data.rotary_degreesData);
  addRecords(Rotary_sensor_value, Data.Rotary_sensor_valueData);
  window.localStorage.setItem('Data', JSON.stringify(Data));
}

function capAt100Records(array) {
  while(array.length > 93) {
    array.splice(0, 1);
  }
}

function addRecords(records, data) {
  for (var i = 0; i < records.length; i += 1) {
    data.push(records[i]);
  }
}
