import { AnyAction } from "redux"
import { IUser } from "./auth"

import { fetchPlans, postPlan, updatePlan } from '../../api/plan'

export const FETCH_PLANS = 'FETCH_PLANS'

export interface IRecord {
  id: string
  amount: number
  category: string
  date: number
  createdAt: number
}

export interface IPlan {
  _id?: string
  title: string
  start: number,
  end: number
  records: IRecord[]
  createdAt: number
}

export interface IPlanData {
  title: string
  start: number,
  end: number
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

export const addPlanAction = (user: IUser, plan: IPlanData) => async (dispatch: DispatchType<IPlanAction>) => {
  if (!user.token) return dispatch({ type: '' })

  await postPlan(user.token, plan)

  const plans: IPlan[] = await fetchPlans(user.token)

  return dispatch({ type: FETCH_PLANS, payload: plans })
}

export const updatePlanAction = (plan: IPlan, user?: IUser) => async (dispatch: DispatchType<IPlanAction>) => {
  if (!user || !user.token) return dispatch({ type: '' })

  await updatePlan(user.token, plan)

  const plans: IPlan[] = await fetchPlans(user.token)

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