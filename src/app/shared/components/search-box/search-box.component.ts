import { Component, ElementRef, EventEmitter, Input, Output, ViewChild } from '@angular/core';

@Component({
  selector: 'shared-search-box',
  templateUrl: './search-box.component.html',
  styles: [
  ]
})
export class SearchBoxComponent {
  @Input()
  public placeholder:string = '';

  @Output()
  public onValue:EventEmitter<string> = new EventEmitter();

  @ViewChild('txtTagInput')
  public tagInput!: ElementRef<HTMLInputElement>;

  emitValue():void {
    const value = this.tagInput.nativeElement.value;
    this.onValue.emit(value);
    // this.tagInput.nativeElement.value = '';
  }
}
