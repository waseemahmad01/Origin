import React, { useEffect, useState } from 'react'
import { FlatList, ImageBackground, KeyboardAvoidingView } from 'react-native'
import { useSafeAreaInsets } from 'react-native-safe-area-context'

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

import LinearGradient from 'react-native-linear-gradient';
import ChatInput from '../../../components/ChatInput/ChatInput';
import theme from '../../../theme';

import assets from '../../../assets';
import ChatMessage from '../../../components/ChatMessage/ChatMessage';
// import IconButton from '../../../components/IconButton/IconButton';
import { getAllSMS } from '../../../api';
import { truncateString } from '../../../utils';

const isIos = Platform.OS === 'ios';

const KEYBOARD_AVOID_VIEW_BEHAVIOR = Platform.select({
  ios: 'padding',
  default: undefined,
})
const Chat = ({ route, navigation }) => {
  const [allSMS, setSMS] = useState([]);
  const { bottom } = useSafeAreaInsets()
  const { user } = route.params;
  console.log(route.params);
  useEffect(() => {
    _getAllSMS();
  }, []);

  const _getAllSMS = async () => {
    try {
      const { data } = await getAllSMS(route?.params?.chat?.chat_id);
      console.log('get messages - ', data);
      setSMS(data);
    } catch (err) {
      console.log('error - ', err);
    }
  };

  const my = route?.params?.chat?.sender_number || '';
  const receiver = route?.params?.chat?.receiver_number;

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
        callee: user.phone_number,
        //
      });
      //
    } catch (e) {
      console.warn(`MainScreen: makeCall failed: ${e}`);
    }
  };

  return (
    <ImageBackground style={[StyleSheet.absoluteFill, styles.background]} source={assets.background}>
      <SafeAreaView style={{ flex: 1 }}>
        <View style={styles.header}>
          <Pressable onPress={() => navigation.goBack()}>
            <Image source={assets.backChat} />
          </Pressable>
          <View style={styles.avatarContainer}>
            <View>
              <Image
                source={assets.user}
                style={{ height: 56, width: 56 }}
                resizeMode="cover"
              />
              <View style={styles.onlineIndicator}></View>
            </View>
            <View style={{ marginLeft: 16 }}>
              <Text style={[styles.userMetrics, { marginBottom: 5, fontWeight: '600', fontSize: 16 }]}>
                @{user?.username}
              </Text>
              <Text style={styles.userMetrics}>
                {truncateString(user?.origen_public_wallet_address)}
              </Text>
            </View>
          </View>
          <View style={{ flex: 1 }} />
          <View style={styles.userInfo}>
            <Pressable
              onPress={() => {
                makeCall();
              }}>
              <Image
                source={assets.callIcon}
              />
            </Pressable>
            <Pressable style={{ marginLeft: 20 }}>
              <Image
                source={assets.cameraIcon}
              />
            </Pressable>
          </View>
        </View>
        <LinearGradient colors={['#fff', "#FEF7F7", '#FCEBEF',]} style={styles.body}>
          <ScrollView
            style={styles.scrollView}
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
        <View style={[styles.inputContainer, { paddingBottom: bottom - 12 }]}>
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
    alignItems: 'center'
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
  scrollView: {
    paddingHorizontal: 24,
  },
  inputContainer: {
    // position: 'absolute',
    // bottom: 0,
    backgroundColor: theme.COLORS.white,
    paddingHorizontal: 12,
    paddingVertical: 15,
  },
});
