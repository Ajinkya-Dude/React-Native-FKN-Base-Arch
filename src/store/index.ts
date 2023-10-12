import { configureStore} from '@reduxjs/toolkit';
import rootReducer from './reducer';
import AsyncStorage from '@react-native-community/async-storage';
import { persistReducer, persistStore } from 'redux-persist';
import thunk from 'redux-thunk';


const persistConfig = {
  key: 'root',
  storage:AsyncStorage,
}
const persistedReducer = persistReducer(persistConfig, rootReducer);
export const store = configureStore({
  reducer: persistedReducer,
  middleware:[thunk]
});
export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>
export const persistor = persistStore(store);