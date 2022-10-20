import React, {useEffect, useCallback} from 'react';
import {useFocusEffect} from '@react-navigation/native';

import {
  View,
  Text,
  StatusBar,
  Platform,
  StyleSheet,
  SafeAreaView,
  Image,
  ScrollView,
  Pressable,
  ImageBackground,
} from 'react-native';

import {useDispatch, useSelector} from 'react-redux';

import LinearGradient from 'react-native-linear-gradient';
import assets from '../../assets';
import theme from '../../theme';

const isIos = Platform.OS === 'ios';

// const testUser = {
//   email: 'waseemahmad.pk01@gmail.com',
//   id: 'a30831db-f53e-4c89-8e4d-2125089783c9',
//   image_url: null,
//   location: null,
//   my_twilio_number: '+12056712655',
//   name: 'waseem ahmad',
//   notification_token: null,
//   number_of_messages: 100,
//   number_of_seconds: 12000,
//   origen_public_wallet_address: '0xd002A8BF19cc15aEBa21410f602Db3b5F3556091',
//   phone_number: '+923024471460',
//   username: 'waseemahmad',
//   vox_app_id: '10508672',
//   vox_app_name: 'lqrpcxg.hammadr499.voximplant.com',
//   vox_phone_number: '17603698166',
//   vox_user_id: '4292044',
//   vox_user_name: 'lqrpcxg',
//   vox_user_password: '78816273',
// };

const People = ({navigation}) => {
  const dispatch = useDispatch();
  // const myContacts = useSelector(state => state.users.myContacts);
  const myContacts = useSelector(state => state.users.users);
  // const loading = useSelector(state => state.users.loading);
  console.log(myContacts);

  const handleProfileClick = user => {
    console.log(user);
    // dispatch.users.setSelectedUser(user);
    navigation.navigate('Chat', {chat: user});
  };

  useFocusEffect(
    useCallback(() => {
      dispatch.users.getAllUsers();
    }, []),
  );

  return (
    <ImageBackground
      source={assets.background}
      resizeMode="cover"
      style={{
        ...styles.gradient,
        paddingTop: isIos ? 0 : StatusBar.currentHeight,
      }}
      colors={[theme.COLORS.primary, theme.COLORS.secondary]}
      start={{x: 0, y: 0}}
      end={{x: 1, y: 0}}>
      <StatusBar translucent={true} backgroundColor={'transparent'} />
      <SafeAreaView style={{flex: 1}}>
        <View style={styles.topBar}>
          <View style={styles.headerRow}>
            <Pressable onPress={() => navigation.navigate('People-Search')}>
              <Image
                source={assets.searchBlue}
                style={{
                  height: 32,
                  width: 32,
                }}
              />
            </Pressable>
            <Text style={styles.topBarTitle}>People</Text>
            <Pressable>
              <Image
                source={assets.download}
                style={{
                  height: 32,
                  width: 32,
                }}
              />
            </Pressable>
          </View>
        </View>
        <ImageBackground source={assets.containerBox} style={styles.bottom}>
          <ScrollView style={{flex: 1}} showsVerticalScrollIndicator={false}>
            {myContacts.map((people, i) => (
              <Pressable
                key={i}
                onPress={() => handleProfileClick(people)}
                style={{
                  ...styles.row,
                  justifyContent: 'space-between',
                  marginVertical: 16,
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
                  <View>
                    <Text style={styles.userName}>{people?.username}</Text>
                    <Text
                      style={{
                        ...theme.TYPOGRAPHY.body1,
                        color: theme.COLORS.blue,
                        fontWeight: '600',
                        lineHeight: 24,
                      }}>
                      {people?.phone_number}
                    </Text>
                  </View>
                </View>
              </Pressable>
            ))}
          </ScrollView>
        </ImageBackground>

        <View style={styles.hider}></View>
      </SafeAreaView>
    </ImageBackground>
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
    lineHeight: 32,
    color: theme.COLORS.darkBlue,
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
    flexGrow: 1,
    paddingHorizontal: 24,
    paddingVertical: 12,
    zIndex: 2,
    elevation: 2,
    borderTopRightRadius: 24,
    borderTopLeftRadius: 24,
    overflow: 'hidden',
  },
  hider: {
    position: 'absolute',
    backgroundColor: theme.COLORS.white,
    bottom: 0,
    width: '100%',
    height: 35,
    opacity: 0.25,
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
    ...theme.TYPOGRAPHY.body1,
    color: theme.COLORS.grey900,
    fontWeight: '600',
    textTransform: 'capitalize',
    marginBottom: 2,
    lineHeight: 22,
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
  headerRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 27.5,
    marginBottom: 16,
  },
});
