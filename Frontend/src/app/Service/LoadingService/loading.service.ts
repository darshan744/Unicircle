import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LoadingService {

  isLoading : BehaviorSubject<boolean> = new BehaviorSubject(false);
  isLoading$ : Observable<boolean> = this.isLoading.asObservable();
  constructor() {  }

  loadComponent() { this.isLoading.next(true) }
  hideLoadingComponent() { this.isLoading.next(false); }

}
