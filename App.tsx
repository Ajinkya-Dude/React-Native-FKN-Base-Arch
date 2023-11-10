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
import { DefaultTheme, Provider as PaperProvider } from 'react-native-paper';
import { realmConfig, realmContext } from './src/database/database';
import Realm from "realm";


const theme = {
  ...DefaultTheme,
  roundness: 2,
  colors: {
    ...DefaultTheme.colors,
    // primary: '#3498db',
    // accent: '#f1c40f',
  },
};
function App(): JSX.Element {
  //const { RealmProvider } = realmContext();

  return (
    <Provider store={store}>
      <PersistGate persistor={persistor}>
        <PaperProvider theme={theme}>
          <realmContext.RealmProvider>
            <FKNapp />
          </realmContext.RealmProvider>
        </PaperProvider>
      </PersistGate>
    </Provider>
  );
}

export default App;
