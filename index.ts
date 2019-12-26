console.clear();

import { of, Subject } from 'rxjs'; 
import { map } from 'rxjs/operators';

const subject1  = new Subject();
const subject2  = new Subject();

const subscription1 = subject1.subscribe(msg => console.log(`Subscriber 1 : ${msg}`),
                                        err => console.error(`Subscriber 1 : ${err}`),
                                        ()=> console.log('I am done'));
const subscription2 = subject2.subscribe(msg => console.log(`Subscriber 2 :  ${msg}`),
                                        err => console.error(`Subscriber 2 : ${err}`),
                                        ()=> console.log('I am done too'));

subject1.next('Working as expected');
subject2.next('Working as expected');

console.log(subscription1.closed);//false
console.log(subscription2.closed);//false

subject1.error('Something went wrong');

console.log(subscription1.closed);//true as subject threw an error
console.log(subscription2.closed);//false

subject2.complete();
console.log(subscription2.closed);//true as subject completed
