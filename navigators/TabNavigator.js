import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {Image} from 'react-native';
import assets from '../assets';

import WalletGeneration from '../screens/Wallet/WalletGeneration/WalletGeneration';
import Wallet from '../screens/Wallet/Wallet/Wallet';
import Chats from '../screens/Chat/Chats/Chats';
import {useSelector} from 'react-redux';

const Tab = createBottomTabNavigator();
const Stack = createNativeStackNavigator();

const StackNavigator = () => {
  const wallet = useSelector(
    state => state.auth?.user?.origen_public_wallet_address,
  );
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}>
      {wallet === null && (
        <Stack.Screen name="WalletGeneration" component={WalletGeneration} />
      )}
      <Stack.Screen name="My-Wallet" component={Wallet} />
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
          // display: getTabBarVisibility(route),
        },
      })}>
      <Tab.Screen
        name="Calls"
        component={Wallet}
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
        component={Wallet}
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
        component={Wallet}
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
