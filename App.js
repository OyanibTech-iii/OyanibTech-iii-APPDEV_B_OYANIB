import React from 'react';
import { Platform, View } from 'react-native';

import AppNavigationNi from './src/navigations';

import rootSaga from './src/App/sagas';
import configureStore from './src/App/reducers';

import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import { AuthProvider } from './src/utils/AuthContext';

const { store, persistor, runSaga } = configureStore();
runSaga(rootSaga);

const App = () => {
  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <AuthProvider>
          <View style={{ flex: 1, backgroundColor: '#F2F2F2' }}>
            <AppNavigationNi />
          </View>
        </AuthProvider>
      </PersistGate>
    </Provider>
  );
};

export default App;