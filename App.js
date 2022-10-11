import React from 'react';
import {API_URL} from '@env';
import {NavigationContainer} from '@react-navigation/native';
import store from './store';
import {Provider} from 'react-redux';
import StackNavigator from './navigators/StackNavigator';
import {navigationRef} from './utils/RootNavigation';

const App = () => {
  console.log(API_URL);
  return (
    <Provider store={store}>
      <NavigationContainer ref={navigationRef}>
        <StackNavigator />
      </NavigationContainer>
    </Provider>
  );
};

export default App;
