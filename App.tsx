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

  return (
    <Provider store={store}>
      <PersistGate persistor={persistor}>
        <PaperProvider theme={theme}>
          <FKNapp />
        </PaperProvider>
      </PersistGate>
    </Provider>
  );
}

export default App;
