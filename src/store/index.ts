import { createStore, applyMiddleware } from 'redux'
import thunk from 'redux-thunk'
import logger from 'redux-logger'
import { persistStore, persistReducer } from 'redux-persist'
import storage from 'redux-persist/lib/storage'

import reducers from './reducers'

const persistConfig = {
  key: 'root',
  storage
}

const middleware = process.env.NODE_ENV === 'production' ? [thunk] : [thunk, logger]

export const configStore = () => {
  const persistedReducer = persistReducer(persistConfig, reducers)

  const store = createStore(
    persistedReducer,
    applyMiddleware(...middleware)
  )

  const persistor = persistStore(store)

  return { store, persistor }
}
