/**
 *  Copyright (c) 2015, Fullstack.io
 *  All rights reserved.
 *
 * This source code is licensed under the license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { Component, EventEmitter } from '@angular/core';
import {bootstrap} from '@angular/platform-browser-dynamic';

import { FORM_DIRECTIVES, FormBuilder, ControlGroup, Validators } from '@angular/common';

/**
 * @FormApp: the top-level component for our application
 */
@Component({
  selector: 'demo-for-sku',
  directives: [FORM_DIRECTIVES],
  template: `
    <div class="ui raised segment">
      <h2 class="ui header">Demo Form: Sku</h2>
    
      <form [ngFormModel]="myForm"
        (ngSubmit)="onSubmit(myForm.value)"
        class="ui form">

          myForm.value: <pre>{{myForm.value | json}}</pre>
    
          <div class="field">
            <label for="skuInput">SKU</label>

            <input type="text"
              id="skuInput"
              placeholder="SKU"
              [ngFormControl]="myForm.controls['sku']">
          </div>
    
          <button type="submit" class="ui button">Submit</button>
      </form>
    </div>
  `
})
class FormApp {
  myForm: ControlGroup;
 
  constructor(fb: FormBuilder) {
    this.myForm = fb.group({
      'sku': [
        '',
        Validators.required
      ]
    });
  }

  onSubmit(form: any): void {
    console.log('you submitted value:', form);
  }
}

bootstrap(FormApp);
