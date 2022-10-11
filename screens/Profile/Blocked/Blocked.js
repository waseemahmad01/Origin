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

import assets from '../../../assets';
import theme from '../../../theme';

const isIos = Platform.OS === 'ios';

const Blocked = ({navigation}) => {
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
            }}>
            <Pressable
              onPress={() => navigation.goBack()}
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
              <Text style={styles.headTitle}>Blocked</Text>
            </Pressable>
          </View>
        </View>
        <View style={styles.bottom}>
          <ScrollView showsVerticalScrollIndicator={false} style={{flex: 1}}>
            {Array.from({length: 8}, (_, i) => i).map(i => (
              <Pressable
                key={i}
                onPress={() => handleProfileClick(user)}
                style={{
                  ...styles.row,
                  justifyContent: 'space-between',
                  paddingVertical: 12,
                }}>
                <View style={{...styles.row}}>
                  <View>
                    <Image
                      source={assets.user}
                      style={{
                        height: 48,
                        width: 48,
                        marginRight: 16,
                        borderRadius: 48 / 2,
                      }}
                      resizeMode="cover"
                    />
                  </View>
                  <Text style={styles.userName}>Jenny Wilson</Text>
                </View>
                <View>
                  <Pressable
                    style={styles.btn}
                    //   onPress={() => handleProfileClick(user)}
                  >
                    <Text style={styles.transferText}>Unblock</Text>
                  </Pressable>
                </View>
              </Pressable>
            ))}
          </ScrollView>
        </View>
      </SafeAreaView>
    </LinearGradient>
  );
};

export default Blocked;

const styles = StyleSheet.create({
  gradient: {flex: 1},
  top: {
    paddingHorizontal: 24,
    marginTop: 27.74,
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
    paddingTop: 24,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  transferText: {
    fontSize: 12,
    fontFamily: 'Inter',
    fontWeight: '400',
    lineHeight: 18,
    color: '#4A4A5D',
  },
  btn: {
    paddingHorizontal: 16,
    paddingVertical: 7,
    backgroundColor: '#F5FCF9',
    borderRadius: 16,
  },
  userName: {
    ...theme.TYPOGRAPHY.subtitle1,
    color: '#1D1D35',
    fontWeight: '500',
  },
});
