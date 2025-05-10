import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { ToolbarComponent } from '../../Components/toolbar/toolbar.component';
import { Store } from '@ngrx/store';
import StoreType from '../../Store/Store';
import { initGroup } from '../../Store/Groups/Group.actions';

@Component({
  selector: 'app-main',
  imports: [RouterOutlet, ToolbarComponent],
  templateUrl: './main.component.html',
})
export class MainComponent {
  constructor(private store: Store<StoreType>) {}
  ngOnInit(): void {
    this.store.dispatch(initGroup());
  }
}
