import React, {useState} from 'react';

import {
  View,
  Text,
  SafeAreaView,
  StatusBar,
  Image,
  StyleSheet,
  Platform,
  ScrollView,
} from 'react-native';

import LinearGradient from 'react-native-linear-gradient';
import {useSelector} from 'react-redux';

import theme from '../../../theme';
import assets from '../../../assets';
import GButton from '../../../components/GButton/GButton';
import Input from '../../../components/Input/Input';
import Pressable from 'react-native/Libraries/Components/Pressable/Pressable';

const isIos = Platform.OS === 'ios';

const EditProfile = ({navigation}) => {
  const user = useSelector(state => state.auth.user);

  const [formData, setFormData] = useState({
    name: user?.username || '',
    email: user?.email || '',
    phone: user?.phone_number || '',
    address: '',
    old_password: '',
    new_password: '',
  });

  const handleChange = (text, name) => {
    setFormData(prev => ({...prev, [name]: text}));
  };

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
              marginTop: 27.74,
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
              />
              <Text style={styles.headTitle}>Edit Profile</Text>
            </Pressable>
          </View>
        </View>
        <View style={styles.bottom}>
          <View style={styles.profileContainer}>
            <Image source={assets.user} />
            <Text style={styles.userName}>{user?.username}</Text>
          </View>
          <View style={styles.divider}></View>
          <View style={{flexGrow: 1}}>
            <ScrollView style={{flex: 1}}>
              <View style={styles.userInfoBlock}>
                <View style={{...styles.row, justifyContent: 'space-between'}}>
                  <Text style={styles.key}>Name</Text>
                  <Input
                    title="Annette Black"
                    style={{
                      width: 200,
                      height: 40,
                    }}
                    value={formData.name}
                    onChangeText={text => handleChange(text, 'name')}
                  />
                </View>
              </View>
              <View style={styles.userInfoBlock}>
                <View style={{...styles.row, justifyContent: 'space-between'}}>
                  <Text style={styles.key}>Email</Text>
                  <Input
                    title="annette@gmail.com"
                    style={{
                      width: 200,
                      height: 40,
                    }}
                    value={formData.email}
                    onChangeText={text => handleChange(text, 'email')}
                  />
                </View>
              </View>
              <View style={styles.userInfoBlock}>
                <View style={{...styles.row, justifyContent: 'space-between'}}>
                  <Text style={styles.key}>Phone</Text>
                  <Input
                    title="(316) 555-0116"
                    style={{
                      width: 200,
                      height: 40,
                    }}
                    value={formData.phone}
                    onChangeText={text => handleChange(text, 'phone')}
                  />
                </View>
              </View>
              <View style={styles.userInfoBlock}>
                <View style={{...styles.row, justifyContent: 'space-between'}}>
                  <Text style={styles.key}>Address</Text>
                  <Input
                    title="New York, NVC"
                    style={{
                      width: 200,
                      height: 40,
                    }}
                    value={formData.address}
                    onChangeText={text => handleChange(text, 'address')}
                  />
                </View>
              </View>
              <View style={styles.userInfoBlock}>
                <View style={{...styles.row, justifyContent: 'space-between'}}>
                  <Text style={styles.key}>Old Password</Text>
                  <Input
                    title="Old Password"
                    style={{
                      width: 200,
                      height: 40,
                    }}
                    secureTextEntry
                    value={formData.old_password}
                    onChangeText={text => handleChange(text, 'old_password')}
                  />
                </View>
              </View>
              <View style={styles.userInfoBlock}>
                <View style={{...styles.row, justifyContent: 'space-between'}}>
                  <Text style={styles.key}>New Password</Text>
                  <Input
                    title="New Password"
                    style={{
                      width: 200,
                      height: 40,
                    }}
                    secureTextEntry
                    value={formData.new_password}
                    onChangeText={text => handleChange(text, 'new_password')}
                  />
                </View>
              </View>
              <View style={{alignItems: 'flex-end', marginVertical: 12}}>
                <View style={styles.row}>
                  <Pressable style={styles.cancelBtn}>
                    <Text style={styles.cancelText}>Cancel</Text>
                  </Pressable>
                  <GButton
                    label="Edit profile"
                    style={{
                      width: 93,
                      height: 32,
                    }}
                    textStyle={{
                      fontSize: 12,
                      lineHeight: 18,
                    }}
                  />
                </View>
              </View>
            </ScrollView>
          </View>
        </View>
        <View style={styles.hider}></View>
      </SafeAreaView>
    </LinearGradient>
  );
};

export default EditProfile;

const styles = StyleSheet.create({
  gradient: {
    flex: 1,
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
    zIndex: 2,
    elevation: 4,
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
  userName: {
    ...theme.TYPOGRAPHY.body1,
    fontSize: 18,
    lineHeight: 28,
    marginTop: 20,
    color: '#1D1D35',
    fontWeight: '500',
  },
  divider: {
    borderWidth: 1,
    borderColor: '#e8e8e8',
    width: '100%',
    marginBottom: 16,
  },
  userInfoBlock: {
    paddingVertical: 8,
    marginBottom: 12,
  },
  key: {
    ...theme.TYPOGRAPHY.subtitle1,
    color: '#4A4A5D',
    fontWeight: '400',
  },
  value: {
    ...theme.TYPOGRAPHY.subtitle1,
    color: '#1D1D35',
    fontWeight: '500',
  },
  hider: {
    position: 'absolute',
    left: 0,
    bottom: 0,
    width: '100%',
    height: 50,
    backgroundColor: theme.COLORS.white,
  },
  cancelBtn: {
    height: 32,
    paddingHorizontal: 16,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 8,
    backgroundColor: '#F5FCF9',
    borderRadius: 23,
  },
  cancelText: {
    fontWeight: '400',
    fontSize: 12,
    lineHeight: 18,
    fontFamily: 'Inter',
    color: '#4A4A5D',
  },
});
