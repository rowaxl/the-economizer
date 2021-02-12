export const FETCH_USER = 'FETCH_USER'

export interface IUser {
  name?: string | null
  email?: string | null
  image?: string | null
  token?: string | null
}

export interface IAuthState {
  user?: IUser
}

export interface IAuthAction {
  type: string
  payload?: IUser
}

export const updateAuth = (user?: IUser) => {
  return { type: FETCH_USER, payload: user }
}

const reducer = (
  state: IAuthState = { user: undefined },
  action: IAuthAction
) => {
  switch (action.type) {
    case FETCH_USER:
      return {
        user: action.payload
      }
    default:
      return state
  }
}

export default reducer