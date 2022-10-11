import React, {useEffect, useState} from 'react';

import {useNavigation} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {useDispatch, useSelector} from 'react-redux';

import TabNavigator from './TabNavigator';

import SplashScreen from '../screens/SplashScreen/SplashScreen';
import Onboarding from '../screens/Onboarding/Onboarding';
import Notification from '../screens/Notification/Notification';
import Register from '../screens/Register/Register';
import MintPackages from '../screens/Wallet/MintPackages/MintPackages';
// import Wallet from './screens/Wallet/Wallet/Wallet';
import SendSearch from '../screens/Wallet/SendSearch/SendSearch';
import SendEnterAmount from '../screens/Wallet/SendEnterAmount/SendEnterAmount';
import FaceIdVerification from '../screens/Wallet/FaceIdVerification/FaceIdVerification';
import VerifyPassword from '../screens/Wallet/SendEnterAmount/VerifyPassword';
import TransactionSuccess from '../screens/Wallet/TransactionSuccess/TransactionSuccess';
import Login from '../screens/Login/Login';
import RequireAuthentication from '../screens/RequireAuth/RequireAuth';
import ChatSearch from '../screens/Chat/ChatSearch/ChatSearch';

import Chat from '../screens/Chat/Chat/Chat';
import AudioCall from '../screens/calls/AudioCall/AudioCall';
import {Voximplant} from 'react-native-voximplant';
import EditProfile from '../screens/Profile/EditProfile/EditProfile';

const Stack = createNativeStackNavigator();

const StackNavigator = () => {
  const dispatch = useDispatch();
  const navigation = useNavigation();
  const voximplant = Voximplant.getInstance();

  const loggedIn = useSelector(state => state.auth.loggedIn);
  const [loading, setLoading] = useState(true);
  const [visited, setVisited] = useState(false);

  const checkIfVisited = async () => {
    const visit = await AsyncStorage.getItem('visited');
    const token = await AsyncStorage.getItem('token');
    if (token) {
      console.log(token);
      dispatch.auth.getUserData();
      dispatch.auth.setLoggedIn(true);
    }
    if (visit === 'true') {
      setVisited(true);
    }
    setLoading(false);
  };

  useEffect(() => {
    checkIfVisited();
  }, []);

  useEffect(() => {
    voximplant.on(Voximplant.ClientEvents.IncomingCall, incomingCallEvent => {
      console.log('Hello from call');
      calls.set(incomingCallEvent.call.callId, incomingCallEvent.call);
      navigation.navigate('AudioCall', {
        callId: incomingCallEvent.call.callId,
        inComing: true,
      });
    });
    return function cleanup() {
      voximplant.off(Voximplant.ClientEvents.IncomingCall);
    };
  });

  return (
    <>
      {loading ? (
        <SplashScreen />
      ) : (
        <>
          <Stack.Navigator
            initialRouteName={loggedIn && 'Wallet'}
            screenOptions={{
              headerShown: false,
            }}>
            {!visited && (
              <Stack.Screen name="OnBoarding" component={Onboarding} />
            )}
            <Stack.Screen name="Notification" component={Notification} />
            <Stack.Screen name="Register" component={Register} />
            <Stack.Screen name="Login" component={Login} />
            <Stack.Screen
              name="Wallet"
              component={RequireAuthentication(TabNavigator, loggedIn)}
            />
            <Stack.Screen
              name="Face-Id-verify"
              component={FaceIdVerification}
            />
            <Stack.Screen
              name="Mint-Packages"
              component={RequireAuthentication(MintPackages, loggedIn)}
            />
            <Stack.Screen
              name="Send-Verify"
              component={RequireAuthentication(VerifyPassword, loggedIn)}
            />
            <Stack.Screen
              name="Send-Search"
              component={RequireAuthentication(SendSearch, loggedIn)}
            />
            <Stack.Screen
              name="Send-EnterAmount"
              component={RequireAuthentication(SendEnterAmount, loggedIn)}
            />
            <Stack.Screen
              name="Transaction-success"
              component={RequireAuthentication(TransactionSuccess, loggedIn)}
            />
            <Stack.Screen
              name="Chat-search"
              component={RequireAuthentication(ChatSearch, loggedIn)}
            />
            <Stack.Screen
              name="Chat"
              component={RequireAuthentication(Chat, loggedIn)}
            />
            <Stack.Screen
              name="AudioCall"
              component={RequireAuthentication(AudioCall, loggedIn)}
            />
            <Stack.Screen
              name="EditProfile"
              component={RequireAuthentication(EditProfile, loggedIn)}
            />
          </Stack.Navigator>
        </>
      )}
    </>
  );
};

export default StackNavigator;
