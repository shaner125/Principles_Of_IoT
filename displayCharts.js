function displayCharts(piData) {
  dweetio.get_all_dweets_for('x15758929', function(err, dweets){
    console.log(err);
    var tempReadings = createChart('x15758929', 'Temperature', 'temperature', 'Temperature Recorded by Pi', 'Temp. in C', 'spline', dweets);
    var humidityReadings = createChart('x15758929', 'Humidity', 'humidity', 'Humidity Recorded by Pi', 'Humidity %', 'column', dweets);
    var soundReadings = createChart('x15758929', 'Sound', 'sound', 'Sound Recorded by Pi', 'Sound in D', 'bar', dweets);
    updateLocalData(tempReadings, humidityReadings, soundReadings, piData);
  });
}
