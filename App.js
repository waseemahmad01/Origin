import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import store from './store';
import {Provider} from 'react-redux';
import StackNavigator from './navigators/StackNavigator';
import {navigationRef} from './utils/RootNavigation';
import SplashScreen from './screens/SplashScreen/SplashScreen';
import Onboarding from './screens/Onboarding/Onboarding';
import Notification from './screens/Notification/Notification';
import Register from './screens/Register/Register';

const App = () => {
  return (
    <Provider store={store}>
      <NavigationContainer ref={navigationRef}>
        <StackNavigator />
      </NavigationContainer>
      {/* <SplashScreen /> */}
      {/* <Onboarding /> */}
      {/* <Notification /> */}
      {/* <Register /> */}
    </Provider>
  );
};

export default App;
