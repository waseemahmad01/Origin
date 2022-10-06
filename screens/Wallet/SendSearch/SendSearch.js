import React, {useState} from 'react';

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
} from 'react-native';

import {useDispatch, useSelector} from 'react-redux';

import LinearGradient from 'react-native-linear-gradient';
import Pressable from 'react-native/Libraries/Components/Pressable/Pressable';
import assets from '../../../assets';

import theme from '../../../theme';

const isIos = Platform.OS === 'ios';

const SendSearch = ({navigation}) => {
  const dispatch = useDispatch();
  const users = useSelector(state => state.users.users);
  console.log('users =============>', users);
  const [search, setSearch] = useState('');

  const handleProfileClick = user => {
    console.log(user);
    dispatch.users.setSelectedUser(user);
    navigation.navigate('Send-EnterAmount');
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
      <StatusBar translucent={true} backgroundColor={'transparent'} />
      <SafeAreaView style={{flex: 1}}>
        <View style={styles.topBar}>
          <Text style={styles.topBarTitle}>Send</Text>
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
              <Image
                source={assets.qrCode}
                style={{
                  height: 20,
                  width: 20,
                }}
                resizeMode="cover"
              />
            </View>
          </View>
        </View>
        <View style={styles.bottom}>
          <ScrollView style={{flex: 1}} showsVerticalScrollIndicator={false}>
            {search.length > 0 ? (
              <>
                <Text style={{...styles.title, marginTop: 24}}>
                  Search Results
                </Text>
                <Pressable
                  style={{...styles.row, marginVertical: 16}}
                  onPress={handleProfileClick}>
                  <View style={{position: 'relative'}}>
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
                    <View style={styles.onlineIndicator}></View>
                  </View>
                  <Text style={styles.userName}>@johnsmith 0x...dfbe</Text>
                </Pressable>
              </>
            ) : (
              <>
                <Text style={{...styles.title, marginTop: 24}}>Recents</Text>
                {Array.from({length: 3}, (_, i) => i).map(i => (
                  <Pressable
                    onPress={handleProfileClick}
                    style={{...styles.row, marginVertical: 16}}
                    key={i}>
                    <View style={{position: 'relative'}}>
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
                      {i % 3 === 0 && (
                        <View style={styles.onlineIndicator}></View>
                      )}
                    </View>
                    <Text style={styles.userName}>@johnsmith 0x...dfbe</Text>
                  </Pressable>
                ))}

                <Text style={{...styles.title, marginVertical: 8}}>
                  Connections
                </Text>

                {users.map((user, i) => (
                  <Pressable
                    onPress={() => handleProfileClick(user)}
                    style={{
                      ...styles.row,
                      justifyContent: 'space-between',
                      marginVertical: 16,
                    }}
                    key={i}>
                    <View style={{...styles.row}}>
                      <View style={{position: 'relative'}}>
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
                        {i % 3 === 0 && (
                          <View style={styles.onlineIndicator}></View>
                        )}
                      </View>
                      <Text style={styles.userName}>{user.name}</Text>
                    </View>
                    <View>
                      <Pressable
                        style={styles.btn}
                        onPress={() => handleProfileClick(user)}>
                        <Text style={styles.transferText}>Send</Text>
                      </Pressable>
                    </View>
                  </Pressable>
                ))}
              </>
            )}
          </ScrollView>
        </View>

        <View style={styles.hider}></View>
      </SafeAreaView>
    </LinearGradient>
  );
};

export default SendSearch;

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
