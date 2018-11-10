function showCharts(Data) {
  dweetio.get_all_dweets_for('therapeutic-craption', function(err, dweets){
    console.log(err);
    var sound = createChart('therapeutic-craption', 'Sound', 'sound', 'Sound measured', 'Sound (d)', 'spline', 'soundchart', dweets);
    var light = createChart('therapeutic-craption', 'Light', 'light', 'Light measured by the Pi', 'Light levels', 'bar', 'lightchart', dweets);
    var Voltage = createChart('therapeutic-craption', 'Voltage', 'Voltage', 'Voltage Measured by Pi', 'Voltage (v)', 'scatter', 'voltagechart', dweets);
    var rotary_led_brightness = createChart('therapeutic-craption', 'Rotary LED Brightness Setting', 'Rotation_LED_Brightness', 'Led Brightness Level Set by Rotation', 'Brightness 0-255', 'line', 'ledchart', dweets);
    var rotary_sensor_value = createChart('therapeutic-craption', 'Rotary Sensor Value', 'Rotary_sensor_value', 'Value returned from rotary potentiometer', 'Potentiometer Value', 'pie', 'potentchart', dweets);
    var degrees = createChart('therapeutic-craption', 'Degrees', 'rotary_degrees', 'Degrees of rotation on sensor', 'Rotation in Degrees', 'column', 'degreeschart',dweets);
    LocalData(sound, light, Voltage, rotary_led_brightness, rotary_sensor_value, degrees, Data);
  });
}  