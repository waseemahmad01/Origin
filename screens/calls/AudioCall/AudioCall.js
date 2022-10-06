import React from 'react';

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
} from 'react-native';
import assets from '../../../assets';
import theme from '../../../theme';
import LinearGradient from 'react-native-linear-gradient';

const isIos = Platform.OS === 'ios';
const height = Dimensions.get('window').height;

const AudioCall = () => {
  return (
    <ImageBackground
      source={assets.callBg}
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
            <Pressable>
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
              <Image source={assets.user} />
              <Text style={styles.name}>Ralph Edwards</Text>
              <Text style={styles.status}>Ringing</Text>
            </View>
          </View>
          <View style={styles.bottom}>
            <Pressable style={styles.button}></Pressable>
            <Pressable style={styles.button}></Pressable>
            <Pressable style={styles.button}></Pressable>
            <Pressable
              style={{
                ...styles.button,
                backgroundColor: theme.COLORS.error,
                opacity: 1,
              }}>
              <Image
                source={assets.audioCall}
                style={{
                  transform: [{rotate: '135deg'}],
                  height: 20,
                  width: 20,
                }}
              />
            </Pressable>
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
    paddingHorizontal: 28,
    justifyContent: 'space-between',
    flexDirection: 'row',
    marginBottom: 15,
  },
  button: {
    height: 56,
    width: 56,
    borderRadius: 56 / 2,
    backgroundColor: '#F5FCF9',
    opacity: 0.16,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
});
