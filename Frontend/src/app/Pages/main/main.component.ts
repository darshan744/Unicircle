import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { ToolbarComponent } from '../../Components/toolbar/toolbar.component';

@Component({
  selector: 'app-main',
  imports: [RouterOutlet , ToolbarComponent],
  templateUrl: './main.component.html',
})
export class MainComponent {}
