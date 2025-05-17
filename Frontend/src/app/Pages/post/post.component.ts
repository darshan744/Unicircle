import { Component, inject, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-post',
  imports: [],
  templateUrl: './post.component.html',
  styleUrl: './post.component.css',
})
export class PostComponent implements OnInit{
  viewComments: boolean = false;
  private readonly router = inject(ActivatedRoute);

  ngOnInit(): void {
    this.router.queryParamMap.subscribe((query) =>{
      this.viewComments = Boolean(query.get('comment'))
    }
    );
  }
}
