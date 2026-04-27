import React, { useEffect } from 'react';
import { View } from 'react-native';

import AppNavigationNi from './src/navigations';

import rootSaga from './src/App/sagas';
import configureStore from './src/App/reducers';

import { Provider } from 'react-redux';
import { AuthProvider } from './src/utils/AuthContext';

const { store, runSaga } = configureStore();
runSaga(rootSaga);

const App = () => {
  useEffect(() => {
  }, []);

  return (
    <Provider store={store}>
      <AuthProvider>
        <View style={{ flex: 1, backgroundColor: '#F2F2F2' }}>
          <AppNavigationNi />
        </View>
      </AuthProvider>
    </Provider>
  );
};

export default App;