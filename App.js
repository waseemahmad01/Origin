import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import store from './store';
import {Provider} from 'react-redux';
import StackNavigator from './navigators/StackNavigator';
import {navigationRef} from './utils/RootNavigation';
import SplashScreen from './screens/SplashScreen/SplashScreen';

const App = () => {
  return (
    <Provider store={store}>
      {/* <NavigationContainer ref={navigationRef}>
        <StackNavigator />
      </NavigationContainer> */}
      <SplashScreen />
    </Provider>
  );
};

export default App;
