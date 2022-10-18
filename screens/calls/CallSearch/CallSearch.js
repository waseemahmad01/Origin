import React, {useState} from 'react';

import {
  View,
  Text,
  Image,
  ImageBackground,
  SafeAreaView,
  StyleSheet,
  Pressable,
  Platform,
  StatusBar,
  ScrollView,
  TextInput,
} from 'react-native';

import assets from '../../../assets';
import theme from '../../../theme';

const isIos = Platform.OS === 'ios';

const CallSearch = ({navigation}) => {
  const [search, setSearch] = useState('');
  return (
    <ImageBackground
      style={{flex: 1}}
      source={assets.background}
      resizeMode="cover">
      <SafeAreaView style={{flex: 1}}>
        <StatusBar translucent={true} backgroundColor="transparent" />
        <View style={styles.header}>
          <View style={styles.headerRow}>
            <Pressable onPress={() => navigation.goBack()}>
              <Image
                source={assets.chevronLeft}
                style={{
                  height: 32,
                  width: 32,
                }}
              />
            </Pressable>
            <Text style={styles.headerTitle}>Calls</Text>
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
              {search.length > 0 && (
                <Image
                  source={assets.close}
                  style={{
                    height: 24,
                    width: 24,
                  }}
                  resizeMode="cover"
                />
              )}
            </View>
          </View>
        </View>
        <ImageBackground
          source={assets.containerBox}
          resizeMode="cover"
          style={styles.body}>
          <ScrollView style={{flex: 1}} showsVerticalScrollIndicator={false}>
            <Text style={styles.title}>Recent search</Text>
            <View style={styles.transactionDetails}>
              <View style={{flexDirection: 'row'}}>
                <View style={styles.iconContainer}>
                  <Image
                    source={assets.user}
                    style={{height: 48, width: 48, borderRadius: 48 / 2}}
                    resizeMode="cover"
                  />
                </View>
                <View style={{marginLeft: 16}}>
                  <Text style={styles.transactionType}>Fernando Sims</Text>
                  <View
                    style={{
                      flexDirection: 'row',
                      alignItems: 'center',
                      marginTop: 4,
                    }}>
                    <Image
                      source={assets.outgoingCall}
                      style={{
                        height: 18,
                        width: 18,
                      }}
                    />
                    <Text style={styles.transactionInfo}> 8m ago</Text>
                  </View>
                </View>
              </View>
              <View
                style={{
                  height: 48,
                  width: 48,
                  borderRadius: 48 / 2,
                  backgroundColor: theme.COLORS.pastelBlue,
                  justifyContent: 'center',
                  alignItems: 'center',
                }}>
                <Image
                  source={assets.calls}
                  style={{
                    height: 24,
                    width: 24,
                  }}
                />
              </View>
            </View>
          </ScrollView>
        </ImageBackground>
        <View style={styles.hider}></View>
      </SafeAreaView>
    </ImageBackground>
  );
};

export default CallSearch;

const styles = StyleSheet.create({
  header: {
    paddingTop: isIos ? 31 : 31 + StatusBar.currentHeight,
    paddingBottom: 16,
    paddingHorizontal: 24,
  },
  body: {
    flexGrow: 1,
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
    overflow: 'hidden',
    zIndex: 2,
    elevation: 4,
    padding: 24,
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
  headerRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 16,
  },
  headerTitle: {
    ...theme.TYPOGRAPHY.h3,
    lineHeight: 32,
    fontWeight: '700',
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
    ...theme.TYPOGRAPHY.body1,
    fontSize: 18,
    lineHeight: 24,
    color: theme.COLORS.grey500,
    fontWeight: '600',
    marginBoottom: 16,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  userName: {
    ...theme.TYPOGRAPHY.body1,
    color: theme.COLORS.grey900,
    fontWeight: '600',
    textTransform: 'capitalize',
    marginBottom: 2,
    lineHeight: 22,
  },
  iconContainer: {
    height: 48,
    width: 48,
    borderRadius: 48 / 2,
    justifyContent: 'center',
    alignItems: 'center',
  },
  transactionDetails: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginVertical: 16,
  },
  transactionType: {
    ...theme.TYPOGRAPHY.body1,
    fontWeight: '600',
    fontSize: 18,
    lineHeight: 24,
    fontFamily: 'Inter',
    color: theme.COLORS.grey900,
  },
  transactionInfo: {
    fontSize: 14,
    fontWeight: '500',
    fontFamily: 'Inter',
    lineHeight: 18,
    color: theme.COLORS.grey700,
  },
  amount: {
    ...theme.TYPOGRAPHY.body1,
    fontSize: 18,
    lineHeight: 24,
    color: theme.COLORS.grey900,
    fontWeight: '600',
  },
});
