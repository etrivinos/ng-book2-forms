/**
 *  Copyright (c) 2015, Fullstack.io
 *  All rights reserved.
 *
 * This source code is licensed under the license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { Component, EventEmitter } from '@angular/core';
import {bootstrap} from '@angular/platform-browser-dynamic';

import { FORM_DIRECTIVES } from '@angular/common';

/**
 * @FormApp: the top-level component for our application
 */
@Component({
  selector: 'demo-for-sku',
  directives: [FORM_DIRECTIVES],
  template: `
    <div class="ui raised segment">
      <h2 class="ui header">Demo Form: Sku</h2>
    
      <form #f="ngForm"
        (ngSubmit)="onSubmit(f.value)"
        class="ui form">

          f.value: <pre>{{f.value | json}}</pre>
    
          <div class="field">
            <label for="skuInput">SKU</label>

            <input type="text"
              id="skuInput"
              placeholder="SKU"
              ngControl="sku">
          </div>
    
          <button type="submit" class="ui button">Submit</button>
      </form>
    </div>
  `
})
class FormApp {
  onSubmit(form: any): void {
    console.log('you submitted value:', form);
  }
}

bootstrap(FormApp);
