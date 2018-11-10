import dweepy, time, platform, random, grovepi, configparser, sqlite3

conn = sqlite3.connect('database.db')
c = conn.cursor()

config = configparser.ConfigParser()
config.read('configFile.ini')
admin_name = config['DEFAULT']['ADMIN_NAME'] #admin name from config file

sound_sensor = 0
light_sensor = 1
potentiometer = 2
rled = 5
gled = 6


grovepi.pinMode(light_sensor,"INPUT")
grovepi.pinMode(sound_sensor,"INPUT")
grovepi.pinMode(potentiometer,"INPUT")
grovepi.pinMode(gled,"OUTPUT")
grovepi.pinMode(rled,"OUTPUT")



threshold_sound = 200
threshold_light = 10
adc_ref = 5
grove_vcc = 5
full_angle = 300

def getSound():
        while True:
                try:
                    sensor_value = grovepi.analogRead(sound_sensor)

                    if sensor_value > threshold_sound:
                        grovepi.digitalWrite(gled,1)
                    else:
                        grovepi.digitalWrite(gled,0)

                  
                    time.sleep(.5)

                except IOError:
                    print ("Error")
                return sensor_value

def getRotarySensor():
    while True:
            try:
                    #sensor value from potentiometer
                    Rsensor_value = grovepi.analogRead(potentiometer)

                    #voltage
                    voltage = round((float)(Rsensor_value) * adc_ref / 1023, 2)

                    #calculate rotation (0-300)
                    degrees = round((voltage * full_angle) / grove_vcc, 2)

                    #calculate led brightness (0-255)
                    brightness = int(degrees / full_angle * 255)

                    #output brightness to LED
                    grovepi.analogWrite(rled,brightness)

                
            except KeyboardInterrupt:
                    grovepi.analogWrite(rled,0)
                    break
            except IOError:
                    print("error")
            return Rsensor_value, voltage, degrees, brightness

def getLight():
    while True:
            try:
                    lightSensor_value = grovepi.analogRead(light_sensor)

                    resistance = (float)(1023 - lightSensor_value)*10/lightSensor_value

                   
                    time.sleep(5)

            except IOError:
                print("Error")
            return lightSensor_value

def post(dic):
    thing = 'therapeutic-craption'
    print dweepy.dweet_for(thing, dic)

def getandSaveReadings():
    Rsensor_value, voltage, degrees, brightness = getRotarySensor()
    sound = getSound()
    light = getLight()
    dict = {}
    dict["admin_name"] = admin_name
    dict["sound"] = sound
    dict["rotary_degrees"] = degrees
    dict["Rotary_sensor_value"] = Rsensor_value
    dict["Voltage"] = voltage
    dict["Rotation_LED_Brightness"] = brightness
    dict["light"] = light
    val = (admin_name,getSound(),getLight(),degrees,Rsensor_value,voltage,brightness)
    c.execute("INSERT INTO readings(admin_name, sound, light, rotary_degrees, rotary_sensor_value, voltage, rotation_led_brightness)VALUES(?,?,?,?,?,?,?)",val)
    conn.commit()
    print(val)
    return dict


while True:
    dict = getandSaveReadings();
    post(dict)
    time.sleep(5)


