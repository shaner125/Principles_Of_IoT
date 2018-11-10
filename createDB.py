#Create DB
import sqlite3
conn = sqlite3.connect('database.db')
c = conn.cursor()
sql = """
DROP TABLE IF EXISTS readings;
CREATE TABLE readings (id integer unique primary key autoincrement,
admin_name text,
sound integer,
light integer,
rotary_degrees decimal(4,1),
rotary_sensor_value integer,
voltage decimal(3,2),
rotation_led_brightness integer);
"""
c.executescript(sql)
conn.commit()
conn.close()
