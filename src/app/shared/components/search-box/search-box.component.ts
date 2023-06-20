import { Component, ElementRef, EventEmitter, Input, OnDestroy, OnInit, Output, ViewChild } from '@angular/core';
import { Subject, Subscription, debounceTime } from 'rxjs';

@Component({
  selector: 'shared-search-box',
  templateUrl: './search-box.component.html',
  styles: [
  ]
})
export class SearchBoxComponent implements OnInit, OnDestroy {

  private debouncer:Subject<string> = new Subject<string>();
  private debouncerSubscription?:Subscription;

  @Input()
  public placeholder:string = '';
  @Input()
  public initialValue:string = '';

  @Output()
  public onValue:EventEmitter<string> = new EventEmitter();

  @Output()
  public onDebounce:EventEmitter<string> = new EventEmitter();

  ngOnInit(): void {
    // this.debouncer
    //   .pipe(
    //     debounceTime(500)
    //   )
    //   .subscribe(value => {
    //     this.onDebounce.emit(value);
    //   });
    this.debouncerSubscription = this.debouncer
      .pipe(
        debounceTime(500)
      )
      .subscribe(value => {
        this.onDebounce.emit(value);
      });
  }
  ngOnDestroy(): void {
    // this.debouncer.unsubscribe();
    this.debouncerSubscription?.unsubscribe();
  }

  @ViewChild('txtTagInput')
  public tagInput!: ElementRef<HTMLInputElement>;

  emitValue():void {
    const value = this.tagInput.nativeElement.value;
    this.onValue.emit(value);
    // this.tagInput.nativeElement.value = '';
  }

  onKeyPress(searchTerm:string):void {
    // console.log(searchTerm);
    this.debouncer.next(searchTerm);
  }

}
