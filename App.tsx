import React from 'react';
import {Provider} from 'react-redux';
import {persistor, store} from './src/store';
import {PersistGate} from 'redux-persist/es/integration/react';
import {Text} from 'react-native';

function App(): JSX.Element {
  //const { RealmProvider } = realmContext();

  return (
    <Provider store={store}>
      <PersistGate persistor={persistor}>
        <Text>Hello World!!!!</Text>
      </PersistGate>
    </Provider>
  );
}

export default App;
