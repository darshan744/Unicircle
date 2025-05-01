import { Injectable } from '@angular/core';
import {MessageService} from 'primeng/api'
@Injectable({
  providedIn: 'root'
})
export class ToastService {

  constructor(private service : MessageService) { }

  showToast(header:string ,message :string ,severity:Severity ) {
    this.service.add({closable : true , severity , summary:header , detail:message , life : 2000})
  }
}
type Severity =
  | 'success'
  | 'info'
  | 'warn'
  | 'danger'
  | 'secondary'
  | 'contrast';
