import React from 'react';

import {
  View,
  Text,
  SafeAreaView,
  Image,
  StyleSheet,
  ImageBackground,
  Dimensions,
} from 'react-native';

import { useSelector } from 'react-redux';
import theme from '../../../theme';
import assets from '../../../assets';
import Pressable from 'react-native/Libraries/Components/Pressable/Pressable';
import { getImageUrl } from '../../../utils/getImageUrl';

const { width, } = Dimensions.get('window');

const Profile = ({ navigation }) => {
  const user = useSelector(state => state.auth.user);


  return (
    <ImageBackground style={[StyleSheet.absoluteFill, styles.background]} source={assets.profileBG}>
      <SafeAreaView style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <ImageBackground style={{ height: 500, width: width * 0.90 }} source={assets.profileBG2}>
          <View>
            <View style={styles.avatarBorder}>
              <Image
                source={getImageUrl(user?.image_url, user?.username)}
                style={styles.avatar}
                resizeMode="cover"
              />
            </View>
            <View style={styles.userNameContainer}>
              <Text style={styles.userName}>{user?.username}</Text>
              <Pressable onPress={() => navigation.navigate('EditProfile')}>
                <View style={styles.editButton}>
                  <Image
                    source={assets.edit}
                    style={{
                      height: 24,
                      width: 24,
                    }}
                    resizeMode="cover"
                  />
                  <Text style={styles.editText} >Edit Profile</Text>
                </View>
              </Pressable>
            </View>
          </View>

          <View style={styles.infoContainer}>
            <View style={styles.userInfoBlock}>
              <View style={{ ...styles.row, justifyContent: 'space-between' }}>
                <View style={styles.row}>
                  <Image source={assets.userId} />
                  <Text style={styles.key}>User ID</Text>
                </View>
                <View style={styles.valueContainer}>
                  <Text style={styles.value}>@annette.me</Text>
                </View>
              </View>
            </View>
            <View style={styles.userInfoBlock}>
              <View style={{ ...styles.row, justifyContent: 'space-between' }}>
                <View style={styles.row}>
                  <Image source={assets.userLocation} />
                  <Text style={styles.key}>Location</Text>
                </View>
                <View style={styles.valueContainer}>
                  <Text style={styles.value}>New York, NYC</Text>
                </View>
              </View>
            </View>
            <View style={styles.userInfoBlock}>
              <View style={{ ...styles.row, justifyContent: 'space-between' }}>
                <View style={styles.row}>
                  <Image source={assets.userPhone} />
                  <Text style={styles.key}>Phone</Text>
                </View>
                <View style={styles.valueContainer}>
                  <Text style={styles.value}>{user?.phone_number}</Text>
                </View>
              </View>
            </View>
            <View style={styles.userInfoBlock}>
              <View style={{ ...styles.row, justifyContent: 'space-between' }}>
                <View style={styles.row}>
                  <Image source={assets.userEmail} />
                  <Text style={styles.key}>Email</Text>
                </View>
                <View style={styles.valueContainer}>
                  <Text numberOfLines={1} style={styles.value}>{user?.email}</Text>
                </View>
              </View>
            </View>
            <View style={styles.userInfoBlock}>
              <View style={{ ...styles.row, justifyContent: 'space-between' }}>
                <View style={styles.row}>
                  <Image source={assets.userWallet} />
                  <Text style={styles.key}>ETH Address</Text>
                </View>
                <View style={styles.valueContainer}>
                  <Text style={styles.value}>0x71C76hjj...d8976F</Text>
                </View>
              </View>
            </View>
          </View>
        </ImageBackground>
      </SafeAreaView >
    </ImageBackground >
  );
};

export default Profile;

const styles = StyleSheet.create({
  background: {
    flex: 1,
    width: '100%',
    height: '100%',
  },
  gradient: {
    flex: 1,
  },
  avatarBorder: {
    borderColor: '#2697FF',
    padding: 3,
    borderRadius: 100,
    borderWidth: 1,
    position: 'absolute',
    left: '40%',
    top: -55
  },
  avatar: {
    height: 75,
    width: 75,
    borderRadius: 100,
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
  userNameContainer: {
    alignSelf: 'center',
    marginVertical: 40
  },
  userName: {
    fontSize: 24,
    fontWeight: '700',
    color: '#2C3482',
    textAlign: 'center',
    fontFamily: 'Inter',
  },
  editButton: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 5,
  },
  editText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#2697FF',
    fontFamily: 'Inter',
    marginLeft: 10,
  },
  divider: {
    borderWidth: 1,
    borderColor: '#e8e8e8',
    width: '100%',
    marginBottom: 16,
  },
  infoContainer: {
    marginHorizontal: 14,
  },
  userInfoBlock: {
    marginBottom: 20
  },
  valueContainer: {
    flex: 1,
    marginLeft: 20,
    alignItems: 'flex-end'
  },
  key: {
    color: '#63798B',
    fontWeight: '500',
    fontSize: 16,
    fontFamily: 'Inter',
    marginLeft: 5,
  },
  value: {
    color: '#0E0E2F',
    fontWeight: '600',
    fontSize: 16,
    fontFamily: 'Inter',
  },
});