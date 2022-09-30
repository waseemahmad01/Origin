import React from 'react';

import {
  View,
  Text,
  SafeAreaView,
  StatusBar,
  Platform,
  StyleSheet,
  Dimensions,
  Image,
} from 'react-native';

import LinearGradient from 'react-native-linear-gradient';
import {LinearTextGradient} from 'react-native-text-gradient';
import assets from '../../../assets';
import Button from '../../../components/GButton/GButton';
import theme from '../../../theme';

const isIos = Platform.OS === 'ios';
const height = Dimensions.get('window').height;

const TransactionSuccess = ({navigation}) => {
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
        <View style={styles.top}></View>
        <View style={styles.logo}>
          <Image source={assets.success} />
        </View>
        <View style={styles.bottom}>
          <View style={styles.content}>
            <LinearTextGradient
              style={styles.title}
              locations={[0, 1]}
              colors={[theme.COLORS.primary, theme.COLORS.secondary]}
              start={{x: 0, y: 0}}
              end={{x: 1, y: 0}}>
              <Text>Transaction Successful</Text>
            </LinearTextGradient>
            <Text style={styles.subtitle}>
              You just sent <Text style={{fontWeight: '500'}}>0.45 Gcoins</Text>{' '}
              to
            </Text>
            <Text style={{...styles.subtitle, fontWeight: '500'}}>
              0x4845c...e2d1949dfbe
            </Text>
            <View style={{width: '100%', marginTop: 48}}>
              <Button
                label="Done"
                onPress={() => navigation.navigate('My-Wallet')}
              />
            </View>
          </View>
        </View>
        <View style={styles.hider}></View>
      </SafeAreaView>
    </LinearGradient>
  );
};

export default TransactionSuccess;

const styles = StyleSheet.create({
  gradient: {
    flex: 1,
  },
  top: {
    height: height * 0.22,
    alignItems: 'center',
    justifyContent: 'flex-end',
  },
  bottom: {
    flexGrow: 1,
    backgroundColor: theme.COLORS.white,
    zIndex: 1,
  },
  hider: {
    position: 'absolute',
    backgroundColor: theme.COLORS.white,
    bottom: 0,
    width: '100%',
    height: 60,
    zIndex: 0,
  },
  logo: {
    marginBottom: '-27%',
    zIndex: 5,
    // position: 'absolute',
    width: '100%',
    alignItems: 'center',
  },
  content: {
    flexGrow: 1,
    paddingHorizontal: 24,
    marginTop: 84,
    alignItems: 'center',
  },
  title: {
    ...theme.TYPOGRAPHY.h2,
    fontSize: 24,
    fontWeight: '700',
    fontFamily: 'Inter',
    marginBottom: 16,
  },
  subtitle: {
    ...theme.TYPOGRAPHY.subtitle1,
    fontWeight: '400',
    color: '#6E6E7E',
  },
});
