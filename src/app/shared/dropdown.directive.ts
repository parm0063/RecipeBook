import { Directive, HostListener, ElementRef, HostBinding } from '@angular/core';

@Directive({
  selector: '[appDropdown]'
})
export class DropdownDirective {
  @HostBinding('class.open') isOpen = false;


  constructor(private elref: ElementRef) {

    }
    @HostListener('click') toggleOpen() {
      this.isOpen = !this.isOpen;
      
   }

}
