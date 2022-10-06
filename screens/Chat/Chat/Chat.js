import React from 'react';

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
} from 'react-native';

import LinearGradient from 'react-native-linear-gradient';
import ChatInput from '../../../components/ChatInput/ChatInput';
import theme from '../../../theme';

import assets from '../../../assets';

const isIos = Platform.OS === 'ios';

const Chat = ({navigation}) => {
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
        <View style={styles.header}>
          <View style={styles.userInfo}>
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
            <View style={{marginLeft: 12}}>
              <Text style={styles.title}>Kristin Watson</Text>
              <Text style={styles.subtitle}>@kwatson - 32.5345 GCoins</Text>
              <Text style={styles.subtitle}>Active 3m ago</Text>
            </View>
            <View style={styles.callIcons}>
              <Pressable onPress={() => navigation.navigate('AudioCall')}>
                <Image
                  source={assets.audioCall}
                  style={{
                    height: 16,
                    width: 16,
                  }}
                  resizeMode="cover"
                />
              </Pressable>
              <Pressable style={{marginLeft: 20}}>
                <Image
                  source={assets.videoCall}
                  style={{
                    height: 16,
                    width: 18,
                  }}
                  resizeMode="cover"
                />
              </Pressable>
            </View>
          </View>
        </View>
        <View style={styles.body}>
          <ScrollView
            style={styles.schrollView}
            showsVerticalScrollIndicator={false}></ScrollView>
          <View style={styles.inputContainer}>
            <ChatInput />
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
    backgroundColor: theme.COLORS.background,
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
    flexGrow: 1,
    paddingHorizontal: 24,
  },
  inputContainer: {
    backgroundColor: theme.COLORS.white,
    paddingHorizontal: 12,
    paddingVertical: 15,
  },
});
