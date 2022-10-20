import React, { useState, useEffect } from 'react';
import LinearGradient from 'react-native-linear-gradient';
import { useSafeAreaInsets } from 'react-native-safe-area-context'
import {
  View,
  Text,
  StyleSheet,
  Pressable,
  Image,
  TextInput,
  ScrollView,
} from 'react-native';


import theme from '../../../theme';
import assets from '../../../assets';
import { getImageUrl } from '../../../utils/getImageUrl';
import { useDispatch, useSelector } from 'react-redux';

const ChatSearch = ({ navigation }) => {
  const { top } = useSafeAreaInsets();
  const [search, setSearch] = useState('');
  const dispatch = useDispatch();
  const users = useSelector(state => state.users.users);

  useEffect(() => {
    dispatch.users.getAllUsers();
  }, []);

  // const getAllUsers = async () => {
  //   try {
  //     const { data } = await allUsers();
  //     setUsers(data);
  //     console.log('response - ', data);
  //   } catch (err) {
  //     console.log('error - ', err);
  //   }
  // };


  return (
    <View>
      <LinearGradient
        colors={["#D8E3F3", '#B8F7FC',]}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 0 }}>
        <View style={styles.container}>
          <View style={[styles.search, { marginTop: top }]}>
            <Pressable hitSlop={{ top: 15, right: 15, bottom: 15, left: 15 }} onPress={() => navigation.goBack()}>
              <Image source={assets.backChat} />
            </Pressable>
            <Text style={styles.messageText}>Messages</Text>
            <View />
          </View>
          <View />
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
                placeholderTextColor={'#8FA8BD'}
                value={search}
                onChangeText={setSearch}
              />
              <Pressable hitSlop={{ top: 15, right: 15, bottom: 15, left: 15 }} onPress={() => setSearch("")}>
                <Image
                  source={assets.crossIcon}
                  style={{
                    height: 15,
                    width: 15,
                  }}
                  resizeMode="cover"
                />
              </Pressable>
            </View>
          </View>
        </View>
      </LinearGradient >
      <LinearGradient colors={['#fff', "#FEF7F7", '#FCEBEF',]} style={styles.body}>

        <ScrollView>
          {users.map(user => (
            <Pressable
              style={styles.userBlock}
              key={user?.id}
              onPress={() => {
                navigation.navigate('Chat', { chat: user });
              }}>
              <View
                style={{ flexDirection: 'row', alignItems: 'center' }}>
                <View>
                  <Image
                    source={getImageUrl(user.image_url, user.username)}
                    style={{ height: 56, width: 56, borderRadius: 100, backgroundColor: '#f2f2f2' }}
                    resizeMode="cover"
                  />
                </View>
                <View style={{ marginLeft: 16 }}>
                  <Text style={styles.textNormal}>
                    {user?.username || user?.phone_number}
                  </Text>
                </View>
              </View>
            </Pressable>
          ))}
        </ScrollView>
      </LinearGradient>
    </View >
  );
};

export default ChatSearch;

const styles = StyleSheet.create({
  background: {
    flex: 1,
    width: '100%',
    height: '100%'
  },
  container: {
    margin: 24,
    marginBottom: 30
  },
  search: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center'
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
    marginRight: 25
  },
  body: {
    height: '100%',
    padding: 24,
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
    marginTop: -10
  },
  userBlock: {
    marginBottom: 15,
  },
  avatarContainer: {
    marginLeft: 10,
    flexDirection: 'row',
    alignItems: 'center'
  },
  userName: {
    fontWeight: '600',
    fontSize: 18,
    fontFamily: 'Inter',
    color: '#2C3482',
  },
  userMetrics: {
    fontFamily: 'Inter',
    fontSize: 14,
    color: '#2C3482',
    fontWeight: '400',
  },
  onlineIndicator: {
    position: 'absolute',
    height: 16,
    width: 16,
    backgroundColor: theme.COLORS.primary,
    borderRadius: 16 / 2,
    borderWidth: 3,
    borderColor: theme.COLORS.white,
    right: 0,
    bottom: 0,
  },
  searchBar: {
    height: 44,
    borderWidth: 1,
    backgroundColor: '#FAFDFE',
    borderColor: 'white',
    justifyContent: 'center',
    borderRadius: 32,
    paddingHorizontal: 18,
    marginTop: 16,
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
    color: '#0E0E2F',
    marginHorizontal: 16,
    lineHeight: 20,
  },
});
