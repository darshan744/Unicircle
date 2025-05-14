import { Component, } from '@angular/core';
import { ProgressSpinner } from 'primeng/progressspinner';
import { LoadingService } from '../../Service/LoadingService/loading.service';
import { AsyncPipe, CommonModule } from '@angular/common';
@Component({
  selector: 'app-loading',
  imports: [ProgressSpinner, CommonModule, AsyncPipe],
  templateUrl: './loading.component.html',
})
export class LoadingComponent {
   constructor(public loadingService : LoadingService) { }
}
