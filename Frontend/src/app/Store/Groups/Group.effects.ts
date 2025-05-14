import { inject, Injectable } from '@angular/core';

import { Actions, createEffect, ofType } from '@ngrx/effects';
import { map, switchMap, tap } from 'rxjs';
import { Store } from '@ngrx/store';

import StoreType from '../Store';
import { initGroup, setGroup } from './Group.actions';
import { UserService } from '../../Service/User/user.service';
@Injectable()
export class GroupEffects {
  actions = inject(Actions);
  initializeGroup$ = createEffect(() =>
    this.actions.pipe(
      ofType(initGroup),
      switchMap(() =>
        this.service
          .getUserGroups()
          .pipe(map((data) => setGroup({ value: data })))
      )
    )
  );
  constructor(private store: Store<StoreType>, private service: UserService) {}
}
