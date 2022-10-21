import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {Image} from 'react-native';
import assets from '../assets';
import {useNavigation} from '@react-navigation/native';

import WalletGeneration from '../screens/Wallet/WalletGeneration/WalletGeneration';
import Wallet from '../screens/Wallet/Wallet/Wallet';
import Chats from '../screens/Chat/Chats/Chats';
import {useSelector} from 'react-redux';
import Profile from '../screens/Profile/Profile/Profile';
import Settings from '../screens/Profile/Settings/Settings';
import Privacy from '../screens/Profile/Privacy/Privacy';
import Blocked from '../screens/Profile/Blocked/Blocked';
import Help from '../screens/Profile/Help/Help';
import AboutUs from '../screens/Profile/AboutUs/AboutUs';
import People from '../screens/People/People';
import Marketplace from '../screens/Wallet/Marketplace/Marketplace';
import CallHistory from '../screens/calls/CallHistory/CallHistory';
import CallSearch from '../screens/calls/CallSearch/CallSearch';

const Tab = createBottomTabNavigator();
const Stack = createNativeStackNavigator();

const StackNavigator = () => {
  const wallet = useSelector(state => state.wallet.publicAddress);
  console.log('wallet address ==', wallet);
  // .origen_public_wallet_address,
  return (
    <Stack.Navigator
      initialRouteName={
        typeof wallet === 'string' ? 'My-Wallet' : 'WalletGeneration'
      }
      screenOptions={{
        headerShown: false,
      }}>
      <Stack.Screen name="WalletGeneration" component={WalletGeneration} />
      <Stack.Screen name="My-Wallet" component={Wallet} />
      <Stack.Screen name="Marketplace" component={Marketplace} />
    </Stack.Navigator>
  );
};

// const ProfileNavigator = () => {
//   return (
//     <Stack.Navigator
//       screenOptions={{
//         headerShown: false,
//       }}>
//       <Stack.Screen name="Profile1" component={Profile} />
//       <Stack.Screen name="Settings" component={Settings} />
//       <Stack.Screen name="Privacy" component={Privacy} />
//       <Stack.Screen name="Blocked" component={Blocked} />
//       <Stack.Screen name="Help" component={Help} />
//       <Stack.Screen name="About" component={AboutUs} />
//     </Stack.Navigator>
//   );
// };

const CallNavigator = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}>
      <Stack.Screen name="Calls1" component={CallHistory} />
      <Stack.Screen name="Call-Search" component={CallSearch} />
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
          // backgroundColor: 'red',
          // height: 100,
          // display: getTabBarVisibility(route),
        },
      })}>
      <Tab.Screen
        name="Calls"
        component={CallNavigator}
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
        component={Chats}
        options={{
          tabBarIcon: ({focused}) => (
            <Image
              source={focused ? assets.chatActive : assets.msg}
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
        component={People}
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
        component={Profile}
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

// const getTabBarVisibility = route => {
//   const routeName = getFocusedRouteNameFromRoute(route) ?? 'Feed';

//   if (
//     routeName === 'Face-Id-verify' ||
//     routeName === 'Mint-Packages' ||
//     routeName === 'Send-Search' ||
//     routeName === 'Send-EnterAmount'
//   ) {
//     return 'none';
//   } else {
//     return 'flex';
//   }
// };
