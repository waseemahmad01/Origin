import React, {useEffect, useRef, useState} from 'react';

import {
  View,
  Text,
  ImageBackground,
  SafeAreaView,
  StatusBar,
  Platform,
  Pressable,
  StyleSheet,
  Image,
  Dimensions,
  // PermissionsAndroid,
} from 'react-native';
import assets from '../../../assets';
import theme from '../../../theme';
import LinearGradient from 'react-native-linear-gradient';

import {useSelector, useDispatch} from 'react-redux';

import {Voximplant} from 'react-native-voximplant';
import useTimer from '../../../hooks/useTimer';
import {getFormatedTime} from '../../../utils';
import {addCallHistory} from '../../../api';
import {getImageUrl} from '../../../utils/getImageUrl';

const isIos = Platform.OS === 'ios';
const height = Dimensions.get('window').height;

const AudioCall = ({route, navigation}) => {
  const callee = route.params?.callee;
  const user = route?.params?.user;
  const voximplant = Voximplant.getInstance();
  const {vox_phone_number} = useSelector(state => state.auth.user);
  const callRef = useRef(null);
  const [callStatus, setCallStatus] = useState('Initializing...');
  // console.log('callee', callee);

  const activePackage = useSelector(state => state.sfts.active);
  // console.log(activePackage);
  const seconds = activePackage?.number_of_seconds;
  const dispatch = useDispatch();

  const {time, startTimer, stopTimer, start} = useTimer();

  const callTime = useRef(null);
  callTime.current = time;

  // const handleLogin = async () => {
  //   let state = await client.getClientState();
  //   console.log('State ===== >', state);
  //   if (state === Voximplant.ClientState.DISCONNECTED) {
  //     await client.connect();
  //   }
  //   console.log(`${vox_user_name}@${vox_app_name}`, vox_user_password);
  //   if (state !== 'logged_in') {
  //     const res = await client.login(
  //       `${vox_user_name}@${vox_app_name}`,
  //       vox_user_password,
  //     );
  //     console.log(res);
  //   }

  //   await handleCall();
  // };

  // const handleCall = async () => {
  //   try {
  //     console.log('Running call');
  //     const callSettings = {
  //       customData: `+${vox_phone_number}`,
  //     };
  //     console.log(callSettings);
  //     // if (Platform.OS === 'android') {
  //     //   let permissions = [PermissionsAndroid.PERMISSIONS.RECORD_AUDIO];

  //     //   const granted = await PermissionsAndroid.requestMultiple(permissions);
  //     //   const recordAudioGranted =
  //     //     granted['android.permission.RECORD_AUDIO'] === 'granted';

  //     //   if (recordAudioGranted) {
  //     //     let call = await Voximplant.getInstance().call(callSettings);
  //     //   } else {
  //     //     console.warn(
  //     //       'MainScreen: makeCall: record audio permission is not granted',
  //     //     );
  //     //     return;
  //     //   }

  //     // }
  //     console.log('target', user.phone_number);
  //     const call = await Voximplant.getInstance().call(
  //       user.phone_number,
  //       callSettings,
  //     );

  //     call.on(Voximplant.CallEvents.Failed, e => {
  //       console.log('Call failed');
  //     });
  //     call.on(Voximplant.CallEvents.ProgressToneStart, e => {
  //       console.log('Call starting');
  //     });
  //   } catch (err) {
  //     console.log('Error', err);
  //   }
  // };

  // const subscribeToCallEvents = call => {
  //   call.on(Voximplant.CallEvents.ProgressToneStart, e => {
  //     console.log('Call starting');
  //   });
  // };

  useEffect(() => {
    const callSettings = {
      customData: `+${vox_phone_number}`,
    };

    let call;
    let endpoint;
    async function makeCall() {
      call = await voximplant.call(callee, callSettings);
      callRef.current = call;
      subscribeToCallEvents();
      // callId.current = call.callId;
      // calls.set(call.callId, call);
    }

    // async function answerCall() {
    //   call = calls.get(callId.current);
    //   subscribeToCallEvents();
    //   endpoint = call.getEndpoints()[0];
    //   subscribeToEndpointEvents();
    //   await call.answer(callSettings);
    // }

    function subscribeToCallEvents() {
      call.on(Voximplant.CallEvents.Connected, callEvent => {
        setCallStatus('Connected');
        console.log('call connected');
        startTimer();
      });
      call.on(Voximplant.CallEvents.Disconnected, callEvent => {
        // calls.delete(callEvent.call.callId);
        // navigation.navigate('Main');
        console.log('call disconnected');
        stopTimer();

        console.log('time ====>', callTime.current);

        const apiData = {
          receiver_number: callee,
          duration: callTime.current,
          call_status: 'success',
          call_type: 'audio_call',
        };
        setCallStatus('Disconnected');
        console.log(apiData);
        addCallHistory(apiData);
        navigation.goBack();
      });
      call.on(Voximplant.CallEvents.Failed, callEvent => {
        console.log('call failed');
        console.log('Call failed event ===> ', callEvent);
        // navigation.goBack();
        const apiData = {
          receiver_number: callee,
          duration: callTime.current,
          call_status: 'failed',
          call_type: 'audio_call',
        };
        setCallStatus('Disconnected');
        console.log(apiData);
        addCallHistory(apiData);
        navigation.goBack();
      });
      call.on(Voximplant.CallEvents.ProgressToneStart, callEvent => {
        setCallStatus('Ringing');
        console.log('Ringing');
      });

      // call.on(Voximplant.CallEvents.EndpointAdded, (callEvent) => {
      //   console.log('endpoint added');
      //   // endpoint = callEvent.endpoint;
      //   subscribeToEndpointEvents();
      // });
    }

    // function subscribeToEndpointEvents() {
    //   endpoint.on(
    //     Voximplant.EndpointEvents.RemoteVideoStreamAdded,
    //     (endpointEvent) => {
    //       setRemoteVideoStreamId(endpointEvent.videoStream.id);
    //     },
    //   );
    // }

    // function showCallError(reason) {
    //   Alert.alert('Call failed', `Reason: ${reason}`, [
    //     {
    //       text: 'OK',
    //       onPress: () => {
    //         calls.delete(callId.current);
    //         navigation.navigate('Main');
    //       },
    //     },
    //   ]);
    // }
    makeCall();
    dispatch.sfts.getCurrentPackage();
    return function cleanup() {
      call.off(Voximplant.CallEvents.Connected);
      call.off(Voximplant.CallEvents.Disconnected);
      call.off(Voximplant.CallEvents.Failed);
      call.off(Voximplant.CallEvents.ProgressToneStart);
      call.off(Voximplant.CallEvents.LocalVideoStreamAdded);
      call.off(Voximplant.CallEvents.EndpointAdded);
    };

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <ImageBackground
      source={assets.background}
      resizeMode="cover"
      style={styles.backgroundImage}>
      <SafeAreaView style={{flex: 1, zIndex: 10}}>
        <StatusBar translucent={true} backgroundColor="transparent" />
        <View
          style={{
            ...styles.container,
            marginTop: isIos ? 0 : StatusBar.currentHeight,
          }}>
          <View style={styles.header}>
            <Pressable
              onPress={() => {
                // callRef.current.hangup();
                navigation.goBack();
              }}>
              <Image
                source={assets.chevronLeft}
                style={{
                  height: 20,
                  width: 12,
                }}
              />
            </Pressable>
          </View>
          <View style={{alignItems: 'center'}}>
            <View style={styles.userInfo}>
              <Image
                style={{
                  height: 108,
                  width: 108,
                  borderRadius: 108 / 2,
                }}
                source={getImageUrl(user?.image_url, user?.username)}
              />
              <Text style={styles.name}>{user?.username}</Text>
              <Text style={styles.status}>
                {start ? getFormatedTime(time) : callStatus}
              </Text>
            </View>
          </View>
          <View style={styles.bottom}>
            <LinearGradient
              style={{
                ...styles.button,
                borderWidth: 1,
                borderColor: '#ffffff33',
              }}
              colors={['#FFFFFF8F', '#FFFFFF00']}
              start={{x: 1, y: 0.1}}
              end={{x: 0.5, y: 0.5}}>
              <Pressable style={styles.button}>
                <Image
                  source={assets.volume}
                  style={{
                    height: 32,
                    width: 32,
                  }}
                />
              </Pressable>
            </LinearGradient>
            <LinearGradient
              style={{
                ...styles.button,
                borderWidth: 1,
                borderColor: '#ffffff33',
              }}
              colors={['#FFFFFF8F', '#FFFFFF00']}
              start={{x: 1, y: 0.1}}
              end={{x: 0.5, y: 0.5}}>
              <Pressable style={styles.button}>
                <Image
                  source={assets.microphone}
                  style={{
                    height: 32,
                    width: 32,
                  }}
                />
              </Pressable>
            </LinearGradient>
            <LinearGradient
              style={{
                ...styles.button,
                borderWidth: 1,
                borderColor: '#ffffff33',
              }}
              colors={['#FFFFFF8F', '#FFFFFF00']}
              start={{x: 1, y: 0.1}}
              end={{x: 0.5, y: 0.5}}>
              <Pressable style={styles.button}>
                <Image
                  source={assets.videoOff}
                  style={{
                    height: 32,
                    width: 32,
                  }}
                />
              </Pressable>
            </LinearGradient>
            <LinearGradient
              style={{
                ...styles.button,
                borderWidth: 1,
                borderColor: '#ffffff33',
              }}
              colors={['#FFFFFF8F', '#FFFFFF00']}
              start={{x: 1, y: 0.1}}
              end={{x: 0.5, y: 0.5}}>
              <Pressable
                onPress={() => callRef.current.hangup()}
                style={{
                  ...styles.button,
                  backgroundColor: theme.COLORS.error,
                  opacity: 1,
                }}>
                <Image
                  source={assets.callEnd}
                  style={{
                    height: 32,
                    width: 32,
                  }}
                />
              </Pressable>
            </LinearGradient>
          </View>
        </View>
      </SafeAreaView>
      <LinearGradient
        style={{
          ...styles.gradient,
        }}
        colors={['#1D1D3500', '#1D1D35E0']}
        start={{x: 0, y: 0}}
        end={{x: 0, y: 1}}></LinearGradient>
    </ImageBackground>
  );
};

export default AudioCall;

const styles = StyleSheet.create({
  backgroundImage: {
    flex: 1,
  },
  container: {
    flex: 1,
    justifyContent: 'space-between',
    paddingHorizontal: 24,
    zIndex: 2,
    elevation: 4,
  },
  header: {
    marginTop: 30,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  userInfo: {
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 10,
  },
  name: {
    fontSize: 18,
    fontWeight: '700',
    lineHeight: 28,
    fontFamily: 'Inter',
    color: theme.COLORS.white,
    marginTop: 32,
    marginBottom: 2,
  },
  status: {
    ...theme.TYPOGRAPHY.subtitle1,
    color: theme.COLORS.white,
  },
  gradient: {
    position: 'absolute',
    width: '100%',
    height: height * 0.6,
    bottom: 0,
    borderTopColor: 'red',
    zIndex: 0,
  },
  bottom: {
    justifyContent: 'space-between',
    flexDirection: 'row',
    marginBottom: 15,
    backgroundColor: '#0E0E2F99',
    padding: 20,
    borderRadius: 24,
  },
  button: {
    height: 56,
    width: 56,
    borderRadius: 56 / 2,

    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
});
