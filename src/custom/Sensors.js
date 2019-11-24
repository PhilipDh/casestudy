/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import {NativeEventEmitter, NativeModules} from 'react-native';
const {Accelerometer} = NativeModules;

//Class that will make functions from the Native Module available to classes that use the Sensors
export function start() {
  //this.setUpdateInterval(400);
  Accelerometer.startUpdates();
}

export function stop() {
  Accelerometer.stopUpdates();
}

export function setUpdateInterval(updateInterval) {
  Accelerometer.setUpdateInterval(updateInterval);
}
