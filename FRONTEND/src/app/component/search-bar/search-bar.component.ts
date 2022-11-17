import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'app-search-bar',
  templateUrl: './search-bar.component.html',
  styleUrls: ['./search-bar.component.scss']
})
export class SearchBarComponent {

  search = new FormControl('');
  @Input() property: string;
  @Input() list: any[];

  @Output() filterResult = new EventEmitter<any[]>();
  @Output() filterReset = new EventEmitter();


  constructor() {
    this.search.valueChanges.subscribe((value) => {
      if (value == '') {
        this.filterReset.emit();
      }
      else {
        const newlist = this.list.filter((item) => item[this.property].includes(value));
        this.filterResult.emit(newlist);
      }
    });
  }

}
