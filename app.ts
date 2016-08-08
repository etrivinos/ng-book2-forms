/**
 *  Copyright (c) 2015, Fullstack.io
 *  All rights reserved.
 *
 * This source code is licensed under the license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { Component, 
        EventEmitter } from '@angular/core';

import {bootstrap} from '@angular/platform-browser-dynamic';

import { 
  CORE_DIRECTIVES,
  FORM_DIRECTIVES, 
  FormBuilder, 
  ControlGroup, 
  Validators} from '@angular/common';

/**
 * @FormApp: the top-level component for our application
 */
@Component({
  selector: 'demo-for-sku',
  directives: [CORE_DIRECTIVES, FORM_DIRECTIVES],
  styles: [`
    .ui.form .error.message { display:block !important; }
  `],
  template: `
    <div class="ui raised segment">
      <h2 class="ui header">Demo Form: with validations (explicit)</h2>
    
      myForm.valid: {{myForm.valid}}
      sku.valid: {{sku.valid}}

      <form [ngFormModel]="myForm"
        (ngSubmit)="onSubmit(myForm.value)"
        class="ui form">
    
          <div class="field" [class.error]="!myForm.find('sku').valid && myForm.find('sku').touched">
            <label for="skuInput">SKU</label>
            
            <input type="text"
              id="skuInput"
              placeholder="SKU"
              #sku="ngForm"
              [ngFormControl]="myForm.controls['sku']">
    
            <div *ngIf="!sku.control.valid && sku.control.touched" class="ui error message">SKU is invalid</div>
            <div *ngIf="sku.control.hasError('required') && sku.control.touched" class="ui error message">SKU is required</div>
          </div>
    
          <div *ngIf="!myForm.valid" class="ui error message">Form is invalid</div>
          
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

    /*
    Explicit set the control variable as an instance variable.
    Pro: We can reference this variable anywhere in our component view.
    Con: We have to setup as instance variable for every field in our form.
     */
    this.sku = this.myForm.controls['sku'];
  }

  onSubmit(form: any): void {
    console.log('you submitted value:', form);
  }

}

bootstrap(FormApp);
