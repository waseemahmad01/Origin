import React from 'react';

import {
  View,
  Text,
  SafeAreaView,
  StatusBar,
  Platform,
  Pressable,
  Image,
  ImageBackground,
  StyleSheet,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';

import assets from '../../../assets';
import theme from '../../../theme';

const isIos = Platform.OS === 'ios';

const CallHistory = ({navigation}) => {
  return (
    <ImageBackground
      source={assets.background}
      resizeMode="cover"
      style={{flex: 1}}>
      <SafeAreaView style={{flex: 1}}>
        <StatusBar translucent={true} backgroundColor="transparent" />
        <View style={styles.header}>
          <View style={styles.headerRow}>
            <Pressable onPress={() => navigation.navigate('Call-Search')}>
              <Image
                source={assets.searchBlue}
                style={{
                  height: 32,
                  width: 32,
                }}
              />
            </Pressable>
            <Text style={styles.headerTitle}>Calls</Text>
            <View style={{width: 32}} />
          </View>
        </View>
        <ImageBackground source={assets.containerBox} style={styles.body}>
          <Pressable
            onPress={() => navigation.navigate('Call-Details')}
            style={styles.transactionDetails}>
            <View style={{flexDirection: 'row'}}>
              <View style={styles.iconContainer}>
                <Image
                  source={assets.user}
                  style={{height: 48, width: 48, borderRadius: 48 / 2}}
                  resizeMode="cover"
                />
              </View>
              <View style={{marginLeft: 16}}>
                <Text style={styles.transactionType}>Fernando Sims</Text>
                <View
                  style={{
                    flexDirection: 'row',
                    alignItems: 'center',
                    marginTop: 4,
                  }}>
                  <Image
                    source={assets.outgoingCall}
                    style={{
                      height: 18,
                      width: 18,
                    }}
                  />
                  <Text style={styles.transactionInfo}> 8m ago</Text>
                </View>
              </View>
            </View>
            <View
              style={{
                height: 48,
                width: 48,
                borderRadius: 48 / 2,
                backgroundColor: theme.COLORS.pastelBlue,
                justifyContent: 'center',
                alignItems: 'center',
              }}>
              <Image
                source={assets.calls}
                style={{
                  height: 24,
                  width: 24,
                }}
              />
            </View>
          </Pressable>
          <Pressable style={styles.transactionDetails}>
            <View style={{flexDirection: 'row'}}>
              <View style={styles.iconContainer}>
                <Image
                  source={assets.user}
                  style={{height: 48, width: 48, borderRadius: 48 / 2}}
                  resizeMode="cover"
                />
              </View>
              <View style={{marginLeft: 16}}>
                <Text style={styles.transactionType}>Fernando Sims</Text>
                <View
                  style={{
                    flexDirection: 'row',
                    alignItems: 'center',
                    marginTop: 4,
                  }}>
                  <Image
                    source={assets.incomingCall}
                    style={{
                      height: 18,
                      width: 18,
                    }}
                  />
                  <Text style={styles.transactionInfo}> 2d ago</Text>
                </View>
              </View>
            </View>
            <View
              style={{
                height: 48,
                width: 48,
                borderRadius: 48 / 2,
                backgroundColor: theme.COLORS.pastelBlue,
                justifyContent: 'center',
                alignItems: 'center',
              }}>
              <Image
                source={assets.videoCamera}
                style={{
                  height: 24,
                  width: 24,
                }}
              />
            </View>
          </Pressable>
        </ImageBackground>
        <Pressable
          style={{
            position: 'absolute',
            bottom: 15,
            right: 16,
          }}>
          <LinearGradient
            style={{
              height: 52,
              width: 52,
              borderRadius: 52 / 2,
              justifyContent: 'center',
              alignItems: 'center',
            }}
            colors={['#10C56E', '#6BE2B8']}
            start={{x: 0, y: 0}}
            end={{x: 1, y: 1}}>
            <Image
              source={assets.addUser}
              style={{
                height: 24,
                width: 24,
              }}
            />
          </LinearGradient>
        </Pressable>
      </SafeAreaView>
    </ImageBackground>
  );
};

export default CallHistory;

const styles = StyleSheet.create({
  header: {
    paddingHorizontal: 24,
    paddingBottom: 16,
    paddingTop: isIos ? 31 : 31 + StatusBar.currentHeight,
  },
  headerTitle: {
    ...theme.TYPOGRAPHY.h3,
    color: theme.COLORS.darkBlue,
    fontWeight: '700',
    lineHeight: 32,
  },
  headerRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  body: {
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
    overflow: 'hidden',
    padding: 24,
    flexGrow: 1,
  },
  title: {
    ...theme.TYPOGRAPHY.subtitle1,
    color: theme.COLORS.grey700,
    fontWeight: '500',
  },
  iconContainer: {
    height: 48,
    width: 48,
    borderRadius: 48 / 2,
    justifyContent: 'center',
    alignItems: 'center',
  },
  transactionDetails: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginVertical: 16,
  },
  transactionType: {
    ...theme.TYPOGRAPHY.body1,
    fontWeight: '600',
    fontSize: 18,
    lineHeight: 24,
    fontFamily: 'Inter',
    color: theme.COLORS.grey900,
  },
  transactionInfo: {
    fontSize: 14,
    fontWeight: '500',
    fontFamily: 'Inter',
    lineHeight: 18,
    color: theme.COLORS.grey700,
  },
  amount: {
    ...theme.TYPOGRAPHY.body1,
    fontSize: 18,
    lineHeight: 24,
    color: theme.COLORS.grey900,
    fontWeight: '600',
  },
});
