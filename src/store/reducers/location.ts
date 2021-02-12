export const UPDATE_LOCATION = 'UPDATE_LOCATION'

export interface ILocationState {
  path: string
  title: string
}

export interface ILocationAction {
  type: string
  payload?: ILocationState
}

export const updateLocation = (location: ILocationState) => {
  return { type: UPDATE_LOCATION, payload: location }
}

const reducer = (
  state: ILocationState = { path: '/', title: '' } ,
  action: ILocationAction
) => {
  switch (action.type) {
    case UPDATE_LOCATION:
      return action.payload
    default:
      return state
  }
}

export default reducer