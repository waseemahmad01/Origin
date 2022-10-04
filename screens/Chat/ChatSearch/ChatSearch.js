import React, {useState} from 'react';

import {
  View,
  Text,
  SafeAreaView,
  StatusBar,
  Platform,
  StyleSheet,
  Pressable,
  Image,
  TextInput,
  ScrollView,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';

import theme from '../../../theme';
import assets from '../../../assets';

const isIos = Platform.OS === 'ios';

const ChatSearch = ({navigation}) => {
  const [search, setSearch] = useState('');
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
        <View style={styles.header}>
          <View style={styles.titleSection}>
            <Text style={styles.headerTitle}>Chats</Text>
            <Pressable onPress={() => navigation.goBack()}>
              <Image
                source={assets.closeIcon}
                style={{
                  height: 20,
                  width: 20,
                }}
              />
            </Pressable>
          </View>
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
            </View>
          </View>
        </View>
        <ScrollView style={styles.bottom}>
          <Text style={{...styles.title, marginTop: 24}}>Recents</Text>
          <View style={styles.recentSearch}>
            {Array.from({length: 6}, (_, i) => i).map(i => (
              <Image
                key={i}
                source={assets.user}
                style={{...styles.recentImages, marginLeft: i === 0 ? 0 : -10}}
              />
            ))}
            <View style={styles.more}>
              <Text style={styles.moreText}>30+</Text>
            </View>
          </View>
          <Text style={{...styles.title, marginTop: 24}}>Suggested</Text>
          {Array.from({length: 10}, (_, i) => i).map(i => (
            <View style={styles.suggestedUser} key={i}>
              <Image
                source={assets.user}
                style={{
                  height: 48,
                  width: 48,
                  borderRadius: 48 / 2,
                }}
                resizeMode="cover"
              />
              <Text style={styles.userName}>Jenny Wilson</Text>
            </View>
          ))}
        </ScrollView>
      </SafeAreaView>
      <View style={styles.hider}></View>
    </LinearGradient>
  );
};

export default ChatSearch;

const styles = StyleSheet.create({
  gradient: {
    flex: 1,
  },
  header: {
    paddingHorizontal: 24,
    paddingBottom: 16,
  },
  bottom: {
    flexGrow: 1,
    backgroundColor: theme.COLORS.white,
    zIndex: 2,
    elevation: 2,
    paddingHorizontal: 24,
  },
  hider: {
    position: 'absolute',
    backgroundColor: theme.COLORS.white,
    bottom: 0,
    width: '100%',
    height: 35,
    zIndex: 0,
  },
  titleSection: {
    marginTop: 26,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  headerTitle: {
    ...theme.TYPOGRAPHY.h3,
    fontWeight: '700',
    fontFamily: 'Inter',
    color: theme.COLORS.white,
  },
  searchBar: {
    backgroundColor: theme.COLORS.white,
    height: 44,
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
    color: '#1D1D35',
    marginHorizontal: 16,
    lineHeight: 20,
  },
  title: {
    ...theme.TYPOGRAPHY.subtitle1,
    color: '#B7B7BE',
    fontWeight: '500',
    fontFamily: 'Inter',
  },
  recentSearch: {
    flexDirection: 'row',
    marginTop: 12,
  },
  recentImages: {
    height: 56,
    width: 56,
    borderRadius: 56 / 2,
    borderWidth: 4,
    borderColor: theme.COLORS.white,
  },
  more: {
    height: 56,
    width: 56,
    borderRadius: 56 / 2,
    borderWidth: 4,
    borderColor: theme.COLORS.white,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#EBFAF3',
    marginLeft: -10,
  },
  moreText: {
    ...theme.TYPOGRAPHY.body2,
    fontFamily: 'Inter',
    fontWeight: '400',
    color: '#4A4A5D',
  },
  suggestedUser: {
    paddingVertical: 12,
    flexDirection: 'row',
    alignItems: 'center',
  },
  userName: {
    fontSize: 15,
    fontWeight: '500',
    fontFamily: 'Inter',
    color: '#1D1D35',
    lineHeight: 26,
    marginLeft: 16,
  },
});
