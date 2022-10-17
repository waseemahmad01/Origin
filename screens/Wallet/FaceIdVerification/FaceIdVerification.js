import React from 'react';

import {
  View,
  Text,
  Image,
  StyleSheet,
  SafeAreaView,
  Pressable,
  ImageBackground,
  StatusBar,
  Platform,
} from 'react-native';
import assets from '../../../assets';
import Button from '../../../components/Button/Button';
import theme from '../../../theme';

const isIos = Platform.OS === 'ios';

const FaceIdVerification = ({navigation}) => {
  return (
    <ImageBackground
      source={assets.background}
      resizeMode="cover"
      style={{flex: 1}}>
      <SafeAreaView style={{flex: 1}}>
        <StatusBar translucent={true} backgroundColor="transparent" />
        <View
          style={{
            flex: 1,
            paddingHorizontal: 24,
            paddingTop: isIos ? 0 : StatusBar.currentHeight,
          }}>
          <ImageBackground
            source={assets.splashbg}
            style={{
              flex: 1,
              marginTop: 39,
              borderRadius: 24,
              overflow: 'hidden',
              paddingHorizontal: 24,
              paddingBottom: 15,
            }}>
            <View style={styles.main}>
              <Image source={assets.faceIDimg} style={{marginTop: 80}} />
              <Text style={styles.title}>
                Allow verification through FaceID
              </Text>
              <Text style={styles.subtitle}>
                Origen can recognize the unique, three-dimensional features of
                your face to unlock automatically and log in to the app, so
                please ensure that you Allow Face ID.
              </Text>
            </View>
            <View style={styles.buttonContainer}>
              <Button
                label="Allow Face ID"
                onPress={() => navigation.navigate('Get-Number')}
              />
              <View style={styles.denyButton}>
                <Pressable>
                  <Text style={styles.denyText}>Deny</Text>
                </Pressable>
              </View>
            </View>
          </ImageBackground>
        </View>
      </SafeAreaView>
    </ImageBackground>
  );
};

export default FaceIdVerification;

const styles = StyleSheet.create({
  main: {
    flex: 1,
    alignItems: 'center',
  },
  title: {
    ...theme.TYPOGRAPHY.h3,
    marginTop: 32,
    color: theme.COLORS.blue,
    textAlign: 'center',
  },
  subtitle: {
    ...theme.TYPOGRAPHY.body1,
    color: theme.COLORS.grey700,
    textAlign: 'center',
    marginTop: 8,
    lineHeight: 24,
  },
  buttonContainer: {},
  denyButton: {
    alignItems: 'center',
    marginTop: 21,
    marginBottom: 25,
  },
  denyText: {
    ...theme.TYPOGRAPHY.body1,
  },
});
