import React from 'react';

import {
  View,
  Text,
  SafeAreaView,
  StatusBar,
  Image,
  StyleSheet,
  Platform,
  ScrollView,
} from 'react-native';

import LinearGradient from 'react-native-linear-gradient';

import theme from '../../../theme';
import assets from '../../../assets';
import GButton from '../../../components/GButton/GButton';
import Pressable from 'react-native/Libraries/Components/Pressable/Pressable';

const isIos = Platform.OS === 'ios';

const Profile = ({navigation}) => {
  return (
    <LinearGradient
      style={{
        ...styles.gradient,
        paddingTop: isIos ? 0 : StatusBar.currentHeight,
      }}
      colors={[theme.COLORS.primary, theme.COLORS.secondary]}
      start={{x: 0, y: 0}}
      end={{x: 1, y: 0}}>
      <SafeAreaView style={{flex: 1}}>
        <StatusBar translucent={true} backgroundColor={'transparent'} />
        <View style={styles.top}>
          <View
            style={{
              ...styles.row,
              justifyContent: 'space-between',
              marginTop: 27.74,
            }}>
            <Text style={styles.headTitle}>Profile</Text>
            <Pressable onPress={() => navigation.navigate('Settings')}>
              <Image
                source={assets.settings}
                style={{
                  height: 16,
                  width: 16,
                }}
              />
            </Pressable>
          </View>
        </View>
        <View style={styles.bottom}>
          <View style={styles.profileContainer}>
            <Image source={assets.user} />
            <Text style={styles.userName}>Annette Black</Text>
          </View>
          <View style={styles.divider}></View>
          <View style={{flexGrow: 1}}>
            <ScrollView>
              <View style={styles.userInfoBlock}>
                <View style={{...styles.row, justifyContent: 'space-between'}}>
                  <Text style={styles.key}>User ID</Text>
                  <Text style={styles.value}>@annette.me</Text>
                </View>
              </View>
              <View style={styles.userInfoBlock}>
                <View style={{...styles.row, justifyContent: 'space-between'}}>
                  <Text style={styles.key}>Location</Text>
                  <Text style={styles.value}>New York, NYC</Text>
                </View>
              </View>
              <View style={styles.userInfoBlock}>
                <View style={{...styles.row, justifyContent: 'space-between'}}>
                  <Text style={styles.key}>Phone</Text>
                  <Text style={styles.value}>(239) 555-0108</Text>
                </View>
              </View>
              <View style={styles.userInfoBlock}>
                <View style={{...styles.row, justifyContent: 'space-between'}}>
                  <Text style={styles.key}>Email Address</Text>
                  <Text style={styles.value}>annette@gmail.com</Text>
                </View>
              </View>
              <View style={styles.userInfoBlock}>
                <View style={{...styles.row, justifyContent: 'space-between'}}>
                  <Text style={styles.key}>ETH Address</Text>
                  <Text style={styles.value}>0x71C76hjj...d8976F</Text>
                </View>
              </View>
            </ScrollView>
            <View style={{marginBottom: 41, alignItems: 'flex-end'}}>
              <GButton
                label="Edit profile"
                style={{
                  width: 93,
                  height: 32,
                }}
                textStyle={{
                  fontSize: 12,
                  lineHeight: 18,
                }}
                onPress={() => navigation.navigate('EditProfile')}
              />
            </View>
          </View>
        </View>
      </SafeAreaView>
    </LinearGradient>
  );
};

export default Profile;

const styles = StyleSheet.create({
  gradient: {
    flex: 1,
  },
  top: {
    paddingHorizontal: 24,
    paddingBottom: 19,
  },
  headTitle: {
    ...theme.TYPOGRAPHY.h3,
    fontWeight: '700',
    color: theme.COLORS.white,
  },
  bottom: {
    paddingHorizontal: 24,
    flexGrow: 1,
    backgroundColor: theme.COLORS.white,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  profileContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 34,
    marginBottom: 26,
  },
  userName: {
    ...theme.TYPOGRAPHY.body1,
    fontSize: 18,
    lineHeight: 28,
    marginTop: 20,
    color: '#1D1D35',
    fontWeight: '500',
  },
  divider: {
    borderWidth: 1,
    borderColor: '#e8e8e8',
    width: '100%',
    marginBottom: 16,
  },
  userInfoBlock: {
    paddingVertical: 19,
  },
  key: {
    ...theme.TYPOGRAPHY.subtitle1,
    color: '#4A4A5D',
    fontWeight: '400',
  },
  value: {
    ...theme.TYPOGRAPHY.subtitle1,
    color: '#1D1D35',
    fontWeight: '500',
  },
});
