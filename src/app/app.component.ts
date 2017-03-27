/*
 * Copyright © 2017 Elbek Azimov. Contacts: <atom.azimov@gmail.com>
 */
import {Component} from '@angular/core';

@Component({
  selector: 'app',
  template: `<h1>{{title}}</h1>`
})
export class AppComponent {
  private title: string;

  constructor() {
    this.title = 'app works!';
  }
}
