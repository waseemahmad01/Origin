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
          <Pressable
            onPress={() => navigation.navigate('Profile1')}
            style={{flexDirection: 'row', alignItems: 'center'}}>
            <Image
              source={assets.chevronLeft}
              style={{
                height: 20,
                width: 8,
                marginRight: 20,
              }}
              resizeMode="contain"
            />
            <Text style={styles.headTitle}>Settings</Text>
          </Pressable>
        </View>
        <View style={styles.bottom}>
          <ScrollView style={{flex: 1, paddingTop: 24}}>
            <View style={{...styles.row}}>
              <View style={{flexDirection: 'row', alignItems: 'center'}}>
                <View style={styles.iconContainer}>
                  <Image
                    source={assets.mode}
                    style={{
                      height: 16,
                      width: 16,
                    }}
                    resizeMode="contain"
                  />
                </View>
                <Text style={styles.text}>Dark mood</Text>
              </View>
              <Checkbox />
            </View>
            <View style={{...styles.row}}>
              <View style={{flexDirection: 'row', alignItems: 'center'}}>
                <View style={styles.iconContainer}>
                  <Image
                    source={assets.ms}
                    style={{
                      height: 16,
                      width: 16,
                    }}
                    resizeMode="contain"
                  />
                </View>
                <Text style={styles.text}>Show chat head</Text>
              </View>
              <Checkbox />
            </View>
            <View style={{...styles.row}}>
              <View style={{flexDirection: 'row', alignItems: 'center'}}>
                <View style={styles.iconContainer}>
                  <Image
                    source={assets.bulb}
                    style={{
                      height: 16,
                      width: 16,
                    }}
                    resizeMode="contain"
                  />
                </View>
                <Text style={styles.text}>Active status</Text>
              </View>
              <Checkbox />
            </View>
            <Pressable
              onPress={() => navigation.navigate('Privacy')}
              style={{...styles.row}}>
              <View style={{flexDirection: 'row', alignItems: 'center'}}>
                <View style={styles.iconContainer}>
                  <Image
                    source={assets.privacy}
                    style={{
                      height: 16,
                      width: 16,
                    }}
                    resizeMode="contain"
                  />
                </View>
                <Text style={styles.text}>Privacy policy</Text>
              </View>
              <Image
                source={assets.arrowRight}
                style={{
                  height: 16,
                  width: 8,
                }}
                resizeMode="contain"
              />
            </Pressable>
            <Pressable
              onPress={() => navigation.navigate('Help')}
              style={{...styles.row}}>
              <View style={{flexDirection: 'row', alignItems: 'center'}}>
                <View style={styles.iconContainer}>
                  <Image
                    source={assets.help}
                    style={{
                      height: 16,
                      width: 16,
                    }}
                    resizeMode="contain"
                  />
                </View>
                <Text style={styles.text}>Help</Text>
              </View>
              <Image
                source={assets.arrowRight}
                style={{
                  height: 16,
                  width: 8,
                }}
                resizeMode="contain"
              />
            </Pressable>
            <Pressable
              onPress={() => navigation.navigate('About')}
              style={{...styles.row}}>
              <View style={{flexDirection: 'row', alignItems: 'center'}}>
                <View style={styles.iconContainer}>
                  <Image
                    source={assets.chatActive}
                    style={{
                      height: 16,
                      width: 16,
                    }}
                    resizeMode="contain"
                  />
                </View>
                <Text style={styles.text}>About us</Text>
              </View>
              <Image
                source={assets.arrowRight}
                style={{
                  height: 16,
                  width: 8,
                }}
                resizeMode="contain"
              />
            </Pressable>
            <Pressable
              //   onPress={() => console.log('Hello')}
              style={{...styles.row}}>
              <View style={{flexDirection: 'row', alignItems: 'center'}}>
                <View style={styles.iconContainer}>
                  <Image
                    source={assets.lockGreen}
                    style={{
                      height: 16,
                      width: 16,
                    }}
                    resizeMode="contain"
                  />
                </View>
                <Text style={styles.text}>Log out</Text>
              </View>
              <Image
                source={assets.arrowRight}
                style={{
                  height: 16,
                  width: 8,
                }}
                resizeMode="contain"
              />
            </Pressable>
          </ScrollView>
        </View>
      </SafeAreaView>
    </LinearGradient>
  );
};

export default Settings;

const styles = StyleSheet.create({
  gradient: {
    flex: 1,
  },
  top: {
    paddingBottom: 19,
    paddingHorizontal: 24,
    marginTop: 27.74,
  },
  headTitle: {
    ...theme.TYPOGRAPHY.h3,
    fontWeight: '700',
    color: theme.COLORS.white,
  },
  bottom: {
    flexGrow: 1,
    backgroundColor: theme.COLORS.white,
    paddingHorizontal: 24,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 8,
    justifyContent: 'space-between',
  },
  text: {
    marginLeft: 16,
    ...theme.TYPOGRAPHY.body2,
    fontWeight: '500',
    color: '#1D1D35',
    fontFamily: 'Inter',
  },
  iconContainer: {
    height: 48,
    width: 48,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCF9',
    borderRadius: 24,
  },
});
