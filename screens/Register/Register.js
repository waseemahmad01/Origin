import React, {useState} from 'react';

import {View, SafeAreaView, StyleSheet, Pressable, Image} from 'react-native';

import MobileVerification from '../MobileVerification/MobileVerification';
import UserProfile from '../UserProfile/UserProfile';
import UserEmail from '../UserEmail/UserEmail';
import CreatePassword from '../CreatePassword/CreatePassword';
import OtpVerification from '../OtpVerification/OtpVerification';

import assets from '../../assets';
import theme from '../../theme';

const screens = {
  0: MobileVerification,
  1: OtpVerification,
  2: UserProfile,
  3: UserEmail,
  4: CreatePassword,
};

const Register = () => {
  const [active, setActive] = useState(0);

  const handleBackClick = () => {
    if (active === 0) {
      return;
    } else {
      setActive(active - 1);
    }
  };

  const handleContinue = () => {
    setActive(active + 1);
  };

  const Component = screens[active];

  return (
    <SafeAreaView style={{flex: 1}}>
      <View style={styles.container}>
        <View style={styles.indiCatorRow}>
          <Pressable style={styles.backButton} onPress={handleBackClick}>
            <Image source={assets.arrowBack} />
          </Pressable>
          {Array.from({length: 6}, (_, i) => i).map(i => (
            <View
              key={i}
              style={{
                ...styles.indicator,
                marginRight: i === 5 ? 0 : 21,
                backgroundColor: i <= active ? theme.COLORS.primary : '#C4C4C4',
              }}></View>
          ))}
        </View>
        <View style={{flexGrow: 1, marginTop: 39}}>
          <Component handleContinue={handleContinue} />
        </View>
      </View>
    </SafeAreaView>
  );
};

export default Register;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 20,
    paddingVertical: 38,
  },
  indiCatorRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  backButton: {
    height: 40,
    width: 40,
    borderRadius: 10,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#A5A6B3',
    marginRight: 28,
  },
  indicator: {
    height: 20,
    width: 20,
    borderRadius: 20 / 2,
    marginRight: 21,
  },
});
