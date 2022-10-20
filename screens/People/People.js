import React, { useEffect, useState } from 'react';

import {
  View,
  Text,
  StatusBar,
  Platform,
  StyleSheet,
  SafeAreaView,
  Image,
  TextInput,
  ScrollView,
  Pressable,
} from 'react-native';

import { useDispatch, useSelector } from 'react-redux';

import LinearGradient from 'react-native-linear-gradient';
import assets from '../../assets';
import theme from '../../theme';

const isIos = Platform.OS === 'ios';

const testUser = {
  email: 'waseemahmad.pk01@gmail.com',
  id: 'a30831db-f53e-4c89-8e4d-2125089783c9',
  image_url: null,
  location: null,
  my_twilio_number: '+12056712655',
  name: 'waseem ahmad',
  notification_token: null,
  number_of_messages: 100,
  number_of_seconds: 12000,
  origen_public_wallet_address: '0xd002A8BF19cc15aEBa21410f602Db3b5F3556091',
  phone_number: '+923024471460',
  username: 'waseemahmad',
  vox_app_id: '10508672',
  vox_app_name: 'lqrpcxg.hammadr499.voximplant.com',
  vox_phone_number: '17603698166',
  vox_user_id: '4292044',
  vox_user_name: 'lqrpcxg',
  vox_user_password: '78816273',
};

const People = ({ navigation }) => {
  const dispatch = useDispatch();
  const users = useSelector(state => state.users.users);
  console.log('users =============>', users);
  const [search, setSearch] = useState('');

  const handleProfileClick = user => {
    console.log(user);
    // dispatch.users.setSelectedUser(user);
    navigation.navigate('Chat', { user });
  };

  useEffect(() => {
    dispatch.users.getAllUsers();
  }, []);

  return (
    <LinearGradient
      style={{
        ...styles.gradient,
        paddingTop: isIos ? 0 : StatusBar.currentHeight,
      }}
      colors={[theme.COLORS.primary, theme.COLORS.secondary]}
      start={{ x: 0, y: 0 }}
      end={{ x: 1, y: 0 }}>
      <StatusBar translucent={true} backgroundColor={'transparent'} />
      <SafeAreaView style={{ flex: 1 }}>
        <View style={styles.topBar}>
          <Text style={styles.topBarTitle}>People</Text>
          <View style={styles.searchBar}>
            <View style={styles.searchBarInner}>
              <Image
                source={assets.search}
                style={{
                  height: 20,
                  width: 20,
                }}
                resizeMode="cover"
              />
              <TextInput
                style={styles.serachInput}
                placeholder="Search"
                placeholderTextColor={'#6E6E7E'}
                value={search}
                onChangeText={setSearch}
              />
              {/* <Image
                source={assets.qrCode}
                style={{
                  height: 20,
                  width: 20,
                }}
                resizeMode="cover"
              /> */}
            </View>
          </View>
        </View>
        <View style={styles.bottom}>
          <ScrollView style={{ flex: 1 }} showsVerticalScrollIndicator={false}>
            <Pressable
              onPress={() => handleProfileClick(testUser)}
              style={{
                ...styles.row,
                justifyContent: 'space-between',
                marginVertical: 16,
              }}>
              <View style={{ ...styles.row }}>
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
                <Text style={styles.userName}>{testUser.name}</Text>
              </View>
              <View>
                <Pressable
                  style={styles.btn}
                // onPress={() => handleProfileClick(user)}
                >
                  <Text style={styles.transferText}>Send</Text>
                </Pressable>
              </View>
            </Pressable>
          </ScrollView>
        </View>

        <View style={styles.hider}></View>
      </SafeAreaView>
    </LinearGradient>
  );
};

export default People;

const styles = StyleSheet.create({
  gradient: {
    flex: 1,
  },
  topBar: {
    paddingHorizontal: 24,
  },
  topBarTitle: {
    ...theme.TYPOGRAPHY.h3,
    fontWeight: '700',
    fontFamily: 'Inter',
    color: theme.COLORS.white,
    marginTop: 27.5,
    marginBottom: 16,
  },
  searchBar: {
    backgroundColor: theme.COLORS.white,
    height: 44,
    justifyContent: 'center',
    borderRadius: 32,
    paddingHorizontal: 18,
    marginBottom: 16,
  },
  searchBarInner: {
    flexDirection: 'row',
    width: '100%',
    alignItems: 'center',
    height: '100%',
  },
  serachInput: {
    flexGrow: 1,
    ...theme.TYPOGRAPHY.subtitle1,
    fontWeight: '400',
    fontFamily: 'Inter',
    height: '100%',
    color: '#1D1D35',
    marginHorizontal: 16,
    lineHeight: 20,
  },
  bottom: {
    backgroundColor: theme.COLORS.white,
    flexGrow: 1,
    paddingHorizontal: 24,
    zIndex: 2,
    elevation: 2,
  },
  hider: {
    position: 'absolute',
    backgroundColor: theme.COLORS.white,
    bottom: 0,
    width: '100%',
    height: 60,
    zIndex: 0,
  },
  title: {
    ...theme.TYPOGRAPHY.subtitle1,
    color: '#B7B7BE',
    fontWeight: '500',
    fontFamily: 'Inter',
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
  onlineIndicator: {
    height: 16,
    width: 16,
    backgroundColor: theme.COLORS.primary,
    borderRadius: 16 / 2,
    borderWidth: 3,
    borderColor: theme.COLORS.white,
    position: 'absolute',
    right: 14,
    bottom: 0,
  },
});
