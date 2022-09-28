import {getFocusedRouteNameFromRoute} from '@react-navigation/native';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {Image} from 'react-native';
import assets from '../assets';

import Notification from '../screens/Notification/Notification';
import SplashScreen from '../screens/SplashScreen/SplashScreen';
import WalletGeneration from '../screens/Wallet/WalletGeneration/WalletGeneration';
import FaceIdVerification from '../screens/Wallet/FaceIdVerification/FaceIdVerification';
import MintPackages from '../screens/Wallet/MintPackages/MintPackages';

const Tab = createBottomTabNavigator();
const Stack = createNativeStackNavigator();

const StackNavigator = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}>
      <Stack.Screen name="WalletGeneration" component={WalletGeneration} />
      <Stack.Screen name="Face-Id-verify" component={FaceIdVerification} />
      <Stack.Screen name="Mint-Packages" component={MintPackages} />
    </Stack.Navigator>
  );
};

const TabNavigator = () => {
  return (
    <Tab.Navigator
      initialRouteName="wallet"
      screenOptions={({route}) => ({
        headerShown: false,
        tabBarLabelStyle: {
          fontSize: 12,
          textTransform: 'capitalize',
          fontFamily: 'Inter',
          fontWeight: '400',
        },
        tabBarActiveTintColor: '#1D1D35',
        tabBarInactiveTintColor: '#6E6E7E',
        tabBarStyle: {
          display: getTabBarVisibility(route),
        },
      })}>
      <Tab.Screen
        name="Calls"
        component={Notification}
        options={{
          tabBarIcon: ({focused}) => (
            <Image
              source={assets.phone}
              style={{
                height: 20,
                width: 20,
              }}
            />
          ),
        }}
      />
      <Tab.Screen
        name="Messages"
        component={SplashScreen}
        options={{
          tabBarIcon: ({focused}) => (
            <Image
              source={assets.msg}
              style={{
                height: 19.25,
                width: 22,
              }}
            />
          ),
        }}
      />
      <Tab.Screen
        name="wallet"
        component={StackNavigator}
        options={{
          tabBarIcon: ({focused}) => (
            <Image
              source={assets.walletActive}
              style={{
                height: 18.38,
                width: 21,
              }}
              resizeMode="cover"
            />
          ),
        }}
      />
      <Tab.Screen
        name="People"
        component={Notification}
        options={{
          tabBarIcon: ({focused}) => (
            <Image
              source={assets.users}
              style={{
                height: 16.8,
                width: 24,
              }}
            />
          ),
        }}
      />
      <Tab.Screen
        name="Profile"
        component={Notification}
        options={{
          tabBarIcon: ({focused}) => (
            <Image
              source={assets.user}
              style={{
                height: 24,
                width: 24,
                resizeMode: 'cover',
              }}
            />
          ),
        }}
      />
    </Tab.Navigator>
  );
};

export default TabNavigator;

const getTabBarVisibility = route => {
  const routeName = getFocusedRouteNameFromRoute(route) ?? 'Feed';
  console.log(routeName);
  if (routeName === 'Face-Id-verify' || routeName === 'Mint-Packages') {
    return 'none';
  } else {
    return 'flex';
  }
};
