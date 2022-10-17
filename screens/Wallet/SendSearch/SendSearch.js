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
  ImageBackground,
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
    <ImageBackground
      source={assets.background}
      resizeMode="cover"
      style={{
        ...styles.gradient,
        paddingTop: isIos ? 0 : StatusBar.currentHeight,
      }}>
      <StatusBar translucent={true} backgroundColor={'transparent'} />
      <SafeAreaView style={{flex: 1}}>
        <View style={styles.topBar}>
          <View style={styles.header}>
            <Pressable onPress={() => navigation.goBack()}>
              <Image
                source={assets.chevronLeft}
                style={{
                  height: 32,
                  width: 32,
                }}
              />
            </Pressable>
            <Text style={styles.topBarTitle}>Send</Text>
            <View style={{width: 32}} />
          </View>

          <View style={styles.searchBar}>
            <View style={styles.searchBarInner}>
              <Image
                source={assets.search}
                style={{
                  height: 24,
                  width: 24,
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
                source={search.length > 0 ? assets.close : assets.scan}
                style={{
                  height: 24,
                  width: 24,
                }}
                resizeMode="cover"
              />
            </View>
          </View>
        </View>
        <ImageBackground source={assets.containerBox} style={styles.bottom}>
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
        </ImageBackground>

        <View style={styles.hider}></View>
      </SafeAreaView>
    </ImageBackground>
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
    lineHeight: 32,
    color: theme.COLORS.darkBlue,
  },
  searchBar: {
    backgroundColor: '#ffffff66',
    borderWidth: 1,
    borderColor: theme.COLORS.white,
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
    ...theme.TYPOGRAPHY.body1,
    fontWeight: '500',
    height: '100%',
    color: theme.COLORS.grey900,
    marginHorizontal: 16,
    lineHeight: 20,
  },
  bottom: {
    flexGrow: 1,
    paddingHorizontal: 24,
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
    color: theme.COLORS.grey500,
    fontWeight: '600',
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  transferText: {
    ...theme.TYPOGRAPHY.body2,
    fontSize: 13,
    fontWeight: '600',
    lineHeight: 16,
    color: theme.COLORS.white,
  },
  btn: {
    paddingHorizontal: 24,
    paddingVertical: 8,
    backgroundColor: theme.COLORS.green,
    borderRadius: 16,
  },
  userName: {
    ...theme.TYPOGRAPHY.body1,
    color: theme.COLORS.grey900,
    lineHeight: 22,
    fontWeight: '600',
  },
  onlineIndicator: {
    height: 16,
    width: 16,
    backgroundColor: theme.COLORS.green,
    borderRadius: 16 / 2,
    borderWidth: 3,
    borderColor: theme.COLORS.white,
    position: 'absolute',
    right: 14,
    bottom: 0,
  },
  header: {
    marginTop: 27.5,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 16,
  },
});
