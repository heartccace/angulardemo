import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { trigger, state, style, transition, animate } from '@angular/animations';

@Component({
  selector: 'app-popup-component',
  templateUrl: './popupcomponent.html',
  // tslint:disable-next-line: no-host-metadata-property
  host: {
    '[@state]': 'state',
  },
  styleUrls: ['./popupcomponent.scss'],
  animations: [
    trigger('state', [
      state('opened', style({transform: 'translateY(0%)'})),
      state('void, closed', style({transform: 'translateY(100%)', opacity: 0})),
      transition('* => *', animate('100ms ease-in')),
    ])
  ],
})
export class PopupComponent {
  // tslint:disable-next-line: variable-name
  _message: string;
  private state: 'opened' | 'closed' = 'closed';

  @Input()
  set message(message: string) {
    this._message = message;
    this.state = 'opened';
  }
  get message(): string { return this._message; }


  @Output()
  closed = new EventEmitter();

}
