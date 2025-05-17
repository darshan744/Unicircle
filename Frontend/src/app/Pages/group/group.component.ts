import { AsyncPipe } from '@angular/common';
import { Component, inject } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-group',
  imports: [AsyncPipe],
  templateUrl: './group.component.html',
  styleUrl: './group.component.css'
})
export class GroupComponent {

  readonly router = inject(ActivatedRoute);
  ngOnInit() : void {
    this.router.paramMap;
  }
}
