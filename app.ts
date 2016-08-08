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
  Validators,
  Control} from '@angular/common';

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

      <div class="ui info message">
        The product name is: {{productName}}
      </div>

      <form [ngFormModel]="myForm"
        (ngSubmit)="onSubmit(myForm.value)"
        class="ui form">

          <div class="field" [class.error]="!myForm.find('sku').valid && myForm.find('sku').touched">
            <label for="skuInput">SKU</label>
            
            <input type="text"
              id="productNameInput"
              placeholder="Product Name"
              [ngFormControl]="myForm.find('productName')"
              [(ngModel)]="productName">
          </div>
    
          <div class="field" [class.error]="!myForm.find('sku').valid && myForm.find('sku').touched">
            <label for="skuInput">SKU</label>
            
            <input type="text"
              id="skuInput"
              placeholder="SKU"
              #sku="ngForm"
              [ngFormControl]="myForm.controls['sku']">
    
            <!-- SKU errors -->
            <div *ngIf="!sku.control.valid && sku.control.touched" 
              class="ui error message">
                SKU is invalid
            </div>
            
            <div *ngIf="sku.control.hasError('required') && sku.control.touched" 
              class="ui error message">
                SKU is required
            </div>
            
            <div *ngIf="sku.control.hasError('invalidSku') && sku.control.touched" 
              class="ui error message">
                SKU must begin with <tt>123</tt>
            </div>
          </div>
    
          <div *ngIf="!myForm.valid" class="ui error message">Form is invalid</div>
          
          <button type="submit" class="ui button">Submit</button>
      </form>
    </div>
  `
})
class FormApp {
  myForm: ControlGroup;
  productName: string;
 
  constructor(fb: FormBuilder) {
    this.myForm = fb.group({
      'sku': [
        '',
        Validators.compose([ Validators.required, skuValidator])
      ],
      'productName': ['', Validators.required]
    });

    // Watching for changes in the form
    this.myForm.valueChanges.subscribe(
      (form: any) => {
        console.log('form changed to:', form);
      }
    );
  }

  onSubmit(form: any): void {
    console.log('you submitted value:', form);
  }

}

function skuValidator(control: Control): { [s: string]: boolean } {
  if (!control.value.match(/^123/)) {
    return {invalidSku: true};
  }
}

bootstrap(FormApp);
