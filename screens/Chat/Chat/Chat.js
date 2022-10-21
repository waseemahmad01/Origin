import React, {useEffect, useRef, useState} from 'react';
import {ImageBackground, KeyboardAvoidingView} from 'react-native';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import LinearGradient from 'react-native-linear-gradient';

import {
  View,
  Text,
  SafeAreaView,
  ScrollView,
  Platform,
  StyleSheet,
  Image,
  Pressable,
  PermissionsAndroid,
} from 'react-native';

import ChatInput from '../../../components/ChatInput/ChatInput';
import ChatMessage from '../../../components/ChatMessage/ChatMessage';
import theme from '../../../theme';
import assets from '../../../assets';
// import IconButton from '../../../components/IconButton/IconButton';
import {getAllSMS} from '../../../api';
import {truncateString} from '../../../utils';
import {getImageUrl} from '../../../utils/getImageUrl';
import {useDispatch, useSelector} from 'react-redux';

const isIos = Platform.OS === 'ios';

const KEYBOARD_AVOID_VIEW_BEHAVIOR = Platform.select({
  ios: 'padding',
  default: undefined,
});
const Chat = ({route, navigation}) => {
  const [allSMS, setSMS] = useState([]);
  const dispatch = useDispatch();
  const scrollRef = useRef();
  const user = useSelector(state => state.auth.user);
  const users = useSelector(state => state.users.users);
  const {bottom} = useSafeAreaInsets();
  const chat = route?.params?.chat;
  const isChat = route?.params?.isChat;

  console.log('chat', chat);

  useEffect(() => {
    _getAllSMS();
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      _getAllSMS();
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  const _getAllSMS = async () => {
    let chatId = isChat === true ? chat.receiver_number : chat.phone_number;

    if (!chatId) {
      dispatch.users.getAllUsers();
      const currentUser = users.find(user => user.id == chat.id);
      if (currentUser.chat_id) {
        chatId = currentUser.chat_id;
      }
    }

    // console.log("send api - ", chatId)

    if (!chatId) return;

    console.log('number', chatId);

    try {
      const {data} = await getAllSMS(chatId);
      console.log('chat messages', data);
      setSMS(data);
      scrollRef.current?.scrollToEnd({animated, offset: 0});
    } catch (err) {
      console.log('error - ', err);
    }
  };

  const my = chat?.sender_number || user?.phone_number;
  const receiver = chat?.receiver_number || chat?.phone_number;

  const makeCall = async () => {
    try {
      if (Platform.OS === 'android') {
        let permissions = [PermissionsAndroid.PERMISSIONS.RECORD_AUDIO];

        const granted = await PermissionsAndroid.requestMultiple(permissions);
        const recordAudioGranted =
          granted[PermissionsAndroid.PERMISSIONS.RECORD_AUDIO] === 'granted';
        if (recordAudioGranted) {
          // do if permission granted
        } else {
          console.warn(
            'MainScreen: makeCall: record audio permission is not granted',
          );
          return;
        }
      }
      navigation.navigate('AudioCall', {
        callee: receiver,
        user: chat,
        //
      });
      //
    } catch (e) {
      console.warn(`MainScreen: makeCall failed: ${e}`);
    }
  };

  return (
    <ImageBackground
      style={[StyleSheet.absoluteFill, styles.background]}
      source={assets.background}>
      <SafeAreaView style={{flex: 1}}>
        <View style={styles.header}>
          <Pressable
            hitSlop={{top: 15, right: 15, bottom: 15, left: 15}}
            onPress={() => navigation.goBack()}>
            <Image source={assets.backChat} />
          </Pressable>
          <View style={styles.avatarContainer}>
            <View>
              <Image
                source={getImageUrl(chat?.image_url, chat?.username)}
                style={{height: 56, width: 56, borderRadius: 100}}
                resizeMode="cover"
              />
              <View style={styles.onlineIndicator}></View>
            </View>
            <View style={{marginLeft: 16}}>
              <Text
                style={[
                  styles.userMetrics,
                  {marginBottom: 5, fontWeight: '600', fontSize: 16},
                ]}>
                {chat?.username ? `@${chat?.username}` : receiver}
              </Text>
              <Text style={styles.userMetrics}>
                {truncateString(chat?.origen_public_wallet_address)}
              </Text>
            </View>
          </View>
          <View style={{flex: 1}} />
          <View style={styles.userInfo}>
            <Pressable
              onPress={() => {
                makeCall();
              }}>
              <Image source={assets.callIcon} />
            </Pressable>
            {/* <Pressable style={{ marginLeft: 20 }}>
              <Image
                source={assets.cameraIcon}
              />
            </Pressable> */}
          </View>
        </View>
        <LinearGradient
          colors={['#fff', '#FEF7F7', '#FCEBEF']}
          style={styles.body}>
          <ScrollView
            style={styles.scrollView}
            scrollRef={scrollRef}
            contentContainerStyle={{paddingBottom: 100}}
            showsVerticalScrollIndicator={false}>
            {allSMS.map((sms, index) => (
              <ChatMessage
                key={index}
                my={my === sms.sender_number}
                msg={sms}
              />
            ))}
          </ScrollView>
        </LinearGradient>
      </SafeAreaView>
      <KeyboardAvoidingView behavior={KEYBOARD_AVOID_VIEW_BEHAVIOR}>
        <View style={[styles.inputContainer, {paddingBottom: bottom - 12}]}>
          <ChatInput refreshChat={_getAllSMS} sendTo={receiver} />
        </View>
      </KeyboardAvoidingView>
    </ImageBackground>
  );
};

export default Chat;

const styles = StyleSheet.create({
  gradient: {
    flex: 1,
  },
  header: {
    margin: 24,
    flexDirection: 'row',
    alignItems: 'center',
  },
  avatarContainer: {
    marginLeft: 10,
    flexDirection: 'row',
    alignItems: 'center',
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
  body: {
    height: '100%',
    padding: 24,
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
  },
  hider: {
    position: 'absolute',
    width: '100%',
    bottom: 0,
    height: 65,
    zIndex: 0,
    backgroundColor: theme.COLORS.white,
  },
  userInfo: {
    flexDirection: 'row',
    alignItems: 'flex-start',
  },
  callIcons: {
    flexDirection: 'row',
    marginLeft: 'auto',
  },
  title: {
    ...theme.TYPOGRAPHY.body1,
    fontWeight: '500',
    color: theme.COLORS.white,
  },
  subtitle: {
    fontSize: 12,
    fontFamily: 'Inter',
    fontWeight: '400',
    lineHeight: 18,
    color: theme.COLORS.white,
    marginTop: 1,
  },
  inputContainer: {
    backgroundColor: theme.COLORS.white,
    paddingHorizontal: 12,
    paddingVertical: 15,
  },
});
