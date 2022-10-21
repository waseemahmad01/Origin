import React from 'react';

import {
  View,
  Text,
  Image,
  StyleSheet,
  Platform,
  StatusBar,
  SafeAreaView,
  ScrollView,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import Pressable from 'react-native/Libraries/Components/Pressable/Pressable';
import Checkbox from '../../../components/Checkbox/Checkbox';

import assets from '../../../assets';
import theme from '../../../theme';

const isIos = Platform.OS === 'ios';

const Settings = ({navigation}) => {
  return (
    <LinearGradient
      colors={['#D8E3F3', '#B8F7FC']}
      start={{x: 0, y: 0}}
      end={{x: 1, y: 0}}>
      <SafeAreaView styles={{flex: 1}}>
        <View
          style={[
            styles.header,
            {paddingTop: isIos ? 31 : 31 + StatusBar.currentHeight},
          ]}>
          <Pressable
            hitSlop={{top: 15, right: 15, bottom: 15, left: 15}}
            onPress={() => navigation.goBack()}>
            <Image source={assets.backChat} />
          </Pressable>
          <Text style={styles.messageText}>Settings</Text>
          <View></View>
        </View>
        <LinearGradient
          colors={['#fff', '#FEF7F7', '#FCEBEF']}
          style={styles.body}>
          <ScrollView>
            {/* <View style={{ ...styles.row }}>
              <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                <View style={styles.iconContainer}>
                  <Image source={assets.settingShow} />
                </View>
                <Text style={styles.text}>Show chat head</Text>
              </View>
              <Checkbox />
            </View>
            <View style={{ ...styles.row }}>
              <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                <View style={styles.iconContainer}>
                  <Image source={assets.settingActive} />
                </View>
                <Text style={styles.text}>Active status</Text>
              </View>
              <Checkbox />
            </View>
            <Pressable
              onPress={() => navigation.navigate('Notifications')}
              style={{ ...styles.row }}>
              <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                <View style={styles.iconContainer}>
                  <Image source={assets.settingNotifications} />
                </View>
                <Text style={styles.text}>Notifications</Text>
              </View>
              <Image
                source={assets.arrowRight}
              />
            </Pressable>
            <Pressable
              onPress={() => navigation.navigate('Privacy')}
              style={{ ...styles.row }}>
              <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                <View style={styles.iconContainer}>
                  <Image source={assets.settingPrivacy} />
                </View>
                <Text style={styles.text}>Privacy policy</Text>
              </View>
              <Image
                source={assets.arrowRight}
              />
            </Pressable> */}
            <Pressable
              onPress={() => navigation.navigate('Help')}
              style={{...styles.row}}>
              <View style={{flexDirection: 'row', alignItems: 'center'}}>
                <View style={styles.iconContainer}>
                  <Image source={assets.settingHelp} />
                </View>
                <Text style={styles.text}>Help</Text>
              </View>
              <Image source={assets.arrowRight} />
            </Pressable>
            <Pressable
              onPress={() => navigation.navigate('About')}
              style={{...styles.row}}>
              <View style={{flexDirection: 'row', alignItems: 'center'}}>
                <View style={styles.iconContainer}>
                  <Image source={assets.settingInfo} />
                </View>
                <Text style={styles.text}>About us</Text>
              </View>
              <Image source={assets.arrowRight} />
            </Pressable>
            <Pressable style={{...styles.row}}>
              <View style={{flexDirection: 'row', alignItems: 'center'}}>
                <View
                  style={[styles.iconContainer, {backgroundColor: '#F43C3C'}]}>
                  <Image source={assets.settingLogout} />
                </View>
                <Text style={styles.text}>Log out</Text>
              </View>
            </Pressable>
          </ScrollView>
        </LinearGradient>
      </SafeAreaView>
    </LinearGradient>
  );
};

export default Settings;

const styles = StyleSheet.create({
  header: {
    marginHorizontal: 24,
    marginTop: 10,
    marginBottom: 30,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  textNormal: {
    fontSize: 16,
    fontWeight: '600',
    color: '#0E0E2F',
    fontFamily: 'Inter',
  },
  messageText: {
    fontSize: 24,
    fontWeight: '700',
    color: '#2C3482',
    fontFamily: 'Inter',
    marginRight: 15,
  },
  body: {
    height: '100%',
    padding: 24,
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
    marginTop: -10,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 8,
    marginBottom: 10,
    justifyContent: 'space-between',
  },
  text: {
    marginLeft: 16,
    fontWeight: '600',
    color: '#0E0E2F',
    fontFamily: 'Inter',
  },
  iconContainer: {
    height: 48,
    width: 48,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#2697FF',
    borderRadius: 24,
  },
});
