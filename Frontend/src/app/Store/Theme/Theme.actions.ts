import { createAction, props } from "@ngrx/store";

export const toggle = createAction(
  "[Theme] toggle",
  props<{darkMode : boolean}>()
)
