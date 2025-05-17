import { Signal } from '@angular/core';
import { toObservable , toSignal} from '@angular/core/rxjs-interop'
import { debounceTime } from 'rxjs';


/**
 * @param str the tag string to be checked with for empty or not
 * @description A Util function for checking if the tag is Empty
 * @returns true if not empty false if empty
 */
export function strIsEmpty(str: string): boolean {
  for (let i = 0; i < str.length; i++) {
    if (str[i] !== ' ') {
      return true;
    }
  }
  return false;
}
/**
 * @param signal Signal of Type `T`
 * @param delayTime debouncing Time : `number`
 * @param initialValue Type of the value
 * @returns A signal
 * @description Converts the passed signal to a debounced signal for query searching
 */
export function convertSignalToDebouncedSignal<T>( signal : Signal<T> , delayTime : number , initialValue : T ) {
  const signalObservable = toObservable(signal).pipe(debounceTime(delayTime));
  const convertedSignal = toSignal(signalObservable , {initialValue : initialValue});
  return convertedSignal;
}
