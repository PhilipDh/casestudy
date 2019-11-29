package com.casestudy;

import android.hardware.Sensor;
import android.hardware.SensorEvent;
import android.hardware.SensorEventListener;
import android.hardware.SensorManager;
import android.util.Log;

import androidx.annotation.Nullable;

import com.facebook.react.bridge.Arguments;
import com.facebook.react.bridge.Promise;
import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.bridge.ReactContextBaseJavaModule;
import com.facebook.react.bridge.ReactMethod;
import com.facebook.react.bridge.WritableMap;
import com.facebook.react.modules.core.DeviceEventManagerModule;

public class Accelerometer extends ReactContextBaseJavaModule implements SensorEventListener {

    private final ReactApplicationContext reactContext;
    private final SensorManager sensorManager;
    private final Sensor sensor;
    private double lastReading = (double) System.currentTimeMillis();
    private int interval;
    private Arguments arguments;

    private static final int SHAKE_THRESHOLD = 800;

    double lastUpdate = 0;
    double x,y,z,last_x,last_y,last_z = 0;

    public Accelerometer(ReactApplicationContext reactContext) {
        super(reactContext);
        this.reactContext = reactContext;
        this.sensorManager = (SensorManager)reactContext.getSystemService(reactContext.SENSOR_SERVICE);
        this.sensor = this.sensorManager.getDefaultSensor(Sensor.TYPE_ACCELEROMETER);
    }

    //Checks if the phone has the Accelerometer sensor
    @ReactMethod
    public void isAvailable(Promise promise) {
        if (this.sensor == null) {
            // No sensor found, throw error
            promise.reject(new RuntimeException("No Accelerometer found"));
            return;
        }
        promise.resolve(null);
    }

    //Sets the interval in which updates should be sent
    @ReactMethod
    public void setUpdateInterval(int newInterval) {
        this.interval = newInterval;
    }


    //Register a listerner with the SensorManager to listen for updates
    @ReactMethod
    public void startUpdates() {
        // Milisecond to Microsecond conversion
        sensorManager.registerListener(this, sensor, this.interval * 1000);
    }

    //Unregister the listener to stop updates
    @ReactMethod
    public void stopUpdates() {
        sensorManager.unregisterListener(this);
    }

    @Override
    public String getName() {
        return "Accelerometer";
    }

    // SensorEventListener Interface
    private void sendEvent(String eventName, @Nullable WritableMap params) {
        try {
            this.reactContext.getJSModule(DeviceEventManagerModule.RCTDeviceEventEmitter.class)
                    .emit(eventName, params);
        } catch (RuntimeException e) {
            Log.e("ERROR", "java.lang.RuntimeException: Trying to invoke Javascript before CatalystInstance has been set!");
        }
    }

    //Event that is triggered by the sensors
    @Override
    public void onSensorChanged(SensorEvent sensorEvent) {

        //If the time that has passed between the last reading and the current reading is smaller then the threshold ignore it
        double tempMs = (double) System.currentTimeMillis();
        if (tempMs - lastReading >= interval){
            lastReading = tempMs;

            Sensor mySensor = sensorEvent.sensor;
            WritableMap map = arguments.createMap();

            //If the type of data is returned by the Accelerometer do the following
            if (mySensor.getType() == Sensor.TYPE_ACCELEROMETER) {

                double diffTime = (tempMs - lastUpdate);
                lastUpdate = tempMs;

                x = sensorEvent.values[0];
                y = sensorEvent.values[1];
                z = sensorEvent.values[2];

                //calculate the speed at which the phone has moved
                double speed = Math.abs(x+y+z - last_x - last_y - last_z) / diffTime * 10000;

                Log.d("sensor", "speed: " + speed);

                //If the calculated speed is greater then the shake threshold send the event to the react app
                if (speed > SHAKE_THRESHOLD) {
                    Log.d("sensor", "shake detected w/ speed: " + speed);
                    map.putDouble("speed", speed);
                    sendEvent("Accelerometer", map);
                }
                last_x = x;
                last_y = y;
                last_z = z;

            }
        }
    }


    @Override
    public void onAccuracyChanged(Sensor sensor, int accuracy) {
    }
}