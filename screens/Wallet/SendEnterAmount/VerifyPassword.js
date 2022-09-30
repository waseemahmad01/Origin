import React from 'react';

import {
  View,
  Text,
  StyleSheet,
  Image,
  SafeAreaView,
  Platform,
  StatusBar,
  Pressable,
} from 'react-native';
import assets from '../../../assets';
import Button from '../../../components/GButton/GButton';
import IconButton from '../../../components/IconButton/IconButton';
import AsyncStorage from '@react-native-async-storage/async-storage';

import LinearGradient from 'react-native-linear-gradient';

import Input from '../../../components/Input/Input';

import theme from '../../../theme';

const isIos = Platform.OS === 'ios';

const VerifyPassword = ({navigation}) => {
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
        <View style={styles.top}>
          <View
            style={{
              ...styles.row,
              justifyContent: 'space-between',
              ...styles.header,
            }}>
            <Text style={styles.headerTitle}>Send</Text>
            <Pressable onPress={() => navigation.goBack()}>
              <Image
                source={assets.closeIcon}
                style={{
                  height: 24,
                  width: 24,
                }}
                resizeMode="cover"
              />
            </Pressable>
          </View>
        </View>
        <View style={styles.container}>
          <Text style={styles.title}> Verify your password</Text>
          <View style={{width: '100%'}}>
            <Input title="Enter Password" />
          </View>
          <View style={styles.btnContainer}>
            <View style={{flexGrow: 1, marginRight: 16}}>
              <Button
                label="Submit"
                onPress={() => {
                  AsyncStorage.setItem('verify', 'true');
                  navigation.goBack();
                }}
              />
            </View>
            <View>
              <IconButton
                style={{
                  height: 52,
                  width: 52,
                }}>
                <Image
                  source={assets.faceIdWhite}
                  style={{
                    height: 24,
                    width: 24,
                  }}
                  resizeMode="cover"
                />
              </IconButton>
            </View>
          </View>
        </View>
        <View style={styles.hider}></View>
      </SafeAreaView>
    </LinearGradient>
  );
};

export default VerifyPassword;

const styles = StyleSheet.create({
  container: {
    width: '100%',
    paddingHorizontal: 24,
    alignItems: 'center',
    justifyContent: 'center',
    flexGrow: 1,
    backgroundColor: theme.COLORS.white,
    zIndex: 2,
  },
  title: {
    ...theme.TYPOGRAPHY.h2,
    fontSize: 24,
    fontWeight: '700',
    fontFamily: 'Inter',
    color: '#1D1D35',
    marginBottom: 32,
  },
  btnContainer: {
    marginTop: 24,
    width: '100%',
    flexDirection: 'row',
  },
  gradient: {
    flex: 1,
  },
  hider: {
    position: 'absolute',
    backgroundColor: theme.COLORS.white,
    bottom: 0,
    width: '100%',
    height: 60,
    zIndex: 0,
  },
  top: {
    paddingHorizontal: 24,
  },
  bottom: {
    flexGrow: 1,
    backgroundColor: theme.COLORS.white,
    zIndex: 2,
    elevation: 2,
    paddingHorizontal: 24,
    paddingVertical: 24,
  },
  header: {
    marginTop: 27.5,
    marginBottom: 16,
  },
  headerTitle: {
    ...theme.TYPOGRAPHY.h3,
    fontWeight: '700',
    fontFamily: 'Inter',
    color: theme.COLORS.white,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  middle: {
    backgroundColor: '#F5FCF9',
    paddingHorizontal: 24,
    paddingVertical: 16,
  },
  textContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    alignItems: 'center',
  },

  newAddressText: {
    ...theme.TYPOGRAPHY.body2,
    fontFamily: 'Inter',
    fontWeight: '400',
    color: '#6E6E7E',
  },
  balance: {
    ...theme.TYPOGRAPHY.body2,
    fontFamily: 'Inter',
    fontWeight: '400',
    marginTop: 8,
    marginLeft: 24,
  },
});
