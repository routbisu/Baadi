import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import { Component, OnInit, forwardRef, ElementRef, Renderer } from '@angular/core';

@Component({
  selector: 'app-text-box',
  templateUrl: './text-box.component.html',
  styleUrls: ['./text-box.component.scss'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: TextBoxComponent,
      multi: true
    }
  ]
})
export class TextBoxComponent implements ControlValueAccessor {

  textValue;
  propagateChange = (_: any) => {};

  constructor(private _elementRef: ElementRef, private _renderer: Renderer) {}

  writeValue(value: any) {
    this.textValue = value;
  }

  registerOnChange(fn) {
    this.propagateChange = fn;
  }

  registerOnTouched() {}

  setDisabledState(isDisabled: boolean): void {
    //this._renderer.s (this._elementRef.nativeElement, 'disabled', isDisabled);
  }
}
