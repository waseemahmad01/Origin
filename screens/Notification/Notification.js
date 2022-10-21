import React, {useEffect} from 'react';
import {checkNotifications} from 'react-native-permissions';

import {
  View,
  Text,
  SafeAreaView,
  StyleSheet,
  Pressable,
  Image,
  ImageBackground,
  StatusBar,
  Platform,
} from 'react-native';
import assets from '../../assets';

// import {Permission, PERMISSION_TYPE} from '../../Permissions/Permissions';

import Button from '../../components/Button/Button';
import theme from '../../theme';

const isIos = Platform.OS === 'ios';

const Notification = ({navigation}) => {
  // useEffect(() => {
  //   console.log('running');
  //   Permission.checkPermission(PERMISSION_TYPE.notification);
  // }, []);

  useEffect(() => {
    // checkNotifications().then(({status, settings}) => {
    //   console.log(status, settings);
    // });
  }, []);

  return (
    <ImageBackground
      style={{flex: 1}}
      resizeMode="cover"
      source={assets.background}>
      <SafeAreaView style={{flex: 1}}>
        <StatusBar translucent={true} backgroundColor="transparent" />
        <View style={styles.container}>
          <ImageBackground
            // style={styles.container}
            source={assets.containerBox}
            resizeMode="cover"
            style={styles.backgroundImage}>
            <View style={styles.container}>
              <View style={styles.imageContainer}>
                <View style={{alignItems: 'center'}}>
                  <Image source={assets.notification} resizeMode="cover" />
                  <Text
                    style={[
                      theme.TYPOGRAPHY.h3,
                      {marginTop: 32, color: theme.COLORS.blue},
                    ]}>
                    Notifications
                  </Text>
                  <Text
                    style={[
                      theme.TYPOGRAPHY.body1,
                      {textAlign: 'center', marginTop: 9, fontWeight: '400'},
                    ]}>
                    We share new jobs via notifications, so please ensure that
                    you <Text style={{fontWeight: '600'}}>Allow</Text>{' '}
                    notifications.
                  </Text>
                </View>
              </View>
              <View>
                <Button
                  label="Allow notifcations"
                  style={{alignSelf: 'flex-end'}}
                  onPress={() =>
                    navigation.reset({
                      index: 0,
                      routes: [{name: 'Login'}],
                    })
                  }
                />
                <View style={styles.denyButton}>
                  <Pressable>
                    <Text style={[theme.TYPOGRAPHY.body1]}>Deny</Text>
                  </Pressable>
                </View>
              </View>
            </View>
          </ImageBackground>
        </View>
      </SafeAreaView>
    </ImageBackground>
  );
};

export default Notification;

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 24,
    paddingVertical: 24,
    flex: 1,
    paddingTop: isIos ? 39 : 39 + StatusBar.currentHeight,
  },
  backgroundImage: {
    flex: 1,
    borderRadius: 24,
    overflow: 'hidden',
  },
  denyButton: {
    height: 48,
    marginTop: 5,
    alignItems: 'center',
    justifyContent: 'center',
  },
  imageContainer: {
    flexGrow: 1,
    alignItems: 'center',
    paddingTop: 80,
  },
});
