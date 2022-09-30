import React, {useEffect, useState} from 'react';

import {NavigationContainer} from '@react-navigation/native';

import {createNativeStackNavigator} from '@react-navigation/native-stack';

import TabNavigator from './navigators/TabNavigator';

import SplashScreen from './screens/SplashScreen/SplashScreen';
import Onboarding from './screens/Onboarding/Onboarding';
import Notification from './screens/Notification/Notification';
import Register from './screens/Register/Register';
import MintPackages from './screens/Wallet/MintPackages/MintPackages';
import Wallet from './screens/Wallet/Wallet/Wallet';
import SendSearch from './screens/Wallet/SendSearch/SendSearch';
import SendEnterAmount from './screens/Wallet/SendEnterAmount/SendEnterAmount';
import FaceIdVerification from './screens/Wallet/FaceIdVerification/FaceIdVerification';
import VerifyPassword from './screens/Wallet/SendEnterAmount/VerifyPassword';
import TransactionSuccess from './screens/Wallet/TransactionSuccess/TransactionSuccess';

const Stack = createNativeStackNavigator();

const App = () => {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setTimeout(() => {
      setLoading(false);
    }, 1000);
  }, []);

  return (
    <>
      {loading ? (
        <SplashScreen />
      ) : (
        <NavigationContainer>
          <Stack.Navigator
            // initialRouteName="Wallet"
            screenOptions={{
              headerShown: false,
            }}>
            <Stack.Screen name="OnBoarding" component={Onboarding} />
            <Stack.Screen name="Notification" component={Notification} />
            <Stack.Screen name="Register" component={Register} />
            <Stack.Screen name="Wallet" component={TabNavigator} />
            <Stack.Screen
              name="Face-Id-verify"
              component={FaceIdVerification}
            />
            <Stack.Screen name="Mint-Packages" component={MintPackages} />
            <Stack.Screen name="Send-Verify" component={VerifyPassword} />
            <Stack.Screen name="Send-Search" component={SendSearch} />
            <Stack.Screen name="Send-EnterAmount" component={SendEnterAmount} />
            <Stack.Screen
              name="Transaction-success"
              component={TransactionSuccess}
            />
          </Stack.Navigator>
        </NavigationContainer>
      )}
    </>
  );
};

export default App;
