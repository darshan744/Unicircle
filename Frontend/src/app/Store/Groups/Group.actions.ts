import { createAction, props } from "@ngrx/store";
import { UserGroup } from "../../Types/User";


export const initGroup = createAction("[Group] INIT")

export const getGroup = createAction(
  "[Group] GET"
)

export const setGroup = createAction(
  "[Group] SET",
  props<{value : UserGroup[]}>()
)
