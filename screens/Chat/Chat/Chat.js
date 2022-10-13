import React, { useEffect, useState } from 'react';
import { useNavigation } from '@react-navigation/native';

import {
  View,
  Text,
  StatusBar,
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
import IconButton from '../../../components/IconButton/IconButton';
import { getAllSMS } from '../../../api';

const isIos = Platform.OS === 'ios';

const Chat = ({ route, navigation }) => {
  const [allSMS, setSMS] = useState([]);

  useEffect(() => {
    _getAllSMS()
  }, [])

  const _getAllSMS = async () => {
    try {
      const { data } = await getAllSMS(route?.params?.chat?.chat_id);
      console.log('get messages - ', data)
      setSMS(data)
    } catch (err) {
      console.log("error - ", err)
    }
  }


  console.log('all sms - ', allSMS)

  const my = route?.params?.chat?.sender_number || ""
  const receiver = route?.params?.chat?.receiver_number

  // const makeCall = async () => {
  //   try {
  //     if (Platform.OS === 'android') {
  //       let permissions = [PermissionsAndroid.PERMISSIONS.RECORD_AUDIO];

  //       const granted = await PermissionsAndroid.requestMultiple(permissions);
  //       const recordAudioGranted =
  //         granted[PermissionsAndroid.PERMISSIONS.RECORD_AUDIO] === 'granted';
  //       if (recordAudioGranted) {
  //         // do if permission granted
  //       } else {
  //         console.warn(
  //           'MainScreen: makeCall: record audio permission is not granted',
  //         );
  //         return;
  //       }
  //     }
  //     navigation.navigate('AudioCall', {
  //       callee: user.phone_number,
  //       //
  //     });
  //     //
  //   } catch (e) {
  //     console.warn(`MainScreen: makeCall failed: ${e}`);
  //   }
  // };

  return (
    <LinearGradient
      style={{
        ...styles.gradient,
        paddingTop: isIos ? 0 : StatusBar.currentHeight,
      }}
      colors={[theme.COLORS.primary, theme.COLORS.secondary]}
      start={{ x: 0, y: 0 }}
      end={{ x: 1, y: 0 }}>
      <StatusBar translucent={true} backgroundColor={'transparent'} />
      <SafeAreaView style={{ flex: 1 }}>
        <View style={styles.header}>
          <Pressable onPress={() => navigation.goBack()}>
            <View>
              <Text>Back button </Text>
            </View>
          </Pressable>
          <View style={styles.userInfo}>
            <Pressable onPress={() => navigation.goBack()}>
              <Image
                source={assets.user}
                style={{
                  height: 40,
                  width: 40,
                  borderRadius: 40 / 2,
                  marginTop: -5,
                }}
                resizeMode="cover"
              />
            </Pressable>
            <View style={{ marginLeft: 12 }}>
              {/* <Text style={styles.title}>{user?.username}</Text> */}
              <Text style={styles.subtitle}>@kwatson - 32.5345 GCoins</Text>
              <Text style={styles.subtitle}>Active 3m ago</Text>
            </View>
            <View style={styles.callIcons}>
              <Pressable onPress={() => { }}>
                <Image
                  source={assets.audioCall}
                  style={{
                    height: 16,
                    width: 16,
                  }}
                  resizeMode="contain"
                />
              </Pressable>
              <Pressable style={{ marginLeft: 20 }}>
                <Image
                  source={assets.videoCall}
                  style={{
                    height: 16,
                    width: 18,
                  }}
                  resizeMode="contain"
                />
              </Pressable>
            </View>
          </View>
        </View>
        <View style={styles.body}>
          <ScrollView
            style={styles.schrollView}
            showsVerticalScrollIndicator={false}>
            {allSMS.map((sms, index) => (
              <ChatMessage key={index} my={my === sms.sender_number} msg={sms} />
            ))}
          </ScrollView>
          <View style={styles.inputContainer}>
            <ChatInput refreshChat={_getAllSMS} sendTo={receiver} />
          </View>
        </View>
        <View style={styles.hider}></View>
      </SafeAreaView>
    </LinearGradient>
  );
};

export default Chat;

const styles = StyleSheet.create({
  gradient: {
    flex: 1,
  },
  header: {
    paddingBottom: 26,
    paddingTop: 22,
    paddingHorizontal: 24,
  },
  body: {
    flexGrow: 1,
    backgroundColor: theme.COLORS.white,
    zIndex: 2,
    elevation: 2,
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
  schrollView: {
    flex: 1,
    paddingHorizontal: 24,
  },
  inputContainer: {
    backgroundColor: theme.COLORS.white,
    paddingHorizontal: 12,
    paddingVertical: 15,
  },
});
