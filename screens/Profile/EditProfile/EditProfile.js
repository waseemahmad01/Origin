import React, { useState } from 'react';
import LinearGradient from 'react-native-linear-gradient';
import {
  View,
  Text,
  SafeAreaView,
  TextInput,
  Image,
  StyleSheet,
} from 'react-native';
import { useSelector } from 'react-redux';
import theme from '../../../theme';
import assets from '../../../assets';
import Pressable from 'react-native/Libraries/Components/Pressable/Pressable';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';

const EditProfile = ({ navigation }) => {
  const user = useSelector(state => state.auth.user);
  const [hideOldPassword, setHideOldPassword] = useState(true)
  const [hideNewPassword, setHideNewPassword] = useState(true)
  const [formData, setFormData] = useState({
    name: user?.username || '',
    email: user?.email || '',
    phone: user?.phone_number || '',
    address: '',
    old_password: '',
    new_password: '',
  });

  const handleChange = (text, name) => {
    setFormData(prev => ({ ...prev, [name]: text }));
  };

  return (
    <LinearGradient
      colors={["#D8E3F3", '#B8F7FC',]}
      start={{ x: 0, y: 0 }}
      end={{ x: 1, y: 0 }}>
      <SafeAreaView styles={{ flex: 1 }}>
        <View style={[styles.header]}>
          <Pressable hitSlop={{ top: 15, right: 15, bottom: 15, left: 15 }} onPress={() => navigation.goBack()}>
            <Image source={assets.backChat} />
          </Pressable>
          <Text style={styles.messageText}>Edit Profile</Text>
          <Pressable onPress={() => navigation.navigate('Settings')}>
            <Image source={assets.settingBlue} />
          </Pressable>
        </View>
        <LinearGradient colors={['#fff', "#FEF7F7", '#FCEBEF',]} style={styles.body}>
          <KeyboardAwareScrollView contentContainerStyle={{ flex: 1 }}>
            <View style={styles.avatarBorder}>
              <Image
                source={assets.editProfileImage}
                resizeMode="cover"
              />
              <Pressable style={styles.addProfileImage}>
                <Image style={styles.addProfileImageIcon} source={assets.addProfileImage} />
              </Pressable>
            </View>
            <TextInput
              placeholderColor="#8FA8BD"
              title="Annette Black"
              style={styles.input}
              placeholder='User Name'
              value={formData.name}
              onChangeText={text => handleChange(text, 'name')}
            />
            <TextInput
              placeholderColor="#8FA8BD"
              title="annette@gmail.com"
              style={styles.input}
              placeholder='Email'
              value={formData.email}
              onChangeText={text => handleChange(text, 'email')}
            />
            <TextInput
              placeholderColor="#8FA8BD"
              title="(316) 555-0116"
              placeholder='Phone'
              style={styles.input}
              value={formData.phone}
              onChangeText={text => handleChange(text, 'phone')}
            />
            <TextInput
              placeholderColor="#8FA8BD"
              title="New York, NVC"
              style={styles.input}
              placeholder='Address'
              value={formData.address}
              onChangeText={text => handleChange(text, 'address')}
            />
            <View>
              <TextInput
                placeholderColor="#8FA8BD"
                title="Old Password"
                style={styles.input}
                secureTextEntry={hideOldPassword}
                placeholder='Old Password'
                value={formData.old_password}
                onChangeText={text => handleChange(text, 'old_password')}
              />
              <Pressable style={styles.showPassword} onPress={() => setHideOldPassword(!hideOldPassword)}>
                <Image source={assets.showPassword} />
              </Pressable>
            </View>
            <View>
              <TextInput
                placeholderColor="#8FA8BD"
                title="New Password"
                placeholder='New Password'
                style={styles.input}
                secureTextEntry={hideNewPassword}
                value={formData.new_password}
                onChangeText={text => handleChange(text, 'new_password')}
              />
              <Pressable style={styles.showPassword} onPress={() => setHideNewPassword(!hideNewPassword)}>
                <Image source={assets.showPassword} />
              </Pressable>
            </View>
            <View style={styles.saveButton}>
              <Text style={[styles.textNormal, { color: 'white' }]}>Save update</Text>
            </View>
          </KeyboardAwareScrollView>
        </LinearGradient>
      </SafeAreaView >
    </LinearGradient >
  );
};

export default EditProfile;

const styles = StyleSheet.create({
  background: {
    flex: 1,
    width: '100%',
    height: '100%',
    zIndex: 1,
  },
  top: {
    paddingHorizontal: 24,
    paddingBottom: 19,
  },
  header: {
    marginHorizontal: 24,
    marginTop: 10,
    marginBottom: 30,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  textNormal: {
    fontSize: 16,
    fontWeight: '600',
    color: '#0E0E2F',
    fontFamily: 'Inter',
  },
  messageText: {
    fontSize: 24,
    fontWeight: '700',
    color: '#2C3482',
    fontFamily: 'Inter',
    marginLeft: 5
  },
  body: {
    height: '100%',
    padding: 24,
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
    marginTop: -10
  },
  avatarBorder: {
    alignSelf: 'center',
    alignItems: 'center',
    justifyContent: 'center',
    width: 100,
    height: 100,
    backgroundColor: '#DEE5EB',
    borderRadius: 100,
    marginBottom: 10,
  },
  addProfileImage: {
    position: 'absolute',
    bottom: 0,
    right: -5,
  },
  addProfileImageIcon: {
    height: 30,
    width: 30
  },
  avatar: {
    height: 75,
    width: 75,
    borderRadius: 100,
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
  input: {
    borderWidth: 1,
    height: 48,
    paddingHorizontal: 20,
    borderColor: '#DEE5EB',
    borderRadius: 24,
    marginVertical: 15,
    color: '#0E0E2F',
    fontWeight: '400',
    fontSize: 16,
    fontFamily: 'Inter',
  },
  showPassword: {
    position: 'absolute',
    right: 10,
    top: 30,
  },
  saveButton: {
    backgroundColor: '#3FD38C',
    height: 48,
    borderRadius: 48,
    marginTop: 10,
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center'
  }
});


