import { Component } from '@angular/core';
import { Observable, interval, combineLatest, timer, of, concat, forkJoin, merge, race, zip, from, ConnectableObservable  } from 'rxjs';
import { take, publish, map, combineAll, concatAll, endWith, pairwise, mapTo, withLatestFrom,
          delay  } from 'rxjs/operators';
import { ajax } from 'rxjs/ajax';
import { HttpClient } from '@angular/common/http';
import { MissionServiceService } from './service/mission-service.service';




@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'his';
  http: HttpClient;
  constructor(http: HttpClient, private missionService: MissionServiceService) {
  }

  handleClick(event) {
    // this.cancelIntervel();
    // this.createAbserver();
    // this.publishStream();
    // this.combineAllStream();
    // this.combineLatestStream();
    // this.concatStream();
    // this.endwithStream();
    // this.forkJoinStream();
    // this.mergeStream();
    // this.zipStream();
    // this.httpTest();
    this.missionService.announceMission('hello child');
  }
  cancelIntervel() {
    const stream$ = Observable.create((observer: any) => {
      let i = 0;
      const id = setInterval(() => {
      observer.next(i++);
    }, 1000);
      return () => clearInterval( id );
    });
    const subscription = stream$.subscribe((value: any) => console.log('Value', value));
    setTimeout(() => subscription.unsubscribe(), 3000);
  }

  createAbserver() {
    const stream$ = Observable.create((observer) => {
      observer.next(4);
      observer.complete('complete');
    });
    stream$.subscribe((data) => console.log('data: ', data),
    (error) => console.log('error: ', error),
    () => console.log('complete'));
  }

  // 热流
  publishStream() {
    const hotStream$ = interval(1000).pipe(publish()) as ConnectableObservable<number>;
    hotStream$.subscribe((data) => console.log('hot data: ', data));
    setTimeout(() => {
      hotStream$.subscribe((data) => console.log('hot data setTimeout: ', data));
    }, 2000);
    // 必须执行connect之后才会发送数据
    hotStream$.connect();
  }
  /**
   * interval函数会在间隔指定的时间内发出一个值
   * 值经过take函数，函数记录从当前流过值的个数
   * 然后将值继续传递个下一个处理函数。
   * [(0) 0]  [(0) 1] [(0) 2]  [(0) 3] [(0) 4]
   *          [(1) 0] [(1) 1]  [(1) 2] [(1) 3]  [(1) 4]
   */
  combineAllStream() {
    const source$ = interval(8000).pipe(take(2));
    const example$ = source$.pipe(
      map(val => interval(1000).pipe(map(i => {
        // console.log(`Result (${val}): ${i}`);
        return `Result (${val}): ${i}`;
      }),
      take(5)
    )));
    // example$.subscribe((data) => data.subscribe());
    example$.pipe(combineAll()).subscribe(console.log);
  }

  /**
   * 多个流通过combineLatest之后，一旦有一个流实现更新，则会触发事件
   * 组合的多个流都必须有值
   */
  combineLatestStream() {
    const timerOne$ = timer(1000, 4000);
    const timerTwo$ = timer(2000, 4000);
    const timerThree$ = timer(3000, 4000);
    combineLatest(timerOne$, timerTwo$, timerThree$).subscribe(([timerValOne, timerValTwo, timerValThree]) => {
      console.log(
        `Timer One Latest: ${timerValOne},
        Timer Two Latest: ${timerValTwo},
        Timer Three Latest: ${timerValThree}`
      );
    });
  }
  /**
   * 将多个流组合成一个
   */
  concatStream() {
      concat(
        of(1, 2, 3),
        of(4, 5, 6),
        of(7, 8, 9)
      ).subscribe(console.log);

      const samplePromise = val => new Promise(resolve => resolve(val));
      // emit a value every 2 seconds
      const source = interval(2000);

      const example = source.pipe(
        map(val => samplePromise(val)),
        // merge values from resolved promise
        concatAll()
      );
      // output: 'Example with Promise 0', 'Example with Promise 1'...
      const subscribe = example.subscribe(val =>
        console.log('Example with Promise:', val)
      );
  }

  /**
   * 输出结果末尾加see you later
   */
  endwithStream() {
    of('hello', 'friend', 'goodbye').pipe(endWith('see you later')).subscribe(console.log);
  }

  /**
   * 如果内部可观察对象没有完成forkForin，则永远不会发出值
   * 当多个请求都收到值时才执行后续操作
   */
  forkJoinStream() {
    forkJoin(
        ajax.getJSON('https://api.github.com/users/google'),
        ajax.getJSON('https://api.github.com/users/microsoft'),
        ajax.getJSON('https://api.github.com/users')
    ).subscribe(console.log);
  }

  /**
   * 将两个流合并成一个流输出，
   * 输出规则: 按照流发生的顺序
   */
  mergeStream() {
    merge(
      interval(2500),
      interval(1000)
    ).subscribe(console.log);
  }

  /**
   * 将先前值和当前值作为一个数组
   * Returns: [0,1], [1,2], [2,3], [3,4], [4,5]
   */
  pairwiseStream() {
    interval(1000).pipe(pairwise()).subscribe(console.log);
  }

  raceStream() {
    const example$: any = race(
      interval(1000).pipe(mapTo('first')),
      interval(1500)
    );
    example$.subscribe(console.log);
  }

  withLatestFromStream() {
    const source$ = interval(5000).pipe(take(3));
    const sencondSource = interval(2000);
    source$.pipe(withLatestFrom(sencondSource),
    map(([first, second]) => {
      return `First Source (5s): ${first} Second Source (3s): ${second}`;
    })).subscribe(console.log);
  }

  /**
   * 只接收每个可观察对象的第一个值
   */
  zipStream() {
    const sourceOne = of('Hello', 'Hello1');
    const sourceTwo = of('World!', 'World!1');
    const sourceThree = from(['Goodbye', 'Goodbye1']);
    const sourceFour = of('World!', 'World!1');
    // wait until all observables have emitted a value then emit all as an array
    const example = zip(
      sourceOne,
      sourceTwo.pipe(delay(1000)),
      sourceThree.pipe(delay(2000)),
      sourceFour.pipe(delay(3000))
    );
    // output: ["Hello", "World!", "Goodbye", "World!"]
    const subscribe = example.subscribe(val => console.log(val));
  }

  httpTest() {
    this.http.get('https://api.github.com/users/google').subscribe(console.log);
  }
}

