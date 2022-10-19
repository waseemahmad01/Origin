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
import {getActiveSftPackage, userData} from '../api';
import BuyNumber from '../screens/BuyNumber/BuyNumber';
import PeopleSearch from '../screens/People/PeropleSearch/PeopleSearch';
import CallDetails from '../screens/calls/CallDetails/CallDetails';
import AddPeople from '../screens/People/AddPeople/AddPeople';

const Stack = createNativeStackNavigator();

const client = Voximplant.getInstance();

const StackNavigator = () => {
  const dispatch = useDispatch();
  const navigation = useNavigation();
  const voximplant = Voximplant.getInstance();

  const loggedIn = useSelector(state => state.auth.loggedIn);
  const activePackage = useSelector(state => state.sfts.active);
  const wallet = useSelector(state => state.wallet.publicAddress);
  const user = useSelector(state => state.auth.user);
  const [loading, setLoading] = useState(true);
  const [visited, setVisited] = useState(false);

  const checkIfVisited = async () => {
    try {
      const visit = await AsyncStorage.getItem('visited');
      const token = await AsyncStorage.getItem('token');
      if (token) {
        console.log(token);
        const {data: user} = await userData();
        dispatch.auth.setUser(user);
        dispatch.wallet.setPublicAddress(user?.origen_public_wallet_address);
        const {data} = await getActiveSftPackage();
        // handleVoxImplantLogin();
        dispatch.sfts.setActive(data);
        dispatch.sfts.getCurrentPackage();
        dispatch.auth.setLoggedIn(true);
      }
      if (visit === 'true') {
        setVisited(true);
      }
      setTimeout(() => {
        setLoading(false);
      }, 500);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    checkIfVisited();
  }, []);

  useEffect(() => {
    if (user) {
      handleVoxImplantLogin();
    }
  }, [user]);

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
  const handleVoxImplantLogin = async () => {
    let state = await client.getClientState();
    console.log(`${user?.vox_user_name}@${user?.vox_app_name}`);
    console.log('State ===== >', state);
    if (state === Voximplant.ClientState.DISCONNECTED) {
      await client.connect();
    }
    if (state !== 'logged_in') {
      const res = await client.login(
        `${user?.vox_user_name}@${user?.vox_app_name}`,
        user?.vox_user_password,
      );
      console.log(res);
    }
  };

  const getInitialRoute = () => {
    if (loggedIn) {
      if (wallet && Object.keys(activePackage).length > 0) {
        console.log('package');
        return 'Wallet';
      } else if (wallet && !Object.keys(activePackage).length > 0) {
        return 'Mint-Packages';
      } else {
        return 'Wallet';
      }
    } else {
      return 'Onboarding';
    }
  };

  console.log('active package', activePackage);

  return (
    <>
      {loading ? (
        <SplashScreen />
      ) : (
        <>
          <Stack.Navigator
            initialRouteName={getInitialRoute()}
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
            <Stack.Screen name="Get-Number" component={BuyNumber} />
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
            <Stack.Screen
              name="People-Search"
              component={RequireAuthentication(PeopleSearch, loggedIn)}
            />
            <Stack.Screen
              name="Call-Details"
              component={RequireAuthentication(CallDetails, loggedIn)}
            />
            <Stack.Screen
              name="Add-People"
              component={RequireAuthentication(AddPeople, loggedIn)}
            />
          </Stack.Navigator>
        </>
      )}
    </>
  );
};

export default StackNavigator;
