function updateLocalData(temp, humidity, sound, piData) {
  keepArrayUnder96(piData.temperatureData);
  keepArrayUnder96(piData.humidityData);
  keepArrayUnder96(piData.soundData);
  addRecords(temp, piData.temperatureData);
  addRecords(humidity, piData.humidityData);
  addRecords(sound, piData.soundData);
  window.localStorage.setItem('piData', JSON.stringify(piData));
}

function keepArrayUnder96(array) {
  while(array.length > 95) {
    array.splice(0, 1);
  }
}

function addRecords(records, data) {
  for (var i = 0; i < records.length; i += 1) {
    data.push(records[i]);
  }
}
