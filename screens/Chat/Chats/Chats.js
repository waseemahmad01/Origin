import React, {useEffect, useState} from 'react';

import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  StatusBar,
  Platform,
  Image,
  Pressable,
  ScrollView,
} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';

import IconButton from '../../../components/IconButton/IconButton';

import LinearGradient from 'react-native-linear-gradient';

import theme from '../../../theme';
import assets from '../../../assets';
import {Voximplant} from 'react-native-voximplant';
const isIos = Platform.OS === 'ios';
const client = Voximplant.getInstance();

const Chat = ({navigation}) => {
  const dispatch = useDispatch();
  const {vox_app_name, vox_user_name, vox_user_password, vox_phone_number} =
    useSelector(state => state.auth.user);
  const users = useSelector(state => state.users.users);
  console.log(users);
  const [tab, setTab] = useState(0);

  const handleVoxImplantLogin = async () => {
    let state = await client.getClientState();
    console.log('State ===== >', state);
    if (state === Voximplant.ClientState.DISCONNECTED) {
      await client.connect();
    }
    if (state !== 'logged_in') {
      const res = await client.login(
        `${vox_user_name}@${vox_app_name}`,
        vox_user_password,
      );
      console.log(res);
    }
  };

  useEffect(() => {
    dispatch.users.getAllUsers();
    handleVoxImplantLogin();
  }, []);
  return (
    <LinearGradient
      style={{
        ...styles.gradient,
        paddingTop: isIos ? 0 : StatusBar.currentHeight,
      }}
      colors={[theme.COLORS.primary, theme.COLORS.secondary]}
      start={{x: 0, y: 0}}
      end={{x: 1, y: 0}}>
      <StatusBar translucent={true} backgroundColor={'transparent'} />
      <SafeAreaView style={{flex: 1}}>
        <View style={styles.container}>
          <View style={styles.header}>
            <Text
              style={styles.headerTitle}
              onPress={() => navigation.navigate('Chat-search')}>
              Chats
            </Text>
            <View style={styles.userInfo}>
              <View>
                <Image
                  source={assets.user}
                  style={{
                    height: 40,
                    width: 40,
                    borderRadius: 40 / 2,
                    marginRight: 18,
                    marginTop: 8,
                  }}
                  resizeMode="cover"
                />
              </View>
              <View style={styles.userDetails}>
                <Text style={styles.userName}>Robert Smith</Text>
                <Text style={styles.userMetrics}>@rsmith99</Text>
                <Text style={styles.userMetrics}>0x4845c...e2d1949dfbe</Text>
                <Text style={styles.userMetrics}>32.6345 GCoins</Text>
              </View>
            </View>
          </View>
          <View style={styles.body}>
            <View style={styles.tabs}>
              <Pressable
                onPress={() => setTab(0)}
                style={{
                  ...styles.tab,
                  backgroundColor:
                    tab === 0 ? theme.COLORS.primary : theme.COLORS.white,
                  borderColor: tab === 0 ? theme.COLORS.primary : '#1D1D35',
                }}>
                <Text
                  style={{
                    ...styles.tabLabel,
                    color: tab === 0 ? theme.COLORS.white : '#1D1D35',
                  }}>
                  Recent Message
                </Text>
              </Pressable>
              <Pressable
                onPress={() => setTab(1)}
                style={{
                  ...styles.tab,
                  backgroundColor:
                    tab === 1 ? theme.COLORS.primary : theme.COLORS.white,
                  borderColor: tab === 1 ? theme.COLORS.primary : '#1D1D35',
                }}>
                <Text
                  style={{
                    ...styles.tabLabel,
                    color: tab === 1 ? theme.COLORS.white : '#1D1D35',
                  }}>
                  Active
                </Text>
              </Pressable>
            </View>
            <View style={{flexGrow: 1, marginBottom: 20}}>
              <ScrollView showsVerticalScrollIndicator={false}>
                <Pressable
                  style={styles.userBlock}
                  onPress={() => navigation.navigate('Chat', {})}>
                  <View style={styles.transactionDetails}>
                    <View style={{flexDirection: 'row', alignItems: 'center'}}>
                      <View
                        style={{
                          position: 'relative',
                        }}>
                        <Image
                          source={assets.user}
                          style={{height: 56, width: 56}}
                          resizeMode="cover"
                        />
                        <View style={styles.onlineIndicator}></View>
                      </View>
                      <View style={{marginLeft: 16}}>
                        <Text style={styles.transactionType}>test</Text>
                        <View style={{flexDirection: 'row'}}>
                          <Text
                            style={{
                              ...styles.transactionInfo,
                            }}>
                            phone
                          </Text>
                        </View>
                      </View>
                    </View>
                    <View>
                      <Text style={styles.amount}>3m ago</Text>
                    </View>
                  </View>
                </Pressable>
                {users.map(user => (
                  <Pressable
                    style={styles.userBlock}
                    key={user?.id}
                    onPress={() => navigation.navigate('Chat', {user})}>
                    <View style={styles.transactionDetails}>
                      <View
                        style={{flexDirection: 'row', alignItems: 'center'}}>
                        <View
                          style={{
                            position: 'relative',
                          }}>
                          <Image
                            source={assets.user}
                            style={{height: 56, width: 56}}
                            resizeMode="cover"
                          />
                          <View style={styles.onlineIndicator}></View>
                        </View>
                        <View style={{marginLeft: 16}}>
                          <Text style={styles.transactionType}>
                            {user?.username}
                          </Text>
                          <View style={{flexDirection: 'row'}}>
                            <Text
                              style={{
                                ...styles.transactionInfo,
                              }}>
                              {user?.phone_number}
                            </Text>
                          </View>
                        </View>
                      </View>
                      <View>
                        <Text style={styles.amount}>3m ago</Text>
                      </View>
                    </View>
                  </Pressable>
                ))}
                <View style={{height: 220}}></View>
              </ScrollView>
            </View>
          </View>
        </View>
        <IconButton containerStyle={styles.floatingButton}>
          <Image
            source={assets.addUser}
            style={{
              height: 18,
              width: 25,
              marginRight: -5,
            }}
          />
        </IconButton>
      </SafeAreaView>
    </LinearGradient>
  );
};

export default Chat;

const styles = StyleSheet.create({
  gradient: {
    flex: 1,
  },
  container: {
    flex: 1,
  },
  header: {
    paddingHorizontal: 24,
  },
  headerTitle: {
    ...theme.TYPOGRAPHY.h3,
    fontWeight: '700',
    color: theme.COLORS.white,
    fontFamily: 'Inter',
  },
  userInfo: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginTop: 10,
  },
  userName: {
    ...theme.TYPOGRAPHY.body1,
    fontWeight: '500',
    fontFamily: 'Inter',
    color: theme.COLORS.white,
  },
  userMetrics: {
    fontSize: 10,
    fontFamily: 'Inter',
    color: theme.COLORS.white,
    fontWeight: '400',
  },
  body: {
    flexGrow: 1,
    backgroundColor: theme.COLORS.white,
    paddingHorizontal: 24,
    marginTop: 26.75,
  },
  tabs: {
    paddingVertical: 20,
    flexDirection: 'row',
  },
  tab: {
    paddingHorizontal: 16,
    paddingVertical: 7,
    borderWidth: 1,

    marginRight: 12,
    borderRadius: 23,
  },
  tabLabel: {
    fontSize: 12,
    fontFamily: 'Inter',
    lineHeight: 18,
    fontWeight: '400',
  },
  userBlock: {
    paddingVertical: 20,
  },
  title: {
    ...theme.TYPOGRAPHY.subtitle1,
    color: '#B7B7BE',
    fontFamily: 'Inter',
    fontWeight: '500',
  },
  transactionDetails: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    justifyContent: 'space-between',
  },
  transactionType: {
    ...theme.TYPOGRAPHY.body1,
    fontWeight: '500',
    fontFamily: 'Inter',
    color: '#1D1D35',
  },
  transactionInfo: {
    fontSize: 12,
    fontWeight: '400',
    fontFamily: 'Inter',
    lineHeight: 18,
    marginTop: 8,
    color: '#6E6E7E',
  },
  amount: {
    ...theme.TYPOGRAPHY.body2,
    color: '#6E6E7E',
    fontWeight: '400',
    fontFamily: 'Inter',
    marginTop: 8,
  },
  onlineIndicator: {
    position: 'absolute',
    height: 16,
    width: 16,
    backgroundColor: theme.COLORS.primary,
    borderRadius: 16 / 2,
    borderWidth: 3,
    borderColor: theme.COLORS.white,
    right: 0,
    bottom: 0,
  },
  floatingButton: {
    position: 'absolute',
    right: 24,
    bottom: 20,
    shadowColor: theme.COLORS.primary,
    shadowOffset: {
      width: 0,
      height: 7,
    },
    shadowOpacity: 0.41,
    shadowRadius: 9.11,
    elevation: 14,
  },
});
