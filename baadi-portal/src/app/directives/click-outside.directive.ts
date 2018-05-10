/**
 * Allows binding a function with a clickOutside Event for a component
 * Ex: <div (clickOutside)="close()"></div>
 */
import { Directive, ElementRef, Output, EventEmitter, HostListener } from '@angular/core';

@Directive({
    // tslint:disable-next-line:directive-selector
    selector: '[clickOutside]'
})
export class ClickOutsideDirective {
    constructor(private _elementRef: ElementRef) {}

    @Output() clickOutside = new EventEmitter<MouseEvent>();

    @HostListener('document:click', ['$event', '$event.target'])
    onClick(event: MouseEvent, targetElement: HTMLElement): void {
        if (!targetElement) {
            return;
        }

        if (!this._elementRef.nativeElement.contains(targetElement)) {
            this.clickOutside.emit(event);
        }
    }
}
