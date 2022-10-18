import React, { useEffect, useState } from 'react';
import { Voximplant } from 'react-native-voximplant';
import { useDispatch, useSelector } from 'react-redux';
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
  ImageBackground,
} from 'react-native';

import IconButton from '../../../components/IconButton/IconButton';
import LinearGradient from 'react-native-linear-gradient';
import theme from '../../../theme';
import assets from '../../../assets';
import { getAllChats } from '../../../api';
import { truncateString } from '../../../utils';
const isIos = Platform.OS === 'ios';
const client = Voximplant.getInstance();

const Chat = ({ navigation }) => {
  const dispatch = useDispatch();
  const user = useSelector(state => state.auth.user);
  const users = useSelector(state => state.users.users);
  const balance = useSelector(state => state.wallet.balance);
  const [tab, setTab] = useState(0);
  const [chats, setChats] = useState([{}, {}]);

  const handleVoxImplantLogin = async () => {
    let state = await client.getClientState();
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

  useEffect(() => {
    dispatch.users.getAllUsers();
    getChats();
    handleVoxImplantLogin();
  }, []);

  const getChats = async () => {
    try {
      const { data } = await getAllChats();
      // setChats(data);
      console.log('response - ', data);
    } catch (err) {
      console.log('error - ', err);
    }
  };

  //
  return (
    <ImageBackground style={[StyleSheet.absoluteFill, styles.background]} source={assets.background}>
      <SafeAreaView>
        <View style={[styles.container, styles.search]}>
          <Pressable onPress={() => navigation.navigate("Chat-search")}>
            <Image source={assets.messageSearchIcon} />
          </Pressable>
          <Text style={styles.messageText}>Messages</Text>
          <View />
        </View>
        <LinearGradient
          style={styles.avatarContainer}
          colors={['#E8EDF7', '#D5F9FD']}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 0 }}>
          <View style={[styles.container, styles.avatarSubContainer]}>
            <View style={styles.avatarBorder}>
              <Image
                source={assets.user}
                style={styles.avatar}
                resizeMode="cover"
              />
            </View>
            <View style={styles.userDetails}>
              <Text style={styles.userName}>{user?.name}</Text>
              <View style={{ flexDirection: 'row', marginVertical: 6, }}>
                <Text style={[styles.userMetrics, { marginRight: 10, }]}>@{user?.username}</Text>
                <Text style={styles.userMetrics}>
                  {truncateString(user?.origen_public_wallet_address)}
                </Text>
              </View>
              <View style={styles.coinButton}>
                <Image style={{ marginRight: 10, }} source={assets.gCoin} />
                <Text style={[styles.userMetrics, { color: 'white', fontWeight: '500' }]}>{balance} GCoins</Text>
              </View>
            </View>
          </View>
        </LinearGradient>
        <LinearGradient colors={['#fff', "#FEF7F7", '#FCEBEF',]} style={styles.body}>
          <View style={styles.tabs}>
            <Pressable
              onPress={() => setTab(0)}
              style={[styles.tab, tab === 0 ? styles.tabActive : {}]}>
              <Text
                style={[styles.tabLabel, tab === 0 ? styles.tabLabelActive : {}]}>
                Recent Message
              </Text>
            </Pressable>
            <Pressable
              onPress={() => setTab(1)}
              style={[styles.tab, tab === 1 ? styles.tabActive : {}]}>
              <Text
                style={[styles.tabLabel, tab === 1 ? styles.tabLabelActive : {}]}>
                Active
              </Text>
            </Pressable>
          </View>
          <ScrollView showsVerticalScrollIndicator={false}>
            {chats.map(chat => (
              <Pressable
                style={styles.userBlock}
                key={chat?.id}
                onPress={() => {
                  navigation.navigate('Chat', { chat });
                }}>
                <View style={styles.transactionDetails}>
                  <View
                    style={{ flexDirection: 'row', alignItems: 'center' }}>
                    <View
                      style={{
                        position: 'relative',
                      }}>
                      <Image
                        source={assets.user}
                        style={{ height: 56, width: 56 }}
                        resizeMode="cover"
                      />
                      <View style={styles.onlineIndicator}></View>
                    </View>
                    <View style={{ marginLeft: 16 }}>
                      <Text style={styles.transactionType}>
                        {chat?.username}
                      </Text>
                      <Text
                        numberOfLines={1}
                        style={styles.transactionInfo}>
                        {chat?.phone_number}
                      </Text>
                    </View>
                  </View>
                  <View>
                    <Text style={styles.amount}>3m ago</Text>
                  </View>
                </View>
              </Pressable>
            ))}
            <View style={{ height: 220 }}></View>
          </ScrollView>
        </LinearGradient>
      </SafeAreaView>
      {/* <IconButton containerStyle={styles.floatingButton}>
        <Image
          source={assets.editIcon}
          style={{
            height: 18,
            width: 25,
            marginRight: -5,
          }}
        />
      </IconButton> */}
    </ImageBackground >
  );
};

export default Chat;

const styles = StyleSheet.create({
  background: {
    flex: 1,
    width: '100%',
    height: '100%'
  },
  container: {
    margin: 24,
  },
  search: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center'
  },
  messageText: {
    fontSize: 24,
    fontWeight: '700',
    color: '#2C3482',
    fontFamily: 'Inter',
    marginRight: 25
  },
  avatarContainer: {
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
    borderWidth: 1,
    borderBottomWidth: 0,
    paddingBottom: 10,
    borderColor: '#fff',
  },
  avatarSubContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  avatarBorder: {
    borderColor: '#2697FF',
    padding: 1,
    borderRadius: 100,
    borderWidth: 1,
  },
  avatar: {
    height: 64,
    width: 64,
    borderRadius: 100,
  },
  userDetails: {
    marginLeft: 20,
    background: 'red',
  },
  userName: {
    fontWeight: '600',
    fontSize: 18,
    fontFamily: 'Inter',
    color: '#2C3482',
  },
  userMetrics: {
    fontFamily: 'Inter',
    fontSize: 14,
    color: '#2C3482',
    fontWeight: '400',
  },
  coinButton: {
    backgroundColor: '#2697FF',
    flexDirection: 'row',
    alignItems: 'center',
    height: 32,
    width: 150,
    justifyContent: 'center',
    borderRadius: 16,
  },
  body: {
    height: '100%',
    padding: 24,
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
    borderWidth: 1,
    borderBottomWidth: 0,
    borderColor: '#fff',
    marginTop: -15
  },
  tabs: {
    flexDirection: 'row',
    height: 44,
    borderRadius: 24,
    borderWidth: 1,
    borderColor: '#DEE5EB',
  },
  tab: {
    flex: 1,
    margin: 2,
    borderRadius: 22,
    justifyContent: 'center',
    alignItems: 'center',
  },
  tabLabel: {
    fontSize: 16,
    fontFamily: 'Inter',
    fontWeight: '600',
    color: '#8FA8BD',
  },
  tabActive: {
    backgroundColor: '#2697FF',
  },
  tabLabelActive: {
    color: '#fff'
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
    fontSize: 16,
    fontWeight: '600',
    fontFamily: 'Inter',
    color: '#0E0E2F',
  },
  transactionInfo: {
    fontSize: 14,
    fontWeight: '400',
    fontFamily: 'Inter',
    marginTop: 8,
    color: '#63798B'
  },
  amount: {
    fontSize: 14,
    fontWeight: '400',
    fontFamily: 'Inter',
    marginTop: 8,
    color: '#63798B'
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