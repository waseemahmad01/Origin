import React from 'react';

import {
  View,
  Text,
  Image,
  StyleSheet,
  SafeAreaView,
  Pressable,
} from 'react-native';
import assets from '../../../assets';
import GButton from '../../../components/GButton/GButton';
import theme from '../../../theme';

const FaceIdVerification = ({navigation}) => {
  return (
    <SafeAreaView style={{flex: 1}}>
      <View style={{flex: 1, paddingHorizontal: 24}}>
        <View style={styles.main}>
          <Image source={assets.faceIDimg} />
          <Text style={styles.title}>Allow verification through FaceID</Text>
          <Text style={styles.subtitle}>
            Origen can recognize the unique, three-dimensional features of your
            face to unlock automatically and log in to the app, so please ensure
            that you Allow Face ID.
          </Text>
        </View>
        <View style={styles.buttonContainer}>
          <GButton
            label="Allow Face ID"
            onPress={() => navigation.navigate('Mint-Packages')}
          />
          <View style={styles.denyButton}>
            <Pressable>
              <Text style={styles.denyText}>Deny</Text>
            </Pressable>
          </View>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default FaceIdVerification;

const styles = StyleSheet.create({
  main: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    ...theme.TYPOGRAPHY.h3,
    marginTop: 48,
  },
  subtitle: {
    ...theme.TYPOGRAPHY.subtitle1,
    color: theme.COLORS.textSecondary,
    textAlign: 'center',
    marginTop: 20,
  },
  buttonContainer: {},
  denyButton: {
    alignItems: 'center',
    marginTop: 37,
    marginBottom: 25,
  },
  denyText: {
    ...theme.TYPOGRAPHY.body1,
  },
});
