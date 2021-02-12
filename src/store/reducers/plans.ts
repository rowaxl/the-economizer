import { AnyAction } from "redux"
import { IUser } from "./auth"

import { fetchPlans } from '../../api/plan'

export const FETCH_PLANS = 'FETCH_PLANS'

export interface IRecord {
  id: string
  createdAt: number
  amount: number
  category: string
}

export interface IPlan {
  id: string
  date: string
  records: IRecord[]
}

export interface IPlanState {
  plans?: IPlan[]
}

export interface IPlanAction extends AnyAction {
  type: string
  payload?: IPlan[]
}

type DispatchType<T> = (args: T) => T

export const fetchPlansAction = (user: IUser) => async (dispatch: DispatchType<IPlanAction>) => {
  if (!user.token) return dispatch({ type: '' })

  const plans:IPlan[] = await fetchPlans(user.token)

  return dispatch({ type: FETCH_PLANS, payload: plans })
}

const reducer = (
  state: IPlanState = { plans: undefined },
  action: IPlanAction
) => {
  switch (action.type) {
    case FETCH_PLANS: 
      return { plans: action.payload }
    default:
      return state
  }
}

export default reducer