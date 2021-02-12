import { combineReducers } from 'redux'

import auth, { IAuthState } from './auth'
import plans, { IPlanState } from './plans'
import location, { ILocationState } from './location'

export interface ICombinedStates {
  auth: IAuthState,
  plans: IPlanState,
  location: ILocationState,
}

export default combineReducers({
  auth,
  plans,
  location,
})