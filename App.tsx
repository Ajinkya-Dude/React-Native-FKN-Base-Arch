/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React from 'react';
import { Provider } from 'react-redux';
import { persistor, store } from './src/store';
import { PersistGate } from 'redux-persist/es/integration/react';
import FKNapp from './src/FKNapp';


function App(): JSX.Element {
  
  return (
    <Provider store={store}>
      <PersistGate persistor={persistor}>
        <FKNapp />
      </PersistGate>
    </Provider>
  );
}

export default App;
