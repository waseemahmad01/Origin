import React, {useEffect, useState} from 'react';

import {NavigationContainer} from '@react-navigation/native';

import {createNativeStackNavigator} from '@react-navigation/native-stack';

import SplashScreen from './screens/SplashScreen/SplashScreen';
import Onboarding from './screens/Onboarding/Onboarding';
import Notification from './screens/Notification/Notification';
import Register from './screens/Register/Register';

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
            screenOptions={{
              headerShown: false,
            }}>
            <Stack.Screen name="OnBoarding" component={Onboarding} />
            <Stack.Screen name="Notification" component={Notification} />
            <Stack.Screen name="Register" component={Register} />
          </Stack.Navigator>
        </NavigationContainer>
      )}
    </>
  );
};

export default App;
