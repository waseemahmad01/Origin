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
import WalletGeneration from './screens/Wallet/WalletGeneration/WalletGeneration';
import FaceIdVerification from './screens/Wallet/FaceIdVerification/FaceIdVerification';
import MintPackages from './screens/Wallet/MintPackages/MintPackages';
import Wallet from './screens/Wallet/Wallet/Wallet';
import TransactionSuccess from './screens/Wallet/TransactionSuccess/TransactionSuccess';
import SendSearch from './screens/Wallet/SendSearch/SendSearch';
import SendEnterAmount from './screens/Wallet/SendEnterAmount/SendEnterAmount';
import VerifyPassword from './screens/Wallet/SendEnterAmount/VerifyPassword';

const App = () => {
  return (
    <Provider store={store}>
      {/* <NavigationContainer ref={navigationRef}>
        <StackNavigator />
      </NavigationContainer> */}
      {/* <SplashScreen /> */}
      {/* <Onboarding /> */}
      {/* <Notification /> */}
      {/* <Register /> */}
      {/* <WalletGeneration /> */}
      {/* <FaceIdVerification /> */}
      {/* <MintPackages /> */}
      {/* <Wallet /> */}
      {/* <TransactionSuccess /> */}
      {/* <SendSearch /> */}
      <SendEnterAmount />
      {/* <VerifyPassword /> */}
    </Provider>
  );
};

export default App;
