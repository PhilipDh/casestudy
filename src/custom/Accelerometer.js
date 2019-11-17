/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import {NativeEventEmitter, NativeModules} from 'react-native';
import * as Accelerometer from './Sensors';
import {Observable} from 'rxjs';
import {publish, refCount} from 'rxjs/operators';

//Return an observable that will emit an event whenever a device shake is detected
function returnObservable() {
  Accelerometer.setUpdateInterval(100);
  return Observable.create(function subscribe(observer) {
    this.unsubscribeCallback = () => {
      // stop the sensor
      Accelerometer.stop();
    };

    const eventEmitter = new NativeEventEmitter(Accelerometer);
    eventEmitter.addListener('Accelerometer', data => {
      observer.next(data);
    });

    Accelerometer.start();

    return this.unsubscribeCallback;
  }).pipe(makeSingleton());
}

//Since I don't want several instances of the same sensor event listener running I make only one available
function makeSingleton() {
  return source => source.pipe(publish(), refCount());
}

export const accelerometer = returnObservable();
