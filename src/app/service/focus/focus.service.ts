import { ElementRef, Injectable } from '@angular/core';

@Injectable({
    providedIn: 'root'
})

export class FocusService {

    constructor() {}

    public focusElement(elementRef: ElementRef): void {
        if (elementRef && elementRef.nativeElement) {
            elementRef.nativeElement.focus();
        }
    }
}
