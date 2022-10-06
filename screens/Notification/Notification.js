import React from 'react';

import {
  View,
  Text,
  SafeAreaView,
  StyleSheet,
  Pressable,
  Image,
} from 'react-native';
import assets from '../../assets';

// import {Permission, PERMISSION_TYPE} from '../../Permissions/Permissions';

import Button from '../../components/Button/Button';
import theme from '../../theme';

const Notification = ({navigation}) => {
  // useEffect(() => {
  //   console.log('running');
  //   Permission.checkPermission(PERMISSION_TYPE.notification);
  // }, []);

  return (
    <View style={{flex: 1, backgroundColor: 'white'}}>
      <SafeAreaView style={{flex: 1}}>
        <View style={styles.container}>
          <View style={styles.imageContainer}>
            <View style={{alignItems: 'center'}}>
              <Image source={assets.bell} resizeMode="cover" />
              <Text style={[theme.TYPOGRAPHY.h2, {marginTop: 46.75}]}>
                Notifications
              </Text>
              <Text
                style={[
                  theme.TYPOGRAPHY.body1,
                  {textAlign: 'center', marginTop: 9},
                ]}>
                We share new jobs via notifications, so please ensure that you
                Allow notifications.
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
      </SafeAreaView>
    </View>
  );
};

export default Notification;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    backgroundColor: 'white',
  },
  denyButton: {
    height: 44,
    alignItems: 'center',
    justifyContent: 'center',
  },
  imageContainer: {
    flexGrow: 1,
    alignItems: 'center',
    paddingTop: 100,
  },
});
