import React, {useEffect, useState} from 'react';
import {Voximplant} from 'react-native-voximplant';
import {useDispatch, useSelector} from 'react-redux';
import {useFocusEffect} from '@react-navigation/native';

import dayjs from 'dayjs';
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  Image,
  Pressable,
  ScrollView,
  ImageBackground,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import theme from '../../../theme';
import assets from '../../../assets';
import {getAllChats} from '../../../api';
import {truncateString} from '../../../utils';
import {getImageUrl} from '../../../utils/getImageUrl';
var relativeTime = require('dayjs/plugin/relativeTime');

dayjs.extend(relativeTime);

const client = Voximplant.getInstance();

const Chat = ({navigation}) => {
  const dispatch = useDispatch();
  const user = useSelector(state => state.auth.user);
  const balance = useSelector(state => state.wallet.balance);
  const [tab, setTab] = useState(0);
  const [chats, setChats] = useState([]);

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

  useFocusEffect(
    React.useCallback(() => {
      dispatch.users.getAllUsers();
      getChats();
    }, []),
  );

  useEffect(() => {
    handleVoxImplantLogin();
  }, []);

  const getChats = async () => {
    try {
      const {data} = await getAllChats();
      setChats(data);
      console.log('response - ', data);
    } catch (err) {
      console.log('error - ', err);
    }
  };

  //
  return (
    <ImageBackground
      style={[StyleSheet.absoluteFill, styles.background]}
      source={assets.background}>
      <SafeAreaView>
        <View style={[styles.container, styles.search]}>
          <Pressable onPress={() => navigation.navigate('Chat-search')}>
            <Image source={assets.messageSearchIcon} />
          </Pressable>
          <Text style={styles.messageText}>Messages</Text>
          <View />
        </View>
        <LinearGradient
          style={styles.avatarContainer}
          colors={['#E8EDF7', '#D5F9FD']}
          start={{x: 0, y: 0}}
          end={{x: 1, y: 0}}>
          <View style={[styles.container, styles.avatarSubContainer]}>
            <View style={styles.avatarBorder}>
              <Image
                source={getImageUrl(user.image_url, user.username)}
                style={[styles.avatar]}
                resizeMode="cover"
              />
            </View>
            <View style={styles.userDetails}>
              <Text style={styles.userName}>{user?.name}</Text>
              <View style={{flexDirection: 'row', marginVertical: 6}}>
                <Text style={[styles.userMetrics, {marginRight: 10}]}>
                  @{user?.username}
                </Text>
                <Text style={styles.userMetrics}>
                  {truncateString(user?.origen_public_wallet_address)}
                </Text>
              </View>
              <View style={styles.coinButton}>
                <Image style={{marginRight: 10}} source={assets.gCoin} />
                <Text
                  style={[
                    styles.userMetrics,
                    {color: 'white', fontWeight: '500'},
                  ]}>
                  {balance} GCoins
                </Text>
              </View>
            </View>
          </View>
        </LinearGradient>
        <LinearGradient
          colors={['#fff', '#FEF7F7', '#FCEBEF']}
          style={styles.body}>
          <View style={styles.tabs}>
            <Pressable
              onPress={() => setTab(0)}
              style={[styles.tab, tab === 0 ? styles.tabActive : {}]}>
              <Text
                style={[
                  styles.tabLabel,
                  tab === 0 ? styles.tabLabelActive : {},
                ]}>
                Recent Message
              </Text>
            </Pressable>
            <Pressable
              onPress={() => setTab(1)}
              style={[styles.tab, tab === 1 ? styles.tabActive : {}]}>
              <Text
                style={[
                  styles.tabLabel,
                  tab === 1 ? styles.tabLabelActive : {},
                ]}>
                Active
              </Text>
            </Pressable>
          </View>
          <ScrollView
            contentContainerStyle={{paddingTop: 20}}
            showsVerticalScrollIndicator={false}>
            {chats.map((chat, index) => (
              <Pressable
                style={styles.userBlock}
                key={chat?.id + index}
                onPress={() => {
                  navigation.navigate('Chat', {chat, isChat: true});
                }}>
                <View style={styles.userContainer}>
                  <View style={{flexDirection: 'row'}}>
                    <Image
                      source={getImageUrl(chat.image_url, chat.username)}
                      style={{height: 56, width: 56, borderRadius: 100}}
                      resizeMode="cover"
                    />
                    <View style={{flex: 1, marginHorizontal: 16}}>
                      <Text style={styles.textNormal}>
                        {chat?.receiver_number}
                      </Text>
                      <Text numberOfLines={1} style={styles.transactionInfo}>
                        {chat?.last_message}
                      </Text>
                    </View>
                    <Text style={styles.amount}>
                      {dayjs(chat.last_message_time).fromNow()}
                    </Text>
                  </View>
                </View>
              </Pressable>
            ))}
            <View style={{height: 220}}></View>
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
    </ImageBackground>
  );
};

export default Chat;

const styles = StyleSheet.create({
  background: {
    flex: 1,
    width: '100%',
    height: '100%',
  },
  container: {
    margin: 24,
  },
  search: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  messageText: {
    fontSize: 24,
    fontWeight: '700',
    color: '#2C3482',
    fontFamily: 'Inter',
    marginRight: 25,
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
    backgroundColor: '#f2f2f2',
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
    marginTop: -15,
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
    color: '#fff',
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
    color: '#63798B',
  },
  textNormal: {
    fontSize: 16,
    fontWeight: '600',
    color: '#0E0E2F',
    fontFamily: 'Inter',
  },
  amount: {
    fontSize: 14,
    fontWeight: '400',
    fontFamily: 'Inter',
    marginTop: 8,
    color: '#63798B',
  },
  userContainer: {
    flexDirection: 'row',
    width: '100%',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
});
